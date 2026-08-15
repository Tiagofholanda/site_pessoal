const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const WHATSAPP_NUMBER = "5581996674681";

const WHATSAPP_MESSAGES = {
  pt: "Olá, Tiago! Tudo bem? Vi o seu site e fiquei interessado(a) em conversar sobre um diagnóstico técnico de GIS e gestão territorial. Podemos agendar um papo?",
  en: "Hi Tiago! I hope you're well. I found your website and I'd like to talk about a GIS / territorial management technical diagnosis. Could we schedule a chat?",
} as const;

export function getWhatsAppUrl(locale: string = "pt"): string {
  const message =
    locale === "en" ? WHATSAPP_MESSAGES.en : WHATSAPP_MESSAGES.pt;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function getAssetPath(path: string): string {
  if (
    path.startsWith("http") ||
    path.startsWith("mailto:") ||
    path.startsWith("tel:")
  ) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_PATH}${normalizedPath}`;
}
