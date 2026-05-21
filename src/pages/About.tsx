import { Heart, Target, BookOpen, Shield, ExternalLink } from 'lucide-react';
import { Language, translations } from '../lib/i18n';
import { Page } from '../types';

interface AboutProps {
  language?: Language;
  onNavigate?: (page: Page) => void;
}

const sources = [
  { name: 'Haute Autorité de Santé (HAS)', url: 'https://www.has-sante.fr', descKey: 'sourceHASDesc' as const },
  { name: 'ANSM — Agence du médicament',   url: 'https://www.ansm.sante.fr', descKey: 'sourceANSMDesc' as const },
  { name: 'Croix-Rouge Française',          url: 'https://www.croix-rouge.fr', descKey: 'sourceCroixRougeDesc' as const },
  { name: 'VIDAL — Base de données',        url: 'https://www.vidal.fr', descKey: 'sourceVidalDesc' as const },
  { name: 'Organisation Mondiale de la Santé (OMS)', url: 'https://www.who.int/fr', descKey: 'sourceOMSDesc' as const },
  { name: 'SAMU de France',                 url: 'https://www.samu-de-france.fr', descKey: 'sourceSamuDesc' as const },
];

export default function About({ language = 'fr', onNavigate }: AboutProps) {
  const t = translations[language];

  const missionItems = [
    { icon: Target, titleKey: 'missionAccessibilite' as const, descKey: 'missionAccessibiliteDesc' as const, color: 'bg-blue-100 text-blue-600' },
    { icon: Shield, titleKey: 'missionFiabilite' as const,     descKey: 'missionFiabiliteDesc' as const,     color: 'bg-teal-100 text-teal-600' },
    { icon: Heart,  titleKey: 'missionSauver' as const,        descKey: 'missionSauverDesc' as const,        color: 'bg-red-100 text-red-600' },
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="font-quicksand font-bold text-4xl md:text-5xl mb-4">{t.aproposTitle}</h1>
          <p className="text-lg text-slate-300">{t.aproposSubtitle}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 space-y-12">
        {/* Creator */}
        <section className="bg-white rounded-3xl border border-slate-100 shadow-soft p-8">
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center flex-shrink-0">
              <span className="text-4xl">👩‍⚕️</span>
            </div>
            <div>
              <h2 className="font-quicksand font-bold text-2xl text-slate-800 mb-2">{t.creeParTitre}</h2>
              <p className="text-slate-700 leading-relaxed mb-4">{t.creeParTexte1}</p>
              <p className="text-slate-700 leading-relaxed">{t.creeParTexte2}</p>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="space-y-6">
          <h2 className="font-quicksand font-bold text-3xl text-slate-800 text-center">{t.notreMission}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {missionItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.titleKey} className="bg-white rounded-3xl border border-slate-100 shadow-soft p-6">
                  <div className={`w-12 h-12 rounded-2xl ${item.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-quicksand font-bold text-lg text-slate-800 mb-2">{t[item.titleKey]}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{t[item.descKey]}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Sources */}
        <section className="bg-slate-50 rounded-3xl border border-slate-200 p-8">
          <h2 className="font-quicksand font-bold text-2xl text-slate-800 mb-6 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-teal-600" />
            {t.sourcesRefs}
          </h2>
          <p className="text-slate-700 mb-6 leading-relaxed">{t.sourcesIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sources.map(source => (
              <a
                key={source.url}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-white rounded-2xl border border-slate-200 hover:border-teal-300 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <span className="font-semibold text-slate-800 text-sm leading-tight flex-1">{source.name}</span>
                  <ExternalLink className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                </div>
                <p className="text-xs text-slate-500">{t[source.descKey]}</p>
              </a>
            ))}
          </div>
        </section>

        {/* Disclaimer */}
        <section className="bg-yellow-50 rounded-3xl border-2 border-yellow-200 p-8">
          <h2 className="font-quicksand font-bold text-2xl text-yellow-900 mb-4">{t.avertissementTitre}</h2>
          <div className="space-y-4 text-yellow-900">
            <p className="leading-relaxed">{t.avertissement1}</p>
            <p className="leading-relaxed">{t.avertissement2}</p>
            <p className="leading-relaxed">{t.avertissement3}</p>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center bg-gradient-to-r from-teal-500 to-teal-600 rounded-3xl p-10 text-white">
          <h2 className="font-quicksand font-bold text-2xl mb-3">{t.pretApprendreTitre}</h2>
          <p className="text-teal-100 mb-6 max-w-md mx-auto">{t.pretApprendreDesc}</p>
          <button
            onClick={() => onNavigate?.('emergencies')}
            className="px-8 py-3 bg-white text-teal-600 font-bold rounded-xl hover:bg-teal-50 transition-colors inline-block"
          >
            {t.consulterUrgences}
          </button>
        </section>

        {/* Contact */}
        <section className="text-center space-y-4">
          <p className="text-slate-600">{t.contactQuestion}</p>
          <a
            href="mailto:contact@petitssoins.fr"
            className="inline-block px-6 py-2.5 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition-colors"
          >
            {t.nousContacter}
          </a>
          <p className="text-xs text-slate-400 mt-8">
            {t.copyright}
          </p>
        </section>
      </div>
    </div>
  );
}
