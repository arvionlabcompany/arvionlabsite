<?php
// Ponte do site para o ARVION OS: grava leads (CRM) e acessos direto no banco do OS.
// Sem segredos neste arquivo: as credenciais vêm de api/os_config.php, que é uma CÓPIA do
// config.php do OS, criada à mão no servidor (nunca vai para o GitHub). Se o arquivo não
// existir ou algo falhar, o site segue funcionando normalmente e nada é gravado no OS.

declare(strict_types=1);

function os_pdo(): ?PDO {
    static $pdo = false;
    if ($pdo !== false) return $pdo;
    $pdo = null;
    $cfg = __DIR__ . '/os_config.php';
    if (!is_file($cfg)) return null;
    try {
        require_once $cfg;
        if (function_exists('db')) $pdo = db();
    } catch (Throwable $e) {
        error_log('os_bridge: ' . $e->getMessage());
        $pdo = null;
    }
    return $pdo;
}

function os_s($v, int $n): string {
    if (!is_string($v)) return '';
    $v = trim((string) preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F]/u', '', $v));
    return function_exists('mb_substr') ? mb_substr($v, 0, $n) : substr($v, 0, $n);
}

/** true = pode seguir; false = excedeu o limite. */
function os_limit(PDO $pdo, string $k, int $max, int $minutes): bool {
    $kk = $k . ':' . substr(hash('sha256', ($_SERVER['REMOTE_ADDR'] ?? '') . '|arvion-site'), 0, 32);
    $s = $pdo->prepare('SELECT COUNT(*) FROM site_rate WHERE k=? AND at>DATE_SUB(NOW(),INTERVAL ' . (int) $minutes . ' MINUTE)');
    $s->execute([$kk]);
    if ((int) $s->fetchColumn() >= $max) return false;
    $pdo->prepare('INSERT INTO site_rate(k) VALUES(?)')->execute([$kk]);
    if (mt_rand(1, 50) === 1) $pdo->exec('DELETE FROM site_rate WHERE at<DATE_SUB(NOW(),INTERVAL 2 DAY)');
    return true;
}

/** Cria um lead no CRM do OS. $type: contact | early-access | subscribe. Nunca lança erro. */
function os_lead(string $type, array $v): void {
    try {
        $pdo = os_pdo();
        if (!$pdo) return;
        $name = os_s($v['name'] ?? '', 160);
        $email = os_s($v['email'] ?? '', 160);
        $phone = os_s($v['phone'] ?? '', 40);
        if ($type === 'subscribe' && $name === '') $name = $email;
        if ($name === '' || ($email === '' && $phone === '')) return;
        if (!os_limit($pdo, 'intake', 6, 60)) return;
        $origins = ['contact' => 'Site · Contato', 'early-access' => 'Site · Briefing/Orçamento', 'subscribe' => 'Site · Newsletter'];
        $segmap = ['landing' => 'Site', 'site' => 'Site', 'sistema' => 'Sistema web'];
        $seg = os_s($v['segment'] ?? '', 40);
        $svc = $segmap[$seg] ?? null;
        $contact = $email !== '' ? ($phone !== '' ? $email . ' / ' . $phone : $email) : $phone;
        $contact = function_exists('mb_substr') ? mb_substr($contact, 0, 120) : substr($contact, 0, 120);
        $labels = ['topic' => 'Assunto', 'segment' => 'Segmento', 'fleetSize' => 'Tamanho do negócio', 'timeline' => 'Prazo', 'role' => 'Cargo', 'notes' => 'Observações', 'message' => 'Mensagem'];
        $lines = [];
        foreach ($labels as $k => $lb) {
            $val = os_s($v[$k] ?? '', 2000);
            if ($val !== '') $lines[] = $lb . ': ' . $val;
        }
        $company = os_s($v['organisation'] ?? '', 160);
        $pdo->prepare("INSERT INTO leads(name,company,contact,service,origin,stage,notes) VALUES(?,?,?,?,?,'novo',?)")
            ->execute([$name, $company !== '' ? $company : null, $contact, $svc, $origins[$type] ?? 'Site', $lines ? implode("\n", $lines) : null]);
    } catch (Throwable $e) {
        error_log('os_bridge lead: ' . $e->getMessage());
    }
}

/** Registra uma visita anônima (sem IP, sem nome). Nunca lança erro. */
function os_hit(array $v): void {
    try {
        $ua = $_SERVER['HTTP_USER_AGENT'] ?? '';
        if ($ua === '' || preg_match('/bot|crawl|spider|slurp|preview|headless|facebookexternalhit/i', $ua)) return;
        $path = os_s($v['path'] ?? '', 200);
        $path = explode('?', explode('#', $path)[0])[0];
        if ($path === '' || $path[0] !== '/') return;
        $pdo = os_pdo();
        if (!$pdo) return;
        $vid = substr((string) preg_replace('/[^a-zA-Z0-9]/', '', os_s($v['vid'] ?? '', 40)), 0, 16);
        $ref = strtolower((string) parse_url(os_s($v['ref'] ?? '', 300), PHP_URL_HOST));
        $ref = substr((string) preg_replace('/^www\./', '', $ref), 0, 120);
        $mine = (string) preg_replace('/^www\./', '', strtolower((string) ($_SERVER['HTTP_HOST'] ?? '')));
        if ($ref !== '' && $ref === $mine) $ref = '';
        if (preg_match('/iPad|Tablet/i', $ua)) $dev = 'tablet';
        elseif (preg_match('/Mobile|Android|iPhone/i', $ua)) $dev = 'celular';
        else $dev = 'computador';
        if (!os_limit($pdo, 'hit', 120, 60)) return;
        $pdo->prepare('INSERT INTO site_visits(vid,path,ref,device) VALUES(?,?,?,?)')->execute([$vid, $path, $ref !== '' ? $ref : null, $dev]);
    } catch (Throwable $e) {
        error_log('os_bridge hit: ' . $e->getMessage());
    }
}

/** Conteúdo publicado no OS (aba Site). null = indisponível: o site usa o conteúdo padrão. */
function os_content(): ?array {
    try {
        $pdo = os_pdo();
        if (!$pdo) return null;
        return $pdo->query('SELECT id,kind,slug,title,category,summary,href,note,image,image2,image3,price_text,sort FROM site_items WHERE visible=1 ORDER BY sort ASC,id ASC')->fetchAll(PDO::FETCH_ASSOC);
    } catch (Throwable $e) {
        error_log('os_bridge content: ' . $e->getMessage());
        return null;
    }
}

/** Entrega uma imagem enviada pelo OS (guardada no banco). Retorna false se não existir. */
function os_file(int $id): bool {
    try {
        $pdo = os_pdo();
        if (!$pdo || $id < 1) return false;
        $s = $pdo->prepare('SELECT mime,data FROM site_files WHERE id=?');
        $s->execute([$id]);
        $r = $s->fetch(PDO::FETCH_ASSOC);
        if (!$r) return false;
        header('Content-Type: ' . $r['mime']);
        header('Cache-Control: public, max-age=31536000, immutable');
        header('Content-Length: ' . strlen((string) $r['data']));
        echo $r['data'];
        return true;
    } catch (Throwable $e) {
        error_log('os_bridge file: ' . $e->getMessage());
        return false;
    }
}
