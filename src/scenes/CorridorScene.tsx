import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, animate, motion, useMotionValueEvent, useMotionValue } from "framer-motion";
import corridorImg from "../assets/corridor.jpg";

/**
 * The mosaic path traced through the corridor photo, in percent-of-frame
 * coordinates (the scene frame is locked to the photo's 3:2 aspect ratio so
 * these line up exactly regardless of viewport size). Point order runs from
 * the floor nearest the viewer to the base of the diamond archway — this is
 * the same centerline the tiles sit along, verified against the photo.
 */
const PATH_D =
  "M49.5,96 C50.583,94.667 54.483,89.833 56,88 C57.517,86.167 57.350,87.167 58.6,85 C59.850,82.833 62.133,78.167 63.5,75 C64.867,71.833 67.383,69.000 66.8,66 C66.217,63.000 61.050,59.500 60,57 C58.950,54.500 60.417,52.000 60.5,51";
const DIAMOND = { x: 62, y: 45 }; // percent-of-frame position of the diamond in the photo

const N_TILES = 14; // discrete floor tiles that ignite in sequence
const STEP_S = 0.32; // pause between one tile catching light and the next — unhurried
const TILE_FADE_S = 0.65; // how long a single tile takes to bloom in
const SEQUENCE_S = (N_TILES - 1) * STEP_S + TILE_FADE_S; // ~5s end to end
const ZOOM_DURATION_S = 1.15;

type Tile = { key: number; d: string; coreWidth: number; glowWidth: number; delay: number };

function scaleAt(t: number) {
  // perspective falloff: tiles read large near the viewer, small as they recede toward the diamond
  return 1 - 0.72 * Math.pow(t, 0.6);
}

/** Samples a short arc of the real floor path centered on `frac`, so each tile hugs the exact curve of the mosaic instead of a straight guess. */
function buildTileSegment(path: SVGPathElement, totalLen: number, frac: number): string {
  const s = scaleAt(frac);
  const halfWindow = totalLen * 0.03 * (0.45 + s);
  const center = frac * totalLen;
  const start = Math.max(0, center - halfWindow);
  const end = Math.min(totalLen, center + halfWindow);
  const samples = 9;
  const pts = Array.from({ length: samples }, (_, i) => {
    const len = start + ((end - start) * i) / (samples - 1);
    const p = path.getPointAtLength(len);
    return `${p.x.toFixed(2)},${p.y.toFixed(2)}`;
  });
  return `M${pts.join(" L")}`;
}

export function CorridorScene() {
  const navigate = useNavigate();
  const pathRef = useRef<SVGPathElement>(null);
  const progress = useMotionValue(0);

  const [totalLen, setTotalLen] = useState(0);
  const [headPos, setHeadPos] = useState({ x: 49.5, y: 96, scale: 1 });
  const [sequenceComplete, setSequenceComplete] = useState(false);
  const [activating, setActivating] = useState(false);

  useEffect(() => {
    if (pathRef.current) setTotalLen(pathRef.current.getTotalLength());
  }, []);

  useEffect(() => {
    const controls = animate(progress, 1, {
      duration: SEQUENCE_S,
      ease: "easeInOut", // the light travels steadily — not rushed, not sluggish
      onComplete: () => setSequenceComplete(true),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useMotionValueEvent(progress, "change", (t) => {
    const path = pathRef.current;
    if (!path) return;
    const total = path.getTotalLength();
    const p = path.getPointAtLength(t * total);
    setHeadPos({ x: p.x, y: p.y, scale: scaleAt(t) });
  });

  const tiles = useMemo<Tile[]>(() => {
    const path = pathRef.current;
    if (!path || totalLen === 0) return [];
    return Array.from({ length: N_TILES }, (_, i) => {
      const frac = 0.05 + (i * (0.97 - 0.05)) / (N_TILES - 1);
      const s = scaleAt(frac);
      return {
        key: i,
        d: buildTileSegment(path, totalLen, frac),
        coreWidth: 0.9 + 2.6 * s,
        glowWidth: 2.4 + 5.4 * s,
        delay: i * STEP_S,
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalLen]);

  function handleDiamondClick() {
    if (!sequenceComplete || activating) return;
    setActivating(true);
  }

  return (
    <section className="relative flex min-h-[100dvh] w-full items-center justify-center overflow-hidden bg-black">
      <motion.div
        className="relative aspect-[3/2] max-h-[100dvh] w-full max-w-[177.8dvh]"
        animate={activating ? { scale: 7 } : { scale: 1 }}
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

        {/* hidden geometry used purely to sample the floor path — never rendered */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full opacity-0"
          aria-hidden
        >
          <path ref={pathRef} d={PATH_D} fill="none" />
        </svg>

        {/* tiles igniting in sequence toward the diamond — additive "screen" blend only
            brightens the real photographed marble, it never repaints the wrong colour,
            and every segment is sampled straight off the floor path so it can't stray
            onto the wall roundels above it. */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 h-full w-full mix-blend-screen"
          style={sequenceComplete ? { animation: "trail-breathe 4.5s ease-in-out infinite" } : undefined}
          aria-hidden
        >
          <defs>
            <filter id="tile-glow-blur" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="0.9" />
            </filter>
          </defs>
          {tiles.map((tile) => (
            <g key={tile.key}>
              <path
                d={tile.d}
                fill="none"
                stroke="#e8c168"
                strokeWidth={tile.glowWidth}
                strokeLinecap="round"
                filter="url(#tile-glow-blur)"
                opacity={0}
                style={{
                  animation: `tile-bloom-glow ${TILE_FADE_S}s ease-out ${tile.delay}s forwards`,
                }}
              />
              <path
                d={tile.d}
                fill="none"
                stroke="#fff6df"
                strokeWidth={tile.coreWidth}
                strokeLinecap="round"
                opacity={0}
                style={{
                  animation: `tile-bloom-core ${TILE_FADE_S}s ease-out ${tile.delay}s forwards`,
                }}
              />
            </g>
          ))}
        </svg>

        {/* the traveling light itself, bridging tile to tile as it heads for the diamond */}
        {!sequenceComplete && (
          <span
            className="pointer-events-none absolute rounded-full mix-blend-screen"
            style={{
              left: `${headPos.x}%`,
              top: `${headPos.y}%`,
              width: `${4.5 * headPos.scale}%`,
              height: `${2.6 * headPos.scale}%`,
              transform: "translate(-50%, -50%)",
              background: "radial-gradient(ellipse at center, rgba(255,246,223,0.95) 0%, rgba(232,193,104,0.5) 55%, transparent 80%)",
              filter: "blur(1px)",
            }}
          />
        )}

        {/* diamond activation button */}
        <button
          type="button"
          aria-label="Attiva il diamante e apri il portale"
          onClick={handleDiamondClick}
          disabled={!sequenceComplete}
          className="absolute flex items-center justify-center rounded-full"
          style={{
            left: `${DIAMOND.x}%`,
            top: `${DIAMOND.y}%`,
            width: "11%",
            height: "17%",
            transform: "translate(-50%, -50%)",
            cursor: sequenceComplete ? "pointer" : "default",
          }}
        >
          <AnimatePresence>
            {sequenceComplete && !activating && (
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
          {sequenceComplete && !activating && (
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
