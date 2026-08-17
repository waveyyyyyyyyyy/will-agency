import { useRef } from "react";
import { useMotionValue, useSpring, useTransform } from "framer-motion";

// Toned down across the board after feedback that the tilt read as too
// strong — scales every call site's requested strength down by the same
// amount, so no per-scene number needs to be retuned individually.
const TILT_SCALE = 0.5;

/**
 * Pointer-driven 3D tilt — spring-smoothed rotateX/rotateY derived from where
 * the pointer sits inside the element, plus the `perspective` needed on the
 * wrapping element for the rotation to actually read as depth rather than a
 * flat skew. Shared by the corridor and the portal so the whole experience
 * feels like one consistent, interactive space rather than a static image.
 *
 * Mouse/pen only — touch is deliberately ignored. There's no hover on a
 * touchscreen, and reacting to the small, jittery pointer movement a tap
 * naturally produces was shifting 3D-transformed hit targets (like the
 * corridor's diamond) out from under the finger between touchstart and
 * touchend, making them miss.
 */
export function usePointerTilt(maxDegRequested = 6) {
  const maxDeg = maxDegRequested * TILT_SCALE;
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const springX = useSpring(px, { stiffness: 55, damping: 14, mass: 0.6 });
  const springY = useSpring(py, { stiffness: 55, damping: 14, mass: 0.6 });
  const rotateY = useTransform(springX, [0, 1], [-maxDeg, maxDeg]);
  const rotateX = useTransform(springY, [0, 1], [maxDeg, -maxDeg]);

  function onPointerMove(e: React.PointerEvent) {
    if (e.pointerType !== "mouse" && e.pointerType !== "pen") return;
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
