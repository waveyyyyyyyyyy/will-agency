import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ThemeBackdrop } from "./ThemeBackdrop";
import { TiltedBackdrop } from "./TiltedBackdrop";
import { getJourney, type JourneyId } from "./journeys";
import { setAmbientProfile, playSoftPing } from "./audio";
import { usePointerTilt } from "./usePointerTilt";

const PROFILE_BY_JOURNEY: Record<JourneyId, "cosmic" | "gems" | "mare" | "montagna" | "geometrico"> = {
  galassie: "cosmic",
  pietre: "gems",
  mare: "mare",
  montagna: "montagna",
  geometrico: "geometrico",
};

/**
 * Generic themed room for the four journeys that don't have their own
 * sub-junction (everything except "pietre"). What actually lives inside
 * each one is defined in a later pass — for now every path already has its
 * own graphic identity and its own ambient profile, exactly as asked.
 */
export function JourneyRoom({ journeyId }: { journeyId: JourneyId }) {
  const journey = getJourney(journeyId);
  const tilt = usePointerTilt(4);

  useEffect(() => {
    setAmbientProfile(PROFILE_BY_JOURNEY[journeyId]);
    playSoftPing();
  }, [journeyId]);

  if (!journey) return null;

  return (
    <section
      ref={tilt.ref}
      onPointerMove={tilt.onPointerMove}
      onPointerLeave={tilt.onPointerLeave}
      className="relative flex min-h-[100dvh] w-full items-center justify-center overflow-hidden bg-black"
      style={{ perspective: 1400 }}
    >
      <TiltedBackdrop rotateX={tilt.rotateX} rotateY={tilt.rotateY}>
        <ThemeBackdrop theme={journeyId} />
      </TiltedBackdrop>

      <motion.div
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY, transformStyle: "preserve-3d" }}
        className="relative z-10 mx-6 flex max-w-lg flex-col items-center rounded-3xl border px-10 py-14 text-center backdrop-blur-sm"
      >
        <div
          className="rounded-3xl border px-10 py-14"
          style={{ borderColor: `${journey.accent}55`, background: "rgba(7,4,15,0.5)" }}
        >
          <span
            className="font-display flex h-16 w-16 items-center justify-center rounded-full border text-2xl"
            style={{ borderColor: journey.accent, color: journey.accent, margin: "0 auto" }}
          >
            {journey.numeral}
          </span>
          <h1 className="font-display mt-6 text-2xl font-medium tracking-tight text-cosmic-star md:text-3xl">
            {journey.name}
          </h1>
          <p className="mt-2 text-sm italic text-cosmic-star/60">{journey.tagline}</p>
          <p className="mt-5 text-sm leading-relaxed text-cosmic-star/60">
            Questo sentiero è ancora in costruzione — l&apos;atmosfera, il suono e i colori sono già suoi: i
            contenuti arriveranno presto.
          </p>

          <Link
            to="/portale"
            className="mt-9 inline-flex items-center gap-2 rounded-full border px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] transition-colors"
            style={{ borderColor: `${journey.accent}80`, color: journey.accent }}
          >
            ← Torna al portale
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
