/*
 * Page content that is too long for the UI message files.
 * ⚠️ ALL ARABIC AND FRENCH COPY NEEDS NATIVE-SPEAKER REVIEW BEFORE LAUNCH.
 */
import type { LocalizedString } from '@/lib/l10n';

/* ───────── Craft: the hand-dyeing process (timeline) ───────── */
export const craftSteps: { title: LocalizedString; body: LocalizedString; duration: LocalizedString }[] = [
  {
    title: { en: 'Design', fr: 'Dessin', ar: 'التصميم' },
    duration: { en: 'Day 1', fr: 'Jour 1', ar: 'اليوم ١' },
    body: {
      en: 'Every piece begins on paper: the layout of panels, the motifs for each, and the colour story. For bespoke orders, this is where your ideas come in.',
      fr: 'Chaque pièce commence sur le papier : la disposition des panneaux, les motifs de chacun et l’harmonie des couleurs. Pour les commandes sur-mesure, c’est ici que vos idées entrent en jeu.',
      ar: 'تبدأ كل قطعة على الورق: توزيع الألواح، والنقوش الخاصة بكل لوح، وقصة الألوان. وفي الطلبات الخاصة، هنا تدخل أفكاركِ.',
    },
  },
  {
    title: { en: 'Preparing the cloth', fr: 'Préparer le tissu', ar: 'تحضير القماش' },
    duration: { en: 'Day 1–2', fr: 'Jours 1–2', ar: 'اليوم ١–٢' },
    body: {
      en: 'Cotton, chiffon or satin is washed to remove finishes so it will take the dye evenly, then dried and pressed flat.',
      fr: 'Le coton, la mousseline ou le satin est lavé pour retirer les apprêts afin qu’il prenne la teinture uniformément, puis séché et repassé à plat.',
      ar: 'يُغسل القطن أو الشيفون أو الساتان لإزالة المواد المضافة حتى يتشرب الصبغة بالتساوي، ثم يُجفف ويُكوى.',
    },
  },
  {
    title: { en: 'Applying the resist', fr: 'Appliquer la réserve', ar: 'تطبيق مادة المقاومة' },
    duration: { en: 'Day 2–4', fr: 'Jours 2–4', ar: 'اليوم ٢–٤' },
    body: {
      en: 'The pattern is protected from the dye by hand: tied with raffia (Oniko), stitched (Alabere), or painted with cassava-starch paste, freehand or through a stencil (Eleko).',
      fr: 'Le motif est protégé de la teinture à la main : ligaturé avec du raphia (Oniko), cousu (Alabere), ou peint à la pâte d’amidon de manioc, à main levée ou au pochoir (Eleko).',
      ar: 'يُحمى النقش من الصبغة يدويًا: بالربط بألياف الرافية (أونيكو)، أو بالخياطة (ألابيري)، أو برسم عجينة نشا الكسافا باليد أو عبر استنسل (إيليكو).',
    },
  },
  {
    title: { en: 'Dyeing', fr: 'Teinture', ar: 'الصبغ' },
    duration: { en: 'Day 5–6', fr: 'Jours 5–6', ar: 'اليوم ٥–٦' },
    body: {
      en: 'The cloth is dipped again and again. Indigo comes out of the vat green-yellow and turns blue as it meets the air — deeper with each dip.',
      fr: 'Le tissu est plongé encore et encore. L’indigo sort de la cuve jaune-vert et bleuit au contact de l’air — plus profond à chaque bain.',
      ar: 'يُغمس القماش مرة بعد مرة. تخرج النيلة من الحوض بلون أخضر مصفر ثم تتحول إلى الأزرق عند ملامسة الهواء — وتزداد عمقًا مع كل غمسة.',
    },
  },
  {
    title: { en: 'Revealing the pattern', fr: 'Révéler le motif', ar: 'كشف النقش' },
    duration: { en: 'Day 7', fr: 'Jour 7', ar: 'اليوم ٧' },
    body: {
      en: 'Stitches are cut, ties untied and starch washed away. This is the moment of surprise — the pattern is never quite the same twice.',
      fr: 'Les points sont coupés, les ligatures défaites et l’amidon lavé. C’est le moment de la surprise — le motif n’est jamais tout à fait le même.',
      ar: 'تُقص الغرز وتُفك الأربطة ويُغسل النشا. إنها لحظة المفاجأة — فلا يظهر النقش بالشكل نفسه مرتين.',
    },
  },
  {
    title: { en: 'Rinsing & sun-drying', fr: 'Rinçage et séchage au soleil', ar: 'الشطف والتجفيف' },
    duration: { en: 'Day 7–8', fr: 'Jours 7–8', ar: 'اليوم ٧–٨' },
    body: {
      en: 'The cloth is rinsed until the water runs clear, then dried in open air and pressed.',
      fr: 'Le tissu est rincé jusqu’à ce que l’eau soit claire, puis séché en plein air et repassé.',
      ar: 'يُشطف القماش حتى يصفو الماء، ثم يُجفف في الهواء الطلق ويُكوى.',
    },
  },
  {
    title: { en: 'Cutting, sewing & embellishment', fr: 'Coupe, couture et broderie', ar: 'القص والخياطة والتطريز' },
    duration: { en: 'Week 2–3', fr: 'Semaines 2–3', ar: 'الأسبوع ٢–٣' },
    body: {
      en: 'Our tailors cut to your size or measurements, then finish by hand — beading, stones or embroidery on pieces like the Arewa set.',
      fr: 'Nos tailleurs coupent à votre taille ou à vos mesures, puis finissent à la main — perles, strass ou broderies sur des pièces comme l’ensemble Arewa.',
      ar: 'يقص الخياطون القطعة وفق مقاسكِ أو قياساتكِ، ثم يُنهونها يدويًا — بالخرز أو الأحجار أو التطريز في قطع مثل طقم أريوا.',
    },
  },
];

/* ───────── Workshops ───────── */
export type Workshop = {
  slug: string;
  title: LocalizedString;
  description: LocalizedString;
  date: LocalizedString;
  duration: LocalizedString;
  location: LocalizedString;
  seats: number;
  image: string;
  imageAlt: LocalizedString;
};

export const workshops: Workshop[] = [
  {
    slug: 'adire-eleko-intro',
    title: { en: 'Introduction to Adire Eleko', fr: 'Initiation à l’Adire Eleko', ar: 'مقدمة إلى أديري إيليكو' },
    description: {
      en: 'Learn to mix cassava-starch resist, paint and stencil your own motifs, and dye a scarf in indigo to take home.',
      fr: 'Apprenez à préparer la réserve à l’amidon de manioc, à peindre et à appliquer vos propres motifs au pochoir, et teignez à l’indigo un foulard que vous emporterez.',
      ar: 'تعلّمي تحضير عجينة نشا الكسافا، ورسم نقوشك الخاصة وطبعها بالاستنسل، وصبغ وشاح بالنيلة لتأخذيه معك.',
    },
    date: { en: 'Saturday 17 October 2026 · 10:00–15:00', fr: 'Samedi 17 octobre 2026 · 10 h – 15 h', ar: 'السبت ١٧ أكتوبر ٢٠٢٦ · ١٠:٠٠–١٥:٠٠' },
    duration: { en: '5 hours, lunch included', fr: '5 heures, déjeuner compris', ar: '٥ ساعات، مع وجبة غداء' },
    location: { en: 'Studio, Lagos (address shared on booking)', fr: 'Atelier, Lagos (adresse communiquée à la réservation)', ar: 'الاستوديو، لاغوس (يُرسل العنوان عند الحجز)' },
    seats: 12,
    image: '/images/details/indigo-drape-detail.jpg',
    imageAlt: { en: 'Indigo Adire swirl pattern', fr: 'Motif Adire indigo en tourbillons', ar: 'نقش أديري نيلي دوّامي' },
  },
  {
    slug: 'tie-dye-weekend',
    title: { en: 'Tie-Dye Weekend Intensive', fr: 'Stage intensif tie-dye du week-end', ar: 'دورة مكثفة في الصبغ بالربط — عطلة نهاية الأسبوع' },
    description: {
      en: 'Two days of Oniko and Alabere techniques — folding, binding, stitching and colour layering — finishing with a full wrapper-length of your own design.',
      fr: 'Deux jours consacrés aux techniques Oniko et Alabere — pliage, ligature, couture et superposition des couleurs — pour repartir avec un pagne entier de votre création.',
      ar: 'يومان لتقنيات أونيكو وألابيري — الطي والربط والخياطة وطبقات الألوان — وتنتهي الدورة بقطعة بطول لفافة كاملة من تصميمك.',
    },
    date: { en: '7–8 November 2026 · 10:00–16:00', fr: '7–8 novembre 2026 · 10 h – 16 h', ar: '٧–٨ نوفمبر ٢٠٢٦ · ١٠:٠٠–١٦:٠٠' },
    duration: { en: '2 days', fr: '2 jours', ar: 'يومان' },
    location: { en: 'Studio, Lagos', fr: 'Atelier, Lagos', ar: 'الاستوديو، لاغوس' },
    seats: 8,
    image: '/images/details/midnight-gold-detail.jpg',
    imageAlt: { en: 'Black and gold tie-dye', fr: 'Tie-dye noir et or', ar: 'قماش أسود وذهبي مصبوغ بالربط' },
  },
  {
    slug: 'private-studio-session',
    title: { en: 'Private & Group Studio Session', fr: 'Session privée ou de groupe à l’atelier', ar: 'جلسة خاصة أو جماعية في الاستوديو' },
    description: {
      en: 'For bridal parties, teams and visiting groups. A tailored session with the founder; price is per group of up to 6.',
      fr: 'Pour les cortèges de mariée, les équipes et les groupes de passage. Une session sur mesure avec la fondatrice ; tarif par groupe de 6 personnes maximum.',
      ar: 'لحفلات العرائس وفرق العمل والمجموعات الزائرة. جلسة مصممة خصيصًا مع المؤسِّسة؛ السعر لمجموعة حتى ٦ أشخاص.',
    },
    date: { en: 'By arrangement', fr: 'Sur rendez-vous', ar: 'بموعد مسبق' },
    duration: { en: '3–4 hours', fr: '3 à 4 heures', ar: '٣–٤ ساعات' },
    location: { en: 'Studio, Lagos or your venue', fr: 'Atelier à Lagos ou dans le lieu de votre choix', ar: 'الاستوديو في لاغوس أو مكانكم' },
    seats: 6,
    image: '/images/details/emerald-adire-detail.jpg',
    imageAlt: { en: 'Green Adire panel', fr: 'Panneau Adire vert', ar: 'لوح أديري أخضر' },
  },
];

/* ───────── Testimonials — PLACEHOLDER (replace with real, permissioned reviews) ───────── */
export const testimonials: { quote: LocalizedString; name: LocalizedString; place: LocalizedString }[] = [
  {
    quote: {
      en: '[Sample review] The indigo is even deeper in person. My Arewa set arrived beautifully wrapped with a handwritten care card.',
      fr: '[Avis fictif] L’indigo est encore plus profond en vrai. Mon ensemble Arewa est arrivé magnifiquement emballé, avec une carte d’entretien écrite à la main.',
      ar: '[مراجعة نموذجية] النيلي أعمق في الواقع. وصل طقم أريوا مغلفًا بعناية مع بطاقة عناية مكتوبة بخط اليد.',
    },
    name: { en: 'Customer name', fr: 'Nom de la cliente', ar: 'اسم العميلة' },
    place: { en: 'London', fr: 'Londres', ar: 'لندن' },
  },
  {
    quote: {
      en: '[Sample review] Custom measurements made all the difference — a full-length wrapper and long sleeves, perfect for Eid.',
      fr: '[Avis fictif] Les mesures personnalisées ont tout changé — un pagne pleine longueur et des manches longues, parfait pour l’Aïd.',
      ar: '[مراجعة نموذجية] القياسات المخصصة صنعت الفرق — لفافة بطول كامل وأكمام طويلة، مثالية للعيد.',
    },
    name: { en: 'Customer name', fr: 'Nom de la cliente', ar: 'اسم العميلة' },
    place: { en: 'Dubai', fr: 'Dubaï', ar: 'دبي' },
  },
  {
    quote: {
      en: '[Sample review] I ordered Adire by the yard for my sister’s wedding — everyone asked where the fabric was from.',
      fr: '[Avis fictif] J’ai commandé de l’Adire au yard pour le mariage de ma sœur — tout le monde m’a demandé d’où venait le tissu.',
      ar: '[مراجعة نموذجية] طلبت قماش أديري بالياردة لزفاف أختي — وسألني الجميع عن مصدره.',
    },
    name: { en: 'Customer name', fr: 'Nom de la cliente', ar: 'اسم العميلة' },
    place: { en: 'Houston', fr: 'Houston', ar: 'هيوستن' },
  },
];

/* ───────── FAQ ───────── */
export const faqs: { q: LocalizedString; a: LocalizedString }[] = [
  {
    q: { en: 'Why does my piece look slightly different from the photo?', fr: 'Pourquoi ma pièce est-elle légèrement différente de la photo ?', ar: 'لماذا تبدو قطعتي مختلفة قليلًا عن الصورة؟' },
    a: { en: 'Every piece is dyed by hand, so pattern placement and colour depth vary slightly. The photo shows the design; yours will be its one-of-a-kind sibling.', fr: 'Chaque pièce est teinte à la main : la position du motif et l’intensité de la couleur varient donc légèrement. La photo montre le modèle ; la vôtre en sera une variante unique.', ar: 'كل قطعة مصبوغة يدويًا، لذا يختلف موضع النقش وعمق اللون قليلًا. تُظهر الصورة التصميم، وقطعتك ستكون نسخة فريدة منه.' },
  },
  {
    q: { en: 'How long will my order take?', fr: 'Quel est le délai de ma commande ?', ar: 'كم يستغرق تجهيز طلبي؟' },
    a: { en: '“Ready to ship” pieces leave the studio in 2–4 working days. “Made to order” pieces are dyed and made in 2–3 weeks; bespoke commissions take 3–5 weeks. Delivery time is added on top.', fr: 'Les pièces « prêtes à expédier » quittent l’atelier sous 2 à 4 jours ouvrés. Les pièces « faites sur commande » sont teintes et confectionnées en 2 à 3 semaines ; les créations sur-mesure demandent 3 à 5 semaines. Le délai de livraison s’y ajoute.', ar: 'القطع «الجاهزة للشحن» تغادر الاستوديو خلال ٢–٤ أيام عمل. والقطع «المصنوعة حسب الطلب» تُصبغ وتُخاط خلال ٢–٣ أسابيع، والطلبات الخاصة خلال ٣–٥ أسابيع. تُضاف مدة التوصيل بعد ذلك.' },
  },
  {
    q: { en: 'Can I order with my own measurements?', fr: 'Puis-je commander selon mes propres mesures ?', ar: 'هل يمكنني الطلب بقياساتي الخاصة؟' },
    a: { en: 'Yes. On any garment, choose “Custom measurements” instead of a size and enter your bust, waist, hips, wrapper and top lengths, shoulder, sleeve and height. See our size guide for how to measure.', fr: 'Oui. Sur n’importe quel vêtement, choisissez « Mesures personnalisées » au lieu d’une taille et indiquez votre tour de poitrine, de taille et de hanches, les longueurs du pagne et du haut, la largeur d’épaules, la longueur de manche et votre hauteur. Consultez notre guide des tailles pour savoir comment mesurer.', ar: 'نعم. في أي قطعة، اختاري «قياسات مخصصة» بدلًا من المقاس وأدخلي قياس الصدر والخصر والوركين وطول اللفافة والبلوزة والكتف والكم والطول. راجعي دليل المقاسات لمعرفة طريقة القياس.' },
  },
  {
    q: { en: 'Can you make a piece longer or with sleeves for modest wear?', fr: 'Pouvez-vous rallonger une pièce ou ajouter des manches pour une tenue plus pudique ?', ar: 'هل يمكن جعل القطعة أطول أو بأكمام لتكون محتشمة؟' },
    a: { en: 'Absolutely. Add your preferred wrapper length and sleeve length in custom measurements, or leave a note in a bespoke request. Many of our silhouettes are designed to be worn modestly.', fr: 'Bien sûr. Indiquez la longueur de pagne et de manche souhaitée dans les mesures personnalisées, ou laissez une note dans une demande sur-mesure. Beaucoup de nos silhouettes sont pensées pour être portées de façon pudique.', ar: 'بالتأكيد. أضيفي طول اللفافة وطول الكم المفضلين في القياسات المخصصة، أو اتركي ملاحظة في طلب التفصيل الخاص. صُممت كثير من قصّاتنا لتُرتدى بشكل محتشم.' },
  },
  {
    q: { en: 'Do you ship internationally?', fr: 'Livrez-vous à l’international ?', ar: 'هل تشحنون دوليًا؟' },
    a: { en: 'Yes — to the UK, US, Canada, the UAE, Saudi Arabia, Qatar, Egypt, Morocco and more, by tracked express courier. Duties and taxes may apply on arrival.', fr: 'Oui — au Royaume-Uni, aux États-Unis, au Canada, aux Émirats arabes unis, en Arabie saoudite, au Qatar, en Égypte, au Maroc et ailleurs, par transporteur express avec suivi. Des droits et taxes peuvent s’appliquer à l’arrivée.', ar: 'نعم — إلى المملكة المتحدة والولايات المتحدة وكندا والإمارات والسعودية وقطر ومصر والمغرب وغيرها، عبر شحن سريع قابل للتتبع. قد تُفرض رسوم جمركية وضرائب عند الوصول.' },
  },
  {
    q: { en: 'How do I pay?', fr: 'Comment payer ?', ar: 'كيف أدفع؟' },
    a: { en: 'At launch, payments will be processed securely by a Nigerian payment gateway (Paystack or Flutterwave) supporting cards, bank transfer and more. In this prototype, payment is simulated.', fr: 'Au lancement, les paiements seront traités en toute sécurité par une passerelle de paiement nigériane (Paystack ou Flutterwave) acceptant les cartes, les virements bancaires et plus encore. Dans ce prototype, le paiement est simulé.', ar: 'عند الإطلاق، ستُعالج المدفوعات بأمان عبر بوابة دفع نيجيرية (Paystack أو Flutterwave) تدعم البطاقات والتحويل البنكي وغيرها. في هذا النموذج الأولي، الدفع محاكاة فقط.' },
  },
  {
    q: { en: 'Can I return my order?', fr: 'Puis-je retourner ma commande ?', ar: 'هل يمكنني إرجاع طلبي؟' },
    a: { en: 'Unworn ready-to-ship pieces can be returned within 14 days of delivery. Made-to-order, custom-measured and bespoke pieces are final sale, but we will always work with you on alterations.', fr: 'Les pièces prêtes à expédier non portées peuvent être retournées dans les 14 jours suivant la livraison. Les pièces faites sur commande, à vos mesures ou sur-mesure ne sont ni reprises ni échangées, mais nous vous accompagnerons toujours pour les retouches.', ar: 'يمكن إرجاع القطع الجاهزة للشحن غير المستخدمة خلال ١٤ يومًا من التسليم. أما القطع المصنوعة حسب الطلب أو بقياسات مخصصة أو التفصيل الخاص فهي غير قابلة للإرجاع، لكننا سنعمل معكِ دائمًا على التعديلات.' },
  },
  {
    q: { en: 'Will the indigo rub off?', fr: 'L’indigo risque-t-il de déteindre ?', ar: 'هل تنتقل صبغة النيلة؟' },
    a: { en: 'Natural and hand-applied indigo can release a little colour in the first washes. Follow the care instructions and wash separately in cold water.', fr: 'L’indigo naturel appliqué à la main peut dégorger légèrement lors des premiers lavages. Suivez les conseils d’entretien et lavez séparément à l’eau froide.', ar: 'قد تُطلق النيلة المطبقة يدويًا قليلًا من اللون في الغسلات الأولى. اتبعي تعليمات العناية واغسلي القطعة منفصلة بماء بارد.' },
  },
];

/* ───────── Size chart (cm) ───────── */
export const sizeChart = [
  { size: 'XS', uk: '6', us: '2', bust: 80, waist: 62, hips: 88 },
  { size: 'S', uk: '8', us: '4', bust: 85, waist: 67, hips: 93 },
  { size: 'M', uk: '10–12', us: '6–8', bust: 92, waist: 74, hips: 100 },
  { size: 'L', uk: '14', us: '10', bust: 99, waist: 81, hips: 107 },
  { size: 'XL', uk: '16', us: '12', bust: 106, waist: 88, hips: 114 },
  { size: 'XXL', uk: '18–20', us: '14–16', bust: 115, waist: 97, hips: 123 },
];

/* ───────── Countries for checkout ───────── */
export const countries: { code: string; name: LocalizedString }[] = [
  { code: 'NG', name: { en: 'Nigeria', fr: 'Nigeria', ar: 'نيجيريا' } },
  { code: 'AE', name: { en: 'United Arab Emirates', fr: 'Émirats arabes unis', ar: 'الإمارات العربية المتحدة' } },
  { code: 'SA', name: { en: 'Saudi Arabia', fr: 'Arabie saoudite', ar: 'المملكة العربية السعودية' } },
  { code: 'QA', name: { en: 'Qatar', fr: 'Qatar', ar: 'قطر' } },
  { code: 'KW', name: { en: 'Kuwait', fr: 'Koweït', ar: 'الكويت' } },
  { code: 'BH', name: { en: 'Bahrain', fr: 'Bahreïn', ar: 'البحرين' } },
  { code: 'OM', name: { en: 'Oman', fr: 'Oman', ar: 'عُمان' } },
  { code: 'EG', name: { en: 'Egypt', fr: 'Égypte', ar: 'مصر' } },
  { code: 'MA', name: { en: 'Morocco', fr: 'Maroc', ar: 'المغرب' } },
  { code: 'TN', name: { en: 'Tunisia', fr: 'Tunisie', ar: 'تونس' } },
  { code: 'DZ', name: { en: 'Algeria', fr: 'Algérie', ar: 'الجزائر' } },
  { code: 'GB', name: { en: 'United Kingdom', fr: 'Royaume-Uni', ar: 'المملكة المتحدة' } },
  { code: 'US', name: { en: 'United States', fr: 'États-Unis', ar: 'الولايات المتحدة' } },
  { code: 'CA', name: { en: 'Canada', fr: 'Canada', ar: 'كندا' } },
  { code: 'GH', name: { en: 'Ghana', fr: 'Ghana', ar: 'غانا' } },
  { code: 'ZA', name: { en: 'South Africa', fr: 'Afrique du Sud', ar: 'جنوب أفريقيا' } },
  { code: 'DE', name: { en: 'Germany', fr: 'Allemagne', ar: 'ألمانيا' } },
  { code: 'FR', name: { en: 'France', fr: 'France', ar: 'فرنسا' } },
];
