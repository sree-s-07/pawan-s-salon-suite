import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Phone, Star, Clock, MapPin, Sparkles, Scissors, ShieldCheck, ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero-barber.jpg";
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
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image Cover */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImg} 
          alt="Professional barber" 
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#2C1810]/90 via-[#2C1810]/70 to-[#2C1810]/40" />
        {/* Decorative blur */}
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-[#C9A962]/20 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-24 lg:py-32 relative z-10">
        <div className="max-w-3xl">
          <motion.div initial="hidden" animate="show" variants={fadeUp}>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-1.5 text-xs font-semibold text-white/90">
              <Sparkles className="h-3.5 w-3.5 text-[#C9A962]" /> Jaipur's #1 Home Salon for Men
            </span>
            
            <h1 className="mt-6 text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.05]">
              Salon-grade<br />grooming at <span className="text-[#C9A962]">your home</span>
            </h1>
            
            <p className="mt-6 text-lg text-white/80 max-w-xl leading-relaxed">
              {business.name}. Professional men's haircut, beard styling, facial & more — delivered to your doorstep in Jaipur.
            </p>
            
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`tel:${business.phoneRaw}`}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#C9A962] to-[#E5C88A] px-7 py-4 text-base font-semibold text-[#2C1810] shadow-[var(--shadow-gold)] hover:scale-105 transition-transform"
              >
                <Phone className="h-5 w-5" /> Call {business.phone}
              </a>
              <a
                href="/services"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm px-7 py-4 text-base font-semibold text-white hover:bg-white/20 transition"
              >
                View Services <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            
            <div className="mt-10 flex items-center gap-6 text-sm">
              <div className="flex -space-x-2">
                {[
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
                  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
                  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
                ].map((src, i) => (
                  <img key={i} src={src} alt="" className="h-9 w-9 rounded-full border-2 border-white object-cover" />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-[#C9A962] text-[#C9A962]" />)}
                </div>
                <p className="text-xs text-white/70 mt-0.5">500+ happy clients in Jaipur</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Floating Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="hidden lg:block absolute bottom-24 right-8 glass rounded-2xl p-4 shadow-[var(--shadow-elegant)]"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-[#C9A962]/20 grid place-items-center">
              <ShieldCheck className="h-5 w-5 text-[#C9A962]" />
            </div>
            <div>
              <p className="font-semibold text-sm text-white">100% Hygienic</p>
              <p className="text-xs text-white/70">Sanitized tools</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="hidden lg:block absolute top-32 right-32 glass rounded-2xl p-4 shadow-[var(--shadow-elegant)]"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-[#C9A962] grid place-items-center">
              <Clock className="h-5 w-5 text-[#2C1810]" />
            </div>
            <div>
              <p className="font-semibold text-sm text-white">Same Day</p>
              <p className="text-xs text-white/70">Slots available</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1 h-2 bg-white/60 rounded-full"
          />
        </div>
      </motion.div>
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
  // High-quality barber/haircut images from Unsplash
  const imgs = [
    { src: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800&q=80", title: "Classic Haircut", span: "md:col-span-2 md:row-span-2" },
    { src: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800&q=80", title: "Beard Styling", span: "" },
    { src: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&q=80", title: "Modern Fade", span: "" },
    { src: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=800&q=80", title: "Precision Cut", span: "md:col-span-2" },
    { src: "https://images.unsplash.com/photo-1634449571010-02389ed0f9b0?w=800&q=80", title: "Hot Towel Shave", span: "" },
    { src: "https://images.unsplash.com/photo-1593702295094-aea7d56b6447?w=800&q=80", title: "Salon Interior", span: "md:row-span-2" },
    { src: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&q=80", title: "Beard Trim", span: "" },
    { src: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800&q=80", title: "Hair Styling", span: "" },
  ];

  return (
    <section className="container mx-auto px-4 lg:px-8 py-24">
      <div className="text-center mb-16">
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#C9A962] bg-[#F5E6E0] px-4 py-2 rounded-full">
          Portfolio
        </span>
        <h2 className="mt-6 text-4xl md:text-5xl font-display font-bold text-[#2C1810]">
          Our <span className="text-[#C9A962]">Masterpiece</span> Gallery
        </h2>
        <p className="mt-4 text-lg text-[#8B6F6F] max-w-2xl mx-auto">
          Premium haircuts and grooming services — crafted with precision and style
        </p>
      </div>

      {/* Masonry Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[180px] md:auto-rows-[200px]">
        {imgs.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`relative overflow-hidden rounded-2xl cursor-pointer group ${img.span}`}
          >
            <img src={img.src} alt={img.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#2C1810]/80 via-[#2C1810]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            {/* Title */}
            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <p className="text-white font-medium text-sm md:text-base">{img.title}</p>
            </div>
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
