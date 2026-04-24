import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { Play, X } from "lucide-react";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import kidfest from "@/assets/kidfest-hero.jpg";
import hero from "@/assets/hero-soujanya.jpg";

const videos = [
  { id: "dQw4w9WgXcQ", title: "Wedding Hosting Reel", thumb: g1 },
  { id: "ScMzIvxBSi4", title: "Corporate Stage", thumb: g3 },
  { id: "9bZkp7q19f0", title: "Awards Night", thumb: g4 },
  { id: "L_jWHffIx5E", title: "Kidfest Promo", thumb: kidfest },
  { id: "kJQP7kiw5Fk", title: "Influencer Collab", thumb: g2 },
  { id: "fJ9rUzIMcZQ", title: "Mrs India Spotlight", thumb: hero },
];

export default function VideosPage() {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div className="py-20 px-6 lg:px-10 bg-background">
      <div className="mx-auto max-w-7xl">
        <Reveal className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">Reel</p>
          <h1 className="font-display text-4xl md:text-6xl font-bold mt-3">Watch Me in Action</h1>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">A glimpse of stages, smiles and showtime.</p>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((v, i) => (
            <Reveal key={v.id} delay={i * 60}>
              <button
                onClick={() => setActive(v.id)}
                className="group relative w-full aspect-video rounded-2xl overflow-hidden hover-lift hover-zoom"
              >
                <img src={v.thumb} alt={v.title} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                <div className="absolute inset-0 grid place-items-center">
                  <span className="h-16 w-16 rounded-full bg-[oklch(0.78_0.13_80)] text-foreground grid place-items-center shadow-gold group-hover:scale-110 transition-transform">
                    <Play className="h-7 w-7 ml-1" />
                  </span>
                </div>
                <p className="absolute bottom-4 left-4 text-primary-foreground font-display text-lg">{v.title}</p>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
      {active && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-foreground/90 p-4 animate-fade-in" onClick={() => setActive(null)}>
          <button className="absolute top-6 right-6 h-10 w-10 grid place-items-center rounded-full bg-white/15 text-white hover:bg-white/30">
            <X />
          </button>
          <div className="w-full max-w-4xl aspect-video" onClick={(e) => e.stopPropagation()}>
            <iframe
              className="w-full h-full rounded-2xl"
              src={`https://www.youtube.com/embed/${active}?autoplay=1`}
              title="Video"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
}
