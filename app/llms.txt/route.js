import { getAllPosts } from '../../lib/posts';
import { SITE } from '../../lib/site';
import ptLp from '../../content/landing/pt.json';

export const dynamic = 'force-static';

export function GET() {
  const posts = getAllPosts('pt');
  const lines = [
    '# Carine Petry · carinepetry.com.br',
    '',
    '> Médica (CRM-DF 15342, RQE 16243/12865), especialista em Medicina do Sono. Prática dedicada à investigação clínica de quadros multissistêmicos e condições frequentemente subdiagnosticadas: Síndrome de Ativação de Mastócitos (SAM), Síndrome de Ehlers-Danlos (SED) e Covid Longa. Consultório em Brasília-DF, Brasil.',
    '',
    '## Institucional',
    `- [Abordagem clínica](${SITE.url}/abordagem): as quatro etapas da investigação · escuta e linha do tempo, integração de sistemas, hipóteses e exames direcionados, plano e encaminhamentos.`,
    `- [Sobre](${SITE.url}/sobre): trajetória, credenciais registradas e princípios de conduta.`,
    `- [Áreas de atuação](${SITE.url}/areas): índice das condições investigadas.`,
    `- [Contato](${SITE.url}/contato): solicitação de informações sobre a consulta.`,
    '',
    '## Condições investigadas',
    ...Object.entries(ptLp).map(([slug, lp]) => `- [${lp.condition}](${SITE.url}/condicoes/${slug}): ${lp.metaDesc}`),
    '',
    '## Conteúdo científico',
    ...posts.map((p) => `- [${p.title}](${SITE.url}/blog/${p.slug}): ${p.description}`),
    '',
    '## Versão em inglês',
    `- [English site](${SITE.url}/en): tradução integral de todas as páginas e artigos.`,
    '',
    '## Observação',
    'Todo o conteúdo é informativo e educacional. Não substitui consulta, diagnóstico ou tratamento médico individualizado. Autoria e revisão: Carine Petry, CRM-DF 15342.'
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  });
}
