import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { getAccessRequestUrl } from "@/lib/utils";
import LoginForm from "@/components/LoginForm";
import { Lock } from "lucide-react";

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
    <article className="section-py px-6">
      <div className="card-quiet mx-auto grid max-w-4xl overflow-hidden md:grid-cols-[0.9fr_1.1fr]">
        <div className="gallery-hero relative px-8 py-10 text-white md:px-10">
          <div className="icon-chip mb-6 border-white/15 bg-white/10">
            <Lock className="text-teal-light" size={18} />
          </div>
          <p className="eyebrow mb-3 text-teal-light">{t("Auth.galleryKicker")}</p>
          <h1 className="mb-4 text-3xl text-white sm:text-4xl">
            {t("Auth.title")}
          </h1>
          <p className="max-w-sm text-sm leading-relaxed text-white/75">
            {t("Auth.subtitle")}
          </p>
        </div>
        <div className="bg-white p-8 sm:p-10">
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
        </div>
      </div>
    </article>
  );
}
