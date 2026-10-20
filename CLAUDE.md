# Amplifyr Website — Projektnotizen

## Lokaler Dev-Server starten

```bash
php -S localhost:8080 dev-router.php
```

`dev-router.php` mappt Clean URLs (`/kmu` → `kmu.html`), da `.htaccess` mit PHPs eingebautem Server nicht funktioniert.

## Seiten bearbeiten

Die HTML-Dateien werden direkt bearbeitet. Es gibt keine Generatoren mehr:
Die früheren Python-Skripte in `scripts/` waren nur für den Aufbau gedacht und
sind inzwischen von den gepflegten Seiten überholt worden.

`scripts/build-blog.js` bleibt — das Skript erzeugt aus Contentful die Seiten
unter `/blog/` und wird vom Workflow „Build & Deploy Blog" aufgerufen.
Es liest Kopf und Fuss aus `blog.html`, diese Datei also mitpflegen.

## Nach Änderungen

Push auf `main` löst den Deploy zu Hostpoint aus. Der Blog hat einen eigenen
Workflow. Er läuft alle 30 Minuten per Zeitplan, zusätzlich bei einem
Contentful-Webhook, bei Pushes auf `scripts/build-blog.js` oder `blog.html`
sowie von Hand.

Der Zeitplan ist der Fallback: Der Contentful-Webhook lag bis Oktober 2026 im
falschen Space und auf der falschen Ziel-URL, wodurch der Blog nie automatisch
gebaut wurde. Solange er nicht korrigiert ist, hält allein der Cron den Blog
aktuell.
