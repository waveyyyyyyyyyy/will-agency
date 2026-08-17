import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { NebulaBackdrop } from "./NebulaBackdrop";
import { TiltedBackdrop } from "./TiltedBackdrop";
import { ELEMENTS, type ElementId, type WuXingElement } from "./elements";
import { getJourney } from "./journeys";
import { playSoftPing, playWhoosh, setAmbientProfile } from "./audio";
import { hapticTap, hapticConfirm } from "./haptics";
import { BackButton } from "./BackButton";
import elementFuocoCover from "../assets/element-fuoco-cover.jpg";
import elementMetalloCover from "../assets/element-metallo-cover.jpg";
import elementTerraCover from "../assets/element-terra-cover.jpg";
import elementLegnoCover from "../assets/element-legno-cover.jpg";
import { usePointerTilt } from "./usePointerTilt";

// Elements with a real supplied photo instead of an SVG — each fills its
// card edge-to-edge (no icon padding). Acqua is still SVG until a photo for
// it is supplied; same treatment to be applied then, for consistency.
const PHOTO_COVER_ELEMENTS: ElementId[] = ["fuoco", "metallo", "terra", "legno"];

/**
 * Fuller illustrated scenes rather than small line icons — each element
 * should read immediately for what it is. Four of the five now use real
 * photos supplied directly for this project (fuoco, terra, metallo,
 * legno); acqua is still a hand-built layered SVG until a photo for it is
 * supplied, keeping the same "several shaded shapes, not a single stroke"
 * treatment in the meantime.
 */
function ElementIllustration({ id }: { id: ElementId }) {
  switch (id) {
    case "fuoco":
      return (
        <img
          src={elementFuocoCover}
          alt="Un falò acceso sulla riva di un lago di montagna, sotto un'aurora boreale"
          className="h-full w-full object-cover"
        />
      );
    case "acqua":
      return (
        <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden>
          <defs>
            <linearGradient id="water-deep" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0b6e64" />
              <stop offset="100%" stopColor="#0a2a34" />
            </linearGradient>
          </defs>
          <rect x="6" y="46" width="88" height="42" rx="6" fill="url(#water-deep)" />
          <path d="M6,50 C20,40 32,60 46,50 C60,40 72,60 86,50 C90,49 94,48 94,48 L94,88 L6,88 Z" fill="#14a696" opacity="0.9" />
          <path d="M6,62 C20,54 32,70 46,62 C60,54 72,70 86,62 C90,61 94,60 94,60 L94,88 L6,88 Z" fill="#2fc2b0" opacity="0.85" />
          <path d="M6,74 C20,68 32,80 46,74 C60,68 72,80 86,74 L94,72 L94,88 L6,88 Z" fill="#7fe3d4" opacity="0.7" />
          <circle cx="30" cy="30" r="3.4" fill="#7fe3d4" opacity="0.85" />
          <circle cx="30" cy="30" r="1.4" fill="#eafffb" />
          <circle cx="66" cy="22" r="2" fill="#7fe3d4" opacity="0.6" />
          <circle cx="20" cy="20" r="1.3" fill="#7fe3d4" opacity="0.5" />
        </svg>
      );
    case "terra":
      return (
        <img
          src={elementTerraCover}
          alt="Una bambina in un campo di girasoli al tramonto, con la terra tra le mani accanto a un grande girasole"
          className="h-full w-full object-cover"
        />
      );
    case "metallo":
      return (
        <img
          src={elementMetalloCover}
          alt="Una tigre bianca sdraiata accanto a un mucchio di gemme colorate, davanti a un rifugio di montagna"
          className="h-full w-full object-cover"
        />
      );
    case "legno":
      return (
        <img
          src={elementLegnoCover}
          alt="Una farfalla iridescente posata su un tronco d'albero muschioso, nella luce che filtra tra le foglie"
          className="h-full w-full object-cover"
        />
      );
    default:
      return null;
  }
}

type Step = "pick" | "priority";

export function ElementSelector() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("pick");
  const [selected, setSelected] = useState<ElementId[]>([]);
  const tilt = usePointerTilt(4);

  useEffect(() => {
    setAmbientProfile("cosmic");
    playSoftPing();
  }, []);

  function toggle(id: ElementId) {
    hapticTap();
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
    hapticConfirm();
    playWhoosh();
    setTimeout(() => navigate(journey.path), 400);
  }

  // A single element card — pulled out so the "pick" grid below can lay
  // out a single stacked column on mobile (image, name, what-it's-for, one
  // card below the other) and a bigger 2 / 2 / 1 grid from tablet up.
  function renderCard(el: WuXingElement) {
    const isOn = selected.includes(el.id);
    return (
      <div key={el.id} className="group relative flex w-full flex-col items-center sm:w-auto">
        <button
          type="button"
          onClick={() => toggle(el.id)}
          aria-pressed={isOn}
          className="flex w-full flex-col items-center gap-3 rounded-3xl px-2 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cosmic-gold/70 sm:w-44 md:w-48"
        >
          <span
            className={`flex aspect-square w-full items-center justify-center overflow-hidden rounded-3xl border-2 transition-all ${
              PHOTO_COVER_ELEMENTS.includes(el.id) ? "" : "p-5"
            }`}
            style={{
              borderColor: isOn ? el.accent : `${el.accent}35`,
              background: isOn
                ? `radial-gradient(circle at 35% 25%, ${el.accent}3d, rgba(7,4,15,0.85) 75%)`
                : `radial-gradient(circle at 35% 25%, ${el.accent}18, rgba(7,4,15,0.75) 75%)`,
              boxShadow: isOn ? `0 0 34px ${el.accentSoft}70` : "none",
              opacity: isOn ? 1 : 0.8,
            }}
          >
            <ElementIllustration id={el.id} />
          </span>
          <span
            className="font-display text-base font-medium tracking-wide"
            style={{ color: isOn ? el.accent : "rgba(241,232,255,0.75)" }}
          >
            {el.name}
          </span>
          <span className="text-center text-[11px] uppercase tracking-[0.15em] text-cosmic-star/55">{el.symbol}</span>
          {/* "a cosa serve", sempre visibile — non solo al passaggio del
              mouse, perché su mobile non esiste l'hover */}
          <span className="max-w-[18rem] text-center text-xs leading-snug text-cosmic-star/45 sm:max-w-[10rem]">
            {el.care}
          </span>
        </button>

        {/* hover/focus tooltip — extra detail for desktop, where hover exists */}
        <div
          className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-3 hidden w-56 -translate-x-1/2 rounded-2xl border p-4 text-left opacity-0 shadow-2xl backdrop-blur-md transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100 sm:block"
          style={{ borderColor: `${el.accent}45`, background: "rgba(7,4,15,0.92)" }}
        >
          <p className="text-xs leading-relaxed text-cosmic-star/80">{el.description}</p>
          <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.15em]" style={{ color: el.accent }}>
            Cura: {el.care}
          </p>
        </div>
      </div>
    );
  }

  return (
    <section
      ref={tilt.ref}
      onPointerMove={tilt.onPointerMove}
      onPointerLeave={tilt.onPointerLeave}
      className="relative flex min-h-[100dvh] w-full items-center justify-center overflow-hidden bg-black px-6 py-16"
      style={{ perspective: 1400 }}
    >
      <TiltedBackdrop rotateX={tilt.rotateX} rotateY={tilt.rotateY}>
        <NebulaBackdrop starCount={150} />
      </TiltedBackdrop>

      <BackButton to="/scegli" />

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

            {/* one column, stacked, on mobile — a real 2 / 2 grid (bigger
                cards than before) from tablet up */}
            <div className="mx-auto mt-12 grid max-w-xs grid-cols-1 justify-items-center gap-y-10 sm:max-w-md sm:grid-cols-2 sm:gap-x-10 sm:gap-y-12 md:max-w-lg">
              {ELEMENTS.slice(0, 4).map(renderCard)}
            </div>
            <div className="mt-10 flex justify-center">{renderCard(ELEMENTS[4])}</div>

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
