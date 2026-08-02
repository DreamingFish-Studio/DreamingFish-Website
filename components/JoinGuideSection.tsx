"use client";

import { Copy } from "lucide-react";
import { motion } from "framer-motion";
import { cardContainerMotion, cardMotion, joinSteps, sectionMotion } from "@/lib/site-data";

type JoinGuideSectionProps = {
  onCopy: () => void;
};

export function JoinGuideSection({ onCopy }: JoinGuideSectionProps) {
  return (
    <section id="join" className="section-shell">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-120px" }}
        variants={sectionMotion}
        transition={{ duration: 0.65 }}
        className="mx-auto max-w-3xl text-center"
      >
        <p className="text-sm font-medium uppercase tracking-[0.22em] text-aqua/80">Join Guide</p>
        <h2 className="mt-4 text-4xl font-semibold leading-tight text-white sm:text-5xl">加入梦鱼服</h2>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={cardContainerMotion}
        className="relative mx-auto mt-14 grid max-w-5xl gap-5"
      >
        <div className="absolute left-6 top-8 hidden h-[calc(100%-4rem)] w-px bg-gradient-to-b from-aqua/60 via-white/12 to-transparent md:block" />
        {joinSteps.map((step, index) => (
          <motion.article
            key={step.title}
            variants={cardMotion}
            className="glass-card relative grid gap-5 rounded-3xl p-6 md:grid-cols-[4rem_1fr_auto] md:items-center"
          >
            <div className="grid h-12 w-12 place-items-center rounded-2xl border border-aqua/30 bg-aqua/12 text-lg font-semibold text-aqua">
              {index + 1}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-7 text-mist/68">{step.description}</p>
            </div>
            {step.title === "复制服务器地址" ? (
              <button type="button" onClick={onCopy} className="soft-button w-full md:w-auto">
                <Copy size={17} /> 复制地址
              </button>
            ) : null}
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
