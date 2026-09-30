/*
 * Journal articles (sample content for the prototype).
 * ⚠️ ARABIC AND FRENCH COPY NEEDS NATIVE-SPEAKER REVIEW BEFORE LAUNCH.
 */
import type { LocalizedString } from '@/lib/l10n';

export type Block =
  | { type: 'p'; text: LocalizedString }
  | { type: 'h2'; text: LocalizedString }
  | { type: 'ul'; items: LocalizedString[] }
  | { type: 'quote'; text: LocalizedString };

export type Article = {
  slug: string;
  title: LocalizedString;
  excerpt: LocalizedString;
  category: LocalizedString;
  date: string;
  readMinutes: number;
  image: string;
  imageAlt: LocalizedString;
  body: Block[];
};

export const articles: Article[] = [
  {
    slug: 'how-to-care-for-your-adire',
    title: { en: 'How to care for your Adire', fr: 'Comment entretenir votre Adire', ar: 'كيف تعتنين بقطعة الأديري' },
    excerpt: {
      en: 'Hand-dyed cloth is a living thing. A few simple habits will keep your indigo deep and your colours bright for years.',
      fr: 'Un tissu teint à la main est une matière vivante. Quelques gestes simples garderont votre indigo profond et vos couleurs éclatantes pendant des années.',
      ar: 'القماش المصبوغ يدويًا كائن حي. بعض العادات البسيطة تحافظ على عمق النيلي وإشراق الألوان لسنوات.',
    },
    category: { en: 'Care', fr: 'Entretien', ar: 'العناية' },
    date: '2026-09-02',
    readMinutes: 4,
    image: '/images/details/indigo-kaleidoscope-detail.jpg',
    imageAlt: { en: 'Close-up of indigo Adire cloth', fr: 'Gros plan sur un tissu Adire indigo', ar: 'لقطة قريبة لقماش أديري نيلي' },
    body: [
      { type: 'p', text: { en: 'Every Oladehinde Felusi piece is dyed by hand, in small batches, with resist techniques that have been practised in south-western Nigeria for generations. That is exactly what makes it special — and why it asks for a little more care than a factory-printed garment.', fr: 'Chaque pièce Oladehinde Felusi est teinte à la main, en petites séries, selon des techniques de réserve pratiquées dans le sud-ouest du Nigeria depuis des générations. C’est précisément ce qui la rend unique — et pourquoi elle demande un peu plus d’attention qu’un vêtement imprimé en usine.', ar: 'كل قطعة من أولاديهيندي فيلوسي مصبوغة يدويًا، على دفعات صغيرة، بتقنيات مقاومة الصبغة التي تُمارس في جنوب غرب نيجيريا منذ أجيال. وهذا بالضبط ما يجعلها مميزة — ولذلك تحتاج عناية أكثر قليلًا من الملابس المطبوعة في المصانع.' } },
      { type: 'h2', text: { en: 'The first wash', fr: 'Le premier lavage', ar: 'الغسلة الأولى' } },
      { type: 'p', text: { en: 'Indigo sits on the surface of the fibre, so a little colour may release in the first few washes. This is normal. Wash your piece alone in cold water; for fabrics by the yard, add a spoon of salt and a splash of white vinegar to help set the colour before sewing.', fr: 'L’indigo se fixe à la surface de la fibre : un peu de couleur peut donc dégorger lors des premiers lavages. C’est normal. Lavez votre pièce seule à l’eau froide ; pour les tissus au yard, ajoutez une cuillerée de sel et un trait de vinaigre blanc pour aider à fixer la couleur avant la couture.', ar: 'تستقر النيلة على سطح الألياف، لذا قد يخرج قليل من اللون في الغسلات الأولى، وهذا أمر طبيعي. اغسلي القطعة وحدها بماء بارد؛ وبالنسبة للأقمشة المباعة بالياردة، أضيفي ملعقة ملح وقليلًا من الخل الأبيض لتثبيت اللون قبل الخياطة.' } },
      { type: 'h2', text: { en: 'Everyday habits', fr: 'Gestes du quotidien', ar: 'عادات يومية' } },
      { type: 'ul', items: [
        { en: 'Hand wash cold with a gentle, bleach-free soap.', fr: 'Lavez à la main à froid avec un savon doux, sans javel.', ar: 'اغسلي يدويًا بماء بارد وصابون لطيف خالٍ من المبيّض.' },
        { en: 'Never wring — press water out with a towel instead.', fr: 'N’essorez jamais — pressez plutôt l’eau avec une serviette.', ar: 'لا تعصري القطعة أبدًا — اضغطي عليها بمنشفة لإزالة الماء.' },
        { en: 'Dry inside out, in the shade. Strong sun fades indigo.', fr: 'Séchez à l’envers, à l’ombre. Le soleil fort fait pâlir l’indigo.', ar: 'جففيها مقلوبة في الظل، فالشمس القوية تُبهت النيلي.' },
        { en: 'Iron on the reverse; use a pressing cloth for satin and chiffon.', fr: 'Repassez sur l’envers ; utilisez une pattemouille pour le satin et la mousseline.', ar: 'اكوي على الوجه الداخلي، واستخدمي قطعة قماش واقية للساتان والشيفون.' },
      ] },
      { type: 'h2', text: { en: 'Storing', fr: 'Rangement', ar: 'الحفظ' } },
      { type: 'p', text: { en: 'Fold with acid-free tissue or hang on a padded hanger, away from light. Embellished pieces should be stored flat so the handwork is not pulled out of shape.', fr: 'Pliez avec du papier de soie sans acide ou suspendez sur un cintre rembourré, à l’abri de la lumière. Les pièces brodées se rangent à plat pour que le travail à la main ne se déforme pas.', ar: 'اطويها مع ورق خالٍ من الأحماض أو علّقيها على شماعة مبطنة بعيدًا عن الضوء. تُحفظ القطع المطرزة مفرودة كي لا يتشوه العمل اليدوي.' } },
      { type: 'quote', text: { en: 'Small variations in colour are not flaws — they are the fingerprint of the hand that made your piece.', fr: 'Les petites variations de couleur ne sont pas des défauts — ce sont les empreintes de la main qui a créé votre pièce.', ar: 'الاختلافات الصغيرة في اللون ليست عيوبًا، بل هي بصمة اليد التي صنعت قطعتك.' } },
    ],
  },
  {
    slug: 'styling-iro-and-buba-for-modern-occasions',
    title: { en: 'Styling iro and buba for modern occasions', fr: 'Porter l’iro et buba pour les occasions d’aujourd’hui', ar: 'تنسيق الإيرو والبوبا للمناسبات العصرية' },
    excerpt: {
      en: 'From Lagos owambe to Dubai iftar to a London gallery opening — five ways to wear the wrapper and top today.',
      fr: 'D’un owambe à Lagos à un iftar à Dubaï ou un vernissage à Londres — cinq façons de porter le pagne et le haut aujourd’hui.',
      ar: 'من احتفالات لاغوس إلى إفطار في دبي إلى افتتاح معرض في لندن — خمس طرق لارتداء اللفافة والبلوزة اليوم.',
    },
    category: { en: 'Style', fr: 'Style', ar: 'الأناقة' },
    date: '2026-08-14',
    readMinutes: 5,
    image: '/images/runway/runway-crop-set.jpg',
    imageAlt: { en: 'Model in a rust tied top and indigo wrapper', fr: 'Mannequin en haut noué rouille et pagne indigo', ar: 'عارضة ببلوزة مربوطة بلون الصدأ ولفافة نيلية' },
    body: [
      { type: 'p', text: { en: 'The iro (wrapper) and buba (top) have always been adaptable: tied high or low, worn with a gele head-tie or a simple scarf, dressed up or down. Here is how our clients are wearing them now.', fr: 'L’iro (pagne) et la buba (haut) ont toujours su s’adapter : noués haut ou bas, portés avec un gele (foulard de tête) ou un simple foulard, habillés ou décontractés. Voici comment nos clientes les portent aujourd’hui.', ar: 'لطالما كانت الإيرو (اللفافة) والبوبا (البلوزة) قابلتين للتكيّف: تُربطان عاليًا أو منخفضًا، وتُرتديان مع غطاء الرأس التقليدي «جيلي» أو وشاح بسيط، بأسلوب رسمي أو يومي. إليكِ كيف ترتديهما عميلاتنا اليوم.' } },
      { type: 'h2', text: { en: '1. The ceremony', fr: '1. La cérémonie', ar: '١. المناسبة الرسمية' } },
      { type: 'p', text: { en: 'For weddings and naming ceremonies, choose an embellished set like Arewa, with the wrapper tied high at the waist and a matching head wrap. Keep jewellery to one statement piece.', fr: 'Pour les mariages et les cérémonies de baptême, choisissez un ensemble brodé comme l’Arewa, avec le pagne noué haut à la taille et un couvre-chef assorti. Limitez les bijoux à une seule pièce forte.', ar: 'لحفلات الزفاف والتسمية، اختاري طقمًا مطرزًا مثل «أريوا»، مع ربط اللفافة عاليًا عند الخصر وغطاء رأس مطابق. واكتفي بقطعة مجوهرات لافتة واحدة.' } },
      { type: 'h2', text: { en: '2. Modest evening', fr: '2. Soirée pudique', ar: '٢. سهرة محتشمة' } },
      { type: 'p', text: { en: 'Order the wrapper full-length and the buba with long sleeves, or layer a fine long-sleeve top beneath a one-shoulder buba. Flowing satin Adire reads beautifully at iftar gatherings and Eid dinners.', fr: 'Commandez le pagne en pleine longueur et la buba à manches longues, ou superposez un fin haut à manches longues sous une buba asymétrique. L’Adire en satin fluide est superbe lors des iftars et des dîners de l’Aïd.', ar: 'اطلبي اللفافة بطول كامل والبوبا بأكمام طويلة، أو ارتدي بلوزة رقيقة بأكمام طويلة تحت بوبا بكتف واحد. يبدو أديري الساتان الانسيابي رائعًا في موائد الإفطار وعشاء العيد.' } },
      { type: 'h2', text: { en: '3. Split the set', fr: '3. Dissociez l’ensemble', ar: '٣. فصل قطع الطقم' } },
      { type: 'ul', items: [
        { en: 'Wear the buba with tailored trousers for work.', fr: 'Portez la buba avec un pantalon de tailleur pour le bureau.', ar: 'ارتدي البوبا مع بنطال مفصّل للعمل.' },
        { en: 'Pair the iro with a crisp white shirt knotted at the waist.', fr: 'Associez l’iro à une chemise blanche impeccable nouée à la taille.', ar: 'نسّقي الإيرو مع قميص أبيض معقود عند الخصر.' },
        { en: 'Use a tie-dye wrap as a stole over a plain dress.', fr: 'Utilisez un paréo tie-dye comme étole sur une robe unie.', ar: 'استخدمي وشاحًا مصبوغًا بالربط كشال فوق فستان سادة.' },
      ] },
      { type: 'h2', text: { en: '4. Mix your cloths', fr: '4. Mélangez les tissus', ar: '٤. امزجي الأقمشة' } },
      { type: 'p', text: { en: 'Lagos style has always mixed patterns with confidence. Anchor the look with one shared colour — ochre over teal, rust over indigo — and let the patterns talk to each other.', fr: 'Le style de Lagos a toujours mélangé les motifs avec assurance. Ancrez la tenue autour d’une couleur commune — ocre sur bleu canard, rouille sur indigo — et laissez les motifs dialoguer.', ar: 'لطالما مزجت أناقة لاغوس النقوش بثقة. اجعلي لونًا مشتركًا واحدًا محور الإطلالة — المغرة فوق الأخضر المزرق، أو الصدأ فوق النيلي — ودعي النقوش تتحاور.' } },
      { type: 'quote', text: { en: 'Tradition is not a costume. It is a language — and every generation gets to speak it in its own accent.', fr: 'La tradition n’est pas un costume. C’est une langue — et chaque génération la parle avec son propre accent.', ar: 'التقاليد ليست زيًا تنكريًا، بل لغة — ولكل جيل أن يتحدثها بلهجته الخاصة.' } },
    ],
  },
  {
    slug: 'the-meaning-behind-adire-patterns',
    title: { en: 'The meaning behind Adire patterns', fr: 'Le sens caché des motifs Adire', ar: 'المعاني الكامنة في نقوش الأديري' },
    excerpt: {
      en: 'Adire has been called a cloth that speaks. A short introduction to its techniques, and the stories its motifs carry.',
      fr: 'On dit de l’Adire qu’il est un tissu qui parle. Une courte introduction à ses techniques et aux histoires que portent ses motifs.',
      ar: 'وُصف الأديري بأنه قماش يتكلم. مقدمة قصيرة إلى تقنياته والحكايات التي تحملها نقوشه.',
    },
    category: { en: 'Heritage', fr: 'Héritage', ar: 'التراث' },
    date: '2026-07-21',
    readMinutes: 6,
    image: '/images/details/emerald-adire-detail.jpg',
    imageAlt: { en: 'Close-up of green Adire with palm and spiral motifs', fr: 'Gros plan sur un Adire vert à motifs de palmes et de spirales', ar: 'لقطة قريبة لأديري أخضر بنقوش النخيل واللوالب' },
    body: [
      { type: 'p', text: { en: '“Adire” comes from the Yoruba adì (to tie) and rẹ (to dye). It describes cloth patterned by resisting the dye — blocking parts of the fabric so they stay pale while the rest takes the colour. Historically it was women’s work, with centres such as Abẹokuta and Ibadan famous for their indigo.', fr: '« Adire » vient des mots yoruba adì (nouer) et rẹ (teindre). Il désigne un tissu dont le motif naît de la réserve — des zones protégées de la teinture qui restent claires tandis que le reste prend la couleur. C’était traditionnellement un travail de femmes, et des centres comme Abẹokuta et Ibadan étaient réputés pour leur indigo.', ar: 'تأتي كلمة «أديري» من الكلمتين اليوروبيتين «أدي» (يربط) و«ري» (يصبغ). وهي تصف القماش الذي تُصنع نقوشه بمقاومة الصبغة — أي حجب أجزاء من القماش لتبقى فاتحة بينما يتشرب الباقي اللون. وكانت تاريخيًا حرفة نسائية، واشتهرت مدن مثل أبيوكوتا وإيبادان بنيلتها.' } },
      { type: 'h2', text: { en: 'Three families of technique', fr: 'Trois familles de techniques', ar: 'ثلاث عائلات من التقنيات' } },
      { type: 'ul', items: [
        { en: 'Adire Oniko — cloth tied with raffia or thread before dyeing, producing circles and bursts.', fr: 'Adire Oniko — le tissu est ligaturé avec du raphia ou du fil avant la teinture, ce qui crée des cercles et des éclats.', ar: 'أديري أونيكو — يُربط القماش بألياف الرافية أو الخيط قبل الصبغ، فتظهر دوائر وانفجارات لونية.' },
        { en: 'Adire Alabere — cloth stitched and gathered, producing fine lines and ladders.', fr: 'Adire Alabere — le tissu est cousu et froncé, ce qui crée de fines lignes et des échelles.', ar: 'أديري ألابيري — يُخاط القماش ويُجمع، فتظهر خطوط دقيقة وأشكال سلالم.' },
        { en: 'Adire Eleko — a cassava-starch paste painted by hand or pressed through a stencil, producing the most detailed motifs.', fr: 'Adire Eleko — une pâte d’amidon de manioc peinte à la main ou appliquée au pochoir, pour les motifs les plus détaillés.', ar: 'أديري إيليكو — عجينة من نشا الكسافا تُرسم باليد أو تُمرَّر عبر استنسل، فتنتج أدق النقوش.' },
      ] },
      { type: 'h2', text: { en: 'Reading the motifs', fr: 'Lire les motifs', ar: 'قراءة النقوش' } },
      { type: 'p', text: { en: 'Motifs are often arranged in a grid of panels, each with its own design: spirals, birds, leaves, combs, moons, and nested squares. Interpretations vary between families and workshops, and many designs were named for events, proverbs or everyday objects. Rather than one fixed dictionary, Adire is best understood as a visual vocabulary that each artist arranges in her own way.', fr: 'Les motifs sont souvent disposés en une grille de panneaux, chacun avec son dessin : spirales, oiseaux, feuilles, peignes, lunes et carrés imbriqués. Les interprétations varient selon les familles et les ateliers, et de nombreux dessins portent le nom d’événements, de proverbes ou d’objets du quotidien. Plutôt qu’un dictionnaire figé, l’Adire se comprend comme un vocabulaire visuel que chaque artiste agence à sa manière.', ar: 'تُرتَّب النقوش غالبًا في شبكة من الألواح، لكل منها تصميمه: لوالب وطيور وأوراق وأمشاط وأقمار ومربعات متداخلة. وتختلف التفسيرات بين العائلات والورش، وقد سُمّيت تصاميم كثيرة بأسماء أحداث أو أمثال أو أشياء يومية. ولذلك يُفهم الأديري على نحو أفضل بوصفه مفردات بصرية ترتّبها كل فنانة بطريقتها، لا قاموسًا ثابتًا.' } },
      { type: 'p', text: { en: 'Our own motifs draw on this vocabulary while telling new stories — the hearts of Ìfẹ́, the lagoon ripples of our teal gown, the starbursts of Ìràwọ̀.', fr: 'Nos propres motifs puisent dans ce vocabulaire pour raconter de nouvelles histoires — les cœurs d’Ìfẹ́, les ondulations de lagune de notre robe bleu canard, les étoiles d’Ìràwọ̀.', ar: 'تستلهم نقوشنا هذه المفردات لتروي حكايات جديدة — قلوب «إيفي»، وتموجات البحيرة في فستاننا الأخضر المزرق، ونجوم «إيراوو».' } },
      { type: 'quote', text: { en: 'Each panel is a sentence; the whole cloth is a story.', fr: 'Chaque panneau est une phrase ; le tissu entier est une histoire.', ar: 'كل لوح جملة، والقماش كله حكاية.' } },
    ],
  },
];

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);
