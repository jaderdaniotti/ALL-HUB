
CREATE INDEX IF NOT EXISTS idx_corsi_active ON corsi (is_active);
CREATE INDEX IF NOT EXISTS idx_corsi_level ON corsi (level);
CREATE INDEX IF NOT EXISTS idx_corsi_type ON corsi (type);
CREATE INDEX IF NOT EXISTS idx_corsi_created_at ON corsi (created_at);

-- Indici per EVENTI e SETTIMANE_STUDIO per eliminare timeout
DROP INDEX IF EXISTS idx_eventi_date;
CREATE INDEX IF NOT EXISTS idx_eventi_date ON eventi (date);
DROP INDEX IF EXISTS idx_settimane_created_at;
CREATE INDEX IF NOT EXISTS idx_settimane_created_at ON settimane_studio (created_at);

-- 12. Test finale dopo la ricreazione degli indici
SELECT 'Test finale dopo indici' as test, COUNT(*) as count 
FROM corsi 
WHERE is_active = true;

-- 13. Test ORDER BY separato dopo la ricreazione degli indici
SELECT 'Test ORDER BY finale' as test, id, title, is_active, created_at 
FROM corsi 
WHERE is_active = true
ORDER BY created_at DESC 
LIMIT 5;
