import { useEffect, useState } from "react";
import { getFrequency } from "./frequencies";

/**
 * Fully synthesized scene audio — a soft ambient pad plus a handful of
 * chimes, all generated in-browser with the Web Audio API. No external/
 * AI-generated audio files: this sidesteps both the licensing question and
 * the fact that the available generation tools only produce speech, not
 * music or sound effects. Lives outside React (module-level singleton) so
 * the ambience keeps playing seamlessly as the visitor moves between scenes
 * instead of restarting on every route change — it only ever crossfades
 * when the *profile* changes (each journey has its own).
 */

type AudioCtor = typeof AudioContext;
type Texture = "twinkle" | "chime" | "waves" | "wind" | "beating" | "none";

export type AmbientProfileId = "cosmic" | "gems" | "mare" | "montagna" | "geometrico";

interface ProfileConfig {
  freqs: number[]; // base drone cluster
  filterHz: number;
  texture: Texture;
  /** id into FREQUENCY_LIBRARY — the profile's own quiet solfeggio layer, on top of the 528Hz constant. */
  frequencyId: string;
}

// Each journey's harmonic identity, and the characteristic "texture" that
// makes it sound like its element rather than a generic pad — the sea gets
// real (synthesised) wave swell, the mountain gets wind, etc. Every profile
// also carries the quiet 528Hz tone plus one frequency of its own from the
// library in frequencies.ts, chosen for what that path is meant to help
// with (see elements.ts's "care" field for the reasoning behind each pick).
const PROFILES: Record<AmbientProfileId, ProfileConfig> = {
  cosmic: { freqs: [98, 146.83, 220, 293.66], filterHz: 720, texture: "twinkle", frequencyId: "963" }, // G2 D3 A3 D4 — corridor/portal/galassie; 963 Hz for quiete e presenza
  gems: { freqs: [130.81, 196, 261.63, 329.63], filterHz: 980, texture: "chime", frequencyId: "852" }, // C3 G3 C4 E4 — brighter, crystalline; 852 Hz for chiarezza
  mare: { freqs: [87.31, 130.81, 174.61, 220], filterHz: 540, texture: "waves", frequencyId: "396" }, // F2 C3 F3 A3 — low, tidal; 396 Hz per il rilascio della paura
  montagna: { freqs: [110, 164.81, 220, 293.66, 440], filterHz: 800, texture: "wind", frequencyId: "741" }, // A2 E3 A3 D4 A4 — wide, "symphonic"; 741 Hz per la chiarezza mentale
  geometrico: { freqs: [130.81, 195.5, 261.63, 391.0], filterHz: 1150, texture: "beating", frequencyId: "417" }, // near-perfect fifths, slow beating; 417 Hz per il cambiamento
};

let ctx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let ambient: { profile: AmbientProfileId; stop: () => void } | null = null;
let soundOn = false;
let audioBroken = false; // flips permanently on the first construction failure — every exported call below then no-ops instead of retrying and risking another throw
const listeners = new Set<(on: boolean) => void>();

function notify() {
  listeners.forEach((l) => l(soundOn));
}

function getCtx(): AudioContext {
  if (!ctx) {
    const Ctor: AudioCtor = window.AudioContext ?? (window as unknown as { webkitAudioContext: AudioCtor }).webkitAudioContext;
    ctx = new Ctor();
    masterGain = ctx.createGain();
    masterGain.gain.value = 0.21; // background contour, never the foreground — kept deliberately quiet
    masterGain.connect(ctx.destination);
  }
  return ctx;
}

/**
 * Every exported function below is wrapped through this — sound is a nice-
 * to-have layered on top of the experience, never something a click handler
 * or a screen's mount effect can be blocked by. If the Web Audio API throws
 * for any reason (unsupported browser, a restrictive in-app webview, an
 * autoplay policy rejection, ...), it's swallowed here, logged once, and
 * audio quietly stays off for the rest of the session instead of taking
 * down whatever UI logic happened to run right after it.
 */
function guarded<Args extends unknown[]>(fn: (...args: Args) => void): (...args: Args) => void {
  return (...args: Args) => {
    if (audioBroken) return;
    try {
      fn(...args);
    } catch (err) {
      audioBroken = true;
      console.error("Supernova audio disabled after an error:", err);
    }
  };
}

export function isAudioSupported() {
  return typeof window !== "undefined" && !!(window.AudioContext || (window as unknown as { webkitAudioContext?: AudioCtor }).webkitAudioContext);
}

export function isSoundOn() {
  return soundOn;
}

/** Subscribes a component to the current on/off state — shared across every scene. */
export function useSoundEnabled() {
  const [on, setOn] = useState(soundOn);
  useEffect(() => {
    listeners.add(setOn);
    return () => {
      listeners.delete(setOn);
    };
  }, []);
  return on;
}

function makeNoiseBuffer(c: AudioContext, seconds: number, tint: "brown" | "white" = "white") {
  const buffer = c.createBuffer(1, Math.floor(c.sampleRate * seconds), c.sampleRate);
  const data = buffer.getChannelData(0);
  let last = 0;
  for (let i = 0; i < data.length; i++) {
    const white = Math.random() * 2 - 1;
    if (tint === "brown") {
      last = (last + 0.02 * white) / 1.02;
      data[i] = last * 3.2;
    } else {
      data[i] = white;
    }
  }
  return buffer;
}

/** Continuous low swell, filtered brown noise breathing in and out — the sea. */
function attachWaveTexture(c: AudioContext, destination: AudioNode, now: number) {
  const noise = c.createBufferSource();
  noise.buffer = makeNoiseBuffer(c, 6, "brown");
  noise.loop = true;
  const filter = c.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 480;
  const gain = c.createGain();
  gain.gain.value = 0.045;
  const lfo = c.createOscillator();
  lfo.frequency.value = 0.085; // one swell roughly every 12s
  const lfoGain = c.createGain();
  lfoGain.gain.value = 0.032;
  lfo.connect(lfoGain);
  lfoGain.connect(gain.gain);
  noise.connect(filter);
  filter.connect(gain);
  gain.connect(destination);
  noise.start(now);
  lfo.start(now);
  return [noise as AudioScheduledSourceNode, lfo];
}

/** Airy, higher filtered noise that drifts in intensity — wind at altitude. */
function attachWindTexture(c: AudioContext, destination: AudioNode, now: number) {
  const noise = c.createBufferSource();
  noise.buffer = makeNoiseBuffer(c, 5, "white");
  noise.loop = true;
  const filter = c.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = 1400;
  filter.Q.value = 0.6;
  const gain = c.createGain();
  gain.gain.value = 0.014;
  const lfo = c.createOscillator();
  lfo.frequency.value = 0.05;
  const lfoGain = c.createGain();
  lfoGain.gain.value = 0.01;
  lfo.connect(lfoGain);
  lfoGain.connect(gain.gain);
  const filterLfo = c.createOscillator();
  filterLfo.frequency.value = 0.03;
  const filterLfoGain = c.createGain();
  filterLfoGain.gain.value = 300;
  filterLfo.connect(filterLfoGain);
  filterLfoGain.connect(filter.frequency);
  noise.connect(filter);
  filter.connect(gain);
  gain.connect(destination);
  noise.start(now);
  lfo.start(now);
  filterLfo.start(now);
  return [noise as AudioScheduledSourceNode, lfo, filterLfo];
}

/** A pair of voices detuned by a couple of cents — a slow, hypnotic beating pulse. */
function attachBeatingTexture(c: AudioContext, destination: AudioNode, now: number) {
  const osc = c.createOscillator();
  osc.type = "sine";
  osc.frequency.value = 392; // G4
  const osc2 = c.createOscillator();
  osc2.type = "sine";
  osc2.frequency.value = 393.3; // ~2.3Hz beat
  const gain = c.createGain();
  gain.gain.value = 0.033;
  osc.connect(gain);
  osc2.connect(gain);
  gain.connect(destination);
  osc.start(now);
  osc2.start(now);
  return [osc, osc2];
}

/** A single quiet, steady tone with a very slow amplitude drift — used for both the
 * universal 528Hz layer and each profile's own pick from the frequency library. */
function attachSolfeggioTone(c: AudioContext, destination: AudioNode, now: number, hz: number, peakGain: number) {
  const osc = c.createOscillator();
  osc.type = "sine";
  osc.frequency.value = hz;
  const gain = c.createGain();
  gain.gain.value = 0;
  osc.connect(gain);
  gain.connect(destination);
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(peakGain, now + 2.6); // arrives together with the ambient bed, not staggered after it
  const lfo = c.createOscillator();
  lfo.frequency.value = 0.055 + Math.random() * 0.02;
  const lfoGain = c.createGain();
  lfoGain.gain.value = peakGain * 0.3;
  lfo.connect(lfoGain);
  lfoGain.connect(gain.gain);
  osc.start(now);
  lfo.start(now);
  return [osc, lfo];
}

/** Sparse, randomised high "starlight" twinkles — turns a static drone into generative music. */
function scheduleTwinkle(getStopped: () => boolean) {
  const cosmicNotes = [1046.5, 1174.66, 1318.51, 1567.98, 1760]; // C6 D6 E6 G6 A6
  let timer: number | undefined;
  function tick() {
    if (getStopped()) return;
    const delay = 3.5 + Math.random() * 5.5;
    timer = window.setTimeout(() => {
      if (getStopped()) return;
      const c = getCtx();
      const t = c.currentTime;
      const freq = cosmicNotes[Math.floor(Math.random() * cosmicNotes.length)];
      const osc = c.createOscillator();
      osc.type = "sine";
      osc.frequency.value = freq;
      const g = c.createGain();
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.032, t + 0.6);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 3.2);
      osc.connect(g);
      g.connect(masterGain!);
      osc.start(t);
      osc.stop(t + 3.3);
      tick();
    }, delay * 1000);
  }
  tick();
  return () => {
    if (timer) window.clearTimeout(timer);
  };
}

/** More frequent, glassier bell hits with a bright harmonic partial — crystal, not starlight. */
function scheduleChime(getStopped: () => boolean) {
  const gemNotes = [523.25, 659.25, 783.99, 987.77, 1046.5]; // C5 E5 G5 B5 C6
  let timer: number | undefined;
  function tick() {
    if (getStopped()) return;
    const delay = 2.2 + Math.random() * 3.2;
    timer = window.setTimeout(() => {
      if (getStopped()) return;
      const c = getCtx();
      const t = c.currentTime;
      const freq = gemNotes[Math.floor(Math.random() * gemNotes.length)];
      const osc = c.createOscillator();
      osc.type = "sine";
      osc.frequency.value = freq;
      const partial = c.createOscillator();
      partial.type = "sine";
      partial.frequency.value = freq * 2.01;
      const g = c.createGain();
      const gPartial = c.createGain();
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.035, t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 2.4);
      gPartial.gain.setValueAtTime(0, t);
      gPartial.gain.linearRampToValueAtTime(0.012, t + 0.015);
      gPartial.gain.exponentialRampToValueAtTime(0.0001, t + 1.2);
      osc.connect(g);
      partial.connect(gPartial);
      g.connect(masterGain!);
      gPartial.connect(masterGain!);
      osc.start(t);
      osc.stop(t + 2.5);
      partial.start(t);
      partial.stop(t + 1.3);
      tick();
    }, delay * 1000);
  }
  tick();
  return () => {
    if (timer) window.clearTimeout(timer);
  };
}

function buildAmbient(profileId: AmbientProfileId) {
  const config = PROFILES[profileId];
  const c = getCtx();
  const now = c.currentTime;
  const nodes: AudioScheduledSourceNode[] = [];

  const filter = c.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = config.filterHz;

  const ambientGain = c.createGain();
  ambientGain.gain.value = 0;
  filter.connect(ambientGain);
  ambientGain.connect(masterGain!);

  config.freqs.forEach((freq, i) => {
    const osc = c.createOscillator();
    osc.type = i % 2 === 0 ? "sine" : "triangle";
    osc.frequency.value = freq;
    const voiceGain = c.createGain();
    voiceGain.gain.value = 0.078 / (i + 1);
    osc.connect(voiceGain);
    voiceGain.connect(filter);

    const lfo = c.createOscillator();
    lfo.frequency.value = 0.045 + i * 0.017;
    const lfoGain = c.createGain();
    lfoGain.gain.value = 2.5 + i * 0.8;
    lfo.connect(lfoGain);
    lfoGain.connect(osc.detune);

    osc.start(now);
    lfo.start(now);
    nodes.push(osc, lfo);
  });

  // The one constant across every journey: a quiet, steady 528 Hz tone —
  // plus this profile's own pick from the frequency library, layered in
  // just as quietly right beside it.
  nodes.push(...attachSolfeggioTone(c, filter, now, 528, 0.032));
  const profileFreq = getFrequency(config.frequencyId);
  if (profileFreq) {
    nodes.push(...attachSolfeggioTone(c, filter, now, profileFreq.hz, 0.025));
  }

  let stopScheduled: (() => void) | null = null;
  let stopped = false;
  if (config.texture === "twinkle") {
    stopScheduled = scheduleTwinkle(() => stopped);
  } else if (config.texture === "chime") {
    stopScheduled = scheduleChime(() => stopped);
  } else if (config.texture === "waves") {
    nodes.push(...attachWaveTexture(c, filter, now));
  } else if (config.texture === "wind") {
    nodes.push(...attachWindTexture(c, filter, now));
  } else if (config.texture === "beating") {
    nodes.push(...attachBeatingTexture(c, filter, now));
  }

  ambientGain.gain.linearRampToValueAtTime(1, now + 2.6);

  return {
    profile: profileId,
    stop: () => {
      stopped = true;
      stopScheduled?.();
      const c2 = getCtx();
      const t = c2.currentTime;
      ambientGain.gain.cancelScheduledValues(t);
      ambientGain.gain.setValueAtTime(ambientGain.gain.value, t);
      ambientGain.gain.linearRampToValueAtTime(0, t + 1);
      window.setTimeout(() => {
        nodes.forEach((o) => {
          try {
            o.stop();
          } catch {
            /* already stopped */
          }
        });
      }, 1100);
    },
  };
}

let desiredProfile: AmbientProfileId = "cosmic";

/**
 * Declares which journey's ambience should be playing. Safe to call whether
 * or not sound is currently on — it always remembers the intent, and
 * crossfades immediately if sound happens to already be enabled, so a
 * scene never has to check `isSoundOn()` before calling this.
 */
export const setAmbientProfile = guarded((profileId: AmbientProfileId) => {
  desiredProfile = profileId;
  if (!soundOn) return;
  if (ambient?.profile === profileId) return;
  ambient?.stop();
  ambient = buildAmbient(profileId);
});

export async function enableSound() {
  if (audioBroken) return;
  try {
    const c = getCtx();
    if (c.state === "suspended") await c.resume();
    if (!ambient) ambient = buildAmbient(desiredProfile);
    soundOn = true;
    notify();
  } catch (err) {
    audioBroken = true;
    console.error("Supernova audio disabled after an error:", err);
  }
}

export const disableSound = guarded(() => {
  ambient?.stop();
  ambient = null;
  ctx?.suspend();
  soundOn = false;
  notify();
});

export async function toggleSound() {
  if (soundOn) {
    disableSound();
  } else {
    await enableSound();
  }
}

/** A short, soft bell — scheduled `delaySeconds` from now. */
export const playTileChime = guarded((delaySeconds: number, index: number) => {
  if (!soundOn) return;
  const c = getCtx();
  const now = c.currentTime + Math.max(0, delaySeconds);
  const notes = [523.25, 587.33, 659.25, 783.99, 880]; // C5 D5 E5 G5 A5 — pentatonic, nothing dissonant
  const freq = notes[index % notes.length];

  const osc = c.createOscillator();
  osc.type = "sine";
  osc.frequency.value = freq;
  const partial = c.createOscillator();
  partial.type = "sine";
  partial.frequency.value = freq * 2;

  const gain = c.createGain();
  const partialGain = c.createGain();
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.095, now + 0.025);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.85);
  partialGain.gain.setValueAtTime(0, now);
  partialGain.gain.linearRampToValueAtTime(0.025, now + 0.02);
  partialGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);

  osc.connect(gain);
  partial.connect(partialGain);
  gain.connect(masterGain!);
  partialGain.connect(masterGain!);

  osc.start(now);
  osc.stop(now + 0.9);
  partial.start(now);
  partial.stop(now + 0.55);
});

/** A richer shimmering chord — the diamond waking up. */
export const playActivationChime = guarded(() => {
  if (!soundOn) return;
  const c = getCtx();
  const now = c.currentTime;
  [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
    const osc = c.createOscillator();
    osc.type = "sine";
    osc.frequency.value = freq;
    const gain = c.createGain();
    const t = now + i * 0.06;
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.08, t + 0.06);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 2.1);
    osc.connect(gain);
    gain.connect(masterGain!);
    osc.start(t);
    osc.stop(t + 2.2);
  });
});

/** Filtered-noise sweep for the click-through dash into the diamond. */
export const playWhoosh = guarded(() => {
  if (!soundOn) return;
  const c = getCtx();
  const now = c.currentTime;
  const duration = 1.1;
  const buffer = c.createBuffer(1, c.sampleRate * duration, c.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;

  const noise = c.createBufferSource();
  noise.buffer = buffer;
  const filter = c.createBiquadFilter();
  filter.type = "bandpass";
  filter.Q.value = 0.7;
  filter.frequency.setValueAtTime(220, now);
  filter.frequency.exponentialRampToValueAtTime(4200, now + duration * 0.8);

  const gain = c.createGain();
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.11, now + 0.15);
  gain.gain.linearRampToValueAtTime(0, now + duration);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(masterGain!);
  noise.start(now);
  noise.stop(now + duration);
});

/** A soft single tone — used for lighter UI moments like a gem being chosen. */
export const playSoftPing = guarded(() => {
  if (!soundOn) return;
  const c = getCtx();
  const now = c.currentTime;
  const osc = c.createOscillator();
  osc.type = "sine";
  osc.frequency.value = 660;
  const gain = c.createGain();
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.075, now + 0.04);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.1);
  osc.connect(gain);
  gain.connect(masterGain!);
  osc.start(now);
  osc.stop(now + 1.2);
});

const FIBONACCI_STEPS = [1, 1, 2, 3, 5, 8, 13]; // seconds of sound; each step is followed by 1s of silence, then loops

let fibonacciStop: (() => void) | null = null;

/**
 * A soft breathing pulse timed to the Fibonacci sequence — 1s of sound, 1s
 * of silence, 2s of sound, 1s of silence, 3s, 1s, 5s, 1s, 8s, 1s, 13s, 1s,
 * then back to the start. Reserved for the corridor's diamond screen, where
 * it's meant to stay present for as long as the visitor lingers before
 * choosing to step through. Filtered noise, not a raw hiss, and quiet
 * enough to sit under the cosmic ambience rather than fight it.
 */
export const startFibonacciPulse = guarded(() => {
  if (fibonacciStop) return; // already running — never double-schedule
  let stopped = false;
  let i = 0;
  let timer: number | undefined;

  function playBurst(durationSec: number) {
    if (!soundOn) return;
    const c = getCtx();
    const now = c.currentTime;
    const noise = c.createBufferSource();
    noise.buffer = makeNoiseBuffer(c, durationSec + 0.3, "brown");
    const filter = c.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 640;
    filter.Q.value = 0.5;
    const gain = c.createGain();
    const attack = Math.min(0.9, durationSec * 0.35);
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.04, now + attack);
    gain.gain.setValueAtTime(0.04, now + Math.max(durationSec - 0.7, attack));
    gain.gain.linearRampToValueAtTime(0, now + durationSec);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(masterGain!);
    noise.start(now);
    noise.stop(now + durationSec + 0.1);
  }

  function tick() {
    if (stopped) return;
    const durationSec = FIBONACCI_STEPS[i % FIBONACCI_STEPS.length];
    playBurst(durationSec);
    timer = window.setTimeout(() => {
      if (stopped) return;
      i += 1;
      timer = window.setTimeout(tick, 1000); // the 1s pause between bursts
    }, durationSec * 1000);
  }
  tick();

  fibonacciStop = () => {
    stopped = true;
    if (timer) window.clearTimeout(timer);
    fibonacciStop = null;
  };
});

export const stopFibonacciPulse = guarded(() => {
  fibonacciStop?.();
});
