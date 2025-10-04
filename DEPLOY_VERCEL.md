# 🚀 Deploy su Vercel - A LIFELONG LEARNING HUB

Guida completa per il deploy del sito web su Vercel, la piattaforma di hosting per applicazioni React/Vue/Next.js.

## 📋 Prerequisiti

- Account Vercel (gratuito)
- Progetto React completato e funzionante
- Git repository configurato
- Node.js installato

## 🔧 Preparazione del Progetto

### 1. Verifica Build Locale
```bash
# Assicurati che la build funzioni correttamente
npm run build

# Testa la build in locale
npm run preview
```

### 2. File di Configurazione Vercel

Crea `vercel.json` nella root del progetto:
```json
{
  "version": 2,
  "name": "a-lifelong-learning-hub",
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

### 3. Script di Build in package.json
Assicurati che il tuo `package.json` contenga:
```json
{
  "scripts": {
    "build": "vite build",
    "preview": "vite preview"
  },
  "homepage": "."
}
```

## 🌐 Deploy Tramite Vercel Dashboard

### Metodo 1: Deploy da GitHub/GitLab

1. **Collega Repository**
   - Vai su [vercel.com](https://vercel.com)
   - Clicca "New Project"
   - Seleziona il tuo repository GitHub/GitLab

2. **Configurazione Progetto**
   ```
   Framework Preset: Vite
   Root Directory: ./
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

3. **Variabili d'Ambiente** (se necessarie)
   ```
   NODE_ENV=production
   VITE_API_URL=your_api_url
   ```

4. **Deploy**
   - Clicca "Deploy"
   - Attendi il completamento (2-5 minuti)

### Metodo 2: Deploy Tramite CLI

1. **Installa Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   # Deploy di sviluppo
   vercel

   # Deploy di produzione
   vercel --prod
   ```

4. **Configurazione Automatica**
   ```
   ? Set up and deploy "~/ALL-HUB"? [Y/n] y
   ? Which scope do you want to deploy to? [Your Account]
   ? Link to existing project? [N/y] n
   ? What's your project's name? a-lifelong-learning-hub
   ? In which directory is your code located? ./
   ```

## ⚙️ Configurazioni Avanzate

### 1. Domini Personalizzati

1. **Aggiungi Dominio**
   - Vai su Project Settings → Domains
   - Aggiungi il tuo dominio personalizzato
   - Configura i DNS del provider

2. **Configurazione DNS**
   ```
   Tipo: CNAME
   Nome: www
   Valore: cname.vercel-dns.com
   
   Tipo: A
   Nome: @
   Valore: 76.76.19.19
   ```

### 2. Variabili d'Ambiente

Nel dashboard Vercel:
```
Settings → Environment Variables

NODE_ENV=production
VITE_APP_TITLE=A LIFELONG LEARNING HUB
VITE_API_BASE_URL=https://api.yourdomain.com
```

### 3. Redirect e Rewrites

Aggiungi a `vercel.json`:
```json
{
  "redirects": [
    {
      "source": "/home",
      "destination": "/",
      "permanent": true
    }
  ],
  "rewrites": [
    {
      "source": "/admin/:path*",
      "destination": "/admin/:path*"
    }
  ]
}
```

## 🔄 Deploy Automatici

### 1. Auto-Deploy da Git
- Ogni push su `main` → Deploy automatico
- Branch separati per staging
- Preview deployments per PR

### 2. GitHub Actions (Opzionale)
Crea `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Vercel
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          working-directory: ./
```

## 📊 Monitoraggio e Analytics

### 1. Vercel Analytics
```bash
npm install @vercel/analytics
```

In `main.jsx`:
```javascript
import { Analytics } from '@vercel/analytics/react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Analytics />
  </React.StrictMode>
)
```

### 2. Performance Monitoring
- Core Web Vitals automatici
- Real User Monitoring (RUM)
- Lighthouse scores integrati

## 🛠️ Ottimizzazioni per Vercel

### 1. Edge Functions (Opzionale)
Per API routes leggere:
```javascript
// api/hello.js
export default function handler(req, res) {
  res.status(200).json({ message: 'Hello from Vercel!' })
}
```

### 2. Image Optimization
```javascript
import Image from 'next/image'

// Ottimizzazione automatica immagini
<Image
  src="/logo.png"
  alt="Logo"
  width={200}
  height={100}
  priority
/>
```

### 3. Static Generation
Per pagine statiche:
```javascript
// Pre-renderizza pagine popolari
export async function generateStaticParams() {
  return [
    { slug: 'home' },
    { slug: 'about' },
    { slug: 'servizi' }
  ]
}
```

## 🔒 Sicurezza e Performance

### 1. Headers di Sicurezza
In `vercel.json`:
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

### 2. Compressione
- Gzip automatico
- Brotli per browser moderni
- Asset optimization

## 🚨 Troubleshooting

### Problemi Comuni

1. **Build Fallisce**
   ```bash
   # Verifica errori
   npm run build --verbose
   
   # Controlla Node.js version
   node --version  # Deve essere >= 16
   ```

2. **Routing non Funziona**
   - Verifica `vercel.json` routes
   - Controlla React Router configuration
   - Assicurati che tutte le route siano gestite

3. **Immagini non Caricano**
   ```javascript
   // Usa path assoluti per le immagini
   src="/src/assets/img/logo.png"
   
   // Oppure importa
   import logo from '/src/assets/img/logo.png'
   ```

4. **Environment Variables**
   ```bash
   # Verifica variabili in dashboard Vercel
   Settings → Environment Variables
   
   # Riavvia deployment dopo modifiche
   ```

### Log di Debug
```bash
# Vedi logs di deployment
vercel logs [deployment-url]

# Debug locale
vercel dev
```

## 📈 Post-Deploy

### 1. Test Completo
- [ ] Tutte le pagine caricano
- [ ] Navigazione funziona
- [ ] Form contatti operativo
- [ ] Admin panel accessibile
- [ ] Responsive su mobile

### 2. Performance Check
```bash
# Test velocità
npx lighthouse https://your-domain.vercel.app

# Test Core Web Vitals
npx web-vitals
```

### 3. SEO Setup
- Google Search Console
- Sitemap.xml
- Meta tags ottimizzati
- Open Graph images

## 🔗 Link Utili

- [Vercel Dashboard](https://vercel.com/dashboard)
- [Vercel CLI Docs](https://vercel.com/docs/cli)
- [Vercel Configuration](https://vercel.com/docs/configuration)
- [Performance Best Practices](https://vercel.com/docs/concepts/speed-insights)

## 📞 Support

Per problemi con il deploy:
1. Controlla i logs in Vercel Dashboard
2. Verifica la configurazione locale
3. Consulta la [documentazione Vercel](https://vercel.com/docs)
4. Contatta il supporto Vercel

---

**🚀 Il tuo sito A LIFELONG LEARNING HUB è ora live su Vercel!**
