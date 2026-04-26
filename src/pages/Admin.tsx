import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Gamepad2, Joystick, LogOut, Plus, Trash2, AlarmClock, Bell, BellOff, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

type ConsoleId = "PlayStation 3" | "Xbox 360";

interface Timer {
  id: string;
  client_name: string;
  console: string;
  hours: number;
  started_at: string;
  ends_at: string;
  finished: boolean;
  notified: boolean;
}

const HOUR_OPTIONS = Array.from({ length: 12 }, (_, i) => (i + 1) * 0.5);
const formatHoursLabel = (h: number) =>
  h === 0.5 ? "30 min" : h === 1 ? "1 hora" : Number.isInteger(h) ? `${h} horas` : `${Math.floor(h)}h 30min`;

const formatHM = (totalSeconds: number) => {
  const s = Math.max(0, Math.floor(totalSeconds));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
};

const Admin = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading, signOut } = useAuth();
  const [timers, setTimers] = useState<Timer[]>([]);
  const [now, setNow] = useState(Date.now());
  const [name, setName] = useState("");
  const [consoleId, setConsoleId] = useState<ConsoleId>("PlayStation 3");
  const [hours, setHours] = useState(1);
  const [notifGranted, setNotifGranted] = useState(typeof Notification !== "undefined" && Notification.permission === "granted");
  const alertedRef = useRef<Set<string>>(new Set());
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Auth guard
  useEffect(() => {
    if (!authLoading && !user) navigate("/login", { replace: true });
  }, [user, authLoading, navigate]);

  // Cargar timers
  const fetchTimers = async () => {
    const { data, error } = await supabase
      .from("timers")
      .select("*")
      .order("ends_at", { ascending: true });
    if (error) {
      toast.error("Error cargando temporizadores");
      return;
    }
    setTimers(data as Timer[]);
  };

  useEffect(() => {
    if (!user) return;
    fetchTimers();

    const channel = supabase
      .channel("timers-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "timers" }, () => fetchTimers())
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  // Reloj
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  // Detectar expirados → marcar y notificar
  useEffect(() => {
    timers.forEach(async (t) => {
      const left = new Date(t.ends_at).getTime() - now;
      if (left <= 0 && !t.finished && !alertedRef.current.has(t.id)) {
        alertedRef.current.add(t.id);
        // Marcar como terminado en BD
        await supabase.from("timers").update({ finished: true, notified: true }).eq("id", t.id);
        // Notificación navegador
        if (typeof Notification !== "undefined" && Notification.permission === "granted") {
          new Notification("⏰ Tiempo terminado — GameZone", {
            body: `${t.client_name} terminó ${formatHoursLabel(t.hours)} en ${t.console}`,
            tag: t.id,
            requireInteraction: true,
          });
        }
        // Sonido
        try { audioRef.current?.play(); } catch { /* ignore */ }
        toast.error(`⏰ ${t.client_name} terminó su tiempo en ${t.console}`, { duration: 10000 });
      }
    });
  }, [now, timers]);

  const requestNotif = async () => {
    if (typeof Notification === "undefined") return;
    const p = await Notification.requestPermission();
    setNotifGranted(p === "granted");
    if (p === "granted") toast.success("Notificaciones activadas");
  };

  const createTimer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Escribe el nombre del cliente");
      return;
    }
    const startedAt = new Date();
    const endsAt = new Date(startedAt.getTime() + hours * 60 * 60 * 1000);
    const { error } = await supabase.from("timers").insert({
      client_name: name.trim(),
      console: consoleId,
      hours,
      started_at: startedAt.toISOString(),
      ends_at: endsAt.toISOString(),
    });
    if (error) {
      toast.error("Error creando temporizador");
      return;
    }
    toast.success(`Temporizador creado: ${name} - ${formatHoursLabel(hours)}`);
    setName("");
  };

  const addTime = async (t: Timer, extraHours: number) => {
    const newEnds = new Date(Math.max(new Date(t.ends_at).getTime(), Date.now()) + extraHours * 60 * 60 * 1000);
    const { error } = await supabase
      .from("timers")
      .update({
        ends_at: newEnds.toISOString(),
        hours: Number(t.hours) + extraHours,
        finished: false,
        notified: false,
      })
      .eq("id", t.id);
    if (error) {
      toast.error("Error añadiendo tiempo");
      return;
    }
    alertedRef.current.delete(t.id);
    toast.success(`+${formatHoursLabel(extraHours)} a ${t.client_name}`);
  };

  const removeTimer = async (t: Timer) => {
    const { error } = await supabase.from("timers").delete().eq("id", t.id);
    if (error) {
      toast.error("Error eliminando");
      return;
    }
    alertedRef.current.delete(t.id);
    toast.success("Eliminado");
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/login", { replace: true });
  };

  const sorted = useMemo(() => {
    return [...timers].sort((a, b) => {
      const aLeft = new Date(a.ends_at).getTime() - now;
      const bLeft = new Date(b.ends_at).getTime() - now;
      return aLeft - bLeft;
    });
  }, [timers, now]);

  const activos = sorted.filter((t) => !t.finished && new Date(t.ends_at).getTime() > now);
  const terminados = sorted.filter((t) => t.finished || new Date(t.ends_at).getTime() <= now);

  if (authLoading || !user) {
    return <div className="min-h-screen grid place-items-center text-muted-foreground">Cargando...</div>;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Audio para alarma (beep simple en base64) */}
      <audio ref={audioRef} preload="auto" src="data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=" />

      <header className="border-b border-border/60 bg-background/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="container mx-auto flex items-center justify-between py-4">
          <a href="/" className="flex items-center gap-2">
            <span className="grid place-items-center w-10 h-10 rounded-xl bg-gradient-neon shadow-neon">
              <Gamepad2 className="w-5 h-5 text-primary-foreground" />
            </span>
            <div>
              <div className="font-display font-black text-lg leading-none">
                GAME<span className="text-gradient-neon">ZONE</span>
              </div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mt-1">Panel privado</div>
            </div>
          </a>
          <div className="flex items-center gap-2">
            <button
              onClick={requestNotif}
              className={`hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-bold uppercase tracking-wider transition-smooth ${
                notifGranted ? "border-primary/40 text-primary" : "border-border text-muted-foreground hover:border-primary/40 hover:text-primary"
              }`}
            >
              {notifGranted ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
              {notifGranted ? "Alertas ON" : "Activar alertas"}
            </button>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-border hover:border-destructive hover:text-destructive text-xs font-bold uppercase tracking-wider transition-smooth"
            >
              <LogOut className="w-4 h-4" /> Salir
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8 space-y-8">
        {/* Crear nuevo timer */}
        <section className="glass-panel neon-border rounded-3xl p-6 md:p-8">
          <h2 className="font-display font-black text-2xl mb-1">Nuevo cliente</h2>
          <p className="text-sm text-muted-foreground mb-6">Crea un temporizador para un cliente del local.</p>
          <form onSubmit={createTimer} className="grid md:grid-cols-[1fr,auto,auto,auto] gap-3 items-end">
            <div>
              <label className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground mb-2 block">
                Nombre del cliente
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value.slice(0, 40))}
                placeholder="Ej. Jhonier"
                className="w-full px-4 py-3 rounded-xl bg-background/60 border border-border focus:border-primary outline-none transition-smooth"
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground mb-2 block">
                Consola
              </label>
              <div className="flex gap-2">
                {(["PlayStation 3", "Xbox 360"] as ConsoleId[]).map((c) => {
                  const active = consoleId === c;
                  const Icon = c === "PlayStation 3" ? Gamepad2 : Joystick;
                  return (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setConsoleId(c)}
                      className={`flex items-center gap-2 px-3 py-3 rounded-xl border text-sm font-bold transition-smooth ${
                        active ? "border-primary bg-primary/10 shadow-neon" : "border-border bg-background/40"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="hidden sm:inline">{c}</span>
                    </button>
                  );
                })}
              </div>
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground mb-2 block">
                Horas
              </label>
              <select
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
                className="px-4 py-3 rounded-xl bg-background/60 border border-border focus:border-primary outline-none transition-smooth"
              >
                {HOUR_OPTIONS.map((h) => (
                  <option key={h} value={h}>{formatHoursLabel(h)}</option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-neon text-primary-foreground font-display font-black uppercase tracking-wider shadow-neon hover:scale-[1.02] transition-smooth"
            >
              <Plus className="w-5 h-5" /> Iniciar
            </button>
          </form>
        </section>

        {/* Activos */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-black text-2xl">
              Jugando ahora <span className="text-primary">({activos.length})</span>
            </h2>
            <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-2">
              <Clock className="w-3.5 h-3.5" /> {new Date(now).toLocaleTimeString()}
            </div>
          </div>
          {activos.length === 0 && (
            <div className="rounded-2xl border border-dashed border-border/60 p-8 text-center text-muted-foreground">
              Nadie jugando. Crea un nuevo temporizador arriba.
            </div>
          )}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {activos.map((t) => {
              const left = Math.max(0, Math.floor((new Date(t.ends_at).getTime() - now) / 1000));
              const total = Number(t.hours) * 3600;
              const progress = Math.min(100, ((total - left) / total) * 100);
              const urgent = left < 300;
              return (
                <div key={t.id} className={`glass-panel rounded-2xl p-5 border transition-smooth ${urgent ? "border-secondary shadow-magenta animate-pulse" : "border-border"}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="font-display font-black text-lg">{t.client_name}</div>
                      <div className="text-xs text-muted-foreground">{t.console} · {formatHoursLabel(Number(t.hours))}</div>
                    </div>
                    <button onClick={() => removeTimer(t)} className="text-muted-foreground hover:text-destructive p-1">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className={`font-display font-black text-3xl tabular-nums mb-3 ${urgent ? "text-secondary" : "text-gradient-neon"}`}>
                    {formatHM(left)}
                  </div>
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden mb-3">
                    <div className="h-full bg-gradient-neon transition-all" style={{ width: `${progress}%` }} />
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => addTime(t, 0.5)} className="flex-1 px-3 py-2 rounded-lg border border-border hover:border-primary text-xs font-bold uppercase tracking-wider transition-smooth">
                      +30 min
                    </button>
                    <button onClick={() => addTime(t, 1)} className="flex-1 px-3 py-2 rounded-lg border border-border hover:border-primary text-xs font-bold uppercase tracking-wider transition-smooth">
                      +1 hora
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Terminados */}
        {terminados.length > 0 && (
          <section>
            <h2 className="font-display font-black text-2xl mb-4 flex items-center gap-2">
              <AlarmClock className="w-5 h-5 text-secondary" />
              Tiempo terminado <span className="text-secondary">({terminados.length})</span>
            </h2>
            <div className="space-y-2">
              {terminados.slice(0, 10).map((t) => (
                <div key={t.id} className="flex items-center justify-between gap-3 p-4 rounded-xl border border-secondary/30 bg-secondary/5">
                  <div className="min-w-0">
                    <div className="font-display font-bold truncate">{t.client_name}</div>
                    <div className="text-xs text-muted-foreground">
                      {t.console} · {formatHoursLabel(Number(t.hours))} · terminó {new Date(t.ends_at).toLocaleTimeString()}
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button onClick={() => addTime(t, 0.5)} className="px-3 py-2 rounded-lg bg-gradient-neon text-primary-foreground text-xs font-bold uppercase tracking-wider shadow-neon">
                      +30 min
                    </button>
                    <button onClick={() => addTime(t, 1)} className="px-3 py-2 rounded-lg border border-border hover:border-primary text-xs font-bold uppercase tracking-wider">
                      +1 hora
                    </button>
                    <button onClick={() => removeTimer(t)} className="px-3 py-2 rounded-lg border border-border hover:border-destructive text-xs font-bold uppercase tracking-wider">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default Admin;
