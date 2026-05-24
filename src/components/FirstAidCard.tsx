import { Phone, AlertCircle, ChevronDown, ChevronUp, CheckCircle2, XCircle, PlayCircle } from 'lucide-react';
import { useState } from 'react';
import { FirstAidEntry } from '../types';
import { categoryLabels, categoryColors } from '../data/firstAid';
import { Language } from '../lib/i18n';

interface FirstAidCardProps {
  entry: FirstAidEntry;
  compact?: boolean;
  language?: Language;
}

const severityConfig = {
  high: {
    fr: { label: 'Urgence', color: 'bg-red-100 text-red-700' },
    ar: { label: 'طوارئ', color: 'bg-red-100 text-red-700' },
  },
  medium: {
    fr: { label: 'À surveiller', color: 'bg-yellow-100 text-yellow-700' },
    ar: { label: 'مراقبة', color: 'bg-yellow-100 text-yellow-700' },
  },
  low: {
    fr: { label: 'Bénin', color: 'bg-green-100 text-green-700' },
    ar: { label: 'بسيط', color: 'bg-green-100 text-green-700' },
  },
};

const ageLabels: Record<string, { fr: string; ar: string }> = {
  '0-1': { fr: 'Nourrisson', ar: 'رضيع' },
  '1-3': { fr: 'Bambin', ar: 'طفل صغير' },
  '3-12': { fr: 'Enfant', ar: 'طفل' },
  '0-12': { fr: '0-12 ans', ar: '0-12 سنة' },
};

export default function FirstAidCard({ entry, compact = false, language = 'fr' }: FirstAidCardProps) {
  const [expanded, setExpanded] = useState(!compact);
  const [videoOpen, setVideoOpen] = useState(false);
  const severity = severityConfig[entry.severity][language];
  const isRtl = language === 'ar';

  const dosLabel = language === 'ar' ? '✅ ما يجب فعله' : '✅ À FAIRE';
  const dontsLabel = language === 'ar' ? '❌ ما لا يجب فعله' : '❌ À NE PAS FAIRE';
  const pharmacistLabel = language === 'ar' ? 'نصيحة الصيدلاني' : "L'avis du pharmacien";
  const videoLabel = language === 'ar' ? 'فيديو توضيحي' : 'Voir la vidéo';

  return (
    <div
      className="bg-white rounded-3xl border border-slate-100 shadow-soft overflow-hidden hover:shadow-card transition-shadow duration-300 animate-fade-in"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Header */}
      <div
        className="cursor-pointer overflow-hidden relative"
        style={{ backgroundColor: entry.illustrationColor + '60' }}
        onClick={() => compact && setExpanded(!expanded)}
      >
        {/* Background image (blurred) */}
        {entry.image && (
          <div
            className="absolute inset-0 opacity-20 bg-cover bg-center"
            style={{ backgroundImage: `url(${entry.image})` }}
          />
        )}

        <div className="relative p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              {/* Image or emoji icon */}
              {entry.image ? (
                <div className="w-14 h-14 rounded-2xl overflow-hidden flex-shrink-0 border border-white/40 shadow-sm">
                  <img
                    src={entry.image}
                    alt={entry.title[language]}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 text-3xl shadow-sm border border-white/40"
                  style={{ backgroundColor: entry.illustrationColor }}
                >
                  {entry.illustrationIcon}
                </div>
              )}

              <div>
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${categoryColors[entry.category]}`}>
                    {categoryLabels[entry.category][language]}
                  </span>
                  <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${severity.color}`}>
                    {severity.label}
                  </span>
                </div>
                <h3 className="font-quicksand font-bold text-lg text-slate-800 leading-tight">
                  {entry.title[language]}
                </h3>
              </div>
            </div>
            {compact && (
              <button className="text-slate-400 flex-shrink-0 mt-1">
                {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
            )}
          </div>

          {/* Age badges */}
          <div className="flex gap-1.5 mt-2 flex-wrap">
            {entry.ageRange.map(age => (
              <span key={age} className="text-xs bg-white/70 text-teal-700 font-semibold px-2.5 py-0.5 rounded-full border border-teal-100">
                {ageLabels[age][language]}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Body */}
      {expanded && (
        <div className="p-5 space-y-5 animate-slide-up">
          {/* Steps */}
          <div className="space-y-3">
            {entry.steps[language].map((step, index) => (
              <div key={index} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-teal-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {index + 1}
                </span>
                <p className="text-sm text-slate-700 leading-relaxed pt-0.5">{step}</p>
              </div>
            ))}
          </div>

          {/* À FAIRE */}
          <div className="bg-green-50 rounded-2xl p-4 border border-green-200">
            <p className="text-sm font-bold text-green-700 mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              {dosLabel}
            </p>
            <ul className="space-y-2">
              {entry.dos[language].map((item, index) => (
                <li key={index} className="flex items-start gap-2.5">
                  <span className="text-green-500 font-bold text-base leading-none mt-0.5 flex-shrink-0">✓</span>
                  <span className="text-sm text-slate-700 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* À NE PAS FAIRE */}
          <div className="bg-red-50 rounded-2xl p-4 border border-red-200">
            <p className="text-sm font-bold text-red-700 mb-3 flex items-center gap-2">
              <XCircle className="w-4 h-4 flex-shrink-0" />
              {dontsLabel}
            </p>
            <ul className="space-y-2">
              {entry.donts[language].map((item, index) => (
                <li key={index} className="flex items-start gap-2.5">
                  <span className="text-red-500 font-bold text-base leading-none mt-0.5 flex-shrink-0">✗</span>
                  <span className="text-sm text-slate-700 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Video section */}
          {entry.videoId && (
            <div className="rounded-2xl overflow-hidden border border-slate-200">
              {videoOpen ? (
                <div className="relative w-full bg-slate-900" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${entry.videoId}?autoplay=1&rel=0`}
                    title={entry.title[language]}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <button
                  onClick={() => setVideoOpen(true)}
                  className="w-full flex items-center gap-3 p-4 bg-slate-50 hover:bg-teal-50 transition-colors group"
                >
                  <div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-teal-600 transition-colors">
                    <PlayCircle className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-slate-700 group-hover:text-teal-700">
                    {videoLabel}
                  </span>
                </button>
              )}
            </div>
          )}

          {/* Pharmacist note */}
          <div className="bg-blue-50 rounded-2xl p-4 border-l-4 border-teal-400">
            <p className="text-xs font-semibold text-teal-600 mb-1 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {pharmacistLabel}
            </p>
            <p className="text-sm text-slate-600 italic leading-relaxed">{entry.pharmacistNote[language]}</p>
          </div>

          {/* Emergency button */}
          {entry.hasEmergencyLink && (
            <a
              href="tel:190"
              className="emergency-btn w-full text-sm"
            >
              <Phone className="w-4 h-4" />
              {language === 'ar' ? 'الاتصال بالإسعاف — 190' : 'Appeler le SAMU — 190'}
            </a>
          )}

          {/* Sources */}
          {entry.sources.length > 0 && (
            <p className="text-xs text-slate-400">
              {language === 'ar' ? 'المصادر: ' : 'Sources : '}
              {entry.sources.map((s, i) => (
                <span key={i}>
                  <a href={s} target="_blank" rel="noopener noreferrer" className="underline hover:text-teal-500">
                    {new URL(s).hostname.replace('www.', '')}
                  </a>
                  {i < entry.sources.length - 1 ? ', ' : ''}
                </span>
              ))}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
