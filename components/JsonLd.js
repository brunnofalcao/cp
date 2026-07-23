import { SITE } from '../lib/site';

export default function JsonLd({ data }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

const PHYSICIAN_REF = { '@type': 'Physician', name: 'Carine Petry', url: SITE.url };

export function physicianSchema(lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    '@id': `${SITE.url}/#physician`,
    name: 'Carine Petry',
    url: SITE.url,
    medicalSpecialty: 'https://schema.org/SleepMedicine',
    description:
      lang === 'en'
        ? 'Physician (CRM-DF 15342, Brazil), Sleep Medicine specialist, dedicated to the clinical investigation of multisystem and underdiagnosed presentations: Mast Cell Activation Syndrome, Ehlers-Danlos Syndrome and Long COVID.'
        : 'Médica (CRM-DF 15342), especialista em Medicina do Sono, dedicada à investigação clínica de quadros multissistêmicos e subdiagnosticados: Síndrome de Ativação de Mastócitos, Síndrome de Ehlers-Danlos e Covid Longa.',
    telephone: '+55-61-3263-7721',
    image: `${SITE.url}/og-default.jpg`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${SITE.address.line1}, ${SITE.address.line2}`,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.state,
      postalCode: SITE.address.zip,
      addressCountry: 'BR'
    },
    knowsAbout: [
      lang === 'en' ? 'Mast Cell Activation Syndrome' : 'Síndrome de Ativação de Mastócitos',
      lang === 'en' ? 'Ehlers-Danlos Syndrome' : 'Síndrome de Ehlers-Danlos',
      lang === 'en' ? 'Long COVID' : 'Covid Longa',
      lang === 'en' ? 'Sleep Medicine' : 'Medicina do Sono',
      lang === 'en' ? 'Dysautonomia' : 'Disautonomia'
    ],
    sameAs: [SITE.instagram]
  };
}

export function websiteSchema(lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE.url}/#website`,
    url: SITE.url,
    name: 'Carine Petry',
    inLanguage: lang === 'en' ? 'en' : 'pt-BR',
    publisher: { '@id': `${SITE.url}/#physician` },
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${SITE.url}/blog?q={search_term_string}` },
      'query-input': 'required name=search_term_string'
    }
  };
}

export function articleSchema(post, lang) {
  const url = lang === 'en' ? `${SITE.url}/en/blog/${post.slug}` : `${SITE.url}/blog/${post.slug}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    '@id': url,
    mainEntityOfPage: url,
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated || post.date,
    inLanguage: lang === 'en' ? 'en' : 'pt-BR',
    specialty: 'https://schema.org/SleepMedicine',
    author: PHYSICIAN_REF,
    reviewedBy: PHYSICIAN_REF,
    lastReviewed: post.updated || post.date,
    publisher: { '@type': 'Person', name: 'Carine Petry' },
    image: `${SITE.url}/og-default.jpg`,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '.lead', '.faq summary', '.faq details p']
    }
  };
}

export function conditionSchema(lp, lang) {
  const url = lang === 'en' ? `${SITE.url}/en/condicoes/${lp.slug}` : `${SITE.url}/condicoes/${lp.slug}`;
  const symptoms = (lp.systems || []).flatMap((s) => s.items);
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    '@id': url,
    mainEntityOfPage: url,
    name: lp.title,
    description: lp.metaDesc,
    inLanguage: lang === 'en' ? 'en' : 'pt-BR',
    specialty: 'https://schema.org/SleepMedicine',
    about: {
      '@type': 'MedicalCondition',
      name: lp.condition,
      signOrSymptom: symptoms.map((s) => ({ '@type': 'MedicalSymptom', name: s }))
    },
    author: PHYSICIAN_REF,
    reviewedBy: PHYSICIAN_REF
  };
}

export function faqSchema(faq) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a }
    }))
  };
}

export function breadcrumbSchema(items, lang) {
  const base = lang === 'en' ? `${SITE.url}/en` : SITE.url;
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${base}${it.path === '/' ? '' : it.path}`
    }))
  };
}
