import { useEffect, useState } from "react";
import { Clock, Gamepad2, Joystick, AlarmClock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Timer {
  id: string;
  client_name: string;
  console: string;
  hours: number;
  ends_at: string;
  finished: boolean;
}

const formatHM = (totalSeconds: number) => {
  const s = Math.max(0, Math.floor(totalSeconds));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
};

const formatHoursLabel = (h: number) =>
  h === 0.5 ? "30 min" : h === 1 ? "1 hora" : Number.isInteger(h) ? `${h} horas` : `${Math.floor(h)}h 30min`;

export const TimerSection = () => {
  const [timers, setTimers] = useState<Timer[]>([]);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const fetchTimers = async () => {
      const { data } = await supabase
        .from("timers")
        .select("id, client_name, console, hours, ends_at, finished")
        .eq("finished", false)
        .order("ends_at", { ascending: true });
      setTimers((data as Timer[]) ?? []);
    };
    fetchTimers();

    const channel = supabase
      .channel("public-timers")
      .on("postgres_changes", { event: "*", schema: "public", table: "timers" }, fetchTimers)
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const activos = timers.filter((t) => new Date(t.ends_at).getTime() > now);

  return (
    <section id="tiempo" className="py-24 relative">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-secondary">
            Tablero en vivo
          </span>
          <h2 className="font-display font-black text-4xl md:text-5xl mt-3">
            ¿Quién está <span className="text-gradient-neon">jugando</span>?
          </h2>
          <p className="text-muted-foreground mt-4">
            Mira el tiempo restante de cada cliente. Para reservar acércate al local o pídelo por WhatsApp.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {activos.length === 0 ? (
            <div className="glass-panel neon-border rounded-3xl p-10 text-center">
              <AlarmClock className="w-10 h-10 text-primary mx-auto mb-3" />
              <h3 className="font-display font-black text-2xl mb-2">Nadie jugando ahora</h3>
              <p className="text-muted-foreground">¡Las consolas están libres! Pasa al local y reserva tu turno.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {activos.map((t) => {
                const left = Math.max(0, Math.floor((new Date(t.ends_at).getTime() - now) / 1000));
                const total = Number(t.hours) * 3600;
                const progress = Math.min(100, ((total - left) / total) * 100);
                const urgent = left < 300;
                const Icon = t.console.toLowerCase().includes("xbox") ? Joystick : Gamepad2;
                return (
                  <div
                    key={t.id}
                    className={`glass-panel rounded-2xl p-5 border transition-smooth ${
                      urgent ? "border-secondary shadow-magenta animate-pulse" : "border-border"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="grid place-items-center w-10 h-10 rounded-xl bg-primary/15 text-primary">
                        <Icon className="w-5 h-5" />
                      </span>
                      <div className="min-w-0">
                        <div className="font-display font-black truncate">{t.client_name}</div>
                        <div className="text-xs text-muted-foreground truncate">{t.console}</div>
                      </div>
                    </div>
                    <div
                      className={`font-display font-black text-3xl tabular-nums mb-3 ${
                        urgent ? "text-secondary" : "text-gradient-neon"
                      }`}
                    >
                      {formatHM(left)}
                    </div>
                    <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-gradient-neon transition-all" style={{ width: `${progress}%` }} />
                    </div>
                    <div className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground mt-3">
                      Reservó {formatHoursLabel(Number(t.hours))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="mt-8 flex items-center justify-center gap-3 text-xs text-muted-foreground">
            <Clock className="w-4 h-4 text-primary shrink-0" />
            <p>El tablero se actualiza en vivo. Solo el dueño y el desarrollador pueden crear o extender tiempos.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
