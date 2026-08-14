import { useRef } from "react";
import { useMotionValue, useSpring, useTransform } from "framer-motion";

/**
 * Pointer-driven 3D tilt — spring-smoothed rotateX/rotateY derived from where
 * the pointer sits inside the element, plus the `perspective` needed on the
 * wrapping element for the rotation to actually read as depth rather than a
 * flat skew. Shared by the corridor and the portal so the whole experience
 * feels like one consistent, interactive space rather than a static image.
 */
export function usePointerTilt(maxDeg = 6) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const springX = useSpring(px, { stiffness: 55, damping: 14, mass: 0.6 });
  const springY = useSpring(py, { stiffness: 55, damping: 14, mass: 0.6 });
  const rotateY = useTransform(springX, [0, 1], [-maxDeg, maxDeg]);
  const rotateX = useTransform(springY, [0, 1], [maxDeg, -maxDeg]);

  function onPointerMove(e: React.PointerEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  }

  function onPointerLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  return { ref, rotateX, rotateY, onPointerMove, onPointerLeave };
}
