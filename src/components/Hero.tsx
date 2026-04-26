import { ArrowRight, Sparkles, Zap } from "lucide-react";
import heroImg from "@/assets/hero-gamezone.jpg";
import { owner, waLink } from "@/lib/contact";

export const Hero = () => {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center pt-24 overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Sala gamer premium GameZone La Niata"
          width={1920}
          height={1080}
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/70 to-background" />
      </div>

      {/* Decorative grid */}
      <div className="absolute inset-0 grid-bg pointer-events-none" />

      {/* Floating orbs */}
      <div className="absolute top-1/3 left-10 w-72 h-72 rounded-full bg-primary/20 blur-3xl animate-float-slow" />
      <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-secondary/20 blur-3xl animate-float-slow" style={{ animationDelay: '2s' }} />

      <div className="container mx-auto relative z-10 grid lg:grid-cols-2 gap-12 items-center py-16">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Yopal · Casanare · Vereda La Niata
            </span>
          </div>

          <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl leading-[0.95]">
            <span className="block">DONDE</span>
            <span className="block text-gradient-neon">LOS GAMERS</span>
            <span className="block">VIVEN A FONDO</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
            <span className="font-bold text-foreground">GameZone La Niata</span> es la sala gamer premium del campo casanareño. PlayStation, Xbox, torneos y la mejor energía. Reserva tu hora con{" "}
            <span className="text-primary font-semibold">{owner.name}</span>.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#reserva"
              className="group inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-gradient-neon text-primary-foreground font-bold uppercase tracking-wider shadow-neon hover:scale-105 active:scale-95 transition-smooth"
            >
              Reservar consola
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-smooth" />
            </a>
            <a
              href={waLink(owner.phone, owner.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-xl glass-panel neon-border font-bold uppercase tracking-wider text-foreground hover:text-primary transition-smooth"
            >
              <Zap className="w-5 h-5" />
              WhatsApp directo
            </a>
          </div>

          <div className="flex flex-wrap gap-8 pt-4">
            {[
              { k: "10+", v: "Consolas" },
              { k: "200+", v: "Gamers felices" },
              { k: "100%", v: "Diversión" },
            ].map((s) => (
              <div key={s.v}>
                <div className="font-display font-black text-3xl text-gradient-neon">
                  {s.k}
                </div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">
                  {s.v}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden lg:block relative">
          <div className="relative aspect-square rounded-3xl overflow-hidden glass-panel neon-border animate-pulse-glow">
            <img
              src={heroImg}
              alt="Setup gamer"
              width={900}
              height={900}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 glass-panel rounded-2xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">
                    Estado
                  </div>
                  <div className="font-display font-bold text-primary">
                    ● ABIERTO AHORA
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">
                    Desde
                  </div>
                  <div className="font-display font-bold">$3.000 / hora</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
