// Gera app/tokens.css a partir de tokens/tokens.json — fonte única de verdade.
// Rodar: npm run tokens (já roda automaticamente em dev e build)
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const t = JSON.parse(fs.readFileSync(path.join(dir, 'tokens.json'), 'utf-8'));

const L = [];
L.push('/* GERADO a partir de tokens/tokens.json — não editar. Rodar `npm run tokens`. */');
L.push(':root {');

for (const [group, entries] of Object.entries(t.color)) {
  L.push(`  /* cor · ${group} */`);
  for (const [name, def] of Object.entries(entries)) {
    L.push(`  --c-${name}: ${def.value};`);
  }
}

L.push('  /* tipografia */');
for (const [name, def] of Object.entries(t.typography.family)) {
  L.push(`  --font-${name}: ${def.value};`);
}
for (const [name, def] of Object.entries(t.typography.scale)) {
  L.push(`  --t-${name}: ${def.weight} ${def.size}/${def.lineHeight} var(--font-${def.family});`);
  L.push(`  --t-${name}-tracking: ${def.tracking};`);
}
for (const [name, value] of Object.entries(t.typography.measure)) {
  L.push(`  --measure-${name}: ${value};`);
}

L.push('  /* espaçamento */');
for (const [name, value] of Object.entries(t.space.scale)) L.push(`  --s-${name}: ${value};`);
for (const [name, value] of Object.entries(t.space.section)) L.push(`  --section-${name}: ${value};`);

L.push('  /* forma e layout */');
for (const [name, value] of Object.entries(t.radius)) L.push(`  --r-${name}: ${value};`);
for (const [name, value] of Object.entries(t.layout)) {
  if (typeof value === 'string') L.push(`  --l-${name}: ${value};`);
}
L.push(`  --l-grid-columns: ${t.layout['grid-columns']};`);

L.push('  /* elevação */');
for (const [name, def] of Object.entries(t.elevation)) L.push(`  --e-${name}: ${def.value};`);

L.push('  /* motion */');
for (const [name, value] of Object.entries(t.motion.duration)) L.push(`  --dur-${name}: ${value};`);
for (const [name, value] of Object.entries(t.motion.easing)) L.push(`  --ease-${name}: ${value};`);
L.push(`  --reveal-offset: ${t.motion.reveal.offset};`);
L.push(`  --reveal-dur: ${t.motion.reveal.duration};`);
L.push(`  --reveal-stagger: ${t.motion.reveal.stagger};`);

L.push('  /* acessibilidade */');
L.push(`  --touch-min: ${t.a11y['touch-target-min']};`);
L.push(`  --focus-ring: ${t.a11y['focus-ring']};`);
L.push('}');
L.push('');

fs.writeFileSync(path.join(dir, '..', 'app', 'tokens.css'), L.join('\n'));
console.log(`tokens.css gerado — ${L.length} linhas`);
