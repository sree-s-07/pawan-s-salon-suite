import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Phone, Clock, AlertCircle, MapPin } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { business } from "@/data/mockData";

export default function BookingPage() {
  return (
    <SiteLayout>
      <Helmet>
        <title>Booking — Pawan Sain Salon</title>
        <meta name="description" content="Call-based booking only. 24-hour advance notice required for all home salon appointments in Jaipur." />
        <meta property="og:title" content="Book Your Appointment — Pawan Sain Salon" />
        <meta property="og:description" content="Call to book your home salon appointment in Jaipur." />
      </Helmet>
      <section className="container mx-auto px-4 py-20 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold">Book Your Appointment</h1>
          <p className="mt-4 text-muted-foreground text-lg">Simple. Personal. Just one phone call away.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 }}
          className="mt-10 rounded-3xl p-10 text-center text-primary-foreground shadow-[var(--shadow-elegant)]"
          style={{ backgroundImage: "var(--gradient-hero)" }}
        >
          <Phone className="h-12 w-12 mx-auto" />
          <h2 className="mt-4 text-2xl font-bold">Call-Based Booking Only</h2>
          <p className="mt-3 opacity-90">All appointments are confirmed over a quick phone call to ensure availability and your specific requirements.</p>
          <a
            href={`tel:${business.phoneRaw}`}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-lg font-bold text-accent-foreground hover:scale-105 transition"
          >
            <Phone className="h-5 w-5" /> {business.phone}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 rounded-2xl border-2 border-accent/40 bg-accent/10 p-6 flex gap-4"
        >
          <AlertCircle className="h-6 w-6 text-accent-foreground shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-lg">24-Hour Advance Booking Required</h3>
            <p className="mt-1 text-sm text-foreground/80">
              Please call at least 24 hours before your desired appointment time so we can prepare and reach you on schedule.
            </p>
          </div>
        </motion.div>

        <div className="mt-8 grid sm:grid-cols-2 gap-4">
          <div className="rounded-2xl bg-card p-6 shadow-[var(--shadow-soft)] flex items-start gap-3">
            <Clock className="h-6 w-6 text-primary shrink-0" />
            <div>
              <p className="font-semibold">Working Hours</p>
              <p className="text-sm text-muted-foreground mt-1">9:00 AM — 9:00 PM, Daily</p>
            </div>
          </div>
          <div className="rounded-2xl bg-card p-6 shadow-[var(--shadow-soft)] flex items-start gap-3">
            <MapPin className="h-6 w-6 text-primary shrink-0" />
            <div>
              <p className="font-semibold">Service Area</p>
              <p className="text-sm text-muted-foreground mt-1">{business.location}</p>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
