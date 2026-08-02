"use client";

import Image from "next/image";
import { ArrowRight, BookOpen, HeartPulse, Users } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { cardContainerMotion, cardMotion, sectionMotion } from "@/lib/site-data";
import { withBasePath } from "@/lib/base-path";

const previewItems = [
  {
    title: "灾变后的生存",
    description: "梦屿不再只是安静的世外桃源。污染、危险区域和异常变化会让每一次外出都需要准备与判断。",
    icon: HeartPulse
  },
  {
    title: "探索推动故事",
    description: "废墟记录、广播异常、 NPC 对话和玩家讨论都会成为线索。故事不是被任务栏推着走，而是被玩家发现出来。",
    icon: BookOpen
  },
  {
    title: "全服共同选择",
    description: "有人建造据点，有人整理信息，有人承担危险。服务器的故事推进，会依赖玩家之间的分工和共同选择。",
    icon: Users
  }
];

export function DreamHavenSection() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      id="dreamhaven"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-120px" }}
      variants={sectionMotion}
      transition={{ duration: 0.65 }}
      className="section-shell"
    >
      <motion.article className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-night shadow-2xl shadow-black/35">
        <div className="absolute inset-0">
          <Image
            src={withBasePath("/dreamhaven/assets/hero-dreamhaven.png")}
            alt="守望梦屿预告图"
            fill
            sizes="100vw"
            className="object-cover opacity-46"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,17,17,.96),rgba(7,17,17,.82)_48%,rgba(7,17,17,.36)),linear-gradient(180deg,rgba(7,17,17,.25),rgba(7,17,17,.9))]" />
        </div>

        <div className="relative z-10 px-6 py-14 sm:px-10 lg:px-14 lg:py-16">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-aqua/80">Next Season</p>
            <h2 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.16] text-white sm:text-5xl">
              隆重介绍下一周目：
              <span className="mt-2 block">守望梦屿</span>
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-mist/72">
              守望梦屿是梦鱼服正在精心开发的下一周目玩法，也是我们准备向玩家展示的新故事起点。它会把“合作生存”往前推进一步，让你从灾变后的大陆里重新理解探索、建造和彼此依赖的意义。梦屿曾是一片让人慢下来生活、重新开始做梦的温柔之地，而现在，污染、失序与未知危机正在改变它。玩家将以幸存者的身份踏入梦屿，在建造据点、寻找记录、整理线索、推进剧情任务、发展人物关系和彼此协作中，一步步推动服务器故事向前发展。
            </p>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-mist/72">
              在这里，线索不会只是收藏品。你需要和伙伴分享发现，判断记录是否可信，推理灾难真正的成因，并决定下一步该如何行动。请不要完全依赖他人的结论：如果错误的判断让梦屿走向毁灭，你也可能成为其中的推手；而如果你能从混乱的信息中找到真正的破局之法，也许你就会成为改变梦屿未来的关键。
            </p>
            <p className="mt-4 text-lg font-semibold text-aqua">
              守望梦屿将于今年夏天推出。
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={cardContainerMotion}
            className="mt-10 grid gap-4 lg:grid-cols-3"
          >
            {previewItems.map((item) => {
              const Icon = item.icon;
              return (
                <motion.article
                  key={item.title}
                  variants={cardMotion}
                  whileHover={reduceMotion ? undefined : { y: -4 }}
                  className="rounded-3xl border border-white/10 bg-white/[0.065] p-5 backdrop-blur-xl"
                >
                  <div className="grid h-11 w-11 place-items-center rounded-2xl border border-aqua/25 bg-aqua/10 text-aqua">
                    <Icon size={20} aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-mist/68">{item.description}</p>
                </motion.article>
              );
            })}
          </motion.div>

          <div className="mt-9">
            <a href={withBasePath("/dreamhaven/")} className="soft-button w-full bg-white text-night hover:bg-mist sm:w-fit">
              <ArrowRight size={18} /> 查看完整预告
            </a>
          </div>
        </div>
      </motion.article>
    </motion.section>
  );
}
