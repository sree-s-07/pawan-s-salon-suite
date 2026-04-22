import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Phone, Star, Clock, MapPin, Sparkles, Scissors, ShieldCheck } from "lucide-react";
import heroImg from "@/assets/hero-barber.jpg";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import { SiteLayout } from "@/components/SiteLayout";
import { Spinner } from "@/components/Spinner";
import { useServices, useTestimonials } from "@/lib/store";
import { business } from "@/data/mockData";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pawan Sain Salon Freelancer — Men's Home Salon Jaipur" },
      { name: "description", content: "Premium men's grooming at your doorstep in Jaipur. Haircut, beard, facial & more. Call +91 96607 53211 to book." },
      { property: "og:title", content: "Pawan Sain Salon Freelancer — Jaipur" },
      { property: "og:description", content: "Premium men's home salon service in Jaipur." },
    ],
  }),
  component: HomePage,
});

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

function HomePage() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src={heroImg} alt="Barber" className="h-full w-full object-cover" width={1600} height={1024} />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
        </div>
        <div className="container mx-auto px-4 py-24 md:py-36 max-w-6xl">
          <motion.div initial="hidden" animate="show" variants={fadeUp} className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-accent/30 px-4 py-1 text-xs font-semibold text-accent-foreground">
              <Sparkles className="h-3 w-3" /> Jaipur's Premium Home Salon
            </span>
            <h1 className="mt-5 text-4xl md:text-6xl font-bold tracking-tight text-foreground leading-tight">
              {business.name}
            </h1>
            <p className="mt-5 text-lg text-muted-foreground">
              Salon-grade haircuts, beard styling & grooming — delivered to your home in Jaipur. Hygienic, professional, on time.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={`tel:${business.phoneRaw}`}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground shadow-[var(--shadow-elegant)] hover:scale-105 transition-transform"
              >
                <Phone className="h-5 w-5" /> Call Now {business.phone}
              </a>
              <a href="/services" className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-7 py-3.5 text-base font-semibold hover:bg-secondary transition">
                View Services
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /> 24h advance booking</span>
              <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> All Jaipur</span>
              <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> 100% Hygienic</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="container mx-auto px-4 py-20 max-w-5xl">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold">About Pawan Sain</h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            With years of experience as a freelance men's stylist in Jaipur, Pawan brings the salon experience to your home.
            Premium tools, sanitized equipment and expert craftsmanship — all in the comfort of your own space.
            No waiting, no commute, just exceptional grooming when you want it.
          </p>
        </motion.div>
      </section>

      <ServicesPreview />
      <Gallery />
      <Testimonials />
      <ContactCTA />
    </SiteLayout>
  );
}

function ServicesPreview() {
  const { services } = useServices();
  return (
    <section className="bg-secondary/40 py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Our Services</h2>
          <p className="mt-3 text-muted-foreground">Premium grooming, fixed pricing, no surprises.</p>
        </div>
        {!services ? <Spinner /> : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.slice(0, 8).map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group rounded-2xl bg-card p-6 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-elegant)] hover:-translate-y-1 transition-all"
              >
                <div className="text-4xl">{s.icon}</div>
                <h3 className="mt-4 font-semibold text-lg">{s.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.duration}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xl font-bold text-primary">₹{s.price}</span>
                  <Scissors className="h-5 w-5 text-muted-foreground group-hover:text-primary transition" />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function Gallery() {
  const imgs = [g1, g2, g3, g4];
  return (
    <section className="container mx-auto px-4 py-20 max-w-6xl">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold">Gallery</h2>
        <p className="mt-3 text-muted-foreground">Recent work from satisfied clients.</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {imgs.map((src, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="overflow-hidden rounded-2xl aspect-square shadow-[var(--shadow-soft)]"
          >
            <img src={src} alt={`Work ${i + 1}`} loading="lazy" width={800} height={800} className="h-full w-full object-cover hover:scale-110 transition-transform duration-500" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  const { items } = useTestimonials();
  return (
    <section className="bg-secondary/40 py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">What Clients Say</h2>
        </div>
        {!items ? <Spinner /> : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {items.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl bg-card p-6 shadow-[var(--shadow-soft)]"
              >
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="mt-4 text-sm text-foreground/80 leading-relaxed">"{t.text}"</p>
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.area}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ContactCTA() {
  return (
    <section className="container mx-auto px-4 py-20 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="rounded-3xl p-10 md:p-14 text-center text-primary-foreground shadow-[var(--shadow-elegant)]"
        style={{ backgroundImage: "var(--gradient-hero)" }}
      >
        <h2 className="text-3xl md:text-4xl font-bold">Ready to Look Your Best?</h2>
        <p className="mt-4 opacity-90">Call now to book — slots fill fast. 24-hour advance booking required.</p>
        <a
          href={`tel:${business.phoneRaw}`}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-base font-bold text-accent-foreground hover:scale-105 transition-transform"
        >
          <Phone className="h-5 w-5" /> {business.phone}
        </a>
      </motion.div>
    </section>
  );
}
