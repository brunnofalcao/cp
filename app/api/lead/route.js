export const dynamic = 'force-dynamic';

// Recebe leads de consulta e assinaturas de newsletter e envia ao RD Station Marketing.
// Configurar no painel da Vercel: RD_STATION_TOKEN (Public Token da conta).
// Sem o token, o lead é registrado no log do servidor. Nada se perde durante o setup.

const PROFISSAO_LABEL = {
  medico: 'Médico(a)',
  nutricionista: 'Nutricionista',
  profissional_saude: 'Profissional da saúde',
  nao_profissional: 'Não profissional da saúde'
};

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'invalid_json' }, { status: 400 });
  }

  const { nome, email, telefone, tempo, contexto, condition, profissao, type, lang, consent } = body || {};
  const isNewsletter = type === 'newsletter';

  if (!nome || String(nome).trim().length < 2) {
    return Response.json({ error: 'invalid_name' }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || ''))) {
    return Response.json({ error: 'invalid_email' }, { status: 400 });
  }
  if (!consent) {
    return Response.json({ error: 'consent_required' }, { status: 400 });
  }
  if (isNewsletter && !profissao) {
    return Response.json({ error: 'profession_required' }, { status: 400 });
  }

  const conversionId = isNewsletter ? 'newsletter-ciencia-traduzida' : `consulta-${condition || 'geral'}`;

  const payload = {
    event_type: 'CONVERSION',
    event_family: 'CDP',
    payload: {
      conversion_identifier: conversionId,
      name: String(nome).trim(),
      email: String(email).trim().toLowerCase(),
      personal_phone: telefone ? String(telefone).trim() : undefined,
      cf_tipo_contato: isNewsletter ? 'newsletter' : 'consulta',
      cf_profissao: profissao ? (PROFISSAO_LABEL[profissao] || profissao) : undefined,
      cf_condicao_investigada: condition || undefined,
      cf_tempo_sintomas: tempo || undefined,
      cf_contexto_caso: contexto || undefined,
      cf_idioma: lang === 'en' ? 'en' : 'pt-BR',
      traffic_source: 'site-carinepetry'
    }
  };

  const token = process.env.RD_STATION_TOKEN;
  if (!token) {
    console.log('[lead] RD_STATION_TOKEN ausente. Registro local:', payload.payload);
    return Response.json({ ok: true, stored: 'log' });
  }

  try {
    const res = await fetch(`https://api.rd.services/platform/conversions?api_key=${token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) {
      const detail = await res.text();
      console.error('[lead] falha no RD Station:', res.status, detail);
      return Response.json({ error: 'crm_error' }, { status: 502 });
    }
    return Response.json({ ok: true, stored: 'rdstation' });
  } catch (err) {
    console.error('[lead] erro de rede:', err);
    return Response.json({ error: 'network_error' }, { status: 502 });
  }
}
