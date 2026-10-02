"use client";

import Image from "next/image";
import { useState } from "react";
import { SectionHead } from "@/components/SectionHead";
import { galleryItems } from "@/lib/site-data";
import { withBasePath } from "@/lib/base-path";
import { revealDelay } from "@/lib/motion";
import { pixelMap } from "@/lib/pixel-map";

export function GallerySection() {
  return (
    <section id="gallery" className="gallery">
      <div className="shell">
        <SectionHead eyebrow="Gallery" index={6} />
        <div className="section-intro" data-reveal>
          <h2 className="mc-heading is-left"><span className="logo-3d is-small" data-text="玩家留下的">玩家留下的</span><span className="logo-3d is-small is-aqua" data-text="世界痕迹">世界痕迹</span></h2>
          <p>这里展示玩家的建筑、基地、活动截图和旅途记录。每一张图，都是这个世界真实存在过的故事。</p>
        </div>
        <div className="map-grid">
          {galleryItems.map((item, index) => <MapCard key={item.title} item={item} index={index} />)}
        </div>
      </div>
    </section>
  );
}

type MapCardProps = {
  item: (typeof galleryItems)[number];
  index: number;
};

function MapCard({ item, index }: MapCardProps) {
  const [failed, setFailed] = useState(false);

  return (
    <article className="map-card" data-reveal style={revealDelay(index, 100)}>
      <div className="map-frame">
        <div className="map-inner" style={failed ? { backgroundImage: pixelMap(index * 3 + 2) } : undefined}>
          {!failed ? (
            <Image src={withBasePath(item.image)} alt={`${item.title} - ${item.author}`} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 90vw" onError={() => setFailed(true)} />
          ) : (
            <span className="map-pending">图片待补充</span>
          )}
          <span className="map-type">{item.type}</span>
        </div>
      </div>
      <h3>{item.title}</h3>
      <p>{item.author}</p>
    </article>
  );
}
