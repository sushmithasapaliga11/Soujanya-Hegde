import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/kidfest", label: "Kidfest" },
  { to: "/videos", label: "Videos" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl shadow-soft border-b border-border/40"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10 flex items-center justify-between h-20">
        <Link to="/" className="font-display text-xl md:text-2xl font-bold tracking-tight">
          <span className="text-gradient-primary">Soujanya</span>
          <span className="text-foreground"> Hegde</span>
        </Link>
        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="nav-link text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              activeProps={{ className: "nav-link text-sm font-medium text-primary" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="hidden lg:block">
          <Button asChild className="bg-gradient-primary text-primary-foreground shadow-elegant hover:opacity-90">
            <Link to="/contact">Let's Create Magic</Link>
          </Button>
        </div>
        <button
          aria-label="Toggle menu"
          className="lg:hidden p-2 text-foreground"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden bg-background/95 backdrop-blur-xl border-t border-border/40 animate-fade-in">
          <div className="px-6 py-4 flex flex-col gap-3">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="py-2 text-base text-foreground/90 hover:text-primary"
                activeProps={{ className: "py-2 text-base text-primary font-semibold" }}
                activeOptions={{ exact: l.to === "/" }}
              >
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
