/* ============================================================
   site.js — Amplifyr (Relaunch 2026)
   Header-Zustand, Mobile-Menü, Sprungnavigation, Scroll-Einblendungen,
   Kontaktformular, GTM-Klicks
   ============================================================ */
(function () {
  'use strict';

  document.documentElement.classList.add('js');

  // ---- Header: transparent über dem Bild-Kopf, sonst hell ----
  var header = document.getElementById('site-header');
  var hero = document.querySelector('.hero, .page-hero');
  function updateHeader() {
    if (!header) return;
    if (!hero) { header.classList.add('is-solid'); return; }
    var threshold = hero.offsetHeight - header.offsetHeight - 8;
    header.classList.toggle('is-solid', window.scrollY > threshold);
  }
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });
  window.addEventListener('resize', updateHeader);

  // ---- Mobile-Menü ----
  var menu = document.getElementById('nav-mobile');
  var openBtn = document.getElementById('burger');
  var closeBtn = document.getElementById('nav-mobile-close');

  function setMenu(open) {
    if (!menu) return;
    menu.classList.toggle('is-open', open);
    menu.setAttribute('aria-hidden', open ? 'false' : 'true');
    if (open) menu.removeAttribute('inert'); else menu.setAttribute('inert', '');
    document.body.classList.toggle('menu-open', open);
    if (openBtn) openBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (open && closeBtn) closeBtn.focus();
    else if (!open && openBtn) openBtn.focus();
  }
  if (openBtn) openBtn.addEventListener('click', function () { setMenu(true); });
  if (closeBtn) closeBtn.addEventListener('click', function () { setMenu(false); });
  if (menu) {
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { setMenu(false); });
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu && menu.classList.contains('is-open')) setMenu(false);
  });

  // ---- Aktuelle Seite in der Navigation markieren ----
  var path = window.location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('.nav-desktop a, .nav-mobile a').forEach(function (a) {
    var href = a.getAttribute('href');
    if (!href || href.charAt(0) !== '/' || href.indexOf('#') !== -1) return;
    if (href === path || (href !== '/' && path.indexOf(href + '/') === 0)) {
      a.setAttribute('aria-current', 'page');
    }
  });

  // ---- Sprungnavigation: aktiven Abschnitt hervorheben ----
  var subLinks = document.querySelectorAll('.subnav a[href^="#"]');
  if (subLinks.length && 'IntersectionObserver' in window) {
    var byId = {};
    subLinks.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        subLinks.forEach(function (a) { a.classList.remove('is-active'); });
        var link = byId[entry.target.id];
        if (link) {
          link.classList.add('is-active');
          link.scrollIntoView({ block: 'nearest', inline: 'nearest' });
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    var firstSection = null;
    Object.keys(byId).forEach(function (id) {
      var sec = document.getElementById(id);
      if (sec) { spy.observe(sec); if (!firstSection) firstSection = sec; }
    });
    // Oberhalb des ersten Abschnitts ist nichts aktiv
    window.addEventListener('scroll', function () {
      if (firstSection && firstSection.getBoundingClientRect().top > window.innerHeight * 0.45) {
        subLinks.forEach(function (a) { a.classList.remove('is-active'); });
      }
    }, { passive: true });
  }

  // ---- Häufige Fragen im Kontaktblock auf-/zuklappen ----
  document.querySelectorAll('.contact__faq-title[aria-controls]').forEach(function (btn) {
    var list = document.getElementById(btn.getAttribute('aria-controls'));
    if (!list) return;
    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', open ? 'false' : 'true');
      list.hidden = open;
    });
  });

  // ---- Einblendungen beim Scrollen ----
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // ---- Kontaktformular (Web3Forms) ----
  var form = document.getElementById('contact-form');
  if (form) {
    var status = form.querySelector('.form__status');
    var params = new URLSearchParams(window.location.search);

    // Vorbelegung aus alten /formular-Links (?subject=…&domain=…)
    var subject = params.get('subject');
    var domain = params.get('domain');
    var subjectField = form.querySelector('select[name="subject"]');
    if (subject && subjectField) {
      var match = Array.prototype.find.call(subjectField.options, function (o) {
        return o.value.toLowerCase() === subject.toLowerCase();
      });
      if (match) subjectField.value = match.value;
    }
    var domainField = form.querySelector('[name="domain"]');
    var messageField = form.querySelector('[name="message"]');
    if (domain && domainField) {
      domainField.value = domain;
    } else if (domain && messageField && !messageField.value) {
      messageField.value = 'Unsere Website: ' + domain + '\n\n';
    }
    var successText = form.getAttribute('data-success') ||
      'Danke! Ihre Nachricht ist angekommen. Wir melden uns innert 24 Stunden.';

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }

      var btn = form.querySelector('[type="submit"]');
      var btnText = btn ? btn.innerHTML : '';
      if (btn) { btn.disabled = true; btn.textContent = 'Wird gesendet …'; }
      if (status) { status.textContent = ''; status.className = 'form__status'; }

      var data = {};
      new FormData(form).forEach(function (val, key) { data[key] = val; });

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data)
      })
        .then(function (res) {
          if (!res.ok) throw new Error('Serverfehler');
          form.reset();
          if (status) {
            status.textContent = successText;
            status.classList.add('is-ok');
          }
          if (window.umami) window.umami.track('formular_gesendet', { location: 'kontakt' });
        })
        .catch(function () {
          if (status) {
            status.textContent = 'Das hat leider nicht geklappt. Bitte versuchen Sie es erneut oder schreiben Sie an info@amplifyr.ch.';
            status.classList.add('is-error');
          }
        })
        .then(function () {
          if (btn) { btn.disabled = false; btn.innerHTML = btnText; }
        });
    });
  }

  // ---- Klick-Tracking über Umami (Attribute data-gtm-* aus der früheren GTM-Konvention) ----
  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-gtm-event]');
    if (!el || !window.umami) return;
    window.umami.track(el.getAttribute('data-gtm-event'), {
      location: el.getAttribute('data-gtm-location') || ''
    });
  });
})();
