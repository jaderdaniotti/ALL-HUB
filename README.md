# A LIFELONG LEARNING HUB

Un sito web moderno e responsive per un centro educativo che offre corsi di lingue, workshop e attività per l'apprendimento continuo.

## 🌟 Caratteristiche Principali

- **Design moderno e responsive** con Tailwind CSS
- **Sistema di gestione eventi** con pannello admin
- **Caricamento ottimizzato** con loader personalizzato
- **Icone Bootstrap** per un'interfaccia intuitiva
- **Sfondo personalizzato** con immagini di alta qualità
- **Navigazione fluida** con React Router

## 📁 Struttura del Progetto

```
src/
├── components/
│   ├── Loader.jsx          # Componente loader per il caricamento
│   ├── Navbar.jsx          # Barra di navigazione
│   └── Footer.jsx          # Footer del sito
├── pages/
│   ├── Home.jsx            # Pagina principale
│   ├── About.jsx           # Pagina Chi Siamo
│   ├── Servizi.jsx         # Pagina Servizi
│   ├── Contatti.jsx        # Pagina Contatti
│   ├── Eventi.jsx          # Pagina Eventi
│   ├── AdminLogin.jsx      # Login amministratori
│   └── AdminDashboard.jsx  # Pannello di controllo admin
├── hooks/
│   └── useLoader.js        # Hook per gestione caricamento
├── assets/
│   └── img/                # Immagini del sito
│       ├── logo.png        # Logo principale
│       ├── books.jpg       # Immagine hero
│       └── sfondobianco.jpg # Sfondo generale
├── App.jsx                 # Componente principale
├── App.css                 # Stili globali
└── main.jsx                # Entry point
```

## 🗄️ Database Setup (Supabase)

### Struttura Database
Il progetto utilizza Supabase PostgreSQL con le seguenti tabelle:

- **Users**: Gestione amministratori
- **Corsi**: Corsi di lingua offerti  
- **Eventi**: Eventi e workshop
- **SettimaneStudio**: Skill Up Camps internazionali

### Setup Database
1. **Crea progetto Supabase** su [supabase.com](https://supabase.com)
2. **Esegui lo script SQL** dal file `database_setup.sql` nel SQL Editor
3. **Crea bucket Storage** chiamato `activity-images` per le immagini
4. **Configura variabili environment** nel file `.env.local`:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Script SQL Completo
```bash
# Esegui nel SQL Editor di Supabase
cat database_setup.sql
```

### Credenziali Admin Default
- **Email**: `secretariat.allhub@gmail.com`
- **Password**: `Learning25!`

Per maggiori dettagli, vedi `DATABASE_STRUCTURE.md`.

## 🚀 Installazione e Avvio

### Prerequisiti
- Node.js (versione 16 o superiore)
- npm o yarn
- Progetto Supabase configurato

### Installazione
```bash
# Clona il repository
git clone [URL_DEL_REPOSITORY]

# Naviga nella cartella del progetto
cd ALL-HUB

# Installa le dipendenze
npm install
```

### Sviluppo
```bash
# Avvia il server di sviluppo
npm run dev

# Il sito sarà disponibile su http://localhost:5173
```

### Build di Produzione
```bash
# Crea la build ottimizzata
npm run build

# Anteprima della build
npm run preview
```

## 🎨 Tecnologie Utilizzate

- **React 18** - Framework JavaScript
- **React Router** - Navigazione tra pagine
- **Tailwind CSS** - Framework CSS utility-first
- **Bootstrap Icons** - Libreria di icone
- **Vite** - Build tool e dev server

## 📱 Pagine del Sito

### 🏠 Home
- Hero section con sfondo sfumato
- Sezione mission e valori
- Anteprima servizi con prezzi
- Processo "Come funziona"

### ℹ️ About
- Storia e mission dell'organizzazione
- Valori e approccio educativo
- Testimonianze e riconoscimenti

### 🎓 Servizi
- **Lezioni Individuali**: €25/ora
- **Lezioni di Gruppo**: €10/ora
- Servizi aggiuntivi e laboratori

### 📅 Eventi
- Lista eventi con filtri per categoria
- Sistema di gestione admin
- Caricamento immagini con anteprima

### 📞 Contatti
- Informazioni di contatto
- Form di contatto funzionale
- Link ai social media
- Mappa della sede

## 🔐 Sistema Admin

### Accesso
- URL: `/admin/login`
- Credenziali demo: `admin` / `admin123`

### Funzionalità
- **Gestione eventi**: Aggiungi, modifica, elimina
- **Upload immagini**: Con anteprima in tempo reale
- **Interfaccia intuitiva**: Design moderno e minimal
- **Persistenza dati**: Salvataggio nel localStorage

## 🎯 Caratteristiche Tecniche

### Performance
- **Loader personalizzato** con precaricamento immagini
- **Lazy loading** per ottimizzare i tempi di caricamento
- **Animazioni fluide** con CSS personalizzato
- **Responsive design** per tutti i dispositivi

### UX/UI
- **Design coerente** con palette colori viola/blu
- **Navigazione intuitiva** con indicatori pagina attiva
- **Menu mobile** con hamburger funzionale
- **Transizioni fluide** tra le pagine

### Sicurezza
- **Validazione form** client-side
- **Gestione errori** per upload immagini
- **Protezione rotte** admin

## 📊 Struttura Dati

### Eventi
```javascript
{
  id: number,
  title: string,
  date: string,
  time: string,
  location: string,
  description: string,
  price: string,
  category: string,
  image: string
}
```

### Categorie Eventi
- Lingue
- Creatività
- Benessere
- Sociale
- Sviluppo Personale

## 🔧 Configurazione

### Variabili CSS
```css
:root {
  --scuro: #111111;
  --scuro-2: #222222;
  --chiaro-2: #e5e7eb;
  --chiaro: #f3f4f6;
  --bianco: #ffffff;
}
```

### Animazioni Personalizzate
- `pulse-glow` - Animazione logo loader
- `bounce-dots` - Animazione punti caricamento
- `fadeInUp` - Animazione elementi in entrata

## 📱 Responsive Design

- **Mobile First**: Ottimizzato per dispositivi mobili
- **Breakpoints**: sm, md, lg, xl
- **Grid System**: Layout adattivo per tutti gli schermi
- **Touch Friendly**: Interfaccia ottimizzata per touch

## 🚀 Deploy

### Netlify
```bash
# Build del progetto
npm run build

# Deploy della cartella dist/
```

### Vercel
```bash
# Installazione Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

## 📝 Note di Sviluppo

### Best Practices
- **Componenti funzionali** con React Hooks
- **Gestione stato** con useState e useEffect
- **Routing** con React Router v6
- **Styling** con Tailwind CSS utility classes

### Ottimizzazioni
- **Bundle splitting** per pagine lazy
- **Image optimization** per caricamento veloce
- **CSS purging** per ridurre dimensioni
- **Code splitting** per performance

## 🤝 Contributi

1. Fork del progetto
2. Crea un branch per la feature (`git checkout -b feature/AmazingFeature`)
3. Commit delle modifiche (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Apri una Pull Request

## 📄 Licenza

Questo progetto è distribuito sotto licenza MIT. Vedi il file `LICENSE` per maggiori informazioni.

## 📞 Contatti

- **Email**: info@alifelonglearninghub.it
- **Telefono**: +39 06 98765432
- **Indirizzo**: Via della Conoscenza 10, Roma (RM)

---

**A LIFELONG LEARNING HUB** - Coltiviamo menti e cuori per il tuo successo 🌟