import { notFound } from 'next/navigation';
import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';
import JsonLd, { faqSchema, conditionSchema } from '../../../../components/JsonLd';
import LeadForm from '../../../../components/LeadForm';
import { LpHero, SymptomCheck, EvidenceBlock, Journey, LpFaq, MobileCta } from '../../../../components/LandingSections';
import { getDictionary, LANGS } from '../../../../lib/dictionaries';
import { altUrls } from '../../../../lib/site';
import ptLp from '../../../../content/landing/pt.json';
import enLp from '../../../../content/landing/en.json';

const LP = { pt: ptLp, en: enLp };

export function generateStaticParams() {
  const params = [];
  for (const lang of LANGS) {
    for (const slug of Object.keys(LP[lang])) params.push({ lang, slug });
  }
  return params;
}

export async function generateMetadata({ params }) {
  const lang = params.lang === 'en' ? 'en' : 'pt';
  const lp = LP[lang][params.slug];
  if (!lp) return {};
  const alts = altUrls(`/condicoes/${params.slug}`);
  return {
    title: lp.title,
    description: lp.metaDesc,
    keywords: lp.keywords,
    alternates: {
      canonical: lang === 'en' ? alts.en : alts.pt,
      languages: { 'pt-BR': alts.pt, en: alts.en }
    },
    openGraph: { type: 'website', title: lp.title, description: lp.metaDesc }
  };
}

export default function ConditionPage({ params }) {
  const lang = params.lang === 'en' ? 'en' : 'pt';
  const lp = LP[lang][params.slug];
  if (!lp) notFound();
  const dict = getDictionary(lang);

  return (
    <>
      <Header lang={lang} dict={dict} currentPath={`/condicoes/${lp.slug}`} />
      <JsonLd data={conditionSchema(lp, lang)} />
      <JsonLd data={faqSchema(lp.faq)} />
      <main>
        <LpHero lp={lp} dict={dict} />
        <SymptomCheck lp={lp} dict={dict} />
        <EvidenceBlock lp={lp} dict={dict} />
        <Journey lp={lp} dict={dict} />

        <section className="block" id="avaliacao">
          <div className="container">
            <div className="grid-2" style={{ marginTop: 0, alignItems: 'start' }}>
              <div>
                <p className="section-kicker">{dict.lp.formKicker}</p>
                <h2>{dict.lp.formTitle}</h2>
                <p className="lead" style={{ marginTop: 'var(--space-sm)' }}>{dict.lp.formLead}</p>
                <p className="disclaimer" style={{ marginTop: 'var(--space-lg)' }}>{dict.lp.medicalDisclaimer}</p>
              </div>
              <LeadForm lang={lang} condition={lp.condition} dict={dict} />
            </div>
          </div>
        </section>

        <LpFaq lp={lp} dict={dict} />
      </main>
      <MobileCta dict={dict} />
      <Footer lang={lang} dict={dict} />
    </>
  );
}
