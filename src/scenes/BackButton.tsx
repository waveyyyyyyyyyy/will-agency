import { Link } from "react-router-dom";

/**
 * Consistent "go back one step" affordance for the immersive flow — every
 * screen after the intro gets one, so a visitor can retrace the walkthrough
 * instead of having to close the app to leave a screen they entered by
 * mistake.
 */
export function BackButton({ to, label = "Torna indietro" }: { to: string; label?: string }) {
  return (
    <Link
      to={to}
      aria-label={label}
      className="fixed left-6 top-6 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-cosmic-star/25 bg-black/30 text-cosmic-star/80 backdrop-blur-sm transition-colors hover:border-cosmic-gold/60 hover:text-cosmic-gold md:left-10 md:top-8"
    >
      <span aria-hidden className="text-base leading-none">
        ←
      </span>
    </Link>
  );
}
