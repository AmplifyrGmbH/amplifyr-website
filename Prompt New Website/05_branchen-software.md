# Prompt 05 — Betriebs-Software (branchen-software.html)

Erstelle die vollständige `branchen-software.html` für die Amplifyr-Website.

## Voraussetzungen

- `style.css` + `main.js` existieren (Prompt 01 + 02)
- Navigation + Footer 1:1 aus Prompt 02
- Page-spezifisches CSS → `page-branchen-software.css`
- Page-spezifisches JS → `page-branchen-software.js`
- Kein Inline-CSS, keine `<style>` Tags im Body
- Header startet mit Klasse `hero-mode`

---

## `<head>`

```html
<title>Betriebs-Software für KMU — Branchensoftware & Einführung | Amplifyr</title>
<meta name="description" content="Herstellerneutrale Evaluation, Integration und Einführung von Branchensoftware für Schweizer KMU. Amplifyr findet die richtige Lösung für Ihren Betrieb." />
<link rel="canonical" href="https://www.amplifyr.ch/branchen-software" />
```

Open Graph + Twitter Card analog zur Hauptseite.

---

## Seitenstruktur

```
<header> (hero-mode)
<nav class="mobile-menu">
<main>
  Section 1: .fsh #fsh-bs       — Hero
  Section 2: #bs-ansatz         — Ansatz
  Section 3: #bs-vorgehen       — Vorgehen
  Section 4: #bs-branchen       — Branchen
  Section 5: .bs-cta            — CTA
</main>
<footer>
<script src="main.js">
<script src="page-branchen-software.js">
```

---

## Section 1: Hero (`#fsh-bs`)

### HTML
```html
<section class="fsh" id="fsh-bs" aria-labelledby="bs-h1">
  <video class="fsh-video" autoplay muted loop playsinline preload="auto">
    <source src="Animationen/Animation_Branchen_Software.webm" type="video/webm">
    <source src="Animationen/Animation_Branchen_Software.mp4" type="video/mp4">
  </video>
  <div class="fsh-overlay" aria-hidden="true"></div>
  <div class="container fsh-inner">
    <div class="fsh-content">
      <h1 id="bs-h1" class="fsh-heading">Software<br><em class="fsh-em">amplified</em></h1>
      <p class="fsh-sub">In jeder Branche gibt es unzählige Softwarelösungen. Wir helfen Ihnen, die richtige zu finden.</p>
      <div class="fsh-actions">
        <a class="btn btn--primary" href="/formular.html">Beratung anfragen</a>
      </div>
      <nav class="fsh-subnav" aria-label="Seitennavigation">
        <a class="fsh-subnav-btn" href="#bs-ansatz">Ansatz</a>
        <a class="fsh-subnav-btn" href="#bs-vorgehen">Vorgehen</a>
        <a class="fsh-subnav-btn" href="#bs-branchen">Branchen</a>
      </nav>
    </div>
  </div>
  <div class="fsh-scroll-cue" aria-hidden="true"></div>
</section>
```

### Hinweis Video
- `loop` bewusst gesetzt — Video läuft endlos (anders als IT-Hero)
- WebM primary, MP4 Fallback
- Overlay: `rgba(10,20,45,0.65)` — einheitlich dunkel

### CSS
Identisch mit FSH aus Prompt 04 (`page-it-solutions.css`). Gemeinsame FSH-Styles gehören in `style.css`.

---

## Section 2: Ansatz (`#bs-ansatz`)

### HTML
```html
<section id="bs-ansatz" class="section section--white" aria-labelledby="bs-ansatz-h">
  <div class="container">
    <div class="bs-ansatz-inner">

      <p class="section-label">Unser Ansatz</p>
      <h2 id="bs-ansatz-h">Die richtige Software.<br><em class="fsh-em">Richtig eingeführt.</em></h2>
      <p class="bs-ansatz-text">Es gibt unzählige Softwarelösungen – die Herausforderung ist, die richtige auszuwählen und im Alltag zum Laufen zu bringen. Genau das lösen wir.</p>

      <ul class="bs-checklist">
        <li class="bs-checklist-item">
          <span class="bs-check-icon" aria-hidden="true">
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
              <path d="M2 6l3 3 5-5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
          Herstellerneutrale Evaluation — kein Reselling
        </li>
        <li class="bs-checklist-item">
          <span class="bs-check-icon" aria-hidden="true"><!-- SVG --></span>
          Nahtlose Integration in bestehende Systeme
        </li>
        <li class="bs-checklist-item">
          <span class="bs-check-icon" aria-hidden="true"><!-- SVG --></span>
          Begleitung bis zur echten Alltagsnutzung
        </li>
        <li class="bs-checklist-item">
          <span class="bs-check-icon" aria-hidden="true"><!-- SVG --></span>
          Schulung & Support für Ihr Team
        </li>
      </ul>

    </div>
  </div>
</section>
```

### CSS (page-branchen-software.css)
- `.bs-ansatz-inner`: max-width 680px, margin-inline auto, text-align center
- `.bs-ansatz-text`: color var(--text-muted), margin-top var(--space-5), font-size 1.05rem
- `.bs-checklist`: list-style none, margin-top var(--space-6), display inline-flex, flex-direction column, gap 13px, text-align left
- `.bs-checklist-item`: display flex, align-items center, gap var(--space-3), font-size 0.95rem, color var(--text)
- `.bs-check-icon`: width 22px, height 22px, border-radius 50%, background var(--accent-light), color var(--navy), display flex, align-items center, justify-content center, flex-shrink 0

---

## Section 3: Vorgehen (`#bs-vorgehen`)

### HTML
```html
<section id="bs-vorgehen" class="section" aria-labelledby="bs-vorgehen-h">
  <div class="container">

    <div class="bs-vorgehen-header">
      <p class="section-label section-label--steel">Unser Vorgehen</p>
      <h2 id="bs-vorgehen-h" class="text-white">Von der Analyse bis <em class="fsh-em">zum laufenden Betrieb.</em></h2>
      <p class="bs-vorgehen-intro text-white">Wir begleiten Sie von der ersten Bestandsaufnahme bis zur erfolgreichen Nutzung im Daily Business — strukturiert und ohne Überraschungen.</p>
    </div>

    <div class="bs-step-grid">

      <div class="bs-step">
        <div class="bs-step-top">
          <span class="bs-step-num">01</span>
          <div class="bs-step-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="1.8"/>
              <path d="M20 20l-3-3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
              <path d="M8 11l2 2 4-4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
        <h3>Analyse & Anforderungen</h3>
        <p>Wir verstehen zuerst Ihre Prozesse, Pain Points und Ziele. Welche Abläufe soll die Software unterstützen? Was ist bereits im Einsatz?</p>
      </div>

      <div class="bs-step">
        <div class="bs-step-top">
          <span class="bs-step-num">02</span>
          <div class="bs-step-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M17 11H3M17 11a2 2 0 1 1 4 0 2 2 0 0 1-4 0zM7 6H3M7 6a2 2 0 1 1 4 0 2 2 0 0 1-4 0zM14 16H3M14 16a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>
            </svg>
          </div>
        </div>
        <h3>Markt-Evaluation</h3>
        <p>Auf Basis Ihrer Anforderungen evaluieren wir den Markt herstellerneutral und präsentieren Ihnen die Top-Kandidaten mit klarer Entscheidungsgrundlage.</p>
      </div>

      <div class="bs-step">
        <div class="bs-step-top">
          <span class="bs-step-num">03</span>
          <div class="bs-step-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
              <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
            </svg>
          </div>
        </div>
        <h3>Integration & Einrichtung</h3>
        <p>Wir richten die Lösung ein, integrieren sie in bestehende Systeme und führen die Datenmigration durch — sauber konfiguriert und betriebsbereit.</p>
      </div>

      <div class="bs-step">
        <div class="bs-step-top">
          <span class="bs-step-num">04</span>
          <div class="bs-step-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
              <circle cx="9" cy="7" r="4" stroke="currentColor" stroke-width="1.8"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
            </svg>
          </div>
        </div>
        <h3>Schulung & Adoption</h3>
        <p>Wir schulen Ihr Team praxisnah und begleiten die Einführung. Ziel: die Software wird täglich genutzt und entfaltet ihren vollen Mehrwert.</p>
      </div>

    </div>
  </div>
</section>
```

### CSS (page-branchen-software.css)
- `#bs-vorgehen`: background var(--navy)
- `.bs-vorgehen-header`: text-align center, max-width 720px, margin-inline auto, margin-bottom var(--space-12)
- `.bs-vorgehen-intro`: font-size 1.05rem, margin-top var(--space-5), opacity 0.85
- `.bs-step-grid`: display grid, grid-template-columns repeat(4, 1fr) Desktop, repeat(2, 1fr) Tablet, 1fr Mobile, gap var(--space-6)
- `.bs-step`: background rgba(255,255,255,0.05), border 1px solid rgba(176,196,222,0.15), border-radius var(--radius-lg), padding var(--space-8), display flex, flex-direction column, gap var(--space-4)
- `.bs-step:hover`: background rgba(255,255,255,0.08), border-color rgba(176,196,222,0.3), transform translateY(-2px)
- `.bs-step-top`: display flex, align-items center, justify-content space-between
- `.bs-step-num`: font-family var(--font-display), font-size 2rem, font-weight 900, color var(--steel), opacity 0.6, line-height 1
- `.bs-step-icon`: width 38px, height 38px, border-radius var(--radius), background rgba(176,196,222,0.12), color var(--steel), display flex, align-items center, justify-content center
- `.bs-step h3`: font-size 1rem, font-weight 700, color #fff
- `.bs-step p`: font-size 0.9rem, color rgba(255,255,255,0.7), line-height 1.7

---

## Section 4: Branchen (`#bs-branchen`)

### HTML
```html
<section id="bs-branchen" class="section section--white" aria-labelledby="bs-branchen-h">
  <div class="container">

    <div class="bs-branchen-header">
      <p class="section-label">Branchen</p>
      <h2 id="bs-branchen-h">Software für <em class="fsh-em">jede Branche.</em></h2>
      <p class="bs-branchen-intro">Jede Branche hat ihre eigenen Anforderungen. Wir kennen die führenden Lösungen und helfen Ihnen, die richtige zu finden und einzuführen.</p>
    </div>

    <div class="bs-branch-grid">

      <div class="bs-branch-card">
        <div class="bs-branch-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M3 21h18" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>
            <path d="M5 21V10l7-7 7 7v11" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>
            <rect x="9" y="14" width="6" height="7" rx="1" stroke="currentColor" stroke-width="1.6"/>
          </svg>
        </div>
        <h3>Handwerk & Bau</h3>
        <p>Auftragsmanagement, Zeiterfassung, Materialverwaltung und mobile Dokumentation für Handwerksbetriebe und Bauunternehmen.</p>
        <div class="bs-branch-tags">
          <span class="bs-tag">Aufträge</span>
          <span class="bs-tag">Zeiterfassung</span>
          <span class="bs-tag">Disposition</span>
        </div>
      </div>

      <div class="bs-branch-card">
        <div class="bs-branch-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="6" width="18" height="13" rx="2" stroke="currentColor" stroke-width="1.7"/>
            <path d="M3 10h18" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>
            <path d="M7 15h2M11 15h4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
          </svg>
        </div>
        <h3>Treuhand & Finanzen</h3>
        <p>Buchhaltungssoftware, Mandantenverwaltung und digitale Steuerworkflows für Treuhänder, Steuerberater und Finanzdienstleister.</p>
        <div class="bs-branch-tags">
          <span class="bs-tag">Buchhaltung</span>
          <span class="bs-tag">Mandanten</span>
          <span class="bs-tag">Steuern</span>
        </div>
      </div>

      <div class="bs-branch-card">
        <div class="bs-branch-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M3 11l1-7h16l1 7" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M3 11h18v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>
            <path d="M9 15v4M15 15v4M5 19h14" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>
          </svg>
        </div>
        <h3>Gastronomie & Hotellerie</h3>
        <p>Kassensysteme, Reservierungsmanagement, Lagerverwaltung und digitale Gästekommunikation für Restaurants und Hotels.</p>
        <div class="bs-branch-tags">
          <span class="bs-tag">Kasse</span>
          <span class="bs-tag">Reservierung</span>
          <span class="bs-tag">Lager</span>
        </div>
      </div>

      <div class="bs-branch-card">
        <div class="bs-branch-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>
          </svg>
        </div>
        <h3>Gesundheit & Pflege</h3>
        <p>Praxissoftware, Patientenverwaltung, Abrechnung und digitale Dokumentation für Arztpraxen, Therapien und Pflegebetriebe.</p>
        <div class="bs-branch-tags">
          <span class="bs-tag">Patienten</span>
          <span class="bs-tag">Abrechnung</span>
          <span class="bs-tag">Termine</span>
        </div>
      </div>

      <div class="bs-branch-card">
        <div class="bs-branch-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" stroke-width="1.7"/>
            <path d="M8 21h8M12 17v4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>
          </svg>
        </div>
        <h3>Handel & E-Commerce</h3>
        <p>Warenwirtschaft, POS-Systeme, Webshop-Anbindung und Multichannel-Management für stationäre und Online-Händler.</p>
        <div class="bs-branch-tags">
          <span class="bs-tag">Warenwirtschaft</span>
          <span class="bs-tag">POS</span>
          <span class="bs-tag">E-Commerce</span>
        </div>
      </div>

      <div class="bs-branch-card">
        <div class="bs-branch-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.7"/>
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>
          </svg>
        </div>
        <h3>Beratung & Dienstleistung</h3>
        <p>CRM, Projektmanagement, Zeiterfassung und Rechnungsstellung für Agenturen, Berater und Dienstleister aller Art.</p>
        <div class="bs-branch-tags">
          <span class="bs-tag">CRM</span>
          <span class="bs-tag">Projekte</span>
          <span class="bs-tag">Abrechnung</span>
        </div>
      </div>

    </div>
  </div>
</section>
```

### CSS (page-branchen-software.css)
- `.bs-branchen-header`: text-align center, max-width 680px, margin-inline auto, margin-bottom var(--space-12)
- `.bs-branchen-intro`: color var(--text-muted), margin-top var(--space-5)
- `.bs-branch-grid`: display grid, grid-template-columns repeat(3, 1fr) Desktop, repeat(2, 1fr) Tablet, 1fr Mobile, gap var(--space-6)
- `.bs-branch-card`: background var(--bg-white), border 1px solid var(--border), border-radius var(--radius-lg), padding var(--space-8), display flex, flex-direction column, gap var(--space-4), transition border-color + box-shadow + transform
- `.bs-branch-card:hover`: border-color var(--navy), box-shadow var(--shadow-md), transform translateY(-3px)
- `.bs-branch-icon`: width 48px, height 48px, border-radius var(--radius-md), background var(--accent-light), color var(--navy), display flex, align-items center, justify-content center
- `.bs-branch-card h3`: font-size 1.05rem, font-weight 700
- `.bs-branch-card p`: color var(--text-muted), font-size 0.9rem, line-height 1.7, flex 1
- `.bs-branch-tags`: display flex, flex-wrap wrap, gap var(--space-2), margin-top auto
- `.bs-tag`: font-size 0.72rem, font-weight 600, color var(--navy), background var(--accent-light), border-radius var(--radius-pill), padding 3px 10px

---

## Section 5: CTA (`.bs-cta`)

### HTML
```html
<section class="bs-cta" aria-label="Call to Action">
  <div class="bs-cta-bg" aria-hidden="true">
    <svg class="its-network-svg" viewBox="0 0 900 380" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <!-- Exakt aus aktueller Version übernehmen: Glow-Circles, Lines, Rings, Nodes -->
      <circle class="its-net-glow" cx="760" cy="90" r="110"/>
      <circle class="its-net-glow" cx="140" cy="300" r="80" style="animation-delay:2s"/>
      <!-- [alle Linien, Ringe, Nodes aus aktueller Version] -->
    </svg>
    <div class="bs-cta-overlay"></div>
  </div>
  <div class="container bs-cta-content">
    <p class="section-label section-label--steel">Nächster Schritt</p>
    <h2 class="text-white">Die richtige Software für Ihr Unternehmen.</h2>
    <p class="text-white">Lassen Sie uns gemeinsam herausfinden, welche Branchensoftware Ihren Alltag vereinfacht — und wie wir sie nahtlos in Ihr Unternehmen einführen.</p>
    <a class="btn btn--white" href="/formular.html">Jetzt beraten lassen</a>
  </div>
</section>
```

### CSS (page-branchen-software.css)
- `.bs-cta`: position relative, background var(--navy), padding-block var(--space-24), overflow hidden
- `.bs-cta-bg`: position absolute, inset 0, z-index 0
- `.bs-cta-overlay`: position absolute, inset 0, background `linear-gradient(135deg, rgba(26,39,68,0.92) 0%, rgba(26,39,68,0.75) 100%)`
- `.bs-cta-content`: position relative, z-index 1, text-align center, max-width 600px, margin-inline auto, display flex, flex-direction column, gap var(--space-6), align-items center
- SVG-Animations-CSS: identisch mit `.its-network-svg` aus Prompt 04 — diese Klassen sind bereits in `style.css` oder `page-it-solutions.css`. Falls shared: in `style.css` auslagern.

---

## Scroll-Animationen (page-branchen-software.js)

Einheitlich mit `animateOnScroll()` aus `main.js`:

```js
// Ansatz: Headline + Checklist gestaffelt
animateOnScroll('#bs-ansatz .section-label', { delay: 0 });
animateOnScroll('#bs-ansatz h2', { delay: 120 });
animateOnScroll('#bs-ansatz .bs-ansatz-text', { delay: 240 });
animateOnScroll('.bs-checklist-item', { stagger: 100, delay: 360 });

// Vorgehen: Header + Steps gestaffelt
animateOnScroll('.bs-vorgehen-header > *', { stagger: 120 });
animateOnScroll('.bs-step', { stagger: 150 });

// Branchen: Header + Cards gestaffelt
animateOnScroll('.bs-branchen-header > *', { stagger: 100 });
animateOnScroll('.bs-branch-card', { stagger: 120 });

// CTA
animateOnScroll('.bs-cta-content > *', { stagger: 120 });
```

Alle: opacity 0→1, translateY(20px→0), 500ms ease-out.
Mobile: kein Stagger.
`prefers-reduced-motion`: sofort sichtbar.

---

## Utility-Klassen (aus style.css, nicht neu definieren)

- `.text-white`: color #fff
- `.fsh-em`: font-style italic, color var(--steel)
- `.section-label--steel`: color var(--steel), opacity 0.8
- `.btn--white`: background #fff, color var(--navy)

---

## Ausgabe

Gib aus:
1. `branchen-software.html` — vollständig, sauber, ohne Inline-Styles
2. `page-branchen-software.css` — alle seitenspezifischen Styles
3. `page-branchen-software.js` — Scroll-Animationen

---

## Reale Texte & Inhalte

Verwende exakt diese Texte für die jeweiligen Sektionen:

### Hero
```
H1 Zeile 1: Software
H1 Zeile 2: amplified
Subtext: In jeder Branche gibt es unzählige Softwarelösungen. Wir helfen Ihnen, die richtige zu finden.
CTA: Beratung anfragen
```

### Tab-Navigation
```
Tab 1: Ansatz
Tab 2: Vorgehen
Tab 3: Branchen
```

### Sektion: Unser Ansatz
```
H2 Zeile 1: Die richtige Software.
H2 Zeile 2: Richtig eingeführt.
Text: Es gibt unzählige Softwarelösungen – die Herausforderung ist, die richtige auszuwählen und im Alltag zum Laufen zu bringen. Genau das lösen wir.
Items:
  Herstellerneutrale Evaluation — kein Reselling
  Nahtlose Integration in bestehende Systeme
  Begleitung bis zur echten Alltagsnutzung
  Schulung & Support für Ihr Team
```

### Sektion: Unser Vorgehen
```
H2 Zeile 1: Von der Analyse bis
H2 Zeile 2: zum laufenden Betrieb.
Sub: Wir begleiten Sie von der ersten Bestandsaufnahme bis zur erfolgreichen Nutzung im Daily Business — strukturiert und ohne Überraschungen.

Schritt 1:
  Titel: Analyse & Anforderungen
  Text: Wir verstehen zuerst Ihre Prozesse, Pain Points und Ziele. Welche Abläufe soll die Software unterstützen? Was ist bereits im Einsatz?

Schritt 2:
  Titel: Markt-Evaluation
  Text: Auf Basis Ihrer Anforderungen evaluieren wir den Markt herstellerneutral und präsentieren Ihnen die Top-Kandidaten mit klarer Entscheidungsgrundlage.

Schritt 3:
  Titel: Integration & Einrichtung
  Text: Wir richten die Lösung ein, integrieren sie in bestehende Systeme und führen die Datenmigration durch — sauber konfiguriert und betriebsbereit.

Schritt 4:
  Titel: Schulung & Adoption
  Text: Wir schulen Ihr Team praxisnah und begleiten die Einführung. Ziel: die Software wird täglich genutzt und entfaltet ihren vollen Mehrwert.
```

### Sektion: Branchen
```
H2 Zeile 1: Software für
H2 Zeile 2: jede Branche.
Sub: Jede Branche hat ihre eigenen Anforderungen. Wir kennen die führenden Lösungen und helfen Ihnen, die richtige zu finden und einzuführen.

Karte 1:
  Titel: Handwerk & Bau
  Text: Auftragsmanagement, Zeiterfassung, Materialverwaltung und mobile Dokumentation für Handwerksbetriebe und Bauunternehmen.
  Tags: Aufträge / Zeiterfassung / Disposition

Karte 2:
  Titel: Treuhand & Finanzen
  Text: Buchhaltungssoftware, Mandantenverwaltung und digitale Steuerworkflows für Treuhänder, Steuerberater und Finanzdienstleister.
  Tags: Buchhaltung / Mandanten / Steuern

Karte 3:
  Titel: Gastronomie & Hotellerie
  Text: Kassensysteme, Reservierungsmanagement, Lagerverwaltung und digitale Gästekommunikation für Restaurants und Hotels.
  Tags: Kasse / Reservierung / Lager

Karte 4:
  Titel: Gesundheit & Pflege
  Text: Praxissoftware, Patientenverwaltung, Abrechnung und digitale Dokumentation für Arztpraxen, Therapien und Pflegebetriebe.
  Tags: Patienten / Abrechnung / Termine

Karte 5:
  Titel: Handel & E-Commerce
  Text: Warenwirtschaft, POS-Systeme, Webshop-Anbindung und Multichannel-Management für stationäre und Online-Händler.
  Tags: Warenwirtschaft / POS / E-Commerce

Karte 6:
  Titel: Beratung & Dienstleistung
  Text: CRM, Projektmanagement, Zeiterfassung und Rechnungsstellung für Agenturen, Berater und Dienstleister aller Art.
  Tags: CRM / Projekte / Abrechnung
```

### CTA-Sektion
```
Eyebrow: Nächster Schritt
H2: Die richtige Software für Ihr Unternehmen.
Text: Lassen Sie uns gemeinsam herausfinden, welche Branchensoftware Ihren Alltag vereinfacht — und wie wir sie nahtlos in Ihr Unternehmen einführen.
CTA: Jetzt beraten lassen
```
