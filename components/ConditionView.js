'use client';

import { useEffect } from 'react';
import { track } from '../lib/analytics';

export default function ConditionView({ slug, lang }) {
  useEffect(() => {
    track('condition_view', { condition_slug: slug, lang });
  }, [slug, lang]);
  return null;
}
