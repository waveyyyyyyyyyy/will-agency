import { useState } from "react";
import { motion } from "framer-motion";
import { NebulaBackdrop } from "./NebulaBackdrop";

const ACK_KEY = "will-agency-journey-ack-v2";

export function hasAcknowledgedDisclaimer() {
  try {
    return Boolean(window.localStorage.getItem(ACK_KEY));
  } catch {
    return false;
  }
}

/**
 * Records the ISO timestamp of acceptance, not just a boolean flag — so
 * that, in case of dispute, there's a concrete date/time showing when this
 * visitor read and accepted the disclaimer, not merely that they did.
 */
function setAcknowledged() {
  try {
    window.localStorage.setItem(ACK_KEY, new Date().toISOString());
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
          Disclaimer di Salute, Sicurezza e Benessere
        </h1>

        <div className="mt-6 max-h-[42vh] space-y-4 overflow-y-auto pr-1 text-left text-sm leading-relaxed text-cosmic-star/75">
          <p>
            Questa applicazione è progettata esclusivamente per scopi di rilassamento, intrattenimento e benessere
            personale. <strong className="text-cosmic-star">Non è un dispositivo medico e non fornisce diagnosi,
            trattamenti o consulenze mediche.</strong>
          </p>

          <div>
            <p className="font-semibold text-cosmic-star/90">Avvertenza medica</p>
            <p className="mt-1">
              Nessun contenuto dell&apos;app deve essere inteso come sostituto del parere, della diagnosi o del
              trattamento di un medico o di un professionista della salute mentale. In caso di patologie, forti stati
              d&apos;ansia o disturbi della salute, consulta un medico qualificato.
            </p>
          </div>

          <div>
            <p className="font-semibold text-cosmic-star/90">Frequenze sonore ed epilessia</p>
            <p className="mt-1">
              Alcuni contenuti o frequenze sonore presenti nell&apos;app potrebbero non essere adatti a persone
              soggette ad epilessia, convulsioni o disturbi cardiaci. Se avverti vertigini, nausea o fastidio,
              interrompi immediatamente l&apos;ascolto.
            </p>
          </div>

          <div>
            <p className="font-semibold text-cosmic-star/90">Sicurezza alla guida</p>
            <p className="mt-1">
              <strong className="text-cosmic-star">Non utilizzare mai questa applicazione durante la guida di
              autoveicoli, l&apos;uso di macchinari pericolosi o in qualsiasi situazione che richieda la tua piena
              attenzione visiva o uditiva.</strong>
            </p>
          </div>

          <p>
            Utilizzando questa app, dichiari di aver letto, compreso e accettato i presenti termini e di assumerti la
            piena responsabilità del suo utilizzo.
          </p>
        </div>

        <label className="mt-8 flex cursor-pointer items-start gap-3 rounded-xl border border-cosmic-star/15 bg-black/30 p-4 text-left text-sm text-cosmic-star/85 transition-colors hover:border-cosmic-gold/40">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 accent-[#e8c168]"
          />
          Ho letto, compreso e accetto quanto sopra.
        </label>

        <button
          type="button"
          onClick={handleEnter}
          disabled={!checked}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-cosmic-gold px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-ink transition-all enabled:hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-30"
        >
          Accetto e Continuo
        </button>
      </motion.div>
    </section>
  );
}
