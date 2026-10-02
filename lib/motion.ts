"use client";

import type { CSSProperties, RefObject } from "react";
import { useReducedMotion, useScroll, useTransform } from "framer-motion";

/** Stagger delay consumed by the `[data-reveal]` entrance animation in globals.css. */
export function revealDelay(index: number, step = 90): CSSProperties {
  return { "--rd": `${index * step}ms` } as CSSProperties;
}

/** Vertical drift for a media layer while its container crosses the viewport. */
export function useParallax(target: RefObject<HTMLElement | null>, distance = 48) {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target, offset: ["start end", "end start"] });
  return useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [-distance, distance]);
}
