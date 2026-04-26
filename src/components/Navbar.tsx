import { Gamepad2, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const links = [
  { label: "Inicio", href: "#inicio" },
  { label: "Consolas", href: "#consolas" },
  { label: "Servicios", href: "#servicios" },
  { label: "Reserva", href: "#reserva" },
  { label: "Desarrollador", href: "#desarrollador" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-smooth ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/60"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto flex items-center justify-between py-4">
        <a href="#inicio" className="flex items-center gap-2 group">
          <span className="relative grid place-items-center w-10 h-10 rounded-xl bg-gradient-neon shadow-neon">
            <Gamepad2 className="w-5 h-5 text-primary-foreground" />
          </span>
          <span className="font-display font-black text-lg tracking-wider">
            GAME<span className="text-gradient-neon">ZONE</span>
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm font-semibold text-muted-foreground hover:text-primary transition-smooth uppercase tracking-wider"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#reserva"
          className="hidden md:inline-flex items-center px-5 py-2.5 rounded-lg bg-gradient-neon text-primary-foreground font-bold text-sm uppercase tracking-wider shadow-neon hover:scale-105 transition-smooth"
        >
          Reservar
        </a>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-foreground"
          aria-label="Menú"
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-border/60 bg-background/95 backdrop-blur-xl">
          <ul className="container mx-auto py-4 space-y-3">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  onClick={() => setOpen(false)}
                  href={l.href}
                  className="block py-2 font-semibold text-muted-foreground hover:text-primary"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};
