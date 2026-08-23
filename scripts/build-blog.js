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

// ── Seiten-Chrome (Header/Mobile-Menü/Footer/Head-Assets) ─────
// Wird NICHT mehr dupliziert/hart hinterlegt, sondern zur Build-Zeit
// direkt aus der aktuellen blog.html extrahiert — damit Post-Seiten
// bei jedem Nav-/Header-Umbau automatisch aktuell bleiben, statt wie
// bisher separat von Hand nachgepflegt werden zu muessen (das ist
// bereits zweimal auseinandergedriftet: /ki-transformation statt
// /bewirtschaftung, altes flaches Mobile-Menue, fehlendes GTM-Tracking).
function extractBlock(html, re, label) {
  const m = html.match(re);
  if (!m) throw new Error('build-blog.js: Konnte "' + label + '" nicht aus blog.html extrahieren — hat sich die Struktur geändert?');
  return m[0].trim();
}

function extractChrome(blogHtmlSrc) {
  const gtmHead   = extractBlock(blogHtmlSrc, /<!-- Google Tag Manager -->[\s\S]*?<!-- End Google Tag Manager -->/, 'GTM Head-Snippet');
  const gtmBody   = extractBlock(blogHtmlSrc, /<!-- Google Tag Manager \(noscript\) -->[\s\S]*?<!-- End Google Tag Manager \(noscript\) -->/, 'GTM Body-Snippet');
  const headCommon = extractBlock(blogHtmlSrc, /<!-- Favicons -->[\s\S]*?(?=\n<\/head>)/, 'Head-Assets (Favicons/Fonts/CSS)');
  const header    = extractBlock(blogHtmlSrc, /<header id="site-header"[\s\S]*?<\/header>/, 'Header');
  const mobileMenu = extractBlock(blogHtmlSrc, /<nav class="mobile-menu"[\s\S]*?<\/nav>/, 'Mobile-Menü');
  const footer    = extractBlock(blogHtmlSrc, /<footer>[\s\S]*?<\/footer>/, 'Footer');
  return { gtmHead, gtmBody, headCommon, header, mobileMenu, footer };
}

// ── Post-Seite generieren ─────────────────────────────────────

function generatePostHtml(f, slug, assets, chrome) {
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

  // Body — Contentful-Feld heisst "content" (Inhalt), nicht "body"
  const bodyRaw  = f.content || f.body;
  const bodyHtml = bodyRaw ? renderRichText(bodyRaw) : '';

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
    + chrome.gtmHead + '\n'
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
    + chrome.headCommon + '\n'
    + '</head>\n'
    + '<body>\n'
    + chrome.gtmBody + '\n\n'
    + chrome.header + '\n\n'
    + chrome.mobileMenu + '\n\n'
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
    + chrome.footer + '\n\n'
    + '  <script defer src="/main.js"></script>\n'
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

  // Seiten-Chrome (Header/Mobile-Menü/Footer/Head-Assets) einmal aus
  // der aktuellen blog.html extrahieren — siehe extractChrome() weiter
  // oben. Dieselbe Datei wird unten für die Karten-Injection erneut
  // gebraucht, daher hier nur einmal einlesen.
  const srcBlogHtml   = path.join(SITE_ROOT, 'blog.html');
  const blogHtmlSrc   = fs.readFileSync(srcBlogHtml, 'utf8');
  const chrome        = extractChrome(blogHtmlSrc);

  // Output-Verzeichnisse anlegen
  const distBlogDir = path.join(DIST_DIR, 'blog');
  fs.mkdirSync(distBlogDir, { recursive: true });

  // ── Einzelne Post-Seiten ──────────────────────────────────
  for (const item of data.items) {
    const f    = item.fields;
    const slug = f.slug || item.sys.id;
    const html = generatePostHtml(f, slug, assets, chrome);
    fs.writeFileSync(path.join(distBlogDir, slug + '.html'), html, 'utf8');
    console.log('  + blog/' + slug + '.html');
  }

  // ── blog.html — statische Karten injizieren ───────────────
  const cards = data.items
    .map(item => generateCardHtml(item.fields, item.fields.slug || item.sys.id, assets))
    .join('\n');

  const distBlogHtml = path.join(DIST_DIR, 'blog.html');
  let   blogHtml     = blogHtmlSrc;

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
