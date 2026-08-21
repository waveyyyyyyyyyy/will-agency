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
2. **Sezione "Le persone" (Daniele e Marina).** Lasciata commentata in `index.html`
   (non cancellata) perché nomi e ruolo vengono dalle recensioni Google, non da una
   conferma diretta del cliente, e non c'è una foto. Come da brief: senza foto è meglio
   tagliarla che pubblicarla con un'icona generica. Decommentare solo dopo l'ok esplicito
   del cliente + foto vera.
3. **Recensioni.** Il badge "4.9 ★ · 76 recensioni" viene dal brief. Le 3 card con
   citazioni reali NON sono state inserite: non avendo accesso diretto e verificato alla
   scheda Google, non si è voluto rischiare di inventare o storpiare una recensione vera.
   Vanno copiate/incollate testuali dalla scheda Google Business quando disponibili.
4. **Link social.**
   - Facebook trovato e verosimile: `facebook.com/SuDiViNo` (285 like, indirizzo
     corrispondente) — già inserito.
   - Instagram: non trovato con certezza in ricerca. Il link è un placeholder (`href="#"`,
     `data-todo="instagram-handle"`) in due punti (sezione Eventi + footer): va sostituito
     con l'URL reale del profilo.
   - Link "Leggi tutte le recensioni" punta a un placeholder (`data-todo="google-reviews-link"`):
     va sostituito col link diretto alla scheda Google Business reale (da Google Maps →
     Condividi → Copia link, sulla scheda del locale).
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

- Mobile-first, bottone WhatsApp fisso in basso a destra su tutte le viewport.
- Nessun form di contatto: ogni CTA (prenotazione, evento privato, contatto generico)
  apre WhatsApp con un messaggio precompilato.
- Font caricati da Google Fonts (Fraunces + Inter), unica dipendenza esterna.
- Animazioni limitate a un fade-in leggero allo scroll (`IntersectionObserver`), rispetta
  `prefers-reduced-motion`.
- Mappa incorporata senza bisogno di API key (`google.com/maps?...&output=embed`).
