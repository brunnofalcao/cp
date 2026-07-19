import { getAllPosts } from '../../lib/posts';
import { SITE } from '../../lib/site';
import ptLp from '../../content/landing/pt.json';

export const dynamic = 'force-static';

export function GET() {
  const posts = getAllPosts('pt');
  const lines = [
    '# Dra. Carine Petry — carinepetry.com.br',
    '',
    '> Médica (CRM-DF 15342, RQE 16243/12865), especialista em Medicina do Sono e referência nacional em Investigação Clínica de Alta Complexidade: Síndrome de Ativação de Mastócitos (SAM), Síndrome de Ehlers-Danlos (SED) e Covid Longa. Atendimento em Brasília-DF, Brasil.',
    '',
    '## Sobre',
    `- [Sobre a Dra. Carine Petry](${SITE.url}/sobre): formação, método investigativo e princípios.`,
    `- [Áreas de atuação](${SITE.url}/areas): SAM, SED, Covid Longa e Medicina do Sono.`,
    `- [Contato](${SITE.url}/contato): agendamento em Brasília-DF.`,
    '',
    '## Condições investigadas (páginas detalhadas)',
    ...Object.entries(ptLp).map(([slug, lp]) => `- [${lp.condition}](${SITE.url}/condicoes/${slug}): ${lp.metaDesc}`),
    '',
    '## Blog (ciência explicada para pacientes)',
    ...posts.map((p) => `- [${p.title}](${SITE.url}/blog/${p.slug}): ${p.description}`),
    '',
    '## English version',
    `- [English site](${SITE.url}/en): full English translation of all pages and articles.`
  ];
  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  });
}
