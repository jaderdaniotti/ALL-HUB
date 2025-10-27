import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Cookie, Lock, BarChart2, Target, Settings, X } from 'lucide-react';
import { shouldShowBanner, saveConsent } from '../utils/cookieManager';

/**
 * CookieBanner - Banner per consenso cookies GDPR compliant
 * Mostra il banner solo se l'utente non ha ancora dato risposta
 */
const CookieBanner = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  
  // Preferenze cookie dettagliate
  const [preferences, setPreferences] = useState({
    necessary: true,    // Sempre attivi (non disabilitabili)
    analytics: false,   // Google Analytics
    marketing: false,   // Marketing
    functional: false   // Funzionalità aggiuntive
  });

  // Verifica se mostrare il banner all'avvio
  useEffect(() => {
    const timer = setTimeout(() => {
      if (shouldShowBanner()) {
        setIsVisible(true);
      }
    }, 1000); // Mostra dopo 1 secondo per migliore UX

    return () => clearTimeout(timer);
  }, []);

  // Accetta tutti i cookies
  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true
    };
    saveConsent(true, allAccepted);
    setIsVisible(false);
  };

  // Rifiuta tutti i cookies (tranne i necessari)
  const handleDeclineAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false
    };
    saveConsent(false, onlyNecessary);
    setIsVisible(false);
  };

  // Salva preferenze personalizzate
  const handleSavePreferences = () => {
    const hasAccepted = preferences.analytics || preferences.marketing || preferences.functional;
    saveConsent(hasAccepted, preferences);
    setIsVisible(false);
  };

  // Aggiorna una singola preferenza
  const togglePreference = (key) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-fade-in">
      {/* Overlay semitrasparente */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm -z-10"></div>
      
      <div className="bg-chiaro text-scuro shadow-2xl border-t-4 border-pink-400">
        <div className="container mx-auto px-4 py-6 max-w-7xl">
          
          {/* Versione semplice - Banner base */}
          {!showDetails && (
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
               {/* Testo informativo */}
               <div className="flex-1 text-center md:text-left">
                 <div className="flex items-center gap-2 mb-2">
                   <Cookie className="text-pink-500" size={28} />
                   <h3 className="text-lg font-semibold text-scuro">
                     {t('cookies.title')}
                   </h3>
                 </div>
                <p className="text-sm text-scuro/80 leading-relaxed">
                  {t('cookies.description')}
                  {' '}
                  <button 
                    onClick={() => setShowDetails(true)}
                    className="underline hover:text-pink-500 transition-colors font-medium"
                  >
                    {t('cookies.learnMore')}
                  </button>
                </p>
              </div>

              {/* Pulsanti azione */}
              <div className="flex flex-wrap gap-3 justify-center">
                <button
                  onClick={handleDeclineAll}
                  className="btn btn-outline btn-sm border-scuro text-scuro hover:bg-scuro hover:text-chiaro transition-all"
                >
                  {t('cookies.decline')}
                </button>
                <button
                  onClick={() => setShowDetails(true)}
                  className="btn btn-outline btn-sm border-pink-400 text-pink-500 hover:bg-pink-400 hover:text-white transition-all"
                >
                  {t('cookies.customize')}
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="btn btn-sm bg-pink-500 text-white hover:bg-pink-600 border-none transition-all shadow-md hover:shadow-lg"
                >
                  {t('cookies.acceptAll')}
                </button>
              </div>
            </div>
          )}

          {/* Versione dettagliata - Preferenze avanzate */}
          {showDetails && (
            <div className="space-y-4">
               {/* Header */}
               <div className="flex items-center justify-between border-b border-scuro/10 pb-3">
                 <div className="flex items-center gap-2">
                   <Settings className="text-pink-500" size={28} />
                   <h3 className="text-xl font-bold text-scuro">
                     {t('cookies.preferences')}
                   </h3>
                 </div>
                 <button
                   onClick={() => setShowDetails(false)}
                   className="btn btn-sm btn-circle btn-ghost text-scuro hover:bg-scuro/10"
                   aria-label="Chiudi dettagli"
                 >
                   <X size={18} />
                 </button>
               </div>

              {/* Descrizione */}
              <p className="text-sm text-scuro/80">
                {t('cookies.detailedDescription')}
              </p>

              {/* Lista preferenze cookie */}
              <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                
                 {/* Cookies Necessari */}
                 <div className="bg-white/50 rounded-lg p-4 border border-scuro/10">
                   <div className="flex items-center justify-between">
                     <div className="flex-1">
                       <h4 className="font-bold text-scuro flex items-center gap-2">
                         <Lock className="text-green-600" size={18} />
                         {t('cookies.necessary.title')}
                       </h4>
                       <p className="text-sm text-scuro/70 mt-1">
                         {t('cookies.necessary.description')}
                       </p>
                     </div>
                     <input
                       type="checkbox"
                       checked={true}
                       disabled
                       className="checkbox checkbox-sm checkbox-success pointer-events-none opacity-50"
                     />
                   </div>
                 </div>

                 {/* Cookies Analytics */}
                 <div className="bg-white/50 rounded-lg p-4 border border-scuro/10 hover:border-pink-300 transition-colors">
                   <div className="flex items-center justify-between">
                     <div className="flex-1">
                       <h4 className="font-bold text-scuro flex items-center gap-2">
                         <BarChart2 className="text-blue-600" size={18} />
                         {t('cookies.analytics.title')}
                       </h4>
                       <p className="text-sm text-scuro/70 mt-1">
                         {t('cookies.analytics.description')}
                       </p>
                     </div>
                     <input
                       type="checkbox"
                       checked={preferences.analytics}
                       onChange={() => togglePreference('analytics')}
                       className="checkbox checkbox-sm checkbox-pink border-pink-400"
                     />
                   </div>
                 </div>

                 {/* Cookies Marketing */}
                 <div className="bg-white/50 rounded-lg p-4 border border-scuro/10 hover:border-pink-300 transition-colors">
                   <div className="flex items-center justify-between">
                     <div className="flex-1">
                       <h4 className="font-bold text-scuro flex items-center gap-2">
                         <Target className="text-purple-600" size={18} />
                         {t('cookies.marketing.title')}
                       </h4>
                       <p className="text-sm text-scuro/70 mt-1">
                         {t('cookies.marketing.description')}
                       </p>
                     </div>
                     <input
                       type="checkbox"
                       checked={preferences.marketing}
                       onChange={() => togglePreference('marketing')}
                       className="checkbox checkbox-sm checkbox-pink border-pink-400"
                     />
                   </div>
                 </div>

                 {/* Cookies Funzionali */}
                 <div className="bg-white/50 rounded-lg p-4 border border-scuro/10 hover:border-pink-300 transition-colors">
                   <div className="flex items-center justify-between">
                     <div className="flex-1">
                       <h4 className="font-bold text-scuro flex items-center gap-2">
                         <Settings className="text-orange-600" size={18} />
                         {t('cookies.functional.title')}
                       </h4>
                       <p className="text-sm text-scuro/70 mt-1">
                         {t('cookies.functional.description')}
                       </p>
                     </div>
                     <input
                       type="checkbox"
                       checked={preferences.functional}
                       onChange={() => togglePreference('functional')}
                       className="checkbox checkbox-sm checkbox-pink border-pink-400"
                     />
                   </div>
                 </div>

              </div>

              {/* Pulsanti finali */}
              <div className="flex flex-wrap gap-3 justify-end pt-3 border-t border-scuro/10">
                <button
                  onClick={handleDeclineAll}
                  className="btn btn-outline btn-sm border-scuro text-scuro hover:bg-scuro hover:text-chiaro"
                >
                  {t('cookies.declineAll')}
                </button>
                <button
                  onClick={handleSavePreferences}
                  className="btn btn-sm bg-pink-500 text-white hover:bg-pink-600 border-none shadow-md hover:shadow-lg"
                >
                  {t('cookies.savePreferences')}
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default CookieBanner;

