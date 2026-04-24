import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { Marquee } from "@/components/Marquee";
import { InteractiveOHeading } from "@/components/InteractiveOHeading";
import about from "@/assets/1.jpeg";
import g1 from "@/assets/16.jpeg";
import g2 from "@/assets/17.jpeg";

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

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Mrs. Soujanya Hegde" },
      { name: "description", content: "Meet Mrs. Soujanya Hegde — celebrity host, event planner, corporate trainer and influencer based in Mangalore." },
      { property: "og:title", content: "About — Mrs. Soujanya Hegde" },
      { property: "og:description", content: "Meet Mrs. Soujanya Hegde — celebrity host, event planner, corporate trainer and influencer." },
      { property: "og:image", content: about },
    ],
  }),
  component: AboutPage,
});

const roles = ["Event Planner", "Celebrity Host", "Corporate Trainer", "Influencer", "Mrs India Finalist"];
const rail = [g1, g2, g5, g6, g7, g8, g9, g10, g11, g12, g13, g14, about];

function AboutPage() {
  return (
    <div className="bg-background">
      <section className="py-20 px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <Reveal className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">Get to know</p>
            <div className="mt-4">
              <InteractiveOHeading
                word="ABOUT"
                panel={
                  <div>
                    <h3 className="font-display text-3xl mb-3">Quick Facts</h3>
                    <ul className="space-y-2 text-base text-left max-w-sm mx-auto">
                      <li>✦ Based in Mangalore</li>
                      <li>✦ 10+ years on stage</li>
                      <li>✦ 500+ events hosted</li>
                      <li>✦ Trained across 50+ corporates</li>
                      <li>✦ Mrs India Worldwide finalist</li>
                    </ul>
                    <p className="mt-4 text-sm opacity-80">Tap the O anywhere to discover more.</p>
                  </div>
                }
              />
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <Reveal>
              <div className="relative">
                <div className="absolute -inset-6 rounded-[2rem] bg-gradient-primary opacity-20 blur-2xl" />
                <img src={about} alt="Soujanya Hegde portrait" className="relative rounded-[2rem] shadow-elegant w-full max-w-md mx-auto" loading="lazy" />
              </div>
            </Reveal>
            <Reveal delay={150}>
              <h3 className="font-display text-3xl md:text-4xl font-bold leading-tight">
                Hosting hearts, planning <span className="italic text-primary">moments</span>.
              </h3>
              <p className="mt-5 text-muted-foreground leading-relaxed">
                I'm Soujanya Hegde — a celebrity host and event planner with a passion for turning ordinary
                gatherings into extraordinary memories. From intimate weddings to large-scale corporate
                galas, I bring warmth, energy and a meticulous eye for detail.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                As a corporate trainer, I empower teams with stage presence and communication skills. As an
                influencer, I share stories, style and stagecraft. As a Mrs India Worldwide Entrepreneur
                finalist, I champion women who dare to dream.
              </p>
              <div className="mt-7 flex flex-wrap gap-2">
                {roles.map((r) => (
                  <span key={r} className="px-4 py-2 rounded-full bg-secondary border border-border text-sm font-medium text-secondary-foreground">{r}</span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-12 bg-cream">
        <Reveal className="text-center mb-8">
          <h3 className="font-display text-2xl md:text-3xl font-bold">Past Highlights</h3>
        </Reveal>
        <Marquee direction="right">
          {rail.map((src, i) => (
            <div key={i} className="mx-3 hover-zoom rounded-2xl overflow-hidden shadow-soft" style={{ width: 280, height: 200 }}>
              <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
            </div>
          ))}
        </Marquee>
      </section>
    </div>
  );
}
