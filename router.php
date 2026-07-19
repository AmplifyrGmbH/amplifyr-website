<?php
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Serve static files directly
if ($uri !== '/' && file_exists(__DIR__ . $uri)) {
    return false;
}

// Map clean URLs to .html files
$map = [
    '/ki-transformation'     => 'ki-transformation.html',
    '/it-solutions'          => 'it-solutions.html',
    '/automatisierung'           => 'automatisierung.html',
    '/webdesign'             => 'webdesign.html',
    '/ueber-uns'             => 'ueber-uns.html',
    '/blog'                  => 'blog.html',
    '/blog-post'             => 'blog-post.html',
    '/formular'              => 'formular.html',
    '/impressum'             => 'impressum.html',
    '/datenschutz'           => 'datenschutz.html',
    '/agb'                   => 'agb.html',
    '/links'                 => 'links.html',
    '/demo'                  => 'demo.html',
    '/eisberg-artifact-v2'   => 'eisberg-artifact-v2.html',
    '/prozessgrafik-artifact' => 'prozessgrafik-artifact.html',
];

$path = rtrim($uri, '/');
if (isset($map[$path])) {
    include __DIR__ . '/' . $map[$path];
    exit;
}

include __DIR__ . '/index.html';
