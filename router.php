<?php
// Router für php -S localhost:8080 router.php
$uri  = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$file = __DIR__ . urldecode($uri);

// Statische Dateien direkt ausliefern
if ($uri !== '/' && file_exists($file) && !is_dir($file)) {
    return false;
}

// Clean-URL → HTML-Datei
$map = [
    '/'                  => 'index.html',
    '/ueber-uns'         => 'ueber-uns.html',
    '/it-solutions'      => 'it-solutions.html',
    '/ki-prozesse'       => 'ki-prozesse.html',
    '/branchen-software' => 'branchen-software.html',
    '/webdesign'         => 'webdesign.html',
    '/formular'          => 'formular.html',
    '/blog'              => 'blog.html',
    '/blog-post'         => 'blog-post.html',
    '/agb'               => 'agb.html',
    '/datenschutz'       => 'datenschutz.html',
    '/impressum'         => 'impressum.html',
];

$path = rtrim($uri, '/') ?: '/';
if (isset($map[$path])) {
    include __DIR__ . '/' . $map[$path];
} else {
    http_response_code(404);
    include __DIR__ . '/404.html';
}
