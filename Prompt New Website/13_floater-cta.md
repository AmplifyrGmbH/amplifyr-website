# Prompt 13 — Floating CTA (`#ba-chat-teaser`) als shared Komponente

## Kontext & Ziel

Der Floating CTA ist ein **Raketen-Button** der auf jeder Seite unten rechts erscheint.
Er erscheint nach 10 Sekunden, wackelt alle 8 Sekunden und versteckt sich während des Scrollens.
Beim Klick navigiert er zum KI-Potenzialcheck (`/#ki-check`).

Da er auf **allen Seiten** erscheint, gehört er in:
- `style.css` → CSS-Regeln (`.ba-teaser-*`)
- `main.js` → JS-Logik (Timing, Wiggle, Scroll-Hide)
- Jede `*.html` Datei → HTML-Snippet vor `</body>`

---

## HTML-Snippet (in jede Seite vor `</body>` einfügen)

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

**Hinweis:** `src` mit absolutem Pfad `/Bilder/rakete_teaser.png` — funktioniert auf allen Unterseiten.

---

## CSS (in `style.css` am Ende des Utility-Bereichs)

```css
/* ============================================================
   FLOATING CTA — Raketen-Teaser (alle Seiten)
============================================================ */
#ba-chat-teaser {
  position: fixed;
  right: 12px;
  bottom: 12px;
  opacity: 0;
  pointer-events: none;
  z-index: 1000;
  transition: opacity 600ms ease;
}
#ba-chat-teaser.ba-teaser-visible {
  opacity: 1;
  pointer-events: auto;
}
#ba-chat-teaser.ba-scroll-hidden {
  opacity: 0 !important;
  pointer-events: none !important;
}

/* Pill-Button */
.ba-teaser-pill {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}

/* Raketen-Wrapper mit CSS-Flammen-Effekt */
.ba-teaser-rocket-wrap {
  position: relative;
  width: 116px;
  height: 116px;
  left: -8px;
}
.ba-teaser-rocket-wrap::before,
.ba-teaser-rocket-wrap::after {
  content: '';
  position: absolute;
  transform-origin: center top;
  pointer-events: none;
  border-radius: 40% 40% 50% 50% / 10% 10% 90% 90%;
}
/* Äussere Flamme */
.ba-teaser-rocket-wrap::before {
  width: 24px;
  height: 38px;
  top: 70px;
  left: 47px;
  background: linear-gradient(to bottom, #ff8800 0%, #ff4400 40%, #ff1100 70%, transparent 100%);
  filter: blur(2.5px);
  transform: rotate(45deg);
  animation: ba-flame-a 0.5s ease-in-out infinite alternate;
}
/* Innere Flamme */
.ba-teaser-rocket-wrap::after {
  width: 12px;
  height: 24px;
  top: 72px;
  left: 50px;
  background: linear-gradient(to bottom, #ffffff 0%, #ffee66 30%, #ffaa00 70%, transparent 100%);
  filter: blur(1px);
  transform: rotate(45deg);
  animation: ba-flame-b 0.65s ease-in-out infinite alternate;
}

.ba-teaser-rocket {
  width: 116px;
  height: 116px;
  object-fit: contain;
  display: block;
  filter: drop-shadow(0 6px 16px rgba(26, 39, 68, 0.25));
  transition: filter 200ms;
  position: relative;
  z-index: 1;
}
.ba-teaser-pill:hover .ba-teaser-rocket {
  filter: drop-shadow(0 10px 24px rgba(26, 39, 68, 0.4));
}

.ba-teaser-label {
  font-family: var(--font-body, sans-serif);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--navy);
  background: #ffffff;
  border-radius: var(--radius-pill);
  padding: 3px 12px;
  text-align: center;
  line-height: 1.2;
  white-space: nowrap;
  position: relative;
  top: -6px;
  left: -15px;
  box-shadow: var(--shadow-sm);
}

/* Bounce-In Animation (beim ersten Erscheinen) */
@keyframes ba-teaser-bounce-in {
  0%   { transform: translateY(-90px); animation-timing-function: ease-in; }
  52%  { transform: translateY(14px);  animation-timing-function: ease-out; }
  68%  { transform: translateY(-10px); animation-timing-function: ease-in; }
  82%  { transform: translateY(6px);   animation-timing-function: ease-out; }
  92%  { transform: translateY(-3px);  animation-timing-function: ease-in; }
  100% { transform: translateY(0); }
}
#ba-chat-teaser.ba-teaser-visible .ba-teaser-pill {
  animation: ba-teaser-bounce-in 0.85s ease forwards;
}

/* Wiggle-Animation (alle 8 Sekunden) */
@keyframes ba-teaser-wiggle {
  0%, 100% { transform: rotate(0deg); }
  20%      { transform: rotate(-12deg); }
  40%      { transform: rotate(12deg); }
  60%      { transform: rotate(-7deg); }
  80%      { transform: rotate(7deg); }
}
#ba-chat-teaser.ba-teaser-wiggle .ba-teaser-rocket {
  animation: ba-teaser-wiggle 0.6s ease;
}

/* Flammen-Animationen */
@keyframes ba-flame-a {
  0%   { transform: rotate(45deg) scaleY(1.0);  opacity: 0.9; }
  25%  { transform: rotate(45deg) scaleY(1.06); opacity: 1;   }
  50%  { transform: rotate(45deg) scaleY(0.97); opacity: 0.93;}
  75%  { transform: rotate(45deg) scaleY(1.04); opacity: 1;   }
  100% { transform: rotate(45deg) scaleY(1.0);  opacity: 0.92;}
}
@keyframes ba-flame-b {
  0%   { transform: rotate(45deg) scaleY(0.97); opacity: 0.85;}
  30%  { transform: rotate(45deg) scaleY(1.05); opacity: 0.98;}
  60%  { transform: rotate(45deg) scaleY(0.99); opacity: 0.88;}
  100% { transform: rotate(45deg) scaleY(1.03); opacity: 0.95;}
}

/* Mobile: 70% skalieren */
@media (max-width: 768px) {
  #ba-chat-teaser {
    transform: scale(0.70);
    transform-origin: bottom right;
    transition: opacity 600ms ease, transform 300ms ease;
  }
}

/* prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  .ba-teaser-rocket-wrap::before,
  .ba-teaser-rocket-wrap::after,
  #ba-chat-teaser.ba-teaser-visible .ba-teaser-pill,
  #ba-chat-teaser.ba-teaser-wiggle .ba-teaser-rocket {
    animation: none;
  }
}
```

---

## JS (in `main.js` am Ende)

```javascript
// ── Floating CTA: Raketen-Teaser ─────────────────────────────
(function initBaTeaser() {
  const teaser = document.getElementById('ba-chat-teaser');
  const btn    = document.getElementById('ba-teaser-btn');
  if (!teaser || !btn) return;

  // Nach 10 Sekunden einblenden (Bounce-In via CSS)
  let wiggleTimer;
  setTimeout(function () {
    teaser.classList.add('ba-teaser-visible');

    // Wiggle alle 8 Sekunden starten (1.8s nach Erscheinen)
    function startWiggle() {
      teaser.classList.add('ba-teaser-wiggle');
      setTimeout(function () {
        teaser.classList.remove('ba-teaser-wiggle');
      }, 600);
      wiggleTimer = setTimeout(startWiggle, 8000);
    }
    setTimeout(startWiggle, 1800);
  }, 10000);

  // Beim Scrollen: kurz ausblenden, nach 600ms wieder einblenden
  let scrollTimer = null;
  window.addEventListener('scroll', function () {
    teaser.classList.add('ba-scroll-hidden');
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(function () {
      teaser.classList.remove('ba-scroll-hidden');
    }, 600);
  }, { passive: true });

  // Klick: zur KI-Check Sektion navigieren, Teaser ausblenden
  btn.addEventListener('click', function () {
    teaser.classList.remove('ba-teaser-visible');
    teaser.style.pointerEvents = 'none';
    clearTimeout(wiggleTimer);
    window.location.href = '/#ki-check';
  });
})();
```

---

## Checkliste — HTML-Snippet in alle Seiten einfügen

Das Snippet muss **vor `</body>`** in jede dieser Dateien:

- [ ] `index.html`
- [ ] `it-solutions.html`
- [ ] `branchen-software.html`
- [ ] `ki-prozesse.html`
- [ ] `webdesign.html`
- [ ] `ueber-uns.html`
- [ ] `formular.html`
- [ ] `blog.html`
- [ ] `blog-post.html`
- [ ] `impressum.html`
- [ ] `datenschutz.html`
- [ ] `agb.html`

---

## Regeln & Hinweise

- **HTML-Snippet** auf jeder Seite **vor `</body>`** einfügen (nach Footer)
- `src="/Bilder/rakete_teaser.png"` — **absoluter Pfad** mit führendem `/` (nicht relativ)
- Das Bild `rakete_teaser.png` liegt im `Bilder/`-Ordner — aus dem alten Projekt kopieren
- CSS gehört in `style.css` (shared), da der Teaser auf allen Seiten erscheint
- JS gehört in `main.js` (shared), da er auf allen Seiten initialisiert wird
- Beim Klick: Navigation zu `/#ki-check` (Sektion auf der Homepage)
- `aria-hidden="true"` auf `#ba-chat-teaser` — dekorativer Floater, kein primärer CTA
- `aria-label` auf dem Button für Screenreader
- Auf der **Homepage selbst** (`index.html`) kann der Teaser ausgeblendet bleiben — der KI-Check ist dort schon sichtbar. Optional: Teaser auf `index.html` nicht initialisieren via `if (window.location.pathname !== '/')`.
