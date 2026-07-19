import { getPostSlugs } from '../lib/posts';
import { SITE } from '../lib/site';
import ptLp from '../content/landing/pt.json';

export default function sitemap() {
  const now = new Date();
  const staticPaths = ['', '/sobre', '/areas', '/blog', '/contato'];
  const entries = [];

  for (const slug of Object.keys(ptLp)) {
    entries.push({
      url: `${SITE.url}/condicoes/${slug}`,
      lastModified: now,
      alternates: { languages: { 'pt-BR': `${SITE.url}/condicoes/${slug}`, en: `${SITE.url}/en/condicoes/${slug}` } },
      changeFrequency: 'monthly',
      priority: 0.9
    });
    entries.push({ url: `${SITE.url}/en/condicoes/${slug}`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 });
  }

  for (const p of staticPaths) {
    entries.push({
      url: `${SITE.url}${p}`,
      lastModified: now,
      alternates: { languages: { 'pt-BR': `${SITE.url}${p}`, en: `${SITE.url}/en${p}` } },
      changeFrequency: p === '/blog' ? 'daily' : 'monthly',
      priority: p === '' ? 1 : 0.8
    });
    entries.push({ url: `${SITE.url}/en${p}`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 });
  }

  for (const slug of getPostSlugs('pt')) {
    entries.push({
      url: `${SITE.url}/blog/${slug}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7
    });
    entries.push({ url: `${SITE.url}/en/blog/${slug}`, lastModified: now, changeFrequency: 'weekly', priority: 0.5 });
  }

  return entries;
}
