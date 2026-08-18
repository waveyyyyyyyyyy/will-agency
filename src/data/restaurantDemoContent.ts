// Contenuti del template dimostrativo "Ristorante La Quercia".
// Locale, indirizzo, numeri e recensioni sono interamente di fantasia:
// servono solo a mostrare ai potenziali clienti di Will Marketing Agency
// come potrebbe presentarsi online un ristorante reale.

export const restaurantInfo = {
  name: "La Quercia",
  fullName: "Ristorante La Quercia",
  tagline: "Cucina di tradizione, materie prime del territorio.",
  address: "Via Esempio 12, Centro Storico",
  phone: "+39 080 000 0000",
  email: "info@laquercia-demo.it",
  instagram: "ristorantelaquercia",
};

export const openingHours = [
  { day: "Lunedì", hours: "Chiuso" },
  { day: "Martedì – Venerdì", hours: "12:30 – 14:30 · 19:30 – 23:00" },
  { day: "Sabato", hours: "12:30 – 15:00 · 19:00 – 23:30" },
  { day: "Domenica", hours: "12:30 – 15:00" },
];

export const stats = [
  { value: "25+", label: "anni di storia e tradizione in famiglia" },
  { value: "100%", label: "ingredienti da produttori locali" },
  { value: "4,9/5", label: "valutazione media degli ospiti" },
  { value: "60", label: "coperti tra sala interna e dehors" },
];

export const menu = [
  {
    category: "Antipasti",
    items: [
      { name: "Tagliere di salumi e formaggi locali", description: "Selezione del territorio, miele e confetture della casa", price: "14" },
      { name: "Bruschette al pomodoro e basilico", description: "Pane casereccio, pomodoro fresco, olio extravergine", price: "8" },
      { name: "Carpaccio di manzo, rucola e grana", description: "Battuto a coltello, scaglie di grana 24 mesi", price: "13" },
      { name: "Polpo arrosto con crema di patate", description: "Polpo alla brace, crema di patate al rosmarino", price: "15" },
    ],
  },
  {
    category: "Primi",
    items: [
      { name: "Orecchiette con cime di rapa", description: "Ricetta tradizionale, aglio, olio e peperoncino", price: "12" },
      { name: "Tagliolini al tartufo nero", description: "Pasta fresca all'uovo, burro e tartufo nero estivo", price: "16" },
      { name: "Risotto alla zucca e speck croccante", description: "Riso Carnaroli, zucca di stagione, speck croccante", price: "13" },
      { name: "Paccheri al ragù della casa", description: "Cottura lenta 6 ore, ricotta salata", price: "12" },
    ],
  },
  {
    category: "Secondi",
    items: [
      { name: "Tagliata di manzo, rucola e grana", description: "Manzo selezionato, cottura alla brace", price: "22" },
      { name: "Branzino al forno con patate", description: "Pescato del giorno, patate al rosmarino", price: "20" },
      { name: "Agnello alle erbe aromatiche", description: "Cottura lenta, erbe dell'orto", price: "21" },
      { name: "Parmigiana di melanzane", description: "Ricetta della nonna, provola affumicata", price: "14" },
    ],
  },
  {
    category: "Dolci",
    items: [
      { name: "Tiramisù della casa", description: "Ricetta originale, preparato al momento", price: "7" },
      { name: "Panna cotta ai frutti di bosco", description: "Panna fresca, coulis di frutti di bosco", price: "7" },
      { name: "Tortino al cioccolato fondente", description: "Cuore morbido, gelato alla vaniglia", price: "8" },
    ],
  },
];

export const gallery = [
  { label: "La Sala", hue: "#b6532e" },
  { label: "Il Bancone", hue: "#8a6b3f" },
  { label: "I Nostri Piatti", hue: "#6f7c4f" },
  { label: "La Cantina", hue: "#5b4632" },
  { label: "Il Dehors", hue: "#a4763f" },
  { label: "La Cucina", hue: "#7a4a2c" },
];

export const testimonials = [
  {
    quote: "Un'esperienza autentica, dal pane fatto in casa al dolce. Il servizio è impeccabile: torneremo sicuramente.",
    name: "Giulia M.",
    rating: 5,
  },
  {
    quote: "Atmosfera calda, personale attento, piatti curati nei dettagli. Consigliato per una cena speciale.",
    name: "Marco R.",
    rating: 5,
  },
  {
    quote: "La tagliata è semplicemente perfetta e il tartufo si sentiva davvero. Il miglior ristorante della zona.",
    name: "Elena T.",
    rating: 4,
  },
];
