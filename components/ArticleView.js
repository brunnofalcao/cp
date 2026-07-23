'use client';

import { useEffect } from 'react';
import { track } from '../lib/analytics';

export default function ArticleView({ slug, lang, category }) {
  useEffect(() => {
    track('article_view', { article_slug: slug, category, lang });
  }, [slug, lang, category]);
  return null;
}
