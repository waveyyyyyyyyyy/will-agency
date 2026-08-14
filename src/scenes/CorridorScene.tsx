import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, animate, motion, useMotionValue, useMotionValueEvent } from "framer-motion";
import corridorImg from "../assets/corridor.jpg";

/**
 * The mosaic path traced through the corridor photo, in percent-of-frame
 * coordinates (the scene frame is locked to the photo's 3:2 aspect ratio so
 * these line up exactly regardless of viewport size). Point order runs from
 * the floor nearest the viewer to the base of the diamond archway — this is
 * the line a first-person camera would actually walk along.
 */
const PATH_D =
  "M49.5,96 C50.583,94.667 54.483,89.833 56,88 C57.517,86.167 57.350,87.167 58.6,85 C59.850,82.833 62.133,78.167 63.5,75 C64.867,71.833 67.383,69.000 66.8,66 C66.217,63.000 61.050,59.500 60,57 C58.950,54.500 60.417,52.000 60.5,51";
const DIAMOND = { x: 62, y: 45 }; // percent-of-frame position of the diamond in the photo

const APPROACH_DURATION_S = 6.5; // the walk itself — deliberate, not rushed
const APPROACH_SCALE = 1.42; // how much closer we've walked by the time we arrive
const ZOOM_DURATION_S = 1.15; // the click-triggered dash the rest of the way through the diamond
const BOB_PERIOD_S = APPROACH_DURATION_S / 8; // one footfall cycle — a natural, unhurried cadence
const BOB_ITERATIONS = 8; // whole number of cycles so the sway lands back on zero exactly at arrival

export function CorridorScene() {
  const navigate = useNavigate();
  const pathRef = useRef<SVGPathElement>(null);
  const progress = useMotionValue(0); // 0 → 1 across the approach, sampled along the real floor path
  const scale = useMotionValue(1); // shared by the approach dolly-in and the click-through zoom

  const [origin, setOrigin] = useState({ x: 49.5, y: 96 });
  const [arrived, setArrived] = useState(false);
  const [activating, setActivating] = useState(false);

  // The camera "walks" by continuously zooming toward a focal point that itself
  // travels along the floor's curve — not a straight cut to the diamond, so the
  // approach visibly follows the pavement's own bend, exactly like footsteps
  // tracing it would.
  useEffect(() => {
    const progressControls = animate(progress, 1, {
      duration: APPROACH_DURATION_S,
      ease: "easeInOut",
    });
    const scaleControls = animate(scale, APPROACH_SCALE, {
      duration: APPROACH_DURATION_S,
      ease: "easeInOut",
      onComplete: () => setArrived(true),
    });
    return () => {
      progressControls.stop();
      scaleControls.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useMotionValueEvent(progress, "change", (t) => {
    const path = pathRef.current;
    if (!path) return;
    const p = path.getPointAtLength(t * path.getTotalLength());
    setOrigin({ x: p.x, y: p.y });
  });

  function handleDiamondClick() {
    if (!arrived || activating) return;
    setActivating(true);
    animate(scale, 7, {
      duration: ZOOM_DURATION_S,
      ease: [0.7, 0, 0.9, 0.2],
      onComplete: () => navigate("/portale"),
    });
  }

  return (
    <section className="relative flex min-h-[100dvh] w-full items-center justify-center overflow-hidden bg-black">
      <motion.div
        className="relative aspect-[3/2] max-h-[100dvh] w-full max-w-[177.8dvh]"
        style={{ scale, transformOrigin: `${origin.x}% ${origin.y}%` }}
      >
        {/* footstep sway — a subtle head-bob riding on top of the dolly-zoom, the
            classic first-person "you are walking" cue. Runs for a whole number of
            cycles so it settles back to dead-centre exactly when we arrive. */}
        <div
          className="absolute inset-0"
          style={{
            animation: !arrived
              ? `camera-walk-bob ${BOB_PERIOD_S}s ease-in-out ${BOB_ITERATIONS} both`
              : "none",
          }}
        >
          {/* background photo */}
          <img
            src={corridorImg}
            alt="Galleria cosmica con soffitto a volta stellato e pavimento in marmo intarsiato, che conduce a un diamante luminoso"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/25" />

          {/* hidden geometry used purely to sample the floor path — never rendered */}
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full opacity-0"
            aria-hidden
          >
            <path ref={pathRef} d={PATH_D} fill="none" />
          </svg>

          {/* diamond activation button */}
          <button
            type="button"
            aria-label="Attiva il diamante e apri il portale"
            onClick={handleDiamondClick}
            disabled={!arrived}
            className="absolute flex items-center justify-center rounded-full"
            style={{
              left: `${DIAMOND.x}%`,
              top: `${DIAMOND.y}%`,
              width: "11%",
              height: "17%",
              transform: "translate(-50%, -50%)",
              cursor: arrived ? "pointer" : "default",
            }}
          >
            <AnimatePresence>
              {arrived && !activating && (
                <>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 rounded-full"
                    style={{
                      boxShadow: "0 0 40px 12px rgba(232,193,104,0.35)",
                      animation: "ring-pulse 2.2s ease-out infinite",
                      border: "1.5px solid rgba(232,193,104,0.65)",
                    }}
                  />
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 rounded-full"
                    style={{
                      boxShadow: "0 0 70px 22px rgba(232,193,104,0.22)",
                      animation: "ring-pulse 2.2s ease-out 0.5s infinite",
                      border: "1.5px solid rgba(232,193,104,0.4)",
                    }}
                  />
                </>
              )}
            </AnimatePresence>
          </button>

          {/* call to action copy */}
          <AnimatePresence>
            {arrived && !activating && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="pointer-events-none absolute left-1/2 top-[64%] w-[min(90%,420px)] -translate-x-1/2 text-center"
              >
                <p
                  className="font-display text-sm tracking-[0.08em] text-cosmic-star sm:text-base"
                  style={{
                    textShadow: "0 2px 18px rgba(0,0,0,0.85), 0 0 24px rgba(232,193,104,0.35)",
                    animation: "float-y 2.6s ease-in-out infinite",
                  }}
                >
                  Il diamante pulsa. <span className="text-cosmic-gold">Sfiora la luce</span> per aprire il portale.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* activation flash */}
          <AnimatePresence>
            {activating && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: ZOOM_DURATION_S * 0.7, delay: ZOOM_DURATION_S * 0.25 }}
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(circle at 62% 45%, rgba(255,250,235,0.95) 0%, rgba(232,193,104,0.6) 35%, transparent 70%)",
                }}
              />
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* brand mark, top-left — minimal chrome so the scene stays immersive */}
      <div className="pointer-events-none absolute left-6 top-6 z-10 text-xs font-medium uppercase tracking-[0.3em] text-cosmic-star/70 md:left-10 md:top-8">
        Will Marketing Agency
      </div>
    </section>
  );
}
