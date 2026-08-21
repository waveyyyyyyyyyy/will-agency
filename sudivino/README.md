# Sudivino — sito web

One-page statico (HTML/CSS/JS puro, nessun framework, nessuna build) per **Sudivino**,
cocktail & wine bar in Piazza Sedile 40, Corato (BA). Costruito a partire dallo script
copy + direzione creativa fornito.

Vive come cartella indipendente dal sito React di Will Agency (`/src`), perché è un
deliverable separato con dominio e deploy propri.

## Come vederlo in locale

Nessuna build richiesta: basta un server statico qualsiasi puntato su questa cartella, es.

```bash
npx serve sudivino
# oppure
python3 -m http.server --directory sudivino 8080
```

## Struttura

```
sudivino/
├── index.html      # tutte le 11 sezioni dello script, in ordine
├── privacy.html     # bozza, da completare con dati societari
├── cookie.html       # bozza
├── css/style.css     # palette nero/bianco/avorio dal logo reale, Fraunces + Inter
├── js/main.js         # fade-in on scroll (IntersectionObserver) + stato topbar
├── assets/
│   ├── logo.webp        # logo reale del cliente, ritagliato dallo screenshot fornito
│   ├── favicon.png       # stesso logo, 256×256, per apple-touch-icon
│   └── favicon-64.png     # stesso logo, 64×64, per la favicon del browser
├── robots.txt
└── _headers            # cache headers per Cloudflare Pages
```

**Logo e palette.** Il logo è quello reale fornito dal cliente (cerchio nero, calice con
il profilo bianco/nero, wordmark "SUDIVINO") — non è stato ridisegnato, solo ritagliato
dallo screenshot per rimuovere lo sfondo sfocato e reso trasparente. La palette del sito
è nero/bianco/avorio presa da quel logo: niente oro/giallo (una prima versione usava un
accento ambrato, tolto su richiesta esplicita del cliente).

## Cosa manca prima di andare online

Tutti i punti sono anche marcati nel codice con commenti `NOTA BUILD` o attributi
`data-todo` (cercabili con `grep -rn "NOTA BUILD\|data-todo" sudivino`).

1. **Foto/video reali.** Hero e sezione "Il posto" sono placeholder generati via CSS —
   vanno sostituiti con materiale vero (dehors sera, bancone, bottigliera). Nomi file in
   stile SEO, es. `sudivino-cocktail-bar-corato-piazza-sedile.jpg`. L'og:image usa per ora
   il logo come fallback dignitoso; con una foto orizzontale vera l'anteprima sui social
   sarà molto più efficace.
2. **Sezione "Le persone" (Daniele e Marina).** Ancora commentata in `index.html` — manca
   comunque una foto vera + l'ok esplicito dei due a comparire sul sito, e senza foto il
   brief dice di tagliarla piuttosto che metterci un'icona generica. La recensione di
   Giuseppe Q. in sezione Recensioni li nomina già entrambi (conferma indipendente che
   i nomi sono giusti), quindi per ora quella citazione fa parzialmente da sostituto.
   Decommentare la sezione dedicata solo dopo foto + ok del cliente.
3. **Recensioni — fatto.** I 3 screenshot reali inviati dal cliente (Giuseppe Q., Maria
   Vincenza C., Carola F. — tutte 5★) sono stati trascritti parola per parola in
   `.review-card` dentro `index.html`; cognomi ridotti a iniziale per privacy (Google
   mostra il nome per esteso, ma su richiesta lo abbreviamo comunque). Nessun testo
   riscritto: dove una citazione è più lunga della card, è stata solo accorciata
   (mai parafrasata) o lasciata con l'ellissi finale se la recensione continuava oltre
   lo screenshot fornito. Per aggiungerne/sostituirne altre in futuro vale la stessa
   regola: mai riscrivere, solo tagliare.
4. **Link social.**
   - Facebook trovato e verosimile: `facebook.com/SuDiViNo` (285 like, indirizzo
     corrispondente) — già inserito.
   - Instagram: non trovato con certezza in ricerca. Il link è un placeholder (`href="#"`,
     `data-todo="instagram-handle"`) in due punti (sezione Eventi + footer): va sostituito
     con l'URL reale del profilo.
   - "Leggi tutte le recensioni" e il link "Google" nel footer puntano ora a una ricerca
     Google Maps funzionante (`google.com/maps/search/...`, non più un place_id finto),
     ma restano marcati `data-todo="google-reviews-link"`: meglio sostituirli con il link
     diretto della scheda (Google Maps → Condividi → Copia link) quando disponibile, per
     portare dritti alla scheda invece che a un risultato di ricerca.
5. **Orario di domenica.** Google riporta 11:00–14:00, un orario insolito per un cocktail
   bar. Nel sito è mostrato come "Da confermare" (sezione Dove ci trovi). Va chiesto al
   cliente se è un aperitivo/pranzo domenicale reale (allora va valorizzato come asset,
   magari con una riga di copy dedicata) oppure un dato sbagliato sulla scheda Google
   (allora va corretto anche lì). Aggiornare anche lo schema `LocalBusiness` in `index.html`
   (`openingHoursSpecification`), dove la domenica è omessa apposta.
6. **P.IVA e dati societari.** Servono per il footer e per rendere Privacy/Cookie Policy
   davvero pubblicabili (oggi sono bozze con placeholder `[da comunicare]`, marcate
   chiaramente come non conformi finché non vengono completate). Consigliato far
   rivedere il testo finale della privacy da un consulente prima del lancio.
7. **Dominio.** `sudivino.it` o `sudivinocorato.it` da verificare/registrare — canonical e
   Schema.org sono già impostati su `https://www.sudivino.it/`, da aggiornare se cambia.
8. **Google Business Profile.** Una volta online, inserire l'URL del sito sulla scheda GBP
   e controllare che NAP (nome/indirizzo/telefono) sia identico ovunque — è la parte di
   SEO locale che conta più del sito stesso.

## Deploy

Pensato per **Cloudflare Pages**, build statica senza step di compilazione: build command
vuoto, output directory = questa cartella (`sudivino`).

## Note tecniche

- Mobile-first. In basso a destra, su tutte le viewport, due pulsanti circolari piccoli
  (icona sola, non una striscia larga): telefono (`tel:`) e WhatsApp — così chi preferisce
  chiamare non è costretto a passare da WhatsApp.
- Nessun form di contatto: ogni CTA (prenotazione, evento privato, contatto generico)
  apre WhatsApp con un messaggio precompilato o chiama direttamente.
- Trust signal ripetuto: il badge "★ 4.9 su Google" compare sia vicino alle CTA
  dell'hero (conversione immediata) sia nella sezione Recensioni più in basso.
- Font caricati da Google Fonts (Fraunces + Inter), unica dipendenza esterna.
- Animazioni limitate a un fade-in leggero allo scroll (`IntersectionObserver`), rispetta
  `prefers-reduced-motion`.
- Mappa incorporata senza bisogno di API key (`google.com/maps?...&output=embed`).

## Suoni / micro-interazioni

Non aggiunti. Un sito che parte con audio (o lo attiva al primo tap) è un rischio più
alto di far scappare qualcuno che convertire — specialmente aprendo da un link Instagram
di sera, spesso con l'audio del telefono già usato per altro. Se serve un tocco in più,
meglio una micro-interazione visiva (es. un piccolo "pop" sui bottoni) che un suono:
fattibile in 5 minuti se richiesto esplicitamente.

## Foto reali dal locale

Non riesco a raggiungere Google Maps o TripAdvisor da questo ambiente (il proxy di rete
blocca entrambi i domini), quindi non posso scaricare da lì le foto del locale in modo
affidabile. La via più veloce e senza problemi di diritti: il cliente esporta 3-4 foto
vere dalla sua Google Business Profile (o le manda da telefono), poi le miglioriamo con
Higgsfield (color correction, upscaling, eventuale ricomposizione) prima di metterle in
hero e nella sezione "Il posto". Vedi punto 1 sopra.
