import type { ReactNode } from "react";

export function Marquee({
  children,
  direction = "left",
  speed = "normal",
  className = "",
}: {
  children: ReactNode;
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  className?: string;
}) {
  const animClass =
    direction === "left"
      ? speed === "fast"
        ? "animate-marquee-fast"
        : "animate-marquee-left"
      : "animate-marquee-right";
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className={`flex w-max ${animClass} marquee-pause`}>
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden>{children}</div>
      </div>
    </div>
  );
}
