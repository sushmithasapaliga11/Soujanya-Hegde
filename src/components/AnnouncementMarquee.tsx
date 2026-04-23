import { Marquee } from "./Marquee";

const items = [
  "✨ KIDFEST — because every KID is a star 🌟",
  "📅 May 16 & 17, 2026",
  "📍 Palemar Convention Centre, Maryhill, Mangalore",
  "🎉 Register Now!",
  "🏆 9 Competitions · 🎭 Stage Performances · 🎪 Flea Market",
];

export function AnnouncementMarquee() {
  return (
    <div className="relative bg-gradient-primary text-primary-foreground py-3 border-y border-white/10 shadow-soft">
      <Marquee direction="left" speed="normal">
        {items.map((t, i) => (
          <span key={i} className="px-8 text-sm md:text-base font-medium tracking-wide whitespace-nowrap">
            {t} <span className="opacity-50 ml-6">·</span>
          </span>
        ))}
      </Marquee>
    </div>
  );
}

export function ReverseMarquee() {
  return (
    <div className="relative bg-foreground text-background py-2">
      <Marquee direction="right" speed="slow">
        {items.map((t, i) => (
          <span key={i} className="px-8 text-xs md:text-sm font-light whitespace-nowrap opacity-80">
            {t} <span className="opacity-40 ml-6">✦</span>
          </span>
        ))}
      </Marquee>
    </div>
  );
}
