import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, animate, motion, useMotionValue } from "framer-motion";
import corridorImg from "../assets/corridor.jpg";
import { playActivationChime, playWhoosh, setAmbientProfile, startFibonacciPulse, stopFibonacciPulse } from "./audio";
import { BackButton } from "./BackButton";
import { Sparks } from "./Sparks";
import { usePointerTilt } from "./usePointerTilt";

const DIAMOND = { x: 62, y: 45 }; // percent-of-frame position of the diamond in the photo — the glow is anchored right here
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
    startFibonacciPulse(); // present on this screen until the diamond is activated
    const t = window.setTimeout(() => {
      setReady(true);
      playActivationChime();
    }, REVEAL_DELAY_S * 1000);
    return () => {
      window.clearTimeout(t);
      stopFibonacciPulse();
    };
  }, []);

  function handleDiamondClick() {
    if (!ready || activating) return;
    setActivating(true);
    stopFibonacciPulse();
    playWhoosh();
    animate(scale, 7, {
      duration: ZOOM_DURATION_S,
      ease: [0.7, 0, 0.9, 0.2],
      onComplete: () => navigate("/scegli"),
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
        {/* background photo — a slow continuous Ken Burns drift keeps the
            gallery feeling alive even before the pointer moves */}
        <motion.div
          className="absolute inset-0 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src={corridorImg}
            alt="Galleria cosmica con soffitto a volta stellato e pavimento in marmo intarsiato, che conduce a un diamante luminoso"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ animation: "kenburns 30s ease-in-out infinite alternate" }}
          />
        </motion.div>

        {/* drifting starlight dust — extra life across the vault ceiling */}
        <Sparks count={45} className="opacity-70" />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/25" />

        {/* the diamond's radiance — anchored exactly on the gem itself */}
        <div
          className="pointer-events-none absolute mix-blend-screen"
          style={{
            left: `${DIAMOND.x}%`,
            top: `${DIAMOND.y}%`,
            width: "30%",
            height: "38%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "repeating-conic-gradient(from 0deg, rgba(255,250,235,0.4) 0deg 3deg, transparent 3deg 45deg)",
              opacity: ready ? 0.55 : 0.25,
              filter: "blur(7px)",
              animation: "spin-slow 46s linear infinite",
              transition: "opacity 1s ease",
            }}
          />
          <div
            className="absolute rounded-full"
            style={{
              inset: "24%",
              background:
                "radial-gradient(circle, rgba(255,250,235,0.75) 0%, rgba(232,193,104,0.4) 45%, transparent 75%)",
              animation: "diamond-breathe 3.2s ease-in-out infinite",
            }}
          />
        </div>

        {/* diamond activation button — invisible hit area, the light above
            already sells it. Sized generously for a finger, not just a
            mouse cursor, and touch-action keeps a tap from being eaten by
            a scroll/zoom gesture instead of registering as a click. */}
        <button
          type="button"
          aria-label="Attiva il diamante e apri il portale"
          onClick={handleDiamondClick}
          onTouchEnd={(e) => {
            // Some mobile browsers are slow to promote a tap to a synthetic
            // click on an element sitting inside animated 3D transforms —
            // handle the tap directly rather than waiting for it.
            e.preventDefault();
            handleDiamondClick();
          }}
          disabled={!ready}
          className="absolute rounded-full"
          style={{
            left: `${DIAMOND.x}%`,
            top: `${DIAMOND.y}%`,
            width: "20%",
            height: "26%",
            transform: "translate(-50%, -50%)",
            cursor: ready ? "pointer" : "default",
            touchAction: "manipulation",
          }}
        />

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

      <BackButton to="/" />

      {/* brand mark, top-left — minimal chrome so the scene stays immersive */}
      <div className="pointer-events-none absolute left-20 top-6 z-10 text-xs font-medium uppercase tracking-[0.35em] text-cosmic-star/70 md:left-24 md:top-8">
        Supernova
      </div>
    </section>
  );
}
