import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import supernovaPosterWide from "../assets/supernova-poster-wide.jpg";
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
 *
 * The galaxy is framed as a distant "porthole" rather than an edge-to-edge
 * photo: a softly-vignetted, lens-shaped window floating in an open starlit
 * void, as if seen from farther back through a wide lens — smaller in the
 * frame, with generous dark space around it, instead of the tight crop used
 * before. The source photo (the same one supplied at the start of this
 * project) is cropped once, offline, to drop its own baked-in title/formula
 * band so it reads as pure galaxy art here; no image was generated or
 * repainted — see the chat note on why AI image editing isn't available in
 * this environment.
 */
export function IntroScene() {
  const navigate = useNavigate();
  const [aboutOpen, setAboutOpen] = useState(false);
  const tilt = usePointerTilt(6);

  return (
    <section
      ref={tilt.ref}
      onPointerMove={tilt.onPointerMove}
      onPointerLeave={tilt.onPointerLeave}
      className="relative flex min-h-[100dvh] w-full flex-col items-center overflow-y-auto overflow-x-hidden bg-black px-6 py-10 sm:py-14"
      style={{ perspective: 1200 }}
    >
      {/* the open void — starfield fills the whole scene, not just the porthole */}
      <div className="pointer-events-none fixed inset-0" style={{ transformStyle: "preserve-3d" }}>
        <motion.div
          className="absolute inset-0"
          style={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY, transformStyle: "preserve-3d", translateZ: 60 }}
        >
          <Sparks count={90} />
        </motion.div>
      </div>
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(76,42,143,0.25),transparent_60%)]" />

      {/* the galaxy, seen as if from farther away — a soft-edged porthole,
          not a full-bleed photo, so the "wide angle, more distance" reads
          as an actual composition choice rather than a filter */}
      <div className="relative z-10 mt-4 w-full max-w-[560px] sm:mt-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY, transformStyle: "preserve-3d" }}
          className="relative mx-auto aspect-[848/763] w-[78%] overflow-hidden rounded-[50%] border border-cosmic-star/10 sm:w-[70%]"
        >
          <img
            src={supernovaPosterWide}
            alt="Una spirale galattica di stelle e nebulose, vista da lontano come attraverso un obiettivo grandangolare"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ animation: "kenburns-distant 30s ease-in-out infinite alternate" }}
          />
          {/* lens vignette — the visual signature of a wide shot, and what
              keeps the porthole's edge from reading as a hard photo crop */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(circle, transparent 42%, rgba(3,1,8,0.85) 100%)" }}
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{ boxShadow: "inset 0 0 46px 10px rgba(0,0,0,0.55)" }}
          />
        </motion.div>
        {/* faint glass rim, like light catching the edge of the lens */}
        <div
          className="pointer-events-none absolute inset-0 mx-auto aspect-[848/763] w-[78%] rounded-[50%] sm:w-[70%]"
          style={{ boxShadow: "0 0 70px rgba(232,193,104,0.14)" }}
        />
      </div>

      <div className="relative z-10 mt-8 flex w-full max-w-xl flex-col items-center px-2 text-center sm:mt-10">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1
            className="font-display text-4xl font-medium tracking-tight text-cosmic-star sm:text-5xl"
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
          className="font-display mt-4 text-balance text-base tracking-wide text-cosmic-star/85 sm:text-lg"
          style={{ textShadow: "0 2px 16px rgba(0,0,0,0.7)" }}
        >
          {TAGLINE}
        </motion.p>

        <div className="mt-6 flex flex-col gap-2">
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
          className="mt-5 font-mono text-[11px] italic tracking-widest text-cosmic-star"
          aria-hidden
        >
          Ω₀ = ∮ ( Ψ • 𝕊ˣ ) dt
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 2.1 }}
          className="mt-9 flex flex-col items-center gap-4 pb-4"
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
