# Prompt 02 — Navigation & Footer HTML

Erstelle den exakten HTML-Code für Navigation und Footer der Amplifyr-Website.
Diese Snippets werden 1:1 in jede HTML-Seite eingefügt.

## Voraussetzungen

- style.css ist bereits vorhanden (aus Prompt 01)
- Kein Inline-CSS, keine Inline-Styles
- Vanilla JS für Interaktivität (Hamburger, Mobile-Submenüs, Scroll-Verhalten)
- Alle Texte auf Deutsch (Schweiz)

---

## Header / Desktop Navigation

### Struktur

```html
<header id="site-header" class="hero-mode">
  <div class="header-inner">
    <!-- Logo -->
    <!-- Desktop Nav -->
    <!-- Desktop CTA -->
    <!-- Hamburger (Mobile) -->
  </div>
</header>
```

### Logo

```
"ampli" in Georgia serif, font-weight 900
"fyr" italic, color var(--steel)
Link: href="/"
```

### Desktop Nav — 5 Hauptpunkte

| Label | URL |
|---|---|
| IT-Lösungen | /it-solutions |
| Betriebs-Software | /branchen-software |
| KI & Automatisierung | /ki-prozesse |
| Digitaler Auftritt | /webdesign |
| Über uns | /ueber-uns (mit Dropdown) |

- IT-Lösungen bis Digitaler Auftritt: direkte Links, KEIN Dropdown
- Über uns: hat ein Dropdown mit einem Eintrag → "Blog" (/blog.html)
- Aktiver Link bekommt Klasse `.active` — wird per JS anhand der aktuellen URL gesetzt

### Desktop CTA (rechts)

```
Label: Kundenportal
URL: https://portal.amplifyr.ch/
target="_blank", rel="noopener"
Stil: outline Button (.btn--outline)
```

### Header-Zustände (via JS-Klassen)

| Klasse | Verhalten |
|---|---|
| `.hero-mode` | Standardzustand auf Seiten mit dunklem Hero — transparenter Header, weiße Schrift |
| `.scrolled` | Ab ca. 80px Scroll-Tiefe — weißer Hintergrund, Border, Shadow, kompaktere Höhe |
| `.legal-mode` | Auf Impressum, Datenschutz, AGB — immer weißer Header, dunkel Schrift, kein hero-mode |
| `.hidden` | Beim nach-oben-scrollen — Header per transform: translateY(-100%) verstecken |

### Hamburger (Mobile)

- 3 Striche, wird zu X wenn offen
- Steuert `.mobile-menu` via `aria-expanded`
- Nur sichtbar auf Mobile (unter 768px)

---

## Mobile Menu

### Struktur

```html
<nav class="mobile-menu" id="mobile-menu" aria-label="Mobile Navigation">
  <div class="mobile-menu-header"><!-- Logo + Schliessen-Button --></div>
  <div class="mobile-menu-body"><!-- Nav-Gruppen --></div>
  <div class="mobile-menu-cta"><!-- CTA Button --></div>
</nav>
```

### Nav-Gruppen mit Sub-Items

Jede Gruppe hat:
- Einen klickbaren Hauptlink (geht direkt zur Seite)
- Einen separaten Chevron-Button zum Aufklappen der Sub-Items

| Hauptpunkt | Sub-Items (Anchor-Links) |
|---|---|
| IT-Lösungen `/it-solutions` | IT-Outsourcing `#sec-outsourcing`, Managed Services `#sec-managed`, Cloud `#sec-cloud` |
| Betriebs-Software `/branchen-software` | Ansatz `#bs-ansatz`, Vorgehen `#bs-vorgehen`, Branchen `#bs-branchen` |
| KI & Automatisierung `/ki-prozesse` | Chatbots `#sec-chatbot`, KI-Telefonie `#sec-telefonie`, Workflows `#sec-automation` |
| Digitaler Auftritt `/webdesign` | Websites & Webshops `#sec-website`, SEO `#sec-seo`, Rebrandings `#sec-rebranding` |
| Über uns `/ueber-uns` | Blog `/blog` |

### Mobile CTA

```
Label: Kundenportal
URL: https://portal.amplifyr.ch/
Stil: .btn--primary, volle Breite
```

---

## Footer

### Struktur

Einfacher einzeiliger Footer:

```html
<footer>
  <div class="container">
    <div class="footer-inner">
      <!-- Logo -->
      <!-- Copyright -->
      <!-- Links -->
    </div>
  </div>
</footer>
```

### Inhalt

- Logo: "amplifyr" (gleiche Schreibweise wie Header)
- Copyright: `© 2026 Amplifyr GmbH. Alle Rechte vorbehalten.`
- Links: Impressum `/impressum` · Datenschutz `/datenschutz` · AGB `/agb`

### Footer-Varianten (CSS-Klassen)

| Klasse | Verhalten |
|---|---|
| Standard | Dunkler Hintergrund (var(--navy)), helle Schrift |
| `.footer-light` | Heller Hintergrund, dunkle Schrift |
| `.on-image` | Für Seiten wo der Footer über einem Bild liegt — angepasste Transparenz |

---

## JavaScript (in einem einzigen `<script>` Block am Ende)

Folgende Funktionen müssen im gemeinsamen `main.js` enthalten sein:

### 1. Aktiven Nav-Link setzen
```
Vergleiche window.location.pathname mit den href-Attributen der Nav-Links.
Setze .active auf den passenden Link (Desktop + Mobile).
```

### 2. Header Scroll-Verhalten
```
- Beim Scrollen > 80px: .hero-mode entfernen, .scrolled hinzufügen
- Beim Scrollen zurück zu 0: .scrolled entfernen, .hero-mode hinzufügen (nur wenn Seite hero-mode hat)
- Beim Scrollen nach oben (Richtung erkannt): .hidden hinzufügen
- Beim Scrollen nach unten: .hidden entfernen
- Auf legal-mode Seiten: kein hero-mode, immer .legal-mode behalten
```

### 3. Hamburger / Mobile Menu
```
- Hamburger-Button toggled .open auf sich selbst und .open auf #mobile-menu
- Schliessen-Button entfernt .open
- Body bekommt overflow: hidden wenn Menü offen (kein Hintergrund-Scroll)
- ESC-Taste schliesst Menü
```

### 4. Mobile Sub-Menüs
```
- Chevron-Buttons toggeln .open auf dem zugehörigen .mobile-nav-sub
- aria-expanded wird korrekt gesetzt
- Chevron dreht sich bei .open (transform: rotate(180deg))
- Mehrere können gleichzeitig offen sein
```

### 5. animateOnScroll() Hilfsfunktion
```
Einheitliche Scroll-Animations-Funktion für alle Seiten:

function animateOnScroll(selector, options = {}) {
  // options: { threshold: 0.15, stagger: 0, delay: 0 }
  // Setzt initial opacity: 0, translateY: 20px auf Elemente
  // IntersectionObserver: beim Einblenden → opacity: 1, translateY: 0
  // Stagger: jedes Element um options.stagger ms verzögert
  // prefers-reduced-motion: sofort sichtbar, keine Animation
}

Wird von allen Seiten-Skripten (page-*.js) aufgerufen.
```

---

## Ausgabe

Gib aus:
1. Den vollständigen Header-HTML-Block (bereit zum Einsetzen)
2. Den vollständigen Mobile-Menu-HTML-Block
3. Den vollständigen Footer-HTML-Block
4. Den vollständigen `main.js` Inhalt mit allen 5 Funktionen

Kein CSS ausgeben — das kommt aus style.css.

---

## Animation-System (Spezifikation für alle Seiten)

Alle Scroll-Animationen folgen einem einheitlichen System. Die KI soll dies 1:1 übernehmen.

### Easing & Timing

```javascript
const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'; // sanftes Ease-Out

// Standard-Werte:
// Textelemente (h2, p, eyebrow): 500ms, translateY 20px → 0
// Karten/Tiles: 600ms, translateY 24px + scale(0.94) → scale(1)
// Stagger Desktop: 100–120ms zwischen Elementen
// Stagger Mobile: 60–80ms zwischen Elementen
// IntersectionObserver threshold: 0.1 – 0.15
```

### HTML-Datenattribute Pattern

Für komplexere Sektionen werden Animationen direkt per HTML-Attribut gesteuert:

```html
<div data-bsv-reveal="0"   data-bsv-dur="500" data-bsv-ty="20">  <!-- sofort, 500ms -->
<div data-bsv-reveal="100" data-bsv-dur="550" data-bsv-ty="24">  <!-- +100ms, 550ms -->
<div data-bsv-reveal="200" data-bsv-dur="600" data-bsv-ty="24" class="ms-tile"> <!-- Karte -->
```

- `data-bsv-reveal` = Basis-Delay in ms (wird × 1.6 multipliziert für sanfteres Timing)
- `data-bsv-dur` = Animations-Dauer in ms
- `data-bsv-ty` = translateY Startwert in px

### JS-Muster für data-bsv-reveal Sektionen

```javascript
(function () {
  const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';
  const section = document.getElementById('SECTION-ID');
  if (!section) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const elems = section.querySelectorAll('[data-bsv-reveal]');
  elems.forEach(el => {
    const ty = parseInt(el.dataset.bsvTy || '0', 10);
    const isCard = el.classList.contains('CARD-CLASS'); // z.B. ms-tile, cloud-card
    el.style.opacity = '0';
    el.style.transform = 'translateY(' + ty + 'px)' + (isCard ? ' scale(0.94)' : '');
    el.style.willChange = 'opacity, transform';
  });

  const obs = new IntersectionObserver(function (entries) {
    if (!entries[0].isIntersecting) return;
    obs.disconnect();
    elems.forEach(function (el) {
      const delay  = Math.round(parseInt(el.dataset.bsvReveal, 10) * 1.6);
      const dur    = parseInt(el.dataset.bsvDur, 10);
      const isCard = el.classList.contains('CARD-CLASS');
      setTimeout(function () {
        el.style.transition = 'opacity ' + dur + 'ms ' + EASE + ', transform ' + dur + 'ms ' + EASE;
        el.style.opacity    = '1';
        el.style.transform  = isCard ? 'translateY(0) scale(1)' : 'translateY(0)';
        setTimeout(function () {
          el.style.willChange = '';
          if (isCard) { el.style.transition = ''; el.style.transform = ''; }
        }, dur + 50);
      }, delay);
    });
  }, { threshold: 0.1 });
  obs.observe(section);
})();
```

### animateOnScroll() — vollständige Implementierung

```javascript
function animateOnScroll(selector, options) {
  options = options || {};
  var threshold = options.threshold || 0.15;
  var stagger   = options.stagger   || 0;
  var delay     = options.delay     || 0;
  var EASE      = 'cubic-bezier(0.22, 1, 0.36, 1)';
  var duration  = options.duration  || 500;

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var els = Array.prototype.slice.call(document.querySelectorAll(selector));
  if (!els.length) return;

  if (reduced) return; // Elemente bleiben sichtbar (kein initial-hide)

  els.forEach(function (el) {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(20px)';
    el.style.willChange = 'opacity, transform';
  });

  var triggered = false;
  var obs = new IntersectionObserver(function (entries) {
    if (triggered || !entries[0].isIntersecting) return;
    triggered = true;
    obs.disconnect();
    els.forEach(function (el, i) {
      var totalDelay = delay + i * stagger;
      setTimeout(function () {
        el.style.transition = 'opacity ' + duration + 'ms ' + EASE + ', transform ' + duration + 'ms ' + EASE;
        el.style.opacity    = '1';
        el.style.transform  = 'translateY(0)';
        setTimeout(function () { el.style.willChange = ''; }, duration + 50);
      }, totalDelay);
    });
  }, { threshold: threshold });

  obs.observe(els[0].closest('section') || els[0].parentElement || document.body);
}
```

### Sequenz-Pattern (Headlines + Cards)

Typische Reihenfolge innerhalb einer Sektion beim Einrollen:

```
0ms     — eyebrow / section-label
80ms    — h2 Zeile 1
180ms   — h2 Zeile 2 (falls zweizeilig)
280ms   — Subtext / p
450ms   — Karte/Card 1  (+ scale-Effekt)
570ms   — Karte/Card 2
690ms   — Karte/Card 3
810ms   — Karte/Card 4
(Mobile: Stagger halbieren)
```

### Hover-Effekte (CSS, keine JS-Animation)

```css
.card:hover  { transform: translateY(-3px); box-shadow: var(--shadow-md); }
.tile:hover  { transform: translateY(-2px); border-color: var(--navy); }
.step:hover  { transform: translateY(-2px); }
/* Transition immer: transform 200ms var(--ease), box-shadow 200ms var(--ease) */
/* Nach Entrance-Animation: .hover-ready Klasse setzen, erst dann CSS hover aktiv */
```
