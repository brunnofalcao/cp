export const SITE = {
  url: 'https://carinepetry.com.br',
  name: 'Dra. Carine Petry',
  crm: 'CRM-DF 15342',
  rqe: 'RQE 16243 / 12865',
  specialty: 'Medicina do Sono',
  phone: '(61) 3263-7721',
  whatsapp: '(61) 99272-1947',
  whatsappLink: 'https://wa.me/5561992721947',
  instagram: 'https://www.instagram.com/dracarine.petry/',
  address: {
    line1: 'Centro Médico Lucio Costa - Bloco I / T-56',
    line2: 'SGAS 610/611 - Via L2 Sul',
    city: 'Brasília',
    state: 'DF',
    zip: '70200-700'
  }
};

export function langHref(lang, path = '') {
  const p = path.startsWith('/') ? path : `/${path}`;
  return lang === 'en' ? `/en${p === '/' ? '' : p}` : p === '/' ? '/' : p;
}

export function altUrls(path = '/') {
  const p = path.startsWith('/') ? path : `/${path}`;
  return {
    pt: `${SITE.url}${p === '/' ? '' : p}`,
    en: `${SITE.url}/en${p === '/' ? '' : p}`
  };
}
