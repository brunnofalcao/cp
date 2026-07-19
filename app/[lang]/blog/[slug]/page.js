import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';
import JsonLd, { articleSchema, faqSchema } from '../../../../components/JsonLd';
import { getDictionary, LANGS } from '../../../../lib/dictionaries';
import { langHref, altUrls } from '../../../../lib/site';
import { getAllPosts, getPost, getPostSlugs } from '../../../../lib/posts';

export function generateStaticParams() {
  const params = [];
  for (const lang of LANGS) {
    for (const slug of getPostSlugs(lang)) {
      params.push({ lang, slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }) {
  const lang = params.lang === 'en' ? 'en' : 'pt';
  const post = getPost(lang, params.slug);
  if (!post) return {};
  const alts = altUrls(`/blog/${params.slug}`);
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: {
      canonical: lang === 'en' ? alts.en : alts.pt,
      languages: { 'pt-BR': alts.pt, en: alts.en }
    },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      publishedTime: post.date
    }
  };
}

export default function Post({ params }) {
  const lang = params.lang === 'en' ? 'en' : 'pt';
  const dict = getDictionary(lang);
  const post = getPost(lang, params.slug);
  if (!post) notFound();

  return (
    <>
      <Header lang={lang} dict={dict} currentPath={`/blog/${post.slug}`} />
      <JsonLd data={articleSchema(post, lang)} />
      {post.faq?.length > 0 && <JsonLd data={faqSchema(post.faq)} />}
      <main>
        <article className="post">
          <p><Link href={langHref(lang, '/blog')}>{dict.blog.backToBlog}</Link></p>
          <p className="cat" style={{ color: 'var(--magenta)', textTransform: 'uppercase', letterSpacing: '0.14em', fontSize: '0.72rem', fontWeight: 700, marginTop: '1.4rem' }}>{post.category}</p>
          <h1>{post.title}</h1>
          <p className="meta">
            Dra. Carine Petry · CRM-DF 15342 · <time dateTime={post.date}>{post.date}</time>
          </p>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
          {post.faq?.length > 0 && (
            <div className="faq-box">
              <h2>{dict.blog.faqTitle}</h2>
              {post.faq.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          )}
          <p className="disclaimer">{dict.blog.disclaimer}</p>
        </article>
      </main>
      <Footer lang={lang} dict={dict} />
    </>
  );
}
