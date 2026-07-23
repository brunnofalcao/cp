import { getPostSlugs } from '../lib/posts';
import { SITE } from '../lib/site';
import ptLp from '../content/landing/pt.json';

export default function sitemap() {
  const now = new Date();
  const entries = [];

  const push = (path, priority, changeFrequency) => {
    entries.push({
      url: `${SITE.url}${path}`,
      lastModified: now,
      changeFrequency,
      priority,
      alternates: { languages: { 'pt-BR': `${SITE.url}${path}`, en: `${SITE.url}/en${path}` } }
    });
    entries.push({
      url: `${SITE.url}/en${path}`,
      lastModified: now,
      changeFrequency,
      priority: Math.max(0.3, priority - 0.2)
    });
  };

  push('', 1, 'monthly');
  push('/abordagem', 0.9, 'monthly');
  push('/areas', 0.9, 'monthly');
  push('/sobre', 0.8, 'monthly');
  push('/blog', 0.8, 'daily');
  push('/contato', 0.8, 'monthly');

  for (const slug of Object.keys(ptLp)) push(`/condicoes/${slug}`, 0.9, 'monthly');
  for (const slug of getPostSlugs('pt')) push(`/blog/${slug}`, 0.7, 'weekly');

  return entries;
}
