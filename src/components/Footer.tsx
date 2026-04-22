import { Phone, MapPin, Clock } from "lucide-react";
import { business } from "@/data/mockData";
import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="bg-sidebar text-sidebar-foreground mt-20">
      <div className="container mx-auto px-4 py-12 grid gap-8 md:grid-cols-3">
        <div>
          <h3 className="text-lg font-bold">{business.name}</h3>
          <p className="mt-2 text-sm text-sidebar-foreground/70">{business.tagline}</p>
        </div>
        <div className="space-y-2 text-sm">
          <p className="flex items-center gap-2"><Phone className="h-4 w-4" /> <a href={`tel:${business.phoneRaw}`} className="hover:text-sidebar-primary">{business.phone}</a></p>
          <p className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {business.location}</p>
          <p className="flex items-center gap-2"><Clock className="h-4 w-4" /> Book 24 hours in advance</p>
        </div>
        <div className="text-sm">
          <p className="font-semibold mb-2">Quick Links</p>
          <div className="flex flex-col gap-1 text-sidebar-foreground/70">
            <Link to="/services" className="hover:text-sidebar-primary">Services</Link>
            <Link to="/booking" className="hover:text-sidebar-primary">Booking</Link>
            <Link to="/admin" className="hover:text-sidebar-primary">Admin</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-sidebar-border py-4 text-center text-xs text-sidebar-foreground/60">
        © {new Date().getFullYear()} {business.name}. All rights reserved.
      </div>
    </footer>
  );
}
