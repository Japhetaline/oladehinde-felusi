# Prototype notes — developer verification checklist

Things to verify or decide before this prototype becomes the production site.

## 1. Arabic copy review (high priority)
- [ ] **All Arabic is a machine-assisted Modern Standard Arabic draft.** It must be reviewed by a native Arabic copywriter, ideally one with Gulf e-commerce experience. The Arabic lives in:
  - `src/messages/ar.ts` (all UI copy; flagged in its header comment)
  - `src/data/products.ts`, `collections.ts`, `journal.ts`, `content.ts` (the `ar:` fields; each file is flagged in its header comment)
- [ ] **Decide the form of address.** Calls to action currently use the **feminine** imperative (تسوّقي, أضيفي), which suits a mostly womenswear audience. Menswear exists (the Ọba set), so the reviewer may prefer neutral or plural forms (تسوّق / تسوّقوا).
- [ ] **Confirm the transliterations:** Adire → أديري, Iro → إيرو, Buba → بوبا, Arewa → أريوا, and the product names (أويين، إيراوو، آشا، أوبا، إيفي). These are explained in Arabic where first introduced: the home hero and the Craft glossary.
- [ ] **Digits:** prices and dates use Western digits (common on Gulf e-commerce), while some Arabic sentences use Arabic-Indic numerals (٢–٣ أسابيع). Pick one convention.
- [ ] **Currency symbols:** AED shows as `د.إ` and SAR as `ر.س` after the amount in Arabic. Confirm the preferred display.
- [ ] Arabic meta titles and descriptions (`meta` namespace in `ar.ts`) should be SEO-reviewed for Gulf and North African search terms.

## 2. Payment gateway
- [ ] Choose **Paystack**, **Flutterwave**, or both. Check:
  - Multi-currency settlement for USD, GBP, AED, and SAR (both gateways support international cards, but settlement currencies and fees differ).
  - Whether Gulf buyers need Apple Pay or local methods.
- [ ] Replace the demo payment step in `src/components/CheckoutClient.tsx` with the gateway's inline or redirect checkout, and confirm orders server-side through **webhooks**. Never trust the client redirect alone.
- [ ] Decide whether prices are fixed per currency (as now) or converted at checkout. Keep `data/prices.ts` in sync with what the gateway actually charges.

## 3. Shipping
- [ ] Replace the placeholder flat rates in `src/data/prices.ts` (`shippingRates`) and the delivery times in the messages with real quotes. Candidates: DHL Express or Aramex for international (Aramex is strong in the Gulf); GIG, Sendbox, or local couriers for Lagos and Nigeria.
- [ ] Decide whether international shipping is weight- or zone-based, and whether duties are prepaid (DDP) or paid on delivery (DAP). The copy currently says duties are paid by the recipient.
- [ ] Confirm the checkout country list (`src/data/content.ts` → `countries`).

## 4. Photography and assets
- [ ] The current images are **cropped from the supplied Instagram posts**. The product-panel crops still carry the "OLADEHINDE FELUSI" watermark, and the runway shots show AFWN branding. Commission clean e-commerce photography: front, back, detail, and on-model, on a consistent background. Aim for 3:4 ratio and at least 1600px on the long edge.
- [ ] Confirm usage rights for the Africa Fashion Week Nigeria runway photos (photographer credit or licence).
- [ ] Fill every labelled placeholder block. Search for `src: null` in `data/products.ts`, plus the Our Story portrait and studio images and the craft-timeline steps 2 and 6.
- [ ] Get the master logo files (SVG) and compare them with the redrawn SVG in `src/components/Logo.tsx`, `public/icon.svg`, and `public/apple-icon.png`.
- [ ] Create a proper Open Graph image (1200×630) per locale.

## 5. Content and legal
- [ ] Founder story (Our Story page), team names, studio address.
- [ ] Replace the sample testimonials with real reviews, with the customers' permission. Don't launch with invented reviews.
- [ ] Returns policy wording, terms of sale, privacy policy, and cookie notice. Consider NDPA (Nigeria) and GDPR/UK GDPR obligations for diaspora buyers.
- [ ] Confirm the WhatsApp number (currently the placeholder `2340000000000`), email, and Instagram handle in `src/lib/site.ts` / env.
- [ ] Workshop dates, prices, capacity, and venue.

## 6. Technical before launch
- [ ] Set `NEXT_PUBLIC_SITE_URL` to the production domain. Canonical URLs, hreflang tags, and the sitemap depend on it.
- [ ] Move the catalogue to a real backend or CMS by reimplementing `src/lib/catalog.ts`.
- [ ] Wire up the forms (contact, bespoke with reference-image upload, workshops, newsletter) to real services, with spam protection (e.g. Turnstile or hCaptcha).
- [ ] Add analytics (GA4 or Plausible) and Meta/TikTok pixels if needed, with consent.
- [ ] Re-run Lighthouse on the deployed URL for `/en`, `/ar`, a product page, and `/shop`. The local sandbox scored Performance 86–90, Accessibility 98–100, Best practices 100, and SEO 92 (the only failure was canonical, because of the localhost domain).
- [ ] Test on real devices (iOS Safari, Android Chrome), especially Arabic RTL rendering and the mobile menu, cart drawer, and filter sheet.
- [ ] Get an accessibility spot-check with a screen reader (VoiceOver/NVDA) in both languages.

## 7. Nice-to-haves for phase 2
- Customer accounts and order history; wishlist.
- "Notify me" for sold-out one-of-a-kind pieces.
- Per-country price display with automatic currency detection (geo-IP), keeping manual override.
- Gift wrapping and gift notes.
- A lookbook page for runway collections (e.g. AFWN).
- A French locale for North Africa.
