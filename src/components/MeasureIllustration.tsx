/**
 * Simple original line illustration of a dress form with measurement guides.
 * `highlight` selects which guide is emphasised.
 */
type Key = 'bust' | 'waist' | 'hips' | 'wrapper' | 'top' | 'shoulder' | 'sleeve' | 'height';

export function MeasureIllustration({ highlight, className = '' }: { highlight: Key; className?: string }) {
  const on = (k: Key) => (k === highlight ? { stroke: '#A4471F', strokeWidth: 2.5, opacity: 1 } : { stroke: '#1E2B5E', strokeWidth: 1, opacity: 0.12 });
  return (
    <svg viewBox="0 0 120 200" className={className} aria-hidden fill="none">
      {/* figure */}
      <g stroke="#1E2B5E" strokeWidth="1.3" strokeLinejoin="round" strokeLinecap="round">
        <circle cx="60" cy="18" r="10" />
        <path d="M54 28v6M66 28v6" />
        <path d="M36 38c8-4 16-4 24-4s16 0 24 4" />
        <path d="M36 38c-4 10-6 28-8 46M84 38c4 10 6 28 8 46" />
        <path d="M40 44c-2 10 0 18 6 26-3 8-8 16-8 30l-4 80h52l-4-80c0-14-5-22-8-30 6-8 8-16 6-26" />
      </g>
      {/* guides */}
      <g strokeLinecap="round">
        <path d="M38 56h44" {...on('bust')} strokeDasharray="3 2" />
        <path d="M44 72h32" {...on('waist')} strokeDasharray="3 2" />
        <path d="M37 98h46" {...on('hips')} strokeDasharray="3 2" />
        <path d="M98 72v108" {...on('wrapper')} />
        <path d="M22 36v58" {...on('top')} />
        <path d="M36 32h48" {...on('shoulder')} />
        <path d="M86 38l8 48" {...on('sleeve')} />
        <path d="M110 8v172" {...on('height')} />
      </g>
    </svg>
  );
}
