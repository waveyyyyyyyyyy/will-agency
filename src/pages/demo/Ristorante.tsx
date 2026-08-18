import { useState, type FormEvent, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Container } from "../../components/Container";
import { Reveal, RevealGroup, revealItem } from "../../components/Reveal";
import {
  restaurantInfo,
  openingHours,
  stats,
  menu,
  gallery,
  testimonials,
} from "../../data/restaurantDemoContent";
import "../../styles/restaurant-demo.css";

// ---------------------------------------------------------------------------
// Template dimostrativo: "Ristorante La Quercia" è un locale di fantasia,
// creato da Will Marketing Agency per mostrare ai potenziali clienti come
// potrebbe apparire il sito di un ristorante vero. Nessun dato reale, nessun
// invio effettivo dei moduli qui presenti.
// ---------------------------------------------------------------------------

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill={filled ? "var(--r-gold)" : "none"} stroke="var(--r-gold)" strokeWidth={1}>
      <path
        d="M10 1.6l2.55 5.17 5.7.83-4.13 4.02.98 5.68L10 14.6l-5.1 2.7.98-5.68L1.75 7.6l5.7-.83L10 1.6z"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LeafIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.2}>
      <path d="M4 20c8-1 13-6 15-15-9 1-14 6-15 15z" />
      <path d="M6.5 17.5C10 14 13 11 17 7.5" />
    </svg>
  );
}

function RSectionLabel({ children }: { children: ReactNode }) {
  return (
    <span
      className="text-xs font-semibold uppercase tracking-[0.3em]"
      style={{ color: "var(--r-rust)" }}
    >
      {children}
    </span>
  );
}

function DemoBanner() {
  return (
    <div className="relative z-[70] flex flex-col items-center justify-center gap-1.5 bg-ink px-4 py-3 text-center sm:flex-row sm:gap-4">
      <p className="text-xs leading-snug text-bone sm:text-[13px]">
        <span className="font-semibold text-gold">Template dimostrativo</span> — così potrebbe
        essere il sito del tuo ristorante, realizzato da Will Marketing Agency.
      </p>
      <Link
        to="/contatti"
        className="inline-flex items-center gap-1.5 whitespace-nowrap text-xs font-semibold uppercase tracking-[0.08em] text-gold underline underline-offset-4 hover:text-paper sm:text-[13px]"
      >
        Voglio un sito così →
      </Link>
    </div>
  );
}

function RNav() {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "#chi-siamo", label: "Chi siamo" },
    { href: "#menu", label: "Menu" },
    { href: "#galleria", label: "Galleria" },
    { href: "#recensioni", label: "Recensioni" },
    { href: "#prenota", label: "Contatti" },
  ];

  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur-md"
      style={{ borderColor: "var(--r-line)", backgroundColor: "rgba(23,19,15,0.85)" }}
    >
      <Container className="flex h-[74px] items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5">
          <span
            className="flex h-9 w-9 items-center justify-center rounded-full border"
            style={{ borderColor: "var(--r-gold)", color: "var(--r-gold)" }}
          >
            <LeafIcon className="h-4 w-4" />
          </span>
          <span className="rd-display text-xl font-semibold tracking-tight" style={{ color: "var(--r-cream)" }}>
            {restaurantInfo.name}
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[13px] font-medium uppercase tracking-[0.1em] transition-colors"
              style={{ color: "var(--r-cream-dim)" }}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#prenota"
          className="hidden rounded-full px-5 py-2.5 text-[13px] font-semibold uppercase tracking-[0.08em] transition-transform hover:scale-[1.03] lg:inline-flex"
          style={{ backgroundColor: "var(--r-rust)", color: "var(--r-cream)" }}
        >
          Prenota un tavolo
        </a>

        <button
          aria-label="Apri menu"
          className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="h-px w-6 transition-transform" style={{ backgroundColor: "var(--r-cream)" }} />
          <span className="h-px w-6 transition-transform" style={{ backgroundColor: "var(--r-cream)" }} />
        </button>
      </Container>

      {open && (
        <div className="border-t lg:hidden" style={{ borderColor: "var(--r-line)" }}>
          <Container className="flex flex-col gap-1 py-5">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b py-3.5 text-base"
                style={{ borderColor: "var(--r-line)", color: "var(--r-cream)" }}
              >
                {l.label}
              </a>
            ))}
            <a
              href="#prenota"
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex items-center justify-center rounded-full px-5 py-3.5 text-sm font-semibold uppercase tracking-[0.08em]"
              style={{ backgroundColor: "var(--r-rust)", color: "var(--r-cream)" }}
            >
              Prenota un tavolo
            </a>
          </Container>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pb-24 pt-24 md:pb-32 md:pt-32">
      <div
        className="pointer-events-none absolute -top-32 left-1/2 h-[460px] w-[820px] -translate-x-1/2 rounded-full opacity-25 blur-[130px]"
        style={{ background: "radial-gradient(circle, var(--r-rust), transparent 70%)" }}
      />
      <div className="rd-texture pointer-events-none absolute inset-0 opacity-40" />
      <Container className="relative text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center"
        >
          <span style={{ color: "var(--r-gold)" }}>
            <LeafIcon className="h-8 w-8" />
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 text-xs font-semibold uppercase tracking-[0.35em]"
          style={{ color: "var(--r-rust)" }}
        >
          {restaurantInfo.address}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          className="rd-display mx-auto mt-6 max-w-3xl text-balance text-5xl font-semibold leading-[1.08] tracking-tight md:text-7xl"
          style={{ color: "var(--r-cream)" }}
        >
          {restaurantInfo.fullName}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-6 max-w-xl text-balance text-lg"
          style={{ color: "var(--r-cream-dim)" }}
        >
          {restaurantInfo.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.36, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#prenota"
            className="inline-flex items-center gap-3 rounded-full px-8 py-4 text-sm font-semibold uppercase tracking-[0.1em] transition-transform hover:scale-[1.03] active:scale-[0.98]"
            style={{ backgroundColor: "var(--r-rust)", color: "var(--r-cream)" }}
          >
            Prenota un tavolo
          </a>
          <a
            href="#menu"
            className="inline-flex items-center gap-2 border-b pb-1 text-sm font-medium transition-colors"
            style={{ borderColor: "var(--r-line)", color: "var(--r-cream)" }}
          >
            Sfoglia il menu
          </a>
        </motion.div>
      </Container>
    </section>
  );
}

function About() {
  return (
    <section id="chi-siamo" className="border-y py-24 md:py-32" style={{ borderColor: "var(--r-line)", backgroundColor: "var(--r-bg-soft)" }}>
      <Container>
        <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <Reveal>
            <RSectionLabel>La nostra storia</RSectionLabel>
            <h2 className="rd-display mt-5 text-balance text-3xl font-semibold leading-tight md:text-4xl" style={{ color: "var(--r-cream)" }}>
              Tradizione di famiglia, ogni giorno in tavola.
            </h2>
            <p className="mt-6 text-[15px] leading-relaxed" style={{ color: "var(--r-cream-dim)" }}>
              {restaurantInfo.fullName} nasce dalla passione per la cucina del territorio: ricette
              tramandate in famiglia, ingredienti scelti ogni mattina dai produttori locali e un
              servizio pensato per far sentire ogni ospite a casa.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed" style={{ color: "var(--r-cream-dim)" }}>
              In cucina, gesti antichi incontrano un tocco contemporaneo: la pasta è fatta a mano
              ogni giorno, il pane esce dal forno poche ore prima di arrivare al tavolo, e ogni
              piatto racconta una storia del territorio.
            </p>
          </Reveal>

          <RevealGroup className="grid grid-cols-2 gap-8">
            {stats.map((s) => (
              <motion.div key={s.label} variants={revealItem} className="border-t pt-5" style={{ borderColor: "var(--r-rust)" }}>
                <p className="rd-display text-3xl font-semibold md:text-4xl" style={{ color: "var(--r-gold)" }}>
                  {s.value}
                </p>
                <p className="mt-2 text-sm leading-snug" style={{ color: "var(--r-cream-dim)" }}>
                  {s.label}
                </p>
              </motion.div>
            ))}
          </RevealGroup>
        </div>
      </Container>
    </section>
  );
}

function MenuSection() {
  const [active, setActive] = useState(menu[0].category);
  const activeMenu = menu.find((m) => m.category === active) ?? menu[0];

  return (
    <section id="menu" className="py-24 md:py-32">
      <Container>
        <Reveal className="text-center">
          <RSectionLabel>Il menu</RSectionLabel>
          <h2 className="rd-display mx-auto mt-5 max-w-xl text-balance text-3xl font-semibold leading-tight md:text-4xl" style={{ color: "var(--r-cream)" }}>
            Piatti stagionali, preparati ogni giorno.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm" style={{ color: "var(--r-cream-dim)" }}>
            Una selezione: il menu completo cambia con la stagione e la disponibilità del mercato.
          </p>
        </Reveal>

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {menu.map((m) => (
            <button
              key={m.category}
              onClick={() => setActive(m.category)}
              className="rounded-full border px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] transition-colors"
              style={
                active === m.category
                  ? { backgroundColor: "var(--r-rust)", borderColor: "var(--r-rust)", color: "var(--r-cream)" }
                  : { borderColor: "var(--r-line)", color: "var(--r-cream-dim)" }
              }
            >
              {m.category}
            </button>
          ))}
        </div>

        <motion.div
          key={active}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-12 grid max-w-3xl gap-x-10 gap-y-8 sm:grid-cols-2"
        >
          {activeMenu.items.map((item) => (
            <div key={item.name}>
              <div className="flex items-baseline justify-between gap-3">
                <span className="rd-display text-lg font-medium" style={{ color: "var(--r-cream)" }}>
                  {item.name}
                </span>
                <span className="rd-display shrink-0 text-lg font-medium" style={{ color: "var(--r-gold)" }}>
                  €{item.price}
                </span>
              </div>
              <p className="mt-1.5 text-sm italic leading-snug" style={{ color: "var(--r-cream-dim)" }}>
                {item.description}
              </p>
            </div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

function Gallery() {
  return (
    <section id="galleria" className="border-t py-24 md:py-32" style={{ borderColor: "var(--r-line)", backgroundColor: "var(--r-bg-soft)" }}>
      <Container>
        <Reveal className="text-center">
          <RSectionLabel>Galleria</RSectionLabel>
          <h2 className="rd-display mx-auto mt-5 max-w-xl text-balance text-3xl font-semibold leading-tight md:text-4xl" style={{ color: "var(--r-cream)" }}>
            Un assaggio dell'atmosfera.
          </h2>
        </Reveal>

        <RevealGroup className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">
          {gallery.map((tile) => (
            <motion.div
              key={tile.label}
              variants={revealItem}
              className="group relative flex aspect-[4/5] items-end overflow-hidden rounded-2xl p-5 transition-transform hover:scale-[1.02]"
              style={{ background: `linear-gradient(160deg, ${tile.hue}, var(--r-bg))` }}
            >
              <div className="rd-texture absolute inset-0 opacity-30" />
              <span className="relative rd-display text-base font-medium" style={{ color: "var(--r-cream)" }}>
                {tile.label}
              </span>
            </motion.div>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}

function Testimonials() {
  return (
    <section id="recensioni" className="py-24 md:py-32">
      <Container>
        <Reveal className="text-center">
          <RSectionLabel>Recensioni</RSectionLabel>
          <h2 className="rd-display mx-auto mt-5 max-w-xl text-balance text-3xl font-semibold leading-tight md:text-4xl" style={{ color: "var(--r-cream)" }}>
            Cosa dicono i nostri ospiti.
          </h2>
        </Reveal>

        <RevealGroup className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={revealItem}
              className="flex h-full flex-col justify-between rounded-2xl border p-7"
              style={{ borderColor: "var(--r-line)", backgroundColor: "var(--r-bg-soft)" }}
            >
              <div>
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon key={i} filled={i < t.rating} />
                  ))}
                </div>
                <p className="mt-4 text-[15px] italic leading-relaxed" style={{ color: "var(--r-cream-dim)" }}>
                  “{t.quote}”
                </p>
              </div>
              <p className="mt-6 rd-display text-sm font-medium" style={{ color: "var(--r-cream)" }}>
                {t.name}
              </p>
            </motion.div>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}

function ReservationContact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <section
      id="prenota"
      className="border-t py-24 md:py-32"
      style={{ borderColor: "var(--r-line)", backgroundColor: "var(--r-bg-soft)" }}
    >
      <Container>
        <div className="grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <Reveal>
            <RSectionLabel>Prenota un tavolo</RSectionLabel>
            <h2 className="rd-display mt-5 text-balance text-3xl font-semibold leading-tight md:text-4xl" style={{ color: "var(--r-cream)" }}>
              Ti aspettiamo.
            </h2>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed" style={{ color: "var(--r-cream-dim)" }}>
              Chiamaci direttamente oppure compila il modulo: ti confermiamo la disponibilità il
              prima possibile.
            </p>

            <div className="mt-10 flex flex-col gap-6 text-sm">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--r-rust)" }}>
                  Indirizzo
                </p>
                <p className="mt-2" style={{ color: "var(--r-cream-dim)" }}>{restaurantInfo.address}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--r-rust)" }}>
                  Contatti
                </p>
                <p className="mt-2" style={{ color: "var(--r-cream-dim)" }}>{restaurantInfo.phone}</p>
                <p style={{ color: "var(--r-cream-dim)" }}>{restaurantInfo.email}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--r-rust)" }}>
                  Orari
                </p>
                <div className="mt-2 flex flex-col gap-1.5">
                  {openingHours.map((o) => (
                    <div key={o.day} className="flex justify-between gap-4 text-[13px]" style={{ color: "var(--r-cream-dim)" }}>
                      <span>{o.day}</span>
                      <span>{o.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form onSubmit={handleSubmit} className="rounded-3xl border p-8 md:p-10" style={{ borderColor: "var(--r-line)", backgroundColor: "var(--r-bg)" }}>
              <div className="grid gap-6 sm:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm" style={{ color: "var(--r-cream-dim)" }}>
                  Nome e cognome
                  <input
                    required
                    type="text"
                    placeholder="Il tuo nome"
                    className="rounded-xl border px-4 py-3.5 outline-none transition-colors"
                    style={{ borderColor: "var(--r-line)", backgroundColor: "var(--r-bg-soft)", color: "var(--r-cream)" }}
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm" style={{ color: "var(--r-cream-dim)" }}>
                  Telefono
                  <input
                    required
                    type="tel"
                    placeholder="Numero di telefono"
                    className="rounded-xl border px-4 py-3.5 outline-none transition-colors"
                    style={{ borderColor: "var(--r-line)", backgroundColor: "var(--r-bg-soft)", color: "var(--r-cream)" }}
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm" style={{ color: "var(--r-cream-dim)" }}>
                  Data
                  <input
                    required
                    type="date"
                    className="rounded-xl border px-4 py-3.5 outline-none transition-colors"
                    style={{ borderColor: "var(--r-line)", backgroundColor: "var(--r-bg-soft)", color: "var(--r-cream)" }}
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm" style={{ color: "var(--r-cream-dim)" }}>
                  Numero di ospiti
                  <input
                    required
                    type="number"
                    min={1}
                    defaultValue={2}
                    className="rounded-xl border px-4 py-3.5 outline-none transition-colors"
                    style={{ borderColor: "var(--r-line)", backgroundColor: "var(--r-bg-soft)", color: "var(--r-cream)" }}
                  />
                </label>
              </div>

              <label className="mt-6 flex flex-col gap-2 text-sm" style={{ color: "var(--r-cream-dim)" }}>
                Note (opzionale)
                <textarea
                  rows={3}
                  placeholder="Allergie, intolleranze, occasioni speciali..."
                  className="resize-none rounded-xl border px-4 py-3.5 outline-none transition-colors"
                  style={{ borderColor: "var(--r-line)", backgroundColor: "var(--r-bg-soft)", color: "var(--r-cream)" }}
                />
              </label>

              <button
                type="submit"
                className="mt-8 inline-flex w-full items-center justify-center gap-3 rounded-full px-8 py-4 text-sm font-semibold uppercase tracking-[0.1em] transition-transform hover:scale-[1.02] active:scale-[0.98] sm:w-auto"
                style={{ backgroundColor: "var(--r-rust)", color: "var(--r-cream)" }}
              >
                Invia richiesta
              </button>

              {sent && (
                <p className="mt-4 text-sm" style={{ color: "var(--r-gold)" }}>
                  Richiesta di prenotazione inviata! (demo — nessun dato viene realmente trasmesso)
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function RFooter() {
  return (
    <footer className="border-t pt-16" style={{ borderColor: "var(--r-line)" }}>
      <Container>
        <div className="grid gap-12 pb-14 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <span className="rd-display text-xl font-semibold" style={{ color: "var(--r-cream)" }}>
              {restaurantInfo.name}
            </span>
            <p className="mt-4 max-w-xs text-sm leading-relaxed" style={{ color: "var(--r-cream-dim)" }}>
              {restaurantInfo.tagline}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--r-rust)" }}>
              Il locale
            </p>
            <nav className="mt-4 flex flex-col gap-3 text-sm" style={{ color: "var(--r-cream-dim)" }}>
              <a href="#chi-siamo" className="hover:opacity-80">Chi siamo</a>
              <a href="#menu" className="hover:opacity-80">Menu</a>
              <a href="#galleria" className="hover:opacity-80">Galleria</a>
              <a href="#prenota" className="hover:opacity-80">Prenotazioni</a>
            </nav>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--r-rust)" }}>
              Contatti
            </p>
            <div className="mt-4 flex flex-col gap-3 text-sm" style={{ color: "var(--r-cream-dim)" }}>
              <span>{restaurantInfo.address}</span>
              <span>{restaurantInfo.phone}</span>
              <span>@{restaurantInfo.instagram}</span>
            </div>
          </div>
        </div>

        <div
          className="flex flex-col items-center justify-between gap-4 border-t py-8 text-center text-xs md:flex-row md:text-left"
          style={{ borderColor: "var(--r-line)", color: "var(--r-cream-dim)" }}
        >
          <span>
            {restaurantInfo.fullName} è un locale di fantasia, creato a scopo dimostrativo.
          </span>
          <Link to="/" className="font-semibold uppercase tracking-[0.08em]" style={{ color: "var(--r-gold)" }}>
            Realizzato da Will Marketing Agency →
          </Link>
        </div>
      </Container>
    </footer>
  );
}

export function RistoranteDemo() {
  return (
    <div className="restaurant-demo">
      <DemoBanner />
      <RNav />
      <Hero />
      <About />
      <MenuSection />
      <Gallery />
      <Testimonials />
      <ReservationContact />
      <RFooter />
    </div>
  );
}
