export type GemId = "rubino" | "topazio" | "smeraldo";

/**
 * Layered, faceted gem illustrations — the same treatment as the elements
 * screen (several shaded polygons with gradients and glints, not a single
 * flat outline) so the "Frattali di Luce" path finally reads with the same
 * care as the rest of the app instead of a plain triangle-cut placeholder.
 */
export function GemIllustration({ id }: { id: GemId }) {
  switch (id) {
    case "rubino":
      return (
        <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden>
          <defs>
            <linearGradient id="gem-rubino-a" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffe1e9" />
              <stop offset="45%" stopColor="#e0698a" />
              <stop offset="100%" stopColor="#7a1731" />
            </linearGradient>
            <radialGradient id="gem-rubino-glow" cx="50%" cy="38%" r="55%">
              <stop offset="0%" stopColor="#ffb3c6" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#ffb3c6" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="50" cy="46" r="40" fill="url(#gem-rubino-glow)" />
          {/* crown */}
          <polygon points="50,10 68,26 50,40 32,26" fill="url(#gem-rubino-a)" />
          <polygon points="50,10 32,26 22,30" fill="#8f2c42" opacity="0.85" />
          <polygon points="50,10 68,26 78,30" fill="#ffb3c6" opacity="0.6" />
          {/* girdle + pavilion */}
          <polygon points="22,30 32,26 50,40 68,26 78,30 50,88" fill="url(#gem-rubino-a)" opacity="0.95" />
          <polygon points="22,30 50,40 50,88" fill="#8f2c42" opacity="0.55" />
          <polygon points="78,30 50,40 50,88" fill="#ffcfda" opacity="0.35" />
          {/* table highlight */}
          <polygon points="44,18 56,18 50,30" fill="#fff3f6" opacity="0.8" />
          <circle cx="60" cy="20" r="1.6" fill="#fff3f6" opacity="0.9" />
          <circle cx="30" cy="34" r="1.2" fill="#ffb3c6" opacity="0.7" />
        </svg>
      );
    case "topazio":
      return (
        <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden>
          <defs>
            <linearGradient id="gem-topazio-a" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fff6df" />
              <stop offset="45%" stopColor="#e8c168" />
              <stop offset="100%" stopColor="#8a6420" />
            </linearGradient>
            <radialGradient id="gem-topazio-glow" cx="50%" cy="40%" r="55%">
              <stop offset="0%" stopColor="#ffe6ac" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#ffe6ac" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="50" cy="46" r="40" fill="url(#gem-topazio-glow)" />
          {/* classic emerald / step cut — rectangular table with bevelled corners */}
          <polygon points="34,16 66,16 78,28 78,64 66,76 34,76 22,64 22,28" fill="url(#gem-topazio-a)" />
          <polygon points="40,24 60,24 68,32 68,60 60,68 40,68 32,60 32,32" fill="#fffaf0" opacity="0.4" />
          <polygon points="34,16 22,28 32,32 40,24" fill="#fff3d6" opacity="0.55" />
          <polygon points="66,16 78,28 68,32 60,24" fill="#8a6420" opacity="0.5" />
          <polygon points="22,64 34,76 40,68 32,60" fill="#8a6420" opacity="0.4" />
          <polygon points="78,64 66,76 60,68 68,60" fill="#fff3d6" opacity="0.4" />
          <circle cx="64" cy="26" r="1.6" fill="#fffaf0" opacity="0.9" />
          <circle cx="30" cy="60" r="1.1" fill="#e8c168" opacity="0.7" />
        </svg>
      );
    case "smeraldo":
    default:
      return (
        <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden>
          <defs>
            <linearGradient id="gem-smeraldo-a" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e6fbf7" />
              <stop offset="45%" stopColor="#14a696" />
              <stop offset="100%" stopColor="#0a3f38" />
            </linearGradient>
            <radialGradient id="gem-smeraldo-glow" cx="50%" cy="40%" r="55%">
              <stop offset="0%" stopColor="#7fe3d4" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#7fe3d4" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="50" cy="48" r="40" fill="url(#gem-smeraldo-glow)" />
          {/* round brilliant-ish cut — hexagonal crown over a pointed pavilion */}
          <polygon points="50,12 70,24 74,48 50,86 26,48 30,24" fill="url(#gem-smeraldo-a)" />
          <polygon points="50,12 30,24 40,32 60,32 70,24" fill="#eafffb" opacity="0.55" />
          <polygon points="26,48 40,32 50,86" fill="#0a3f38" opacity="0.45" />
          <polygon points="74,48 60,32 50,86" fill="#bdf5ea" opacity="0.35" />
          <polygon points="44,22 56,22 50,32" fill="#eafffb" opacity="0.85" />
          <circle cx="58" cy="24" r="1.5" fill="#eafffb" opacity="0.9" />
          <circle cx="34" cy="30" r="1.1" fill="#7fe3d4" opacity="0.7" />
        </svg>
      );
  }
}
