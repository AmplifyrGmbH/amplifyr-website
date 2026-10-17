"""Verschiebt den FAQ-Abschnitt einer Seite in den Kontakt-CTA am Seitenende."""
import re
def combine(html):
    m = re.search(r'\n\s*<!-- =+ FAQ =+ -->\n\s*<section[^>]*class="section faq"[^>]*>.*?</section>\n|\n\s*<section[^>]*class="section faq"[^>]*>.*?</section>\n', html, re.S)
    if not m or 'contact--faq' in html:
        return html
    faq = m.group(0)
    items = re.findall(r'<details>\s*<summary>.*?</details>', faq, re.S)
    if not items:
        return html
    html = html.replace(faq, '\n', 1)
    c = re.search(r'(<section class="section contact contact--slim"[^>]*>\s*<div class="container cols">\s*<div class="c-wide contact__row">)(.*?)(</div>\s*</div>\s*</section>)', html, re.S)
    if not c:
        return html
    inner = c.group(2)
    btn = re.search(r'\s*<a class="btn.*?</a>', inner, re.S).group(0)
    textblock = inner.replace(btn, '').strip()
    textblock = textblock[:textblock.rfind('</div>')].strip()
    if textblock.startswith('<div>'): textblock = textblock[5:].strip()
    lst = '\n'.join('              ' + re.sub(r'\n\s*', '\n                ', it) for it in items)
    new = (c.group(1).replace('contact__row', 'contact__row contact__row--faq')
           + f'''
          <div class="contact__main">
            {textblock}
            <p class="contact__btn">{btn.strip()}</p>
          </div>
          <div id="faq" class="faq faq--dark contact__faq reveal" data-delay="1">
            <button type="button" class="contact__faq-title" aria-expanded="false" aria-controls="cta-faq-list">Häufige Fragen<span class="plus" aria-hidden="true"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1v12M1 7h12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg></span></button>
            <div class="faq__list" id="cta-faq-list" hidden>
{lst}
            </div>
          </div>
        ''' + c.group(3))
    html = html[:c.start()] + new + html[c.end():]
    return html.replace('class="section contact contact--slim"', 'class="section contact contact--slim contact--faq"', 1)
