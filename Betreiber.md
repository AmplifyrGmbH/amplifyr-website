# Betreiber-Aufgaben amplifyr.ch

Laufende Aufgaben rund um die Website, die nicht im Code erledigt werden können. Stand: 17. Oktober 2026.

## Vor dem Livegang des Relaunchs (Branch `anpassungen`)

- [x] **Tracking:** Google Tag Manager wurde entfernt. Es läuft nur noch Umami (cookielos, keine personenbezogenen Daten). Damit ist aus unserer Sicht kein Cookie-Banner nötig. Wer ganz sicher gehen will, lässt das von einer Fachperson bestätigen.
- [x] **Datenschutzerklärung:** WhatsApp und Hostpoint sind ergänzt, Google Tag Manager ist entfernt.
- [x] **Impressum:** Telefonnummer ergänzt.
- [ ] **Contentful-Token:** `blog-config.js` enthält weiterhin einen Lese-Token und wird auf der Blog-Seite ausgeliefert. Die Startseite braucht ihn nicht mehr. Nach Absprache so belassen; bei Bedarf in Contentful erneuern.
- [ ] **Leistungsversprechen prüfen:** Die Handwerk-Seite («Ihr Alltag danach») verspricht konkrete Leistungen, z. B. automatisch beantwortete Anrufe ausserhalb der Bürozeiten oder Zahlungsabgleich mit dem Konto. Prüfen, dass alles davon geliefert werden kann.
- [x] **Zahlen und Quellen:** Handwerk nutzt den IAB-Kurzbericht 5/2024 (68 %), Bewirtschaftung die Digital Real Estate & Construction Studie von pom+ (4,6 von 10 Punkten). Beide sind verlinkt.
- [x] **Seite `/demo`:** entfernt, leitet per 301 auf `/kontakt?subject=Demo`.

## Beim Livegang des Relaunchs

Reihenfolge beim Deploy auf `main`:

1. **Branch `anpassungen` nach `main` mergen und pushen.** Der Deploy läuft automatisch und lädt die neue `.htaccess` mit allen Weiterleitungen mit.
2. **Blog-Workflow einmal von Hand starten:** GitHub → Actions → „Build & Deploy Blog" → Run workflow. Erst danach existiert `/blog/preview.html`, das die Blog-Vorschau auf der Startseite füllt. Ohne diesen Schritt blendet die Startseite den Insights-Abschnitt aus.
3. **Reste früherer Deploys per FTP löschen.** Diese Dateien liegen auf dem Server, gehören aber nicht ins Web: `CLAUDE.md`, `dev-router.php`, die Ordner `scripts/` und `archiv/` sowie die alten Seiten `it-solutions.html`, `webdesign.html` und alles Weitere, was nicht mehr im Repository ist. Die neue `.htaccess` sperrt sie zwar, löschen ist aber sauberer.
4. **Weiterleitungen prüfen.** Jede dieser URLs muss mit genau einem 301 auf das neue Ziel zeigen, jeweils auch mit `.html` am Ende:

   | Alte URL | Ziel |
   |---|---|
   | `/it-solutions`, `/webdesign`, `/branchen-software`, `/digitalisierung-kmu` | `/kmu` |
   | `/digitalisierung-handwerker` | `/handwerker` |
   | `/demo` | `/kontakt?subject=Demo` |
   | `/formular` | `/kontakt` (Parameter bleiben erhalten) |
   | `/blog-post` | `/blog` |
   | `/ki-transformation`, `/automatisierung`, `/ki-prozesse` | `/kmu` |
   | `/business-amplification` | `/` |

   Reine Prototypen von früher (`eisberg-artifact`, `shadow-variants`, `ki-check-template`, `prozessgrafik-artifact`, `handwerker-demo-ohne-hero`, `amplifyr-landingpage-standalone`) waren nie verlinkt und dürfen weiterhin 404 liefern.
5. **Google Search Console:** Sitemap `https://www.amplifyr.ch/sitemap.xml` neu einreichen und die neuen Seiten `/kmu`, `/vorgehen`, `/kontakt`, `/bewirtschaftung` zur Indexierung anmelden.
6. **Alte Seiten aus dem Index entfernen:** In der Search Console unter „Entfernen" einen Antrag für `/it-solutions`, `/webdesign` und `/ki-transformation` stellen. Das wirkt sofort für rund sechs Monate; dauerhaft verschwinden sie durch die 301-Weiterleitungen, sobald Google neu crawlt (ein bis vier Wochen).
7. **Nach dem Deploy prüfen:** [PageSpeed Insights](https://pagespeed.web.dev/) und [Rich-Results-Test](https://search.google.com/test/rich-results) über Startseite, Handwerk und Kontakt laufen lassen.

## Verzeichnisse und NAP-Konsistenz

Name, Adresse und Telefon müssen überall identisch sein:
**amplifyr GmbH · Badenerstrasse 580 · 8048 Zürich · 044 244 59 95**

- [x] **local.ch** und **search.ch** zeigen die aktuelle Adresse. Die Links im Schema (`sameAs`) und in `llms.txt` zeigen direkt auf die neuen Zürcher Einträge.
- [ ] **Google Business Profil:** Adresse, Öffnungszeiten (Mo–Fr 08:00–19:00), Telefon und Website prüfen. Regelmässig Fotos und Beiträge ergänzen.
- [x] **Öffnungszeiten:** Website, Schema und `llms.txt` zeigen neu Mo–Fr 08:00–19:00, gleich wie local.ch und search.ch.
- [ ] **Bewertungen:** Zufriedene Kunden aktiv um eine Google-Bewertung bitten und jede Bewertung beantworten.
- [ ] **LinkedIn und Instagram:** Adresse und Website-Link aktuell halten.

## Regelmässig

- [ ] **Monatlich:** Google Search Console auf Fehler, nicht indexierte Seiten und Suchbegriffe prüfen.
- [ ] **Monatlich:** In ChatGPT, Perplexity und Google (KI-Übersicht) nach «IT-Partner Handwerk Zürich» o. ä. suchen und prüfen, ob amplifyr genannt wird.
- [ ] **Quartalsweise:** Inhalte, Preise, Teamangaben und Fotos aktualisieren. Stockfotos nach und nach durch eigene Bilder ersetzen (Quellen: `Bilder/stock/QUELLEN.md`).
- [ ] **Nach grösseren Änderungen:** Seiten mit [PageSpeed Insights](https://pagespeed.web.dev/) und dem [Rich-Results-Test](https://search.google.com/test/rich-results) prüfen.
- [ ] **Jährlich:** SSL-Zertifikat und Domain-Verlängerung bei Hostpoint kontrollieren.
- [ ] **Cloudflare / Firewall:** Falls eingesetzt, sicherstellen, dass KI-Crawler (GPTBot, ClaudeBot, PerplexityBot usw.) nicht blockiert werden. Die `robots.txt` erlaubt sie bereits.
