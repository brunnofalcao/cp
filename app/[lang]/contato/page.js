import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { getDictionary } from '../../../lib/dictionaries';
import { SITE, altUrls } from '../../../lib/site';

export async function generateMetadata({ params }) {
  const lang = params.lang === 'en' ? 'en' : 'pt';
  const alts = altUrls('/contato');
  return {
    title: lang === 'en' ? 'Contact and scheduling' : 'Contato e agendamento',
    description:
      lang === 'en'
        ? 'Schedule a consultation with Dr. Carine Petry in Brasília, Brazil. Phone, WhatsApp and address.'
        : 'Agende uma consulta com a Dra. Carine Petry em Brasília-DF. Telefone, WhatsApp e endereço.',
    alternates: {
      canonical: lang === 'en' ? alts.en : alts.pt,
      languages: { 'pt-BR': alts.pt, en: alts.en }
    }
  };
}

export default function Contato({ params }) {
  const lang = params.lang === 'en' ? 'en' : 'pt';
  const dict = getDictionary(lang);
  return (
    <>
      <Header lang={lang} dict={dict} currentPath="/contato" />
      <main>
        <section className="block">
          <div className="container">
            <h2 style={{ fontSize: 'clamp(2rem,4.5vw,2.8rem)' }}>{dict.contact.title}</h2>
            <div className="grid-3" style={{ marginTop: '2rem' }}>
              <div className="card">
                <h3>{dict.contact.phone}</h3>
                <p>{SITE.phone}</p>
              </div>
              <div className="card">
                <h3>{dict.contact.whatsapp}</h3>
                <p>{SITE.whatsapp}</p>
                <p style={{ marginTop: '1rem' }}>
                  <a className="btn btn-primary" href={SITE.whatsappLink}>{dict.contact.cta}</a>
                </p>
              </div>
              <div className="card">
                <h3>{dict.contact.addressTitle}</h3>
                <p>
                  {SITE.address.line1}<br />
                  {SITE.address.line2}<br />
                  {SITE.address.city}-{SITE.address.state}, CEP {SITE.address.zip}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer lang={lang} dict={dict} />
    </>
  );
}
