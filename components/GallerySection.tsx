"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { cardContainerMotion, cardMotion, galleryItems, sectionMotion } from "@/lib/site-data";
import { withBasePath } from "@/lib/base-path";

export function GallerySection() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="gallery" className="section-shell">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-120px" }}
        variants={sectionMotion}
        transition={{ duration: 0.65 }}
        className="max-w-3xl"
      >
        <p className="text-sm font-medium uppercase tracking-[0.22em] text-aqua/80">Gallery</p>
        <h2 className="mt-4 text-4xl font-semibold leading-tight text-white sm:text-5xl">玩家留下的世界痕迹</h2>
        <p className="mt-5 text-lg leading-8 text-mist/70">
          这里展示玩家的建筑、基地、活动截图和旅途记录。每一张图，都是这个世界真实存在过的故事。
        </p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={cardContainerMotion}
        className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4"
      >
        {galleryItems.map((item) => (
          <GalleryCard key={item.title} item={item} reduceMotion={Boolean(reduceMotion)} />
        ))}
      </motion.div>
    </section>
  );
}

type GalleryCardProps = {
  item: (typeof galleryItems)[number];
  reduceMotion: boolean;
};

function GalleryCard({ item, reduceMotion }: GalleryCardProps) {
  const [failed, setFailed] = useState(false);

  return (
    <motion.article
      variants={cardMotion}
      whileHover={reduceMotion ? undefined : { y: -6 }}
      className="group relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-white/10 bg-[linear-gradient(135deg,rgba(88,219,197,.18),rgba(229,200,120,.08),rgba(255,255,255,.04))]"
    >
      {!failed ? (
        <Image
          src={withBasePath(item.image)}
          alt={`${item.title} - ${item.author}`}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition duration-700 group-hover:scale-105"
          onError={() => setFailed(true)}
        />
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-t from-night/88 via-night/20 to-transparent opacity-80 transition group-hover:opacity-95" />
      <div className="absolute inset-x-0 bottom-0 p-6">
        <span className="rounded-full border border-white/14 bg-white/10 px-3 py-1 text-xs text-mist/76 backdrop-blur-xl">
          {item.type}
        </span>
        <h3 className="mt-4 text-xl font-semibold text-white">{item.title}</h3>
        <p className="mt-1 text-sm text-mist/68">{item.author}</p>
      </div>
    </motion.article>
  );
}
