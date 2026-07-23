export const SITE = {
  url: 'https://carinepetry.com.br',
  name: 'Carine Petry',
  crm: 'CRM-DF 15342',
  rqe: 'RQE 16243 / 12865',
  specialty: 'Medicina do Sono',
  phone: '(61) 3263-7721',
  whatsapp: '(61) 99272-1947',
  whatsappLink: 'https://wa.me/5561992721947',
  instagram: 'https://www.instagram.com/dracarine.petry/',
  // CONTENT_REQUIRED: confirmar e-mail e canal do YouTube. Deixe '' para ocultar o ícone.
  email: 'contato@carinepetry.com.br',
  youtube: '',
  // Logomarca oficial (Cloudinary da Carine, extraída do brandbook v2.0).
  // Ideal futuramente: baixar para /public/logo/ e/ou fornecer SVG.
  logo: {
    principal: 'https://res.cloudinary.com/dlzrfhwin/image/upload/v1775923045/logo_principal_completo_vvzn8v.png',
    negativo: 'https://res.cloudinary.com/dlzrfhwin/image/upload/v1775923046/logo_v4_negativo_tvlmkx.png',
    icone: 'https://res.cloudinary.com/dlzrfhwin/image/upload/v1775923046/logo_v3_icon_colorido_trt4ky.png',
    pb: 'https://res.cloudinary.com/dlzrfhwin/image/upload/v1775923045/logo_v2_institucional_pb_jzdtn2.png'
  },
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
