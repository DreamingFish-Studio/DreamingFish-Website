"use client";

import { Music, Pause } from "lucide-react";
import { AnimatePresence, motion, useAnimationFrame, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { withBasePath } from "@/lib/base-path";

const NOTES = ["♪", "♫", "♬", "♩", "♭"];
const MUSIC_SRC = withBasePath("/audio/bg_music.mp3");
const MUSIC_STATE_KEY = "dreamingfish:bg-music-state";

type FloatingNote = {
  id: number;
  note: string;
  x: number;
  drift: number;
  size: number;
  duration: number;
};

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const noteTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const noteIdRef = useRef(0);
  const rotationRef = useRef(0);
  const wantsAutoplayRef = useRef(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [needsGesture, setNeedsGesture] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [notes, setNotes] = useState<FloatingNote[]>([]);
  const reduceMotion = useReducedMotion();

  useAnimationFrame((_, delta) => {
    if (!isPlaying || reduceMotion) {
      return;
    }

    rotationRef.current = (rotationRef.current + delta * 0.055) % 360;
    setRotation(rotationRef.current);
  });

  useEffect(() => {
    const audio = new Audio(MUSIC_SRC);
    audio.loop = true;
    audio.preload = "metadata";
    audio.volume = 0.42;
    audioRef.current = audio;

    const stopOnEnded = () => setIsPlaying(false);
    const saveState = () => {
      window.localStorage.setItem(
        MUSIC_STATE_KEY,
        JSON.stringify({
          currentTime: audio.currentTime,
          playing: !audio.paused,
          updatedAt: Date.now()
        })
      );
    };

    try {
      const saved = window.localStorage.getItem(MUSIC_STATE_KEY);
      if (saved) {
        const state = JSON.parse(saved) as { currentTime?: number; playing?: boolean };
        if (typeof state.currentTime === "number" && Number.isFinite(state.currentTime)) {
          audio.currentTime = state.currentTime;
        }
        if (state.playing === false) {
          wantsAutoplayRef.current = false;
        }
      }
    } catch {
      // Ignore corrupted persisted playback state.
    }

    audio.addEventListener("ended", stopOnEnded);
    audio.addEventListener("timeupdate", saveState);
    window.addEventListener("pagehide", saveState);
    window.addEventListener("beforeunload", saveState);

    return () => {
      saveState();
      audio.pause();
      audio.removeEventListener("ended", stopOnEnded);
      audio.removeEventListener("timeupdate", saveState);
      window.removeEventListener("pagehide", saveState);
      window.removeEventListener("beforeunload", saveState);
      audioRef.current = null;
      if (noteTimerRef.current) {
        clearInterval(noteTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    const playMusic = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
        setNeedsGesture(false);
        wantsAutoplayRef.current = false;
        window.localStorage.setItem(
          MUSIC_STATE_KEY,
          JSON.stringify({ currentTime: audio.currentTime, playing: true, updatedAt: Date.now() })
        );
      } catch {
        setIsPlaying(false);
        setNeedsGesture(true);
      }
    };

    const playAfterFirstGesture = () => {
      if (!wantsAutoplayRef.current || audioRef.current?.paused === false) {
        return;
      }

      void playMusic();
    };

    if (wantsAutoplayRef.current) {
      void playMusic();
    }

    window.addEventListener("pointerdown", playAfterFirstGesture, { passive: true });
    window.addEventListener("keydown", playAfterFirstGesture);
    window.addEventListener("touchstart", playAfterFirstGesture, { passive: true });
    window.addEventListener("wheel", playAfterFirstGesture, { passive: true });

    return () => {
      window.removeEventListener("pointerdown", playAfterFirstGesture);
      window.removeEventListener("keydown", playAfterFirstGesture);
      window.removeEventListener("touchstart", playAfterFirstGesture);
      window.removeEventListener("wheel", playAfterFirstGesture);
    };
  }, []);

  useEffect(() => {
    if (!isPlaying || reduceMotion) {
      if (noteTimerRef.current) {
        clearInterval(noteTimerRef.current);
        noteTimerRef.current = null;
      }
      return;
    }

    const spawnNote = () => {
      const id = noteIdRef.current + 1;
      noteIdRef.current = id;
      const note = NOTES[Math.floor(Math.random() * NOTES.length)];

      setNotes((current) => [
        ...current.slice(-8),
        {
          id,
          note,
          x: Math.random() * 54 - 27,
          drift: Math.random() * 44 - 22,
          size: Math.random() * 10 + 16,
          duration: Math.random() * 0.55 + 1.45
        }
      ]);
    };

    spawnNote();
    noteTimerRef.current = setInterval(spawnNote, 560);

    return () => {
      if (noteTimerRef.current) {
        clearInterval(noteTimerRef.current);
        noteTimerRef.current = null;
      }
    };
  }, [isPlaying, reduceMotion]);

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      setNeedsGesture(false);
      wantsAutoplayRef.current = false;
      window.localStorage.setItem(
        MUSIC_STATE_KEY,
        JSON.stringify({ currentTime: audio.currentTime, playing: false, updatedAt: Date.now() })
      );
      return;
    }

    try {
      await audio.play();
      setIsPlaying(true);
      setNeedsGesture(false);
      wantsAutoplayRef.current = false;
      window.localStorage.setItem(
        MUSIC_STATE_KEY,
        JSON.stringify({ currentTime: audio.currentTime, playing: true, updatedAt: Date.now() })
      );
    } catch {
      setIsPlaying(false);
      setNeedsGesture(true);
    }
  };

  return (
    <div className="fixed bottom-6 right-5 z-[70] sm:right-7">
      <AnimatePresence>
        {needsGesture && !isPlaying ? (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            className="absolute bottom-16 right-0 w-44 rounded-2xl border border-white/12 bg-night/82 px-4 py-3 text-xs leading-5 text-mist/78 shadow-2xl shadow-black/30 backdrop-blur-xl"
            role="status"
            aria-live="polite"
          >
            点击页面任意位置开启背景音乐
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="pointer-events-none absolute bottom-16 left-1/2 h-28 w-28 -translate-x-1/2">
        <AnimatePresence>
          {isPlaying && !reduceMotion
            ? notes.map((item) => (
                <motion.span
                  key={item.id}
                  initial={{ opacity: 0, x: item.x, y: 18, scale: 0.8, rotate: -10 }}
                  animate={{ opacity: [0, 1, 0], x: item.x + item.drift, y: -76, scale: [0.8, 1, 1.08], rotate: 12 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: item.duration, ease: "easeOut" }}
                  onAnimationComplete={() => {
                    setNotes((current) => current.filter((note) => note.id !== item.id));
                  }}
                  className="absolute left-1/2 top-1/2 font-semibold text-aqua drop-shadow-[0_0_14px_rgba(88,219,197,0.55)]"
                  style={{ fontSize: item.size }}
                  aria-hidden="true"
                >
                  {item.note}
                </motion.span>
              ))
            : null}
        </AnimatePresence>
      </div>

      <button
        type="button"
        onClick={toggleMusic}
        className="focus-ring group relative grid h-14 w-14 place-items-center rounded-full border border-white/15 bg-night/78 text-white shadow-2xl shadow-black/35 backdrop-blur-xl transition hover:border-aqua/50 hover:bg-aqua/12 hover:shadow-glow"
        aria-label={isPlaying ? "暂停背景音乐" : "播放背景音乐"}
        aria-pressed={isPlaying}
      >
        {needsGesture && !isPlaying ? (
          <motion.span
            className="absolute inset-0 rounded-full border border-aqua/40"
            animate={{ scale: [1, 1.22], opacity: [0.45, 0] }}
            transition={{ duration: 1.55, repeat: Infinity, ease: "easeOut" }}
            aria-hidden="true"
          />
        ) : null}
        <span className="absolute inset-1 rounded-full border border-aqua/20 opacity-70" aria-hidden="true" />
        <motion.span
          className="relative grid h-10 w-10 place-items-center rounded-full bg-white/8 text-aqua"
          animate={{ rotate: rotation }}
          transition={{ type: "tween", duration: 0 }}
        >
          {isPlaying ? <Pause size={19} aria-hidden="true" /> : <Music size={20} aria-hidden="true" />}
        </motion.span>
      </button>
    </div>
  );
}
