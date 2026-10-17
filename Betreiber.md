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
