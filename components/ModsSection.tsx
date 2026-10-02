"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Boxes, Cog, Lamp, Map, Mountain, Swords, Wheat } from "lucide-react";
import { SectionHead } from "@/components/SectionHead";
import { modCategories, mods } from "@/lib/site-data";

const modIcons = [Cog, Wheat, Mountain, Lamp, Map, Swords];
const ease = [0.16, 1, 0.3, 1] as const;

export function ModsSection() {
  const [activeCategory, setActiveCategory] = useState("全部");
  const filteredMods = mods.filter((mod) => activeCategory === "全部" || mod.category === activeCategory);

  return (
    <section id="mods" className="mods">
      <div className="shell">
        <SectionHead eyebrow="Modpack" index={4} />
        <div className="section-intro" data-reveal>
          <h2 className="mc-heading is-left"><span className="logo-3d is-small" data-text="多模组，">多模组，</span><span className="logo-3d is-small is-aqua" data-text="不只是堆数量">不只是堆数量</span></h2>
          <p>我们不会做水槽包式的模组堆砌，而是围绕服务器节奏和守望梦屿的玩法需要挑选内容，并在此基础上进行调整、魔改和必要的自研开发。目标不是把模组越堆越多，而是让每个系统都真正服务于生存、探索、剧情推进与长期稳定体验。</p>
        </div>

        <div className="creative" data-reveal>
          <div className="creative-tabs" role="group" aria-label="按模组分类筛选">
            {modCategories.map((category) => (
              <button key={category} type="button" onClick={() => setActiveCategory(category)} aria-pressed={activeCategory === category} className={activeCategory === category ? "is-selected" : ""}>
                {category}
              </button>
            ))}
          </div>
          <div className="creative-panel">
            <div className="tooltip-grid" aria-live="polite" aria-atomic="true">
              <AnimatePresence mode="popLayout" initial={false}>
                {filteredMods.length ? filteredMods.map((mod) => {
                  const Icon = modIcons[mods.indexOf(mod)];
                  return (
                    <motion.article layout key={mod.name} className={`mc-tooltip ${mod.isCore ? "is-core" : ""}`} initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.94 }} transition={{ duration: 0.4, ease }}>
                      <div className="tooltip-head">
                        <span className="tooltip-slot"><Icon size={24} strokeWidth={2} aria-hidden="true" /></span>
                        <h3>{mod.name}</h3>
                        {mod.isCore ? <span className="core-tag">核心</span> : null}
                      </div>
                      <p>{mod.description}</p>
                      <span className="tooltip-source">{mod.category}</span>
                    </motion.article>
                  );
                }) : (
                  <motion.div key="empty" className="creative-empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <Boxes size={30} strokeWidth={1.8} aria-hidden="true" />
                    <p>暂无此分类的模组</p>
                    <button type="button" onClick={() => setActiveCategory("全部")} className="mc-btn mc-btn-sm">查看全部模组</button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
