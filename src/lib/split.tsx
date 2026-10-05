import type { ReactNode } from 'react';

/** Découpe un texte en mots (span.w) pour des animations échelonnées, en conservant le texte lisible. */
export function Words({ text }: { text: string }): ReactNode {
  return text.split(' ').map((w, i) => (
    <span className="w" key={i}>
      {w}{' '}
    </span>
  ));
}

export function Chars({ text }: { text: string }): ReactNode {
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {Array.from(text).map((c, i) => (
          <span className="c" key={i}>
            {c}
          </span>
        ))}
      </span>
    </>
  );
}
