"use client";

import { useCallback, useRef, useState } from "react";
import { AboutSection } from "@/components/AboutSection";
import { ChangelogSection } from "@/components/ChangelogSection";
import { ClickEffect } from "@/components/ClickEffect";
import { CopyToast } from "@/components/CopyToast";
import { CTASection } from "@/components/CTASection";
import { DreamHavenSection } from "@/components/DreamHavenSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { Footer } from "@/components/Footer";
import { GallerySection } from "@/components/GallerySection";
import { HeroSection } from "@/components/HeroSection";
import { JoinGuideSection } from "@/components/JoinGuideSection";
import { ModsSection } from "@/components/ModsSection";
import { MusicPlayer } from "@/components/MusicPlayer";
import { Navbar } from "@/components/Navbar";
import { SERVER_ADDRESS } from "@/lib/constants";

export default function Home() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((message: string) => {
    setToastMessage(message);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => setToastMessage(null), 2800);
  }, []);

  const copyServerAddress = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(SERVER_ADDRESS);
      showToast(`服务器地址已复制：${SERVER_ADDRESS}`);
    } catch {
      showToast(`复制失败，请手动复制：${SERVER_ADDRESS}`);
    }
  }, [showToast]);

  return (
    <>
      <Navbar onCopy={copyServerAddress} />
      <main>
        <HeroSection onCopy={copyServerAddress} />
        <DreamHavenSection />
        <AboutSection />
        <FeaturesSection />
        <ModsSection />
        <JoinGuideSection onCopy={copyServerAddress} />
        <GallerySection />
        <ChangelogSection />
        <CTASection onCopy={copyServerAddress} />
      </main>
      <Footer />
      <ClickEffect />
      <MusicPlayer />
      <CopyToast message={toastMessage} />
    </>
  );
}
