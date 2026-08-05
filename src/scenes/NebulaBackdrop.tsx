import { useMemo } from "react";

type Star = { top: number; left: number; size: number; delay: number; duration: number };

function makeStars(count: number): Star[] {
  return Array.from({ length: count }, () => ({
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: 1 + Math.random() * 2,
    delay: Math.random() * 4,
    duration: 2.5 + Math.random() * 3,
  }));
}

/**
 * Shared starfield + nebula backdrop for the scenes that don't have a
 * photographic background (the portal junction and the placeholder rooms) —
 * keeps them visually consistent with the corridor photo's palette.
 */
export function NebulaBackdrop({ starCount = 140 }: { starCount?: number }) {
  const stars = useMemo(() => makeStars(starCount), [starCount]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 15%, #1c1148 0%, #0d0726 45%, #07040f 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-70 mix-blend-screen"
        style={{
          background:
            "radial-gradient(45% 55% at 15% 25%, rgba(76,42,143,0.55), transparent 70%), radial-gradient(40% 50% at 85% 20%, rgba(20,166,150,0.35), transparent 70%), radial-gradient(50% 60% at 50% 0%, rgba(138,95,214,0.4), transparent 65%)",
        }}
      />
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
    </div>
  );
}
