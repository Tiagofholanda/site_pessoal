import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { getAccessRequestUrl } from "@/lib/utils";
import LoginForm from "@/components/LoginForm";

export const dynamic = "force-static";

export default async function LoginPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <article className="section-py mx-auto max-w-3xl px-6">
      <p className="eyebrow mb-3">Acesso</p>
      <h1 className="mb-4 text-4xl">{t("Auth.title")}</h1>
      <p className="mb-8 max-w-xl text-sm leading-relaxed text-muted">
        {t("Auth.subtitle")}
      </p>
      <LoginForm />
      <p className="mt-8 text-sm text-muted">
        <a
          href={getAccessRequestUrl(locale)}
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline"
        >
          {t("Portfolio.requestAccess")}
        </a>
        <span className="mx-3">·</span>
        <Link href="/" className="link-underline">
          {t("Auth.back")}
        </Link>
      </p>
    </article>
  );
}
