# Prompt 08 — `ueber-uns.html` + `page-ueber-uns.css` + `page-ueber-uns.js`

## Kontext & Ziel

Erstelle die Seite **Über uns** für die Amplifyr-Website als saubere, statische HTML-Seite.
Die Seite besteht aus 3 Sektionen: Hero (Foto-Split), Team-Akkordeon und Kontaktformular.

Lies zuerst die bereits erstellten Dateien:
- `style.css` — gemeinsames Design System (CSS Custom Properties, Reset, Header, Footer)
- `main.js` — gemeinsame Logik (Header-Scroll, Hamburger, Mobile-Menü, animateOnScroll)

Erstelle dann diese 3 Dateien:
- `ueber-uns.html` — nur HTML, kein `<style>`, kein `<script>`
- `page-ueber-uns.css` — nur page-spezifisches CSS
- `page-ueber-uns.js` — nur page-spezifisches JS

---

## Dateistruktur

```
ueber-uns.html
page-ueber-uns.css
page-ueber-uns.js
Bilder/
  Bild_Zurich_2.avif       ← Hero-Foto links
  Bild_Zurich_end.avif     ← Kontaktformular-Hintergrund
  Bild_Timo.jpg            ← Timo Steinfort
  Bild_David.jpg           ← David Staub
```

---

## `ueber-uns.html` — Grundgerüst

```html
<!DOCTYPE html>
<html lang="de-CH">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Über uns — Team & Referenzprojekte | amplifyr</title>
  <meta name="description" content="Lernen Sie das Team von amplifyr kennen. Ihr lokaler IT-Partner aus der Region Zürich für Digitalisierung, KI und Webdesign." />

  <!-- Favicons -->
  <link rel="icon" type="image/x-icon" href="/Favicon/favicon.ico" />
  <link rel="icon" type="image/png" sizes="32x32" href="/Favicon/favicon_32x32.png" />
  <link rel="icon" type="image/png" sizes="16x16" href="/Favicon/favicon_16x16.png" />
  <link rel="apple-touch-icon" sizes="180x180" href="/Favicon/favicon_180x180.png" />
  <link rel="icon" type="image/png" sizes="192x192" href="/Favicon/favicon_192x192.png" />

  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Amplifyr | Über uns – Team & Ansatz hinter der digitalen Transformation" />
  <meta property="og:description" content="Lernen Sie das Team hinter Amplifyr kennen. Wir begleiten Schweizer KMU unternehmerisch, ganzheitlich und strukturiert." />
  <meta property="og:image" content="https://amplifyr.ch/Logos/Open_Graph_Image_Amplifyr.webp" />
  <meta property="og:url" content="https://www.amplifyr.ch/ueber-uns" />
  <meta name="twitter:card" content="summary_large_image" />
  <link rel="canonical" href="https://www.amplifyr.ch/ueber-uns" />

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />

  <!-- Shared + Page CSS -->
  <link rel="stylesheet" href="style.css" />
  <link rel="stylesheet" href="page-ueber-uns.css" />
</head>
<body>

  <!-- HEADER (identisch auf allen Seiten, aus main.js generiert oder als Snippet) -->
  <header id="site-header" class="hero-mode">
    <!-- Navigation wie in 02_navigation-footer.md definiert -->
    <!-- "Über uns" nav-link erhält Klasse active -->
  </header>

  <!-- MOBILE MENU -->
  <nav class="mobile-menu" id="mobile-menu" aria-label="Mobile Navigation">
    <!-- wie in 02_navigation-footer.md -->
  </nav>

  <main>

    <!-- ============================================================
         SEKTION 1: HERO — Foto-Split
    ============================================================ -->
    <section class="ua-hero" id="ua-hero" aria-label="Über uns Hero">
      <!-- Links: Zürich Panorama -->
      <div class="ua-hero-photo">
        <img src="Bilder/Bild_Zurich_2.avif" alt="Zürich Panorama" loading="eager" decoding="async">
      </div>
      <!-- Rechts: Vision + Slogan -->
      <div class="ua-hero-content">
        <h1 class="ua-hero-headline">
          <span class="ua-hl-1">Wir schaffen das digitale Fundament,</span>
          <span class="ua-hl-2">damit Ihre Vision Realität wird.</span>
        </h1>
        <div class="ua-slogan">
          <span class="ua-slogan-base">Build the base.</span>
          <span class="ua-slogan-race">Lead the race.</span>
        </div>
      </div>
      <!-- Scroll-Indikator -->
      <div class="fsh-scroll" aria-hidden="true"></div>
    </section>

    <!-- ============================================================
         SEKTION 2: TEAM-AKKORDEON
    ============================================================ -->
    <section id="team-section" class="section ua-team" aria-labelledby="ua-team-heading">
      <div class="container">

        <!-- Intro -->
        <div class="ua-team-intro reveal">
          <p class="section-label">DREI PERSPEKTIVEN</p>
          <h2 id="ua-team-heading">Eine digitale Basis.</h2>
          <p class="ua-team-sub">Drei Perspektiven, ein gemeinsames Ziel: stabile Systeme, smarte Prozesse und messbare Wirkung für Schweizer KMU.</p>
        </div>

        <!-- Akkordeon -->
        <div class="ua-accordion" role="list">

          <!-- Item 1: Markt & Strategie — standardmässig offen -->
          <div class="ua-acc-item is-open reveal" role="listitem">
            <button class="ua-acc-header" aria-expanded="true" aria-controls="ua-body-1">
              <div class="ua-acc-left">
                <p class="ua-acc-title">Markt &amp; Strategie</p>
                <p class="ua-acc-desc">Wir verbinden Geschäftsverständnis mit digitaler Klarheit. So entstehen Lösungen, die zu Markt, Zielgruppe und Unternehmenszielen passen.</p>
              </div>
              <div class="ua-acc-person">
                <img src="Bilder/Bild_Timo.jpg" class="ua-acc-avatar" alt="" loading="lazy" decoding="async">
                <div class="ua-acc-person-info">
                  <span class="ua-acc-verantwortlich">Verantwortlich:</span>
                  <span class="ua-acc-person-name">Timo Steinfort</span>
                  <span class="ua-acc-person-role">Markt &amp; Strategie</span>
                </div>
              </div>
              <!-- Chevron SVG inline -->
              <svg class="ua-acc-chevron" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <div class="ua-acc-body" id="ua-body-1">
              <div class="ua-acc-divider"></div>
              <div class="ua-acc-profile">
                <div class="ua-acc-photo">
                  <img src="Bilder/Bild_Timo.jpg" alt="Timo Steinfort" loading="lazy" decoding="async">
                </div>
                <div class="ua-acc-text">
                  <p class="ua-acc-prof-name">Timo Steinfort</p>
                  <p class="ua-acc-prof-role">Markt &amp; Strategie</p>
                  <p class="ua-acc-prof-bio">Timo verbindet fundiertes wirtschaftswissenschaftliches Know-how mit einem ausgeprägten Verständnis für digitale Transformation. Mit über 10 Jahren Erfahrung in verschiedenen Branchen bringt er strategisches Denken und klare Marktorientierung in jedes Projekt.</p>
                  <p class="ua-acc-cv-heading">Kurzprofil</p>
                  <ul class="ua-acc-cv">
                    <li>
                      <span class="cv-icon" aria-hidden="true"><!-- Inline SVG: Abschluss-Icon --></span>
                      BSc Betriebsökonomie
                    </li>
                    <li>
                      <span class="cv-icon" aria-hidden="true"><!-- Inline SVG: Buch-Icon --></span>
                      Double MSc Real Estate &amp; International Finance
                    </li>
                    <li>
                      <span class="cv-icon" aria-hidden="true"><!-- Inline SVG: Zertifikat-Icon --></span>
                      MIT Certificate: AI &amp; Digital Transformation
                    </li>
                    <li>
                      <span class="cv-icon" aria-hidden="true"><!-- Inline SVG: Uhr-Icon --></span>
                      10+ Jahre Branchenerfahrung
                    </li>
                  </ul>
                  <a class="ua-acc-linkedin" href="https://www.linkedin.com/in/timo-steinfort-8571971a4/" target="_blank" rel="noopener">
                    <!-- LinkedIn SVG inline -->
                    LinkedIn ansehen
                    <!-- Pfeil SVG inline -->
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Item 2: Prozesse & Data Science -->
          <div class="ua-acc-item reveal reveal-delay-1" role="listitem">
            <button class="ua-acc-header" aria-expanded="false" aria-controls="ua-body-2">
              <div class="ua-acc-left">
                <p class="ua-acc-title">Prozesse &amp; Data Science</p>
                <p class="ua-acc-desc">Wir analysieren Abläufe, Daten und wiederkehrende Entscheidungen. Daraus entstehen smarte Automatisierungen und messbare Grundlagen.</p>
              </div>
              <div class="ua-acc-person">
                <img src="Bilder/Bild_David.jpg" class="ua-acc-avatar" alt="" loading="lazy" decoding="async">
                <div class="ua-acc-person-info">
                  <span class="ua-acc-verantwortlich">Verantwortlich:</span>
                  <span class="ua-acc-person-name">David Staub</span>
                  <span class="ua-acc-person-role">Prozesse &amp; Data Science</span>
                </div>
              </div>
              <svg class="ua-acc-chevron" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <div class="ua-acc-body" id="ua-body-2">
              <div class="ua-acc-divider"></div>
              <div class="ua-acc-profile">
                <div class="ua-acc-photo">
                  <img src="Bilder/Bild_David.jpg" alt="David Staub" loading="lazy" decoding="async">
                </div>
                <div class="ua-acc-text">
                  <p class="ua-acc-prof-name">David Staub</p>
                  <p class="ua-acc-prof-role">Prozesse &amp; Data Science</p>
                  <p class="ua-acc-prof-bio">David verbindet betriebswirtschaftliches Verständnis mit technischer Systematik. Er analysiert Prozesse, Daten und Entscheidungen und übersetzt sie in strukturierte digitale Lösungen.</p>
                  <p class="ua-acc-cv-heading">Kurzprofil</p>
                  <ul class="ua-acc-cv">
                    <li>
                      <span class="cv-icon" aria-hidden="true"><!-- Blitz-Icon --></span>
                      Elektroinstallateur EFZ
                    </li>
                    <li>
                      <span class="cv-icon" aria-hidden="true"><!-- Schild-Icon --></span>
                      Offizier in der Schweizer Armee
                    </li>
                    <li>
                      <span class="cv-icon" aria-hidden="true"><!-- Abschluss-Icon --></span>
                      BSc Wirtschaftsingenieurwesen
                    </li>
                    <li>
                      <span class="cv-icon" aria-hidden="true"><!-- Chart-Icon --></span>
                      MSc Data Science
                    </li>
                  </ul>
                  <a class="ua-acc-linkedin" href="https://www.linkedin.com/in/david-staub-456331237/" target="_blank" rel="noopener">
                    LinkedIn ansehen
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Item 3: Systeme & Engineering (Platzhalter, kein Foto) -->
          <div class="ua-acc-item reveal reveal-delay-2" role="listitem">
            <button class="ua-acc-header" aria-expanded="false" aria-controls="ua-body-3">
              <div class="ua-acc-left">
                <p class="ua-acc-title">Systeme &amp; Engineering</p>
                <p class="ua-acc-desc">Wir bauen stabile technische Fundamente: von IT-Infrastruktur über Cloud-Setups bis zu sauber integrierten Systemen.</p>
              </div>
              <div class="ua-acc-person">
                <!-- Platzhalter wenn kein Foto vorhanden -->
                <div class="ua-acc-avatar-placeholder" aria-hidden="true">
                  <!-- Person-SVG inline -->
                </div>
                <div class="ua-acc-person-info">
                  <span class="ua-acc-verantwortlich">Verantwortlich:</span>
                  <span class="ua-acc-person-name">Sinus Cosinus</span>
                  <span class="ua-acc-person-role">Systeme &amp; Engineering</span>
                </div>
              </div>
              <svg class="ua-acc-chevron" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <div class="ua-acc-body" id="ua-body-3">
              <div class="ua-acc-divider"></div>
              <div class="ua-acc-profile">
                <div class="ua-acc-photo">
                  <div class="ua-acc-photo-placeholder" aria-hidden="true">
                    <!-- Person-SVG inline -->
                  </div>
                </div>
                <div class="ua-acc-text">
                  <p class="ua-acc-prof-name">Sinus Cosinus</p>
                  <p class="ua-acc-prof-role">Systeme &amp; Engineering</p>
                  <p class="ua-acc-prof-bio">Sinus verantwortet Architektur, Infrastruktur und Systemintegrationen. Mit über 10 Jahren Erfahrung im System Engineering stellt er sicher, dass IT sauber, skalierbar und dauerhaft zuverlässig läuft.</p>
                  <p class="ua-acc-cv-heading">Kurzprofil</p>
                  <ul class="ua-acc-cv">
                    <li>
                      <span class="cv-icon" aria-hidden="true"><!-- Zahnrad-Icon --></span>
                      Systemtechniker EFZ
                    </li>
                    <li>
                      <span class="cv-icon" aria-hidden="true"><!-- Monitor-Icon --></span>
                      10+ Jahre System Engineering
                    </li>
                    <li>
                      <span class="cv-icon" aria-hidden="true"><!-- Uhr-Icon --></span>
                      KMU IT-Betreuung
                    </li>
                    <li>
                      <span class="cv-icon" aria-hidden="true"><!-- Cloud-Icon --></span>
                      Microsoft &amp; Cloud Experte
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

        </div><!-- /ua-accordion -->
      </div>
    </section>

    <!-- ============================================================
         SEKTION 3: KONTAKTFORMULAR
         Foto-Hintergrund + 65% Navy-Overlay
    ============================================================ -->
    <section id="kontakt-form-section" class="ua-kontakt" aria-label="Kontaktformular">
      <!-- Hintergrundfoto -->
      <img class="ua-kontakt-bg" src="Bilder/Bild_Zurich_end.avif" alt="" aria-hidden="true" loading="lazy" decoding="async">
      <!-- Overlay -->
      <div class="ua-kontakt-overlay" aria-hidden="true"></div>

      <div class="ua-kontakt-inner">
        <div class="container">

          <!-- Intro -->
          <h2 class="ua-kontakt-heading reveal">Der erste Schritt zu besseren Systemen.</h2>
          <p class="ua-kontakt-sub reveal reveal-delay-1">Nennen Sie uns Ihr Thema. In einem persönlichen Erstgespräch klären wir gemeinsam, wie wir Ihre digitale Weiterentwicklung massgeschneidert voranbringen.</p>

          <div class="ua-kontakt-box">

            <!-- Label -->
            <p class="ua-kontakt-label">Wie möchten Sie starten?</p>

            <!-- Optionskarten -->
            <div class="ua-option-cards">

              <!-- Termin buchen -->
              <a class="ua-option-card" href="https://outlook.office.com/book/Amplifyr1@amplifyr.ch/s/WS-NdYDJS0OKzyBuFjz--A2" target="_blank" rel="noopener">
                <div class="ua-option-icon" aria-hidden="true">
                  <!-- Kalender SVG inline -->
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="4" width="18" height="18" rx="2" stroke="#B0C4DE" stroke-width="1.7"/>
                    <path d="M16 2v4M8 2v4M3 10h18" stroke="#B0C4DE" stroke-width="1.7" stroke-linecap="round"/>
                    <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" stroke="#B0C4DE" stroke-width="2" stroke-linecap="round"/>
                  </svg>
                </div>
                <div class="ua-option-text">
                  <p class="ua-option-title">Termin buchen</p>
                  <p class="ua-option-desc">30 Min. Erstgespräch per Teams</p>
                </div>
                <span class="ua-option-cta">
                  Jetzt buchen
                  <!-- Pfeil SVG inline -->
                </span>
              </a>

              <!-- Nachricht schreiben (Toggle) -->
              <button class="ua-option-card ua-option-card--toggle" id="toggle-form-btn" aria-expanded="false" aria-controls="form-collapse" type="button">
                <div class="ua-option-icon" aria-hidden="true">
                  <!-- Chat SVG inline -->
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="#B0C4DE" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <div class="ua-option-text">
                  <p class="ua-option-title">Nachricht schreiben</p>
                  <p class="ua-option-desc">Formular direkt ausfüllen</p>
                </div>
                <span class="ua-option-cta">
                  Zum Formular
                  <!-- Pfeil-runter SVG inline -->
                </span>
              </button>

            </div><!-- /ua-option-cards -->

            <!-- Einklappbares Formular -->
            <div class="ua-form-collapse" id="form-collapse" aria-hidden="true">
              <form class="ua-contact-form" id="contact-form" novalidate>

                <!-- Honeypot (Spam-Schutz) -->
                <input type="text" name="_gotcha" style="display:none" tabindex="-1" autocomplete="off">
                <input type="hidden" name="access_key" value="DEIN_WEB3FORMS_KEY">
                <input type="hidden" name="subject" value="Neue Anfrage von amplifyr.ch">
                <input type="hidden" name="from_name" value="amplifyr Website">

                <!-- Name + Email -->
                <div class="ua-form-2col">
                  <div class="form-group">
                    <label class="form-label" for="f-name">Name *</label>
                    <input class="form-input" type="text" id="f-name" name="name" required placeholder="Max Muster" autocomplete="name">
                  </div>
                  <div class="form-group">
                    <label class="form-label" for="f-contact">E-Mail *</label>
                    <input class="form-input" type="email" id="f-contact" name="email" required placeholder="mail@firma.ch" autocomplete="email">
                  </div>
                </div>

                <!-- Betreff -->
                <div class="form-group">
                  <label class="form-label" for="f-subject">Betreff *</label>
                  <select class="form-input form-select" id="f-subject" name="subject" required>
                    <option value="" disabled selected>Thema wählen …</option>
                    <option value="Business Amplification">Business Amplification</option>
                    <option value="IT-Lösungen">IT-Lösungen</option>
                    <option value="Betriebs-Software">Betriebs-Software</option>
                    <option value="KI &amp; Automatisierung">KI &amp; Automatisierung</option>
                    <option value="Digitaler Auftritt">Digitaler Auftritt</option>
                  </select>
                </div>

                <!-- Quick-Contact Checkbox -->
                <label class="ua-quick-contact" for="f-quick-contact">
                  <input type="checkbox" id="f-quick-contact" name="quick_contact">
                  <span>Bitte kontaktieren Sie mich — ich hinterlasse hier meine Kontaktdaten.</span>
                </label>

                <!-- Nachricht (wird bei Quick-Contact ausgeblendet) -->
                <div class="form-group" id="message-group">
                  <label class="form-label" for="f-message">Nachricht *</label>
                  <textarea class="form-textarea" id="f-message" name="message" required rows="4" placeholder="Wie können wir helfen?"></textarea>
                </div>

                <!-- Submit -->
                <div class="form-submit-row">
                  <button type="submit" class="btn ua-form-submit">
                    Nachricht senden
                    <!-- Pfeil SVG inline -->
                  </button>
                  <p class="form-micro">
                    <!-- Schloss SVG inline -->
                    Keine Weitergabe an Dritte.
                  </p>
                </div>

              </form>

              <!-- Erfolgs-Meldung (initial versteckt) -->
              <div class="form-success" id="form-success" role="alert" aria-live="polite" hidden>
                <div class="form-success-icon" aria-hidden="true">
                  <!-- Checkmark SVG inline -->
                </div>
                <div class="form-success-title">Nachricht erhalten – danke!</div>
                <p>Wir melden uns innert 24 Stunden bei Ihnen.</p>
              </div>

            </div><!-- /ua-form-collapse -->

            <!-- Direktkontakt -->
            <div class="ua-kontakt-bottom">
              <p class="ua-kontakt-label">Oder direkt kontaktieren</p>
              <div class="ua-direct-cards">

                <!-- Kontakt -->
                <div class="ua-direct-card">
                  <h3 class="ua-direct-card-title">Kontakt</h3>
                  <a href="mailto:info@amplifyr.ch" class="ua-direct-link">
                    <!-- Mail SVG inline -->
                    info@amplifyr.ch
                  </a>
                  <a href="tel:+41447985842" class="ua-direct-link">
                    <!-- Telefon SVG inline -->
                    +41 44 798 58 42
                  </a>
                </div>

                <!-- Adresse -->
                <div class="ua-direct-card">
                  <h3 class="ua-direct-card-title">Adresse</h3>
                  <address class="ua-address">
                    Amplifyr GmbH<br>
                    c/o Timo Steinfort<br>
                    Mettlenstrasse 11<br>
                    8142 Uitikon Waldegg
                  </address>
                </div>

              </div>
            </div>

          </div><!-- /ua-kontakt-box -->
        </div>
      </div>
    </section>

  </main>

  <!-- FOOTER (identisch auf allen Seiten) -->
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

  <!-- JS -->
  <script src="main.js"></script>
  <script src="page-ueber-uns.js"></script>
</body>
</html>
```

---

## `page-ueber-uns.css`

### Hero — Foto-Split

```css
/* ── Hero: Foto-Split ── */
.ua-hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;
  min-height: 100svh;
  position: relative;
  padding-top: var(--header-h);
}

.ua-hero-photo {
  position: relative;
  overflow: hidden;
}
.ua-hero-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.ua-hero-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: var(--space-16) var(--space-12) var(--space-12);
  background: var(--navy);
  color: #fff;
}

.ua-hero-headline {
  font-family: var(--font-display);
  font-size: clamp(1.6rem, 3vw, 2.6rem);
  font-weight: 900;
  line-height: 1.15;
  color: #fff;
  margin-bottom: var(--space-8);
}
.ua-hl-1,
.ua-hl-2 {
  display: block;
}

.ua-slogan {
  display: flex;
  gap: var(--space-3);
  font-family: var(--font-display);
  font-style: italic;
  font-size: clamp(1rem, 1.5vw, 1.2rem);
  color: var(--steel);
  letter-spacing: 0.01em;
}

/* Scroll-Indikator (unten zentriert, über beide Spalten) */
.fsh-scroll {
  position: absolute;
  bottom: 28px;
  left: 50%;
  transform: translateX(-50%);
  width: 22px;
  height: 34px;
  border: 2px solid rgba(255,255,255,0.4);
  border-radius: 11px;
}
.fsh-scroll::after {
  content: '';
  display: block;
  width: 4px;
  height: 8px;
  background: rgba(255,255,255,0.65);
  border-radius: 2px;
  margin: 5px auto 0;
  animation: scrollDot 2s ease-in-out infinite;
}
@keyframes scrollDot {
  0%, 100% { transform: translateY(0); opacity: 1; }
  50%       { transform: translateY(8px); opacity: 0.4; }
}

@media (max-width: 768px) {
  .ua-hero {
    grid-template-columns: 1fr;
    grid-template-rows: 45vh auto;
  }
  .ua-hero-content {
    padding: var(--space-10) var(--space-6) var(--space-12);
  }
}
```

### Team-Akkordeon

```css
/* ── Team-Sektion ── */
.ua-team {
  background: var(--bg-fog);
}

.ua-team-intro {
  max-width: 800px;
  margin-inline: auto;
  text-align: center;
  margin-bottom: var(--space-16);
}
.ua-team-intro h2 {
  margin-bottom: var(--space-5);
}
.ua-team-sub {
  color: var(--text-muted);
  font-size: 1.05rem;
  line-height: 1.75;
  max-width: 640px;
  margin-inline: auto;
}

/* Akkordeon Container */
.ua-accordion {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  max-width: 900px;
  margin-inline: auto;
}

/* Akkordeon Item */
.ua-acc-item {
  background: var(--bg-white);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: box-shadow var(--duration) var(--ease);
}
.ua-acc-item.is-open {
  box-shadow: var(--shadow-md);
}

/* Akkordeon Header (Button) */
.ua-acc-header {
  width: 100%;
  display: flex;
  align-items: center;
  gap: var(--space-6);
  padding: var(--space-6) var(--space-8);
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  transition: background var(--duration) var(--ease);
}
.ua-acc-header:hover {
  background: var(--accent-light);
}

.ua-acc-left {
  flex: 1;
}
.ua-acc-title {
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--navy);
  margin-bottom: var(--space-1);
}
.ua-acc-desc {
  font-size: 0.875rem;
  color: var(--text-muted);
  line-height: 1.6;
}

/* Person-Vorschau */
.ua-acc-person {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  flex-shrink: 0;
}
.ua-acc-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--steel-light);
}
.ua-acc-avatar-placeholder {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--steel-light);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--steel);
}
.ua-acc-person-info {
  display: flex;
  flex-direction: column;
  gap: 1px;
}
.ua-acc-verantwortlich {
  font-size: 0.72rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}
.ua-acc-person-name {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--navy);
}
.ua-acc-person-role {
  font-size: 0.78rem;
  color: var(--text-muted);
}

/* Chevron */
.ua-acc-chevron {
  width: 20px;
  height: 20px;
  color: var(--text-muted);
  flex-shrink: 0;
  transition: transform var(--duration) var(--ease), color var(--duration) var(--ease);
}
.ua-acc-item.is-open .ua-acc-chevron {
  transform: rotate(180deg);
  color: var(--navy);
}

/* Akkordeon Body (aufklappbarer Bereich) */
.ua-acc-body {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s var(--ease);
}
.ua-acc-item.is-open .ua-acc-body {
  /* max-height wird per JS auf scrollHeight gesetzt */
}

.ua-acc-divider {
  height: 1px;
  background: var(--border-light);
  margin: 0 var(--space-8);
}

/* Profil-Layout im aufgeklappten Bereich */
.ua-acc-profile {
  display: grid;
  grid-template-columns: 160px 1fr;
  gap: var(--space-8);
  padding: var(--space-8);
}

.ua-acc-photo img {
  width: 100%;
  border-radius: var(--radius-md);
  aspect-ratio: 3/4;
  object-fit: cover;
}
.ua-acc-photo-placeholder {
  width: 100%;
  aspect-ratio: 3/4;
  background: var(--steel-light);
  border-radius: var(--radius-md);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  color: var(--steel);
}

.ua-acc-prof-name {
  font-family: var(--font-display);
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--navy);
  margin-bottom: var(--space-1);
}
.ua-acc-prof-role {
  font-size: 0.82rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--steel);
  margin-bottom: var(--space-5);
}
.ua-acc-prof-bio {
  color: var(--text-muted);
  line-height: 1.75;
  margin-bottom: var(--space-6);
}
.ua-acc-cv-heading {
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-muted);
  margin-bottom: var(--space-3);
}
.ua-acc-cv {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  margin-bottom: var(--space-6);
}
.ua-acc-cv li {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  font-size: 0.88rem;
  color: var(--text-muted);
}
.cv-icon {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--navy);
  flex-shrink: 0;
}

/* LinkedIn Link */
.ua-acc-linkedin {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--navy);
  border: 1.5px solid var(--border);
  border-radius: var(--radius);
  padding: 8px 14px;
  transition: background var(--duration) var(--ease), border-color var(--duration) var(--ease);
}
.ua-acc-linkedin:hover {
  background: var(--accent-light);
  border-color: var(--navy);
}

@media (max-width: 640px) {
  .ua-acc-header {
    flex-wrap: wrap;
    padding: var(--space-5) var(--space-5);
  }
  .ua-acc-person {
    display: none; /* Person-Vorschau ausblenden auf Mobile */
  }
  .ua-acc-profile {
    grid-template-columns: 1fr;
  }
  .ua-acc-photo {
    max-width: 160px;
  }
}
```

### Kontaktformular-Sektion

```css
/* ── Kontakt-Sektion ── */
.ua-kontakt {
  position: relative;
  padding-block: var(--section-py);
  overflow: hidden;
}

.ua-kontakt-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  z-index: 0;
}
.ua-kontakt-overlay {
  position: absolute;
  inset: 0;
  background: rgba(10, 20, 45, 0.65);
  z-index: 1;
}
.ua-kontakt-inner {
  position: relative;
  z-index: 2;
}

.ua-kontakt-heading {
  color: #fff;
  font-size: clamp(1.8rem, 3vw, 2.6rem);
  line-height: 1.15;
  text-align: center;
  margin-bottom: var(--space-3);
}
.ua-kontakt-sub {
  color: rgba(176, 196, 222, 0.85);
  font-size: clamp(0.95rem, 1.3vw, 1.05rem);
  line-height: 1.75;
  max-width: 560px;
  margin: 0 auto var(--space-10);
  text-align: center;
}

.ua-kontakt-box {
  max-width: 640px;
  margin-inline: auto;
}

/* Sektion-Label */
.ua-kontakt-label {
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(176, 196, 222, 0.6);
  margin-bottom: var(--space-3);
}

/* Optionskarten */
.ua-option-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-3);
  margin-bottom: var(--space-3);
}

.ua-option-card {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  padding: 20px 18px;
  background: rgba(255, 255, 255, 0.15);
  border: 1.5px solid rgba(176, 196, 222, 0.3);
  border-radius: var(--radius-md);
  text-decoration: none;
  color: inherit;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.3);
  transition: background var(--duration) var(--ease),
              box-shadow var(--duration) var(--ease),
              border-color var(--duration) var(--ease);
  cursor: pointer;
  font-family: var(--font-body);
  text-align: left;
}
.ua-option-card:hover {
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 10px 32px rgba(0, 0, 0, 0.45);
}
.ua-option-card--toggle[aria-expanded="true"] {
  background: rgba(176, 196, 222, 0.3);
  border-color: rgba(176, 196, 222, 0.6);
}

.ua-option-icon {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-sm);
  background: rgba(176, 196, 222, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
}
.ua-option-title {
  font-size: 0.88rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 3px;
}
.ua-option-desc {
  font-size: 0.73rem;
  color: rgba(176, 196, 222, 0.7);
  line-height: 1.4;
}
.ua-option-cta {
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--steel);
  display: flex;
  align-items: center;
  gap: var(--space-1);
  margin-top: auto;
}

/* Einklappbares Formular */
.ua-form-collapse {
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  transition: max-height 0.5s var(--ease), opacity 0.4s var(--ease);
}
.ua-form-collapse.is-open {
  opacity: 1;
  /* max-height wird per JS auf scrollHeight gesetzt */
}

/* Formular-Felder im dunklen Kontext */
.ua-contact-form .form-label {
  color: #fff;
  font-weight: 600;
}
.ua-contact-form .form-input,
.ua-contact-form .form-textarea {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(176, 196, 222, 0.35);
  color: #fff;
}
.ua-contact-form .form-input::placeholder,
.ua-contact-form .form-textarea::placeholder {
  color: rgba(255, 255, 255, 0.45);
}
.ua-contact-form .form-input:focus,
.ua-contact-form .form-textarea:focus {
  border-color: var(--steel);
  background: rgba(255, 255, 255, 0.15);
  outline: none;
}
.ua-contact-form .form-select {
  background-color: rgba(255, 255, 255, 0.1);
  /* Dropdown-Pfeil in Steel-Farbe als Data-URI */
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23b0c4de' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round' fill='none'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
}
.ua-contact-form .form-select option {
  background: var(--navy);
  color: #fff;
}

/* 2-Spalten Layout Name/Email */
.ua-form-2col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-5);
}

/* Quick-Contact Checkbox */
.ua-quick-contact {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  cursor: pointer;
  padding: 12px 14px;
  border-radius: var(--radius-sm);
  border: 1px solid rgba(176, 196, 222, 0.35);
  background: rgba(255, 255, 255, 0.07);
  margin-bottom: var(--space-5);
}
.ua-quick-contact input[type="checkbox"] {
  width: 18px;
  height: 18px;
  accent-color: var(--steel);
  flex-shrink: 0;
  cursor: pointer;
}
.ua-quick-contact span {
  font-size: 0.88rem;
  color: rgba(210, 225, 240, 0.9);
  line-height: 1.4;
}

/* Submit Button */
.ua-form-submit {
  background: var(--steel);
  color: var(--navy);
  font-weight: 700;
}
.ua-form-submit:hover {
  background: #c5d8ee;
}

/* Form-Micro */
.form-micro {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: 0.78rem;
  color: rgba(176, 196, 222, 0.7);
}

/* Direktkontakt-Bereich */
.ua-kontakt-bottom {
  margin-top: var(--space-8);
}
.ua-direct-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4);
}
.ua-direct-card {
  padding: var(--space-5) var(--space-6);
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(176, 196, 222, 0.3);
  border-radius: var(--radius-md);
}
.ua-direct-card-title {
  font-size: 1rem;
  color: #fff;
  margin-bottom: var(--space-4);
}
.ua-direct-link {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  font-size: 0.9rem;
  font-weight: 500;
  color: #fff;
  text-decoration: none;
  margin-bottom: var(--space-3);
  transition: color var(--duration) var(--ease);
}
.ua-direct-link:hover {
  color: var(--steel);
}
.ua-address {
  font-style: normal;
  font-size: 0.88rem;
  line-height: 1.9;
  color: rgba(210, 225, 240, 0.9);
}

/* Form Success State */
.form-success {
  text-align: center;
  padding: var(--space-10) var(--space-8);
}
.form-success-icon {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: rgba(176, 196, 222, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto var(--space-5);
  color: var(--steel);
}
.form-success-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: var(--space-2);
}
.form-success p {
  color: rgba(176, 196, 222, 0.8);
}

/* Responsive */
@media (max-width: 640px) {
  .ua-option-cards,
  .ua-direct-cards,
  .ua-form-2col {
    grid-template-columns: 1fr;
  }
}

/* prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  .ua-acc-body,
  .ua-form-collapse,
  .fsh-scroll::after {
    transition: none;
    animation: none;
  }
}
```

---

## `page-ueber-uns.js`

```javascript
'use strict';

// ── Akkordeon ──────────────────────────────────────────────────
(function initAccordion() {
  const items   = Array.from(document.querySelectorAll('.ua-acc-item'));
  const HEADER_H = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h-compact')) || 68;

  function openItem(item) {
    const body = item.querySelector('.ua-acc-body');
    const btn  = item.querySelector('.ua-acc-header');
    if (!body || !btn) return;
    item.classList.add('is-open');
    btn.setAttribute('aria-expanded', 'true');
    body.style.maxHeight = body.scrollHeight + 'px';
  }

  function closeItem(item) {
    const body = item.querySelector('.ua-acc-body');
    const btn  = item.querySelector('.ua-acc-header');
    if (!body || !btn) return;
    item.classList.remove('is-open');
    btn.setAttribute('aria-expanded', 'false');
    body.style.maxHeight = '0';
  }

  // Initial: erstes Item öffnen
  items.forEach((item, i) => {
    const body = item.querySelector('.ua-acc-body');
    if (!body) return;
    if (item.classList.contains('is-open')) {
      body.style.maxHeight = body.scrollHeight + 'px';
    } else {
      body.style.maxHeight = '0';
    }
  });

  // Klick-Handler
  items.forEach(item => {
    const btn = item.querySelector('.ua-acc-header');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      // Alle schliessen
      items.forEach(closeItem);

      // Geklicktes öffnen (wenn es zuvor geschlossen war)
      if (!isOpen) {
        openItem(item);
        // Sanft nach oben scrollen damit Item sichtbar bleibt
        requestAnimationFrame(() => {
          const top = item.getBoundingClientRect().top + window.scrollY - HEADER_H - 16;
          window.scrollTo({ top, behavior: 'smooth' });
        });
      }
    });
  });
})();


// ── Formular-Toggle ───────────────────────────────────────────
(function initFormToggle() {
  const btn      = document.getElementById('toggle-form-btn');
  const collapse = document.getElementById('form-collapse');
  if (!btn || !collapse) return;

  btn.addEventListener('click', () => {
    const isOpen = collapse.classList.contains('is-open');

    if (isOpen) {
      collapse.classList.remove('is-open');
      collapse.style.maxHeight = '0';
      collapse.setAttribute('aria-hidden', 'true');
      btn.setAttribute('aria-expanded', 'false');
    } else {
      collapse.classList.add('is-open');
      collapse.style.maxHeight = collapse.scrollHeight + 200 + 'px';
      collapse.setAttribute('aria-hidden', 'false');
      btn.setAttribute('aria-expanded', 'true');
      // Sanft zum Formular scrollen
      requestAnimationFrame(() => {
        collapse.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });
    }
  });
})();


// ── Quick-Contact Checkbox ────────────────────────────────────
(function initQuickContact() {
  const checkbox     = document.getElementById('f-quick-contact');
  const messageGroup = document.getElementById('message-group');
  const messageField = document.getElementById('f-message');
  if (!checkbox || !messageGroup) return;

  checkbox.addEventListener('change', () => {
    const hide = checkbox.checked;
    messageGroup.style.display = hide ? 'none' : '';
    if (messageField) messageField.required = !hide;
  });
})();


// ── Formular-Submit (web3forms.com) ───────────────────────────
(function initContactForm() {
  const form    = document.getElementById('contact-form');
  const success = document.getElementById('form-success');
  if (!form || !success) return;

  // Einfache Validierung: required-Felder prüfen
  function validate() {
    let valid = true;
    form.querySelectorAll('[required]').forEach(field => {
      const empty = !field.value.trim();
      field.classList.toggle('error', empty);
      if (empty) valid = false;
    });
    return valid;
  }

  // Fehler-Klasse beim Tippen entfernen
  form.querySelectorAll('.form-input, .form-textarea, .form-select').forEach(field => {
    field.addEventListener('input', () => field.classList.remove('error'));
  });

  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (!validate()) {
      const first = form.querySelector('.error');
      if (first) first.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    const submitBtn = form.querySelector('[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Wird gesendet …';
    }

    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data)
      });

      if (res.ok) {
        // Sekundäres CRM-Tracking (optional)
        fetch('/odoo-lead.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        }).catch(() => {});

        form.hidden = true;
        success.hidden = false;
        success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        throw new Error('Serverfehler');
      }
    } catch {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Nachricht senden';
      }
      alert('Fehler beim Senden. Bitte versuchen Sie es erneut oder kontaktieren Sie uns per E-Mail.');
    }
  });
})();
```

---

## Regeln & Hinweise

- **Kein `<style>`** in `ueber-uns.html` — alles in `page-ueber-uns.css`
- **Kein `<script>`** in `ueber-uns.html` — alles in `page-ueber-uns.js`
- Alle SVG-Icons **inline** im HTML (kein externer Font-Icon-Request)
- **`loading="eager"`** nur auf dem Hero-Foto (above the fold), sonst `loading="lazy"`
- **`display:none`-Code** aus der Originalseite (altes Team-Grid, TM-glass-card) **nicht übernehmen**
- **`onmouseover`/`onmouseout`** nicht verwenden — CSS `:hover` Selektoren stattdessen
- Akkordeon: `max-height: 0` → `max-height: scrollHeight + 'px'` via JS (kein clip-path)
- Formular-Collapse: analog Akkordeon mit max-height Transition
- Die `aria-expanded` Attribute auf Buttons müssen korrekt gesetzt werden (Accessibility)
- `form-success` initial mit `hidden`-Attribut (nicht `display:none` via Inline-Style)
- Hero hat **kein Video**, nur ein statisches Foto — keinen `<video>`-Tag verwenden
- Der Header startet im `hero-mode` (weisse Schrift), da Hero-Hintergrund dunkel ist (Navy rechts)
- Für Web3forms: `access_key` Platzhalter durch echten Schlüssel ersetzen

---

## Reale Texte & Inhalte

Verwende exakt diese Texte für die jeweiligen Sektionen:

### Hero (Foto-Split)
```
H1 Zeile 1: Wir schaffen das digitale Fundament,
H1 Zeile 2: damit Ihre Vision Realität wird.
Sub: Build the base.   Lead the race.
```

### Sektion: Team-Übersicht
```
Eyebrow: Drei Perspektiven
H2: Eine digitale Basis.
Sub: Drei Perspektiven, ein gemeinsames Ziel: stabile Systeme, smarte Prozesse und messbare Wirkung für Schweizer KMU.

Perspektive 1:
  Titel: Markt & Strategie
  Text: Wir verbinden Geschäftsverständnis mit digitaler Klarheit. So entstehen Lösungen, die zu Markt, Zielgruppe und Unternehmenszielen passen.
  Verantwortlich: Timo Steinfort

Perspektive 2:
  Titel: Prozesse & Data Science
  Text: Wir analysieren Abläufe, Daten und wiederkehrende Entscheidungen. Daraus entstehen smarte Automatisierungen und messbare Grundlagen.
  Verantwortlich: David Staub

Perspektive 3:
  Titel: Systeme & Engineering
  Text: Wir bauen stabile technische Fundamente: von IT-Infrastruktur über Cloud-Setups bis zu sauber integrierten Systemen.
  Verantwortlich: Sinus Cosinus
```

### Team-Akkordeon (3 Einträge)
```
Person 1 — Timo Steinfort:
  Rolle: Markt & Strategie
  Bio: Timo verbindet fundiertes wirtschaftswissenschaftliches Know-how mit einem ausgeprägten Verständnis für digitale Transformation. Mit über 10 Jahren Erfahrung in der Versicherungs-, Finanz- und Immobilienbranche, einem Doppelmaster und einem MIT-Zertifikat in AI & Digital Transformation bringt er strategisches Denken und klare Marktorientierung in jedes Projekt.
  CV:
    2020  BSc. in Wirtschaftswissenschaften
    2022  Double MSc Real Estate & International Finance
    2026  MIT Certificate: AI & Digital Transformation
  Kurzprofil-Items: BSc Betriebsökonomie / Double MSc Real Estate & International Finance / MIT Certificate: AI & Digital Transformation / 10+ Jahre Branchenerfahrung
  LinkedIn: ja

Person 2 — David Staub:
  Rolle: Prozesse & Data Science
  Bio: David verbindet betriebswirtschaftliches Verständnis mit technischer Systematik. Er analysiert Prozesse, Daten und Entscheidungen und übersetzt sie in strukturierte digitale Lösungen. David bildet das Bindeglied zwischen Business und Technologie. Mit seinem Hintergrund im Wirtschaftsingenieurwesen verbindet er betriebswirtschaftliches Verständnis mit technischem Systemdenken und übersetzt Geschäftsprozesse in strukturierte digitale Lösungen.
  CV:
    2016  Elektroinstallateur EFZ
    2018  Offizier in der Schweizer Armee
    2022  BSc. in Wirtschaftsingenieurwesen
    2025  MSc. in Data Science
  Kurzprofil-Items: Elektroinstallateur EFZ / Offizier in der Schweizer Armee / BSc Wirtschaftsingenieurwesen / MSc Data Science
  LinkedIn: ja (Folgt)

Person 3 — Sinus Cosinus:
  Rolle: Systeme & Engineering
  Bio: Sinus Cosinus ist der technologische Rückgrat von Amplifyr. Mit über 10 Jahren Erfahrung im System Engineering verantwortet er Architektur, Infrastruktur und Systemintegrationen — und stellt sicher, dass die IT unserer Kunden stabil, skalierbar und dauerhaft zuverlässig läuft.
  CV:
    EFZ  Systemtechniker
    10 J.+  System Engineering Erfahrung
    5 J.+  Komplette KMU IT-Betreuung
    IT  Microsoft & Cloud Experte
  Kurzprofil-Items: Systemtechniker / 10+ Jahre System Engineering / KMU IT-Betreuung / Microsoft & Cloud Experte
  LinkedIn: Amplifyr Profil
```

### Stats-Karte (Über uns Profil)
```
Standort: Zürich, CH
Stats: Business & Strategie 90% / IT & Technologie 96% / KMU Betreuung 100% / Digitale Transformation 93%
Badges: 100% Schweizer KMU Fokus / Spezialisten / 10+ Jahre Erfahrung / 100% massgeschneidert / Einsatzbereit ab Tag 1
```

### Kontaktformular-Sektion
```
H2: Der erste Schritt zu besseren Systemen.
Sub: Nennen Sie uns Ihr Thema. In einem persönlichen Erstgespräch klären wir gemeinsam, wie wir Ihre digitale Weiterentwicklung massgeschneidert voranbringen.

Option 1 (hell):
  Titel: Termin buchen
  Sub: 30 Min. Erstgespräch per Teams
  CTA: Jetzt buchen (→ Calendly)

Option 2 (dunkel/Navy):
  Titel: Nachricht schreiben
  Sub: Formular direkt ausfüllen
  CTA: Zum Formular (öffnet eingebettetes Formular)

Formular-Felder:
  Name * / E-Mail * / Betreff * (Dropdown) / Nachricht *
  Dropdown-Optionen: Business Amplification / IT-Lösungen / Betriebs-Software / KI & Automatisierung / Digitaler Auftritt
  Checkbox: Bitte kontaktieren Sie mich — ich hinterlasse hier meine Kontaktdaten.
  Submit: Nachricht senden
  Disclaimer: Keine Weitergabe an Dritte.
  Danke-Message: Nachricht erhalten – danke! Wir melden uns innert 24 Stunden bei Ihnen.

Direktkontakt:
  E-Mail: info@amplifyr.ch
  Telefon: +41 44 798 58 42
  Adresse: Amplifyr GmbH / c/o Timo Steinfort / Mettlenstrasse 11 / 8142 Uitikon Waldegg
```
