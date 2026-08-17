# Collegare Supabase (per rendere reale il salvataggio dei clienti)

Il form di registrazione (`src/scenes/RegisterGate.tsx`) oggi salva i dati
solo in locale, nel browser di chi lo compila — non è ancora un vero
database condiviso. Per renderlo reale:

## 1. Crea il progetto

1. Vai su [supabase.com](https://supabase.com) e crea un account gratuito.
2. Crea un nuovo progetto — scegli una **regione europea** (es. Frankfurt)
   per tenere i dati in UE, coerente con il GDPR.
3. Scegli una password del database sicura (serve solo a te, salvala da
   qualche parte sicuro — non è la stessa cosa delle password dei clienti).

## 2. Applica lo schema

1. Nel progetto Supabase, apri **SQL Editor** → **New query**.
2. Incolla il contenuto di `supabase/schema.sql` (in questa cartella) ed
   esegui. Crea la tabella `clients` con le regole di sicurezza (ogni
   cliente vede solo i propri dati; tu, da titolare, li vedi tutti dalla
   dashboard).

## 3. Recupera le chiavi

1. Vai su **Project Settings → API**.
2. Copia:
   - **Project URL** (es. `https://xxxxx.supabase.co`)
   - **anon / public key** — è pensata per stare nel codice del sito,
     è sicura da condividere: le policy di sicurezza (RLS) sono quelle
     che proteggono i dati, non questa chiave.
3. **Non condividere mai la `service_role` key** — quella sì è segreta e
   non deve mai finire nel codice del sito.

## 4. Dammi questi due valori

Una volta che mi passi Project URL e anon key, li collego al form di
registrazione e al login — a quel punto i dati dei clienti vengono
salvati per davvero, e tu potrai vederli ed esportarli dalla dashboard di
Supabase (**Table Editor → clients**), che è già il tuo "gestionale":
niente da costruire in più.

## Nota sulla privacy

Il testo dell'informativa privacy nel form è una base di partenza — prima
di usarlo con clienti veri va rivisto con un consulente privacy/legale
(ragione sociale, indirizzo, email di contatto da completare nei
placeholder).
