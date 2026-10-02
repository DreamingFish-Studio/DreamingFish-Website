"use client";

import { ExternalLink } from "lucide-react";
import { SectionHead } from "@/components/SectionHead";
import { FORUM_URL } from "@/lib/constants";
import { changelog } from "@/lib/site-data";
import { revealDelay } from "@/lib/motion";

// Chat colors borrowed from Minecraft's formatting codes.
const tagTone: Record<string, string> = { 官网: "is-aqua", 服务器: "is-green", 模组: "is-purple", 项目: "is-gold" };

export function ChangelogSection() {
  return (
    <section id="changelog" className="changelog">
      <div className="shell">
        <SectionHead eyebrow="Changelog" index={7} />
        <div className="changelog-grid">
          <div className="changelog-intro" data-reveal>
            <h2 className="mc-heading is-left"><span className="logo-3d is-small" data-text="更新日志">更新日志</span></h2>
            <p>服务器和官网都在持续完善，所有重要调整都会被记录下来。</p>
            <a href={FORUM_URL} target="_blank" rel="noreferrer" className="mc-btn">进入论坛查看更多 <ExternalLink size={16} aria-hidden="true" /></a>
          </div>
          <div className="chat" data-reveal>
            {changelog.map((item, index) => (
              <article key={`${item.date}-${item.title}`} className="chat-line" data-reveal style={revealDelay(index, 90)}>
                <p className="chat-head">
                  <time dateTime={item.date.replaceAll(".", "-")}>[{item.date}]</time>
                  <span className={`chat-tag ${tagTone[item.tag] ?? ""}`}>&lt;{item.tag}&gt;</span>
                </p>
                <h3>{item.title}</h3>
                <p className="chat-body">{item.description}</p>
              </article>
            ))}
            <div className="chat-input" aria-hidden="true"><span>&gt;</span><i className="caret" /></div>
          </div>
        </div>
      </div>
    </section>
  );
}
