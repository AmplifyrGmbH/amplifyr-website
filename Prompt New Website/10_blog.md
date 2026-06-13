# Prompt 10 — `blog.html` + `blog-post.html` + `page-blog.css` + `page-blog.js`

## Kontext & Ziel

Erstelle zwei Blog-Seiten für die Amplifyr-Website:
1. **`blog.html`** — Übersicht aller Blog-Posts (Karten-Grid), dynamisch via Contentful CMS
2. **`blog-post.html`** — Einzelner Blog-Post (Artikel-Ansicht), via URL-Parameter `?slug=...`

Beide Seiten laden Posts aus **Contentful** (Headless CMS). Kein statisches HTML für Posts.

Lies zuerst:
- `style.css` — Design System
- `main.js` — Header-Scroll, Hamburger, Mobile-Menü

Erstelle dann:
- `blog.html` — nur HTML, kein `<style>`, kein `<script>`
- `blog-post.html` — nur HTML, kein `<style>`, kein `<script>`
- `page-blog.css` — gemeinsames CSS für beide Blog-Seiten
- `page-blog.js` — gemeinsames JS für beide Blog-Seiten (Contentful-Client, Renderer)

---

## Contentful-Konfiguration

```javascript
// blog-config.js (separate Datei, NICHT in page-blog.js einbetten)
// Wird VOR page-blog.js geladen: <script src="/blog-config.js"></script>
// NICHT in Git committen (.gitignore) — manuell per FTP auf Server laden
window.BLOG_CONFIG = {
  spaceId:     '0fk0b3cada0j',
  accessToken: 'WRLvqulzWkdZHP560vykq5J9FpiNZLPgmf_2zhuCG_Q',
  contentType: 'blogPost'
};
```

**Contentful Content-Model `blogPost`:**
| Feld | Typ | Alias |
|---|---|---|
| `titel` / `title` | Short text | Post-Titel |
| `slug` | Short text | URL-Slug |
| `date` | Date | Veröffentlichungsdatum |
| `category` / `kategorie` | Short text | Kategorie |
| `coverImage` / `titelbild` | Media (Asset) | Titelbild |
| `teaser` | Short text | Kurzbeschreibung |
| `body` | Rich Text | Artikel-Inhalt |

---

## `blog.html` — Grundgerüst

```html
<!DOCTYPE html>
<html lang="de-CH">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Blog — Einblicke aus dem Unternehmertum | amplifyr</title>
  <meta name="description" content="Wir dokumentieren unsere Reise als junge Gründer – offen, ehrlich und nah an der Praxis." />

  <!-- Favicons -->
  <link rel="icon" type="image/x-icon" href="/Favicon/favicon.ico" />
  <link rel="icon" type="image/png" sizes="32x32" href="/Favicon/favicon_32x32.png" />
  <link rel="icon" type="image/png" sizes="16x16" href="/Favicon/favicon_16x16.png" />
  <link rel="apple-touch-icon" sizes="180x180" href="/Favicon/favicon_180x180.png" />
  <link rel="canonical" href="https://www.amplifyr.ch/blog" />

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />

  <!-- Shared + Page CSS -->
  <link rel="stylesheet" href="style.css" />
  <link rel="stylesheet" href="page-blog.css" />
</head>
<body>

  <!-- HEADER — hero-mode (weil Seite mit hellem Blog-Hintergrund) -->
  <!-- Hinweis: Hero-Mode macht nur Sinn wenn Blog-Hintergrund dunkel/Foto ist.
       Falls Blog weiss/hell startet → legal-mode verwenden -->
  <header id="site-header" class="hero-mode">
    <!-- Navigation wie in 02_navigation-footer.md -->
    <!-- "Über uns" → "Blog" wird als Sub-Item aktiv markiert -->
  </header>

  <nav class="mobile-menu" id="mobile-menu" aria-label="Mobile Navigation">
    <!-- wie in 02_navigation-footer.md -->
  </nav>

  <main>

    <!-- Blog-Übersicht -->
    <section class="blog-section">
      <div class="container">

        <!-- Intro -->
        <div class="blog-intro">
          <h1 class="blog-heading">Einblicke aus dem Unternehmertum</h1>
          <p class="blog-sub">Wir dokumentieren unsere Reise als junge Gründer – offen, ehrlich und nah an der Praxis.</p>
        </div>

        <!-- Grid (wird per JS befüllt) -->
        <div id="blog-grid" class="blog-grid" aria-live="polite" aria-busy="true">
          <!-- Lade-Zustand -->
          <div class="blog-loading">
            <div class="blog-spinner" aria-hidden="true"></div>
            <p>Posts werden geladen…</p>
          </div>
        </div>

      </div>
    </section>

  </main>

  <!-- FOOTER -->
  <footer class="footer-light">
    <div class="container">
      <div class="footer-inner">
        <a class="logo footer-logo" href="/" aria-label="amplifyr Startseite">
          <span class="logo-wordmark">ampli<em class="logo-fyr">fyr</em></span>
        </a>
        <p class="footer-copy">&copy; 2026 Amplifyr GmbH. Alle Rechte vorbehalten.</p>
        <nav class="footer-links" aria-label="Footer Navigation">
          <a href="/impressum.html">Impressum</a>
          <a href="/datenschutz.html">Datenschutz</a>
          <a href="/agb.html">AGB</a>
        </nav>
      </div>
    </div>
  </footer>

  <!-- JS: Config zuerst laden, dann Blog-JS -->
  <script src="/blog-config.js"></script>
  <script src="main.js"></script>
  <script src="page-blog.js"></script>
</body>
</html>
```

---

## `blog-post.html` — Grundgerüst

```html
<!DOCTYPE html>
<html lang="de-CH">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <!-- Titel und Meta werden per JS dynamisch gesetzt -->
  <title id="meta-title">Blog | amplifyr</title>
  <meta name="description" id="meta-desc" content="" />

  <!-- Favicons -->
  <link rel="icon" type="image/x-icon" href="/Favicon/favicon.ico" />
  <link rel="icon" type="image/png" sizes="32x32" href="/Favicon/favicon_32x32.png" />
  <link rel="icon" type="image/png" sizes="16x16" href="/Favicon/favicon_16x16.png" />
  <link rel="apple-touch-icon" sizes="180x180" href="/Favicon/favicon_180x180.png" />

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />

  <!-- Shared + Page CSS -->
  <link rel="stylesheet" href="style.css" />
  <link rel="stylesheet" href="page-blog.css" />
</head>
<body>

  <!-- HEADER — legal-mode (weisser Header, kein Hero) -->
  <header id="site-header" class="legal-mode">
    <!-- Navigation wie in 02_navigation-footer.md -->
  </header>

  <nav class="mobile-menu" id="mobile-menu" aria-label="Mobile Navigation">
    <!-- wie in 02_navigation-footer.md -->
  </nav>

  <main>
    <!-- Post-Container (wird per JS befüllt) -->
    <div class="post-wrap" id="post-wrap" aria-live="polite" aria-busy="true">
      <div class="post-loading">
        <div class="post-spinner" aria-hidden="true"></div>
        <p>Artikel wird geladen…</p>
      </div>
    </div>
  </main>

  <!-- FOOTER -->
  <footer class="footer-light">
    <div class="container">
      <div class="footer-inner">
        <a class="logo footer-logo" href="/" aria-label="amplifyr Startseite">
          <span class="logo-wordmark">ampli<em class="logo-fyr">fyr</em></span>
        </a>
        <p class="footer-copy">&copy; 2026 Amplifyr GmbH. Alle Rechte vorbehalten.</p>
        <nav class="footer-links" aria-label="Footer Navigation">
          <a href="/impressum.html">Impressum</a>
          <a href="/datenschutz.html">Datenschutz</a>
          <a href="/agb.html">AGB</a>
        </nav>
      </div>
    </div>
  </footer>

  <script src="/blog-config.js"></script>
  <script src="main.js"></script>
  <script src="page-blog.js"></script>
</body>
</html>
```

---

## `page-blog.css`

```css
/* ============================================================
   BLOG-ÜBERSICHT (blog.html)
============================================================ */

.blog-section {
  padding-block: var(--section-py);
  padding-top: calc(var(--header-h) + var(--section-py));
  min-height: 100vh;
}

.blog-intro {
  text-align: center;
  margin-bottom: var(--space-12);
  max-width: 720px;
  margin-inline: auto;
  margin-bottom: var(--space-12);
}
.blog-heading {
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 3.2rem);
  font-weight: 900;
  color: var(--navy);
  line-height: 1.1;
  letter-spacing: -0.025em;
  margin-bottom: var(--space-4);
}
.blog-sub {
  font-size: clamp(1rem, 1.5vw, 1.1rem);
  color: var(--text-muted);
  line-height: 1.7;
}

/* Blog-Grid */
.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--space-6);
}

/* Blog-Karte */
.blog-card {
  background: var(--bg-white);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: transform var(--duration) var(--ease),
              box-shadow var(--duration) var(--ease);
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: inherit;
}
.blog-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
}

.blog-card-img {
  width: 100%;
  aspect-ratio: 16/9;
  object-fit: cover;
  display: block;
}
.blog-card-img-placeholder {
  width: 100%;
  aspect-ratio: 16/9;
  background: var(--steel-light);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--steel);
}

.blog-card-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: var(--space-6);
}
.blog-card-meta {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-3);
}
.blog-card-category {
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--steel);
  background: var(--steel-light);
  padding: 3px 10px;
  border-radius: var(--radius-pill);
}
.blog-card-date {
  font-size: 0.78rem;
  color: var(--text-muted);
}
.blog-card-title {
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--navy);
  line-height: 1.3;
  margin-bottom: var(--space-3);
}
.blog-card-teaser {
  font-size: 0.875rem;
  color: var(--text-muted);
  line-height: 1.65;
  flex: 1;
  margin-bottom: var(--space-5);
  /* 3-Zeilen-Clamp */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.blog-card-readmore {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--navy);
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-top: auto;
}

/* Zustands-Meldungen */
.blog-loading,
.blog-coming-soon,
.blog-empty,
.blog-error {
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-4);
  padding: var(--space-16);
  text-align: center;
  color: var(--text-muted);
}
.blog-spinner,
.post-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid var(--steel-light);
  border-top-color: var(--navy);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}

/* ============================================================
   BLOG-POST (blog-post.html)
============================================================ */

.post-wrap {
  max-width: 720px;
  margin-inline: auto;
  padding: calc(var(--header-h) + var(--space-12)) var(--space-6) var(--space-20);
}

/* Lade-Zustand */
.post-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-4);
  min-height: 50vh;
  color: var(--text-muted);
}

/* Zurück-Link */
.post-back {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-muted);
  text-decoration: none;
  margin-bottom: var(--space-8);
  transition: color var(--duration) var(--ease);
}
.post-back:hover { color: var(--navy); }

/* Post-Header */
.post-header {
  margin-bottom: var(--space-8);
}
.post-meta {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-5);
}
.post-category {
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--steel);
  background: var(--steel-light);
  padding: 3px 10px;
  border-radius: var(--radius-pill);
}
.post-date {
  font-size: 0.78rem;
  color: var(--text-muted);
}
.post-title {
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 3.5vw, 2.8rem);
  font-weight: 900;
  color: var(--navy);
  line-height: 1.12;
  letter-spacing: -0.02em;
  margin-bottom: var(--space-5);
}
.post-teaser {
  font-size: 1.1rem;
  color: var(--text-muted);
  line-height: 1.75;
  margin-bottom: var(--space-6);
}
.post-cover {
  width: 100%;
  border-radius: var(--radius-lg);
  margin-bottom: var(--space-8);
  aspect-ratio: 16/9;
  object-fit: cover;
}
.post-divider {
  border: none;
  border-top: 1px solid var(--border-light);
  margin-bottom: var(--space-10);
}

/* Post-Inhalt (Rich Text) */
.post-body {
  color: var(--text-muted);
  font-size: 1rem;
  line-height: 1.8;
}
.post-body h2 {
  font-family: var(--font-display);
  font-size: clamp(1.3rem, 2.5vw, 1.7rem);
  font-weight: 700;
  color: var(--navy);
  margin: var(--space-10) 0 var(--space-4);
  line-height: 1.2;
}
.post-body h3 {
  font-family: var(--font-display);
  font-size: clamp(1.1rem, 2vw, 1.3rem);
  font-weight: 700;
  color: var(--navy);
  margin: var(--space-8) 0 var(--space-3);
}
.post-body p {
  margin-bottom: var(--space-5);
}
.post-body ul,
.post-body ol {
  padding-left: var(--space-6);
  margin-bottom: var(--space-5);
  list-style: disc;
}
.post-body ol { list-style: decimal; }
.post-body li { margin-bottom: var(--space-2); }
.post-body blockquote {
  border-left: 4px solid var(--steel);
  padding-left: var(--space-6);
  margin: var(--space-8) 0;
  color: var(--text-muted);
  font-style: italic;
}
.post-body code {
  font-family: monospace;
  font-size: 0.875em;
  background: var(--steel-light);
  padding: 2px 6px;
  border-radius: 4px;
  color: var(--navy);
}
.post-body a {
  color: var(--navy);
  text-decoration: underline;
  text-underline-offset: 3px;
}
.post-body a:hover { color: var(--text-muted); }
.post-body hr {
  border: none;
  border-top: 1px solid var(--border-light);
  margin: var(--space-8) 0;
}

/* Fehlerzustände */
.post-error {
  text-align: center;
  padding: var(--space-16);
  color: var(--text-muted);
}
.post-error a {
  color: var(--navy);
  font-weight: 600;
}

@media (max-width: 640px) {
  .post-wrap {
    padding-inline: var(--space-4);
  }
  .blog-grid {
    grid-template-columns: 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  .blog-spinner,
  .post-spinner {
    animation: none;
  }
}
```

---

## `page-blog.js`

```javascript
'use strict';

// ── Hilfsfunktionen ───────────────────────────────────────────
function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;')
    .replace(/"/g,  '&quot;');
}

// Contentful Rich Text → HTML
function renderRichText(node) {
  if (!node) return '';
  if (node.nodeType === 'text') {
    let t = escHtml(node.value);
    if (node.marks) {
      node.marks.forEach(m => {
        if (m.type === 'bold')   t = `<strong>${t}</strong>`;
        if (m.type === 'italic') t = `<em>${t}</em>`;
        if (m.type === 'code')   t = `<code>${t}</code>`;
      });
    }
    return t;
  }
  const children = (node.content || []).map(renderRichText).join('');
  switch (node.nodeType) {
    case 'document':        return children;
    case 'paragraph':       return `<p>${children}</p>`;
    case 'heading-1':
    case 'heading-2':       return `<h2>${children}</h2>`;
    case 'heading-3':
    case 'heading-4':       return `<h3>${children}</h3>`;
    case 'unordered-list':  return `<ul>${children}</ul>`;
    case 'ordered-list':    return `<ol>${children}</ol>`;
    case 'list-item':       return `<li>${children}</li>`;
    case 'blockquote':      return `<blockquote>${children}</blockquote>`;
    case 'hr':              return `<hr>`;
    case 'hyperlink':
      return `<a href="${escHtml(node.data.uri)}" target="_blank" rel="noopener">${children}</a>`;
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


// ── Blog-Übersicht laden (blog.html) ─────────────────────────
async function loadBlogList() {
  const grid = document.getElementById('blog-grid');
  if (!grid) return;

  const cfg = window.BLOG_CONFIG;
  if (!cfg) {
    grid.setAttribute('aria-busy', 'false');
    grid.innerHTML = '<div class="blog-coming-soon"><p>Folgt in Kürze.</p></div>';
    return;
  }

  const url = `https://cdn.contentful.com/spaces/${cfg.spaceId}/entries`
            + `?content_type=${cfg.contentType}&order=-fields.date&include=1`
            + `&access_token=${cfg.accessToken}`;

  try {
    const res  = await fetch(url);
    const data = await res.json();

    grid.setAttribute('aria-busy', 'false');

    if (!data.items || data.items.length === 0) {
      grid.innerHTML = '<div class="blog-empty">Noch keine Posts vorhanden – bald gibt es hier Einblicke!</div>';
      return;
    }

    // Asset-Map aufbauen für Cover-Images
    const assets = {};
    (data.includes?.Asset || []).forEach(a => {
      assets[a.sys.id] = 'https:' + a.fields.file.url;
    });

    grid.innerHTML = data.items.map(item => {
      const f     = item.fields;
      const title = f.titel || f.title || '';
      const slug  = f.slug  || item.sys.id;
      const date  = formatDate(f.date);
      const imgId = (f.coverImage || f.titelbild)?.sys?.id;
      const imgUrl = imgId && assets[imgId] ? assets[imgId] : null;
      const teaser = typeof f.teaser === 'string'
        ? f.teaser
        : extractPlainText(f.teaser).slice(0, 160);
      const cat = f.category || f.kategorie || '';

      const imgHtml = imgUrl
        ? `<img class="blog-card-img" src="${escHtml(imgUrl)}" alt="${escHtml(title)}" loading="lazy" decoding="async">`
        : `<div class="blog-card-img-placeholder" aria-hidden="true">
             <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
               <rect x="3" y="3" width="18" height="18" rx="2" stroke="#B0C4DE" stroke-width="1.5"/>
               <circle cx="8.5" cy="8.5" r="1.5" fill="#B0C4DE"/>
               <path d="M21 15l-5-5L5 21" stroke="#B0C4DE" stroke-width="1.5"/>
             </svg>
           </div>`;

      const catHtml = cat
        ? `<span class="blog-card-category">${escHtml(cat)}</span>`
        : '';

      return `
        <a class="blog-card" href="/blog-post.html?slug=${encodeURIComponent(slug)}">
          ${imgHtml}
          <div class="blog-card-body">
            <div class="blog-card-meta">
              ${catHtml}
              ${date ? `<span class="blog-card-date">${escHtml(date)}</span>` : ''}
            </div>
            <h2 class="blog-card-title">${escHtml(title)}</h2>
            ${teaser ? `<p class="blog-card-teaser">${escHtml(teaser)}</p>` : ''}
            <span class="blog-card-readmore">
              Weiterlesen
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
          </div>
        </a>`;
    }).join('');

  } catch {
    grid.setAttribute('aria-busy', 'false');
    grid.innerHTML = '<div class="blog-error">Posts konnten nicht geladen werden. Bitte später nochmals versuchen.</div>';
  }
}


// ── Einzelnen Post laden (blog-post.html) ─────────────────────
async function loadBlogPost() {
  const wrap = document.getElementById('post-wrap');
  if (!wrap) return;

  const cfg = window.BLOG_CONFIG;
  if (!cfg) {
    wrap.setAttribute('aria-busy', 'false');
    wrap.innerHTML = '<div class="post-error">Konfiguration fehlt (blog-config.js).</div>';
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const slug   = params.get('slug');
  if (!slug) {
    wrap.setAttribute('aria-busy', 'false');
    wrap.innerHTML = '<div class="post-error">Kein Artikel angegeben. <a href="/blog.html">Zurück zum Blog</a></div>';
    return;
  }

  const url = `https://cdn.contentful.com/spaces/${cfg.spaceId}/entries`
            + `?content_type=${cfg.contentType}&fields.slug=${encodeURIComponent(slug)}`
            + `&include=1&access_token=${cfg.accessToken}`;

  try {
    const res  = await fetch(url);
    const data = await res.json();

    wrap.setAttribute('aria-busy', 'false');

    if (!data.items || data.items.length === 0) {
      wrap.innerHTML = '<div class="post-error">Artikel nicht gefunden. <a href="/blog.html">Zurück zum Blog</a></div>';
      return;
    }

    const item  = data.items[0];
    const f     = item.fields;
    const title = f.titel || f.title || '';
    const date  = formatDate(f.date);
    const cat   = f.category || f.kategorie || '';

    // Asset-Map für Cover-Image
    const assets = {};
    (data.includes?.Asset || []).forEach(a => {
      assets[a.sys.id] = 'https:' + a.fields.file.url;
    });
    const imgId  = (f.coverImage || f.titelbild)?.sys?.id;
    const imgUrl = imgId && assets[imgId] ? assets[imgId] : null;

    // Teaser
    const teaserRaw = f.teaser;
    const teaserHtml = teaserRaw
      ? (typeof teaserRaw === 'string'
          ? `<p class="post-teaser">${escHtml(teaserRaw)}</p>`
          : `<div class="post-teaser">${renderRichText(teaserRaw)}</div>`)
      : '';

    // Body (Rich Text)
    const bodyHtml = f.body ? renderRichText(f.body) : '';

    // Meta-Tags dynamisch setzen
    document.title = `${title} | amplifyr Blog`;
    const metaDesc = document.getElementById('meta-desc');
    if (metaDesc && teaserRaw) {
      metaDesc.content = typeof teaserRaw === 'string'
        ? teaserRaw.slice(0, 160)
        : extractPlainText(teaserRaw).slice(0, 160);
    }

    wrap.innerHTML = `
      <a class="post-back" href="/blog.html">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M13 8H3M7 12l-4-4 4-4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Alle Beiträge
      </a>
      <article>
        <header class="post-header">
          <div class="post-meta">
            ${cat  ? `<span class="post-category">${escHtml(cat)}</span>` : ''}
            ${date ? `<span class="post-date">${escHtml(date)}</span>`    : ''}
          </div>
          <h1 class="post-title">${escHtml(title)}</h1>
          ${teaserHtml}
        </header>
        ${imgUrl ? `<img class="post-cover" src="${escHtml(imgUrl)}" alt="${escHtml(title)}" loading="eager" decoding="async">` : ''}
        <hr class="post-divider">
        <div class="post-body">${bodyHtml}</div>
      </article>`;

  } catch {
    wrap.setAttribute('aria-busy', 'false');
    wrap.innerHTML = '<div class="post-error">Artikel konnte nicht geladen werden. <a href="/blog.html">Zurück zum Blog</a></div>';
  }
}


// ── Initialisierung ───────────────────────────────────────────
// Erkennen welche Seite aktiv ist und entsprechende Funktion aufrufen
if (document.getElementById('blog-grid')) {
  loadBlogList();
}
if (document.getElementById('post-wrap')) {
  loadBlogPost();
}
```

---

## Regeln & Hinweise

- **`blog-config.js`** als separate Datei — enthält Contentful API-Schlüssel
  - Wird VOR `page-blog.js` geladen
  - Nicht in page-blog.js hardcoden (ermöglicht einfaches Austauschen)
- Contentful API-URL: `https://cdn.contentful.com/spaces/{spaceId}/entries`
- Blog-Post-URL-Schema: `blog-post.html?slug=SLUG` (kein Hash, kein Rewrite nötig)
- `aria-live="polite"` + `aria-busy="true/false"` für Screenreader-Feedback
- Cover-Image auf Post-Seite: `loading="eager"` (above the fold), auf Karten: `loading="lazy"`
- `<meta id="meta-title">` + `<meta id="meta-desc">` werden per JS gesetzt
- Alle User-Inhalte aus Contentful via `escHtml()` escapen (XSS-Schutz)
- Rich Text: `heading-1` und `heading-2` werden beide zu `<h2>` (weil `<h1>` der Post-Titel ist)
- Fallback-Zustände implementieren: Laden / Keine Posts / Fehler / Post nicht gefunden
