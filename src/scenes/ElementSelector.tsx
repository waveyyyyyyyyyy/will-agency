import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { NebulaBackdrop } from "./NebulaBackdrop";
import { TiltedBackdrop } from "./TiltedBackdrop";
import { ELEMENTS, type ElementId, type WuXingElement } from "./elements";
import { getJourney } from "./journeys";
import { playSoftPing, playWhoosh, setAmbientProfile } from "./audio";
import { BackButton } from "./BackButton";
import { usePointerTilt } from "./usePointerTilt";

/**
 * Fuller illustrated scenes rather than small line icons — each element
 * should read immediately for what it is. No AI-generated photography was
 * possible here (see the chat note on image-generation credits), so these
 * are hand-built layered SVGs: several shaded shapes per element instead of
 * a single stroke, closer to a small painting than a glyph.
 */
function ElementIllustration({ id }: { id: ElementId }) {
  switch (id) {
    case "fuoco":
      return (
        <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden>
          <defs>
            <linearGradient id="fire-outer" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#8a1f3a" />
              <stop offset="55%" stopColor="#e0698a" />
              <stop offset="100%" stopColor="#ffd27a" />
            </linearGradient>
            <linearGradient id="fire-inner" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#c93f5e" />
              <stop offset="70%" stopColor="#ffb24d" />
              <stop offset="100%" stopColor="#fff3c9" />
            </linearGradient>
          </defs>
          <path
            d="M50,14 C62,30 78,38 70,58 C66,70 54,80 40,76 C22,71 16,54 28,42 C28,54 36,56 36,48 C36,36 26,28 30,12 C38,22 44,18 50,14 Z"
            fill="url(#fire-outer)"
          />
          <path
            d="M49,34 C56,44 62,50 56,62 C53,69 45,73 38,69 C28,64 27,53 35,47 C35,54 40,54 40,49 C40,42 34,38 37,28 C42,33 45,32 49,34 Z"
            fill="url(#fire-inner)"
          />
          <circle cx="72" cy="26" r="2.6" fill="#ffd27a" opacity="0.9" />
          <circle cx="66" cy="16" r="1.7" fill="#ffe6ac" opacity="0.8" />
          <circle cx="79" cy="38" r="1.8" fill="#ffb24d" opacity="0.7" />
        </svg>
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
        <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden>
          <defs>
            <linearGradient id="soil" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#5c7a9a" />
              <stop offset="100%" stopColor="#2c3f5e" />
            </linearGradient>
          </defs>
          <rect x="6" y="52" width="88" height="36" rx="6" fill="url(#soil)" />
          <rect x="6" y="46" width="88" height="10" fill="#3c5a78" />
          {[14, 24, 34, 44, 54, 64, 74, 84].map((x, i) => (
            <path
              key={x}
              d={`M${x},46 L${x - 3},${38 - (i % 3) * 3} M${x},46 L${x + 3},${37 - (i % 2) * 4}`}
              stroke="#8fb4d9"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          ))}
          {[
            [18, 64], [30, 72], [42, 66], [54, 76], [66, 68], [78, 74], [24, 82], [60, 84],
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r={1.6 + (i % 3)} fill="#7fa6c9" opacity="0.5" />
          ))}
          <path d="M50,46 C50,36 44,32 46,22" stroke="#8fb4d9" strokeWidth="2" fill="none" strokeLinecap="round" />
          <circle cx="46" cy="20" r="3.2" fill="#a8c6e6" />
        </svg>
      );
    case "metallo":
      return (
        <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden>
          <defs>
            <linearGradient id="ore-a" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fff6df" />
              <stop offset="45%" stopColor="#e8c168" />
              <stop offset="100%" stopColor="#8a6420" />
            </linearGradient>
            <linearGradient id="ore-b" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fdf6e6" />
              <stop offset="50%" stopColor="#c9a24a" />
              <stop offset="100%" stopColor="#5f4713" />
            </linearGradient>
          </defs>
          <polygon points="34,80 14,54 30,22 54,18 66,42 52,80" fill="url(#ore-a)" stroke="#5f4713" strokeOpacity="0.3" strokeWidth="0.6" />
          <polygon points="30,22 54,18 44,40 24,38" fill="#fffaf0" opacity="0.55" />
          <polygon points="70,86 58,62 72,38 90,44 94,68 82,86" fill="url(#ore-b)" stroke="#5f4713" strokeOpacity="0.3" strokeWidth="0.6" />
          <polygon points="72,38 90,44 80,54 66,50" fill="#fffaf0" opacity="0.45" />
        </svg>
      );
    case "legno":
    default:
      return (
        <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden>
          <defs>
            <linearGradient id="leaf" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#c9b6f2" />
              <stop offset="100%" stopColor="#4c2a8f" />
            </linearGradient>
          </defs>
          <path d="M50,88 C50,60 48,40 50,16" stroke="#6b4a2a" strokeWidth="3.4" strokeLinecap="round" fill="none" />
          <path d="M50,66 C38,60 28,48 30,34" stroke="#8a6a45" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M50,50 C62,44 72,32 70,18" stroke="#8a6a45" strokeWidth="2" fill="none" strokeLinecap="round" />
          <ellipse cx="26" cy="30" rx="13" ry="8" fill="url(#leaf)" transform="rotate(-28 26 30)" />
          <ellipse cx="16" cy="42" rx="11" ry="7" fill="url(#leaf)" opacity="0.85" transform="rotate(-10 16 42)" />
          <ellipse cx="74" cy="14" rx="13" ry="8" fill="url(#leaf)" transform="rotate(24 74 14)" />
          <ellipse cx="82" cy="28" rx="11" ry="7" fill="url(#leaf)" opacity="0.85" transform="rotate(8 82 28)" />
          <ellipse cx="50" cy="14" rx="10" ry="6.5" fill="url(#leaf)" opacity="0.9" transform="rotate(-2 50 14)" />
        </svg>
      );
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

  // A single element card — pulled out so the "pick" grid below can lay
  // out a symmetric 2 / 2 / 1 (never a lonely row of 4 plus 1 stray card).
  function renderCard(el: WuXingElement) {
    const isOn = selected.includes(el.id);
    return (
      <div key={el.id} className="group relative flex flex-col items-center">
        <button
          type="button"
          onClick={() => toggle(el.id)}
          aria-pressed={isOn}
          className="flex w-32 flex-col items-center gap-3 rounded-3xl px-2 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cosmic-gold/70 sm:w-36"
        >
          <span
            className="flex aspect-square w-full items-center justify-center overflow-hidden rounded-3xl border-2 p-5 transition-all"
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
            className="font-display text-sm font-medium tracking-wide sm:text-base"
            style={{ color: isOn ? el.accent : "rgba(241,232,255,0.75)" }}
          >
            {el.name}
          </span>
          <span className="max-w-[9rem] text-center text-[11px] leading-snug text-cosmic-star/50">{el.symbol}</span>
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

            <div className="mx-auto mt-12 grid max-w-[19rem] grid-cols-2 gap-x-8 gap-y-8 sm:max-w-md sm:gap-x-10">
              {ELEMENTS.slice(0, 4).map(renderCard)}
            </div>
            <div className="mt-8 flex justify-center">{renderCard(ELEMENTS[4])}</div>

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
