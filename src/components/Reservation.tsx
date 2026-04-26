import { MessageCircle, Phone, Instagram, MapPin } from "lucide-react";
import { owner, waLink, telLink } from "@/lib/contact";

export const Reservation = () => {
  return (
    <section id="reserva" className="py-24 relative">
      <div className="container mx-auto">
        <div className="relative overflow-hidden rounded-3xl glass-panel neon-border p-8 md:p-14">
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-secondary/20 blur-3xl" />

          <div className="relative grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
                Reserva ahora
              </span>
              <h2 className="font-display font-black text-4xl md:text-5xl mt-3 mb-5">
                Asegura tu <span className="text-gradient-neon">consola</span>
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Habla directamente con <span className="text-foreground font-semibold">{owner.name}</span>, dueño de GameZone La Niata. Atención cercana, sin intermediarios.
              </p>

              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <span>{owner.location}</span>
              </div>
            </div>

            <div className="space-y-4">
              <a
                href={waLink(owner.phone, owner.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-5 rounded-2xl bg-[hsl(var(--whatsapp))]/10 border border-[hsl(var(--whatsapp))]/30 hover:border-[hsl(var(--whatsapp))] hover:shadow-[0_0_30px_hsl(var(--whatsapp)/0.4)] transition-smooth"
              >
                <span className="grid place-items-center w-12 h-12 rounded-xl bg-[hsl(var(--whatsapp))] text-white shrink-0 group-hover:scale-110 transition-smooth">
                  <MessageCircle className="w-6 h-6" />
                </span>
                <div className="flex-1">
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">WhatsApp</div>
                  <div className="font-display font-bold text-lg">{owner.phoneDisplay}</div>
                </div>
              </a>

              <a
                href={telLink(owner.phone)}
                className="group flex items-center gap-4 p-5 rounded-2xl bg-primary/10 border border-primary/30 hover:border-primary hover:shadow-neon transition-smooth"
              >
                <span className="grid place-items-center w-12 h-12 rounded-xl bg-primary text-primary-foreground shrink-0 group-hover:scale-110 transition-smooth">
                  <Phone className="w-6 h-6" />
                </span>
                <div className="flex-1">
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">Llamar al dueño</div>
                  <div className="font-display font-bold text-lg">{owner.phoneDisplay}</div>
                </div>
              </a>

              <a
                href={owner.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-5 rounded-2xl bg-gradient-instagram/10 border border-secondary/30 hover:border-secondary hover:shadow-magenta transition-smooth"
                style={{ background: 'linear-gradient(135deg, hsl(var(--instagram-from)/0.08), hsl(var(--instagram-to)/0.08))' }}
              >
                <span className="grid place-items-center w-12 h-12 rounded-xl bg-gradient-instagram text-white shrink-0 group-hover:scale-110 transition-smooth">
                  <Instagram className="w-6 h-6" />
                </span>
                <div className="flex-1">
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">Instagram del dueño</div>
                  <div className="font-display font-bold text-lg">@kevin_ga.lindo</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
