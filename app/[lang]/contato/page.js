import AppHeader from '../../../components/AppHeader';
import AppFooter from '../../../components/AppFooter';
import Breadcrumbs from '../../../components/Breadcrumbs';
import EditorialImage from '../../../components/EditorialImage';
import ConciergeForm from '../../../components/ConciergeForm';
import CtaLink from '../../../components/CtaLink';
import { MethodSteps } from '../../../components/sections';
import JsonLd, { breadcrumbSchema } from '../../../components/JsonLd';
import { getDictionary } from '../../../lib/dictionaries';
import { SITE, altUrls } from '../../../lib/site';

export async function generateMetadata({ params }) {
  const lang = params.lang === 'en' ? 'en' : 'pt';
  const alts = altUrls('/contato');
  const isPt = lang === 'pt';
  return {
    title: isPt ? 'Contato' : 'Contact',
    description: isPt
      ? 'Solicite informações sobre a consulta. Consultório no Centro Médico Lucio Costa, Asa Sul, Brasília-DF.'
      : 'Request information about the consultation. Practice at Centro Médico Lucio Costa, Asa Sul, Brasília, Brazil.',
    alternates: { canonical: isPt ? alts.pt : alts.en, languages: { 'pt-BR': alts.pt, en: alts.en } }
  };
}

export default function Contato({ params }) {
  const lang = params.lang === 'en' ? 'en' : 'pt';
  const dict = getDictionary(lang);
  const c = dict.contact;
  const crumbs = [
    { name: dict.nav.home, path: '/' },
    { name: dict.nav.contact, path: '/contato' }
  ];

  return (
    <>
      <AppHeader lang={lang} dict={dict} currentPath="/contato" />
      <JsonLd data={breadcrumbSchema(crumbs, lang)} />

      <main id="main">
        {/* Explicação do primeiro contato + formulário */}
        <section className="tight">
          <div className="wrap">
            <Breadcrumbs lang={lang} items={crumbs} />
            <div className="grid" style={{ marginTop: 'var(--s-xl)' }}>
              <div className="c-5">
                <span className="kicker">{c.kicker}</span>
                <h1 className="d-l">{c.title}</h1>
                <p className="lead" style={{ marginTop: 'var(--s-lg)' }}>{c.lead}</p>

                <div style={{ marginTop: 'var(--s-2xl)', borderTop: '1px solid var(--c-linha)', paddingTop: 'var(--s-lg)' }}>
                  <p className="kicker quiet" style={{ marginBottom: 'var(--s-xs)' }}>{c.whatsapp}</p>
                  <p className="sm">{c.whatsappNote}</p>
                  <p style={{ marginTop: 'var(--s-sm)' }}>
                    <CtaLink className="btn btn-secondary" href={SITE.whatsappLink} event="whatsapp_click" lang={lang} external>
                      {c.cta}
                    </CtaLink>
                  </p>
                </div>

                <div style={{ marginTop: 'var(--s-xl)', borderTop: '1px solid var(--c-linha)', paddingTop: 'var(--s-lg)' }}>
                  <p className="kicker quiet" style={{ marginBottom: 'var(--s-xs)' }}>{c.phone}</p>
                  <p className="sm">{SITE.phone}</p>
                </div>

                <p className="disclaimer" style={{ marginTop: 'var(--s-xl)' }}>{dict.lp.medicalDisclaimer}</p>
              </div>

              <div className="c-6 start-7">
                <ConciergeForm lang={lang} condition="" dict={dict} />
              </div>
            </div>
          </div>
        </section>

        {/* Endereço e logística */}
        <section className="on-tint" aria-labelledby="address-title">
          <div className="wrap">
            <div className="grid">
              <div className="c-5">
                <h2 id="address-title" className="d-s">{c.addressTitle}</h2>
                <p className="body" style={{ marginTop: 'var(--s-md)' }}>
                  {SITE.address.line1}<br />
                  {SITE.address.line2}<br />
                  {SITE.address.city}-{SITE.address.state}, CEP {SITE.address.zip}
                </p>

                <div style={{ marginTop: 'var(--s-xl)' }}>
                  <p className="kicker quiet" style={{ marginBottom: 'var(--s-xs)' }}>{c.logisticsTitle}</p>
                  <p className="pending">{c.logistics}</p>
                </div>
              </div>

              <div className="c-6 start-7">
                <EditorialImage
                  id="IMG-08"
                  ratio="4 / 3"
                  sizes="(max-width: 1024px) 100vw, 46vw"
                  tag="Recepção · entrada"
                  brief="Recepção ou entrada do consultório, luz natural, sem pessoas. Ajuda o paciente a reconhecer o local."
                  px="2000 × 1500"
                  alt=""
                />
              </div>
            </div>
          </div>
        </section>

        <MethodSteps dict={dict} titleId="contact-method" />
      </main>

      <AppFooter lang={lang} dict={dict} />
    </>
  );
}
