import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Spinner } from "@/components/Spinner";
import { useServices } from "@/lib/store";
import { business } from "@/data/mockData";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services & Pricing — Pawan Sain Salon" },
      { name: "description", content: "Haircut, beard trim, facial, hair color and more. Premium men's grooming at home in Jaipur." },
      { property: "og:title", content: "Services & Pricing — Pawan Sain Salon" },
      { property: "og:description", content: "Browse our full menu of men's home salon services." },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const { services } = useServices();
  return (
    <SiteLayout>
      <section className="container mx-auto px-4 py-16 max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold">Services & Pricing</h1>
          <p className="mt-4 text-muted-foreground">Transparent pricing. Premium quality. Delivered to your door.</p>
        </motion.div>

        {!services ? <Spinner /> : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group relative overflow-hidden rounded-2xl bg-card p-7 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-elegant)] hover:-translate-y-1 transition-all"
              >
                <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-accent/10 group-hover:bg-accent/20 transition" />
                <div className="relative">
                  <div className="text-5xl">{s.icon}</div>
                  <h3 className="mt-4 text-xl font-bold">{s.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>
                  <div className="mt-5 flex items-end justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">Starting at</p>
                      <p className="text-2xl font-bold text-primary">₹{s.price}</p>
                    </div>
                    <span className="text-xs px-3 py-1 rounded-full bg-secondary text-secondary-foreground">{s.duration}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="mt-16 text-center">
          <a
            href={`tel:${business.phoneRaw}`}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-bold text-primary-foreground shadow-[var(--shadow-elegant)] hover:scale-105 transition"
          >
            <Phone className="h-5 w-5" /> Book by Calling {business.phone}
          </a>
        </div>
      </section>
    </SiteLayout>
  );
}
