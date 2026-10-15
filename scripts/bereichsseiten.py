#!/usr/bin/env python3
"""Erzeugt die drei Bereichsseiten (Handwerk, Bewirtschaftung, Für KMU) mit identischer Struktur:
Kopf · Ausgangslage · Unser Ansatz (ganzheitlich, sechs Bereiche) · Im Alltag · Ablauf · FAQ · CTA.
Nur die Inhalte unterscheiden sich."""
import json, os, html, re

S = os.path.dirname(os.path.abspath(__file__))
E = lambda t: html.escape(t, quote=False)

ARROW = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>'
PLUS = '<span class="plus" aria-hidden="true"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1v12M1 7h12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg></span>'
ICONS = {
  'buero': '<path d="M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h5"/>',
  'software': '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4M8 9l-2 1.5L8 12M16 9l2 1.5L16 12"/>',
  'auto': '<path d="M4 12a8 8 0 0113.7-5.7L20 8.5M20 4v4.5h-4.5M20 12a8 8 0 01-13.7 5.7L4 15.5M4 20v-4.5h4.5"/>',
  'tel': '<path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.4 1.8.7 2.7a2 2 0 01-.5 2.1L8 9.8a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.4c.9.3 1.8.6 2.7.7a2 2 0 011.7 2z"/>',
  'it': '<path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
  'web': '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18"/>',
}
def icon(k, size=22):
    return f'<svg width="{size}" height="{size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">{ICONS[k]}</svg>'

BEREICHE = [('buero', 'Abläufe &amp; Büro'), ('software', 'Software &amp; Daten'), ('auto', 'Automatisierung'),
            ('tel', 'Erreichbarkeit'), ('it', 'IT &amp; Sicherheit'), ('web', 'Website &amp; Auftritt')]

ANSATZ = [
  ('Ganzheitlich analysieren', 'Wir schauen uns den ganzen Betrieb an, mit Business-Denken und nicht nur durch die Technik-Brille.'),
  ('Neuste Technik, wo sie nützt', 'Wir setzen moderne Werkzeuge dort ein, wo sie im Alltag spürbar etwas bringen.'),
  ('Individuell zugeschnitten', 'Keine Pakete von der Stange: Jede Lösung passt zu Ihren Abläufen und Ihrer Grösse.'),
  ('Umsetzen und betreuen', 'Wir bleiben nach dem Projekt Ihr Ansprechpartner, mit einer Nummer für alles Digitale.'),
]

ABLAUF = [
  ('Kostenlose Potenzialanalyse', 'Wir schauen gemeinsam, wo Ihr Betrieb steht und wo Zeit verloren geht.'),
  ('Offerte', 'Sie erhalten einen klaren Vorschlag, priorisiert nach Nutzen.'),
  ('Umsetzung', 'Schritt für Schritt, neben dem Tagesgeschäft. Sie bestimmen das Tempo.'),
  ('Betreuung', 'Wir betreiben, was wir bauen, und entwickeln es mit Ihnen weiter.'),
]

PAGES = {
 'handwerker': dict(
  order=['ausgangslage','alltag','quote','ansatz','mosaic','ablauf'],
  bg={'ausgangslage':'','alltag':' chapter--white','ablauf':''},
  mosaic=[('hw-baustelle',(600,1200),'Bauarbeiter vor einem Arbeitsfahrzeug'),('hw-schaltschrank',(600,1200),'Sicherungsautomat mit Verkabelung'),('handwerk',(800,1600),'Werkzeugschrank mit Hobeln')],
  mosaic_caption='Auf der Baustelle zu Hause. Wir kennen den Alltag von Elektroinstallateuren, Sanitären und Schreinern, weil einer von uns selbst Elektroinstallateur ist.',
  quote='Der Rapport ist fertig, bevor der Lieferwagen losfährt.',
  key='handwerk', img='handwerk', sizes=(800, 1600), w=1600, h=1066, alt='Werkzeugschrank mit Hobeln und Holzwerkzeug',
  eyebrow='Handwerk', h1='Ihr Handwerk, <em>digital organisiert.</em>',
  lead='Wir schauen uns Ihren Betrieb als Ganzes an und lösen alle digitalen Baustellen <strong>aus einer Hand</strong>: von der Offerte bis zur IT. Damit das Büro wieder eine kurze Runde am Nachmittag ist.',
  title='Digitalisierung für Handwerksbetriebe | amplifyr Zürich',
  og='Ihr Handwerk, digital organisiert | amplifyr',
  desc='amplifyr digitalisiert Handwerksbetriebe ganzheitlich: Büro, Software, IT und Website aus einer Hand. Jetzt kostenlose Potenzialanalyse anfragen.',
  service='Ganzheitliche Digitalisierung für Handwerksbetriebe: Abläufe, Software, Automatisierung, IT und Website aus einer Hand.',
  aus_h='Sitzt bei Ihnen abends noch jemand über Offerten?',
  aus_lead='Ob Elektroinstallateur, Sanitär oder Schreiner: Die Arbeit auf der Baustelle läuft. Was liegen bleibt, ist das Büro.',
  pains=[('Offerten am Abend', 'Materialpreise zusammensuchen und Offerten tippen, wenn eigentlich Feierabend wäre.'),
         ('Rapporte und Belege', 'Regierapporte abschreiben, Stundenzettel nachtragen, Belege für den Treuhänder suchen.'),
         ('Telefon auf der Baustelle', 'Anrufe kommen, wenn die Hände voll sind. Zurückgerufen wird am Abend.'),
         ('Programme, die nicht reden', 'Offerte, Planung und Rechnung liegen in verschiedenen Programmen und werden doppelt erfasst.')],
  stat=('64 %', 'der Admin-Aufgaben im Handwerk gelten als automatisierbar.', 'Quelle: IfM Bonn, IW Köln 2025'),
  hub=['Offerten, Rapporte und Rechnungen laufen ohne Abendschicht.',
       'Ihre Handwerkersoftware bleibt. Wir verbinden sie mit dem Rest.',
       'Anfrage, Termin und Offerte stossen sich gegenseitig an.',
       'Anrufe ausserhalb der Bürozeiten werden strukturiert erfasst.',
       'Geräte, Datensicherung und Support wie in einem grossen Betrieb.',
       'Gefunden werden und Anfragen direkt entgegennehmen.'],
  alltag_h='Ein Auftrag, von der Anfrage bis zur Rechnung.',
  alltag_lead='So läuft ein Auftrag, wenn alle Teile ineinandergreifen:',
  flow=[('Die Anfrage', 'Ob Anruf, WhatsApp oder E-Mail: Jede Anfrage landet mit Adresse, Bildern und Beschreibung am richtigen Ort.'),
        ('Termin &amp; Besichtigung', 'Der Kunde bucht selbst. Ein Sprachmemo vor Ort wird zur fertigen Notiz.'),
        ('Die Offerte', 'Die Offerte ist vorbereitet. Sie prüfen, passen an und versenden.'),
        ('Die Einsatzplanung', 'Sie sehen, wer wo im Einsatz ist. Änderungen gehen direkt aufs Handy.'),
        ('Beim Kunden', 'Der Rapport ist fertig, bevor der Mitarbeiter beim Lieferwagen ist.'),
        ('Die Rechnung', 'Der Rapport fliesst in die Rechnung, Zahlungen werden automatisch zugeordnet.')],
  faq=[('Muss ich meine bestehende Handwerkersoftware wechseln?', 'Nein. Ihre bestehende Software bleibt. Wir verbinden sie mit Büro, IT und Website, statt sie zu ersetzen.'),
       ('Was kostet die Digitalisierung für einen Handwerksbetrieb?', 'Das hängt davon ab, was Ihr Betrieb braucht. Die Potenzialanalyse ist kostenlos und zeigt, was sich lohnt. Danach erhalten Sie eine Offerte, bevor Sie etwas entscheiden.'),
       ('Wie lange dauert die Umsetzung?', 'Wir arbeiten neben Ihrem Tagesgeschäft und starten dort, wo es am meisten brennt. Erste Verbesserungen spüren Sie nach wenigen Wochen, der Rest folgt Schritt für Schritt.'),
       ('Lohnt sich das auch für einen kleinen Betrieb?', 'Ja. Gerade kleine Betriebe haben niemanden, der sich ums Digitale kümmert. Wir passen den Umfang an Ihre Grösse an.')],
 ),
 'bewirtschaftung': dict(
  order=['alltag','quote','ausgangslage','mosaic','ansatz','ablauf'],
  bg={'alltag':' chapter--white','ausgangslage':'','ablauf':''},
  mosaic=[('bw-wohnhaus',(600,1200),'Mehrfamilienhaus mit Balkonen'),('bw-schluessel',(600,1200),'Alte Schlüssel an einer Truhe'),('bw-innenhof',(600,1200),'Blick nach oben aus einem Innenhof')],
  mosaic_caption='Liegenschaften, Mieter, Eigentümer und Handwerker: Wir kennen die Bewirtschaftung von innen, weil einer von uns selbst Bewirtschafter war.',
  quote='Der Wasserschaden am Sonntag landet nicht mehr auf Ihrem Privathandy.',
  key='bewirtschaftung', img='bewirtschaftung', sizes=(1200, 2400), w=2400, h=1600, alt='Wohnhaus mit Balkonen und Dachterrassen',
  eyebrow='Immobilienbewirtschaftung', h1='Ihre Bewirtschaftung, <em>mit mehr Zeit für Mandate.</em>',
  lead='Ein grosser Teil der Woche geht in Koordination. Wir schauen uns Ihre Verwaltung als Ganzes an und holen diese Zeit zurück, <strong>ohne Ihr Kernsystem zu ersetzen</strong>.',
  title='Digitalisierung für Immobilienverwaltungen | amplifyr',
  og='Ihre Bewirtschaftung, mit mehr Zeit für Mandate | amplifyr',
  desc='amplifyr digitalisiert Immobilienbewirtschaftungen ganzheitlich: Abläufe, Software, IT und Erreichbarkeit aus einer Hand. Kostenlose Potenzialanalyse.',
  service='Ganzheitliche Digitalisierung für Immobilienbewirtschaftungen: Abläufe, Software, Automatisierung, IT und Erreichbarkeit aus einer Hand.',
  aus_h='Wie viel Ihrer Woche geht in Rückrufe und Koordination?',
  aus_lead='Bewirtschaften heisst heute vor allem koordinieren. Das bindet Zeit, die bei den Mandaten fehlt.',
  pains=[('Rückrufe und Nachfragen', 'Anliegen annehmen, notieren, zurückrufen und nachfragen, wo etwas steht.'),
         ('Handwerker koordinieren', 'Offerte anfragen, Termin abstimmen, nachfassen und die Rechnung prüfen.'),
         ('Versammlungen', 'Einladungen, Traktanden, Vollmachten und Protokolle vorbereiten und nachführen.'),
         ('Unterlagen suchen', 'Protokolle, Beschlüsse, Abrechnungen und Belege zusammensuchen und nachliefern.')],
  stat=('rund 40 %', 'kürzere Bearbeitungszeiten durch Digitalisierung in der Immobilienbranche.', 'Quelle: Digital-Real-Estate-Umfrage 2024'),
  hub=['Anliegen, Rückrufe und Handwerker-Koordination laufen strukturiert.',
       'Ihr Kernsystem bleibt. Wir binden alles andere daran an.',
       'Versammlungen, Protokolle und Rechnungsprüfung laufen von selbst an.',
       'Anliegen kommen rund um die Uhr als Vorgang mit Status rein.',
       'Ein stabiles Fundament mit Telefonie, Datensicherung und Support.',
       'Website und Portal, die Anliegen von Mietern und Eigentümern aufnehmen.'],
  alltag_h='Zwei Fälle, die jede Verwaltung kennt.',
  alltag_lead='Der Versammlungsabend im März und der Wasserschaden am Sonntag. So laufen sie, wenn die Systeme ineinandergreifen. Die Technik sortiert vor, der Mensch entscheidet.',
  cases=[('Der Versammlungsabend', [
            ('Einladung', 'Einladung, Traktanden und Unterlagen gehen digital oder auf Papier raus, in Form und Frist Ihres Reglements.'),
            ('Vorab &amp; Vollmachten', 'Eigentümer stimmen vorab ab oder erteilen Vollmacht. Die Versammlung ist beschlussfähig.'),
            ('Abstimmung', 'Anwesende und Zugeschaltete stimmen gemeinsam ab, Mehrheiten werden nach Reglement gerechnet.'),
            ('Protokoll', 'Der Protokollentwurf liegt am Morgen danach vor, Beschlüsse sind im Dossier abgelegt.')]),
         ('Der Wasserschaden am Sonntag', [
            ('Die Meldung', 'Anruf um 22 Uhr, Website oder Chat: Alles landet als Vorgang in einem Eingang, nicht auf dem Privathandy.'),
            ('Beurteilung', 'Kategorie und Dringlichkeit sind vorgeschlagen, die Schadenmeldung an die Versicherung ist vorbereitet.'),
            ('Auftrag', 'Der passende Handwerker wird vorgeschlagen und auf Ihre Freigabe beauftragt.'),
            ('Rechnung &amp; Dossier', 'Die Rechnung wird erkannt und vorkontiert, der Beleg liegt am Objekt.')])],
  faq=[('Müssen wir unser bestehendes Verwaltungssystem wechseln?', 'Nein. Ihr Kernsystem bleibt. Wir wählen die passenden Werkzeuge aus, führen sie ein und binden sie daran an.'),
       ('Was kostet die Digitalisierung einer Bewirtschaftung?', 'Das hängt vom Umfang ab. Die Potenzialanalyse ist kostenlos und zeigt, wo bei Ihnen am meisten Zeit frei wird. Danach erhalten Sie eine Offerte.'),
       ('Wie läuft eine Eigentümerversammlung digital ab?', 'Einladungen, Vollmachten und Abstimmungen laufen digital, auf Wunsch hybrid. Der Protokollentwurf entsteht aus der Versammlung, Beschlüsse bleiben auffindbar.'),
       ('Wie lange dauert die Umstellung?', 'Wir starten mit dem dringendsten Hebel, etwa der nächsten Versammlung oder der Erreichbarkeit, und bauen von dort weiter aus, in Ihrer Reihenfolge.')],
 ),
 'kmu': dict(
  order=['ansatz','alltag','mosaic','quote','ausgangslage','ablauf'],
  bg={'alltag':'','ausgangslage':'','ablauf':' chapter--white'},
  mosaic=[('kmu-lobby',(600,1200),'Empfangsbereich eines Büros'),('it',(800,1600),'Sauber verlegte Kabel in einem Verteilerkasten'),('web',(800,1600),'Arbeitsplatz mit zwei Monitoren')],
  mosaic_caption='Vom Empfang über die Arbeitsplätze bis zum Serverschrank: Wir schauen uns das ganze Unternehmen an, nicht nur die Computer.',
  quote='Eine Nummer für alles Digitale.',
  key='kmu', img='kmu', sizes=(1200, 2400), w=2400, h=1600, alt='Laptop auf einem Bürotisch',
  eyebrow='Für KMU', h1='Alles Digitale, <em>aus einer Hand.</em>',
  lead='Wir kommen nicht nur für WLAN und Computer. Wir schauen uns Ihre <strong>Abläufe</strong> an, finden heraus, wo Zeit verloren geht, und lösen alle digitalen Baustellen mit <strong>einem Ansprechpartner</strong>.',
  title='Digitalisierung für KMU aus einer Hand | amplifyr Zürich',
  og='Alles Digitale, aus einer Hand | amplifyr',
  desc='amplifyr betrachtet Ihr KMU als Ganzes: Abläufe, Software, IT und Website aus einer Hand, mit einer Nummer für alles. Kostenlose Potenzialanalyse.',
  service='Ganzheitliche Digitalisierung für KMU: Abläufe, Software, Automatisierung, IT und Website aus einer Hand.',
  aus_h='Wer kümmert sich bei Ihnen ums Digitale?',
  aus_lead='In vielen KMU macht das, wer sich gerade am besten auskennt. Neben der eigentlichen Arbeit.',
  pains=[('Viele Anbieter', 'Einer für die IT, einer für die Website, einer für die Software. Wenn etwas hakt, zeigt jeder auf den anderen.'),
         ('IT nebenbei', 'Updates, Passwörter, Druckerprobleme: Jemand im Team kümmert sich, obwohl er eigentlich etwas anderes zu tun hätte.'),
         ('Doppelte Arbeit', 'Kundendaten, Offerten und Rechnungen werden in mehreren Programmen von Hand nachgeführt.'),
         ('Eine Website ohne Wirkung', 'Die Website ist da, aber sie bringt kaum Anfragen und niemand pflegt sie.')],
  stat=None,
  hub=['Wiederkehrende Arbeit im Büro erledigt sich von selbst.',
       'Ihre Programme sprechen miteinander, nichts wird doppelt erfasst.',
       'Anfragen werden bestätigt, verteilt und nachgefasst.',
       'Keine Anfrage geht verloren, auch nicht nach Feierabend.',
       'Arbeitsplätze, Microsoft 365, Datensicherung und Support aus Zürich.',
       'Gefunden werden bei Google und in KI-Suchen, Anfragen direkt erhalten.'],
  alltag_h='Was sich im Alltag ändert.',
  alltag_lead='Vier Situationen, die jedes KMU kennt, vorher und nachher:',
  compare=[('Eine neue Mitarbeiterin startet', 'Konto, Laptop und Zugänge werden in der ersten Woche zusammengesucht.', 'Gerät und Zugänge sind am ersten Tag bereit.'),
           ('Eine Anfrage kommt über die Website', 'Sie landet im Postfach und wird von Hand abgetippt.', 'Sie wird bestätigt, als Kontakt angelegt und nachgefasst.'),
           ('Der Laptop streikt', 'Jemand im Team sucht die Lösung, die Arbeit steht still.', 'Ein Anruf, Fernwartung, die Daten sind gesichert.'),
           ('Offerte und Rechnung', 'Word-Vorlage, Excel-Liste und Buchhaltung getrennt.', 'Aus einem System, mit der Buchhaltung verbunden.')],
  faq=[('Machen Sie nur IT?', 'Nein. Wir betrachten Ihren Betrieb als Ganzes: Abläufe, Software, IT und Website. IT ist ein Teil davon, aber nicht der Ausgangspunkt.'),
       ('Wir haben schon einen IT-Partner. Passt das trotzdem?', 'Ja. Wir schauen uns an, was gut läuft, und ergänzen dort, wo Lücken sind. Ob wir übernehmen oder zusammenarbeiten, entscheiden Sie.'),
       ('Was kostet das?', 'Das hängt davon ab, was Ihr Betrieb braucht. Die Potenzialanalyse ist kostenlos. Danach erhalten Sie eine Offerte, bevor Sie etwas entscheiden.'),
       ('Müssen wir unsere Software wechseln?', 'In der Regel nicht. Wir verbinden, was Sie haben, und ergänzen nur dort, wo es sich lohnt.')],
 ),
}

def picture(c, hero=True):
    a, b = c['sizes']; img = c['img']
    lazy = 'fetchpriority="high"' if hero else 'loading="lazy" decoding="async"'
    return f'''      <picture class="hero__media">
        <source type="image/avif" srcset="/Bilder/stock/{img}-{a}.avif {a}w, /Bilder/stock/{img}-{b}.avif {b}w" sizes="100vw">
        <source type="image/webp" srcset="/Bilder/stock/{img}-{a}.webp {a}w, /Bilder/stock/{img}-{b}.webp {b}w" sizes="100vw">
        <img src="/Bilder/stock/{img}-{b}.jpg" srcset="/Bilder/stock/{img}-{a}.jpg {a}w, /Bilder/stock/{img}-{b}.jpg {b}w" sizes="100vw"
             alt="{c['alt']}" width="{c['w']}" height="{c['h']}" {lazy}>
      </picture>'''

def build(name, c):
    k = c['key']
    o = []
    sec = {}
    head=(f'''    <!-- ===================== Kopf ===================== -->
    <section class="page-hero" data-area="{k}" aria-labelledby="page-title">
{picture(c)}
      <div class="page-hero__content">
        <div class="container cols">
          <div>
            <p class="eyebrow reveal">{c['eyebrow']}</p>
            <h1 id="page-title" class="reveal" data-delay="1">{c['h1']}</h1>
            <p class="lead reveal" data-delay="2">{c['lead']}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ===================== Sprungnavigation ===================== -->
    <nav class="subnav" aria-label="Abschnitte dieser Seite">
      <div class="container">
        <ul>
@@SUBNAV@@
        </ul>
      </div>
    </nav>
''')
    # Ausgangslage
    pains = ''.join(f'''            <li class="pain reveal"{f' data-delay="{i % 2}"' if i % 2 else ''}><b>{t}</b><span>{d}</span></li>
''' for i, (t, d) in enumerate(c['pains']))
    stat = ''
    if c['stat']:
        v, t, src = c['stat']
        stat = f'''          <p class="aus-stat reveal"><b>{v}</b><span>{t}<small>{src}</small></span></p>
'''
    sec['ausgangslage']=(f'''
    <!-- ===================== Ausgangslage ===================== -->
    <section id="ausgangslage" class="chapter" data-area="{k}" aria-labelledby="aus-title">
      <div class="container cols">
        <div class="c-label reveal"><p class="eyebrow">Ausgangslage</p></div>
        <div class="c-body">
          <h2 id="aus-title" class="h-section reveal">{c['aus_h']}</h2>
          <p class="lead reveal" data-delay="1">{c['aus_lead']}</p>
        </div>
        <div class="c-wide">
          <ul class="pains">
{pains}          </ul>
{stat}        </div>
      </div>
    </section>
''')
    # Bildmosaik + Zitat
    figs=''
    for j,(img,(a2,b2),alt) in enumerate(c['mosaic']):
        figs+=f'''          <figure class="mosaic__item mosaic__item--{j+1} reveal"{f' data-delay="{j}"' if j else ''}>
            <picture>
              <source type="image/avif" srcset="/Bilder/stock/{img}-{a2}.avif {a2}w, /Bilder/stock/{img}-{b2}.avif {b2}w" sizes="(min-width: 1024px) 50vw, 100vw">
              <source type="image/webp" srcset="/Bilder/stock/{img}-{a2}.webp {a2}w, /Bilder/stock/{img}-{b2}.webp {b2}w" sizes="(min-width: 1024px) 50vw, 100vw">
              <img src="/Bilder/stock/{img}-{a2}.jpg" srcset="/Bilder/stock/{img}-{a2}.jpg {a2}w, /Bilder/stock/{img}-{b2}.jpg {b2}w" sizes="(min-width: 1024px) 50vw, 100vw" alt="{alt}" loading="lazy" decoding="async" width="{a2}" height="{a2*3//4}">
            </picture>
          </figure>
'''
    sec['mosaic']=(f'''
    <!-- ===================== Bilder ===================== -->
    <section class="mosaic-sec" aria-label="Eindrücke">
      <div class="container">
        <div class="mosaic">
{figs}          <p class="mosaic__caption reveal">{c['mosaic_caption']}</p>
        </div>
      </div>
    </section>
''')
    sec['quote']=(f'''
    <!-- ===================== Zitat ===================== -->
    <section class="quote-band" aria-label="Kernaussage">
      <div class="container">
        <p class="quote-band__text reveal">«{c['quote']}»</p>
      </div>
    </section>
''')
    # Ansatz + Hub
    steps = ''.join(f'''            <li class="reveal"{f' data-delay="{i}"' if i else ''}><span class="num" aria-hidden="true">{i + 1}</span><h3>{t}</h3><p>{d}</p></li>
''' for i, (t, d) in enumerate(ANSATZ))
    tiles = ''.join(f'''            <li class="hub__tile hub__tile--{i + 1} reveal"><span class="hub__icon">{icon(ic)}</span><b>{lab}</b><span>{c['hub'][i]}</span></li>
''' for i, (ic, lab) in enumerate(BEREICHE))
    sec['ansatz']=(f'''
    <!-- ===================== Unser Ansatz ===================== -->
    <section id="ansatz" class="chapter chapter--dark" data-area="{k}" aria-labelledby="ansatz-title">
      <div class="container cols">
        <div class="c-label reveal"><p class="eyebrow">Unser Ansatz</p></div>
        <div class="c-body">
          <h2 id="ansatz-title" class="h-section reveal">Wir schauen uns den ganzen Betrieb an.</h2>
          <p class="lead muted reveal" data-delay="1">Technik und Business-Denken in einem Team: Wir lösen nicht ein einzelnes Problem, sondern bringen alle digitalen Teile zusammen. Mit einem Ansprechpartner und einer Nummer für alles Digitale.</p>
        </div>
        <div class="c-wide">
          <ul class="hub" aria-label="Was wir uns anschauen">
            <li class="hub__core reveal" aria-hidden="true"><span>Ihr Betrieb</span><small>ein Ansprechpartner</small></li>
{tiles}          </ul>
          <ol class="principles principles--4">
{steps}          </ol>
        </div>
      </div>
    </section>
''')
    # Im Alltag
    if 'flow' in c:
        items = ''.join(f'''            <li class="reveal"{f' data-delay="{i % 3}"' if i % 3 else ''}><span class="flow__n" aria-hidden="true">{i + 1}</span><h3>{t}</h3><p>{d}</p></li>
''' for i, (t, d) in enumerate(c['flow']))
        alltag = f'''          <ol class="flow">
{items}          </ol>'''
    elif 'cases' in c:
        cols = ''
        for j, (title, st) in enumerate(c['cases']):
            lis = ''.join(f'<li><b>{t}</b><span>{d}</span></li>' for t, d in st)
            cols += f'''            <article class="case reveal"{f' data-delay="{j}"' if j else ''}>
              <h3>{title}</h3>
              <ol class="case__steps">{lis}</ol>
            </article>
'''
        alltag = f'''          <div class="cases">
{cols}          </div>'''
    else:
        rows = ''.join(f'''            <li class="cmp reveal"{f' data-delay="{i % 2}"' if i % 2 else ''}>
              <h3>{t}</h3>
              <p class="cmp__before"><small>Heute</small>{b}</p>
              <p class="cmp__after"><small>Mit amplifyr</small>{a}</p>
            </li>
''' for i, (t, b, a) in enumerate(c['compare']))
        alltag = f'''          <ul class="compare">
{rows}          </ul>'''
    sec['alltag']=(f'''
    <!-- ===================== Im Alltag ===================== -->
    <section id="alltag" class="chapter chapter--white" data-area="{k}" aria-labelledby="alltag-title">
      <div class="container cols">
        <div class="c-label reveal"><p class="eyebrow">Im Alltag</p></div>
        <div class="c-body">
          <h2 id="alltag-title" class="h-section reveal">{c['alltag_h']}</h2>
          <p class="lead reveal" data-delay="1">{c['alltag_lead']}</p>
        </div>
        <div class="c-wide">
{alltag}
        </div>
      </div>
    </section>
''')
    # Ablauf
    ab = ''.join(f'''            <li class="reveal"{f' data-delay="{i}"' if i else ''}><b>{t}</b><span>{d}</span></li>
''' for i, (t, d) in enumerate(ABLAUF))
    sec['ablauf']=(f'''
    <!-- ===================== Ablauf ===================== -->
    <section id="ablauf" class="chapter" data-area="{k}" aria-labelledby="ablauf-title">
      <div class="container cols">
        <div class="c-label reveal"><p class="eyebrow">Ablauf</p></div>
        <div class="c-body">
          <h2 id="ablauf-title" class="h-section reveal">Immer gleich, immer auf Sie zugeschnitten.</h2>
          <p class="lead reveal" data-delay="1">Der erste Schritt ist kostenlos und unverbindlich.</p>
        </div>
        <div class="c-wide">
          <ol class="steps4">
{ab}          </ol>
          <p class="steps4__cta reveal">
            <a class="btn btn--solid" href="/kontakt" data-gtm-event="cta_kontakt_klick" data-gtm-location="ablauf_{k}">Kostenlose Potenzialanalyse {ARROW}</a>
            <a class="link-arrow" href="/vorgehen">So gehen wir vor {ARROW}</a>
          </p>
        </div>
      </div>
    </section>
''')
    # FAQ
    det = ''.join(f'''              <details>
                <summary>{q}{PLUS}</summary>
                <p>{a}</p>
              </details>
''' for q, a in c['faq'])
    sec['faq']=(f'''
    <!-- ===================== FAQ ===================== -->
    <section id="faq" class="section faq" aria-labelledby="faq-title">
      <div class="container cols">
        <div class="c-label">
          <p class="eyebrow reveal">FAQ</p>
          <h2 id="faq-title" class="h-section reveal" data-delay="1" style="margin-top:12px">Häufige Fragen</h2>
        </div>
        <div class="c-body faq__wrap reveal" data-delay="1">
          <details class="faq__all">
            <summary class="faq__toggle"><span class="faq__toggle-open">{len(c['faq'])} Fragen anzeigen</span><span class="faq__toggle-close">Fragen ausblenden</span>{PLUS}</summary>
            <div class="faq__list">
{det}            </div>
          </details>
        </div>
      </div>
    </section>

{{{{CONTACT}}}}
''')
    labels={'ausgangslage':'Ausgangslage','ansatz':'Unser Ansatz','alltag':'Im Alltag','ablauf':'Ablauf'}
    order=c['order']
    sub=''.join(f'          <li><a href="#{x}">{labels[x]}</a></li>\n' for x in order if x in labels)+'          <li><a href="#faq">Fragen</a></li>'
    parts=[head.replace('@@SUBNAV@@',sub.rstrip())]
    for x in order:
        h=sec[x]
        bg=c.get('bg',{}).get(x)
        if bg is not None:
            h=re.sub(r'class="chapter(?: chapter--white| chapter--dark)?"', f'class="chapter{bg}"', h, count=1)
        parts.append(h)
    parts.append(sec['faq'])
    body = ''.join(parts)
    open(f'{S}/pages/body/{name}.html', 'w', encoding='utf-8').write(body)

    page = name if name != 'kmu' else 'kmu'
    unesc = lambda t: html.unescape(t)
    cfg = {
      'out': f'{name}.html', 'title': c['title'], 'og_title': c['og'], 'description': c['desc'], 'path': f'/{name}',
      'preload': f"/Bilder/stock/{c['img']}" if c['sizes'][0] == 1200 else None,
      'schemas': [
        {'@context': 'https://schema.org', '@type': 'Service', '@id': f'https://www.amplifyr.ch/{name}#service',
         'name': unesc(c['eyebrow']), 'description': c['service'], 'provider': {'@id': 'https://www.amplifyr.ch/#organization'},
         'areaServed': {'@type': 'Country', 'name': 'Switzerland'}},
        {'@context': 'https://schema.org', '@type': 'BreadcrumbList', 'itemListElement': [
          {'@type': 'ListItem', 'position': 1, 'name': 'Startseite', 'item': 'https://www.amplifyr.ch/'},
          {'@type': 'ListItem', 'position': 2, 'name': unesc(c['eyebrow']), 'item': f'https://www.amplifyr.ch/{name}'}]},
        {'@context': 'https://schema.org', '@type': 'FAQPage', 'mainEntity': [
          {'@type': 'Question', 'name': unesc(q), 'acceptedAnswer': {'@type': 'Answer', 'text': unesc(a)}} for q, a in c['faq']]},
      ],
      'body': f'body/{name}.html',
    }
    if not cfg['preload']: cfg.pop('preload')
    if name == 'bewirtschaftung': cfg['robots'] = 'noindex, follow'
    json.dump(cfg, open(f'{S}/pages/{name}.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=2)
    print(name, len(c['title']), len(c['desc']))

if __name__ == '__main__':
    for n, c in PAGES.items():
        build(n, c)
