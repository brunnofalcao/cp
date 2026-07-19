import Link from 'next/link';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { getDictionary } from '../../../lib/dictionaries';
import { langHref, altUrls } from '../../../lib/site';
import { getAllPosts } from '../../../lib/posts';

export async function generateMetadata({ params }) {
  const lang = params.lang === 'en' ? 'en' : 'pt';
  const alts = altUrls('/blog');
  return {
    title: lang === 'en' ? 'Blog — Science, translated clearly' : 'Blog — Ciência traduzida com clareza',
    description:
      lang === 'en'
        ? 'Science-based articles on MCAS, Ehlers-Danlos, Long COVID and sleep medicine, explained for patients by Dr. Carine Petry.'
        : 'Artigos baseados em ciência sobre SAM, Ehlers-Danlos, Covid Longa e medicina do sono, explicados para pacientes pela Dra. Carine Petry.',
    alternates: {
      canonical: lang === 'en' ? alts.en : alts.pt,
      languages: { 'pt-BR': alts.pt, en: alts.en }
    }
  };
}

export default function Blog({ params }) {
  const lang = params.lang === 'en' ? 'en' : 'pt';
  const dict = getDictionary(lang);
  const posts = getAllPosts(lang);
  return (
    <>
      <Header lang={lang} dict={dict} currentPath="/blog" />
      <main>
        <section className="block">
          <div className="container">
            <h2 style={{ fontSize: 'clamp(2rem,4.5vw,2.8rem)' }}>{dict.blog.title}</h2>
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
          </div>
        </section>
      </main>
      <Footer lang={lang} dict={dict} />
    </>
  );
}
