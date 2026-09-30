// Fallback for requests that bypass locale routing entirely.
import Link from 'next/link';
import { fraunces, inter, plexArabic } from '@/lib/fonts';

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body className={`${fraunces.variable} ${inter.variable} ${plexArabic.variable} flex min-h-screen items-center justify-center bg-cotton p-8 text-center`}>
        <div>
          <p className="eyebrow mb-3">404</p>
          <h1 className="text-4xl text-indigo">Page not found</h1>
          <p lang="fr" className="mt-2 text-xl text-indigo">Page introuvable</p>
          <p lang="ar" dir="rtl" className="mt-2 font-arabic text-xl text-indigo">الصفحة غير موجودة</p>
          <div className="mt-8 flex justify-center gap-3">
            <Link href="/en" className="btn-primary">English</Link>
            <Link href="/fr" className="btn-outline">Français</Link>
            <Link href="/ar" className="btn-outline font-arabic">العربية</Link>
          </div>
        </div>
      </body>
    </html>
  );
}
