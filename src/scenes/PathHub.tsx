import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { NebulaBackdrop } from "./NebulaBackdrop";
import { TiltedBackdrop } from "./TiltedBackdrop";
import { JOURNEYS, type JourneyId } from "./journeys";
import { playSoftPing, playWhoosh, setAmbientProfile } from "./audio";
import { usePointerTilt } from "./usePointerTilt";

/**
 * Fuller layered illustrations for each path — the same treatment as the
 * elements screen (several shaded shapes rather than a single-stroke glyph)
 * so the two selection screens read as one consistent visual language.
 */
function PathIllustration({ id }: { id: JourneyId }) {
  switch (id) {
    case "galassie":
      return (
        <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden>
          <defs>
            <radialGradient id="ph-galaxy-core" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fff6df" stopOpacity="1" />
              <stop offset="35%" stopColor="#c9a6f0" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#4c2a8f" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="50" cy="50" r="46" fill="url(#ph-galaxy-core)" />
          {[0, 60, 120, 180, 240, 300].map((rot) => (
            <path
              key={rot}
              d="M50,50 C64,45 76,32 72,16"
              fill="none"
              stroke="#e8d9fb"
              strokeOpacity="0.6"
              strokeWidth="2.2"
              strokeLinecap="round"
              transform={`rotate(${rot} 50 50)`}
            />
          ))}
          <circle cx="50" cy="50" r="6" fill="#fff8ea" />
        </svg>
      );
    case "pietre":
      return (
        <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden>
          <defs>
            <linearGradient id="ph-gem-a" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fff6df" />
              <stop offset="100%" stopColor="#e8c168" />
            </linearGradient>
            <linearGradient id="ph-gem-b" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fce8ee" />
              <stop offset="100%" stopColor="#d94566" />
            </linearGradient>
            <linearGradient id="ph-gem-c" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e6fbf7" />
              <stop offset="100%" stopColor="#14a696" />
            </linearGradient>
          </defs>
          <polygon points="50,10 68,28 50,86 32,28" fill="url(#ph-gem-a)" />
          <polygon points="50,10 68,28 50,44 32,28" fill="#fffaf0" opacity="0.5" />
          <polygon points="18,42 30,54 18,80 8,58" fill="url(#ph-gem-b)" opacity="0.92" />
          <polygon points="82,42 92,58 80,80 70,54" fill="url(#ph-gem-c)" opacity="0.92" />
        </svg>
      );
    case "mare":
      return (
        <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden>
          <defs>
            <linearGradient id="ph-water" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0b6e64" />
              <stop offset="100%" stopColor="#0a2a34" />
            </linearGradient>
          </defs>
          <rect x="6" y="46" width="88" height="42" rx="6" fill="url(#ph-water)" />
          <path d="M6,50 C20,40 32,60 46,50 C60,40 72,60 86,50 L94,48 L94,88 L6,88 Z" fill="#14a696" opacity="0.9" />
          <path d="M6,64 C20,56 32,72 46,64 C60,56 72,72 86,64 L94,62 L94,88 L6,88 Z" fill="#2fc2b0" opacity="0.85" />
          <path d="M6,76 C20,70 32,82 46,76 C60,70 72,82 86,76 L94,74 L94,88 L6,88 Z" fill="#7fe3d4" opacity="0.7" />
          <circle cx="72" cy="22" r="10" fill="#fff6df" opacity="0.9" />
        </svg>
      );
    case "montagna":
      return (
        <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden>
          <defs>
            <linearGradient id="ph-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8fb4d9" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#8fb4d9" stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="100" height="55" fill="url(#ph-sky)" />
          <circle cx="70" cy="22" r="9" fill="#fff6df" opacity="0.85" />
          <polygon points="6,88 24,46 36,64 50,32 66,60 78,42 94,88" fill="#3c5a78" />
          <polygon points="50,32 58,46 66,60 50,60 42,52" fill="#8fb4d9" opacity="0.7" />
        </svg>
      );
    case "geometrico":
    default:
      return (
        <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden>
          <defs>
            <radialGradient id="ph-geo-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#e0698a" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#e0698a" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="50" cy="50" r="44" fill="url(#ph-geo-glow)" />
          <circle cx="50" cy="50" r="34" fill="none" stroke="#e0698a" strokeOpacity="0.55" strokeWidth="1.4" />
          {[0, 60, 120, 180, 240, 300].map((rot) => (
            <circle
              key={rot}
              cx={50 + Math.cos((rot * Math.PI) / 180) * 17}
              cy={50 + Math.sin((rot * Math.PI) / 180) * 17}
              r="17"
              fill="none"
              stroke="#e0698a"
              strokeOpacity="0.4"
              strokeWidth="1"
            />
          ))}
          <polygon points="50,22 74,36 74,64 50,78 26,64 26,36" fill="none" stroke="#fdf6e6" strokeOpacity="0.7" strokeWidth="1.2" />
          <circle cx="50" cy="50" r="4" fill="#fdf6e6" />
        </svg>
      );
  }
}

export function PathHub() {
  const navigate = useNavigate();
  const tilt = usePointerTilt(4);

  useEffect(() => {
    setAmbientProfile("cosmic");
    playSoftPing();
  }, []);

  function handleChoose(path: string) {
    playWhoosh();
    setTimeout(() => navigate(path), 500);
  }

  return (
    <section
      ref={tilt.ref}
      onPointerMove={tilt.onPointerMove}
      onPointerLeave={tilt.onPointerLeave}
      className="relative flex min-h-[100dvh] w-full items-center justify-center overflow-hidden bg-black"
      style={{ perspective: 1400 }}
    >
      <motion.div
        initial={{ scale: 1.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center px-6 py-24"
      >
        <TiltedBackdrop rotateX={tilt.rotateX} rotateY={tilt.rotateY}>
          <NebulaBackdrop starCount={170} />
        </TiltedBackdrop>

        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,250,235,0.95),rgba(232,193,104,0.3)_40%,transparent_72%)]"
        />

        <div className="relative z-10 mb-14 max-w-2xl text-center md:mb-20">
          <span className="text-xs font-medium uppercase tracking-[0.35em] text-cosmic-gold">Il diamante ti ha condotto qui</span>
          <h1 className="font-display mt-5 text-balance text-3xl font-medium leading-[1.15] tracking-tight text-cosmic-star sm:text-4xl md:text-5xl">
            Cinque sentieri si aprono davanti a te.
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-cosmic-star/60 md:text-base">
            Ognuno ha la sua luce, il suo suono, il suo passo. Scegli quello che ti chiama ora.
          </p>
        </div>

        <div
          className="relative z-10 grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 md:flex md:flex-wrap md:items-start md:justify-center md:gap-x-10"
          style={{ perspective: 1400, transformStyle: "preserve-3d" }}
        >
          {JOURNEYS.map((journey) => (
            <motion.button
              key={journey.id}
              type="button"
              onClick={() => handleChoose(journey.path)}
              aria-label={`Entra nel percorso ${journey.name}`}
              className="group flex w-32 flex-col items-center gap-3 rounded-3xl px-2 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cosmic-gold/70 sm:w-36"
              style={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY, transformStyle: "preserve-3d" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              <span
                className="flex aspect-square w-full items-center justify-center overflow-hidden rounded-3xl border-2 p-5 transition-all"
                style={{
                  borderColor: `${journey.accent}45`,
                  background: `radial-gradient(circle at 35% 25%, ${journey.accent}3d, rgba(7,4,15,0.85) 75%)`,
                  boxShadow: `0 0 30px ${journey.accentSoft}55`,
                  animation: "diamond-breathe 4.5s ease-in-out infinite",
                  animationDelay: `${JOURNEYS.indexOf(journey) * 0.4}s`,
                }}
              >
                <PathIllustration id={journey.id} />
              </span>
              <span className="font-display text-sm font-medium tracking-wide sm:text-base" style={{ color: journey.accent }}>
                {journey.name}
              </span>
              <span className="max-w-[9rem] text-center text-[11px] leading-snug text-cosmic-star/55">
                {journey.tagline}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
