# Prompt 09 — `formular.html` + `page-formular.css` + `page-formular.js`

## Kontext & Ziel

Erstelle die **Standalone-Kontaktformular-Seite** für die Amplifyr-Website.
Diese Seite hat keinen Hero — sie startet direkt mit dem weissen Formular-Bereich.
Sie dient als direkter Einstiegspunkt (z.B. von CTA-Links auf anderen Seiten).

Lies zuerst:
- `style.css` — Design System (Custom Properties, Reset, Header, Footer, Form-Styles)
- `main.js` — Header-Scroll, Hamburger, Mobile-Menü, animateOnScroll

Erstelle dann:
- `formular.html` — nur HTML, kein `<style>`, kein `<script>`
- `page-formular.css` — nur page-spezifisches CSS
- `page-formular.js` — nur page-spezifisches JS

---

## Seitenstruktur

Die Seite besteht aus **2 Bereichen** (keine Sektionen mit `<section>`):

1. **Auswahl-Bereich** — weisser Hintergrund, zentriert, zwei Optionskarten + einklappbares Formular
2. **Direktkontakt-Bereich** — weisser Hintergrund, 2 Info-Karten (Kontakt + Adresse)

---

## `formular.html` — Grundgerüst

```html
<!DOCTYPE html>
<html lang="de-CH">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Kontakt — Gespräch vereinbaren | amplifyr</title>
  <meta name="description" content="Vereinbaren Sie ein kostenloses Erstgespräch mit Amplifyr oder senden Sie uns eine Nachricht. Wir melden uns innert 24 Stunden." />

  <!-- Favicons -->
  <link rel="icon" type="image/x-icon" href="/Favicon/favicon.ico" />
  <link rel="icon" type="image/png" sizes="32x32" href="/Favicon/favicon_32x32.png" />
  <link rel="icon" type="image/png" sizes="16x16" href="/Favicon/favicon_16x16.png" />
  <link rel="apple-touch-icon" sizes="180x180" href="/Favicon/favicon_180x180.png" />
  <link rel="icon" type="image/png" sizes="192x192" href="/Favicon/favicon_192x192.png" />

  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Kontakt | amplifyr" />
  <meta property="og:description" content="Vereinbaren Sie ein kostenloses Erstgespräch oder senden Sie uns eine Nachricht." />
  <meta property="og:image" content="https://amplifyr.ch/Logos/Open_Graph_Image_Amplifyr.webp" />
  <meta property="og:url" content="https://www.amplifyr.ch/formular" />
  <link rel="canonical" href="https://www.amplifyr.ch/formular" />

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />

  <!-- Shared + Page CSS -->
  <link rel="stylesheet" href="style.css" />
  <link rel="stylesheet" href="page-formular.css" />
</head>
<body>

  <!-- HEADER — kein hero-mode, Header ist immer weiss (legal-mode) -->
  <header id="site-header" class="legal-mode">
    <!-- Navigation wie in 02_navigation-footer.md definiert -->
    <!-- kein nav-link erhält Klasse active (Formular ist kein Top-Nav-Punkt) -->
  </header>

  <!-- MOBILE MENU -->
  <nav class="mobile-menu" id="mobile-menu" aria-label="Mobile Navigation">
    <!-- wie in 02_navigation-footer.md -->
  </nav>

  <main id="page-formular">

    <!-- ============================================================
         BEREICH 1: AUSWAHL + FORMULAR
    ============================================================ -->
    <div class="fs-top">
      <div class="fs-top-inner">

        <!-- Label -->
        <p class="fs-eyebrow">Wie möchten Sie starten?</p>
        <h1 class="fs-heading">Wählen Sie Ihren Weg</h1>

        <!-- Optionskarten -->
        <div class="fs-options">

          <!-- Termin buchen (helle Karte) -->
          <a class="fs-option-card fs-option-card--light"
             href="https://outlook.office.com/book/Amplifyr1@amplifyr.ch/s/WS-NdYDJS0OKzyBuFjz--A2"
             target="_blank" rel="noopener">
            <div class="fs-option-icon fs-option-icon--light" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="4" width="18" height="18" rx="2" stroke="#1a2744" stroke-width="1.7"/>
                <path d="M16 2v4M8 2v4M3 10h18" stroke="#1a2744" stroke-width="1.7" stroke-linecap="round"/>
                <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" stroke="#1a2744" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </div>
            <div class="fs-option-text">
              <p class="fs-option-title fs-option-title--light">Termin buchen</p>
              <p class="fs-option-desc">30 Min. kostenloses Erstgespräch — unverbindlich, direkt per Teams.</p>
            </div>
            <span class="fs-option-cta fs-option-cta--light">
              Jetzt buchen
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
          </a>

          <!-- Nachricht senden (dunkle Karte) -->
          <button class="fs-option-card fs-option-card--dark" id="toggle-form-fs"
                  type="button" aria-expanded="false" aria-controls="form-collapse-fs">
            <div class="fs-option-icon fs-option-icon--dark" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                      stroke="#B0C4DE" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="fs-option-text">
              <p class="fs-option-title fs-option-title--dark">Nachricht senden</p>
              <p class="fs-option-desc fs-option-desc--dark">Schildern Sie Ihr Anliegen — wir melden uns prompt.</p>
            </div>
            <span class="fs-option-cta fs-option-cta--dark">
              Zum Formular
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 2v8M3 7l3 3 3-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
          </button>

        </div><!-- /fs-options -->

        <!-- Einklappbares Formular -->
        <div class="fs-form-collapse" id="form-collapse-fs" aria-hidden="true">
          <form class="fs-form" id="contact-form-fs" novalidate>

            <!-- Spam-Schutz + web3forms -->
            <input type="text" name="_gotcha" style="display:none" tabindex="-1" autocomplete="off">
            <input type="hidden" name="access_key" value="DEIN_WEB3FORMS_KEY">
            <input type="hidden" name="from_name" value="amplifyr Formular">

            <!-- Name + Email -->
            <div class="fs-form-2col">
              <div class="form-group">
                <label class="form-label" for="fs-name">Name *</label>
                <input class="form-input" type="text" id="fs-name" name="name"
                       required placeholder="Max Muster" autocomplete="name">
              </div>
              <div class="form-group">
                <label class="form-label" for="fs-contact">E-Mail *</label>
                <input class="form-input" type="email" id="fs-contact" name="email"
                       required placeholder="mail@firma.ch" autocomplete="email">
              </div>
            </div>

            <!-- Thema -->
            <div class="form-group">
              <label class="form-label" for="fs-subject">Thema *</label>
              <select class="form-input form-select" id="fs-subject" name="subject" required>
                <option value="" disabled selected>Thema wählen …</option>
                <option value="Business Amplification">Business Amplification (Digitale Transformation)</option>
                <option value="IT-Lösungen">IT-Lösungen</option>
                <option value="Betriebs-Software">Betriebs-Software</option>
                <option value="KI & Automatisierung">KI &amp; Automatisierung</option>
                <option value="Digitaler Auftritt">Digitaler Auftritt</option>
              </select>
            </div>

            <!-- Quick-Contact Checkbox (custom styled) -->
            <label class="fs-callback-label" for="fs-callback" id="fs-callback-wrapper">
              <div class="fs-checkbox-box" id="fs-checkbox-box" aria-hidden="true">
                <svg class="fs-checkbox-check" id="fs-checkbox-check" width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6l3 3 5-5" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <span>Bitte kontaktieren Sie mich — ich hinterlasse hier meine Kontaktdaten.</span>
              <input type="checkbox" id="fs-callback" name="callback" class="sr-only">
            </label>

            <!-- Nachricht -->
            <div class="form-group" id="fs-message-wrap">
              <label class="form-label" for="fs-message">Nachricht *</label>
              <textarea class="form-textarea" id="fs-message" name="message"
                        required rows="4" placeholder="Wie können wir helfen?"></textarea>
            </div>

            <!-- Submit -->
            <div class="form-submit-row">
              <button type="submit" class="btn btn--primary fs-submit">
                Nachricht senden
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <p class="form-micro">
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <rect x="3" y="6" width="8" height="6" rx="1" stroke="currentColor" stroke-width="1.4"/>
                  <path d="M5 6V4.5a2 2 0 0 1 4 0V6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
                </svg>
                Keine Weitergabe an Dritte.
              </p>
            </div>

          </form>

          <!-- Erfolgs-Meldung -->
          <div class="form-success" id="form-success-fs" role="alert" aria-live="polite" hidden>
            <div class="form-success-icon" aria-hidden="true">
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                <path d="M5 13l5 5 11-11" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="form-success-title">Nachricht erhalten – danke!</div>
            <p>Wir melden uns innert 24 Stunden bei Ihnen.</p>
          </div>

        </div><!-- /form-collapse-fs -->

      </div><!-- /fs-top-inner -->
    </div><!-- /fs-top -->

    <!-- ============================================================
         BEREICH 2: DIREKTKONTAKT
    ============================================================ -->
    <div class="fs-contact">
      <div class="fs-contact-inner">
        <p class="fs-eyebrow">Oder direkt kontaktieren</p>
        <div class="fs-contact-cards">

          <!-- Direktkontakt -->
          <div class="fs-contact-card">
            <h2 class="fs-contact-card-title">Kontaktieren Sie uns direkt</h2>
            <a href="mailto:info@amplifyr.ch" class="fs-contact-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="2" y="4" width="20" height="16" rx="2" stroke="#B0C4DE" stroke-width="1.7"/>
                <path d="M2 7l10 7 10-7" stroke="#B0C4DE" stroke-width="1.7" stroke-linecap="round"/>
              </svg>
              info@amplifyr.ch
            </a>
            <a href="tel:+41447985842" class="fs-contact-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1z"
                      stroke="#B0C4DE" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              +41 44 798 58 42
            </a>
          </div>

          <!-- Adresse -->
          <div class="fs-contact-card">
            <h2 class="fs-contact-card-title">Adresse</h2>
            <address class="fs-address">
              Amplifyr GmbH<br>
              c/o Timo Steinfort<br>
              Mettlenstrasse 11<br>
              8142 Uitikon Waldegg
            </address>
          </div>

        </div>
      </div>
    </div>

  </main>

  <!-- FOOTER -->
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

  <script src="main.js"></script>
  <script src="page-formular.js"></script>
</body>
</html>
```

---

## `page-formular.css`

```css
/* ── Auswahl-Bereich ── */
.fs-top {
  background: var(--bg-white);
  padding: calc(var(--header-h) + clamp(32px, 5vh, 56px)) clamp(16px, 5vw, 40px) clamp(40px, 6vh, 64px);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.fs-top-inner {
  width: 100%;
  max-width: 680px;
}

.fs-eyebrow {
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--steel);
  margin-bottom: var(--space-2);
}
.fs-heading {
  font-family: var(--font-display);
  font-size: clamp(1.3rem, 2vw, 1.8rem);
  font-weight: 900;
  color: var(--navy);
  margin-bottom: var(--space-6);
  line-height: 1.15;
}

/* Optionskarten */
.fs-options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4);
  margin-bottom: var(--space-4);
}

.fs-option-card {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  padding: 24px 22px;
  border-radius: var(--radius-lg);
  text-decoration: none;
  text-align: left;
  cursor: pointer;
  font-family: var(--font-body);
  transition: transform var(--duration) var(--ease),
              box-shadow var(--duration) var(--ease),
              border-color var(--duration) var(--ease);
}

/* Helle Karte */
.fs-option-card--light {
  background: var(--bg-white);
  border: 1.5px solid var(--border-light);
  box-shadow: var(--shadow);
  color: inherit;
}
.fs-option-card--light:hover {
  border-color: var(--navy);
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

/* Dunkle Karte */
.fs-option-card--dark {
  background: var(--navy);
  border: 1.5px solid var(--navy);
  box-shadow: 0 4px 20px rgba(26, 39, 68, 0.22);
}
.fs-option-card--dark:hover {
  box-shadow: 0 8px 32px rgba(26, 39, 68, 0.32);
  transform: translateY(-2px);
}

.fs-option-icon {
  width: 42px;
  height: 42px;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.fs-option-icon--light { background: var(--steel-light); }
.fs-option-icon--dark  { background: rgba(176, 196, 222, 0.18); }

.fs-option-title {
  font-family: var(--font-display);
  font-size: 0.98rem;
  font-weight: 700;
  margin-bottom: 5px;
}
.fs-option-title--light { color: var(--navy); }
.fs-option-title--dark  { color: #fff; }

.fs-option-desc {
  font-size: 0.78rem;
  color: var(--text-muted);
  line-height: 1.5;
}
.fs-option-desc--dark { color: rgba(176, 196, 222, 0.8); }

.fs-option-cta {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  font-size: 0.72rem;
  font-weight: 700;
  margin-top: auto;
}
.fs-option-cta--light { color: var(--navy); }
.fs-option-cta--dark  { color: var(--steel); }

/* Einklappbares Formular */
.fs-form-collapse {
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  transition: max-height 0.5s var(--ease), opacity 0.4s var(--ease);
  text-align: left;
}
.fs-form-collapse.is-open {
  opacity: 1;
  /* max-height wird per JS auf scrollHeight gesetzt */
}
.fs-form {
  display: flex;
  flex-direction: column;
  gap: 0;
  padding-top: var(--space-6);
}
.fs-form-2col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4);
}

/* Callback-Checkbox */
.fs-callback-label {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: 16px 20px;
  background: var(--bg-white);
  border: 1.5px solid var(--border-light);
  border-radius: var(--radius-md);
  cursor: pointer;
  margin-bottom: var(--space-4);
  transition: border-color var(--duration) var(--ease);
}
.fs-callback-label:has(input:checked) {
  border-color: var(--navy);
}
.fs-checkbox-box {
  width: 20px;
  height: 20px;
  border: 2px solid var(--border);
  border-radius: 5px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background var(--duration), border-color var(--duration);
}
.fs-callback-label:has(input:checked) .fs-checkbox-box {
  background: var(--navy);
  border-color: var(--navy);
}
.fs-checkbox-check {
  opacity: 0;
  transition: opacity var(--duration);
}
.fs-callback-label:has(input:checked) .fs-checkbox-check {
  opacity: 1;
}
.fs-callback-label span {
  font-size: 0.9rem;
  color: var(--navy);
  font-weight: 500;
}

/* Screenreader-only für verstecktes Checkbox-Input */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
  white-space: nowrap;
  border: 0;
}

/* Submit */
.fs-submit {
  border-radius: var(--radius-pill);
  padding: 13px 32px;
}

/* Direktkontakt-Bereich */
.fs-contact {
  background: var(--bg-white);
  padding: 0 clamp(16px, 5vw, 80px) clamp(48px, 6vh, 64px);
}
.fs-contact-inner {
  max-width: 680px;
  margin-inline: auto;
}
.fs-contact .fs-eyebrow {
  text-align: center;
  margin-bottom: var(--space-4);
}
.fs-contact-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-5);
}
.fs-contact-card {
  background: var(--bg-white);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-xl);
  padding: 28px 24px;
}
.fs-contact-card-title {
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--navy);
  margin-bottom: var(--space-5);
}
.fs-contact-link {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  color: var(--navy);
  text-decoration: none;
  margin-bottom: var(--space-4);
  font-size: 0.9rem;
  transition: color var(--duration) var(--ease);
}
.fs-contact-link:hover { color: var(--steel); }
.fs-address {
  font-style: normal;
  font-size: 0.9rem;
  line-height: 1.8;
  color: var(--text-muted);
}

/* Responsive */
@media (max-width: 560px) {
  .fs-options,
  .fs-form-2col,
  .fs-contact-cards {
    grid-template-columns: 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  .fs-option-card,
  .fs-form-collapse,
  .fs-checkbox-box,
  .fs-checkbox-check {
    transition: none;
  }
}
```

---

## `page-formular.js`

```javascript
'use strict';

// ── Form Toggle ────────────────────────────────────────────────
(function initFormToggle() {
  const btn      = document.getElementById('toggle-form-fs');
  const collapse = document.getElementById('form-collapse-fs');
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
      requestAnimationFrame(() => {
        collapse.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });
    }
  });
})();


// ── Callback Checkbox ──────────────────────────────────────────
(function initCallback() {
  const checkbox   = document.getElementById('fs-callback');
  const msgWrap    = document.getElementById('fs-message-wrap');
  const msgField   = document.getElementById('fs-message');
  if (!checkbox || !msgWrap) return;

  checkbox.addEventListener('change', () => {
    const hide = checkbox.checked;
    msgWrap.style.display = hide ? 'none' : '';
    if (msgField) msgField.required = !hide;
  });
})();


// ── Form Submit ────────────────────────────────────────────────
(function initFormSubmit() {
  const form    = document.getElementById('contact-form-fs');
  const success = document.getElementById('form-success-fs');
  if (!form || !success) return;

  function validate() {
    let valid = true;
    form.querySelectorAll('[required]').forEach(field => {
      const empty = !field.value.trim();
      field.classList.toggle('error', empty);
      if (empty) valid = false;
    });
    return valid;
  }

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
      alert('Fehler beim Senden. Bitte versuchen Sie es erneut.');
    }
  });
})();
```

---

## Regeln & Hinweise

- Header startet im `legal-mode` (weisser Header ohne Hero-Modus)
- **Kein Hero-Bereich** — Seite beginnt direkt unterhalb des Headers
- `onmouseover`/`onmouseout` aus Original **nicht übernehmen** → CSS `:hover` stattdessen
- Checkbox-Styling via CSS `:has(input:checked)` (kein JS für visuelle Updates)
- Fallback für ältere Browser ohne `:has()`: JS-Klasse `.is-checked` auf `.fs-callback-label`
- `form-success` initial mit `hidden`-Attribut (nicht `display:none`)
- web3forms `access_key` durch echten Schlüssel ersetzen
- `/odoo-lead.php` als sekundäres CRM-Tracking (nicht blockierend, `.catch()`)

---

## Reale Texte & Inhalte

Verwende exakt diese Texte:

### Seitenheader
```
H1: Wie möchten Sie starten?
Sub: Wählen Sie Ihren Weg
```

### Optionskarten
```
Karte 1 (hell):
  Titel: Termin buchen
  Text: 30 Min. kostenloses Erstgespräch — unverbindlich, direkt per Teams.
  CTA: Jetzt buchen

Karte 2 (dunkel/Navy):
  Titel: Nachricht senden
  Text: Schildern Sie Ihr Anliegen — wir melden uns prompt.
  CTA: Zum Formular
```

### Formular
```
Felder: Name * / E-Mail * / Thema * / Nachricht *
Dropdown-Optionen:
  Thema wählen …
  Business Amplification (Digitale Transformation)
  IT-Lösungen
  Betriebs-Software
  KI & Automatisierung
  Digitaler Auftritt
Checkbox: Bitte kontaktieren Sie mich — ich hinterlasse hier meine Kontaktdaten.
Submit: Nachricht senden
Disclaimer: Keine Weitergabe an Dritte.
Danke-Message: Nachricht erhalten – danke! Wir melden uns innert 24 Stunden bei Ihnen.
```

### Direktkontakt-Bereich
```
Titel: Oder direkt kontaktieren / Kontaktieren Sie uns direkt
E-Mail: info@amplifyr.ch
Telefon: +41 44 798 58 42
Adresse: Amplifyr GmbH / c/o Timo Steinfort / Mettlenstrasse 11 / 8142 Uitikon Waldegg
```
