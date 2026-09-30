import Image from 'next/image';
import { AdireMotif } from './AdireMotif';

type Props = {
  src: string | null;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
  placeholderText?: string;
};

/**
 * next/image wrapper that falls back to a labelled, on-brand placeholder block
 * when the client has not yet supplied a photo.
 */
export function MediaImage({ src, alt, sizes, priority, className = '', imgClassName = '', placeholderText }: Props) {
  const pos = /\b(absolute|fixed)\b/.test(className) ? '' : 'relative';
  if (!src) {
    return (
      <div className={`${pos} flex items-center justify-center overflow-hidden bg-indigo-100 text-indigo ${className}`} role="img" aria-label={alt}>
        <AdireMotif className="absolute inset-0 text-indigo" opacity={0.18} />
        <div className="relative m-4 max-w-[80%] border border-indigo/30 bg-cotton/90 px-4 py-3 text-center text-xs leading-relaxed">
          {placeholderText && <span className="mb-1 block font-semibold uppercase tracking-brand text-rust">{placeholderText}</span>}
          {alt}
        </div>
      </div>
    );
  }
  return (
    <div className={`${pos} overflow-hidden bg-cotton-200 ${className}`}>
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={`object-cover ${imgClassName}`} />
    </div>
  );
}
