import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ThemeBackdrop } from "./ThemeBackdrop";
import { TiltedBackdrop } from "./TiltedBackdrop";
import { getJourney, type JourneyId } from "./journeys";
import { PROTOCOLS } from "./protocols";
import { setAmbientProfile, playSoftPing } from "./audio";
import { usePointerTilt } from "./usePointerTilt";
import journeyMontagnaCover from "../assets/journey-montagna-cover.jpg";

const PROFILE_BY_JOURNEY: Record<JourneyId, "cosmic" | "gems" | "mare" | "montagna" | "geometrico"> = {
  galassie: "cosmic",
  pietre: "gems",
  mare: "mare",
  montagna: "montagna",
  geometrico: "geometrico",
};

// Journeys with a real supplied cover photo — shown as a round portrait in
// place of the roman-numeral badge. Add the rest here as their photos
// arrive; the numeral badge is the fallback for anything not listed.
const JOURNEY_COVER: Partial<Record<JourneyId, string>> = {
  montagna: journeyMontagnaCover,
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

  const cover = JOURNEY_COVER[journeyId];

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
          {cover ? (
            <div
              className="mx-auto h-24 w-24 overflow-hidden rounded-full border-2"
              style={{ borderColor: journey.accent, boxShadow: `0 0 30px ${journey.accentSoft}70` }}
            >
              <img src={cover} alt="" aria-hidden className="h-full w-full object-cover" />
            </div>
          ) : (
            <span
              className="font-display flex h-16 w-16 items-center justify-center rounded-full border text-2xl"
              style={{ borderColor: journey.accent, color: journey.accent, margin: "0 auto" }}
            >
              {journey.numeral}
            </span>
          )}
          <h1 className="font-display mt-6 text-2xl font-medium tracking-tight text-cosmic-star md:text-3xl">
            {journey.name}
          </h1>
          <p className="mt-2 text-sm italic text-cosmic-star/60">{journey.tagline}</p>
          <p className="mt-5 text-sm leading-relaxed text-cosmic-star/60">
            Questo sentiero è ancora in costruzione — l&apos;atmosfera, il suono e i colori sono già suoi: i
            contenuti arriveranno presto.
          </p>

          <div className="mt-8 grid gap-3 text-left">
            <span className="text-center text-[11px] font-semibold uppercase tracking-[0.25em] text-cosmic-star/45">
              I protocolli di questo percorso
            </span>
            {PROTOCOLS[journeyId].map((protocol) => (
              <div
                key={protocol.name}
                className="rounded-2xl border px-4 py-3"
                style={{ borderColor: `${journey.accent}30`, background: "rgba(7,4,15,0.4)" }}
              >
                <span className="font-display block text-sm font-medium" style={{ color: journey.accent }}>
                  {protocol.name}
                </span>
                <span className="mt-0.5 block text-xs leading-snug text-cosmic-star/55">{protocol.focus}</span>
              </div>
            ))}
          </div>

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
