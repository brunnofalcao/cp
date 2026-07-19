import Link from 'next/link';
import { langHref } from '../lib/site';

export default function Header({ lang, dict, currentPath = '/' }) {
  const other = lang === 'pt' ? 'en' : 'pt';
  const otherHref = langHref(other, currentPath);
  return (
    <header className="site-header">
      <div className="inner">
        <Link href={langHref(lang, '/')} style={{ textDecoration: 'none' }}>
          <span className="brand">
            Dra. Carine Petry
            <small>{lang === 'pt' ? 'Investigação Clínica de Alta Complexidade' : 'High-Complexity Clinical Investigation'}</small>
          </span>
        </Link>
        <nav className="main-nav" aria-label="Main">
          <Link className="hide-m" href={langHref(lang, '/sobre')}>{dict.nav.about}</Link>
          <Link href={langHref(lang, '/areas')}>{dict.nav.areas}</Link>
          <Link href={langHref(lang, '/blog')}>{dict.nav.blog}</Link>
          <Link href={langHref(lang, '/contato')}>{dict.nav.contact}</Link>
          <Link className="lang-switch" href={otherHref} hrefLang={other} rel="alternate">
            {other === 'en' ? 'EN' : 'PT'}
          </Link>
        </nav>
      </div>
    </header>
  );
}
