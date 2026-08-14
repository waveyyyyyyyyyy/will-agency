import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { NebulaBackdrop } from "./NebulaBackdrop";
import { playSoftPing, playWhoosh } from "./audio";

const DOORS = [
  { id: "sinistra", numeral: "I", accent: "#d94566", tilt: -9, label: "Primo Sentiero" },
  { id: "centro", numeral: "II", accent: "#e8c168", tilt: 0, label: "Secondo Sentiero" },
  { id: "destra", numeral: "III", accent: "#14a696", tilt: 9, label: "Terzo Sentiero" },
] as const;

function DoorArch({
  accent,
  numeral,
  label,
  tilt,
  isCenter,
  state,
}: {
  accent: string;
  numeral: string;
  label: string;
  tilt: number;
  isCenter: boolean;
  state: "idle" | "chosen" | "dimmed";
}) {
  return (
    <motion.div
      className="flex flex-col items-center"
      style={{ transformStyle: "preserve-3d" }}
      animate={
        state === "chosen"
          ? { scale: 1.14, rotateY: 0, opacity: 1 }
          : state === "dimmed"
            ? { scale: 0.94, opacity: 0.35, rotateY: tilt }
            : { scale: isCenter ? 1.05 : 1, opacity: 1, rotateY: tilt }
      }
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <svg
        viewBox="0 0 120 190"
        width={isCenter ? 168 : 140}
        style={{ overflow: "visible" }}
        className="drop-shadow-[0_0_40px_rgba(0,0,0,0.55)]"
      >
        <defs>
          <linearGradient id={`gold-${numeral}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f3dfa0" />
            <stop offset="100%" stopColor="#b6862c" />
          </linearGradient>
          <radialGradient id={`glow-${numeral}`} cx="50%" cy="38%" r="65%">
            <stop offset="0%" stopColor={accent} stopOpacity="0.9" />
            <stop offset="55%" stopColor={accent} stopOpacity="0.35" />
            <stop offset="100%" stopColor={accent} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* receding arch rings, echoing the corridor's nested archways */}
        <path
          d="M60 -6 C14 -6 -2 32 -2 74 L-2 178"
          fill="none"
          stroke={`url(#gold-${numeral})`}
          strokeWidth={1}
          opacity={0.22}
        />
        <path
          d="M60 4 C20 4 6 38 6 76 L6 178"
          fill="none"
          stroke={`url(#gold-${numeral})`}
          strokeWidth={1}
          opacity={0.34}
        />
        <path
          d="M60 -6 C106 -6 122 32 122 74 L122 178"
          fill="none"
          stroke={`url(#gold-${numeral})`}
          strokeWidth={1}
          opacity={0.22}
        />
        <path
          d="M60 4 C100 4 114 38 114 76 L114 178"
          fill="none"
          stroke={`url(#gold-${numeral})`}
          strokeWidth={1}
          opacity={0.34}
        />

        {/* portal glow */}
        <path
          d="M60 14 C24 14 12 44 12 78 L12 178 L108 178 L108 78 C108 44 96 14 60 14 Z"
          fill={`url(#glow-${numeral})`}
          className="animate-pulse"
          style={{ animationDuration: "3.4s" }}
        />

        {/* frosted door leaf */}
        <path
          d="M60 22 C30 22 20 48 20 78 L20 172 L100 172 L100 78 C100 48 90 22 60 22 Z"
          fill="rgba(10,6,24,0.55)"
          stroke={`url(#gold-${numeral})`}
          strokeWidth={2.4}
        />

        {/* filigree mullions */}
        <path d="M60 22 L60 172 M20 96 L100 96" stroke={`url(#gold-${numeral})`} strokeWidth={0.9} opacity={0.55} />
        <circle cx={60} cy={58} r={9} fill="none" stroke={`url(#gold-${numeral})`} strokeWidth={0.9} opacity={0.6} />

        {/* base marble step */}
        <path d="M8 178 L112 178 L118 190 L2 190 Z" fill="rgba(10,6,24,0.7)" stroke={accent} strokeOpacity={0.5} strokeWidth={1} />
      </svg>

      <span className="font-display mt-4 text-2xl font-medium tracking-wide" style={{ color: accent }}>
        {numeral}
      </span>
      <span className="mt-1 text-[11px] uppercase tracking-[0.25em] text-cosmic-star/70">{label}</span>
    </motion.div>
  );
}

export function GateScene() {
  const navigate = useNavigate();
  const [chosen, setChosen] = useState<string | null>(null);

  useEffect(() => {
    playSoftPing();
  }, []);

  function handleChoose(id: string) {
    if (chosen) return;
    setChosen(id);
    playWhoosh();
    setTimeout(() => navigate(`/portale/${id}`), 950);
  }

  return (
    <section className="relative flex min-h-[100dvh] w-full items-center justify-center overflow-hidden bg-black">
      <motion.div
        initial={{ scale: 1.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center px-6 py-24"
      >
        <NebulaBackdrop starCount={160} />

        {/* entry flash, sells the "arrived through the diamond" continuity */}
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
        {/* gloss sheen + gold seams over the floor */}
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
          <span className="text-xs font-medium uppercase tracking-[0.35em] text-cosmic-gold">Il diamante ti ha condotto qui</span>
          <h1 className="font-display mt-5 text-balance text-3xl font-medium leading-[1.15] tracking-tight text-cosmic-star sm:text-4xl md:text-5xl">
            Il portale si apre in tre vie.
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-cosmic-star/60 md:text-base">
            Scegli il sentiero da attraversare.
          </p>
        </div>

        <div
          className="relative z-10 flex items-end justify-center gap-8 sm:gap-14 md:gap-20"
          style={{ perspective: 1400 }}
        >
          {DOORS.map((door) => (
            <button
              key={door.id}
              type="button"
              onClick={() => handleChoose(door.id)}
              aria-label={`Entra nel ${door.label}`}
              className="cursor-pointer transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cosmic-gold/70 rounded-2xl"
              disabled={!!chosen}
            >
              <DoorArch
                accent={door.accent}
                numeral={door.numeral}
                label={door.label}
                tilt={door.tilt}
                isCenter={door.id === "centro"}
                state={chosen ? (chosen === door.id ? "chosen" : "dimmed") : "idle"}
              />
            </button>
          ))}
        </div>

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
