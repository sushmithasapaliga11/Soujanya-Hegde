import { Marquee } from "./Marquee";

const VENUE_URL = "https://maps.app.goo.gl/ipia3jdSHg3ct7Hn8";

const textItems = [
  "✨ KIDFEST — because every KID is a star 🌟",
  "📅 May 16 & 17, 2026",
  "🎉 Register Now!",
  "🏆 9 Competitions · 🎭 Stage Performances · 🎪 Flea Market",
];

function MarqueeItems({ className }: { className?: string }) {
  return (
    <>
      {textItems.slice(0, 2).map((t, i) => (
        <span key={i} className={`px-8 whitespace-nowrap ${className}`}>
          {t} <span className="opacity-50 ml-6">·</span>
        </span>
      ))}
      <span className={`px-8 whitespace-nowrap ${className}`}>
        <a href={VENUE_URL} target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:opacity-80">
          📍 Palemar Convention Centre, Maryhill, Mangalore
        </a>
        <span className="opacity-50 ml-6">·</span>
      </span>
      {textItems.slice(2).map((t, i) => (
        <span key={i + 2} className={`px-8 whitespace-nowrap ${className}`}>
          {t} <span className="opacity-50 ml-6">·</span>
        </span>
      ))}
    </>
  );
}

export function AnnouncementMarquee() {
  return (
    <div className="relative bg-gradient-primary text-primary-foreground py-3 border-y border-white/10 shadow-soft">
      <Marquee direction="left" speed="normal">
        <MarqueeItems className="text-sm md:text-base font-medium tracking-wide" />
      </Marquee>
    </div>
  );
}

export function ReverseMarquee() {
  return (
    <div className="relative bg-foreground text-background py-2">
      <Marquee direction="right" speed="slow">
        <MarqueeItems className="text-xs md:text-sm font-light opacity-80" />
      </Marquee>
    </div>
  );
}
