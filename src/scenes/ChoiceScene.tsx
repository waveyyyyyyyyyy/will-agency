import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { NebulaBackdrop } from "./NebulaBackdrop";
import { TiltedBackdrop } from "./TiltedBackdrop";
import { playSoftPing, playWhoosh, setAmbientProfile } from "./audio";
import { BackButton } from "./BackButton";
import { usePointerTilt } from "./usePointerTilt";

const OPTIONS = [
  {
    id: "seleziona",
    title: "Seleziona il tuo percorso",
    body: "Scegli tra cinque ambientazioni — Viaggio Cosmico, Frattali di Luce, Flusso Marino, Sussurri della Natura, Geometria del Silenzio — e lasciati guidare.",
    accent: "#e8c168",
    path: "/portale",
  },
  {
    id: "personalizza",
    title: "Personalizza il tuo percorso",
    body: "Raccontaci di quale elemento vuoi prenderti cura: ti indicheremo noi il sentiero più adatto.",
    accent: "#9b7bdb",
    path: "/personalizza",
  },
] as const;

export function ChoiceScene() {
  const navigate = useNavigate();
  const tilt = usePointerTilt(3);

  useEffect(() => {
    setAmbientProfile("cosmic");
    playSoftPing();
  }, []);

  function handleChoose(path: string) {
    playWhoosh();
    setTimeout(() => navigate(path), 400);
  }

  return (
    <section
      ref={tilt.ref}
      onPointerMove={tilt.onPointerMove}
      onPointerLeave={tilt.onPointerLeave}
      className="relative flex min-h-[100dvh] w-full items-center justify-center overflow-hidden bg-black px-6"
      style={{ perspective: 1400 }}
    >
      <TiltedBackdrop rotateX={tilt.rotateX} rotateY={tilt.rotateY}>
        <NebulaBackdrop starCount={150} />
      </TiltedBackdrop>

      <BackButton to="/ingresso" />

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-3xl text-center"
      >
        <span className="text-xs font-medium uppercase tracking-[0.35em] text-cosmic-gold">Come vuoi iniziare?</span>
        <h1 className="font-display mt-5 text-balance text-3xl font-medium leading-[1.15] tracking-tight text-cosmic-star sm:text-4xl">
          Due modi di attraversare Supernova.
        </h1>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {OPTIONS.map((opt) => (
            <motion.button
              key={opt.id}
              type="button"
              onClick={() => handleChoose(opt.path)}
              style={{
                rotateX: tilt.rotateX,
                rotateY: tilt.rotateY,
                transformStyle: "preserve-3d",
                borderColor: `${opt.accent}45`,
                background: "rgba(7,4,15,0.5)",
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex flex-col items-start rounded-3xl border p-8 text-left backdrop-blur-sm transition-colors hover:bg-black/40"
            >
              <span className="font-display text-xl font-medium tracking-tight" style={{ color: opt.accent }}>
                {opt.title}
              </span>
              <p className="mt-3 text-sm leading-relaxed text-cosmic-star/65">{opt.body}</p>
              <span
                className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em]"
                style={{ color: opt.accent }}
              >
                Inizia <span aria-hidden>→</span>
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
