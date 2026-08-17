import type { JourneyId } from "./journeys";

export type ElementId = "fuoco" | "acqua" | "metallo" | "legno" | "terra";

export interface WuXingElement {
  id: ElementId;
  name: string;
  accent: string;
  accentSoft: string;
  symbol: string; // short line under the name
  description: string; // shown on hover — what the element represents
  care: string; // what it helps take care of
  journeyId: JourneyId; // the path this element opens onto
}

/**
 * The five elements of the "personalizza il tuo percorso" flow, loosely
 * inspired by the traditional Wu Xing framework — presented as a way to
 * organise self-care, not as a diagnostic or clinical system. Each maps to
 * one of the five journeys so a personalised pick still lands somewhere
 * real in the existing portal structure.
 */
export const ELEMENTS: WuXingElement[] = [
  {
    id: "fuoco",
    name: "Fuoco",
    accent: "#e0698a",
    accentSoft: "#8f2c42",
    symbol: "Energia",
    description:
      "Il fuoco è l'elemento dell'energia e dell'entusiasmo. Quando arde senza controllo porta agitazione, cuore che corre, difficoltà a fermare i pensieri.",
    care: "Agitazione, ansia, difficoltà a calmare la mente.",
    journeyId: "galassie",
  },
  {
    id: "acqua",
    name: "Acqua",
    accent: "#2fc2b0",
    accentSoft: "#0b6e64",
    symbol: "Flusso",
    description:
      "L'acqua è l'elemento della profondità e dell'adattamento. Quando è in blocco porta timore, esitazione, la sensazione di restare fermi davanti a ciò che verrà.",
    care: "Paura, ansia anticipatoria, blocchi.",
    journeyId: "mare",
  },
  {
    id: "terra",
    name: "Terra",
    accent: "#8fb4d9",
    accentSoft: "#3c5a78",
    symbol: "Radici",
    description:
      "La terra è l'elemento del radicamento e del nutrimento. Quando manca stabilità emergono preoccupazione costante e il bisogno di sicurezza.",
    care: "Preoccupazione eccessiva, senso di instabilità.",
    journeyId: "montagna",
  },
  {
    id: "metallo",
    name: "Metallo",
    accent: "#e8c168",
    accentSoft: "#b6862c",
    symbol: "Forza",
    description:
      "Il metallo è l'elemento della chiarezza e del lasciar andare. Quando è in eccesso pesa come malinconia; quando manca, lascia disordine e confusione.",
    care: "Tristezza, elaborazione di una perdita, bisogno di ordine.",
    journeyId: "pietre",
  },
  {
    id: "legno",
    name: "Legno",
    accent: "#9b7bdb",
    accentSoft: "#4c2a8f",
    symbol: "Rinascita",
    description:
      "Il legno è l'elemento della crescita e della direzione. Quando trova ostacoli si trasforma in frustrazione, rabbia, senso di blocco.",
    care: "Rabbia, frustrazione, senso di stagnazione.",
    journeyId: "geometrico",
  },
];

export function getElement(id: string | undefined): WuXingElement | undefined {
  return ELEMENTS.find((e) => e.id === id);
}
