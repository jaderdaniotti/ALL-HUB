# 🔧 Variabili d'Ambiente per Deploy

## Supabase Configuration (Obbligatorie)

```bash
# Ottieni questi valori dal dashboard Supabase → Settings → API
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## App Configuration

```bash
VITE_APP_TITLE=A LIFELONG LEARNING HUB
NODE_ENV=production
```

## Come Configurare

1. **Vai su Supabase Dashboard**
   - Settings → API
   - Copia Project URL e anon public key

2. **In Vercel Dashboard**
   - Settings → Environment Variables
   - Aggiungi le variabili sopra

3. **Riavvia il Deployment**
   - Dopo aver aggiunto le variabili

## Credenziali Admin Default

```
Username: admin@learninghub.com
Password: Learning25!
```

⚠️ **IMPORTANTE**: Cambia la password dopo il primo accesso!

## Troubleshooting

Se il sito non funziona dopo il deploy:

1. ✅ Verifica che le variabili Supabase siano configurate
2. ✅ Controlla che il database sia stato creato (database_setup.sql)
3. ✅ Verifica che l'utente admin esista nel database
4. ✅ Controlla i logs in Vercel Dashboard per errori
