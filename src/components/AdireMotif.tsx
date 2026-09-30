/**
 * Original Adire-inspired decorative motifs, drawn in SVG.
 * They evoke common resist-dye vocabulary (nested squares, spirals, dotted
 * lines, crosses) without copying any specific artwork.
 */
import { useId } from 'react';

type Props = { className?: string; opacity?: number; variant?: 'grid' | 'band' };

export function AdireMotif({ className = '', opacity = 1, variant = 'grid' }: Props) {
  const id = useId().replace(/:/g, '');
  if (variant === 'band') {
    return (
      <svg className={className} aria-hidden width="100%" height="28" preserveAspectRatio="none">
        <defs>
          <pattern id={`band-${id}`} width="56" height="28" patternUnits="userSpaceOnUse">
            <path d="M0 14h56" stroke="currentColor" strokeWidth="1" strokeDasharray="2 4" opacity={opacity} />
            <path d="M28 4l10 10-10 10-10-10z" fill="none" stroke="currentColor" strokeWidth="1.2" opacity={opacity} />
            <circle cx="28" cy="14" r="2" fill="currentColor" opacity={opacity} />
            <circle cx="4" cy="14" r="1.4" fill="currentColor" opacity={opacity} />
          </pattern>
        </defs>
        <rect width="100%" height="28" fill={`url(#band-${id})`} />
      </svg>
    );
  }
  return (
    <svg className={className} aria-hidden width="100%" height="100%">
      <defs>
        <pattern id={`grid-${id}`} width="120" height="120" patternUnits="userSpaceOnUse">
          <g fill="none" stroke="currentColor" strokeWidth="1.2" opacity={opacity}>
            {/* panel 1: nested squares */}
            <rect x="8" y="8" width="44" height="44" />
            <rect x="16" y="16" width="28" height="28" />
            <rect x="24" y="24" width="12" height="12" />
            {/* panel 2: spiral */}
            <path d="M90 30c0-3 3-5 6-4s4 5 2 8-7 4-10 1-3-9 1-12 11-3 14 2 2 12-3 15" />
            {/* panel 3: crosses */}
            <path d="M14 76l8 8M22 76l-8 8M38 76l8 8M46 76l-8 8M14 96l8 8M22 96l-8 8M38 96l8 8M46 96l-8 8" />
            {/* panel 4: dotted rows */}
            <path d="M68 76h44M68 90h44M68 104h44" strokeDasharray="1 6" strokeWidth="2.4" />
            {/* dividers */}
            <path d="M60 0v120M0 60h120" strokeDasharray="3 3" strokeWidth="0.8" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#grid-${id})`} />
    </svg>
  );
}
