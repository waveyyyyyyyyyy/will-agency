/* Dati veicoli DRMotors — fonte unica usata sia dalla home (catalogo) sia dalle pagine annuncio.
   Percorsi immagine SENZA "./" o "../" davanti: ogni pagina antepone il prefisso corretto
   (vedi BASE in site.js / detail.js) a seconda di dove si trova sul disco.
   Le descrizioni sono adattate dai testi reali forniti dal concessionario (dati principali
   spostati nella scheda tecnica sopra); dove non era disponibile un testo reale, la
   descrizione è scritta nello stesso stile ma senza inventare dotazioni non verificate. */
function carImages(slug, count) {
  var arr = [];
  for (var i = 1; i <= count; i++) arr.push('assets/cars/' + slug + '/' + i + '.jpg');
  return arr;
}

var CARS = [
  { name:'Citroën C3 1.4 HDi', slug:'citroen-c3-2014', brand:'Citroën', cat:'citycar', catLabel:'City Car', year:'2014', km:'158.000', fuel:'Diesel', gear:'Manuale', price:null,
    desc:'Versione Exclusive, colore nero metallizzato, unico proprietario. Cerchi in lega, tetto panoramico, navigatore Citroën, cruise control, bracciolo centrale, servosterzo, sensori di parcheggio posteriori, climatizzatore automatico, quattro alzacristalli elettrici, ABS, ESP e vivavoce Bluetooth. Frizione sostituita di recente, doppia chiave. La descrizione non è vincolante.',
    images: carImages('citroen-c3-2014', 14) },

  { name:'Fiat 500 1.0 Hybrid', slug:'fiat-500-1-0-2022-ibrida', brand:'Fiat', cat:'citycar', catLabel:'City Car', year:'2022', km:null, fuel:'Ibrida', gear:'Manuale', price:null,
    desc:'Versione mild-hybrid, cambio manuale. Agile in centro storico e silenziosa in marcia, con consumi ridotti e l\'estetica intramontabile Fiat. Dotazioni ed equipaggiamento su richiesta. La descrizione non è vincolante.',
    images: carImages('fiat-500-1-0-2022-ibrida', 3) },

  { name:'Fiat 500L 1.3 Multijet', slug:'fiat-500l-2017', brand:'Fiat', cat:'monovolume', catLabel:'Monovolume', year:'2017', km:'142.000', fuel:'Diesel', gear:'Manuale', price:null,
    desc:'Versione Business, colore grigio, unico proprietario. Cerchi in lega, fendinebbia, navigatore TomTom con display a colori, computer di bordo, autoradio CD/USB, cruise control, bracciolo centrale, servosterzo, sensori di parcheggio posteriori, climatizzatore, alzacristalli elettrici, ABS, ESP e vivavoce Bluetooth. Doppia chiave. La descrizione non è vincolante.',
    images: carImages('fiat-500l-2017', 16) },

  { name:'Fiat 500X 1.3 Multijet', slug:'fiat-500x-2018', brand:'Fiat', cat:'suv', catLabel:'SUV & Crossover', year:'2018', km:'133.000', fuel:'Diesel', gear:'Manuale', price:null,
    desc:'Versione Pop Star, colore blu, unico proprietario. Cerchi in lega, fendinebbia, sistema audio con display a colori, sensori di parcheggio posteriori, bracciolo centrale, computer di bordo, autoradio con USB/AUX, cruise control, servosterzo, climatizzatore, quattro alzacristalli elettrici, ABS, ESP e vivavoce Bluetooth. Tagliandi certificati, ultimo tagliando a 124.400 km (olio, filtri, dischi e pattini anteriori/posteriori Magneti Marelli, revisione MCTC). Doppia chiave. La descrizione non è vincolante.',
    images: carImages('fiat-500x-2018', 18) },

  { name:'Fiat Punto Metano', slug:'fiat-punto-2016-metano', brand:'Fiat', cat:'citycar', catLabel:'City Car', year:'2016', km:null, fuel:'Metano', gear:null, price:null,
    desc:'Alimentazione bifuel benzina/metano. Un classico intramontabile Fiat, pensato per chi guida ogni giorno senza pensieri sul carburante grazie ai costi di rifornimento ridotti. Dotazioni ed equipaggiamento su richiesta. La descrizione non è vincolante.',
    images: carImages('fiat-punto-2016-metano', 5) },

  { name:'Ford C-Max 1.5 TDCi Titanium', slug:'ford-c-max-2018-blu-titanium', brand:'Ford', cat:'monovolume', catLabel:'Monovolume', year:'2018', km:'177.000', fuel:'Diesel', gear:null, price:null,
    desc:'Versione Titanium, colore blu. Cerchi in lega, luci diurne LED, navigatore Ford Sync touchscreen, cruise control, sensori di parcheggio anteriori e posteriori, fendinebbia, bracciolo centrale, sedili misto pelle, computer di bordo, autoradio, servosterzo, climatizzatore automatico, quattro alzacristalli elettrici, ABS, ESP e vivavoce Bluetooth. Doppia chiave con telecomando. La descrizione non è vincolante.',
    images: carImages('ford-c-max-2018-blu-titanium', 15) },

  { name:'Ford Focus SW 1.5 TDCI', slug:'ford-focus-sw-2018-nera', brand:'Ford', cat:'wagon', catLabel:'Station Wagon', year:'2018', km:'144.000', fuel:'Diesel', gear:'Manuale', price:null,
    desc:'Versione Business, colore nero, unico proprietario. Cambio manuale, cerchi in lega, fendinebbia, sistema Ford Sync touchscreen, computer di bordo, sensori di parcheggio posteriori, autoradio CD, bracciolo centrale, servosterzo, specchietti a regolazione e abbattimento elettrico, presa USB-AUX, climatizzatore, quattro alzacristalli elettrici, ABS, ESP e vivavoce Bluetooth. Doppia chiave con telecomando. La descrizione non è vincolante.',
    images: carImages('ford-focus-sw-2018-nera', 16) },

  { name:'Opel Grandland', slug:'opel-grandland-2021', brand:'Opel', cat:'suv', catLabel:'SUV & Crossover', year:'2021', km:'141.000', fuel:'Diesel', gear:'Automatico', euro:'Euro 6D', price:null,
    desc:'Versione Elegance, colore bianco. Cerchi in lega da 17", luci diurne LED, fari anteriori Eco-LED, climatizzatore automatico bi-zona, infotainment touchscreen con Apple CarPlay e Android Auto, vivavoce Bluetooth, cruise control con limitatore di velocità, sensori di parcheggio anteriori e posteriori, telecamera posteriore, volante multifunzione in pelle, sedili anteriori ergonomici con regolazione lombare, Start & Stop, quattro alzacristalli elettrici, specchietti retrovisori elettrici e richiudibili, chiusura centralizzata con telecomando, sistema di mantenimento corsia, rilevamento stanchezza conducente, ABS, ESP, Hill Start Assist e controllo della trazione. Meccanica regolarmente tagliandata, carrozzeria senza graffi evidenti, interni ben tenuti, auto in pronta consegna. La descrizione non è vincolante.',
    images: carImages('opel-grandland-2021', 17) },

  { name:'Peugeot 208', slug:'peugeot-208-2016', brand:'Peugeot', cat:'citycar', catLabel:'City Car', year:'2016', km:'92.000', fuel:'Diesel', gear:'Manuale', price:null,
    desc:'Versione Active, colore bianco, unico proprietario. Fendinebbia, touchscreen a colori, computer di bordo, luci diurne LED, cruise control, servosterzo, specchietti regolabili elettricamente, climatizzatore, alzacristalli elettrici, ABS, ESP e vivavoce Bluetooth. Doppia chiave. La descrizione non è vincolante.',
    images: carImages('peugeot-208-2016', 16) },

  { name:'Peugeot 3008 1.5 BlueHDi Allure', slug:'peugeot-3008-2023-allure-nera', brand:'Peugeot', cat:'suv', catLabel:'SUV & Crossover', year:'2023', km:null, fuel:'Diesel', gear:null, price:null,
    desc:'Versione Allure, colore nero. SUV Peugeot di ultima generazione con cabina di guida i-Cockpit e motore BlueHDi efficiente anche sui lunghi tragitti. Dotazioni ed equipaggiamento su richiesta. La descrizione non è vincolante.',
    images: carImages('peugeot-3008-2023-allure-nera', 14) },

  { name:'Peugeot 5008 — 5 posti', slug:'peugeot-5008-2011', brand:'Peugeot', cat:'suv', catLabel:'SUV & Crossover', year:'2011', km:'147.723', fuel:null, gear:null, price:null,
    desc:'Configurazione 5 posti, colore grigio. SUV/monovolume Peugeot con spazio generoso per passeggeri e bagagli, ideale per famiglie che cercano comfort e versatilità. Dotazioni ed equipaggiamento su richiesta. La descrizione non è vincolante.',
    images: carImages('peugeot-5008-2011', 14) },

  { name:'Piaggio Beverly 350', slug:'piaggio-beverly-350-2019', brand:'Piaggio', cat:'scooter', catLabel:'Scooter', year:'2019', km:null, fuel:'Benzina', gear:'Automatico', price:null,
    desc:'Versione GT, cambio automatico. Scooter Piaggio pensato per lunghe percorrenze, comfort di guida e brillantezza del 350cc sia in città che fuori porta. Dotazioni ed equipaggiamento su richiesta. La descrizione non è vincolante.',
    images: carImages('piaggio-beverly-350-2019', 6) }
];
