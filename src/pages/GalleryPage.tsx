import { Reveal } from "@/components/Reveal";
import { Marquee } from "@/components/Marquee";
import g1 from "@/assets/gallery-1.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import kidfest from "@/assets/kidfest-hero.jpg";
import hero from "@/assets/hero-main1.png";
import fancy from "@/assets/event-fancy.jpg";
import marathon from "@/assets/event-marathon.jpg";
import g2 from "@/assets/20.png";
import about from "@/assets/2.jpeg";
import g5 from "@/assets/4.jpeg";
import g6 from "@/assets/5.jpeg";
import g7 from "@/assets/1.jpeg";
import g8 from "@/assets/14.jpeg";
import g9 from "@/assets/12.jpeg";
import g10 from "@/assets/18.png";
import g11 from "@/assets/19.png";
import g12 from "@/assets/1.jpeg";
import g13 from "@/assets/20.png";
import g14 from "@/assets/14.jpeg";

const all = [hero, g1, g2, g3, g4, kidfest, about, fancy, marathon, g5, g6, g7, g8, g9, g10, g11, g12, g13, g14];
const rail1 = [g1, g2, g3, g4, kidfest, about];
const rail2 = [hero, fancy, marathon, g1, g3, kidfest];

export default function GalleryPage() {
  return (
    <div className="py-20 bg-background">
      <Reveal className="text-center mb-12 px-6">
        <p className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">Memories</p>
        <h1 className="font-display text-4xl md:text-6xl font-bold mt-3">Gallery</h1>
      </Reveal>
      <div className="space-y-6 mb-16">
        <Marquee direction="left">
          {rail1.map((src, i) => (
            <div key={i} className="mx-3 hover-zoom rounded-2xl overflow-hidden shadow-soft" style={{ width: 320, height: 220 }}>
              <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
            </div>
          ))}
        </Marquee>
        <Marquee direction="right">
          {rail2.map((src, i) => (
            <div key={i} className="mx-3 hover-zoom rounded-2xl overflow-hidden shadow-soft" style={{ width: 320, height: 220 }}>
              <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
            </div>
          ))}
        </Marquee>
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 [column-fill:_balance]">
          {all.map((src, i) => (
            <Reveal key={i} delay={i * 40} className="mb-4 break-inside-avoid">
              <div className="hover-zoom rounded-2xl overflow-hidden shadow-soft">
                <img src={src} alt="" className="w-full object-cover" loading="lazy" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
