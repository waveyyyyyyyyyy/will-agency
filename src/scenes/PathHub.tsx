import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { NebulaBackdrop } from "./NebulaBackdrop";
import { JOURNEYS, type JourneyId } from "./journeys";
import { playSoftPing, playWhoosh, setAmbientProfile } from "./audio";
import { usePointerTilt } from "./usePointerTilt";

function PathIcon({ id, accent }: { id: JourneyId; accent: string }) {
  switch (id) {
    case "galassie":
      return (
        <svg viewBox="0 0 60 60" className="h-8 w-8" aria-hidden>
          <circle cx="30" cy="30" r="4" fill={accent} />
          {[0, 60, 120, 180, 240, 300].map((rot) => (
            <path
              key={rot}
              d="M30,30 C40,26 48,16 44,6"
              fill="none"
              stroke={accent}
              strokeWidth="1.6"
              strokeLinecap="round"
              opacity={0.75}
              transform={`rotate(${rot} 30 30)`}
            />
          ))}
        </svg>
      );
    case "pietre":
      return (
        <svg viewBox="0 0 60 60" className="h-8 w-8" aria-hidden>
          <polygon points="30,10 42,22 30,50 18,22" fill={accent} opacity={0.9} />
          <polygon points="14,26 20,32 14,44 9,34" fill={accent} opacity={0.6} />
          <polygon points="46,26 51,34 46,44 40,32" fill={accent} opacity={0.6} />
        </svg>
      );
    case "mare":
      return (
        <svg viewBox="0 0 60 60" className="h-8 w-8" aria-hidden>
          <path d="M6,24 C14,16 20,32 28,24 C36,16 42,32 50,24" fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" />
          <path d="M6,34 C14,26 20,42 28,34 C36,26 42,42 50,34" fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" opacity={0.6} />
          <path d="M6,44 C14,36 20,52 28,44 C36,36 42,52 50,44" fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" opacity={0.35} />
        </svg>
      );
    case "montagna":
      return (
        <svg viewBox="0 0 60 60" className="h-8 w-8" aria-hidden>
          <polygon points="8,46 22,20 30,32 38,14 52,46" fill={accent} opacity={0.85} />
          <polygon points="30,32 34,26 40,36 30,36" fill="#fff6df" opacity={0.7} />
        </svg>
      );
    case "geometrico":
    default:
      return (
        <svg viewBox="0 0 60 60" className="h-8 w-8" aria-hidden>
          <circle cx="30" cy="30" r="18" fill="none" stroke={accent} strokeWidth="1.4" opacity={0.8} />
          <polygon points="30,14 44,22 44,38 30,46 16,38 16,22" fill="none" stroke={accent} strokeWidth="1.4" />
          <circle cx="30" cy="30" r="4" fill={accent} />
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
        <NebulaBackdrop starCount={170} />

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
              className="group flex flex-col items-center gap-3 rounded-2xl px-2 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cosmic-gold/70"
              style={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY, transformStyle: "preserve-3d" }}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.97 }}
            >
              <span
                className="flex h-20 w-20 items-center justify-center rounded-full border transition-colors sm:h-24 sm:w-24"
                style={{
                  borderColor: `${journey.accent}55`,
                  background: `radial-gradient(circle at 35% 30%, ${journey.accent}33, rgba(7,4,15,0.7) 70%)`,
                  boxShadow: `0 0 30px ${journey.accentSoft}40`,
                  animation: "diamond-breathe 4.5s ease-in-out infinite",
                  animationDelay: `${JOURNEYS.indexOf(journey) * 0.4}s`,
                }}
              >
                <PathIcon id={journey.id} accent={journey.accent} />
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
