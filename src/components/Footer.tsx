import { Heart, Phone, ExternalLink } from 'lucide-react';
import { Page } from '../types';
import { Language, translations } from '../lib/i18n';

interface FooterProps {
  onNavigate: (page: Page) => void;
  language?: Language;
}

export default function Footer({ onNavigate, language = 'fr' }: FooterProps) {
  const t = translations[language];

  const officialSources = [
    { label: 'OMS — Organisation mondiale de la Santé', url: 'https://www.who.int/fr' },
    { label: 'Croix-Rouge — Premiers secours', url: 'https://www.croix-rouge.fr' },
    { label: 'SAMU Tunisie — Protocoles urgence', url: 'https://www.sante.gov.tn' },
    { label: 'INEAS Tunisie — Évaluation santé', url: 'https://www.ineas.tn' },
  ];

  return (
    <footer className="bg-slate-900 text-slate-300 mt-20">
      {/* Emergency Banner */}
      <div className="bg-red-600 text-white py-3">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-wrap items-center justify-center gap-4 text-sm font-quicksand font-semibold">
          <Phone className="w-4 h-4" />
          <span>{t.footerUrgencesBandeau}</span>
          <a href="tel:190" className="underline hover:no-underline">{t.samu}</a>
          <span>•</span>
          <a href="tel:198" className="underline hover:no-underline">{t.pompiers}</a>
          <span>•</span>
          <a href="tel:71578036" className="underline hover:no-underline">{t.footerCentreAntipoison}</a>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-teal-500 rounded-xl flex items-center justify-center">
                <Heart className="w-4 h-4 text-white fill-white" />
              </div>
              <span className="font-quicksand font-bold text-lg text-white">
                Pédia<span className="text-teal-400">Secours</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">{t.footerSlogan}</p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-quicksand font-semibold text-white mb-3">{t.footerGuide}</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => onNavigate('emergencies')} className="hover:text-teal-400 transition-colors">{t.footerGestesUrgence}</button></li>
              <li><button onClick={() => onNavigate('guide')} className="hover:text-teal-400 transition-colors">{t.footerArticlesPrevention}</button></li>
              <li><button onClick={() => onNavigate('about')} className="hover:text-teal-400 transition-colors">{t.aPropos}</button></li>
            </ul>
          </div>

          {/* Emergency numbers */}
          <div>
            <h4 className="font-quicksand font-semibold text-white mb-3">{t.footerNumUrgence}</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="tel:190" className="hover:text-teal-400 transition-colors flex items-center gap-2"><Phone className="w-3 h-3" /> {t.samu}</a></li>
              <li><a href="tel:198" className="hover:text-teal-400 transition-colors flex items-center gap-2"><Phone className="w-3 h-3" /> {t.pompiers}</a></li>
              <li><a href="tel:197" className="hover:text-teal-400 transition-colors flex items-center gap-2"><Phone className="w-3 h-3" /> {t.urgencesNum}</a></li>
              <li><a href="tel:71578036" className="hover:text-teal-400 transition-colors flex items-center gap-2"><Phone className="w-3 h-3" /> {t.footerCentreAntipoison}</a></li>
            </ul>
          </div>

          {/* Sources */}
          <div>
            <h4 className="font-quicksand font-semibold text-white mb-3">{t.footerSources}</h4>
            <ul className="space-y-2 text-sm">
              {officialSources.map(({ label, url }) => (
                <li key={url}>
                  <a href={url} target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition-colors flex items-center gap-1">
                    <ExternalLink className="w-3 h-3 flex-shrink-0" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-10 pt-6">
          <p className="text-xs text-slate-500 text-center leading-relaxed">
            ⚠️ <strong className="text-slate-400">{t.footerSources} :</strong> {t.footerAvertissementTexte}
          </p>
          <p className="text-xs text-slate-600 text-center mt-3">{t.footerCopyright}</p>
        </div>
      </div>
    </footer>
  );
}
