"use client";

import { Boxes, Copy, DoorOpen, History, Home, ImageIcon, MessagesSquare, Moon, ScrollText, Sparkles } from "lucide-react";
import { motion, useReducedMotion, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { PixelFish } from "@/components/PixelFish";
import { FORUM_URL } from "@/lib/constants";
import { navItems } from "@/lib/site-data";

// One icon per hotbar slot, in navItems order.
const slotIcons = [Home, ScrollText, Sparkles, Moon, Boxes, DoorOpen, ImageIcon, History, MessagesSquare];

type NavbarProps = {
  onCopy: () => void;
};

export function Navbar({ onCopy }: NavbarProps) {
  const [inWorld, setInWorld] = useState(false);
  const [active, setActive] = useState(0);
  const [showHeldName, setShowHeldName] = useState(false);
  const activeRef = useRef(0);
  const hideNameTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    // Like the game: the held item's name pops up above the hotbar when the slot changes.
    const selectSlot = (index: number) => {
      if (index === activeRef.current) return;
      activeRef.current = index;
      setActive(index);
      setShowHeldName(true);
      if (hideNameTimer.current) clearTimeout(hideNameTimer.current);
      hideNameTimer.current = setTimeout(() => setShowHeldName(false), 1800);
    };
    const onScroll = () => setInWorld(window.scrollY > window.innerHeight * 0.55);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const index = navItems.findIndex((item) => item.href === `#${entry.target.id}`);
        if (index >= 0) selectSlot(index);
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    document.querySelectorAll("main section[id]").forEach((section) => observer.observe(section));
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
      if (hideNameTimer.current) clearTimeout(hideNameTimer.current);
    };
  }, []);

  // Number keys 1–9 select hotbar slots.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      if ((event.target as HTMLElement | null)?.closest("input, textarea, select, [contenteditable='true']")) return;
      const slot = Number(event.key);
      if (!Number.isInteger(slot) || slot < 1 || slot > navItems.length) return;
      const item = navItems[slot - 1];
      if (item.external) {
        document.getElementById(`hotbar-slot-${slot}`)?.focus();
        return;
      }
      event.preventDefault();
      document.querySelector(item.href)?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [reduceMotion]);

  return (
    <>
      <a className="skip-link" href="#main-content">跳转到内容</a>
      <header className={`topbar ${inWorld ? "is-shown" : ""}`}>
        <a href="#home" className="topbar-brand">
          <span className="brand-block"><PixelFish /></span>
          <span className="pixel">DreamingFish</span>
          <small>梦鱼服</small>
        </a>
        <button type="button" onClick={onCopy} className="mc-btn mc-btn-sm"><Copy size={15} aria-hidden="true" />复制服务器地址</button>
      </header>
      <nav className={`hotbar-dock ${inWorld ? "is-shown" : ""}`} aria-label="主导航">
        <div className="xp-row" aria-hidden="true">
          <span className={`held-name ${showHeldName && inWorld ? "is-visible" : ""}`}>{navItems[active].label}</span>
          <span className="xp-level">{active + 1}</span>
          <div className="xp-bar"><motion.i style={{ scaleX: scrollYProgress }} /></div>
        </div>
        <div className="hotbar">
          {navItems.map((item, index) => {
            const Icon = slotIcons[index];
            const selected = active === index && !item.external;
            return (
              <a
                key={item.label}
                id={`hotbar-slot-${index + 1}`}
                href={item.external ? FORUM_URL : item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noreferrer" : undefined}
                className={`hotbar-slot ${selected ? "is-selected" : ""}`}
                aria-current={selected ? "location" : undefined}
              >
                {selected && <motion.span layoutId="hotbar-select" className="hotbar-select" transition={{ type: "spring", stiffness: 520, damping: 38 }} />}
                <Icon size={20} strokeWidth={2} aria-hidden="true" />
                <span className="slot-key" aria-hidden="true">{index + 1}</span>
                <span className="slot-tip">{item.label}</span>
              </a>
            );
          })}
        </div>
      </nav>
    </>
  );
}
