import type { ReactNode } from 'react';
import { AdireMotif } from './AdireMotif';

export function PageHero({ eyebrow, title, intro, children, tone = 'light' }: { eyebrow?: string; title: string; intro?: string; children?: ReactNode; tone?: 'light' | 'indigo' }) {
  const dark = tone === 'indigo';
  return (
    <section className={`relative overflow-hidden ${dark ? 'bg-indigo text-cotton' : 'bg-cotton-200/60'}`}>
      <AdireMotif className={`absolute inset-y-0 end-0 w-1/2 ${dark ? 'text-cotton' : 'text-indigo'} [mask-image:linear-gradient(to_left,black,transparent)] rtl:[mask-image:linear-gradient(to_right,black,transparent)]`} opacity={dark ? 0.14 : 0.1} />
      <div className="container relative py-14 md:py-20">
        {children}
        {eyebrow && <p className={`eyebrow mb-4 ${dark ? '!text-ochre' : ''}`}>{eyebrow}</p>}
        <h1 className={`max-w-3xl text-4xl leading-[1.08] md:text-6xl ${dark ? 'text-cotton' : 'text-indigo'}`}>{title}</h1>
        {intro && <p className={`mt-5 max-w-2xl text-lg leading-relaxed ${dark ? 'text-cotton/85' : 'text-ink-muted'}`}>{intro}</p>}
      </div>
    </section>
  );
}

export function PlaceholderNotice({ children }: { children: ReactNode }) {
  return (
    <p className="my-6 border-s-4 border-ochre bg-ochre-100 px-4 py-3 text-sm text-ink" role="note">
      {children}
    </p>
  );
}
