import { useMemo, type CSSProperties } from "react";
import type { JourneyId } from "./journeys";

type Star = { top: number; left: number; size: number; delay: number; duration: number };

function makeStars(count: number, seedSpread = 100): Star[] {
  return Array.from({ length: count }, () => ({
    top: Math.random() * seedSpread,
    left: Math.random() * 100,
    size: 1 + Math.random() * 2,
    delay: Math.random() * 4,
    duration: 2.5 + Math.random() * 3,
  }));
}

/**
 * Each journey gets its own drifting, layered backdrop — no photographic
 * assets (none could be generated in this environment), but real motion:
 * every layer is duplicated and slid via the same seamless marquee technique
 * used elsewhere on the site, so nothing visibly jumps or resets.
 */
export function ThemeBackdrop({ theme }: { theme: JourneyId }) {
  switch (theme) {
    case "galassie":
      return <GalaxyBackdrop />;
    case "mare":
      return <SeaBackdrop />;
    case "montagna":
      return <MountainBackdrop />;
    case "geometrico":
      return <GeometricBackdrop />;
    case "pietre":
    default:
      return <GalaxyBackdrop dim />;
  }
}

function GalaxyBackdrop({ dim = false }: { dim?: boolean }) {
  const stars = useMemo(() => makeStars(150), []);
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(120% 90% at 50% 15%, #1c1148 0%, #0d0726 45%, #07040f 100%)" }}
      />
      <div
        className="absolute inset-0 opacity-70 mix-blend-screen"
        style={{
          background:
            "radial-gradient(45% 55% at 15% 25%, rgba(76,42,143,0.55), transparent 70%), radial-gradient(40% 50% at 85% 20%, rgba(20,166,150,0.3), transparent 70%), radial-gradient(50% 60% at 50% 0%, rgba(138,95,214,0.4), transparent 65%)",
        }}
      />

      {/* two large drifting spiral galaxies, seamless horizontal loop */}
      <div className="absolute inset-y-0 left-0 h-full w-[200%]" style={{ animation: "drift-x 130s linear infinite" }}>
        <SpiralGalaxy style={{ top: "6%", left: "8%", width: "30%", height: "30%" }} />
        <SpiralGalaxy style={{ top: "48%", left: "36%", width: "18%", height: "18%", opacity: 0.55 }} flip />
        <SpiralGalaxy style={{ top: "6%", left: "58%", width: "30%", height: "30%" }} />
        <SpiralGalaxy style={{ top: "48%", left: "86%", width: "18%", height: "18%", opacity: 0.55 }} flip />
      </div>

      {stars.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-cosmic-star"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}

      {dim && <div className="absolute inset-0 bg-black/35" />}
    </div>
  );
}

function SpiralGalaxy({
  style,
  flip = false,
}: {
  style: CSSProperties;
  flip?: boolean;
}) {
  const arms = [0, 60, 120, 180, 240, 300];
  const dust = useMemo(
    () =>
      arms.flatMap((rot, ai) =>
        Array.from({ length: 5 }, (_, i) => {
          const t = (i + 1) / 6; // 0..1 along the arm
          const angle = ((rot + t * 55) * Math.PI) / 180;
          const r = 22 + t * 68;
          return {
            key: `${ai}-${i}`,
            cx: 100 + Math.cos(angle) * r,
            cy: 100 + Math.sin(angle) * r,
            r: 0.9 + Math.random() * 1.1,
            o: 0.85 - t * 0.55,
          };
        }),
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  return (
    <svg
      viewBox="0 0 200 200"
      style={{ ...style, transform: flip ? "scaleX(-1)" : undefined, position: "absolute" }}
      aria-hidden
    >
      <defs>
        <radialGradient id="galaxy-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff6df" stopOpacity="1" />
          <stop offset="25%" stopColor="#e8d9fb" stopOpacity="0.6" />
          <stop offset="55%" stopColor="#c9a6f0" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#c9a6f0" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="95" fill="url(#galaxy-core)" />
      <circle cx="100" cy="100" r="10" fill="#fff8ea" opacity="0.9" />
      {arms.map((rot) => (
        <path
          key={rot}
          d="M100,100 C124,94 150,72 152,42 C153,26 145,14 132,10"
          fill="none"
          stroke="#e8d9fb"
          strokeOpacity="0.55"
          strokeWidth="2.4"
          strokeLinecap="round"
          transform={`rotate(${rot} 100 100)`}
        />
      ))}
      {dust.map((d) => (
        <circle key={d.key} cx={d.cx} cy={d.cy} r={d.r} fill="#fff6df" opacity={d.o} />
      ))}
    </svg>
  );
}

function SeaBackdrop() {
  const stars = useMemo(() => makeStars(50, 45), []);
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #061224 0%, #0a2438 32%, #0d3a4a 55%, #0a2a34 100%)",
        }}
      />
      <div
        className="absolute inset-x-0 top-0 h-[45%] opacity-60"
        style={{ background: "radial-gradient(60% 100% at 50% 0%, rgba(232,193,104,0.18), transparent 70%)" }}
      />
      {stars.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-cosmic-star"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size * 0.8,
            height: s.size * 0.8,
            animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}

      {/* three wave layers, each a seamless duplicated strip drifting at a different speed/depth */}
      <WaveLayer bottom="0%" opacity={0.55} duration={26} color="#0e5c66" />
      <WaveLayer bottom="6%" opacity={0.45} duration={19} color="#14a696" reverse />
      <WaveLayer bottom="13%" opacity={0.3} duration={14} color="#2fe0c8" />

      {/* sparkle of light on the water */}
      <div
        className="absolute inset-x-0 bottom-[8%] h-[20%] opacity-40 mix-blend-screen"
        style={{
          background:
            "repeating-linear-gradient(100deg, transparent 0 3%, rgba(255,246,223,0.5) 3% 3.4%, transparent 3.4% 7%)",
          animation: "drift-x 9s linear infinite",
        }}
      />
    </div>
  );
}

function WaveLayer({
  bottom,
  opacity,
  duration,
  color,
  reverse = false,
}: {
  bottom: string;
  opacity: number;
  duration: number;
  color: string;
  reverse?: boolean;
}) {
  const wave = "M0,20 C 25,45 75,-5 100,20 L100,60 L0,60 Z";
  return (
    <div
      className="absolute inset-x-0 h-[18%] w-[200%]"
      style={{
        bottom,
        opacity,
        animation: `drift-x ${duration}s linear infinite`,
        animationDirection: reverse ? "reverse" : "normal",
      }}
    >
      <svg viewBox="0 0 100 60" preserveAspectRatio="none" className="h-full w-1/2 float-left">
        <path d={wave} fill={color} />
      </svg>
      <svg viewBox="0 0 100 60" preserveAspectRatio="none" className="h-full w-1/2 float-left">
        <path d={wave} fill={color} />
      </svg>
    </div>
  );
}

function MountainBackdrop() {
  const stars = useMemo(() => makeStars(80, 55), []);
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, #0b1030 0%, #1a2447 38%, #2c3f5e 62%, #1a2233 100%)",
        }}
      />
      <div
        className="absolute inset-x-0 top-[8%] h-[35%] opacity-70"
        style={{ background: "radial-gradient(55% 100% at 50% 0%, rgba(232,193,104,0.22), transparent 75%)" }}
      />
      {stars.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-cosmic-star"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size * 0.8,
            height: s.size * 0.8,
            animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}

      <MountainLayer bottom="0%" height="42%" opacity={0.95} duration={70} color="#141b30" peaks="0,80 15,25 30,55 48,10 65,50 82,20 100,60 100,100 0,100" />
      <MountainLayer bottom="0%" height="34%" opacity={0.8} duration={48} color="#212f4d" peaks="0,90 18,40 34,65 52,20 70,58 88,30 100,70 100,100 0,100" reverse />
      <MountainLayer bottom="0%" height="24%" opacity={0.65} duration={30} color="#3c5a78" peaks="0,95 20,55 40,75 58,35 78,68 100,45 100,100 0,100" />

      {/* slow drifting mist band */}
      <div
        className="absolute inset-x-0 bottom-[16%] h-[10%] opacity-25 blur-sm"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
          width: "200%",
          animation: "drift-x 22s linear infinite",
        }}
      />
    </div>
  );
}

function MountainLayer({
  bottom,
  height,
  opacity,
  duration,
  color,
  peaks,
  reverse = false,
}: {
  bottom: string;
  height: string;
  opacity: number;
  duration: number;
  color: string;
  peaks: string;
  reverse?: boolean;
}) {
  return (
    <div
      className="absolute inset-x-0 w-[200%]"
      style={{
        bottom,
        height,
        opacity,
        animation: `drift-x ${duration}s linear infinite`,
        animationDirection: reverse ? "reverse" : "normal",
      }}
    >
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-1/2 float-left">
        <polygon points={peaks} fill={color} />
      </svg>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-1/2 float-left">
        <polygon points={peaks} fill={color} />
      </svg>
    </div>
  );
}

function GeometricBackdrop() {
  const stars = useMemo(() => makeStars(70, 100), []);
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(120% 90% at 50% 40%, #2a1030 0%, #150a24 55%, #07040f 100%)" }}
      />
      {stars.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-cosmic-star"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size * 0.7,
            height: s.size * 0.7,
            animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}

      <div
        className="absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 opacity-45"
        style={{ animation: "spin-slow 90s linear infinite" }}
      >
        <SacredGeometry />
      </div>
      <div
        className="absolute left-1/2 top-1/2 h-[46vmin] w-[46vmin] -translate-x-1/2 -translate-y-1/2 opacity-60"
        style={{ animation: "spin-slow-reverse 60s linear infinite" }}
      >
        <SacredGeometry />
      </div>
    </div>
  );
}

function SacredGeometry() {
  const circles = Array.from({ length: 6 }, (_, i) => {
    const angle = (i / 6) * Math.PI * 2;
    const r = 26;
    return { cx: 50 + Math.cos(angle) * r, cy: 50 + Math.sin(angle) * r };
  });
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full">
      <circle cx="50" cy="50" r="26" fill="none" stroke="#e8c168" strokeOpacity="0.5" strokeWidth="0.4" />
      {circles.map((c, i) => (
        <circle key={i} cx={c.cx} cy={c.cy} r="26" fill="none" stroke="#e8c168" strokeOpacity="0.35" strokeWidth="0.35" />
      ))}
      <polygon
        points="50,8 88,29 88,71 50,92 12,71 12,29"
        fill="none"
        stroke="#e0698a"
        strokeOpacity="0.4"
        strokeWidth="0.3"
      />
    </svg>
  );
}
