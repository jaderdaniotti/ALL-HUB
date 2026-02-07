# 🌍 Guida Completa Sistema Multilingua

## ✅ Stato Attuale

Il sistema di traduzione è **completamente funzionante** con:
- ✅ i18next configurato e funzionante
- ✅ 5 lingue supportate (IT, EN, FR, DE, ES)
- ✅ Language Switcher nella Navbar (desktop e mobile)
- ✅ Traduzioni complete per:
  - **Navbar** (tutti i link e menu)
  - **Home Page** (Hero, Mission, Services, How it Works)
  - **About Page** (parziale - titolo e team)
  - **Attivita Page** (tabs e stati di loading)
  - Tutti i file JSON sono pronti con le traduzioni

## 🎯 Come Usare il Sistema

### 1. **Cambiare Lingua**
- Clicca sulla bandiera nella navbar
- Seleziona la lingua desiderata
- La scelta viene salvata automaticamente

### 2. **Aggiungere Traduzioni a una Pagina**

#### Passo 1: Importare useTranslation
```javascript
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { t } = useTranslation();
  // ...
}
```

#### Passo 2: Sostituire i Testi
```javascript
// Prima:
<h1>Benvenuto</h1>

// Dopo:
<h1>{t('home.hero.title')}</h1>
```

### 3. **Struttura dei File JSON**

Tutti i file di traduzione sono in `src/locales/[lingua]/translation.json`:
- `it/translation.json` - Italiano
- `en/translation.json` - Inglese
- `fr/translation.json` - Francese
- `de/translation.json` - Tedesco
- `es/translation.json` - Spagnolo

## 📋 Pagine da Completare

### 🔄 **Pagine Parzialmente Tradotte**

#### 1. **Home Page** (`src/pages/home.jsx`)
**Già tradotto:**
- Hero section ✅
- Mission section ✅
- Services section ✅
- How it Works ✅

**Da tradurre:**
- Newsletter section (righe 200-230)
- Final CTA section

**Come fare:**
```javascript
// Esempio Newsletter:
<h2>{t('home.newsletter.title')}</h2>
<p>{t('home.newsletter.subtitle')}</p>
```

#### 2. **About Page** (`src/pages/About.jsx`)
**Già tradotto:**
- Hero section ✅
- Team section ✅

**Da tradurre:**
- Mission objectives (righe 58-86)
- What we offer (righe 88-120)
- Values section (righe 140-180)

**Chiavi disponibili nei JSON:**
- `about.mission.title`
- `about.values.quality.title`
- `about.values.quality.description`
- etc.

#### 3. **Attività Page** (`src/pages/Attivita.jsx`)
**Già tradotto:**
- Tabs navigation ✅
- Loading/Error states ✅

**Da tradurre:**
- Labels delle card: "Durata", "Livello", "Tipo"
- Pulsanti: "Prenota Ora", "Iscriviti", "Scopri di più"
- Messaggi "Nessun corso disponibile"

**Chiavi disponibili:**
- `activities.course.duration`
- `activities.course.level`
- `activities.course.type`
- `activities.course.bookNow`
- `activities.empty.courses`

**Esempio:**
```javascript
// Cerca "Durata:" e sostituisci con:
<span>{t('activities.course.duration')}</span>

// Cerca "Prenota Ora" e sostituisci con:
{t('activities.course.bookNow')}
```

#### 4. **Contatti Page** (`src/pages/Contatti.jsx`)
**Da tradurre tutto:**
- Titolo e sottotitolo
- Form labels (Nome, Email, Telefono, Messaggio)
- Pulsante "Invia Messaggio"
- Informazioni di contatto

**Chiavi disponibili:**
- `contacts.title`
- `contacts.subtitle`
- `contacts.form.name`
- `contacts.form.email`
- `contacts.form.submit`
- etc.

**Come fare:**
1. Aggiungi `const { t } = useTranslation();`
2. Sostituisci tutti i testi con `{t('contacts.chiave')}`

#### 5. **Location Page** (`src/pages/Location.jsx`)
**Da tradurre:**
- Titolo "Dove Siamo"
- Sottotitolo
- Pulsante "Ottieni Indicazioni"

**Chiavi:**
- `location.title`
- `location.subtitle`
- `location.directions`

#### 6. **Footer Component** (`src/components/Footer.jsx`)
**Da tradurre:**
- Descrizione
- "Link Rapidi"
- "Seguici"
- Copyright

**Chiavi:**
- `footer.description`
- `footer.quickLinks`
- `footer.followUs`
- `footer.copyright`

### 🔐 **Pannello Admin**

#### 7. **AdminLogin Page** (`src/pages/AdminLogin.jsx`)
**Da tradurre:**
- Titolo "Accesso Admin"
- Labels (Email, Password)
- "Mostra Password"
- Pulsante "Accedi"
- Messaggi di errore

**Chiavi:**
- `admin.login.title`
- `admin.login.email`
- `admin.login.password`
- `admin.login.submit`
- etc.

#### 8. **AdminDashboard Page** (`src/pages/AdminDashboard.jsx`)
**Da tradurre:**
- Titolo "Pannello Admin"
- Tabs (Corsi, Eventi, Skill Up Camps)
- Form labels
- Pulsanti (Aggiungi, Modifica, Elimina, Annulla)
- Modale di conferma eliminazione

**Chiavi:**
- `admin.dashboard.title`
- `admin.dashboard.tabs.courses`
- `admin.dashboard.form.title`
- `admin.dashboard.actions.edit`
- `admin.dashboard.confirmDelete.title`
- etc.

## 🚀 Quick Start per Completare

### Template per Tradurre una Pagina

```javascript
// 1. Import
import { useTranslation } from 'react-i18next';

// 2. Hook
const MyPage = () => {
  const { t } = useTranslation();
  
  // 3. Usa nelle JSX
  return (
    <div>
      <h1>{t('mypage.title')}</h1>
      <p>{t('mypage.description')}</p>
      <button>{t('mypage.button')}</button>
    </div>
  );
};
```

### Esempio Completo: Contatti

```javascript
// src/pages/Contatti.jsx
import { useTranslation } from 'react-i18next';

const Contatti = () => {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('contacts.title')}</h1>
      <p>{t('contacts.subtitle')}</p>
      
      <form>
        <input placeholder={t('contacts.form.name')} />
        <input placeholder={t('contacts.form.email')} />
        <textarea placeholder={t('contacts.form.message')} />
        <button>{t('contacts.form.submit')}</button>
      </form>
    </div>
  );
};
```

## 🔍 Come Trovare le Chiavi di Traduzione

1. Apri `src/locales/it/translation.json`
2. Cerca la sezione corrispondente (es. "contacts", "activities", etc.)
3. Usa la chiave nel formato: `{t('sezione.sottoSezione.chiave')}`

## ✅ Checklist Finale

- [ ] Home - Newsletter section
- [ ] Home - Final CTA
- [ ] About - Mission objectives
- [ ] About - What we offer
- [ ] About - Values section
- [ ] Attività - Card labels (Durata, Livello, Tipo)
- [ ] Attività - Pulsanti (Prenota Ora, etc.)
- [ ] Attività - Empty states
- [ ] Contatti - Tutto
- [ ] Location - Tutto
- [ ] Footer - Tutto
- [ ] AdminLogin - Tutto
- [ ] AdminDashboard - Tutto

## 🎉 Il Sistema è Pronto!

Il sistema multilingua funziona perfettamente. Basta completare le traduzioni seguendo gli esempi sopra. Tutte le traduzioni sono già nei file JSON, devi solo collegarle ai componenti!

---

**Per qualsiasi dubbio, consulta:**
- `src/pages/home.jsx` - Esempio completo di pagina tradotta
- `src/components/Navbar.jsx` - Esempio di componente tradotto
- `src/locales/it/translation.json` - Tutte le chiavi disponibili

