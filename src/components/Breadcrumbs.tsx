import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ChevronIcon } from './Icons';

export type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items, className = '' }: { items: Crumb[]; className?: string }) {
  const t = useTranslations('common');
  return (
    <nav aria-label={t('breadcrumb')} className={`text-xs text-ink-muted ${className}`}>
      <ol className="flex flex-wrap items-center gap-1.5">
        <li><Link href="/" className="hover:text-rust">{t('home')}</Link></li>
        {items.map((c, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <ChevronIcon width={12} height={12} />
            {c.href && i < items.length - 1 ? (
              <Link href={c.href} className="hover:text-rust">{c.label}</Link>
            ) : (
              <span aria-current="page" className="text-ink">{c.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
