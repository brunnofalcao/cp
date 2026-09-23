import AppHeader from '../../../components/AppHeader';
import AppFooter from '../../../components/AppFooter';
import Breadcrumbs from '../../../components/Breadcrumbs';
import Reveal from '../../../components/Reveal';
import CtaLink from '../../../components/CtaLink';
import JsonLd, { breadcrumbSchema } from '../../../components/JsonLd';
import { getDictionary } from '../../../lib/dictionaries';
import { SITE, altUrls } from '../../../lib/site';

export async function generateMetadata({ params }) {
  const lang = params.lang === 'en' ? 'en' : 'pt';
  const isPt = lang === 'pt';
  const alts = altUrls('/palestras');
  return {
    title: isPt ? 'Palestras' : 'Talks',
    description: isPt
      ? 'Palestras e aulas da Dra. Carine Petry sobre Síndrome de Ativação de Mastócitos, Ehlers-Danlos, disautonomia, Covid longa e sono. Convites para congressos e eventos.'
      : 'Talks and lectures by Dr. Carine Petry on Mast Cell Activation Syndrome, Ehlers-Danlos, dysautonomia, Long COVID and sleep. Invitations for congresses and events.',
    alternates: { canonical: isPt ? alts.pt : alts.en, languages: { 'pt-BR': alts.pt, en: alts.en } }
  };
}

export default function Palestras({ params }) {
  const lang = params.lang === 'en' ? 'en' : 'pt';
  const dict = getDictionary(lang);
  const t = dict.talks;
  const crumbs = [
    { name: dict.nav.home, path: '/' },
    { name: dict.nav.talks, path: '/palestras' }
  ];
  const invite = `${SITE.whatsappLink}?text=${encodeURIComponent(
    lang === 'en' ? 'Hello, I would like to invite Dr. Carine Petry for a talk.' : 'Olá, gostaria de convidar a Dra. Carine Petry para uma palestra.'
  )}`;

  return (
    <>
      <AppHeader lang={lang} dict={dict} currentPath="/palestras" />
      <JsonLd data={breadcrumbSchema(crumbs, lang)} />

      <main id="main">
        <section className="tight">
          <div className="wrap">
            <Breadcrumbs lang={lang} items={crumbs} />
            <div className="grid" style={{ marginTop: 'var(--s-xl)', alignItems: 'end' }}>
              <div className="c-7">
                <span className="kicker">{t.kicker}</span>
                <h1 className="d-l">{t.title}</h1>
              </div>
              <div className="c-4 start-9">
                <p className="lead">{t.lead}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="on-tint" aria-labelledby="themes-title">
          <div className="wrap">
            <div className="grid">
              <Reveal className="c-4">
                <h2 id="themes-title" className="d-s">{t.themesTitle}</h2>
              </Reveal>
              <Reveal className="c-7 start-6" delay={80}>
                {t.themes.map((th) => (
                  <div className="evidence-item" key={th.t}>
                    <span className="label">{th.t}</span>
                    <p>{th.d}</p>
                  </div>
                ))}
              </Reveal>
            </div>
          </div>
        </section>

        <section aria-labelledby="formats-title">
          <div className="wrap">
            <div className="grid">
              <div className="c-4">
                <h2 id="formats-title" className="d-s">{t.formatsTitle}</h2>
              </div>
              <div className="c-7 start-6">
                <p className="lead">{t.formats}</p>
                <p className="pending" style={{ marginTop: 'var(--s-lg)' }}>{t.pending}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="on-dark" aria-labelledby="invite-title">
          <div className="wrap">
            <div className="grid" style={{ alignItems: 'center' }}>
              <div className="c-6">
                <h2 id="invite-title" className="d-m">{t.ctaTitle}</h2>
                <p className="lead" style={{ marginTop: 'var(--s-md)' }}>{t.ctaLead}</p>
              </div>
              <div className="c-4 start-9">
                <CtaLink className="btn btn-primary btn-block" href={invite} event="talk_invite" lang={lang} external>
                  {t.cta}
                </CtaLink>
              </div>
            </div>
          </div>
        </section>
      </main>

      <AppFooter lang={lang} dict={dict} />
    </>
  );
}
