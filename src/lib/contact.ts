// Centralized contact info — GameZone La Niata
export const owner = {
  business: "GameZone La Niata",
  name: "Kevin Fernando Galindo",
  location: "Vereda La Niata, Yopal — Casanare, Colombia",
  phone: "3219460878",
  phoneDisplay: "321 9460878",
  whatsappMessage:
    "Hola Kevin, quiero reservar una consola en GameZone La Niata.",
  instagram:
    "https://www.instagram.com/kevin_ga.lindo?igsh=MW11OXoyNmNlMHRtMQ==",
};

export const dev = {
  studio: "KS NOVA STUDIO",
  name: "Kevin Salamanca",
  phone: "3124050409",
  phoneDisplay: "312 4050409",
  email: "kevinestebansalamanca2@gmail.com",
  facebook: "https://www.facebook.com/kevin.e.Salamanca",
  instagram:
    "https://www.instagram.com/kevxs.gzr?igsh=MWh4M2JiNWd2bjBtbg==",
  whatsappMessage:
    "Hola Kevin, vi tu desarrollo web en GameZone La Niata y quiero información sobre páginas web profesionales.",
  portfolio: "https://ksnovastudios-salamanca-portfolios.vercel.app",
};

export const waLink = (phone: string, text: string) =>
  `https://wa.me/57${phone}?text=${encodeURIComponent(text)}`;

export const telLink = (phone: string) => `tel:+57${phone}`;
export const mailLink = (email: string, subject: string, body: string) =>
  `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
