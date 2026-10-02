"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useRef } from "react";
import { ArrowRight, Copy } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { PixelFish } from "@/components/PixelFish";
import { FORUM_URL, SERVER_ADDRESS } from "@/lib/constants";
import { withBasePath } from "@/lib/base-path";

type HeroSectionProps = {
  onCopy: () => void;
};

// Flat blocky clouds, drawn the way the game renders them: one cell per character.
const CLOUD_SHAPES = [
  ["......XXXXXX....", "..XXXXXXXXXXXX..", "XXXXXXXXXXXXXXXX", "..XXXXXXXXXXXXX.", "....XXXXXX......"],
  ["...XXXXX...", ".XXXXXXXXXX", "XXXXXXXXXXX", "..XXXXXX..."],
  ["........XXXX........", "...XXXXXXXXXXXXX....", "XXXXXXXXXXXXXXXXXXXX", ".XXXXXXXXXXXXXXXXX..", "....XXXXXXX........."]
];

const clouds = [
  { shape: 0, top: "7%", cell: 22, duration: 150, delay: -40, opacity: 0.78 },
  { shape: 1, top: "18%", cell: 16, duration: 120, delay: -95, opacity: 0.6 },
  { shape: 2, top: "4%", cell: 18, duration: 190, delay: -150, opacity: 0.55 },
  { shape: 1, top: "27%", cell: 12, duration: 100, delay: -20, opacity: 0.42 }
];

const stats = [
  { value: "2021", label: "梦鱼服成立" },
  { value: "1.20.1", label: "Java 版合作模组生存" },
  { value: "0", label: "付费强度与特权" }
];

function PixelCloud({ rows, style }: { rows: string[]; style: CSSProperties }) {
  return (
    <svg className="pixel-cloud" style={style} viewBox={`0 0 ${rows[0].length} ${rows.length}`} shapeRendering="crispEdges" aria-hidden="true" focusable="false">
      {rows.map((row, y) => [...row].map((cell, x) => (cell === "X" ? <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={y === rows.length - 1 ? "#e3ebf3" : "#fff"} /> : null)))}
    </svg>
  );
}

export function HeroSection({ onCopy }: HeroSectionProps) {
  const heroRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const worldScale = useTransform(scrollYProgress, [0, 1], [1, reduceMotion ? 1 : 1.18]);
  const worldY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 140]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -160]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, reduceMotion ? 1 : 0]);

  return (
    <section id="home" ref={heroRef} className="epic">
      <motion.div className="epic-world" style={{ scale: worldScale, y: worldY }} aria-hidden="true">
        <div className="panorama">
          <div className="panorama-track">
            <Image src={withBasePath("/images/hero-dreamingfish.png")} alt="" fill priority sizes="(min-aspect-ratio: 2/1) 100vw, 200vh" className="panorama-image" />
          </div>
        </div>
      </motion.div>
      <div className="epic-sky" aria-hidden="true">
        {clouds.map((cloud, index) => {
          const rows = CLOUD_SHAPES[cloud.shape];
          const style = { top: cloud.top, width: rows[0].length * cloud.cell, opacity: cloud.opacity, animationDuration: `${cloud.duration}s`, animationDelay: `${cloud.delay}s` };
          return <PixelCloud key={index} rows={rows} style={style} />;
        })}
      </div>
      <div className="epic-shade" aria-hidden="true" />
      <div className="epic-motes" aria-hidden="true">
        {Array.from({ length: 14 }, (_, index) => <i key={index} style={{ left: `${5 + index * 6.8}%`, top: `${45 + (index * 29) % 50}%`, animationDelay: `${index * -1.4}s`, animationDuration: `${12 + (index % 4) * 2}s` }} />)}
      </div>

      <div className="epic-bar">
        <a href="#home" className="epic-brand">
          <span className="brand-block"><PixelFish /></span>
          <span className="pixel">DreamingFish</span>
        </a>
        <nav className="epic-links" aria-label="快捷入口">
          <a href="#dreamhaven">守望梦屿</a>
          <a href="#join">加入服务器</a>
          <a href={FORUM_URL} target="_blank" rel="noreferrer">论坛 ↗</a>
        </nav>
      </div>

      <motion.div className="epic-center" style={{ y: contentY, opacity: contentOpacity }}>
        <div className="epic-logo">
          <h1><span className="logo-3d is-epic" data-text="梦鱼服">梦鱼服</span></h1>
          <p className="splash">守望梦屿 即将启程！</p>
        </div>
        <p className="epic-edition">DreamingFish<i className="pixel-sep" aria-hidden="true" /><span className="sr-only">，</span>Since 2021</p>
        <p className="epic-tagline">一起，做一场很长的梦。</p>
        <p className="epic-sub">梦鱼服不想只做一个普通的服务器。在这里，和同伴共同生活、自由探索，把属于你的故事写进这个世界。</p>
        <div className="epic-actions">
          <a href="#join" className="mc-btn mc-btn-green epic-play">加入服务器</a>
          <button type="button" onClick={onCopy} className="epic-ip" aria-label={`复制服务器地址 ${SERVER_ADDRESS}`}>
            <span className="epic-ip-text">
              <span className="epic-ip-label">服务器地址</span>
              <span className="epic-ip-value">{SERVER_ADDRESS}</span>
            </span>
            <span className="epic-ip-copy"><Copy size={14} aria-hidden="true" />复制</span>
          </button>
        </div>
      </motion.div>

      <div className="epic-strip">
        <ul className="epic-stats">
          <li className="is-news">
            <a href="#dreamhaven"><strong>NEW</strong><span>下一周目「守望梦屿」预告 <ArrowRight size={14} aria-hidden="true" /></span></a>
          </li>
          {stats.map((stat) => (
            <li key={stat.value}><strong>{stat.value}</strong><span>{stat.label}</span></li>
          ))}
        </ul>
        <a href="#dreamhaven" className="epic-scroll" aria-label="向下进入世界"><span aria-hidden="true">SCROLL</span><i aria-hidden="true" /></a>
      </div>
    </section>
  );
}
