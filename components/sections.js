import Link from 'next/link';
import EditorialImage from './EditorialImage';
import Reveal from './Reveal';
import CtaLink from './CtaLink';
import { langHref, SITE } from '../lib/site';

/* ---------- Artigos mais recentes (idioma editorial do site) ---------- */
export function RecentPosts({ lang, dict, posts }) {
  if (!posts?.length) return null;
  const a = dict.articles;
  const fmt = (d) =>
    new Date(d).toLocaleDateString(lang === 'en' ? 'en-GB' : 'pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <section className="on-tint" aria-labelledby="recent-title">
      <div className="wrap">
        <div className="grid" style={{ rowGap: 'var(--s-md)' }}>
          <div className="c-6">
            <span className="kicker">{a.kicker}</span>
            <h2 id="recent-title" className="d-m">{a.recentTitle}</h2>
          </div>
          <div className="c-5 start-8" style={{ alignSelf: 'end' }}>
            <p className="lead">{a.recentLead}</p>
          </div>
        </div>

        <div className="post-cards">
          {posts.slice(0, 3).map((p, i) => (
            <Reveal as="article" className="post-card" key={p.slug} delay={i * 70}>
              <p className="post-card-meta">
                <span className="tag">{p.category}</span>
                <time dateTime={p.date}>{fmt(p.date)}</time>
              </p>
              <h3><Link href={langHref(lang, `/blog/${p.slug}`)}>{p.title}</Link></h3>
              <p className="excerpt">{p.description}</p>
              <p className="post-card-foot">
                <Link className="link-arrow" href={langHref(lang, `/blog/${p.slug}`)}>{a.readMore}</Link>
                <span className="post-card-time">{p.readingTime} {a.readTime}</span>
              </p>
            </Reveal>
          ))}
        </div>

        <p style={{ marginTop: 'var(--s-2xl)' }}>
          <Link className="link-arrow" href={langHref(lang, '/blog')}>{a.all}</Link>
        </p>
      </div>
    </section>
  );
}

/* ---------- Ritmo 1: hero editorial assimétrico ---------- */
export function HeroEditorial({ lang, dict }) {
  const h = dict.hero;
  return (
    <section className="hero flush" aria-labelledby="hero-title">
      <div className="wrap">
        <div className="grid">
          <div className="c-6 hero-copy">
            <span className="kicker on-dark">{h.kicker}</span>
            <h1 id="hero-title" className="d-xl">{h.title}</h1>
            <p className="lead">{h.lead}</p>
            <div className="hero-actions">
              <CtaLink className="btn btn-primary" href={langHref(lang, '/contato')} event="hero_primary_cta" lang={lang}>
                {h.ctaPrimary}
              </CtaLink>
              <Link className="btn btn-secondary" href={langHref(lang, '/abordagem')}>{h.ctaSecondary}</Link>
            </div>
            <p className="hero-cred">{h.credentials}</p>
          </div>

          <div className="c-5 start-8 hero-media">
            <EditorialImage
              id="IMG-01"
              src={SITE.photos.retrato}
              ratio="4 / 5"
              priority
              sizes="(max-width: 1024px) 100vw, 42vw"
              tag="Retrato principal · hero"
              brief="Plano médio, luz natural lateral, expressão segura e serena. Fundo do consultório desfocado."
              px="1600 × 2000"
              alt="Dra. Carine Petry"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Faixa de credenciais verificáveis ---------- */
export function CredentialRail({ dict }) {
  return (
    <section className="credrail flush" aria-label={dict.hero.kicker}>
      <div className="wrap">
        <dl>
          {dict.credrail.items.map((i) => (
            <div key={i.k}>
              <dt>{i.k}</dt>
              <dd>{i.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ---------- Ritmo 2: manifesto editorial em duas colunas ---------- */
export function Manifesto({ dict }) {
  const m = dict.manifesto;
  return (
    <section className="manifesto" aria-labelledby="manifesto-title">
      <div className="wrap">
        <div className="grid">
          <Reveal className="c-5">
            <span className="kicker">{m.kicker}</span>
            <h2 id="manifesto-title" className="d-m">{m.title}</h2>
          </Reveal>
          <Reveal className="c-6 start-7" delay={90}>
            <div className="stack-lg">
              {m.body.map((p) => <p key={p} className="lead">{p}</p>)}
              <blockquote>
                {m.quote}
                <cite>{m.quoteSource}</cite>
              </blockquote>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- Ritmo 3: perfil com retrato ---------- */
export function DoctorProfile({ lang, dict }) {
  const p = dict.profile;
  return (
    <section className="on-tint" aria-labelledby="profile-title">
      <div className="wrap">
        <div className="grid" style={{ alignItems: 'center' }}>
          <Reveal className="c-5">
            <EditorialImage
              id="IMG-02"
              src={SITE.photos.retrato}
              objectPosition="center 22%"
              ratio="4 / 5"
              sizes="(max-width: 1024px) 100vw, 38vw"
              tag="Retrato editorial · perfil"
              brief="Fundo neutro, plano médio. O mesmo arquivo abre a página Sobre."
              px="1600 × 2000"
              alt="Dra. Carine Petry"
            />
          </Reveal>
          <Reveal className="c-6 start-7" delay={90}>
            <span className="kicker">{p.kicker}</span>
            <h2 id="profile-title" className="d-s">{p.title}</h2>
            <div className="stack" style={{ marginTop: 'var(--s-lg)' }}>
              {p.body.map((t) => <p key={t} className="body">{t}</p>)}
            </div>
            <div style={{ marginTop: 'var(--s-xl)', paddingTop: 'var(--s-md)', borderTop: '1px solid var(--c-linha)' }}>
              <span className="kicker quiet" style={{ marginBottom: 'var(--s-xs)' }}>{p.philosophyLabel}</span>
              <p className="h-serif" style={{ maxWidth: '34ch' }}>{p.philosophy}</p>
            </div>
            <p style={{ marginTop: 'var(--s-lg)' }}>
              <Link className="link-arrow" href={langHref(lang, '/sobre')}>{p.link}</Link>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- Ritmo 4: método em etapas numeradas ---------- */
export function MethodSteps({ dict, titleId = 'method-title' }) {
  const m = dict.method;
  return (
    <section aria-labelledby={titleId}>
      <div className="wrap">
        <div className="grid" style={{ rowGap: 'var(--s-md)' }}>
          <div className="c-6">
            <span className="kicker">{m.kicker}</span>
            <h2 id={titleId} className="d-m">{m.title}</h2>
          </div>
          <div className="c-5 start-8" style={{ alignSelf: 'end' }}>
            <p className="lead">{m.lead}</p>
          </div>
        </div>

        <ol className="method">
          {m.steps.map((s, i) => (
            <Reveal as="li" className="method-step" key={s.t} delay={i * 70}>
              <span className="numeral" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="h-serif">{s.t}</h3>
              <p>{s.d}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------- Ritmo 5: áreas em linhas editoriais ---------- */
export function ConditionIndex({ lang, dict }) {
  const a = dict.areasHome;
  return (
    <section className="on-tint" aria-labelledby="areas-title">
      <div className="wrap">
        <div className="grid" style={{ rowGap: 'var(--s-md)' }}>
          <div className="c-6">
            <span className="kicker">{a.kicker}</span>
            <h2 id="areas-title" className="d-m">{a.title}</h2>
          </div>
          <div className="c-5 start-8" style={{ alignSelf: 'end' }}>
            <p className="lead">{a.lead}</p>
          </div>
        </div>

        <div style={{ marginTop: 'var(--s-2xl)' }}>
          {a.items.map((c, i) => (
            <Reveal className="cond-row" key={c.slug} delay={i * 60}>
              <span className="cond-idx" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3 className="h-serif">
                  <Link href={langHref(lang, `/condicoes/${c.slug}`)}>{c.t}</Link>
                </h3>
                <p className="body" style={{ marginTop: 'var(--s-xs)' }}>{c.d}</p>
                <p className="signals">
                  <span className="sr-only">{a.signalsLabel}: </span>{c.signals}
                </p>
              </div>
              <div>
                <Link className="link-arrow" href={langHref(lang, `/condicoes/${c.slug}`)}>{a.cta}</Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Ritmo 6: autoridade científica ---------- */
export function EvidencePanel({ dict }) {
  const a = dict.authority;
  return (
    <section aria-labelledby="authority-title">
      <div className="wrap">
        <div className="grid">
          <Reveal className="c-4">
            <span className="kicker">{a.kicker}</span>
            <h2 id="authority-title" className="d-s">{a.title}</h2>
            <p className="body" style={{ marginTop: 'var(--s-md)' }}>{a.lead}</p>
          </Reveal>
          <Reveal className="c-7 start-6" delay={90}>
            {a.items.map((i) => (
              <div className="evidence-item" key={i.label}>
                <span className="label">{i.label}</span>
                <p>{i.d}</p>
              </div>
            ))}
            <p className="pending" style={{ marginTop: 'var(--s-lg)' }}>{a.pending}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- Ritmo 7: jornada do paciente ---------- */
export function PatientJourney({ dict }) {
  const j = dict.journey;
  return (
    <section className="on-tint" aria-labelledby="journey-title">
      <div className="wrap">
        <div className="grid" style={{ rowGap: 'var(--s-xl)' }}>
          <div className="c-4">
            <span className="kicker">{j.kicker}</span>
            <h2 id="journey-title" className="d-s">{j.title}</h2>
          </div>
          <div className="c-7 start-6">
            <div className="timeline">
              {j.items.map((i, idx) => (
                <Reveal className="timeline-item" key={i.t} delay={idx * 60}>
                  <span className="when">{String(idx + 1).padStart(2, '0')}</span>
                  <div>
                    <p className="what">{i.t}</p>
                    <p className="where" style={{ marginTop: 'var(--s-2xs)' }}>{i.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Ritmo 8: conteúdo em layout de revista ---------- */
export function ArticleFeature({ lang, dict, posts }) {
  if (!posts?.length) return null;
  const [lead, ...rest] = posts;
  const a = dict.articles;
  const fmt = (d) =>
    new Date(d).toLocaleDateString(lang === 'en' ? 'en-GB' : 'pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <section aria-labelledby="articles-title">
      <div className="wrap">
        <div className="grid" style={{ rowGap: 'var(--s-md)' }}>
          <div className="c-6">
            <span className="kicker">{a.kicker}</span>
            <h2 id="articles-title" className="d-m">{a.title}</h2>
          </div>
          <div className="c-5 start-8" style={{ alignSelf: 'end' }}>
            <p className="lead">{a.lead}</p>
          </div>
        </div>

        <Reveal className="feature" style={{ marginTop: 'var(--s-2xl)' }}>
          <EditorialImage
            id="IMG-11"
            ratio="16 / 10"
            sizes="(max-width: 768px) 100vw, 45vw"
            tag="Artigo em destaque · home"
            brief="Fotografia de contexto ou gráfico científico sóbrio. Trocar a cada novo destaque."
            minPx="1600"
            alt=""
          />
          <div>
            <p className="article-meta">
              <span className="tag">{lead.category}</span>
              <time dateTime={lead.date}>{fmt(lead.date)}</time>
              <span>{lead.readingTime} {a.readTime}</span>
            </p>
            <h3 className="d-s" style={{ marginTop: 'var(--s-sm)' }}>
              <Link href={langHref(lang, `/blog/${lead.slug}`)}>{lead.title}</Link>
            </h3>
            <p className="body" style={{ marginTop: 'var(--s-sm)' }}>{lead.description}</p>
            <p style={{ marginTop: 'var(--s-md)' }}>
              <Link className="link-arrow" href={langHref(lang, `/blog/${lead.slug}`)}>{a.readMore}</Link>
            </p>
          </div>
        </Reveal>

        <div style={{ marginTop: 'var(--s-2xl)' }}>
          {rest.map((p, i) => (
            <Reveal className="article-row" key={p.slug} delay={i * 60}>
              <p className="article-meta">
                <span className="tag">{p.category}</span>
                <time dateTime={p.date}>{fmt(p.date)}</time>
              </p>
              <div>
                <h3 className="h-serif"><Link href={langHref(lang, `/blog/${p.slug}`)}>{p.title}</Link></h3>
                <p className="sm" style={{ marginTop: 'var(--s-2xs)', maxWidth: '62ch' }}>{p.description}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <p style={{ marginTop: 'var(--s-xl)' }}>
          <Link className="link-arrow" href={langHref(lang, '/blog')}>{a.all}</Link>
        </p>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
export function FaqAccordion({ title, kicker, items, titleId = 'faq-title', tint = true }) {
  return (
    <section className={tint ? 'on-tint' : ''} aria-labelledby={titleId}>
      <div className="wrap">
        <div className="grid">
          <div className="c-4">
            {kicker && <span className="kicker">{kicker}</span>}
            <h2 id={titleId} className="d-s">{title}</h2>
          </div>
          <div className="c-7 start-6">
            <div className="faq">
              {items.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <div><p>{f.a}</p></div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- CTA final silencioso ---------- */
export function FinalCta({ lang, dict }) {
  const c = dict.finalCta;
  return (
    <section className="on-dark" aria-labelledby="final-cta-title">
      <div className="wrap">
        <div className="grid">
          <div className="c-7">
            <h2 id="final-cta-title" className="d-m">{c.title}</h2>
            <p className="lead" style={{ marginTop: 'var(--s-md)' }}>{c.lead}</p>
          </div>
          <div className="c-4 start-9" style={{ alignSelf: 'end' }}>
            <CtaLink className="btn btn-primary" href={langHref(lang, '/contato')} event="hero_primary_cta" lang={lang}>
              {c.cta}
            </CtaLink>
            <p className="cap" style={{ marginTop: 'var(--s-md)' }}>{c.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Clínica ---------- */
export function ClinicGallery({ dict }) {
  const c = dict.clinic;
  return (
    <section aria-labelledby="clinic-title">
      <div className="wrap">
        <div className="grid" style={{ rowGap: 'var(--s-xl)' }}>
          <div className="c-5">
            <span className="kicker">{c.kicker}</span>
            <h2 id="clinic-title" className="d-s">{c.title}</h2>
            <p className="body" style={{ marginTop: 'var(--s-md)' }}>{c.lead}</p>
            <p className="cap" style={{ marginTop: 'var(--s-md)' }}>{SITE.address.line1}, {SITE.address.line2}</p>
          </div>
          <div className="c-6 start-7">
            <div className="grid" style={{ rowGap: 'var(--s-md)' }}>
              <div className="c-12">
                <EditorialImage
                  id="IMG-07"
                  ratio="16 / 9"
                  sizes="(max-width: 1024px) 100vw, 46vw"
                  tag="Consultório · vista ampla"
                  brief="Ambiente sem pessoas, luz natural, arquitetura legível. Mostra onde a consulta acontece."
                  px="2400 × 1350"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- CTA fixo mobile ---------- */
export function StickyCta({ lang, dict }) {
  return (
    <div className="cta-sticky">
      <CtaLink className="btn btn-primary btn-block" href={langHref(lang, '/contato')} event="hero_primary_cta" lang={lang}>
        {dict.header.cta}
      </CtaLink>
    </div>
  );
}
