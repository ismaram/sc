import { useState } from 'react';
import { Phone, AlertCircle, CheckCircle, XCircle, ChevronLeft, PlayCircle } from 'lucide-react';
import { Page } from '../types';
import { Language, translations, emergencyDetailsData, emergencyMedia } from '../lib/i18n';

interface EmergencyDetailProps {
  onNavigate: (page: Page) => void;
  emergencyId?: string;
  language?: Language;
}

export default function EmergencyDetail({ onNavigate, emergencyId = 'etouffementGrand', language = 'fr' }: EmergencyDetailProps) {
  const [currentId, setCurrentId] = useState(emergencyId);
  const [openVideos, setOpenVideos] = useState<Record<string, boolean>>({});
  const t = translations[language];
  const data = emergencyDetailsData[language];
  const emergency = data[currentId as keyof typeof data];
  const media = emergencyMedia[currentId];
  const isRtl = language === 'ar';

  const emergencyList = [
    { id: 'etouffementGrand', label: `🫁 ${t.etouffementGrand}` },
    { id: 'etouffementBebe',  label: `👶 ${t.etouffementBebe}` },
    { id: 'brulures',         label: `🔥 ${t.brulures}` },
    { id: 'cardiac',          label: `❤️ ${t.cardiac}` },
    { id: 'convulsions',      label: `⚡ ${t.convulsions}` },
    { id: 'noyade',           label: `🌊 ${t.noyade}` },
    { id: 'saignement',       label: `🩸 ${t.saignement}` },
    { id: 'epistaxis',        label: `👃 ${t.epistaxis}` },
    { id: 'inconscientSans',  label: `💔 ${t.inconscientSans}` },
    { id: 'inconscientAvec',  label: `😴 ${t.inconscientAvec}` },
    { id: 'intoxication',     label: `⚠️ ${t.intoxication}` },
  ];

  const toggleVideo = (id: string) => {
    setOpenVideos(prev => ({ ...prev, [id]: !prev[id] }));
  };

  if (!emergency) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <button
          onClick={() => onNavigate('emergencies')}
          className="flex items-center gap-2 text-teal-600 hover:text-teal-700 mb-6 font-semibold"
        >
          <ChevronLeft className="w-5 h-5" />
          {t.retourListe}
        </button>
        <p className="text-slate-600">—</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-10 relative overflow-hidden">
        {media?.image && (
          <div
            className="absolute inset-0 opacity-15 bg-cover bg-center"
            style={{ backgroundImage: `url(${media.image})` }}
          />
        )}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative">
          <button
            onClick={() => onNavigate('emergencies')}
            className={`flex items-center gap-2 text-teal-300 hover:text-teal-200 mb-6 font-semibold ${isRtl ? 'flex-row-reverse' : ''}`}
          >
            <ChevronLeft className={`w-5 h-5 ${isRtl ? 'rotate-180' : ''}`} />
            {t.retourListe}
          </button>
          <div className="flex items-center gap-5">
            {media?.image ? (
              <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 border-2 border-white/20 shadow-lg">
                <img src={media.image} alt={emergency.title} className="w-full h-full object-cover" />
              </div>
            ) : (
              <span className="text-6xl flex-shrink-0">{emergency.icon}</span>
            )}
            <div>
              {media?.image && <span className="text-3xl mb-1 block">{emergency.icon}</span>}
              <h1 className="font-quicksand font-bold text-3xl md:text-4xl">{emergency.title}</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Info Strip */}
      <div className="bg-red-50 border-b border-red-100 py-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex items-center gap-3">
          <Phone className="w-5 h-5 text-red-600 flex-shrink-0" />
          <span className="text-sm font-semibold text-slate-800">{t.urgenceInfoStrip}</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-10">
        {/* Signs */}
        <section className="bg-white rounded-3xl border border-slate-100 shadow-soft p-8">
          <div className="flex items-center gap-3 mb-6">
            <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
            <h2 className="font-quicksand font-bold text-2xl text-slate-800">{t.signesAlerte}</h2>
          </div>
          <ul className="space-y-3">
            {emergency.signs.map((sign: string, i: number) => (
              <li key={i} className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-100 text-red-600 font-bold text-sm flex-shrink-0 mt-0.5">⚠️</span>
                <span className="text-slate-700 leading-relaxed">{sign}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Actions — À faire ✅ */}
        <section className="bg-white rounded-3xl border border-slate-100 shadow-soft p-8">
          <div className="flex items-center gap-3 mb-6">
            <CheckCircle className="w-6 h-6 text-teal-500 flex-shrink-0" />
            <h2 className="font-quicksand font-bold text-2xl text-slate-800">{t.gestesAFaire}</h2>
          </div>
          <div className="space-y-4">
            {emergency.actions.map((action: string, i: number) => (
              <div key={i} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold text-sm">{i + 1}</div>
                <p className="text-slate-700 leading-relaxed pt-0.5">{action}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Warnings — À NE PAS faire ❌ */}
        <section className="bg-orange-50 rounded-3xl border border-orange-200 shadow-soft p-8">
          <div className="flex items-center gap-3 mb-6">
            <XCircle className="w-6 h-6 text-orange-600 flex-shrink-0" />
            <h2 className="font-quicksand font-bold text-2xl text-slate-800">{t.aNePasFaire}</h2>
          </div>
          <ul className="space-y-3">
            {emergency.warnings.map((warning: string, i: number) => (
              <li key={i} className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-200 text-red-700 font-bold text-sm flex-shrink-0 mt-0.5">✕</span>
                <span className="text-slate-700 leading-relaxed">{warning}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Videos */}
        {media?.videos && media.videos.length > 0 && (
          <section className="bg-white rounded-3xl border border-slate-100 shadow-soft p-8">
            <div className="flex items-center gap-3 mb-6">
              <PlayCircle className="w-6 h-6 text-teal-500 flex-shrink-0" />
              <h2 className="font-quicksand font-bold text-2xl text-slate-800">{t.demonstration}</h2>
            </div>
            <div className="space-y-5">
              {media.videos.map((video) => (
                <div key={video.id} className="rounded-2xl overflow-hidden border border-slate-200">
                  {openVideos[video.id] ? (
                    <div className="relative w-full bg-slate-900" style={{ paddingBottom: '56.25%' }}>
                      <iframe
                        className="absolute inset-0 w-full h-full"
                        src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`}
                        title={language === 'ar' ? video.labelAr : video.labelFr}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <button
                      onClick={() => toggleVideo(video.id)}
                      className="w-full flex items-center gap-4 p-4 bg-slate-50 hover:bg-teal-50 transition-colors group text-start"
                    >
                      <div className="w-11 h-11 bg-teal-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-teal-600 transition-colors shadow-sm">
                        <PlayCircle className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800 group-hover:text-teal-700">
                          {language === 'ar' ? video.labelAr : video.labelFr}
                        </p>
                        <p className="text-xs text-slate-400 mt-0.5">YouTube</p>
                      </div>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Emergency CTA */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-3xl p-8 text-center text-white">
          <h3 className="font-quicksand font-bold text-2xl mb-3">{t.douteOuUrgence}</h3>
          <p className="text-red-100 mb-6">{t.hesitezPas}</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <a href="tel:190" className="px-6 py-3 bg-white text-red-600 font-bold rounded-xl hover:bg-red-50 transition-colors">{t.samu}</a>
            <a href="tel:198" className="px-6 py-3 bg-white text-red-600 font-bold rounded-xl hover:bg-red-50 transition-colors">{t.pompiers}</a>
            <a href="tel:197" className="px-6 py-3 bg-white text-red-600 font-bold rounded-xl hover:bg-red-50 transition-colors">{t.urgencesNum}</a>
          </div>
        </div>

        {/* Nav between emergencies */}
        <section className="mt-12">
          <h3 className="font-quicksand font-bold text-xl text-slate-800 mb-4">{t.autresUrgences}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {emergencyList.map(item => (
              <button
                key={item.id}
                onClick={() => { setCurrentId(item.id); setOpenVideos({}); }}
                className={`p-3 rounded-2xl font-semibold text-center text-sm transition-all ${
                  currentId === item.id
                    ? 'bg-teal-500 text-white shadow-md'
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-teal-300 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
