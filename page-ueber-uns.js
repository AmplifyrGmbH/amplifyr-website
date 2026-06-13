/* ============================================================
   AMPLIFYR — page-ueber-uns.js
   Seitenspezifisches JS für ueber-uns.html
============================================================ */

'use strict';

// ── Akkordeon ─────────────────────────────────────────────────
(function initAccordion() {
  var items   = Array.from(document.querySelectorAll('.ua-acc-item'));
  var headerH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h-compact')) || 68;

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
    if (item.classList.contains('is-open')) {
      body.style.maxHeight = body.scrollHeight + 'px';
    } else {
      body.style.maxHeight = '0';
    }
  });

  // Klick-Handler
  items.forEach(function (item) {
    var btn = item.querySelector('.ua-acc-header');
    if (!btn) return;

    function toggleAccordion() {
      var isOpen = item.classList.contains('is-open');

      // Alle schliessen
      items.forEach(closeItem);

      // Geklicktes öffnen (wenn vorher geschlossen)
      if (!isOpen) {
        openItem(item);
        setTimeout(function () {
          item.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 420);
      }
    }

    btn.addEventListener('click', toggleAccordion);

    btn.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleAccordion();
      }
    });
  });
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
