import { NextResponse } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // English namespace: rewrite /en/* -> /[lang=en]/*
  if (pathname === '/en' || pathname.startsWith('/en/')) {
    const rest = pathname.replace(/^\/en/, '') || '/';
    const url = request.nextUrl.clone();
    url.pathname = `/en${rest === '/' ? '' : rest}`;
    // pathname already matches app/[lang] when lang segment = 'en'
    return NextResponse.next();
  }

  // First visit to root: auto-redirect English browsers to /en (AEO/UX)
  const langCookie = request.cookies.get('lang')?.value;
  if (!langCookie) {
    const accept = request.headers.get('accept-language') || '';
    const prefersEnglish = /^en\b/i.test(accept.split(',')[0] || '');
    if (prefersEnglish) {
      const url = request.nextUrl.clone();
      url.pathname = `/en${pathname === '/' ? '' : pathname}`;
      const res = NextResponse.redirect(url);
      res.cookies.set('lang', 'en', { maxAge: 60 * 60 * 24 * 365, path: '/' });
      return res;
    }
  }

  // Portuguese (default, clean URLs): rewrite /* -> /pt/*
  const url = request.nextUrl.clone();
  url.pathname = `/pt${pathname === '/' ? '' : pathname}`;
  const res = NextResponse.rewrite(url);
  if (!langCookie) {
    res.cookies.set('lang', 'pt', { maxAge: 60 * 60 * 24 * 365, path: '/' });
  }
  return res;
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico|.*\\..*).*)']
};
