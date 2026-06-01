import { useMemo } from "react";

interface Heart {
  id: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
  drift: number;
  opacity: number;
}

export function FloatingHearts({ count = 18 }: { count?: number }) {
  const hearts = useMemo<Heart[]>(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 12 + Math.random() * 22,
        delay: Math.random() * 12,
        duration: 14 + Math.random() * 10,
        drift: (Math.random() - 0.5) * 120,
        opacity: 0.35 + Math.random() * 0.4,
      })),
    [count],
  );

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {hearts.map((h) => (
        <span
          key={h.id}
          className="absolute bottom-[-40px]"
          style={{
            left: `${h.left}%`,
            width: h.size,
            height: h.size,
            animation: `heart-float ${h.duration}s linear ${h.delay}s infinite`,
            ["--drift" as string]: `${h.drift}px`,
            ["--heart-opacity" as string]: String(h.opacity),
          }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="text-heart h-full w-full drop-shadow-sm">
            <path d="M12 21s-7.5-4.5-9.5-9.2C1 8 3.5 4.5 7 4.5c2 0 3.6 1.1 5 3 1.4-1.9 3-3 5-3 3.5 0 6 3.5 4.5 7.3C19.5 16.5 12 21 12 21z" />
          </svg>
        </span>
      ))}
    </div>
  );
}
