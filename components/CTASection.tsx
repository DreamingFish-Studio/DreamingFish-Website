"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion } from "framer-motion";
import { Copy, ExternalLink, ListChecks } from "lucide-react";
import { FORUM_URL } from "@/lib/constants";
import { withBasePath } from "@/lib/base-path";
import { useParallax } from "@/lib/motion";

type CTASectionProps = {
  onCopy: () => void;
};

export function CTASection({ onCopy }: CTASectionProps) {
  const bandRef = useRef<HTMLElement>(null);
  const y = useParallax(bandRef, 70);

  return (
    <section className="closing" ref={bandRef}>
      <motion.div className="closing-art" style={{ y }} aria-hidden="true">
        <Image src={withBasePath("/images/hero-dreamingfish.png")} alt="" fill sizes="100vw" />
      </motion.div>
      <div className="closing-shade" aria-hidden="true" />
      <div className="closing-content" data-reveal>
        <h2 className="mc-heading"><span className="logo-3d" data-text="准备好加入梦鱼服了吗？">准备好加入梦鱼服了吗？</span></h2>
        <p>复制服务器地址，安装整合包，和其他玩家一起开始属于你的多模组生存旅程。</p>
        <div className="closing-menu">
          <button type="button" onClick={onCopy} className="mc-btn mc-btn-green mc-btn-lg"><Copy size={18} aria-hidden="true" />复制服务器地址</button>
          <a href="#join" className="mc-btn mc-btn-lg"><ListChecks size={18} aria-hidden="true" />查看加入教程</a>
          <a href={FORUM_URL} target="_blank" rel="noreferrer" className="mc-btn mc-btn-lg"><ExternalLink size={18} aria-hidden="true" />进入论坛</a>
        </div>
      </div>
    </section>
  );
}
