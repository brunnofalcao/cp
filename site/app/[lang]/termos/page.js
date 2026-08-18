import AppHeader from '../../../components/AppHeader';
import AppFooter from '../../../components/AppFooter';
import Breadcrumbs from '../../../components/Breadcrumbs';
import JsonLd, { breadcrumbSchema } from '../../../components/JsonLd';
import { getDictionary } from '../../../lib/dictionaries';
import { SITE, altUrls } from '../../../lib/site';

// Termos de Uso. Rascunho na identidade do site.
// REVISAR JURIDICAMENTE antes de considerar definitivo.
const CONTENT = {
  pt: {
    label: 'Termos de uso',
    title: 'Termos de Uso',
    updated: 'Última atualização: julho de 2026',
    intro:
      'Ao acessar e utilizar este site, você concorda com os termos abaixo. Leia com atenção antes de continuar navegando ou enviar qualquer informação.',
    sections: [
      { h: 'Natureza do conteúdo', p: 'Todo o conteúdo deste site tem finalidade informativa e educativa. Ele não constitui aconselhamento médico individual, diagnóstico ou prescrição, e não substitui a consulta com um profissional de saúde. Decisões sobre a sua saúde devem ser tomadas em avaliação clínica presencial.' },
      { h: 'Uso dos formulários', p: 'Os formulários destinam-se a solicitar informações sobre a consulta e a receber conteúdo científico. As informações enviadas são tratadas conforme a Política de Privacidade. O envio não estabelece relação médico-paciente nem garante atendimento.' },
      { h: 'Propriedade intelectual', p: 'Textos, artigos, marca, identidade visual e demais materiais são de titularidade de Carine Petry ou licenciados a ela. A reprodução total ou parcial sem autorização é vedada.' },
      { h: 'Conduta do usuário', p: 'É vedado utilizar o site para fins ilícitos, inserir dados falsos, ou tentar comprometer a segurança e o funcionamento da plataforma.' },
      { h: 'Links externos', p: 'O site pode conter links para páginas de terceiros. Não nos responsabilizamos pelo conteúdo ou pelas práticas de privacidade desses sites.' },
      { h: 'Limitação de responsabilidade', p: 'O conteúdo é fornecido no estado em que se encontra. Não há garantia de que a informação se aplique a todos os casos individuais. O uso das informações é de responsabilidade do usuário.' },
      { h: 'Alterações', p: 'Estes Termos podem ser atualizados a qualquer momento. A data no topo indica a versão vigente.' },
      { h: 'Foro', p: `Estes Termos são regidos pela legislação brasileira, elegendo-se o foro da comarca de ${SITE.address.city}-${SITE.address.state} para dirimir eventuais controvérsias.` }
    ],
    review: 'Documento modelo. Recomenda-se revisão por assessoria jurídica antes da publicação definitiva.'
  },
  en: {
    label: 'Terms of use',
    title: 'Terms of Use',
    updated: 'Last updated: July 2026',
    intro:
      'By accessing and using this website, you agree to the terms below. Please read carefully before browsing or submitting any information.',
    sections: [
      { h: 'Nature of the content', p: 'All content on this site is informational and educational. It does not constitute individual medical advice, diagnosis or prescription, and does not replace a consultation with a health professional. Decisions about your health should be made through in-person clinical assessment.' },
      { h: 'Use of forms', p: 'The forms are intended to request information about the consultation and to receive scientific content. Submitted information is handled according to the Privacy Policy. Submission does not establish a doctor-patient relationship nor guarantee care.' },
      { h: 'Intellectual property', p: 'Texts, articles, brand, visual identity and other materials are owned by or licensed to Carine Petry. Total or partial reproduction without authorization is prohibited.' },
      { h: 'User conduct', p: 'You may not use the site for unlawful purposes, submit false data, or attempt to compromise the security and operation of the platform.' },
      { h: 'External links', p: 'The site may contain links to third-party pages. We are not responsible for the content or privacy practices of those sites.' },
      { h: 'Limitation of liability', p: 'Content is provided as is. There is no guarantee that the information applies to every individual case. Use of the information is the user’s responsibility.' },
      { h: 'Changes', p: 'These Terms may be updated at any time. The date at the top indicates the current version.' },
      { h: 'Governing law', p: `These Terms are governed by Brazilian law, with the courts of ${SITE.address.city}-${SITE.address.state} elected to resolve any disputes.` }
    ],
    review: 'Template document. Legal review is recommended before final publication.'
  }
};

export async function generateMetadata({ params }) {
  const lang = params.lang === 'en' ? 'en' : 'pt';
  const t = CONTENT[lang];
  const alts = altUrls('/termos');
  return {
    title: t.title,
    description: t.intro.slice(0, 155),
    alternates: { canonical: lang === 'en' ? alts.en : alts.pt, languages: { 'pt-BR': alts.pt, en: alts.en } },
    robots: { index: true, follow: true }
  };
}

export default function Termos({ params }) {
  const lang = params.lang === 'en' ? 'en' : 'pt';
  const dict = getDictionary(lang);
  const t = CONTENT[lang];
  const crumbs = [
    { name: dict.nav.home, path: '/' },
    { name: t.label, path: '/termos' }
  ];

  return (
    <>
      <AppHeader lang={lang} dict={dict} currentPath="/termos" />
      <JsonLd data={breadcrumbSchema(crumbs, lang)} />

      <main id="main">
        <section className="tight">
          <div className="prose-wrap">
            <Breadcrumbs lang={lang} items={crumbs} />
            <h1 className="d-m" style={{ marginTop: 'var(--s-xl)' }}>{t.title}</h1>
            <p className="cap" style={{ marginTop: 'var(--s-sm)' }}>{t.updated}</p>

            <div className="article-body" style={{ marginTop: 'var(--s-2xl)' }}>
              <p className="lead">{t.intro}</p>
              {t.sections.map((s) => (
                <div key={s.h}>
                  <h2>{s.h}</h2>
                  <p>{s.p}</p>
                </div>
              ))}
              <p className="disclaimer" style={{ marginTop: 'var(--s-2xl)' }}>{t.review}</p>
            </div>
          </div>
        </section>
      </main>

      <AppFooter lang={lang} dict={dict} />
    </>
  );
}
