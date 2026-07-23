'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import EditorialImage from './EditorialImage';
import { langHref } from '../lib/site';

export default function BlogIndex({ lang, dict, posts, categories }) {
  const [cat, setCat] = useState('');
  const [q, setQ] = useState('');

  const fmt = (d) =>
    new Date(d).toLocaleDateString(lang === 'en' ? 'en-GB' : 'pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return posts.filter((p) => {
      const okCat = !cat || p.category === cat;
      const okTerm = !term || `${p.title} ${p.description} ${p.category}`.toLowerCase().includes(term);
      return okCat && okTerm;
    });
  }, [posts, cat, q]);

  const [lead, ...rest] = filtered;
  const allLabel = lang === 'en' ? 'All' : 'Todos';
  const searchLabel = lang === 'en' ? 'Search articles' : 'Buscar artigos';
  const emptyLabel = lang === 'en' ? 'No articles match this filter.' : 'Nenhum artigo corresponde a este filtro.';

  return (
    <>
      <section className="flush" aria-label={searchLabel}>
        <div className="wrap">
          <div
            style={{
              display: 'flex', flexWrap: 'wrap', gap: 'var(--s-md)', alignItems: 'center',
              justifyContent: 'space-between', paddingBlock: 'var(--s-lg)',
              borderTop: '1px solid var(--c-linha)', borderBottom: '1px solid var(--c-linha)'
            }}
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--s-md)' }}>
              <button
                type="button"
                onClick={() => setCat('')}
                aria-pressed={cat === ''}
                style={filterStyle(cat === '')}
              >
                {allLabel}
              </button>
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCat(c === cat ? '' : c)}
                  aria-pressed={cat === c}
                  style={filterStyle(cat === c)}
                >
                  {c}
                </button>
              ))}
            </div>

            <div style={{ minWidth: '220px' }}>
              <label className="sr-only" htmlFor="blog-search">{searchLabel}</label>
              <input
                id="blog-search"
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={searchLabel}
                style={{
                  width: '100%', minHeight: 'var(--touch-min)', padding: '0 var(--s-md)',
                  background: 'var(--c-branco)', border: '1px solid var(--c-linha-forte)',
                  borderRadius: 'var(--r-xs)', font: 'var(--t-body-sm)'
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          {filtered.length === 0 && <p className="lead">{emptyLabel}</p>}

          {lead && (
            <div className="feature">
              <EditorialImage
                id="IMG-12"
                ratio="16 / 10"
                sizes="(max-width: 768px) 100vw, 45vw"
                tag="Artigo em destaque · blog"
                brief="Fotografia de contexto ou gráfico científico sóbrio do artigo mais recente."
                px="1920 × 1200"
                alt=""
              />
              <div>
                <p className="article-meta">
                  <span className="tag">{lead.category}</span>
                  <time dateTime={lead.date}>{fmt(lead.date)}</time>
                  <span>{lead.readingTime} {dict.articles.readTime}</span>
                </p>
                <h2 className="d-s" style={{ marginTop: 'var(--s-sm)' }}>
                  <Link href={langHref(lang, `/blog/${lead.slug}`)}>{lead.title}</Link>
                </h2>
                <p className="body" style={{ marginTop: 'var(--s-sm)' }}>{lead.description}</p>
                <p style={{ marginTop: 'var(--s-md)' }}>
                  <Link className="link-arrow" href={langHref(lang, `/blog/${lead.slug}`)}>{dict.articles.readMore}</Link>
                </p>
              </div>
            </div>
          )}

          <div style={{ marginTop: 'var(--s-2xl)' }}>
            {rest.map((p) => (
              <article className="article-row" key={p.slug}>
                <p className="article-meta">
                  <span className="tag">{p.category}</span>
                  <time dateTime={p.date}>{fmt(p.date)}</time>
                  <span>{p.readingTime} {dict.articles.readTime}</span>
                </p>
                <div>
                  <h2 className="h-serif"><Link href={langHref(lang, `/blog/${p.slug}`)}>{p.title}</Link></h2>
                  <p className="sm" style={{ marginTop: 'var(--s-2xs)', maxWidth: '64ch' }}>{p.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function filterStyle(active) {
  return {
    background: 'none',
    border: 0,
    cursor: 'pointer',
    font: 'var(--t-body-sm)',
    color: active ? 'var(--c-borgonha)' : 'var(--c-grafite-claro)',
    borderBottom: `1px solid ${active ? 'var(--c-borgonha)' : 'transparent'}`,
    paddingBottom: '2px',
    minHeight: '32px'
  };
}
