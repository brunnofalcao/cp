import AppHeader from '../../../components/AppHeader';
import AppFooter from '../../../components/AppFooter';
import Breadcrumbs from '../../../components/Breadcrumbs';
import JsonLd, { breadcrumbSchema } from '../../../components/JsonLd';
import { getDictionary } from '../../../lib/dictionaries';
import { SITE, altUrls } from '../../../lib/site';

// Política de Privacidade (LGPD). Rascunho na identidade do site.
// REVISAR JURIDICAMENTE antes de considerar definitivo.
const CONTENT = {
  pt: {
    label: 'Privacidade',
    title: 'Política de Privacidade',
    updated: 'Última atualização: julho de 2026',
    intro:
      'Esta Política descreve como os dados pessoais informados neste site são tratados, em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 - LGPD). Ao utilizar os formulários deste site, você concorda com as práticas aqui descritas.',
    sections: [
      { h: 'Quem é o controlador', p: `Os dados são tratados sob responsabilidade de Carine Petry (CRM-DF 15342), com consultório em ${SITE.address.city}-${SITE.address.state}. Para assuntos de privacidade, o contato é ${SITE.email}.` },
      { h: 'Quais dados coletamos', p: 'Coletamos apenas os dados que você fornece voluntariamente nos formulários: nome, e-mail, telefone (opcional), profissão (na newsletter) e as informações que você decide escrever sobre o seu caso. Podemos coletar dados de navegação anônimos (páginas visitadas) para fins estatísticos.' },
      { h: 'Para que usamos', p: 'Os dados de contato são usados para responder à sua solicitação de informações sobre a consulta e, quando autorizado, para enviar conteúdo científico por e-mail. As informações de saúde que você optar por enviar são usadas apenas para compreender o contexto do seu contato inicial. Este site não realiza diagnóstico nem substitui uma consulta médica.' },
      { h: 'Base legal', p: 'O tratamento é feito com base no seu consentimento (art. 7º, I da LGPD), coletado no momento do envio do formulário, e para os procedimentos preliminares relacionados a um possível atendimento (art. 7º, V).' },
      { h: 'Compartilhamento', p: 'Os dados podem ser processados por ferramentas de gestão de contatos e e-mail marketing (operadores), contratadas apenas para viabilizar o atendimento e a comunicação, sem finalidade de venda a terceiros. Dados de saúde recebem tratamento com cuidado reforçado.' },
      { h: 'Seus direitos', p: 'Você pode, a qualquer momento, solicitar confirmação de tratamento, acesso, correção, anonimização, portabilidade, eliminação dos dados e revogação do consentimento, nos termos do art. 18 da LGPD. Basta escrever para o e-mail de contato.' },
      { h: 'Retenção e segurança', p: 'Os dados são mantidos apenas pelo tempo necessário às finalidades acima ou conforme exigência legal, e protegidos por medidas técnicas e administrativas razoáveis contra acesso não autorizado.' },
      { h: 'Cookies', p: 'Este site utiliza apenas recursos essenciais e, quando aplicável, medição estatística anônima. Você pode configurar seu navegador para limitar cookies.' },
      { h: 'Alterações', p: 'Esta Política pode ser atualizada. A data no topo indica a versão vigente.' }
    ],
    review: 'Documento modelo. Recomenda-se revisão por assessoria jurídica antes da publicação definitiva.'
  },
  en: {
    label: 'Privacy',
    title: 'Privacy Policy',
    updated: 'Last updated: July 2026',
    intro:
      'This Policy describes how personal data provided on this website is processed, in accordance with the Brazilian General Data Protection Law (Law 13.709/2018 - LGPD). By using the forms on this site, you agree to the practices described here.',
    sections: [
      { h: 'Data controller', p: `Data is processed under the responsibility of Carine Petry (CRM-DF 15342), with a practice in ${SITE.address.city}-${SITE.address.state}, Brazil. For privacy matters, contact ${SITE.email}.` },
      { h: 'Data we collect', p: 'We only collect data you voluntarily provide in the forms: name, email, phone (optional), profession (newsletter) and any information you choose to write about your case. We may collect anonymous navigation data for statistical purposes.' },
      { h: 'How we use it', p: 'Contact data is used to respond to your request for information about the consultation and, when authorized, to send scientific content by email. Any health information you choose to send is used only to understand the context of your initial contact. This site does not provide diagnosis and does not replace a medical consultation.' },
      { h: 'Legal basis', p: 'Processing is based on your consent (LGPD art. 7, I), collected when you submit the form, and on preliminary procedures related to possible care (art. 7, V).' },
      { h: 'Sharing', p: 'Data may be processed by contact-management and email tools (processors), engaged solely to enable communication, with no purpose of sale to third parties. Health data receives reinforced care.' },
      { h: 'Your rights', p: 'At any time you may request confirmation of processing, access, correction, anonymization, portability, deletion and withdrawal of consent, under LGPD art. 18. Just write to the contact email.' },
      { h: 'Retention and security', p: 'Data is kept only for as long as necessary for the purposes above or as legally required, and protected by reasonable technical and administrative measures.' },
      { h: 'Cookies', p: 'This site uses only essential features and, where applicable, anonymous statistical measurement. You can configure your browser to limit cookies.' },
      { h: 'Changes', p: 'This Policy may be updated. The date at the top indicates the current version.' }
    ],
    review: 'Template document. Legal review is recommended before final publication.'
  }
};

export async function generateMetadata({ params }) {
  const lang = params.lang === 'en' ? 'en' : 'pt';
  const t = CONTENT[lang];
  const alts = altUrls('/privacidade');
  return {
    title: t.title,
    description: t.intro.slice(0, 155),
    alternates: { canonical: lang === 'en' ? alts.en : alts.pt, languages: { 'pt-BR': alts.pt, en: alts.en } },
    robots: { index: true, follow: true }
  };
}

export default function Privacidade({ params }) {
  const lang = params.lang === 'en' ? 'en' : 'pt';
  const dict = getDictionary(lang);
  const t = CONTENT[lang];
  const crumbs = [
    { name: dict.nav.home, path: '/' },
    { name: t.label, path: '/privacidade' }
  ];

  return (
    <>
      <AppHeader lang={lang} dict={dict} currentPath="/privacidade" />
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
