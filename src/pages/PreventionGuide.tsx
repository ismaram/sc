import { useState } from 'react';
import { Clock, Search, ChevronRight, CheckCircle } from 'lucide-react';
import { getArticles } from '../data/articles';
import { Language, translations } from '../lib/i18n';
import { Article } from '../types';

interface PreventionGuideProps {
  language?: Language;
}

function ArticleModal({ article, onClose, language }: { article: Article; onClose: () => void; language: Language }) {
  const t = translations[language];
  const isRtl = language === 'ar';
  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-start justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-4xl max-w-2xl w-full my-8 shadow-2xl animate-slide-up"
        onClick={e => e.stopPropagation()}
      >
        <img src={article.imageUrl} alt={article.title} className="w-full h-52 object-cover rounded-t-4xl" />
        <div className="p-6 md:p-8">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className="bg-teal-100 text-teal-700 text-xs font-semibold px-3 py-1 rounded-full">
              {article.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-400">
              <Clock className="w-3.5 h-3.5" />
              {article.readTime} {t.minLecture}
            </span>
          </div>

          <h2 className="font-quicksand font-bold text-2xl text-slate-800 mb-2">{article.title}</h2>

          <div className="flex items-center gap-2 mb-6 text-sm text-slate-500 flex-wrap">
            <CheckCircle className="w-4 h-4 text-teal-500" />
            {t.verifiePar} <span className="font-semibold text-slate-700">{article.author}</span>
            <span>•</span>
            {new Date(article.publishedAt).toLocaleDateString(language === 'ar' ? 'ar-DZ' : 'fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
          </div>

          <div className={`prose prose-slate max-w-none ${isRtl ? 'text-right' : ''}`}>
            {article.content.split('\n\n').map((para, i) => {
              if (para.startsWith('**') && para.endsWith('**')) {
                return <h3 key={i} className="font-quicksand font-bold text-lg text-slate-800 mt-6 mb-2">{para.slice(2, -2)}</h3>;
              }
              if (para.includes('\n-')) {
                const [title, ...items] = para.split('\n');
                return (
                  <div key={i}>
                    {title && <p className="text-sm text-slate-700 leading-relaxed mb-2">{title}</p>}
                    <ul className="space-y-1.5 mb-4">
                      {items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-slate-700">
                          <span className="text-teal-500 mt-0.5 flex-shrink-0">•</span>
                          {item.replace(/^- /, '')}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              }
              return (
                <p key={i} className="text-sm text-slate-700 leading-relaxed mb-4">
                  {para.replace(/\*\*(.*?)\*\*/g, '$1')}
                </p>
              );
            })}
          </div>

          <button onClick={onClose} className="mt-6 w-full btn-secondary">
            {t.fermerArticle}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PreventionGuide({ language = 'fr' }: PreventionGuideProps) {
  const t = translations[language];
  const isRtl = language === 'ar';

  const categories = [t.catTous, t.catMedicaments, t.catPrevention, t.catDeveloppement];
  const articles = getArticles(language);

  const [activeCategory, setActiveCategory] = useState<string>(t.catTous);
  const [search, setSearch] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const filtered = articles.filter(art => {
    const matchesCat = activeCategory === t.catTous || art.category === activeCategory;
    const matchesSearch = !search ||
      art.title.toLowerCase().includes(search.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-quicksand font-bold text-3xl md:text-4xl text-slate-800 mb-2">{t.guideTitle}</h1>
        <p className="text-slate-600 max-w-2xl">{t.guideDesc}</p>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 ${isRtl ? 'end-4' : 'start-4'}`} />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder={t.rechercherArticle}
          className={`w-full py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-transparent ${isRtl ? 'pe-11 ps-4' : 'ps-11 pe-4'}`}
        />
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-1 scrollbar-hide">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`flex-shrink-0 px-4 py-2.5 rounded-2xl text-sm font-quicksand font-semibold transition-all duration-200 ${
              activeCategory === cat
                ? 'bg-teal-500 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Featured article */}
      {filtered.length > 0 && !search && activeCategory === t.catTous && (
        <button
          onClick={() => setSelectedArticle(filtered[0])}
          className="w-full mb-8 rounded-3xl overflow-hidden shadow-soft border border-slate-100 hover:shadow-card transition-shadow duration-300 group text-start"
        >
          <div className="relative h-56 md:h-72 overflow-hidden">
            <img
              src={filtered[0].imageUrl}
              alt={filtered[0].title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent" />
            <div className="absolute bottom-0 start-0 end-0 p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-teal-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {filtered[0].category}
                </span>
                <span className="text-white/70 text-xs flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {filtered[0].readTime} min
                </span>
              </div>
              <h2 className="font-quicksand font-bold text-xl md:text-2xl text-white mb-1">{filtered[0].title}</h2>
              <div className="flex items-center gap-1.5 text-teal-300 text-xs font-semibold">
                <CheckCircle className="w-3.5 h-3.5" />
                {t.verifiePar} {filtered[0].author}
              </div>
            </div>
          </div>
        </button>
      )}

      {/* Articles grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-slate-400">
          <span className="text-5xl mb-4 block">📰</span>
          <p className="font-quicksand font-semibold text-lg">{t.aucunArticle}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {(search || activeCategory !== t.catTous ? filtered : filtered.slice(1)).map(art => (
            <button
              key={art.id}
              onClick={() => setSelectedArticle(art)}
              className="bg-white rounded-3xl border border-slate-100 shadow-soft overflow-hidden hover:shadow-card transition-all duration-300 text-start group"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={art.imageUrl}
                  alt={art.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-teal-50 text-teal-700 text-xs font-semibold px-3 py-1 rounded-full">
                    {art.category}
                  </span>
                  <span className="text-slate-400 text-xs flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {art.readTime} {t.minLecture}
                  </span>
                </div>
                <h3 className="font-quicksand font-bold text-lg text-slate-800 mb-2 leading-tight">{art.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 mb-3">{art.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-teal-600 font-semibold">
                    <CheckCircle className="w-3.5 h-3.5" />
                    {art.author}
                  </div>
                  <span className="text-teal-500 text-sm font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    {t.lire} <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {selectedArticle && (
        <ArticleModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
          language={language}
        />
      )}
    </div>
  );
}
