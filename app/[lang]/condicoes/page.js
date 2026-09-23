import AppHeader from '../../../components/AppHeader';
import AppFooter from '../../../components/AppFooter';
import Breadcrumbs from '../../../components/Breadcrumbs';
import { ConditionsList, FinalCta, StickyCta } from '../../../components/sections';
import JsonLd, { breadcrumbSchema } from '../../../components/JsonLd';
import { getDictionary } from '../../../lib/dictionaries';
import { altUrls } from '../../../lib/site';

export async function generateMetadata({ params }) {
  const lang = params.lang === 'en' ? 'en' : 'pt';
  const isPt = lang === 'pt';
  const alts = altUrls('/condicoes');
  return {
    title: isPt ? 'Condições abordadas' : 'Conditions addressed',
    description: isPt
      ? 'Condições abordadas pela Dra. Carine Petry: Síndrome de Ativação de Mastócitos, intolerância à histamina, Ehlers-Danlos, disautonomia, Covid longa, infecções crônicas, disbiose, toxicidade do mofo, sono e zumbido.'
      : 'Conditions addressed by Dr. Carine Petry: Mast Cell Activation Syndrome, histamine intolerance, Ehlers-Danlos, dysautonomia, Long COVID, chronic infections, dysbiosis, mold toxicity, sleep and tinnitus.',
    alternates: { canonical: isPt ? alts.pt : alts.en, languages: { 'pt-BR': alts.pt, en: alts.en } }
  };
}

export default function Condicoes({ params }) {
  const lang = params.lang === 'en' ? 'en' : 'pt';
  const dict = getDictionary(lang);
  const crumbs = [
    { name: dict.nav.home, path: '/' },
    { name: dict.nav.conditions, path: '/condicoes' }
  ];

  return (
    <>
      <AppHeader lang={lang} dict={dict} currentPath="/condicoes" />
      <JsonLd data={breadcrumbSchema(crumbs, lang)} />

      <main id="main">
        <section className="tight" style={{ paddingBottom: 0 }}>
          <div className="wrap">
            <Breadcrumbs lang={lang} items={crumbs} />
          </div>
        </section>
        <ConditionsList lang={lang} dict={dict} showCta={false} headingLevel="h1" />
        <FinalCta lang={lang} dict={dict} />
      </main>

      <StickyCta lang={lang} dict={dict} />
      <AppFooter lang={lang} dict={dict} />
    </>
  );
}
