import { useState } from 'react';
import { LayoutDashboard, Shield, Beaker, BookOpen, Settings, Plus, Trash2, CreditCard as Edit2, Check, X, ChevronDown } from 'lucide-react';
import { firstAidData, categoryLabels } from '../data/firstAid';
import { medicationsData } from '../data/medications';
import { articlesData } from '../data/articles';

type AdminSection = 'overview' | 'firstaid' | 'medications' | 'articles' | 'settings';

const sections: { id: AdminSection; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'overview', label: 'Vue d\'ensemble', icon: LayoutDashboard },
  { id: 'firstaid', label: 'Gestes d\'urgence', icon: Shield },
  { id: 'medications', label: 'Médicaments', icon: Beaker },
  { id: 'articles', label: 'Articles', icon: BookOpen },
  { id: 'settings', label: 'Paramètres', icon: Settings },
];

function StatCard({ label, value, color, icon }: { label: string; value: number; color: string; icon: string }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-soft p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-2xl">{icon}</span>
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${color}`}>Actif</span>
      </div>
      <p className="font-quicksand font-bold text-3xl text-slate-800">{value}</p>
      <p className="text-sm text-slate-500 mt-1">{label}</p>
    </div>
  );
}

type NewEntry = {
  title: string;
  category: string;
  ageRange: string[];
  severity: string;
  steps: string;
  pharmacistNote: string;
  hasEmergencyLink: boolean;
  sources: string;
};

function AddEntryForm({ onClose }: { onClose: () => void }) {
  const [entry, setEntry] = useState<NewEntry>({
    title: '',
    category: 'fievre',
    ageRange: [],
    severity: 'medium',
    steps: '',
    pharmacistNote: '',
    hasEmergencyLink: false,
    sources: '',
  });
  const [saved, setSaved] = useState(false);

  const ageOptions = [
    { id: '0-1', label: 'Nourrisson (0-1 an)' },
    { id: '1-3', label: 'Bambin (1-3 ans)' },
    { id: '3-12', label: 'Enfant (3-12 ans)' },
  ];

  const toggleAge = (age: string) => {
    setEntry(prev => ({
      ...prev,
      ageRange: prev.ageRange.includes(age)
        ? prev.ageRange.filter(a => a !== age)
        : [...prev.ageRange, age],
    }));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(onClose, 1500);
  };

  if (saved) {
    return (
      <div className="text-center py-10">
        <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-green-500" />
        </div>
        <p className="font-quicksand font-bold text-lg text-slate-800">Fiche enregistrée !</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Nom du soin *</label>
        <input
          type="text"
          value={entry.title}
          onChange={e => setEntry(p => ({ ...p, title: e.target.value }))}
          placeholder="ex: Fièvre chez le nourrisson"
          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-300"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Catégorie</label>
          <div className="relative">
            <select
              value={entry.category}
              onChange={e => setEntry(p => ({ ...p, category: e.target.value }))}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-300 appearance-none"
            >
              {Object.entries(categoryLabels).map(([k, v]) => (
                <option key={k} value={k}>{v.fr}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Gravité</label>
          <div className="relative">
            <select
              value={entry.severity}
              onChange={e => setEntry(p => ({ ...p, severity: e.target.value }))}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-300 appearance-none"
            >
              <option value="low">Bénin</option>
              <option value="medium">À surveiller</option>
              <option value="high">Urgence</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">Tranches d'âge</label>
        <div className="flex gap-2 flex-wrap">
          {ageOptions.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => toggleAge(id)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all border ${entry.ageRange.includes(id)
                  ? 'bg-teal-500 text-white border-teal-500'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1.5">
          Étapes (une par ligne)
        </label>
        <textarea
          value={entry.steps}
          onChange={e => setEntry(p => ({ ...p, steps: e.target.value }))}
          placeholder="Étape 1 : ...&#10;Étape 2 : ...&#10;Étape 3 : ..."
          rows={5}
          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-300 resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1.5">
          Note du pharmacien
        </label>
        <textarea
          value={entry.pharmacistNote}
          onChange={e => setEntry(p => ({ ...p, pharmacistNote: e.target.value }))}
          placeholder="Conseil professionnel pour les parents..."
          rows={3}
          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-300 resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1.5">
          Sources (URLs, une par ligne)
        </label>
        <textarea
          value={entry.sources}
          onChange={e => setEntry(p => ({ ...p, sources: e.target.value }))}
          placeholder="https://www.has-sante.fr&#10;https://www.ansm.sante.fr"
          rows={2}
          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-300 resize-none"
        />
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setEntry(p => ({ ...p, hasEmergencyLink: !p.hasEmergencyLink }))}
          className={`w-12 h-6 rounded-full transition-colors flex items-center px-0.5 ${entry.hasEmergencyLink ? 'bg-teal-500' : 'bg-slate-300'
            }`}
        >
          <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${entry.hasEmergencyLink ? 'translate-x-6' : 'translate-x-0'
            }`} />
        </button>
        <label className="text-sm font-semibold text-slate-700">
          Afficher le bouton d'appel d'urgence sur la fiche
        </label>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          onClick={onClose}
          className="btn-secondary flex items-center gap-2 flex-1 justify-center"
        >
          <X className="w-4 h-4" />
          Annuler
        </button>
        <button
          onClick={handleSave}
          disabled={!entry.title || entry.ageRange.length === 0}
          className="btn-primary flex items-center gap-2 flex-1 justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Check className="w-4 h-4" />
          Enregistrer
        </button>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState<AdminSection>('overview');
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 animate-fade-in">
      <div className="mb-8">
        <h1 className="font-quicksand font-bold text-3xl text-slate-800 mb-1">
          Tableau de bord
        </h1>
        <p className="text-slate-500 text-sm">Gestion des protocoles et contenus éducatifs</p>
      </div>

      <div className="flex gap-6 flex-col md:flex-row">
        {/* Sidebar */}
        <div className="md:w-56 flex-shrink-0">
          <nav className="space-y-1">
            {sections.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveSection(id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-quicksand font-semibold transition-all ${activeSection === id
                    ? 'bg-teal-500 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-50'
                  }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {activeSection === 'overview' && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard label="Fiches d'urgence" value={firstAidData.length} color="bg-teal-100 text-teal-700" icon="🩺" />
                <StatCard label="Médicaments" value={medicationsData.length} color="bg-blue-100 text-blue-700" icon="💊" />
                <StatCard label="Articles" value={articlesData.length} color="bg-green-100 text-green-700" icon="📰" />
                <StatCard label="Quiz" value={6} color="bg-yellow-100 text-yellow-700" icon="🧠" />
              </div>

              <div className="bg-white rounded-3xl border border-slate-100 shadow-soft p-6">
                <h2 className="font-quicksand font-bold text-lg text-slate-800 mb-4">Activité récente</h2>
                <div className="space-y-3">
                  {[
                    { action: 'Fiche mise à jour', item: 'Brûlures ', time: 'Il y a 2h', color: 'bg-blue-100 text-blue-600' },
                    { action: 'Article ajouté', item: 'Huiles essentielles chez l\'enfant', time: 'Il y a 1j', color: 'bg-green-100 text-green-600' },
                    { action: 'Médicament ajouté', item: 'Solution de réhydratation orale', time: 'Il y a 3j', color: 'bg-teal-100 text-teal-600' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 py-2">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${item.color}`}>
                        {item.action}
                      </span>
                      <span className="text-sm text-slate-700 font-medium flex-1 truncate">{item.item}</span>
                      <span className="text-xs text-slate-400 flex-shrink-0">{item.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'firstaid' && (
            <div className="animate-fade-in">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-quicksand font-bold text-xl text-slate-800">
                  Gestes d'urgence ({firstAidData.length})
                </h2>
                <button
                  onClick={() => setShowAddForm(!showAddForm)}
                  className="btn-primary flex items-center gap-2 text-sm py-2.5"
                >
                  <Plus className="w-4 h-4" />
                  Ajouter une fiche
                </button>
              </div>

              {showAddForm && (
                <div className="bg-white rounded-3xl border border-slate-100 shadow-soft p-6 mb-5 animate-slide-up">
                  <h3 className="font-quicksand font-bold text-lg text-slate-800 mb-5">Nouvelle fiche de soin</h3>
                  <AddEntryForm onClose={() => setShowAddForm(false)} />
                </div>
              )}

              <div className="space-y-3">
                {firstAidData.map(entry => (
                  <div
                    key={entry.id}
                    className="bg-white rounded-2xl border border-slate-100 shadow-soft p-4 flex items-center gap-4"
                  >
                    <span className="text-2xl">{entry.illustrationIcon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-quicksand font-bold text-slate-800 truncate">{entry.title.fr}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-slate-500">{categoryLabels[entry.category].fr}</span>
                        <span className="text-slate-300">•</span>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${entry.severity === 'high' ? 'bg-red-100 text-red-600' :
                            entry.severity === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                              'bg-green-100 text-green-600'
                          }`}>
                          {entry.severity === 'high' ? 'Urgence' : entry.severity === 'medium' ? 'À surveiller' : 'Bénin'}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button className="w-8 h-8 rounded-xl bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-500 hover:text-teal-600 transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="w-8 h-8 rounded-xl bg-slate-50 hover:bg-red-50 flex items-center justify-center text-slate-500 hover:text-red-500 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'medications' && (
            <div className="animate-fade-in">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-quicksand font-bold text-xl text-slate-800">
                  Médicaments ({medicationsData.length})
                </h2>
                <button className="btn-primary flex items-center gap-2 text-sm py-2.5">
                  <Plus className="w-4 h-4" />
                  Ajouter
                </button>
              </div>
              <div className="space-y-3">
                {medicationsData.map(med => (
                  <div key={med.id} className="bg-white rounded-2xl border border-slate-100 shadow-soft p-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-lg flex-shrink-0">
                      💊
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-quicksand font-bold text-slate-800 truncate">{med.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${med.badge === 'indispensable' ? 'bg-green-100 text-green-600' :
                            med.badge === 'attention' ? 'bg-yellow-100 text-yellow-600' :
                              'bg-red-100 text-red-600'
                          }`}>
                          {med.badge === 'indispensable' ? '✅ Indispensable' :
                            med.badge === 'attention' ? '⚠️ Attention dosage' : '🚫 Interdit'}
                        </span>
                        <span className="text-xs text-slate-400">{med.ageRange.join(', ')} ans</span>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button className="w-8 h-8 rounded-xl bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-500 hover:text-teal-600 transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="w-8 h-8 rounded-xl bg-slate-50 hover:bg-red-50 flex items-center justify-center text-slate-500 hover:text-red-500 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'articles' && (
            <div className="animate-fade-in">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-quicksand font-bold text-xl text-slate-800">
                  Articles ({articlesData.length})
                </h2>
                <button className="btn-primary flex items-center gap-2 text-sm py-2.5">
                  <Plus className="w-4 h-4" />
                  Nouvel article
                </button>
              </div>
              <div className="space-y-3">
                {articlesData.map(art => (
                  <div key={art.id} className="bg-white rounded-2xl border border-slate-100 shadow-soft p-4 flex items-center gap-4">
                    <img src={art.imageUrl} alt={art.title} className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-quicksand font-bold text-slate-800 truncate">{art.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs bg-teal-50 text-teal-700 font-semibold px-2 py-0.5 rounded-full">{art.category}</span>
                        <span className="text-xs text-slate-400">par {art.author}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button className="w-8 h-8 rounded-xl bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-500 hover:text-teal-600 transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="w-8 h-8 rounded-xl bg-slate-50 hover:bg-red-50 flex items-center justify-center text-slate-500 hover:text-red-500 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'settings' && (
            <div className="animate-fade-in">
              <h2 className="font-quicksand font-bold text-xl text-slate-800 mb-5">Paramètres</h2>
              <div className="bg-white rounded-3xl border border-slate-100 shadow-soft p-6 space-y-6">
                {[
                  { label: 'Afficher le bandeau d\'urgence', desc: 'Affiche les numéros d\'urgence en haut de chaque page', enabled: true },
                  { label: 'Disclaimer médical', desc: 'Affiche l\'avertissement légal en bas de chaque fiche', enabled: true },
                  { label: 'Mode maintenance', desc: 'Désactive l\'accès public au site', enabled: false },
                ].map((setting, i) => (
                  <div key={i} className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold text-slate-800 text-sm">{setting.label}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{setting.desc}</p>
                    </div>
                    <div className={`w-12 h-6 rounded-full flex items-center px-0.5 flex-shrink-0 cursor-pointer ${setting.enabled ? 'bg-teal-500' : 'bg-slate-300'
                      }`}>
                      <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${setting.enabled ? 'translate-x-6' : 'translate-x-0'
                        }`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
