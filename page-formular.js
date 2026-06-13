/* ============================================================
   AMPLIFYR — page-formular.js
   Seitenspezifisches JS für formular.html
============================================================ */

'use strict';

// ── Form Toggle ────────────────────────────────────────────────
(function initFormToggle() {
  var btn      = document.getElementById('toggle-form-fs');
  var collapse = document.getElementById('form-collapse-fs');
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


// ── Callback Checkbox ──────────────────────────────────────────
(function initCallback() {
  var checkbox = document.getElementById('fs-callback');
  var msgWrap  = document.getElementById('fs-message-wrap');
  var msgField = document.getElementById('fs-message');
  var label    = checkbox ? checkbox.closest('.fs-callback-label') : null;
  if (!checkbox || !msgWrap) return;

  checkbox.addEventListener('change', function () {
    var hide = checkbox.checked;
    msgWrap.style.display = hide ? 'none' : '';
    if (msgField) msgField.required = !hide;

    // Fallback für Browser ohne CSS :has()
    if (label) label.classList.toggle('is-checked', hide);
  });
}());


// ── Form Submit ────────────────────────────────────────────────
(function initFormSubmit() {
  var form    = document.getElementById('contact-form-fs');
  var success = document.getElementById('form-success-fs');
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
