<?php
// API do site ARVION Lab para hospedagem PHP (InfinityFree).
// Substitui o Worker: mesmas rotas, mesmas validações e mesmas respostas.
// Salva cada envio em api/_data/*.jsonl (pasta bloqueada ao público)
// e tenta avisar por e-mail (best effort — mail() da hospedagem gratuita é limitado).

declare(strict_types=1);

const NOTIFY_EMAIL = 'arvionlab.company@gmail.com';
const SEGMENTS = ['landing', 'site', 'sistema', 'outro'];
const TOPICS = ['orcamento', 'suporte', 'parceria', 'outro'];

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

function out(array $data, int $code = 200): never {
    http_response_code($code);
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

function len(string $s): int {
    return function_exists('mb_strlen') ? mb_strlen($s, 'UTF-8') : strlen($s);
}

function str($v): string {
    return is_string($v) ? $v : '';
}

function clean_line(string $s): string {
    return trim(preg_replace('/[\r\n\t]+/', ' ', $s) ?? '');
}

function validate_email(string $email): ?string {
    $e = trim($email);
    if ($e === '') return 'Informe seu e-mail.';
    if (!preg_match('/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/u', $e)) return 'Informe um e-mail válido, como voce@empresa.com.';
    return null;
}

function validate_name(string $name): ?string {
    $n = len(trim($name));
    if ($n < 2) return 'Informe seu nome completo.';
    if ($n > 80) return 'Mantenha o nome com até 80 caracteres.';
    return null;
}

function validate_early_access(array $v): array {
    $e = [];
    if ($m = validate_name(str($v['name'] ?? ''))) $e['name'] = $m;
    if ($m = validate_email(str($v['email'] ?? ''))) $e['email'] = $m;
    $org = len(trim(str($v['organisation'] ?? '')));
    if ($org < 2) $e['organisation'] = 'Informe o nome do seu negócio.';
    elseif ($org > 100) $e['organisation'] = 'Mantenha este campo com até 100 caracteres.';
    if (!in_array(str($v['segment'] ?? ''), SEGMENTS, true)) $e['segment'] = 'Escolha uma opção.';
    if (str($v['fleetSize'] ?? '') === '') $e['fleetSize'] = 'Escolha o tamanho do negócio.';
    if (str($v['timeline'] ?? '') === '') $e['timeline'] = 'Escolha um prazo.';
    if (len(str($v['notes'] ?? '')) > 1000) $e['notes'] = 'Mantenha as observações com até 1.000 caracteres.';
    return $e;
}

function validate_contact(array $v): array {
    $e = [];
    if ($m = validate_name(str($v['name'] ?? ''))) $e['name'] = $m;
    if ($m = validate_email(str($v['email'] ?? ''))) $e['email'] = $m;
    if (!in_array(str($v['topic'] ?? ''), TOPICS, true)) $e['topic'] = 'Escolha um assunto.';
    $n = len(trim(str($v['message'] ?? '')));
    if ($n < 20) $e['message'] = "Escreva pelo menos 20 caracteres ($n até agora).";
    elseif ($n > 2000) $e['message'] = 'Mantenha a mensagem com até 2.000 caracteres.';
    return $e;
}

function body(): ?array {
    $raw = file_get_contents('php://input', false, null, 0, 65536);
    if ($raw === false || $raw === '') return null;
    $v = json_decode($raw, true);
    return is_array($v) ? $v : null;
}

function store(string $name, array $record): void {
    $dir = __DIR__ . '/_data';
    if (!is_dir($dir)) {
        @mkdir($dir, 0755, true);
    }
    // Garante que a pasta nunca seja servida ao público.
    $ht = $dir . '/.htaccess';
    if (!file_exists($ht)) {
        @file_put_contents($ht, "Require all denied\n<IfModule !mod_authz_core.c>\nOrder deny,allow\nDeny from all\n</IfModule>\n");
    }
    $record = ['at' => gmdate('c'), 'ip' => $_SERVER['REMOTE_ADDR'] ?? ''] + $record;
    @file_put_contents($dir . "/$name.jsonl", json_encode($record, JSON_UNESCAPED_UNICODE) . "\n", FILE_APPEND | LOCK_EX);
}

function notify(string $subject, string $text, string $replyTo = ''): void {
    $host = preg_replace('/^www\./', '', $_SERVER['HTTP_HOST'] ?? 'localhost');
    $headers = "From: ARVION Lab <noreply@$host>\r\nContent-Type: text/plain; charset=UTF-8\r\n";
    if ($replyTo !== '' && !preg_match('/[\r\n]/', $replyTo)) $headers .= "Reply-To: $replyTo\r\n";
    $subj = '=?UTF-8?B?' . base64_encode($subject) . '?=';
    @mail(NOTIFY_EMAIL, $subj, $text, $headers);
}

$route = $_GET['route'] ?? 'health';
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($route === 'health') {
    out(['ok' => true]);
}

if (!in_array($route, ['early-access', 'contact', 'subscribe'], true)) {
    out(['error' => 'Not found'], 404);
}
if ($method !== 'POST') {
    header('Allow: POST');
    out(['error' => 'Method not allowed'], 405);
}

$v = body();
if ($v === null) out(['error' => 'Send a JSON body.'], 400);

if ($route === 'early-access') {
    $errors = validate_early_access($v);
    if ($errors) out(['error' => 'Check the highlighted fields.', 'errors' => $errors], 422);
    $ref = 'AL-' . strtoupper(base_convert((string) round(microtime(true) * 1000), 10, 36));
    $f = ['name', 'email', 'organisation', 'role', 'segment', 'fleetSize', 'timeline', 'notes'];
    $rec = ['reference' => $ref];
    foreach ($f as $k) $rec[$k] = str($v[$k] ?? '');
    store('early-access', $rec);
    $lines = [];
    foreach ($rec as $k => $val) $lines[] = "$k: $val";
    notify('Novo briefing ' . $ref . ' — ' . clean_line($rec['organisation']), implode("\n", $lines), clean_line($rec['email']));
    out(['ok' => true, 'reference' => $ref]);
}

if ($route === 'contact') {
    $errors = validate_contact($v);
    if ($errors) out(['error' => 'Check the highlighted fields.', 'errors' => $errors], 422);
    $rec = [
        'name' => str($v['name']), 'email' => str($v['email']),
        'topic' => str($v['topic']), 'message' => str($v['message']),
    ];
    store('contact', $rec);
    notify('Contato do site — ' . clean_line($rec['topic']), "Nome: {$rec['name']}\nE-mail: {$rec['email']}\nAssunto: {$rec['topic']}\n\n{$rec['message']}", clean_line($rec['email']));
    out(['ok' => true]);
}

// subscribe
$err = validate_email(str($v['email'] ?? ''));
if ($err) out(['error' => $err, 'errors' => ['email' => $err]], 422);
store('subscribe', ['email' => trim(str($v['email']))]);
out(['ok' => true]);
