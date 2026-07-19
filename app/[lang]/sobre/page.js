import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { getDictionary } from '../../../lib/dictionaries';
import { altUrls } from '../../../lib/site';

const CONTENT = {
  pt: {
    title: 'Sobre a Dra. Carine Petry',
    metaDesc:
      'Conheça a Dra. Carine Petry: médica (CRM-DF 15342), especialista em Medicina do Sono e referência em investigação clínica de SAM, SED e Covid Longa em Brasília-DF.',
    blocks: [
      {
        h: 'Medicina investigativa, com método',
        p: 'A Dra. Carine Petry é médica (CRM-DF 15342, RQE 16243/12865), especialista em Medicina do Sono e dedicada à investigação clínica de alta complexidade. Seu trabalho concentra-se em condições raras e subdiagnosticadas: Síndrome de Ativação de Mastócitos (SAM), Síndrome de Ehlers-Danlos (SED) e sequelas de Covid Longa.'
      },
      {
        h: 'Profundidade antes de resposta',
        p: 'Consultas longas, anamnese detalhada e correlação de sintomas multissistêmicos. Medicina investigativa não é apenas pedir exames: é reconhecer padrões que outros não veem, com base em evidência científica sólida e atualização contínua.'
      },
      {
        h: 'Ética como princípio inegociável',
        p: 'Diagnósticos corretos, nunca convenientes. Quando o caso exige outra especialidade, a orientação de trajetória faz parte da expertise: "não é minha área, mas sei quem pode ajudar".'
      },
      {
        h: 'Acolhimento a quem já ouviu "seus exames estão normais"',
        p: 'Grande parte dos pacientes chega ao consultório depois de anos de consultas sem resposta. Aqui, sintomas reais são levados a sério — com escuta ativa, validação e um plano claro de investigação.'
      }
    ]
  },
  en: {
    title: 'About Dr. Carine Petry',
    metaDesc:
      'Meet Dr. Carine Petry: physician (CRM-DF 15342, Brazil), Sleep Medicine specialist and reference in clinical investigation of MCAS, EDS and Long COVID, based in Brasília.',
    blocks: [
      {
        h: 'Investigative medicine, with method',
        p: 'Dr. Carine Petry is a physician (CRM-DF 15342, RQE 16243/12865, Brazil), Sleep Medicine specialist dedicated to high-complexity clinical investigation. Her work focuses on rare and underdiagnosed conditions: Mast Cell Activation Syndrome (MCAS), Ehlers-Danlos Syndrome (EDS) and Long COVID.'
      },
      {
        h: 'Depth before answers',
        p: 'Long consultations, detailed clinical history and correlation of multisystem symptoms. Investigative medicine is not just ordering tests: it means recognizing patterns others miss, grounded in solid scientific evidence and continuous study.'
      },
      {
        h: 'Ethics as a non-negotiable principle',
        p: 'Correct diagnoses, never convenient ones. When a case requires another specialty, trajectory guidance is part of the expertise: "this is not my field, but I know who can help".'
      },
      {
        h: 'Care for those who have heard "your tests are normal"',
        p: 'Most patients arrive after years of appointments without answers. Here, real symptoms are taken seriously — with active listening, validation and a clear investigation plan.'
      }
    ]
  }
};

export async function generateMetadata({ params }) {
  const lang = params.lang === 'en' ? 'en' : 'pt';
  const c = CONTENT[lang];
  const alts = altUrls('/sobre');
  return {
    title: c.title,
    description: c.metaDesc,
    alternates: {
      canonical: lang === 'en' ? alts.en : alts.pt,
      languages: { 'pt-BR': alts.pt, en: alts.en }
    }
  };
}

export default function Sobre({ params }) {
  const lang = params.lang === 'en' ? 'en' : 'pt';
  const dict = getDictionary(lang);
  const c = CONTENT[lang];
  return (
    <>
      <Header lang={lang} dict={dict} currentPath="/sobre" />
      <main>
        <section className="block">
          <div className="container">
            <h2 style={{ fontSize: 'clamp(2rem,4.5vw,2.8rem)' }}>{c.title}</h2>
            {c.blocks.map((b) => (
              <div key={b.h} style={{ marginTop: '2rem', maxWidth: '46em' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--borgonha)', fontSize: '1.4rem', marginBottom: '0.5rem' }}>{b.h}</h3>
                <p>{b.p}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer lang={lang} dict={dict} />
    </>
  );
}
