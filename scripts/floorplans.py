#!/usr/bin/env python3
"""Erzeugt die drei Grundrisse (Werkstatt, Mehrfamilienhaus, Büro) als SVG.

interactive=True  -> Räume sind Links (#anker) mit data-room, für den Rundgang
interactive=False -> rein dekorativ (aria-hidden), für die Teaser der Startseite
"""
import html

def esc(s): return html.escape(s, quote=True)

# Raum: (id, code, name, x, y, w, h, anker, text)
PLANS = {
  'handwerk': {
    'title': 'Grundriss eines Handwerksbetriebs',
    'rooms': [
      ('buero', 'A1', 'Büro', 40, 40, 260, 210, '#bueroarbeit',
       'Offerten, Rapporte, Belege und Rückrufe: digital vorbereitet statt am Abend getippt.'),
      ('lager', 'A3', 'Lager', 40, 250, 260, 270, '#individuelle-software',
       'Material, Planung und Abrechnung arbeiten mit denselben Daten. Ihre Software bleibt.'),
      ('werkstatt', 'A2', 'Werkstatt', 300, 40, 460, 340, '#automatisierung-ki',
       'Von der Anfrage bis zur Rechnung läuft die Routine automatisch, mit KI.'),
      ('fahrzeug', 'A2', 'Fahrzeug', 300, 380, 460, 140, '#automatisierung-ki',
       'Einsatzplan aufs Handy, Rapport fertig, bevor der Mitarbeiter beim Lieferwagen ist.'),
    ],
    'doors': ['M300 150 A44 44 0 0 1 256 194', 'M170 250 A44 44 0 0 0 214 206', 'M300 300 A44 44 0 0 0 344 344'],
    'windows': ['M90 40 H210', 'M420 40 H640', 'M40 330 V450'],
    'detail': [
      # Büro: Pult, Stuhl, Ablage
      '<rect x="70" y="80" width="130" height="56" rx="2"/>', '<circle cx="135" cy="160" r="14"/>', '<path d="M230 70 V200"/>',
      # Lager: Regale
      '<path d="M70 290 H270 M70 310 H270 M70 360 H270 M70 380 H270 M70 430 H270 M70 450 H270"/>',
      # Werkstatt: Werkbank, Maschinen
      '<rect x="340" y="80" width="280" height="48" rx="2"/>', '<rect x="660" y="80" width="64" height="64" rx="2"/>',
      '<rect x="380" y="210" width="110" height="80" rx="2"/>', '<circle cx="610" cy="250" r="34"/>',
      # Fahrzeug: Lieferwagen + Rolltor
      '<rect x="420" y="410" width="250" height="80" rx="12"/>', '<path d="M610 410 V490 M440 404 H470 M620 404 H650 M440 496 H470 M620 496 H650"/>',
      '<path d="M760 405 V495" stroke-dasharray="6 6"/>',
    ],
  },
  'bewirtschaftung': {
    'title': 'Grundriss eines Mehrfamilienhauses mit Verwaltung',
    'rooms': [
      ('wohnung', 'B2', 'Wohnung 3½ Zi.', 40, 40, 300, 320, '#automatisierung-ki',
       'Wasserschaden am Sonntag: Meldung, Beurteilung, Handwerker und Dossier laufen automatisch an.'),
      ('treppenhaus', 'B1', 'Treppenhaus', 340, 40, 130, 320, '#bueroarbeit',
       'Anliegen von Mietern und Eigentümern landen als Vorgang mit Status, nicht auf dem Privathandy.'),
      ('gemeinschaft', 'B2', 'Gemeinschaftsraum', 470, 40, 290, 320, '#automatisierung-ki',
       'Die Eigentümerversammlung: Einladung, Vollmachten, hybride Abstimmung und Protokoll digital.'),
      ('verwaltung', 'B1', 'Verwaltung', 40, 360, 400, 160, '#bueroarbeit',
       'Rückrufe, Handwerker-Koordination, Protokolle und Dokumente: weniger Koordination, mehr Zeit für Mandate.'),
      ('technik', 'B3', 'Technik', 440, 360, 320, 160, '#individuelle-software',
       'Ihr Kernsystem wie ImmoTop2 bleibt. Wir verbinden Plattform, KI, IT und Telefonie damit.'),
    ],
    'doors': ['M340 300 A40 40 0 0 0 300 340', 'M470 300 A40 40 0 0 1 510 340', 'M200 360 A40 40 0 0 1 240 320', 'M600 360 A40 40 0 0 0 640 320'],
    'windows': ['M80 40 H200', 'M560 40 H700', 'M40 140 V260', 'M760 140 V260'],
    'detail': [
      # Wohnung: Innenwände, Bett, Küche
      '<path d="M40 200 H180 M180 120 V200 M220 200 H340"/>', '<rect x="70" y="70" width="80" height="100" rx="2"/>',
      '<path d="M220 240 H320 V270"/>', '<rect x="250" y="70" width="60" height="60" rx="30"/>',
      # Treppe
      '<path d="M370 80 H440 M370 110 H440 M370 140 H440 M370 170 H440 M370 200 H440 M370 230 H440 M405 70 V250"/>',
      # Gemeinschaftsraum: Tisch mit Stühlen
      '<rect x="540" y="140" width="150" height="80" rx="4"/>',
      '<circle cx="565" cy="125" r="9"/><circle cx="615" cy="125" r="9"/><circle cx="665" cy="125" r="9"/>',
      '<circle cx="565" cy="235" r="9"/><circle cx="615" cy="235" r="9"/><circle cx="665" cy="235" r="9"/>',
      # Verwaltung: zwei Pulte
      '<rect x="80" y="420" width="110" height="50" rx="2"/>', '<rect x="250" y="420" width="110" height="50" rx="2"/>',
      # Technik: Heizung, Verteiler
      '<circle cx="520" cy="445" r="32"/>', '<rect x="620" y="400" width="40" height="90" rx="2"/>', '<rect x="680" y="400" width="40" height="90" rx="2"/>',
    ],
  },
  'kmu': {
    'title': 'Grundriss eines KMU-Büros',
    'rooms': [
      ('arbeitsplaetze', 'C1', 'Arbeitsplätze', 40, 40, 440, 300, '#bueroarbeit',
       'Microsoft 365, zentral verwaltete Geräte und Abläufe, die sich selbst erledigen.'),
      ('sitzung', 'C1', 'Sitzungszimmer', 480, 40, 280, 300, '#bueroarbeit',
       'Termine landen im Outlook-Kalender, Anfragen werden in bexio zum Kontakt.'),
      ('empfang', 'C3', 'Empfang', 40, 340, 290, 180, '#website-sichtbarkeit',
       'Ihre Website ist der Empfang im Netz: gefunden werden, Anfragen und Termine entgegennehmen.'),
      ('server', 'C2', 'Serverraum', 330, 340, 190, 180, '#it-sicherheit',
       'Security, Backup und Support als Bausteine zur festen Monatspauschale.'),
      ('archiv', 'C2', 'Technik & Archiv', 520, 340, 240, 180, '#it-sicherheit',
       'Getestete Datensicherung und ein fester Ansprechpartner, wenn es hakt.'),
    ],
    'doors': ['M480 280 A44 44 0 0 1 436 324', 'M200 340 A44 44 0 0 1 244 296', 'M330 470 A40 40 0 0 0 370 510', 'M600 340 A40 40 0 0 0 640 300'],
    'windows': ['M100 40 H400', 'M540 40 H700', 'M760 120 V260', 'M40 400 V480'],
    'detail': [
      # Arbeitsplätze: 2 x 3 Pulte
      '<rect x="80" y="90" width="90" height="50" rx="2"/><rect x="200" y="90" width="90" height="50" rx="2"/><rect x="320" y="90" width="90" height="50" rx="2"/>',
      '<rect x="80" y="220" width="90" height="50" rx="2"/><rect x="200" y="220" width="90" height="50" rx="2"/><rect x="320" y="220" width="90" height="50" rx="2"/>',
      # Sitzungszimmer: ovaler Tisch
      '<rect x="540" y="130" width="160" height="110" rx="55"/>',
      # Empfang: Theke
      '<path d="M80 400 H220 V450"/>',
      # Serverraum: Racks
      '<rect x="360" y="380" width="36" height="100" rx="2"/><rect x="410" y="380" width="36" height="100" rx="2"/><rect x="460" y="380" width="36" height="100" rx="2"/>',
      # Archiv: Schränke
      '<path d="M560 380 H730 M560 410 H730 M560 440 H730"/>',
    ],
  },
}


def svg(key, interactive=True, page=''):
    p = PLANS[key]
    out = []
    o = out.append
    if interactive:
        o(f'<svg class="floorplan" viewBox="0 0 800 560" role="img" aria-labelledby="fp-{key}-title">')
        o(f'  <title id="fp-{key}-title">{esc(p["title"])}</title>')
    else:
        o('<svg class="floorplan floorplan--deco" viewBox="0 0 800 560" aria-hidden="true" focusable="false">')
    # Räume (Flächen zuerst, damit Linien darüber liegen)
    for rid, code, name, x, y, w, h, anchor, text in p['rooms']:
        if interactive:
            o(f'  <a class="fp-room" href="{page}{anchor}" data-room="{rid}" aria-label="{esc(code + ": " + name + ". " + text)}">')
        else:
            o(f'  <g class="fp-room" data-room="{rid}">')
        o(f'    <rect class="fp-area" x="{x}" y="{y}" width="{w}" height="{h}"/>')
        o(f'    <g class="fp-tag" transform="translate({x + 22},{y + 24})"><rect class="fp-code" x="0" y="0" width="34" height="22" rx="11"/><text class="fp-code-t" x="17" y="15" text-anchor="middle">{esc(code)}</text>' + (f'<text class="fp-name" x="44" y="15">{esc(name.upper())}</text>' if w >= 200 else '') + '</g>')
        o('  </a>' if interactive else '  </g>')
    # Möblierung
    o('  <g class="fp-detail" fill="none">')
    for d in p['detail']:
        o('    ' + d)
    o('  </g>')
    # Fenster (doppelte Linie)
    o('  <g class="fp-window" fill="none">' + ''.join(f'<path d="{w}" pathLength="1"/>' for w in p['windows']) + '</g>')
    # Türen
    o('  <g class="fp-door" fill="none">' + ''.join(f'<path d="{d}" pathLength="1"/>' for d in p['doors']) + '</g>')
    # Wände: Aussen + Raumgrenzen
    walls = []
    for rid, code, name, x, y, w, h, *_ in p['rooms']:
        walls.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" pathLength="1"/>')
    o('  <g class="fp-walls" fill="none">' + ''.join(walls) + '</g>')
    o('</svg>')
    return '\n'.join(out)


def tour_list(key, page=''):
    items = []
    for rid, code, name, x, y, w, h, anchor, text in PLANS[key]['rooms']:
        items.append(
            f'<li><a class="tour__item" href="{page}{anchor}" data-room="{rid}">'
            f'<span class="axis-bubble axis-bubble--sm" aria-hidden="true">{esc(code)}</span>'
            f'<span><b>{esc(name)}</b><small>{esc(text)}</small></span></a></li>')
    return '\n'.join(items)


if __name__ == '__main__':
    import sys
    print(svg(sys.argv[1] if len(sys.argv) > 1 else 'handwerk'))
