import Link from 'next/link';
import { langHref } from '../lib/site';

export default function Breadcrumbs({ lang, items }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      {items.map((it, i) => {
        const last = i === items.length - 1;
        return (
          <span key={it.path}>
            {last ? (
              <span aria-current="page">{it.name}</span>
            ) : (
              <>
                <Link href={langHref(lang, it.path)}>{it.name}</Link>
                <span aria-hidden="true" style={{ margin: '0 var(--s-xs)' }}>/</span>
              </>
            )}
          </span>
        );
      })}
    </nav>
  );
}
