import './globals.css';
import { Cormorant_Garamond, Inter } from 'next/font/google';

// Fontes auto-hospedadas pelo Next (sem @import remoto do Google Fonts).
// As variáveis alimentam --font-display / --font-body nos tokens de globals.css.
const displayFont = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600'],
  variable: '--font-display-src',
  display: 'swap',
  fallback: ['Iowan Old Style', 'Georgia', 'serif']
});

const bodyFont = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-body-src',
  display: 'swap',
  fallback: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif']
});

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FBF7F4'
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body>{children}</body>
    </html>
  );
}
