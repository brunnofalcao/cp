import { LANGS } from '../../lib/dictionaries';
import { SITE, altUrls } from '../../lib/site';
import JsonLd, { physicianSchema, websiteSchema } from '../../components/JsonLd';

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }) {
  const lang = params.lang;
  const isPt = lang !== 'en';
  const alts = altUrls('/');

  const title = isPt
    ? 'Carine Petry | Investigação clínica de alta complexidade'
    : 'Carine Petry | High-complexity clinical investigation';
  const description = isPt
    ? 'Abordagem médica aprofundada para sintomas multissistêmicos. Investigação clínica em Síndrome de Ativação de Mastócitos, Ehlers-Danlos, Covid Longa e Medicina do Sono. Brasília-DF.'
    : 'An in-depth medical approach to multisystem symptoms. Clinical investigation in Mast Cell Activation Syndrome, Ehlers-Danlos, Long COVID and Sleep Medicine. Brasília, Brazil.';

  return {
    metadataBase: new URL(SITE.url),
    title: { default: title, template: '%s | Carine Petry' },
    description,
    authors: [{ name: 'Carine Petry' }],
    alternates: {
      canonical: isPt ? alts.pt : alts.en,
      languages: { 'pt-BR': alts.pt, en: alts.en, 'x-default': alts.pt }
    },
    openGraph: {
      type: 'website',
      locale: isPt ? 'pt_BR' : 'en_US',
      siteName: 'Carine Petry',
      title,
      description,
      url: isPt ? alts.pt : alts.en,
      images: [{
        url: '/og-default.jpg',
        width: 1200,
        height: 630,
        alt: isPt
          ? 'Carine Petry, médica especialista em investigação clínica de alta complexidade'
          : 'Carine Petry, physician specialized in high-complexity clinical investigation'
      }]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-default.jpg']
    },
    icons: {
      icon: [{ url: SITE.logo.icone }, { url: '/favicon.ico' }],
      apple: SITE.logo.icone
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 }
    }
  };
}

export default function LangLayout({ children, params }) {
  const lang = params.lang;
  return (
    <div lang={lang === 'en' ? 'en' : 'pt-BR'}>
      <JsonLd data={physicianSchema(lang)} />
      <JsonLd data={websiteSchema(lang)} />
      {children}
    </div>
  );
}
