import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Phone, Star, Clock, MapPin, Sparkles, Scissors, ShieldCheck, ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero-barber.jpg";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import { SiteLayout } from "@/components/SiteLayout";
import { Spinner } from "@/components/Spinner";
import { useServices, useTestimonials } from "@/lib/store";
import { business } from "@/data/mockData";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function HomePage() {
  return (
    <SiteLayout>
      <Helmet>
        <title>Pawan Sain Salon Freelancer — Men's Home Salon Jaipur</title>
        <meta name="description" content="Premium men's grooming at your doorstep in Jaipur. Haircut, beard, facial & more. Call +91 96607 53211 to book." />
        <meta property="og:title" content="Pawan Sain Salon Freelancer — Jaipur" />
        <meta property="og:description" content="Premium men's home salon service in Jaipur." />
      </Helmet>
      <Hero />
      <Stats />
      <About />
      <ServicesPreview />
      <Gallery />
      <Testimonials />
      <ContactCTA />
    </SiteLayout>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
      {/* decorative blurs */}
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />

      <div className="container mx-auto px-4 lg:px-8 py-16 md:py-24 grid lg:grid-cols-2 gap-12 items-center relative">
        <motion.div initial="hidden" animate="show" variants={fadeUp}>
          <span className="inline-flex items-center gap-2 rounded-full bg-card border border-border px-4 py-1.5 text-xs font-semibold text-foreground/80 shadow-[var(--shadow-card)]">
            <Sparkles className="h-3.5 w-3.5 text-accent" /> Jaipur's #1 Home Salon for Men
          </span>
          <h1 className="mt-6 text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.05]">
            Salon-grade<br />grooming at <span className="relative inline-block">
              <span className="relative z-10">your home</span>
              <span className="absolute bottom-1 left-0 right-0 h-3 bg-accent/40 -z-0" />
            </span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-lg leading-relaxed">
            {business.name}. Professional men's haircut, beard styling, facial & more — delivered to your doorstep in Jaipur.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`tel:${business.phoneRaw}`}
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-4 text-base font-semibold text-background shadow-[var(--shadow-elegant)] hover:scale-105 transition-transform"
            >
              <Phone className="h-5 w-5" /> Call {business.phone}
            </a>
            <a
              href="/services"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-7 py-4 text-base font-semibold hover:bg-secondary transition"
            >
              View Services <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <div className="mt-10 flex items-center gap-6 text-sm">
            <div className="flex -space-x-2">
              {[g1, g2, g3, g4].map((src, i) => (
                <img key={i} src={src} alt="" className="h-9 w-9 rounded-full border-2 border-background object-cover" />
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-accent text-accent" />)}
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">500+ happy clients in Jaipur</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative"
        >
          <div className="relative rounded-3xl overflow-hidden shadow-[var(--shadow-elegant)] aspect-[4/5] lg:aspect-[5/6]">
            <img src={heroImg} alt="Professional barber styling hair" className="h-full w-full object-cover" width={1600} height={1024} />
          </div>
          {/* floating cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="absolute -bottom-6 -left-6 bg-card rounded-2xl p-4 shadow-[var(--shadow-elegant)] border border-border"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-accent/20 grid place-items-center">
                <ShieldCheck className="h-5 w-5 text-accent-foreground" />
              </div>
              <div>
                <p className="font-semibold text-sm">100% Hygienic</p>
                <p className="text-xs text-muted-foreground">Sanitized tools</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute -top-4 -right-4 bg-card rounded-2xl p-4 shadow-[var(--shadow-elegant)] border border-border hidden sm:block"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-foreground text-background grid place-items-center">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-sm">On-Time</p>
                <p className="text-xs text-muted-foreground">Always punctual</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    { v: "500+", l: "Happy Clients" },
    { v: "5★", l: "Average Rating" },
    { v: "8+", l: "Years Experience" },
    { v: "24h", l: "Advance Booking" },
  ];
  return (
    <section className="container mx-auto px-4 lg:px-8 -mt-2">
      <div className="rounded-3xl bg-card border border-border shadow-[var(--shadow-soft)] grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
        {stats.map((s) => (
          <div key={s.l} className="p-6 text-center">
            <p className="text-3xl md:text-4xl font-bold font-display text-foreground">{s.v}</p>
            <p className="mt-1 text-xs md:text-sm text-muted-foreground">{s.l}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="container mx-auto px-4 lg:px-8 py-24 max-w-4xl">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-accent-foreground bg-accent/30 px-3 py-1 rounded-full">About</span>
        <h2 className="mt-4 text-4xl md:text-5xl font-bold">Crafted by a master stylist</h2>
        <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
          With years of experience as a freelance men's stylist in Jaipur, Pawan brings the salon experience to your home.
          Premium tools, sanitized equipment, and expert craftsmanship — all in the comfort of your own space.
          No waiting, no commute, just exceptional grooming when you want it.
        </p>
      </motion.div>
    </section>
  );
}

function ServicesPreview() {
  const { services } = useServices();
  return (
    <section className="py-24" style={{ background: "var(--gradient-soft)" }}>
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        <div className="text-center mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-accent-foreground bg-accent/30 px-3 py-1 rounded-full">Services</span>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold">Premium grooming menu</h2>
          <p className="mt-4 text-muted-foreground">Fixed pricing. No surprises. Just exceptional results.</p>
        </div>
        {!services ? <Spinner /> : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.slice(0, 8).map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group rounded-2xl bg-card border border-border p-6 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elegant)] hover:-translate-y-1 transition-all"
              >
                <div className="text-4xl">{s.icon}</div>
                <h3 className="mt-4 font-semibold text-lg">{s.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.duration}</p>
                <div className="mt-4 flex items-center justify-between pt-4 border-t border-border">
                  <span className="text-xl font-bold text-foreground">₹{s.price}</span>
                  <Scissors className="h-5 w-5 text-muted-foreground group-hover:text-accent-foreground transition" />
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
    <section className="container mx-auto px-4 lg:px-8 py-24 max-w-6xl">
      <div className="text-center mb-14">
        <span className="text-xs font-bold uppercase tracking-widest text-accent-foreground bg-accent/30 px-3 py-1 rounded-full">Gallery</span>
        <h2 className="mt-4 text-4xl md:text-5xl font-bold">Recent work</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {imgs.map((src, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="overflow-hidden rounded-2xl aspect-square shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elegant)] transition-shadow"
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
    <section className="py-24" style={{ background: "var(--gradient-soft)" }}>
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        <div className="text-center mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-accent-foreground bg-accent/30 px-3 py-1 rounded-full">Reviews</span>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold">What clients say</h2>
        </div>
        {!items ? <Spinner /> : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {items.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl bg-card border border-border p-6 shadow-[var(--shadow-card)]"
              >
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="mt-4 text-sm text-foreground/80 leading-relaxed">"{t.text}"</p>
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3" />{t.area}</p>
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
    <section className="container mx-auto px-4 lg:px-8 py-24 max-w-5xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-3xl p-10 md:p-16 text-center text-background shadow-[var(--shadow-elegant)]"
        style={{ background: "var(--gradient-dark)" }}
      >
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
        <div className="relative">
          <h2 className="text-4xl md:text-5xl font-bold">Ready to look your best?</h2>
          <p className="mt-4 text-background/70 text-lg">Call now to book — slots fill fast. 24-hour advance booking required.</p>
          <a
            href={`tel:${business.phoneRaw}`}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-base font-bold text-accent-foreground hover:scale-105 transition-transform"
          >
            <Phone className="h-5 w-5" /> {business.phone}
          </a>
        </div>
      </motion.div>
    </section>
  );
}
