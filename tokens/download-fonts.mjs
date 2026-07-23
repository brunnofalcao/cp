// Baixa e auto-hospeda as fontes do sistema (Cormorant Garamond e Inter, ambas SIL OFL).
// Rodar uma vez: npm run fonts
// Os arquivos vão para public/fonts/ e são servidos pelo próprio domínio — sem requisição a terceiros.
//
// Enquanto os arquivos não existirem, app/fonts.css usa a stack de fallback do sistema
// e o site continua funcionando normalmente.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(dir, '..', 'public', 'fonts');
fs.mkdirSync(out, { recursive: true });

const FILES = [
  { name: 'cormorant-garamond-500.woff2', css: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500&display=swap' },
  { name: 'cormorant-garamond-600.woff2', css: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600&display=swap' },
  { name: 'inter-400.woff2', css: 'https://fonts.googleapis.com/css2?family=Inter:wght@400&display=swap' },
  { name: 'inter-500.woff2', css: 'https://fonts.googleapis.com/css2?family=Inter:wght@500&display=swap' }
];

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120 Safari/537.36';

for (const f of FILES) {
  const target = path.join(out, f.name);
  if (fs.existsSync(target)) {
    console.log(`· ${f.name} já existe`);
    continue;
  }
  try {
    const cssRes = await fetch(f.css, { headers: { 'User-Agent': UA } });
    const css = await cssRes.text();
    const match = css.match(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+\.woff2)\)/);
    if (!match) throw new Error('woff2 não encontrado no CSS');
    const buf = Buffer.from(await (await fetch(match[1])).arrayBuffer());
    fs.writeFileSync(target, buf);
    console.log(`✓ ${f.name} — ${(buf.length / 1024).toFixed(0)} KB`);
  } catch (err) {
    console.warn(`✗ ${f.name}: ${err.message}. O site usará a stack de fallback.`);
  }
}
