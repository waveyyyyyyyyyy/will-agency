import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import supernovaPoster from "../assets/supernova-poster.jpg";
import { TiltedBackdrop } from "./TiltedBackdrop";
import { usePointerTilt } from "./usePointerTilt";

const TAGLINES = [
  "Un campo di luce, suono e quiete.",
  "Percorsi pensati per accompagnarti, non per sostituirti.",
  "Ogni sentiero ha il suo ritmo, il suo colore, il suo respiro.",
  "Un passo alla volta, verso un po' di calma.",
];

type Spark = { top: number; left: number; size: number; delay: number; duration: number };

function makeSparks(count: number): Spark[] {
  return Array.from({ length: count }, () => ({
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: 1 + Math.random() * 2.4,
    delay: Math.random() * 4,
    duration: 2.5 + Math.random() * 3,
  }));
}

/**
 * First screen after the consent gate — the "cover" of the experience.
 * The poster sits on its own tilt-responsive plane while a second, closer
 * plane of drifting starlight moves a little more with the pointer — real
 * parallax depth, not just a static photo, so it reads as the beginning of
 * a walk into the image rather than a flat picture with text over it.
 */
export function IntroScene() {
  const navigate = useNavigate();
  const [aboutOpen, setAboutOpen] = useState(false);
  const tilt = usePointerTilt(7);
  const sparks = useMemo(() => makeSparks(70), []);

  return (
    <section
      ref={tilt.ref}
      onPointerMove={tilt.onPointerMove}
      onPointerLeave={tilt.onPointerLeave}
      className="relative flex min-h-[100dvh] w-full items-center justify-center overflow-hidden bg-black"
      style={{ perspective: 1200 }}
    >
      <TiltedBackdrop rotateX={tilt.rotateX} rotateY={tilt.rotateY} duration={22}>
        <motion.img
          src={supernovaPoster}
          alt="Supernova — spirale cosmica di stelle e nebulose in movimento"
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        />
      </TiltedBackdrop>

      {/* a closer plane of drifting starlight — moves slightly more than the
          poster itself under pointer tilt, the parallax cue that sells depth */}
      <div className="pointer-events-none absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
        <motion.div
          className="absolute inset-0"
          style={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY, transformStyle: "preserve-3d", translateZ: 60 }}
        >
          {sparks.map((s, i) => (
            <span
              key={i}
              className="absolute rounded-full bg-cosmic-star mix-blend-screen"
              style={{
                top: `${s.top}%`,
                left: `${s.left}%`,
                width: s.size,
                height: s.size,
                animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
              }}
            />
          ))}
        </motion.div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-black/50" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/55" />

      <div className="relative z-10 flex w-full max-w-xl flex-col items-center px-6 text-center">
        <div className="mt-10 flex flex-col gap-4">
          {TAGLINES.map((line, i) => (
            <motion.p
              key={line}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 + i * 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-base tracking-wide text-cosmic-star/85 sm:text-lg"
              style={{ textShadow: "0 2px 16px rgba(0,0,0,0.7)" }}
            >
              {line}
            </motion.p>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 + TAGLINES.length * 0.28 + 0.2 }}
          className="mt-12 flex flex-col items-center gap-4"
        >
          <button
            type="button"
            onClick={() => navigate("/ingresso")}
            className="inline-flex items-center gap-2 rounded-full bg-cosmic-gold px-9 py-3.5 text-sm font-semibold uppercase tracking-[0.15em] text-ink transition-transform hover:scale-[1.03] active:scale-[0.98]"
          >
            Continua
            <span aria-hidden>→</span>
          </button>

          <button
            type="button"
            onClick={() => setAboutOpen(true)}
            aria-label="Cos'è Supernova"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-cosmic-star/30 text-xs font-semibold text-cosmic-star/70 transition-colors hover:border-cosmic-gold hover:text-cosmic-gold"
          >
            i
          </button>
        </motion.div>
      </div>

      <AnimatePresence>
        {aboutOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 flex items-end justify-center bg-black/70 p-4 backdrop-blur-sm sm:items-center"
            onClick={() => setAboutOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[80dvh] w-full max-w-lg overflow-y-auto rounded-3xl border border-cosmic-gold/25 bg-black/85 p-8 text-left backdrop-blur-md sm:p-10"
            >
              <div className="flex items-start justify-between gap-4">
                <h2 className="font-display text-xl font-medium tracking-tight text-cosmic-star sm:text-2xl">
                  Cos&apos;è Supernova
                </h2>
                <button
                  type="button"
                  onClick={() => setAboutOpen(false)}
                  aria-label="Chiudi"
                  className="shrink-0 text-lg text-cosmic-star/60 transition-colors hover:text-cosmic-gold"
                >
                  ✕
                </button>
              </div>

              <div className="mt-5 space-y-4 text-sm leading-relaxed text-cosmic-star/75">
                <p>
                  Supernova è uno spazio di pausa: immagini, luce e suoni pensati per accompagnarti in un momento di
                  respiro e ascolto di sé.
                </p>
                <p>
                  Non è un dispositivo medico né un trattamento — è un&apos;esperienza sensoriale, un&apos;atmosfera
                  costruita con cura per aiutarti a rallentare, orientarti e ritrovare un po&apos; di calma, un passo
                  alla volta.
                </p>
                <p>
                  Ogni percorso ha un suo colore, un suo suono, un suo ritmo: strumenti semplici pensati per
                  affiancarti, mai per sostituire l&apos;aiuto di una persona qualificata quando ne hai bisogno.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pointer-events-none absolute left-6 top-6 z-10 text-xs font-medium uppercase tracking-[0.3em] text-cosmic-star/50 md:left-10 md:top-8">
        Supernova <span className="text-cosmic-star/30">— The Matrix Code</span>
      </div>
    </section>
  );
}
