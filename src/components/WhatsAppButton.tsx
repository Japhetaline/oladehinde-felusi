import { useTranslations } from 'next-intl';
import { whatsappLink } from '@/lib/site';
import { WhatsAppIcon } from './Icons';

export function WhatsAppButton() {
  const t = useTranslations('common');
  return (
    <a
      href={whatsappLink(t('whatsappMessage'))}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t('whatsappChat')}
      title={t('whatsappChat')}
      className="fixed bottom-5 end-5 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-[#1F7A4A] text-white shadow-lg transition-transform hover:scale-105 focus-visible:outline-offset-4"
    >
      <WhatsAppIcon width={28} height={28} />
    </a>
  );
}
