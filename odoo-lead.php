<?php
error_reporting(E_ALL & ~E_DEPRECATED);
/**
 * Odoo CRM Lead Proxy
 * Empfängt Formulardaten und erstellt einen Lead im Odoo CRM.
 * IT-Solutions → Team "IT", alles andere → Team "Consulting"
 */

header('Content-Type: application/json');

// Nur POST erlauben
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Nur von amplifyr.ch zulassen
$allowed_origins = ['https://www.amplifyr.ch', 'https://amplifyr.ch', 'http://localhost:8000', 'http://127.0.0.1:8000'];
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowed_origins)) {
    header('Access-Control-Allow-Origin: ' . $origin);
}

// JSON-Body einlesen
$input = json_decode(file_get_contents('php://input'), true);
if (!$input) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid JSON']);
    exit;
}

// Odoo-Konfiguration
define('ODOO_URL', 'https://amplifyr-gmbh.odoo.com');
define('ODOO_DB',  'amplifyr-gmbh');

$env = parse_ini_file(__DIR__ . '/.env');
if (!$env || empty($env['ODOO_USER']) || empty($env['ODOO_API_KEY'])) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Server configuration error']);
    exit;
}
define('ODOO_USER', $env['ODOO_USER']);
define('ODOO_PASS', $env['ODOO_API_KEY']);

// Formulardaten
$name    = trim($input['name']    ?? '');
$email   = trim($input['email']   ?? '');
$topic   = trim($input['topic']   ?? '');
$message = trim($input['message'] ?? '');

// Basis-Validierung
if (!$name || !$email || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid input']);
    exit;
}

/**
 * Odoo JSON-RPC-Aufruf via cURL
 */
function odoo_rpc(string $endpoint, array $payload): ?array {
    $ch = curl_init(ODOO_URL . $endpoint);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST           => true,
        CURLOPT_HTTPHEADER     => ['Content-Type: application/json'],
        CURLOPT_POSTFIELDS     => json_encode($payload),
        CURLOPT_TIMEOUT        => 15,
    ]);
    $raw = curl_exec($ch);
    curl_close($ch);
    if (!$raw) return null;
    return json_decode($raw, true);
}

// 1. Authentifizierung → UID holen
$auth = odoo_rpc('/jsonrpc', [
    'jsonrpc' => '2.0',
    'method'  => 'call',
    'id'      => 1,
    'params'  => [
        'service' => 'common',
        'method'  => 'authenticate',
        'args'    => [ODOO_DB, ODOO_USER, ODOO_PASS, []],
    ],
]);

$uid = $auth['result'] ?? null;
if (!$uid) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Odoo auth failed']);
    exit;
}

// 2. Team-ID anhand des Themas bestimmen
$team_name = ($topic === 'IT-Solutions') ? 'IT' : 'Consulting';

$team_res = odoo_rpc('/jsonrpc', [
    'jsonrpc' => '2.0',
    'method'  => 'call',
    'id'      => 2,
    'params'  => [
        'service' => 'object',
        'method'  => 'execute_kw',
        'args'    => [
            ODOO_DB, $uid, ODOO_PASS,
            'crm.team', 'search_read',
            [[['name', 'ilike', $team_name]]],
            ['fields' => ['id', 'name'], 'limit' => 1],
        ],
    ],
]);

$team_id = $team_res['result'][0]['id'] ?? false;

// 3. Lead erstellen
$description = $topic ? "Thema: {$topic}\n\n{$message}" : $message;

$lead_data = [
    'name'         => $name . ' – ' . ($topic ?: 'Kontaktanfrage'),
    'contact_name' => $name,
    'email_from'   => $email,
    'description'  => $description,
];
if ($team_id) {
    $lead_data['team_id'] = $team_id;
}

$create = odoo_rpc('/jsonrpc', [
    'jsonrpc' => '2.0',
    'method'  => 'call',
    'id'      => 3,
    'params'  => [
        'service' => 'object',
        'method'  => 'execute_kw',
        'args'    => [
            ODOO_DB, $uid, ODOO_PASS,
            'crm.lead', 'create',
            [$lead_data],
            [],
        ],
    ],
]);

if (isset($create['result']) && is_int($create['result'])) {
    echo json_encode(['success' => true, 'lead_id' => $create['result']]);
} else {
    http_response_code(500);
    $err = $create['error']['data']['message'] ?? 'Lead creation failed';
    echo json_encode(['success' => false, 'message' => $err]);
}
