import { useState } from 'react';
import { Search, AlertCircle, CheckCircle, XCircle, Info, ExternalLink } from 'lucide-react';
import { AgeRange, Medication } from '../types';
import { medicationsData } from '../data/medications';

type AgeTab = AgeRange | 'all';

const ageTabs: { id: AgeTab; label: string; icon: string; desc: string }[] = [
  { id: 'all', label: 'Tous', icon: '👶', desc: 'Tous les âges' },
  { id: '0-1', label: 'Nourrissons', icon: '🍼', desc: '0 à 1 an' },
  { id: '1-3', label: 'Bambins', icon: '🚶', desc: '1 à 3 ans' },
  { id: '3-12', label: 'Enfants', icon: '🧒', desc: '3 à 12 ans' },
];

const badgeConfig = {
  indispensable: {
    icon: CheckCircle,
    label: 'Indispensable',
    classes: 'bg-green-100 text-green-700 border-green-200',
    iconColor: 'text-green-500',
  },
  attention: {
    icon: AlertCircle,
    label: 'Attention dosage',
    classes: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    iconColor: 'text-yellow-500',
  },
  interdit: {
    icon: XCircle,
    label: 'Interdit / Déconseillé',
    classes: 'bg-red-100 text-red-700 border-red-200',
    iconColor: 'text-red-500',
  },
};

function MedicationCard({ med }: { med: Medication }) {
  const [expanded, setExpanded] = useState(false);
  const badge = badgeConfig[med.badge];
  const BadgeIcon = badge.icon;

  return (
    <div className={`bg-white rounded-3xl border-2 overflow-hidden transition-shadow duration-300 hover:shadow-card ${badge.classes}`}>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border ${badge.classes}`}>
                <BadgeIcon className={`w-3.5 h-3.5 ${badge.iconColor}`} />
                {badge.label}
              </span>
            </div>
            <h3 className="font-quicksand font-bold text-lg text-slate-800">{med.name}</h3>
          </div>
        </div>

        {/* Age range */}
        <div className="flex gap-1.5 flex-wrap mb-3">
          {med.ageRange.map(age => (
            <span key={age} className="text-xs bg-slate-100 text-slate-600 font-semibold px-2.5 py-0.5 rounded-full">
              {age === '0-1' ? 'Nourrisson' : age === '1-3' ? 'Bambin' : '3-12 ans'}
            </span>
          ))}
        </div>

        {/* Symptoms */}
        {med.symptoms.length > 0 && (
          <div className="flex gap-1.5 flex-wrap mb-3">
            {med.symptoms.slice(0, 3).map(s => (
              <span key={s} className="text-xs bg-teal-50 text-teal-700 px-2.5 py-0.5 rounded-full">
                {s}
              </span>
            ))}
          </div>
        )}

        <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">{med.description}</p>

        {med.forbiddenAge && (
          <div className="mt-3 flex items-start gap-2 bg-red-50 rounded-xl p-3">
            <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-red-700 font-medium">{med.forbiddenAge}</p>
          </div>
        )}

        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 text-sm font-semibold text-teal-600 hover:text-teal-700 transition-colors"
        >
          {expanded ? 'Moins de détails ↑' : 'Plus de détails ↓'}
        </button>
      </div>

      {expanded && (
        <div className="border-t border-slate-100 p-5 space-y-4 animate-slide-up">
          {med.dosage && (
            <div className="bg-yellow-50 rounded-2xl p-4 border-l-4 border-yellow-400">
              <p className="text-xs font-semibold text-yellow-700 mb-1">Posologie indicative</p>
              <p className="text-sm text-slate-700 font-medium">{med.dosage}</p>
            </div>
          )}

          <div>
            <p className="text-xs font-semibold text-slate-500 mb-1.5 flex items-center gap-1">
              <Info className="w-3.5 h-3.5" /> Mode d'administration
            </p>
            <p className="text-sm text-slate-700 leading-relaxed">{med.administration}</p>
          </div>

          <div>
            <p className="text-xs font-semibold text-slate-500 mb-1.5">Conservation</p>
            <p className="text-sm text-slate-700 leading-relaxed">{med.conservation}</p>
          </div>

          {med.sources.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-slate-500 mb-1.5">Sources officielles</p>
              <div className="flex flex-wrap gap-2">
                {med.sources.map(src => (
                  <a
                    key={src}
                    href={src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-teal-600 hover:text-teal-700 underline"
                  >
                    <ExternalLink className="w-3 h-3" />
                    {new URL(src).hostname.replace('www.', '')}
                  </a>
                ))}
              </div>
            </div>
          )}

          <div className="bg-blue-50 rounded-2xl p-3 text-xs text-slate-600 italic">
            Ces informations sont données à titre éducatif. Consultez toujours votre pharmacien ou médecin avant toute administration.
          </div>
        </div>
      )}
    </div>
  );
}

export default function Pharmacy() {
  const [activeAge, setActiveAge] = useState<AgeTab>('all');
  const [activeBadge, setActiveBadge] = useState<string>('all');
  const [search, setSearch] = useState('');

  const filtered = medicationsData.filter(med => {
    const matchesAge = activeAge === 'all' || med.ageRange.includes(activeAge as AgeRange);
    const matchesBadge = activeBadge === 'all' || med.badge === activeBadge;
    const matchesSearch = !search ||
      med.name.toLowerCase().includes(search.toLowerCase()) ||
      med.symptoms.some(s => s.toLowerCase().includes(search.toLowerCase()));
    return matchesAge && matchesBadge && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-quicksand font-bold text-3xl md:text-4xl text-slate-800 mb-2">
          La Pharmacie des Petits
        </h1>
        <p className="text-slate-600 max-w-2xl">
          Médicaments et suppléments pédiatriques : dosages, modes d'administration et précautions, vérifiés par des professionnels de santé.
        </p>
      </div>

      {/* Legend */}
      <div className="flex gap-3 flex-wrap mb-8">
        {Object.entries(badgeConfig).map(([key, { icon: Icon, label, classes, iconColor }]) => (
          <div key={key} className={`inline-flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-xl border ${classes}`}>
            <Icon className={`w-4 h-4 ${iconColor}`} />
            {label}
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Rechercher un médicament ou un symptôme..."
          className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-transparent"
        />
      </div>

      {/* Age tabs */}
      <div className="flex gap-2 mb-5 overflow-x-auto pb-1 scrollbar-hide">
        {ageTabs.map(({ id, label, icon, desc }) => (
          <button
            key={id}
            onClick={() => setActiveAge(id)}
            className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-quicksand font-semibold transition-all duration-200 ${
              activeAge === id
                ? 'bg-teal-500 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <span>{icon}</span>
            <span>{label}</span>
            <span className={`text-xs hidden sm:inline ${activeAge === id ? 'text-teal-100' : 'text-slate-400'}`}>
              ({desc})
            </span>
          </button>
        ))}
      </div>

      {/* Badge filter */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-1 scrollbar-hide">
        {[
          { id: 'all', label: 'Tous les médicaments' },
          { id: 'indispensable', label: '✅ Indispensable' },
          { id: 'attention', label: '⚠️ Attention dosage' },
          { id: 'interdit', label: '🚫 Interdit / Déconseillé' },
        ].map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setActiveBadge(id)}
            className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
              activeBadge === id
                ? 'bg-slate-700 text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Count */}
      <p className="text-sm text-slate-500 mb-5">
        {filtered.length} médicament{filtered.length > 1 ? 's' : ''} trouvé{filtered.length > 1 ? 's' : ''}
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-slate-400">
          <span className="text-5xl mb-4 block">🔍</span>
          <p className="font-quicksand font-semibold text-lg">Aucun médicament trouvé</p>
          <p className="text-sm mt-1">Modifiez vos filtres ou votre recherche</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map(med => (
            <MedicationCard key={med.id} med={med} />
          ))}
        </div>
      )}

      {/* Disclaimer */}
      <div className="mt-12 bg-blue-50 rounded-3xl p-6 border border-blue-100">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-quicksand font-bold text-slate-800 mb-1">Information importante</p>
            <p className="text-sm text-slate-600 leading-relaxed">
              Ce guide ne remplace pas les conseils d'un professionnel de santé. Les dosages indiqués sont indicatifs. Consultez toujours votre pharmacien ou médecin avant d'administrer un médicament à votre enfant, surtout pour les nourrissons de moins de 3 mois.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
