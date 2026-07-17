import { motion } from "framer-motion";
import { Container, SectionLabel } from "../components/Container";
import { PageHero } from "../components/PageHero";
import { Reveal, RevealGroup, revealItem } from "../components/Reveal";
import { CtaBand } from "../components/CtaBand";
import { clients } from "../data/content";

export function Risultati() {
  return (
    <>
      <PageHero
        label="Case Study"
        title="Risultati veri, di clienti veri."
        subtitle="Niente screenshot ritagliati o metriche di vanità. Ogni numero qui sotto arriva dai dati reali che tracciamo ogni giorno per i nostri clienti."
      />

      <section className="flex flex-col gap-24 pb-32 md:gap-32">
        {clients.map((client, i) => (
          <Container key={client.slug}>
            <Reveal>
              <div className="overflow-hidden rounded-3xl border border-line bg-surface">
                <div
                  className="h-1.5 w-full"
                  style={{ background: `linear-gradient(90deg, ${client.color}, transparent)` }}
                />
                <div className="grid gap-10 p-9 md:grid-cols-[1fr_1.1fr] md:p-14">
                  <div>
                    <span className="text-xs font-medium uppercase tracking-[0.25em] text-gold">
                      Case study {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="font-display mt-5 text-3xl font-medium tracking-tight text-paper md:text-4xl">
                      {client.name}
                    </h2>
                    <p className="mt-2 text-sm text-smoke">
                      {client.sector} · {client.location} · {client.since}
                    </p>
                    <p className="mt-6 text-[15px] leading-relaxed text-bone">{client.summary}</p>

                    <div className="mt-7 flex flex-wrap gap-2">
                      {client.services.map((s) => (
                        <span
                          key={s}
                          className="rounded-full border border-line px-3.5 py-1.5 text-xs text-smoke"
                        >
                          {s}
                        </span>
                      ))}
                    </div>

                    <blockquote className="mt-9 border-l-2 pl-5 text-[15px] italic leading-relaxed text-paper" style={{ borderColor: client.color }}>
                      “{client.quote}”
                    </blockquote>
                  </div>

                  <div className="flex flex-col justify-between">
                    <RevealGroup className="grid grid-cols-2 gap-6">
                      {client.stats.map((stat) => (
                        <motion.div
                          key={stat.label}
                          variants={revealItem}
                          className="rounded-2xl border border-line bg-ink p-6"
                        >
                          <p className="font-display text-3xl font-medium tracking-tight text-gold md:text-4xl">
                            {stat.value}
                          </p>
                          <p className="mt-2 text-xs leading-snug text-smoke">{stat.label}</p>
                        </motion.div>
                      ))}
                    </RevealGroup>

                    <div className="mt-8 rounded-2xl bg-ink p-6">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-bone">
                        L'approccio
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-smoke">{client.approach}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </Container>
        ))}
      </section>

      <section className="border-t border-line bg-surface py-24">
        <Container className="text-center">
          <Reveal>
            <SectionLabel>Nota sulla trasparenza</SectionLabel>
            <p className="mx-auto mt-6 max-w-2xl text-balance text-sm leading-relaxed text-smoke">
              I dati mostrati provengono direttamente dalla dashboard di analisi che usiamo per
              gestire ogni account cliente. Aggiorniamo questi numeri man mano che i risultati
              crescono — non li gonfiamo mai.
            </p>
          </Reveal>
        </Container>
      </section>

      <CtaBand
        eyebrow="Il prossimo case study puoi essere tu"
        title="Vuoi risultati come questi per il tuo brand?"
      />
    </>
  );
}
