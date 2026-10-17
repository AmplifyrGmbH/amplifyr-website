# Betreiber-Aufgaben amplifyr.ch

Laufende Aufgaben rund um die Website, die nicht im Code erledigt werden können. Stand: 17. Oktober 2026.

## Vor dem Livegang des Relaunchs (Branch `anpassungen`)

- [ ] **Cookie-Consent:** Die Website lädt Google Tag Manager und Umami. Mit einer Fachperson oder einem Generator-Dienst klären, ob ein Consent-Banner nötig ist (revDSG / DSGVO), und die Datenschutzerklärung entsprechend ergänzen.
- [ ] **Datenschutzerklärung ergänzen:** WhatsApp (Kontaktkanal) und Hostpoint (Hosting) sind noch nicht erwähnt.
- [ ] **Impressum:** Telefonnummer ergänzen.
- [ ] **Contentful-Token:** `blog-config.js` enthält einen Contentful-Zugriffsschlüssel und ist im Git-Repository. Schlüssel in Contentful erneuern und nur noch über GitHub Secrets verwenden.
- [ ] **Leistungsversprechen prüfen:** Die Handwerk-Seite («Ihr Alltag danach») verspricht konkrete Leistungen, z. B. automatisch beantwortete Anrufe ausserhalb der Bürozeiten oder Zahlungsabgleich mit dem Konto. Prüfen, dass alles davon geliefert werden kann.
- [ ] **Zahlen und Quellen:** Bewirtschaftung nennt eine Studie («Digital-Real-Estate-Umfrage»). Quelle verlinken oder Zahl entfernen. Die Handwerk-Seite verwendet die belegte IAB-Zahl (68 %, IAB-Kurzbericht 5/2024).
- [ ] **Seite `/demo`:** Entscheiden, ob sie bleibt (aktuell `noindex`).

## Verzeichnisse und NAP-Konsistenz

Name, Adresse und Telefon müssen überall identisch sein:
**amplifyr GmbH · Badenerstrasse 580 · 8048 Zürich · 044 244 59 95**

- [ ] **local.ch** und **search.ch** zeigen noch die alte Adresse (Uitikon-Waldegg). Einträge aktualisieren. Danach die Links in `sameAs` (Schema auf der Startseite) auf die neuen Einträge prüfen.
- [ ] **Google Business Profil:** Adresse, Öffnungszeiten (Mo–Fr 08:00–18:00), Telefon und Website prüfen. Regelmässig Fotos und Beiträge ergänzen.
- [ ] **Bewertungen:** Zufriedene Kunden aktiv um eine Google-Bewertung bitten und jede Bewertung beantworten.
- [ ] **LinkedIn und Instagram:** Adresse und Website-Link aktuell halten.

## Regelmässig

- [ ] **Monatlich:** Google Search Console auf Fehler, nicht indexierte Seiten und Suchbegriffe prüfen.
- [ ] **Monatlich:** In ChatGPT, Perplexity und Google (KI-Übersicht) nach «IT-Partner Handwerk Zürich» o. ä. suchen und prüfen, ob amplifyr genannt wird.
- [ ] **Quartalsweise:** Inhalte, Preise, Teamangaben und Fotos aktualisieren. Stockfotos nach und nach durch eigene Bilder ersetzen (Quellen: `Bilder/stock/QUELLEN.md`).
- [ ] **Nach grösseren Änderungen:** Seiten mit [PageSpeed Insights](https://pagespeed.web.dev/) und dem [Rich-Results-Test](https://search.google.com/test/rich-results) prüfen.
- [ ] **Jährlich:** SSL-Zertifikat und Domain-Verlängerung bei Hostpoint kontrollieren.
- [ ] **Cloudflare / Firewall:** Falls eingesetzt, sicherstellen, dass KI-Crawler (GPTBot, ClaudeBot, PerplexityBot usw.) nicht blockiert werden. Die `robots.txt` erlaubt sie bereits.
