/*
 * ──────────────────────────────────────────────────────────────────
 *  MOCK PRODUCT CATALOGUE
 *  Structured so it can later be swapped for a commerce backend
 *  (Shopify, Medusa, Saleor…): see `lib/catalog.ts` for the access layer.
 *  Prices live separately in `data/prices.ts`.
 *
 *  ⚠️ ALL ARABIC AND FRENCH COPY IN THIS FILE NEEDS NATIVE-SPEAKER REVIEW
 *     BEFORE LAUNCH (machine-assisted drafts).
 * ──────────────────────────────────────────────────────────────────
 */
import type { LocalizedString } from '@/lib/l10n';
import type { CollectionSlug } from './collections';

export type Fabric = 'cotton' | 'chiffon' | 'satin';
export type StockStatus = 'ready' | 'made-to-order';
export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';

export type ProductImage = {
  /** Path under /public, or null to render a labelled placeholder block. */
  src: string | null;
  alt: LocalizedString;
};

export type Product = {
  slug: string;
  collection: CollectionSlug;
  name: LocalizedString;
  tagline: LocalizedString;
  description: LocalizedString;
  fabric: Fabric;
  technique: LocalizedString;
  care: LocalizedString;
  leadTime: LocalizedString;
  /** 'yard' = fabric sold by the yard (quantity-in-yards selector instead of sizes). */
  unit: 'piece' | 'yard';
  sizes: Size[];
  stock: StockStatus;
  images: ProductImage[];
  featured?: boolean;
  /** ISO date — used for "Newest" sorting. */
  addedAt: string;
};

const ALL_SIZES: Size[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

/* Shared care copy */
const careCotton: LocalizedString = {
  en: 'Hand wash cold, separately, with a mild soap. Do not bleach or wring. Dry inside out in the shade. Warm iron on the reverse. Some natural indigo transfer is normal in the first washes.',
  fr: 'Lavage à la main à froid, séparément, avec un savon doux. Ne pas javelliser ni essorer. Sécher à l’envers, à l’ombre. Repasser tiède sur l’envers. Un léger dégorgement de l’indigo est normal lors des premiers lavages.',
  ar: 'يُغسل يدويًا بماء بارد وبشكل منفصل بصابون لطيف. لا يُستخدم المُبيِّض ولا يُعصر. يُجفَّف مقلوبًا في الظل. يُكوى بحرارة دافئة على الوجه الداخلي. من الطبيعي انتقال قليل من صبغة النيلة في الغسلات الأولى.',
};
const careSilky: LocalizedString = {
  en: 'Dry clean recommended. Alternatively hand wash cold with a silk-safe detergent, roll in a towel to remove water and hang to dry in the shade. Cool iron on the reverse with a pressing cloth.',
  fr: 'Nettoyage à sec recommandé. Sinon, lavage à la main à froid avec une lessive pour soie, rouler dans une serviette pour retirer l’eau et suspendre à l’ombre. Repasser à basse température sur l’envers avec une pattemouille.',
  ar: 'يُنصح بالتنظيف الجاف. أو يُغسل يدويًا بماء بارد بمنظف مخصص للحرير، ثم يُلف في منشفة لإزالة الماء ويُعلّق ليجف في الظل. يُكوى بحرارة منخفضة على الوجه الداخلي مع قطعة قماش واقية.',
};
const careFabric: LocalizedString = {
  en: 'Pre-wash before sewing: soak in cold water with a spoon of salt and a splash of vinegar to set the dye, then rinse until the water runs clear. Dry in the shade.',
  fr: 'Laver avant de coudre : faire tremper dans l’eau froide avec une cuillerée de sel et un trait de vinaigre pour fixer la teinture, puis rincer jusqu’à ce que l’eau soit claire. Sécher à l’ombre.',
  ar: 'يُغسل قبل الخياطة: يُنقع في ماء بارد مع ملعقة ملح وقليل من الخل لتثبيت الصبغة، ثم يُشطف حتى يصفو الماء. يُجفَّف في الظل.',
};

const lead = {
  ready: { en: 'Ready to ship — dispatched in 2–4 working days', fr: 'Prêt à expédier — envoyé sous 2 à 4 jours ouvrés', ar: 'جاهز للشحن — يُرسل خلال ٢–٤ أيام عمل' },
  set: { en: 'Dyed and made in 2–3 weeks', fr: 'Teint et confectionné en 2 à 3 semaines', ar: 'يُصبغ ويُخاط خلال ٢–٣ أسابيع' },
  gown: { en: 'Dyed and made in 2–3 weeks', fr: 'Teint et confectionné en 2 à 3 semaines', ar: 'يُصبغ ويُخاط خلال ٢–٣ أسابيع' },
  fabric: { en: 'Dyed to order in 7–10 days', fr: 'Teint sur commande en 7 à 10 jours', ar: 'يُصبغ حسب الطلب خلال ٧–١٠ أيام' },
  bespoke: { en: 'Consultation within 48 hours; made in 3–5 weeks', fr: 'Consultation sous 48 heures ; confection en 3 à 5 semaines', ar: 'استشارة خلال ٤٨ ساعة؛ التنفيذ خلال ٣–٥ أسابيع' },
};

export const products: Product[] = [
  /* ───────────── IRO & BUBA SETS ───────────── */
  {
    slug: 'arewa-embellished-iro-buba',
    collection: 'iro-buba-sets',
    name: { en: 'Arewa Embellished Iro & Buba', fr: 'Iro et Buba brodé Arewa', ar: 'طقم أريوا المطرّز — إيرو وبوبا' },
    tagline: { en: 'Our signature ceremonial set', fr: 'Notre ensemble de cérémonie signature', ar: 'الطقم الاحتفالي المميز للدار' },
    description: {
      en: '“Arewa” means beauty. Our signature set pairs a softly cowled buba with a long iro wrapper, dyed by hand in warm sand tones with a flash of coral. Each is finished with hand-applied embellishment along the neckline and wrapper edge, so it catches the light as you move. Wear the wrapper tied high for ceremony, or loose and flowing for evening.',
      fr: '« Arewa » signifie beauté. Notre ensemble signature associe une buba au col bénitier souple à un long pagne iro, teints à la main dans des tons sable chaleureux relevés d’une touche de corail. Chaque pièce est rehaussée de broderies posées à la main le long de l’encolure et du bord du pagne, pour capter la lumière à chaque mouvement. Portez le pagne noué haut pour une cérémonie, ou libre et fluide pour le soir.',
      ar: '«أريوا» تعني الجمال. يجمع طقمنا المميز بين بوبا (بلوزة) بياقة منسدلة ناعمة وإيرو (لفافة) طويلة، مصبوغين يدويًا بدرجات رملية دافئة مع لمسة مرجانية. تُزيَّن كل قطعة يدويًا على خط العنق وحافة اللفافة لتلتقط الضوء مع كل حركة. تُربط اللفافة عاليًا للمناسبات الرسمية أو تُترك منسدلة للسهرات.',
    },
    fabric: 'satin',
    technique: { en: 'Adire Eleko (starch-paste resist) with hand embellishment', fr: 'Adire Eleko (réserve à la pâte d’amidon) avec broderie à la main', ar: 'أديري إيليكو (مقاومة بعجينة النشا) مع تطريز يدوي' },
    care: careSilky,
    leadTime: lead.set,
    unit: 'piece',
    sizes: ALL_SIZES,
    stock: 'made-to-order',
    featured: true,
    addedAt: '2026-09-01',
    images: [
      { src: '/images/runway/runway-sand-coral.jpg', alt: { en: 'Arewa iro and buba in sand and coral, worn on the runway', fr: 'Iro et buba Arewa sable et corail, porté sur le podium', ar: 'طقم أريوا بلون رملي ومرجاني على منصة العرض' } },
      { src: '/images/details/runway-sand-coral-detail.jpg', alt: { en: 'Close-up of the Arewa geometric Adire pattern', fr: 'Gros plan sur le motif Adire géométrique de l’Arewa', ar: 'لقطة قريبة لنقش أديري الهندسي في طقم أريوا' } },
      { src: null, alt: { en: 'Arewa set — embellishment close-up (photo to be supplied)', fr: 'Ensemble Arewa — gros plan sur la broderie (photo à venir)', ar: 'طقم أريوا — لقطة قريبة للتطريز (الصورة لاحقًا)' } },
    ],
  },
  {
    slug: 'oyin-ochre-iro-buba',
    collection: 'iro-buba-sets',
    name: { en: 'Oyin Iro & Buba', fr: 'Iro et Buba Oyin', ar: 'طقم أويين — إيرو وبوبا' },
    tagline: { en: 'Honey ochre over deep teal', fr: 'Ocre miel sur bleu canard profond', ar: 'أصفر عسلي فوق أخضر مزرق عميق' },
    description: {
      en: '“Oyin” — honey. A one-shoulder buba in ochre chevron Adire over a floor-sweeping iro in deep teal with blush pebble motifs. Two hand-dyed cloths, deliberately mismatched, the way Lagos style has always done it.',
      fr: '« Oyin » — le miel. Une buba asymétrique en Adire à chevrons ocre sur un long iro bleu canard profond à motifs de galets rose poudré. Deux tissus teints à la main, volontairement dépareillés, comme le veut depuis toujours le style de Lagos.',
      ar: '«أويين» تعني العسل. بوبا بكتف واحد من قماش أديري بنقش متعرج بلون المغرة، فوق إيرو طويلة بلون أخضر مزرق عميق بنقوش حصى وردية. قماشان مصبوغان يدويًا، متباينان عن قصد، على طريقة أناقة لاغوس الأصيلة.',
    },
    fabric: 'cotton',
    technique: { en: 'Adire Eleko and tie-resist, two-cloth pattern mix', fr: 'Adire Eleko et réserve par ligature, mélange de deux tissus', ar: 'أديري إيليكو ومقاومة بالربط، مزيج من قماشين' },
    care: careCotton,
    leadTime: lead.set,
    unit: 'piece',
    sizes: ALL_SIZES,
    stock: 'made-to-order',
    featured: true,
    addedAt: '2026-08-12',
    images: [
      { src: '/images/products/ochre-teal-set.jpg', alt: { en: 'Oyin set on a dress form: ochre top and teal patterned wrapper', fr: 'Ensemble Oyin sur mannequin : haut ocre et pagne à motifs bleu canard', ar: 'طقم أويين على مجسّم: بلوزة بلون المغرة ولفافة منقوشة بالأخضر المزرق' } },
      { src: '/images/details/ochre-teal-set-detail.jpg', alt: { en: 'Close-up of the ochre chevron buba', fr: 'Gros plan sur la buba à chevrons ocre', ar: 'لقطة قريبة للبوبا بنقش متعرج بلون المغرة' } },
      { src: '/images/details/ochre-teal-set-skirt-detail.jpg', alt: { en: 'Close-up of the teal pebble-motif iro', fr: 'Gros plan sur l’iro bleu canard à motifs de galets', ar: 'لقطة قريبة للإيرو بنقش الحصى' } },
    ],
  },
  {
    slug: 'irawo-midnight-iro-buba',
    collection: 'iro-buba-sets',
    name: { en: 'Ìràwọ̀ Draped Iro & Buba', fr: 'Iro et Buba drapé Ìràwọ̀', ar: 'طقم إيراوو المنسدل — إيرو وبوبا' },
    tagline: { en: 'Midnight navy with copper bloom', fr: 'Bleu nuit et éclosion cuivrée', ar: 'كحلي ليلي مع زهرة نحاسية' },
    description: {
      en: '“Ìràwọ̀” — star. A one-shoulder buba draped into the wrapper, in midnight navy scattered with hand-drawn starbursts and a copper tie-dye bloom at the hip. Fluid, generous and easily worn with a long sleeve underlayer for modest occasions.',
      fr: '« Ìràwọ̀ » — l’étoile. Une buba asymétrique drapée jusqu’au pagne, bleu nuit parsemée d’étoiles dessinées à la main et d’une éclosion tie-dye cuivrée à la hanche. Fluide, ample, et facile à porter avec un sous-haut à manches longues pour les occasions qui demandent de la pudeur.',
      ar: '«إيراوو» تعني النجمة. بوبا بكتف واحد تنسدل لتلتقي باللفافة، بلون كحلي ليلي تتناثر عليه نجوم مرسومة يدويًا وزهرة نحاسية مصبوغة بالربط عند الورك. قطعة انسيابية واسعة يسهل ارتداؤها مع طبقة داخلية بأكمام طويلة للمناسبات المحتشمة.',
    },
    fabric: 'satin',
    technique: { en: 'Hand-drawn wax resist with tie-dye bloom', fr: 'Réserve à la cire dessinée à la main avec éclosion tie-dye', ar: 'مقاومة بالشمع مرسومة يدويًا مع زهرة مصبوغة بالربط' },
    care: careSilky,
    leadTime: lead.set,
    unit: 'piece',
    sizes: ALL_SIZES,
    stock: 'made-to-order',
    featured: true,
    addedAt: '2026-07-20',
    images: [
      { src: '/images/runway/runway-navy.jpg', alt: { en: 'Ìràwọ̀ draped navy set with copper bloom on the runway', fr: 'Ensemble drapé bleu nuit Ìràwọ̀ à éclosion cuivrée sur le podium', ar: 'طقم إيراوو الكحلي المنسدل مع الزهرة النحاسية على منصة العرض' } },
      { src: '/images/details/runway-navy-detail.jpg', alt: { en: 'Detail of starburst motifs and copper bloom', fr: 'Détail des motifs d’étoiles et de l’éclosion cuivrée', ar: 'تفاصيل نقوش النجوم والزهرة النحاسية' } },
    ],
  },
  {
    slug: 'asa-wrap-crop-set',
    collection: 'iro-buba-sets',
    name: { en: 'Àṣà Wrap Top & Iro', fr: 'Haut portefeuille et Iro Àṣà', ar: 'طقم آشا — بلوزة ملفوفة وإيرو' },
    tagline: { en: 'Tradition, tied differently', fr: 'La tradition, nouée autrement', ar: 'التقاليد، مربوطة بطريقة مختلفة' },
    description: {
      en: '“Àṣà” — culture, tradition. A contemporary take on the iro and buba: a rust silk-feel scarf top that crosses and ties at the neck, over an indigo leaf-and-grid Adire wrapper knotted at the hip. Order the wrapper longer for a fully modest length.',
      fr: '« Àṣà » — culture, tradition. Une interprétation contemporaine de l’iro et buba : un haut foulard rouille au toucher soyeux, croisé et noué au cou, sur un pagne Adire indigo à motifs de feuilles et de quadrillage, noué à la hanche. Commandez le pagne plus long pour une longueur couvrante.',
      ar: '«آشا» تعني الثقافة والتقاليد. رؤية معاصرة للإيرو والبوبا: بلوزة وشاحية بلون الصدأ تتقاطع وتُربط عند العنق، فوق لفافة أديري نيلية بنقش أوراق وشبكة تُعقد عند الورك. يمكن طلب اللفافة أطول لطول محتشم بالكامل.',
    },
    fabric: 'chiffon',
    technique: { en: 'Adire Eleko stencil resist and tie-dye', fr: 'Adire Eleko au pochoir et tie-dye', ar: 'أديري إيليكو بالاستنسل ومقاومة بالربط' },
    care: careSilky,
    leadTime: lead.set,
    unit: 'piece',
    sizes: ALL_SIZES,
    stock: 'ready',
    addedAt: '2026-06-30',
    images: [
      { src: '/images/runway/runway-crop-set.jpg', alt: { en: 'Àṣà set: rust tied top and indigo Adire wrapper', fr: 'Ensemble Àṣà : haut noué rouille et pagne Adire indigo', ar: 'طقم آشا: بلوزة مربوطة بلون الصدأ ولفافة أديري نيلية' } },
      { src: '/images/details/runway-crop-set-detail.jpg', alt: { en: 'Close-up of the indigo leaf-and-grid wrapper', fr: 'Gros plan sur le pagne indigo à feuilles et quadrillage', ar: 'لقطة قريبة للفافة النيلية بنقش الأوراق والشبكة' } },
    ],
  },
  {
    slug: 'oba-mens-wrapper-set',
    collection: 'iro-buba-sets',
    name: { en: 'Ọba Men’s Wrapper & Shoulder Cloth', fr: 'Pagne et étole d’épaule homme Ọba', ar: 'طقم أوبا الرجالي — لفافة ووشاح كتف' },
    tagline: { en: 'For him — sunset orange and umber', fr: 'Pour lui — orange couchant et terre d’ombre', ar: 'للرجل — برتقالي الغروب والبني الترابي' },
    description: {
      en: '“Ọba” — king. A men’s wrapper in sunset orange Adire with a speckled umber shoulder cloth, worn in the old way across one shoulder. Includes a matching tie-dye head wrap.',
      fr: '« Ọba » — le roi. Un pagne homme en Adire orange couchant avec une étole d’épaule mouchetée terre d’ombre, portée à l’ancienne sur une épaule. Livré avec un couvre-chef tie-dye assorti.',
      ar: '«أوبا» تعني الملك. لفافة رجالية من قماش أديري بلون برتقالي الغروب مع وشاح كتف منقّط بالبني الترابي، يُرتدى على الطريقة القديمة فوق كتف واحد. يشمل الطقم غطاء رأس مصبوغًا بالربط.',
    },
    fabric: 'cotton',
    technique: { en: 'Adire Oniko (tie resist) and splatter resist', fr: 'Adire Oniko (réserve par ligature) et réserve par éclaboussures', ar: 'أديري أونيكو (مقاومة بالربط) ومقاومة بالرش' },
    care: careCotton,
    leadTime: lead.set,
    unit: 'piece',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stock: 'made-to-order',
    addedAt: '2026-06-02',
    images: [
      { src: '/images/runway/runway-mens-orange.jpg', alt: { en: 'Male model in orange Adire wrapper and umber shoulder cloth', fr: 'Mannequin homme en pagne Adire orange et étole terre d’ombre', ar: 'عارض يرتدي لفافة أديري برتقالية ووشاح كتف بني' } },
      { src: '/images/details/runway-mens-orange-detail.jpg', alt: { en: 'Close-up of the orange wrapper pattern', fr: 'Gros plan sur le motif du pagne orange', ar: 'لقطة قريبة لنقش اللفافة البرتقالية' } },
    ],
  },

  /* ───────────── TIE-DYE PIECES ───────────── */
  {
    slug: 'midnight-gold-tie-dye-wrap',
    collection: 'tie-dye',
    name: { en: 'Midnight Gold Tie-Dye Wrap', fr: 'Paréo tie-dye Midnight Gold', ar: 'وشاح «ذهب منتصف الليل» المصبوغ بالربط' },
    tagline: { en: 'Wear it five ways', fr: 'Se porte de cinq façons', ar: 'يُرتدى بخمس طرق' },
    description: {
      en: 'A long fringed wrap in black with bursts of gold and cream, created by crumple-tying the cloth before dyeing. Wear it as a one-shoulder mini dress, a sarong, a stole or a head wrap — or pair it over an iro.',
      fr: 'Un long paréo à franges noir, éclaboussé d’or et de crème, obtenu en froissant et en nouant le tissu avant la teinture. Portez-le en mini-robe asymétrique, en sarong, en étole ou en couvre-chef — ou par-dessus un iro.',
      ar: 'وشاح طويل بأهداب، أسود تتفجر فيه لمسات ذهبية وكريمية، ناتجة عن تجعيد القماش وربطه قبل الصبغ. يُرتدى كفستان قصير بكتف واحد أو كتنورة ملفوفة أو كشال أو غطاء رأس، أو فوق الإيرو.',
    },
    fabric: 'cotton',
    technique: { en: 'Crumple tie-dye, discharge and over-dye', fr: 'Tie-dye froissé, décoloration et surteinture', ar: 'صبغ بالتجعيد والربط، ثم إزالة لون وإعادة صبغ' },
    care: careCotton,
    leadTime: lead.ready,
    unit: 'piece',
    sizes: [],
    stock: 'ready',
    featured: true,
    addedAt: '2026-09-10',
    images: [
      { src: '/images/products/midnight-gold.jpg', alt: { en: 'Black and gold tie-dye wrap tied as a one-shoulder dress on a dress form', fr: 'Paréo tie-dye noir et or noué en robe asymétrique sur mannequin', ar: 'وشاح أسود وذهبي مصبوغ بالربط ملفوف كفستان بكتف واحد على مجسّم' } },
      { src: '/images/details/midnight-gold-detail.jpg', alt: { en: 'Close-up of gold bursts on black', fr: 'Gros plan sur les éclats dorés sur fond noir', ar: 'لقطة قريبة للمسات الذهبية على الأسود' } },
    ],
  },
  {
    slug: 'cocoa-halter-dress',
    collection: 'tie-dye',
    name: { en: 'Cocoa Halter Dress', fr: 'Robe dos nu Cocoa', ar: 'فستان «كاكاو» برقبة رسن' },
    tagline: { en: 'Liquid cocoa, golden ladders', fr: 'Cacao liquide, échelles dorées', ar: 'كاكاو سائل ودرجات ذهبية' },
    description: {
      en: 'A draped halter dress in cocoa with ladder-and-dot tie-dye stripes in gold and blush, gathered at the waist with a cord. The asymmetric hem moves beautifully; order with our matching head wrap.',
      fr: 'Une robe drapée dos nu couleur cacao, rayée de motifs tie-dye en échelles et en points or et rose poudré, resserrée à la taille par un cordon. L’ourlet asymétrique bouge magnifiquement ; à commander avec notre couvre-chef assorti.',
      ar: 'فستان برقبة رسن منسدل بلون الكاكاو، تزيّنه خطوط مصبوغة بالربط على شكل سلالم ونقاط بالذهبي والوردي، ويُجمع عند الخصر بحبل. حافته غير المتماثلة تتحرك بجمال؛ ويمكن طلبه مع غطاء رأس مطابق.',
    },
    fabric: 'satin',
    technique: { en: 'Stitch-resist (Adire Alabere) tie-dye', fr: 'Tie-dye à réserve cousue (Adire Alabere)', ar: 'صبغ بمقاومة الخياطة (أديري ألابيري)' },
    care: careSilky,
    leadTime: lead.gown,
    unit: 'piece',
    sizes: ALL_SIZES,
    stock: 'made-to-order',
    addedAt: '2026-08-25',
    images: [
      { src: '/images/runway/runway-cocoa.jpg', alt: { en: 'Cocoa halter dress with gold tie-dye stripes on the runway', fr: 'Robe dos nu cacao à rayures tie-dye dorées sur le podium', ar: 'فستان الكاكاو برقبة رسن وخطوط ذهبية على منصة العرض' } },
      { src: '/images/details/runway-cocoa-detail.jpg', alt: { en: 'Close-up of ladder-and-dot stripes', fr: 'Gros plan sur les rayures en échelles et en points', ar: 'لقطة قريبة لخطوط السلالم والنقاط' } },
    ],
  },
  {
    slug: 'ember-halter-dress',
    collection: 'tie-dye',
    name: { en: 'Ember Twist Halter Dress', fr: 'Robe dos nu torsadée Ember', ar: 'فستان «جمرة» الملتف برقبة رسن' },
    tagline: { en: 'Rust to marigold, hand-drawn', fr: 'De la rouille au souci, dessiné à la main', ar: 'من الصدأ إلى القطيفة، برسم يدوي' },
    description: {
      en: 'A rust-to-marigold ombré halter with a twisted front, hand-drawn feather motifs and a hand-lettered border at the hem. Every ombré is dipped by eye, so no two are the same.',
      fr: 'Une robe dos nu en dégradé de la rouille au souci, au devant torsadé, avec des motifs de plumes dessinés à la main et une bordure calligraphiée à l’ourlet. Chaque dégradé est trempé à l’œil : il n’y en a pas deux pareils.',
      ar: 'فستان برقبة رسن بتدرج من لون الصدأ إلى القطيفة، بواجهة ملتفّة ونقوش ريش مرسومة يدويًا وحاشية مخطوطة يدويًا عند الطرف. كل تدرج يُغمس بالعين المجردة، فلا تتشابه قطعتان.',
    },
    fabric: 'satin',
    technique: { en: 'Dip-dye ombré with hand-drawn resist', fr: 'Dégradé par trempage avec réserve dessinée à la main', ar: 'تدرج بالغمس مع مقاومة مرسومة يدويًا' },
    care: careSilky,
    leadTime: lead.gown,
    unit: 'piece',
    sizes: ALL_SIZES,
    stock: 'ready',
    featured: true,
    addedAt: '2026-08-18',
    images: [
      { src: '/images/runway/runway-rust-halter.jpg', alt: { en: 'Rust ombré twist halter dress on the runway', fr: 'Robe dos nu torsadée en dégradé rouille sur le podium', ar: 'فستان ملتف بتدرج لون الصدأ على منصة العرض' } },
      { src: '/images/details/runway-rust-halter-detail.jpg', alt: { en: 'Close-up of the twist front and feather motifs', fr: 'Gros plan sur le devant torsadé et les motifs de plumes', ar: 'لقطة قريبة للواجهة الملتفة ونقوش الريش' } },
    ],
  },
  {
    slug: 'plum-column-gown',
    collection: 'tie-dye',
    name: { en: 'Plum Column Gown', fr: 'Robe colonne Plum', ar: 'فستان «برقوق» المستقيم' },
    tagline: { en: 'Heirloom motifs in plum and cream', fr: 'Motifs d’héritage prune et crème', ar: 'نقوش تراثية بالبرقوقي والكريمي' },
    description: {
      en: 'A strapless column in deep plum, banded with cream motifs inspired by the storytelling panels of classic Adire. Add a matching stole or bolero for a covered-shoulder version.',
      fr: 'Une robe colonne bustier prune profond, ceinturée de bandes de motifs crème inspirés des panneaux narratifs de l’Adire classique. Ajoutez une étole ou un boléro assorti pour couvrir les épaules.',
      ar: 'فستان مستقيم بلا حمالات بلون البرقوق العميق، تحيط به أشرطة من نقوش كريمية مستوحاة من اللوحات القصصية في أديري الكلاسيكي. يمكن إضافة شال أو سترة قصيرة مطابقة لنسخة تغطي الكتفين.',
    },
    fabric: 'satin',
    technique: { en: 'Adire Eleko hand-painted starch resist', fr: 'Adire Eleko à réserve d’amidon peinte à la main', ar: 'أديري إيليكو بعجينة نشا مرسومة يدويًا' },
    care: careSilky,
    leadTime: lead.gown,
    unit: 'piece',
    sizes: ALL_SIZES,
    stock: 'made-to-order',
    addedAt: '2026-07-28',
    images: [
      { src: '/images/runway/runway-plum.jpg', alt: { en: 'Strapless plum column gown with cream Adire bands', fr: 'Robe colonne bustier prune à bandes Adire crème', ar: 'فستان برقوقي مستقيم بلا حمالات بأشرطة أديري كريمية' } },
      { src: '/images/details/runway-plum-detail.jpg', alt: { en: 'Close-up of the plum and cream motifs', fr: 'Gros plan sur les motifs prune et crème', ar: 'لقطة قريبة للنقوش البرقوقية والكريمية' } },
    ],
  },
  {
    slug: 'lagoon-draped-gown',
    collection: 'tie-dye',
    name: { en: 'Lagoon Draped Gown', fr: 'Robe drapée Lagoon', ar: 'فستان «البحيرة» المنسدل' },
    tagline: { en: 'Named for the Lagos lagoon', fr: 'Baptisée d’après la lagune de Lagos', ar: 'مستوحى من بحيرة لاغوس' },
    description: {
      en: 'Deep lagoon teal, wrapped and draped from a single length of hand-dyed cloth, with pale aqua paisley and dotted resist lines. Pairs with a printed head wrap.',
      fr: 'Un bleu canard profond comme la lagune, enveloppé et drapé dans une seule longueur de tissu teint à la main, avec des motifs cachemire aqua pâle et des lignes de réserve pointillées. S’accorde avec un couvre-chef imprimé.',
      ar: 'أخضر مزرق عميق بلون بحيرة لاغوس، ملفوف ومنسدل من قطعة واحدة من القماش المصبوغ يدويًا، بنقوش بيزلي فيروزية فاتحة وخطوط منقطة. يُنسّق مع غطاء رأس منقوش.',
    },
    fabric: 'satin',
    technique: { en: 'Hand-drawn wax resist, single dye bath', fr: 'Réserve à la cire dessinée à la main, un seul bain de teinture', ar: 'مقاومة بالشمع مرسومة يدويًا، حوض صبغ واحد' },
    care: careSilky,
    leadTime: lead.gown,
    unit: 'piece',
    sizes: ALL_SIZES,
    stock: 'made-to-order',
    addedAt: '2026-07-05',
    images: [
      { src: '/images/runway/runway-teal.jpg', alt: { en: 'Teal draped gown with aqua paisley on the runway', fr: 'Robe drapée bleu canard à motifs cachemire aqua sur le podium', ar: 'فستان منسدل بالأخضر المزرق بنقوش بيزلي على منصة العرض' } },
      { src: '/images/details/runway-teal-detail.jpg', alt: { en: 'Close-up of aqua paisley resist', fr: 'Gros plan sur la réserve cachemire aqua', ar: 'لقطة قريبة لنقوش البيزلي الفيروزية' } },
    ],
  },
  {
    slug: 'heart-ombre-gown',
    collection: 'tie-dye',
    name: { en: 'Ìfẹ́ Heart Ombré Gown', fr: 'Robe dégradée à cœurs Ìfẹ́', ar: 'فستان «إيفي» بقلوب متدرجة' },
    tagline: { en: 'Love, dyed by hand', fr: 'L’amour, teint à la main', ar: 'الحب، مصبوغ باليد' },
    description: {
      en: '“Ìfẹ́” — love. A mermaid gown in wine-to-coral ombré, covered in hand-cut heart resists that swirl towards a sweeping train. A statement for engagements and anniversaries.',
      fr: '« Ìfẹ́ » — l’amour. Une robe sirène en dégradé du lie-de-vin au corail, couverte de cœurs en réserve découpés à la main qui tourbillonnent jusqu’à une ample traîne. Une pièce forte pour les fiançailles et les anniversaires de mariage.',
      ar: '«إيفي» تعني الحب. فستان بقصّة حورية البحر بتدرج من لون النبيذ إلى المرجاني، تغطيه قلوب مقصوصة يدويًا تلتف نحو ذيل منساب. قطعة لافتة لحفلات الخطوبة والذكرى السنوية.',
    },
    fabric: 'chiffon',
    technique: { en: 'Hand-cut stencil resist with dip-dye ombré', fr: 'Réserve au pochoir découpé à la main avec dégradé par trempage', ar: 'مقاومة باستنسل مقصوص يدويًا مع تدرج بالغمس' },
    care: careSilky,
    leadTime: lead.gown,
    unit: 'piece',
    sizes: ALL_SIZES,
    stock: 'made-to-order',
    addedAt: '2026-05-14',
    images: [
      { src: '/images/products/heart-ombre.jpg', alt: { en: 'Wine and coral heart-pattern gown with train on a dress form', fr: 'Robe à traîne à motifs de cœurs lie-de-vin et corail sur mannequin', ar: 'فستان بنقش القلوب بلون النبيذ والمرجاني بذيل على مجسّم' } },
      { src: '/images/details/heart-ombre-detail.jpg', alt: { en: 'Close-up of hand-cut heart motifs', fr: 'Gros plan sur les motifs de cœurs découpés à la main', ar: 'لقطة قريبة لنقوش القلوب المقصوصة يدويًا' } },
    ],
  },

  /* ───────────── ADIRE FABRICS (by the yard) ───────────── */
  {
    slug: 'indigo-kaleidoscope-adire',
    collection: 'adire-fabrics',
    name: { en: 'Indigo Kaleidoscope Adire', fr: 'Adire Kaléidoscope indigo', ar: 'قماش أديري «المشكال النيلي»' },
    tagline: { en: 'Squares, crosses and ripples', fr: 'Carrés, croix et ondulations', ar: 'مربعات وصلبان وتموجات' },
    description: {
      en: 'Cobalt-indigo cloth patterned with nested squares, cross-hatching and ripple motifs, laid out in panels as in the classic Adire tradition. Ideal for a full iro and buba (allow 5–6 yards).',
      fr: 'Tissu indigo cobalt orné de carrés imbriqués, de hachures croisées et d’ondulations, disposés en panneaux comme dans la tradition de l’Adire classique. Idéal pour un iro et buba complet (prévoir 5 à 6 yards).',
      ar: 'قماش بلون النيلي الكوبالتي بنقوش مربعات متداخلة وتظليل متقاطع وتموجات، موزعة في ألواح على طريقة أديري الكلاسيكية. مثالي لطقم إيرو وبوبا كامل (احسبي ٥–٦ ياردات).',
    },
    fabric: 'cotton',
    technique: { en: 'Adire Eleko starch-paste resist', fr: 'Adire Eleko à réserve de pâte d’amidon', ar: 'أديري إيليكو بعجينة النشا' },
    care: careFabric,
    leadTime: lead.fabric,
    unit: 'yard',
    sizes: [],
    stock: 'ready',
    featured: true,
    addedAt: '2026-09-05',
    images: [
      { src: '/images/products/indigo-kaleidoscope.jpg', alt: { en: 'Length of indigo Kaleidoscope Adire draped on a dress form', fr: 'Coupon d’Adire Kaléidoscope indigo drapé sur mannequin', ar: 'قطعة من قماش أديري المشكال النيلي على مجسّم' } },
      { src: '/images/details/indigo-kaleidoscope-detail.jpg', alt: { en: 'Close-up of nested square and cross motifs', fr: 'Gros plan sur les motifs de carrés imbriqués et de croix', ar: 'لقطة قريبة لنقوش المربعات المتداخلة والصلبان' } },
    ],
  },
  {
    slug: 'indigo-ripple-adire',
    collection: 'adire-fabrics',
    name: { en: 'Indigo Ripple Adire', fr: 'Adire Ondulation indigo', ar: 'قماش أديري «التموّج النيلي»' },
    tagline: { en: 'Water and stitches', fr: 'Eau et points de couture', ar: 'ماء وغُرَز' },
    description: {
      en: 'Vivid indigo with bands of swirling water motifs and stitched crosses. A lighter hand than our Kaleidoscope, lovely for wrap dresses and head wraps.',
      fr: 'Un indigo vif, rythmé de bandes de motifs d’eau tourbillonnante et de croix cousues. Plus léger au toucher que notre Kaléidoscope, parfait pour les robes portefeuille et les couvre-chefs.',
      ar: 'نيلي زاهٍ بأشرطة من نقوش الماء الدوّامة وصلبان مخيطة. أخف ملمسًا من قماش المشكال، وجميل لفساتين اللف وأغطية الرأس.',
    },
    fabric: 'cotton',
    technique: { en: 'Adire Eleko and Alabere (stitch resist)', fr: 'Adire Eleko et Alabere (réserve cousue)', ar: 'أديري إيليكو وألابيري (مقاومة بالخياطة)' },
    care: careFabric,
    leadTime: lead.fabric,
    unit: 'yard',
    sizes: [],
    stock: 'ready',
    addedAt: '2026-08-02',
    images: [
      { src: '/images/products/indigo-drape.jpg', alt: { en: 'Indigo Ripple Adire draped as a dress on a dress form', fr: 'Adire Ondulation indigo drapé en robe sur mannequin', ar: 'قماش أديري التموج النيلي ملفوف كفستان على مجسّم' } },
      { src: '/images/details/indigo-drape-detail.jpg', alt: { en: 'Close-up of swirl and cross motifs', fr: 'Gros plan sur les motifs de tourbillons et de croix', ar: 'لقطة قريبة لنقوش الدوامات والصلبان' } },
    ],
  },
  {
    slug: 'emerald-garden-adire',
    collection: 'adire-fabrics',
    name: { en: 'Emerald Garden Adire', fr: 'Adire Jardin émeraude', ar: 'قماش أديري «الحديقة الزمردية»' },
    tagline: { en: 'Palms, spirals and blossoms', fr: 'Palmes, spirales et fleurs', ar: 'نخيل ولوالب وأزهار' },
    description: {
      en: 'Emerald and bottle-green panels of palm fronds, spirals and four-petal blossoms, with a tie-dyed border. A joyful, celebratory cloth for aso-ebi and garden weddings.',
      fr: 'Des panneaux émeraude et vert bouteille ornés de palmes, de spirales et de fleurs à quatre pétales, avec une bordure tie-dye. Un tissu joyeux et festif pour l’aso-ebi et les mariages en plein air.',
      ar: 'ألواح بالأخضر الزمردي والأخضر الداكن تحمل سعف النخيل واللوالب وأزهارًا بأربع بتلات، مع حافة مصبوغة بالربط. قماش مبهج واحتفالي لأزياء المناسبات الجماعية وحفلات الزفاف في الحدائق.',
    },
    fabric: 'cotton',
    technique: { en: 'Adire Eleko with tie-dyed border', fr: 'Adire Eleko à bordure tie-dye', ar: 'أديري إيليكو مع حافة مصبوغة بالربط' },
    care: careFabric,
    leadTime: lead.fabric,
    unit: 'yard',
    sizes: [],
    stock: 'made-to-order',
    featured: true,
    addedAt: '2026-07-15',
    images: [
      { src: '/images/products/emerald-adire.jpg', alt: { en: 'Emerald Garden Adire draped on a dress form', fr: 'Adire Jardin émeraude drapé sur mannequin', ar: 'قماش أديري الحديقة الزمردية على مجسّم' } },
      { src: '/images/details/emerald-adire-detail.jpg', alt: { en: 'Close-up of palm and spiral motifs', fr: 'Gros plan sur les motifs de palmes et de spirales', ar: 'لقطة قريبة لنقوش النخيل واللوالب' } },
    ],
  },
  {
    slug: 'ochre-chevron-adire',
    collection: 'adire-fabrics',
    name: { en: 'Ochre Chevron Adire', fr: 'Adire Chevrons ocre', ar: 'قماش أديري «المغرة المتعرّج»' },
    tagline: { en: 'Sunlit zig-zags', fr: 'Zigzags ensoleillés', ar: 'تعرجات مشمسة' },
    description: {
      en: 'Warm ochre cloth with honey chevrons and fine hand-drawn lines — the fabric of our Oyin buba. Beautiful on its own or mixed with indigo.',
      fr: 'Un tissu ocre chaud à chevrons couleur miel et fines lignes dessinées à la main — celui de notre buba Oyin. Superbe seul ou associé à l’indigo.',
      ar: 'قماش بلون المغرة الدافئ بتعرجات عسلية وخطوط دقيقة مرسومة يدويًا — وهو قماش بوبا طقم أويين. جميل بمفرده أو ممزوجًا بالنيلي.',
    },
    fabric: 'cotton',
    technique: { en: 'Hand-painted starch resist', fr: 'Réserve d’amidon peinte à la main', ar: 'مقاومة بعجينة النشا مرسومة يدويًا' },
    care: careFabric,
    leadTime: lead.fabric,
    unit: 'yard',
    sizes: [],
    stock: 'ready',
    addedAt: '2026-06-20',
    images: [
      { src: '/images/details/ochre-teal-set-detail.jpg', alt: { en: 'Ochre chevron Adire cloth close-up', fr: 'Gros plan sur le tissu Adire à chevrons ocre', ar: 'لقطة قريبة لقماش أديري بنقش متعرج بلون المغرة' } },
      { src: null, alt: { en: 'Ochre Chevron — full-width fabric flat-lay (photo to be supplied)', fr: 'Chevrons ocre — tissu à plat sur toute la largeur (photo à venir)', ar: 'قماش المغرة المتعرج — صورة كاملة للقماش مفرودًا (لاحقًا)' } },
    ],
  },

  /* ───────────── BESPOKE ───────────── */
  {
    slug: 'bespoke-commission',
    collection: 'bespoke',
    name: { en: 'Bespoke Iro & Buba Commission', fr: 'Commande sur-mesure Iro et Buba', ar: 'طلب تفصيل خاص — إيرو وبوبا' },
    tagline: { en: 'Deposit to begin your commission', fr: 'Acompte pour lancer votre commande', ar: 'عربون لبدء طلبك الخاص' },
    description: {
      en: 'Reserve a bespoke commission. After checkout we arrange a consultation (in the Lagos studio or by video call) to agree colours, pattern, silhouette and embellishment. The deposit is deducted from your final price.',
      fr: 'Réservez une création sur-mesure. Après le paiement, nous organisons une consultation (à l’atelier de Lagos ou en visio) pour définir couleurs, motif, silhouette et broderies. L’acompte est déduit du prix final.',
      ar: 'احجزي طلب تفصيل خاص. بعد إتمام الطلب نرتّب استشارة (في استوديو لاغوس أو عبر مكالمة فيديو) للاتفاق على الألوان والنقش والقصّة والتطريز. يُخصم العربون من السعر النهائي.',
    },
    fabric: 'cotton',
    technique: { en: 'Your choice of Adire technique', fr: 'La technique Adire de votre choix', ar: 'تقنية أديري من اختيارك' },
    care: careCotton,
    leadTime: lead.bespoke,
    unit: 'piece',
    sizes: ALL_SIZES,
    stock: 'made-to-order',
    addedAt: '2026-01-01',
    images: [
      { src: null, alt: { en: 'Bespoke fitting in the Lagos studio — lifestyle photo (to be supplied)', fr: 'Essayage sur-mesure à l’atelier de Lagos — photo d’ambiance (à venir)', ar: 'جلسة قياس في استوديو لاغوس — صورة (لاحقًا)' } },
    ],
  },
];
