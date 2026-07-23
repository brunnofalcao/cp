import Link from 'next/link';
import { SITE, langHref } from '../lib/site';

/**
 * Marca oficial. Usa a logomarca real da Carine (Cloudinary, extraída do brandbook v2.0):
 * - header: versão principal colorida (fundo claro)
 * - footer: versão negativa (fundo escuro)
 *
 * Para self-hostar depois: baixe os PNG/SVG para public/logo/ e troque src por caminho local.
 * As URLs ficam centralizadas em lib/site.js (SITE.logo).
 *
 * variant: 'header' | 'footer'
 */
export default function Brandmark({ variant = 'header', lang = 'pt', dict }) {
  const src = variant === 'footer' ? SITE.logo.negativo : SITE.logo.principal;

  return (
    <Link href={langHref(lang, '/')} className={`brandmark brandmark-${variant}`} aria-label="Carine Petry">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="brand-logo" src={src} alt="Carine Petry" />
    </Link>
  );
}
