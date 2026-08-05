# DR Motors — Sito Demo

Sito statico multi-pagina (HTML + CSS + JS vanilla, nessuna build richiesta) per DR Motors, concessionaria plurimarche a Barletta. Il layout della pagina annuncio è ispirato a subito.it: foto grande + miniature a sinistra, prezzo/scheda tecnica/contatti a destra.

## Struttura

```
drmotors/
├── index.html                  # home: hero, catalogo, chi siamo, contatti
├── auto/
│   └── <slug>.html             # una pagina annuncio per ogni veicolo (12 pagine)
└── assets/
    ├── css/style.css           # tutto lo stile, condiviso da home e annunci
    ├── js/
    │   ├── cars-data.js         # UNICA fonte dei dati veicoli (array CARS)
    │   ├── common.js            # icone, illustrazione di riserva, nav/scroll condivisi
    │   ├── site.js               # logica della home (catalogo, filtri, FAQ, form)
    │   └── detail.js             # logica della pagina annuncio (galleria, specifiche, CTA)
    ├── fonts/                   # Bricolage Grotesque + Inter (variable, woff2)
    ├── logos/                    # loghi ufficiali DR Motors (logo1 = icona, logo2 = orizzontale)
    └── cars/<slug>/1.jpg…        # foto reali per veicolo (5 per auto, 3 per la Fiat 500 Ibrida)
```

## Come funziona il catalogo → annuncio

- In home ogni card mostra **una sola foto di copertina** (niente carosello nelle card) e un pulsante **"Vedi Dettagli"** che apre `auto/<slug>.html`.
- La pagina annuncio ha la galleria completa (foto grande + miniature cliccabili, frecce, tasti ← →), prezzo, scheda tecnica, descrizione integrale, pulsanti WhatsApp/Chiama/Email già precompilati col nome dell'auto, e in fondo "Altre auto in salone".

## Modifiche manuali

- **Tutti i dati veicolo** (nome, anno, km, alimentazione, cambio, prezzo, descrizione, foto) vivono in un unico punto: `assets/js/cars-data.js`, array `CARS`. Cambia lì e si aggiorna sia la home sia la relativa pagina annuncio.
- **Prezzo**: `price: null` → mostra "Prezzo su richiesta". Basta scrivere `price: '17.900'` (senza €) per mostrare il prezzo ovunque.
- **Foto**: sostituisci i file in `assets/cars/<slug>/` mantenendo i nomi (`1.jpg`, `2.jpg`, …) oppure aggiorna l'array `images` di quel veicolo in `cars-data.js`.
- **Nuova auto**: crea la cartella foto in `assets/cars/<slug>/`, aggiungi un oggetto a `CARS` in `cars-data.js` (categorie valide: `citycar`, `suv`, `monovolume`, `wagon`, `scooter`), poi copia `auto/citroen-c3-2014.html` in `auto/<nuovo-slug>.html` e cambia solo la riga `var SLUG = "...";` in fondo al file.
- **Colori/brand**: variabili in cima a `assets/css/style.css` (`--blue-900`, `--yellow`, ecc.).
- **Mappa**: in `index.html`, sezione Contatti, l'iframe punta a `https://www.google.com/maps?q=...&output=embed` — cambia l'indirizzo nell'URL se serve. Non è la mia illustrazione: è la vera mappa di Google incorporata (visibile una volta pubblicato il sito online — un iframe verso Google Maps non si carica se apri il file in locale con doppio click per via delle restrizioni del browser sui file locali).
- **Recensioni**: niente recensioni finte — la sezione "Recensioni" linka direttamente al profilo Google reale del salone. Quando avrete recensioni pubbliche, possiamo aggiungerle qui prendendole verbatim da lì.

## Anteprima locale

Apri `index.html` in un browser (nessun server richiesto, tutti i path sono relativi) — tranne per la mappa incorporata, che richiede una connessione internet reale e non un file aperto in locale.

## Da fare

- Foto e prezzo per Peugeot 5008 2011 (nessuna cartella caricata su Drive)
- Prezzi reali per tutti i veicoli (al momento "Prezzo su richiesta" ovunque)
