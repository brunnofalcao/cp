import { LANGS, getDictionary } from '../../lib/dictionaries';
import { SITE, altUrls } from '../../lib/site';
import JsonLd, { physicianSchema } from '../../components/JsonLd';

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }) {
  const lang = params.lang;
  const alts = altUrls('/');
  const isPt = lang !== 'en';
  return {
    metadataBase: new URL(SITE.url),
    title: {
      default: isPt
        ? 'Dra. Carine Petry | Investigação Clínica de Alta Complexidade — SAM, SED e Covid Longa'
        : 'Dr. Carine Petry | High-Complexity Clinical Investigation — MCAS, EDS and Long COVID',
      template: isPt ? '%s | Dra. Carine Petry' : '%s | Dr. Carine Petry'
    },
    description: isPt
      ? 'Médica referência em Síndrome de Ativação de Mastócitos (SAM), Síndrome de Ehlers-Danlos (SED) e Covid Longa. Investigação clínica para casos que outros médicos não resolveram. Brasília-DF.'
      : 'Physician and national reference in Mast Cell Activation Syndrome (MCAS), Ehlers-Danlos Syndrome (EDS) and Long COVID. Clinical investigation for unresolved complex cases. Brasília, Brazil.',
    alternates: {
      canonical: isPt ? alts.pt : alts.en,
      languages: { 'pt-BR': alts.pt, en: alts.en, 'x-default': alts.pt }
    },
    openGraph: {
      type: 'website',
      locale: isPt ? 'pt_BR' : 'en_US',
      siteName: 'Dra. Carine Petry'
    },
    robots: { index: true, follow: true }
  };
}

export default function LangLayout({ children, params }) {
  const lang = params.lang;
  return (
    <div lang={lang === 'en' ? 'en' : 'pt-BR'}>
      <JsonLd data={physicianSchema(lang)} />
      {children}
    </div>
  );
}
