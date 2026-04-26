import { useEffect, useRef, useState } from "react";
import { Clock, Gamepad, Joystick, Play, Plus, AlarmClock, MessageCircle, Mail, Instagram } from "lucide-react";
import { owner, dev, waLink, mailLink } from "@/lib/contact";
import { toast } from "@/hooks/use-toast";

type ConsoleId = "ps3" | "xbox360";

const CONSOLES: { id: ConsoleId; name: string; icon: typeof Gamepad }[] = [
  { id: "ps3", name: "PlayStation 3", icon: Gamepad },
  { id: "xbox360", name: "Xbox 360", icon: Joystick },
];

// 0.5h, 1h, 1.5h, ... 6h
const HOUR_OPTIONS = Array.from({ length: 12 }, (_, i) => (i + 1) * 0.5);

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
  const [playerName, setPlayerName] = useState("");
  const [consoleId, setConsoleId] = useState<ConsoleId>("ps3");
  const [hours, setHours] = useState<number>(1);
  const [endsAt, setEndsAt] = useState<number | null>(null);
  const [remaining, setRemaining] = useState<number>(0);
  const [finished, setFinished] = useState(false);
  const tickRef = useRef<number | null>(null);

  const consoleName = CONSOLES.find((c) => c.id === consoleId)?.name ?? "PS3";

  useEffect(() => {
    if (endsAt === null) return;
    const update = () => {
      const left = Math.max(0, Math.floor((endsAt - Date.now()) / 1000));
      setRemaining(left);
      if (left <= 0) {
        setFinished(true);
        if (tickRef.current) window.clearInterval(tickRef.current);
        tickRef.current = null;
        triggerNotifications();
      }
    };
    update();
    tickRef.current = window.setInterval(update, 1000);
    return () => {
      if (tickRef.current) window.clearInterval(tickRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endsAt]);

  const startTimer = () => {
    if (!playerName.trim()) {
      toast({ title: "Falta tu nombre", description: "Escribe tu nombre para iniciar la reserva." });
      return;
    }
    const ms = hours * 60 * 60 * 1000;
    setFinished(false);
    setEndsAt(Date.now() + ms);

    // Aviso al dueño de que empezó la reserva
    const startMsg =
      `🎮 *Nueva reserva GameZone La Niata*\n` +
      `Cliente: ${playerName}\n` +
      `Consola: ${consoleName}\n` +
      `Tiempo: ${formatHoursLabel(hours)}\n` +
      `Inicio: ahora`;
    window.open(waLink(owner.phone, startMsg), "_blank", "noopener,noreferrer");

    toast({
      title: "⏱️ Tiempo iniciado",
      description: `${formatHoursLabel(hours)} en ${consoleName}. Te avisaremos cuando termine.`,
    });
  };

  const triggerNotifications = () => {
    const msgOwner =
      `⏰ *Tiempo terminado — GameZone La Niata*\n` +
      `Cliente: ${playerName}\n` +
      `Consola: ${consoleName}\n` +
      `Tiempo reservado: ${formatHoursLabel(hours)}\n` +
      `El cliente puede pedir más tiempo.`;

    const msgDev =
      `🚨 Aviso automático GameZone La Niata\n` +
      `Cliente: ${playerName} terminó su tiempo (${formatHoursLabel(hours)}) en ${consoleName}.\n` +
      `Dueño notificado: ${owner.name}.`;

    // 1) WhatsApp al dueño
    window.open(waLink(owner.phone, msgOwner), "_blank", "noopener,noreferrer");
    // 2) WhatsApp al dev (con un pequeño delay para que el navegador no bloquee)
    setTimeout(() => {
      window.open(waLink(dev.phone, msgDev), "_blank", "noopener,noreferrer");
    }, 600);
    // 3) Email al dev
    setTimeout(() => {
      window.location.href = mailLink(
        dev.email,
        "Aviso GameZone La Niata — tiempo terminado",
        `${msgDev}\n\nMensaje generado automáticamente desde la web.`,
      );
    }, 1400);

    toast({
      title: "⏰ Tiempo terminado",
      description: "Avisamos al dueño y al desarrollador. Puedes pedir más tiempo abajo.",
    });
  };

  const requestMoreTime = (extraHours: number) => {
    const msg =
      `⏳ *Pedido de más tiempo — GameZone La Niata*\n` +
      `Cliente: ${playerName || "Anónimo"}\n` +
      `Consola: ${consoleName}\n` +
      `Tiempo extra solicitado: ${formatHoursLabel(extraHours)}\n` +
      `Por favor confirmar disponibilidad.`;
    window.open(waLink(owner.phone, msg), "_blank", "noopener,noreferrer");
    toast({ title: "Solicitud enviada", description: `Pediste ${formatHoursLabel(extraHours)} más al dueño.` });
  };

  const cancel = () => {
    if (tickRef.current) window.clearInterval(tickRef.current);
    tickRef.current = null;
    setEndsAt(null);
    setFinished(false);
    setRemaining(0);
  };

  const running = endsAt !== null && !finished;
  const total = hours * 3600;
  const progress = running ? Math.min(100, ((total - remaining) / total) * 100) : finished ? 100 : 0;

  return (
    <section id="tiempo" className="py-24 relative">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-secondary">
            Reserva tu tiempo
          </span>
          <h2 className="font-display font-black text-4xl md:text-5xl mt-3">
            Pide tu <span className="text-gradient-neon">tiempo de juego</span>
          </h2>
          <p className="text-muted-foreground mt-4">
            Elige consola y horas (desde 30 min). Cuando se termine, avisamos automáticamente al dueño.
          </p>
        </div>

        <div className="max-w-3xl mx-auto glass-panel neon-border rounded-3xl p-6 md:p-10">
          {!running && !finished && (
            <div className="space-y-8">
              {/* Nombre */}
              <div>
                <label className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground mb-2 block">
                  Tu nombre
                </label>
                <input
                  type="text"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value.slice(0, 40))}
                  placeholder="Ej. Juan Pérez"
                  className="w-full px-4 py-3 rounded-xl bg-background/60 border border-border focus:border-primary outline-none transition-smooth font-display"
                />
              </div>

              {/* Consola */}
              <div>
                <label className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground mb-3 block">
                  ¿Qué vas a jugar?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {CONSOLES.map((c) => {
                    const Icon = c.icon;
                    const active = consoleId === c.id;
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setConsoleId(c.id)}
                        className={`flex items-center gap-3 p-4 rounded-2xl border transition-smooth ${
                          active
                            ? "border-primary bg-primary/10 shadow-neon"
                            : "border-border bg-background/40 hover:border-primary/50"
                        }`}
                      >
                        <span className={`grid place-items-center w-10 h-10 rounded-xl ${active ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}>
                          <Icon className="w-5 h-5" />
                        </span>
                        <span className="font-display font-bold">{c.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Horas */}
              <div>
                <label className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground mb-3 block">
                  ¿Cuánto tiempo? <span className="text-primary">(desde 30 min)</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {HOUR_OPTIONS.map((h) => {
                    const active = hours === h;
                    return (
                      <button
                        key={h}
                        type="button"
                        onClick={() => setHours(h)}
                        className={`px-4 py-2 rounded-xl border text-sm font-display font-bold transition-smooth ${
                          active
                            ? "border-secondary bg-secondary/15 text-secondary shadow-magenta"
                            : "border-border bg-background/40 hover:border-secondary/50"
                        }`}
                      >
                        {formatHoursLabel(h)}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                onClick={startTimer}
                className="w-full inline-flex items-center justify-center gap-3 px-7 py-4 rounded-xl bg-gradient-neon text-primary-foreground font-display font-black uppercase tracking-wider shadow-neon hover:scale-[1.02] active:scale-[0.99] transition-smooth"
              >
                <Play className="w-5 h-5" />
                Iniciar mi tiempo
              </button>
            </div>
          )}

          {running && (
            <div className="text-center space-y-6">
              <div className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
                Tiempo en curso · {consoleName}
              </div>
              <div className="font-display font-black text-6xl md:text-7xl text-gradient-neon tabular-nums">
                {formatHM(remaining)}
              </div>
              <div className="text-sm text-muted-foreground">
                {playerName} · {formatHoursLabel(hours)} reservadas
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-gradient-neon transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <button
                  onClick={() => requestMoreTime(0.5)}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl glass-panel border border-secondary/40 hover:border-secondary hover:shadow-magenta font-display font-bold transition-smooth"
                >
                  <Plus className="w-4 h-4" /> Pedir 30 min más
                </button>
                <button
                  onClick={() => requestMoreTime(1)}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl glass-panel border border-secondary/40 hover:border-secondary hover:shadow-magenta font-display font-bold transition-smooth"
                >
                  <Plus className="w-4 h-4" /> Pedir 1 hora más
                </button>
                <button
                  onClick={cancel}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-border hover:border-destructive text-muted-foreground hover:text-destructive font-display font-bold transition-smooth"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}

          {finished && (
            <div className="text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/15 border border-secondary/40">
                <AlarmClock className="w-4 h-4 text-secondary" />
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-secondary">
                  Tiempo terminado
                </span>
              </div>
              <h3 className="font-display font-black text-3xl md:text-4xl">
                ¡Se acabaron tus <span className="text-gradient-neon">{formatHoursLabel(hours)}</span>!
              </h3>
              <p className="text-muted-foreground">
                Ya avisamos a {owner.name} y al desarrollador. ¿Quieres seguir jugando?
              </p>

              <div className="grid sm:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => requestMoreTime(0.5)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-4 rounded-xl bg-gradient-neon text-primary-foreground font-display font-black uppercase tracking-wider shadow-neon hover:scale-[1.02] active:scale-[0.99] transition-smooth"
                >
                  <Plus className="w-5 h-5" /> Pedir 30 min más
                </button>
                <button
                  onClick={() => requestMoreTime(1)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-4 rounded-xl glass-panel neon-border font-display font-bold uppercase tracking-wider hover:text-primary transition-smooth"
                >
                  <Plus className="w-5 h-5" /> Pedir 1 hora más
                </button>
              </div>

              <div className="pt-4 border-t border-border/60 mt-4">
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">
                  Avisos enviados
                </p>
                <div className="flex flex-wrap justify-center gap-2 text-xs">
                  <a href={waLink(owner.phone, "Tiempo terminado en GameZone La Niata")} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[hsl(var(--whatsapp))]/10 border border-[hsl(var(--whatsapp))]/30 text-[hsl(var(--whatsapp))]">
                    <MessageCircle className="w-3.5 h-3.5" /> WhatsApp dueño
                  </a>
                  <a href={owner.instagram} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border"
                    style={{ background: 'linear-gradient(135deg, hsl(var(--instagram-from)/0.12), hsl(var(--instagram-to)/0.12))', borderColor: 'hsl(var(--instagram-via)/0.4)' }}>
                    <Instagram className="w-3.5 h-3.5" /> IG dueño
                  </a>
                  <a href={waLink(dev.phone, "Aviso automático GameZone")} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[hsl(var(--whatsapp))]/10 border border-[hsl(var(--whatsapp))]/30 text-[hsl(var(--whatsapp))]">
                    <MessageCircle className="w-3.5 h-3.5" /> WhatsApp dev
                  </a>
                  <a href={mailLink(dev.email, "Aviso GameZone", "Tiempo terminado")}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[hsl(var(--email-cyan))]/10 border border-[hsl(var(--email-cyan))]/30 text-[hsl(var(--email-cyan))]">
                    <Mail className="w-3.5 h-3.5" /> Email dev
                  </a>
                  <a href={dev.instagram} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border"
                    style={{ background: 'linear-gradient(135deg, hsl(var(--instagram-from)/0.12), hsl(var(--instagram-to)/0.12))', borderColor: 'hsl(var(--instagram-via)/0.4)' }}>
                    <Instagram className="w-3.5 h-3.5" /> IG dev
                  </a>
                </div>
              </div>

              <button
                onClick={cancel}
                className="text-xs uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground mt-2"
              >
                Hacer otra reserva
              </button>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-border/60 flex items-center gap-3 text-xs text-muted-foreground">
            <Clock className="w-4 h-4 text-primary shrink-0" />
            <p>
              Cuando se cumpla el tiempo, se abrirán mensajes pre-escritos hacia el dueño y el desarrollador.
              Mantén esta pestaña abierta durante la sesión.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
