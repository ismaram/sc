import { ChevronRight, Phone } from 'lucide-react';
import { Page } from '../types';
import { Language, translations, emergencyMedia } from '../lib/i18n';

interface EmergencyGesturesProps {
  onNavigate: (page: Page) => void;
  onSelectEmergency?: (id: string) => void;
  language?: Language;
}

export default function EmergencyGestures({ onNavigate, onSelectEmergency, language = 'fr' }: EmergencyGesturesProps) {
  const t = translations[language];

  const emergencies = [
    { id: 'etouffementGrand', icon: '🫁', title: t.etouffementGrand, desc: t.etouffementGrandDesc },
    { id: 'etouffementBebe',  icon: '👶', title: t.etouffementBebe,  desc: t.etouffementBebeDesc },
    { id: 'brulures',         icon: '🔥', title: t.brulures,         desc: t.bruluresDesc },
    { id: 'cardiac',          icon: '❤️', title: t.cardiac,          desc: t.cardiacDesc },
    { id: 'convulsions',      icon: '⚡', title: t.convulsions,      desc: t.convulsionsDesc },
    { id: 'noyade',           icon: '🌊', title: t.noyade,           desc: t.noyadeDesc },
    { id: 'saignement',       icon: '🩸', title: t.saignement,       desc: t.saignementDesc },
    { id: 'epistaxis',        icon: '👃', title: t.epistaxis,        desc: t.epistaxisDesc },
    { id: 'inconscientSans',  icon: '💔', title: t.inconscientSans,  desc: t.inconscientSansDesc },
    { id: 'inconscientAvec',  icon: '😴', title: t.inconscientAvec,  desc: t.inconscientAvecDesc },
    { id: 'intoxication',     icon: '⚠️', title: t.intoxication,    desc: t.intoxicationDesc },
  ];

  const handleSelect = (id: string) => {
    onSelectEmergency?.(id);
    onNavigate('emergency');
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 border-b border-red-100 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h1 className="font-quicksand font-bold text-4xl text-slate-800 mb-2">{t.gestesUrgence}</h1>
          <p className="text-slate-600 max-w-2xl">{t.protocoles}</p>
        </div>
      </div>

      {/* Emergency CTA */}
      <div className="bg-red-600 text-white py-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center gap-3">
          <Phone className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm font-semibold">{t.urgenceReelleBandeau}</span>
        </div>
      </div>

      {/* Emergency Cards */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {emergencies.map(emergency => {
            const media = emergencyMedia[emergency.id];
            return (
              <button
                key={emergency.id}
                onClick={() => handleSelect(emergency.id)}
                className="bg-white rounded-3xl border border-slate-100 shadow-soft overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-start group"
              >
                <div className="p-6 flex items-start gap-4">
                  {/* Image or icon */}
                  {media?.image ? (
                    <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 group-hover:scale-105 transition-transform shadow-sm">
                      <img src={media.image} alt={emergency.title} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <span className="text-4xl group-hover:scale-110 transition-transform flex-shrink-0 w-16 text-center leading-none pt-1">
                      {emergency.icon}
                    </span>
                  )}
                  <div className="flex-1 min-w-0">
                    <h2 className="font-quicksand font-bold text-xl text-slate-800 mb-1">{emergency.title}</h2>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">{emergency.desc}</p>
                    <div className="flex items-center gap-1 text-teal-600 font-semibold text-sm group-hover:gap-2 transition-all">
                      {t.consulter} <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
