import type { JourneyId } from "./journeys";

export interface Protocol {
  name: string;
  focus: string; // one line — what this protocol is meant to accompany
}

/**
 * Placeholder protocol names for each journey — invented ahead of the real
 * content so every path already has something to show, kept coherent with
 * that journey's element (see elements.ts's "care" field for the reasoning
 * behind each pick: fuoco→ansia, acqua→paura, terra→preoccupazione,
 * metallo→tristezza, legno→rabbia/frustrazione). Names only, no claims —
 * to be replaced or renamed once the real protocols exist.
 */
export const PROTOCOLS: Record<JourneyId, Protocol[]> = {
  galassie: [
    { name: "Respiro Stellare", focus: "Per rallentare quando i pensieri corrono." },
    { name: "Deriva Silenziosa", focus: "Un ritorno alla calma dopo un picco di agitazione." },
    { name: "Cielo Fermo", focus: "Un punto fermo quando tutto sembra veloce." },
  ],
  pietre: [
    { name: "Chiarezza Cristallina", focus: "Per fare ordine tra pensieri sovrapposti." },
    { name: "Il Distacco Necessario", focus: "Per accompagnare l'elaborazione di una perdita." },
    { name: "Ordine Sereno", focus: "Per ritrovare struttura nei momenti di confusione." },
  ],
  mare: [
    { name: "Onda Che Passa", focus: "Per lasciare defluire un'ansia anticipatoria." },
    { name: "Corrente Sicura", focus: "Per affrontare la paura un respiro alla volta." },
    { name: "Riva Interiore", focus: "Un approdo quando il mondo sembra incerto." },
  ],
  montagna: [
    { name: "Radici Profonde", focus: "Per ritrovare stabilità nei giorni di preoccupazione." },
    { name: "Vetta Silenziosa", focus: "Per prendere distanza da un pensiero che si ripete." },
    { name: "Passo Fermo", focus: "Per costruire sicurezza, un passo alla volta." },
  ],
  geometrico: [
    { name: "Slancio Ambizioso", focus: "Per trasformare la frustrazione in direzione." },
    { name: "Nuovo Ramo", focus: "Per accompagnare un cambiamento o una decisione." },
    { name: "Direzione Chiara", focus: "Per allentare la rabbia e ritrovare lucidità." },
  ],
};
