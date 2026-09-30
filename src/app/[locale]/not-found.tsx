import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { AdireMotif } from '@/components/AdireMotif';

export default function NotFound() {
  const t = useTranslations('notFound');
  return (
    <section className="relative overflow-hidden">
      <AdireMotif className="absolute inset-0 text-indigo" opacity={0.07} />
      <div className="container relative flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
        <p className="font-serif text-8xl text-indigo/20 md:text-9xl" aria-hidden>404</p>
        <h1 className="mt-4 text-4xl text-indigo md:text-5xl">{t('title')}</h1>
        <p className="mt-4 max-w-md text-lg text-ink-muted">{t('body')}</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-primary">{t('home')}</Link>
          <Link href="/shop" className="btn-outline">{t('shop')}</Link>
        </div>
      </div>
    </section>
  );
}
