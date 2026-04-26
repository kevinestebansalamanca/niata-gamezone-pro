import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, User as UserIcon, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const ADMIN_EMAIL = "gamezone@local.app";

const Login = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!authLoading && user) navigate("/admin", { replace: true });
  }, [user, authLoading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Aceptamos "Gamezone" como usuario y mapeamos al email interno
    const u = usuario.trim().toLowerCase();
    if (u !== "gamezone") {
      toast.error("Usuario o contraseña incorrectos");
      setSubmitting(false);
      return;
    }
    const { error } = await supabase.auth.signInWithPassword({
      email: ADMIN_EMAIL,
      password,
    });
    setSubmitting(false);
    if (error) {
      toast.error("Usuario o contraseña incorrectos");
      return;
    }
    toast.success("Bienvenido al panel");
    navigate("/admin", { replace: true });
  };

  return (
    <div className="min-h-screen grid place-items-center bg-background p-4">
      <div className="w-full max-w-md glass-panel neon-border rounded-3xl p-8">
        <div className="text-center mb-8">
          <div className="inline-grid place-items-center w-14 h-14 rounded-2xl bg-gradient-neon shadow-neon mb-4">
            <Lock className="w-6 h-6 text-primary-foreground" />
          </div>
          <h1 className="font-display font-black text-3xl">Acceso privado</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Solo dueño y desarrollador
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground mb-2 block">
              Usuario
            </label>
            <div className="relative">
              <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                autoComplete="username"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-background/60 border border-border focus:border-primary outline-none transition-smooth"
                placeholder="Usuario"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground mb-2 block">
              Contraseña
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-background/60 border border-border focus:border-primary outline-none transition-smooth"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-neon text-primary-foreground font-display font-black uppercase tracking-wider shadow-neon hover:scale-[1.01] active:scale-[0.99] transition-smooth disabled:opacity-60"
          >
            {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Entrar"}
          </button>
        </form>

        <a href="/" className="block text-center text-xs uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground mt-6">
          ← Volver al inicio
        </a>
      </div>
    </div>
  );
};

export default Login;
