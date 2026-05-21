import { Article } from '../types';
import { Language } from '../lib/i18n';

const articlesDataFr: Article[] = [
  {
    id: 'art-1',
    title: "Les huiles essentielles chez l'enfant : prudence !",
    excerpt: "Naturel ne signifie pas sans danger. Découvrez pourquoi les huiles essentielles requièrent une vigilance particulière chez les moins de 6 ans.",
    content: `Les huiles essentielles sont des substances très concentrées qui peuvent présenter des risques réels pour les nourrissons et jeunes enfants. Leur usage doit être encadré avec rigueur.

**Pourquoi sont-elles dangereuses ?**
Les huiles essentielles contiennent des molécules actives à hautes doses. Chez un enfant, la barrière cutanée est immature et la capacité hépatique à métaboliser ces molécules est limitée. Certaines huiles (menthe poivrée, camphre, eucalyptus à 1,8 cinéole) peuvent provoquer des convulsions ou un arrêt respiratoire.

**Les règles d'or :**
- Moins de 3 mois : aucune huile essentielle
- Moins de 6 ans : uniquement sur avis d'un aromathérapeute qualifié
- Ne jamais appliquer pur sur la peau ou les muqueuses
- Ne jamais ingérer sans prescription médicale
- Conserver hors de portée des enfants

**Les huiles à proscrire absolument chez l'enfant :**
Menthe poivrée, eucalyptus radié à haute dose, camphre, tea tree pur, basilic exotique.

Consultez toujours un professionnel de santé avant d'utiliser des huiles essentielles chez votre enfant.`,
    author: 'Dr. Claire Dubois',
    category: 'Médicaments & Suppléments',
    readTime: 5,
    imageUrl: 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=800',
    publishedAt: '2024-03-15',
  },
  {
    id: 'art-2',
    title: 'Savoir lire une étiquette de sirop pédiatrique',
    excerpt: "Concentration, dosage, DCI... Décryptez les étiquettes des médicaments de vos enfants pour éviter les erreurs de dosage.",
    content: `Chaque année, des milliers d'enfants sont victimes d'erreurs de dosage médicamenteux. Comprendre une étiquette peut faire la différence.

**Les informations clés à lire :**

**La DCI (Dénomination Commune Internationale)** est le nom de la substance active. Un même médicament peut avoir des dizaines de noms de marque. Vérifiez que vous n'administrez pas deux fois la même molécule sous deux noms différents !

**La concentration** est exprimée en mg/mL ou en mg/5mL. Un sirop à 120mg/5mL est DIFFÉRENT d'un sirop à 240mg/5mL — ajustez votre dose en conséquence.

**La dose par prise** est toujours calculée en mg par kg de poids corporel. Pesez régulièrement votre enfant pour être précis.

**La pipette graduée** doit correspondre au sirop fourni. Ne l'interchangez pas avec celle d'un autre médicament.

**Les excipients à risque** comme le sorbitol, l'alcool ou les colorants peuvent provoquer des effets secondaires chez les enfants sensibles.

**Règle d'or :** En cas de doute, appelez votre pharmacien — c'est gratuit et il est là pour ça !`,
    author: 'Dr. Marc Lévy',
    category: 'Médicaments & Suppléments',
    readTime: 4,
    imageUrl: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=800',
    publishedAt: '2024-02-28',
  },
  {
    id: 'art-3',
    title: 'Prévenir les accidents domestiques pièce par pièce',
    excerpt: "La maison est le lieu de 75% des accidents pédiatriques. Un tour d'horizon des risques par pièce et comment les éliminer facilement.",
    content: `Les accidents domestiques sont la première cause de mortalité chez les enfants de 1 à 14 ans. Pourtant, 90% d'entre eux seraient évitables.

**La cuisine :**
- Cuire sur les feux arrière, poignées tournées vers l'intérieur
- Ranger les couteaux et produits ménagers hors de portée
- Ne jamais laisser un enfant seul près d'une plaque chauffante

**La salle de bain :**
- Ne jamais laisser un enfant seul dans le bain, même 2 minutes
- Régler le chauffe-eau à 50°C max
- Ranger médicaments et produits cosmétiques hors de portée avec un verrou

**Le salon :**
- Sécuriser les prises électriques avec des cache-prises
- Arrimer les meubles hauts au mur (risque de basculement)
- Retirer les petits objets (< 3cm) à portée des moins de 3 ans

**Les escaliers :**
- Barrières aux deux extrémités pour les moins de 3 ans
- Vérifier la solidité des balustrades

**Les fenêtres :**
- Ne jamais placer de meubles escalables sous les fenêtres
- Installer des bloque-fenêtres limitant l'ouverture à 10cm max

Un tour de sécurisation bien fait protège votre enfant pour des années !`,
    author: 'Dr. Sophie Martin',
    category: 'Prévention',
    readTime: 6,
    imageUrl: 'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=800',
    publishedAt: '2024-01-20',
  },
  {
    id: 'art-4',
    title: 'Le sommeil de bébé : guide complet 0-12 mois',
    excerpt: "Comprendre les cycles du sommeil du nourrisson pour aider bébé à s'endormir sereinement et en sécurité.",
    content: `Le sommeil est essentiel au développement cérébral du nourrisson. Comprendre ses mécanismes aide les parents à aborder les nuits difficiles avec plus de sérénité.

**Les cycles du sommeil du nourrisson :**
Contrairement à l'adulte, le nourrisson a des cycles courts de 50-60 minutes. Il alterne sommeil agité (équivalent du REM adulte) et sommeil calme. Les "réveils" entre cycles sont normaux jusqu'à 4-6 mois.

**Règles de sécurité absolues (mort subite du nourrisson) :**
- Toujours coucher sur le DOS
- Literie ferme, sans couette, sans oreiller, sans tour de lit
- Température de la chambre : 18-20°C
- Pas de tabagisme dans l'environnement
- Éviter le cododo dans le lit parental (sauf dispositifs homologués)

**Aider bébé à s'endormir :**
Les rituels réguliers (bain, câlin, chanson) créent des repères sécurisants. La cohérence est plus importante que la méthode.

**Quand consulter ?** Si votre bébé ronfle fortement, fait des pauses respiratoires observables ou transpire excessivement la nuit, consultez votre pédiatre.`,
    author: 'Dr. Emma Rousseau',
    category: 'Développement',
    readTime: 7,
    imageUrl: 'https://images.pexels.com/photos/35537/child-children-girl-happy.jpg?auto=compress&cs=tinysrgb&w=800',
    publishedAt: '2024-03-01',
  },
];

const articlesDataAr: Article[] = [
  {
    id: 'art-1',
    title: 'الزيوت الأساسية عند الطفل: توخَّ الحذر!',
    excerpt: 'الطبيعي لا يعني دائماً الآمن. اكتشف لماذا تستلزم الزيوت الأساسية يقظة خاصة عند الأطفال دون سن 6 سنوات.',
    content: `الزيوت الأساسية مواد مركّزة جداً يمكن أن تشكل مخاطر حقيقية على الرضّع والأطفال الصغار. يجب أن يكون استخدامها خاضعاً لقيود صارمة.

**لماذا هي خطيرة؟**
تحتوي الزيوت الأساسية على جزيئات فعّالة بجرعات عالية. عند الطفل، الحاجز الجلدي غير ناضج وقدرة الكبد على استقلاب هذه الجزيئات محدودة. بعض الزيوت (النعناع الفلفلي، الكافور، الأوكالبتوس) قد تسبب نوبات تشنجية أو توقف التنفس.

**القواعد الذهبية:**
- أقل من 3 أشهر: ممنوع استخدام أي زيت أساسي
- أقل من 6 سنوات: فقط بتوصية من متخصص في العلاج العطري
- لا تضعه خاماً على الجلد أو الأغشية المخاطية
- لا تتناوله دون وصفة طبية
- احفظه بعيداً عن متناول الأطفال

**الزيوت المحظورة كلياً عند الأطفال:**
النعناع الفلفلي، الأوكالبتوس بجرعات عالية، الكافور، شجرة الشاي الخالص، الريحان الاستوائي.

استشر دائماً متخصص رعاية صحية قبل استخدام الزيوت الأساسية لطفلك.`,
    author: 'د. كلير دوبوا',
    category: 'الأدوية والمكملات',
    readTime: 5,
    imageUrl: 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=800',
    publishedAt: '2024-03-15',
  },
  {
    id: 'art-2',
    title: 'كيفية قراءة ملصق شراب الأطفال',
    excerpt: 'التركيز والجرعة والاسم الدوائي... تعلّم فك رموز ملصقات أدوية أطفالك لتجنب أخطاء الجرعات.',
    content: `كل عام، يتعرض آلاف الأطفال لأخطاء في جرعات الأدوية. فهم الملصق يمكن أن يحدث فارقاً.

**المعلومات الأساسية التي يجب قراءتها:**

**الاسم الدوائي الدولي (INN)** هو اسم المادة الفعّالة. قد يحمل نفس الدواء عشرات الأسماء التجارية. تحقق أنك لا تعطي نفس الجزيء مرتين تحت اسمين مختلفين!

**التركيز** يُعبَّر عنه بمغ/مل أو مغ/5مل. شراب 120مغ/5مل يختلف عن شراب 240مغ/5مل — اضبط جرعتك وفق ذلك.

**جرعة المرة الواحدة** تُحسب دائماً بمغ لكل كيلوغرام من وزن الجسم. زن طفلك بانتظام لتكون دقيقاً.

**الأنبوبة المدرجة** يجب أن تتطابق مع الشراب المرفق. لا تستبدلها بأنبوبة دواء آخر.

**السواغات الخطيرة** كالسوربيتول والكحول والصبغات قد تسبب آثاراً جانبية عند الأطفال الحساسين.

**القاعدة الذهبية:** عند الشك، اتصل بصيدلانيك — إنه مجاني وهو هنا لذلك!`,
    author: 'د. مارك ليفي',
    category: 'الأدوية والمكملات',
    readTime: 4,
    imageUrl: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=800',
    publishedAt: '2024-02-28',
  },
  {
    id: 'art-3',
    title: 'الوقاية من حوادث المنزل غرفة بغرفة',
    excerpt: 'المنزل هو مكان 75% من حوادث الأطفال. جولة على المخاطر في كل غرفة وكيفية التخلص منها بسهولة.',
    content: `حوادث المنزل هي السبب الرئيسي للوفاة عند الأطفال من 1 إلى 14 سنة. ومع ذلك، يمكن تفادي 90% منها.

**المطبخ:**
- اطبخ على الشعلات الخلفية مع توجيه المقابض للداخل
- احفظ السكاكين ومنتجات التنظيف بعيداً عن متناول الأطفال
- لا تترك الطفل وحده بجانب لوحة التسخين

**الحمام:**
- لا تترك الطفل وحده في الحوض ولو دقيقتين
- اضبط سخان الماء على 50 درجة كحد أقصى
- احفظ الأدوية ومستحضرات التجميل في مكان مؤمَّن

**غرفة الجلوس:**
- أمّن مآخذ الكهرباء بأغطية خاصة
- ثبّت الأثاث العالي في الجدار (خطر الانقلاب)
- أزل الأشياء الصغيرة (أقل من 3 سم) من متناول الأطفال دون 3 سنوات

**السلالم:**
- ضع حواجز في كلا الطرفين للأطفال دون 3 سنوات
- تحقق من متانة الدرابزين

**النوافذ:**
- لا تضع أثاثاً قابلاً للتسلق تحت النوافذ
- ثبّت موانع تحدّ فتح النافذة إلى 10 سم كحد أقصى

جولة أمان جيدة تحمي طفلك لسنوات!`,
    author: 'د. صوفي مارتان',
    category: 'الوقاية',
    readTime: 6,
    imageUrl: 'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=800',
    publishedAt: '2024-01-20',
  },
  {
    id: 'art-4',
    title: 'نوم الرضيع: الدليل الكامل من 0 إلى 12 شهراً',
    excerpt: 'فهم دورات نوم الرضيع لمساعدة طفلك على النوم بهدوء وأمان.',
    content: `النوم ضروري للتطور الدماغي للرضيع. فهم آلياته يساعد الآباء على التعامل مع الليالي الصعبة بمزيد من الهدوء.

**دورات نوم الرضيع:**
على عكس البالغ، لدى الرضيع دورات قصيرة تتراوح بين 50-60 دقيقة. يتناوب بين النوم المتحرك (ما يعادل نوم REM عند البالغ) والنوم الهادئ. الاستيقاظ بين الدورات طبيعي حتى عمر 4-6 أشهر.

**قواعد السلامة المطلقة (الموت المفاجئ للرضيع):**
- ضعه دائماً على ظهره
- فراش صلب، بلا لحاف، بلا وسادة، بلا حواجز مبطنة
- درجة حرارة الغرفة: 18-20 درجة
- لا تدخين في محيط الطفل
- تجنب النوم المشترك في سرير الوالدين (إلا بأجهزة معتمدة)

**مساعدة الرضيع على النوم:**
الطقوس المنتظمة (الاستحمام والأحضان والأغنية) تخلق معالم مطمئنة. الاتساق أهم من الأسلوب.

**متى تستشير؟** إذا كان رضيعك يشخر بقوة أو يتوقف عن التنفس لحظات أو يتعرق بشكل مفرط ليلاً، استشر طبيب الأطفال.`,
    author: 'د. إيما روسو',
    category: 'التطور',
    readTime: 7,
    imageUrl: 'https://images.pexels.com/photos/35537/child-children-girl-happy.jpg?auto=compress&cs=tinysrgb&w=800',
    publishedAt: '2024-03-01',
  },
];

export function getArticles(language: Language): Article[] {
  return language === 'ar' ? articlesDataAr : articlesDataFr;
}

export const articlesData = articlesDataFr;
