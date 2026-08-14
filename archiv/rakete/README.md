# Rakete / Floating CTA Teaser — Archiv

Entfernt im August 2026. Alle Dateien vollständig aus Git-History wiederhergestellt.

## Dateien
| Datei | Inhalt |
|-------|--------|
| `rakete.html` | Das `<div id="ba-chat-teaser">` Widget |
| `rakete.css` | Alle `.ba-teaser-*` Styles + `@keyframes` |
| `rakete.js` | Die `initBaTeaser` IIFE |

## Wieder einbauen

### 1. HTML
Auf jeder gewünschten Seite vor `</body>` einfügen (war auf allen Seiten ausser handwerker.html):
```html
<div id="ba-chat-teaser" aria-hidden="true">
  <button class="ba-teaser-pill" id="ba-teaser-btn" type="button"
          aria-label="KI-Potenzialcheck starten">
    <div class="ba-teaser-rocket-wrap" aria-hidden="true">
      <picture>
        <source srcset="/Bilder/rakete_teaser.webp" type="image/webp">
        <img class="ba-teaser-rocket" src="/Bilder/rakete_teaser.png" alt="" loading="lazy" decoding="async" width="1024" height="1024">
      </picture>
    </div>
    <span class="ba-teaser-label">Ihr Problem? Unsere KI-Lösung!</span>
  </button>
</div>
```

### 2. CSS
Inhalt von `rakete.css` in `style.css` einfügen (nach den anderen Widget-Styles).

### 3. JS
Inhalt von `rakete.js` am Ende von `main.js` einfügen.

## Verhalten
- Erscheint 3 Sekunden nach Seitenload (oder wenn Hero `.fsh` aus dem Viewport scrollt)
- Wackelt alle 8 Sekunden
- Versteckt sich beim Scrollen kurz (600ms)
- Klick → navigiert zu `/#ki-check`
- Auf Homepage (`/`) und `/index.html` wird er **nicht** angezeigt
