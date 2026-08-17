import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import supernovaPoster from "../assets/supernova-poster.jpg";
import { TiltedBackdrop } from "./TiltedBackdrop";
import { Sparks } from "./Sparks";
import { usePointerTilt } from "./usePointerTilt";

// The opening message, restyled but not rewritten into false medical/
// neurological claims — see the "i" panel and the disclaimer for why:
// this stays an evocative promise ("a reset of attention, breath and
// presence"), never a claim to literally recalibrate the nervous system.
const TAGLINE = "Un'esperienza d'élite, pensata per un reset di attenzione, respiro e presenza.";
const POINTS = ["Respiro ritrovato.", "Pensieri alleggeriti.", "Presenza piena.", "Il tuo nuovo ritmo, un passo alla volta."];

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

  return (
    <section
      ref={tilt.ref}
      onPointerMove={tilt.onPointerMove}
      onPointerLeave={tilt.onPointerLeave}
      className="relative flex min-h-[100dvh] w-full items-center justify-center overflow-hidden bg-black"
      style={{ perspective: 1200 }}
    >
      <TiltedBackdrop rotateX={tilt.rotateX} rotateY={tilt.rotateY} duration={22}>
        <motion.div
          className="absolute inset-0 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src={supernovaPoster}
            alt="Supernova — spirale cosmica di stelle e nebulose in movimento"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ animation: "kenburns 34s ease-in-out infinite alternate" }}
          />
        </motion.div>
      </TiltedBackdrop>

      {/* a closer plane of drifting starlight — moves slightly more than the
          poster itself under pointer tilt, the parallax cue that sells depth */}
      <div className="pointer-events-none absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
        <motion.div
          className="absolute inset-0"
          style={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY, transformStyle: "preserve-3d", translateZ: 60 }}
        >
          <Sparks count={70} />
        </motion.div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-black/50" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/55" />

      <div className="relative z-10 flex w-full max-w-xl flex-col items-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1
            className="font-display text-5xl font-medium tracking-tight text-cosmic-star sm:text-6xl"
            style={{ textShadow: "0 2px 24px rgba(0,0,0,0.8), 0 0 40px rgba(232,193,104,0.25)" }}
          >
            Supernova
          </h1>
          <span className="mt-2 block text-xs font-medium uppercase tracking-[0.4em] text-cosmic-gold/80">
            The Matrix Code
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-display mt-5 text-balance text-base tracking-wide text-cosmic-star/85 sm:text-lg"
          style={{ textShadow: "0 2px 16px rgba(0,0,0,0.7)" }}
        >
          {TAGLINE}
        </motion.p>

        <div className="mt-8 flex flex-col gap-2.5">
          {POINTS.map((line, i) => (
            <motion.p
              key={line}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + i * 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm tracking-[0.04em] text-cosmic-star/70"
              style={{
                textShadow: "0 2px 12px rgba(0,0,0,0.7)",
                animation: `float-y ${4.4 + i * 0.35}s ease-in-out ${1.4 + i * 0.3}s infinite`,
              }}
            >
              {line}
            </motion.p>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="mt-6 font-mono text-[11px] italic tracking-widest text-cosmic-star"
          aria-hidden
        >
          Ω₀ = ∮ ( Ψ • 𝕊ˣ ) dt
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 2.1 }}
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
    </section>
  );
}
