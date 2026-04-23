import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { RegistrationModal, COMPETITIONS } from "@/components/RegistrationModal";
import {
  Baby, Bike, Shirt, Palette, Crown, Bot, BrainCircuit, Users, Footprints,
  Calendar, MapPin, Trophy, Tent, Sparkles, GraduationCap, Award, Music
} from "lucide-react";
import kidfest from "@/assets/kidfest-hero.jpg";
import crawling from "@/assets/event-crawling.jpg";
import fancy from "@/assets/event-fancy.jpg";
import marathon from "@/assets/event-marathon.jpg";
import flea from "@/assets/event-flea.jpg";

export const Route = createFileRoute("/kidfest")({
  head: () => ({
    meta: [
      { title: "Kidfest 2026 — because every KID is a star" },
      { name: "description", content: "Kidfest 2026 · May 16 & 17 · Palemar Convention Centre, Mangalore. Competitions, performances, marathon and an awards night for kids." },
      { property: "og:title", content: "Kidfest 2026 — Mangalore" },
      { property: "og:description", content: "9 competitions, stage performances, flea market and awards night. Register now!" },
      { property: "og:image", content: kidfest },
    ],
  }),
  component: KidfestPage,
});

const happenings = [
  { icon: Tent, title: "Flea Market", img: flea },
  { icon: Sparkles, title: "Puppet Show" },
  { icon: GraduationCap, title: "Experiential Learning" },
  { icon: Trophy, title: "Competitions", img: fancy },
  { icon: Award, title: "Recognition" },
  { icon: Music, title: "Stage Performances" },
  { icon: Footprints, title: "Marathon", img: marathon },
  { icon: Crown, title: "Awards Night" },
];

const competitions = [
  { icon: Baby, name: "Crawling Competition" },
  { icon: Bike, name: "Tricycle Race" },
  { icon: Shirt, name: "Fancy Dress" },
  { icon: Palette, name: "Drawing Competition" },
  { icon: Crown, name: "Little Prince & Princess Contest" },
  { icon: Bot, name: "Robotics Contest" },
  { icon: BrainCircuit, name: "Quiz Contest" },
  { icon: Users, name: "Twin Show" },
  { icon: Footprints, name: "Marathon" },
];

function KidfestPage() {
  const [open, setOpen] = useState(false);
  const [defaultCat, setDefaultCat] = useState<(typeof COMPETITIONS)[number] | undefined>();

  const openWith = (cat?: (typeof COMPETITIONS)[number]) => {
    setDefaultCat(cat);
    setOpen(true);
  };

  return (
    <div className="-mt-20 bg-background">
      {/* Hero */}
      <section className="relative h-[80vh] min-h-[560px] overflow-hidden">
        <img src={kidfest} alt="Kidfest" className="absolute inset-0 h-full w-full object-cover animate-ken-burns" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/40 to-foreground/30" />
        <div className="relative z-10 mx-auto max-w-7xl h-full px-6 lg:px-10 flex items-end pb-16">
          <div className="text-primary-foreground max-w-3xl">
            <motion.span
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="inline-block px-3 py-1 rounded-full bg-[oklch(0.78_0.13_80)] text-foreground text-xs font-bold tracking-wide"
            >
              MAY 16 & 17, 2026
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="font-display text-5xl md:text-7xl font-bold mt-4 leading-[1.05]"
            >
              KIDFEST<br />
              <span className="italic text-[oklch(0.92_0.08_80)]">because every KID is a star</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
              className="mt-5 text-lg flex flex-wrap gap-x-6 gap-y-2 text-primary-foreground/90"
            >
              <span className="inline-flex items-center gap-2"><Calendar className="h-4 w-4" /> May 16 & 17, 2026</span>
              <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4" /> Palemar Convention Centre, Maryhill, Mangalore</span>
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              className="mt-8"
            >
              <Button
                size="lg"
                onClick={() => openWith()}
                className="bg-[oklch(0.78_0.13_80)] text-foreground hover:bg-[oklch(0.85_0.13_80)] shadow-gold rounded-full px-10 h-14 text-base font-semibold"
              >
                Register Now 🎉
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What's happening */}
      <section className="py-20 px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <Reveal className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">Two big days</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-3">What's Happening</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {happenings.map((h, i) => (
              <Reveal key={h.title} delay={i * 60}>
                <div className="group relative rounded-2xl overflow-hidden bg-card border border-border hover-lift h-44">
                  {h.img && (
                    <img src={h.img} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500" loading="lazy" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
                  <div className="relative h-full p-5 flex flex-col justify-end text-primary-foreground">
                    <h.icon className="h-8 w-8 mb-2 text-[oklch(0.85_0.13_80)] group-hover:scale-110 transition-transform" />
                    <h3 className="font-display text-xl font-semibold">{h.title}</h3>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Competitions */}
      <section className="py-20 px-6 lg:px-10 bg-cream">
        <div className="mx-auto max-w-7xl">
          <Reveal className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-5xl font-bold">Competitions</h2>
            <p className="mt-3 text-muted-foreground">Pick your favourite — slots are limited.</p>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {competitions.map((c, i) => (
              <Reveal key={c.name} delay={i * 50}>
                <div className="group p-6 rounded-2xl bg-card border border-border hover-lift flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-gradient-primary text-primary-foreground grid place-items-center shadow-soft group-hover:rotate-6 transition-transform">
                    <c.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{c.name}</h3>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => openWith(c.name as any)}
                    className="text-primary hover:bg-primary/10"
                  >
                    Register
                  </Button>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10 text-center">
            <div className="inline-block px-6 py-4 rounded-2xl bg-secondary border border-border">
              <p className="font-medium">Who can participate? <span className="text-primary">Kids up to 10th standard · Twins / Triplets welcome</span></p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Crawling Competition */}
      <section className="py-20 px-6 lg:px-10">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div className="relative rounded-3xl overflow-hidden shadow-elegant">
              <img src={crawling} alt="Crawling Competition" className="w-full h-[460px] object-cover" loading="lazy" />
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[oklch(0.78_0.13_80)] text-foreground text-xs font-bold">SPECIAL</div>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <p className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">Kid Fest Special</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-3">Crawling Competition</h2>
            <div className="mt-6 grid sm:grid-cols-2 gap-4 text-sm">
              <Card title="Eligibility">Babies below 1 year who can crawl</Card>
              <Card title="Features">Safe crawling area · Fun environment · Parents cheering</Card>
              <Card title="Challenge">Crawl to the finish line</Card>
              <Card title="Rewards">Participation certificates · Trophies for top 3</Card>
              <Card title="Registration Fee" highlight>₹100</Card>
              <Card title="Notes">Prior registration required · Limited slots available</Card>
            </div>
            <div className="mt-8">
              <Button
                size="lg"
                onClick={() => openWith("Crawling Competition")}
                className="bg-gradient-primary text-primary-foreground rounded-full px-8 h-12 shadow-elegant"
              >
                Register for Crawling Competition
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-16 px-6 lg:px-10 bg-gradient-primary text-primary-foreground text-center">
        <Reveal>
          <h3 className="font-display text-3xl md:text-4xl font-bold">Ready to make your kid a star?</h3>
          <p className="mt-3 opacity-90">Register today — slots fill up fast.</p>
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <Button size="lg" onClick={() => openWith()} className="bg-[oklch(0.78_0.13_80)] text-foreground hover:bg-[oklch(0.85_0.13_80)] rounded-full px-8 h-12">
              Register Now
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full px-8 h-12 bg-white/10 text-primary-foreground border-white/40 hover:bg-white/20">
              <Link to="/contact">Talk to us</Link>
            </Button>
          </div>
        </Reveal>
      </section>

      <RegistrationModal open={open} onOpenChange={setOpen} defaultCategory={defaultCat} />
    </div>
  );
}

function Card({ title, children, highlight }: { title: string; children: React.ReactNode; highlight?: boolean }) {
  return (
    <div className={`p-4 rounded-xl border border-border ${highlight ? "bg-gradient-primary text-primary-foreground" : "bg-card"}`}>
      <p className={`text-xs uppercase tracking-wider ${highlight ? "opacity-80" : "text-primary"} font-semibold`}>{title}</p>
      <p className={`mt-1 font-medium ${highlight ? "text-2xl font-display" : ""}`}>{children}</p>
    </div>
  );
}
