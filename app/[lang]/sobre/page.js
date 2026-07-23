import AppHeader from '../../../components/AppHeader';
import AppFooter from '../../../components/AppFooter';
import EditorialImage from '../../../components/EditorialImage';
import Breadcrumbs from '../../../components/Breadcrumbs';
import Reveal from '../../../components/Reveal';
import { FinalCta, StickyCta, EvidencePanel } from '../../../components/sections';
import JsonLd, { breadcrumbSchema } from '../../../components/JsonLd';
import { getDictionary } from '../../../lib/dictionaries';
import { altUrls } from '../../../lib/site';
import ptAbout from '../../../content/pages/sobre.pt.json';
import enAbout from '../../../content/pages/sobre.en.json';

const ABOUT = { pt: ptAbout, en: enAbout };

export async function generateMetadata({ params }) {
  const lang = params.lang === 'en' ? 'en' : 'pt';
  const a = ABOUT[lang];
  const alts = altUrls('/sobre');
  return {
    title: a.metaTitle,
    description: a.metaDesc,
    alternates: { canonical: lang === 'en' ? alts.en : alts.pt, languages: { 'pt-BR': alts.pt, en: alts.en } }
  };
}

export default function Sobre({ params }) {
  const lang = params.lang === 'en' ? 'en' : 'pt';
  const dict = getDictionary(lang);
  const a = ABOUT[lang];
  const crumbs = [
    { name: dict.nav.home, path: '/' },
    { name: dict.nav.about, path: '/sobre' }
  ];

  return (
    <>
      <AppHeader lang={lang} dict={dict} currentPath="/sobre" />
      <JsonLd data={breadcrumbSchema(crumbs, lang)} />

      <main id="main">
        {/* Hero com retrato */}
        <section className="tight">
          <div className="wrap">
            <Breadcrumbs lang={lang} items={crumbs} />
            <div className="grid" style={{ marginTop: 'var(--s-xl)', alignItems: 'end' }}>
              <div className="c-6">
                <span className="kicker">{a.kicker}</span>
                <h1 className="d-l">{a.h1}</h1>
                <p className="lead" style={{ marginTop: 'var(--s-lg)' }}>{a.lead}</p>
              </div>
              <div className="c-5 start-8">
                <EditorialImage
                  id="IMG-02"
                  ratio="4 / 5"
                  priority
                  sizes="(max-width: 1024px) 100vw, 38vw"
                  tag="Retrato editorial · hero Sobre"
                  brief="Mesmo arquivo usado no perfil da home. Fundo neutro, luz natural lateral, plano médio."
                  px="1600 × 2000"
                  alt=""
                />
              </div>
            </div>
          </div>
        </section>

        {/* Biografia editorial */}
        <section className="on-tint" aria-labelledby="bio-title">
          <div className="wrap">
            <div className="grid">
              <Reveal className="c-4">
                <h2 id="bio-title" className="d-s">{a.bioTitle}</h2>
              </Reveal>
              <Reveal className="c-7 start-6" delay={80}>
                <div className="stack-lg">
                  {a.bio.map((p) => <p key={p} className="body">{p}</p>)}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Formação em timeline */}
        <section aria-labelledby="formation-title">
          <div className="wrap">
            <div className="grid">
              <div className="c-4">
                <span className="kicker">{a.formationKicker}</span>
                <h2 id="formation-title" className="d-s">{a.formationTitle}</h2>
                <p className="cap" style={{ marginTop: 'var(--s-md)' }}>{a.formationNote}</p>
              </div>
              <div className="c-7 start-6">
                <div className="timeline">
                  {a.formation.map((f, i) => (
                    <Reveal className="timeline-item" key={f.what} delay={i * 60}>
                      <span className="when">{f.when}</span>
                      <div>
                        <p className="what">{f.what}</p>
                        {f.where && <p className="where">{f.where}</p>}
                      </div>
                    </Reveal>
                  ))}
                </div>
                <p className="pending" style={{ marginTop: 'var(--s-lg)' }}>{a.formationPending}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Princípios */}
        <section className="on-dark" aria-labelledby="principles-title">
          <div className="wrap">
            <div className="grid">
              <div className="c-4">
                <span className="kicker on-dark">{a.principlesKicker}</span>
                <h2 id="principles-title" className="d-s">{a.principlesTitle}</h2>
              </div>
              <div className="c-7 start-6">
                {a.principles.map((p, i) => (
                  <Reveal key={p.t} delay={i * 60}
                    style={{ paddingBlock: 'var(--s-lg)', borderTop: '1px solid var(--c-linha)' }}>
                    <h3 className="h-serif" style={{ color: 'var(--c-creme)' }}>{p.t}</h3>
                    <p className="sm" style={{ marginTop: 'var(--s-xs)', maxWidth: '60ch' }}>{p.d}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contexto visual */}
        <section aria-label={a.contextLabel}>
          <div className="wrap">
            <div className="grid">
              <div className="c-6">
                <EditorialImage
                  id="IMG-04"
                  ratio="3 / 4"
                  sizes="(max-width: 1024px) 100vw, 46vw"
                  tag="Contexto de trabalho"
                  brief="Médica estudando prontuário, exames ou literatura. Momento real, não encenado."
                  px="1500 × 2000"
                  alt=""
                />
              </div>
              <div className="c-5 start-8" style={{ alignSelf: 'end' }}>
                <EditorialImage
                  id="IMG-05"
                  ratio="1 / 1"
                  sizes="(max-width: 1024px) 100vw, 38vw"
                  tag="Detalhe"
                  brief="Mãos, materiais, livros ou mesa de trabalho. Profundidade de campo moderada."
                  px="1600 × 1600"
                  alt=""
                />
              </div>
            </div>
          </div>
        </section>

        <EvidencePanel dict={dict} />
        <FinalCta lang={lang} dict={dict} />
      </main>

      <StickyCta lang={lang} dict={dict} />
      <AppFooter lang={lang} dict={dict} />
    </>
  );
}
