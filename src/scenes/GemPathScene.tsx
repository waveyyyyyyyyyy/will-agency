import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { NebulaBackdrop } from "./NebulaBackdrop";
import { TiltedBackdrop } from "./TiltedBackdrop";
import { playSoftPing, playWhoosh, setAmbientProfile } from "./audio";
import { usePointerTilt } from "./usePointerTilt";

const GEMS = [
  { id: "rubino", numeral: "I", accent: "#d94566", tilt: -10, label: "Rubino" },
  { id: "topazio", numeral: "II", accent: "#e8c168", tilt: 0, label: "Topazio" },
  { id: "smeraldo", numeral: "III", accent: "#14a696", tilt: 10, label: "Smeraldo" },
] as const;

// A symmetric low-poly gem — table, two crown facets, two pavilion facets —
// shaded with per-facet opacity so light reads as coming from the upper left.
function GemStone({
  accent,
  numeral,
  label,
  tilt,
  isCenter,
  state,
  glintDelay,
}: {
  accent: string;
  numeral: string;
  label: string;
  tilt: number;
  isCenter: boolean;
  state: "idle" | "chosen" | "dimmed";
  glintDelay: number;
}) {
  return (
    <motion.div
      className="flex flex-col items-center"
      style={{ transformStyle: "preserve-3d" }}
      animate={
        state === "chosen"
          ? { scale: 1.16, opacity: 1 }
          : state === "dimmed"
            ? { scale: 0.92, opacity: 0.32 }
            : { scale: isCenter ? 1.08 : 1, opacity: 1 }
      }
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        style={{
          animation: state === "idle" ? `gem-idle-spin 7s ease-in-out ${glintDelay * 0.3}s infinite` : undefined,
          transformStyle: "preserve-3d",
        }}
      >
        <svg
          viewBox="0 0 120 170"
          width={isCenter ? 128 : 106}
          style={{ overflow: "visible", transform: `rotateZ(${tilt * 0.15}deg)` }}
          className="drop-shadow-[0_0_36px_var(--gem-shadow)]"
        >
          <defs>
            <linearGradient id={`gem-fill-${numeral}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fff6df" />
              <stop offset="50%" stopColor={accent} />
              <stop offset="100%" stopColor={accent} />
            </linearGradient>
          </defs>

          <g fill={`url(#gem-fill-${numeral})`} stroke="#fdf6e6" strokeOpacity={0.4} strokeWidth={0.6}>
            <polygon points="42,16 78,16 106,42 14,42" fillOpacity={1} />
            <polygon points="42,16 14,42 4,68" fillOpacity={0.92} />
            <polygon points="78,16 116,68 106,42" fillOpacity={0.66} />
            <polygon points="4,68 44,116 60,166" fillOpacity={0.85} />
            <polygon points="116,68 60,166 76,116" fillOpacity={0.55} />
          </g>

          {/* specular glint sweeping across the table facet */}
          <polygon
            points="48,20 58,20 44,38 34,38"
            fill="#fffaf0"
            style={{ animation: `gem-glint 5.5s ease-in-out ${glintDelay}s infinite` }}
          />
        </svg>
      </div>

      <span className="font-display mt-4 text-xl font-medium tracking-wide" style={{ color: accent }}>
        {label}
      </span>
      <span className="mt-1 text-[11px] uppercase tracking-[0.25em] text-cosmic-star/70">Sentiero {numeral}</span>
    </motion.div>
  );
}

/** Sub-junction for the "Pietre Preziose" path — the three gems the site started with. */
export function GemPathScene() {
  const navigate = useNavigate();
  const [chosen, setChosen] = useState<string | null>(null);
  const tilt = usePointerTilt(4);

  useEffect(() => {
    setAmbientProfile("gems");
    playSoftPing();
  }, []);

  function handleChoose(id: string) {
    if (chosen) return;
    setChosen(id);
    playWhoosh();
    setTimeout(() => navigate(`/portale/pietre/${id}`), 950);
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
          <NebulaBackdrop starCount={160} />
        </TiltedBackdrop>

        {/* entry flash, sells the "you just chose this path" continuity */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,250,235,0.95),rgba(232,193,104,0.3)_40%,transparent_72%)]"
        />

        {/* floor — glossy inlaid marble, echoing the corridor's mosaic */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%]"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, rgba(20,10,40,0.35) 22%, rgba(7,4,15,0.97) 100%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[34%] opacity-70"
          style={{
            background:
              "repeating-linear-gradient(96deg, rgba(217,69,102,0.32) 0 6%, rgba(76,42,143,0.3) 6% 12%, rgba(20,166,150,0.3) 12% 18%, rgba(232,193,104,0.16) 18% 20%)",
            maskImage:
              "linear-gradient(180deg, transparent, black 45%), radial-gradient(60% 100% at 50% 0%, black, transparent 85%)",
            maskComposite: "intersect",
            WebkitMaskImage: "linear-gradient(180deg, transparent, black 45%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[34%] opacity-50 mix-blend-screen"
          style={{
            background:
              "repeating-linear-gradient(96deg, transparent 0 9.7%, rgba(232,193,104,0.35) 9.7% 10%)",
            maskImage: "linear-gradient(180deg, transparent, black 55%)",
            WebkitMaskImage: "linear-gradient(180deg, transparent, black 55%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%]"
          style={{
            background: "radial-gradient(70% 60% at 50% 100%, rgba(255,255,255,0.08), transparent 70%)",
          }}
        />

        <div className="relative z-10 mb-16 max-w-xl text-center md:mb-20">
          <span className="text-xs font-medium uppercase tracking-[0.35em] text-cosmic-gold">Hai scelto le Pietre Preziose</span>
          <h1 className="font-display mt-5 text-balance text-3xl font-medium leading-[1.15] tracking-tight text-cosmic-star sm:text-4xl md:text-5xl">
            Tre gemme, tre soglie.
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-cosmic-star/60 md:text-base">
            Scegli la pietra da cui proseguire.
          </p>
        </div>

        <div
          className="relative z-10 flex items-end justify-center gap-10 sm:gap-16 md:gap-24"
          style={{ perspective: 1400, transformStyle: "preserve-3d" }}
        >
          {GEMS.map((gem, i) => (
            <motion.button
              key={gem.id}
              type="button"
              onClick={() => handleChoose(gem.id)}
              aria-label={`Entra nel sentiero ${gem.label}`}
              className="cursor-pointer rounded-2xl transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cosmic-gold/70"
              disabled={!!chosen}
              style={{
                rotateX: tilt.rotateX,
                rotateY: tilt.rotateY,
                transformStyle: "preserve-3d",
                ["--gem-shadow" as string]: `${gem.accent}55`,
              }}
              whileHover={{ scale: 1.05 }}
            >
              <GemStone
                accent={gem.accent}
                numeral={gem.numeral}
                label={gem.label}
                tilt={gem.tilt}
                isCenter={gem.id === "topazio"}
                state={chosen ? (chosen === gem.id ? "chosen" : "dimmed") : "idle"}
                glintDelay={i * 1.1}
              />
            </motion.button>
          ))}
        </div>

        {!chosen && (
          <Link
            to="/portale"
            className="relative z-10 mt-16 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-cosmic-star/50 transition-colors hover:text-cosmic-gold"
          >
            ← Torna al portale
          </Link>
        )}

        <AnimatePresence>
          {chosen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,rgba(255,250,235,0.95),transparent_70%)]"
            />
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
