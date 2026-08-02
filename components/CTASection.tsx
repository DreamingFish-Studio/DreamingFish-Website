"use client";

import { Copy, ExternalLink, ListChecks } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { FORUM_URL } from "@/lib/constants";
import { sectionMotion } from "@/lib/site-data";

type CTASectionProps = {
  onCopy: () => void;
};

export function CTASection({ onCopy }: CTASectionProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="section-shell">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-120px" }}
        variants={sectionMotion}
        transition={{ duration: 0.65 }}
        className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(10,38,35,.95),rgba(7,17,17,.98)_48%,rgba(27,26,15,.92))] px-6 py-16 text-center shadow-2xl shadow-black/35 sm:px-12"
      >
        <div className="absolute inset-0 opacity-30" aria-hidden="true">
          <div className="absolute left-[12%] top-10 h-10 w-10 border border-aqua/35 bg-aqua/10" />
          <div className="absolute right-[18%] top-20 h-6 w-6 border border-gold/35 bg-gold/10" />
          <div className="absolute bottom-14 left-[24%] h-7 w-7 border border-white/20 bg-white/8" />
          <div className="absolute bottom-20 right-[12%] h-12 w-12 border border-aqua/20 bg-aqua/8" />
        </div>
        <motion.div animate={reduceMotion ? undefined : { y: [0, -4, 0] }} transition={{ duration: 6, repeat: Infinity }}>
          <h2 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">准备好加入梦鱼服了吗？</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-mist/72">
            复制服务器地址，安装整合包，和其他玩家一起开始属于你的多模组生存旅程。
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <button type="button" onClick={onCopy} className="soft-button bg-white text-night hover:bg-mist">
              <Copy size={18} /> 复制服务器地址
            </button>
            <a href="#join" className="soft-button">
              <ListChecks size={18} /> 查看加入教程
            </a>
            <a href={FORUM_URL} target="_blank" rel="noreferrer" className="soft-button">
              <ExternalLink size={18} /> 进入论坛
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
