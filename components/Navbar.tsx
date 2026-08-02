"use client";

import { Menu, Server, X } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FORUM_URL } from "@/lib/constants";
import { navItems } from "@/lib/site-data";

type NavbarProps = {
  onCopy: () => void;
};

export function Navbar({ onCopy }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 border-b transition duration-300 ${
        scrolled || open
          ? "border-white/10 bg-night/70 shadow-2xl shadow-black/20 backdrop-blur-2xl"
          : "border-white/0 bg-night/20 backdrop-blur-sm"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10" aria-label="主导航">
        <a href="#home" onClick={closeMenu} className="focus-ring flex items-center gap-3 rounded-full">
          <span className="grid h-9 w-9 place-items-center rounded-full border border-aqua/30 bg-aqua/10 text-aqua">
            <Server size={18} aria-hidden="true" />
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-semibold tracking-wide text-white">DreamingFish</span>
            <span className="block text-xs text-mist/68">梦鱼服</span>
          </span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.external ? FORUM_URL : item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noreferrer" : undefined}
              className="focus-ring rounded-full px-3 py-2 text-sm text-mist/75 transition hover:bg-white/8 hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <button type="button" onClick={onCopy} className="soft-button py-2">
            复制服务器地址
          </button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="focus-ring grid h-10 w-10 place-items-center rounded-full border border-white/12 bg-white/8 text-white lg:hidden"
          aria-label={open ? "关闭菜单" : "打开菜单"}
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open ? (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-t border-white/10 bg-night/92 px-5 pb-5 pt-3 backdrop-blur-2xl lg:hidden"
        >
          <div className="mx-auto grid max-w-7xl gap-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.external ? FORUM_URL : item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noreferrer" : undefined}
                onClick={closeMenu}
                className="focus-ring rounded-2xl px-4 py-3 text-base text-mist/82 hover:bg-white/8 hover:text-white"
              >
                {item.label}
              </a>
            ))}
            <button type="button" onClick={() => { onCopy(); closeMenu(); }} className="soft-button mt-2 w-full">
              复制服务器地址
            </button>
          </div>
        </motion.div>
      ) : null}
    </header>
  );
}
