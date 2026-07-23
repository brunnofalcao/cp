import AppHeader from '../../../components/AppHeader';
import AppFooter from '../../../components/AppFooter';
import { MethodSteps, PatientJourney, FinalCta, StickyCta } from '../../../components/sections';
import JsonLd, { breadcrumbSchema } from '../../../components/JsonLd';
import Breadcrumbs from '../../../components/Breadcrumbs';
import { getDictionary } from '../../../lib/dictionaries';
import { altUrls } from '../../../lib/site';

export async function generateMetadata({ params }) {
  const lang = params.lang === 'en' ? 'en' : 'pt';
  const alts = altUrls('/abordagem');
  const isPt = lang === 'pt';
  return {
    title: isPt ? 'Abordagem clínica' : 'Clinical approach',
    description: isPt
      ? 'Como a investigação é conduzida: escuta e linha do tempo, integração de sistemas, hipóteses e exames direcionados, plano e encaminhamentos.'
      : 'How the investigation is conducted: listening and clinical timeline, system integration, hypotheses and targeted testing, plan and referrals.',
    alternates: { canonical: isPt ? alts.pt : alts.en, languages: { 'pt-BR': alts.pt, en: alts.en } }
  };
}

export default function Abordagem({ params }) {
  const lang = params.lang === 'en' ? 'en' : 'pt';
  const dict = getDictionary(lang);
  const crumbs = [
    { name: dict.nav.home, path: '/' },
    { name: dict.nav.approach, path: '/abordagem' }
  ];

  return (
    <>
      <AppHeader lang={lang} dict={dict} currentPath="/abordagem" />
      <JsonLd data={breadcrumbSchema(crumbs, lang)} />

      <main id="main">
        <section className="tight">
          <div className="wrap">
            <Breadcrumbs lang={lang} items={crumbs} />
            <div className="grid" style={{ marginTop: 'var(--s-xl)' }}>
              <div className="c-7">
                <span className="kicker">{dict.method.kicker}</span>
                <h1 className="d-l">{dict.method.title}</h1>
              </div>
              <div className="c-4 start-9" style={{ alignSelf: 'end' }}>
                <p className="lead">{dict.method.lead}</p>
              </div>
            </div>
          </div>
        </section>

        <MethodSteps dict={dict} titleId="approach-method" />
        <PatientJourney dict={dict} />
        <FinalCta lang={lang} dict={dict} />
      </main>

      <StickyCta lang={lang} dict={dict} />
      <AppFooter lang={lang} dict={dict} />
    </>
  );
}
