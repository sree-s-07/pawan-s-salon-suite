import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LayoutDashboard, Scissors, MessageSquare, LogOut, Plus, Trash2, Pencil, Phone, MapPin } from "lucide-react";
import { adminAuth, useServices, useTestimonials } from "@/lib/store";
import { business, type Service, type Testimonial } from "@/data/mockData";
import { Spinner } from "@/components/Spinner";

export const Route = createFileRoute("/admin/dashboard")({
  head: () => ({ meta: [{ title: "Admin Dashboard — Pawan Sain Salon" }] }),
  component: Dashboard,
});

type Tab = "overview" | "services" | "testimonials";

function Dashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("overview");

  useEffect(() => {
    if (!adminAuth.isLoggedIn()) navigate({ to: "/admin/login" });
  }, [navigate]);

  const logout = () => {
    adminAuth.logout();
    navigate({ to: "/admin/login" });
  };

  const items: { key: Tab; label: string; icon: typeof LayoutDashboard }[] = [
    { key: "overview", label: "Overview", icon: LayoutDashboard },
    { key: "services", label: "Services", icon: Scissors },
    { key: "testimonials", label: "Testimonials", icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen flex bg-secondary/30">
      <aside className="hidden md:flex w-64 flex-col bg-sidebar text-sidebar-foreground p-5">
        <div className="font-bold text-lg mb-8">
          <span className="text-sidebar-primary">Pawan Sain</span>
          <p className="text-xs font-normal text-sidebar-foreground/60">Admin Panel</p>
        </div>
        <nav className="flex-1 space-y-1">
          {items.map((it) => (
            <button
              key={it.key}
              onClick={() => setTab(it.key)}
              className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                tab === it.key ? "bg-sidebar-primary text-sidebar-primary-foreground" : "hover:bg-sidebar-accent"
              }`}
            >
              <it.icon className="h-4 w-4" /> {it.label}
            </button>
          ))}
        </nav>
        <button onClick={logout} className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-sidebar-accent">
          <LogOut className="h-4 w-4" /> Logout
        </button>
      </aside>

      {/* mobile top bar */}
      <div className="md:hidden fixed top-0 inset-x-0 bg-sidebar text-sidebar-foreground p-3 flex gap-2 overflow-x-auto z-50">
        {items.map((it) => (
          <button
            key={it.key}
            onClick={() => setTab(it.key)}
            className={`shrink-0 rounded-lg px-3 py-2 text-xs font-medium ${tab === it.key ? "bg-sidebar-primary text-sidebar-primary-foreground" : ""}`}
          >
            {it.label}
          </button>
        ))}
        <button onClick={logout} className="shrink-0 rounded-lg px-3 py-2 text-xs font-medium ml-auto"><LogOut className="h-4 w-4" /></button>
      </div>

      <main className="flex-1 p-6 md:p-10 pt-20 md:pt-10">
        <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          {tab === "overview" && <Overview />}
          {tab === "services" && <ManageServices />}
          {tab === "testimonials" && <ManageTestimonials />}
        </motion.div>
      </main>
    </div>
  );
}

function Overview() {
  const { services } = useServices();
  const { items } = useTestimonials();
  return (
    <div>
      <h1 className="text-3xl font-bold">Dashboard Overview</h1>
      <p className="text-muted-foreground mt-1">Manage your business at a glance.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Stat label="Total Services" value={services?.length ?? "..."} />
        <Stat label="Testimonials" value={items?.length ?? "..."} />
        <Stat label="Avg. Price" value={services ? `₹${Math.round(services.reduce((a, s) => a + s.price, 0) / Math.max(services.length, 1))}` : "..."} />
      </div>

      <div className="mt-8 rounded-2xl bg-card p-6 shadow-[var(--shadow-soft)]">
        <h2 className="font-bold text-lg">Business Details</h2>
        <div className="mt-4 space-y-2 text-sm">
          <p><span className="font-semibold">Name:</span> {business.name}</p>
          <p className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> {business.phone}</p>
          <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> {business.location}</p>
          <p><span className="font-semibold">Booking:</span> Call-based, 24h advance</p>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-card p-6 shadow-[var(--shadow-soft)]">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-2 text-3xl font-bold text-primary">{value}</p>
    </div>
  );
}

function ManageServices() {
  const { services, setServices } = useServices();
  const [editing, setEditing] = useState<Service | null>(null);
  const [form, setForm] = useState<Omit<Service, "id">>({ name: "", price: 0, duration: "", description: "", icon: "✂️" });

  if (!services) return <Spinner />;

  const startEdit = (s: Service) => {
    setEditing(s);
    setForm({ name: s.name, price: s.price, duration: s.duration, description: s.description, icon: s.icon });
  };
  const reset = () => {
    setEditing(null);
    setForm({ name: "", price: 0, duration: "", description: "", icon: "✂️" });
  };
  const save = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name) return;
    if (editing) {
      setServices(services.map((s) => (s.id === editing.id ? { ...editing, ...form } : s)));
    } else {
      setServices([...services, { id: `s${Date.now()}`, ...form }]);
    }
    reset();
  };
  const del = (id: string) => setServices(services.filter((s) => s.id !== id));

  return (
    <div>
      <h1 className="text-3xl font-bold">Manage Services</h1>
      <p className="text-muted-foreground mt-1">Add, edit, or remove services on your menu.</p>

      <form onSubmit={save} className="mt-8 rounded-2xl bg-card p-6 shadow-[var(--shadow-soft)] grid gap-4 sm:grid-cols-2">
        <h2 className="sm:col-span-2 font-bold">{editing ? "Edit Service" : "Add New Service"}</h2>
        <input className="rounded-lg border border-input bg-background px-3 py-2 text-sm" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input className="rounded-lg border border-input bg-background px-3 py-2 text-sm" placeholder="Icon (emoji)" value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} />
        <input type="number" className="rounded-lg border border-input bg-background px-3 py-2 text-sm" placeholder="Price (₹)" value={form.price || ""} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} />
        <input className="rounded-lg border border-input bg-background px-3 py-2 text-sm" placeholder="Duration" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} />
        <textarea className="sm:col-span-2 rounded-lg border border-input bg-background px-3 py-2 text-sm" rows={2} placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <div className="sm:col-span-2 flex gap-2">
          <button type="submit" className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90">
            <Plus className="h-4 w-4" /> {editing ? "Update" : "Add Service"}
          </button>
          {editing && <button type="button" onClick={reset} className="rounded-lg border border-input px-4 py-2 text-sm">Cancel</button>}
        </div>
      </form>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <div key={s.id} className="rounded-2xl bg-card p-5 shadow-[var(--shadow-soft)]">
            <div className="flex items-start justify-between">
              <div className="text-3xl">{s.icon}</div>
              <div className="flex gap-2">
                <button onClick={() => startEdit(s)} className="p-2 rounded-lg hover:bg-secondary"><Pencil className="h-4 w-4" /></button>
                <button onClick={() => del(s.id)} className="p-2 rounded-lg hover:bg-destructive/10 text-destructive"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
            <h3 className="mt-2 font-semibold">{s.name}</h3>
            <p className="text-xs text-muted-foreground">{s.duration}</p>
            <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{s.description}</p>
            <p className="mt-3 text-lg font-bold text-primary">₹{s.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ManageTestimonials() {
  const { items, setItems } = useTestimonials();
  const [form, setForm] = useState<Omit<Testimonial, "id">>({ name: "", area: "", rating: 5, text: "" });

  if (!items) return <Spinner />;

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.text) return;
    setItems([...items, { id: `t${Date.now()}`, ...form }]);
    setForm({ name: "", area: "", rating: 5, text: "" });
  };
  const del = (id: string) => setItems(items.filter((t) => t.id !== id));

  return (
    <div>
      <h1 className="text-3xl font-bold">Manage Testimonials</h1>
      <p className="text-muted-foreground mt-1">Add new client reviews or remove old ones.</p>

      <form onSubmit={add} className="mt-8 rounded-2xl bg-card p-6 shadow-[var(--shadow-soft)] grid gap-4 sm:grid-cols-2">
        <h2 className="sm:col-span-2 font-bold">Add Testimonial</h2>
        <input className="rounded-lg border border-input bg-background px-3 py-2 text-sm" placeholder="Client Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input className="rounded-lg border border-input bg-background px-3 py-2 text-sm" placeholder="Area (e.g. Malviya Nagar)" value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })} />
        <select className="rounded-lg border border-input bg-background px-3 py-2 text-sm" value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}>
          {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n} Stars</option>)}
        </select>
        <div />
        <textarea className="sm:col-span-2 rounded-lg border border-input bg-background px-3 py-2 text-sm" rows={3} placeholder="Review text" value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} />
        <button type="submit" className="sm:col-span-2 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90">
          <Plus className="h-4 w-4" /> Add Testimonial
        </button>
      </form>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {items.map((t) => (
          <div key={t.id} className="rounded-2xl bg-card p-5 shadow-[var(--shadow-soft)]">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.area} · {t.rating}★</p>
              </div>
              <button onClick={() => del(t.id)} className="p-2 rounded-lg hover:bg-destructive/10 text-destructive"><Trash2 className="h-4 w-4" /></button>
            </div>
            <p className="mt-3 text-sm text-foreground/80">"{t.text}"</p>
          </div>
        ))}
      </div>
    </div>
  );
}
