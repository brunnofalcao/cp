import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { getDictionary } from '../../lib/dictionaries';
import { SITE, langHref } from '../../lib/site';
import { getAllPosts } from '../../lib/posts';

export default function Home({ params }) {
  const lang = params.lang === 'en' ? 'en' : 'pt';
  const dict = getDictionary(lang);
  const posts = getAllPosts(lang).slice(0, 3);

  return (
    <>
      <Header lang={lang} dict={dict} currentPath="/" />
      <main>
        <section className="hero">
          <div className="container">
            <p className="kicker">{dict.hero.kicker}</p>
            <h1>{dict.hero.title}</h1>
            <p>{dict.hero.subtitle}</p>
            <div className="actions">
              <a className="btn btn-primary" href={SITE.whatsappLink}>{dict.hero.cta}</a>
              <Link className="btn btn-ghost" href={langHref(lang, '/areas')}>{dict.hero.cta2}</Link>
            </div>
          </div>
        </section>

        <section className="block">
          <div className="container">
            <h2>{dict.validation.title}</h2>
            <p className="lead">{dict.validation.body}</p>
          </div>
        </section>

        <div className="quote-band">
          <p className="q">“{dict.validation.quote}”</p>
        </div>

        <section className="block alt">
          <div className="container">
            <h2>{dict.method.title}</h2>
            <p className="lead">{dict.method.body}</p>
            <div className="grid-3">
              {dict.method.items.map((it) => (
                <div className="card" key={it.t}>
                  <h3>{it.t}</h3>
                  <p>{it.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="block">
          <div className="container">
            <h2>{dict.areasHome.title}</h2>
            <div className="grid-3">
              {dict.areasHome.items.map((it) => (
                <div className="card" key={it.slug}>
                  <h3><Link href={langHref(lang, `/condicoes/${it.slug}`)}>{it.t}</Link></h3>
                  <p>{it.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {posts.length > 0 && (
          <section className="block alt">
            <div className="container">
              <h2>{dict.blog.title}</h2>
              <p className="lead">{dict.blog.subtitle}</p>
              <div className="post-list">
                {posts.map((p) => (
                  <div className="post-card" key={p.slug}>
                    <span className="cat">{p.category}</span>
                    <h3><Link href={langHref(lang, `/blog/${p.slug}`)}>{p.title}</Link></h3>
                    <p>{p.description}</p>
                    <time dateTime={p.date}>{p.date}</time>
                  </div>
                ))}
              </div>
              <p style={{ marginTop: '2rem' }}>
                <Link className="btn btn-outline" href={langHref(lang, '/blog')}>{dict.blog.all}</Link>
              </p>
            </div>
          </section>
        )}
      </main>
      <Footer lang={lang} dict={dict} />
    </>
  );
}
