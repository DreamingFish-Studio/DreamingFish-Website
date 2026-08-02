"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { aboutCards, cardContainerMotion, cardMotion, sectionMotion } from "@/lib/site-data";
import { withBasePath } from "@/lib/base-path";

export function AboutSection() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      id="about"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-120px" }}
      variants={sectionMotion}
      transition={{ duration: 0.65 }}
      className="section-shell grid items-center gap-12 lg:grid-cols-[1fr_.9fr]"
    >
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.22em] text-aqua/80">About DreamingFish</p>
        <h2 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight text-white sm:text-5xl">
          关于梦鱼服
        </h2>
        <div className="mt-6 max-w-2xl space-y-5 text-lg leading-8 text-mist/72">
          <p>
            梦鱼服最早成立于 2021 年 7 月 10 日。成立之初，我们就希望为玩家带来一个公平、自由、富有探索感的模组生存体验，让大家能在同一个世界里建设、冒险、交流，并留下属于自己的故事。
          </p>
          <p>
            在最初的基岩版时期，服务器持续尝试了大量优质模组内容，也积累了一批活跃而稳定的玩家。那段时间里，梦鱼服始终坚持公益运营，不售卖强度，不以付费优势破坏玩家体验；服务器的更新方向，也主要来自腐竹筛选与玩家推荐。
          </p>
          <p>
            2022 年 11 月，由于腐竹学业原因，服务器暂时停服。直到 2024 年高考结束后，梦鱼服重新启动，并在新的阶段继续探索模组服务器的可能性。随着玩法规划逐渐成熟，服务器也从基岩版模组服转向 Java 版模组服，以追求更稳定、更自由、更适合长期开发的体验。
          </p>
          <p>
            现在，我们已经开始围绕服务器自研模组、设计玩法系统，并持续打磨属于梦鱼服自己的内容方向。我们希望创造的不只是“装了很多模组”的服务器，而是一种更完整、更有参与感，也更值得玩家长期投入的新体验。
          </p>
        </div>

        <motion.div variants={cardContainerMotion} className="mt-10 grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
          {aboutCards.map((card) => (
            <motion.article key={card.title} variants={cardMotion} className="glass-card rounded-3xl p-5">
              <h3 className="text-lg font-semibold text-white">{card.title}</h3>
              <p className="mt-3 text-sm leading-6 text-mist/66">{card.description}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>

      <motion.div
        whileHover={reduceMotion ? undefined : { scale: 1.015 }}
        className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl shadow-black/35 sm:aspect-[5/4] lg:aspect-[4/5]"
      >
        <Image
          src={withBasePath("/images/about-server.png")}
          alt="梦鱼服合作多模组世界风景"
          fill
          sizes="(min-width: 1024px) 42vw, 90vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-night/45 via-transparent to-transparent" />
      </motion.div>
    </motion.section>
  );
}
