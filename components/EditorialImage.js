import Image from 'next/image';

/**
 * Imagem editorial com slot marcado.
 *
 * Enquanto `src` for nulo, renderiza um placeholder identificado com o código do slot,
 * o formato esperado e o briefing — nunca uma foto genérica de banco de imagens.
 * Os códigos correspondem à tabela de produção em docs/CONTENT_REQUIRED.md.
 */
export default function EditorialImage({
  id,
  src,
  alt,
  ratio,
  priority = false,
  sizes = '100vw',
  tag,
  brief,
  px,
  minPx,
  format = 'JPG ou WebP',
  caption,
  className = ''
}) {
  const style = ratio ? { aspectRatio: ratio } : undefined;

  if (!src) {
    const orientation = !ratio
      ? 'Livre'
      : (() => {
          const [w, h] = ratio.split('/').map((n) => parseFloat(n.trim()));
          if (w > h) return 'Horizontal';
          if (h > w) return 'Vertical';
          return 'Quadrada';
        })();

    return (
      <figure className={`figure ph-slot ${className}`} style={style} data-content-required={id || true}>
        <div className="ph">
          {id && <span className="ph-id">{id}</span>}
          <span className="ph-tag">{tag || 'Fotografia'}</span>
          {brief && <span className="ph-desc">{brief}</span>}
          <span className="ph-dims">{px ? `${px} px` : minPx ? `mín. ${minPx} px` : ''}</span>
          <span className="ph-spec">
            {orientation}
            {ratio ? ` · ${ratio.replace(/\s/g, '')}` : ''}
            {` · ${format}`}
          </span>
        </div>
        {caption && <figcaption>{caption}</figcaption>}
      </figure>
    );
  }

  return (
    <figure className={`figure ${className}`} style={style}>
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} quality={82} />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
