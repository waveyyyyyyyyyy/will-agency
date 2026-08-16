/**
 * Frequency library — a documented catalogue of tones the app draws from
 * when building a room's soundscape, kept separate from the synthesis
 * engine (audio.ts) so future protocols can pick a frequency + a texture
 * (see audio.ts's AmbientProfileId/texture system) without touching the
 * audio code itself.
 *
 * Framed deliberately as tradition/association, never as a clinical claim —
 * see the note on DisclaimerGate. 528 Hz is already woven into every
 * ambient profile as a constant; the others are here for when a specific
 * room/protocol calls for a particular tone.
 */
export interface FrequencyPreset {
  id: string;
  hz: number;
  name: string;
  description: string;
}

export const FREQUENCY_LIBRARY: FrequencyPreset[] = [
  {
    id: "396",
    hz: 396,
    name: "396 Hz",
    description: "Nella tradizione delle frequenze solfeggio, un tono grave spesso associato al lasciar andare tensione e paura.",
  },
  {
    id: "417",
    hz: 417,
    name: "417 Hz",
    description: "Associato al cambiamento — utile come sottofondo nei percorsi che accompagnano una transizione.",
  },
  {
    id: "528",
    hz: 528,
    name: "528 Hz",
    description: "Il tono \"del cuore\": presente come costante discreta in ogni ambiente sonoro dell'app.",
  },
  {
    id: "639",
    hz: 639,
    name: "639 Hz",
    description: "Associato alla connessione e alle relazioni — utile per stati di isolamento o difficoltà relazionali.",
  },
  {
    id: "741",
    hz: 741,
    name: "741 Hz",
    description: "Associato alla chiarezza mentale — un tono più \"vigile\", utile nei momenti di rimuginio o confusione.",
  },
  {
    id: "852",
    hz: 852,
    name: "852 Hz",
    description: "Associato al risveglio e alla lucidità.",
  },
  {
    id: "963",
    hz: 963,
    name: "963 Hz",
    description: "Un tono molto acuto, associato a stati di quiete profonda e presenza.",
  },
];

export function getFrequency(id: string): FrequencyPreset | undefined {
  return FREQUENCY_LIBRARY.find((f) => f.id === id);
}
