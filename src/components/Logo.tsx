/**
 * Oladehinde Felusi logo, redrawn as SVG from the supplied artwork:
 * a 3×3 grid of diamonds over a bar, with the wordmark beneath.
 * Never mirrored in RTL (logos keep their orientation).
 */
type Props = { className?: string; variant?: 'full' | 'mark' | 'horizontal'; title?: string };

const Mark = ({ size = 48 }: { size?: number }) => (
  <svg width={size} height={size * (7.6 / 6)} viewBox="0 0 6 7.6" aria-hidden fill="currentColor">
    {[0, 1, 2].map((r) =>
      [0, 1, 2].map((c) => (
        <path key={`${r}${c}`} d={`M${c * 2 + 1} ${r * 2}l1 1-1 1-1-1z`} />
      )),
    )}
    <rect x="0" y="6.7" width="6" height="0.45" />
  </svg>
);

export function Logo({ className = '', variant = 'horizontal', title = 'Oladehinde Felusi' }: Props) {
  if (variant === 'mark') {
    return (
      <span className={className} role="img" aria-label={title} dir="ltr">
        <Mark />
      </span>
    );
  }
  if (variant === 'full') {
    return (
      <span className={`inline-flex flex-col items-center gap-3 ${className}`} role="img" aria-label={title} dir="ltr">
        <Mark size={64} />
        <span className="flex flex-col items-center leading-none">
          <span className="font-sans text-lg font-bold tracking-[0.3em]">OLADEHINDE</span>
          <span className="mt-1.5 font-sans text-base font-light tracking-[0.3em]">FELUSI</span>
        </span>
      </span>
    );
  }
  return (
    <span className={`inline-flex items-center gap-3 ${className}`} role="img" aria-label={title} dir="ltr">
      <Mark size={22} />
      <span className="flex flex-col leading-none">
        <span className="font-sans text-[0.8rem] font-bold tracking-[0.28em] sm:text-sm">OLADEHINDE</span>
        <span className="mt-1 font-sans text-[0.7rem] font-light tracking-[0.34em] sm:text-xs">FELUSI</span>
      </span>
    </span>
  );
}
