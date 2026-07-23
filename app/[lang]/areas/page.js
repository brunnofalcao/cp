import AppHeader from '../../../components/AppHeader';
import AppFooter from '../../../components/AppFooter';
import Breadcrumbs from '../../../components/Breadcrumbs';
import { ConditionIndex, MethodSteps, FaqAccordion, FinalCta, StickyCta } from '../../../components/sections';
import JsonLd, { faqSchema, breadcrumbSchema } from '../../../components/JsonLd';
import { getDictionary } from '../../../lib/dictionaries';
import { altUrls } from '../../../lib/site';

export async function generateMetadata({ params }) {
  const lang = params.lang === 'en' ? 'en' : 'pt';
  const alts = altUrls('/areas');
  const isPt = lang === 'pt';
  return {
    title: isPt ? 'Áreas de atuação' : 'Areas of practice',
    description: isPt
      ? 'Síndrome de Ativação de Mastócitos, Síndrome de Ehlers-Danlos, Covid Longa e Medicina do Sono. Quatro eixos de investigação avaliados em conjunto.'
      : 'Mast Cell Activation Syndrome, Ehlers-Danlos Syndrome, Long COVID and Sleep Medicine. Four areas of investigation assessed together.',
    alternates: { canonical: isPt ? alts.pt : alts.en, languages: { 'pt-BR': alts.pt, en: alts.en } }
  };
}

export default function Areas({ params }) {
  const lang = params.lang === 'en' ? 'en' : 'pt';
  const dict = getDictionary(lang);
  const crumbs = [
    { name: dict.nav.home, path: '/' },
    { name: dict.nav.areas, path: '/areas' }
  ];

  return (
    <>
      <AppHeader lang={lang} dict={dict} currentPath="/areas" />
      <JsonLd data={faqSchema(dict.faqHome.items)} />
      <JsonLd data={breadcrumbSchema(crumbs, lang)} />

      <main id="main">
        <section className="tight">
          <div className="wrap">
            <Breadcrumbs lang={lang} items={crumbs} />
            <div className="grid" style={{ marginTop: 'var(--s-xl)', rowGap: 'var(--s-md)' }}>
              <div className="c-7">
                <span className="kicker">{dict.areasHome.kicker}</span>
                <h1 className="d-l">{dict.areasHome.title}</h1>
              </div>
              <div className="c-4 start-9" style={{ alignSelf: 'end' }}>
                <p className="lead">{dict.areasHome.lead}</p>
              </div>
            </div>
          </div>
        </section>

        <ConditionIndex lang={lang} dict={dict} />
        <MethodSteps dict={dict} titleId="areas-method" />
        <FaqAccordion kicker={dict.faqHome.kicker} title={dict.faqHome.title} items={dict.faqHome.items} tint={false} />
        <FinalCta lang={lang} dict={dict} />
      </main>

      <StickyCta lang={lang} dict={dict} />
      <AppFooter lang={lang} dict={dict} />
    </>
  );
}
