#!/usr/bin/env python3
"""Setzt eine Seite aus dem Gerüst von index.html + eigenem Inhalt zusammen.

Aufruf:
  python3 assemble.py <page.json>

page.json:
{
  "out": "handwerker.html",          # Zieldatei im Repo
  "title": "...", "description": "...",
  "path": "/handwerker",             # Canonical-Pfad
  "robots": "index,follow",          # optional
  "og_title": "...",                 # optional, sonst title
  "preload": "/Bilder/stock/handwerk",  # optional: LCP-Bild (ohne -1200/-2400.avif)
  "schemas": [ {...}, {...} ],       # JSON-LD-Objekte
  "body": "body/handwerker.html",    # Inhalt von <main> (Pfad relativ zu dieser JSON)
  "extra_scripts": ["/blog-config.js", "/page-blog.js"]   # optional
}
Im Body wird {{CONTACT}} durch den Kontaktblock der Startseite ersetzt.
"""
import json, os, re, sys

REPO = '/Users/davidstaub/Amplifyr Github/amplifyr-website'
BASE = 'https://www.amplifyr.ch'

def block(src, start, end, include_end=True):
    a = src.index(start)
    b = src.index(end, a)
    return src[a:b + (len(end) if include_end else 0)]

def esc(s):
    return s.replace('&', '&amp;').replace('"', '&quot;').replace('<', '&lt;').replace('>', '&gt;')

def main():
    cfg_path = sys.argv[1]
    cfg = json.load(open(cfg_path, encoding='utf-8'))
    idx = open(os.path.join(REPO, 'index.html'), encoding='utf-8').read()

    favicons = block(idx, '  <!-- Favicons -->', '<link rel="sitemap" type="application/xml" href="/sitemap.xml">')
    fonts = block(idx, '  <!-- Fonts -->', '\n  <!-- Structured Data -->', include_end=False).rstrip()
    umami = block(idx, '  <script defer src="https://cloud.umami.is/script.js"', '</script>')
    gridlines = ''  # Rasterlinien durch Achsraster ersetzt
    header = block(idx, '  <header id="site-header"', '</header>')
    mobile = block(idx, '  <nav id="nav-mobile"', '</nav>')
    footer = block(idx, '  <footer class="site-footer">', '</footer>')
    contact = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'contact-block.html'), encoding='utf-8').read()  # CTA ohne FAQ
    site_js = re.search(r'<script src="/site\.js\?v=\d+" defer></script>', idx).group(0)

    title = cfg['title']
    desc = cfg['description']
    og_title = cfg.get('og_title', title)
    url = BASE + cfg['path'] if cfg['path'] != '/' else BASE + '/'
    robots = cfg.get('robots', 'index,follow')
    og_image = cfg.get('og_image', BASE + '/Logos/Open_Graph_Image_Amplifyr.webp')

    body_path = os.path.join(os.path.dirname(os.path.abspath(cfg_path)), cfg['body'])
    body = open(body_path, encoding='utf-8').read().rstrip()
    body = body.replace('{{CONTACT}}', contact)
    if cfg.get('cta'):
        body = body.replace('Lassen Sie uns <em>reden.</em>', cfg['cta'])

    preload = ''
    if cfg.get('preload'):
        p = cfg['preload']
        preload = ('\n  <!-- LCP-Bild vorladen -->\n'
                   f'  <link rel="preload" as="image" type="image/avif" fetchpriority="high"\n'
                   f'        imagesrcset="{p}-1200.avif 1200w, {p}-2400.avif 2400w" imagesizes="100vw">\n')

    schemas = ''
    for s in cfg.get('schemas', []):
        schemas += '  <script type="application/ld+json">\n' + json.dumps(s, ensure_ascii=False, indent=2) + '\n  </script>\n'

    extra = ''.join(f'\n  <script src="{s}" defer></script>' for s in cfg.get('extra_scripts', []))

    html = f'''<!DOCTYPE html>
<html lang="de-CH">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>{esc(title)}</title>
  <meta name="description" content="{esc(desc)}">
  <link rel="canonical" href="{url}">
  <meta name="robots" content="{robots}">

  <!-- Open Graph -->
  <meta property="og:type"         content="website">
  <meta property="og:site_name"    content="amplifyr">
  <meta property="og:url"          content="{url}">
  <meta property="og:title"        content="{esc(og_title)}">
  <meta property="og:description"  content="{esc(desc)}">
  <meta property="og:image"        content="{og_image}">
  <meta property="og:image:width"  content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:locale"       content="de_CH">

  <!-- Twitter Card -->
  <meta name="twitter:card"        content="summary_large_image">
  <meta name="twitter:title"       content="{esc(og_title)}">
  <meta name="twitter:description" content="{esc(desc)}">
  <meta name="twitter:image"       content="{og_image}">

  <!-- Structured Data -->
{schemas}
{favicons}
{preload}
{fonts}

{umami}
</head>
<body data-page="{os.path.splitext(cfg['out'])[0]}">

  <a class="skip-link" href="#main">Zum Inhalt springen</a>

  <!-- ===================== Header ===================== -->
{header}

{mobile}

  <main id="main">
{body}
  </main>

  <!-- ===================== Footer ===================== -->
{footer}

  {site_js}{extra}
</body>
</html>
'''
    sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
    import faqcta
    html = faqcta.combine(html)
    out = os.path.join(REPO, cfg['out'])
    open(out, 'w', encoding='utf-8').write(html)
    print('geschrieben:', cfg['out'], len(html), 'Zeichen')

if __name__ == '__main__':
    main()
