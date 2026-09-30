# Oladehinde Felusi — E-commerce Prototype

A high-fidelity, clickable bilingual (English / Arabic, full RTL) storefront prototype for **Oladehinde Felusi — Handdyed & Designed in Lagos**. Built for a client pitch: every page works, but orders, payments, and form submissions are simulated.

**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS (logical `ms-/me-/ps-/pe-/start-/end-` utilities) · next-intl (`/en/…` and `/ar/…`) · local mock data · client-side cart (React context + `localStorage`).

---

## Run it

Requires Node.js 18.17+ (Node 20 or 22 recommended).

```bash
npm install
npm run dev          # http://localhost:3000  → redirects to /en or /ar based on browser language
npm run build        # production build (all 79 pages are statically generated)
npm start            # serve the production build
```

### Deploy to Vercel

1. Push this folder to a Git repo (GitHub, GitLab, or Bitbucket) and import it in Vercel. No special settings are needed.
2. Set environment variables (see `.env.example`):
   - `NEXT_PUBLIC_SITE_URL`: the final URL, e.g. `https://oladehinde-felusi.vercel.app`. It's used for canonical URLs, hreflang, the sitemap, and Open Graph. Lighthouse's SEO "canonical" check only passes once this matches the deployed domain.
   - `NEXT_PUBLIC_WHATSAPP_NUMBER`: digits only, international format (currently a placeholder).

---

## Folder structure

```
src/
├── app/
│   ├── layout.tsx                 Root pass-through (html lives in [locale]/layout)
│   ├── not-found.tsx              Fallback 404 outside locale routing
│   ├── sitemap.ts / robots.ts     Both locales, with hreflang alternates
│   └── [locale]/
│       ├── layout.tsx             <html lang dir>, fonts, providers, header/footer, Organization JSON-LD
│       ├── page.tsx               Home
│       ├── shop/                  All products + filters/sort
│       ├── collections/[slug]/    iro-buba-sets · adire-fabrics · tie-dye · bespoke
│       ├── products/[slug]/       Product page (gallery/zoom, sizes, custom measurements, yards)
│       ├── cart/  checkout/  checkout/confirmation/
│       ├── craft/  our-story/  bespoke/  workshops/
│       ├── journal/  journal/[slug]/
│       ├── size-guide/  shipping-returns/  faq/  contact/
│       ├── not-found.tsx          Localized 404
│       └── [...rest]/             Sends unknown paths to the localized 404
├── components/                    Header (mega-menu), CartDrawer, SearchOverlay, ProductGallery,
│                                  ProductPurchase, ShopClient, CheckoutClient, forms, Logo, AdireMotif…
├── context/StoreProvider.tsx      Cart + currency + drawer/search state (persisted to localStorage)
├── data/
│   ├── products.ts                ★ 16 products (EN + AR)
│   ├── prices.ts                  ★ ALL prices (per currency), shipping rates, workshop prices, bespoke budgets
│   ├── collections.ts             Collection names/descriptions
│   ├── journal.ts                 3 sample articles (EN + AR)
│   └── content.ts                 Craft timeline, workshops, FAQ, size chart, countries, placeholder testimonials
├── messages/
│   ├── en.ts                      ★ English UI copy
│   └── ar.ts                      ★ Arabic UI copy (flagged for native-speaker review)
├── i18n/                          next-intl routing + request config
├── lib/
│   ├── catalog.ts                 Catalogue access layer (swap for a real backend here)
│   ├── currency.ts                Currencies, locale defaults, deterministic price formatting
│   ├── seo.ts                     Metadata builder (canonical, hreflang, OG) + JSON-LD helpers
│   ├── site.ts                    ★ Site URL, WhatsApp number, email, Instagram (placeholders)
│   └── fonts.ts                   Self-hosted Fraunces, Inter, IBM Plex Sans Arabic
├── fonts/                         woff2 files (no Google Fonts request at runtime)
└── middleware.ts                  Locale detection + redirect
public/images/                     Client photos (cropped from the supplied Instagram-format images)
```

## Where to edit things

| To change… | Edit |
|---|---|
| Product names, descriptions, fabric, technique, care, lead time, sizes, stock status, images | `src/data/products.ts` |
| **Any price** (per product, per currency), shipping rates, workshop prices, bespoke budget ranges | `src/data/prices.ts` |
| Collection names and descriptions | `src/data/collections.ts` |
| Button labels, headings, page copy (English) | `src/messages/en.ts` |
| Arabic UI copy | `src/messages/ar.ts` (same keys; TypeScript flags any missing key) |
| FAQ, craft timeline, workshops, size chart, checkout countries, testimonials | `src/data/content.ts` |
| Journal articles | `src/data/journal.ts` |
| WhatsApp number, email, Instagram handle, site URL | `src/lib/site.ts` or env vars |
| Brand colours and fonts | `tailwind.config.ts` (`indigo`, `cotton`, `rust`, `ochre`, `ink`) · `src/lib/fonts.ts` |
| Currencies offered, default currency per locale | `src/lib/currency.ts` |

**Adding a product:** add an entry to `products.ts`, add its prices to `prices.ts` (the build fails if a price is missing), and put its photos in `public/images/`. Set an image's `src: null` to show a labelled placeholder block until the photo arrives.

## Key behaviour

- **Locales:** `/en` (LTR) and `/ar` (`<html lang="ar" dir="rtl">`). The language switcher keeps you on the same page. Layouts mirror automatically through logical CSS properties: nav, grids, drawers, forms, breadcrumbs, and the timeline. Directional arrows and chevrons flip; the logo doesn't.
- **Currencies:** NGN, USD, GBP, AED, SAR. Each has its own stored price rather than being converted. The default is NGN on `/en` and AED on `/ar`, and the shopper's choice is remembered.
- **Product page:** image gallery with hover zoom and a full-screen lightbox (arrow keys work, and are RTL-aware); a "one-of-a-kind" notice; lead time; a size selector plus a **Custom measurements** form (bust, waist, hips, wrapper length, top length, shoulder, sleeve, height, and notes) that is saved with the cart item. Fabrics use a **yards** selector with a live total.
- **Cart:** a drawer and a full page. Both show custom measurements per item, let you edit quantity, and show the subtotal in the selected currency.
- **Checkout (simulated):** three steps (contact → shipping → payment), then a confirmation page:
  - Shipping methods depend on the country: Lagos and Nigeria-wide delivery for Nigerian addresses, International Express for everywhere else.
  - Payment is a "Paystack / Flutterwave — demo mode" screen.
  - Every step is clearly labelled as a prototype.
- **SEO:**
  - Metadata is set per page and per locale, with canonical and hreflang tags (en, ar, x-default) and Open Graph.
  - JSON-LD: Organization on every page, Product with an Offer per currency, BreadcrumbList, Article, and FAQPage.
  - `sitemap.xml` covers both locales, and there's a `robots.txt`.
- **Accessibility:**
  - Skip link, visible focus rings, and keyboard-operable menus, drawers, and accordions (Escape closes overlays).
  - Closed drawers are `inert`, and form fields are labelled.
  - Brand colours were chosen to meet WCAG AA contrast.
  - `prefers-reduced-motion` is respected.

## Lighthouse (local production build, mobile simulation)

| Page | Performance | Accessibility | Best practices | SEO* |
|---|---|---|---|---|
| /en | 88 | 100 | 100 | 92 |
| /ar | 86 | 100 | 100 | 92 |
| /en/products/arewa… | 87 | 100 | 100 | 92 |
| /en/shop | 90 | 100 | 100 | 92 |

\*The only SEO deduction is the canonical check, because the local server's domain differs from `NEXT_PUBLIC_SITE_URL`. It passes on the real domain. Performance was measured on a throttled sandbox machine and should be higher on Vercel's CDN.

## What is mocked vs. what needs a real backend

| Area | In this prototype | Needed for launch |
|---|---|---|
| Products and prices | Local TS files | A commerce backend or CMS (e.g. Shopify Storefront API, Medusa, Sanity + a custom API). Replace the functions in `lib/catalog.ts`. |
| Inventory and stock | Static "Ready to ship" / "Made to order" flags | Real stock tracking; made-to-order capacity |
| Cart | Browser `localStorage` | Server cart or checkout session (optional) |
| Checkout and payment | Simulated; no charge | Paystack and/or Flutterwave integration, with webhooks to confirm payment |
| Orders | Stored in `sessionStorage` for the confirmation page only | Order database, admin view, and emails (confirmation, dispatch) |
| Shipping rates | Flat placeholder rates | Real rates from the logistics partner (e.g. DHL, GIG, Sendbox) |
| Newsletter | Shows a success state only | An email provider (Mailchimp, Brevo, Klaviyo…) |
| Contact, bespoke, and workshop forms | Show a success state only; nothing is sent | A form backend (Resend or Formspree), CRM, or email; file storage for reference images |
| Workshop booking | Mock form | A booking/payment tool or custom flow |
| Instagram gallery | Static images | Instagram Graph API or an embed widget |
| Search | Client-side over mock data | Backend search (e.g. Algolia) once the catalogue grows |

## Placeholder content the client must supply

- **Photography:** clean product shots (front, back, detail) for every piece. The current images are cropped from Instagram-format posts and include watermarks. Also needed: lifestyle and model shots, the Arewa embellishment close-up, a flat-lay of the Ochre Chevron fabric, a bespoke fitting photo, process photos for the craft timeline (steps 2 and 6), a founder portrait, and a studio photo.
- **Founder story:** the *Our Story* page copy (it's marked "[Placeholder]").
- **Real testimonials:** with the customers' permission. The current ones are labelled "[Sample review]".
- **Contact details:** WhatsApp Business number, email address, Instagram handle (confirm `@oladehindefelusi`), and studio address.
- **Final product list:** names, prices per currency, sizes, lead times, and fabric/technique details.
- **Workshop details:** dates, venue, prices, and capacity.
- **Shipping:** rates, carriers, and delivery times.
- **Policies:** returns/exchanges policy wording, terms, and privacy policy.
- **Logo:** high-resolution logo files. The logo here is redrawn as SVG from the supplied artwork and should be checked against the master file.
- **Arabic copy:** approval by a native Arabic reviewer.

See **PROTOTYPE-NOTES.md** for the developer checklist.
