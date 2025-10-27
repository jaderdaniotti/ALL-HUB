import { useTranslation } from 'react-i18next';
import { revokeConsent } from '../utils/cookieManager';
import SEO from '../components/SEO';

/**
 * Privacy Policy Page - Informativa sulla Privacy e Cookie Policy
 * Pagina informativa GDPR compliant
 */
const PrivacyPolicy = () => {
  const { t } = useTranslation();

  // Gestisce la revoca del consenso cookies
  const handleRevokeConsent = () => {
    if (window.confirm(t('privacy.revokeConfirm'))) {
      revokeConsent();
    }
  };

  return (
    <>
      <SEO
        title="Privacy Policy & Cookie Policy - All-Hub"
        description="Informativa sulla privacy e cookie policy del centro educativo All-Hub Udine. Scopri come proteggiamo i tuoi dati personali."
      />
      
      <div className="min-h-screen bg-chiaro text-scuro py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Privacy & Cookie Policy
            </h1>
            <p className="text-lg text-scuro/70">
              Ultimo aggiornamento: {new Date().toLocaleDateString('it-IT')}
            </p>
          </div>

          {/* Introduzione */}
          <section className="mb-10 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-pink-500">📋 Introduzione</h2>
            <p className="text-scuro/80 leading-relaxed">
              Questa informativa descrive come All-Hub Centro Educativo ("noi", "nostro") 
              raccoglie, utilizza e protegge i tuoi dati personali e le informazioni 
              raccolte tramite cookie quando visiti il nostro sito web.
            </p>
          </section>

          {/* Dati Raccolti */}
          <section className="mb-10 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-pink-500">🔍 Dati Raccolti</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold mb-2">Dati forniti volontariamente</h3>
                <ul className="list-disc list-inside space-y-2 text-scuro/80">
                  <li>Nome e cognome</li>
                  <li>Indirizzo email</li>
                  <li>Numero di telefono</li>
                  <li>Messaggi inviati tramite moduli di contatto</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2">Dati raccolti automaticamente</h3>
                <ul className="list-disc list-inside space-y-2 text-scuro/80">
                  <li>Indirizzo IP</li>
                  <li>Tipo di browser e dispositivo</li>
                  <li>Pagine visitate e tempo di permanenza</li>
                  <li>Referrer (sito da cui provieni)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Cookie Policy */}
          <section className="mb-10 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-pink-500">🍪 Cookie Policy</h2>
            
            <p className="text-scuro/80 leading-relaxed mb-4">
              I cookie sono piccoli file di testo salvati sul tuo dispositivo quando 
              visiti il nostro sito. Li utilizziamo per migliorare la tua esperienza 
              di navigazione.
            </p>

            <div className="space-y-4">
              {/* Cookie Necessari */}
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="text-lg font-bold mb-2">🔒 Cookie Necessari</h3>
                <p className="text-scuro/70 text-sm">
                  Essenziali per il funzionamento del sito. Non possono essere disabilitati.
                </p>
                <ul className="list-disc list-inside text-sm text-scuro/70 mt-2">
                  <li><code>all-hub-cookie-consent</code> - Memorizza la tua scelta sui cookie</li>
                  <li><code>all-hub-cookie-preferences</code> - Memorizza le tue preferenze specifiche</li>
                </ul>
              </div>

              {/* Cookie Analitici */}
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-lg font-bold mb-2">📊 Cookie Analitici</h3>
                <p className="text-scuro/70 text-sm">
                  Ci aiutano a capire come i visitatori utilizzano il sito.
                </p>
                <ul className="list-disc list-inside text-sm text-scuro/70 mt-2">
                  <li><strong>Google Analytics</strong> - Raccoglie dati anonimi su visite e comportamenti</li>
                  <li>Durata: fino a 2 anni</li>
                  <li>Fornitore: Google LLC</li>
                </ul>
              </div>

              {/* Cookie Marketing */}
              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="text-lg font-bold mb-2">🎯 Cookie di Marketing</h3>
                <p className="text-scuro/70 text-sm">
                  Utilizzati per mostrare annunci pertinenti basati sui tuoi interessi.
                </p>
                <p className="text-xs text-scuro/60 mt-2">
                  Attualmente non utilizziamo cookie di marketing di terze parti.
                </p>
              </div>

              {/* Cookie Funzionali */}
              <div className="border-l-4 border-orange-500 pl-4">
                <h3 className="text-lg font-bold mb-2">⚙️ Cookie Funzionali</h3>
                <p className="text-scuro/70 text-sm">
                  Permettono funzionalità avanzate come ricordare la lingua scelta.
                </p>
                <ul className="list-disc list-inside text-sm text-scuro/70 mt-2">
                  <li><code>i18nextLng</code> - Memorizza la lingua selezionata</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Finalità del Trattamento */}
          <section className="mb-10 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-pink-500">🎯 Finalità del Trattamento</h2>
            <ul className="list-disc list-inside space-y-2 text-scuro/80">
              <li>Rispondere alle tue richieste di contatto</li>
              <li>Fornire informazioni sui nostri servizi</li>
              <li>Migliorare l'esperienza di navigazione sul sito</li>
              <li>Analizzare il traffico e l'utilizzo del sito</li>
              <li>Inviare comunicazioni promozionali (solo con consenso)</li>
            </ul>
          </section>

          {/* Base Giuridica */}
          <section className="mb-10 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-pink-500">⚖️ Base Giuridica</h2>
            <p className="text-scuro/80 leading-relaxed">
              Il trattamento dei tuoi dati è basato su:
            </p>
            <ul className="list-disc list-inside space-y-2 text-scuro/80 mt-4">
              <li><strong>Consenso</strong> - Per cookie analitici e marketing</li>
              <li><strong>Legittimo interesse</strong> - Per cookie tecnici necessari</li>
              <li><strong>Esecuzione del contratto</strong> - Per gestire le tue richieste</li>
            </ul>
          </section>

          {/* I Tuoi Diritti */}
          <section className="mb-10 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-pink-500">✅ I Tuoi Diritti GDPR</h2>
            <p className="text-scuro/80 leading-relaxed mb-4">
              Hai diritto a:
            </p>
            <ul className="list-disc list-inside space-y-2 text-scuro/80">
              <li><strong>Accesso</strong> - Ottenere copia dei tuoi dati</li>
              <li><strong>Rettifica</strong> - Correggere dati inesatti</li>
              <li><strong>Cancellazione</strong> - Richiedere la cancellazione dei dati</li>
              <li><strong>Limitazione</strong> - Limitare il trattamento</li>
              <li><strong>Portabilità</strong> - Ricevere i dati in formato leggibile</li>
              <li><strong>Opposizione</strong> - Opporti al trattamento</li>
              <li><strong>Revoca del consenso</strong> - Revocare il consenso in qualsiasi momento</li>
            </ul>
          </section>

          {/* Gestione Cookie */}
          <section className="mb-10 bg-pink-50 border-2 border-pink-200 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-pink-600">⚙️ Gestisci le Tue Preferenze</h2>
            <p className="text-scuro/80 mb-4">
              Puoi modificare o revocare il tuo consenso ai cookie in qualsiasi momento.
            </p>
            <button
              onClick={handleRevokeConsent}
              className="btn bg-pink-500 hover:bg-pink-600 text-white border-none shadow-md"
            >
              🔄 Revoca Consenso Cookie
            </button>
            <p className="text-sm text-scuro/60 mt-3">
              Nota: Revocare il consenso ricaricherà la pagina e mostrerà nuovamente il banner cookie.
            </p>
          </section>

          {/* Contatti */}
          <section className="mb-10 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-pink-500">📧 Contatti</h2>
            <p className="text-scuro/80 leading-relaxed mb-4">
              Per qualsiasi domanda sulla privacy o per esercitare i tuoi diritti, contattaci:
            </p>
            <div className="space-y-2 text-scuro/80">
              <p><strong>Email:</strong> secretariat.allhub@gmail.com</p>
              <p><strong>Telefono:</strong> +39 340 221 8595</p>
              <p><strong>Indirizzo:</strong> Udine, Friuli Venezia Giulia, Italia</p>
            </div>
          </section>

          {/* Footer */}
          <div className="text-center text-sm text-scuro/60 mt-12">
            <p>
              Ci riserviamo il diritto di modificare questa informativa in qualsiasi momento.
              Le modifiche saranno pubblicate su questa pagina con data aggiornata.
            </p>
          </div>

        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;

