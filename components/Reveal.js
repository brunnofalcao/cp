'use client';

import { useEffect, useRef } from 'react';

/**
 * Entrada com fade e deslocamento de 14px. Apenas transform e opacity.
 * Desligado automaticamente sob prefers-reduced-motion.
 */
export default function Reveal({ children, delay = 0, as: Tag = 'div', className = '', ...rest }) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      node.classList.add('in');
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          node.style.transitionDelay = `${delay}ms`;
          node.classList.add('in');
          io.unobserve(node);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
    );

    io.observe(node);
    return () => io.disconnect();
  }, [delay]);

  return (
    <Tag ref={ref} className={`reveal ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
