import { useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { NebulaBackdrop } from "./NebulaBackdrop";
import { setAmbientProfile } from "./audio";

const GEM_ROOMS: Record<string, { numeral: string; accent: string; label: string }> = {
  rubino: { numeral: "I", accent: "#d94566", label: "Rubino" },
  topazio: { numeral: "II", accent: "#e8c168", label: "Topazio" },
  smeraldo: { numeral: "III", accent: "#14a696", label: "Smeraldo" },
};

/**
 * Placeholder interior for a chosen gem — keeps the palette and mood of the
 * corridor/portal so the walkthrough reads as one continuous world. What
 * actually lives inside each room is defined in a later pass.
 */
export function GemRoom() {
  const { gemId } = useParams();
  const room = gemId ? GEM_ROOMS[gemId] : undefined;

  useEffect(() => {
    setAmbientProfile("gems");
  }, []);

  if (!room) return <Navigate to="/portale/pietre" replace />;

  return (
    <section className="relative flex min-h-[100dvh] w-full items-center justify-center overflow-hidden bg-black">
      <NebulaBackdrop starCount={110} />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(55% 50% at 50% 40%, ${room.accent}33 0%, transparent 70%)`,
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mx-6 flex max-w-lg flex-col items-center rounded-3xl border px-10 py-14 text-center backdrop-blur-sm"
        style={{ borderColor: `${room.accent}55`, background: "rgba(7,4,15,0.55)" }}
      >
        <span
          className="font-display flex h-16 w-16 items-center justify-center rounded-full border text-2xl"
          style={{ borderColor: room.accent, color: room.accent }}
        >
          {room.numeral}
        </span>
        <h1 className="font-display mt-6 text-2xl font-medium tracking-tight text-cosmic-star md:text-3xl">
          {room.label}
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-cosmic-star/60">
          Questa stanza della galleria è ancora avvolta nella nebulosa —
          i contenuti arriveranno presto.
        </p>

        <Link
          to="/portale/pietre"
          className="mt-9 inline-flex items-center gap-2 rounded-full border border-cosmic-gold/50 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-cosmic-gold transition-colors hover:bg-cosmic-gold/10"
        >
          ← Torna alle pietre
        </Link>
      </motion.div>
    </section>
  );
}
