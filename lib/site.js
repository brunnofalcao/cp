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
    // Logos oficiais com entrega em alta definição pela Cloudinary:
    // f_auto (webp/avif), q_auto:best (qualidade máxima automática), w_1000 (retina).
    principal: 'https://res.cloudinary.com/dlzrfhwin/image/upload/f_auto,q_auto:best,w_1000/v1784824334/Logo_-_Header_Site_-_Carine_Petry_eqr3hz.png',
    negativo: 'https://res.cloudinary.com/dlzrfhwin/image/upload/f_auto,q_auto:best,w_1000/v1784824334/Logo_-_Footer_Site_-_Carine_Petry_dd7yxf.png',
    icone: 'https://res.cloudinary.com/dlzrfhwin/image/upload/f_auto,q_auto:best,w_256/v1775923046/logo_v3_icon_colorido_trt4ky.png',
    pb: 'https://res.cloudinary.com/dlzrfhwin/image/upload/f_auto,q_auto:best,w_1000/v1775923045/logo_v2_institucional_pb_jzdtn2.png'
  },
  // Imagem de compartilhamento social (Open Graph 1200x630) gerada pela Cloudinary:
  // logo real (negativa) centralizada sobre fundo borgonha, sempre em alta definicao.
  ogImage: 'https://res.cloudinary.com/dlzrfhwin/image/upload/c_fit,w_820,h_360/c_pad,w_1200,h_630,b_rgb:241021,f_jpg,q_auto:best/v1784824334/Logo_-_Footer_Site_-_Carine_Petry_dd7yxf.png',
  // Fotos oficiais da Carine (Cloudinary). Retrato usado no hero da home e na página Sobre.
  photos: {
    retrato: 'https://res.cloudinary.com/dlzrfhwin/image/upload/v1776164492/WhatsApp_Image_2026-03-12_at_12.24.28_ardzoc.jpg'
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
