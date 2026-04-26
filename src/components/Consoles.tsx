import { Gamepad, Joystick } from "lucide-react";

const consoles = [
  {
    icon: Gamepad,
    name: "PlayStation 3",
    tagline: "Clásico imbatible",
    games: ["FIFA", "GTA V", "Mortal Kombat", "Naruto Storm"],
    color: "primary",
  },
  {
    icon: Joystick,
    name: "Xbox 360",
    tagline: "Acción sin límites",
    games: ["Halo", "Forza", "Gears of War", "Call of Duty"],
    color: "accent",
  },
];

export const Consoles = () => {
  return (
    <section id="consolas" className="py-24 relative">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
            Nuestro arsenal
          </span>
          <h2 className="font-display font-black text-4xl md:text-5xl mt-3">
            Consolas <span className="text-gradient-neon">listas para ti</span>
          </h2>
          <p className="text-muted-foreground mt-4">
            Equipos de última generación, controles impecables y los títulos
            más jugados del momento.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {consoles.map((c) => {
            const Icon = c.icon;
            return (
              <article
                key={c.name}
                className="group relative glass-panel neon-border rounded-2xl p-8 hover:-translate-y-2 hover:shadow-card-hover transition-smooth"
                style={{ boxShadow: "var(--shadow-elevated)" }}
              >
                <div
                  className={`inline-grid place-items-center w-14 h-14 rounded-xl mb-6 bg-${c.color}/10 text-${c.color} group-hover:scale-110 transition-smooth`}
                >
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="font-display font-bold text-2xl">{c.name}</h3>
                <p className="text-sm uppercase tracking-widest text-muted-foreground mt-1">
                  {c.tagline}
                </p>
                <ul className="mt-6 space-y-2">
                  {c.games.map((g) => (
                    <li
                      key={g}
                      className="flex items-center gap-2 text-sm text-foreground/90"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {g}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
