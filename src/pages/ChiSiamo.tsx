import { motion } from "framer-motion";
import { Container, SectionLabel } from "../components/Container";
import { PageHero } from "../components/PageHero";
import { Reveal, RevealGroup, revealItem } from "../components/Reveal";
import { CtaBand } from "../components/CtaBand";
import { values } from "../data/content";

export function ChiSiamo() {
  return (
    <>
      <PageHero
        label="Chi Siamo"
        title="Un'agenzia costruita per chi è stanco di pubblicare a caso."
        subtitle="Will Agency nasce per portare nel social media marketing locale lo stesso rigore strategico che le grandi agenzie riservano solo ai grandi brand."
      />

      <section className="pb-28">
        <Container className="grid gap-14 md:grid-cols-2 md:gap-20">
          <Reveal>
            <h2 className="font-display text-3xl font-medium tracking-tight text-paper md:text-4xl">
              La nostra missione
            </h2>
            <p className="mt-6 text-[15px] leading-relaxed text-smoke">
              Troppe attività locali investono in social media senza una strategia: pubblicano
              per abitudine, copiano trend che non parlano del loro brand, e misurano il successo
              con i like. Noi facciamo l'opposto.
            </p>
            <p className="mt-5 text-[15px] leading-relaxed text-smoke">
              Ogni cliente che entra in Will Agency riceve un'analisi di posizionamento, un
              calendario di argomenti pianificato, format editoriali costruiti sui suoi reali
              punti di forza — e un report mensile che dice la verità sui numeri, buoni o cattivi
              che siano.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="font-display text-3xl font-medium tracking-tight text-paper md:text-4xl">
              Come lavoriamo
            </h2>
            <p className="mt-6 text-[15px] leading-relaxed text-smoke">
              Lavoriamo in esclusiva territoriale e di settore: se seguiamo un'azienda di
              climatizzazione a Barletta, non lavoriamo con il suo concorrente diretto nella
              stessa zona. La strategia che costruiamo resta un vantaggio competitivo reale,
              non un servizio replicabile.
            </p>
            <p className="mt-5 text-[15px] leading-relaxed text-smoke">
              Ogni contenuto — dal primo script alla pubblicazione — segue un framing definito e
              argomenti pianificati in anticipo. Nessuna improvvisazione davanti alla telecamera.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="border-t border-line bg-surface py-28">
        <Container>
          <Reveal>
            <SectionLabel>I nostri principi</SectionLabel>
            <h2 className="font-display mt-6 max-w-2xl text-balance text-4xl font-medium leading-[1.1] tracking-tight text-paper md:text-5xl">
              Quattro regole che non cambiamo mai.
            </h2>
          </Reveal>

          <RevealGroup className="mt-16 grid gap-6 md:grid-cols-2">
            {values.map((v) => (
              <motion.div
                key={v.title}
                variants={revealItem}
                className="rounded-2xl border border-line bg-ink p-9"
              >
                <h3 className="font-display text-xl font-medium tracking-tight text-paper">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-smoke">{v.description}</p>
              </motion.div>
            ))}
          </RevealGroup>
        </Container>
      </section>

      <section className="py-28">
        <Container>
          <div className="grid items-center gap-14 rounded-3xl border border-line bg-surface p-9 md:grid-cols-[1fr_1.3fr] md:p-14">
            <Reveal>
              <div className="flex h-28 w-28 items-center justify-center rounded-2xl bg-gold/10 text-3xl font-display font-medium text-gold">
                M
              </div>
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-bone">
                Founder
              </p>
              <h3 className="font-display mt-2 text-2xl font-medium tracking-tight text-paper">
                Mattia
              </h3>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-[15px] leading-relaxed text-smoke">
                Ho fondato Will Agency perché ero stanco di vedere attività locali con prodotti
                e servizi eccellenti restare invisibili online — o peggio, affidarsi ad agenzie
                che vendono pacchetti di post senza una vera strategia dietro.
              </p>
              <p className="mt-5 text-[15px] leading-relaxed text-smoke">
                Ogni cliente che seguiamo oggi, da Termo Zero a Unique Gioielleria, ha una cosa in
                comune: crediamo nei loro numeri prima ancora di pubblicare il primo contenuto,
                perché li costruiamo insieme a partire dai dati.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <CtaBand
        eyebrow="Lavoriamo insieme"
        title="Racconta al tuo brand la storia che merita."
      />
    </>
  );
}
