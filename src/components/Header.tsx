'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { useStore } from '@/context/StoreProvider';
import { collections } from '@/data/collections';
import { l } from '@/lib/l10n';
import { Logo } from './Logo';
import { CurrencySwitcher, LocaleSwitcher } from './Switchers';
import { BagIcon, ChevronDownIcon, ChevronIcon, CloseIcon, MenuIcon, SearchIcon } from './Icons';
import { AdireMotif } from './AdireMotif';
import { useInert } from '@/lib/useInert';

const primaryLinks = [
  { href: '/craft', key: 'craft' },
  { href: '/bespoke', key: 'bespoke' },
  { href: '/workshops', key: 'workshops' },
  { href: '/journal', key: 'journal' },
  { href: '/our-story', key: 'story' },
] as const;

export function Header() {
  const t = useTranslations('nav');
  const tc = useTranslations('common');
  const locale = useLocale();
  const pathname = usePathname();
  const { count, hydrated, setCartOpen, setSearchOpen } = useStore();
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const mobileRef = useInert<HTMLDivElement>(!mobileOpen);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    setMegaOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMegaOpen(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const openMega = () => {
    clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setMegaOpen(false), 150);
  };

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className={`sticky top-0 z-40 bg-cotton transition-shadow ${scrolled ? 'shadow-[0_1px_0_rgba(28,26,23,0.08)]' : ''}`}>
      <div className="container flex h-16 items-center justify-between gap-4 md:h-20">
        {/* Mobile: menu button */}
        <button
          type="button"
          className="-ms-2 p-2 lg:hidden"
          aria-label={tc('openMenu')}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen(true)}
        >
          <MenuIcon />
        </button>

        <Link href="/" className="text-indigo lg:me-8">
          <Logo />
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Main" className="hidden flex-1 lg:block">
          <ul className="flex items-center gap-7 text-sm">
            <li onMouseEnter={openMega} onMouseLeave={scheduleClose}>
              <button
                type="button"
                className={`flex items-center gap-1 py-7 hover:text-rust ${isActive('/shop') || isActive('/collections') ? 'text-rust' : ''}`}
                aria-expanded={megaOpen}
                aria-controls="mega-menu"
                onClick={() => setMegaOpen((o) => !o)}
              >
                {t('shop')} <ChevronDownIcon width={14} height={14} />
              </button>
            </li>
            {primaryLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`py-7 hover:text-rust ${isActive(link.href) ? 'text-rust' : ''}`}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                >
                  {t(link.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1 sm:gap-3">
          <div className="hidden items-center gap-4 md:flex">
            <LocaleSwitcher />
            <span className="h-4 w-px bg-ink/20" aria-hidden />
            <CurrencySwitcher id="currency-desktop" />
          </div>
          <button type="button" className="p-2 hover:text-rust" aria-label={tc('search')} onClick={() => setSearchOpen(true)}>
            <SearchIcon />
          </button>
          <button
            type="button"
            className="relative -me-2 p-2 hover:text-rust"
            aria-label={tc('openBag', { count: hydrated ? count : 0 })}
            onClick={() => setCartOpen(true)}
          >
            <BagIcon />
            {hydrated && count > 0 && (
              <span className="absolute -end-0.5 top-0 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-rust px-1 text-[10px] font-semibold text-white">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mega menu */}
      <div
        id="mega-menu"
        onMouseEnter={openMega}
        onMouseLeave={scheduleClose}
        className={`absolute inset-x-0 top-full hidden border-t border-ink/10 bg-cotton shadow-xl ${megaOpen ? 'animate-fade-in lg:block' : ''}`}
      >
        <div className="container grid grid-cols-12 gap-10 py-10">
          <div className="col-span-3">
            <p className="eyebrow mb-4">{t('collections')}</p>
            <ul className="space-y-3 font-serif text-xl text-indigo">
              {collections.map((c) => (
                <li key={c.slug}>
                  <Link href={`/collections/${c.slug}`} className="hover:text-rust">{l(c.name, locale)}</Link>
                </li>
              ))}
              <li className="pt-2 font-sans text-sm">
                <Link href="/shop" className="link-underline inline-flex items-center gap-1">
                  {t('shopAll')} <ChevronIcon width={14} height={14} />
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-span-3">
            <p className="eyebrow mb-4">{t('help')}</p>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/size-guide" className="hover:text-rust">{t('sizeGuide')}</Link></li>
              <li><Link href="/shipping-returns" className="hover:text-rust">{t('shipping')}</Link></li>
              <li><Link href="/faq" className="hover:text-rust">{t('faq')}</Link></li>
              <li><Link href="/contact" className="hover:text-rust">{t('contact')}</Link></li>
            </ul>
          </div>
          {collections.slice(0, 2).map((c) => (
            <Link key={c.slug} href={`/collections/${c.slug}`} className="group col-span-3">
              <div className="relative aspect-[4/5] overflow-hidden bg-cotton-200">
                {c.image && (
                  <Image src={c.image} alt={l(c.imageAlt, locale)} fill sizes="25vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                )}
              </div>
              <p className="mt-3 font-serif text-lg text-indigo">{l(c.name, locale)}</p>
              <p className="text-sm text-ink-muted">{l(c.short, locale)}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        ref={mobileRef}
        className={`fixed inset-0 z-50 lg:hidden ${mobileOpen ? '' : 'pointer-events-none'}`}
      >
        <div
          className={`absolute inset-0 bg-ink/40 transition-opacity ${mobileOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setMobileOpen(false)}
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-label={tc('menu')}
          className={`absolute inset-y-0 start-0 flex w-[88%] max-w-sm flex-col overflow-y-auto bg-cotton transition-transform duration-300 ${
            mobileOpen ? 'translate-x-0' : 'ltr:-translate-x-full rtl:translate-x-full'
          }`}
        >
          <div className="flex h-16 items-center justify-between border-b border-ink/10 px-5">
            <Logo className="text-indigo" />
            <button type="button" className="-me-2 p-2" aria-label={tc('close')} onClick={() => setMobileOpen(false)}>
              <CloseIcon />
            </button>
          </div>
          <nav aria-label="Mobile" className="flex-1 px-5 py-6">
            <p className="eyebrow mb-3">{t('collections')}</p>
            <ul className="mb-8 space-y-3 font-serif text-2xl text-indigo">
              <li><Link href="/shop">{t('shopAll')}</Link></li>
              {collections.map((c) => (
                <li key={c.slug}><Link href={`/collections/${c.slug}`}>{l(c.name, locale)}</Link></li>
              ))}
            </ul>
            <ul className="space-y-3 border-t border-ink/10 pt-6 text-base">
              {primaryLinks.map((link) => (
                <li key={link.href}><Link href={link.href}>{t(link.key)}</Link></li>
              ))}
              <li><Link href="/size-guide">{t('sizeGuide')}</Link></li>
              <li><Link href="/faq">{t('faq')}</Link></li>
              <li><Link href="/contact">{t('contact')}</Link></li>
            </ul>
          </nav>
          <div className="flex items-center justify-between border-t border-ink/10 px-5 py-4">
            <LocaleSwitcher />
            <CurrencySwitcher id="currency-mobile" />
          </div>
          <AdireMotif variant="band" className="text-indigo" opacity={0.35} />
        </div>
      </div>
    </header>
  );
}
