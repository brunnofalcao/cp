export default function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function physicianSchema(lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    name: 'Dra. Carine Petry',
    url: 'https://carinepetry.com.br',
    medicalSpecialty: ['SleepMedicine', 'InternalMedicine'],
    description:
      lang === 'pt'
        ? 'Médica (CRM-DF 15342) especializada em Investigação Clínica de Alta Complexidade: Síndrome de Ativação de Mastócitos (SAM), Síndrome de Ehlers-Danlos (SED) e Covid Longa. Especialista em Medicina do Sono.'
        : 'Physician (CRM-DF 15342, Brazil) specialized in High-Complexity Clinical Investigation: Mast Cell Activation Syndrome (MCAS), Ehlers-Danlos Syndrome (EDS) and Long COVID. Sleep Medicine specialist.',
    telephone: '+55-61-3263-7721',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Centro Médico Lucio Costa - Bloco I / T-56, SGAS 610/611 - Via L2 Sul',
      addressLocality: 'Brasília',
      addressRegion: 'DF',
      postalCode: '70200-700',
      addressCountry: 'BR'
    },
    sameAs: ['https://www.instagram.com/dracarine.petry/']
  };
}

export function articleSchema(post, lang) {
  const base = 'https://carinepetry.com.br';
  const url = lang === 'en' ? `${base}/en/blog/${post.slug}` : `${base}/blog/${post.slug}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    mainEntityOfPage: url,
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    inLanguage: lang === 'en' ? 'en' : 'pt-BR',
    author: {
      '@type': 'Physician',
      name: 'Dra. Carine Petry',
      url: base
    },
    publisher: { '@type': 'Person', name: 'Dra. Carine Petry' }
  };
}

export function conditionSchema(lp, lang) {
  const base = 'https://carinepetry.com.br';
  const url = lang === 'en' ? `${base}/en/condicoes/${lp.slug}` : `${base}/condicoes/${lp.slug}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    mainEntityOfPage: url,
    name: lp.title,
    description: lp.metaDesc,
    inLanguage: lang === 'en' ? 'en' : 'pt-BR',
    specialty: 'https://schema.org/SleepMedicine',
    about: {
      '@type': 'MedicalCondition',
      name: lp.condition,
      signOrSymptom: lp.symptoms.map((s) => ({ '@type': 'MedicalSymptom', name: s }))
    },
    author: { '@type': 'Physician', name: 'Dra. Carine Petry', url: base },
    reviewedBy: { '@type': 'Physician', name: 'Dra. Carine Petry', url: base }
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
