<?php
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Serve static files directly
if ($uri !== '/' && file_exists(__DIR__ . $uri)) {
    return false;
}

// Map clean URLs to .html files
$map = [
    '/it-solutions'               => 'it-solutions.html',
    '/ki-prozesse'                => 'ki-prozesse.html',
    '/webdesign'                  => 'webdesign.html',
    '/ueber-uns'                  => 'ueber-uns.html',
    '/branchen-software'          => 'branchen-software.html',
    '/blog'                       => 'blog.html',
    '/blog-post'                  => 'blog-post.html',
    '/formular'                   => 'formular.html',
    '/impressum'                  => 'impressum.html',
    '/datenschutz'                => 'datenschutz.html',
    '/agb'                        => 'agb.html',
    '/business-amplification'     => 'business-amplification.html',
    '/digitalisierung-kmu'        => 'digitalisierung-kmu.html',
    '/digitalisierung-handwerker' => 'digitalisierung-handwerker.html',
    '/links'                      => 'links.html',
    '/demo'                       => 'demo.html',
];

$path = rtrim($uri, '/');
if (isset($map[$path])) {
    include __DIR__ . '/' . $map[$path];
    exit;
}

include __DIR__ . '/index.html';
