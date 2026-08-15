#!/usr/bin/env node
/* ============================================================
   AMPLIFYR — scripts/build-blog.js
   Lädt alle Posts aus Contentful und generiert:
     _blog-dist/blog.html          (Übersicht mit statischen Karten)
     _blog-dist/blog/[slug].html   (vollständige Post-Seiten)

   Aufruf:
     node scripts/build-blog.js
   Env-Variablen (Pflicht — via GitHub Actions Secrets):
     CONTENTFUL_SPACE_ID
     CONTENTFUL_ACCESS_TOKEN
============================================================ */
'use strict';

const https = require('https');
const fs    = require('fs');
const path  = require('path');

const SPACE_ID     = process.env.CONTENTFUL_SPACE_ID;
const ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN;

if (!SPACE_ID || !ACCESS_TOKEN) {
  console.error('Fehler: CONTENTFUL_SPACE_ID und CONTENTFUL_ACCESS_TOKEN müssen als Env-Variablen gesetzt sein.');
  process.exit(1);
}
const SITE_ROOT    = path.resolve(__dirname, '..');
const DIST_DIR     = path.join(SITE_ROOT, '_blog-dist');
const BASE_URL     = 'https://www.amplifyr.ch';

// ── Hilfsfunktionen ──────────────────────────────────────────

function esc(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      let raw = '';
      res.on('data', chunk => { raw += chunk; });
      res.on('end', () => {
        try { resolve(JSON.parse(raw)); }
        catch (e) { reject(new Error('JSON parse error: ' + e.message)); }
      });
    }).on('error', reject);
  });
}

function buildAssetMap(includes) {
  const map = {};
  ((includes && includes.Asset) || []).forEach(a => {
    if (a.fields && a.fields.file) {
      map[a.sys.id] = 'https:' + a.fields.file.url;
    }
  });
  return map;
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('de-CH', {
    day: '2-digit', month: 'long', year: 'numeric'
  });
}

function extractText(node) {
  if (!node) return '';
  if (node.nodeType === 'text') return node.value || '';
  return (node.content || []).map(extractText).join('');
}

function renderRichText(node) {
  if (!node) return '';
  if (node.nodeType === 'text') {
    let t = esc(node.value);
    (node.marks || []).forEach(m => {
      if (m.type === 'bold')   t = '<strong>' + t + '</strong>';
      if (m.type === 'italic') t = '<em>' + t + '</em>';
      if (m.type === 'code')   t = '<code>' + t + '</code>';
    });
    return t;
  }
  const ch = (node.content || []).map(renderRichText).join('');
  switch (node.nodeType) {
    case 'document':        return ch;
    case 'paragraph':       return '<p>' + ch + '</p>';
    case 'heading-1':
    case 'heading-2':       return '<h2>' + ch + '</h2>';
    case 'heading-3':
    case 'heading-4':       return '<h3>' + ch + '</h3>';
    case 'unordered-list':  return '<ul>' + ch + '</ul>';
    case 'ordered-list':    return '<ol>' + ch + '</ol>';
    case 'list-item':       return '<li>' + ch + '</li>';
    case 'blockquote':      return '<blockquote>' + ch + '</blockquote>';
    case 'hr':              return '<hr>';
    case 'hyperlink':
      return '<a href="' + esc(node.data.uri) + '" target="_blank" rel="noopener">' + ch + '</a>';
    default: return ch;
  }
}

// ── Statischer Header / Footer ────────────────────────────────

const HEADER = `  <header id="site-header" class="legal-mode">
    <div class="container header-inner">
      <a href="/" class="site-logo" aria-label="Amplifyr – Startseite">
        <img class="logo-img logo-img--light" src="/Logos/amplifyr_logo/amplifyr-logo-weiss-hellblau.svg" alt="Amplifyr" height="40">
        <img class="logo-img logo-img--dark"  src="/Logos/amplifyr_logo/amplifyr-logo-blau-hellblau.svg"  alt="" height="40" aria-hidden="true">
      </a>
      <nav class="site-nav" aria-label="Hauptnavigation">
        <ul class="site-nav__list">
          <li class="site-nav__item">
            <a href="/ki-transformation" class="site-nav__link nav-link">KI-Transformation</a>
          </li>
          <li class="site-nav__item">
            <a href="/handwerker" class="site-nav__link nav-link">Handwerker</a>
          </li>
          <li class="site-nav__item"><a href="/it-solutions"      class="site-nav__link nav-link">IT-Lösungen</a></li>
          <li class="site-nav__item"><a href="/webdesign"         class="site-nav__link nav-link">Digitaler Auftritt</a></li>
        </ul>
      </nav>
      <nav class="site-nav site-nav--right header-portal-btn" aria-label="Weitere Navigation">
        <ul class="site-nav__list">
          <li class="site-nav__item"><a href="/ueber-uns" class="site-nav__link nav-link">Über uns</a></li>
        </ul>
      </nav>
      <button id="burger-btn" class="burger-btn" aria-label="Menü öffnen" aria-expanded="false" aria-controls="mobile-menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </header>

  <nav class="mobile-menu" id="mobile-menu" aria-label="Mobile Navigation">
    <div class="mobile-menu__header">
      <a href="/" class="mobile-menu__logo" aria-label="Amplifyr – Startseite">
        <img class="logo-img" src="/Logos/amplifyr_logo/amplifyr-logo-blau-hellblau.svg" alt="Amplifyr">
      </a>
      <button id="mobile-menu-close" class="mobile-menu__close" aria-label="Menü schliessen">
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/></svg>
      </button>
    </div>
    <div class="mobile-menu__nav">
      <a href="/ki-transformation" class="mobile-nav-link">KI-Transformation</a>
      <a href="/handwerker"        class="mobile-nav-link">Handwerker</a>
      <a href="/it-solutions"      class="mobile-nav-link">IT-Lösungen</a>
      <a href="/webdesign"         class="mobile-nav-link">Digitaler Auftritt</a>
      <a href="/ueber-uns"         class="mobile-nav-link">Über uns</a>
    </div>
    <div class="mobile-menu__cta">
      <a href="https://portal.amplifyr.ch/" class="btn btn--primary" target="_blank" rel="noopener">Kundenportal</a>
    </div>
  </nav>`;

const FOOTER = `  <footer>
    <div class="container">
      <div class="footer-inner">
        <a href="/" class="footer-logo" aria-label="Amplifyr – Startseite">
          <img class="logo-img" src="/Logos/amplifyr_logo/amplifyr-logo-blau-hellblau.svg" alt="Amplifyr">
        </a>
        <p class="footer-copy">© 2026 Amplifyr GmbH · Mettlenstrasse 11, 8142 Uitikon Waldegg · <a href="tel:+41442445995" class="footer-tel">044 244 59 95</a></p>
        <nav class="footer-links" aria-label="Rechtliches">
          <a href="/impressum">Impressum</a>
          <a href="/datenschutz">Datenschutz</a>
          <a href="/agb">AGB</a>
        </nav>
      </div>
    </div>
  </footer>`;

const HEAD_COMMON = `  <link rel="icon"             href="/Favicon/favicon.ico">
  <link rel="icon"             href="/Favicon/favicon_32x32.png" sizes="32x32" type="image/png">
  <link rel="icon"             href="/Favicon/favicon_16x16.png" sizes="16x16" type="image/png">
  <link rel="apple-touch-icon" href="/Favicon/favicon_180x180.png">
  <link rel="manifest"         href="/site.webmanifest">
  <meta name="theme-color" content="#1a2744">
  <link rel="sitemap" type="application/xml" href="/sitemap.xml">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap">
  <link rel="stylesheet" media="print" onload="this.media='all'" href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap">
  <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap"></noscript>
  <link rel="stylesheet" href="/style.css?v=6">
  <link rel="stylesheet" href="/page-blog.css">`;

// ── Post-Seite generieren ─────────────────────────────────────

function generatePostHtml(f, slug, assets) {
  const title   = f.titel || f.title || '';
  const dateIso = f.date  || '';
  const dateFmt = formatDate(dateIso);
  const cat     = f.category || f.kategorie || '';
  const postUrl = BASE_URL + '/blog/' + slug;

  // Teaser
  const teaserRaw  = f.teaser;
  const teaserText = teaserRaw
    ? (typeof teaserRaw === 'string' ? teaserRaw : extractText(teaserRaw)).slice(0, 160)
    : '';
  const teaserHtml = teaserRaw
    ? (typeof teaserRaw === 'string'
        ? '<p class="post-teaser">' + esc(teaserRaw) + '</p>'
        : '<div class="post-teaser">' + renderRichText(teaserRaw) + '</div>')
    : '';

  // Body
  const bodyHtml = f.body ? renderRichText(f.body) : '';

  // Cover image
  const imgRef = f.coverImage || f.titelbild;
  const imgId  = imgRef && imgRef.sys ? imgRef.sys.id : null;
  const imgUrl = imgId && assets[imgId] ? assets[imgId] : null;
  const ogImg  = imgUrl || (BASE_URL + '/Logos/Open_Graph_Image_Amplifyr.webp');
  const coverHtml = imgUrl
    ? '<img class="post-cover" src="' + esc(imgUrl) + '" alt="' + esc(title) + '" width="1200" height="630" loading="eager" decoding="async">'
    : '';

  // Schema.org
  const articleSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': postUrl,
    headline: title,
    description: teaserText,
    datePublished: dateIso,
    dateModified:  dateIso,
    url: postUrl,
    image: ogImg,
    author: { '@type': 'Organization', name: 'Amplifyr', url: BASE_URL },
    publisher: {
      '@type': 'Organization',
      name: 'Amplifyr',
      url: BASE_URL,
      logo: { '@type': 'ImageObject', url: BASE_URL + '/Logos/amplifyr_logo/amplifyr-logo-blau-hellblau.svg' }
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': postUrl }
  }, null, 2);

  const breadcrumbSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Startseite', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog',       item: BASE_URL + '/blog' },
      { '@type': 'ListItem', position: 3, name: title,        item: postUrl }
    ]
  }, null, 2);

  return '<!DOCTYPE html>\n'
    + '<html lang="de-CH">\n'
    + '<head>\n'
    + '  <meta charset="UTF-8">\n'
    + '  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n\n'
    + '  <title>' + esc(title) + ' | Amplifyr Blog</title>\n'
    + '  <meta name="description" content="' + esc(teaserText) + '">\n'
    + '  <link rel="canonical" href="' + postUrl + '">\n'
    + '  <meta name="robots" content="index,follow">\n\n'
    + '  <meta property="og:type"        content="article">\n'
    + '  <meta property="og:url"         content="' + postUrl + '">\n'
    + '  <meta property="og:title"       content="' + esc(title) + ' | Amplifyr Blog">\n'
    + '  <meta property="og:description" content="' + esc(teaserText) + '">\n'
    + '  <meta property="og:image"       content="' + esc(ogImg) + '">\n'
    + '  <meta property="og:locale"      content="de_CH">\n'
    + '  <meta name="twitter:card"        content="summary_large_image">\n'
    + '  <meta name="twitter:title"       content="' + esc(title) + ' | Amplifyr Blog">\n'
    + '  <meta name="twitter:description" content="' + esc(teaserText) + '">\n'
    + '  <meta name="twitter:image"       content="' + esc(ogImg) + '">\n\n'
    + '  <script type="application/ld+json">\n' + articleSchema + '\n  </script>\n'
    + '  <script type="application/ld+json">\n' + breadcrumbSchema + '\n  </script>\n\n'
    + HEAD_COMMON + '\n'
    + '</head>\n'
    + '<body>\n\n'
    + HEADER + '\n\n'
    + '  <main>\n'
    + '    <div class="post-wrap">\n'
    + '      <a class="post-back" href="/blog">\n'
    + '        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">'
    + '<path d="M13 8H3M7 12l-4-4 4-4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>'
    + '</svg>\n'
    + '        Alle Beiträge\n'
    + '      </a>\n'
    + '      <article>\n'
    + '        <header class="post-header">\n'
    + '          <div class="post-meta">\n'
    + (cat     ? '            <span class="post-category">' + esc(cat)     + '</span>\n' : '')
    + (dateFmt ? '            <span class="post-date">'     + esc(dateFmt) + '</span>\n' : '')
    + '          </div>\n'
    + '          <h1 class="post-title">' + esc(title) + '</h1>\n'
    + (teaserHtml ? '          ' + teaserHtml + '\n' : '')
    + '        </header>\n'
    + (coverHtml ? '        ' + coverHtml + '\n' : '')
    + '        <hr class="post-divider">\n'
    + '        <div class="post-body">\n'
    + bodyHtml + '\n'
    + '        </div>\n'
    + '      </article>\n'
    + '    </div>\n'
    + '  </main>\n\n'
    + FOOTER + '\n\n'
    + '  <script src="/main.js"></script>\n'
    + '</body>\n'
    + '</html>\n';
}

// ── Blog-Karte (für blog.html Grid) ──────────────────────────

function generateCardHtml(f, slug, assets) {
  const title  = f.titel || f.title || '';
  const date   = formatDate(f.date);
  const cat    = f.category || f.kategorie || '';
  const imgRef = f.coverImage || f.titelbild;
  const imgId  = imgRef && imgRef.sys ? imgRef.sys.id : null;
  const imgUrl = imgId && assets[imgId] ? assets[imgId] : null;
  const teaser = typeof f.teaser === 'string'
    ? f.teaser
    : extractText(f.teaser).slice(0, 160);

  const imgHtml = imgUrl
    ? '<img class="blog-card-img" src="' + esc(imgUrl) + '" alt="' + esc(title) + '" loading="lazy" decoding="async" width="800" height="450">'
    : '<div class="blog-card-img-placeholder" aria-hidden="true">'
      + '<svg width="40" height="40" viewBox="0 0 24 24" fill="none">'
      + '<rect x="3" y="3" width="18" height="18" rx="2" stroke="#B0C4DE" stroke-width="1.5"/>'
      + '<circle cx="8.5" cy="8.5" r="1.5" fill="#B0C4DE"/>'
      + '<path d="M21 15l-5-5L5 21" stroke="#B0C4DE" stroke-width="1.5"/>'
      + '</svg></div>';

  return '<a class="blog-card" href="/blog/' + encodeURIComponent(slug) + '">\n'
    + '  ' + imgHtml + '\n'
    + '  <div class="blog-card-body">\n'
    + '    <div class="blog-card-meta">\n'
    + (cat  ? '      <span class="blog-card-category">' + esc(cat)  + '</span>\n' : '')
    + (date ? '      <span class="blog-card-date">'     + esc(date) + '</span>\n' : '')
    + '    </div>\n'
    + '    <h2 class="blog-card-title">' + esc(title) + '</h2>\n'
    + (teaser ? '    <p class="blog-card-teaser">' + esc(teaser) + '</p>\n' : '')
    + '    <span class="blog-card-readmore">Weiterlesen '
    + '<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">'
    + '<path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>'
    + '</svg></span>\n'
    + '  </div>\n'
    + '</a>';
}

// ── Main ─────────────────────────────────────────────────────

async function main() {
  console.log('Fetching posts from Contentful…');

  const apiUrl = 'https://cdn.contentful.com/spaces/' + SPACE_ID
               + '/entries?content_type=blogPost&order=-fields.date&include=1'
               + '&access_token=' + ACCESS_TOKEN;

  const data = await fetchJSON(apiUrl);

  if (!data.items || data.items.length === 0) {
    console.log('No posts found — nothing to generate.');
    return;
  }

  const assets = buildAssetMap(data.includes);

  // Output-Verzeichnisse anlegen
  const distBlogDir = path.join(DIST_DIR, 'blog');
  fs.mkdirSync(distBlogDir, { recursive: true });

  // ── Einzelne Post-Seiten ──────────────────────────────────
  for (const item of data.items) {
    const f    = item.fields;
    const slug = f.slug || item.sys.id;
    const html = generatePostHtml(f, slug, assets);
    fs.writeFileSync(path.join(distBlogDir, slug + '.html'), html, 'utf8');
    console.log('  + blog/' + slug + '.html');
  }

  // ── blog.html — statische Karten injizieren ───────────────
  const cards = data.items
    .map(item => generateCardHtml(item.fields, item.fields.slug || item.sys.id, assets))
    .join('\n');

  const srcBlogHtml  = path.join(SITE_ROOT, 'blog.html');
  const distBlogHtml = path.join(DIST_DIR,  'blog.html');
  let   blogHtml     = fs.readFileSync(srcBlogHtml, 'utf8');

  blogHtml = blogHtml.replace(
    /<!-- BLOG_CARDS_START -->[\s\S]*?<!-- BLOG_CARDS_END -->/,
    '<!-- BLOG_CARDS_START -->\n' + cards + '\n        <!-- BLOG_CARDS_END -->'
  );
  fs.writeFileSync(distBlogHtml, blogHtml, 'utf8');
  console.log('  + blog.html');

  console.log('\nFertig. ' + data.items.length + ' Posts generiert.');
}

main().catch(err => {
  console.error('Build fehlgeschlagen:', err.message);
  process.exit(1);
});
