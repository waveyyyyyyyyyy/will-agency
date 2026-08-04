# DR Motors — Sito Demo

Sito statico (HTML + CSS + JS vanilla, nessuna build richiesta) per DR Motors, concessionaria plurimarche a Barletta.

## Struttura

```
drmotors/
├── index.html              # tutta la pagina: markup, stile e interattività
└── assets/
    ├── fonts/               # Bricolage Grotesque + Inter (variable, woff2)
    ├── logos/                # loghi ufficiali DR Motors (logo1 = icona, logo2 = logo orizzontale)
    └── cars/<slug>/1.jpg…    # foto reali per veicolo, 5 per auto (3 per la Fiat 500 Ibrida)
```

## Modifiche manuali

- **Testi, prezzi, dati auto**: cercare l'array `cars` dentro il tag `<script>` in `index.html`. Ogni oggetto ha `name`, `year`, `km`, `fuel`, `gear`, `price`, `desc`, `images`.
- **Prezzo**: attualmente `price: null` per tutte le auto → mostra "Prezzo su richiesta". Basta impostare `price: '17.900'` (senza simbolo €) per mostrare il prezzo.
- **Foto**: sostituire i file dentro `assets/cars/<slug>/` mantenendo lo stesso nome (`1.jpg`, `2.jpg`, ...), oppure aggiornare l'array `images` del veicolo corrispondente.
- **Nuova auto**: aggiungere una cartella in `assets/cars/`, aggiungere un oggetto all'array `cars` con `cat` tra `citycar`, `suv`, `monovolume`, `wagon`, `scooter`.
- **Colori/brand**: variabili CSS in cima al tag `<style>` (`--blue-900`, `--yellow`, ecc.).
- **Recensioni Google**: sezione "Recensioni", cercare `var testis` nello script — al momento sono demo, in attesa del collegamento al profilo Google reale.

## Anteprima locale

Basta aprire `index.html` in un browser (nessun server richiesto, tutti i path sono relativi).

## Da fare

- Foto e prezzo per Peugeot 5008 2011 (nessuna cartella caricata su Drive)
- Recensioni Google reali
