import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { NebulaBackdrop } from "./NebulaBackdrop";
import { ELEMENTS, type ElementId } from "./elements";
import { getJourney } from "./journeys";
import { playSoftPing, playWhoosh, setAmbientProfile } from "./audio";

function ElementIcon({ id, accent }: { id: ElementId; accent: string }) {
  switch (id) {
    case "fuoco":
      return (
        <svg viewBox="0 0 60 60" className="h-8 w-8" aria-hidden>
          <path
            d="M30,10 C36,20 44,24 40,36 C38,42 32,46 26,44 C18,41 16,32 22,26 C22,32 26,32 26,28 C26,22 22,18 24,10 C27,16 30,14 30,10 Z"
            fill={accent}
          />
        </svg>
      );
    case "acqua":
      return (
        <svg viewBox="0 0 60 60" className="h-8 w-8" aria-hidden>
          <path d="M6,26 C14,18 20,34 28,26 C36,18 42,34 50,26" fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" />
          <path d="M6,36 C14,28 20,44 28,36 C36,28 42,44 50,36" fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" opacity={0.55} />
        </svg>
      );
    case "terra":
      return (
        <svg viewBox="0 0 60 60" className="h-8 w-8" aria-hidden>
          <polygon points="8,44 24,20 32,32 40,16 52,44" fill={accent} opacity={0.85} />
          <rect x="6" y="44" width="48" height="4" rx="2" fill={accent} />
        </svg>
      );
    case "metallo":
      return (
        <svg viewBox="0 0 60 60" className="h-8 w-8" aria-hidden>
          <polygon points="30,10 42,22 30,50 18,22" fill={accent} opacity={0.9} />
          <polygon points="24,20 30,15 36,20 30,25" fill="#fff6df" opacity={0.7} />
        </svg>
      );
    case "legno":
    default:
      return (
        <svg viewBox="0 0 60 60" className="h-8 w-8" aria-hidden>
          <path d="M30,50 L30,16" stroke={accent} strokeWidth="2.4" strokeLinecap="round" />
          <path d="M30,30 C22,26 18,18 20,10" fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" />
          <path d="M30,36 C38,32 42,24 40,16" fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" />
          <circle cx="30" cy="14" r="3" fill={accent} />
        </svg>
      );
  }
}

type Step = "pick" | "priority";

export function ElementSelector() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("pick");
  const [selected, setSelected] = useState<ElementId[]>([]);

  useEffect(() => {
    setAmbientProfile("cosmic");
    playSoftPing();
  }, []);

  function toggle(id: ElementId) {
    setSelected((prev) => (prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]));
  }

  function handleContinue() {
    if (selected.length === 0) return;
    if (selected.length === 1) {
      goToElement(selected[0], []);
      return;
    }
    playSoftPing();
    setStep("priority");
  }

  function goToElement(id: ElementId, rest: ElementId[]) {
    const element = ELEMENTS.find((e) => e.id === id);
    if (!element) return;
    const journey = getJourney(element.journeyId);
    if (!journey) return;
    try {
      // A small hook for future work: the elements picked but not addressed
      // first, ready for whatever "collegamento tra percorsi" logic comes next.
      window.localStorage.setItem("supernova-element-queue", JSON.stringify(rest));
    } catch {
      /* private browsing / storage disabled — harmless to skip */
    }
    playWhoosh();
    setTimeout(() => navigate(journey.path), 400);
  }

  return (
    <section className="relative flex min-h-[100dvh] w-full items-center justify-center overflow-hidden bg-black px-6 py-16">
      <NebulaBackdrop starCount={150} />

      <AnimatePresence mode="wait">
        {step === "pick" ? (
          <motion.div
            key="pick"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-3xl text-center"
          >
            <span className="text-xs font-medium uppercase tracking-[0.35em] text-cosmic-gold">Personalizza il tuo percorso</span>
            <h1 className="font-display mt-5 text-balance text-3xl font-medium leading-[1.15] tracking-tight text-cosmic-star sm:text-4xl">
              Qual è l&apos;elemento di cui vuoi prenderti cura?
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-cosmic-star/60">
              Puoi scegliere più di un elemento. Passa il mouse (o tieni premuto) su ciascuno per saperne di più.
            </p>

            <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:flex md:flex-wrap md:justify-center md:gap-x-10">
              {ELEMENTS.map((el) => {
                const isOn = selected.includes(el.id);
                return (
                  <div key={el.id} className="group relative flex flex-col items-center">
                    <button
                      type="button"
                      onClick={() => toggle(el.id)}
                      aria-pressed={isOn}
                      className="flex flex-col items-center gap-3 rounded-2xl px-2 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cosmic-gold/70"
                    >
                      <span
                        className="flex h-20 w-20 items-center justify-center rounded-full border-2 transition-all sm:h-24 sm:w-24"
                        style={{
                          borderColor: isOn ? el.accent : `${el.accent}35`,
                          background: isOn
                            ? `radial-gradient(circle at 35% 30%, ${el.accent}55, rgba(7,4,15,0.7) 70%)`
                            : `radial-gradient(circle at 35% 30%, ${el.accent}22, rgba(7,4,15,0.6) 70%)`,
                          boxShadow: isOn ? `0 0 30px ${el.accentSoft}70` : "none",
                        }}
                      >
                        <ElementIcon id={el.id} accent={isOn ? el.accent : `${el.accent}bb`} />
                      </span>
                      <span
                        className="font-display text-sm font-medium tracking-wide sm:text-base"
                        style={{ color: isOn ? el.accent : "rgba(241,232,255,0.75)" }}
                      >
                        {el.name}
                      </span>
                      <span className="max-w-[9rem] text-center text-[11px] leading-snug text-cosmic-star/50">
                        {el.symbol}
                      </span>
                    </button>

                    {/* hover/focus tooltip — the "tendina" of explanation for this element */}
                    <div
                      className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-3 w-56 -translate-x-1/2 rounded-2xl border p-4 text-left opacity-0 shadow-2xl backdrop-blur-md transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100"
                      style={{ borderColor: `${el.accent}45`, background: "rgba(7,4,15,0.92)" }}
                    >
                      <p className="text-xs leading-relaxed text-cosmic-star/80">{el.description}</p>
                      <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.15em]" style={{ color: el.accent }}>
                        Cura: {el.care}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              type="button"
              onClick={handleContinue}
              disabled={selected.length === 0}
              className="mt-14 inline-flex items-center gap-2 rounded-full bg-cosmic-gold px-9 py-3.5 text-sm font-semibold uppercase tracking-[0.15em] text-ink transition-all enabled:hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-30"
            >
              Continua
              <span aria-hidden>→</span>
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="priority"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-2xl text-center"
          >
            <span className="text-xs font-medium uppercase tracking-[0.35em] text-cosmic-gold">Un passo alla volta</span>
            <h1 className="font-display mt-5 text-balance text-3xl font-medium leading-[1.15] tracking-tight text-cosmic-star sm:text-4xl">
              Da quale vuoi iniziare?
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-cosmic-star/60">
              Gli altri resteranno lì ad aspettarti — potrai tornarci in qualsiasi momento.
            </p>

            <div className="mt-10 flex flex-col gap-4">
              {selected.map((id) => {
                const el = ELEMENTS.find((e) => e.id === id)!;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => goToElement(id, selected.filter((s) => s !== id))}
                    className="flex items-center justify-between rounded-2xl border px-6 py-4 text-left transition-colors hover:bg-black/30"
                    style={{ borderColor: `${el.accent}45`, background: "rgba(7,4,15,0.5)" }}
                  >
                    <span>
                      <span className="font-display block text-lg font-medium" style={{ color: el.accent }}>
                        {el.name}
                      </span>
                      <span className="text-xs text-cosmic-star/55">{el.care}</span>
                    </span>
                    <span aria-hidden style={{ color: el.accent }}>
                      →
                    </span>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => setStep("pick")}
              className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-cosmic-star/50 transition-colors hover:text-cosmic-gold"
            >
              ← Cambia selezione
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
