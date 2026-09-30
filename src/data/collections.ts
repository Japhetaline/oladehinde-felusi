/*
 * Collections. Arabic and French copy — NEEDS NATIVE-SPEAKER REVIEW BEFORE LAUNCH.
 */
import type { LocalizedString } from '@/lib/l10n';

export type CollectionSlug = 'iro-buba-sets' | 'adire-fabrics' | 'tie-dye' | 'bespoke';

export type Collection = {
  slug: CollectionSlug;
  name: LocalizedString;
  short: LocalizedString;
  description: LocalizedString;
  image: string | null;
  imageAlt: LocalizedString;
};

export const collections: Collection[] = [
  {
    slug: 'iro-buba-sets',
    name: { en: 'Iro & Buba Sets', fr: 'Ensembles Iro et Buba', ar: 'أطقم إيرو وبوبا' },
    short: { en: 'Wrapper & top, reimagined', fr: 'Le pagne et le haut, réinventés', ar: 'اللفافة والبلوزة برؤية معاصرة' },
    description: {
      en: 'The iro (wrapper) and buba (top) are the heart of Yoruba womenswear. Our sets keep their generous, graceful lines and pair them with hand-dyed Adire and hand embellishment — made for weddings, owambe celebrations, Eid gatherings and every occasion that deserves ceremony.',
      fr: 'L’iro (pagne) et la buba (haut) sont le cœur de la mode féminine yoruba. Nos ensembles en conservent les lignes amples et gracieuses, associées à l’Adire teint à la main et à des broderies faites main — pour les mariages, les fêtes owambe, les réunions de l’Aïd et toutes les occasions qui méritent une cérémonie.',
      ar: 'الإيرو (اللفافة) والبوبا (البلوزة) هما قلب الأزياء النسائية اليوروبية. تحافظ أطقمنا على خطوطهما الواسعة الأنيقة وتمزجهما بقماش أديري المصبوغ يدويًا وبتطريز يدوي — لحفلات الزفاف والأعياد وكل مناسبة تستحق الاحتفاء.',
    },
    image: '/images/runway/runway-sand-coral.jpg',
    imageAlt: { en: 'Model wearing a sand and coral Adire iro and buba on the runway', fr: 'Mannequin portant un iro et buba Adire sable et corail sur le podium', ar: 'عارضة ترتدي طقم إيرو وبوبا من أديري بلون رملي ومرجاني على منصة العرض' },
  },
  {
    slug: 'adire-fabrics',
    name: { en: 'Adire Fabrics', fr: 'Tissus Adire', ar: 'أقمشة أديري' },
    short: { en: 'Hand-dyed cloth, by the yard', fr: 'Tissu teint à la main, au yard', ar: 'قماش مصبوغ يدويًا، بالياردة' },
    description: {
      en: 'Hand-dyed Adire cloth sold by the yard, for your own tailor or our atelier. Every length is resist-dyed by hand in Lagos, so the pattern on your fabric will be its own.',
      fr: 'Tissu Adire teint à la main, vendu au yard, pour votre couturier ou notre atelier. Chaque coupon est teint à la main par réserve à Lagos : le motif de votre tissu sera unique.',
      ar: 'قماش أديري مصبوغ يدويًا يُباع بالياردة، لخيّاطك الخاص أو لمشغلنا. كل قطعة مصبوغة يدويًا في لاغوس بتقنية مقاومة الصبغة، لذا سيكون نقش قماشك فريدًا.',
    },
    image: '/images/products/indigo-kaleidoscope.jpg',
    imageAlt: { en: 'Length of indigo Adire fabric draped on a dress form', fr: 'Coupon de tissu Adire indigo drapé sur mannequin', ar: 'قطعة من قماش أديري النيلي على مجسّم عرض' },
  },
  {
    slug: 'tie-dye',
    name: { en: 'Tie-Dye Pieces', fr: 'Pièces tie-dye', ar: 'قطع مصبوغة بالربط' },
    short: { en: 'Signature pattern mixes', fr: 'Nos mélanges de motifs signature', ar: 'مزيج النقوش المميز للدار' },
    description: {
      en: 'Fluid gowns, halters and wraps in our signature tie-dye pattern mixes. Draped, knotted and tied — flowing silhouettes that move beautifully and work as easily for modest dressing as for evening.',
      fr: 'Robes fluides, dos nus et paréos dans nos mélanges de motifs tie-dye signature. Drapées, nouées, attachées — des silhouettes fluides qui bougent avec grâce et se prêtent aussi bien à une tenue pudique qu’à une soirée.',
      ar: 'فساتين منسدلة وقطع ملفوفة بمزيج نقوش الصبغ بالربط المميز للدار. قصّات انسيابية تتحرك بجمال، وتناسب الأزياء المحتشمة كما تناسب السهرات.',
    },
    image: '/images/runway/runway-cocoa.jpg',
    imageAlt: { en: 'Model in a cocoa and gold tie-dye halter dress', fr: 'Mannequin en robe dos nu tie-dye cacao et or', ar: 'عارضة بفستان رسن مصبوغ بالربط بلون الكاكاو والذهبي' },
  },
  {
    slug: 'bespoke',
    name: { en: 'Bespoke', fr: 'Sur-mesure', ar: 'تفصيل حسب الطلب' },
    short: { en: 'Made for you, from the dye vat up', fr: 'Fait pour vous, de la cuve de teinture à la dernière couture', ar: 'مصمَّم لكِ، من حوض الصبغ حتى الخياطة' },
    description: {
      en: 'Weddings, aso-ebi, milestone birthdays or a piece that is simply yours. Choose your colours, pattern and silhouette and we dye, cut and finish it to your measurements.',
      fr: 'Mariages, aso-ebi, anniversaires marquants ou une pièce simplement à vous. Choisissez vos couleurs, votre motif et votre silhouette : nous teignons, coupons et finissons à vos mesures.',
      ar: 'حفلات الزفاف، أزياء المناسبات الجماعية، أعياد الميلاد، أو قطعة تخصّكِ وحدكِ. اختاري ألوانكِ ونقشكِ وقصّتكِ، ونتولى الصبغ والقص والتشطيب وفق مقاساتكِ.',
    },
    image: null,
    imageAlt: { en: 'Bespoke fitting in the Lagos studio — photo to be supplied', fr: 'Essayage sur-mesure à l’atelier de Lagos — photo à venir', ar: 'جلسة قياس في استوديو لاغوس — الصورة لاحقًا' },
  },
];

export const getCollection = (slug: string) => collections.find((c) => c.slug === slug);
