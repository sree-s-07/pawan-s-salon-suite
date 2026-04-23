import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, UserCog, Sparkles } from "lucide-react";
import { business } from "@/data/mockData";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/services", label: "Services" },
    { to: "/booking", label: "Book Now" },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "py-2" : "py-4"
        }`}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <nav className={`flex items-center justify-between transition-all duration-500 ${
            scrolled 
              ? "glass rounded-full px-6 py-3 shadow-[var(--shadow-soft)]" 
              : "bg-white/80 backdrop-blur-md rounded-full px-6 py-3 shadow-[var(--shadow-soft)]"}
          `}>
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group shrink-0">
              <div className="relative">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#C9A962] to-[#E8B4B8] flex items-center justify-center shadow-[var(--shadow-gold)] group-hover:scale-110 transition-transform duration-300">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="hidden sm:block">
                <span className="font-display text-lg font-semibold text-[#2C1810] leading-none">Pawan Sain</span>
                <span className="block text-[10px] uppercase tracking-[0.15em] text-[#8B6F6F] mt-0.5">Luxury Salon</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-2 mx-4">
              {links.map((link) => (
                <Link 
                  key={link.to} 
                  to={link.to} 
                  className={`relative px-5 py-2 text-sm font-medium transition-all duration-300 rounded-full ${
                    isActive(link.to) 
                      ? "text-[#C9A962] bg-[#F5E6E0]" 
                      : "text-[#8B6F6F] hover:text-[#2C1810] hover:bg-[#F5E6E0]/50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-2 shrink-0">
              {/* Admin - Icon Only */}
              <Link 
                to="/admin/login" 
                className="hidden md:flex p-2.5 rounded-full text-[#8B6F6F] hover:text-[#C9A962] hover:bg-[#F5E6E0] transition-all duration-300" 
                title="Admin"
              >
                <UserCog className="h-5 w-5" />
              </Link>

              {/* CTA Button */}
              <a 
                href={`tel:${business.phoneRaw}`} 
                className="hidden md:flex items-center gap-2 rounded-full bg-gradient-to-r from-[#C9A962] to-[#E5C88A] px-5 py-2.5 text-sm font-semibold text-white shadow-[var(--shadow-gold)] hover:shadow-[var(--glow-gold)] hover:scale-105 transition-all duration-300"
              >
                <Phone className="h-4 w-4" /> 
                <span>Book Now</span>
              </a>

              {/* Mobile Menu Button */}
              <button 
                onClick={() => setOpen(!open)} 
                className="lg:hidden p-2.5 rounded-full bg-[#F5E6E0] text-[#2C1810] hover:bg-[#C9A962] hover:text-white transition-colors" 
                aria-label="Toggle menu"
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </nav>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {open && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className="lg:hidden glass mt-4 mx-4 rounded-2xl overflow-hidden">
              <div className="p-6 space-y-2">
                {links.map((link) => (
                  <Link key={link.to} to={link.to} onClick={() => setOpen(false)} className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    isActive(link.to) ? "bg-[#F5E6E0] text-[#C9A962]" : "text-[#8B6F6F] hover:bg-[#F5E6E0]"}`}>
                    {link.label}
                  </Link>
                ))}
                <div className="pt-4 border-t border-[#E8DDD8] space-y-2">
                  <Link to="/admin/login" onClick={() => setOpen(false)} className="block px-4 py-3 rounded-xl text-base font-medium hover:bg-[#F5E6E0]">Admin</Link>
                  <a href={`tel:${business.phoneRaw}`} className="block w-full px-4 py-3 rounded-xl bg-gradient-to-r from-[#C9A962] to-[#E5C88A] text-center text-white font-semibold">
                    Call to Book
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
