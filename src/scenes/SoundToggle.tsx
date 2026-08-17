import { isAudioSupported, toggleSound, useSoundEnabled } from "./audio";

/**
 * Persistent sound control for the immersive scenes. Rendered once at the
 * App level (not per-scene) so it survives navigation between the corridor,
 * the portal and the rooms without interrupting the ambient loop.
 */
export function SoundToggle() {
  const soundOn = useSoundEnabled();
  if (!isAudioSupported()) return null;

  return (
    <button
      type="button"
      onClick={() => void toggleSound()}
      aria-label={soundOn ? "Disattiva l'audio" : "Attiva l'audio"}
      aria-pressed={soundOn}
      className="fixed right-6 top-6 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-cosmic-star/25 bg-black/30 text-cosmic-star/80 backdrop-blur-sm transition-colors hover:border-cosmic-gold/60 hover:text-cosmic-gold md:right-10 md:top-8"
    >
      <span aria-hidden className="text-base leading-none">
        {soundOn ? "🔊" : "🔈"}
      </span>
    </button>
  );
}
