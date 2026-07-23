// Camada fina de eventos. Não bloqueia render, não envia dado clínico sensível.
// Consome window.dataLayer (GTM) e window.gtag quando presentes; caso contrário, no-op silencioso.

const ALLOWED = new Set([
  'hero_primary_cta',
  'header_cta',
  'whatsapp_click',
  'form_start',
  'form_submit',
  'form_success',
  'condition_view',
  'article_view',
  'appointment_outbound'
]);

export function track(event, params = {}) {
  if (typeof window === 'undefined' || !ALLOWED.has(event)) return;

  const payload = {
    ...params,
    page_path: window.location?.pathname,
    page_lang: params.lang || (window.location?.pathname.startsWith('/en') ? 'en' : 'pt')
  };

  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...payload });
    if (typeof window.gtag === 'function') window.gtag('event', event, payload);
  } catch {
    // analytics nunca deve quebrar a experiência
  }
}
