# Site — Carine Petry

Next.js 14 (App Router), estático, bilíngue PT/EN, com blog em Markdown e sistema de design editorial próprio.

## Primeiros passos

```bash
npm install
npm run fonts     # baixa e auto-hospeda Cormorant Garamond e Inter (uma vez)
npm run dev       # http://localhost:3000
npm run build && npm start
```

`npm run tokens` roda automaticamente em `dev` e `build`.

## Deploy (Vercel)

Importe a pasta `site/` como projeto — o framework é detectado sozinho. Aponte `carinepetry.com.br` para ele. Adicione `RD_STATION_TOKEN` nas variáveis de ambiente quando tiver o token.

## Estrutura

```
app/                    rotas (App Router)
  [lang]/               pt e en
    page.js             homepage
    abordagem/          método clínico
    areas/              índice de condições
    condicoes/[slug]/   template de condição
    sobre/              biografia e credenciais
    blog/               índice e artigo
    contato/            concierge
  api/lead/             recebimento de lead → RD Station
  globals.css           sistema visual
  tokens.css            gerado — não editar
  fonts.css             @font-face auto-hospedado
components/             biblioteca de componentes
  sections.js           seções editoriais da homepage
content/
  posts/{pt,en}/        artigos em Markdown
  landing/{pt,en}.json  conteúdo das condições
  pages/sobre.*.json    conteúdo da página Sobre
dictionaries/           textos de interface
lib/                    posts, tokens de site, analytics
tokens/                 tokens.json + geradores
```

## Design tokens

`tokens/tokens.json` é a fonte única de verdade. Cor, tipografia, espaçamento, forma, sombra, motion e acessibilidade vivem ali, cada token com anotação de uso e contraste. O script gera `app/tokens.css`; o `globals.css` consome apenas variáveis, sem nenhum hex solto.

Mudou o magenta no JSON, mudou em todo o ecossistema. Qualquer módulo futuro deve importar esse arquivo em vez de recopiar valores.

Princípios codificados no sistema: composição antes de ornamento; magenta é ação, não decoração; serifada só em display, citação e número; cor sólida e linha fina no lugar de gradiente e sombra.

## Idiomas

PT é o padrão, em URLs limpas. EN vive em `/en/...`. O `middleware.js` detecta o `Accept-Language` e redireciona navegadores em inglês para `/en` na primeira visita, gravando a escolha em cookie. O seletor no cabeçalho permite trocar a qualquer momento.

## Blog

Cada artigo é um Markdown em `content/posts/pt/` com par de mesmo nome em `content/posts/en/`.

```yaml
---
title: "Título"
description: "Meta description de 150 a 160 caracteres"
date: "2026-07-18"
updated: "2026-07-18"
category: "SAM"
keywords: ["palavra-chave"]
faq:
  - q: "Pergunta?"
    a: "Resposta direta, citável por IA."
references:
  - title: "Título do estudo"
    source: "Periódico, ano"
    url: "https://doi.org/..."
---
```

O `faq` vira schema `FAQPage`, o artigo vira `MedicalWebPage` com `reviewedBy`, e `references` renderiza a seção de referências. Tempo de leitura é calculado automaticamente.

## Condições

`content/landing/{pt,en}.json`. Para abrir uma nova condição, adicione uma entrada nos dois arquivos — página, sitemap e `llms.txt` se atualizam sozinhos.

Cada entrada define resumo acessível, sinais organizados por sistema corporal, situações que justificam investigação, evidência, critérios e limitações, e FAQ.

## Imagens

`EditorialImage` renderiza um placeholder identificado enquanto `src` estiver ausente — nunca uma foto de banco. Ver `docs/CONTENT_REQUIRED.md` para o briefing de produção.

## Analytics

`lib/analytics.js` expõe `track(event, params)` com nove eventos em allowlist, enviando para `dataLayer` e `gtag` quando presentes. Nunca envia dado clínico e falha em silêncio.

## SEO, GEO e AEO

Metadata por página com canonical e hreflang. Schemas `Physician`, `MedicalWebPage`, `MedicalCondition`, `FAQPage` e `BreadcrumbList`. Open Graph e Twitter cards. `sitemap.xml`, `robots.txt` e `llms.txt` gerados automaticamente.

## Acessibilidade

Skip link, `aria-current`, foco visível, alvos de 44px, drawer mobile com foco preso e Escape, erros de formulário associados por `aria-describedby`, e `prefers-reduced-motion` desligando todo movimento. Corpo de texto em contraste AAA.

## Documentação

- `docs/CONTENT_REQUIRED.md` — ativos pendentes e briefing fotográfico
- `docs/changelog-v2-redesign.md` — o que mudou na reconstrução
- `docs/modelo-de-fala-carine-petry.md` — voz da médica para geração de conteúdo
- `docs/pipeline-publicacao-diaria.md` — publicação automática
