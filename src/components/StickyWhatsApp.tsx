import { MessageCircle } from "lucide-react";
import { owner, waLink } from "@/lib/contact";

export const StickyWhatsApp = () => {
  return (
    <a
      href={waLink(owner.phone, owner.whatsappMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-5 right-5 z-50 grid place-items-center w-14 h-14 rounded-full bg-[hsl(var(--whatsapp))] text-white shadow-[0_0_30px_hsl(var(--whatsapp)/0.6)] hover:scale-110 active:scale-95 transition-smooth"
    >
      <MessageCircle className="w-7 h-7" />
      <span className="absolute inset-0 rounded-full bg-[hsl(var(--whatsapp))] animate-ping opacity-30" />
    </a>
  );
};
