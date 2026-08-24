# Dimora del Sole — sito demo (affittacamere)

Bozza dimostrativa a scopo commerciale, da mostrare a un potenziale cliente del
settore affittacamere / B&B. **Nome attività, indirizzo, contatti, recensioni
e prezzi sono tutti inventati** — servono solo a mostrare struttura, tono e
stile grafico del sito, non sono dati reali.

## Come vederlo

È un unico file HTML autosufficiente (nessuna build richiesta):

```bash
open demo-clienti/dimora-del-sole/index.html      # macOS
xdg-open demo-clienti/dimora-del-sole/index.html  # Linux
```

Oppure trascinalo in una scheda del browser.

## Cosa contiene

- **Tema mediterraneo**: bianco calce, blu mare/Aegean, terracotta, ocra,
  verde oliva, tocchi di bougainville. Font titoli "Fraunces" (serif
  editoriale) + "Manrope" per il corpo testo, via Google Fonts. Divisore a
  onda sotto l'hero, texture a maiolica leggera su colazione/recensioni.
- **Foto delle 4 camere**: sono le foto stock a licenza libera fornite in
  chat (`images/`), assegnate per coerenza con la descrizione di ciascuna
  camera (es. la suite con vasca idromassaggio → foto con vasca idromassaggio
  reale). Con hover/zoom leggero sulle card. `images/vista-mare-extra.jpg`
  è di scorta, non ancora usata in pagina.
- **Esterno, cortile e colazione restano pannelli grafici**: ho provato a
  generare quelle immagini con Higgsfield (unico modello alla portata degli
  0,4 crediti residui del piano free: `z_image`, stile illustrativo non
  fotorealistico) e la generazione è riuscita, ma questa sessione non può
  scaricare i file dal CDN dei risultati (host bloccato dalla policy di rete
  dell'ambiente) — quindi non sono finite nel sito. Restano pannelli a
  gradiente con icona, che a piena risoluzione reggono meglio di uno
  stock/illustrativo incoerente. Da sostituire con foto vere in consegna
  definitiva.
- **Prenotazioni via email**: il modulo "Prenota" non ha backend — al submit
  compone un `mailto:` con tutti i dati (nome, date, ospiti, camera, messaggio)
  pronto da inviare.
- **Recensioni stile Google Maps**: badge valutazione + 6 recensioni inventate
  ma realistiche, con avatar a iniziali e stelle.
- **Camere su due livelli**: sezione "Camere Classic" (comfort essenziale) e
  sezione "Suite" (livello superiore, terrazza/cortile privato), ciascuna con
  due camere descritte singolarmente (metratura, dotazioni, prezzo indicativo).
- **Colazione**: sezione dedicata con voci del menu (pasticceria, marmellate
  fatte in casa, spremuta, caffè locale) e nota per intolleranze.
- **Dove siamo**: distanze indicative (mare, centro, aeroporto) senza mappa
  embed (evita costi/dipendenze da API Google nella bozza).

## Prima di consegnarlo al cliente reale

- Sostituire nome attività, indirizzo, telefono, email e Instagram con i dati
  veri.
- Sostituire i pannelli grafici con foto reali della struttura (camere,
  esterno, colazione).
- Sostituire le recensioni inventate con recensioni vere (o attivare
  l'integrazione Google, vedi regola `"google": {"attivo": true}` del
  workflow siti Will Agency).
- Verificare/aggiornare i prezzi indicativi delle camere.
