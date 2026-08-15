import { getTranslations, setRequestLocale } from "next-intl/server";
import PrivateGallery from "@/components/PrivateGallery";

export const dynamic = "force-static";

export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function PrivateProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Auth");

  return (
    <article>
      <header className="gallery-hero relative overflow-hidden px-6 py-16 sm:py-20">
        <div className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-teal/20 blur-3xl" />
        <div className="relative mx-auto max-w-6xl">
          <p className="eyebrow mb-3 text-teal-light">{t("galleryKicker")}</p>
          <h1 className="max-w-2xl text-4xl text-white sm:text-5xl">
            {t("galleryTitle")}
          </h1>
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
        <PrivateGallery />
      </div>
    </article>
  );
}
