import { SITE } from '../lib/site';

export default function Footer({ lang, dict }) {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="cols">
          <div>
            <h4>Dra. Carine Petry</h4>
            <p>{dict.footer.credentials}</p>
          </div>
          <div>
            <h4>{dict.contact.addressTitle}</h4>
            <p>
              {SITE.address.line1}<br />
              {SITE.address.line2}<br />
              {SITE.address.city}-{SITE.address.state}, CEP {SITE.address.zip}
            </p>
          </div>
          <div>
            <h4>{dict.nav.contact}</h4>
            <p>
              {dict.contact.phone}: {SITE.phone}<br />
              WhatsApp: <a href={SITE.whatsappLink}>{SITE.whatsapp}</a><br />
              <a href={SITE.instagram} rel="noopener">Instagram @dracarine.petry</a>
            </p>
          </div>
        </div>
        <div className="legal">
          © {new Date().getFullYear()} Dra. Carine Petry · {SITE.crm} · {dict.footer.rights}
        </div>
      </div>
    </footer>
  );
}
