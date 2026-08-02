"use client";

import { AnimatePresence, motion } from "framer-motion";

type CopyToastProps = {
  message: string | null;
};

export function CopyToast({ message }: CopyToastProps) {
  return (
    <AnimatePresence>
      {message ? (
        <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[80] flex justify-center px-5 sm:bottom-8">
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            className="w-[min(92vw,420px)] rounded-full border border-white/15 bg-night/85 px-5 py-3 text-center text-sm text-mist shadow-glow backdrop-blur-xl"
            role="status"
            aria-live="polite"
          >
            {message}
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
