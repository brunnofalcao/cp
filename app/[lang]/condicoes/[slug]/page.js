import Link from 'next/link';
import { notFound } from 'next/navigation';
import AppHeader from '../../../../components/AppHeader';
import AppFooter from '../../../../components/AppFooter';
import EditorialImage from '../../../../components/EditorialImage';
import Breadcrumbs from '../../../../components/Breadcrumbs';
import Reveal from '../../../../components/Reveal';
import ConciergeForm from '../../../../components/ConciergeForm';
import ConditionView from '../../../../components/ConditionView';
import { MethodSteps, FaqAccordion, StickyCta } from '../../../../components/sections';
import JsonLd, { faqSchema, conditionSchema, breadcrumbSchema } from '../../../../components/JsonLd';
import { getDictionary, LANGS } from '../../../../lib/dictionaries';
import { altUrls, langHref } from '../../../../lib/site';
import ptLp from '../../../../content/landing/pt.json';
import enLp from '../../../../content/landing/en.json';

const LP = { pt: ptLp, en: enLp };

export function generateStaticParams() {
  const params = [];
  for (const lang of LANGS) for (const slug of Object.keys(LP[lang])) params.push({ lang, slug });
  return params;
}

export async function generateMetadata({ params }) {
  const lang = params.lang === 'en' ? 'en' : 'pt';
  const lp = LP[lang][params.slug];
  if (!lp) return {};
  const alts = altUrls(`/condicoes/${params.slug}`);
  const url = lang === 'en' ? alts.en : alts.pt;
  return {
    title: lp.title,
    description: lp.metaDesc,
    keywords: lp.keywords,
    alternates: { canonical: url, languages: { 'pt-BR': alts.pt, en: alts.en } },
    openGraph: { type: 'article', title: lp.title, description: lp.metaDesc, url },
    twitter: { card: 'summary_large_image', title: lp.title, description: lp.metaDesc }
  };
}

export default function ConditionPage({ params }) {
  const lang = params.lang === 'en' ? 'en' : 'pt';
  const lp = LP[lang][params.slug];
  if (!lp) notFound();
  const dict = getDictionary(lang);

  const crumbs = [
    { name: dict.nav.home, path: '/' },
    { name: dict.nav.areas, path: '/areas' },
    { name: lp.condition, path: `/condicoes/${lp.slug}` }
  ];

  return (
    <>
      <AppHeader lang={lang} dict={dict} currentPath={`/condicoes/${lp.slug}`} />
      <ConditionView slug={lp.slug} lang={lang} />
      <JsonLd data={conditionSchema(lp, lang)} />
      <JsonLd data={faqSchema(lp.faq)} />
      <JsonLd data={breadcrumbSchema(crumbs, lang)} />

      <main id="main">
        {/* Hero específico da condição */}
        <section className="tight">
          <div className="wrap">
            <Breadcrumbs lang={lang} items={crumbs} />
            <div className="grid" style={{ marginTop: 'var(--s-xl)', alignItems: 'end' }}>
              <div className="c-7">
                <span className="kicker">{lp.kicker}</span>
                <h1 className="d-l">{lp.h1}</h1>
              </div>
              <div className="c-4 start-9">
                <p className="lead">{lp.sub}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Resumo médico acessível */}
        <section className="on-tint" aria-labelledby="summary-title">
          <div className="wrap">
            <div className="grid">
              <Reveal className="c-4">
                <h2 id="summary-title" className="d-s">{lp.summaryTitle}</h2>
              </Reveal>
              <Reveal className="c-7 start-6" delay={80}>
                <p className="lead">{lp.summary}</p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Sinais e sintomas por sistema */}
        <section aria-labelledby="systems-title">
          <div className="wrap">
            <div className="grid" style={{ rowGap: 'var(--s-lg)' }}>
              <div className="c-5">
                <span className="kicker">{dict.lp.symptomsKicker}</span>
                <h2 id="systems-title" className="d-s">{lp.condition}</h2>
              </div>
              <div className="c-6 start-7" style={{ alignSelf: 'end' }}>
                <p className="cap" style={{ maxWidth: '52ch' }}>{dict.lp.symptomsNote}</p>
              </div>
            </div>

            <div style={{ marginTop: 'var(--s-2xl)', borderBottom: '1px solid var(--c-linha)' }}>
              {lp.systems.map((s, i) => (
                <Reveal className="sys-group" key={s.name} delay={i * 50}>
                  <h3>{s.name}</h3>
                  <ul>{s.items.map((it) => <li key={it}>{it}</li>)}</ul>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Situações que justificam investigação */}
        <section className="on-dark" aria-labelledby="when-title">
          <div className="wrap">
            <div className="grid">
              <div className="c-4">
                <h2 id="when-title" className="d-s">{lp.whenTitle}</h2>
              </div>
              <div className="c-7 start-6">
                {lp.when.map((w, i) => (
                  <Reveal key={w} delay={i * 60}
                    style={{ paddingBlock: 'var(--s-md)', borderTop: '1px solid var(--c-linha)' }}>
                    <p className="body" style={{ color: 'var(--c-texto)' }}>{w}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Evidência e critérios */}
        <section aria-labelledby="evidence-title">
          <div className="wrap">
            <div className="grid">
              <div className="c-4">
                <span className="kicker">{dict.lp.evidenceKicker}</span>
                <h2 id="evidence-title" className="d-s">{lp.evidenceTitle}</h2>
                <p className="body" style={{ marginTop: 'var(--s-md)' }}>{lp.evidenceLead}</p>
              </div>
              <div className="c-7 start-6">
                {lp.evidence.map((e) => (
                  <div className="evidence-item" key={e.t}>
                    <span className="label">{e.t}</span>
                    <p>{e.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Método de investigação */}
        <MethodSteps dict={dict} titleId="cond-method" />

        {/* Critérios e limitações */}
        <section className="on-tint" aria-labelledby="limits-title">
          <div className="wrap">
            <div className="grid">
              <div className="c-4">
                <span className="kicker">{dict.lp.limitsKicker}</span>
                <h2 id="limits-title" className="d-s">{lp.limitsTitle}</h2>
              </div>
              <div className="c-7 start-6">
                {lp.limits.map((l) => (
                  <div className="evidence-item" key={l}>
                    <p>{l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Formulário concierge */}
        <section id="avaliacao" aria-labelledby="form-title">
          <div className="wrap">
            <div className="grid">
              <div className="c-5">
                <span className="kicker">{dict.lp.formKicker}</span>
                <h2 id="form-title" className="d-s">{dict.lp.formTitle}</h2>
                <p className="body" style={{ marginTop: 'var(--s-md)' }}>{dict.lp.formLead}</p>
                <p className="disclaimer" style={{ marginTop: 'var(--s-xl)' }}>{dict.lp.medicalDisclaimer}</p>
              </div>
              <div className="c-6 start-7">
                <ConciergeForm lang={lang} condition={lp.condition} dict={dict} />
              </div>
            </div>
          </div>
        </section>

        <FaqAccordion title={dict.articles.faqTitle} items={lp.faq} titleId="cond-faq" />

        {/* Condições associadas */}
        <section className="tight" aria-labelledby="related-cond">
          <div className="wrap">
            <h2 id="related-cond" className="d-s">{dict.areasHome.title}</h2>
            <div style={{ marginTop: 'var(--s-lg)' }}>
              {dict.areasHome.items.filter((i) => i.slug !== lp.slug).map((i) => (
                <div className="cond-row" key={i.slug}>
                  <span className="cond-idx" aria-hidden="true" />
                  <div>
                    <h3 className="h-serif"><Link href={langHref(lang, `/condicoes/${i.slug}`)}>{i.t}</Link></h3>
                    <p className="sm" style={{ marginTop: 'var(--s-2xs)' }}>{i.d}</p>
                  </div>
                  <div>
                    <Link className="link-arrow" href={langHref(lang, `/condicoes/${i.slug}`)}>{dict.areasHome.cta}</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <StickyCta lang={lang} dict={dict} />
      <AppFooter lang={lang} dict={dict} />
    </>
  );
}
