import { getTranslations, setRequestLocale } from 'next-intl/server';
import { pageMetadata } from '@/lib/seo';
import { CONTACT_EMAIL, INSTAGRAM_HANDLE, INSTAGRAM_URL, WHATSAPP_NUMBER, whatsappLink } from '@/lib/site';
import { PageHero } from '@/components/PageHero';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ContactForm } from '@/components/ContactForm';
import { InstagramIcon, MailIcon, PinIcon, WhatsAppIcon } from '@/components/Icons';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  return pageMetadata(locale, 'contact', '/contact');
}

export default async function ContactPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations('contact');
  const channels = [
    { icon: <WhatsAppIcon width={22} height={22} />, title: t('whatsapp'), body: t('whatsappBody'), value: `+${WHATSAPP_NUMBER}`, href: whatsappLink() },
    { icon: <MailIcon width={22} height={22} />, title: t('emailLabel'), body: '', value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
    { icon: <InstagramIcon width={22} height={22} />, title: t('instagram'), body: '', value: INSTAGRAM_HANDLE, href: INSTAGRAM_URL },
  ];
  return (
    <>
      <PageHero eyebrow={t('eyebrow')} title={t('title')} intro={t('intro')}>
        <Breadcrumbs items={[{ label: t('eyebrow') }]} className="mb-8" />
      </PageHero>
      <div className="container grid gap-14 py-16 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h2 className="mb-6 text-3xl text-indigo">{t('formTitle')}</h2>
          <ContactForm />
        </div>
        <aside className="space-y-4 lg:col-span-4 lg:col-start-9">
          {channels.map((c) => (
            <a key={c.title} href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="flex gap-4 border border-ink/10 bg-cotton-100 p-5 transition-colors hover:border-indigo">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-indigo text-cotton">{c.icon}</span>
              <span>
                <span className="block font-medium">{c.title}</span>
                {c.body && <span className="block text-xs text-ink-muted">{c.body}</span>}
                <span className="mt-1 block text-sm text-indigo" dir="ltr">{c.value}</span>
              </span>
            </a>
          ))}
          <div className="flex gap-4 border border-ink/10 bg-cotton-100 p-5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-indigo text-cotton"><PinIcon width={22} height={22} /></span>
            <span>
              <span className="block font-medium">{t('studio')}</span>
              <span className="block text-sm text-ink-muted">{t('studioBody')}</span>
            </span>
          </div>
          <p className="text-xs text-rust">{t('placeholderContacts')}</p>
        </aside>
      </div>
    </>
  );
}
