"use client";

import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { FORUM_URL } from "@/lib/constants";
import { cardContainerMotion, cardMotion, changelog, sectionMotion } from "@/lib/site-data";

export function ChangelogSection() {
  return (
    <section id="changelog" className="section-shell">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-120px" }}
        variants={sectionMotion}
        transition={{ duration: 0.65 }}
        className="mx-auto max-w-3xl text-center"
      >
        <p className="text-sm font-medium uppercase tracking-[0.22em] text-gold/80">Changelog</p>
        <h2 className="mt-4 text-4xl font-semibold leading-tight text-white sm:text-5xl">更新日志</h2>
        <p className="mt-5 text-lg leading-8 text-mist/70">
          服务器和官网都在持续完善，所有重要调整都会被记录下来。
        </p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={cardContainerMotion}
        className="mx-auto mt-14 max-w-4xl"
      >
        {changelog.map((item) => (
          <motion.article key={`${item.date}-${item.title}`} variants={cardMotion} className="relative border-l border-white/12 pb-9 pl-7 last:pb-0">
            <span className="absolute -left-[7px] top-1 h-3.5 w-3.5 rounded-full border border-aqua/60 bg-night shadow-glow" />
            <div className="glass-card rounded-3xl p-6">
              <div className="flex flex-wrap items-center gap-3">
                <time className="text-sm text-aqua/78">{item.date}</time>
                <span className="rounded-full border border-gold/25 bg-gold/10 px-3 py-1 text-xs text-gold">{item.tag}</span>
              </div>
              <h3 className="mt-3 text-xl font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-7 text-mist/66">{item.description}</p>
            </div>
          </motion.article>
        ))}
      </motion.div>

      <div className="mt-12 text-center">
        <a href={FORUM_URL} target="_blank" rel="noreferrer" className="soft-button bg-white text-night hover:bg-mist">
          进入论坛查看更多 <ExternalLink size={17} />
        </a>
      </div>
    </section>
  );
}
