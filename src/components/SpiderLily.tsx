import lily from "@/assets/spider-lily.png";

export function SpiderLily({
  className = "",
  size = 480,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <img
      src={lily}
      alt="Spider lily"
      width={size}
      height={size}
      loading="lazy"
      className={`pointer-events-none select-none animate-lily drop-shadow-[0_20px_40px_rgba(190,60,80,0.25)] ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
