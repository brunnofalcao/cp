'use client';

import Link from 'next/link';
import { track } from '../lib/analytics';

export default function CtaLink({ href, event, lang, children, className, external = false, ...rest }) {
  const onClick = () => track(event, { lang });

  if (external) {
    return (
      <a className={className} href={href} rel="noopener" onClick={onClick} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link className={className} href={href} onClick={onClick} {...rest}>
      {children}
    </Link>
  );
}
