"use client";

import Image from "next/image";
import { useRef } from "react";
import { ArrowRight, BookOpen, HeartPulse, Play, Users } from "lucide-react";
import { motion } from "framer-motion";
import { SectionHead } from "@/components/SectionHead";
import { withBasePath } from "@/lib/base-path";
import { revealDelay, useParallax } from "@/lib/motion";

const previewItems = [
  {
    title: "灾变后的生存",
    description: "梦屿不再只是安静的世外桃源。污染、危险区域和异常变化会让每一次外出都需要准备与判断。",
    icon: HeartPulse,
    image: "/dreamhaven/assets/world-disaster.png"
  },
  {
    title: "探索推动故事",
    description: "废墟记录、广播异常、 NPC 对话和玩家讨论都会成为线索。故事不是被任务栏推着走，而是被玩家发现出来。",
    icon: BookOpen,
    image: "/dreamhaven/assets/clue-notebook.png"
  },
  {
    title: "全服共同选择",
    description: "有人建造据点，有人整理信息，有人承担危险。服务器的故事推进，会依赖玩家之间的分工和共同选择。",
    icon: Users,
    image: "/dreamhaven/assets/survival-coop.png"
  }
];

const pages = [
  "守望梦屿是梦鱼服正在精心开发的下一周目玩法，也是我们准备向玩家展示的新故事起点。它会把“合作生存”往前推进一步，让你从灾变后的大陆里重新理解探索、建造和彼此依赖的意义。梦屿曾是一片让人慢下来生活、重新开始做梦的温柔之地，而现在，污染、失序与未知危机正在改变它。玩家将以幸存者的身份踏入梦屿，在建造据点、寻找记录、整理线索、推进剧情任务、发展人物关系和彼此协作中，一步步推动服务器故事向前发展。",
  "在这里，线索不会只是收藏品。你需要和伙伴分享发现，判断记录是否可信，推理灾难真正的成因，并决定下一步该如何行动。请不要完全依赖他人的结论：如果错误的判断让梦屿走向毁灭，你也可能成为其中的推手；而如果你能从混乱的信息中找到真正的破局之法，也许你就会成为改变梦屿未来的关键。"
];

export function DreamHavenSection() {
  const artRef = useRef<HTMLDivElement>(null);
  const artY = useParallax(artRef, 40);

  return (
    <section id="dreamhaven" className="dh">
      <div className="shell">
        <SectionHead eyebrow="Next Season" index={1} />
        <h2 className="mc-heading" data-reveal>
          <span className="mc-kicker">隆重介绍下一周目：</span>
          <span className="logo-3d is-gold" data-text="守望梦屿">守望梦屿</span>
        </h2>

        <div className="loading-screen" ref={artRef} data-reveal>
          <motion.div className="loading-art" style={{ y: artY }}>
            <Image src={withBasePath("/dreamhaven/assets/hero-dreamhaven.png")} alt="守望梦屿预告图" fill sizes="(min-width: 1280px) 1200px, 94vw" />
          </motion.div>
          <div className="loading-status">
            <p>守望梦屿将于今年夏天推出。</p>
            <div className="loading-bar" aria-hidden="true"><i /></div>
          </div>
        </div>

        <div className="book" data-reveal>
          {pages.map((text, index) => (
            <article key={index} className="book-page">
              <span className="page-count" aria-hidden="true">{index + 1} / {pages.length}</span>
              <p>{text}</p>
            </article>
          ))}
        </div>

        <ul className="world-list">
          {previewItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <li key={item.title} className="world-row" data-reveal style={revealDelay(index, 110)}>
                <span className="world-icon">
                  <Image src={withBasePath(item.image)} alt="" fill sizes="220px" />
                  <span className="world-play" aria-hidden="true"><Play size={26} fill="currentColor" /></span>
                </span>
                <div className="world-info">
                  <h3><Icon size={18} strokeWidth={2.2} aria-hidden="true" />{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <span className="world-index" aria-hidden="true">0{index + 1}</span>
              </li>
            );
          })}
        </ul>

        <div className="dh-foot" data-reveal>
          <a href={withBasePath("/dreamhaven/")} className="mc-btn mc-btn-gold mc-btn-lg">查看完整预告 <ArrowRight size={18} aria-hidden="true" /></a>
        </div>
      </div>
    </section>
  );
}
