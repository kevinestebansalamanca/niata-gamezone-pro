import { Code2, Facebook, Instagram, Mail, MessageCircle, Sparkles, ArrowRight, Globe } from "lucide-react";
import { dev, waLink, mailLink } from "@/lib/contact";

export const DeveloperSection = () => {
  return (
    <section id="desarrollador" className="py-28 relative overflow-hidden">
      {/* Decorative aura */}
      <div className="absolute inset-0 bg-gradient-dev opacity-50 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/10 blur-3xl" />

      <div className="container mx-auto relative">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
              Web Studio Elite
            </span>
          </div>
          <h2 className="font-display font-black text-4xl md:text-5xl mt-4">
            Desarrollado por <span className="text-gradient-neon">KS NOVA STUDIO</span>
          </h2>
          <p className="text-muted-foreground mt-4 text-lg">
            Páginas web profesionales para negocios que quieren destacar.
          </p>
        </div>

        {/* Premium card */}
        <div className="max-w-5xl mx-auto">
          <div className="relative glass-panel rounded-3xl p-8 md:p-12 overflow-hidden group">
            {/* Animated border gradient */}
            <div className="absolute inset-0 rounded-3xl pointer-events-none opacity-60 group-hover:opacity-100 transition-smooth"
                 style={{
                   background: 'linear-gradient(135deg, hsl(var(--primary))/0.6, hsl(var(--accent))/0.6, hsl(var(--secondary))/0.6)',
                   padding: '1px',
                   WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
                   WebkitMaskComposite: 'xor',
                   maskComposite: 'exclude' as never,
                 }}
            />

            <div className="relative grid md:grid-cols-[auto,1fr] gap-8 items-center mb-10">
              <div className="relative">
                <div className="w-28 h-28 rounded-2xl bg-gradient-neon grid place-items-center shadow-neon animate-pulse-glow">
                  <Code2 className="w-12 h-12 text-primary-foreground" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-secondary grid place-items-center text-xs font-black text-white shadow-magenta">
                  ★
                </div>
              </div>

              <div>
                <div className="text-xs font-bold uppercase tracking-[0.3em] text-primary mb-2">
                  Diseñador & Developer
                </div>
                <h3 className="font-display font-black text-3xl md:text-4xl mb-1">
                  {dev.name}
                </h3>
                <div className="font-display font-bold text-xl text-gradient-neon">
                  {dev.studio}
                </div>
                <p className="text-muted-foreground mt-3 max-w-lg">
                  Webs premium, branding digital y experiencias modernas en Yopal — Casanare.
                </p>
              </div>
            </div>

            {/* Social premium buttons */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              <a
                href={dev.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn relative overflow-hidden rounded-2xl p-5 bg-[hsl(var(--facebook))]/10 border border-[hsl(var(--facebook))]/30 hover:border-[hsl(var(--facebook))] hover:shadow-[0_0_30px_hsl(var(--facebook)/0.5)] hover:-translate-y-1 active:scale-95 transition-smooth"
              >
                <Facebook className="w-7 h-7 text-[hsl(var(--facebook))] mb-3 group-hover/btn:scale-110 transition-smooth" />
                <div className="font-display font-bold">Facebook</div>
                <div className="text-xs text-muted-foreground">Oficial</div>
              </a>

              <a
                href={dev.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn relative overflow-hidden rounded-2xl p-5 border hover:-translate-y-1 active:scale-95 transition-smooth"
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--instagram-from)/0.12), hsl(var(--instagram-via)/0.12), hsl(var(--instagram-to)/0.12))',
                  borderColor: 'hsl(var(--instagram-via)/0.4)',
                }}
              >
                <div className="w-7 h-7 rounded-lg bg-gradient-instagram grid place-items-center mb-3 group-hover/btn:scale-110 transition-smooth">
                  <Instagram className="w-4 h-4 text-white" />
                </div>
                <div className="font-display font-bold">Instagram</div>
                <div className="text-xs text-muted-foreground">@kevxs.gzr</div>
              </a>

              <a
                href={waLink(dev.phone, dev.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn relative overflow-hidden rounded-2xl p-5 bg-[hsl(var(--whatsapp))]/10 border border-[hsl(var(--whatsapp))]/30 hover:border-[hsl(var(--whatsapp))] hover:shadow-[0_0_30px_hsl(var(--whatsapp)/0.5)] hover:-translate-y-1 active:scale-95 transition-smooth"
              >
                <MessageCircle className="w-7 h-7 text-[hsl(var(--whatsapp))] mb-3 group-hover/btn:scale-110 transition-smooth" />
                <div className="font-display font-bold">WhatsApp</div>
                <div className="text-xs text-muted-foreground">{dev.phoneDisplay}</div>
              </a>

              <a
                href={mailLink(
                  dev.email,
                  "Quiero una página web con KS NOVA STUDIO",
                  "Hola Kevin, vi tu trabajo en GameZone La Niata y quiero información sobre páginas web profesionales."
                )}
                className="group/btn relative overflow-hidden rounded-2xl p-5 bg-[hsl(var(--email-cyan))]/10 border border-[hsl(var(--email-cyan))]/30 hover:border-[hsl(var(--email-cyan))] hover:shadow-[0_0_30px_hsl(var(--email-cyan)/0.5)] hover:-translate-y-1 active:scale-95 transition-smooth"
              >
                <Mail className="w-7 h-7 text-[hsl(var(--email-cyan))] mb-3 group-hover/btn:scale-110 transition-smooth" />
                <div className="font-display font-bold">Enviar Email</div>
                <div className="text-xs text-muted-foreground truncate">{dev.email}</div>
              </a>
            </div>

            {/* Big CTA */}
            <a
              href={waLink(dev.phone, dev.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="group/cta relative flex items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-neon text-primary-foreground font-display font-bold uppercase tracking-wider shadow-neon hover:scale-[1.02] active:scale-[0.99] transition-smooth overflow-hidden"
            >
              <div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer pointer-events-none"
                style={{ backgroundSize: '200% 100%' }}
              />
              <div className="relative flex items-center gap-3">
                <Sparkles className="w-6 h-6" />
                <span className="text-base md:text-lg">Crea tu página web con KS NOVA STUDIO</span>
              </div>
              <ArrowRight className="relative w-6 h-6 group-hover/cta:translate-x-2 transition-smooth" />
            </a>

            <p className="text-center text-xs uppercase tracking-[0.3em] text-muted-foreground mt-6">
              Desarrollo web · Yopal · Casanare · Colombia
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
