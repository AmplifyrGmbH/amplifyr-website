/* ============================================================
   AMPLIFYR — page-blog.js
   Gemeinsames JS für blog.html + blog-post.html
   Lädt Posts aus Contentful via window.BLOG_CONFIG (blog-config.js)
============================================================ */

'use strict';

// ── Hilfsfunktionen ───────────────────────────────────────────

function escHtml(str) {
  return String(str)
    .replace(/&/g,  '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;')
    .replace(/"/g,  '&quot;');
}

// Contentful Rich Text → HTML
function renderRichText(node) {
  if (!node) return '';
  if (node.nodeType === 'text') {
    var t = escHtml(node.value);
    if (node.marks) {
      node.marks.forEach(function (m) {
        if (m.type === 'bold')   t = '<strong>' + t + '</strong>';
        if (m.type === 'italic') t = '<em>' + t + '</em>';
        if (m.type === 'code')   t = '<code>' + t + '</code>';
      });
    }
    return t;
  }
  var children = (node.content || []).map(renderRichText).join('');
  switch (node.nodeType) {
    case 'document':        return children;
    case 'paragraph':       return '<p>' + children + '</p>';
    case 'heading-1':
    case 'heading-2':       return '<h2>' + children + '</h2>';
    case 'heading-3':
    case 'heading-4':       return '<h3>' + children + '</h3>';
    case 'unordered-list':  return '<ul>' + children + '</ul>';
    case 'ordered-list':    return '<ol>' + children + '</ol>';
    case 'list-item':       return '<li>' + children + '</li>';
    case 'blockquote':      return '<blockquote>' + children + '</blockquote>';
    case 'hr':              return '<hr>';
    case 'hyperlink':
      return '<a href="' + escHtml(node.data.uri) + '" target="_blank" rel="noopener">' + children + '</a>';
    default:                return children;
  }
}

function extractPlainText(node) {
  if (!node) return '';
  if (node.nodeType === 'text') return node.value || '';
  return (node.content || []).map(extractPlainText).join('');
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('de-CH', {
    day: '2-digit', month: 'long', year: 'numeric'
  });
}

function buildAssetMap(includes) {
  var assets = {};
  ((includes && includes.Asset) || []).forEach(function (a) {
    assets[a.sys.id] = 'https:' + a.fields.file.url;
  });
  return assets;
}


// ── Blog-Übersicht laden (blog.html) ─────────────────────────

function loadBlogList() {
  var grid = document.getElementById('blog-grid');
  if (!grid) return;

  var cfg = window.BLOG_CONFIG;
  if (!cfg) {
    grid.setAttribute('aria-busy', 'false');
    grid.innerHTML = '<div class="blog-coming-soon"><p>Folgt in Kürze.</p></div>';
    return;
  }

  var url = 'https://cdn.contentful.com/spaces/' + cfg.spaceId + '/entries'
          + '?content_type=' + cfg.contentType + '&order=-fields.date&include=1'
          + '&access_token=' + cfg.accessToken;

  fetch(url)
    .then(function (res) { return res.json(); })
    .then(function (data) {
      grid.setAttribute('aria-busy', 'false');

      if (!data.items || data.items.length === 0) {
        grid.innerHTML = '<div class="blog-empty">Noch keine Posts vorhanden – bald gibt es hier Einblicke!</div>';
        return;
      }

      var assets = buildAssetMap(data.includes);

      grid.innerHTML = data.items.map(function (item) {
        var f      = item.fields;
        var title  = f.titel || f.title || '';
        var slug   = f.slug  || item.sys.id;
        var date   = formatDate(f.date);
        var imgRef = f.coverImage || f.titelbild;
        var imgId  = imgRef && imgRef.sys ? imgRef.sys.id : null;
        var imgUrl = imgId && assets[imgId] ? assets[imgId] : null;
        var teaser = typeof f.teaser === 'string'
          ? f.teaser
          : extractPlainText(f.teaser).slice(0, 160);
        var cat = f.category || f.kategorie || '';

        var imgHtml = imgUrl
          ? '<img class="blog-card-img" src="' + escHtml(imgUrl) + '" alt="' + escHtml(title) + '" loading="lazy" decoding="async">'
          : '<div class="blog-card-img-placeholder" aria-hidden="true">'
            + '<svg width="40" height="40" viewBox="0 0 24 24" fill="none">'
            + '<rect x="3" y="3" width="18" height="18" rx="2" stroke="#B0C4DE" stroke-width="1.5"/>'
            + '<circle cx="8.5" cy="8.5" r="1.5" fill="#B0C4DE"/>'
            + '<path d="M21 15l-5-5L5 21" stroke="#B0C4DE" stroke-width="1.5"/>'
            + '</svg></div>';

        var catHtml  = cat  ? '<span class="blog-card-category">' + escHtml(cat)  + '</span>' : '';
        var dateHtml = date ? '<span class="blog-card-date">'      + escHtml(date) + '</span>' : '';

        return '<a class="blog-card" href="/blog-post.html?slug=' + encodeURIComponent(slug) + '">'
          + imgHtml
          + '<div class="blog-card-body">'
          + '<div class="blog-card-meta">' + catHtml + dateHtml + '</div>'
          + '<h2 class="blog-card-title">' + escHtml(title) + '</h2>'
          + (teaser ? '<p class="blog-card-teaser">' + escHtml(teaser) + '</p>' : '')
          + '<span class="blog-card-readmore">'
          + 'Weiterlesen'
          + '<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">'
          + '<path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>'
          + '</svg>'
          + '</span>'
          + '</div>'
          + '</a>';
      }).join('');
    })
    .catch(function () {
      grid.setAttribute('aria-busy', 'false');
      grid.innerHTML = '<div class="blog-error">Posts konnten nicht geladen werden. Bitte später nochmals versuchen.</div>';
    });
}


// ── Einzelnen Post laden (blog-post.html) ─────────────────────

function loadBlogPost() {
  var wrap = document.getElementById('post-wrap');
  if (!wrap) return;

  var cfg = window.BLOG_CONFIG;
  if (!cfg) {
    wrap.setAttribute('aria-busy', 'false');
    wrap.innerHTML = '<div class="post-error">Konfiguration fehlt (blog-config.js).</div>';
    return;
  }

  var params = new URLSearchParams(window.location.search);
  var slug   = params.get('slug');
  if (!slug) {
    wrap.setAttribute('aria-busy', 'false');
    wrap.innerHTML = '<div class="post-error">Kein Artikel angegeben. <a href="/blog">Zurück zum Blog</a></div>';
    return;
  }

  var url = 'https://cdn.contentful.com/spaces/' + cfg.spaceId + '/entries'
          + '?content_type=' + cfg.contentType + '&fields.slug=' + encodeURIComponent(slug)
          + '&include=1&access_token=' + cfg.accessToken;

  fetch(url)
    .then(function (res) { return res.json(); })
    .then(function (data) {
      wrap.setAttribute('aria-busy', 'false');

      if (!data.items || data.items.length === 0) {
        wrap.innerHTML = '<div class="post-error">Artikel nicht gefunden. <a href="/blog">Zurück zum Blog</a></div>';
        return;
      }

      var item   = data.items[0];
      var f      = item.fields;
      var title  = f.titel || f.title || '';
      var date   = formatDate(f.date);
      var cat    = f.category || f.kategorie || '';
      var assets = buildAssetMap(data.includes);
      var imgRef = f.coverImage || f.titelbild;
      var imgId  = imgRef && imgRef.sys ? imgRef.sys.id : null;
      var imgUrl = imgId && assets[imgId] ? assets[imgId] : null;

      // Teaser
      var teaserRaw  = f.teaser;
      var teaserHtml = '';
      if (teaserRaw) {
        teaserHtml = typeof teaserRaw === 'string'
          ? '<p class="post-teaser">' + escHtml(teaserRaw) + '</p>'
          : '<div class="post-teaser">' + renderRichText(teaserRaw) + '</div>';
      }

      // Body (Rich Text)
      var bodyHtml = f.body ? renderRichText(f.body) : '';

      // Meta-Tags dynamisch setzen
      document.title = title + ' | Amplifyr Blog';
      var metaDesc = document.getElementById('meta-desc');
      if (metaDesc && teaserRaw) {
        metaDesc.setAttribute('content', typeof teaserRaw === 'string'
          ? teaserRaw.slice(0, 160)
          : extractPlainText(teaserRaw).slice(0, 160));
      }

      wrap.innerHTML = ''
        + '<a class="post-back" href="/blog">'
        + '<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">'
        + '<path d="M13 8H3M7 12l-4-4 4-4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>'
        + '</svg>'
        + 'Alle Beiträge'
        + '</a>'
        + '<article>'
        + '<header class="post-header">'
        + '<div class="post-meta">'
        + (cat  ? '<span class="post-category">' + escHtml(cat)  + '</span>' : '')
        + (date ? '<span class="post-date">'      + escHtml(date) + '</span>' : '')
        + '</div>'
        + '<h1 class="post-title">' + escHtml(title) + '</h1>'
        + teaserHtml
        + '</header>'
        + (imgUrl ? '<img class="post-cover" src="' + escHtml(imgUrl) + '" alt="' + escHtml(title) + '" loading="eager" decoding="async">' : '')
        + '<hr class="post-divider">'
        + '<div class="post-body">' + bodyHtml + '</div>'
        + '</article>';
    })
    .catch(function () {
      wrap.setAttribute('aria-busy', 'false');
      wrap.innerHTML = '<div class="post-error">Artikel konnte nicht geladen werden. <a href="/blog">Zurück zum Blog</a></div>';
    });
}


// ── Initialisierung ───────────────────────────────────────────

if (document.getElementById('blog-grid')) {
  loadBlogList();
}
if (document.getElementById('post-wrap')) {
  loadBlogPost();
}
