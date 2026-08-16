import type { ReactNode } from "react";
import { motion, type MotionValue } from "framer-motion";

/**
 * Wraps a scene's panorama (photo or procedural backdrop) so it responds to
 * the pointer-tilt already computed for that scene and breathes with a slow,
 * endless zoom — the same "the world moves as you look around" treatment
 * applied consistently everywhere: the intro poster, the portal, and every
 * journey room. UI content (cards, text, buttons) stays outside this
 * wrapper so it never tilts and stays legible.
 */
export function TiltedBackdrop({
  children,
  rotateX,
  rotateY,
  duration = 26,
}: {
  children: ReactNode;
  rotateX: MotionValue<number>;
  rotateY: MotionValue<number>;
  duration?: number;
}) {
  return (
    <motion.div
      className="absolute inset-0 overflow-hidden"
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      animate={{ scale: [1, 1.045, 1] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
