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

UMGANG MIT FAKTENFRAGEN:
Fragt der Nutzer nach Preis, Dauer, Ablauf, Technik, Datenschutz, Schnittstellen oder
Aufwand, dann beantworte das zuerst und direkt — im Feld "beobachtung", in maximal
2 Sätzen, mit der konkreten Zahl oder Tatsache. Die drei "ursachen" tragen dann die
Details (etwa die drei Pakete oder die Ablaufschritte), "uebersehen" den Zusammenhang,
den er noch nicht bedacht hat, und "rueckfrage" führt ins Gespräch.
Weiche einer Preisfrage nie aus und verweise nicht auf ein Formular — die Zahlen
stehen ohnehin auf der Seite. Steht die Antwort nicht in der Wissensbasis, sage das
klar und benenne, was im Erstgespräch geklärt wird.

WICHTIG: Antworte ausschliesslich als JSON-Objekt, ohne Markdown, ohne Erklärungen.

Wenn die Eingabe unbrauchbar ist (Unsinn, leer, reine Zeichenfolgen, keine erkennbare Situation):
{"valid":false,"message":"..."}
— message: Eine freundliche Bitte um eine konkretere Beschreibung. 1 Satz, Sie-Form.

Sonst:
{"valid":true,"activity_type":"...","beobachtung":"...","ursachen":["...","...","..."],"uebersehen":"...","rueckfrage":"..."}

- activity_type: Genau einer der folgenden Codes — wähle den am besten passenden:
  appointment_booking | price_calculator | inquiry_forms | self_service | findability |
  ai_visibility | lead_qualification | trust_building | recruiting | content_updates |
  measurement | site_operations | not_website | faq_answer | general
  Nutze faq_answer, wenn es eine reine Faktenfrage war (Preis, Dauer, Technik,
  Ablauf, Datenschutz) und keine Situation aus dem Betrieb geschildert wurde.

- beobachtung: Was die Website in dieser Situation übernehmen könnte. Symptom aufgreifen, dann die Fähigkeit benennen. Max 2 Sätze. Keine Wiederholung der Eingabe.

- ursachen: Genau 3 konkrete Punkte, was die Website konkret tun würde. Keine Kategorien, keine Feature-Namen — Situationen. Je 1 Satz.
  Schlecht: "Terminbuchungssystem", "SEO-Optimierung"
  Gut: "Der Kunde sieht Ihre freien Zeiten und bucht selbst — Sie erfahren es per Benachrichtigung"

- uebersehen: Drei Sätze, jeder mit klarer Aufgabe:
  1. Der überraschende Zusammenhang, den die meisten nicht sehen.
  2. Warum das Problem ohne diese Lösung wiederkehrt.
  3. Was sich dadurch verschiebt — als markierter Richtwert, nie als Versprechen.
  Beispiel: "Die meisten Anrufe entstehen nicht, weil Kunden reden wollen, sondern weil die Information fehlt. Solange sie nur bei Ihnen liegt, bleibt jede Auskunft Ihre Aufgabe. Betriebe mit Selbstauskunft und Buchung auf der Seite berichten erfahrungsgemäss von deutlich weniger Rückruf-Schleifen."

- rueckfrage: Eine kurze präzise Frage, die zum Gespräch führt. 1 Satz.';

// ── Claude API streaming request ─────────────────────────────────────────────
$requestBody = json_encode([
    'model'      => CLAUDE_MODEL,
    'max_tokens' => MAX_TOKENS,
    'stream'     => true,
    // Sonnet 5 denkt sonst per Default und teilt sich max_tokens mit der Antwort.
    'thinking'   => ['type' => 'disabled'],
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
$jsonText = trim($fullText);
// Falls das Modell den Block in Markdown-Fences legt
if (strpos($jsonText, '```') === 0) {
    $jsonText = preg_replace('/^```(?:json)?\s*|\s*```$/', '', $jsonText);
}
// Nur den JSON-Teil behalten
$firstBrace = strpos($jsonText, '{');
$lastBrace  = strrpos($jsonText, '}');
if ($firstBrace === false || $lastBrace === false || $lastBrace <= $firstBrace) {
    sendSSE(['error' => 'parse']);
    exit;
}
$jsonText = substr($jsonText, $firstBrace, $lastBrace - $firstBrace + 1);

// Echte Zeilenumbrüche innerhalb von JSON-Strings entschärfen
$sanitized = preg_replace_callback('/"(?:[^"\\\\]|\\\\.)*"/s', function ($m) {
    return str_replace(["\r\n", "\n", "\r"], ' ', $m[0]);
}, $jsonText);
if (is_string($sanitized)) {
    $jsonText = $sanitized;
}

$parsed = json_decode($jsonText, true);
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

// ── Completeness check ───────────────────────────────────────────────────────
$ursachen = [];
if (isset($parsed['ursachen']) && is_array($parsed['ursachen'])) {
    foreach ($parsed['ursachen'] as $u) {
        $u = trim(strip_tags((string) $u));
        if ($u !== '') $ursachen[] = $u;
    }
}

if (
    !isset($parsed['beobachtung'], $parsed['uebersehen'], $parsed['rueckfrage'])
    || count($ursachen) < 3
) {
    sendSSE(['error' => 'incomplete']);
    exit;
}

// ── Score-Tabelle ────────────────────────────────────────────────────────────
// Wie gut lässt sich dieser Bereich durch eine Website abdecken?
// Skala: technisches Abdeckungspotenzial in Prozent, vor KMU-Adjustment.
// Grundlage: Amplifyr-Projekterfahrung + gängige Web-Benchmarks.
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
$activityType = isset($parsed['activity_type']) ? trim((string) $parsed['activity_type']) : 'general';
$rawScore     = isset($activityScoresRaw[$activityType]) ? $activityScoresRaw[$activityType] : 74;
$score        = (int) round($rawScore * 0.85); // -15% Adjustment für Einführungsaufwand

// ── Done event ───────────────────────────────────────────────────────────────
sendSSE([
    'done'        => true,
    'valid'       => true,
    'beobachtung' => trim(strip_tags((string) $parsed['beobachtung'])),
    'ursachen'    => $ursachen,
    'uebersehen'  => trim(strip_tags((string) $parsed['uebersehen'])),
    'rueckfrage'  => trim(strip_tags((string) $parsed['rueckfrage'])),
    'score'       => $score,
]);
