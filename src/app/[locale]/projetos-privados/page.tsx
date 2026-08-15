import { getTranslations, setRequestLocale } from "next-intl/server";
import PrivateGallery from "@/components/PrivateGallery";

export const dynamic = "force-static";

export default async function PrivateProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Auth");

  return (
    <article className="section-py mx-auto max-w-5xl px-6">
      <p className="eyebrow mb-3">Acesso</p>
      <h1 className="mb-8 text-4xl">{t("galleryTitle")}</h1>
      <PrivateGallery />
    </article>
  );
}
