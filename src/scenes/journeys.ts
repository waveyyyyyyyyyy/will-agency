export type JourneyId = "galassie" | "pietre" | "mare" | "montagna" | "geometrico";

export interface Journey {
  id: JourneyId;
  numeral: string;
  name: string;
  tagline: string;
  accent: string;
  accentSoft: string;
  path: string;
}

/**
 * The five paths reachable from the portal. "Pietre" is the odd one out —
 * it doesn't lead straight to a room, it opens onto its own three-gem
 * sub-junction (GemPathScene) — everything else routes to a generic
 * themed JourneyRoom.
 */
export const JOURNEYS: Journey[] = [
  {
    id: "galassie",
    numeral: "I",
    name: "Viaggio Cosmico",
    tagline: "Deriva tra spirali di stelle lontane.",
    accent: "#9b7bdb",
    accentSoft: "#4c2a8f",
    path: "/portale/galassie",
  },
  {
    id: "pietre",
    numeral: "II",
    name: "Frattali di Luce",
    tagline: "Tre gemme, tre soglie.",
    accent: "#e8c168",
    accentSoft: "#b6862c",
    path: "/portale/pietre",
  },
  {
    id: "mare",
    numeral: "III",
    name: "Flusso Marino",
    tagline: "Il respiro lento delle onde.",
    accent: "#2fc2b0",
    accentSoft: "#0b6e64",
    path: "/portale/mare",
  },
  {
    id: "montagna",
    numeral: "IV",
    name: "Sussurri della Natura",
    tagline: "Silenzio alto e aria sottile.",
    accent: "#8fb4d9",
    accentSoft: "#3c5a78",
    path: "/portale/montagna",
  },
  {
    id: "geometrico",
    numeral: "V",
    name: "Geometria del Silenzio",
    tagline: "Forme pure, quiete della mente.",
    accent: "#e0698a",
    accentSoft: "#8f2c42",
    path: "/portale/geometrico",
  },
];

export function getJourney(id: string | undefined): Journey | undefined {
  return JOURNEYS.find((j) => j.id === id);
}
