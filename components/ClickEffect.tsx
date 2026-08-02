"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

type ClickBurst = {
  id: number;
  x: number;
  y: number;
  rotation: number;
  variant: number;
  size: number;
};

export function ClickEffect() {
  const [bursts, setBursts] = useState<ClickBurst[]>([]);
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

      setBursts((current) => [
        ...current.slice(-8),
        {
          id,
          x: event.clientX,
          y: event.clientY,
          rotation: Math.random() * 60 - 30,
          variant: Math.floor(Math.random() * 4),
          size: Math.random() * 18 + 74
        }
      ]);
    };

    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    return () => window.removeEventListener("pointerdown", handlePointerDown);
  }, [reduceMotion]);

  if (reduceMotion) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[90] overflow-hidden" aria-hidden="true">
      <AnimatePresence>
        {bursts.map((burst) => (
          <motion.div
            key={burst.id}
            initial={{ opacity: 0.86, scale: 0.48, rotate: burst.rotation }}
            animate={{ opacity: 0, scale: 1.55, rotate: burst.rotation + 18 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.72, ease: "easeOut" }}
            onAnimationComplete={() => removeBurst(burst.id)}
            className="absolute"
            style={{
              height: burst.size,
              left: burst.x - burst.size / 2,
              top: burst.y - burst.size / 2,
              width: burst.size
            }}
          >
            <BurstShape variant={burst.variant} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

function BurstShape({ variant }: { variant: number }) {
  if (variant === 1) {
    return (
      <>
        <span className="absolute inset-1 rounded-[30%] border border-aqua/42 shadow-[0_0_28px_rgba(88,219,197,0.24)]" />
        <span className="absolute inset-[22%] rounded-full border border-gold/35" />
        <span className="absolute left-1/2 top-1/2 h-[16%] w-[16%] -translate-x-1/2 -translate-y-1/2 rounded-[5px] bg-aqua/70 shadow-[0_0_18px_rgba(88,219,197,0.58)]" />
        <span className="absolute left-[18%] top-[16%] h-[10%] w-[10%] rounded-[3px] bg-white/68" />
        <span className="absolute bottom-[17%] right-[22%] h-[12%] w-[12%] rounded-[4px] border border-aqua/70" />
      </>
    );
  }

  if (variant === 2) {
    return (
      <>
        <span className="absolute inset-0 rounded-full border border-gold/42 shadow-[0_0_26px_rgba(229,200,120,0.18)]" />
        <span className="absolute inset-[16%] rounded-[6px] border border-aqua/38 rotate-45" />
        <span className="absolute left-1/2 top-1/2 h-[14%] w-[14%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/72 shadow-[0_0_16px_rgba(229,200,120,0.42)]" />
        <span className="absolute right-[12%] top-[28%] h-[8%] w-[8%] rounded-[3px] bg-aqua/70" />
        <span className="absolute bottom-[20%] left-[18%] h-[7%] w-[7%] rounded-full bg-white/60" />
      </>
    );
  }

  if (variant === 3) {
    return (
      <>
        <span className="absolute inset-[7%] rounded-[8px] border border-white/20 rotate-45" />
        <span className="absolute inset-[12%] rounded-full border border-aqua/45 shadow-[0_0_28px_rgba(88,219,197,0.24)]" />
        <span className="absolute left-1/2 top-1/2 h-[13%] w-[13%] -translate-x-1/2 -translate-y-1/2 rounded-[4px] bg-aqua/72" />
        <span className="absolute left-[12%] top-[47%] h-[9%] w-[9%] rounded-[3px] border border-gold/70" />
        <span className="absolute right-[16%] top-[15%] h-[8%] w-[8%] rounded-[3px] bg-white/68" />
      </>
    );
  }

  return (
    <>
      <span className="absolute inset-0 rounded-full border border-aqua/45 shadow-[0_0_28px_rgba(88,219,197,0.24)]" />
      <span className="absolute inset-[15%] rounded-full border border-white/18" />
      <span className="absolute left-1/2 top-1/2 h-[15%] w-[15%] -translate-x-1/2 -translate-y-1/2 rounded-[4px] bg-aqua/70 shadow-[0_0_18px_rgba(88,219,197,0.58)]" />
      <span className="absolute left-[10%] top-[15%] h-[10%] w-[10%] rounded-[3px] bg-gold/70" />
      <span className="absolute bottom-[10%] right-[20%] h-[12%] w-[12%] rounded-[3px] border border-aqua/70" />
      <span className="absolute right-[6%] top-[35%] h-[8%] w-[8%] rounded-[2px] bg-white/70" />
    </>
  );
}
