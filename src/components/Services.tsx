import { Trophy, Users, Clock, PartyPopper } from "lucide-react";

const services = [
  { icon: Clock, title: "Alquiler por horas", desc: "Tarifas claras desde $3.000 la hora. Sin sorpresas." },
  { icon: Users, title: "Multijugador local", desc: "Hasta 4 controles. La rivalidad sana hace al gamer." },
  { icon: Trophy, title: "Torneos semanales", desc: "FIFA, Mortal Kombat y más. Premios reales." },
  { icon: PartyPopper, title: "Eventos & cumpleaños", desc: "Reserva la sala completa para tu plan especial." },
];

export const Services = () => {
  return (
    <section id="servicios" className="py-24 relative">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-secondary">
            Lo que ofrecemos
          </span>
          <h2 className="font-display font-black text-4xl md:text-5xl mt-3">
            Más que una <span className="text-gradient-neon">sala de juegos</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                className="group glass-panel rounded-2xl p-6 hover:-translate-y-1 transition-smooth border border-border hover:border-primary/40"
              >
                <Icon className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-smooth" />
                <h3 className="font-display font-bold text-lg mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
