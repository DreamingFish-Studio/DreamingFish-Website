"use client";

import { AnimatePresence, motion } from "framer-motion";
import { PixelFish } from "@/components/PixelFish";

type CopyToastProps = {
  message: string | null;
};

// Styled after the game's "advancement made" toast: a headline and a detail line.
export function CopyToast({ message }: CopyToastProps) {
  const [headline, detail] = message ? message.split("：") : [];

  return (
    <div className="toast-region" role="status" aria-live="polite">
      <AnimatePresence>
        {message ? (
          <motion.div
            key="toast"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 60 }}
            transition={{ type: "spring", stiffness: 420, damping: 34 }}
            className="adv-toast"
          >
            <span className="adv-toast-icon" aria-hidden="true"><PixelFish /></span>
            <span className="adv-toast-copy">
              <span className="adv-toast-title">{detail ? `${headline}：` : headline}</span>
              {detail ? <span className="adv-toast-detail">{detail}</span> : null}
            </span>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
