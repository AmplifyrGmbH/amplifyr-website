# Prompt 03 — Homepage (index.html)

Erstelle die vollständige `index.html` für die Amplifyr-Website.

## Voraussetzungen

- `style.css` existiert (Prompt 01) — kein Inline-CSS, keine `<style>` Tags
- `main.js` existiert (Prompt 02) — kein `<script>` im Body ausser dem einen Verweis am Ende
- Navigation + Footer werden 1:1 aus Prompt 02 eingefügt
- Alle Bilder als `.webp`, `loading="lazy"`, `decoding="async"`
- Kein Inline-Style auf HTML-Elementen
- Page-spezifisches CSS kommt in `page-index.css` (wird im `<head>` eingebunden)
- Page-spezifisches JS kommt in `page-index.js` (wird vor `</body>` eingebunden)

---

## `<head>`

```html
<title>Amplifyr | Digitale Transformation & IT für KMU</title>
<meta name="description" content="IT-Fundament, Betriebs-Software, KI & Automatisierung und digitaler Auftritt für Schweizer KMU. Amplifyr begleitet Sie ganzheitlich in die digitale Transformation." />
```

- Google Fonts: DM Sans (300, 400, 500, 600) mit `preconnect`
- Favicon-Links (ohne .html-Endung!): favicon.ico, favicon_32x32.png, favicon_16x16.png, favicon_180x180.png, favicon_192x192.png
- Open Graph + Twitter Card Tags
- Canonical: `https://www.amplifyr.ch/`
- Sitemap: `/sitemap.xml`
- CSS-Reihenfolge: `style.css` → `page-index.css`

---

## Seitenstruktur

```
<header> (aus Prompt 02, class="hero-mode")
<nav class="mobile-menu"> (aus Prompt 02)
<main>
  Section 1: #hero
  Section 2: #philosophie
  Section 3: #ansatz
  Section 4: #leistungen
  Section 5: #team
  Section 6: #ki-check
</main>
<footer> (aus Prompt 02)
<script src="main.js">
<script src="page-index.js">
```

---

## Section 1: Hero (`#hero`)

### Verhalten
- Fullscreen (100vw × 100vh), position: fixed während Hero aktiv, dann scrollt Seite normal
- Hintergrund: Navy (`#1a2744`)
- Video läuft einmal durch — danach bleibt letztes Frame sichtbar
- Slogan erscheint während/nach dem Video

### HTML-Struktur
```html
<section id="hero" aria-label="Hero">
  <!-- SEO H1 (visuell versteckt, nur für Screenreader/SEO) -->
  <h1 class="sr-only">Amplifyr – Digitale Transformation & IT für Schweizer KMU</h1>

  <!-- Video Background -->
  <video class="hero-video" autoplay muted playsinline preload="auto">
    <source src="Animationen/Animation_Heropage.webm" type="video/webm">
    <source src="Animationen/Animation_Heropage.mp4" type="video/mp4">
  </video>

  <!-- Slogan Panel (erscheint nach Video) -->
  <div class="hero-slogan" id="hero-slogan">
    <div class="hero-phase-1" id="hero-phase-1">
      <p class="hero-line-1">Build the base.</p>
    </div>
    <div class="hero-divider" id="hero-divider" aria-hidden="true"></div>
    <div class="hero-phase-2" id="hero-phase-2">
      <p class="hero-line-2">Lead the race.</p>
    </div>
  </div>

  <!-- Fade Overlay (Navy) -->
  <div class="hero-fadeout" id="hero-fadeout" aria-hidden="true"></div>

  <!-- Scroll Cue -->
  <div class="hero-scroll-cue" id="hero-scroll-cue" aria-hidden="true">
    <div class="scroll-mouse">
      <div class="scroll-wheel"></div>
    </div>
  </div>
</section>
```

### Animation (in page-index.js)
- Video endet → Slogan einblenden (Phase 1 zuerst, dann Trennlinie, dann Phase 2)
- Scroll-Cue erscheint nach Slogan
- Beim ersten Scrollen: Hero fadeout → Seite wird normal scrollbar
- Header wechselt von `hero-mode` zu `scrolled`

---

## Section 2: Philosophie (`#philosophie`)

### Verhalten
- 100vh, Navy-Hintergrund
- Texte erscheinen sequentiell beim Einblenden der Sektion (Scroll-getriggert via IntersectionObserver)
- Reihenfolge: L1 → L2+L3 zusammen → L4

### HTML-Struktur
```html
<section id="philosophie" aria-label="Philosophie">
  <div class="phil-inner">
    <p class="phil-l1">Die Welt digitalisiert sich.</p>
    <div class="phil-sub">
      <p class="phil-l2">Schreiten Sie voran –</p>
      <p class="phil-l3">oder verlieren Sie den Anschluss?</p>
    </div>
    <p class="phil-l4">
      <span class="phil-white">Build the base.</span>
      <em class="phil-steel">Lead the race.</em>
    </p>
  </div>
  <div class="phil-scroll-hint" id="phil-scroll-hint" aria-hidden="true">
    <!-- Doppel-Chevron SVG nach unten -->
  </div>
</section>
```

### Typografie
- `phil-l1`: Georgia, clamp(1.6rem, 3vw, 2.6rem), weight 900, weiß
- `phil-l2` + `phil-l3`: Georgia, italic, clamp(1.2rem, 2.2vw, 1.9rem), weiß
- `phil-l4`: Georgia, italic, clamp(1.6rem, 3vw, 2.6rem), `phil-white` = weiß normal, `phil-steel` = var(--steel)

---

## Section 3: Ansatz (`#ansatz`)

### Verhalten
- Weißer Hintergrund
- Grafik und Texte erscheinen beim Scrollen (IntersectionObserver)

### HTML-Struktur
```html
<section id="ansatz" aria-label="Unser Ansatz">
  <div class="container">

    <div class="ansatz-header">
      <h2><span class="ansatz-hl1">Wir verbinden</span><br><span class="ansatz-hl2 text-steel">IT, Software und KI.</span></h2>
    </div>

    <div class="ansatz-visual">
      <!-- Links: Chaos -->
      <div class="ansatz-left">
        <p class="ansatz-label">Insellösungen</p>
        <img src="Bilder/Chaos1.webp" alt="Insellösungen – Chaos" loading="lazy" decoding="async">
      </div>
      <!-- Mitte: Klammer -->
      <div class="ansatz-brace">
        <img src="Bilder/Klammer_fein.webp" alt="" aria-hidden="true" loading="lazy" decoding="async">
      </div>
      <!-- Rechts: Zahnräder -->
      <div class="ansatz-right">
        <p class="ansatz-label ansatz-label--right">Unser Ansatz</p>
        <img src="Bilder/Zahnräder.webp" alt="Business Amplification System" loading="lazy" decoding="async">
      </div>
    </div>

    <p class="ansatz-closing">
      <span class="ansatz-closing-1">So wird aus Verbindung</span><br>
      <span class="ansatz-closing-2 text-steel">echte Verstärkung.</span>
    </p>

  </div>
</section>
```

---

## Section 4: Leistungen (`#leistungen`)

### Verhalten
- Navy-Hintergrund
- Hintergrundbild `Bild_Landingpage_03.webp` mit Overlay (opacity 0.18, Gradient zu Navy)
- 4 Schritte erscheinen gestaffelt beim Scrollen

### HTML-Struktur
```html
<section id="leistungen" aria-label="Business Amplification Leistungen">

  <div class="leis-bg" aria-hidden="true">
    <img src="Bilder/Bild_Landingpage_03.webp" alt="" loading="lazy" decoding="async">
  </div>

  <div class="container">

    <div class="leis-header">
      <h2>Business <em class="text-steel">Amplification</em></h2>
      <p class="leis-sub">Unternehmerisch. Ganzheitlich. Strukturiert.</p>
    </div>

    <p class="leis-intro">„Amplification" (zu deutsch: Verstärkung) entsteht, wenn IT, Software und KI stabil zusammenspielen. Deshalb bauen wir zuerst das Fundament — und nennen unseren Ansatz: Business Amplification.</p>

    <div class="leis-grid">

      <div class="leis-step">
        <div class="leis-step-num">01</div>
        <p class="leis-step-phase">Fundament</p>
        <h3 class="leis-step-title">IT-Lösungen</h3>
        <p>Stabile Technik, die einfach funktioniert. Wir sichern Ihr Netzwerk und Ihre Daten, damit Ihr Betrieb jederzeit reibungslos läuft.</p>
      </div>

      <div class="leis-step">
        <div class="leis-step-num">02</div>
        <p class="leis-step-phase">Struktur</p>
        <h3 class="leis-step-title">Betriebs-Software</h3>
        <p>Die passenden Werkzeuge für Ihren Alltag. Wir finden und integrieren die Software, die genau zu Ihren Abläufen passt – vom Angebot bis zur Abrechnung.</p>
      </div>

      <div class="leis-step">
        <div class="leis-step-num">03</div>
        <p class="leis-step-phase">Effizienz</p>
        <h3 class="leis-step-title">KI & Automatisierung</h3>
        <p>Intelligente Lösungen, die Zeit sparen. Wir automatisieren zeitraubende Routineaufgaben dort, wo es Sie und Ihr Team spürbar entlastet.</p>
      </div>

      <div class="leis-step">
        <div class="leis-step-num">04</div>
        <p class="leis-step-phase">Wirkung</p>
        <h3 class="leis-step-title">Digitaler Auftritt</h3>
        <p>Professionelle Aussenwirkung, die überzeugt. Wir sorgen dafür, dass Sie online so stark und glaubwürdig wahrgenommen werden, wie Sie vor Ort arbeiten.</p>
      </div>

    </div>
  </div>
</section>
```

### CSS-Details (in page-index.css)
- `.leis-bg img`: position absolute, inset 0, object-fit cover, opacity 0.18
- `.leis-bg::after`: Gradient-Overlay `linear-gradient(to bottom, rgba(26,39,68,0.4) 0%, rgba(26,39,68,0.95) 100%)`
- `.leis-step-num`: Kreis 48×48px, border 1.5px solid rgba(176,196,222,0.45), Georgia, color var(--steel)
- `.leis-step-phase`: 0.65rem, uppercase, letter-spacing 0.2em, color rgba(176,196,222,0.5)
- `.leis-grid`: 4 Spalten auf Desktop, 2 auf Tablet, 1 auf Mobile
- Hover auf `.leis-step`: translateY(-2px)

---

## Section 5: Team (`#team`)

### HTML-Struktur
```html
<section id="team" aria-label="Das Team">
  <div class="container">

    <div class="team-header">
      <h2><span class="team-hl1">Drei Perspektiven.</span><br><em>Eine digitale Basis.</em></h2>
    </div>

    <div class="team-visual">
      <img src="Bilder/drei-welten.webp"
           alt="Amplifyr – Drei Welten: Markt & Strategie, Prozesse & Data Science, Systeme & Engineering"
           width="800" height="800"
           loading="lazy" decoding="async">
    </div>

    <div class="team-grid">

      <div class="team-col team-col--markt">
        <p class="team-col-role">Markt & Strategie</p>
        <div class="team-col-person-row">
          <img class="team-avatar" src="Bilder/portrait-timo.webp" alt="Timo Steinfort" width="80" height="80" loading="lazy" decoding="async">
          <p class="team-col-name">Timo Steinfort</p>
        </div>
        <p class="team-col-desc">Über 10 Jahre Erfahrung aus verschiedenen Branchen – von Finanzen und Versicherung bis Immobilien.</p>
      </div>

      <div class="team-col team-col--data">
        <p class="team-col-role">Prozesse & Data Science</p>
        <div class="team-col-person-row">
          <img class="team-avatar" src="Bilder/portrait-david.webp" alt="David Staub" width="80" height="80" loading="lazy" decoding="async">
          <p class="team-col-name">David Staub</p>
        </div>
        <p class="team-col-desc">Umfassende Erfahrung an der Schnittstelle von Ingenieursdenken, Wirtschaft und Data Science.</p>
      </div>

      <div class="team-col team-col--eng">
        <p class="team-col-role">Systeme & Engineering</p>
        <div class="team-col-person-row">
          <!-- Platzhalter: kein Foto vorhanden, SVG-Person-Icon verwenden -->
          <div class="team-avatar team-avatar--placeholder" aria-hidden="true">
            <!-- Person SVG inline -->
          </div>
          <p class="team-col-name">Sinus Cosinus</p>
        </div>
        <p class="team-col-desc">Mehr als 10 Jahre Praxis in System Engineering, Cloud-Infrastruktur und KMU-IT.</p>
      </div>

    </div>
  </div>
</section>
```

### CSS-Details (in page-index.css)
- `.team-col`: Padding oben, border-top 4px solid
- `.team-col--markt`: border-color `#b8af9c`
- `.team-col--data`: border-color `var(--steel)`
- `.team-col--eng`: border-color `#2b4274`
- `.team-avatar--eng`: object-position center 18%
- Hover auf `.team-col`: translateY(-2px)

---

## Section 6: KI-Potenzial-Check (`#ki-check`)

### Verhalten
- Navy, min-height: 100vh
- Interaktives Formular mit KI-Analyse
- Ruft `ai-check.php` auf (POST, JSON)
- Ergebnis in 3 Stufen: zu kurz / Mini-Analyse / Voll-Analyse

### HTML-Struktur
```html
<section id="ki-check" aria-label="KI-Potenzial-Check">
  <div class="kic-wrap">

    <h2 class="kic-heading" id="kic-heading">Wo verliert Ihr Betrieb am meisten Zeit?</h2>
    <p class="kic-sub" id="kic-sub">Beschreiben Sie eine Herausforderung in Ihrem Betrieb:</p>

    <!-- Eingabe -->
    <div class="kic-field" id="kic-field">
      <div class="kic-input-shell" id="kic-input-shell">
        <div class="kic-shell-top">
          <div class="kic-shell-inner">
            <!-- Spark Icon (SVG) -->
            <textarea id="kic-input" class="kic-textarea" rows="2" aria-label="Ihre Herausforderung"></textarea>
          </div>
          <button class="kic-submit-btn" id="kic-submit" aria-label="Analyse starten">
            <!-- Pfeil Icon -->
          </button>
        </div>
        <!-- Beispiel-Chips -->
        <div class="kic-chips" id="kic-chips">
          <button class="kic-chip" type="button">Rechnungsprüfung ist ein Chaos …</button>
          <button class="kic-chip" type="button">Angebote dauern zu lange …</button>
          <button class="kic-chip" type="button">Zu viele manuelle Aufgaben …</button>
        </div>
      </div>
    </div>

    <!-- Status-Anzeige (während Analyse läuft) -->
    <div id="kic-status" aria-live="polite" hidden>
      <span class="kic-status-dot"></span>
      <span id="kic-status-text"></span>
    </div>

    <!-- Thinking-Dots -->
    <div id="kic-thinking" aria-live="polite" aria-label="Analyse wird erstellt" hidden>
      <span class="kic-dot"></span>
      <span class="kic-dot"></span>
      <span class="kic-dot"></span>
    </div>

    <!-- Ergebnis -->
    <div id="kic-result" role="region" aria-label="Analyse-Ergebnis" hidden>

      <!-- Tier 1: Eingabe zu kurz (<15 Zeichen) -->
      <div id="kic-tier-1" hidden>
        <p id="kic-tier1-text">Das ist noch etwas knapp. Meinen Sie eher einen Prozess, ein Tool oder eine wiederkehrende Aufgabe?</p>
        <div id="kic-tier1-choices"></div>
      </div>

      <!-- Tier 2: Mini-Analyse (15–119 Zeichen) -->
      <div id="kic-tier-2" hidden>
        <p id="kic-tier2-text"></p>
        <p class="kic-result-label">Mögliche Ursachen</p>
        <ul id="kic-tier2-causes"></ul>
        <div id="kic-tier2-choices"></div>
      </div>

      <!-- Tier 3: Voll-Analyse (120+ Zeichen) -->
      <div id="kic-tier-3" hidden>
        <!-- Score Ring + Bottlenecks + Schritte -->
        <div id="kic-score-ring"><!-- SVG Circle --></div>
        <ul id="kic-bottlenecks"></ul>
        <p id="kic-potential"></p>
        <ul id="kic-steps"></ul>
        <!-- Lead-Formular -->
        <div id="kic-lead">
          <input type="email" id="kic-email" placeholder="Ihre E-Mail-Adresse" autocomplete="email">
          <button id="kic-lead-btn">Vollanalyse erhalten</button>
        </div>
        <div id="kic-lead-success" hidden>
          <!-- Erfolgs-Meldung -->
        </div>
      </div>

    </div>
  </div>
</section>
```

### JS-Logik (in page-index.js)

```
const AI_CHECK_URL = 'ai-check.php';
const WEBFORMS_KEY = '[KEY]'; // web3forms.com Access Key

1. Chip-Klick → füllt Textarea
2. Submit → liest Textarea-Wert
   - < 15 Zeichen → Tier 1 direkt zeigen (kein API-Call)
   - 15–119 Zeichen → API-Call zu ai-check.php, dann Tier 2
   - 120+ Zeichen → API-Call zu ai-check.php, dann Tier 3
3. Während API-Call: Status-Text + Thinking-Dots anzeigen
4. Nach Ergebnis: Eingabe-Feld verstecken, Ergebnis einblenden
5. Lead-Formular Submit → POST zu web3forms.com
```

---

## Scroll-Animationen (in page-index.js)

Alle Sektionen nutzen dieselbe Hilfsfunktion:

```js
function animateOnScroll(elements, options) {
  // IntersectionObserver
  // options: { threshold, stagger, delay, onVisible }
  // Respektiert prefers-reduced-motion: wenn aktiv → sofort sichtbar, keine Animation
}
```

Anwendung pro Sektion:
- `#philosophie`: L1 → L2+L3 → L4, je 700ms Delay
- `#ansatz`: Headline → Visual → Closing, gestaffelt
- `#leistungen`: Headline → Intro → Steps 01-04 je 180ms gestaffelt
- `#team`: Headline → Grafik → Spalten je 150ms gestaffelt

---

## Was NICHT in diese Datei gehört

- Kein `<style>` Tag im Body
- Kein Inline-`style="..."` auf Elementen
- Kein `<script>` im Body (ausser den zwei Einbindungen am Ende)
- Kein CSS für andere Seiten

---

## Ausgabe

Gib aus:
1. `index.html` — vollständig, sauber, ohne Inline-Styles
2. `page-index.css` — alle seitenspezifischen Styles
3. `page-index.js` — Hero-Animation, PBS-Animation, alle Scroll-Animationen, KI-Check Logik

---

## Reale Texte & Inhalte

Verwende exakt diese Texte für die jeweiligen Sektionen:

### `<title>` & Meta
```
Titel: Amplifyr | Digitale Transformation & IT für KMU
Description: IT-Fundament, Betriebs-Software, KI & Automatisierung und digitaler Auftritt für Schweizer KMU. Amplifyr begleitet Sie ganzheitlich in die digitale Transformation.
```

### Hero
```
Eyebrow: Amplifyr – Digitale Transformation & IT für Schweizer KMU
H1 Zeile 1: Build the base.
H1 Zeile 2: Lead the race.
Subtext Zeile 1: Die Welt digitalisiert sich.
Subtext Zeile 2: Schreiten Sie voran — oder verlieren Sie den Anschluss?
```

### Sektion: Business Amplification (Philosophie)
```
Eyebrow: Unser Ansatz
H2: So wird aus Verbindung echte Verstärkung.
Subheading: Business Amplification
Badge: Unternehmerisch. Ganzheitlich. Strukturiert.
Text: „Amplification" (zu deutsch: Verstärkung) entsteht, wenn IT, Software und KI stabil zusammenspielen. Deshalb bauen wir zuerst das Fundament — und nennen unseren Ansatz: Business Amplification.
```

### Sektion: Ansatz — 4 Leistungskarten
```
Karte 1:
  Tag: Fundament
  Titel: IT-Lösungen
  Text: Stabile Technik, die einfach funktioniert. Wir sichern Ihr Netzwerk und Ihre Daten, damit Ihr Betrieb jederzeit reibungslos läuft.

Karte 2:
  Tag: Struktur
  Titel: Betriebs-Software
  Text: Die passenden Werkzeuge für Ihren Alltag. Wir finden und integrieren die Software, die genau zu Ihren Abläufen passt – vom Angebot bis zur Abrechnung.

Karte 3:
  Tag: Effizienz
  Titel: KI & Automatisierung
  Text: Intelligente Lösungen, die Zeit sparen. Wir automatisieren zeitraubende Routineaufgaben dort, wo es Sie und Ihr Team spürbar entlastet.

Karte 4:
  Tag: Wirkung
  Titel: Digitaler Auftritt
  Text: Professionelle Aussenwirkung, die überzeugt. Wir sorgen dafür, dass Sie online so stark und glaubwürdig wahrgenommen werden, wie Sie vor Ort arbeiten.
```

### Sektion: Team
```
H2: Drei Perspektiven. Eine digitale Basis.

Person 1:
  Rolle: Markt & Strategie
  Name: Timo Steinfort
  Text: Über 10 Jahre Erfahrung aus verschiedenen Branchen – von Finanzen und Versicherung bis Immobilien.

Person 2:
  Rolle: Prozesse & Data Science
  Name: David Staub
  Text: Umfassende Erfahrung an der Schnittstelle von Ingenieursdenken, Wirtschaft und Data Science.

Person 3:
  Rolle: Systeme & Engineering
  Name: Sinus Cosinus
  Text: Mehr als 10 Jahre Praxis in System Engineering, Cloud-Infrastruktur und KMU-IT.
```

### Sektion: KI-Check (#ki-check)
```
H2: Wo verliert Ihr Betrieb am meisten Zeit?
Label: Beschreiben Sie eine Herausforderung in Ihrem Betrieb:
Placeholder-Beispiele (im Chat-Verlauf): 
  "Rechnungsprüfung ist ein Chaos …"
  "Angebote dauern zu lange …"
  "Zu viele manuelle Aufgaben …"
Antwort der KI: "Das ist noch etwas knapp. Meinen Sie eher einen Prozess, ein Tool oder eine wiederkehrende Aufgabe?"
Ergebnis-Labels: Mögliche Ursachen / Ihre Eingabe / Erste Einschätzung / Wo es stockt / Was das wirklich kostet / Eine Frage dazu
Potenzial-Tooltip: Basierend auf öffentlichen Studien zu Automatisierungspotenzialen, ergänzt durch KMU-Faktoren wie Budget, Datenqualität, Systemlandschaft und Umsetzbarkeit.
Label Studienbasierter Orientierungswert: Automatisierbar
CTA nach Ergebnis: Kostenlose Einschätzung anfragen →
Sub-CTA: Kein Spam. Wir melden uns innerhalb von 24 Stunden.
Danke-Nachricht: Vielen Dank — wir melden uns bald bei Ihnen.
```
