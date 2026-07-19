// Gera app/tokens.css a partir de tokens/tokens.json
// Rodar: npm run tokens
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const t = JSON.parse(fs.readFileSync(path.join(dir, 'tokens.json'), 'utf-8'));

const L = [];
L.push('/* GERADO AUTOMATICAMENTE a partir de tokens/tokens.json — não editar à mão. */');
L.push('/* Rodar `npm run tokens` após alterar o JSON. */');
L.push('');
L.push(':root {');

for (const [group, entries] of Object.entries(t.color)) {
  if (group === 'contrast-notes') continue;
  for (const [name, def] of Object.entries(entries)) {
    L.push(`  --color-${name}: ${def.value};`);
  }
}

L.push('');
for (const [name, def] of Object.entries(t.typography.family)) {
  L.push(`  --font-${name}: ${def.value};`);
}

L.push('');
for (const [name, def] of Object.entries(t.typography.scale)) {
  L.push(`  --text-${name}-size: ${def.size};`);
  L.push(`  --text-${name}-weight: ${def.weight};`);
  L.push(`  --text-${name}-lh: ${def.lineHeight};`);
  L.push(`  --text-${name}-tracking: ${def.tracking};`);
}

L.push('');
for (const [name, value] of Object.entries(t.space.scale)) {
  L.push(`  --space-${name}: ${value};`);
}
for (const [name, value] of Object.entries(t.space.section)) {
  L.push(`  --section-${name}: ${value};`);
}

L.push('');
for (const [name, value] of Object.entries(t.radius)) {
  L.push(`  --radius-${name}: ${value};`);
}

L.push('');
for (const [name, value] of Object.entries(t.layout)) {
  if (typeof value === 'string') L.push(`  --layout-${name}: ${value};`);
}

L.push('');
for (const [name, def] of Object.entries(t.elevation)) {
  L.push(`  --shadow-${name}: ${def.value};`);
}

L.push('');
for (const [name, value] of Object.entries(t.motion.duration)) {
  L.push(`  --dur-${name}: ${value};`);
}
for (const [name, value] of Object.entries(t.motion.easing)) {
  L.push(`  --ease-${name}: ${value};`);
}

L.push('');
L.push(`  --touch-min: ${t.a11y['touch-target-min']};`);
L.push(`  --focus-ring: ${t.a11y['focus-ring']};`);
L.push('}');
L.push('');

fs.writeFileSync(path.join(dir, '..', 'app', 'tokens.css'), L.join('\n'));
console.log(`tokens.css gerado — ${L.length} linhas`);
