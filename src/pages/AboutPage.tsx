import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Scissors, Sparkles, ShieldCheck } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { business } from "@/data/mockData";

export default function AboutPage() {
  return (
    <SiteLayout>
      <Helmet>
        <title>About Us — Pawan Sain Salon</title>
        <meta name="description" content="Learn more about Pawan Sain Salon Freelancer - Premium men's grooming services at your doorstep in Jaipur." />
      </Helmet>

      <section className="container mx-auto px-4 py-16 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold">About Us</h1>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Premium men's grooming services delivered to your doorstep in Jaipur
          </p>
        </motion.div>

        {/* Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-2 gap-12 items-center mb-16"
        >
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Story</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Pawan Sain Salon Freelancer was founded with a simple mission: to bring professional salon experiences to your home. With over 8 years of experience in men's grooming, we understand that convenience should never compromise quality.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We specialize in haircuts, beard styling, facials, and complete grooming packages—all performed with premium tools and strict hygiene protocols at your preferred location.
            </p>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-accent/20 to-primary/10 p-8">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4">
                <Scissors className="h-8 w-8 mx-auto text-primary mb-2" />
                <p className="font-semibold">Expert Styling</p>
              </div>
              <div className="text-center p-4">
                <Sparkles className="h-8 w-8 mx-auto text-accent mb-2" />
                <p className="font-semibold">Premium Products</p>
              </div>
              <div className="text-center p-4">
                <ShieldCheck className="h-8 w-8 mx-auto text-primary mb-2" />
                <p className="font-semibold">100% Hygienic</p>
              </div>
              <div className="text-center p-4">
                <Clock className="h-8 w-8 mx-auto text-accent mb-2" />
                <p className="font-semibold">On-Time Service</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Location Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Find Us</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-sm text-muted-foreground">{business.location}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Contact</p>
                  <p className="text-sm text-muted-foreground">{business.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Working Hours</p>
                  <p className="text-sm text-muted-foreground">9:00 AM — 9:00 PM, Daily</p>
                  <p className="text-xs text-muted-foreground mt-1">24-hour advance booking required</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden border border-border h-64 md:h-auto">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3556.8306090884!2d75.7905578!3d26.8852108!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396dcb585fa5c1f1%3A0x68d57dde28a24dfd!2sPawan%20sain%20salon%20freelancer!5e0!3m2!1sen!2sin!4v1713763200000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "250px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Pawan Sain Salon Location"
              />
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center rounded-2xl bg-card border border-border p-8 md:p-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Experience Premium Grooming?</h2>
          <p className="text-muted-foreground mb-6">Book your appointment today and enjoy salon-quality service at your doorstep.</p>
          <a
            href={`tel:${business.phoneRaw}`}
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-4 text-base font-semibold text-background hover:bg-foreground/90 transition"
          >
            <Phone className="h-5 w-5" /> Call Now to Book
          </a>
        </motion.div>
      </section>
    </SiteLayout>
  );
}
