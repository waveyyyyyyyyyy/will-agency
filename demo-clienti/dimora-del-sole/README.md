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
  editoriale) + "Manrope" per il corpo testo, via Google Fonts.
- **Niente foto stock finte**: al posto delle fotografie (i crediti Higgsfield
  disponibili non bastavano per immagini fotorealistiche di qualità) ci sono
  pannelli grafici a tema — gradienti mare/terracotta/oliva con icone lineari
  e cornice ad arco, in stile architettura mediterranea. Vanno sostituiti con
  foto vere del locale del cliente in fase di consegna definitiva.
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
