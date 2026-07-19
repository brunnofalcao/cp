import { SITE } from '../lib/site';

export function LpHero({ lp, dict }) {
  return (
    <section className="hero hero-lp">
      <div className="container">
        <p className="kicker">{lp.kicker}</p>
        <h1>{lp.h1}</h1>
        <p>{lp.sub}</p>
        <div className="actions">
          <a className="btn btn-primary" href={SITE.whatsappLink}>{dict.hero.cta}</a>
          <a className="btn btn-ghost" href="#avaliacao">{dict.lp.formAnchor}</a>
        </div>
        <div className="trust-bar">
          {lp.trust.map((t) => (
            <div key={t.k}>
              <span className="v">{t.v}</span>
              <span className="k">{t.k}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SymptomCheck({ lp, dict }) {
  return (
    <section className="block">
      <div className="container">
        <p className="section-kicker">{dict.lp.symptomsKicker}</p>
        <h2>{lp.symptomsTitle}</h2>
        <p className="lead">{lp.symptomsLead}</p>
        <ul className="symptom-list">
          {lp.symptoms.map((s) => <li key={s}>{s}</li>)}
        </ul>
        <p style={{ marginTop: 'var(--space-lg)', fontSize: '0.95rem', color: 'var(--cinza-medio)' }}>
          {dict.lp.symptomsNote}
        </p>
      </div>
    </section>
  );
}

export function EvidenceBlock({ lp, dict }) {
  return (
    <section className="block alt">
      <div className="container">
        <p className="section-kicker">{dict.lp.evidenceKicker}</p>
        <h2>{lp.evidenceTitle}</h2>
        <p className="lead">{lp.evidenceLead}</p>
        {lp.evidence.map((e) => (
          <div className="evidence" key={e.t}>
            <p className="label">{e.t}</p>
            <p>{e.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Journey({ lp, dict }) {
  return (
    <section className="block">
      <div className="container">
        <p className="section-kicker">{dict.lp.journeyKicker}</p>
        <h2>{dict.lp.journeyTitle}</h2>
        <div className="journey">
          {dict.lp.journeySteps.map((s) => (
            <div className="step" key={s.t}>
              <div>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LpFaq({ lp, dict }) {
  return (
    <section className="block alt">
      <div className="container-narrow" style={{ padding: 0 }}>
        <div className="faq-box" style={{ marginTop: 0 }}>
          <h2>{dict.blog.faqTitle}</h2>
          {lp.faq.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function MobileCta({ dict }) {
  return (
    <div className="cta-mobile">
      <a className="btn btn-primary btn-block" href={SITE.whatsappLink}>{dict.hero.cta}</a>
    </div>
  );
}
