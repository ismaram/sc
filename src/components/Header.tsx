import { useState } from 'react';
import { Menu, X, Heart, Search } from 'lucide-react';
import { Page } from '../types';
import { Language, translations } from '../lib/i18n';

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  onSearch: (query: string) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

const navPages: { key: keyof typeof translations['fr']; page: Page }[] = [
  { key: 'accueil', page: 'home' },
  { key: 'urgences', page: 'emergencies' },
  { key: 'conseils', page: 'guide' },
  { key: 'aPropos', page: 'about' },
];

export default function Header({ currentPage, onNavigate, onSearch, language, onLanguageChange }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const t = translations[language];
  const isRtl = language === 'ar';

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-soft">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 group"
          >
            <div className="w-9 h-9 bg-teal-500 rounded-2xl flex items-center justify-center shadow-sm group-hover:bg-teal-600 transition-colors">
              <Heart className="w-5 h-5 text-white fill-white" />
            </div>
            <span className="font-quicksand font-700 text-xl text-slate-800 font-bold">
              Pédia<span className="text-teal-500">Secours</span>
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navPages.map(({ key, page }) => (
              <button
                key={page}
                onClick={() => onNavigate(page)}
                className={`px-4 py-2 rounded-xl font-quicksand font-semibold text-sm transition-all duration-200 ${
                  currentPage === page
                    ? 'bg-teal-50 text-teal-600'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
                }`}
              >
                {t[key]}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <div className="flex items-center bg-slate-100 rounded-xl p-0.5 gap-0.5">
              <button
                onClick={() => onLanguageChange('fr')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all duration-200 ${
                  language === 'fr'
                    ? 'bg-white shadow-sm text-slate-800'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
                aria-label="Français"
              >
                FR
              </button>
              <button
                onClick={() => onLanguageChange('ar')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all duration-200 ${
                  language === 'ar'
                    ? 'bg-white shadow-sm text-slate-800'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
                aria-label="العربية"
              >
                ع
              </button>
            </div>

            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
              aria-label={t.rechercher}
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 transition-colors"
              aria-label="Menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className="pb-3 animate-slide-up">
            <form onSubmit={handleSearch} className="relative">
              <Search className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 ${isRtl ? 'end-4' : 'start-4'}`} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.rechercher}
                className={`w-full py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-transparent ${isRtl ? 'pe-11 ps-4 text-right' : 'ps-11 pe-4'}`}
                autoFocus
                dir={isRtl ? 'rtl' : 'ltr'}
              />
            </form>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 animate-slide-up">
          <div className="px-4 py-3 space-y-1">
            {navPages.map(({ key, page }) => (
              <button
                key={page}
                onClick={() => { onNavigate(page); setMenuOpen(false); }}
                className={`w-full px-4 py-3 rounded-xl font-quicksand font-semibold transition-colors ${isRtl ? 'text-right' : 'text-left'} ${
                  currentPage === page
                    ? 'bg-teal-50 text-teal-600'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {t[key]}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
