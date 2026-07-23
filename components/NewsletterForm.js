'use client';

import { useState } from 'react';
import { track } from '../lib/analytics';

export default function NewsletterForm({ lang, dict }) {
  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({});
  const n = dict.newsletter;

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    const next = {};
    if (!data.nome || data.nome.trim().length < 2) next.nome = n.errName;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email || '')) next.email = n.errEmail;
    if (!data.profissao) next.profissao = n.errProfession;
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus('loading');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, type: 'newsletter', consent: '1', lang })
      });
      if (res.ok) {
        setStatus('ok');
        track('form_success', { lang, surface: 'newsletter' });
        form.reset();
      } else {
        setStatus('err');
      }
    } catch {
      setStatus('err');
    }
  }

  return (
    <section className="news" aria-labelledby="news-title">
      <div className="wrap">
        <span className="kicker on-dark" style={{ display: 'block', textAlign: 'center' }}>{n.kicker}</span>
        <h2 id="news-title" className="d-m">{n.title}</h2>
        <p className="lead">{n.subtitle}</p>

        {status === 'ok' ? (
          <p className="status ok" role="status" style={{ marginTop: 'var(--s-2xl)' }}>{n.success}</p>
        ) : (
          <form className="news-form" onSubmit={onSubmit} noValidate>
            {status === 'err' && <p className="status err" role="alert" style={{ gridColumn: '1 / -1' }}>{n.error}</p>}

            <div className="form-field">
              <label htmlFor="nl-nome">{n.name}</label>
              <input id="nl-nome" name="nome" type="text" autoComplete="name" placeholder={n.namePlaceholder}
                aria-invalid={errors.nome ? 'true' : undefined} />
              {errors.nome && <p className="err">{errors.nome}</p>}
            </div>

            <div className="form-field">
              <label htmlFor="nl-email">{n.email}</label>
              <input id="nl-email" name="email" type="email" autoComplete="email" placeholder={n.emailPlaceholder}
                aria-invalid={errors.email ? 'true' : undefined} />
              {errors.email && <p className="err">{errors.email}</p>}
            </div>

            <div className="form-field">
              <label htmlFor="nl-prof">{n.profession}</label>
              <select id="nl-prof" name="profissao" defaultValue=""
                aria-invalid={errors.profissao ? 'true' : undefined}>
                <option value="" disabled>{n.select}</option>
                {n.professionOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              {errors.profissao && <p className="err">{errors.profissao}</p>}
            </div>

            <div className="form-field" style={{ gridColumn: '1 / -1' }}>
              <button className="btn btn-primary btn-block" type="submit" disabled={status === 'loading'}>
                {status === 'loading' ? n.sending : n.submit}
              </button>
            </div>
          </form>
        )}

        <p className="news-note">{n.consent}</p>
      </div>
    </section>
  );
}
