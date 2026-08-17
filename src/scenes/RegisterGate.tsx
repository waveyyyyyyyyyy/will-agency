import { useState } from "react";
import { motion } from "framer-motion";
import { NebulaBackdrop } from "./NebulaBackdrop";
import { saveClientRegistrationLocal } from "./clients";
import { hapticConfirm } from "./haptics";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+\d][\d\s]{6,}$/;

interface FormState {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

const EMPTY_FORM: FormState = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

function Field({
  label,
  type = "text",
  value,
  onChange,
  error,
  autoComplete,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  autoComplete?: string;
}) {
  return (
    <label className="block text-left">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-[0.1em] text-cosmic-star/60">{label}</span>
      <input
        type={type}
        value={value}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border bg-black/40 px-4 py-3 text-sm text-cosmic-star outline-none transition-colors focus:border-cosmic-gold/70"
        style={{ borderColor: error ? "#d94566" : "rgba(241,232,255,0.18)" }}
      />
      {error && <span className="mt-1 block text-xs text-[#e0698a]">{error}</span>}
    </label>
  );
}

/**
 * The very first screen of the whole experience — account creation, ahead
 * of the medical/safety disclaimer that already gates the immersive
 * walkthrough. Data is saved locally for now (see clients.ts): this
 * project has no backend/database connected yet. The password is
 * collected (so the flow already matches what real signup will need) but
 * is never written to storage — only kept in memory long enough to submit.
 */
export function RegisterGate({ onDone }: { onDone: () => void }) {
  const [mode, setMode] = useState<"register" | "login">("register");
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [medicalChecked, setMedicalChecked] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function set<K extends keyof FormState>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.firstName.trim()) next.firstName = "Campo obbligatorio.";
    if (!form.lastName.trim()) next.lastName = "Campo obbligatorio.";
    if (!EMAIL_RE.test(form.email.trim())) next.email = "Inserisci un'email valida.";
    if (!PHONE_RE.test(form.phone.trim())) next.phone = "Inserisci un numero di telefono valido.";
    if (form.password.length < 8) next.password = "Almeno 8 caratteri.";
    if (form.confirmPassword !== form.password) next.confirmPassword = "Le password non coincidono.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!privacyChecked || !medicalChecked) return;
    if (!validate()) return;

    const now = new Date().toISOString();
    saveClientRegistrationLocal({
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      username: form.username.trim() || `${form.firstName.trim()}.${form.lastName.trim()}`.toLowerCase(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      privacyConsentAt: now,
      medicalConsentAt: now,
    });
    hapticConfirm();
    setSubmitted(true);
    window.setTimeout(onDone, 900);
  }

  const canSubmit = privacyChecked && medicalChecked;

  return (
    <section className="relative flex min-h-[100dvh] w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-black px-6 py-14">
      <NebulaBackdrop starCount={110} />

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-lg rounded-3xl border border-cosmic-gold/25 bg-black/55 p-8 text-center backdrop-blur-md sm:p-10"
      >
        {submitted ? (
          <div className="py-10">
            <span className="text-4xl">✦</span>
            <h1 className="font-display mt-4 text-2xl font-medium text-cosmic-star">Benvenuto in Supernova</h1>
            <p className="mt-2 text-sm text-cosmic-star/60">Il tuo account è pronto.</p>
          </div>
        ) : (
          <>
            <span className="text-xs font-medium uppercase tracking-[0.35em] text-cosmic-gold">
              {mode === "register" ? "Crea il tuo account" : "Accedi"}
            </span>
            <h1 className="font-display mt-5 text-balance text-2xl font-medium leading-[1.25] tracking-tight text-cosmic-star sm:text-3xl">
              {mode === "register" ? "Prima di iniziare, presentati." : "Bentornato."}
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-cosmic-star/60">
              {mode === "register"
                ? "Qualche dato per creare il tuo profilo Supernova — nessuna password verrà mai condivisa."
                : "Accedi con le credenziali del tuo account."}
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              {mode === "register" && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="Nome" value={form.firstName} onChange={(v) => set("firstName", v)} error={errors.firstName} autoComplete="given-name" />
                  <Field label="Cognome" value={form.lastName} onChange={(v) => set("lastName", v)} error={errors.lastName} autoComplete="family-name" />
                </div>
              )}

              {mode === "register" && (
                <Field
                  label="Nome utente (opzionale)"
                  value={form.username}
                  onChange={(v) => set("username", v)}
                  autoComplete="username"
                />
              )}

              <Field label="Email" type="email" value={form.email} onChange={(v) => set("email", v)} error={errors.email} autoComplete="email" />

              {mode === "register" && (
                <Field label="Telefono" type="tel" value={form.phone} onChange={(v) => set("phone", v)} error={errors.phone} autoComplete="tel" />
              )}

              <Field
                label="Password"
                type="password"
                value={form.password}
                onChange={(v) => set("password", v)}
                error={errors.password}
                autoComplete={mode === "register" ? "new-password" : "current-password"}
              />

              {mode === "register" && (
                <Field
                  label="Conferma password"
                  type="password"
                  value={form.confirmPassword}
                  onChange={(v) => set("confirmPassword", v)}
                  error={errors.confirmPassword}
                  autoComplete="new-password"
                />
              )}

              {mode === "register" && (
                <div className="space-y-3 pt-2">
                  <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-cosmic-star/15 bg-black/30 p-4 text-left text-xs leading-relaxed text-cosmic-star/80 transition-colors hover:border-cosmic-gold/40">
                    <input
                      type="checkbox"
                      checked={privacyChecked}
                      onChange={(e) => setPrivacyChecked(e.target.checked)}
                      className="mt-0.5 h-4 w-4 shrink-0 accent-[#e8c168]"
                    />
                    <span>
                      Ho letto e accetto l&apos;informativa sulla privacy e il trattamento dei dati personali ai
                      sensi del Regolamento UE 2016/679 (GDPR).{" "}
                      <PrivacyDetails />
                    </span>
                  </label>

                  <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-cosmic-star/15 bg-black/30 p-4 text-left text-xs leading-relaxed text-cosmic-star/80 transition-colors hover:border-cosmic-gold/40">
                    <input
                      type="checkbox"
                      checked={medicalChecked}
                      onChange={(e) => setMedicalChecked(e.target.checked)}
                      className="mt-0.5 h-4 w-4 shrink-0 accent-[#e8c168]"
                    />
                    <span>
                      Dichiaro di aver compreso che Supernova <strong className="text-cosmic-star">non è un
                      dispositivo medico</strong> e non fornisce diagnosi, trattamenti o consulenze mediche — è
                      pensata esclusivamente per rilassamento e benessere personale. (I dettagli completi seguono
                      nella schermata successiva.)
                    </span>
                  </label>
                </div>
              )}

              <button
                type="submit"
                disabled={mode === "register" && !canSubmit}
                className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-cosmic-gold px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-ink transition-all enabled:hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-30"
              >
                {mode === "register" ? "Crea account" : "Accedi"}
              </button>
            </form>

            <button
              type="button"
              onClick={() => {
                setMode(mode === "register" ? "login" : "register");
                setErrors({});
              }}
              className="mt-6 text-xs font-semibold uppercase tracking-[0.15em] text-cosmic-star/50 transition-colors hover:text-cosmic-gold"
            >
              {mode === "register" ? "Hai già un account? Accedi" : "Non hai un account? Registrati"}
            </button>
          </>
        )}
      </motion.div>
    </section>
  );
}

/** Expandable full privacy notice — kept out of the main flow of text so the checkbox stays scannable. */
function PrivacyDetails() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen((v) => !v);
        }}
        className="font-semibold text-cosmic-gold underline-offset-2 hover:underline"
      >
        Leggi l&apos;informativa completa
      </button>
      {open && (
        <span className="mt-3 block space-y-2 rounded-lg border border-cosmic-star/10 bg-black/40 p-3 text-[11px] leading-relaxed text-cosmic-star/65">
          <span className="block">
            <strong className="text-cosmic-star/80">Titolare del trattamento:</strong> Will Agency [ragione sociale e
            sede da completare].
          </span>
          <span className="block">
            <strong className="text-cosmic-star/80">Dati raccolti:</strong> nome, cognome, nome utente, email,
            numero di telefono.
          </span>
          <span className="block">
            <strong className="text-cosmic-star/80">Finalità:</strong> creazione e gestione dell&apos;account,
            erogazione del servizio, comunicazioni relative all&apos;esperienza Supernova.
          </span>
          <span className="block">
            <strong className="text-cosmic-star/80">Base giuridica:</strong> consenso dell&apos;interessato (art.
            6.1.a GDPR).
          </span>
          <span className="block">
            <strong className="text-cosmic-star/80">Conservazione:</strong> per il tempo necessario a fornire il
            servizio o fino a revoca del consenso.
          </span>
          <span className="block">
            <strong className="text-cosmic-star/80">I tuoi diritti:</strong> accesso, rettifica, cancellazione,
            limitazione, portabilità e opposizione al trattamento, oltre al diritto di proporre reclamo al Garante
            per la Protezione dei Dati Personali. Per esercitarli: [email di contatto da completare].
          </span>
          <span className="block">I dati non vengono ceduti a terzi se non per finalità tecniche necessarie a erogare il servizio.</span>
          <span className="block italic text-cosmic-star/45">
            Nota: questo è un testo di base — va rivisto con un consulente privacy/legale prima dell&apos;uso con
            clienti reali.
          </span>
        </span>
      )}
    </>
  );
}
