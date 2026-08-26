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
│   ├── logo.webp                                          # logo reale, ritagliato dallo screenshot
│   ├── favicon.png / favicon-64.png                         # stesso logo, per favicon/apple-touch-icon
│   ├── sudivino-brindisi-cocktail-corato.webp                # foto reale — hero
│   ├── sudivino-interno-bancone-piazza-sedile-corato.webp     # foto reale — sezione "Il posto"
│   ├── sudivino-og-cover.webp                                  # ritaglio 1200×630 della foto hero, per anteprime social
│   ├── sudivino-bottiglieria-rum-corato.webp                    # foto reale, non ancora usata (vedi sotto)
│   ├── sudivino-bartender-cocktail-corato.webp                   # foto reale, non ancora usata (vedi sotto)
│   └── sudivino-vini-pugliesi-corato.webp                         # foto reale, non ancora usata (vedi sotto)
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

1. **Foto reali — in gran parte fatto.** Hero e sezione "Il posto" ora usano foto vere
   del locale (mandate dal cliente), non più placeholder CSS: rispettivamente il brindisi
   con i due cocktail e l'interno con l'insegna SUDIVINO e il soffitto a volta in pietra.
   L'og:image è un ritaglio 1200×630 della foto hero, per un'anteprima social vera invece
   del logo. Restano in `assets/` altre 3 foto reali non ancora usate — bottiglia di Don
   Papa, bartender che versa un cocktail, due bottiglie di vino pugliese — buoni candidati
   per Instagram, il futuro menu, o una sezione "Cosa trovi al bancone" più fotografica se
   in futuro si vuole ampliarla. Manca ancora uno scatto della piazza/dehors vero e proprio
   (quello descritto nel brief originale): se arriva, è il primo candidato a sostituire la
   foto hero attuale.
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
5. **Orari — confermati dal cliente, ma con una scadenza vicina.** Al momento la chiusura
   settimanale è la domenica (Lunedì 19–24, Martedì–Sabato 19–01, Domenica chiuso). Da
   settembre la chiusura si sposta al martedì. Quando arriva il cambio: invertire "Martedì"
   e "Domenica" nella sezione Dove ci trovi, nella riga sotto l'hero, e nello schema
   `LocalBusiness` in `index.html` — tutti e tre i punti sono segnalati con `NOTA BUILD`.
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

- Mobile-first. In basso a destra, su tutte le viewport, un solo pulsante circolare
  (icona sola, non una striscia larga): WhatsApp — l'unico canale fisso, su richiesta del
  cliente. Il telefono resta comunque cliccabile nell'header (sempre visibile, topbar fissa).
- Nessun form di contatto: ogni CTA (prenotazione, evento privato, proposta musica dal
  vivo) apre WhatsApp con un messaggio precompilato, chiama, o apre una mail precompilata
  verso `sudivino.americanbar@gmail.com` (l'indirizzo di riferimento per qualsiasi richiesta,
  fornito dal cliente).
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

## Aggiornamenti dal questionario cliente

Il cliente ha risposto a un questionario di posizionamento. Cosa è cambiato sul sito:

- **Eyebrow del Manifesto** ("Non si viene qui per bere") rinominato da "Il posto" a
  "Chi siamo" — è la sezione che di fatto racconta l'identità del locale, e il cliente
  ha chiesto esplicitamente una sezione "chi siamo" nella struttura del sito.
- **Canale email aggiunto ovunque serve una richiesta**: `sudivino.americanbar@gmail.com`,
  sempre come alternativa a WhatsApp, mai da solo (evento privato, proposta musica, footer).
- **Nuova sezione "Suoni o fai musica dal vivo?"**, distinta dalla sezione "evento privato":
  il cliente ha chiesto due percorsi separati, uno per chi vuole festeggiare (cliente finale)
  e uno per chi vuole proporsi come dj/band/artista dal vivo (fornitore di contenuti). Stessa
  logica di contatto (WhatsApp + mail), trattamento visivo più leggero per non confonderla
  con la sezione "vera" che porta soldi.
- **Nuova sezione "Evento speciale — El Mercado Espolón Tequila" (1 ottobre)**: Sudivino sarà
  il 2° locale in Puglia a ospitare questo format itinerante. Non riuscendo ad aprire l'articolo
  di BariToday linkato dal cliente (bloccato dal proxy di rete), ho ricostruito il formato da
  fonti pubbliche sulla tappa di Bari del 29-30 maggio 2026 (Masseria Pietra Sole): dj set,
  musica dal vivo, cocktail a base tequila firmati Espolón (es. il Paloma). Ho scritto la
  sezione descrivendo *quell'evento futuro a Sudivino*, non quello già avvenuto a Bari, e ho
  lasciato fuori i dettagli specifici della tappa barese non confermati per Corato (la "maglia
  del pueblo" disegnata da un creativo locale, la partnership con Billboard Italia) per non
  promettere cose che potrebbero non esserci alla serata di Sudivino. Il bottone rimanda per
  ora a Instagram (`data-todo="instagram-handle"`, come le altre CTA eventi): da aggiornare
  con orario e dettagli precisi appena disponibili.
- **Orari aggiornati** — vedi punto 5 sopra.

## Aggiornamenti round 2 (menu, logo, foto evento)

- **Menu a tendina** aggiunto in header: icona ☰ in alto a destra (accanto al numero di
  telefono, che resta sempre visibile) apre un pannello con 4 link: Chi siamo, Al bancone,
  Eventi, Dove ci trovi. Markup in `index.html` (`#navToggle` / `#navPanel`), logica in
  `js/main.js`, stile in `css/style.css` (`.nav-panel`). Ancore aggiunte: `id="chi-siamo"`
  sul Manifesto, `id="eventi"` sulla sezione "Nel weekend la piazza si accende".
- **Logo più grande in header**: da 44px a 72px (classe `.logo-main`), per renderlo
  l'elemento principale della topbar come richiesto.
- **Foto evento Espolón Tequila**: le 5 foto mandate dal cliente sono ora una galleria
  dentro la sezione "Evento speciale" (`assets/sudivino-espolon-tequila-*.webp`). Sono
  materiale ufficiale del format/brand Espolón (installazioni, bottiglie, drink), non
  scatti del locale di Corato — alt text scritto di conseguenza, senza far credere che
  siano foto della serata di Sudivino (che deve ancora avvenire).
- **Foto AI per la sezione "evento privato" (compleanni) — non fatta.** Il cliente ha
  chiesto un'immagine generata (via Gemini/Composio o, in alternativa, Higgsfield) nella
  stessa palette nero/bianco/avorio del sito, in tema festa/compleanno. Bloccato su
  entrambi i fronti in questa sessione: il workspace Higgsfield è senza crediti, e
  Composio non ha un collegamento attivo a Gemini/Google AI (i soli tool collegati sono
  github, gmail, google_maps, remove_bg, whatsapp). Serve una decisione del cliente:
  ricaricare crediti Higgsfield, collegare Gemini via Composio (richiede un login OAuth),
  o lasciar perdere e usare un trattamento CSS decorativo come per gli altri placeholder.

**Cose non toccate perché già coperte o fuori scope per questa passata:**
- Prezzi: confermato di non metterli — il sito già non li mostra da nessuna parte.
- Target (25-50 anni, famiglie, gente che stacca dalla giornata) e prodotto reale
  (l'ambiente, non birra/spritz che pur fatturano di più): già il cuore del copy esistente
  (hero + Manifesto), nessuna riscrittura necessaria.
- Concorrenti diretti e siti di riferimento (domanda 8): non risposta nel questionario,
  nessuna azione presa — utile saperlo se in futuro serve un confronto.
- Anni di attività / premi (domanda 12): citati come possibili asset ma senza numeri reali
  forniti — non inventato nessun dato, la sezione Recensioni resta l'unica prova sociale
  concreta sul sito.

## Foto reali dal locale

Risolto: il cliente ha mandato 5 foto vere e professionali del locale direttamente (non
serviva più passare da Google Maps/TripAdvisor, comunque irraggiungibili da questo
ambiente). Ottimizzate in WebP e usate come da punto 1 sopra. Se in futuro arrivano altri
scatti — in particolare il dehors/piazza — stessa procedura: ridimensionare, convertire in
WebP, nome file descrittivo, e aggiornare `index.html`.

## Aggiornamenti round 3 (ristrutturazione in più pagine, storytelling)

Il cliente ha bocciato la struttura precedente ("non mi piace assolutamente"): voleva che
le voci del menu aprissero pagine vere, non semplici scroll-to-anchor, e ha chiesto un sito
che raccontasse una storia — chi sono, cosa li rende diversi, cosa si vive lì — invece di
essere "solo un portale per far venire le persone". Obiettivo dichiarato: "fare innamorare
le persone al locale prima ancora che ci vengano".

- **Menu → pagine reali**: `Chi siamo` e `Eventi` nel pannello ☰ ora aprono
  `/chi-siamo.html` e `/eventi.html` (non più `#chi-siamo`/`#eventi` sulla stessa pagina).
  `Al bancone` e `Dove ci trovi` restano ancore sulla home.
- **`chi-siamo.html` (nuova pagina)**: pagina di storytelling dedicata.
  - Hero con foto reale del bartender (shaker) e headline "Non è il posto dove bevi.
    È il posto dove torni a essere te."
  - Sezione "La storia": perché è nato Sudivino (via d'uscita dalla giornata, non dalla
    città) e perché Piazza Sedile (il tempo si muove diverso in una piazza).
  - Tre blocchi alternati testo/foto su cosa li rende diversi: le persone dietro al
    bancone (foto con maglietta "SUDIVINO"), la qualità dei prodotti (foto amaro), il
    posto stesso — dehors d'estate, sala in pietra d'inverno (foto dehors).
  - Sezione "Per chi è": target dichiarato dal cliente (25+, famiglie, chi si fa un'ora
    di strada) + citazione vera (recensione Google di Maria Vincenza C., già usata altrove
    sul sito, non inventata).
  - CTA finale di prenotazione via WhatsApp.
- **`eventi.html` (nuova pagina)**: hub eventi, raccoglie tutto ciò che prima era sparso
  sulla home.
  - Hero con foto dehors, headline "La piazza cambia faccia quando si accende."
  - Sezione weekend (invariata nel contenuto, spostata qui).
  - **Evento Espolón Tequila riscritto in chiave di prestigio**, come chiesto
    esplicitamente dal cliente: non più "ospitiamo un evento" ma "siamo stati scelti" —
    su tutta la Puglia Espolón ha selezionato due sole location per El Mercado, e
    Sudivino è una delle due. Badge "★ Scelti da Espolón Tequila" in testa alla sezione.
    Stesso principio di prima: nessun dettaglio della tappa di Bari non confermato per
    Corato (maglia pueblo, Billboard Italia) viene promesso per la serata di Sudivino.
  - Card "Il tuo evento privato" (identica a quella rimasta sulla home — sezione che
    porta soldi, tenuta in entrambi i posti).
  - Sezione "Suoni o fai musica dal vivo?" (spostata qui dalla home, contenuto invariato).
- **`index.html` condensata**: il Manifesto ora è un teaser breve con link "Scopri la
  nostra storia →" verso `chi-siamo.html`; la sezione eventi è un teaser breve con link
  "Scopri tutti gli eventi →" verso `eventi.html` (badge di prestigio incluso nel teaser
  stesso); la sezione "Suoni o fai musica dal vivo?" è stata rimossa dalla home (vive solo
  su `eventi.html`, per non affollare la pagina principale con contenuti minoritari). La
  card "Il tuo evento privato" resta invece intera sulla home, perché è la sezione che
  genera più richieste dirette.
  - Foto della sezione "Il posto" sostituita con il primo scatto reale dell'esterno/dehors
    (`sudivino-dehors-piazza-sedile-corato.webp`), al posto della vecchia foto d'interno.
- **5 nuove foto reali integrate** (mandate dal cliente in questo round, ottimizzate in
  WebP): mano con bottiglia di amaro artigianale, bartender che serve un cocktail verde
  (non ancora usata — disponibile per usi futuri), bartender con shaker (hero di
  chi-siamo.html), dehors con tende rosse (prima foto esterna reale del locale, usata su
  home/chi-siamo/eventi), bartender con maglietta brandizzata "SUDIVINO".
- **Nuovi blocchi CSS riusabili** in `style.css`: `.page-hero` (hero di sottopagina con
  lo stesso trattamento di leggibilità a due strati dell'hero della home), `.split-block`
  (layout alternato testo/foto), `.pull-quote`, `.prestige-badge`, `.teaser-link`,
  `.container-narrow`, `.section-alt`, `.cta-final`.

**Ancora aperto — foto AI sezione "evento privato":** non risolto in questo round.
Higgsfield resta senza crediti nel workspace collegato; Composio non riesce a collegare
Gemini/Google AI in questo ambiente (il tool di generazione immagini risulta bloccato a
livello di piattaforma, non semplicemente "da collegare"). Serve una decisione del
cliente: ricaricare i crediti Higgsfield, oppure procedere con un trattamento CSS
decorativo (pattern/texture nella palette nero-bianco-avorio, senza immagine generata).
