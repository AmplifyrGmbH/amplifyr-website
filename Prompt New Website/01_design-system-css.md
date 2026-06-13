# Prompt 01 — Design System & style.css

Erstelle eine vollständige `style.css` Datei für eine statische Unternehmenswebsite (Amplifyr GmbH, Schweiz).

## Anforderungen

- Reine CSS-Datei, kein Framework, kein Tailwind
- Mobile-first: zuerst mobile Styles, dann @media (min-width: 768px) und @media (min-width: 1200px)
- Alle Werte über CSS Custom Properties (keine hardcodierten Farben oder Abstände im Code)
- Klare Reihenfolge der Sektionen (siehe unten)

## Dateistruktur (Reihenfolge im CSS)

1. CSS Custom Properties (:root)
2. Reset & Base
3. Layout-Helpers (.container, .section)
4. Typography (h1–h4, p, .eyebrow, .section-label)
5. Button System (.btn, .btn--primary, .btn--secondary, .btn--ghost, .btn--sm)
6. Header & Navigation
7. Mobile Menu
8. Dropdown Navigation
9. Footer
10. Utility Classes (.sr-only, .text-muted, .visually-hidden)

## Design System — CSS Custom Properties

```css
:root {
  /* Brand Colors */
  --navy:         #1a2744;
  --steel:        #B0C4DE;
  --steel-light:  #E4EBF5;

  /* Semantic */
  --bg:           #FFFFFF;
  --bg-fog:       #EDF0F7;
  --bg-white:     #FFFFFF;
  --text:         #1a2744;
  --text-muted:   #445269;
  --accent:       #1a2744;
  --accent-hover: #0F1A31;
  --accent-light: #E4EBF5;
  --border:       #D8DFE8;
  --border-light: #E8EDF5;

  /* Shadows */
  --shadow-sm:  0 1px 4px rgba(0,0,0,0.05);
  --shadow:     0 2px 12px rgba(0,0,0,0.06);
  --shadow-md:  0 4px 24px rgba(0,0,0,0.09);
  --shadow-lg:  0 8px 40px rgba(0,0,0,0.12);

  /* Border Radius */
  --radius-sm:   4px;
  --radius:      8px;
  --radius-md:   12px;
  --radius-lg:   16px;
  --radius-xl:   24px;
  --radius-pill: 999px;

  /* Typography */
  --font-display: Georgia, 'Times New Roman', serif;
  --font-body:    'DM Sans', sans-serif;

  /* Spacing Scale */
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-5:  20px;
  --space-6:  24px;
  --space-7:  28px;
  --space-8:  32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
  --space-24: 96px;
  --space-30: 120px;

  /* Section & Container */
  --section-py:    120px;
  --container:     1280px;
  --container-px:  48px;

  /* Header */
  --header-h:         86px;
  --header-h-compact: 68px;

  /* Transitions */
  --ease:          cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --duration:      200ms;
  --duration-slow: 400ms;
}
```

## Typografie

- Font Display (Headings): Georgia, serif
- Font Body: DM Sans (von Google Fonts, wird extern eingebunden)
- h1: clamp(40px, 5.5vw, 68px), font-weight 900, letter-spacing -0.01em
- h2: clamp(28px, 3.2vw, 44px), font-weight 900, letter-spacing -0.01em
- h3: clamp(18px, 2vw, 22px), font-weight 700
- p: 1rem, line-height 1.75
- .eyebrow: 0.8rem, uppercase, letter-spacing 0.1em, font-weight 600
- .section-label: 0.8rem, uppercase, letter-spacing 0.12em, color var(--text-muted)

## Button System

- .btn: Basis-Klasse (inline-flex, gap, padding 13px 24px, border-radius var(--radius), transition)
- .btn--primary: Hintergrund var(--accent), weiße Schrift — Hover: dunkler + leichter translateY(-1px)
- .btn--secondary: transparent, Border 1.5px solid var(--accent) — Hover: accent-light Hintergrund
- .btn--ghost: transparent, kein Border, Hover: underline
- .btn--sm: kleineres Padding (9px 18px), font-size 0.82rem
- .btn--white: background #fff, color var(--navy), font-weight 700 — Hover: background var(--steel-light) — für CTAs über dunklen Hintergründen

## Header

- position: fixed, top: 0, full width, z-index: 1000
- Standardzustand: background #1a2744 (dunkel, für Hero-Seiten)
- .scrolled: background #ffffff, border-bottom, box-shadow, kompaktere Höhe
- .hero-mode: transparent background (über Video/Dark-Hero)
- .legal-mode: immer weiss (für Impressum, Datenschutz etc.)
- .hidden: transform: translateY(-100%) (beim nach-oben-scrollen verstecken)
- Logo: "ampli" in Georgia serif, "fyr" italic in var(--steel)
- Nav-Links: font-size 0.95rem, font-weight 500, hover mit accent-light Hintergrund
- Aktiver Link: font-weight 700, Unterstrich-Indikator als ::after
- Header-CTA (Kontakt-Button): outline-style, rechts

## Mobile Menu

- Vollbild-Overlay (position: fixed, inset: 0), z-index: 1001
- Weisser Hintergrund, eigener Header mit Logo + Schliessen-Button
- Nav-Gruppen mit aufklappbaren Sub-Menüs (Chevron-Toggle)
- CTA-Button am unteren Ende, volle Breite

## Dropdown Navigation (Desktop)

- Erscheint beim Hover auf Parent-Link
- Zentriert unter dem Parent-Link (transform: translateX(-50%))
- Weisser Hintergrund, border, border-radius, box-shadow
- Im hero-mode: dunkler Hintergrund (var(--navy)), weisse Schrift
- Smooth opacity + translateY Transition

## Footer

- Dunkler Hintergrund (var(--navy)), helle Schrift
- Grid-Layout: Logo + Beschreibung links, Nav-Spalten rechts
- Unten: Copyright-Zeile + Links zu Impressum / Datenschutz / AGB
- Mobile: alles untereinander

## FSH Scroll-Cue (geteilt über alle Hero-Seiten)

```css
.fsh-scroll-cue {
  position: absolute;
  bottom: 28px;
  left: 50%;
  transform: translateX(-50%);
  width: 22px;
  height: 34px;
  border: 2px solid rgba(255,255,255,0.4);
  border-radius: 11px;
}
.fsh-scroll-cue::after {
  content: '';
  display: block;
  width: 4px;
  height: 8px;
  background: rgba(255,255,255,0.65);
  border-radius: 2px;
  margin: 5px auto 0;
  animation: fshScrollDot 2s ease-in-out infinite;
}
@keyframes fshScrollDot {
  0%, 100% { transform: translateY(0); opacity: 1; }
  50%       { transform: translateY(8px); opacity: 0.4; }
}
@media (prefers-reduced-motion: reduce) {
  .fsh-scroll-cue::after { animation: none; }
}
```

## Was NICHT in diese Datei gehört

- Page-spezifische Styles (Hero-Animationen, Sektions-Layouts einzelner Seiten)
- Inline Styles
- JavaScript
- Media Queries für einzelne Komponenten die nur auf einer Seite vorkommen

## Ausgabe

Gib die vollständige `style.css` Datei aus — sauber kommentiert mit Sections-Headern wie:
/* ============================================================
   SECTION NAME
============================================================ */
