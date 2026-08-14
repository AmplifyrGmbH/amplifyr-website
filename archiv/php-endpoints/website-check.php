<?php
// =============================================================================
//  WEBSITE-CHECK — Endpoint für die Seite /webdesign
//
//  Schwesterdatei zu ai-check.php. Unterschied: ai-check.php diagnostiziert
//  betriebliche Engpässe über alle vier Amplifyr-Bereiche. Diese Datei
//  beantwortet ausschliesslich die Frage "was könnte meine Website für mich
//  übernehmen" — Terminbuchung, Rechner, Formulare, Auffindbarkeit, Betrieb.
//
//  Gleiches Antwortformat wie ai-check.php, damit ki-check-prototyp.js
//  unverändert für beide funktioniert:
//    {done, valid, beobachtung, ursachen[3], uebersehen, rueckfrage, score}
//
//  Unterschied zu ai-check.php: Diese Datei holt die Antwort per Structured
//  Outputs (das Schema erzwingt die Form), ai-check.php erbittet ihr JSON noch
//  im Prompt. Die Feldnamen sind in beiden dieselben und muessen es bleiben —
//  siehe die Warnung am Schema weiter unten. Sie sind inhaltlich unschoen
//  ("ursachen" enthaelt Massnahmen), aber der Parser im geteilten Frontend
//  haengt woertlich daran. Ein Umbenennungsversuch am 14.08.2026 hat den Chat
//  live lahmgelegt.
// =============================================================================

// ── Configuration ─────────────────────────────────────────────────────────────
// Sonnet 5: gleiche Preisklasse wie das bisher genutzte Sonnet 4.6, aber eine
// Generation aktueller. Thinking ist auf Sonnet 5 standardmässig AN und würde
// sich max_tokens mit der Antwort teilen — für ein knappes JSON-Objekt nicht
// nötig, deshalb explizit deaktiviert (sonst droht abgeschnittenes JSON).
define('CLAUDE_MODEL',        'claude-sonnet-5');
define('MAX_TOKENS',          1200);
define('API_TIMEOUT',           28);
define('API_CONNECT_TIMEOUT',    8);
define('MAX_BODY_BYTES',      8192);
define('MIN_INPUT_LEN',          5);
define('MAX_INPUT_LEN',       2000);

// ── Headers ───────────────────────────────────────────────────────────────────
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

// ── Method guard ──────────────────────────────────────────────────────────────
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// ── API key ───────────────────────────────────────────────────────────────────
if (!getenv('ANTHROPIC_API_KEY') && is_readable(__DIR__ . '/.env')) {
    foreach (file(__DIR__ . '/.env', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $line) {
        $line = trim($line);
        if ($line === '' || $line[0] === '#' || strpos($line, '=') === false) {
            continue;
        }
        [$name, $value] = explode('=', $line, 2);
        putenv(trim($name) . '=' . trim($value));
    }
}
$apiKey = getenv('ANTHROPIC_API_KEY');
if (!$apiKey) {
    http_response_code(500);
    echo json_encode(['error' => 'Configuration error']);
    exit;
}

// ── Read & validate body ──────────────────────────────────────────────────────
$rawBody = file_get_contents('php://input', false, null, 0, MAX_BODY_BYTES + 1);
if ($rawBody === false || strlen($rawBody) > MAX_BODY_BYTES) {
    http_response_code(400);
    echo json_encode(['error' => 'Request too large']);
    exit;
}

$input = json_decode($rawBody, true);
if (!is_array($input)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid request body']);
    exit;
}

$message = isset($input['message']) ? trim((string) $input['message']) : '';
$msgLen  = mb_strlen($message, 'UTF-8');

if ($msgLen < MIN_INPUT_LEN || $msgLen > MAX_INPUT_LEN) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid input length']);
    exit;
}

// ── Switch to SSE streaming ───────────────────────────────────────────────────
@ob_end_clean();
header('Content-Type: text/event-stream; charset=utf-8');
header('Cache-Control: no-cache');
header('X-Accel-Buffering: no');
header('Connection: keep-alive');

function sendSSE(array $data): void {
    echo 'data: ' . json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) . "\n\n";
    @ob_flush();
    @flush();
}

$fallbackMsg = 'Beschreiben Sie kurz, was in Ihrem Betrieb am meisten Zeit kostet oder wo Kunden Sie am häufigsten kontaktieren – zum Beispiel Terminvereinbarung, Preisauskünfte, Rückfragen oder Anfragen, die nicht passen.';

// ── System prompt ─────────────────────────────────────────────────────────────
$systemPrompt = 'Du bist ein erfahrener Web- und Digitalberater bei Amplifyr (Schweiz). Deine Spezialität: erkennen, welche Arbeit eine Website einem KMU tatsächlich abnehmen kann — und welche nicht.

Der Nutzer beschreibt eine Situation aus seinem Betrieb. Deine Aufgabe ist nicht, seinen Betrieb zu durchleuchten, sondern konkret zu zeigen: DAS könnte deine Website für dich übernehmen.

Dein Ziel ist, dass der Nutzer danach denkt: "So hatte ich eine Website noch nie gesehen — das würde mir tatsächlich Arbeit abnehmen." Du verkaufst durch Konkretheit, nicht durch Werbesprache. Kein "Wir bauen Ihnen das", kein "Jetzt anfragen", keine CTAs im Antworttext.

WAS EINE MODERNE WEBSITE ÜBERNEHMEN KANN — dein Werkzeugkasten, intern mitdenken:
- Terminbuchung: Kunde sieht freie Zeiten und bucht selbst, direkt im Kalender des Betriebs. Ersetzt Telefon-Ping-Pong.
- Rechner & Konfiguratoren: Preisschätzung, Mengen, Varianten — Ergebnis sofort auf der Seite, ohne Formular und ohne Anruf. Senkt die Hemmschwelle und qualifiziert die Anfrage.
- Strukturierte Anfrageformulare: Fragen nach genau den Angaben, die man ohnehin erfragen müsste — Adresse, Fotos, Anliegen, Wunschtermin. Die Anfrage kommt vollständig an statt als Rückrufbitte.
- Selbstauskunft: Häufige Fragen (Preisrahmen, Einsatzgebiet, Ablauf, Verfügbarkeit) beantwortet die Seite, auch nachts und am Wochenende.
- Auffindbarkeit: Sichtbarkeit bei Google für die Leistung in der Region — und Erwähnung durch KI-Assistenten wie ChatGPT oder Claude, die zunehmend als Suchweg dienen.
- Vorqualifizierung: Wer anruft, hat vorher Leistung und Preisrahmen gelesen. Weniger unpassende Anfragen, Gespräche starten weiter vorne.
- Vertrauensaufbau: Referenzen, Bewertungen, Team, abgeschlossene Arbeiten — überzeugt, bevor das erste Wort gesprochen ist.
- Mitarbeitergewinnung: Die Seite trägt offene Stellen und zeigt den Betrieb als Arbeitgeber.
- Messbarkeit: Woher Anfragen kommen, welche Seite überzeugt, wo Besucher abbrechen.
- Betrieb: Erreichbarkeit, Ladezeit, Datensicherung, Aktualität — Grundlage, damit das Obige verlässlich läuft.

EHRLICHKEIT IST PFLICHT — sie erzeugt Vertrauen:
Wenn das geschilderte Problem NICHT primär durch eine Website gelöst wird (z.B. interne Buchhaltung, Lagerhaltung, Personalplanung, Warenwirtschaft), dann sage das klar und benenne, welchen TEIL die Website dennoch abnehmen kann. Erfinde keine Website-Lösung für ein Problem, das keine ist. Ein Satz wie "Der Kern davon liegt nicht auf der Website — aber der Teil, der Kundenkontakt betrifft, schon:" ist stark, nicht schwach.

TONALITÄT:
- Schweizer Hochdeutsch, "ss" statt "ß".
- Sie-Form.
- Konkrete Situationen statt Fachbegriffe. Nicht "Conversion-Optimierung", sondern "Besucher, die anrufen statt wieder wegzugehen".
- Keine Superlative, keine Ausrufezeichen, kein "revolutionär".
- Zahlen nur als klar markierte Richtwerte ("erfahrungsgemäss", "in vergleichbaren Fällen"), nie als Tatsache über diesen Betrieb.

RECHNE MIT SEINEN ZAHLEN, WENN ER SIE NENNT:
Nennt der Nutzer selbst Stunden, Anrufe pro Tag, einen Stundensatz oder eine
Anzahl Mitarbeitende, dann rechne daraus die Jahresgrösse aus und schreibe sie
hin. Das ist keine erfundene Zahl — es sind seine eigenen, du machst sie nur
sichtbar. Genau diese Zahl überzeugt, nicht "eine markante Grössenordnung".

Rechne mit 46 Arbeitswochen pro Jahr, gleich wie der Rechner weiter oben auf
der Seite; nenne diese Annahme mit. Zeige die Rechnung offen.
Beispiel: 2 Stunden pro Tag und 95 CHF Stundensatz sind 10 Stunden pro Woche,
also rund 43700 CHF pro Jahr (10 × 95 × 46).

Grenzen:
- Fehlt der Stundensatz, rechne NICHT mit einem angenommenen Satz. Nenne dann
  nur die Stunden pro Jahr ("2 Stunden täglich sind rund 460 Stunden im Jahr")
  und sage, dass der Frankenbetrag von seinem Verrechnungssatz abhängt.
- Behaupte nie, die Website spare den ganzen Betrag. Der Betrag ist, was die
  Aufgabe heute kostet — wie viel davon die Seite übernimmt, entscheidet er.
- Nennt er keine Zahlen, erfinde keine. Dann bleibt es beim Qualitativen.

WISSENSBASIS — Fakten über Amplifyr. Nutze sie, wenn der Nutzer danach fragt.
Diese Angaben stehen 1:1 im FAQ der Seite; sie müssen konsistent bleiben.
Erfinde nichts dazu — was hier nicht steht, gehört ins Erstgespräch.

Pakete (Fixpreis, vor Beginn unterschrieben):
- "Der Auftritt" 2999 CHF: eine Seite, alle Infos, Kontaktformular, startklar in wenigen Tagen. Für Kleinstbetriebe und Einzelunternehmer.
- "Das Arbeitspferd" 4999 CHF: 5 Inhaltsseiten inkl. Rechtsseiten, Kontaktformular und Karte, Vertrauenselemente. Der Standard für Dienstleister und KMU.
- "Die Maschine" ab 8900 CHF: bis ca. 10 Seiten inkl. Leistungs-Landingpages, interaktive Werkzeuge (Rechner, Buchung, Konfigurator), Terminbuchung mit Kalenderanbindung, Google-Firmenprofil, Blog und FAQ. Wenn die Website Aufgaben übernehmen soll.
- Grössere Projekte, Shops und Individuallösungen auf Anfrage.
- Im Fixpreis immer enthalten: SEO-Basis, Mobile-Optimierung, SSL, alle sichtbaren Texte, Kontaktformular, strukturierte Daten (Schema.org), Hosting-Einrichtung.

Betrieb und Pflege (monatlich, optional):
- Basic 49 CHF: Erreichbarkeit, Überwachung rund um die Uhr, Datensicherung.
- Advanced 99 CHF: alles aus Basic plus monatlicher Report zu Besuchern, Sichtbarkeit und Zustand.
- Ohne Retainer: Anpassungen jederzeit einzeln beauftragbar.

Dauer:
- Einseitiger Auftritt: 5 bis 10 Werktage.
- Mehrere Seiten: 3 bis 6 Wochen.
- Laufende Updates, Feedback jederzeit möglich; Anzahl der Feedbackrunden ist pro Paket festgelegt.

Ablauf: Erstgespräch (Ziel, Zielgruppe, Umfang, danach steht der Fixpreis) → echte klickbare Demo, kein Mockup → Feedbackrunden → Launch und Übergabe.

Was der Kunde liefern muss: sehr wenig. Amplifyr übernimmt die Inhalte der bestehenden Website als Grundlage (Leistungen, Referenzen, Team, Kontaktdaten) und arbeitet sie neu auf. Nichts muss von Null geschrieben werden. Gebraucht werden: das Erstgespräch, Feedback in den Runden, und falls vorhanden aktuelle Fotos oder Logodateien.

Technik: handgeschriebenes HTML, CSS und JavaScript. Kein WordPress, kein Baukasten, kein Framework, keine Plugin-Kette, keine Datenbank wo keine nötig ist. Daraus ergeben sich Ladezeiten unter zwei Sekunden und eine minimale Angriffsfläche. Code, Domain und Inhalte gehören zu 100 Prozent dem Kunden und werden beim Launch übergeben — keine technische Bindung an Amplifyr.

Hosting und Datenschutz: Hosting in der Schweiz, revDSG-konform, keine US-Cloud-Abhängigkeiten.

Sichtbarkeit: SEO und GEO sind in jedem Paket enthalten und wirken dauerhaft, brauchen aber einige Wochen bis Monate. GEO (Generative Engine Optimization) heisst: Inhalte so aufbereiten, dass KI-Systeme wie ChatGPT, Perplexity und Google AI Overviews das Unternehmen direkt zitieren, nicht nur verlinken. Google Search Ads sind ein Addon und kosten extra, wirken dafür sofort — Keyword-Recherche, Anzeigentexte, Conversion-Tracking, monatliches Reporting.

Schnittstellen: In vielen Fällen möglich — Termine in bestehende Kalender, Anfragen an CRM oder Branchensoftware, Rechnungs- und Kundendaten. Voraussetzung ist eine Schnittstelle im jeweiligen System; das wird im Erstgespräch geklärt, bevor ein Angebot steht. Eine zweite parallele Datenverwaltung ist nicht das Ziel.

Demo: kostenlos innerhalb von 48 Stunden, ohne Kreditkarte, ohne Verpflichtung.

GEBAUTE PROJEKTE — diese drei stehen live auf derselben Seite weiter unten.
Die Beschreibungen sind wörtlich von dort; sie müssen übereinstimmen.
- CORA Immobilien (Immobilien): Bewirtschaftung, Vermietung, Verkauf und Beratung klar getrennt — mit Team-Seite, die Vertrauen aufbaut, bevor jemand anruft.
- GastroCycle (Gastro-Ausstattung): Gerätekatalog zum Mieten und Kaufen, mit Anfrageformular direkt am Gerät — statt Telefonliste und PDF-Prospekt.
- Ruay Thai Noodle (Restaurant): Menü, Mittagsbuffet und Vorbestellung zum Abholen — die Gäste bestellen vor, statt am Mittag anzustehen.

Passt eines dieser Projekte zur Branche oder zur Aufgabe des Nutzers, dann
NENNE ES — als Halbsatz am Ende der "beobachtung". Ein Gastrobetrieb mit
Abholstau soll von Ruay Thai hören, ein Immobilienverwalter von CORA. Das ist
der einzige Beleg, den du hast, dass ihr das schon gebaut habt, und er wirkt
stärker als jede Beschreibung.
NENNE DABEI DEN NAMEN. Er steht live auf derselben Seite und ist damit
nachprüfbar — "wir haben das schon gebaut" ohne Namen ist kein Beleg.
Beispiel: "… Für Ruay Thai Noodle haben wir genau das gebaut: Die Gäste
bestellen vor, statt am Mittag anzustehen."

Passt keines wirklich, lass es weg — bei einem Coiffeur wirkt das Restaurant
beliebig. Erfinde nie ein weiteres Projekt und keine Zahlen dazu; was hier
steht, ist alles, was du darüber weisst.

UMGANG MIT FAKTENFRAGEN:
Fragt der Nutzer nach Preis, Dauer, Ablauf, Technik, Datenschutz, Schnittstellen oder
Aufwand, dann beantworte das zuerst und direkt — im Feld "beobachtung", in maximal
2 Sätzen, mit der konkreten Zahl oder Tatsache. Die drei "ursachen" tragen dann die
Details (etwa die drei Pakete oder die Ablaufschritte), "uebersehen" den Zusammenhang,
den er noch nicht bedacht hat, und "rueckfrage" führt ins Gespräch.
Weiche einer Preisfrage nie aus und verweise nicht auf ein Formular — die Zahlen
stehen ohnehin auf der Seite. Steht die Antwort nicht in der Wissensbasis, sage das
klar und benenne, was im Erstgespräch geklärt wird.

DIE FELDER — was in jedes gehört. Das Format erzwingt die API, du musst dich
also nicht um JSON, Anführungszeichen oder Reihenfolge kümmern — nur um den Inhalt.

Wenn die Eingabe unbrauchbar ist (Unsinn, leer, reine Zeichenfolgen, keine
erkennbare Situation): valid = false, message = eine freundliche Bitte um eine
konkretere Beschreibung, 1 Satz, Sie-Form. activity_type = "general", alle
übrigen Textfelder leer lassen ("").

Sonst: valid = true, message leer lassen (""), und die folgenden Felder füllen.

- activity_type: Der am besten passende Code.
  Nutze faq_answer, wenn es eine reine Faktenfrage war (Preis, Dauer, Technik,
  Ablauf, Datenschutz) und keine Situation aus dem Betrieb geschildert wurde.

- beobachtung: Was die Website in dieser Situation übernehmen könnte. Symptom aufgreifen, dann die Fähigkeit benennen. Max 2 Sätze, plus den Referenz-Halbsatz aus der Wissensbasis, falls eines der drei Projekte zur Branche passt. Keine Wiederholung der Eingabe.

- ursachen (genau 3 Einträge): Drei konkrete Punkte, was die Website konkret tun würde. Keine Kategorien, keine Feature-Namen — Situationen. Je 1 Satz.
  Schlecht: "Terminbuchungssystem", "SEO-Optimierung"
  Gut: "Der Kunde sieht Ihre freien Zeiten und bucht selbst — Sie erfahren es per Benachrichtigung"

- uebersehen: Drei Sätze, jeder mit klarer Aufgabe:
  1. Der überraschende Zusammenhang, den die meisten nicht sehen.
  2. Warum das Problem ohne diese Lösung wiederkehrt.
  3. Was sich dadurch verschiebt — als markierter Richtwert, nie als Versprechen.
     Hat der Nutzer Zahlen genannt, gehört die ausgerechnete Jahresgrösse hierher.

  Zum dritten Satz: Formuliere ihn jedes Mal anders. Die Wendung "Betriebe mit
  X berichten erfahrungsgemäss von spürbar weniger Y" ist verbraucht — wer zwei
  Antworten liest, erkennt die Schablone und glaubt keiner davon mehr. Diese
  drei Beispiele sind absichtlich verschieden gebaut; kopiere keines, sondern
  bau den Satz aus der jeweiligen Situation:
  a) "Zwei Stunden täglich sind bei 95 CHF rund 43700 CHF im Jahr, gerechnet mit 46 Arbeitswochen — Geld für eine Aufgabe, die niemand bestellt hat."
  b) "Der Unterschied zeigt sich nicht am ersten Tag, sondern daran, welche Anrufe irgendwann ausbleiben."
  c) "Was heute Ihre Aufmerksamkeit braucht, läuft dann ohne sie weiter, auch am Samstag um zehn."

- rueckfrage: Eine kurze präzise Frage, die zum Gespräch führt. 1 Satz.';

// ── Score-Tabelle ────────────────────────────────────────────────────────────
// Wie gut lässt sich dieser Bereich durch eine Website abdecken?
// Skala: Abdeckungspotenzial in Prozent, vor dem Abschlag unten.
// Grundlage: Amplifyr-Projekterfahrung — kein Messwert und keine Studie.
// Der Ring auf der Seite ist entsprechend beschriftet; wer das hier ändert,
// muss die Beschriftung in webdesign.html mitziehen.
//
// Steht bewusst VOR dem Request: Die Schlüssel dieses Arrays sind gleichzeitig
// das Enum im Antwortschema. Vorher standen die Codes zusätzlich als Prosaliste
// im Prompt und konnten von der Tabelle abdriften — jetzt gibt es eine Quelle.
$activityScoresRaw = [
    'appointment_booking' => 92, // Terminbuchung: Kunde bucht selbst im Kalender
    'self_service'        => 90, // Selbstauskunft: häufige Fragen ohne Rückruf
    'inquiry_forms'       => 89, // Strukturierte Anfragen statt Rückrufbitten
    'price_calculator'    => 86, // Rechner: Ergebnis sofort auf der Seite
    'content_updates'     => 85, // Inhalte selbst aktuell halten
    'lead_qualification'  => 83, // Vorqualifizierte Anfragen
    'trust_building'      => 82, // Referenzen, Bewertungen, Team
    'measurement'         => 81, // Sichtbar machen, was funktioniert
    'findability'         => 78, // Google-Sichtbarkeit in der Region
    'site_operations'     => 77, // Erreichbarkeit, Ladezeit, Sicherung
    'ai_visibility'       => 72, // Erwähnung durch KI-Assistenten
    'recruiting'          => 70, // Mitarbeitergewinnung über die Seite
    'not_website'         => 38, // Kern liegt ausserhalb der Website
    // Reine Faktenfrage (Preis, Dauer, Technik): ein "Abdeckungsgrad" ist hier
    // inhaltlich sinnlos. Das Frontend zeigt den Ring aber immer, deshalb ein
    // neutraler Wert statt 0 — sonst stünde dort ein irritierendes "0 %".
    'faq_answer'          => 74,
    'general'             => 74,
];

// ── Antwortschema ────────────────────────────────────────────────────────────
// Structured Outputs: Die API erzwingt diese Form, statt sie im Prompt zu
// erbitten. Damit entfällt der frühere Reparaturstapel (Markdown-Fences
// abschneiden, erste/letzte geschweifte Klammer suchen, rohe Zeilenumbrüche
// per Regex entschärfen) und der activity_type kann nicht mehr erfunden
// werden — vorher fiel ein Tippfehler still auf 74 zurück.
//
// Bewusst FLACH statt anyOf-Union aus {valid:false} und {valid:true}: Die
// Schemaunterstützung erlaubt anyOf, aber ein Wurzelschema ohne "type" ist
// ungetestet. Ein flaches Objekt mit allen Feldern required nutzt nur
// unstrittige Bausteine. Bei valid=false bleiben die Textfelder leer.
//
// ‼ FELDNAMEN UND REIHENFOLGE SIND FEST — NICHT UMBENENNEN, NICHT UMSORTIEREN.
// ki-check-prototyp.js rendert die Antwort NICHT aus dem fertigen done-Ereignis,
// sondern parst den durchlaufenden Zeichenstrom mit einem Zustandsautomaten
// (Zeile ~403 ff.). Der sucht darin wörtlich und in dieser Reihenfolge:
//
//     "beobachtung":"…"   →   ["…","…","…"]   →   "uebersehen":"…"   →   "rueckfrage":"…"
//
// Genau das ging am 14.08.2026 schief: die Felder hiessen kurzzeitig
// uebernimmt / konkret_1..3 / aenderung, weil die alten Namen inhaltlich
// unpassend sind ("ursachen" enthält Massnahmen). Der Marker traf nie, das
// "[" der Liste kam nie — der Chat blieb auf "Analyse wird vorbereitet"
// stehen, obwohl der Endpoint einwandfrei antwortete. Nur das done-Ereignis
// zu prüfen findet diesen Fehler NICHT, weil das Frontend es nicht benutzt.
// Wer die Namen ändern will, muss den Parser im geteilten JS mit ändern —
// und der bedient auch index.html mit ai-check.php.
//
// ursachen ist deshalb ein echtes Array. minItems/maxItems gehören zu den
// nicht unterstützten Array-Einschränkungen, die Dreizahl kann das Schema
// also nicht erzwingen — dafür steht die Prüfung weiter unten.
//
// Erste Anfrage mit einem neuen Schema kostet einmalig Kompilierzeit,
// danach 24 Stunden gecacht.
$responseSchema = [
    'type'                 => 'object',
    'additionalProperties' => false,
    'required'             => [
        'valid', 'message', 'activity_type',
        'beobachtung', 'ursachen', 'uebersehen', 'rueckfrage',
    ],
    'properties' => [
        'valid'         => ['type' => 'boolean', 'description' => 'false, wenn die Eingabe keine erkennbare Situation enthält.'],
        'message'       => ['type' => 'string',  'description' => 'Nur bei valid=false: Bitte um eine konkretere Beschreibung, 1 Satz. Sonst leer.'],
        'activity_type' => ['type' => 'string',  'enum' => array_keys($activityScoresRaw), 'description' => 'Der am besten passende Bereich.'],
        // Ab hier die vier Felder in der Reihenfolge, die der Parser erwartet.
        'beobachtung'   => ['type' => 'string',  'description' => 'Was die Website hier übernehmen könnte. Max 2 Sätze.'],
        'ursachen'      => ['type' => 'array',   'items' => ['type' => 'string'], 'description' => 'Genau drei konkrete Punkte, was die Website tun würde. Je 1 Satz.'],
        'uebersehen'    => ['type' => 'string',  'description' => 'Drei Sätze: Zusammenhang, Wiederkehr, markierter Richtwert.'],
        'rueckfrage'    => ['type' => 'string',  'description' => 'Eine kurze präzise Frage, 1 Satz.'],
    ],
];

// ── Claude API streaming request ─────────────────────────────────────────────
$requestBody = json_encode([
    'model'      => CLAUDE_MODEL,
    'max_tokens' => MAX_TOKENS,
    'stream'     => true,
    // Sonnet 5 denkt sonst per Default und teilt sich max_tokens mit der Antwort.
    'thinking'      => ['type' => 'disabled'],
    'output_config' => ['format' => ['type' => 'json_schema', 'schema' => $responseSchema]],
    'system'     => [
        [
            'type'          => 'text',
            'text'          => $systemPrompt,
            'cache_control' => ['type' => 'ephemeral'],
        ]
    ],
    'messages'   => [
        ['role' => 'user', 'content' => $message]
    ]
], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

$fullText  = '';
$sseBuffer = '';

$ch = curl_init('https://api.anthropic.com/v1/messages');
curl_setopt_array($ch, [
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => $requestBody,
    CURLOPT_HTTPHEADER     => [
        'Content-Type: application/json',
        'x-api-key: ' . $apiKey,
        'anthropic-version: 2023-06-01',
        // Prompt Caching ist GA — kein Beta-Header nötig.
    ],
    CURLOPT_TIMEOUT        => API_TIMEOUT,
    CURLOPT_CONNECTTIMEOUT => API_CONNECT_TIMEOUT,
    CURLOPT_WRITEFUNCTION  => function ($ch, $chunk) use (&$fullText, &$sseBuffer) {
        $sseBuffer .= $chunk;
        $lines      = explode("\n", $sseBuffer);
        $sseBuffer  = array_pop($lines);
        foreach ($lines as $line) {
            $line = trim($line);
            if (strpos($line, 'data: ') !== 0) continue;
            $raw = substr($line, 6);
            if ($raw === '[DONE]') continue;
            $event = json_decode($raw, true);
            if (!isset($event['type'])) continue;
            if ($event['type'] === 'content_block_delta' && isset($event['delta']['text'])) {
                $text      = $event['delta']['text'];
                $fullText .= $text;
                sendSSE(['t' => $text]);
            }
        }
        return strlen($chunk);
    },
]);

curl_exec($ch);
$curlErr  = curl_errno($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($curlErr !== 0 || $httpCode !== 200) {
    sendSSE(['error' => 'upstream']);
    exit;
}

// ── Parse the model's JSON ───────────────────────────────────────────────────
// Das Schema garantiert wohlgeformtes JSON in der vereinbarten Form — Fences,
// Vorreden und rohe Zeilenumbrüche kann es nicht mehr geben. Ein Fall bleibt:
// reisst max_tokens mitten im Objekt ab, ist der Text unvollständig. Deshalb
// ein einziger Decode-Guard statt des früheren Reparaturstapels.
$parsed = json_decode(trim($fullText), true);
if (!is_array($parsed)) {
    sendSSE(['error' => 'parse']);
    exit;
}

// ── Invalid input path ───────────────────────────────────────────────────────
if (isset($parsed['valid']) && $parsed['valid'] === false) {
    sendSSE([
        'done'    => true,
        'valid'   => false,
        'message' => trim(strip_tags((string) ($parsed['message'] ?? $fallbackMsg))),
    ]);
    exit;
}

// ── Die Punkte säubern ───────────────────────────────────────────────────────
// Das Feld ist im Schema required, ein Array also garantiert da. Die DREIZAHL
// kann das Schema nicht erzwingen (minItems ist nicht unterstützt) und leere
// Zeichenketten auch nicht (minLength ebenso) — deshalb hier filtern und
// weiter unten auf Vollständigkeit prüfen.
$ursachen = [];
foreach ((array) ($parsed['ursachen'] ?? []) as $u) {
    $u = trim(strip_tags((string) $u));
    if ($u !== '') $ursachen[] = $u;
}

// ── Score ────────────────────────────────────────────────────────────────────
// activity_type ist per Schema-Enum auf die Schlüssel der Tabelle begrenzt,
// ein unbekannter Wert kann nicht mehr ankommen. Der Fallback bleibt als
// Gürtel-und-Hosenträger für den Fall, dass jemand die Tabelle ändert.
$activityType = isset($parsed['activity_type']) ? trim((string) $parsed['activity_type']) : 'general';
$rawScore     = $activityScoresRaw[$activityType] ?? 74;
$score        = (int) round($rawScore * 0.85); // pauschaler Abschlag für den Einführungsaufwand

// ── Done event ───────────────────────────────────────────────────────────────
// Die Schluessel hier heissen wie die Felder des Modells — keine Uebersetzung
// mehr, weil beide Seiten wieder dieselben Namen tragen (siehe Warnung am
// Schema). ki-check-prototyp.js ist geteilt und bedient auch index.html mit
// ai-check.php; wer hier umbenennt, muss dort den Parser mitaendern.
$beobachtung = trim(strip_tags((string) ($parsed['beobachtung'] ?? '')));

// required garantiert das Feld, nicht seinen Inhalt, und die Dreizahl der
// Punkte kann das Schema gar nicht erzwingen. Deshalb bleibt diese Pruefung:
// eine Karte mit leerer Einschaetzung oder ohne Punkte waere schlimmer als
// eine ehrliche Fehlermeldung.
if ($beobachtung === '' || count($ursachen) < 3) {
    sendSSE(['error' => 'incomplete']);
    exit;
}

sendSSE([
    'done'        => true,
    'valid'       => true,
    'beobachtung' => $beobachtung,
    'ursachen'    => $ursachen,
    'uebersehen'  => trim(strip_tags((string) ($parsed['uebersehen'] ?? ''))),
    'rueckfrage'  => trim(strip_tags((string) ($parsed['rueckfrage'] ?? ''))),
    'score'       => $score,
]);
