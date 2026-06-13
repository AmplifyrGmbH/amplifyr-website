# Prompt 06 — KI & Automatisierung (ki-prozesse.html)

Erstelle die vollständige `ki-prozesse.html` für die Amplifyr-Website.

## Voraussetzungen

- `style.css` + `main.js` existieren (Prompt 01 + 02)
- Navigation + Footer 1:1 aus Prompt 02
- Page-spezifisches CSS → `page-ki-prozesse.css`
- Page-spezifisches JS → `page-ki-prozesse.js`
- Kein Inline-CSS, keine `<style>` Tags im Body
- Header startet mit Klasse `hero-mode`

---

## `<head>`

```html
<title>KI & Automatisierung für KMU — Chatbots, Telefonie & Workflows | Amplifyr</title>
<meta name="description" content="KI-Chatbots, automatisierte Telefonie und intelligente Workflows für Schweizer KMU. Amplifyr implementiert KI-Lösungen, die sich nahtlos in bestehende Systeme integrieren." />
<link rel="canonical" href="https://www.amplifyr.ch/ki-prozesse" />
```

Open Graph + Twitter Card analog zur Hauptseite.

---

## Seitenstruktur

```
<header> (hero-mode)
<nav class="mobile-menu">
<main>
  Section 1: .fsh #fsh-ai          — Hero
  Section 2: #sec-chatbot           — Chatbots
  Section 3: #sec-telefonie         — KI-Telefonie
  Section 4: #sec-automation        — Workflows
  Section 5: .ki-cta               — CTA
</main>
<footer>
<script src="main.js">
<script src="page-ki-prozesse.js">
```

---

## Section 1: Hero (`#fsh-ai`)

### HTML
```html
<section class="fsh" id="fsh-ai" aria-labelledby="ai-h1">
  <video class="fsh-video" autoplay muted loop playsinline preload="auto">
    <source src="Animationen/Animation_KI_Prozesse.webm" type="video/webm">
    <source src="Animationen/Animation_KI_Prozesse.mp4" type="video/mp4">
  </video>
  <div class="fsh-overlay" aria-hidden="true"></div>
  <div class="container fsh-inner">
    <div class="fsh-content">
      <h1 id="ai-h1" class="fsh-heading">KI <em class="fsh-em">amplified</em></h1>
      <p class="fsh-sub">Wir implementieren Chatbots, KI-Telefonie und automatisierte Workflows, die sich nahtlos in bestehende Systeme integrieren und operative Aufgaben übernehmen — weniger manuelle Arbeit, schnellere Abläufe, klare Strukturen.</p>
      <div class="fsh-actions">
        <a class="btn btn--primary" href="/formular.html">Potenzial besprechen</a>
      </div>
      <nav class="fsh-subnav" aria-label="Seitennavigation">
        <a class="fsh-subnav-btn" href="#sec-chatbot">Chatbots</a>
        <a class="fsh-subnav-btn" href="#sec-telefonie">KI-Telefonie</a>
        <a class="fsh-subnav-btn" href="#sec-automation">Workflows</a>
      </nav>
    </div>
  </div>
  <div class="fsh-scroll-cue" aria-hidden="true"></div>
</section>
```

- `loop` bewusst gesetzt — Video läuft endlos
- WebM primary, MP4 Fallback

---

## Section 2: Chatbots (`#sec-chatbot`)

### HTML
```html
<section id="sec-chatbot" class="section section--white" aria-labelledby="ai-chatbot-h">
  <div class="container">

    <div class="its-section-header">
      <p class="section-label">Chatbots</p>
      <h2 id="ai-chatbot-h">Automatisierte Kommunikation, rund um die Uhr.</h2>
      <p class="its-intro">Intelligente Chatbots übernehmen wiederkehrende Anfragen und unterstützen Kunden sowie Mitarbeitende 24/7. Trainiert auf Ihre Daten, verbunden mit Ihren Systemen.</p>
    </div>

    <div class="ki-split">

      <!-- Links: Checklist -->
      <div class="ki-split-text">
        <ul class="bs-checklist">
          <li class="bs-checklist-item">
            <span class="bs-check-icon" aria-hidden="true"><!-- SVG Checkmark --></span>
            Kundenservice und Support
          </li>
          <li class="bs-checklist-item">
            <span class="bs-check-icon" aria-hidden="true"><!-- SVG Checkmark --></span>
            Terminbuchungen automatisieren
          </li>
          <li class="bs-checklist-item">
            <span class="bs-check-icon" aria-hidden="true"><!-- SVG Checkmark --></span>
            Interne Wissensassistenten
          </li>
          <li class="bs-checklist-item">
            <span class="bs-check-icon" aria-hidden="true"><!-- SVG Checkmark --></span>
            Angebots- und Anfragebearbeitung
          </li>
          <li class="bs-checklist-item">
            <span class="bs-check-icon" aria-hidden="true"><!-- SVG Checkmark --></span>
            Website-Chat und WhatsApp-Integration
          </li>
        </ul>
        <p class="ki-split-note">Die Systeme werden mit Ihren Datenquellen verbunden und direkt in Website, CRM oder interne Systeme integriert.</p>
      </div>

      <!-- Rechts: Chat-Mockup -->
      <div class="ki-split-visual" id="chatMockupWrap">
        <p class="ki-mockup-label">AI-Assistent — Live</p>
        <div class="ai-chat-mockup" id="chatMockup" aria-label="Chat-Demo" role="log">
          <div class="ai-chat-bubble ai-chat-bubble--user" id="cmsg1" hidden>Wie lange dauert eine Erstberatung?</div>
          <div class="ai-typing" id="ctyping1" hidden><span></span><span></span><span></span></div>
          <div class="ai-chat-bubble ai-chat-bubble--bot" id="cmsg2" hidden>Unsere Erstberatung dauert 30–45 Minuten und ist kostenlos. Ich kann direkt einen Termin für Sie buchen — welche Wochentage passen Ihnen am besten?</div>
          <div class="ai-chat-bubble ai-chat-bubble--user" id="cmsg3" hidden>Dienstag oder Donnerstag wäre gut.</div>
          <div class="ai-typing" id="ctyping2" hidden><span></span><span></span><span></span></div>
          <div class="ai-chat-bubble ai-chat-bubble--bot" id="cmsg4" hidden>Perfekt. Ich habe am Donnerstag um 14:00 Uhr einen freien Slot. Darf ich den für Sie reservieren?</div>
        </div>
        <div class="ki-mockup-status">
          <span class="ki-status-dot" aria-hidden="true"></span>
          <span>Verbunden mit CRM & Kalendersystem</span>
        </div>
      </div>

    </div>
  </div>
</section>
```

### CSS (page-ki-prozesse.css)
- `.ki-split`: display grid, grid-template-columns 1fr 1fr Desktop, 1fr Mobile, gap var(--space-12), margin-top var(--space-12), align-items start
- `.ki-split-note`: margin-top var(--space-6), font-size 0.88rem, color var(--text-muted), line-height 1.7
- `.ki-split-visual`: background var(--navy), border-radius var(--radius-xl), padding var(--space-8), display flex, flex-direction column, gap var(--space-6)
- `.ki-mockup-label`: font-size 0.68rem, color #fff, text-transform uppercase, letter-spacing 0.08em
- `.ai-chat-mockup`: display flex, flex-direction column, gap var(--space-4), flex 1
- `.ai-chat-bubble`: padding 12px 16px, border-radius 16px, font-size 0.9rem, line-height 1.6, max-width 85%
- `.ai-chat-bubble--user`: background rgba(255,255,255,0.12), color #fff, align-self flex-end, border-bottom-right-radius 4px
- `.ai-chat-bubble--bot`: background rgba(176,196,222,0.18), color #fff, align-self flex-start, border-bottom-left-radius 4px, border 1px solid rgba(176,196,222,0.2)
- `.ai-typing`: display flex, gap 4px, padding 12px 16px, align-self flex-start
- `.ai-typing span`: width 7px, height 7px, border-radius 50%, background rgba(176,196,222,0.6), animation: typingDot 1.2s ease-in-out infinite
- `.ai-typing span:nth-child(2)`: animation-delay 0.2s
- `.ai-typing span:nth-child(3)`: animation-delay 0.4s
- `@keyframes typingDot`: 0%,80%,100% transform scale(0.7) opacity 0.5 / 40% transform scale(1) opacity 1
- `.ki-mockup-status`: display flex, align-items center, gap var(--space-2), border-top 1px solid rgba(255,255,255,0.1), padding-top var(--space-4)
- `.ki-status-dot`: width 8px, height 8px, border-radius 50%, background #4ade80, box-shadow 0 0 6px rgba(74,222,128,0.6), flex-shrink 0
- `.ki-mockup-status span:last-child`: font-size 0.72rem, color #fff

### Chat-Animation (page-ki-prozesse.js)

**Wichtig: Animation startet scroll-triggered, nicht beim Seitenladen.**

```js
function startChatDemo() {
  // Sequenz: msg1 → typing1 → msg2 → msg3 → typing2 → msg4
  // Alle Elemente starten hidden
  // Jedes Element wird nach einer Verzögerung eingeblendet

  const sequence = [
    { el: 'cmsg1',    delay: 0 },
    { el: 'ctyping1', delay: 800,  hideAfter: 1400 },
    { el: 'cmsg2',    delay: 2200 },
    { el: 'cmsg3',    delay: 3400 },
    { el: 'ctyping2', delay: 4200, hideAfter: 1400 },
    { el: 'cmsg4',    delay: 5600 },
  ];

  sequence.forEach(function(step) {
    setTimeout(function() {
      var el = document.getElementById(step.el);
      if (!el) return;
      el.hidden = false;
      el.classList.add('chat-visible');
      if (step.hideAfter) {
        setTimeout(function() {
          el.hidden = true;
        }, step.hideAfter);
      }
    }, step.delay);
  });
}

// Scroll-Trigger via IntersectionObserver
var chatWrap = document.getElementById('chatMockupWrap');
if (chatWrap && window.IntersectionObserver) {
  var chatTriggered = false;
  var chatObserver = new IntersectionObserver(function(entries) {
    if (chatTriggered || !entries[0].isIntersecting) return;
    chatTriggered = true;
    chatObserver.disconnect();
    startChatDemo();
  }, { threshold: 0.4 });
  chatObserver.observe(chatWrap);
}

// prefers-reduced-motion: alle Nachrichten sofort zeigen
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  ['cmsg1','cmsg2','cmsg3','cmsg4'].forEach(function(id) {
    var el = document.getElementById(id);
    if (el) { el.hidden = false; }
  });
}
```

CSS für Einblend-Animation:
```css
.ai-chat-bubble, .ai-typing {
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 300ms ease, transform 300ms ease;
}
.chat-visible {
  opacity: 1;
  transform: translateY(0);
}
```

---

## Section 3: KI-Telefonie (`#sec-telefonie`)

### HTML
```html
<section id="sec-telefonie" class="section section--fog" aria-labelledby="ai-tel-h">
  <div class="container">

    <div class="its-section-header">
      <p class="section-label">KI-Telefonie</p>
      <h2 id="ai-tel-h">Skalierbare Telefonie ohne Personalaufwand.</h2>
      <p class="its-intro">KI-gestützte Telefonie nimmt Anfragen automatisch entgegen, strukturiert sie und leitet sie zuverlässig weiter — für reibungslose Kommunikationsprozesse ohne zusätzliche Ressourcen.</p>
    </div>

    <div class="ki-feature-grid">

      <div class="ki-feature-card">
        <div class="ki-feature-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 3.09 4.18 2 2 0 0 1 5.07 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L9.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <h3>Automatische Anrufvereinbarungen</h3>
        <p>Eingehende Anrufe werden entgegengenommen, das Anliegen erfasst und Termine direkt in das Kalendersystem eingetragen.</p>
      </div>

      <div class="ki-feature-card">
        <div class="ki-feature-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="9" cy="7" r="4" stroke="currentColor" stroke-width="1.7"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <h3>Lead-Qualifizierung</h3>
        <p>Die KI stellt gezielte Fragen, qualifiziert Leads und übergibt Informationen strukturiert an Ihr CRM-System.</p>
      </div>

      <div class="ki-feature-card">
        <div class="ki-feature-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <h3>Intelligente Weiterleitung</h3>
        <p>Anrufe werden anhand des erfassten Anliegens automatisch an den richtigen Ansprechpartner oder die passende Abteilung weitergeleitet.</p>
      </div>

      <div class="ki-feature-card">
        <div class="ki-feature-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>
            <polyline points="14 2 14 8 20 8" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
            <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
            <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
          </svg>
        </div>
        <h3>Automatische Dokumentation</h3>
        <p>Jedes Gespräch wird transkribiert, zusammengefasst und an die richtigen Systeme übergeben — keine manuelle Nacharbeit.</p>
      </div>

    </div>
  </div>
</section>
```

### CSS (page-ki-prozesse.css)
- `.ki-feature-grid`: display grid, repeat(2, 1fr) Desktop, 1fr Mobile, gap var(--space-5), margin-top var(--space-10)
- `.ki-feature-card`: background var(--bg-white), border 1px solid var(--border), border-radius var(--radius-lg), padding var(--space-8), display flex, flex-direction column, gap var(--space-4)
- `.ki-feature-card:hover`: border-color var(--navy), box-shadow var(--shadow-md), transform translateY(-2px)
- `.ki-feature-icon`: width 44px, height 44px, border-radius var(--radius-md), background var(--accent-light), color var(--navy), display flex, align-items center, justify-content center
- `.ki-feature-card h3`: font-size 1.05rem, font-weight 700
- `.ki-feature-card p`: color var(--text-muted), font-size 0.92rem, line-height 1.7

---

## Section 4: Workflows (`#sec-automation`)

### HTML
```html
<section id="sec-automation" class="section section--white" aria-labelledby="ai-auto-h">
  <div class="container">

    <div class="its-section-header">
      <p class="section-label">Automatisierte Workflows</p>
      <h2 id="ai-auto-h">Wiederkehrende Aufgaben automatisiert – effizient und skalierbar.</h2>
      <p class="its-intro">Automatisiere wiederkehrende Abläufe, reduziere manuellen Aufwand und verbinde deine Systeme nahtlos miteinander.</p>
    </div>

    <div class="ki-workflow-grid">

      <div class="ki-feature-card">
        <div class="ki-feature-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>
            <path d="M14 2v6h6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
            <line x1="8" y1="13" x2="16" y2="13" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>
            <line x1="8" y1="17" x2="13" y2="17" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>
          </svg>
        </div>
        <h3>Daten & Dokumente automatisieren</h3>
        <p>Eingehende Daten und Dokumente werden automatisch erfasst, analysiert und in deine Systeme übertragen.</p>
        <ul class="ki-workflow-bullets">
          <li>Dokumente auslesen (Rechnungen, PDFs, Formulare)</li>
          <li>Daten extrahieren und strukturieren</li>
          <li>Synchronisation zwischen Tools (CRM, PMS, Tabellen)</li>
        </ul>
      </div>

      <div class="ki-feature-card">
        <div class="ki-feature-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" stroke-width="1.7"/>
            <polyline points="22,6 12,13 2,6" stroke="currentColor" stroke-width="1.7"/>
          </svg>
        </div>
        <h3>Kommunikation</h3>
        <p>E-Mails und Anfragen werden automatisch verarbeitet, beantwortet oder weitergeleitet.</p>
        <ul class="ki-workflow-bullets">
          <li>E-Mails analysieren und kategorisieren</li>
          <li>Automatische Antworten und Follow-ups</li>
          <li>Weiterleitung an die richtige Person oder Abteilung</li>
        </ul>
      </div>

      <div class="ki-feature-card">
        <div class="ki-feature-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" stroke-width="1.7"/>
            <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" stroke-width="1.7"/>
            <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" stroke-width="1.7"/>
            <path d="M14 17.5h7M17.5 14v7" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>
          </svg>
        </div>
        <h3>Geschäftsprozesse automatisieren</h3>
        <p>Komplette Abläufe werden durchgängig automatisiert – von der Anfrage bis zum Reporting.</p>
        <ul class="ki-workflow-bullets">
          <li>Angebots- und Rechnungsprozesse</li>
          <li>Buchungen, Statusupdates, interne Abläufe</li>
          <li>Automatisiertes Reporting und wiederkehrende Aufgaben</li>
        </ul>
      </div>

    </div>
  </div>
</section>
```

### CSS (page-ki-prozesse.css)
- `.ki-workflow-grid`: display grid, repeat(3, 1fr) Desktop, repeat(2, 1fr) Tablet, 1fr Mobile, gap var(--space-5), margin-top var(--space-10)
- `.ki-workflow-bullets`: list-style disc, padding-left var(--space-5), display flex, flex-direction column, gap 6px, color var(--text-muted), font-size 0.88rem, line-height 1.5, margin-top var(--space-4)

---

## Section 5: CTA (`.ki-cta`)

Identischer Aufbau wie auf branchen-software.html — SVG Netzwerk-Animation (900×380), Navy-Hintergrund, anderer Text.

### HTML
```html
<section class="ki-cta" aria-label="Call to Action">
  <div class="ki-cta-bg" aria-hidden="true">
    <svg class="its-network-svg" viewBox="0 0 900 380" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <!-- Exakt gleiche Nodes/Lines wie branchen-software.html -->
    </svg>
    <div class="ki-cta-overlay"></div>
  </div>
  <div class="container ki-cta-content">
    <p class="section-label section-label--steel">Nächster Schritt</p>
    <h2 class="text-white">Bereit für KI in Ihrem Unternehmen?</h2>
    <p class="text-white">Wir zeigen Ihnen, welche KI-Lösungen zu Ihrer Situation passen — und welche Basis dafür nötig ist. Konkret, ohne Buzzwords.</p>
    <a class="btn btn--white" href="/formular.html">Gespräch anfragen</a>
  </div>
</section>
```

### CSS
Identisch mit `.bs-cta` aus Prompt 05 — Klassen-Namen angepasst, Styles gleich.

---

## Scroll-Animationen (page-ki-prozesse.js)

```js
// Section Header: gestaffelt
animateOnScroll('#sec-chatbot .its-section-header > *', { stagger: 100 });
animateOnScroll('#sec-telefonie .its-section-header > *', { stagger: 100 });
animateOnScroll('#sec-automation .its-section-header > *', { stagger: 100 });

// Chatbot Checklist
animateOnScroll('.bs-checklist-item', { stagger: 80 });

// Feature Cards
animateOnScroll('#sec-telefonie .ki-feature-card', { stagger: 120 });
animateOnScroll('#sec-automation .ki-feature-card', { stagger: 150 });

// CTA
animateOnScroll('.ki-cta-content > *', { stagger: 120 });

// Chat-Demo: scroll-triggered (siehe oben)
```

---

## Ausgabe

Gib aus:
1. `ki-prozesse.html` — vollständig, sauber, ohne Inline-Styles
2. `page-ki-prozesse.css` — alle seitenspezifischen Styles inkl. Chat-Mockup und Typing-Animation
3. `page-ki-prozesse.js` — Chat-Demo (scroll-triggered), alle Scroll-Animationen

---

## Reale Texte & Inhalte

Verwende exakt diese Texte für die jeweiligen Sektionen:

### Hero
```
H1 Zeile 1: KI
H1 Zeile 2: amplified
Subtext: Wir implementieren Chatbots, KI-Telefonie und automatisierte Workflows, die sich nahtlos in bestehende Systeme integrieren und operative Aufgaben übernehmen — weniger manuelle Arbeit, schnellere Abläufe, klare Strukturen.
CTA: Potenzial besprechen
```

### Tab-Navigation
```
Tab 1: Chatbots
Tab 2: KI-Telefonie
Tab 3: Workflows
```

### Tab 1: Chatbots
```
H2 Zeile 1: Automatisierte Kommunikation,
H2 Zeile 2: rund um die Uhr.
Text: Intelligente Chatbots übernehmen wiederkehrende Anfragen und unterstützen Kunden sowie Mitarbeitende 24/7. Trainiert auf Ihre Daten, verbunden mit Ihren Systemen.
Items:
  Kundenservice und Support
  Terminbuchungen automatisieren
  Interne Wissensassistenten
  Angebots- und Anfragebearbeitung
  Website-Chat und WhatsApp-Integration
Fazit: Die Systeme werden mit Ihren Datenquellen verbunden und direkt in Website, CRM oder interne Systeme integriert.

Chat-Mockup (AI-Assistent Live):
  User: Wie lange dauert eine Erstberatung?
  AI: Unsere Erstberatung dauert 30–45 Minuten und ist kostenlos. Ich kann direkt einen Termin für Sie buchen — welche Wochentage passen Ihnen am besten?
  User: Dienstag oder Donnerstag wäre gut.
  AI: Perfekt. Ich habe am Donnerstag um 14:00 Uhr einen freien Slot. Darf ich den für Sie reservieren?
  Badge: Verbunden mit CRM & Kalendersystem
```

### Tab 2: KI-Telefonie
```
H2 Zeile 1: Skalierbare Telefonie
H2 Zeile 2: ohne Personalaufwand.
Sub: KI-gestützte Telefonie nimmt Anfragen automatisch entgegen, strukturiert sie und leitet sie zuverlässig weiter — für reibungslose Kommunikationsprozesse ohne zusätzliche Ressourcen.

Feature 1:
  Titel: Automatische Anrufvereinbarungen
  Text: Eingehende Anrufe werden entgegengenommen, das Anliegen erfasst und Termine direkt in das Kalendersystem eingetragen.

Feature 2:
  Titel: Lead-Qualifizierung
  Text: Die KI stellt gezielte Fragen, qualifiziert Leads und übergibt Informationen strukturiert an Ihr CRM-System.

Feature 3:
  Titel: Intelligente Weiterleitung
  Text: Anrufe werden anhand des erfassten Anliegens automatisch an den richtigen Ansprechpartner oder die passende Abteilung weitergeleitet.

Feature 4:
  Titel: Automatische Dokumentation
  Text: Jedes Gespräch wird transkribiert, zusammengefasst und an die richtigen Systeme übergeben — keine manuelle Nacharbeit.
```

### Tab 3: Workflows
```
H2 Zeile 1: Wiederkehrende Aufgaben automatisiert –
H2 Zeile 2: effizient und skalierbar.
Sub: Automatisiere wiederkehrende Abläufe, reduziere manuellen Aufwand und verbinde deine Systeme nahtlos miteinander.

Gruppe 1:
  Titel: Daten & Dokumente automatisieren
  Text: Eingehende Daten und Dokumente werden automatisch erfasst, analysiert und in deine Systeme übertragen.
  Items: Dokumente auslesen (Rechnungen, PDFs, Formulare) / Daten extrahieren und strukturieren / Synchronisation zwischen Tools (CRM, PMS, Tabellen)

Gruppe 2:
  Titel: Kommunikation
  Text: E-Mails und Anfragen werden automatisch verarbeitet, beantwortet oder weitergeleitet.
  Items: E-Mails analysieren und kategorisieren / Automatische Antworten und Follow-ups / Weiterleitung an die richtige Person oder Abteilung

Gruppe 3:
  Titel: Geschäftsprozesse automatisieren
  Text: Komplette Abläufe werden durchgängig automatisiert – von der Anfrage bis zum Reporting.
  Items: Angebots- und Rechnungsprozesse / Buchungen, Statusupdates, interne Abläufe / Automatisiertes Reporting und wiederkehrende Aufgaben
```

### CTA-Sektion
```
Eyebrow: Nächster Schritt
H2: Bereit für KI in Ihrem Unternehmen?
Text: Wir zeigen Ihnen, welche KI-Lösungen zu Ihrer Situation passen — und welche Basis dafür nötig ist. Konkret, ohne Buzzwords.
CTA: Gespräch anfragen
```
