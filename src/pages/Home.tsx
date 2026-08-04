import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { Container, SectionLabel } from "../components/Container";
import { Reveal, RevealGroup, revealItem } from "../components/Reveal";
import { Marquee } from "../components/Marquee";
import { CtaBand } from "../components/CtaBand";
import { services, clients, process } from "../data/content";

export function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden pb-24 pt-44 md:pt-56">
        <div
          className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full opacity-[0.16] blur-[140px]"
          style={{ background: "radial-gradient(circle, #FFC107, transparent 70%)" }}
        />
        <Container className="relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <SectionLabel>Social Media &amp; Content Agency</SectionLabel>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display mt-7 max-w-5xl text-balance text-4xl font-medium leading-[1.1] tracking-tight text-paper sm:text-5xl md:text-7xl md:leading-[1.02] lg:text-8xl"
          >
            Contenuti che <span className="text-gold">costruiscono</span> brand, non solo numeri.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 max-w-xl text-balance text-lg text-smoke md:text-xl"
          >
            Will Marketing Agency guida attività locali attraverso strategia, produzione video
            e dati reali — trasformando profili social in canali di crescita misurabile.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
            className="mt-11 flex flex-wrap items-center gap-5"
          >
            <NavLink
              to="/contatti"
              className="inline-flex items-center gap-3 rounded-full bg-gold px-8 py-4 text-sm font-semibold uppercase tracking-[0.1em] text-ink transition-transform hover:scale-[1.03] active:scale-[0.98]"
            >
              Prenota una call gratuita
              <span aria-hidden>→</span>
            </NavLink>
            <NavLink
              to="/risultati"
              className="inline-flex items-center gap-2 border-b border-paper/30 pb-1 text-sm font-medium text-paper transition-colors hover:border-gold hover:text-gold"
            >
              Guarda i risultati reali
            </NavLink>
          </motion.div>
        </Container>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-24"
        >
          <p className="mb-6 text-center text-xs uppercase tracking-[0.3em] text-smoke">
            Brand che si sono affidati a noi
          </p>
          <Marquee
            items={[
              "Termo Zero",
              "Unique Gioielleria",
              "Will Marketing Agency",
              "Termo Zero",
              "Unique Gioielleria",
              "Will Marketing Agency",
            ].map((name, i) => (
              <span key={i} className="font-display px-6 text-2xl font-medium tracking-tight text-paper/25 md:text-3xl">
                {name}
              </span>
            ))}
          />
        </motion.div>
      </section>

      {/* RESULTS STRIP */}
      <section className="border-y border-line bg-surface py-20">
        <Container>
          <RevealGroup className="grid grid-cols-2 gap-10 md:grid-cols-4">
            {[
              { value: "+30%", label: "crescita follower Termo Zero in 5 settimane" },
              { value: "750.000+", label: "visualizzazioni generate" },
              { value: "9", label: "script strategici consegnati per Unique Gioielleria" },
              { value: "3×", label: "contenuti pubblicati a settimana, ogni settimana" },
            ].map((stat) => (
              <motion.div key={stat.label} variants={revealItem}>
                <p className="font-display text-4xl font-medium tracking-tight text-gold md:text-5xl">{stat.value}</p>
                <p className="mt-3 text-sm leading-snug text-smoke">{stat.label}</p>
              </motion.div>
            ))}
          </RevealGroup>
        </Container>
      </section>

      {/* SERVICES */}
      <section className="py-28 md:py-36">
        <Container>
          <Reveal>
            <SectionLabel>Cosa facciamo</SectionLabel>
            <h2 className="font-display mt-6 max-w-2xl text-balance text-4xl font-medium leading-[1.1] tracking-tight text-paper md:text-5xl">
              Un metodo completo, dalla strategia al risultato.
            </h2>
          </Reveal>

          <RevealGroup className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <motion.div
                key={s.tag}
                variants={revealItem}
                className="group relative bg-ink p-8 transition-colors hover:bg-surface"
              >
                <span className="font-display text-sm text-smoke">{s.tag}</span>
                <h3 className="font-display mt-4 text-xl font-medium tracking-tight text-paper">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-smoke">{s.description}</p>
              </motion.div>
            ))}
          </RevealGroup>

          <Reveal delay={0.1} className="mt-12">
            <NavLink
              to="/servizi"
              className="inline-flex items-center gap-2 text-sm font-medium text-paper transition-colors hover:text-gold"
            >
              Esplora tutti i servizi <span aria-hidden>→</span>
            </NavLink>
          </Reveal>
        </Container>
      </section>

      {/* CASE STUDIES */}
      <section className="border-t border-line bg-surface py-28 md:py-36">
        <Container>
          <Reveal>
            <SectionLabel>Risultati reali</SectionLabel>
            <h2 className="font-display mt-6 max-w-2xl text-balance text-4xl font-medium leading-[1.1] tracking-tight text-paper md:text-5xl">
              Non promesse. Numeri.
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {clients.map((client) => (
              <Reveal key={client.slug}>
                <NavLink
                  to="/risultati"
                  className="group flex h-full flex-col justify-between rounded-2xl border border-line bg-ink p-9 transition-colors hover:border-gold/40"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span
                        className="inline-flex h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: client.color }}
                      />
                      <span className="text-xs uppercase tracking-[0.2em] text-smoke">{client.since}</span>
                    </div>
                    <h3 className="font-display mt-5 text-2xl font-medium tracking-tight text-paper">
                      {client.name}
                    </h3>
                    <p className="mt-1 text-sm text-smoke">{client.sector} · {client.location}</p>
                    <p className="mt-5 text-sm leading-relaxed text-bone">{client.summary}</p>
                  </div>

                  <div className="mt-8 grid grid-cols-2 gap-6 border-t border-line pt-6">
                    {client.stats.slice(0, 2).map((stat) => (
                      <div key={stat.label}>
                        <p className="font-display text-2xl font-medium text-gold">{stat.value}</p>
                        <p className="mt-1 text-xs leading-snug text-smoke">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                  <span className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-paper transition-colors group-hover:text-gold">
                    Leggi il case study <span aria-hidden>→</span>
                  </span>
                </NavLink>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* PROCESS */}
      <section className="py-28 md:py-36">
        <Container>
          <Reveal>
            <SectionLabel>Il metodo</SectionLabel>
            <h2 className="font-display mt-6 max-w-2xl text-balance text-4xl font-medium leading-[1.1] tracking-tight text-paper md:text-5xl">
              Quattro fasi. Nessuna improvvisazione.
            </h2>
          </Reveal>

          <RevealGroup className="mt-16 grid gap-8 md:grid-cols-4">
            {process.map((p) => (
              <motion.div key={p.step} variants={revealItem} className="border-t border-gold/40 pt-6">
                <span className="font-display text-3xl font-medium text-smoke">{p.step}</span>
                <h3 className="font-display mt-4 text-lg font-medium tracking-tight text-paper">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-smoke">{p.description}</p>
              </motion.div>
            ))}
          </RevealGroup>
        </Container>
      </section>

      <CtaBand showLogo />
    </>
  );
}
