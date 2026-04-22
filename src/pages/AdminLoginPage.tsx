import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, Loader2, ArrowLeft } from "lucide-react";
import { adminAuth } from "@/lib/store";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (adminAuth.isLoggedIn()) navigate("/admin/dashboard");
  }, [navigate]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    setTimeout(() => {
      if (adminAuth.login(u, p)) {
        navigate("/admin/dashboard");
      } else {
        setErr("Invalid credentials");
        setLoading(false);
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "var(--gradient-soft)" }}>
      <Helmet>
        <title>Admin Login — Pawan Sain Salon</title>
      </Helmet>
      <motion.form
        onSubmit={submit}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md rounded-3xl bg-card p-8 shadow-[var(--shadow-elegant)] border border-border"
      >
        <div className="mx-auto h-14 w-14 rounded-full bg-foreground text-background flex items-center justify-center">
          <Lock className="h-6 w-6" />
        </div>
        <h1 className="mt-5 text-2xl font-bold text-center">Admin Login</h1>
        <p className="mt-1 text-sm text-muted-foreground text-center">Pawan Sain Salon dashboard</p>

        <div className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium">Username</label>
            <input
              value={u}
              onChange={(e) => setU(e.target.value)}
              disabled={loading}
              autoComplete="username"
              className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
              placeholder="admin"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              value={p}
              onChange={(e) => setP(e.target.value)}
              disabled={loading}
              autoComplete="current-password"
              className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
              placeholder="admin123"
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
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-foreground py-3 text-sm font-semibold text-background hover:bg-foreground/90 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (<><Loader2 className="h-4 w-4 animate-spin" /> Signing in...</>) : "Sign In"}
          </button>
          <p className="text-xs text-muted-foreground text-center">Hint: admin / admin123</p>
          <Link
            to="/"
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground hover:bg-secondary transition"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
        </div>
      </motion.form>
    </div>
  );
}
