import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { collections } from '@/data/collections';
import { l } from '@/lib/l10n';
import { INSTAGRAM_URL, CONTACT_EMAIL, whatsappLink } from '@/lib/site';
import { Logo } from './Logo';
import { NewsletterForm } from './NewsletterForm';
import { AdireMotif } from './AdireMotif';
import { InstagramIcon, MailIcon, WhatsAppIcon } from './Icons';

export function Footer() {
  const t = useTranslations('footer');
  const tn = useTranslations('nav');
  const tl = useTranslations('newsletter');
  const locale = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-8 overflow-hidden bg-indigo-900 text-cotton">
      <AdireMotif variant="band" className="text-cotton" opacity={0.3} />
      <div className="container grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-3">
          <Logo variant="full" className="text-cotton" />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-cotton/80">{t('about')}</p>
          <div className="mt-6 flex gap-3">
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex h-10 w-10 items-center justify-center border border-cotton/30 hover:bg-cotton hover:text-indigo">
              <InstagramIcon />
            </a>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="flex h-10 w-10 items-center justify-center border border-cotton/30 hover:bg-cotton hover:text-indigo">
              <WhatsAppIcon width={20} height={20} />
            </a>
            <a href={`mailto:${CONTACT_EMAIL}`} aria-label="Email" className="flex h-10 w-10 items-center justify-center border border-cotton/30 hover:bg-cotton hover:text-indigo">
              <MailIcon />
            </a>
          </div>
        </div>
        <nav aria-label={t('shop')} className="md:col-span-2">
          <h2 className="mb-4 font-sans text-xs font-semibold uppercase tracking-brand text-ochre">{t('shop')}</h2>
          <ul className="space-y-2.5 text-sm text-cotton/85">
            <li><Link href="/shop" className="hover:text-white hover:underline">{tn('shopAll')}</Link></li>
            {collections.map((c) => (
              <li key={c.slug}><Link href={`/collections/${c.slug}`} className="hover:text-white hover:underline">{l(c.name, locale)}</Link></li>
            ))}
          </ul>
        </nav>
        <nav aria-label={t('help')} className="md:col-span-2">
          <h2 className="mb-4 font-sans text-xs font-semibold uppercase tracking-brand text-ochre">{t('help')}</h2>
          <ul className="space-y-2.5 text-sm text-cotton/85">
            <li><Link href="/size-guide" className="hover:text-white hover:underline">{tn('sizeGuide')}</Link></li>
            <li><Link href="/shipping-returns" className="hover:text-white hover:underline">{tn('shipping')}</Link></li>
            <li><Link href="/faq" className="hover:text-white hover:underline">{tn('faq')}</Link></li>
            <li><Link href="/contact" className="hover:text-white hover:underline">{tn('contact')}</Link></li>
          </ul>
        </nav>
        <nav aria-label={t('brand')} className="md:col-span-2">
          <h2 className="mb-4 font-sans text-xs font-semibold uppercase tracking-brand text-ochre">{t('brand')}</h2>
          <ul className="space-y-2.5 text-sm text-cotton/85">
            <li><Link href="/our-story" className="hover:text-white hover:underline">{tn('story')}</Link></li>
            <li><Link href="/craft" className="hover:text-white hover:underline">{tn('craft')}</Link></li>
            <li><Link href="/bespoke" className="hover:text-white hover:underline">{tn('bespoke')}</Link></li>
            <li><Link href="/workshops" className="hover:text-white hover:underline">{tn('workshops')}</Link></li>
            <li><Link href="/journal" className="hover:text-white hover:underline">{tn('journal')}</Link></li>
          </ul>
        </nav>
        <div className="md:col-span-3">
          <h2 className="mb-2 font-serif text-2xl">{tl('title')}</h2>
          <p className="mb-5 text-sm text-cotton/80">{tl('body')}</p>
          <NewsletterForm tone="light" idPrefix="footer-nl" />
        </div>
      </div>
      <div className="border-t border-cotton/15">
        <div className="container flex flex-col gap-2 py-6 text-xs text-cotton/70 md:flex-row md:items-center md:justify-between">
          <p>{t('rights', { year })}</p>
          <p>{t('payments')}</p>
          <p>{t('prototype')}</p>
        </div>
      </div>
    </footer>
  );
}
