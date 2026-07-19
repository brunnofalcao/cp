export const dynamic = 'force-dynamic';

// Recebe o lead e envia ao RD Station Marketing (API de conversão).
// Configurar no painel da Vercel: RD_STATION_TOKEN (Public Token da conta).
// Sem o token, o lead é registrado no log — nada se perde durante o setup.

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'invalid_json' }, { status: 400 });
  }

  const { nome, email, telefone, tempo, condition, lang, consent } = body || {};

  if (!nome || String(nome).trim().length < 2) {
    return Response.json({ error: 'invalid_name' }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || ''))) {
    return Response.json({ error: 'invalid_email' }, { status: 400 });
  }
  if (!consent) {
    return Response.json({ error: 'consent_required' }, { status: 400 });
  }

  const payload = {
    event_type: 'CONVERSION',
    event_family: 'CDP',
    payload: {
      conversion_identifier: `site-${condition || 'geral'}`,
      name: String(nome).trim(),
      email: String(email).trim().toLowerCase(),
      personal_phone: telefone ? String(telefone).trim() : undefined,
      cf_condicao_investigada: condition || '',
      cf_tempo_sintomas: tempo || '',
      cf_idioma: lang === 'en' ? 'en' : 'pt-BR',
      traffic_source: 'site-carinepetry'
    }
  };

  const token = process.env.RD_STATION_TOKEN;
  if (!token) {
    console.log('[lead] RD_STATION_TOKEN ausente — lead registrado localmente:', payload.payload);
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
