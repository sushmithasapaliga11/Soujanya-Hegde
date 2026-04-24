import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { RegistrationModal, COMPETITIONS } from "@/components/RegistrationModal";
import {
  Baby, Bike, Shirt, Palette, Crown, Bot, BrainCircuit, Users, Footprints,
  Calendar, MapPin, Trophy, Tent, GraduationCap, Music, X, Star, Gift, Info,
  MessageCircle, Instagram,
} from "lucide-react";
import kidfest from "@/assets/kidfest-hero.jpg";
import crawling from "@/assets/event-crawling.jpg";
import fancy from "@/assets/event-fancy.jpg";
import flea from "@/assets/event-flea.jpg";

export const Route = createFileRoute("/kidfest")({
  head: () => ({
    meta: [
      { title: "Kidfest 2026 — because every KID is a star" },
      { name: "description", content: "Kidfest 2026 · May 16 & 17 · Palemar Convention Centre, Mangalore." },
      { property: "og:title", content: "Kidfest 2026 — Mangalore" },
      { property: "og:description", content: "9 competitions, stage performances, flea market and awards night. Register now!" },
      { property: "og:image", content: kidfest },
    ],
  }),
  component: KidfestPage,
});

// ─── Types ─────────────────────────────────────────────────────────────────
type CompDetail = {
  name: string;
  emoji: string;
  eligibility: string;
  rules: string[];
  rewards: string;
  fee: string;
  notes?: string;
};

// ─── Data ──────────────────────────────────────────────────────────────────
const competitionDetails: CompDetail[] = [
  {
    name: "Crawling Competition", emoji: "👶",
    eligibility: "Babies below 1 year who can crawl",
    rules: ["Safe crawling area provided", "Parents may cheer from sidelines", "Crawl to the finish line — fastest wins"],
    rewards: "Participation certificates · Trophies for top 3",
    fee: "₹100", notes: "Prior registration required · Limited slots available",
  },
  {
    name: "Tricycle Race", emoji: "🚲",
    eligibility: "Kids aged 2–5 years",
    rules: ["Ride a tricycle along the marked track", "No pushing or assistance allowed", "Fastest to finish wins"],
    rewards: "Medals for top 3 · Participation certificates for all",
    fee: "₹100",
  },
  {
    name: "Fancy Dress", emoji: "👗",
    eligibility: "Kids up to 10th standard",
    rules: ["Dress as any character, profession, or theme", "30-second introduction on stage", "Judged on costume, confidence & presentation"],
    rewards: "Trophies for top 3 · Certificates for all participants",
    fee: "₹150",
  },
  {
    name: "Drawing Competition", emoji: "🎨",
    eligibility: "Kids up to 10th standard",
    rules: ["Theme announced on the day", "Materials provided", "Time limit: 45 minutes"],
    rewards: "Prizes for top 3 in each age group · Certificates for all",
    fee: "₹100",
  },
  {
    name: "Little Prince & Princess Contest", emoji: "👑",
    eligibility: "Kids aged 3–10 years",
    rules: ["Judged on personality, confidence & stage presence", "Short Q&A round included", "Traditional or western attire welcome"],
    rewards: "Crown, sash & trophy for winners · Certificates for all",
    fee: "₹200",
  },
  {
    name: "Robotics Contest", emoji: "🤖",
    eligibility: "Kids aged 8–16 years",
    rules: ["Build or program a robot for a given task", "Teams of 1–3 allowed", "Materials may be brought or provided on-site"],
    rewards: "Trophies & certificates · Special innovation award",
    fee: "₹250",
  },
  {
    name: "Quiz Contest", emoji: "🧠",
    eligibility: "Kids aged 6–16 years",
    rules: ["General knowledge + current affairs", "Individual participation", "Multiple rounds — elimination format"],
    rewards: "Trophies for top 3 · Certificates for all",
    fee: "₹100",
  },
  {
    name: "Twin Show", emoji: "👯",
    eligibility: "Twins & Triplets of any age",
    rules: ["Perform together on stage (dance, skit, or talent)", "Max 3 minutes per act", "Judged on coordination, creativity & presentation"],
    rewards: "Special Twin Trophy · Certificates for all pairs",
    fee: "₹150 per pair", notes: "Triplets also welcome — special category available",
  },
  {
    name: "Marathon", emoji: "🏃",
    eligibility: "Kids aged 5–16 years (age-group categories)",
    rules: ["Marked route inside the venue", "Age-group heats", "Safety marshals present throughout"],
    rewards: "Medals for top 3 in each age group · Finisher certificates",
    fee: "₹100",
  },
];

const happenings = [
  { icon: Tent,          title: "Flea Market",           img: flea,     tooltip: "Kids' flea market promoting creativity and early entrepreneurship" },
  { icon: GraduationCap, title: "Experiential Learning", img: kidfest,  tooltip: "Experiential learning zones (arts, creativity, life skills) and recreational zones" },
  { icon: Trophy,        title: "Competitions",          img: crawling, tooltip: "Structured competitions & curated stage performances" },
  { icon: Music,         title: "Stage Performances",    img: fancy,    tooltip: "Awards & recognitions for children, educators, and institutions" },
];

const competitions = [
  { icon: Baby,         name: "Crawling Competition" },
  { icon: Bike,         name: "Tricycle Race" },
  { icon: Shirt,        name: "Fancy Dress" },
  { icon: Palette,      name: "Drawing Competition" },
  { icon: Crown,        name: "Little Prince & Princess Contest" },
  { icon: Bot,          name: "Robotics Contest" },
  { icon: BrainCircuit, name: "Quiz Contest" },
  { icon: Users,        name: "Twin Show" },
  { icon: Footprints,   name: "Marathon" },
];

// ─── Competition Detail Modal ───────────────────────────────────────────────
function CompetitionModal({ detail, onClose }: { detail: CompDetail; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-foreground/80 backdrop-blur-sm" />
        <motion.div
          className="relative z-10 w-full max-w-lg bg-card rounded-3xl shadow-elegant overflow-hidden max-h-[90vh] overflow-y-auto"
          initial={{ scale: 0.88, opacity: 0, y: 24 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.88, opacity: 0, y: 24 }}
          transition={{ type: "spring", stiffness: 320, damping: 28 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-gradient-primary p-6 text-primary-foreground relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 h-8 w-8 rounded-full bg-white/20 hover:bg-white/30 grid place-items-center transition-colors"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
            <p className="text-4xl mb-2">{detail.emoji}</p>
            <h2 className="font-display text-2xl font-bold">{detail.name}</h2>
          </div>

          <div className="p-6 space-y-5">
            <DetailRow icon={<Star className="h-4 w-4 text-primary" />} label="Eligibility" value={detail.eligibility} />
            <div>
              <p className="text-xs uppercase tracking-wider text-primary font-semibold mb-2 flex items-center gap-1.5">
                <Info className="h-3.5 w-3.5" /> Rules
              </p>
              <ul className="space-y-1.5">
                {detail.rules.map((r, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
            <DetailRow icon={<Gift className="h-4 w-4 text-primary" />} label="Rewards" value={detail.rewards} />
            <div className="flex gap-3">
              <div className="flex-1 p-4 rounded-2xl bg-gradient-primary text-primary-foreground text-center">
                <p className="text-xs opacity-80 uppercase tracking-wider">Registration Fee</p>
                <p className="font-display text-2xl font-bold mt-1">{detail.fee}</p>
              </div>
              {detail.notes && (
                <div className="flex-1 p-4 rounded-2xl bg-secondary border border-border text-sm text-muted-foreground flex items-center">
                  {detail.notes}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function DetailRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wider text-primary font-semibold mb-1 flex items-center gap-1.5">
        {icon} {label}
      </p>
      <p className="text-sm text-muted-foreground">{value}</p>
    </div>
  );
}

// ─── Happening Card with tooltip ───────────────────────────────────────────
function HappeningCard({ h }: { h: typeof happenings[number] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="group relative rounded-2xl overflow-hidden bg-card border border-border h-44 cursor-default"
      style={{ transition: "transform 0.35s cubic-bezier(.2,.8,.2,1), box-shadow 0.35s" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {h.img && (
        <img src={h.img} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500" loading="lazy" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
      <div className="relative h-full p-5 flex flex-col justify-end text-primary-foreground">
        <h.icon className="h-8 w-8 mb-2 text-[oklch(0.85_0.13_80)] group-hover:scale-110 transition-transform duration-300" />
        <h3 className="font-display text-xl font-semibold">{h.title}</h3>
      </div>
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 flex items-center justify-center p-4 bg-foreground/85 backdrop-blur-sm rounded-2xl"
          >
            <p className="text-primary-foreground text-sm text-center leading-relaxed">{h.tooltip}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Card helper ───────────────────────────────────────────────────────────
function Card({ title, children, highlight }: { title: string; children: React.ReactNode; highlight?: boolean }) {
  return (
    <div className={`p-4 rounded-xl border border-border ${highlight ? "bg-gradient-primary text-primary-foreground" : "bg-card"}`}>
      <p className={`text-xs uppercase tracking-wider font-semibold ${highlight ? "opacity-80" : "text-primary"}`}>{title}</p>
      <p className={`mt-1 font-medium ${highlight ? "text-2xl font-display" : ""}`}>{children}</p>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────
function KidfestPage() {
  const [open, setOpen] = useState(false);
  const [defaultCat, setDefaultCat] = useState<(typeof COMPETITIONS)[number] | undefined>();
  const [activeDetail, setActiveDetail] = useState<CompDetail | null>(null);

  const openWith = (cat?: (typeof COMPETITIONS)[number]) => { setDefaultCat(cat); setOpen(true); };
  const openDetail = (name: string) => {
    const detail = competitionDetails.find((d) => d.name === name);
    if (detail) setActiveDetail(detail);
  };

  return (
    <div className="-mt-20 bg-background">

      {/* ── Hero ── */}
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
              <a href="https://maps.app.goo.gl/ipia3jdSHg3ct7Hn8" target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 underline underline-offset-2 hover:opacity-80">
                <MapPin className="h-4 w-4" /> Palemar Convention Centre, Maryhill, Mangalore
              </a>
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-8">
              <Button
                size="lg" onClick={() => openWith()}
                className="bg-[oklch(0.78_0.13_80)] text-foreground hover:bg-[oklch(0.85_0.13_80)] shadow-gold rounded-full px-10 h-14 text-base font-semibold"
              >
                Register Now 🎉
              </Button>
              
            </motion.div>
           
          </div>
        </div>
      </section>

      {/* ── What's Happening ── */}
      <section className="py-20 px-6 lg:px-10 bg-background">
        <div className="mx-auto max-w-7xl">
          <Reveal className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">Two big days</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-3">What's Happening</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {happenings.map((h, i) => (
              <Reveal key={h.title} delay={i * 60}>
                <HappeningCard h={h} />
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10 text-center">
            <div className="inline-block px-6 py-4 rounded-2xl bg-secondary border border-border">
              <p className="font-medium">
                Big dreams start here —{" "}
                <span className="text-primary">grow · learn · explore · shine</span>
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      

      {/* ── Crawling Competition spotlight ── */}
      <section className="py-20 px-6 lg:px-10 bg-background">
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
                size="lg" onClick={() => openWith("Crawling Competition")}
                className="bg-gradient-primary text-primary-foreground rounded-full px-8 h-12 shadow-elegant"
              >
                Register for Crawling Competition
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
      {/* ── Competitions ── */}
      <section className="py-20 px-6 lg:px-10 bg-cream">
        <div className="mx-auto max-w-7xl">
          <Reveal className="text-center mb-10">
            <h2 className="font-display text-4xl md:text-5xl font-bold">Competitions</h2>
            <p className="mt-3 text-muted-foreground">Pick your favourite — slots are limited.</p>
          </Reveal>

          {/* Participation callout + Wait is Over CTA */}
          <Reveal className="mb-10">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-5 rounded-2xl bg-card border border-border shadow-soft">
              <p className="font-medium text-center sm:text-left">
                Who can participate?{" "}
                <span className="text-primary">Kids up to 10th standard · Twins / Triplets welcome</span>
              </p>
              <motion.div animate={{ scale: [1, 1.04, 1] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
                <Button
                  onClick={() => openWith()}
                  size="lg"
                  className="bg-gradient-primary text-primary-foreground rounded-full px-8 h-12 shadow-elegant whitespace-nowrap font-bold text-base"
                >
                  ⏰ Wait is Over — Register Now
                </Button>
              </motion.div>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {competitions.map((c, i) => (
              <Reveal key={c.name} delay={i * 50}>
                <motion.div
                  className="group p-6 rounded-2xl bg-card border border-border flex items-center gap-4 cursor-pointer"
                  whileHover={{ scale: 1.03, boxShadow: "0 12px 40px -12px oklch(0.62 0.06 187 / 0.35)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  onClick={() => openDetail(c.name)}
                >
                  <div className="h-12 w-12 rounded-xl bg-gradient-primary text-primary-foreground grid place-items-center shadow-soft group-hover:rotate-6 transition-transform duration-300 flex-shrink-0">
                    <c.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-base leading-snug">{c.name}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">Tap for details</p>
                  </div>
                  <motion.button
                    onClick={(e) => { e.stopPropagation(); openWith(c.name as any); }}
                    className="relative px-4 py-2 rounded-full text-sm font-semibold text-primary-foreground bg-gradient-primary shadow-soft overflow-hidden flex-shrink-0"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="relative z-10">Register</span>
                    <motion.span
                      className="absolute inset-0 rounded-full bg-white/20"
                      initial={{ scale: 0, opacity: 0.6 }}
                      whileTap={{ scale: 2.5, opacity: 0 }}
                      transition={{ duration: 0.4 }}
                    />
                  </motion.button>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section id="register" className="py-16 px-6 lg:px-10 bg-gradient-primary text-primary-foreground text-center">
        <Reveal>
          <h3 className="font-display text-3xl md:text-4xl font-bold">Ready to make your kid a star?</h3>
          <p className="mt-3 opacity-90">Register today — slots fill up fast.</p>
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <Button size="lg" onClick={() => openWith()}
              className="bg-[oklch(0.78_0.13_80)] text-foreground hover:bg-[oklch(0.85_0.13_80)] rounded-full px-8 h-12">
              Register Now
            </Button>
            <Button asChild size="lg" variant="outline"
              className="rounded-full px-8 h-12 bg-white/10 text-primary-foreground border-white/40 hover:bg-white/20">
              <a href="https://wa.me/919880842007?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20Kidfest%202026" target="_blank" rel="noreferrer">
                <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp Us
              </a>
            </Button>
            <Button asChild size="lg" variant="outline"
              className="rounded-full px-8 h-12 bg-white/10 text-primary-foreground border-white/40 hover:bg-white/20">
              <a href="https://www.instagram.com/kidfestindia/" target="_blank" rel="noreferrer">
                <Instagram className="mr-2 h-4 w-4" /> Follow Us
              </a>
            </Button>
          </div>
        </Reveal>
      </section>

      {/* ── Modals ── */}
      <RegistrationModal open={open} onOpenChange={setOpen} defaultCategory={defaultCat} />
      {activeDetail && <CompetitionModal detail={activeDetail} onClose={() => setActiveDetail(null)} />}
    </div>
  );
}
