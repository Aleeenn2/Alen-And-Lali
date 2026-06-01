import { useEffect, useRef, useState } from "react";
import { useLocation } from "@tanstack/react-router";
import { Play, Pause, Volume2 } from "lucide-react";

const BASE = import.meta.env.BASE_URL;

const TRACKS: Record<string, { file: string; title: string }> = {
  "/": { file: "audio/demolition-lovers.mp3", title: "Demolition Lovers — My Chemical Romance" },
  "/our-story": { file: "audio/caraphernelia.mp3", title: "Caraphernelia — Pierce The Veil" },
  "/letter": { file: "audio/drowning-love.mp3", title: "Drowning Love — Chasing Kou" },
};

function fmt(t: number) {
  if (!isFinite(t) || t < 0) return "0:00";
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const location = useLocation();
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.05);
  const [showVolume, setShowVolume] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [unlocked, setUnlocked] = useState(false);

  const track = TRACKS[location.pathname] ?? TRACKS["/"];

  // Unlock audio on first user gesture anywhere on the page
  useEffect(() => {
    if (unlocked) return;
    const unlock = async () => {
      const a = audioRef.current;
      if (!a) return;
      try {
        a.volume = volume;
        await a.play();
        setPlaying(true);
        setUnlocked(true);
      } catch {
        /* still blocked, keep listener */
      }
    };
    const events = ["pointerdown", "keydown", "touchstart"];
    events.forEach((e) => window.addEventListener(e, unlock, { once: true }));
    return () => events.forEach((e) => window.removeEventListener(e, unlock));
  }, [unlocked, volume]);

  // Switch the track when the route changes (and set the initial source).
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    if (a.src.endsWith(track.file)) return;

    const nextSrc = `${BASE}${track.file}`;

    // First load: set the source directly and wait for the unlock gesture.
    if (!a.src) {
      a.src = nextSrc;
      return;
    }

    // Navigating between tracks: soft crossfade out, swap, fade back in.
    const wasPlaying = !a.paused || playing;
    const startVol = a.volume;
    let step = 0;
    const fade = setInterval(() => {
      step++;
      a.volume = Math.max(0, startVol * (1 - step / 8));
      if (step >= 8) {
        clearInterval(fade);
        a.src = nextSrc;
        a.volume = 0;
        if (wasPlaying) {
          a.play()
            .then(() => {
              let s = 0;
              const fadeIn = setInterval(() => {
                s++;
                a.volume = Math.min(volume, volume * (s / 10));
                if (s >= 10) clearInterval(fadeIn);
              }, 60);
            })
            .catch(() => {});
        } else {
          a.volume = volume;
        }
      }
    }, 50);
    return () => clearInterval(fade);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [track.file]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const toggle = async () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      await a.play().catch(() => {});
      setPlaying(true);
    } else {
      a.pause();
      setPlaying(false);
    }
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const a = audioRef.current;
    if (!a || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    a.currentTime = Math.max(0, Math.min(duration, pct * duration));
  };

  const progress = duration > 0 ? (current / duration) * 100 : 0;

  return (
    <>
      <audio
        ref={audioRef}
        loop
        preload="auto"
        onTimeUpdate={(e) => setCurrent(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />

      <div className="fixed bottom-3 left-3 right-3 z-50 mx-auto w-auto max-w-[420px] rounded-2xl bg-card/85 px-3 py-2.5 shadow-soft ring-1 ring-border backdrop-blur-md sm:bottom-6 sm:left-auto sm:right-6 sm:mx-0 sm:w-[320px] sm:max-w-[calc(100vw-3rem)] sm:px-4 sm:py-3">
        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            aria-label={playing ? "Pause" : "Play"}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition hover:scale-110"
          >
            {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
          </button>

          <div className="min-w-0 flex-1">
            <div className="overflow-hidden whitespace-nowrap text-xs font-medium text-foreground">
              <span
                className="inline-block"
                style={{
                  animation: track.title.length > 28 ? "marquee 14s linear infinite" : undefined,
                }}
              >
                {track.title}
                {track.title.length > 28 && (
                  <span className="px-6 text-muted-foreground">•</span>
                )}
                {track.title.length > 28 && track.title}
              </span>
            </div>
            <div className="mt-1.5 flex items-center gap-2">
              <span className="w-8 text-[10px] tabular-nums text-muted-foreground">
                {fmt(current)}
              </span>
              <div
                onClick={seek}
                className="group relative h-1.5 flex-1 cursor-pointer overflow-hidden rounded-full bg-rose-deep/15 ring-1 ring-rose-deep/10"
              >
                <div
                  className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-rose-deep to-heart transition-[width] duration-200"
                  style={{ width: `${Math.max(progress, 1.5)}%` }}
                />
              </div>
              <span className="w-8 text-right text-[10px] tabular-nums text-muted-foreground">
                {fmt(duration)}
              </span>

            </div>
          </div>

          <div
            className="relative shrink-0"
            onMouseEnter={() => setShowVolume(true)}
            onMouseLeave={() => setShowVolume(false)}
          >
            <button
              aria-label="Volume"
              className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:text-foreground"
            >
              <Volume2 className="h-4 w-4" />
            </button>
            {showVolume && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 pb-2">
                <div className="flex flex-col items-center gap-2 rounded-full bg-card px-2 py-3 shadow-soft ring-1 ring-border">
                  <span className="text-[10px] tabular-nums text-muted-foreground">
                    {Math.round(volume * 100)}
                  </span>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    style={{ writingMode: "vertical-lr" as const, direction: "rtl", width: "1rem", height: "6rem" }}
                    className="cursor-pointer accent-[var(--rose-deep)]"
                  />
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
}
