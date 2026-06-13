# Prompt 07 — Digitaler Auftritt (webdesign.html)

Erstelle die vollständige `webdesign.html` für die Amplifyr-Website.

## Voraussetzungen

- `style.css` + `main.js` existieren (Prompt 01 + 02)
- Navigation + Footer 1:1 aus Prompt 02
- Page-spezifisches CSS → `page-webdesign.css`
- Page-spezifisches JS → `page-webdesign.js`
- Kein Inline-CSS, keine `<style>` Tags im Body
- Ausnahme: `--h` CSS Custom Property auf `.wdf-bar` Elementen ist erlaubt (für variable Balkenhöhen)
- Header startet mit Klasse `hero-mode`

---

## `<head>`

```html
<title>Webdesign & Digitaler Auftritt für KMU — Websites, SEO & Rebranding | Amplifyr</title>
<meta name="description" content="Massgeschneiderte Websites, SEO-Optimierung und Rebranding für Schweizer KMU. Amplifyr gestaltet digitale Auftritte, die Ihre Marke klar positionieren." />
<link rel="canonical" href="https://www.amplifyr.ch/webdesign" />
```

Open Graph + Twitter Card analog zur Hauptseite.

---

## Seitenstruktur

```
<header> (hero-mode)
<nav class="mobile-menu">
<main>
  Section 1: .fsh #fsh-wd         — Hero
  Section 2: #sec-website         — Websites & Webshops
  Section 3: #sec-seo             — SEO
  Section 4: #sec-rebranding      — Rebranding
  Section 5: #sec-cta             — CTA (Foto-Hintergrund)
</main>
<footer>
<script src="main.js">
<script src="page-webdesign.js">
```

---

## Section 1: Hero (`#fsh-wd`)

### HTML
```html
<section class="fsh" id="fsh-wd" aria-labelledby="wd-h1">
  <video class="fsh-video" autoplay muted loop playsinline preload="auto">
    <source src="Animationen/Animation_Webdesign.webm" type="video/webm">
    <source src="Animationen/Animation_Webdesign.mp4" type="video/mp4">
  </video>
  <div class="fsh-overlay" aria-hidden="true"></div>
  <div class="container fsh-inner">
    <div class="fsh-content">
      <h1 id="wd-h1" class="fsh-heading">Webdesign <em class="fsh-em">amplified</em></h1>
      <p class="fsh-sub">Wir gestalten digitale Auftritte, die Ihre Marke klar positionieren und Ihre Leistungen überzeugend vermitteln — damit Strategie nach aussen sichtbar und digital erlebbar wird.</p>
      <div class="fsh-actions">
        <a class="btn btn--primary" href="/formular.html">Demo anfragen</a>
      </div>
      <nav class="fsh-subnav" aria-label="Seitennavigation">
        <a class="fsh-subnav-btn" href="#sec-website">Websites & Webshops</a>
        <a class="fsh-subnav-btn" href="#sec-seo">SEO</a>
        <a class="fsh-subnav-btn" href="#sec-rebranding">Rebrandings</a>
      </nav>
    </div>
  </div>
  <div class="fsh-scroll-cue" aria-hidden="true"></div>
</section>
```

---

## Allgemeines Split-Layout (gilt für Sektionen 2–4)

### Prinzip
Jede Sektion: 2 Spalten, Text + Visual, alternierend gespiegelt.

### CSS (page-webdesign.css)
```css
.wd-split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-16);
  align-items: center;
}
.wd-split--rev { direction: rtl; }
.wd-split--rev > * { direction: ltr; }

.wd-split-text { display: flex; flex-direction: column; gap: var(--space-5); }
.wd-split-visual {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 420px;
}

/* Tags/Chips unter der Checklist */
.wd-chips { display: flex; flex-wrap: wrap; gap: var(--space-2); margin-top: var(--space-2); }
.wd-chip {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--navy);
  background: var(--accent-light);
  border: 1px solid var(--border);
  border-radius: var(--radius-pill);
  padding: 4px 12px;
}
.wd-chip--light {
  background: rgba(176,196,222,0.12);
  border-color: rgba(176,196,222,0.25);
  color: #fff;
}

/* Glass card wrapper für alle Visuals */
.wdf-glass {
  background: rgba(255,255,255,0.06);
  border: 1px solid var(--border);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  width: 100%;
  max-width: 440px;
}
.wdf-glass--dark {
  background: rgba(255,255,255,0.05);
  border-color: rgba(176,196,222,0.15);
}

@media (max-width: 768px) {
  .wd-split, .wd-split--rev { grid-template-columns: 1fr; direction: ltr; }
  .wd-split-visual { min-height: auto; }
}
```

---

## Section 2: Websites & Webshops (`#sec-website`)

### HTML
```html
<section id="sec-website" class="section section--white" aria-labelledby="wd-step1-h">
  <div class="container">
    <div class="wd-split">

      <!-- Text -->
      <div class="wd-split-text">
        <p class="section-label">Webauftritt</p>
        <h2 id="wd-step1-h">Website & <em class="fsh-em">Webshops</em></h2>
        <p>Massgeschneiderte Websites und Webshops mit modernem Design – schnell, mobiloptimiert und auf Ihre Zielgruppe ausgerichtet. Von der eleganten Landingpage bis zum vollständigen E-Commerce-Shop mit Zahlungsintegration.</p>
        <ul class="bs-checklist">
          <li class="bs-checklist-item"><span class="bs-check-icon"><!-- SVG --></span>Responsive Design für alle Geräte</li>
          <li class="bs-checklist-item"><span class="bs-check-icon"><!-- SVG --></span>Ladezeiten unter 2 Sekunden</li>
          <li class="bs-checklist-item"><span class="bs-check-icon"><!-- SVG --></span>E-Commerce & Zahlungsintegration</li>
          <li class="bs-checklist-item"><span class="bs-check-icon"><!-- SVG --></span>SEO-Grundoptimierung inklusive</li>
        </ul>
        <div class="wd-chips">
          <span class="wd-chip">WordPress & Webflow</span>
          <span class="wd-chip">Landingpage</span>
          <span class="wd-chip">Mobiloptimiert</span>
        </div>
      </div>

      <!-- Visual: Browser-Mockup -->
      <div class="wd-split-visual">
        <div class="wdf-glass">
          <div class="wdf-browser">
            <div class="wdf-browser-bar">
              <span class="wdf-dot wdf-dot--red"></span>
              <span class="wdf-dot wdf-dot--yellow"></span>
              <span class="wdf-dot wdf-dot--green"></span>
              <span class="wdf-url">shop.amplifyr.ch</span>
            </div>
            <div class="wdf-load-bar"></div>
            <div class="wdf-browser-body">
              <!-- Shop Header -->
              <div class="wdf-shop-header">
                <div class="wdf-shop-logo"></div>
                <div class="wdf-shop-nav">
                  <div class="wdf-shop-nav-item"></div>
                  <div class="wdf-shop-nav-item"></div>
                  <div class="wdf-shop-cart">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="white" stroke-width="2"/>
                      <line x1="3" y1="6" x2="21" y2="6" stroke="white" stroke-width="2"/>
                    </svg>
                    <span class="wdf-cart-badge"></span>
                  </div>
                </div>
              </div>
              <!-- Category Strip -->
              <div class="wdf-categories">
                <div class="wdf-cat wdf-cat--active"></div>
                <div class="wdf-cat"></div>
                <div class="wdf-cat"></div>
                <div class="wdf-cat"></div>
              </div>
              <!-- Product Grid 3x3 -->
              <div class="wdf-product-grid">
                <div class="wdf-shop-card"><div class="wdf-shop-img"></div><div class="wdf-shop-info"><div class="wdf-shop-name"></div><div class="wdf-shop-price"></div></div></div>
                <div class="wdf-shop-card"><div class="wdf-shop-img wdf-shop-img--b"></div><div class="wdf-shop-info"><div class="wdf-shop-name"></div><div class="wdf-shop-price"></div></div></div>
                <div class="wdf-shop-card"><div class="wdf-shop-img wdf-shop-img--c"></div><div class="wdf-shop-info"><div class="wdf-shop-name"></div><div class="wdf-shop-price"></div></div></div>
                <div class="wdf-shop-card"><div class="wdf-shop-img wdf-shop-img--d"></div><div class="wdf-shop-info"><div class="wdf-shop-name"></div><div class="wdf-shop-price"></div></div></div>
                <div class="wdf-shop-card"><div class="wdf-shop-img wdf-shop-img--e"></div><div class="wdf-shop-info"><div class="wdf-shop-name"></div><div class="wdf-shop-price"></div></div></div>
                <div class="wdf-shop-card"><div class="wdf-shop-img wdf-shop-img--f"></div><div class="wdf-shop-info"><div class="wdf-shop-name"></div><div class="wdf-shop-price"></div></div></div>
                <div class="wdf-shop-card"><div class="wdf-shop-img wdf-shop-img--g"></div><div class="wdf-shop-info"><div class="wdf-shop-name"></div><div class="wdf-shop-price"></div></div></div>
                <div class="wdf-shop-card"><div class="wdf-shop-img wdf-shop-img--h"></div><div class="wdf-shop-info"><div class="wdf-shop-name"></div><div class="wdf-shop-price"></div></div></div>
                <div class="wdf-shop-card"><div class="wdf-shop-img wdf-shop-img--i"></div><div class="wdf-shop-info"><div class="wdf-shop-name"></div><div class="wdf-shop-price"></div></div></div>
              </div>
            </div>
          </div>
          <!-- Badges -->
          <div class="wdf-badge wdf-badge--mobile">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M6 2h12a2 2 0 012 2v16a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2z" stroke="currentColor" stroke-width="1.8"/><path d="M12 17h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
            Mobiloptimiert
          </div>
          <div class="wdf-badge wdf-badge--live">
            <span class="wdf-live-dot"></span>
            Live
          </div>
        </div>
      </div>

    </div>
  </div>
</section>
```

### CSS (page-webdesign.css)
```css
/* Browser Chrome */
.wdf-browser { background: #fff; border-radius: var(--radius-md); overflow: hidden; box-shadow: var(--shadow-md); }
.wdf-browser-bar { display: flex; align-items: center; gap: var(--space-2); padding: 8px 12px; background: #f0f2f5; border-bottom: 1px solid rgba(0,0,0,0.06); }
.wdf-dot { width: 9px; height: 9px; border-radius: 50%; }
.wdf-dot--red    { background: #ff5f56; }
.wdf-dot--yellow { background: #febc2e; }
.wdf-dot--green  { background: #27c93f; }
.wdf-url { font-size: 0.62rem; color: #6b7280; background: rgba(0,0,0,0.05); border-radius: 4px; padding: 2px 8px; margin-left: auto; margin-right: auto; }
.wdf-load-bar { height: 2px; background: linear-gradient(90deg, var(--navy), var(--steel)); animation: loadBar 2s ease-in-out infinite; }
@keyframes loadBar { 0%,100% { transform: scaleX(0.3) translateX(-100%); } 50% { transform: scaleX(1) translateX(0); } }
.wdf-browser-body { padding: 10px; }

/* Shop Header */
.wdf-shop-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; padding-bottom: 7px; border-bottom: 1px solid rgba(10,25,47,0.07); }
.wdf-shop-logo { width: 44px; height: 7px; border-radius: 3px; background: rgba(10,25,47,0.2); }
.wdf-shop-nav { display: flex; gap: 4px; align-items: center; }
.wdf-shop-nav-item { width: 28px; height: 6px; border-radius: 3px; background: rgba(10,25,47,0.08); }
.wdf-shop-cart { width: 20px; height: 20px; border-radius: 5px; background: var(--navy); display: flex; align-items: center; justify-content: center; position: relative; }
.wdf-cart-badge { position: absolute; top: -3px; right: -3px; width: 7px; height: 7px; border-radius: 50%; background: #ff6b6b; border: 1.5px solid #fff; animation: wdfPulse 2s infinite; }
@keyframes wdfPulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.2); } }

/* Categories */
.wdf-categories { display: flex; gap: 4px; margin-bottom: 9px; overflow: hidden; }
.wdf-cat { height: 16px; width: 34px; border-radius: 8px; background: rgba(10,25,47,0.08); flex-shrink: 0; }
.wdf-cat--active { background: var(--navy); width: 38px; }

/* Product Grid */
.wdf-product-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; }
.wdf-shop-card { border-radius: 6px; overflow: hidden; background: rgba(10,25,47,0.03); animation: shopCardIn 0.4s ease forwards; opacity: 0; }
.wdf-shop-card:nth-child(1) { animation-delay: 0.2s; }
.wdf-shop-card:nth-child(2) { animation-delay: 0.35s; }
.wdf-shop-card:nth-child(3) { animation-delay: 0.5s; }
.wdf-shop-card:nth-child(4) { animation-delay: 0.65s; }
.wdf-shop-card:nth-child(5) { animation-delay: 0.8s; }
.wdf-shop-card:nth-child(6) { animation-delay: 0.95s; }
.wdf-shop-card:nth-child(7) { animation-delay: 1.1s; }
.wdf-shop-card:nth-child(8) { animation-delay: 1.25s; }
.wdf-shop-card:nth-child(9) { animation-delay: 1.4s; }
@keyframes shopCardIn { to { opacity: 1; } }
.wdf-shop-img { height: 52px; background: linear-gradient(135deg, rgba(10,25,47,0.1), rgba(10,25,47,0.05)); }
.wdf-shop-img--b { background: linear-gradient(135deg, rgba(10,25,47,0.06), rgba(10,25,47,0.11)); }
.wdf-shop-img--c { background: linear-gradient(135deg, rgba(10,25,47,0.12), rgba(10,25,47,0.06)); }
/* --d bis --i: leicht variierende Gradienten, analog */
.wdf-shop-info { padding: 5px; }
.wdf-shop-name { height: 5px; border-radius: 2px; background: rgba(10,25,47,0.12); margin-bottom: 3px; width: 75%; }
.wdf-shop-price { height: 6px; border-radius: 2px; background: rgba(10,25,47,0.2); width: 45%; }

/* Badges */
.wdf-badge { position: absolute; display: flex; align-items: center; gap: 5px; font-size: 0.68rem; font-weight: 600; background: rgba(255,255,255,0.95); border: 1px solid var(--border); border-radius: var(--radius-pill); padding: 5px 10px; color: var(--navy); box-shadow: var(--shadow-sm); }
.wdf-badge--mobile { bottom: -12px; left: 24px; }
.wdf-badge--live { top: -12px; right: 24px; }
.wdf-live-dot { width: 7px; height: 7px; border-radius: 50%; background: #27c93f; animation: wdfPulse 1.5s infinite; }

/* glass wrapper needs relative for badges */
.wdf-glass { position: relative; }
```

---

## Section 3: SEO (`#sec-seo`)

### HTML
```html
<section id="sec-seo" class="section wd-section--dark" aria-labelledby="wd-step2-h">
  <div class="container">
    <div class="wd-split wd-split--rev">

      <!-- Visual: SEO Ranking Cards -->
      <div class="wd-split-visual">
        <div class="wdf-glass wdf-glass--dark">
          <div class="wdf-seo-live">
            <span class="seo-live-dot"></span>
            Live
          </div>
          <div class="wdf-seo-cards" id="seo-rank-wrap">
            <div class="wdf-seo-card wdf-seo-card--top">
              <div class="wdf-rank wdf-rank--1">1</div>
              <div class="wdf-seo-info">
                <span class="wdf-seo-title">amplifyr.ch — IT & Digital</span>
                <span class="wdf-seo-url">www.amplifyr.ch/it-solutions</span>
              </div>
              <div class="wdf-trend wdf-trend--up">
                <svg width="14" height="14" viewBox="0 0 12 12" fill="none"><path d="M2 9l4-4 4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
                <span id="seo-trend-num">+47</span>
              </div>
            </div>
            <div class="wdf-seo-card wdf-seo-card--dim">
              <div class="wdf-rank">2</div>
              <div class="wdf-seo-info">
                <span class="wdf-seo-title">IT-Lösungen Schweiz</span>
                <span class="wdf-seo-url">competitor.ch</span>
              </div>
              <div class="wdf-trend wdf-trend--neutral">—</div>
            </div>
            <div class="wdf-seo-card wdf-seo-card--dimmer">
              <div class="wdf-rank">3</div>
              <div class="wdf-seo-info">
                <span class="wdf-seo-title">Digital Agentur CH</span>
                <span class="wdf-seo-url">example.ch</span>
              </div>
              <div class="wdf-trend wdf-trend--down">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 3l4 4 4-4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
                -2
              </div>
            </div>
          </div>
          <!-- Bar Chart -->
          <div class="wdf-chart" id="seo-bar-chart">
            <div class="wdf-bar" style="--h:28%"></div>
            <div class="wdf-bar" style="--h:42%"></div>
            <div class="wdf-bar" style="--h:36%"></div>
            <div class="wdf-bar" style="--h:58%"></div>
            <div class="wdf-bar" style="--h:52%"></div>
            <div class="wdf-bar" style="--h:74%"></div>
            <div class="wdf-bar wdf-bar--active" style="--h:92%"></div>
          </div>
          <!-- Metrics -->
          <div class="wdf-metrics">
            <div class="wdf-metric">
              <span class="wdf-metric-val" data-target="142" data-prefix="+" data-suffix="%">+142%</span>
              <span class="wdf-metric-lbl">Organisch</span>
            </div>
            <div class="wdf-metric">
              <span class="wdf-metric-val" data-target="3.2" data-suffix="×">3.2×</span>
              <span class="wdf-metric-lbl">Klickrate</span>
            </div>
            <div class="wdf-metric">
              <span class="wdf-metric-val" data-target="38" data-prefix="−" data-suffix="%">−38%</span>
              <span class="wdf-metric-lbl">Kosten/Klick</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Text -->
      <div class="wd-split-text">
        <p class="section-label section-label--steel">Sichtbarkeit</p>
        <h2 id="wd-step2-h" class="text-white">Search Engine <em class="fsh-em">Optimization</em></h2>
        <p class="text-white">Mehr Sichtbarkeit, mehr Anfragen: On-Page SEO, technische Optimierung, Local SEO für Schweizer KMU sowie zielgruppengerechte Google Ads Kampagnen. Wir messen, was funktioniert – und optimieren laufend.</p>
        <ul class="bs-checklist bs-checklist--light">
          <li class="bs-checklist-item"><span class="bs-check-icon"><!-- SVG --></span>Google Ranking Position 1–3</li>
          <li class="bs-checklist-item"><span class="bs-check-icon"><!-- SVG --></span>Lokale Sichtbarkeit in der Schweiz</li>
          <li class="bs-checklist-item"><span class="bs-check-icon"><!-- SVG --></span>Monatliches Reporting & Analyse</li>
          <li class="bs-checklist-item"><span class="bs-check-icon"><!-- SVG --></span>Pay-per-Click Kampagnen</li>
        </ul>
        <div class="wd-chips">
          <span class="wd-chip wd-chip--light">On-Page SEO</span>
          <span class="wd-chip wd-chip--light">Local SEO</span>
          <span class="wd-chip wd-chip--light">Google Ads</span>
          <span class="wd-chip wd-chip--light">Analytics</span>
        </div>
      </div>

    </div>
  </div>
</section>
```

### CSS (page-webdesign.css)
```css
.wd-section--dark { background: var(--navy); }

/* Checklist light variant (weisse Schrift) */
.bs-checklist--light .bs-checklist-item { color: #fff; }
.bs-checklist--light .bs-check-icon { background: rgba(176,196,222,0.15); color: var(--steel); }

/* SEO Live Indicator */
.wdf-seo-live { display: flex; align-items: center; gap: 6px; font-size: 0.65rem; font-weight: 600; color: rgba(74,222,128,0.9); letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: var(--space-4); }
.seo-live-dot { width: 7px; height: 7px; border-radius: 50%; background: #4ade80; animation: wdfPulse 1.5s infinite; }

/* SEO Cards */
.wdf-seo-cards { display: flex; flex-direction: column; gap: var(--space-2); margin-bottom: var(--space-4); }
.wdf-seo-card { display: flex; align-items: center; gap: var(--space-3); padding: var(--space-3) var(--space-4); background: rgba(255,255,255,0.06); border-radius: var(--radius-md); }
.wdf-seo-card--dim    { opacity: 0.7; }
.wdf-seo-card--dimmer { opacity: 0.45; }
.wdf-rank { width: 24px; height: 24px; border-radius: 50%; background: rgba(176,196,222,0.2); font-size: 0.72rem; font-weight: 700; color: #fff; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.wdf-rank--1 { background: var(--steel); color: var(--navy); }
.wdf-seo-info { flex: 1; display: flex; flex-direction: column; gap: 2px; }
.wdf-seo-title { font-size: 0.78rem; font-weight: 600; color: #fff; }
.wdf-seo-url { font-size: 0.65rem; color: rgba(176,196,222,0.6); }
.wdf-trend { font-size: 0.78rem; font-weight: 700; display: flex; align-items: center; gap: 2px; }
.wdf-trend--up   { color: #4ade80; }
.wdf-trend--down { color: #f87171; }
.wdf-trend--neutral { color: rgba(176,196,222,0.4); }

/* Bar Chart */
.wdf-chart { display: flex; align-items: flex-end; gap: 4px; height: 72px; margin-bottom: var(--space-4); }
.wdf-bar { flex: 1; height: var(--h); background: rgba(176,196,222,0.25); border-radius: 3px 3px 0 0; transition: height 1s ease; }
.wdf-bar--active { background: var(--steel); }

/* Metrics */
.wdf-metrics { display: flex; justify-content: space-between; border-top: 1px solid rgba(176,196,222,0.12); padding-top: var(--space-4); gap: var(--space-4); }
.wdf-metric { display: flex; flex-direction: column; gap: 3px; }
.wdf-metric-val { font-family: var(--font-display); font-size: 1.2rem; font-weight: 900; color: #fff; }
.wdf-metric-lbl { font-size: 0.68rem; color: rgba(176,196,222,0.6); letter-spacing: 0.04em; }
```

### Counter-Animation (page-webdesign.js)
```js
// Scroll-triggered Counter-Animation für .wdf-metric-val
function animateCounter(el) {
  var target = parseFloat(el.dataset.target);
  var prefix = el.dataset.prefix || '';
  var suffix = el.dataset.suffix || '';
  var isFloat = target % 1 !== 0;
  var duration = 1200;
  var start = null;

  function step(timestamp) {
    if (!start) start = timestamp;
    var progress = Math.min((timestamp - start) / duration, 1);
    var ease = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    var value = isFloat
      ? (target * ease).toFixed(1)
      : Math.round(target * ease);
    el.textContent = prefix + value + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

// Observer
var metricsWrap = document.querySelector('.wdf-metrics');
if (metricsWrap && window.IntersectionObserver) {
  var metTriggered = false;
  var metObserver = new IntersectionObserver(function(entries) {
    if (metTriggered || !entries[0].isIntersecting) return;
    metTriggered = true;
    metObserver.disconnect();
    document.querySelectorAll('.wdf-metric-val').forEach(function(el) {
      animateCounter(el);
    });
  }, { threshold: 0.5 });
  metObserver.observe(metricsWrap);
}

// prefers-reduced-motion: Werte direkt anzeigen, kein Counting
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  // Werte bleiben wie im HTML (bereits korrekt gesetzt)
}
```

---

## Section 4: Rebranding (`#sec-rebranding`)

### HTML
```html
<section id="sec-rebranding" class="section section--white" aria-labelledby="wd-step3-h">
  <div class="container">
    <div class="wd-split">

      <!-- Text -->
      <div class="wd-split-text">
        <p class="section-label">Markenauftritt</p>
        <h2 id="wd-step3-h">Rebranding &<br><em class="fsh-em">Corporate Identity</em></h2>
        <p>Ihr Markenauftritt verdient ein Update: Logo-Entwicklung, Corporate Identity, Farbkonzept und Styleguide. Wir sorgen für einen konsistenten Auftritt über alle Kanäle – digital und analog.</p>
        <ul class="bs-checklist">
          <li class="bs-checklist-item"><span class="bs-check-icon"><!-- SVG --></span>Logo & visuelles Erscheinungsbild</li>
          <li class="bs-checklist-item"><span class="bs-check-icon"><!-- SVG --></span>Farbpalette & Typografie-System</li>
          <li class="bs-checklist-item"><span class="bs-check-icon"><!-- SVG --></span>Styleguide für alle Kanäle</li>
          <li class="bs-checklist-item"><span class="bs-check-icon"><!-- SVG --></span>Print, Digital & Social Media</li>
        </ul>
        <div class="wd-chips">
          <span class="wd-chip">Logo & Icon</span>
          <span class="wd-chip">Corporate Identity</span>
          <span class="wd-chip">Styleguide</span>
          <span class="wd-chip">Print & Digital</span>
        </div>
      </div>

      <!-- Visual: Brand Identity Card -->
      <div class="wd-split-visual">
        <div class="wdf-glass">
          <div class="wdf-brand-card">
            <div class="wdf-palette">
              <div class="wdf-swatch wdf-swatch--1"></div>
              <div class="wdf-swatch wdf-swatch--2"></div>
              <div class="wdf-swatch wdf-swatch--3"></div>
              <div class="wdf-swatch wdf-swatch--4"></div>
              <div class="wdf-swatch wdf-swatch--5"></div>
            </div>
            <div class="wdf-logo-row">
              <span class="wdf-wordmark-a">A</span>
              <span class="wdf-wordmark-rest">mplifyr</span>
            </div>
            <div class="wdf-typo-row">
              <span class="wdf-typo-sample">Aa</span>
              <span class="wdf-typo-label">Display Bold</span>
            </div>
            <div class="wdf-brand-tags">
              <span class="wdf-btag">Primär</span>
              <span class="wdf-btag">Akzent</span>
              <span class="wdf-btag">Neutral</span>
            </div>
          </div>
          <div class="wdf-sg-badge">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Styleguide
          </div>
        </div>
      </div>

    </div>
  </div>
</section>
```

### CSS (page-webdesign.css)
```css
.wdf-brand-card { display: flex; flex-direction: column; gap: var(--space-5); }
.wdf-palette { display: flex; gap: var(--space-2); }
.wdf-swatch { width: 36px; height: 36px; border-radius: var(--radius); }
.wdf-swatch--1 { background: #0a192f; }
.wdf-swatch--2 { background: #b0c4de; }
.wdf-swatch--3 { background: #4a90d9; }
.wdf-swatch--4 { background: #ffffff; border: 1px solid var(--border); }
.wdf-swatch--5 { background: #e8f0fe; }
.wdf-logo-row { display: flex; align-items: baseline; gap: 2px; }
.wdf-wordmark-a { font-family: var(--font-display); font-size: 2rem; font-weight: 900; color: var(--navy); }
.wdf-wordmark-rest { font-family: var(--font-display); font-size: 1.1rem; font-weight: 900; color: var(--navy); opacity: 0.5; }
.wdf-typo-row { display: flex; align-items: center; gap: var(--space-3); }
.wdf-typo-sample { font-family: var(--font-display); font-weight: 800; font-size: 0.95rem; color: var(--navy); }
.wdf-typo-label { font-size: 0.78rem; color: var(--text-muted); }
.wdf-brand-tags { display: flex; gap: var(--space-2); }
.wdf-btag { font-size: 0.72rem; font-weight: 600; color: var(--navy); background: var(--accent-light); border-radius: var(--radius-pill); padding: 3px 10px; }
.wdf-sg-badge { position: absolute; bottom: -10px; right: 24px; display: flex; align-items: center; gap: 6px; font-size: 0.72rem; font-weight: 600; color: var(--navy); background: #fff; border: 1px solid var(--border); border-radius: var(--radius-pill); padding: 5px 12px; box-shadow: var(--shadow-sm); }
```

---

## Section 5: CTA (`#sec-cta`)

### HTML
```html
<section id="sec-cta" class="wd-cta" aria-label="Call to Action">
  <div class="wd-cta-bg" aria-hidden="true">
    <img src="Bilder/Bild_Webdesign_end.jpg" alt="" loading="lazy" decoding="async">
    <div class="wd-cta-overlay"></div>
  </div>
  <div class="container wd-cta-content">
    <p class="section-label section-label--white">Digitaler Auftritt</p>
    <h2 class="text-white">Ihr nächster digitaler Auftritt.</h2>
    <p class="text-white">Unverbindliches Gespräch, schnelle Demo, klares Angebot. Wir zeigen Ihnen, was möglich ist.</p>
    <a class="btn btn--white" href="/formular.html">Gespräch anfragen</a>
  </div>
</section>
```

### CSS (page-webdesign.css)
```css
.wd-cta { position: relative; overflow: hidden; padding-block: var(--space-30); text-align: center; }
.wd-cta-bg { position: absolute; inset: 0; z-index: 0; }
.wd-cta-bg img { width: 100%; height: 100%; object-fit: cover; }
.wd-cta-overlay { position: absolute; inset: 0; background: rgba(10,20,45,0.55); }
.wd-cta-content { position: relative; z-index: 1; max-width: 520px; margin-inline: auto; display: flex; flex-direction: column; align-items: center; gap: var(--space-5); }
.section-label--white { color: #fff; opacity: 1; }
```

---

## Scroll-Animationen (page-webdesign.js)

```js
// Section Header-Elemente
animateOnScroll('#sec-website .wd-split-text > *', { stagger: 100 });
animateOnScroll('#sec-seo .wd-split-text > *', { stagger: 100 });
animateOnScroll('#sec-rebranding .wd-split-text > *', { stagger: 100 });

// Visuals
animateOnScroll('#sec-website .wd-split-visual', { delay: 200 });
animateOnScroll('#sec-seo .wd-split-visual', { delay: 200 });
animateOnScroll('#sec-rebranding .wd-split-visual', { delay: 200 });

// CTA
animateOnScroll('.wd-cta-content > *', { stagger: 120 });

// Counter-Animation (scroll-triggered, siehe oben)
```

---

## Ausgabe

Gib aus:
1. `webdesign.html` — vollständig, sauber, kein Inline-CSS ausser `--h` auf `.wdf-bar`
2. `page-webdesign.css` — alle seitenspezifischen Styles
3. `page-webdesign.js` — Counter-Animation (scroll-triggered), alle Scroll-Animationen

---

## Reale Texte & Inhalte

Verwende exakt diese Texte für die jeweiligen Sektionen:

### Hero
```
H1 Zeile 1: Webdesign
H1 Zeile 2: amplified
Subtext: Wir gestalten digitale Auftritte, die Ihre Marke klar positionieren und Ihre Leistungen überzeugend vermitteln — damit Strategie nach aussen sichtbar und digital erlebbar wird.
CTA: Demo anfragen
```

### Tab-Navigation
```
Tab 1: Websites & Webshops
Tab 2: SEO
Tab 3: Rebrandings
```

### Tab 1: Website & Webshops
```
Eyebrow: Webauftritt
H2 Zeile 1: Website &
H2 Zeile 2: Webshops
Text: Massgeschneiderte Websites und Webshops mit modernem Design – schnell, mobiloptimiert und auf Ihre Zielgruppe ausgerichtet. Von der eleganten Landingpage bis zum vollständigen E-Commerce-Shop mit Zahlungsintegration.
Items:
  Responsive Design für alle Geräte
  Ladezeiten unter 2 Sekunden
  E-Commerce & Zahlungsintegration
  SEO-Grundoptimierung inklusive
  WordPress & Webflow
```

### Tab 2: SEO
```
Eyebrow: Sichtbarkeit
H2 Zeile 1: Search Engine
H2 Zeile 2: Optimization
Text: Mehr Sichtbarkeit, mehr Anfragen: On-Page SEO, technische Optimierung, Local SEO für Schweizer KMU sowie zielgruppengerechte Google Ads Kampagnen. Wir messen, was funktioniert – und optimieren laufend.
Items:
  Google Ranking Position 1–3
  Lokale Sichtbarkeit in der Schweiz
  Monatliches Reporting & Analyse
  Pay-per-Click Kampagnen
  On-Page SEO / Local SEO / Google Ads / Analytics

Counter-Stats (scroll-animiert):
  +142% Organisch
  3.2× Klickrate
  −38% Kosten/Klick
```

### Tab 3: Rebranding
```
Eyebrow: Markenauftritt
H2 Zeile 1: Rebranding &
H2 Zeile 2: Corporate Identity
Text: Ihr Markenauftritt verdient ein Update: Logo-Entwicklung, Corporate Identity, Farbkonzept und Styleguide. Wir sorgen für einen konsistenten Auftritt über alle Kanäle – digital und analog.
Items:
  Logo & visuelles Erscheinungsbild
  Farbpalette & Typografie-System
  Styleguide für alle Kanäle
  Print, Digital & Social Media
Labels: Logo & Icon / Corporate Identity / Styleguide / Print & Digital
```

### CTA-Sektion
```
Eyebrow: Digitaler Auftritt
H2: Ihr nächster digitaler Auftritt.
Text: Unverbindliches Gespräch, schnelle Demo, klares Angebot. Wir zeigen Ihnen, was möglich ist.
CTA: Gespräch anfragen
```
