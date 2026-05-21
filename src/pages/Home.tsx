import { Phone, Heart } from 'lucide-react';
import { Page } from '../types';
import { Language, translations, emergencyMedia } from '../lib/i18n';

interface HomeProps {
  onNavigate: (page: Page) => void;
  onSelectEmergency?: (id: string) => void;
  language?: Language;
}

export default function Home({ onNavigate, onSelectEmergency, language = 'fr' }: HomeProps) {
  const t = translations[language];

  const emergencies = [
    { icon: '🫁', label: t.etouffement,     id: 'etouffement' },
    { icon: '🔥', label: t.brulures,        id: 'brulures' },
    { icon: '❤️', label: t.cardiac,         id: 'cardiac' },
    { icon: '🤕', label: t.chute,           id: 'chute' },
    { icon: '⚡', label: t.convulsions,     id: 'convulsions' },
    { icon: '🌊', label: t.noyade,          id: 'noyade' },
    { icon: '🩸', label: t.saignement,      id: 'saignement' },
    { icon: '👃', label: t.epistaxis,       id: 'epistaxis' },
    { icon: '💔', label: t.inconscientSans, id: 'inconscientSans' },
    { icon: '😴', label: t.inconscientAvec, id: 'inconscientAvec' },
  ];

  const handleEmergencyClick = (id: string) => {
    onSelectEmergency?.(id);
    onNavigate('emergency');
  };

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden pt-20 pb-32">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-10 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative text-center">
          <div className="mb-8 flex justify-center">
            <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-teal-600 rounded-3xl flex items-center justify-center shadow-lg">
              <Heart className="w-10 h-10 text-white fill-white" />
            </div>
          </div>

          <h1 className="font-quicksand font-bold text-5xl md:text-6xl text-white leading-tight mb-4">
            {t.petitsSoins}
          </h1>

          <p className="font-quicksand text-2xl md:text-3xl text-teal-300 font-semibold mb-6">
            {t.slogan}
          </p>

          <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            {t.description}
          </p>

          {/* Main CTA Buttons */}
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => onNavigate('emergencies')}
              className="px-8 py-4 bg-red-500 text-white font-quicksand font-bold rounded-2xl hover:bg-red-600 transition-all shadow-lg hover:shadow-xl active:scale-95 text-lg flex items-center gap-2 w-full md:w-auto justify-center"
            >
              <Phone className="w-5 h-5" />
              {t.boutonUrgences}
            </button>
            <button
              onClick={() => onNavigate('guide')}
              className="px-8 py-4 bg-teal-500 text-white font-quicksand font-bold rounded-2xl hover:bg-teal-600 transition-all shadow-lg hover:shadow-xl active:scale-95 text-lg flex items-center gap-2 w-full md:w-auto justify-center"
            >
              📚 {t.boutonConseils}
            </button>
            <button
              onClick={() => onNavigate('about')}
              className="px-8 py-4 bg-slate-700 text-white font-quicksand font-bold rounded-2xl hover:bg-slate-600 transition-all shadow-lg hover:shadow-xl active:scale-95 text-lg flex items-center gap-2 w-full md:w-auto justify-center"
            >
              ℹ️ {t.boutonAPropos}
            </button>
          </div>
        </div>
      </section>

      {/* Emergency Cards Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 -mt-16 mb-16 relative z-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {emergencies.map(emergency => {
            const media = emergencyMedia[emergency.id];
            return (
              <button
                key={emergency.id}
                onClick={() => handleEmergencyClick(emergency.id)}
                className="group bg-white rounded-3xl border border-slate-100 shadow-card overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-5 text-center"
              >
                {media?.image ? (
                  <div className="w-16 h-16 mx-auto mb-3 rounded-2xl overflow-hidden group-hover:scale-105 transition-transform shadow-sm">
                    <img src={media.image} alt={emergency.label} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <span className="text-5xl mb-3 block group-hover:scale-110 transition-transform">{emergency.icon}</span>
                )}
                <p className="font-quicksand font-bold text-slate-800 text-sm leading-tight">{emergency.label}</p>
              </button>
            );
          })}
        </div>
      </section>

      {/* Emergency Info Strip */}
      <section className="bg-gradient-to-r from-red-50 to-orange-50 border-y border-red-100 py-6 mb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Phone className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="font-quicksand font-bold text-slate-800">{t.enCasUrgence}</p>
              <p className="text-sm text-slate-600">{t.appelez}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <a href="tel:15" className="px-6 py-2.5 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors text-sm">
              SAMU 15
            </a>
            <a href="tel:112" className="px-6 py-2.5 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors text-sm">
              112
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-16">
        <div className="text-center mb-12">
          <h2 className="font-quicksand font-bold text-3xl md:text-4xl text-slate-800 mb-3">
            {t.pourquoiTitre}
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">{t.pourquoiDesc}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: '🎯', title: t.feature1Title, desc: t.feature1Desc },
            { icon: '✅', title: t.feature2Title, desc: t.feature2Desc },
            { icon: '📱', title: t.feature3Title, desc: t.feature3Desc },
          ].map((feature, i) => (
            <div key={i} className="bg-white rounded-3xl border border-slate-100 shadow-soft p-6 hover:shadow-card transition-shadow">
              <span className="text-4xl mb-4 block">{feature.icon}</span>
              <h3 className="font-quicksand font-bold text-lg text-slate-800 mb-2">{feature.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
