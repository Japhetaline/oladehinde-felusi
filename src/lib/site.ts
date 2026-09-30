export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://oladehinde-felusi-prototype.vercel.app').replace(/\/$/, '');

// PLACEHOLDER — replace with the brand's real WhatsApp Business number (digits only, international format)
export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '2340000000000';
// PLACEHOLDER contact details — client to confirm
export const CONTACT_EMAIL = 'hello@oladehindefelusi.com';
export const INSTAGRAM_URL = 'https://www.instagram.com/oladehindefelusi/';
export const INSTAGRAM_HANDLE = '@oladehindefelusi';

export const whatsappLink = (text?: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
