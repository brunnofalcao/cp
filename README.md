# Site institucional — Dra. Carine Petry

Next.js 14 (App Router), estático, bilíngue PT/EN, com blog em Markdown.

## Rodar localmente

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Deploy (Vercel)

1. Suba a pasta `site/` para um repositório Git
2. Importe o repositório na Vercel — o framework é detectado automaticamente
3. Aponte o domínio `carinepetry.com.br` para o projeto

Não há variáveis de ambiente obrigatórias.

## Idiomas

- **PT** é o padrão, em URLs limpas: `/`, `/blog`, `/sobre`
- **EN** vive em `/en/...`
- O `middleware.js` detecta o `Accept-Language` do navegador e redireciona visitantes de navegador em inglês para `/en` na primeira visita. A escolha fica salva num cookie e o seletor PT/EN no cabeçalho permite trocar a qualquer momento.

## Blog

Cada artigo é um arquivo Markdown em `content/posts/pt/` com um par correspondente em `content/posts/en/` (mesmo nome de arquivo = mesma URL nos dois idiomas).

Frontmatter:

```yaml
---
title: "Título do artigo"
description: "Meta description (150-160 caracteres)"
date: "2026-07-18"
category: "SAM"
keywords: ["palavra-chave 1", "palavra-chave 2"]
faq:
  - q: "Pergunta?"
    a: "Resposta direta, citável por IA."
---
```

O `faq` vira schema `FAQPage` automaticamente (AEO). O artigo vira `MedicalWebPage`.

## SEO / AEO / GEO

- Metadata por página com canonical e `hreflang` (pt-BR, en, x-default)
- Schema.org: `Physician` no site inteiro, `MedicalWebPage` + `FAQPage` nos artigos
- `sitemap.xml` e `robots.txt` gerados automaticamente
- `llms.txt` para citação por modelos de IA — atualiza sozinho a cada novo post
- 100% estático (SSG), sem JavaScript de dados no cliente

## Design tokens — fonte única de verdade

`tokens/tokens.json` é a única fonte de verdade visual do ecossistema. Cor, tipografia, espaçamento, raio, sombra, motion e acessibilidade vivem ali, com anotação de uso e de contraste.

```bash
npm run tokens   # gera app/tokens.css a partir do JSON
```

O `npm run build` e o `npm run dev` já rodam isso automaticamente. `app/globals.css` consome apenas variáveis — nenhum hex solto. Mudou o magenta no JSON, mudou em todo o ecossistema.

Qualquer módulo futuro (landing pages, área do paciente, materiais ricos, e-mails) deve importar `tokens.json` ou `tokens.css` em vez de recopiar valores.

## Landing pages por condição

Rotas: `/condicoes/[slug]` em PT e `/en/condicoes/[slug]` em EN.
Slugs: `sam`, `sed`, `covid-longa`, `medicina-do-sono`.

O conteúdo vive em `content/landing/pt.json` e `content/landing/en.json` — para criar uma nova condição, basta adicionar uma entrada nos dois arquivos; a página, o sitemap e o `llms.txt` se atualizam sozinhos.

Estrutura de cada página: hero com credenciais, checklist de sintomas por sistema, blocos de evidência científica, jornada de investigação em 4 etapas, formulário de captura e FAQ. Schema `MedicalWebPage` + `MedicalCondition` com sintomas marcados, mais `FAQPage`. CTA fixo no rodapé em mobile.

## Captura de lead

`POST /api/lead` valida os dados e envia ao RD Station Marketing.
Configure `RD_STATION_TOKEN` (Public Token da conta) nas variáveis de ambiente da Vercel. Sem o token, o lead é registrado no log do servidor — nada se perde durante o setup.

Campos enviados: nome, e-mail, telefone, tempo de sintomas, condição de origem e idioma. Consentimento LGPD é obrigatório para o envio.

## Publicação diária

Ver `../docs/pipeline-publicacao-diaria.md` e o banco de pautas em `content/pauta-diaria.md`.
A voz da Carine está documentada em `../docs/modelo-de-fala-carine-petry.md`.
