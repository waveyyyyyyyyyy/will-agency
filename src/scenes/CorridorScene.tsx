import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, animate, motion, useMotionValueEvent, useMotionValue } from "framer-motion";
import { WalkerFigure } from "./WalkerFigure";
import corridorImg from "../assets/corridor.jpg";

/**
 * The mosaic path traced through the corridor photo, in percent-of-frame
 * coordinates (the scene frame is locked to the photo's 3:2 aspect ratio so
 * these line up exactly regardless of viewport size). Point order runs from
 * the viewer's feet to the base of the diamond archway.
 */
const PATH_D = "M49.5,96 L56,88 L58.6,85 L63.5,75 L66.8,66 L60,57 L60.5,51";
const DIAMOND = { x: 62, y: 45 }; // percent-of-frame position of the diamond in the photo

const WALK_DURATION_S = 7; // brisk enough to feel alive, slow enough to feel deliberate
const FOOTSTEP_COUNT = 14; // one flash per footfall, ~0.5s cadence — a natural stride
const ZOOM_DURATION_S = 1.15;

type Footstep = { id: number; x: number; y: number; scale: number };

function scaleAt(t: number) {
  // perspective falloff: large near the viewer, small as the walker recedes toward the diamond
  return 1 - 0.72 * Math.pow(t, 0.6);
}

export function CorridorScene() {
  const navigate = useNavigate();
  const pathRef = useRef<SVGPathElement>(null);
  const progress = useMotionValue(0);
  const footstepId = useRef(0);
  const lastStep = useRef(-1);

  const [pos, setPos] = useState({ x: 49.5, y: 96, scale: 1 });
  const [footsteps, setFootsteps] = useState<Footstep[]>([]);
  const [walking, setWalking] = useState(true);
  const [walkComplete, setWalkComplete] = useState(false);
  const [activating, setActivating] = useState(false);

  useEffect(() => {
    const controls = animate(progress, 1, {
      duration: WALK_DURATION_S,
      ease: "easeInOut", // ease in from standstill, cruise, ease out on arrival
      onComplete: () => {
        setWalking(false);
        setWalkComplete(true);
      },
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useMotionValueEvent(progress, "change", (t) => {
    const path = pathRef.current;
    if (!path) return;
    const total = path.getTotalLength();
    const len = t * total;
    const p = path.getPointAtLength(len);
    const s = scaleAt(t);
    setPos({ x: p.x, y: p.y, scale: s });

    const step = Math.floor(t * FOOTSTEP_COUNT);
    if (step !== lastStep.current && t < 1) {
      lastStep.current = step;
      const side = step % 2 === 0 ? -1 : 1;
      footstepId.current += 1;
      const fx = p.x + side * 2.1 * s;
      const fy = p.y + 1.6 * s;
      const id = footstepId.current;
      setFootsteps((prev) => [...prev, { id, x: fx, y: fy, scale: s }]);
      setTimeout(() => {
        setFootsteps((prev) => prev.filter((f) => f.id !== id));
      }, 900);
    }
  });

  function handleDiamondClick() {
    if (!walkComplete || activating) return;
    setActivating(true);
  }

  return (
    <section className="relative flex min-h-[100dvh] w-full items-center justify-center overflow-hidden bg-black">
      <motion.div
        className="relative aspect-[3/2] max-h-[100dvh] w-full max-w-[177.8dvh]"
        animate={
          activating
            ? { scale: 7 }
            : { scale: 1 }
        }
        transition={{ duration: ZOOM_DURATION_S, ease: [0.7, 0, 0.9, 0.2] }}
        style={{ transformOrigin: `${DIAMOND.x}% ${DIAMOND.y}%` }}
        onAnimationComplete={() => {
          if (activating) navigate("/portale");
        }}
      >
        {/* background photo */}
        <motion.img
          src={corridorImg}
          alt="Galleria cosmica con soffitto a volta stellato e pavimento in marmo intarsiato, che conduce a un diamante luminoso"
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ scale: 1 }}
          animate={{ scale: 1.045 }}
          transition={{ duration: 26, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/25" />

        {/* hidden geometry used purely to sample the walking path */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full opacity-0"
          aria-hidden
        >
          <path ref={pathRef} d={PATH_D} fill="none" />
        </svg>

        {/* footstep tile flashes */}
        {footsteps.map((f) => (
          <span
            key={f.id}
            className="absolute rounded-full"
            style={{
              left: `${f.x}%`,
              top: `${f.y}%`,
              width: `${5.5 * f.scale}%`,
              height: `${3 * f.scale}%`,
              transform: "translate(-50%, -50%)",
              background:
                "radial-gradient(ellipse at center, rgba(217,69,102,0.95) 0%, rgba(232,193,104,0.55) 45%, transparent 75%)",
              animation: "footstep-glow 0.9s ease-out forwards",
              filter: "blur(0.5px)",
            }}
          />
        ))}

        {/* the walker */}
        <div
          className="absolute"
          style={{
            left: `${pos.x}%`,
            top: `${pos.y}%`,
            transform: `translate(-50%, -92%) scale(${pos.scale})`,
          }}
        >
          <WalkerFigure walking={walking} />
        </div>

        {/* diamond activation button */}
        <button
          type="button"
          aria-label="Attiva il diamante e apri il portale"
          onClick={handleDiamondClick}
          disabled={!walkComplete}
          className="absolute flex items-center justify-center rounded-full"
          style={{
            left: `${DIAMOND.x}%`,
            top: `${DIAMOND.y}%`,
            width: "11%",
            height: "17%",
            transform: "translate(-50%, -50%)",
            cursor: walkComplete ? "pointer" : "default",
          }}
        >
          <AnimatePresence>
            {walkComplete && !activating && (
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
          {walkComplete && !activating && (
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
      </motion.div>

      {/* brand mark, top-left — minimal chrome so the scene stays immersive */}
      <div className="pointer-events-none absolute left-6 top-6 z-10 text-xs font-medium uppercase tracking-[0.3em] text-cosmic-star/70 md:left-10 md:top-8">
        Will Marketing Agency
      </div>
    </section>
  );
}
