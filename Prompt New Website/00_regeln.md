# Regeln — Amplifyr Website Rebuild

Lies diese Datei **zuerst und vollständig** bevor du irgendetwas baust.
Jede Regel gilt für alle Dateien, keine Ausnahmen ausser explizit dokumentiert.

---

## Dateistruktur

```
style.css          ← gemeinsames CSS (alle Seiten)
main.js            ← gemeinsames JS (alle Seiten)
page-*.css         ← seitenspezifisches CSS (nur diese Seite)
page-*.js          ← seitenspezifisches JS (nur diese Seite)
*.html             ← kein <style>, kein <script> ausser den zwei Referenzen am Ende
```

Jede HTML-Seite endet mit:
```html
  <script src="/main.js"></script>
  <script src="/page-NAME.js"></script>
</body>
```

---

## Absolutes Verbot — diese Fehler sind inakzeptabel

❌ **Kein Inline-CSS** — kein `style="..."` auf HTML-Elementen
   Ausnahmen (explizit dokumentiert):
   - `style="--tile-img: url(...)"` auf Managed Services Tiles
   - `style="--h: X%"` auf `.wdf-bar` Elementen (Webdesign SEO-Balken)

❌ **Kein `<style>`-Tag** im HTML — weder im `<head>` noch im `<body>`

❌ **Kein `<script>`-Block** mit Code im HTML-Body — nur `<script src="...">` Referenzen

❌ **Keine hardcodierten Farben** — immer CSS Custom Properties aus `:root`
   Falsch: `color: #1a2744`
   Richtig: `color: var(--navy)`

❌ **Keine `.html`-Endung in Links** — Clean URLs überall
   Falsch: `href="/it-solutions.html"`
   Richtig: `href="/it-solutions"`
   Ausnahme: `href="/blog-post.html"` (Template-Link, bleibt so)

❌ **Keine relativen Bildpfade** — immer absolut mit führendem `/`
   Falsch: `src="Bilder/foto.webp"` oder `src="../Bilder/foto.webp"`
   Richtig: `src="/Bilder/foto.webp"`

❌ **Kein Framework, kein Tailwind, kein jQuery** — reines Vanilla HTML/CSS/JS

❌ **Kein page-spezifisches CSS in `style.css`** — gehört in `page-*.css`

❌ **Kein page-spezifisches JS in `main.js`** — gehört in `page-*.js`

---

## Pflicht auf allen Bildern

```html
<img src="/Bilder/..." alt="..." loading="lazy" decoding="async">
```

---

## Pflicht auf allen Videos (Hero)

```html
<video autoplay muted playsinline loop>
  <source src="/Animationen/Animation_NAME.webm" type="video/webm">
  <source src="/Animationen/Animation_NAME.mp4"  type="video/mp4">
</video>
```
Homepage-Hero: `loop` weglassen (Video läuft einmalig durch).
Alle anderen Seiten: `loop` behalten.

---

## CSS-Regeln

- **Mobile-first**: zuerst mobile Styles, dann `@media (min-width: 768px)`, dann `@media (min-width: 1200px)`
- Alle Abstände über CSS Custom Properties: `var(--space-4)`, `var(--space-8)` etc.
- Alle Schatten über: `var(--shadow-sm)`, `var(--shadow)`, `var(--shadow-md)`, `var(--shadow-lg)`
- Alle border-radius über: `var(--radius-sm)`, `var(--radius)`, `var(--radius-md)`, `var(--radius-lg)`, `var(--radius-pill)`

---

## Animations-Regeln

- Easing immer: `cubic-bezier(0.22, 1, 0.36, 1)` (kein `ease`, kein `ease-out`)
- Textelemente: `opacity 0→1` + `translateY(20px→0)`, 500ms
- Karten/Tiles: zusätzlich `scale(0.94→1)`, 600ms
- Stagger Desktop: 100–120ms, Mobile: 60–80ms
- Immer `prefers-reduced-motion: reduce` abfangen — dann keine Animation
- Hover erst nach Entrance-Animation aktivieren (`.hover-ready` Klasse setzen)

---

## Floating CTA (auf jeder Seite)

Jede HTML-Seite braucht direkt vor `</body>` das Floating CTA Snippet:
```html
<!-- Floating CTA: Raketen-Teaser -->
<div id="ba-chat-teaser" aria-hidden="true">
  <button class="ba-teaser-pill" id="ba-teaser-btn" type="button"
          aria-label="KI-Potenzialcheck starten">
    <div class="ba-teaser-rocket-wrap" aria-hidden="true">
      <img class="ba-teaser-rocket" src="/Bilder/rakete_teaser.png" alt="">
    </div>
    <span class="ba-teaser-label">2-Min-Check gefällig?</span>
  </button>
</div>
```
Auf `index.html`: Optional weglassen (KI-Check ist dort bereits sichtbar).

---

## Reihenfolge der Prompts

Bearbeite die Prompts **strikt in dieser Reihenfolge** — jede Datei baut auf der vorherigen auf:

1. `01_design-system-css.md` → erstellt `style.css`
2. `02_navigation-footer.md` → erstellt `main.js` + Header/Footer HTML-Snippets
3. `03_homepage-index.md` → erstellt `index.html` + `page-index.css` + `page-index.js`
4. `04_it-solutions.md` → erstellt `it-solutions.html` + `page-it-solutions.css` + `page-it-solutions.js`
5. `05_branchen-software.md` → erstellt `branchen-software.html` + CSS + JS
6. `06_ki-prozesse.md` → erstellt `ki-prozesse.html` + CSS + JS
7. `07_webdesign.md` → erstellt `webdesign.html` + CSS + JS
8. `08_ueber-uns.md` → erstellt `ueber-uns.html` + CSS + JS
9. `09_formular.md` → erstellt `formular.html` + CSS + JS
10. `10_blog.md` → erstellt `blog.html` + `blog-post.html` + CSS + JS
11. `11_legal.md` → erstellt `impressum.html`, `datenschutz.html`, `agb.html` + `page-legal.css`
12. `12_htaccess-seo.md` → erstellt `.htaccess`, `robots.txt`, `sitemap.xml`
13. `13_floater-cta.md` → ergänzt CSS + JS für Floating CTA in `style.css` + `main.js`

---

## Qualitäts-Checkliste vor jeder Ausgabe

Bevor du eine Datei ausgibst, prüfe:
- [ ] Kein einziges `style="..."` Attribut (ausser dokumentierte Ausnahmen)
- [ ] Kein `<style>` Tag
- [ ] Kein JS-Code direkt im HTML (nur `<script src="...">`)
- [ ] Alle Links ohne `.html` Endung
- [ ] Alle Bildpfade mit führendem `/`
- [ ] Alle `<img>` mit `loading="lazy" decoding="async"`
- [ ] Floating CTA vor `</body>` vorhanden
- [ ] Mobile-first CSS in `page-*.css`
- [ ] Easing: `cubic-bezier(0.22, 1, 0.36, 1)` überall
