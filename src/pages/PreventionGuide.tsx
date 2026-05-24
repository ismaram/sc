import { Phone, Package, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { Language, translations } from '../lib/i18n';

interface PreventionGuideProps {
  language?: Language;
}

interface KitSection {
  icon: string;
  titleFr: string;
  titleAr: string;
  items: { fr: string; ar: string }[];
}

interface ParentTip {
  icon: string;
  titleFr: string;
  titleAr: string;
  descFr: string;
  descAr: string;
}

const kitSections: KitSection[] = [
  {
    icon: '🩹',
    titleFr: 'Matériel de soins des plaies',
    titleAr: 'مواد تضميد الجروح',
    items: [
      { fr: 'Pansements adhésifs (petits, moyens, grands)', ar: 'ضمادات لاصقة (صغيرة، متوسطة، كبيرة)' },
      { fr: 'Compresses stériles', ar: 'شاش معقم' },
      { fr: 'Bandes de gaze', ar: 'شرائط شاش' },
      { fr: 'Pansement compressif', ar: 'ضمادة ضاغطة' },
      { fr: 'Sparadrap (ruban adhésif médical)', ar: 'شريط لاصق طبي' },
    ],
  },
  {
    icon: '🧴',
    titleFr: 'Désinfection et hygiène',
    titleAr: 'التطهير والنظافة',
    items: [
      { fr: 'Antiseptique (chlorhexidine ou povidone iodée)', ar: 'مطهر (كلورهيكسيدين أو بيتادين)' },
      { fr: 'Sérum physiologique (lavage des yeux et plaies)', ar: 'محلول ملحي (لغسيل العيون والجروح)' },
      { fr: 'Lingettes antiseptiques', ar: 'مناديل مطهرة' },
      { fr: 'Gants à usage unique', ar: 'قفازات للاستخدام الواحد' },
    ],
  },
  {
    icon: '✂️',
    titleFr: 'Petit matériel médical',
    titleAr: 'أدوات طبية صغيرة',
    items: [
      { fr: 'Ciseaux à bouts ronds', ar: 'مقص ذو أطراف مستديرة' },
      { fr: 'Pince à échardes', ar: 'ملقط شظايا' },
      { fr: 'Thermomètre digital', ar: 'ميزان حرارة رقمي' },
      { fr: 'Masques de protection', ar: 'أقنعة واقية' },
      { fr: 'Épingles de sûreté', ar: 'دبابيس أمان' },
    ],
  },
  {
    icon: '❄️',
    titleFr: 'Urgences et traumatismes',
    titleAr: 'الطوارئ والإصابات',
    items: [
      { fr: 'Poche de froid instantané', ar: 'كيس ثلج فوري' },
      { fr: 'Bande élastique (entorse légère)', ar: 'ربطة مرنة (التواء خفيف)' },
      { fr: 'Couverture de survie', ar: 'بطانية إنقاذ' },
    ],
  },
  {
    icon: '💊',
    titleFr: 'Médicaments de base (si conseillé par un médecin)',
    titleAr: 'أدوية أساسية (إن أُنصح بها من الطبيب)',
    items: [
      { fr: 'Paracétamol (fièvre et douleur)', ar: 'باراسيتامول (للحمى والألم)' },
      { fr: 'Solution de réhydratation orale', ar: 'محلول إماهة فموية' },
      { fr: 'Crème apaisante (piqûres, brûlures légères)', ar: 'كريم مهدئ (للحشرات والحروق الخفيفة)' },
    ],
  },
];

const parentTips: ParentTip[] = [
  {
    icon: '🔍',
    titleFr: 'Vérification régulière',
    titleAr: 'الفحص الدوري',
    descFr: "Contrôler les dates de péremption du matériel et des médicaments tous les 6 mois.",
    descAr: 'تحقق من تواريخ انتهاء صلاحية المواد والأدوية كل 6 أشهر.',
  },
  {
    icon: '📍',
    titleFr: 'Accessibilité',
    titleAr: 'سهولة الوصول',
    descFr: "Placer le kit dans un endroit fixe et facile à atteindre pour tous les adultes.",
    descAr: 'ضع الحقيبة في مكان ثابت يسهل الوصول إليه لجميع البالغين.',
  },
  {
    icon: '🎓',
    titleFr: 'Formation',
    titleAr: 'التدريب',
    descFr: "Apprendre les gestes de premiers secours pédiatriques. Consultez la section Urgences.",
    descAr: 'تعلم إجراءات الإسعافات الأولية للأطفال. راجع قسم الطوارئ.',
  },
];

export default function PreventionGuide({ language = 'fr' }: PreventionGuideProps) {
  const t = translations[language];
  const isAr = language === 'ar';

  return (
    <div className="animate-fade-in" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-500 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8 text-white" />
          </div>
          <h1 className="font-quicksand font-bold text-3xl md:text-4xl mb-3">{t.guideTitle}</h1>
          <p className="text-teal-100 text-lg max-w-xl mx-auto">{t.guideDesc}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-10">

        {/* Kit Contents */}
        <section>
          <h2 className="font-quicksand font-bold text-2xl text-slate-800 mb-6 flex items-center gap-3">
            <span className="text-2xl">📦</span>
            {t.kitContentTitle}
          </h2>
          <div className="space-y-4">
            {kitSections.map((section, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl border border-slate-100 shadow-soft p-6 hover:shadow-card transition-shadow"
              >
                <h3 className="font-quicksand font-bold text-slate-800 text-lg mb-4 flex items-center gap-2">
                  <span className="text-xl">{section.icon}</span>
                  {isAr ? section.titleAr : section.titleFr}
                </h3>
                <ul className="space-y-2">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-700">{isAr ? item.ar : item.fr}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Emergency Banner */}
        <section className="bg-red-50 border border-red-200 rounded-3xl p-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div className="flex-1">
              <h2 className="font-quicksand font-bold text-xl text-slate-800 mb-2">{t.kitEmergencyTitle}</h2>
              <p className="text-slate-700 text-sm mb-1">
                <strong>{isAr ? 'مهم:' : 'Important :'}</strong>{' '}
                {t.kitEmergencyDesc}
              </p>
              <p className="text-sm text-red-700 mb-5">
                {isAr
                  ? 'اتصل فوراً بخدمات الإسعاف إن كانت الحالة خطيرة.'
                  : 'Appelez immédiatement les services de secours si la situation est grave.'}
              </p>
              <a
                href="tel:190"
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-2xl transition-colors shadow-sm"
              >
                <Phone className="w-4 h-4" />
                {t.kitCallSecours}
              </a>
            </div>
          </div>
        </section>

        {/* Parent Tips */}
        <section>
          <h2 className="font-quicksand font-bold text-2xl text-slate-800 mb-6 flex items-center gap-3">
            <Info className="w-6 h-6 text-teal-500" />
            {t.kitConseilsTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {parentTips.map((tip, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl border border-slate-100 shadow-soft p-6 hover:shadow-card transition-shadow text-center"
              >
                <span className="text-3xl mb-3 block">{tip.icon}</span>
                <h3 className="font-quicksand font-bold text-slate-800 mb-2">
                  {isAr ? tip.titleAr : tip.titleFr}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {isAr ? tip.descAr : tip.descFr}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Disclaimer */}
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5">
          <p className="text-xs text-slate-500 leading-relaxed text-center">
            ⚠️{' '}
            {isAr
              ? 'هذه المعلومات لأغراض تعليمية فقط. استشر دائماً طبيبك أو صيدلانيك قبل إعداد الحقيبة.'
              : "Ces informations sont à titre éducatif uniquement. Consultez toujours votre médecin ou pharmacien avant de préparer votre kit."}
          </p>
        </div>

      </div>
    </div>
  );
}
