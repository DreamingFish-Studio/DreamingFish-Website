"use client";

import { ArrowDown, Copy, ExternalLink, Sparkles } from "lucide-react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { FORUM_URL } from "@/lib/constants";
import { withBasePath } from "@/lib/base-path";

type HeroSectionProps = {
  onCopy: () => void;
};

export function HeroSection({ onCopy }: HeroSectionProps) {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 900], [0, reduceMotion ? 0 : 90]);

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden px-5 pt-24 sm:px-8 lg:px-10">
      <motion.div
        style={{ y, backgroundImage: `url(${withBasePath("/images/hero-dreamingfish.png")})` }}
        className="absolute inset-0 scale-105 bg-cover bg-center"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,17,17,.24),rgba(7,17,17,.54)_56%,#071111_100%),radial-gradient(circle_at_50%_42%,rgba(88,219,197,.18),transparent_36rem)]" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="mb-5 rounded-full border border-white/14 bg-white/8 px-4 py-2 text-sm text-mist/78 backdrop-blur-xl"
        >
          DreamingFish Minecraft Server
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.72, delay: 0.08 }}
          className="max-w-5xl text-balance text-5xl font-semibold leading-[1.05] tracking-normal text-white sm:text-7xl lg:text-8xl"
        >
          欢迎来到梦鱼服
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.72, delay: 0.18 }}
          className="mt-7 max-w-5xl text-pretty text-lg leading-8 text-mist/84 sm:text-xl"
        >
          一个希望为玩家带来创新体验、多样化模组玩法、长期更新、与玩家共创的公益 Minecraft 社区。
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.68, delay: 0.27 }}
          className="mt-4 max-w-2xl text-pretty text-base leading-7 text-white/58 sm:text-lg"
        >
          梦鱼服不想只做一个普通的 Minecraft 服务器。我们希望玩家能在这里共同生活、自由探索，写下属于这个世界的一部分，并在旅途中收获快乐。下一段故事，已经在守望梦屿的风声里悄然启程。
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.3 }}
          className="mt-9 flex w-full max-w-5xl flex-col justify-center gap-3 sm:flex-row sm:flex-wrap lg:flex-nowrap"
        >
          <a href="#join" className="soft-button bg-white text-night hover:bg-mist">
            <ArrowDown size={18} /> 立即加入
          </a>
          <a href="#dreamhaven" className="soft-button border-aqua/28 bg-aqua/16 text-white">
            <Sparkles size={18} /> 守望梦屿预告
          </a>
          <button type="button" onClick={onCopy} className="soft-button bg-aqua/10">
            <Copy size={18} /> 复制服务器地址
          </button>
          <a href={FORUM_URL} target="_blank" rel="noreferrer" className="soft-button">
            <ExternalLink size={18} /> 进入论坛
          </a>
        </motion.div>

        <motion.a
          href="#dreamhaven"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.68, delay: 0.68 }}
          whileHover={reduceMotion ? undefined : { y: -5 }}
          className="mt-12 flex w-full max-w-3xl flex-col gap-3 rounded-[2rem] border border-aqua/18 bg-night/36 p-5 text-left shadow-[0_24px_80px_rgba(0,0,0,.28)] backdrop-blur-2xl sm:flex-row sm:items-center sm:justify-between sm:p-6"
        >
          <span className="flex items-start gap-3">
            <span className="mt-1 rounded-full bg-aqua/14 p-2 text-aqua">
              <Sparkles size={18} />
            </span>
            <span>
              <span className="block text-sm font-semibold text-white">下一周目：守望梦屿</span>
              <span className="mt-1 block text-sm leading-6 text-mist/66">
                我们精心打造的下一周目玩法，也是准备向玩家展示的新故事起点。故事将从一片让人慢下来生活、重新开始做梦的温柔之地——梦屿讲起。
              </span>
            </span>
          </span>
          <span className="inline-flex items-center gap-2 whitespace-nowrap text-sm font-semibold text-aqua">
            查看预告 <ArrowDown size={16} />
          </span>
        </motion.a>
      </div>
    </section>
  );
}
