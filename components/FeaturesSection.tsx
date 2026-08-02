"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cardContainerMotion, cardMotion, features, sectionMotion } from "@/lib/site-data";

export function FeaturesSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="features" className="section-shell">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-120px" }}
        variants={sectionMotion}
        transition={{ duration: 0.65 }}
        className="mx-auto max-w-3xl text-center"
      >
        <p className="text-sm font-medium uppercase tracking-[0.22em] text-aqua/80">Play Style</p>
        <h2 className="mt-4 text-4xl font-semibold leading-tight text-white sm:text-5xl">服务器特色</h2>
        <p className="mt-5 text-lg leading-8 text-mist/70">
          梦鱼服不希望只靠一时热闹维持氛围，而是用清晰规则、公平环境、玩家协作和持续更新支撑长期游玩。
        </p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={cardContainerMotion}
        className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
      >
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <motion.article
              key={feature.title}
              variants={cardMotion}
              whileHover={reduceMotion ? undefined : { y: -6 }}
              className="glass-card rounded-3xl p-7 transition hover:border-aqua/30"
            >
              <div className="grid h-12 w-12 place-items-center rounded-2xl border border-aqua/25 bg-aqua/10 text-aqua">
                <Icon size={22} aria-hidden="true" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-white">{feature.title}</h3>
              <p className="mt-3 text-sm leading-7 text-mist/66">{feature.description}</p>
            </motion.article>
          );
        })}
      </motion.div>
    </section>
  );
}
