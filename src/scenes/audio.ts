import { useEffect, useState } from "react";

/**
 * Fully synthesized scene audio — a soft ambient pad plus a handful of chimes,
 * all generated in-browser with the Web Audio API. No external/AI-generated
 * audio files: this sidesteps both the licensing question and the fact that
 * the available generation tools only produce speech, not music or sound
 * effects. Lives outside React (module-level singleton) so the ambience keeps
 * playing seamlessly as the visitor moves from the corridor into the portal
 * and its rooms, instead of restarting on every route change.
 */

type AudioCtor = typeof AudioContext;

let ctx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let ambient: { stop: () => void } | null = null;
let soundOn = false;
const listeners = new Set<(on: boolean) => void>();

function notify() {
  listeners.forEach((l) => l(soundOn));
}

function getCtx(): AudioContext {
  if (!ctx) {
    const Ctor: AudioCtor = window.AudioContext ?? (window as unknown as { webkitAudioContext: AudioCtor }).webkitAudioContext;
    ctx = new Ctor();
    masterGain = ctx.createGain();
    masterGain.gain.value = 0.5;
    masterGain.connect(ctx.destination);
  }
  return ctx;
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

function startAmbient() {
  if (ambient) return;
  const c = getCtx();
  const now = c.currentTime;

  // A slow, breathing cluster of soft tones — deliberately unresolved/open so
  // it reads as calm background wash rather than a melody competing for attention.
  const freqs = [98, 146.83, 220, 293.66]; // G2, D3, A3, D4
  const oscillators: OscillatorNode[] = [];

  const filter = c.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 850;

  const ambientGain = c.createGain();
  ambientGain.gain.value = 0;
  filter.connect(ambientGain);
  ambientGain.connect(masterGain!);

  freqs.forEach((freq, i) => {
    const osc = c.createOscillator();
    osc.type = i % 2 === 0 ? "sine" : "triangle";
    osc.frequency.value = freq;

    const voiceGain = c.createGain();
    voiceGain.gain.value = 0.11 / (i + 1);
    osc.connect(voiceGain);
    voiceGain.connect(filter);

    // gentle detune LFO per voice so the cluster slowly drifts instead of
    // sitting static — the "breathing" that makes a drone feel alive
    const lfo = c.createOscillator();
    lfo.frequency.value = 0.045 + i * 0.017;
    const lfoGain = c.createGain();
    lfoGain.gain.value = 2.5 + i * 0.8;
    lfo.connect(lfoGain);
    lfoGain.connect(osc.detune);

    osc.start(now);
    lfo.start(now);
    oscillators.push(osc, lfo);
  });

  ambientGain.gain.linearRampToValueAtTime(1, now + 2.6);

  ambient = {
    stop: () => {
      const c2 = getCtx();
      const t = c2.currentTime;
      ambientGain.gain.cancelScheduledValues(t);
      ambientGain.gain.setValueAtTime(ambientGain.gain.value, t);
      ambientGain.gain.linearRampToValueAtTime(0, t + 1);
      window.setTimeout(() => {
        oscillators.forEach((o) => {
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

function stopAmbient() {
  ambient?.stop();
  ambient = null;
}

export async function enableSound() {
  const c = getCtx();
  if (c.state === "suspended") await c.resume();
  startAmbient();
  soundOn = true;
  notify();
}

export function disableSound() {
  stopAmbient();
  ctx?.suspend();
  soundOn = false;
  notify();
}

export async function toggleSound() {
  if (soundOn) {
    disableSound();
  } else {
    await enableSound();
  }
}

/** A short, soft bell — one per floor tile catching light, scheduled `delaySeconds` from now. */
export function playTileChime(delaySeconds: number, index: number) {
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
  gain.gain.linearRampToValueAtTime(0.13, now + 0.025);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.85);
  partialGain.gain.setValueAtTime(0, now);
  partialGain.gain.linearRampToValueAtTime(0.035, now + 0.02);
  partialGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);

  osc.connect(gain);
  partial.connect(partialGain);
  gain.connect(masterGain!);
  partialGain.connect(masterGain!);

  osc.start(now);
  osc.stop(now + 0.9);
  partial.start(now);
  partial.stop(now + 0.55);
}

/** A richer shimmering chord — the diamond waking up. */
export function playActivationChime() {
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
    gain.gain.linearRampToValueAtTime(0.11, t + 0.06);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 2.1);
    osc.connect(gain);
    gain.connect(masterGain!);
    osc.start(t);
    osc.stop(t + 2.2);
  });
}

/** Filtered-noise sweep for the click-through dash into the diamond. */
export function playWhoosh() {
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
  gain.gain.linearRampToValueAtTime(0.16, now + 0.15);
  gain.gain.linearRampToValueAtTime(0, now + duration);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(masterGain!);
  noise.start(now);
  noise.stop(now + duration);
}

/** A soft single tone — used for lighter UI moments like a door being chosen. */
export function playSoftPing() {
  if (!soundOn) return;
  const c = getCtx();
  const now = c.currentTime;
  const osc = c.createOscillator();
  osc.type = "sine";
  osc.frequency.value = 660;
  const gain = c.createGain();
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.1, now + 0.04);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.1);
  osc.connect(gain);
  gain.connect(masterGain!);
  osc.start(now);
  osc.stop(now + 1.2);
}
