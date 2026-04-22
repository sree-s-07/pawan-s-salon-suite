import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Star, Clock, MapPin, Sparkles, Scissors, Heart, ChevronLeft, ChevronRight, X, Instagram, Facebook, Twitter, Mail } from "lucide-react";
import heroImg from "@/assets/hero-barber.jpg";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import { SiteLayout } from "@/components/SiteLayout";
import { Spinner } from "@/components/Spinner";
import { useServices, useTestimonials } from "@/lib/store";
import { business } from "@/data/mockData";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: {},
  show: {},
};

export default function HomePage() {
  return (
    <SiteLayout>
      <Helmet>
        <title>Pawan Sain Salon — Luxury Men's Grooming at Your Doorstep</title>
        <meta name="description" content="Experience premium men's grooming at your doorstep in Jaipur. Haircuts, beard styling, facials & more by Pawan Sain Salon." />
      </Helmet>
      <Hero />
      <Stats />
      <About />
      <ServicesPreview />
      <Gallery />
      <Testimonials />
      <ContactCTA />
      <Footer />
    </SiteLayout>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img src={heroImg} alt="Luxury Salon" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#2C1810]/70 via-[#2C1810]/50 to-[#2C1810]/80" />
      </div>

      {/* Floating Decorative Elements */}
      <motion.div animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute top-20 left-10 w-20 h-20 rounded-full bg-[#C9A962]/20 blur-xl" />
      <motion.div animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-32 right-20 w-32 h-32 rounded-full bg-[#E8B4B8]/20 blur-xl" />
      <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute top-1/3 right-10 w-16 h-16 rounded-full bg-[#C9A962]/30 blur-lg" />

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
        <motion.div initial="hidden" animate="show" variants={staggerContainer}>
          <motion.span variants={fadeInUp} className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-[#C9A962] text-sm font-medium">
            <Sparkles className="h-4 w-4" /> Luxury Salon Experience
          </motion.span>

          <motion.h1 variants={fadeInUp} className="mt-8 text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white leading-tight">
            Feel Beautiful.<br />
            <span className="text-[#C9A962]">Feel Confident.</span>
          </motion.h1>

          <motion.p variants={fadeInUp} className="mt-6 text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            Premium men's grooming at your doorstep in Jaipur. Expert styling, sanitized tools, and a luxury experience — all in the comfort of your home.
          </motion.p>

          <motion.div variants={fadeInUp} className="mt-10 flex flex-wrap justify-center gap-4">
            <a href={`tel:${business.phoneRaw}`} className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#C9A962] to-[#E5C88A] px-8 py-4 text-base font-semibold text-white shadow-[var(--glow-gold)] hover:scale-105 transition-all duration-300">
              <Phone className="h-5 w-5" /> Book Appointment
            </a>
            <a href="#services" className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 bg-white/10 backdrop-blur-sm px-8 py-4 text-base font-semibold text-white hover:bg-white/20 transition-all duration-300">
              Explore Services
            </a>
          </motion.div>

          <motion.div variants={fadeInUp} className="mt-12 flex justify-center gap-8">
            <div className="text-center">
              <p className="text-3xl font-display font-bold text-[#C9A962]">8+</p>
              <p className="text-sm text-white/60">Years Experience</p>
            </div>
            <div className="w-px bg-white/20" />
            <div className="text-center">
              <p className="text-3xl font-display font-bold text-[#C9A962]">500+</p>
              <p className="text-sm text-white/60">Happy Clients</p>
            </div>
            <div className="w-px bg-white/20" />
            <div className="text-center">
              <p className="text-3xl font-display font-bold text-[#C9A962]">5★</p>
              <p className="text-sm text-white/60">Rating</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1">
          <div className="w-1.5 h-3 rounded-full bg-white/60" />
        </div>
      </motion.div>
    </section>
  );
}

function Stats() {
  const stats = [
    { v: "500+", l: "Happy Clients", icon: Heart },
    { v: "5★", l: "Average Rating", icon: Star },
    { v: "8+", l: "Years Experience", icon: Sparkles },
    { v: "24h", l: "Advance Booking", icon: Clock },
  ];
  return (
    <section className="relative z-10 -mt-20 container mx-auto px-4 lg:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.l}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-2xl p-6 text-center shadow-[var(--shadow-elegant)] hover:shadow-[var(--shadow-gold)] transition-all duration-300 hover:-translate-y-1"
          >
            <div className="h-12 w-12 mx-auto rounded-full bg-gradient-to-br from-[#C9A962] to-[#E8B4B8] flex items-center justify-center mb-3">
              <s.icon className="h-5 w-5 text-white" />
            </div>
            <p className="text-3xl font-display font-bold text-[#2C1810]">{s.v}</p>
            <p className="text-sm text-[#8B6F6F]">{s.l}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="container mx-auto px-4 lg:px-8 py-24">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-[var(--shadow-elegant)]">
            <img src={g1} alt="Salon Interior" className="w-full h-full object-cover" />
          </div>
          {/* Floating badge */}
          <div className="absolute -bottom-6 -right-6 glass rounded-2xl p-5 shadow-[var(--shadow-gold)]">
            <p className="text-4xl font-display font-bold text-[#C9A962]">8+</p>
            <p className="text-sm text-[#8B6F6F]">Years of Excellence</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#C9A962] bg-[#F5E6E0] px-4 py-2 rounded-full">
            About Us
          </span>
          <h2 className="mt-6 text-4xl md:text-5xl font-display font-bold text-[#2C1810] leading-tight">
            Where Luxury Meets <span className="text-[#C9A962]">Convenience</span>
          </h2>
          <p className="mt-6 text-lg text-[#8B6F6F] leading-relaxed">
            Welcome to Pawan Sain Salon, where we bring the luxury salon experience directly to your doorstep. 
            With over 8 years of expertise in men's grooming, we understand that true style knows no boundaries.
          </p>
          <p className="mt-4 text-lg text-[#8B6F6F] leading-relaxed">
            Our premium at-home services ensure you receive top-tier grooming without leaving your sanctuary. 
            Every cut, every style, every treatment is delivered with precision and passion.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#C9A962] to-[#E8B4B8] flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="font-medium text-[#2C1810]">Premium Products</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#C9A962] to-[#E8B4B8] flex items-center justify-center">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <span className="font-medium text-[#2C1810]">Sanitized Tools</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ServicesPreview() {
  const { services } = useServices();
  return (
    <section id="services" className="py-24 bg-gradient-to-b from-[#FFFBF7] to-[#F5E6E0]">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#C9A962] bg-white px-4 py-2 rounded-full shadow-[var(--shadow-soft)]">
            Our Services
          </span>
          <h2 className="mt-6 text-4xl md:text-5xl font-display font-bold text-[#2C1810]">
            Premium <span className="text-[#C9A962]">Grooming</span> Menu
          </h2>
          <p className="mt-4 text-lg text-[#8B6F6F] max-w-2xl mx-auto">
            Experience luxury grooming services tailored to your style. Fixed pricing, no surprises.
          </p>
        </div>
        {!services ? <Spinner /> : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.slice(0, 8).map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative bg-white rounded-2xl p-6 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-gold)] hover:-translate-y-2 transition-all duration-500 overflow-hidden"
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#C9A962]/5 to-[#E8B4B8]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-[#C9A962] to-[#E8B4B8] flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {s.icon}
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold text-[#2C1810]">{s.name}</h3>
                  <p className="mt-2 text-sm text-[#8B6F6F]">{s.description}</p>

                  <div className="mt-5 flex items-center gap-2 text-sm text-[#8B6F6F]">
                    <Clock className="h-4 w-4" /> {s.duration}
                  </div>

                  <div className="mt-5 pt-5 border-t border-[#E8DDD8] flex items-center justify-between">
                    <span className="text-2xl font-display font-bold text-[#C9A962]">₹{s.price}</span>
                    <a href={`tel:${business.phoneRaw}`} className="p-2 rounded-full bg-[#F5E6E0] text-[#C9A962] hover:bg-[#C9A962] hover:text-white transition-all duration-300">
                      <Phone className="h-4 w-4" />
                    </a>
                  </div>
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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  // Indian Haircut Gallery - Using available images with Indian hairstyle labels
  const imgs = [
    { src: g1, span: "md:col-span-2 md:row-span-2", title: "Classic Indian Taper Cut" },
    { src: g2, span: "", title: "Modern Pompadour" },
    { src: g3, span: "", title: "Textured Crop" },
    { src: g4, span: "md:col-span-2", title: "Side Part with Fade" },
    { src: g1, span: "", title: "Buzz Cut with Design" },
    { src: g2, span: "md:row-span-2", title: "Long Layered Style" },
    { src: g3, span: "", title: "Undercut Style" },
    { src: g4, span: "", title: "Slick Back" },
  ];

  return (
    <>
      <section className="container mx-auto px-4 lg:px-8 py-24">
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#C9A962] bg-[#F5E6E0] px-4 py-2 rounded-full">
            Indian Styles
          </span>
          <h2 className="mt-6 text-4xl md:text-5xl font-display font-bold text-[#2C1810]">
            Trending <span className="text-[#C9A962]">Indian Haircuts</span>
          </h2>
          <p className="mt-4 text-lg text-[#8B6F6F] max-w-2xl mx-auto">
            From classic desi styles to modern fusion cuts — crafted for Indian hair texture and face shapes
          </p>
        </div>

        {/* Masonry Grid - 8 Indian Haircut Styles */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[180px] md:auto-rows-[200px]">
          {imgs.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setSelectedImage(img.src)}
              className={`relative overflow-hidden rounded-2xl cursor-pointer group ${img.span}`}
            >
              <img src={img.src} alt={img.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#2C1810]/80 via-[#2C1810]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {/* Title */}
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white font-medium text-sm md:text-base">{img.title}</p>
              </div>
              {/* Zoom Icon */}
              <div className="absolute top-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-[#2C1810]/90 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <button className="absolute top-4 right-4 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors">
              <X className="h-6 w-6" />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={selectedImage}
              alt="Gallery"
              className="max-w-full max-h-[90vh] rounded-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Testimonials() {
  const { items } = useTestimonials();
  const [activeIndex, setActiveIndex] = useState(0);

  if (!items) return <Spinner />;

  const next = () => setActiveIndex((prev) => (prev + 1) % items.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + items.length) % items.length);

  return (
    <section className="py-24 bg-gradient-to-b from-[#F5E6E0] to-[#FFFBF7]">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#C9A962] bg-white px-4 py-2 rounded-full shadow-[var(--shadow-soft)]">
            Client Love
          </span>
          <h2 className="mt-6 text-4xl md:text-5xl font-display font-bold text-[#2C1810]">
            What Our <span className="text-[#C9A962]">Clients</span> Say
          </h2>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <motion.div
              animate={{ x: `-${activeIndex * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="flex"
            >
              {items.map((t, i) => (
                <div key={t.id} className="w-full flex-shrink-0 px-4">
                  <div className="glass max-w-3xl mx-auto rounded-3xl p-8 md:p-12 text-center shadow-[var(--shadow-elegant)]">
                    {/* Stars */}
                    <div className="flex justify-center gap-1 mb-6">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star key={j} className={`h-5 w-5 ${j < t.rating ? "fill-[#C9A962] text-[#C9A962]" : "text-[#E8DDD8]"}`} />
                      ))}
                    </div>

                    {/* Quote */}
                    <p className="text-xl md:text-2xl text-[#2C1810] font-display italic leading-relaxed">
                      "{t.text}"
                    </p>

                    {/* Author */}
                    <div className="mt-8 flex items-center justify-center gap-4">
                      <div className="h-14 w-14 rounded-full bg-gradient-to-br from-[#C9A962] to-[#E8B4B8] flex items-center justify-center text-white font-display text-xl">
                        {t.name.charAt(0)}
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-[#2C1810]">{t.name}</p>
                        <p className="text-sm text-[#8B6F6F] flex items-center gap-1">
                          <MapPin className="h-3 w-3" /> {t.area}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation */}
          <button onClick={prev} className="absolute left-0 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white shadow-lg text-[#2C1810] hover:bg-[#C9A962] hover:text-white transition-all duration-300">
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button onClick={next} className="absolute right-0 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white shadow-lg text-[#2C1810] hover:bg-[#C9A962] hover:text-white transition-all duration-300">
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 ${i === activeIndex ? "w-8 bg-[#C9A962]" : "w-2 bg-[#E8DDD8] hover:bg-[#C9A962]/50"}`}
              />
            ))}
          </div>
        </div>
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
        className="relative overflow-hidden rounded-3xl p-10 md:p-16 text-center shadow-[var(--shadow-elegant)] bg-gradient-to-br from-[#2C1810] to-[#3D2A1F]"
      >
        {/* Decorative Elements */}
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[#C9A962]/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#E8B4B8]/10 blur-3xl" />

        <div className="relative z-10">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#C9A962] bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
            Book Now
          </span>
          <h2 className="mt-6 text-4xl md:text-5xl font-display font-bold text-white">
            Ready to Look Your <span className="text-[#C9A962]">Best</span>?
          </h2>
          <p className="mt-4 text-white/60 text-lg max-w-xl mx-auto">
            Call now to book your appointment. Slots fill fast. 24-hour advance booking required.
          </p>
          <a
            href={`tel:${business.phoneRaw}`}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#C9A962] to-[#E5C88A] px-8 py-4 text-base font-bold text-white shadow-[var(--glow-gold)] hover:scale-105 transition-transform"
          >
            <Phone className="h-5 w-5" /> {business.phone}
          </a>
        </div>
      </motion.div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#2C1810] text-[#F8F0EC]">
      {/* Wave Divider */}
      <div className="h-20 bg-[#FFFBF7] rounded-b-[50%]" />

      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#C9A962] to-[#E8B4B8] flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="font-display text-xl font-semibold text-white">Pawan Sain</span>
            </div>
            <p className="text-sm text-[#F8F0EC]/70 leading-relaxed">
              Premium men's grooming at your doorstep. Luxury salon experience in the comfort of your home.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3 mt-6">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="p-3 rounded-full bg-[#3D2A1F] text-[#C9A962] hover:bg-[#C9A962] hover:text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(201,169,98,0.4)]">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold text-[#C9A962] mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {["Home", "About", "Services", "Book Now"].map((link) => (
                <li key={link}>
                  <a href={link === "Home" ? "/" : `/${link.toLowerCase().replace(" ", "-")}`} className="text-sm text-[#F8F0EC]/70 hover:text-[#C9A962] transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-lg font-semibold text-[#C9A962] mb-4">Services</h4>
            <ul className="space-y-3">
              {["Haircut", "Beard Styling", "Facial", "Hair Color"].map((service) => (
                <li key={service}>
                  <span className="text-sm text-[#F8F0EC]/70">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold text-[#C9A962] mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-[#F8F0EC]/70">
                <Phone className="h-4 w-4 text-[#C9A962]" /> {business.phone}
              </li>
              <li className="flex items-center gap-2 text-sm text-[#F8F0EC]/70">
                <MapPin className="h-4 w-4 text-[#C9A962]" /> {business.location}
              </li>
              <li className="flex items-center gap-2 text-sm text-[#F8F0EC]/70">
                <Mail className="h-4 w-4 text-[#C9A962]" /> pawan@salon.com
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-[#3D2A1F] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[#F8F0EC]/50">
            © {new Date().getFullYear()} Pawan Sain Salon. All rights reserved.
          </p>
          <p className="text-sm text-[#F8F0EC]/50 flex items-center gap-1">
            Made with <Heart className="h-3 w-3 text-[#E8B4B8] fill-[#E8B4B8]" /> in Jaipur
          </p>
        </div>
      </div>
    </footer>
  );
}
