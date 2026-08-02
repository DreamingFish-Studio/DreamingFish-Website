"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";
import { cardContainerMotion, cardMotion, modCategories, mods, sectionMotion } from "@/lib/site-data";

export function ModsSection() {
  const [activeCategory, setActiveCategory] = useState("全部");
  const reduceMotion = useReducedMotion();
  const filteredMods = useMemo(
    () => mods.filter((mod) => activeCategory === "全部" || mod.category === activeCategory),
    [activeCategory]
  );

  return (
    <section id="mods" className="section-shell">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-120px" }}
        variants={sectionMotion}
        transition={{ duration: 0.65 }}
        className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end"
      >
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-gold/80">Modpack</p>
          <h2 className="mt-4 text-4xl font-semibold leading-tight text-white sm:text-5xl">多模组，不只是堆数量</h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-mist/70">
            我们不会做水槽包式的模组堆砌，而是围绕服务器节奏和守望梦屿的玩法需要挑选内容，并在此基础上进行调整、魔改和必要的自研开发。目标不是把模组越堆越多，而是让每个系统都真正服务于生存、探索、剧情推进与长期稳定体验。
          </p>
        </div>
      </motion.div>

      <div className="mt-8 flex flex-wrap gap-3">
        {modCategories.map((category) => {
          const active = activeCategory === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`focus-ring rounded-full border px-4 py-2 text-sm transition ${
                active
                  ? "border-aqua/50 bg-aqua/18 text-white shadow-glow"
                  : "border-white/10 bg-white/[0.04] text-mist/70 hover:border-white/22 hover:text-white"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      <motion.div
        key={activeCategory}
        initial="hidden"
        animate="visible"
        variants={cardContainerMotion}
        className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3"
      >
        {filteredMods.map((mod) => (
          <motion.article
            key={mod.name}
            variants={cardMotion}
            whileHover={reduceMotion ? undefined : { y: -5 }}
            className="glass-card rounded-3xl p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs text-aqua/75">{mod.category}</p>
                <h3 className="mt-2 text-2xl font-semibold text-white">{mod.name}</h3>
              </div>
              {mod.isCore ? (
                <span className="rounded-full border border-gold/35 bg-gold/12 px-3 py-1 text-xs text-gold">核心</span>
              ) : null}
            </div>
            <p className="mt-5 text-sm leading-7 text-mist/68">{mod.description}</p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
