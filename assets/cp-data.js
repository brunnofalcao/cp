(function () {
  if (window.CPData) return;
  if (!window.CP_CONTENT && !document.querySelector('script[data-cp-content]')) { const s = document.createElement('script'); s.src = new URL('cp-content.js', document.currentScript ? document.currentScript.src : location.href).href; s.setAttribute('data-cp-content', ''); document.head.appendChild(s); }
  const BASE = '../uploads/cp-main (1)/';
  const SLUGS = ['sindrome-ativacao-mastocitos-o-que-e','covid-longa-fadiga-que-nao-passa','sindrome-ehlers-danlos-hipermobilidade','pots-disautonomia-tontura-taquicardia','nevoa-mental-brain-fog-causas','intolerancia-histamina-alimentacao','sifo-candida-mastocitos-intestino','triade-sam-sed-pots','dor-pelvica-hipermobilidade-endometriose','como-se-preparar-consulta-caso-complexo','disbiose-e-disautonomia-via-dupla','exames-normais-sintomas-reais','sono-nao-reparador-apneia'];
  const cache = {};
  const get = (p) => new Promise((res, rej) => {
    const wait = () => {
      const C = window.CP_CONTENT; if (!C) return setTimeout(wait, 20);
      let m;
      if ((m = p.match(/^dictionaries\/(\w+)\.json$/))) return res(C[m[1]].dict);
      if ((m = p.match(/^content\/landing\/(\w+)\.json$/))) return res(C[m[1]].landing);
      if ((m = p.match(/^content\/pages\/sobre\.(\w+)\.json$/))) return res(C[m[1]].sobre);
      if ((m = p.match(/^content\/posts\/(\w+)\/(.+)\.md$/))) { const t = C[m[1]].posts[m[2]]; return t ? res(t) : rej(new Error(p)); }
      rej(new Error(p));
    };
    wait();
  });

  const UI = {
    pt: {
      nav: { home: 'Início', about: 'Sobre', consult: 'Consulta', approach: 'Abordagem', areas: 'Áreas de atuação', conds: 'Condições', talks: 'Palestras e cursos', contact: 'Contato', content: 'Conteúdo' },
      book: 'Agendar', menu: 'Menu', close: 'Fechar',
      approachDesc: 'Como a investigação é conduzida, etapa por etapa.',
      areasDesc: 'Quatro eixos que se sobrepõem no mesmo paciente.',
      condsDesc: 'Todos os quadros abordados na investigação.',
      seeAll: 'Ver todas as condições', learn: 'Saiba mais', read: 'Ler artigo', all: 'Todos',
      dedicated: 'Página dedicada', stepOf: 'Etapa', of: 'de',
      fullApproach: 'Ver a abordagem completa', fullBio: 'Conhecer a trajetória completa',
      talksCta: 'Conhecer palestras e cursos', latest: 'Mais recentes', featured: 'Em destaque',
      byAuthor: 'Por Dra. Carine Petry', reviewed: 'Revisado por', whatsapp: 'Falar no WhatsApp',
      next: 'Próxima condição', other: 'Outras áreas de atuação',
      foot: { consult: 'Consulta', content: 'Conteúdo', inst: 'Institucional', legal: 'Legal', contact: 'Contato', address: 'Endereço', privacy: 'Privacidade', terms: 'Termos', allArticles: 'Todos os artigos' },
      clinicCta: 'Como chegar', home: 'Início', notFound: 'Carregando…'
    },
    en: {
      nav: { home: 'Home', about: 'About', consult: 'Consultation', approach: 'Approach', areas: 'Areas of practice', conds: 'Conditions', talks: 'Talks & courses', contact: 'Contact', content: 'Content' },
      book: 'Book', menu: 'Menu', close: 'Close',
      approachDesc: 'How the investigation is conducted, step by step.',
      areasDesc: 'Four axes that overlap in the same patient.',
      condsDesc: 'Every presentation addressed in the investigation.',
      seeAll: 'See all conditions', learn: 'Learn more', read: 'Read article', all: 'All',
      dedicated: 'Dedicated page', stepOf: 'Step', of: 'of',
      fullApproach: 'See the full approach', fullBio: 'Read the full biography',
      talksCta: 'Explore talks and courses', latest: 'Latest', featured: 'Featured',
      byAuthor: 'By Dr. Carine Petry', reviewed: 'Reviewed by', whatsapp: 'Chat on WhatsApp',
      next: 'Next condition', other: 'Other areas of practice',
      foot: { consult: 'Consultation', content: 'Content', inst: 'Practice', legal: 'Legal', contact: 'Contact', address: 'Address', privacy: 'Privacy', terms: 'Terms', allArticles: 'All articles' },
      clinicCta: 'Get directions', home: 'Home', notFound: 'Loading…'
    }
  };

  const PAGES = { home: 'Home.dc.html', about: 'Sobre.dc.html', approach: 'Consulta.dc.html', areas: 'Areas.dc.html', conds: 'Condicoes.dc.html', cond: 'Condicao.dc.html', talks: 'Palestras.dc.html', contact: 'Contato.dc.html', content: 'Conteudo.dc.html', article: 'Artigo.dc.html' };
  const SP = window.CP_PARAMS || null;
  const STATIC = !!(SP && typeof SP.base === 'string');
  if (STATIC) { const B = SP.base + (SP.lang === 'en' ? 'en/' : ''); Object.assign(PAGES, { home: B, about: B + 'sobre/', approach: B + 'consulta/', areas: B + 'consulta/areas/', conds: B + 'consulta/condicoes/', cond: B + 'consulta/condicoes/', talks: B + 'palestras/', contact: B + 'contato/', content: B + 'conteudo/', article: B + 'conteudo/' }); }
  const condHref = s => STATIC ? PAGES.cond + s + '/' : PAGES.cond + '?slug=' + s;
  const articleHref = s => STATIC ? PAGES.article + s + '/' : PAGES.article + '?slug=' + s;

  function parseVal(v) {
    v = v.trim();
    if (!v) return '';
    try { return JSON.parse(v); } catch (e) { return v.replace(/^['"]|['"]$/g, ''); }
  }
  function parseFront(src) {
    const m = src.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
    if (!m) return { data: {}, body: src };
    const data = {}; let listKey = null, cur = null;
    m[1].split('\n').forEach(line => {
      let mm;
      if ((mm = line.match(/^(\w+):\s*(.*)$/))) {
        if (mm[2].trim() === '') { listKey = mm[1]; data[listKey] = []; } else { data[mm[1]] = parseVal(mm[2]); listKey = null; }
      } else if (listKey && (mm = line.match(/^\s+-\s+(\w+):\s*(.*)$/))) {
        cur = {}; cur[mm[1]] = parseVal(mm[2]); data[listKey].push(cur);
      } else if (listKey && cur && (mm = line.match(/^\s+(\w+):\s*(.*)$/))) {
        cur[mm[1]] = parseVal(mm[2]);
      }
    });
    return { data, body: m[2] };
  }
  const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const S = {
    h2: "font-family:'Cormorant Garamond',Georgia,serif;font-weight:400;font-size:clamp(1.9rem,3vw,2.4rem);line-height:1.12;letter-spacing:-0.01em;color:#241021;margin:64px 0 18px",
    h3: 'font-size:19px;font-weight:600;color:#241021;margin:40px 0 10px;line-height:1.4',
    p: 'font-size:18px;line-height:1.78;color:#3A3532;margin:0 0 22px;text-wrap:pretty',
    ul: 'margin:0 0 26px;padding:0 0 0 22px;display:flex;flex-direction:column;gap:10px',
    li: 'font-size:18px;line-height:1.7;color:#3A3532;padding-left:4px',
    bq: "margin:40px 0;padding:0 0 0 24px;border-left:1px solid #B01755;font-family:'Cormorant Garamond',Georgia,serif;font-style:italic;font-size:1.6rem;line-height:1.35;color:#4A1942",
    table: 'width:100%;border-collapse:collapse;margin:8px 0 32px;font-size:15px',
    td: 'padding:12px 12px 12px 0;border-top:1px solid #E2DAD3;text-align:left;vertical-align:top;color:#3A3532',
    th: 'padding:12px 12px 12px 0;border-top:1px solid #CBBFB6;text-align:left;font-weight:600;color:#241021'
  };
  function inline(s) {
    return esc(s)
      .replace(/\*\*(.+?)\*\*/g, '<strong style="font-weight:600;color:#241021">$1</strong>')
      .replace(/(^|[^*])\*(?!\s)(.+?)\*/g, '$1<em>$2</em>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color:#8E1348;text-decoration:underline;text-underline-offset:3px">$1</a>');
  }
  function md(body) {
    const lines = body.split('\n'); let out = '', i = 0;
    while (i < lines.length) {
      const l = lines[i];
      if (!l.trim()) { i++; continue; }
      if (l.startsWith('### ')) { out += `<h3 style="${S.h3}">${inline(l.slice(4))}</h3>`; i++; continue; }
      if (l.startsWith('## ')) { out += `<h2 style="${S.h2}">${inline(l.slice(3))}</h2>`; i++; continue; }
      if (/^---+$/.test(l.trim())) { out += '<hr style="border:0;border-top:1px solid #E2DAD3;margin:48px 0">'; i++; continue; }
      if (l.startsWith('> ')) { let t = []; while (i < lines.length && lines[i].startsWith('> ')) t.push(lines[i++].slice(2)); out += `<blockquote style="${S.bq}">${inline(t.join(' '))}</blockquote>`; continue; }
      if (/^\s*[-*] /.test(l) || /^\s*\d+\. /.test(l)) {
        const ol = /^\s*\d+\. /.test(l); let items = [];
        while (i < lines.length && (/^\s*[-*] /.test(lines[i]) || /^\s*\d+\. /.test(lines[i]))) items.push(lines[i++].replace(/^\s*([-*]|\d+\.) /, ''));
        out += `<${ol ? 'ol' : 'ul'} style="${S.ul}">${items.map(t => `<li style="${S.li}">${inline(t)}</li>`).join('')}</${ol ? 'ol' : 'ul'}>`; continue;
      }
      if (l.trim().startsWith('|')) {
        let rows = []; while (i < lines.length && lines[i].trim().startsWith('|')) rows.push(lines[i++]);
        rows = rows.filter(r => !/^\s*\|[\s:|-]+\|\s*$/.test(r)).map(r => r.trim().replace(/^\||\|$/g, '').split('|').map(c => c.trim()));
        out += `<div style="overflow-x:auto"><table style="${S.table}">` + rows.map((r, ri) => '<tr>' + r.map(c => `<${ri ? 'td' : 'th'} style="${ri ? S.td : S.th}">${inline(c)}</${ri ? 'td' : 'th'}>`).join('') + '</tr>').join('') + '</table></div>';
        continue;
      }
      let t = []; while (i < lines.length && lines[i].trim() && !/^(#{2,3} |> |\s*[-*] |\s*\d+\. |\|)/.test(lines[i])) t.push(lines[i++]);
      out += `<p style="${S.p}">${inline(t.join(' '))}</p>`;
    }
    return out;
  }

  function postFrom(slug, src, lang) {
    const { data, body } = parseFront(src);
    const words = body.split(/\s+/).filter(Boolean).length;
    return { slug, ...data, body, readingTime: Math.max(1, Math.ceil(words / 200)), dateFmt: fmtDate(data.date, lang), href: articleHref(slug) };
  }
  function fmtDate(d, lang) {
    if (!d) return '';
    return new Date(d + 'T12:00:00').toLocaleDateString(lang === 'en' ? 'en-GB' : 'pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  const listeners = new Set();
  function getLang() {
    if (SP && (SP.lang === 'pt' || SP.lang === 'en')) return SP.lang;
    const q = new URLSearchParams(location.search).get('lang');
    if (q === 'pt' || q === 'en') { try { localStorage.setItem('cp-lang', q); } catch (e) {} return q; }
    let s = null; try { s = localStorage.getItem('cp-lang'); } catch (e) {}
    if (s === 'pt' || s === 'en') return s;
    return (navigator.language || 'pt').toLowerCase().startsWith('en') ? 'en' : 'pt';
  }
  function setLang(l) {
    try { localStorage.setItem('cp-lang', l); } catch (e) {}
    if (SP && SP.alt && SP.alt[l]) { location.href = SP.alt[l]; return; }
    document.documentElement.lang = l === 'en' ? 'en' : 'pt-BR';
    listeners.forEach(fn => fn(l));
  }

  function reveal() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.style.opacity = '1'; e.target.style.transform = 'none'; io.unobserve(e.target); } }), { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    setTimeout(() => document.querySelectorAll('[data-reveal]:not([data-rv])').forEach(el => {
      el.setAttribute('data-rv', '');
      if (el.getBoundingClientRect().top < window.innerHeight) return;
      el.style.opacity = '0'; el.style.transform = 'translateY(24px)';
      el.style.transition = 'opacity 1s cubic-bezier(.22,1,.36,1), transform 1s cubic-bezier(.22,1,.36,1)';
      io.observe(el);
    }), 60);
  }

  window.CPData = {
    UI, PAGES, SLUGS, STATIC, condHref, articleHref, md, fmtDate, getLang, setLang, reveal, assets: window.CP_ASSETS || './',
    param: n => new URLSearchParams(location.search).get(n) || (SP && SP[n] != null ? String(SP[n]) : null),
    onLang(fn) { listeners.add(fn); return () => listeners.delete(fn); },
    async load(lang) {
      const [dict, landing, sobre] = await Promise.all([get(`dictionaries/${lang}.json`), get(`content/landing/${lang}.json`), get(`content/pages/sobre.${lang}.json`)]);
      document.documentElement.lang = lang === 'en' ? 'en' : 'pt-BR';
      return { dict, landing, sobre, ui: UI[lang], lang };
    },
    async posts(lang) {
      const res = await Promise.all(SLUGS.map(s => get(`content/posts/${lang}/${s}.md`, 'text').then(t => postFrom(s, t, lang)).catch(() => null)));
      return res.filter(Boolean).sort((a, b) => (b.date || '').localeCompare(a.date || ''));
    },
    async post(lang, slug) {
      const t = await get(`content/posts/${lang}/${slug}.md`, 'text');
      const p = postFrom(slug, t, lang); p.html = md(p.body); return p;
    }
  };
  window.dispatchEvent(new Event('cpdata-ready'));
})();
