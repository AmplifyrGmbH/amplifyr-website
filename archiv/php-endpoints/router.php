<?php
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Static file — serve directly
if ($uri !== '/' && file_exists(__DIR__ . $uri)) {
    return false;
}

// Try .html extension
$path = __DIR__ . $uri . '.html';
if (file_exists($path)) {
    include $path;
    exit;
}

// Try index.html in directory
$path = __DIR__ . rtrim($uri, '/') . '/index.html';
if (file_exists($path)) {
    include $path;
    exit;
}

// Fallback: 404
http_response_code(404);
echo '404 Not Found';
