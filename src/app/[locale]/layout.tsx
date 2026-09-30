import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { routing, isRtl, type Locale } from '@/i18n/routing';
import { fraunces, inter, plexArabic } from '@/lib/fonts';
import { SITE_URL } from '@/lib/site';
import { organizationJsonLd } from '@/lib/seo';
import { StoreProvider } from '@/context/StoreProvider';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { SearchOverlay } from '@/components/SearchOverlay';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { JsonLd } from '@/components/JsonLd';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: '#1E2B5E',
  width: 'device-width',
  initialScale: 1,
};

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta' });
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t('defaultTitle'), template: `%s | ${t('siteName')}` },
    description: t('defaultDescription'),
    applicationName: t('siteName'),
    icons: { icon: '/icon.svg', apple: '/apple-icon.png' },
    formatDetection: { telephone: false },
  };
}

export default async function LocaleLayout({ children, params: { locale } }: { children: ReactNode; params: { locale: string } }) {
  if (!routing.locales.includes(locale as Locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();
  const t = await getTranslations('common');
  const tm = await getTranslations('meta');

  return (
    <html lang={locale} dir={isRtl(locale) ? 'rtl' : 'ltr'} className={`${fraunces.variable} ${inter.variable} ${plexArabic.variable}`}>
      <body className="flex min-h-screen flex-col">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <StoreProvider locale={locale}>
            <a href="#main" className="sr-only z-[60] bg-indigo px-4 py-2 text-cotton focus:not-sr-only focus:fixed focus:start-4 focus:top-4">
              {t('skipToContent')}
            </a>
            <div className="bg-indigo text-cotton">
              <p className="container py-2 text-center text-[0.72rem] tracking-wide">
                <span className="me-2 inline-block bg-ochre px-1.5 py-0.5 text-[0.62rem] font-bold uppercase tracking-wider text-ink">Prototype</span>
                <span className="hidden sm:inline">{t('prototypeBanner')} · </span>
                {t('announcement')}
              </p>
            </div>
            <Header />
            <main id="main" className="flex-1">{children}</main>
            <Footer />
            <CartDrawer />
            <SearchOverlay />
            <WhatsAppButton />
          </StoreProvider>
        </NextIntlClientProvider>
        <JsonLd data={organizationJsonLd(locale, tm('siteName'), tm('defaultDescription'))} />
      </body>
    </html>
  );
}
