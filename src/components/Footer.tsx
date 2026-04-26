import { Gamepad2, MapPin, Phone, MessageCircle, Instagram, Facebook, Mail, Code2, Heart } from "lucide-react";
import { owner, dev, waLink, telLink, mailLink } from "@/lib/contact";

export const Footer = () => {
  return (
    <footer className="relative pt-20 pb-10 border-t border-border/60 bg-background/60">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          {/* Business */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <span className="grid place-items-center w-12 h-12 rounded-xl bg-gradient-neon shadow-neon">
                <Gamepad2 className="w-6 h-6 text-primary-foreground" />
              </span>
              <div>
                <div className="font-display font-black text-xl">
                  GAME<span className="text-gradient-neon">ZONE</span> LA NIATA
                </div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">
                  Sala gamer premium
                </div>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="text-xs uppercase tracking-[0.3em] text-primary font-bold">
                Propietario
              </div>
              <div className="font-display font-bold text-lg">{owner.name}</div>

              <div className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                <span>{owner.location}</span>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                <a
                  href={waLink(owner.phone, owner.whatsappMessage)}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[hsl(var(--whatsapp))]/10 border border-[hsl(var(--whatsapp))]/30 text-[hsl(var(--whatsapp))] hover:bg-[hsl(var(--whatsapp))]/20 transition-smooth text-sm font-semibold"
                >
                  <MessageCircle className="w-4 h-4" /> WhatsApp
                </a>
                <a
                  href={telLink(owner.phone)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 transition-smooth text-sm font-semibold"
                >
                  <Phone className="w-4 h-4" /> {owner.phoneDisplay}
                </a>
                <a
                  href={owner.instagram}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-secondary/30 text-secondary hover:bg-secondary/10 transition-smooth text-sm font-semibold"
                >
                  <Instagram className="w-4 h-4" /> Instagram
                </a>
              </div>
            </div>
          </div>

          {/* Developer */}
          <div className="space-y-5 md:border-l md:border-border/60 md:pl-12">
            <div className="flex items-center gap-3">
              <span className="grid place-items-center w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-secondary shadow-accent-glow">
                <Code2 className="w-6 h-6 text-white" />
              </span>
              <div>
                <div className="font-display font-black text-xl">
                  KS NOVA <span className="text-gradient-neon">STUDIO</span>
                </div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">
                  Desarrollo web profesional
                </div>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="text-xs uppercase tracking-[0.3em] text-accent font-bold">
                Desarrollador
              </div>
              <div className="font-display font-bold text-lg">{dev.name}</div>

              <div className="flex flex-wrap gap-2 pt-2">
                <a
                  href={waLink(dev.phone, dev.whatsappMessage)}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[hsl(var(--whatsapp))]/10 border border-[hsl(var(--whatsapp))]/30 text-[hsl(var(--whatsapp))] hover:bg-[hsl(var(--whatsapp))]/20 transition-smooth text-sm font-semibold"
                >
                  <MessageCircle className="w-4 h-4" /> {dev.phoneDisplay}
                </a>
                <a
                  href={mailLink(dev.email, "Página web profesional", "Hola Kevin, quiero información sobre desarrollo web.")}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[hsl(var(--email-cyan))]/10 border border-[hsl(var(--email-cyan))]/30 text-[hsl(var(--email-cyan))] hover:bg-[hsl(var(--email-cyan))]/20 transition-smooth text-sm font-semibold"
                >
                  <Mail className="w-4 h-4" /> Email
                </a>
                <a
                  href={dev.facebook}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[hsl(var(--facebook))]/10 border border-[hsl(var(--facebook))]/30 text-[hsl(var(--facebook))] hover:bg-[hsl(var(--facebook))]/20 transition-smooth text-sm font-semibold"
                >
                  <Facebook className="w-4 h-4" /> Facebook
                </a>
                <a
                  href={dev.instagram}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-secondary/30 text-secondary hover:bg-secondary/10 transition-smooth text-sm font-semibold"
                >
                  <Instagram className="w-4 h-4" /> Instagram
                </a>
              </div>

              <p className="text-xs text-muted-foreground pt-2 break-all">
                {dev.email}
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-border/60 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} GameZone La Niata · Yopal, Casanare</p>
          <p className="flex items-center gap-1.5">
            Diseñado con <Heart className="w-3 h-3 fill-secondary text-secondary" /> por{" "}
            <a href="#desarrollador" className="text-gradient-neon font-bold">
              KS NOVA STUDIO
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
