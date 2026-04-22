import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Phone, UserCog } from "lucide-react";
import { business } from "@/data/mockData";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { to: "/", label: "Home" },
    { to: "/services", label: "Services" },
    { to: "/booking", label: "Booking" },
  ] as const;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/85 backdrop-blur-xl shadow-[var(--shadow-soft)]" : "bg-background/60 backdrop-blur-md"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8 h-18 py-4 flex items-center justify-between">
        <Link to="/" className="font-display font-bold text-lg tracking-tight flex items-center gap-2">
          <span className="h-8 w-8 rounded-lg bg-foreground text-background grid place-items-center text-sm">PS</span>
          <span className="hidden sm:inline">Pawan Sain <span className="text-muted-foreground font-medium">Salon</span></span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="px-4 py-2 text-sm font-medium text-foreground/70 hover:text-foreground rounded-full hover:bg-secondary transition-colors"
              activeProps={{ className: "text-foreground bg-secondary" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/admin"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-4 py-2 text-sm font-medium text-foreground/80 hover:bg-secondary hover:text-foreground transition"
          >
            <UserCog className="h-4 w-4" /> Admin
          </Link>
          <a
            href={`tel:${business.phoneRaw}`}
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background shadow-[var(--shadow-soft)] hover:bg-foreground/90 hover:scale-105 transition"
          >
            <Phone className="h-4 w-4" /> Call Now
          </a>
        </div>

        <button className="md:hidden p-2" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="px-3 py-2.5 rounded-lg text-base font-medium hover:bg-secondary"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/admin"
              onClick={() => setOpen(false)}
              className="px-3 py-2.5 rounded-lg text-base font-medium hover:bg-secondary inline-flex items-center gap-2"
            >
              <UserCog className="h-4 w-4" /> Admin / Login
            </Link>
            <a
              href={`tel:${business.phoneRaw}`}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background"
            >
              <Phone className="h-4 w-4" /> Call Now
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
