import { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import EmergencyGestures from './pages/EmergencyGestures';
import EmergencyDetail from './pages/EmergencyDetail';
import PreventionGuide from './pages/PreventionGuide';
import About from './pages/About';
import { Page } from './types';
import { Language } from './lib/i18n';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedEmergencyId, setSelectedEmergencyId] = useState('etouffementGrand');
  const [language, setLanguage] = useState<Language>('fr');

  useEffect(() => {
    const html = document.documentElement;
    html.lang = language === 'ar' ? 'ar' : 'fr';
    html.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const navigate = useCallback((page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSearch = useCallback((_query: string) => {
    navigate('emergencies');
  }, [navigate]);

  const handleSelectEmergency = useCallback((id: string) => {
    setSelectedEmergencyId(id);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <Home onNavigate={navigate} onSelectEmergency={handleSelectEmergency} language={language} />;
      case 'emergencies': return <EmergencyGestures onNavigate={navigate} onSelectEmergency={handleSelectEmergency} language={language} />;
      case 'emergency': return <EmergencyDetail onNavigate={navigate} emergencyId={selectedEmergencyId} language={language} />;
      case 'guide': return <PreventionGuide language={language} />;
      case 'about': return <About language={language} onNavigate={navigate} />;
      default: return <Home onNavigate={navigate} onSelectEmergency={handleSelectEmergency} language={language} />;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col bg-white${language === 'ar' ? ' lang-ar' : ''}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <Header currentPage={currentPage} onNavigate={navigate} onSearch={handleSearch} language={language} onLanguageChange={setLanguage} />
      <main className="flex-1">
        {renderPage()}
      </main>
      <Footer onNavigate={navigate} language={language} />
    </div>
  );
}
