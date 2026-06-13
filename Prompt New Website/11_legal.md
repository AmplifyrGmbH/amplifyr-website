# Prompt 11 — `impressum.html` + `datenschutz.html` + `agb.html` + `page-legal.css`

## Kontext & Ziel

Erstelle drei Legal-Seiten für die Amplifyr-Website. Alle drei teilen sich dieselbe
Struktur und dasselbe CSS. Kein page-spezifisches JS nötig — alles läuft via `main.js`.

Lies zuerst:
- `style.css` — Design System
- `main.js` — Header-Scroll, Hamburger, Mobile-Menü

Erstelle:
- `impressum.html` — Impressum-Inhalt
- `datenschutz.html` — Datenschutzerklärung-Inhalt
- `agb.html` — AGB-Inhalt
- `page-legal.css` — gemeinsames CSS für alle drei Seiten

**Kein page-spezifisches JS** — `main.js` reicht aus.

---

## Gemeinsame Seitenstruktur

Alle drei Seiten haben denselben Aufbau:
1. Header im `legal-mode` (weisser Header, keine transparente Hero-Phase)
2. Main: Schmaler Inhaltsbereich (max-width 760px), zentriert
3. Footer (Standard)

---

## `impressum.html`

```html
<!DOCTYPE html>
<html lang="de-CH">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Impressum | amplifyr</title>
  <meta name="robots" content="noindex, nofollow" />

  <!-- Favicons -->
  <link rel="icon" type="image/x-icon" href="/Favicon/favicon.ico" />
  <link rel="icon" type="image/png" sizes="32x32" href="/Favicon/favicon_32x32.png" />
  <link rel="icon" type="image/png" sizes="16x16" href="/Favicon/favicon_16x16.png" />
  <link rel="apple-touch-icon" sizes="180x180" href="/Favicon/favicon_180x180.png" />

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />

  <!-- Shared + Page CSS -->
  <link rel="stylesheet" href="style.css" />
  <link rel="stylesheet" href="page-legal.css" />
</head>
<body>

  <!-- HEADER — legal-mode (immer weiss) -->
  <header id="site-header" class="legal-mode">
    <!-- Navigation wie in 02_navigation-footer.md -->
    <!-- kein nav-link aktiv -->
  </header>

  <nav class="mobile-menu" id="mobile-menu" aria-label="Mobile Navigation">
    <!-- wie in 02_navigation-footer.md -->
  </nav>

  <main class="legal-main" data-nosnippet>
    <div class="legal-container">

      <p class="legal-eyebrow">Rechtliches</p>
      <h1 class="legal-heading">Impressum</h1>

      <div class="legal-body">

        <h2>Angaben gemäss Art. 10 UWG</h2>
        <p>
          <strong>Amplifyr GmbH</strong><br>
          c/o Timo Steinfort<br>
          Mettlenstrasse 11<br>
          8142 Uitikon Waldegg<br>
          Schweiz
        </p>

        <h2>Kontakt</h2>
        <p>
          E-Mail: <a href="mailto:info@amplifyr.ch">info@amplifyr.ch</a><br>
          Website: <span>www.amplifyr.ch</span>
        </p>

        <h2>Handelsregister</h2>
        <p>
          Eingetragen im Handelsregister des Kantons Zürich<br>
          UID: CHE-435.424.644<br>
          CH-ID: CH-020-4091641-5
        </p>

        <h2>Vertretungsberechtigte Personen</h2>
        <p>
          Timo Steinfort, Geschäftsführer<br>
          David Staub, Geschäftsführer
        </p>

        <h2>Haftungsausschluss</h2>
        <p>Die Inhalte dieser Website wurden mit grösster Sorgfalt erstellt. Amplifyr GmbH übernimmt keine Gewähr für die Richtigkeit, Vollständigkeit und Aktualität der bereitgestellten Inhalte. Die Nutzung der Inhalte der Website erfolgt auf eigene Gefahr des Nutzers.</p>
        <p>Für externe Links zu fremden Webseiten übernimmt Amplifyr GmbH keine Verantwortung für deren Inhalte. Zum Zeitpunkt der Verlinkung waren keine rechtswidrigen Inhalte erkennbar.</p>

        <h2>Urheberrecht</h2>
        <p>Die auf dieser Website veröffentlichten Inhalte unterliegen dem schweizerischen Urheberrecht. Jede vom Urheberrecht nicht zugelassene Verwertung bedarf der vorherigen schriftlichen Zustimmung von Amplifyr GmbH.</p>

        <p class="legal-stand">Stand: März 2026</p>

      </div>
    </div>
  </main>

  <footer class="footer-light">
    <div class="container">
      <div class="footer-inner">
        <a class="logo footer-logo" href="/" aria-label="amplifyr Startseite">
          <span class="logo-wordmark">ampli<em class="logo-fyr">fyr</em></span>
        </a>
        <p class="footer-copy">&copy; 2026 Amplifyr GmbH. Alle Rechte vorbehalten.</p>
        <nav class="footer-links" aria-label="Footer Navigation">
          <a href="/impressum.html">Impressum</a>
          <a href="/datenschutz.html">Datenschutz</a>
          <a href="/agb.html">AGB</a>
        </nav>
      </div>
    </div>
  </footer>

  <script src="main.js"></script>
</body>
</html>
```

---

## `datenschutz.html`

Gleiche Struktur wie `impressum.html`, nur Titel und Inhalt ändern sich:

```html
<!-- Head: -->
<title>Datenschutzerklärung | amplifyr</title>
<meta name="robots" content="noindex, nofollow" />

<!-- Main-Inhalt: -->
<p class="legal-eyebrow">Rechtliches</p>
<h1 class="legal-heading">Datenschutzerklärung</h1>

<div class="legal-body">

  <h2>1. Verantwortliche Stelle</h2>
  <p>
    <strong>Amplifyr GmbH</strong><br>
    Mettlenstrasse 11<br>
    8142 Uitikon Waldegg<br>
    E-Mail: <a href="mailto:info@amplifyr.ch">info@amplifyr.ch</a>
  </p>

  <h2>2. Erhebung und Verwendung von Daten</h2>
  <p>Wir erheben personenbezogene Daten nur, wenn Sie uns diese freiwillig im Rahmen einer Kontaktaufnahme (Kontaktformular, E-Mail, Telefon) mitteilen. Diese Daten verwenden wir ausschliesslich zur Bearbeitung Ihrer Anfrage.</p>

  <h2>3. Keine Weitergabe an Dritte</h2>
  <p>Ihre personenbezogenen Daten werden nicht an Dritte weitergegeben, verkauft oder vermietet, es sei denn, Sie haben ausdrücklich zugestimmt oder wir sind gesetzlich dazu verpflichtet.</p>

  <h2>4. Hosting & Infrastruktur</h2>
  <p>Diese Website wird in der Schweiz gehostet. Die Datenverarbeitung erfolgt im Einklang mit dem Schweizer Datenschutzgesetz (DSG) sowie der EU-DSGVO, soweit anwendbar.</p>

  <h2>5. Drittdienste</h2>
  <p>Wir nutzen folgende Drittdienste:</p>
  <ul>
    <li><strong>Web3Forms</strong> (Formularversand) — Datenverarbeitung gemäss deren Datenschutzerklärung</li>
    <li><strong>Google Fonts</strong> (Schriftarten) — Schriftarten werden von Google-Servern geladen</li>
    <li><strong>Contentful</strong> (Blog-CMS) — Inhalte werden von Contentful-Servern ausgeliefert</li>
    <li><strong>Microsoft Outlook</strong> (Terminbuchung) — Terminverwaltung via Microsoft-Infrastruktur</li>
  </ul>

  <h2>6. Cookies</h2>
  <p>Diese Website verwendet keine Tracking-Cookies. Es werden lediglich technisch notwendige Cookies gesetzt, soweit dies für den Betrieb erforderlich ist.</p>

  <h2>7. Ihre Rechte</h2>
  <p>Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung Ihrer personenbezogenen Daten. Richten Sie Anfragen an: <a href="mailto:info@amplifyr.ch">info@amplifyr.ch</a></p>

  <h2>8. Änderungen</h2>
  <p>Wir behalten uns das Recht vor, diese Datenschutzerklärung jederzeit zu ändern. Die aktuelle Version ist stets auf dieser Seite abrufbar.</p>

  <p class="legal-stand">Stand: März 2026</p>

</div>
```

---

## `agb.html`

Gleiche Struktur, nur Titel und Inhalt:

```html
<!-- Head: -->
<title>AGB | amplifyr</title>
<meta name="robots" content="noindex, nofollow" />

<!-- Main-Inhalt: -->
<p class="legal-eyebrow">Rechtliches</p>
<h1 class="legal-heading">Allgemeine Geschäftsbedingungen</h1>

<div class="legal-body">

  <h2>1. Geltungsbereich</h2>
  <p>Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Dienstleistungsverträge zwischen Amplifyr GmbH (nachfolgend «Amplifyr») und ihren Kunden. Mit der Auftragserteilung akzeptiert der Kunde diese AGB.</p>

  <h2>2. Leistungsumfang</h2>
  <p>Der Umfang der Leistungen wird im jeweiligen Angebot oder Vertrag schriftlich festgelegt. Änderungen des Leistungsumfangs bedürfen der schriftlichen Zustimmung beider Parteien.</p>

  <h2>3. Preise und Zahlungsbedingungen</h2>
  <p>Alle Preise verstehen sich in Schweizer Franken (CHF) exklusive Mehrwertsteuer. Rechnungen sind innert 30 Tagen nach Rechnungsstellung zahlbar. Bei Zahlungsverzug behält sich Amplifyr das Recht vor, Verzugszinsen in gesetzlicher Höhe zu berechnen.</p>

  <h2>4. Mitwirkungspflicht des Kunden</h2>
  <p>Der Kunde stellt Amplifyr alle für die Auftragserfüllung notwendigen Informationen, Zugänge und Materialien rechtzeitig zur Verfügung. Verzögerungen, die durch fehlende Mitwirkung entstehen, gehen zu Lasten des Kunden.</p>

  <h2>5. Urheberrecht und Nutzungsrechte</h2>
  <p>Alle von Amplifyr erstellten Werke bleiben bis zur vollständigen Bezahlung Eigentum von Amplifyr. Nach vollständiger Bezahlung erhält der Kunde das nicht-exklusive Nutzungsrecht an den erstellten Werken.</p>

  <h2>6. Vertraulichkeit</h2>
  <p>Beide Parteien verpflichten sich, alle im Rahmen der Zusammenarbeit erhaltenen vertraulichen Informationen geheim zu halten und nicht an Dritte weiterzugeben.</p>

  <h2>7. Haftungsbeschränkung</h2>
  <p>Amplifyr haftet nur für Schäden, die durch grobe Fahrlässigkeit oder Vorsatz verursacht wurden. Die Haftung für mittelbare Schäden, entgangenen Gewinn oder Datenverlust ist ausgeschlossen, soweit gesetzlich zulässig.</p>

  <h2>8. Kündigung</h2>
  <p>Dauerschuldverhältnisse können von beiden Parteien mit einer Frist von 30 Tagen zum Monatsende schriftlich gekündigt werden. Das Recht zur ausserordentlichen Kündigung aus wichtigem Grund bleibt vorbehalten.</p>

  <h2>9. Anwendbares Recht und Gerichtsstand</h2>
  <p>Es gilt schweizerisches Recht. Als ausschliesslicher Gerichtsstand wird Zürich vereinbart.</p>

  <p class="legal-stand">Stand: März 2026</p>

</div>
```

---

## `page-legal.css`

```css
/* ── Legal-Seiten gemeinsames CSS ── */

.legal-main {
  background: var(--bg-white);
  min-height: 100vh;
}

.legal-container {
  max-width: 760px;
  margin-inline: auto;
  padding: calc(var(--header-h) + var(--space-12)) var(--container-px) var(--space-24);
}

.legal-eyebrow {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--steel);
  margin-bottom: var(--space-4);
}

.legal-heading {
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 900;
  color: var(--navy);
  line-height: 1.1;
  margin-bottom: var(--space-10);
}

/* Inhalt */
.legal-body {
  color: var(--text-muted);
  line-height: 1.9;
  font-size: 0.95rem;
}

.legal-body h2 {
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 700;
  color: var(--navy);
  margin-top: var(--space-8);
  margin-bottom: var(--space-3);
  padding-bottom: var(--space-2);
  border-bottom: 1px solid var(--border-light);
}

.legal-body p {
  margin-bottom: var(--space-4);
}

.legal-body ul,
.legal-body ol {
  padding-left: var(--space-6);
  margin-bottom: var(--space-4);
  list-style: disc;
}
.legal-body ol { list-style: decimal; }

.legal-body li {
  margin-bottom: var(--space-2);
}

.legal-body a {
  color: var(--navy);
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 3px;
}
.legal-body a:hover { color: var(--text-muted); }

.legal-body strong {
  color: var(--navy);
  font-weight: 700;
}

.legal-stand {
  margin-top: var(--space-10);
  font-size: 0.82rem;
  color: var(--border);
}

@media (max-width: 640px) {
  .legal-container {
    padding-inline: var(--space-5);
  }
  .legal-heading {
    font-size: clamp(1.6rem, 5vw, 2rem);
  }
}
```

---

## Regeln & Hinweise

- Alle drei Seiten: **`<meta name="robots" content="noindex, nofollow">`** — Legal-Seiten nicht indexieren
- Header: Klasse `legal-mode` (aus `style.css`) — Header ist immer weiss, nie transparent
- **Kein page-spezifisches JS** — nur `main.js` einbinden
- Inhalte (Impressum, Datenschutz, AGB) sind statisches HTML — kein dynamisches Laden
- `data-nosnippet` auf `<main>` verhindert Google-Snippet aus Legal-Texten
- Links im Datenschutz und Impressum: `href="mailto:..."` für E-Mail-Links
- Alle drei teilen `page-legal.css` — keine separate CSS-Datei pro Seite
- Stand-Datum als letzter Eintrag im Content: `<p class="legal-stand">Stand: März 2026</p>`

---

## Reale Texte & Inhalte

### impressum.html
```
Titel: Impressum
H1: Impressum
Sub: Angaben gemäss Art. 10 UWG

Firma:
  Amplifyr GmbH
  c/o Timo Steinfort
  Mettlenstrasse 11
  8142 Uitikon Waldegg
  Schweiz

Kontakt:
  E-Mail: info@amplifyr.ch
  Website: www.amplifyr.ch

Handelsregister:
  Eingetragen im Handelsregister des Kantons Zürich
  UID: CHE-435.424.644
  CH-ID: CH-020-4091641-5

Vertretungsberechtigte Personen:
  Timo Steinfort, Geschäftsführer
  David Staub, Geschäftsführer

Haftungsausschluss:
  Die Inhalte dieser Website wurden mit grösster Sorgfalt erstellt. Amplifyr GmbH übernimmt keine Gewähr für die Richtigkeit, Vollständigkeit und Aktualität der bereitgestellten Inhalte. Die Nutzung der Inhalte der Website erfolgt auf eigene Gefahr des Nutzers.
  Für externe Links zu fremden Webseiten übernimmt Amplifyr GmbH keine Verantwortung für deren Inhalte. Zum Zeitpunkt der Verlinkung waren keine rechtswidrigen Inhalte erkennbar.

Urheberrecht:
  Die auf dieser Website veröffentlichten Inhalte unterliegen dem schweizerischen Urheberrecht. Jede vom Urheberrecht nicht zugelassene Verwertung bedarf der vorherigen schriftlichen Zustimmung von Amplifyr GmbH.

Stand: März 2026
```

### datenschutz.html
```
Titel: Datenschutzerklärung
H1: Datenschutzerklärung

1. Verantwortliche Stelle
  Amplifyr GmbH, Mettlenstrasse 11, 8142 Uitikon Waldegg
  E-Mail: info@amplifyr.ch

2. Grundsatz
  Wir erheben und verarbeiten personenbezogene Daten nur, soweit dies zur Bereitstellung unserer Dienstleistungen erforderlich ist, Sie eingewilligt haben oder eine gesetzliche Grundlage besteht. Wir halten uns an die Datenschutzgesetzgebung der Schweiz (DSG) sowie, soweit anwendbar, an die DSGVO der EU.

3. Welche Daten wir erheben
  Besuchsdaten: Beim Aufruf unserer Website werden automatisch technische Daten erfasst (IP-Adresse, Browsertyp, Betriebssystem, Referrer-URL, Datum/Uhrzeit). Diese Daten werden ausschliesslich zur Sicherstellung des Betriebs verwendet und nicht mit Ihren persönlichen Daten verknüpft.
  Kontaktformular: Wenn Sie uns über das Kontaktformular schreiben, speichern wir Ihren Namen, Ihre E-Mail-Adresse und Ihre Nachricht zur Bearbeitung Ihrer Anfrage. Diese Daten werden nicht an Dritte weitergegeben.

4. Cookies
  Unsere Website verwendet ausschliesslich technisch notwendige Cookies, die für den Betrieb der Website erforderlich sind. Es werden keine Tracking- oder Marketing-Cookies gesetzt.

5. Weitergabe an Dritte
  Wir geben Ihre personenbezogenen Daten nicht ohne Ihre ausdrückliche Einwilligung an Dritte weiter, ausser dies ist zur Vertragserfüllung notwendig oder gesetzlich vorgeschrieben.

6. Speicherdauer
  Personenbezogene Daten werden nur so lange gespeichert, wie es für den jeweiligen Zweck notwendig ist oder gesetzliche Aufbewahrungspflichten bestehen.

7. Ihre Rechte
  Sie haben jederzeit das Recht auf: Auskunft über die zu Ihrer Person gespeicherten Daten / Berichtigung unrichtiger Daten / Löschung Ihrer Daten (soweit keine gesetzliche Aufbewahrungspflicht besteht) / Einschränkung der Verarbeitung / Widerspruch gegen die Verarbeitung / Datenübertragbarkeit
  Anfragen richten Sie bitte an info@amplifyr.ch.

8. Änderungen dieser Erklärung
  Wir behalten uns vor, diese Datenschutzerklärung jederzeit anzupassen. Die jeweils aktuelle Version ist auf dieser Website abrufbar.

Stand: März 2026
```

### agb.html
```
Titel: AGB
H1: Allgemeine Geschäftsbedingungen
Sub: Amplifyr GmbH, Mettlenstrasse 11, 8142 Uitikon Waldegg (nachfolgend «Amplifyr»)

§ 1 Geltungsbereich
  Diese Allgemeinen Geschäftsbedingungen gelten für alle Verträge, die zwischen Amplifyr GmbH und ihren Kunden (nachfolgend «Auftraggeber») geschlossen werden. Abweichende Bedingungen des Auftraggebers sind nur wirksam, wenn Amplifyr diesen ausdrücklich schriftlich zugestimmt hat.

§ 2 Vertragsschluss und Leistungsumfang
  Ein Vertrag kommt durch die schriftliche Auftragsbestätigung von Amplifyr oder die Erbringung der Leistung zustande. Der Leistungsumfang ergibt sich ausschliesslich aus dem schriftlichen Angebot oder der Auftragsbestätigung. Mündliche Nebenabreden sind nur wirksam, wenn sie schriftlich bestätigt werden.

§ 3 Preise und Zahlungsbedingungen
  Alle Preise verstehen sich in Schweizer Franken (CHF) zuzüglich der gesetzlichen Mehrwertsteuer. Rechnungen sind innerhalb von 30 Tagen nach Rechnungsdatum ohne Abzug zahlbar. Bei Zahlungsverzug ist Amplifyr berechtigt, Verzugszinsen von 5 % p.a. zu berechnen und die Leistungserbringung bis zum Ausgleich der offenen Forderungen einzustellen.

§ 4 Mitwirkungspflichten des Auftraggebers
  Der Auftraggeber stellt Amplifyr rechtzeitig alle für die Leistungserbringung notwendigen Informationen, Zugänge und Materialien zur Verfügung. Verzögerungen, die aus unzureichender Mitwirkung des Auftraggebers entstehen, gehen nicht zu Lasten von Amplifyr und berechtigen zur entsprechenden Anpassung von Fristen und Kosten.

§ 5 Geistiges Eigentum
  Alle von Amplifyr erstellten Werke, Konzepte und Materialien bleiben bis zur vollständigen Bezahlung Eigentum von Amplifyr. Nach vollständiger Bezahlung erhält der Auftraggeber ein nicht-exklusives Nutzungsrecht am vereinbarten Leistungsergebnis.

§ 6 Vertraulichkeit
  Beide Parteien verpflichten sich, vertrauliche Informationen der jeweils anderen Partei nicht an Dritte weiterzugeben und nur für die Durchführung des Auftrags zu nutzen. Diese Verpflichtung gilt auch nach Beendigung des Vertragsverhältnisses.

§ 7 Haftungsbeschränkung
  Amplifyr haftet nur für Schäden, die auf grober Fahrlässigkeit oder Vorsatz beruhen. Die Haftung für leichte Fahrlässigkeit sowie für entgangenen Gewinn, mittelbare Schäden und Folgeschäden ist ausgeschlossen, soweit gesetzlich zulässig. Die Gesamthaftung von Amplifyr ist auf den Wert des jeweiligen Auftrags begrenzt.

§ 8 Kündigung
  Laufende Projekte können von beiden Parteien mit einer Frist von 30 Tagen schriftlich gekündigt werden. Bereits erbrachte Leistungen sind in jedem Fall zu vergüten.

§ 9 Anwendbares Recht und Gerichtsstand
  Es gilt ausschliesslich Schweizer Recht. Gerichtsstand für alle Streitigkeiten aus oder im Zusammenhang mit diesem Vertrag ist Zürich, Schweiz.

§ 10 Salvatorische Klausel
  Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden, bleibt die Wirksamkeit der übrigen Bestimmungen davon unberührt. Die unwirksame Bestimmung ist durch eine wirksame zu ersetzen, die dem wirtschaftlichen Zweck möglichst nahekommt.

Stand: März 2026
```
