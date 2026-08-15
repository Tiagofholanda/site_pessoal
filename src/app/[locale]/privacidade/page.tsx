import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";

export const dynamic = "force-static";

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isPt = locale === "pt";

  return (
    <article className="section-py mx-auto max-w-3xl px-6">
      <h1 className="mb-6 text-3xl">
        {isPt ? "Política de Privacidade" : "Privacy Policy"}
      </h1>
      <div className="space-y-4 text-sm leading-relaxed text-muted">
        <p>
          {isPt
            ? "Este é um site pessoal e profissional. Não coleto dados pessoais além dos que você envia voluntariamente por e-mail ou WhatsApp ao entrar em contato."
            : "This is a personal and professional website. I do not collect personal data beyond what you voluntarily send by email or WhatsApp when getting in touch."}
        </p>
        <p>
          {isPt
            ? "Mensagens enviadas para tfholanda@gmail.com são usadas apenas para responder ao contato profissional. Não há cookies de rastreamento de terceiros."
            : "Messages sent to tfholanda@gmail.com are used only to reply to professional contact. There are no third-party tracking cookies."}
        </p>
      </div>
      <Link href="/" className="mt-8 inline-block text-sm font-semibold text-teal">
        ← {isPt ? "Voltar" : "Back"}
      </Link>
    </article>
  );
}
