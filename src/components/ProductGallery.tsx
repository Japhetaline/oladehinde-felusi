'use client';

import { useCallback, useEffect, useState, type MouseEvent } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { MediaImage } from './MediaImage';
import { ChevronBackIcon, ChevronIcon, CloseIcon } from './Icons';

type Img = { src: string | null; alt: string };

export function ProductGallery({ images }: { images: Img[] }) {
  const t = useTranslations();
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);
  const [lightbox, setLightbox] = useState(false);
  const current = images[active];

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  };

  const go = useCallback((dir: 1 | -1) => setActive((a) => (a + dir + images.length) % images.length), [images.length]);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      const rtl = document.documentElement.dir === 'rtl';
      if (e.key === 'Escape') setLightbox(false);
      if (e.key === 'ArrowRight') go(rtl ? -1 : 1);
      if (e.key === 'ArrowLeft') go(rtl ? 1 : -1);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [lightbox, go]);

  return (
    <div className="flex flex-col-reverse gap-4 md:flex-row">
      {images.length > 1 && (
        <ul className="no-scrollbar flex gap-3 overflow-x-auto md:w-20 md:flex-col" role="list">
          {images.map((img, i) => (
            <li key={i} className="shrink-0">
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={t('product.thumbnail', { index: i + 1 })}
                aria-current={i === active}
                className={`relative block h-24 w-20 overflow-hidden border-2 ${i === active ? 'border-indigo' : 'border-transparent opacity-70 hover:opacity-100'}`}
              >
                <MediaImage src={img.src} alt="" sizes="80px" className="absolute inset-0" />
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className="flex-1">
        {current.src ? (
          <div
            className="relative aspect-[3/4] cursor-zoom-in overflow-hidden bg-cotton-200"
            onMouseMove={onMove}
            onMouseLeave={() => setZoom(null)}
          >
            <Image
              src={current.src}
              alt={current.alt}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-200 ease-out"
              style={zoom ? { transform: 'scale(2)', transformOrigin: `${zoom.x}% ${zoom.y}%` } : undefined}
            />
            <button type="button" onClick={() => setLightbox(true)} className="absolute inset-0" aria-label={t('product.openZoom', { index: active + 1 })} />
            <span className="pointer-events-none absolute bottom-3 end-3 bg-cotton/90 px-2 py-1 text-[0.7rem] text-ink-muted">{t('product.zoomHint')}</span>
          </div>
        ) : (
          <MediaImage src={null} alt={current.alt} sizes="50vw" className="aspect-[3/4]" placeholderText={t('common.placeholderPhoto')} />
        )}
      </div>

      {lightbox && current.src && (
        <div className="fixed inset-0 z-[60] flex animate-fade-in items-center justify-center bg-indigo-950/95" role="dialog" aria-modal="true" aria-label={current.alt}>
          <button type="button" onClick={() => setLightbox(false)} className="absolute end-4 top-4 z-10 p-3 text-cotton" aria-label={t('common.close')} autoFocus>
            <CloseIcon width={28} height={28} />
          </button>
          {images.length > 1 && (
            <>
              <button type="button" onClick={() => go(-1)} className="absolute start-2 top-1/2 z-10 -translate-y-1/2 p-3 text-cotton md:start-6" aria-label={t('common.previous')}>
                <ChevronBackIcon width={32} height={32} />
              </button>
              <button type="button" onClick={() => go(1)} className="absolute end-2 top-1/2 z-10 -translate-y-1/2 p-3 text-cotton md:end-6" aria-label={t('common.next')}>
                <ChevronIcon width={32} height={32} />
              </button>
            </>
          )}
          <div className="relative h-[88vh] w-[92vw] max-w-5xl">
            <Image src={current.src} alt={current.alt} fill sizes="92vw" className="object-contain" />
          </div>
        </div>
      )}
    </div>
  );
}
