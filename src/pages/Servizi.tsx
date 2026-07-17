import { motion } from "framer-motion";
import { Container, SectionLabel } from "../components/Container";
import { PageHero } from "../components/PageHero";
import { Reveal, RevealGroup, revealItem } from "../components/Reveal";
import { CtaBand } from "../components/CtaBand";
import { services } from "../data/content";

export function Servizi() {
  return (
    <>
      <PageHero
        label="Servizi"
        title="Tutto quello che serve per crescere, sotto lo stesso tetto."
        subtitle="Dalla strategia alla produzione, dalla pubblicazione all'analisi dati: un unico partner che elimina il caos di gestire cinque fornitori diversi."
      />

      <section className="pb-28">
        <Container>
          <div className="flex flex-col gap-px overflow-hidden rounded-2xl border border-line bg-line">
            {services.map((s, i) => (
              <Reveal key={s.tag} delay={i * 0.04}>
                <div className="grid gap-6 bg-ink p-9 md:grid-cols-[100px_1.1fr_1fr] md:p-12">
                  <span className="font-display text-sm text-smoke">{s.tag}</span>
                  <div>
                    <h2 className="font-display text-2xl font-medium tracking-tight text-paper md:text-3xl">
                      {s.title}
                    </h2>
                    <p className="mt-4 max-w-md text-[15px] leading-relaxed text-smoke">{s.description}</p>
                  </div>
                  <ul className="flex flex-col gap-3 self-start md:justify-self-end">
                    {s.points.map((point) => (
                      <li key={point} className="flex items-center gap-3 text-sm text-bone">
                        <span className="h-1 w-1 shrink-0 rounded-full bg-gold" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-line bg-surface py-28">
        <Container>
          <Reveal>
            <SectionLabel>Perché funziona</SectionLabel>
            <h2 className="font-display mt-6 max-w-2xl text-balance text-4xl font-medium leading-[1.1] tracking-tight text-paper md:text-5xl">
              Non vendiamo post. Costruiamo sistemi.
            </h2>
          </Reveal>

          <RevealGroup className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Esclusiva di settore",
                description:
                  "Un solo cliente per categoria merceologica e zona: la strategia che costruiamo per te resta tua.",
              },
              {
                title: "Format proprietari",
                description:
                  "Ogni cliente ha format ricorrenti costruiti sui suoi reali punti di forza, non su trend generici copiati.",
              },
              {
                title: "Report trasparenti",
                description:
                  "Ogni mese vedi esattamente cosa è stato fatto e quale risultato ha portato. Nessun numero nascosto.",
              },
            ].map((item) => (
              <motion.div key={item.title} variants={revealItem} className="rounded-2xl border border-line p-8">
                <h3 className="font-display text-lg font-medium tracking-tight text-paper">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-smoke">{item.description}</p>
              </motion.div>
            ))}
          </RevealGroup>
        </Container>
      </section>

      <CtaBand
        eyebrow="Il prossimo passo"
        title="Parliamo di quale servizio serve davvero al tuo brand."
        subtitle="Una call di 20 minuti per capire dove sei oggi e cosa ti manca per crescere."
      />
    </>
  );
}
