'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { langHref } from '../lib/site';
import { track } from '../lib/analytics';
import Brandmark from './Brandmark';

function Icon({ name }) {
  const paths = {
    menu: <><path d="M3 6h18" /><path d="M3 12h18" /><path d="M3 18h18" /></>,
    close: <><path d="M5 5l14 14" /><path d="M19 5L5 19" /></>
  };
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

export default function AppHeader({ lang, dict, currentPath = '/' }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const drawerRef = useRef(null);
  const triggerRef = useRef(null);
  const other = lang === 'pt' ? 'en' : 'pt';

  const nav = [
    { href: '/abordagem', label: dict.nav.approach },
    { href: '/areas', label: dict.nav.areas },
    { href: '/sobre', label: dict.nav.about },
    { href: '/blog', label: dict.nav.content },
    { href: '/contato', label: dict.nav.contact }
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const node = drawerRef.current;
    const focusables = node?.querySelectorAll('a[href], button:not([disabled])');
    focusables?.[0]?.focus();

    function onKey(e) {
      if (e.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }
      if (e.key !== 'Tab' || !focusables?.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const isCurrent = (href) => (currentPath === href || currentPath.startsWith(`${href}/`) ? 'page' : undefined);

  const wordmark = <Brandmark variant="header" lang={lang} dict={dict} />;

  return (
    <>
      <a className="skip-link" href="#main">{dict.a11y.skip}</a>

      <header className="hdr" data-scrolled={scrolled}>
        <div className="hdr-inner">
          {wordmark}

          <nav className="nav-desktop" aria-label={dict.a11y.mainNav}>
            {nav.map((n) => (
              <Link key={n.href} href={langHref(lang, n.href)} aria-current={isCurrent(n.href)}>
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="hdr-actions">
            <Link className="lang-btn" href={langHref(other, currentPath)} hrefLang={other} rel="alternate">
              {other === 'en' ? 'EN' : 'PT'}
            </Link>
            <Link
              className="btn btn-primary hdr-cta"
              href={langHref(lang, '/contato')}
              onClick={() => track('header_cta', { lang })}
            >
              {dict.header.cta}
            </Link>
            <button
              ref={triggerRef}
              className="menu-btn"
              type="button"
              aria-label={dict.a11y.openMenu}
              aria-expanded={open}
              onClick={() => setOpen(true)}
            >
              <Icon name="menu" />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="drawer" ref={drawerRef} role="dialog" aria-modal="true" aria-label={dict.a11y.mainNav}>
          <div className="drawer-head">
            {wordmark}
            <button className="menu-btn" type="button" aria-label={dict.a11y.closeMenu} onClick={() => setOpen(false)}>
              <Icon name="close" />
            </button>
          </div>
          <div className="drawer-body">
            {nav.map((n) => (
              <Link
                key={n.href}
                className="drawer-link"
                href={langHref(lang, n.href)}
                aria-current={isCurrent(n.href)}
                onClick={() => setOpen(false)}
              >
                {n.label}
              </Link>
            ))}
            <div className="drawer-foot">
              <Link
                className="btn btn-primary btn-block"
                href={langHref(lang, '/contato')}
                onClick={() => { track('header_cta', { lang, surface: 'drawer' }); setOpen(false); }}
              >
                {dict.header.cta}
              </Link>
              <p style={{ marginTop: 'var(--s-md)' }}>
                <Link className="lang-btn" href={langHref(other, currentPath)} hrefLang={other} rel="alternate">
                  {other === 'en' ? 'English' : 'Português'}
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
