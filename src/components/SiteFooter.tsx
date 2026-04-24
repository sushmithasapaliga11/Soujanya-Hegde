import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, MapPin } from "lucide-react";

const socials = [
  { icon: Instagram, href: "https://www.instagram.com/hegdesoujanya/", label: "Instagram" },
  { icon: Facebook, href: "https://www.facebook.com/destroyer9611/", label: "Facebook" },
];

export function SiteFooter() {
  return (
    <footer className="relative mt-24 bg-gradient-to-br from-primary-deep to-primary text-primary-foreground overflow-hidden"
      style={{ background: "linear-gradient(135deg, oklch(0.45 0.06 187), oklch(0.62 0.06 187))" }}>
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-white/10 blur-3xl animate-float" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-[oklch(0.78_0.13_80)]/20 blur-3xl animate-float" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 py-16 grid md:grid-cols-3 gap-10">
        <div>
          <h3 className="font-display text-2xl font-bold">Soujanya Hegde</h3>
          <p className="mt-3 text-sm text-primary-foreground/80 max-w-xs">
            Celebrity Host, Event Planner, Corporate Trainer & Influencer — crafting unforgettable moments.
          </p>
          <div className="mt-6 flex gap-3">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="h-10 w-10 grid place-items-center rounded-full bg-white/10 hover:bg-[oklch(0.78_0.13_80)] hover:text-foreground transition-all hover:-translate-y-1"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-display text-lg font-semibold">Explore</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link to="/kidfest" className="text-primary-foreground/80 hover:text-[oklch(0.85_0.13_80)] transition-colors">
                Kidfest
              </Link>
            </li>
            <li>
              <a href="https://sparktreefoundation.in/" target="_blank" rel="noreferrer" className="text-primary-foreground/80 hover:text-[oklch(0.85_0.13_80)] transition-colors">
                SparkTree Foundation
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/sareerun.mangalore/" target="_blank" rel="noreferrer" className="text-primary-foreground/80 hover:text-[oklch(0.85_0.13_80)] transition-colors">
                Sarees Run
              </a>
            </li>
            <li>
              <a href="/chatroom" className="text-primary-foreground/80 hover:text-[oklch(0.85_0.13_80)] transition-colors">
                Chatroom
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/letzparty_decorstore/" target="_blank" rel="noreferrer" className="text-primary-foreground/80 hover:text-[oklch(0.85_0.13_80)] transition-colors">
                Let'Z Party
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-lg font-semibold">Service Location</h4>
          <p className="mt-4 flex items-center gap-2 text-sm text-primary-foreground/90">
            <MapPin className="h-4 w-4" /> Mangalore, India
          </p>
          <p className="mt-2 text-sm text-primary-foreground/70">
            Available across India for premium events.
          </p>
        </div>
      </div>
      <div className="relative border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-primary-foreground/70">
          <p>© {new Date().getFullYear()} Mrs. Soujanya Hegde. All rights reserved.</p>
          <p>Crafted with elegance ✦</p>
        </div>
      </div>
    </footer>
  );
}
