import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User, Loader2 } from "lucide-react";
import { userAuth, emitAuthChange } from "@/lib/store";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "User Login — Pawan Sain Salon" }] }),
  component: UserLogin,
});

function UserLogin() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userAuth.isLoggedIn()) navigate({ to: "/" });
  }, [navigate]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    if (!name.trim() || phone.trim().length < 10) {
      setErr("Please enter your name and a valid 10-digit phone number");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      userAuth.login(name.trim());
      emitAuthChange();
      navigate({ to: "/" });
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "var(--gradient-soft)" }}>
      <motion.form
        onSubmit={submit}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md rounded-3xl bg-card p-8 shadow-[var(--shadow-elegant)] border border-border"
      >
        <div className="mx-auto h-14 w-14 rounded-full bg-accent text-accent-foreground flex items-center justify-center">
          <User className="h-6 w-6" />
        </div>
        <h1 className="mt-5 text-2xl font-bold text-center">Welcome back</h1>
        <p className="mt-1 text-sm text-muted-foreground text-center">Quick sign-in to book faster next time</p>

        <div className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium">Your Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
              placeholder="Rahul Sharma"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
              disabled={loading}
              className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
              placeholder="9876543210"
            />
          </div>
          {err && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-destructive bg-destructive/10 rounded-lg px-3 py-2"
            >
              {err}
            </motion.p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-foreground py-3 text-sm font-semibold text-background hover:bg-foreground/90 transition disabled:opacity-60"
          >
            {loading ? (<><Loader2 className="h-4 w-4 animate-spin" /> Signing in...</>) : "Continue"}
          </button>
          <p className="text-xs text-muted-foreground text-center">
            Are you the admin? <Link to="/admin/login" className="font-medium text-foreground hover:underline">Login here</Link>
          </p>
        </div>
      </motion.form>
    </div>
  );
}
