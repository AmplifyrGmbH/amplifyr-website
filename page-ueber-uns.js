/* ============================================================
   AMPLIFYR — page-ueber-uns.js
   Seitenspezifisches JS für ueber-uns.html
============================================================ */

'use strict';

// ── Akkordeon + 3D-Ring ───────────────────────────────────────
(function initTeamSection() {
  var items    = Array.from(document.querySelectorAll('.ua-acc-item'));
  var ringWrap = document.getElementById('ua-ring-wrap');
  if (!items.length) return;

  // Akkordeon-Reihenfolge im DOM: 0=Markt, 1=Prozesse, 2=Systeme
  // Ring-Segmente (data-seg): 0=Systeme, 1=Prozesse, 2=Markt
  var RING_OF_ACC = [2, 1, 0];
  var ACC_OF_RING = [2, 1, 0];

  var openAcc   = null;
  var hoverRing = null;

  function openItem(item) {
    var body = item.querySelector('.ua-acc-body');
    var btn  = item.querySelector('.ua-acc-header');
    if (!body || !btn) return;
    item.classList.add('is-open');
    btn.setAttribute('aria-expanded', 'true');
    body.style.maxHeight = body.scrollHeight + 'px';
  }

  function closeItem(item) {
    var body = item.querySelector('.ua-acc-body');
    var btn  = item.querySelector('.ua-acc-header');
    if (!body || !btn) return;
    item.classList.remove('is-open');
    btn.setAttribute('aria-expanded', 'false');
    body.style.maxHeight = '0';
  }

  // Initial: offene Items aufklappen
  items.forEach(function (item) {
    var body = item.querySelector('.ua-acc-body');
    if (!body) return;
    body.style.maxHeight = item.classList.contains('is-open') ? body.scrollHeight + 'px' : '0';
  });

  function toggleAcc(i) {
    var item   = items[i];
    var isOpen = item.classList.contains('is-open');

    items.forEach(closeItem);
    openAcc = null;

    if (!isOpen) {
      openItem(item);
      openAcc = i;
      setTimeout(function () {
        item.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 420);
    }
    renderRing();
  }

  items.forEach(function (item, i) {
    var btn = item.querySelector('.ua-acc-header');
    if (!btn) return;

    btn.addEventListener('click', function () { toggleAcc(i); });
    btn.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleAcc(i);
      }
    });
    btn.addEventListener('mouseenter', function () { hoverRing = RING_OF_ACC[i]; renderRing(); });
    btn.addEventListener('mouseleave', function () { hoverRing = null; renderRing(); });
  });

  // ── Ring: Hover/Klick pro Segment, synchron mit dem Akkordeon ──
  if (!ringWrap) return;

  var ringEl        = ringWrap.querySelector('.ua-ring');
  var centerTitleEl = ringWrap.querySelector('.ua-ring-center-title');
  var centerTextEl  = ringWrap.querySelector('.ua-ring-center-text');

  var SEG_META = {
    0: { title: 'Systeme & Engineering',  text: 'Baut stabile technische Fundamente.' },
    1: { title: 'Prozesse & Data Science', text: 'Analysiert Abläufe und Daten.' },
    2: { title: 'Markt & Strategie',       text: 'Verbindet Strategie und Zielgruppe.' }
  };
  var DEFAULT_TITLE = 'Ganzheitliche Transformation';
  var DEFAULT_TEXT  = 'Bereich wählen';

  var segEls = {};
  [0, 1, 2].forEach(function (seg) {
    segEls[seg] = {
      tops:   Array.from(ringWrap.querySelectorAll('.ua-ring-top[data-seg="' + seg + '"]')),
      walls:  Array.from(ringWrap.querySelectorAll('.ua-ring-wall[data-seg="' + seg + '"]')),
      corner: ringWrap.querySelector('.ua-ring-corner[data-seg="' + seg + '"]')
    };
  });

  function activeRing() {
    if (hoverRing !== null) return hoverRing;
    if (openAcc !== null) return RING_OF_ACC[openAcc];
    return null;
  }

  function renderRing() {
    var active = activeRing();
    if (ringEl) ringEl.classList.toggle('has-active', active !== null);

    [0, 1, 2].forEach(function (seg) {
      var isActive = active === seg;
      segEls[seg].tops.forEach(function (el)  { el.classList.toggle('is-active', isActive); });
      segEls[seg].walls.forEach(function (el) { el.classList.toggle('is-active', isActive); });
      if (segEls[seg].corner) segEls[seg].corner.classList.toggle('is-active', isActive);
    });

    if (centerTitleEl) centerTitleEl.textContent = active === null ? DEFAULT_TITLE : SEG_META[active].title;
    if (centerTextEl)  centerTextEl.textContent  = active === null ? DEFAULT_TEXT  : SEG_META[active].text;
  }

  [0, 1, 2].forEach(function (seg) {
    var acc  = ACC_OF_RING[seg];
    var els  = segEls[seg].tops.slice();
    if (segEls[seg].corner) els.push(segEls[seg].corner);

    els.forEach(function (el) {
      el.addEventListener('mouseenter', function () { hoverRing = seg; renderRing(); });
      el.addEventListener('click', function () { toggleAcc(acc); });
    });

    if (segEls[seg].corner) {
      segEls[seg].corner.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleAcc(acc);
        }
      });
    }
  });

  ringWrap.addEventListener('mouseleave', function () { hoverRing = null; renderRing(); });

  renderRing();
}());


// ── Formular-Toggle ───────────────────────────────────────────
(function initFormToggle() {
  var btn      = document.getElementById('toggle-form-btn');
  var collapse = document.getElementById('form-collapse');
  if (!btn || !collapse) return;

  btn.addEventListener('click', function () {
    var isOpen = collapse.classList.contains('is-open');

    if (isOpen) {
      collapse.classList.remove('is-open');
      collapse.style.maxHeight = '0';
      collapse.setAttribute('aria-hidden', 'true');
      btn.setAttribute('aria-expanded', 'false');
    } else {
      collapse.classList.add('is-open');
      collapse.style.maxHeight = (collapse.scrollHeight + 200) + 'px';
      collapse.setAttribute('aria-hidden', 'false');
      btn.setAttribute('aria-expanded', 'true');
      requestAnimationFrame(function () {
        collapse.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });
    }
  });
}());


// ── Quick-Contact Checkbox ────────────────────────────────────
(function initQuickContact() {
  var checkbox     = document.getElementById('f-quick-contact');
  var messageGroup = document.getElementById('message-group');
  var messageField = document.getElementById('f-message');
  if (!checkbox || !messageGroup) return;

  checkbox.addEventListener('change', function () {
    var hide = checkbox.checked;
    messageGroup.style.display = hide ? 'none' : '';
    if (messageField) messageField.required = !hide;
  });
}());


// ── Formular-Submit (web3forms.com) ───────────────────────────
(function initContactForm() {
  var form    = document.getElementById('contact-form');
  var success = document.getElementById('form-success');
  if (!form || !success) return;

  function validate() {
    var valid = true;
    form.querySelectorAll('[required]').forEach(function (field) {
      var empty = !field.value.trim();
      field.classList.toggle('error', empty);
      if (empty) valid = false;
    });
    return valid;
  }

  form.querySelectorAll('.form-input, .form-textarea, .form-select').forEach(function (field) {
    field.addEventListener('input', function () { field.classList.remove('error'); });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!validate()) {
      var first = form.querySelector('.error');
      if (first) first.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    var submitBtn = form.querySelector('[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Wird gesendet …';
    }

    var data = {};
    new FormData(form).forEach(function (val, key) { data[key] = val; });

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(data)
    })
    .then(function (res) {
      if (!res.ok) throw new Error('Serverfehler');
      // Sekundäres CRM-Tracking
      fetch('/odoo-lead.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }).catch(function () {});

      form.hidden = true;
      success.hidden = false;
      success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    })
    .catch(function () {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Nachricht senden';
      }
      alert('Fehler beim Senden. Bitte versuchen Sie es erneut oder kontaktieren Sie uns per E-Mail.');
    });
  });
}());
