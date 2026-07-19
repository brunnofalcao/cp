'use client';

import { useState } from 'react';

export default function LeadForm({ lang, condition, dict }) {
  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({});
  const c = dict.form;

  async function onSubmit(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const next = {};
    if (!data.nome || data.nome.trim().length < 2) next.nome = c.errName;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email || '')) next.email = c.errEmail;
    if (!data.consent) next.consent = c.errConsent;
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus('loading');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, condition, lang })
      });
      setStatus(res.ok ? 'ok' : 'err');
      if (res.ok) e.target.reset();
    } catch {
      setStatus('err');
    }
  }

  if (status === 'ok') {
    return (
      <div className="lead-form">
        <div className="form-status ok" role="status">{c.success}</div>
        <p style={{ fontSize: '0.95rem' }}>{c.successBody}</p>
      </div>
    );
  }

  return (
    <form className="lead-form" onSubmit={onSubmit} noValidate>
      <h3 style={{ marginBottom: 'var(--space-xs)' }}>{c.title}</h3>
      <p style={{ fontSize: '0.92rem', marginBottom: 'var(--space-lg)' }}>{c.subtitle}</p>

      {status === 'err' && <div className="form-status err" role="alert">{c.error}</div>}

      <div className="field">
        <label htmlFor="nome">{c.name}</label>
        <input id="nome" name="nome" type="text" autoComplete="name" aria-invalid={!!errors.nome} />
        {errors.nome && <p className="error">{errors.nome}</p>}
      </div>

      <div className="field">
        <label htmlFor="email">{c.email}</label>
        <input id="email" name="email" type="email" autoComplete="email" aria-invalid={!!errors.email} />
        {errors.email && <p className="error">{errors.email}</p>}
      </div>

      <div className="field">
        <label htmlFor="telefone">{c.phone}</label>
        <input id="telefone" name="telefone" type="tel" autoComplete="tel" />
        <p className="hint">{c.phoneHint}</p>
      </div>

      <div className="field">
        <label htmlFor="tempo">{c.duration}</label>
        <select id="tempo" name="tempo" defaultValue="">
          <option value="" disabled>{c.select}</option>
          {c.durationOptions.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>

      <div className="field">
        <label style={{ display: 'flex', gap: 'var(--space-xs)', alignItems: 'flex-start', fontWeight: 400, fontSize: '0.84rem', color: 'var(--cinza-escuro)' }}>
          <input type="checkbox" name="consent" value="1" style={{ width: 'auto', minHeight: 'auto', marginTop: '3px' }} aria-invalid={!!errors.consent} />
          <span>{c.consent}</span>
        </label>
        {errors.consent && <p className="error">{errors.consent}</p>}
      </div>

      <button className="btn btn-primary btn-block" type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? c.sending : c.submit}
      </button>
    </form>
  );
}
