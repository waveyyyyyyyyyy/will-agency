import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, animate, motion, useMotionValue } from "framer-motion";
import corridorImg from "../assets/corridor.jpg";
import { playActivationChime, playWhoosh, setAmbientProfile } from "./audio";
import { usePointerTilt } from "./usePointerTilt";

const DIAMOND = { x: 62, y: 45 }; // percent-of-frame position of the diamond in the photo
const ZOOM_DURATION_S = 1.15; // the click-triggered dash through the diamond
const REVEAL_DELAY_S = 0.7; // brief settle on load before the diamond starts pulsing

export function CorridorScene() {
  const navigate = useNavigate();
  const scale = useMotionValue(1); // only moves on the click-through zoom
  const tilt = usePointerTilt(5);

  const [ready, setReady] = useState(false); // diamond active, pulsing, CTA shown
  const [activating, setActivating] = useState(false);

  useEffect(() => {
    setAmbientProfile("cosmic");
    const t = window.setTimeout(() => {
      setReady(true);
      playActivationChime();
    }, REVEAL_DELAY_S * 1000);
    return () => window.clearTimeout(t);
  }, []);

  function handleDiamondClick() {
    if (!ready || activating) return;
    setActivating(true);
    playWhoosh();
    animate(scale, 7, {
      duration: ZOOM_DURATION_S,
      ease: [0.7, 0, 0.9, 0.2],
      onComplete: () => navigate("/portale"),
    });
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
        className="relative aspect-[3/2] max-h-[100dvh] w-full max-w-[177.8dvh]"
        style={{
          scale,
          rotateX: tilt.rotateX,
          rotateY: tilt.rotateY,
          transformOrigin: `${DIAMOND.x}% ${DIAMOND.y}%`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* background photo */}
        <motion.img
          src={corridorImg}
          alt="Galleria cosmica con soffitto a volta stellato e pavimento in marmo intarsiato, che conduce a un diamante luminoso"
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/25" />

        {/* the diamond's own light breathing — a soft pulse behind the gem itself,
            starting almost immediately rather than waiting on a long sequence */}
        <div
          className="pointer-events-none absolute rounded-full mix-blend-screen"
          style={{
            left: `${DIAMOND.x}%`,
            top: `${DIAMOND.y}%`,
            width: "16%",
            height: "22%",
            transform: "translate(-50%, -50%)",
            background: "radial-gradient(circle, rgba(255,250,235,0.55) 0%, rgba(232,193,104,0.28) 45%, transparent 75%)",
            animation: "diamond-breathe 3.2s ease-in-out infinite",
          }}
        />

        {/* diamond activation button */}
        <button
          type="button"
          aria-label="Attiva il diamante e apri il portale"
          onClick={handleDiamondClick}
          disabled={!ready}
          className="absolute flex items-center justify-center rounded-full"
          style={{
            left: `${DIAMOND.x}%`,
            top: `${DIAMOND.y}%`,
            width: "11%",
            height: "17%",
            transform: "translate(-50%, -50%)",
            cursor: ready ? "pointer" : "default",
          }}
        >
          <AnimatePresence>
            {ready && !activating && (
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
          {ready && !activating && (
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
