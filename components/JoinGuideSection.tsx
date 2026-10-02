"use client";

import { BookOpen, Copy, Download, Gamepad2, MessageCircle } from "lucide-react";
import { PixelFish } from "@/components/PixelFish";
import { SectionHead } from "@/components/SectionHead";
import { heroStats, joinSteps } from "@/lib/site-data";
import { SERVER_ADDRESS } from "@/lib/constants";
import { revealDelay } from "@/lib/motion";

const stepIcons = [MessageCircle, BookOpen, Download, Copy, Gamepad2];

type JoinGuideSectionProps = {
  onCopy: () => void;
};

export function JoinGuideSection({ onCopy }: JoinGuideSectionProps) {
  return (
    <section id="join" className="join">
      <div className="shell">
        <SectionHead eyebrow="Join Guide" index={5} />
        <div className="join-top">
          <h2 className="mc-heading is-left" data-reveal><span className="logo-3d is-small" data-text="加入梦鱼服">加入梦鱼服</span></h2>
          <div className="connect-gui" data-reveal>
            <div className="server-entry">
              <span className="server-icon"><PixelFish /></span>
              <div className="server-body">
                <strong>梦鱼服 DreamingFish</strong>
                <p className="motd">{heroStats[1]}<i className="pixel-sep" aria-hidden="true" /><span className="sr-only">，</span>{heroStats[2]}</p>
                <p className="version">{heroStats[0]}</p>
              </div>
              <span className="ping" aria-hidden="true"><i /><i /><i /><i /><i /></span>
            </div>
            <p className="field-label">复制服务器地址</p>
            <div className="connect-row">
              <div className="mc-field"><span>{SERVER_ADDRESS}</span><i className="caret" aria-hidden="true" /></div>
              <button type="button" onClick={onCopy} className="mc-btn mc-btn-green"><Copy size={16} aria-hidden="true" />复制地址</button>
            </div>
          </div>
        </div>

        <ol className="adv-tree">
          {joinSteps.map((step, index) => {
            const Icon = stepIcons[index];
            const isGoal = index === joinSteps.length - 1;
            return (
              <li key={step.title} className="adv" data-reveal style={revealDelay(index, 140)}>
                <span className={`adv-frame ${isGoal ? "is-challenge" : ""}`}><Icon size={26} strokeWidth={2} aria-hidden="true" /></span>
                <div className="adv-text">
                  <span className="adv-step" aria-hidden="true">0{index + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                  {step.title === "复制服务器地址" ? (
                    <button type="button" onClick={onCopy} className="mc-btn mc-btn-sm"><Copy size={14} aria-hidden="true" />复制地址</button>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
