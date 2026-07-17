import { useState, type FormEvent } from "react";
import { Container, SectionLabel } from "../components/Container";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";

const CONTACT_EMAIL = "willagency2026@gmail.com";

export function Contatti() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const business = formData.get("business") as string;
    const message = formData.get("message") as string;

    const subject = encodeURIComponent(`Richiesta informazioni — ${business || name}`);
    const body = encodeURIComponent(
      `Nome: ${name}\nAttività: ${business}\n\nMessaggio:\n${message}`,
    );

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <>
      <PageHero
        label="Contatti"
        title="Parliamo del tuo brand."
        subtitle="Raccontaci la tua attività: rispondiamo entro 24 ore con una prima valutazione onesta, anche se non dovessimo essere la scelta giusta per te."
      />

      <section className="pb-32">
        <Container className="grid gap-14 md:grid-cols-[1fr_1.2fr] md:gap-20">
          <Reveal>
            <SectionLabel>Contatto diretto</SectionLabel>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-display mt-6 block text-2xl font-medium tracking-tight text-paper transition-colors hover:text-gold md:text-3xl"
            >
              {CONTACT_EMAIL}
            </a>

            <div className="mt-12 flex flex-col gap-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-bone">Dove operiamo</p>
                <p className="mt-2 text-sm text-smoke">Italia — lavoriamo con clienti in tutto il territorio nazionale.</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-bone">Tempi di risposta</p>
                <p className="mt-2 text-sm text-smoke">Entro 24 ore lavorative, sempre.</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-bone">Social</p>
                <div className="mt-3 flex gap-4 text-sm">
                  <a href="https://instagram.com/willmarketingagency" target="_blank" rel="noreferrer" className="text-paper hover:text-gold">
                    Instagram
                  </a>
                  <a href="https://tiktok.com/@willmarketingagency" target="_blank" rel="noreferrer" className="text-paper hover:text-gold">
                    TikTok
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form onSubmit={handleSubmit} className="rounded-3xl border border-line bg-surface p-8 md:p-10">
              <div className="grid gap-6 md:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm text-bone">
                  Nome e cognome
                  <input
                    required
                    name="name"
                    type="text"
                    placeholder="Mario Rossi"
                    className="rounded-xl border border-line bg-ink px-4 py-3.5 text-paper placeholder:text-smoke/60 outline-none transition-colors focus:border-gold"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm text-bone">
                  Nome attività
                  <input
                    required
                    name="business"
                    type="text"
                    placeholder="La tua azienda"
                    className="rounded-xl border border-line bg-ink px-4 py-3.5 text-paper placeholder:text-smoke/60 outline-none transition-colors focus:border-gold"
                  />
                </label>
              </div>

              <label className="mt-6 flex flex-col gap-2 text-sm text-bone">
                Raccontaci la tua situazione
                <textarea
                  required
                  name="message"
                  rows={5}
                  placeholder="Settore, obiettivi, canali attivi..."
                  className="resize-none rounded-xl border border-line bg-ink px-4 py-3.5 text-paper placeholder:text-smoke/60 outline-none transition-colors focus:border-gold"
                />
              </label>

              <button
                type="submit"
                className="mt-8 inline-flex w-full items-center justify-center gap-3 rounded-full bg-gold px-8 py-4 text-sm font-semibold uppercase tracking-[0.1em] text-ink transition-transform hover:scale-[1.02] active:scale-[0.98] md:w-auto"
              >
                Invia richiesta
                <span aria-hidden>→</span>
              </button>

              {sent && (
                <p className="mt-4 text-sm text-gold">
                  Si è aperto il tuo client email con la richiesta pronta — invia pure il messaggio.
                </p>
              )}
            </form>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
