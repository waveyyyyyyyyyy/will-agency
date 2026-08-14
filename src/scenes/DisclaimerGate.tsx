import { useState } from "react";
import { motion } from "framer-motion";
import { NebulaBackdrop } from "./NebulaBackdrop";

const ACK_KEY = "will-agency-journey-ack-v1";

export function hasAcknowledgedDisclaimer() {
  try {
    return window.localStorage.getItem(ACK_KEY) === "1";
  } catch {
    return false;
  }
}

function setAcknowledged() {
  try {
    window.localStorage.setItem(ACK_KEY, "1");
  } catch {
    /* private browsing / storage disabled — the gate will just reappear next visit */
  }
}

/**
 * Full-screen consent gate shown once (persisted per browser) before the
 * immersive experience is allowed to mount — deliberately blocks rendering
 * the routes underneath rather than just overlaying them, so no timers,
 * audio or animations start before the visitor has actually read this.
 */
export function DisclaimerGate({ onAcknowledge }: { onAcknowledge: () => void }) {
  const [checked, setChecked] = useState(false);

  function handleEnter() {
    if (!checked) return;
    setAcknowledged();
    onAcknowledge();
  }

  return (
    <section className="relative flex min-h-[100dvh] w-full items-center justify-center overflow-hidden bg-black px-6 py-16">
      <NebulaBackdrop starCount={120} />

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-lg rounded-3xl border border-cosmic-gold/25 bg-black/55 p-8 text-center backdrop-blur-md sm:p-10"
      >
        <span className="text-xs font-medium uppercase tracking-[0.35em] text-cosmic-gold">Prima di varcare la soglia</span>

        <h1 className="font-display mt-5 text-balance text-2xl font-medium leading-[1.25] tracking-tight text-cosmic-star sm:text-3xl">
          Un momento di pausa, non una cura.
        </h1>

        <div className="mt-6 space-y-4 text-left text-sm leading-relaxed text-cosmic-star/75">
          <p>
            Will Marketing Agency ti accompagna in un&apos;esperienza di immagini, suoni e atmosfere pensata per un
            momento di pausa e di ascolto di sé.
          </p>
          <p>
            Non è, in nessun modo, un percorso terapeutico, una diagnosi o una cura: non sostituisce il lavoro di uno
            psicologo, di un medico o di un professionista specializzato. È pensata per affiancare, mai per
            sostituire.
          </p>
          <p>
            Se stai attraversando un momento difficile, parlane con una persona qualificata: è il gesto più
            importante che tu possa fare per te.
          </p>
        </div>

        <label className="mt-8 flex cursor-pointer items-start gap-3 rounded-xl border border-cosmic-star/15 bg-black/30 p-4 text-left text-sm text-cosmic-star/85 transition-colors hover:border-cosmic-gold/40">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 accent-[#e8c168]"
          />
          Ho letto e ne prendo atto.
        </label>

        <button
          type="button"
          onClick={handleEnter}
          disabled={!checked}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-cosmic-gold px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-ink transition-all enabled:hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-30"
        >
          Entra
        </button>
      </motion.div>
    </section>
  );
}
