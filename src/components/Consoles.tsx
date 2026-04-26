import { Gamepad, Joystick } from "lucide-react";
import psImage from "@/assets/console-playstation.webp";
import xboxImage from "@/assets/console-xbox.webp";

const consoles = [
  {
    icon: Gamepad,
    name: "PlayStation 3",
    tagline: "Clásico imbatible",
    games: ["FIFA", "GTA V", "Mortal Kombat", "Naruto Storm"],
    color: "primary",
    image: psImage,
    accent: "from-primary/80 to-primary/0",
    glow: "shadow-neon",
    border: "border-primary/40 hover:border-primary",
  },
  {
    icon: Joystick,
    name: "Xbox 360",
    tagline: "Acción sin límites",
    games: ["Halo", "Forza", "Gears of War", "Call of Duty"],
    color: "accent",
    image: xboxImage,
    accent: "from-accent/80 to-accent/0",
    glow: "shadow-[0_0_40px_hsl(var(--accent)/0.4)]",
    border: "border-accent/40 hover:border-accent",
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
            PlayStation 3 y Xbox 360 — los íconos que nunca pasan de moda.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {consoles.map((c) => {
            const Icon = c.icon;
            return (
              <article
                key={c.name}
                className={`group relative rounded-3xl overflow-hidden border-2 ${c.border} hover:-translate-y-2 transition-smooth glass-panel`}
                style={{ boxShadow: "var(--shadow-elevated)" }}
              >
                {/* Hero image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={c.image}
                    alt={`${c.name} — héroes y juegos`}
                    width={1200}
                    height={750}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Bottom fade */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                  {/* Color accent overlay */}
                  <div className={`absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t ${c.accent} opacity-30 mix-blend-overlay`} />

                  {/* Floating icon badge */}
                  <div
                    className={`absolute top-5 left-5 grid place-items-center w-12 h-12 rounded-xl bg-${c.color}/15 backdrop-blur-md border border-${c.color}/40 text-${c.color} ${c.glow} group-hover:scale-110 transition-smooth`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                </div>

                {/* Content */}
                <div className="relative p-8 -mt-2">
                  <h3 className="font-display font-black text-2xl md:text-3xl">{c.name}</h3>
                  <p className={`text-xs uppercase tracking-[0.3em] text-${c.color} mt-1 font-bold`}>
                    {c.tagline}
                  </p>
                  <ul className="mt-6 grid grid-cols-2 gap-2">
                    {c.games.map((g) => (
                      <li
                        key={g}
                        className="flex items-center gap-2 text-sm text-foreground/90"
                      >
                        <span className={`w-1.5 h-1.5 rounded-full bg-${c.color}`} />
                        {g}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
