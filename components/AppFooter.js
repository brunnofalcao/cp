import Link from 'next/link';
import { SITE, langHref } from '../lib/site';
import Brandmark from './Brandmark';
import SocialIcon from './SocialIcons';

export default function AppFooter({ lang, dict }) {
  const f = dict.footer;

  const social = [
    { name: 'instagram', label: 'Instagram', href: SITE.instagram },
    { name: 'email', label: 'E-mail', href: SITE.email ? `mailto:${SITE.email}` : '' },
    { name: 'whatsapp', label: 'WhatsApp', href: SITE.whatsappLink },
    { name: 'youtube', label: 'YouTube', href: SITE.youtube }
  ].filter((s) => s.href);

  const areas = dict.areasHome.items.map((i) => ({
    label: i.t,
    href: `/condicoes/${i.slug}`
  }));

  const clinic = [
    { label: dict.nav.approach, href: '/abordagem' },
    { label: dict.nav.about, href: '/sobre' },
    { label: dict.nav.content, href: '/blog' },
    { label: dict.nav.contact, href: '/contato' }
  ];

  return (
    <footer className="ftr">
      <div className="wrap-wide">
        <div className="ftr-grid">
          {/* Bloco de marca */}
          <div className="ftr-brand">
            <Brandmark variant="footer" lang={lang} dict={dict} />
            <p className="ftr-tagline">{f.tagline}</p>
            <div className="ftr-social" aria-label={f.socialLabel}>
              {social.map((s) => (
                <a key={s.name} href={s.href} rel="noopener" aria-label={s.label}
                   target={s.href.startsWith('mailto:') ? undefined : '_blank'}>
                  <SocialIcon name={s.name} />
                </a>
              ))}
            </div>
          </div>

          {/* Colunas de links */}
          <nav className="ftr-col" aria-label={dict.nav.areas}>
            <h4>{dict.nav.areas}</h4>
            <ul>
              {areas.map((a) => (
                <li key={a.href}><Link href={langHref(lang, a.href)}>{a.label}</Link></li>
              ))}
            </ul>
          </nav>

          <nav className="ftr-col" aria-label={f.clinicTitle}>
            <h4>{f.clinicTitle}</h4>
            <ul>
              {clinic.map((c) => (
                <li key={c.href}><Link href={langHref(lang, c.href)}>{c.label}</Link></li>
              ))}
            </ul>
          </nav>

          <nav className="ftr-col" aria-label={f.contactTitle}>
            <h4>{f.contactTitle}</h4>
            <ul>
              <li><a href={SITE.whatsappLink} rel="noopener">WhatsApp</a></li>
              <li>{SITE.phone}</li>
              <li>{SITE.address.city}-{SITE.address.state}</li>
            </ul>
          </nav>
        </div>

        <div className="ftr-legal">
          <p>© {new Date().getFullYear()} Carine Petry · {f.rights}</p>
          <div className="ftr-legal-right">
            <Link href={langHref(lang, '/privacidade')}>{f.privacy}</Link>
            <Link href={langHref(lang, '/termos')}>{f.terms}</Link>
            <span className="ftr-lang">
              <Link href={langHref(lang, '/')} aria-current={lang === 'pt' ? 'true' : undefined}>PT</Link>
              <Link href={langHref('en', '/')} aria-current={lang === 'en' ? 'true' : undefined}>EN</Link>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
