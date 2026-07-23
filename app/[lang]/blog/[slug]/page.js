import Link from 'next/link';
import { notFound } from 'next/navigation';
import AppHeader from '../../../../components/AppHeader';
import AppFooter from '../../../../components/AppFooter';
import Breadcrumbs from '../../../../components/Breadcrumbs';
import ReadingProgress from '../../../../components/ReadingProgress';
import ArticleView from '../../../../components/ArticleView';
import { FaqAccordion, FinalCta, StickyCta } from '../../../../components/sections';
import JsonLd, { articleSchema, faqSchema, breadcrumbSchema } from '../../../../components/JsonLd';
import { getDictionary, LANGS } from '../../../../lib/dictionaries';
import { langHref, altUrls } from '../../../../lib/site';
import { getPost, getPostSlugs, getRelated } from '../../../../lib/posts';

export function generateStaticParams() {
  const params = [];
  for (const lang of LANGS) for (const slug of getPostSlugs(lang)) params.push({ lang, slug });
  return params;
}

export async function generateMetadata({ params }) {
  const lang = params.lang === 'en' ? 'en' : 'pt';
  const post = getPost(lang, params.slug);
  if (!post) return {};
  const alts = altUrls(`/blog/${params.slug}`);
  const url = lang === 'en' ? alts.en : alts.pt;
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: url, languages: { 'pt-BR': alts.pt, en: alts.en } },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      url,
      publishedTime: post.date,
      modifiedTime: post.updated,
      authors: ['Carine Petry']
    },
    twitter: { card: 'summary_large_image', title: post.title, description: post.description }
  };
}

export default function Post({ params }) {
  const lang = params.lang === 'en' ? 'en' : 'pt';
  const dict = getDictionary(lang);
  const post = getPost(lang, params.slug);
  if (!post) notFound();
  const related = getRelated(lang, params.slug);

  const fmt = (d) =>
    new Date(d).toLocaleDateString(lang === 'en' ? 'en-GB' : 'pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });

  const crumbs = [
    { name: dict.nav.home, path: '/' },
    { name: dict.nav.content, path: '/blog' },
    { name: post.title, path: `/blog/${post.slug}` }
  ];

  return (
    <>
      <ReadingProgress />
      <AppHeader lang={lang} dict={dict} currentPath={`/blog/${post.slug}`} />
      <ArticleView slug={post.slug} lang={lang} category={post.category} />
      <JsonLd data={articleSchema(post, lang)} />
      {post.faq?.length > 0 && <JsonLd data={faqSchema(post.faq)} />}
      <JsonLd data={breadcrumbSchema(crumbs, lang)} />

      <main id="main">
        <section className="tight">
          <div className="wrap">
            <Breadcrumbs lang={lang} items={crumbs} />
            <div className="grid" style={{ marginTop: 'var(--s-xl)' }}>
              <div className="c-8">
                <span className="kicker">{post.category}</span>
                <h1 className="d-l">{post.title}</h1>
                <p className="lead" style={{ marginTop: 'var(--s-lg)' }}>{post.description}</p>
              </div>
            </div>

            <div className="grid" style={{ marginTop: 'var(--s-2xl)' }}>
              {/* Coluna lateral de metadados */}
              <aside className="c-3">
                <div style={{ borderTop: '1px solid var(--c-linha)', paddingTop: 'var(--s-md)' }}>
                  <p className="kicker quiet" style={{ marginBottom: 'var(--s-2xs)' }}>{dict.articles.authorLabel}</p>
                  <p className="sm">Carine Petry</p>
                  <p className="cap">CRM-DF 15342</p>

                  <p className="cap" style={{ marginTop: 'var(--s-lg)' }}>
                    <time dateTime={post.date}>{fmt(post.date)}</time>
                  </p>
                  {post.updated !== post.date && (
                    <p className="cap">{dict.articles.updatedLabel} <time dateTime={post.updated}>{fmt(post.updated)}</time></p>
                  )}
                  <p className="cap">{post.readingTime} {dict.articles.readTime}</p>
                </div>
              </aside>

              <div className="c-8 start-5">
                <div className="article-body" dangerouslySetInnerHTML={{ __html: post.html }} />

                {post.references?.length > 0 && (
                  <div style={{ marginTop: 'var(--s-2xl)', borderTop: '1px solid var(--c-linha)', paddingTop: 'var(--s-lg)' }}>
                    <h2 className="kicker quiet">{dict.articles.referencesTitle}</h2>
                    <ol className="sm" style={{ paddingLeft: 'var(--s-lg)' }}>
                      {post.references.map((r) => (
                        <li key={r.title} style={{ marginTop: 'var(--s-xs)' }}>
                          {r.url ? <a className="link" href={r.url} rel="noopener">{r.title}</a> : r.title}
                          {r.source && <span className="cap"> · {r.source}</span>}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                <p className="disclaimer" style={{ marginTop: 'var(--s-2xl)' }}>{dict.articles.disclaimer}</p>
              </div>
            </div>
          </div>
        </section>

        {post.faq?.length > 0 && (
          <FaqAccordion title={dict.articles.faqTitle} items={post.faq} titleId="article-faq" />
        )}

        {related.length > 0 && (
          <section className="tight" aria-labelledby="related-title">
            <div className="wrap">
              <h2 id="related-title" className="d-s">{dict.articles.related}</h2>
              <div style={{ marginTop: 'var(--s-lg)' }}>
                {related.map((r) => (
                  <article className="article-row" key={r.slug}>
                    <p className="article-meta">
                      <span className="tag">{r.category}</span>
                      <time dateTime={r.date}>{fmt(r.date)}</time>
                    </p>
                    <div>
                      <h3 className="h-serif"><Link href={langHref(lang, `/blog/${r.slug}`)}>{r.title}</Link></h3>
                      <p className="sm" style={{ marginTop: 'var(--s-2xs)', maxWidth: '62ch' }}>{r.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        <FinalCta lang={lang} dict={dict} />
      </main>

      <StickyCta lang={lang} dict={dict} />
      <AppFooter lang={lang} dict={dict} />
    </>
  );
}
