# Prompt 12 — `.htaccess` + `robots.txt` + `sitemap.xml`

## Kontext & Ziel

Erstelle drei SEO/Server-Konfigurationsdateien für die Amplifyr-Website.
Diese Dateien sind unabhängig vom Design System und werden 1:1 übernommen.

---

## `.htaccess`

Aufgaben:
1. `non-www` → `https://www` Redirect (301)
2. `http://www` → `https://www` Redirect (301)
3. Clean URLs: `.html`-Endung in der URL entfernen (301)
4. Clean URLs: Intern saubere URL auf `.html`-Datei mappen

```apache
RewriteEngine On

# 1. non-www (http + https) → https://www
RewriteCond %{HTTP_HOST} ^amplifyr\.ch [NC]
RewriteRule ^(.*)$ https://www.amplifyr.ch/$1 [R=301,L]

# 2. http://www → https://www
RewriteCond %{HTTPS} off
RewriteCond %{HTTP_HOST} ^www\.amplifyr\.ch [NC]
RewriteRule ^(.*)$ https://www.amplifyr.ch/$1 [R=301,L]

# 3. Clean URLs: .html → ohne Endung (301 Redirect)
RewriteCond %{THE_REQUEST} ^[A-Z]+\ /([^.]+)\.html [NC]
RewriteRule ^ /%1 [R=301,L]

# 4. Clean URLs: saubere URL intern auf .html-Datei mappen
RewriteBase /
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^([^\.]+)/?$ $1.html [L]
```

**Hinweis:** Die `.htaccess` liegt im Website-Root. Der Hoster ist Hostpoint (Apache).

---

## `robots.txt`

Alle Seiten erlaubt, Sitemap verlinkt.

```
User-agent: *
Allow: /

Sitemap: https://www.amplifyr.ch/sitemap.xml
```

---

## `sitemap.xml`

Alle öffentlichen Seiten mit korrekten Clean URLs (ohne `.html`).
Legal-Seiten mit tiefer Priorität.
Blog-Posts werden nicht in der Sitemap erfasst (dynamisch via Contentful).

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  <url>
    <loc>https://www.amplifyr.ch/</loc>
    <lastmod>2026-06-05</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>

  <url>
    <loc>https://www.amplifyr.ch/it-solutions</loc>
    <lastmod>2026-06-05</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>https://www.amplifyr.ch/branchen-software</loc>
    <lastmod>2026-06-05</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>https://www.amplifyr.ch/ki-prozesse</loc>
    <lastmod>2026-06-05</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>https://www.amplifyr.ch/webdesign</loc>
    <lastmod>2026-06-05</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>https://www.amplifyr.ch/ueber-uns</loc>
    <lastmod>2026-06-05</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>https://www.amplifyr.ch/blog</loc>
    <lastmod>2026-06-05</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>

  <url>
    <loc>https://www.amplifyr.ch/formular</loc>
    <lastmod>2026-06-05</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.6</priority>
  </url>

  <url>
    <loc>https://www.amplifyr.ch/impressum</loc>
    <lastmod>2026-06-05</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>

  <url>
    <loc>https://www.amplifyr.ch/datenschutz</loc>
    <lastmod>2026-06-05</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>

  <url>
    <loc>https://www.amplifyr.ch/agb</loc>
    <lastmod>2026-06-05</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>

</urlset>
```

---

## Dateien die 1:1 kopiert werden (kein Prompt nötig)

Diese Dateien aus dem alten Projekt unverändert übernehmen:

| Datei | Beschreibung |
|---|---|
| `odoo-lead.php` | CRM-Lead-Proxy für Odoo. Empfängt Formulardaten und erstellt Lead via JSON-RPC. Thema "IT-Solutions" → Team "IT", alles andere → Team "Consulting". |
| `ai-check.php` | Backend für KI-Potenzialcheck auf der Homepage. |
| `.env` | Odoo-Zugangsdaten (`ODOO_USER`, `ODOO_API_KEY`). Nie in Git committen. |
| `blog-config.js` | Contentful-Credentials. Nie in Git committen — manuell per FTP hochladen. |
| `Bilder/` | Alle Bilder/Videos aus dem alten Projekt. Dateinamen bleiben identisch. |
| `Logos/` | Logo-Dateien und Open Graph Image. |
| `Favicon/` | Alle Favicon-Varianten (`.ico`, `.png` in verschiedenen Grössen). |

---

## Regeln & Hinweise

- `.htaccess` und `robots.txt` liegen im **Website-Root**
- `sitemap.xml` liegt im **Website-Root**
- `lastmod` in `sitemap.xml` beim Go-Live auf aktuelles Datum setzen
- `blog-config.js` in `.gitignore` eintragen (bereits vorhanden)
- `.env` in `.gitignore` eintragen (bereits vorhanden)
- `odoo-lead.php` liest `.env` mit `parse_ini_file(__DIR__ . '/.env')` — beide müssen im gleichen Verzeichnis liegen
