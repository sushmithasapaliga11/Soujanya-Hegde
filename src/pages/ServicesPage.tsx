import { Reveal } from "@/components/Reveal";
import { CalendarHeart, Heart, GraduationCap, Megaphone, Mic2 } from "lucide-react";

const services = [
  { icon: CalendarHeart, title: "Event Planning", desc: "End-to-end planning for weddings, galas, launches and private celebrations." },
  { icon: Heart, title: "Wedding Hosting", desc: "Bilingual emcee with a warm, elegant presence — keeps every moment flowing." },
  { icon: GraduationCap, title: "Corporate Training", desc: "Communication, stage presence and confidence workshops for teams." },
  { icon: Megaphone, title: "Influencer Promotions", desc: "Authentic brand collaborations across Instagram, YouTube and beyond." },
  { icon: Mic2, title: "Stage Hosting", desc: "Awards nights, conferences, fashion shows — commanding the stage with grace." },
];

export default function ServicesPage() {
  return (
    <div className="py-20 px-6 lg:px-10 bg-background">
      <div className="mx-auto max-w-7xl">
        <Reveal className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">What I do</p>
          <h1 className="font-display text-4xl md:text-6xl font-bold mt-3">Services</h1>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Premium offerings curated for moments that deserve more than ordinary.
          </p>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 80}>
              <div className="group relative h-full p-8 rounded-3xl bg-card border border-border hover-lift overflow-hidden">
                <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-gradient-primary opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500" />
                <div className="relative">
                  <div className="h-14 w-14 rounded-2xl bg-gradient-primary text-primary-foreground grid place-items-center shadow-soft group-hover:rotate-12 transition-transform duration-500">
                    <s.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-2xl font-bold mt-5">{s.title}</h3>
                  <p className="mt-3 text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
