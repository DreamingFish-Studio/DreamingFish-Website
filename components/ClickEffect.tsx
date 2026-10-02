"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

type Orb = { dx: number; rise: number; size: number; delay: number };

type OrbBurst = {
  id: number;
  x: number;
  y: number;
  orbs: Orb[];
};

// A few glowing experience orbs float up from each click.
function createOrbs(): Orb[] {
  return Array.from({ length: 4 }, () => ({
    dx: Math.random() * 56 - 28,
    rise: 42 + Math.random() * 38,
    size: 6 + Math.round(Math.random() * 4),
    delay: Math.random() * 0.12
  }));
}

export function ClickEffect() {
  const [bursts, setBursts] = useState<OrbBurst[]>([]);
  const nextIdRef = useRef(0);
  const reduceMotion = useReducedMotion();

  const removeBurst = useCallback((id: number) => {
    setBursts((current) => current.filter((burst) => burst.id !== id));
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (event.pointerType === "mouse" && event.button !== 0) {
        return;
      }

      const target = event.target as HTMLElement | null;
      if (target?.closest("[data-disable-click-effect='true']")) {
        return;
      }

      const id = nextIdRef.current + 1;
      nextIdRef.current = id;
      setBursts((current) => [...current.slice(-6), { id, x: event.clientX, y: event.clientY, orbs: createOrbs() }]);
    };

    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    return () => window.removeEventListener("pointerdown", handlePointerDown);
  }, [reduceMotion]);

  if (reduceMotion) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[90] overflow-hidden" aria-hidden="true">
      {bursts.map((burst) => (
        <div key={burst.id} className="absolute" style={{ left: burst.x, top: burst.y }}>
          {burst.orbs.map((orb, index) => (
            <motion.span
              key={index}
              className="xp-orb"
              style={{ width: orb.size, height: orb.size }}
              initial={{ x: 0, y: 0, opacity: 0, scale: 0.4 }}
              animate={{ x: [0, orb.dx * 0.6, orb.dx], y: [0, -orb.rise * 0.7, -orb.rise], opacity: [0, 1, 0], scale: [0.4, 1, 0.8] }}
              transition={{ duration: 0.85, delay: orb.delay, ease: "easeOut" }}
              onAnimationComplete={index === 0 ? () => removeBurst(burst.id) : undefined}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
