import SocialIcon from '../../components/SocialIcons';
import { SITE } from '../../lib/site';
import { altUrls } from '../../lib/site';

const T = {
  pt: {
    kicker: 'Investigação clínica de alta complexidade',
    title: 'Em breve',
    lead: 'Um novo espaço para a medicina que escuta, integra e investiga.',
    sub: 'Enquanto cada detalhe é preparado, você já pode acompanhar por aqui.',
    cred: 'Dra. Carine Petry · CRM-DF 15342 · Medicina do Sono · Brasília',
    metaTitle: 'Carine Petry | Em breve',
    metaDesc:
      'Em breve, um novo espaço dedicado à investigação clínica de quadros multissistêmicos e condições frequentemente subdiagnosticadas. Medicina do Sono em Brasília.'
  },
  en: {
    kicker: 'High-complexity clinical investigation',
    title: 'Coming soon',
    lead: 'A new space for medicine that listens, integrates and investigates.',
    sub: 'While every detail is being prepared, you can already follow along here.',
    cred: 'Carine Petry, MD · CRM-DF 15342 · Sleep Medicine · Brasília, Brazil',
    metaTitle: 'Carine Petry | Coming soon',
    metaDesc:
      'Coming soon, a new space dedicated to the clinical investigation of multisystem and frequently underdiagnosed conditions. Sleep Medicine in Brasília, Brazil.'
  }
};

export async function generateMetadata({ params }) {
  const lang = params.lang === 'en' ? 'en' : 'pt';
  const t = T[lang];
  const alts = altUrls('/');
  const url = lang === 'en' ? alts.en : alts.pt;
  return {
    title: t.metaTitle,
    description: t.metaDesc,
    alternates: { canonical: url, languages: { 'pt-BR': alts.pt, en: alts.en, 'x-default': alts.pt } },
    openGraph: { type: 'website', title: t.metaTitle, description: t.metaDesc, url, images: ['/og-default.jpg'] },
    twitter: { card: 'summary_large_image', title: t.metaTitle, description: t.metaDesc, images: ['/og-default.jpg'] },
    robots: { index: true, follow: true }
  };
}

export default function ComingSoon({ params }) {
  const lang = params.lang === 'en' ? 'en' : 'pt';
  const t = T[lang];

  return (
    <main id="main" className="soon">
      <div className="soon-inner">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="soon-logo" src={SITE.logo.negativo} alt="Carine Petry" />
        <span className="soon-kicker">{t.kicker}</span>
        <h1 className="soon-title">{t.title}</h1>
        <div className="soon-rule" aria-hidden="true" />
        <p className="soon-lead">{t.lead}</p>
        <p className="soon-sub">{t.sub}</p>
        <div className="soon-social" aria-label={lang === 'en' ? 'Social networks' : 'Redes sociais'}>
          {SITE.instagram && (
            <a href={SITE.instagram} target="_blank" rel="noopener" aria-label="Instagram">
              <SocialIcon name="instagram" />
            </a>
          )}
          {SITE.whatsappLink && (
            <a href={SITE.whatsappLink} target="_blank" rel="noopener" aria-label="WhatsApp">
              <SocialIcon name="whatsapp" />
            </a>
          )}
        </div>
        <p className="soon-cred">{t.cred}</p>
      </div>
    </main>
  );
}
