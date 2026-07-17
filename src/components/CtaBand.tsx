import { NavLink } from "react-router-dom";
import { Container } from "./Container";
import { Reveal } from "./Reveal";

export function CtaBand({
  eyebrow = "Pronti a partire",
  title = "Il tuo brand merita una strategia, non un profilo social a caso.",
  subtitle = "Analizziamo la tua situazione attuale e ti diciamo, senza giri di parole, cosa serve per crescere davvero.",
  ctaLabel = "Prenota una call gratuita",
}: {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
}) {
  return (
    <section className="relative overflow-hidden border-t border-line bg-surface py-28">
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full opacity-20 blur-[120px]"
        style={{ background: "radial-gradient(circle, #FFC107, transparent 70%)" }}
      />
      <Container className="relative text-center">
        <Reveal>
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-gold">{eyebrow}</span>
          <h2 className="font-display mx-auto mt-5 max-w-3xl text-balance text-4xl font-medium leading-[1.1] tracking-tight text-paper md:text-5xl">
            {title}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-balance text-base text-smoke">{subtitle}</p>
          <NavLink
            to="/contatti"
            className="mt-10 inline-flex items-center gap-3 rounded-full bg-gold px-8 py-4 text-sm font-semibold uppercase tracking-[0.1em] text-ink transition-transform hover:scale-[1.03] active:scale-[0.98]"
          >
            {ctaLabel}
            <span aria-hidden>→</span>
          </NavLink>
        </Reveal>
      </Container>
    </section>
  );
}
