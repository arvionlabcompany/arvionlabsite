# ARVION Lab na InfinityFree

O site é um app React/Vite (estático) + API em PHP (`public/api/index.php`).
Tudo que está em `public/` (inclusive `.htaccess` e `api/`) vai para a raiz do site no build.

## Opção A — Com computador (mais simples)
1. `npm install`
2. `npm run build`  → gera a pasta `dist/`
3. No painel da InfinityFree (Gerenciador de Arquivos ou FileZilla), apague o `index2.html` padrão
   e envie **o conteúdo de `dist/`** (inclusive o `.htaccess` e a pasta `api/`) para `htdocs/`.
   Arquivos ocultos: ative "mostrar arquivos ocultos" para conferir que o `.htaccess` subiu.

## Opção B — Pelo GitHub, sem computador
1. Suba este projeto num repositório GitHub (branch `main`).
2. Em Settings > Secrets and variables > Actions, crie:
   - `FTP_HOST` (ex.: ftpupload.net — veja em "FTP Details" na InfinityFree)
   - `FTP_USER` (ex.: if0_XXXXXXXX)
   - `FTP_PASS` (senha da conta/FTP)
3. Cada push em `main` roda `.github/workflows/deploy.yml`: faz o build e envia o `dist/` para `/htdocs/`.
   Também dá pra disparar manualmente na aba Actions > Deploy InfinityFree > Run workflow.

## Formulários
- `/api/contact`, `/api/early-access`, `/api/subscribe` gravam em `htdocs/api/_data/*.jsonl`
  (pasta bloqueada por `.htaccess`; baixe pelo Gerenciador de Arquivos/FTP para ler).
- Também tenta enviar e-mail para arvionlab.company@gmail.com com `mail()`. Na hospedagem
  gratuita isso pode não chegar — por isso os envios ficam salvos nos arquivos.
- Teste: abra `https://SEU-SITE/api/health` → deve mostrar `{"ok":true}`.

## Observações
- Rotas como `/planos` e `/contato` funcionam por causa do `.htaccess` (mod_rewrite).
- Se o site estiver numa subpasta (não na raiz), avise: precisa ajustar caminhos.
