"use client";

import Image from "next/image";
import { Hammer, Landmark, Scale } from "lucide-react";
import { SectionHead } from "@/components/SectionHead";
import { aboutCards } from "@/lib/site-data";
import { withBasePath } from "@/lib/base-path";
import { revealDelay } from "@/lib/motion";

const effectIcons = [Scale, Landmark, Hammer];

const story = [
  { mark: "2021.07.10", text: "梦鱼服最早成立于 2021 年 7 月 10 日。成立之初，我们就希望为玩家带来一个公平、自由、富有探索感的模组生存体验，让大家能在同一个世界里建设、冒险、交流，并留下属于自己的故事。" },
  { mark: "基岩版时期", text: "在最初的基岩版时期，服务器持续尝试了大量优质模组内容，也积累了一批活跃而稳定的玩家。那段时间里，梦鱼服始终坚持公益运营，不售卖强度，不以付费优势破坏玩家体验；服务器的更新方向，也主要来自腐竹筛选与玩家推荐。" },
  { mark: "2022 — 2024", text: "2022 年 11 月，由于腐竹学业原因，服务器暂时停服。直到 2024 年高考结束后，梦鱼服重新启动，并在新的阶段继续探索模组服务器的可能性。随着玩法规划逐渐成熟，服务器也从基岩版模组服转向 Java 版模组服，以追求更稳定、更自由、更适合长期开发的体验。" },
  { mark: "现在", text: "现在，我们已经开始围绕服务器自研模组、设计玩法系统，并持续打磨属于梦鱼服自己的内容方向。我们希望创造的不只是“装了很多模组”的服务器，而是一种更完整、更有参与感，也更值得玩家长期投入的新体验。" }
];

export function AboutSection() {
  return (
    <section id="about" className="about">
      <div className="shell">
        <SectionHead eyebrow="About DreamingFish" index={2} />
        <div className="about-grid">
          <div className="about-side">
            <h2 className="mc-heading is-left" data-reveal><span className="logo-3d is-small" data-text="关于梦鱼服">关于梦鱼服</span></h2>
            <div className="item-frame" data-reveal>
              <div className="item-frame-inner">
                <Image src={withBasePath("/images/about-server.png")} alt="梦鱼服合作多模组世界风景" fill sizes="(min-width: 1024px) 40vw, 92vw" />
              </div>
            </div>
            <ul className="effects">
              {aboutCards.map((card, index) => {
                const Icon = effectIcons[index];
                return (
                  <li key={card.title} className="effect" data-reveal style={revealDelay(index, 100)}>
                    <span className="effect-icon"><Icon size={22} strokeWidth={2} aria-hidden="true" /></span>
                    <div>
                      <h3>{card.title}</h3>
                      <p>{card.description}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <ol className="rail">
            {story.map((entry, index) => (
              <li key={entry.mark} className="rail-stop" data-reveal style={revealDelay(index % 2, 100)}>
                <span className="rail-mark">{entry.mark}</span>
                <p>{entry.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
