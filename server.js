// Lokaler Dev-Server mit Clean-URL-Support
// Start: node server.js
// URL:   http://localhost:8080

'use strict';

var http = require('http');
var fs   = require('fs');
var path = require('path');

var PORT = 8080;
var ROOT = __dirname;

var MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.js':   'application/javascript; charset=utf-8',
  '.json': 'application/json',
  '.xml':  'application/xml',
  '.txt':  'text/plain',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png':  'image/png',
  '.ico':  'image/x-icon',
  '.svg':  'image/svg+xml',
  '.webm': 'video/webm',
  '.mp4':  'video/mp4',
  '.woff2':'font/woff2',
  '.woff': 'font/woff',
  '.php':  'text/plain', // PHP lokal nicht ausführen, als Text zeigen
};

function serve(res, filePath, status) {
  var ext  = path.extname(filePath).toLowerCase();
  var mime = MIME[ext] || 'application/octet-stream';
  var data = fs.readFileSync(filePath);
  res.writeHead(status || 200, { 'Content-Type': mime });
  res.end(data);
}

var server = http.createServer(function (req, res) {
  // URL ohne Query-String (mit URL-Dekodierung für Sonderzeichen wie Umlaute)
  var urlPath = decodeURIComponent(req.url.split('?')[0].replace(/\/+$/, '') || '/');

  // Kandidaten-Pfade ermitteln
  var candidates = [];

  if (urlPath === '/') {
    candidates.push(path.join(ROOT, 'index.html'));
  } else {
    var rel = urlPath.slice(1); // ohne führendes /

    // 1. Datei direkt (z.B. /style.css, /Bilder/foto.avif)
    candidates.push(path.join(ROOT, rel));

    // 2. Clean URL → .html (z.B. /it-solutions → it-solutions.html)
    if (!path.extname(rel)) {
      candidates.push(path.join(ROOT, rel + '.html'));
    }
  }

  // Ersten existierenden Kandidaten servieren
  for (var i = 0; i < candidates.length; i++) {
    if (fs.existsSync(candidates[i]) && fs.statSync(candidates[i]).isFile()) {
      serve(res, candidates[i]);
      console.log('200 ' + req.url);
      return;
    }
  }

  // 404
  var notFound = path.join(ROOT, '404.html');
  if (fs.existsSync(notFound)) {
    serve(res, notFound, 404);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found: ' + urlPath);
  }
  console.log('404 ' + req.url);
});

server.listen(PORT, function () {
  console.log('Dev-Server läuft auf http://localhost:' + PORT);
  console.log('Stoppen mit Ctrl+C');
});
