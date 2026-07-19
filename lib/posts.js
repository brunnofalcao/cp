import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'posts');

export function getPostSlugs(lang) {
  const dir = path.join(CONTENT_DIR, lang);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''));
}

export function getPost(lang, slug) {
  const file = path.join(CONTENT_DIR, lang, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, 'utf-8');
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title,
    description: data.description,
    date: data.date,
    category: data.category || '',
    keywords: data.keywords || [],
    faq: data.faq || [],
    html: marked.parse(content),
    content
  };
}

export function getAllPosts(lang) {
  return getPostSlugs(lang)
    .map((slug) => getPost(lang, slug))
    .filter(Boolean)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}
