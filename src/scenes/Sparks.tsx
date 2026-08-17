import { useMemo } from "react";

type Spark = { top: number; left: number; size: number; delay: number; duration: number };

function makeSparks(count: number): Spark[] {
  return Array.from({ length: count }, () => ({
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: 1 + Math.random() * 2.4,
    delay: Math.random() * 4,
    duration: 2.5 + Math.random() * 3,
  }));
}

/**
 * A field of small twinkling points of light — cheap, generic "life" for a
 * starlit backdrop. Shared between the intro and the corridor so both of
 * the very first screens read as gently in motion rather than static.
 */
export function Sparks({ count = 60, className = "" }: { count?: number; className?: string }) {
  const sparks = useMemo(() => makeSparks(count), [count]);
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden>
      {sparks.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-cosmic-star mix-blend-screen"
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
