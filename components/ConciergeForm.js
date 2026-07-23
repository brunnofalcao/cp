'use client';

import { useState } from 'react';
import { track } from '../lib/analytics';

export default function ConciergeForm({ lang, condition, dict }) {
  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({});
  const [started, setStarted] = useState(false);
  const c = dict.form;

  function onFirstInput() {
    if (started) return;
    setStarted(true);
    track('form_start', { lang, condition });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    const next = {};
    if (!data.nome || data.nome.trim().length < 2) next.nome = c.errName;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email || '')) next.email = c.errEmail;
    if (!data.consent) next.consent = c.errConsent;
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus('loading');
    track('form_submit', { lang, condition });

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, condition, lang })
      });
      if (res.ok) {
        setStatus('ok');
        track('form_success', { lang, condition });
        form.reset();
      } else {
        setStatus('err');
      }
    } catch {
      setStatus('err');
    }
  }

  if (status === 'ok') {
    return (
      <div>
        <p className="status ok" role="status">{c.success}</p>
        <p className="body">{c.successBody}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} onInput={onFirstInput} noValidate>
      <p className="cap" style={{ marginBottom: 'var(--s-lg)' }}>{c.subtitle}</p>

      {status === 'err' && <p className="status err" role="alert">{c.error}</p>}

      <div className="form-field">
        <label htmlFor="nome">{c.name}</label>
        <input id="nome" name="nome" type="text" autoComplete="name" required
          aria-invalid={errors.nome ? 'true' : undefined}
          aria-describedby={errors.nome ? 'err-nome' : undefined} />
        {errors.nome && <p className="err" id="err-nome">{errors.nome}</p>}
      </div>

      <div className="form-field">
        <label htmlFor="email">{c.email}</label>
        <input id="email" name="email" type="email" autoComplete="email" required
          aria-invalid={errors.email ? 'true' : undefined}
          aria-describedby={errors.email ? 'err-email' : undefined} />
        {errors.email && <p className="err" id="err-email">{errors.email}</p>}
      </div>

      <div className="form-field">
        <label htmlFor="telefone">{c.phone}</label>
        <input id="telefone" name="telefone" type="tel" autoComplete="tel" aria-describedby="hint-tel" />
        <p className="hint" id="hint-tel">{c.phoneHint}</p>
      </div>

      <div className="form-field">
        <label htmlFor="tempo">{c.duration}</label>
        <select id="tempo" name="tempo" defaultValue="">
          <option value="" disabled>{c.select}</option>
          {c.durationOptions.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>

      <div className="form-field">
        <label htmlFor="contexto">{c.context}</label>
        <textarea id="contexto" name="contexto" rows={4} aria-describedby="hint-ctx" />
        <p className="hint" id="hint-ctx">{c.contextHint}</p>
      </div>

      <div className="form-field">
        <label className="check" htmlFor="consent">
          <input id="consent" type="checkbox" name="consent" value="1"
            aria-invalid={errors.consent ? 'true' : undefined}
            aria-describedby={errors.consent ? 'err-consent' : undefined} />
          <span>{c.consent}</span>
        </label>
        {errors.consent && <p className="err" id="err-consent">{errors.consent}</p>}
      </div>

      <button className="btn btn-primary btn-block" type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? c.sending : c.submit}
      </button>
    </form>
  );
}
