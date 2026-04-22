import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X, Phone, UserCog, User, LogOut } from "lucide-react";
import { business } from "@/data/mockData";
import { userAuth, useUserAuth, emitAuthChange } from "@/lib/store";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { loggedIn, name } = useUserAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/services", label: "Services" },
    { to: "/booking", label: "Booking" },
  ] as const;

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  const handleUserLogout = () => {
    userAuth.logout();
    emitAuthChange();
    setOpen(false);
    navigate("/");
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/85 backdrop-blur-xl shadow-[var(--shadow-soft)]" : "bg-background/60 backdrop-blur-md"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8 h-18 py-4 flex items-center justify-between gap-4">
        <Link to="/" className="font-display font-bold text-lg tracking-tight flex items-center gap-2 shrink-0">
          <span className="h-8 w-8 rounded-lg bg-foreground text-background grid place-items-center text-sm">PS</span>
          <span className="hidden sm:inline">Pawan Sain <span className="text-muted-foreground font-medium">Salon</span></span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                isActive(l.to)
                  ? "text-foreground bg-secondary"
                  : "text-foreground/70 hover:text-foreground hover:bg-secondary"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          {loggedIn ? (
            <div className="flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5 text-sm">
              <User className="h-4 w-4" />
              <span className="font-medium">Hi, {name.split(" ")[0]}</span>
              <button onClick={handleUserLogout} className="ml-1 p-1 rounded-full hover:bg-background" aria-label="Logout">
                <LogOut className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-foreground/80 hover:bg-secondary transition"
            >
              <User className="h-4 w-4" /> Login
            </Link>
          )}
          <Link
            to="/admin/login"
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
            {loggedIn ? (
              <button
                onClick={handleUserLogout}
                className="px-3 py-2.5 rounded-lg text-base font-medium hover:bg-secondary inline-flex items-center gap-2 text-left"
              >
                <LogOut className="h-4 w-4" /> Logout ({name.split(" ")[0]})
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="px-3 py-2.5 rounded-lg text-base font-medium hover:bg-secondary inline-flex items-center gap-2"
              >
                <User className="h-4 w-4" /> User Login
              </Link>
            )}
            <Link
              to="/admin/login"
              onClick={() => setOpen(false)}
              className="px-3 py-2.5 rounded-lg text-base font-medium hover:bg-secondary inline-flex items-center gap-2"
            >
              <UserCog className="h-4 w-4" /> Admin
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
