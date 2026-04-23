import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Mic2, ChevronDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnnouncementMarquee, ReverseMarquee } from "@/components/AnnouncementMarquee";
import { Reveal } from "@/components/Reveal";
import { Marquee } from "@/components/Marquee";
import heroImg from "@/assets/hero-soujanya.jpg";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import kidfest from "@/assets/kidfest-hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mrs. Soujanya Hegde — Celebrity Host & Event Planner | Mangalore" },
      { name: "description", content: "Finalist Mrs India Worldwide Entrepreneur. Premium event planning, wedding hosting, corporate training & influencer collaborations across India." },
      { property: "og:title", content: "Mrs. Soujanya Hegde — Celebrity Host & Event Planner" },
      { property: "og:description", content: "Premium event planning, hosting & corporate training based in Mangalore." },
      { property: "og:image", content: heroImg },
      { name: "twitter:image", content: heroImg },
    ],
  }),
  component: HomePage,
});

const rail = [g1, g2, g3, g4, kidfest];

function HomePage() {
  return (
    <div className="-mt-20">
      {/* HERO */}
      <section className="relative h-[100vh] min-h-[640px] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Mrs. Soujanya Hegde hosting on stage"
            className="h-full w-full object-cover animate-ken-burns"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/40 to-transparent" />
        </div>

        {/* Floating decoration */}
        <div className="absolute top-32 right-10 h-72 w-72 rounded-full bg-[oklch(0.78_0.13_80)]/30 blur-3xl animate-float" />
        <div className="absolute bottom-20 left-10 h-96 w-96 rounded-full bg-primary/30 blur-3xl animate-float" style={{ animationDelay: "2s" }} />

        <div className="relative z-10 mx-auto max-w-7xl h-full px-6 lg:px-10 flex items-center">
          <div className="max-w-3xl text-primary-foreground">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur text-xs md:text-sm font-medium border border-white/20"
            >
              <Sparkles className="h-3.5 w-3.5 text-[oklch(0.85_0.13_80)]" />
              Finalist · Mrs India Worldwide Entrepreneur
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15 }}
              className="mt-6 font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05]"
            >
              Mrs. Soujanya
              <br />
              <span className="italic font-medium text-[oklch(0.92_0.08_80)]">Hegde</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-6 text-base md:text-xl text-primary-foreground/85 max-w-2xl leading-relaxed"
            >
              Celebrity Host · Event Planner · Corporate Trainer · Influencer.
              Crafting moments that linger long after the lights dim.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Button asChild size="lg" className="bg-[oklch(0.78_0.13_80)] text-foreground hover:bg-[oklch(0.85_0.13_80)] shadow-gold rounded-full px-8 h-12">
                <Link to="/videos"><Mic2 className="mr-1" /> Watch Me in Action</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full px-8 h-12 bg-white/10 backdrop-blur text-primary-foreground border-white/40 hover:bg-white/20">
                <Link to="/contact">Contact Me <ArrowRight /></Link>
              </Button>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-primary-foreground/80 animate-float">
          <ChevronDown className="h-6 w-6" />
        </div>
      </section>

      {/* MARQUEES (two layers, opposite) */}
      <AnnouncementMarquee />
      <ReverseMarquee />

      {/* Photo rail right-to-left */}
      <section className="py-16 bg-cream">
        <Reveal className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">Moments</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-3">Stages, Smiles & Spotlights</h2>
        </Reveal>
        <Marquee direction="right" speed="slow">
          {rail.map((src, i) => (
            <div key={i} className="mx-3 hover-zoom rounded-2xl overflow-hidden shadow-soft" style={{ width: 320, height: 220 }}>
              <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
            </div>
          ))}
        </Marquee>
      </section>

      {/* Kidfest teaser */}
      <section className="py-24 px-6 lg:px-10 bg-background">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div className="relative rounded-3xl overflow-hidden shadow-elegant">
              <img src={kidfest} alt="Kidfest" className="w-full h-[460px] object-cover hover:scale-105 transition-transform duration-700" loading="lazy" />
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[oklch(0.78_0.13_80)] text-foreground text-xs font-bold">FEATURED EVENT</div>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <p className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">Kidfest 2026</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 leading-tight">
              Because every <span className="italic text-primary">KID</span> is a star
            </h2>
            <p className="mt-5 text-muted-foreground text-lg leading-relaxed">
              Two days of joy, competitions, performances and unforgettable memories at Palemar Convention Centre, Maryhill — Mangalore.
            </p>
            <ul className="mt-6 grid grid-cols-2 gap-3 text-sm">
              {["📅 May 16 & 17, 2026","📍 Palemar Convention","🏆 9 Competitions","🎭 Stage Performances","🎪 Flea Market","🏃 Marathon"].map((t) => (
                <li key={t} className="px-4 py-3 rounded-xl bg-secondary/50 border border-border">{t}</li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-gradient-primary text-primary-foreground rounded-full px-8 shadow-elegant">
                <Link to="/kidfest">Explore Kidfest</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
