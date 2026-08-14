<?php
// Lokaler Entwicklungsrouter für PHP built-in server.
// Mappt /pfad → pfad.html (wie der Hostpoint-Server es tut).
// Verwendung: php -S localhost:8080 dev-router.php

$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Statische Dateien direkt ausliefern
if ($path !== '/' && file_exists(__DIR__ . $path)) {
    return false;
}

// / → index.html
if ($path === '/') {
    include __DIR__ . '/index.html';
    exit;
}

// /handwerker → handwerker.html
$html = __DIR__ . $path . '.html';
if (file_exists($html)) {
    include $html;
    exit;
}

// Fallback: 404
http_response_code(404);
echo "404 Not found: $path";
