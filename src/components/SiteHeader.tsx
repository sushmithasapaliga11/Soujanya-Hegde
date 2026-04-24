import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/kidfest", label: "Kidfest" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (to: string) => to === "/" ? pathname === "/" : pathname.startsWith(to);

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
      scrolled ? "bg-background/80 backdrop-blur-xl shadow-soft border-b border-border/40" : "bg-transparent"
    }`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-10 flex items-center justify-between h-20">
        <Link to="/" className="font-display text-xl md:text-2xl font-bold tracking-tight">
          <span className="text-gradient-primary">Soujanya</span>
          <span className="text-foreground"> Hegde</span>
        </Link>
        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <Link key={l.to} to={l.to}
              className={`nav-link text-sm font-medium transition-colors ${isActive(l.to) ? "text-primary" : "text-foreground/80 hover:text-primary"}`}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="hidden lg:block">
          <Button asChild className="bg-gradient-primary text-primary-foreground shadow-elegant hover:opacity-90">
            <Link to="/contact">Let's Create Magic</Link>
          </Button>
        </div>
        <button aria-label="Toggle menu" className="lg:hidden p-2 text-foreground" onClick={() => setOpen((v) => !v)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden bg-background/95 backdrop-blur-xl border-t border-border/40 animate-fade-in">
          <div className="px-6 py-4 flex flex-col gap-3">
            {links.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)}
                className={`py-2 text-base hover:text-primary ${isActive(l.to) ? "text-primary font-semibold" : "text-foreground/90"}`}>
                {l.label}
              </Link>
            ))}
            <Button asChild className="bg-gradient-primary text-primary-foreground mt-2">
              <Link to="/contact" onClick={() => setOpen(false)}>Book Me</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
