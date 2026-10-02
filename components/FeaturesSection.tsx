"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { PixelFish } from "@/components/PixelFish";
import { SectionHead } from "@/components/SectionHead";
import { features } from "@/lib/site-data";
import { revealDelay } from "@/lib/motion";

// Where each feature sits in the 3×3 crafting grid (index into `features`, or null for an empty slot).
const recipe = [0, 1, 2, 3, null, 4, null, 5, null];

export function FeaturesSection() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (paused || reduceMotion) return;
    const timer = setInterval(() => setActive((current) => (current + 1) % features.length), 2600);
    return () => clearInterval(timer);
  }, [paused, reduceMotion]);

  return (
    <section id="features" className="features">
      <div className="shell">
        <SectionHead eyebrow="Play Style" index={3} />
        <div className="section-intro" data-reveal>
          <h2 className="mc-heading is-left"><span className="logo-3d is-small" data-text="服务器特色">服务器特色</span></h2>
          <p>梦鱼服不希望只靠一时热闹维持氛围，而是用清晰规则、公平环境、玩家协作和持续更新支撑长期游玩。</p>
        </div>
        <div className="craft-layout" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <div className="craft-gui" aria-hidden="true" data-reveal>
            <p className="gui-title">合成</p>
            <div className="craft-body">
              <div className="craft-grid">
                {recipe.map((featureIndex, slot) => {
                  if (featureIndex === null) return <span key={slot} className="gui-slot" />;
                  const Icon = features[featureIndex].icon;
                  return (
                    <span key={slot} className={`gui-slot ${active === featureIndex ? "is-active" : ""}`} onMouseEnter={() => setActive(featureIndex)}>
                      <Icon size={26} strokeWidth={2} />
                      <span className="gui-tip">{features[featureIndex].title}</span>
                    </span>
                  );
                })}
              </div>
              <ArrowRight className="craft-arrow" size={40} strokeWidth={3} />
              <span className="gui-slot is-result"><PixelFish /></span>
            </div>
          </div>
          <ol className="feature-list">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <li key={feature.title} className={`feature-row ${active === index ? "is-active" : ""}`} onMouseEnter={() => setActive(index)} data-reveal style={revealDelay(index % 3, 80)}>
                  <span className="feature-slot"><Icon size={22} strokeWidth={2} aria-hidden="true" /></span>
                  <div>
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
