import Link from 'next/link';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import JsonLd, { faqSchema } from '../../../components/JsonLd';
import { getDictionary } from '../../../lib/dictionaries';
import { SITE, altUrls, langHref } from '../../../lib/site';

const CONTENT = {
  pt: {
    title: 'Áreas de Atuação',
    metaDesc:
      'SAM (Síndrome de Ativação de Mastócitos), SED (Ehlers-Danlos), Covid Longa e Medicina do Sono. Investigação clínica de alta complexidade em Brasília-DF.',
    areas: [
      {
        slug: 'sam',
        h: 'Síndrome de Ativação de Mastócitos (SAM)',
        p: 'Reações "alérgicas" sem alergia comprovada, sintomas que envolvem pele, intestino, coração e sistema nervoso ao mesmo tempo, crises desencadeadas por alimentos, medicamentos, calor ou estresse. A SAM é uma condição subdiagnosticada que exige critérios diagnósticos rigorosos e correlação clínica cuidadosa.'
      },
      {
        slug: 'sed',
        h: 'Síndrome de Ehlers-Danlos (SED)',
        p: 'Hipermobilidade articular, dor crônica, luxações frequentes, pele com cicatrização atípica e fadiga. A SED frequentemente coexiste com disautonomia e SAM — e costuma passar décadas sem diagnóstico. A avaliação exige exame físico específico e conhecimento das comorbidades associadas.'
      },
      {
        slug: 'covid-longa',
        h: 'Covid Longa',
        p: 'Fadiga persistente, névoa mental, intolerância ao esforço, palpitações e sono não reparador meses após a infecção. A Covid Longa é real, tem base fisiopatológica em investigação ativa pela ciência, e exige avaliação multissistêmica — não desqualificação dos sintomas.'
      },
      {
        slug: 'medicina-do-sono',
        h: 'Medicina do Sono',
        p: 'Sono não reparador, insônia, apneia do sono, sonolência excessiva diurna. Como especialista em Medicina do Sono (RQE), a Dra. Carine investiga o sono como eixo central da saúde — muitas vezes o elo escondido em casos complexos.'
      }
    ],
    faq: [
      { q: 'O que é investigação clínica de alta complexidade?', a: 'É uma abordagem médica dedicada a casos com sintomas persistentes e multissistêmicos que não encontraram explicação em consultas convencionais. Envolve consultas longas, anamnese detalhada, correlação de sintomas e exames direcionados por hipóteses diagnósticas.' },
      { q: 'A Dra. Carine atende casos de SAM, SED e Covid Longa de outros estados?', a: 'Sim. Pacientes de todo o Brasil procuram atendimento em Brasília-DF. Entre em contato pelo WhatsApp para informações sobre agendamento.' },
      { q: 'Preciso de encaminhamento para agendar?', a: 'Não é necessário encaminhamento. É útil levar exames anteriores e um histórico dos sintomas para a primeira consulta.' }
    ]
  },
  en: {
    title: 'Areas of Practice',
    metaDesc:
      'MCAS (Mast Cell Activation Syndrome), EDS (Ehlers-Danlos), Long COVID and Sleep Medicine. High-complexity clinical investigation in Brasília, Brazil.',
    areas: [
      {
        slug: 'sam',
        h: 'Mast Cell Activation Syndrome (MCAS)',
        p: '"Allergic" reactions without proven allergy, symptoms involving skin, gut, heart and nervous system at the same time, flares triggered by foods, medications, heat or stress. MCAS is underdiagnosed and requires rigorous diagnostic criteria and careful clinical correlation.'
      },
      {
        slug: 'sed',
        h: 'Ehlers-Danlos Syndrome (EDS)',
        p: 'Joint hypermobility, chronic pain, frequent dislocations, atypical scarring and fatigue. EDS often coexists with dysautonomia and MCAS — and commonly goes decades without diagnosis. Assessment requires a specific physical exam and knowledge of associated comorbidities.'
      },
      {
        slug: 'covid-longa',
        h: 'Long COVID',
        p: 'Persistent fatigue, brain fog, exercise intolerance, palpitations and non-restorative sleep months after infection. Long COVID is real, has a pathophysiological basis under active scientific investigation, and demands multisystem evaluation — not dismissal of symptoms.'
      },
      {
        slug: 'medicina-do-sono',
        h: 'Sleep Medicine',
        p: 'Non-restorative sleep, insomnia, sleep apnea, excessive daytime sleepiness. As a board-certified Sleep Medicine specialist, Dr. Carine investigates sleep as a central axis of health — often the hidden link in complex cases.'
      }
    ],
    faq: [
      { q: 'What is high-complexity clinical investigation?', a: 'A medical approach dedicated to persistent, multisystem symptoms that conventional appointments could not explain. It involves long consultations, detailed history-taking, symptom correlation and hypothesis-driven testing.' },
      { q: 'Does Dr. Carine see international or out-of-state patients?', a: 'Yes. Patients from all over Brazil seek care in Brasília. Contact via WhatsApp for scheduling information.' },
      { q: 'Do I need a referral?', a: 'No referral is needed. Bringing previous test results and a symptom history to the first consultation is helpful.' }
    ]
  }
};

export async function generateMetadata({ params }) {
  const lang = params.lang === 'en' ? 'en' : 'pt';
  const c = CONTENT[lang];
  const alts = altUrls('/areas');
  return {
    title: c.title,
    description: c.metaDesc,
    alternates: {
      canonical: lang === 'en' ? alts.en : alts.pt,
      languages: { 'pt-BR': alts.pt, en: alts.en }
    }
  };
}

export default function Areas({ params }) {
  const lang = params.lang === 'en' ? 'en' : 'pt';
  const dict = getDictionary(lang);
  const c = CONTENT[lang];
  return (
    <>
      <Header lang={lang} dict={dict} currentPath="/areas" />
      <JsonLd data={faqSchema(c.faq)} />
      <main>
        <section className="block">
          <div className="container">
            <h2 style={{ fontSize: 'clamp(2rem,4.5vw,2.8rem)' }}>{c.title}</h2>
            <div className="grid-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
              {c.areas.map((a) => (
                <div className="card" key={a.h}>
                  <h3><Link href={langHref(lang, `/condicoes/${a.slug}`)}>{a.h}</Link></h3>
                  <p>{a.p}</p>
                  <p style={{ marginTop: 'var(--space-sm)' }}>
                    <Link href={langHref(lang, `/condicoes/${a.slug}`)}>{dict.lp.formAnchor} →</Link>
                  </p>
                </div>
              ))}
            </div>
            <div className="faq-box">
              <h2>{dict.blog.faqTitle}</h2>
              {c.faq.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
            <p style={{ marginTop: '2rem' }}>
              <a className="btn btn-primary" href={SITE.whatsappLink}>{dict.hero.cta}</a>
            </p>
          </div>
        </section>
      </main>
      <Footer lang={lang} dict={dict} />
    </>
  );
}
