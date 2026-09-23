import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'posts');

function readingTime(text) {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

export function getPostSlugs(lang) {
  const dir = path.join(CONTENT_DIR, lang);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith('.md')).map((f) => f.replace(/\.md$/, ''));
}

export function getPost(lang, slug) {
  const file = path.join(CONTENT_DIR, lang, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const { data, content } = matter(fs.readFileSync(file, 'utf-8'));
  return {
    slug,
    title: data.title,
    description: data.description,
    date: data.date,
    updated: data.updated || data.date,
    category: data.category || '',
    keywords: data.keywords || [],
    faq: data.faq || [],
    references: data.references || [],
    readingTime: readingTime(content),
    html: marked.parse(content),
    content
  };
}

export function getAllPosts(lang) {
  // Gating por data: um post só aparece quando sua data chega (<= hoje).
  // Permite manter um backlog datado para o futuro e revelar 1 por dia
  // a cada rebuild diário (ver docs de automação). Datas no futuro ficam ocultas.
  const now = Date.now();
  return getPostSlugs(lang)
    .map((slug) => getPost(lang, slug))
    .filter(Boolean)
    .filter((p) => !p.date || new Date(p.date).getTime() <= now)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getCategories(lang) {
  return [...new Set(getAllPosts(lang).map((p) => p.category).filter(Boolean))];
}

export function getRelated(lang, slug, limit = 3) {
  const all = getAllPosts(lang);
  const current = all.find((p) => p.slug === slug);
  if (!current) return [];
  const sameCategory = all.filter((p) => p.slug !== slug && p.category === current.category);
  const others = all.filter((p) => p.slug !== slug && p.category !== current.category);
  return [...sameCategory, ...others].slice(0, limit);
}
