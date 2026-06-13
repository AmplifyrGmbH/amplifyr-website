# Prompt 04 — IT-Lösungen (it-solutions.html)

Erstelle die vollständige `it-solutions.html` für die Amplifyr-Website.

## Voraussetzungen

- `style.css` + `main.js` existieren (Prompt 01 + 02)
- Navigation + Footer 1:1 aus Prompt 02
- Page-spezifisches CSS → `page-it-solutions.css`
- Page-spezifisches JS → `page-it-solutions.js`
- Kein Inline-CSS, keine `<style>` Tags im Body
- Alle Bilder: `loading="lazy"`, `decoding="async"`
- Header startet mit Klasse `hero-mode` (Video-Hero)

---

## `<head>`

```html
<title>IT-Solutions für KMU — Outsourcing, Managed Services & Cloud | Amplifyr</title>
<meta name="description" content="Zuverlässige IT-Infrastruktur, Outsourcing und Managed Services für Schweizer KMU. Amplifyr ist Ihr IT-Partner in der Region Zürich." />
<link rel="canonical" href="https://www.amplifyr.ch/it-solutions" />
```

Open Graph + Twitter Card analog zur Hauptseite, URL: `https://www.amplifyr.ch/it-solutions`

---

## Seitenstruktur

```
<header> (hero-mode)
<nav class="mobile-menu">
<main>
  Section 1: .fsh #fsh-it         — Hero
  Section 2: #sec-outsourcing     — IT-Outsourcing
  Section 3: #sec-managed         — Managed Services
  Section 4: #sec-cloud           — Cloud & Microsoft 365
  <aside>   .its-partners         — Partner-Ticker
  Section 5: .its-cta             — CTA
</main>
<footer>
<script src="main.js">
<script src="page-it-solutions.js">
```

---

## Section 1: Hero (`#fsh-it`)

### HTML
```html
<section class="fsh" id="fsh-it" aria-label="IT-Lösungen Hero">
  <video class="fsh-video" autoplay muted playsinline preload="auto">
    <source src="Animationen/Animation_IT_Dienstleistung.webm" type="video/webm">
    <source src="Animationen/Animation_IT_Dienstleistung.mp4" type="video/mp4">
  </video>
  <div class="fsh-overlay" aria-hidden="true"></div>
  <div class="container fsh-inner">
    <div class="fsh-content">
      <h1 class="fsh-heading">IT <em class="fsh-em">amplified</em></h1>
      <p class="fsh-sub">Wir schaffen die technologische Grundlage für stabile, sichere und skalierbare Unternehmenssysteme — eine rundum funktionierende und zukunftsgerichtete IT.</p>
      <div class="fsh-actions">
        <a class="btn btn--primary" href="/formular.html">IT-Audit anfragen</a>
      </div>
      <nav class="fsh-subnav" aria-label="Seitennavigation">
        <a class="fsh-subnav-btn" href="#sec-outsourcing">IT-Outsourcing</a>
        <a class="fsh-subnav-btn" href="#sec-managed">Managed Services</a>
        <a class="fsh-subnav-btn" href="#sec-cloud">Cloud & Microsoft 365</a>
      </nav>
    </div>
  </div>
  <div class="fsh-scroll-cue" aria-hidden="true"></div>
</section>
```

### CSS (page-it-solutions.css)
- `.fsh`: position relative, min-height 100vh, display flex, align-items center, background var(--navy)
- `.fsh-video`: position absolute, inset 0, width/height 100%, object-fit cover, z-index 0
- `.fsh-overlay`: position absolute, inset 0, background `linear-gradient(135deg, rgba(10,18,40,0.72) 0%, rgba(10,18,40,0.45) 100%)`, z-index 1
- `.fsh-inner`: position relative, z-index 2
- `.fsh-content`: text-align center, max-width 720px, margin auto
- `.fsh-heading`: h1-Grösse clamp(2.8rem, 6vw, 5.5rem), color #fff, font-family var(--font-display), font-weight 900
- `.fsh-em`: font-style italic, color var(--steel)
- `.fsh-sub`: color rgba(255,255,255,0.82), font-size clamp(1rem,1.4vw,1.2rem), margin-top var(--space-6)
- `.fsh-actions`: margin-top var(--space-8), display flex, justify-content center
- `.fsh-subnav`: margin-top var(--space-8), display flex, gap var(--space-3), justify-content center, flex-wrap wrap
- `.fsh-subnav-btn`: font-size 0.82rem, font-weight 600, color rgba(255,255,255,0.7), border 1px solid rgba(255,255,255,0.25), border-radius var(--radius-pill), padding 6px 16px, transition all var(--duration)
- `.fsh-subnav-btn:hover`: color #fff, border-color rgba(255,255,255,0.6), background rgba(255,255,255,0.08)

**Hinweis:** WebM-Datei muss noch erstellt werden. Fallback auf MP4 funktioniert bereits.

---

## Section 2: IT-Outsourcing (`#sec-outsourcing`)

### HTML
```html
<section id="sec-outsourcing" class="section section--white" aria-labelledby="ito-h">
  <div class="container">

    <div class="its-section-header">
      <p class="section-label">IT-Outsourcing</p>
      <h2 id="ito-h">Wir übernehmen Ihre IT.</h2>
      <p class="its-intro">Stellen Sie sich vor: Ihre IT funktioniert einwandfrei — keine Ausfälle, kein Stress und keine unerwarteten Kosten. Als Ihr externer IT-Partner übernehmen wir die komplette Verantwortung für Ihre gesamte IT-Infrastruktur. Klar, verlässlich, modern.</p>
      <p class="its-intro-em">Amplifyr ist Ihr vertrauenswürdiger IT-Dienstleister für Wartung, Störungsbehebung und zukunftsgerichtete Beratung.</p>
    </div>

    <div class="ito-grid">

      <div class="ito-card">
        <span class="ito-card-num">01</span>
        <div class="ito-card-icon"><!-- SVG --></div>
        <h3>Komplette IT-Übernahme</h3>
        <p>Als externer IT-Partner arbeiten wir Hand in Hand mit Ihrem Betrieb und gehen auf Ihre Bedürfnisse ein. Sie benötigen kein IT-Fachpersonal. Wir kümmern uns um:</p>
        <ul class="ito-bullets">
          <li>Geräte, Netzwerk, Server & Peripherie</li>
          <li>Benutzerkonten & Zugriffsrechte</li>
          <li>Software-Lizenzen & Updates</li>
          <li>Vollständige IT-Dokumentation</li>
        </ul>
        <p class="ito-card-em">Amplifyr wird zu Ihrem Partner und Berater für pragmatische und kosteneffiziente Lösungen.</p>
      </div>

      <div class="ito-card">
        <span class="ito-card-num">02</span>
        <div class="ito-card-icon"><!-- SVG --></div>
        <h3>IT Support mit individuellem Service Level Agreement (SLA)</h3>
        <p>Wenn etwas nicht funktioniert, sind wir da — schnell und zuverlässig. Wir vereinbaren mit Ihnen Verbindlichkeiten, die zu Ihrem Unternehmen passen.</p>
        <ul class="ito-bullets">
          <li>Reaktionszeit bei Störungen unter 2 Stunden (Standard)</li>
          <li>Telefonischer Support & Fernwartung</li>
          <li>Vor-Ort-Einsatz bei Bedarf</li>
          <li>SLA-Pakete individuell wählbar</li>
        </ul>
        <p class="ito-card-em">Mit einem SLA klären wir gegenseitige Erwartungen und Machbarkeiten.</p>
      </div>

      <div class="ito-card">
        <span class="ito-card-num">03</span>
        <div class="ito-card-icon"><!-- SVG --></div>
        <h3>IT-Projekte & Digitalisierung</h3>
        <p>Stehen räumliche oder geographische Veränderungen an? Wir planen und setzen Ihre IT-Projekte um: gut organisiert, termin- und budgetgerecht.</p>
        <ul class="ito-bullets">
          <li>Infrastruktur-Aufbau/Anpassungen & Migrationen</li>
          <li>Digitalisierung von Arbeitsprozessen</li>
          <li>Büroumzüge & Standorterweiterungen</li>
          <li>Einführung neuer Softwarelösungen</li>
        </ul>
        <p class="ito-card-em">Mit Amplifyr können Sie sorglos Veränderungen entgegensteuern.</p>
      </div>

      <div class="ito-card">
        <span class="ito-card-num">04</span>
        <div class="ito-card-icon"><!-- SVG --></div>
        <h3>Managed Services</h3>
        <p>Unsere Managed Services überwachen und optimieren Ihre Systeme vollautomatisch — rund um die Uhr, ohne dass Sie etwas tun müssen.</p>
        <ul class="ito-bullets">
          <li>24/7 Monitoring aller Systeme</li>
          <li>Automatische Updates & Patches</li>
          <li>Backup-Überwachung & Wiederherstellung</li>
          <li>Endpoint Security & Virenschutz</li>
        </ul>
        <p class="ito-card-em">Amplifyr überwacht, verwaltet, wartet und optimiert Ihre IT-Prozesse und Infrastrukturen.</p>
      </div>

      <div class="ito-card">
        <span class="ito-card-num">05</span>
        <div class="ito-card-icon"><!-- SVG --></div>
        <h3>Cloud & Microsoft 365</h3>
        <p>Arbeiten von überall — sicher und mit modernsten Tools. Wir migrieren Ihr Unternehmen in die Cloud und betreuen Ihre Microsoft 365 Umgebung laufend.</p>
        <ul class="ito-bullets">
          <li>Microsoft 365 Setup & Migration</li>
          <li>Teams, SharePoint & Exchange Online</li>
          <li>Sicherer Zugriff von unterwegs</li>
          <li>Automatische Cloud-Backups</li>
        </ul>
        <p class="ito-card-em">Damit Cloud nicht einfach nur eine Wolke ist, sondern Ressourcenoptimierung.</p>
      </div>

      <div class="ito-card">
        <span class="ito-card-num">06</span>
        <div class="ito-card-icon"><!-- SVG --></div>
        <h3>Kosteneinsparungen</h3>
        <p>IT muss nicht teuer sein — wenn sie richtig geplant ist. Wir ersetzen unerwartete Rechnungen durch transparente Pauschalen.</p>
        <ul class="ito-bullets">
          <li>Fixe, planbare Monatspauschalen</li>
          <li>Keine teuren Notfall-Einsätze mehr</li>
          <li>Lizenz-Optimierung & Kostenkontrolle</li>
        </ul>
        <p class="ito-card-em">Nutzen Sie Ihr Geld für wichtige Investitionen statt für überteuerte IT-Notfallübungen.</p>
      </div>

    </div>
  </div>
</section>
```

### CSS (page-it-solutions.css)
- `.its-section-header`: max-width 720px, margin-bottom var(--space-12)
- `.its-intro`: color var(--text-muted), font-size 1.05rem, margin-top var(--space-5)
- `.its-intro-em`: font-size 0.88rem, color var(--navy), font-weight 600, margin-top var(--space-2)
- `.ito-grid`: display grid, 3 Spalten Desktop, 2 Tablet (768px), 1 Mobile (480px), gap var(--space-6)
- `.ito-card`: background var(--bg-white), border 1px solid var(--border), border-radius var(--radius-lg), padding var(--space-8), display flex, flex-direction column, gap var(--space-4)
- `.ito-card:hover`: border-color var(--navy), box-shadow var(--shadow-md), transform translateY(-3px)
- `.ito-card-num`: font-family var(--font-display), font-size 1.6rem, font-weight 900, color var(--steel), line-height 1
- `.ito-card-icon`: width 44px, height 44px, border-radius 12px, background linear-gradient(135deg, var(--navy) 0%, #1e3a7a 100%), display flex, align-items center, justify-content center, color #fff
- `.ito-bullets`: display flex, flex-direction column, gap var(--space-2), list-style none, padding-left var(--space-4)
- `.ito-bullets li::before`: content "–", color var(--steel), margin-right var(--space-2)
- `.ito-card-em`: font-size 0.82rem, color var(--navy), font-weight 600, margin-top auto

### SVG Icons (exakt aus aktueller Version übernehmen)
Alle 6 Icons sind inline SVG, 24×24, weisse Striche/Fills. Übernimm die SVG-Pfade exakt.

---

## Section 3: Managed Services (`#sec-managed`)

### HTML
```html
<section id="sec-managed" class="section" aria-labelledby="managed-h">
  <div class="container">

    <div class="its-section-header its-section-header--light">
      <p class="section-label section-label--steel">Managed Services</p>
      <h2 id="managed-h" class="text-white">IT, die proaktiv läuft. Störungen erkannt, bevor sie den Betrieb treffen.</h2>
      <p class="its-intro text-white">Unser Managed Services Modell überwacht, wartet und optimiert Ihre IT-Umgebung kontinuierlich — damit Ihre Systeme 24/7 laufen.</p>
    </div>

    <div class="ms-grid">

      <div class="ms-tile">
        <div class="ms-tile-bg" style="--tile-img: url('Bilder/IT Widget Bilder/Managed_Workplace.jpg')"></div>
        <div class="ms-tile-glass"></div>
        <div class="ms-tile-content">
          <div class="ms-tile-icon"><!-- SVG --></div>
          <div class="ms-tile-bottom">
            <h3>Managed Workplace</h3>
            <p>Einrichtung, Software & Helpdesk-Support.</p>
          </div>
        </div>
      </div>

      <!-- Managed Server -->
      <div class="ms-tile">
        <div class="ms-tile-bg" style="--tile-img: url('Bilder/IT Widget Bilder/Managed_Server.avif')"></div>
        <div class="ms-tile-glass"></div>
        <div class="ms-tile-content">
          <div class="ms-tile-icon"><!-- SVG --></div>
          <div class="ms-tile-bottom">
            <h3>Managed Server</h3>
            <p>Monitoring, Updates & Patching.</p>
          </div>
        </div>
      </div>

      <!-- Managed Network -->
      <div class="ms-tile">
        <div class="ms-tile-bg" style="--tile-img: url('Bilder/IT Widget Bilder/Managed Network.avif')"></div>
        <div class="ms-tile-glass"></div>
        <div class="ms-tile-content">
          <div class="ms-tile-icon"><!-- SVG --></div>
          <div class="ms-tile-bottom">
            <h3>Managed Network</h3>
            <p>WLAN, VPN & Firewalls.</p>
          </div>
        </div>
      </div>

      <!-- Managed Security -->
      <div class="ms-tile">
        <div class="ms-tile-bg" style="--tile-img: url('Bilder/IT Widget Bilder/Managed_Security.avif')"></div>
        <div class="ms-tile-glass"></div>
        <div class="ms-tile-content">
          <div class="ms-tile-icon"><!-- SVG --></div>
          <div class="ms-tile-bottom">
            <h3>Managed Security</h3>
            <p>Endpoint Detection & Threat Monitoring.</p>
          </div>
        </div>
      </div>

      <!-- Managed Cloud Backup -->
      <div class="ms-tile">
        <div class="ms-tile-bg" style="--tile-img: url('Bilder/IT Widget Bilder/Managed_CloudBackuo.avif')"></div>
        <div class="ms-tile-glass"></div>
        <div class="ms-tile-content">
          <div class="ms-tile-icon"><!-- SVG --></div>
          <div class="ms-tile-bottom">
            <h3>Managed Cloud Backup</h3>
            <p>Vollautomatische Datensicherung & Disaster Recovery.</p>
          </div>
        </div>
      </div>

      <!-- Managed Telefonie -->
      <div class="ms-tile">
        <div class="ms-tile-bg" style="--tile-img: url('Bilder/IT Widget Bilder/Managed_Telefonie.jpg')"></div>
        <div class="ms-tile-glass"></div>
        <div class="ms-tile-content">
          <div class="ms-tile-icon"><!-- SVG --></div>
          <div class="ms-tile-bottom">
            <h3>Managed Telefonie</h3>
            <p>MS Teams Phone & VoIP-Lösungen, KI-Telefonie.</p>
          </div>
        </div>
      </div>

      <!-- Website -->
      <div class="ms-tile">
        <div class="ms-tile-bg" style="--tile-img: url('Bilder/IT Widget Bilder/Managed_Workplace.jpg')"></div>
        <div class="ms-tile-glass"></div>
        <div class="ms-tile-content">
          <div class="ms-tile-icon"><!-- SVG --></div>
          <div class="ms-tile-bottom">
            <h3>Website</h3>
            <p>Hosting, Wartung und Anpassungen.</p>
          </div>
        </div>
      </div>

    </div>

    <p class="ms-closing text-white">Sicherer Background, damit Sie an der Front arbeiten können.</p>

  </div>
</section>
```

### CSS (page-it-solutions.css)
- `#sec-managed`: background var(--navy)
- `.section-label--steel`: color var(--steel), opacity 0.8
- `.ms-grid`: display grid, grid-template-columns repeat(4, 1fr) auf Desktop, 2 auf Tablet, 2 auf Mobile, gap var(--space-4)
- `.ms-tile`: position relative, border-radius var(--radius-lg), overflow hidden, aspect-ratio 1/1, min-height 180px
- `.ms-tile-bg`: position absolute, inset 0, background-image var(--tile-img), background-size cover, background-position center
- `.ms-tile-glass`: position absolute, inset 0, background `linear-gradient(to top, rgba(10,18,40,0.88) 0%, rgba(10,18,40,0.35) 100%)`
- `.ms-tile-content`: position relative, z-index 2, height 100%, display flex, flex-direction column, justify-content space-between, padding var(--space-5)
- `.ms-tile-icon`: width 36px, height 36px, background rgba(255,255,255,0.12), border-radius var(--radius), display flex, align-items center, justify-content center
- `.ms-tile-bottom h3`: font-size 0.95rem, font-weight 700, color #fff, margin-bottom var(--space-1)
- `.ms-tile-bottom p`: font-size 0.8rem, color rgba(255,255,255,0.7)
- `.ms-tile:hover .ms-tile-glass`: background `linear-gradient(to top, rgba(10,18,40,0.95) 0%, rgba(10,18,40,0.5) 100%)`
- `.ms-closing`: font-size 0.88rem, font-weight 600, text-align center, margin-top var(--space-8)

**Wichtig:** `--tile-img` als CSS Custom Property auf der Tile — so bleibt kein Inline-Style auf dem Element selbst. Das ist die sauberste Lösung für variable background-images ohne Inline-Styles.

### SVG Icons
Alle 7 Icons als inline SVG, 20×20, weisse Striche, exakt aus aktueller Version übernehmen.

---

## Section 4: Cloud & Microsoft 365 (`#sec-cloud`)

### HTML
```html
<section id="sec-cloud" class="section section--fog" aria-labelledby="cloud-h">
  <div class="container">

    <div class="its-section-header">
      <p class="section-label">Cloud & Microsoft 365</p>
      <h2 id="cloud-h">Microsoft 365. Eingerichtet. Gesichert. Betrieben.</h2>
      <p class="its-intro">Microsoft 365 ist heute der Standard für moderne KMU. Wir kümmern uns um alles — von der initialen Einrichtung bis zum laufenden Betrieb. Ihr Team arbeitet, die Technik läuft.</p>
    </div>

    <div class="cloud-bento">

      <div class="cloud-card cloud-card--wide">
        <div class="cloud-card-icon"><!-- SVG --></div>
        <h3>Zusammenarbeit & Remote</h3>
        <p>Moderne Tools ermöglichen nahtlose Zusammenarbeit innerhalb von Teams — vollkommen ortsunabhängig.</p>
        <ul class="cloud-bullets">
          <li>Microsoft Teams für Meetings, Chat & Telefonie</li>
          <li>SharePoint als zentrales Dokumenten-Hub</li>
          <li>Exchange Online für professionelle E-Mails mit eigener Domain</li>
          <li>OneDrive für sicheres Speichern & Teilen von Dateien</li>
        </ul>
        <p class="cloud-card-em">Hohe Effizienz, da Absprachen / Entscheidungen jederzeit rasch getroffen werden können.</p>
      </div>

      <div class="cloud-card">
        <div class="cloud-card-icon"><!-- SVG --></div>
        <h3>Sicherheit & Compliance</h3>
        <p>DSGVO-konform nach Schweizer Standard — automatisierter Schutz vor Bedrohungen.</p>
        <ul class="cloud-bullets">
          <li>Conditional Access & Zero Trust</li>
          <li>DSGVO-konform & Swiss Data Protection</li>
        </ul>
        <p class="cloud-card-em">Amplifyr garantiert professionellen Schutz und automatisierte Bedrohungserkennungen.</p>
      </div>

      <div class="cloud-card">
        <div class="cloud-card-icon"><!-- SVG --></div>
        <h3>Migration ohne Unterbruch</h3>
        <p>Wir migrieren Ihre bestehenden Systeme strukturiert in die Cloud — Ihr Betrieb läuft weiter.</p>
        <ul class="cloud-bullets">
          <li>Analyse & Migrationsplan vorab</li>
          <li>Stufenweise Umstellung</li>
          <li>Rollback-Plan inklusive</li>
        </ul>
        <p class="cloud-card-em">Sorglos-Paket für das Arbeiten von verschiedenen Standorten.</p>
      </div>

      <div class="cloud-card">
        <div class="cloud-card-icon"><!-- SVG --></div>
        <h3>Device Management</h3>
        <p>Microsoft Intune und Autopilot: zentrale Verwaltung aller Geräte — automatisch konfiguriert ab Tag 1.</p>
        <ul class="cloud-bullets">
          <li>Neue Geräte in Minuten einsatzbereit</li>
          <li>Zentrale Software-Verteilung</li>
          <li>Remote-Wipe bei Verlust</li>
        </ul>
        <p class="cloud-card-em">Schutz vor Datenverlust durch jederzeitige Fernverwaltung.</p>
      </div>

      <div class="cloud-card">
        <div class="cloud-card-icon"><!-- SVG --></div>
        <h3>Schulung & Adoption</h3>
        <p>Technologie bringt nur Nutzen, wenn Ihr Team sie wirklich nutzt. Praxisnah — kein Theoriekurs.</p>
        <ul class="cloud-bullets">
          <li>Individuelle Schritt-für-Schritt Anleitungen</li>
          <li>Laufende Begleitung nach Go-Live</li>
        </ul>
        <p class="cloud-card-em">Hoher Nutzen durch praxisnahe Schulung.</p>
      </div>

    </div>
  </div>
</section>
```

### CSS (page-it-solutions.css)
- `.cloud-bento`: display grid, grid-template-columns repeat(2, 1fr) auf Desktop, 1 auf Mobile, gap var(--space-5)
- `.cloud-card--wide`: grid-column span 2 auf Desktop, span 1 auf Mobile
- `.cloud-card`: background var(--bg-white), border 1px solid var(--border), border-radius var(--radius-lg), padding var(--space-8), display flex, flex-direction column, gap var(--space-4)
- `.cloud-card:hover`: border-color var(--navy), box-shadow var(--shadow-md), transform translateY(-2px)
- `.cloud-card-icon`: analog zu `.ito-card-icon`
- `.cloud-bullets`: analog zu `.ito-bullets`
- `.cloud-card-em`: font-size 0.82rem, color var(--navy), font-weight 600, margin-top auto

---

## Partner-Ticker (`<aside class="its-partners">`)

### HTML
```html
<aside class="its-partners" aria-label="Technologiepartner">
  <div class="container">
    <p class="its-partners-label">Technologiepartner</p>
  </div>
  <div class="partner-ticker">
    <div class="partner-ticker-track">
      <!-- 9 Partner + 9 Duplikate für nahtlosen Loop -->
      <div class="partner-item">
        <div class="partner-logo"><img src="Logos/Azure.png" alt="Microsoft Azure" loading="lazy"></div>
        <span>Azure</span>
      </div>
      <div class="partner-item">
        <div class="partner-logo"><img src="Logos/Intune.png" alt="Microsoft Intune" loading="lazy"></div>
        <span>Intune</span>
      </div>
      <div class="partner-item">
        <div class="partner-logo"><img src="Logos/Defender.png" alt="Microsoft Defender" loading="lazy"></div>
        <span>Defender</span>
      </div>
      <div class="partner-item">
        <div class="partner-logo"><img src="Logos/Sophos.png" alt="Sophos" loading="lazy"></div>
        <span>Sophos</span>
      </div>
      <div class="partner-item">
        <div class="partner-logo"><img src="Logos/Acronis.png" alt="Acronis" loading="lazy"></div>
        <span>Acronis</span>
      </div>
      <div class="partner-item">
        <div class="partner-logo"><img src="Logos/Veeam.png" alt="Veeam" loading="lazy"></div>
        <span>Veeam</span>
      </div>
      <div class="partner-item">
        <div class="partner-logo"><img src="Logos/Synology.png" alt="Synology" loading="lazy"></div>
        <span>Synology</span>
      </div>
      <div class="partner-item">
        <div class="partner-logo"><!-- Microsoft SVG Logo --></div>
        <span>Microsoft</span>
      </div>
      <div class="partner-item">
        <div class="partner-logo"><img src="Logos/Fortinet.png" alt="Fortinet" loading="lazy"></div>
        <span>Fortinet</span>
      </div>
      <!-- Exakte Duplikate der 9 Partner für nahtlosen CSS-Loop -->
      <!-- [identische 9 partner-items wiederholen] -->
    </div>
  </div>
</aside>
```

### CSS (page-it-solutions.css)
- `.its-partners`: padding-block var(--space-12), overflow hidden
- `.its-partners-label`: text-align center, font-size 0.73rem, font-weight 600, letter-spacing 0.14em, text-transform uppercase, color var(--text-muted), margin-bottom var(--space-6)
- `.partner-ticker`: overflow hidden
- `.partner-ticker-track`: display flex, gap var(--space-10), width max-content, animation: tickerScroll 28s linear infinite
- `@keyframes tickerScroll`: from transform translateX(0), to transform translateX(-50%)
- `.partner-item`: display flex, flex-direction column, align-items center, gap var(--space-2), flex-shrink 0
- `.partner-logo`: width 40px, height 40px, display flex, align-items center, justify-content center
- `.partner-logo img`: max-width 100%, max-height 100%, object-fit contain, filter grayscale(1), opacity 0.55
- `.partner-logo img:hover`: filter grayscale(0), opacity 1, transition all 0.3s
- `.partner-item span`: font-size 0.72rem, color var(--text-muted), font-weight 500

---

## Section 5: CTA (`.its-cta`)

### HTML
```html
<section class="its-cta" aria-label="Call to Action">
  <div class="its-cta-bg" aria-hidden="true">
    <svg class="its-network-svg" viewBox="0 0 1200 420" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <!-- Glow blobs, connection lines, pulse rings, nodes — exakt aus aktueller Version -->
      <!-- Ellipsen: its-net-glow -->
      <!-- Linien: its-net-line, its-net-line--slow, its-net-line--fast -->
      <!-- Ringe: its-net-ring -->
      <!-- Nodes: its-net-node, its-net-node--sm, its-net-node--lg -->
    </svg>
    <div class="its-cta-overlay"></div>
  </div>
  <div class="container its-cta-content">
    <p class="section-label section-label--steel">Der erste Schritt</p>
    <h2>Wissen, wo Ihre IT heute steht.</h2>
    <p>In einem umfassenden Audit analysieren wir Ihre IT-Umgebung und liefern klare, priorisierte Handlungsempfehlungen. Unverbindlich, kein Berater-Overhead — nur echter Einblick.</p>
    <a class="btn btn--white" href="/formular.html">IT-Audit anfragen</a>
  </div>
</section>
```

### CSS (page-it-solutions.css)
- `.its-cta`: position relative, background var(--navy), padding-block var(--space-24), overflow hidden
- `.its-cta-bg`: position absolute, inset 0, z-index 0
- `.its-network-svg`: width 100%, height 100%, position absolute, inset 0
- `.its-cta-overlay`: position absolute, inset 0, background `rgba(10,18,40,0.55)`
- `.its-cta-content`: position relative, z-index 1, text-align center, color #fff, max-width 680px, margin-inline auto
- `.btn--white`: background #fff, color var(--navy), font-weight 700 — Hover: background var(--steel-light)

### SVG-Netzwerk-Animation (in page-it-solutions.css)
```css
.its-net-glow {
  fill: rgba(176,196,222,0.06);
  animation: netGlow 4s ease-in-out infinite alternate;
}
@keyframes netGlow {
  from { opacity: 0.4; }
  to   { opacity: 1; }
}
.its-net-line {
  stroke: rgba(176,196,222,0.18);
  stroke-width: 1;
  stroke-dasharray: 4 6;
  animation: netDash 3s linear infinite;
}
.its-net-line--slow { animation-duration: 5s; }
.its-net-line--fast { animation-duration: 2s; }
@keyframes netDash { to { stroke-dashoffset: -40; } }
.its-net-ring {
  fill: none;
  stroke: rgba(176,196,222,0.35);
  animation: netRing 2.8s ease-out infinite;
}
@keyframes netRing {
  0%   { r: 4; opacity: 0.8; }
  100% { r: 22; opacity: 0; }
}
.its-net-node    { fill: rgba(176,196,222,0.6); animation: netPulse 2.5s ease-in-out infinite alternate; }
.its-net-node--lg { fill: rgba(176,196,222,0.85); }
.its-net-node--sm { fill: rgba(176,196,222,0.4); }
@keyframes netPulse {
  from { opacity: 0.5; }
  to   { opacity: 1; }
}
```

---

## Scroll-Animationen (page-it-solutions.js)

Nutze dieselbe `animateOnScroll()` Hilfsfunktion aus `main.js`.

```js
// IT-Outsourcing Cards: gestaffelt je 120ms
animateOnScroll('.ito-card', { stagger: 120 });

// Managed Services Tiles: gestaffelt je 100ms
animateOnScroll('.ms-tile', { stagger: 100 });

// Cloud Bento Cards: gestaffelt je 150ms
animateOnScroll('.cloud-card', { stagger: 150 });

// Section Headers: sofort beim Einblenden
animateOnScroll('.its-section-header > *', { stagger: 80 });
```

Alle Animationen: `opacity 0 → 1` + `translateY(20px → 0)`, duration 500ms, ease-out.
Kein Stagger auf Mobile (alle gleichzeitig einblenden).
`prefers-reduced-motion`: sofort sichtbar, keine Animation.

---

## Was NICHT in diese Datei gehört

- Kein `<style>` Tag
- Kein Inline-`style="..."` ausser `--tile-img` CSS Custom Property auf `.ms-tile` (einzige Ausnahme)
- Kein dupliziertes CSS aus style.css

---

## Ausgabe

Gib aus:
1. `it-solutions.html` — vollständig, sauber
2. `page-it-solutions.css` — alle seitenspezifischen Styles inkl. SVG-Animation
3. `page-it-solutions.js` — Scroll-Animationen

---

## Reale Texte & Inhalte

Verwende exakt diese Texte für die jeweiligen Sektionen:

### Hero
```
H1 Zeile 1: IT
H1 Zeile 2: amplified
Subtext: Wir schaffen die technologische Grundlage für stabile, sichere und skalierbare Unternehmenssysteme — eine rundum funktionierende und zukunftsgerichtete IT.
CTA: IT-Audit anfragen
```

### Tab-Navigation
```
Tab 1: IT-Outsourcing
Tab 2: Managed Services
Tab 3: Cloud & Microsoft 365
```

### Tab 1: IT-Outsourcing
```
H2: Wir übernehmen Ihre IT.
Intro: Stellen Sie sich vor: Ihre IT funktioniert einwandfrei — keine Ausfälle, kein Stress und keine unerwarteten Kosten. Als Ihr externer IT-Partner übernehmen wir die komplette Verantwortung für Ihre gesamte IT-Infrastruktur. Klar, verlässlich, modern.
Sub: Amplifyr ist Ihr vertrauenswürdiger IT-Dienstleister für Wartung, Störungsbehebung und zukunftsgerichtete Beratung.

Feature 1:
  Titel: Komplette IT-Übernahme
  Text: Als externer IT-Partner arbeiten wir Hand in Hand mit Ihrem Betrieb und gehen auf Ihre Bedürfnisse ein. Sie benötigen kein IT-Fachpersonal. Wir kümmern uns um:
  Items: Geräte, Netzwerk, Server & Peripherie / Benutzerkonten & Zugriffsrechte / Software-Lizenzen & Updates / Vollständige IT-Dokumentation / Usw.
  Fazit: Amplifyr wird zu Ihrem Partner und Berater für pragmatische und kosteneffiziente Lösungen.

Feature 2:
  Titel: IT Support mit individuellem Service Level Agreement (SLA)
  Text: Wenn etwas nicht funktioniert, sind wir da — schnell und zuverlässig. Wir vereinbaren mit Ihnen Verbindlichkeiten, die zu Ihrem Unternehmen passen.
  Items: Reaktionszeit bei Störungen unter 2 Stunden (Standard) / Telefonischer Support & Fernwartung / Vor-Ort-Einsatz bei Bedarf / SLA-Pakete individuell wählbar
  Fazit: Mit einem SLA klären wir gegenseitige Erwartungen und Machbarkeiten.

Feature 3:
  Titel: IT-Projekte & Digitalisierung
  Text: Stehen räumliche oder geographische Veränderungen an? Werden neue digitale Prozesse notwendig? Wir planen und setzen Ihre IT-Projekte um: gut organisiert, termin- und budgetgerecht.
  Items: Infrastruktur-Aufbau/Anpassungen & Migrationen / Digitalisierung von Arbeitsprozessen / Büroumzüge & Standorterweiterungen / Einführung neuer Softwarelösungen
  Fazit: Mit Amplifyr können Sie sorglos Veränderungen entgegensteuern.
```

### Tab 2: Managed Services
```
H2: Unsere Managed Services überwachen und optimieren Ihre Systeme vollautomatisch — rund um die Uhr, ohne dass Sie etwas tun müssen.
Items: 24/7 Monitoring aller Systeme / Automatische Updates & Patches / Backup-Überwachung & Wiederherstellung / Endpoint Security & Virenschutz
Fazit: Amplifyr überwacht, verwaltet, wartet und optimiert Ihre IT-Prozesse und Infrastrukturen.

Titel: IT, die proaktiv läuft. Störungen erkannt, bevor sie den Betrieb treffen.
Sub: Unser Managed Services Modell überwacht, wartet und optimiert Ihre IT-Umgebung kontinuierlich — damit Ihre Systeme 24/7 laufen.

Tiles (Managed Services):
  Managed Workplace — Einrichtung, Software & Helpdesk-Support.
  Managed Server — Monitoring, Updates & Patching.
  Managed Network — WLAN, VPN & Firewalls.
  Managed Security — Endpoint Detection & Threat Monitoring.
  Managed Cloud Backup — Vollautomatische Datensicherung & Disaster Recovery.
  Managed Telefonie — MS Teams Phone & VoIP-Lösungen, KI-Telefonie.
  Website — Hosting, Wartung und Anpassungen.

Fazit-Tag: Sicherer Background, damit Sie an der Front arbeiten können.

Kosteneinsparungen:
  Titel: Kosteneinsparungen
  Text: IT muss nicht teuer sein — wenn sie richtig geplant ist und das Fundament stimmt. Wir ersetzen unerwartete Rechnungen durch transparente Pauschalen und helfen, Ressourcen optimal zu nutzen.
  Items: Fixe, planbare Monatspauschalen / Keine teuren Notfall-Einsätze mehr / Lizenz-Optimierung & Kostenkontrolle
  Fazit: Nutzen Sie Ihr Geld für wichtige Investitionen statt für überteuerte IT-Notfallübungen.
```

### Tab 3: Cloud & Microsoft 365
```
H2: Microsoft 365. Eingerichtet. Gesichert. Betrieben.
Sub: Microsoft 365 ist heute der Standard für moderne KMU. Wir kümmern uns um alles — von der initialen Einrichtung bis zum laufenden Betrieb. Ihr Team arbeitet, die Technik läuft.

Feature 1:
  Titel: Zusammenarbeit & Remote
  Text: Moderne Tools ermöglichen nahtlose Zusammenarbeit innerhalb von Teams — vollkommen ortsunabhängig. Absprachen erfolgen in Echtzeit-Kommunikation, keine Leerläufe mehr durch Synchronisation von Terminen – das Ende der Mailflut.
  Items: Microsoft Teams für Meetings, Chat & Telefonie / SharePoint als zentrales Dokumenten-Hub / Exchange Online für professionelle E-Mails mit eigener Domain / OneDrive für sicheres Speichern & Teilen von Dateien
  Fazit: Hohe Effizienz, da Absprachen / Entscheidungen jederzeit rasch getroffen werden können.

Feature 2:
  Titel: Sicherheit & Compliance
  Text: Unsere Sicherheitsdienstleistungen erfüllen die Compliance-Anforderungen und schützen Ihr Unternehmen vor Bedrohungen — DSGVO-konform nach Schweizer Standard.
  Items: Conditional Access & Zero Trust / DSGVO-konform & Swiss Data Protection
  Fazit: Amplifyr garantiert Ihnen professionellen Schutz und automatisierte Bedrohungserkennungen.

Feature 3:
  Titel: Migration ohne Unterbruch
  Text: Wir migrieren Ihre bestehenden Systeme strukturiert in die Cloud — Ihr Betrieb läuft weiter.
  Items: Analyse & Migrationsplan vorab / Stufenweise Umstellung / Rollback-Plan inklusive
  Fazit: Amplifyr bietet Ihnen ein Sorglos-Paket für das Arbeiten von verschiedenen Standorten.

Feature 4:
  Titel: Device Management
  Text: Microsoft Intune und Autopilot ermöglichen die zentrale Verwaltung aller Geräte (Smartphones, Laptops, Tablets) — automatisch konfiguriert ab Tag 1.
  Items: Neue Geräte in Minuten einsatzbereit / Zentrale Software-Verteilung / Remote-Wipe bei Verlust
  Fazit: Schutz vor Datenverlust und Sicherheit durch jederzeitige Fernverwaltung.

Feature 5:
  Titel: Schulung & Adoption
  Text: Technologie bringt nur Nutzen, wenn Ihr Team diese wirklich nutzt. Wir schulen praxisnah — kein Theoriekurs, sondern echte Produktivität.
  Items: Individuelle Schritt-für-Schritt Anleitungen / Laufende Begleitung nach Go-Live
  Fazit: Hoher Nutzen durch praxisnahe Schulung.
```

### Partner-Ticker
```
Logos (je zweimal für Loop): Azure, Intune, Defender, Sophos, Acronis, Veeam, Synology, Microsoft, Fortinet
```

### CTA-Sektion
```
Eyebrow: Der erste Schritt
H2: Wissen, wo Ihre IT heute steht.
Text: In einem umfassenden Audit analysieren wir Ihre IT-Umgebung und liefern klare, priorisierte Handlungsempfehlungen. Unverbindlich, kein Berater-Overhead — nur echter Einblick.
CTA: IT-Audit anfragen
```
