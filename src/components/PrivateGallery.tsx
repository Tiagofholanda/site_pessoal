"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/routing";
import { hasPrivateAccess, lockPrivateAccess } from "@/lib/access";
import { createBrowserSupabase, isSupabaseConfigured } from "@/lib/supabase";
import { PRIVATE_BUCKET, privateProjects } from "@/data/portfolio";
import { getAssetPath } from "@/lib/utils";
import { X } from "lucide-react";

type SignedImage = {
  key: string;
  url: string | null;
};

export default function PrivateGallery() {
  const t = useTranslations();
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [images, setImages] = useState<SignedImage[]>([]);
  const [openKey, setOpenKey] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!hasPrivateAccess()) {
        router.replace("/login");
        return;
      }

      const localImages = privateProjects.map((item) => ({
        key: item.key,
        url: getAssetPath(item.localPath),
      }));

      if (isSupabaseConfigured()) {
        const supabase = createBrowserSupabase();
        if (supabase) {
          const signed = await Promise.all(
            privateProjects.map(async (item) => {
              const { data: file, error } = await supabase.storage
                .from(PRIVATE_BUCKET)
                .createSignedUrl(item.storagePath, 60 * 60);

              return {
                key: item.key,
                url: error || !file?.signedUrl
                  ? getAssetPath(item.localPath)
                  : file.signedUrl,
              };
            })
          );
          if (!cancelled) setImages(signed);
          if (!cancelled) setReady(true);
          return;
        }
      }

      if (!cancelled) {
        setImages(localImages);
        setReady(true);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [router]);

  useEffect(() => {
    if (!openKey) return;

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpenKey(null);
    }

    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openKey]);

  function logout() {
    lockPrivateAccess();
    router.replace("/login");
  }

  if (!ready) {
    return <p className="text-sm text-muted">{t("Auth.wait")}</p>;
  }

  const openItem = privateProjects.find((item) => item.key === openKey);
  const openImage = images.find((entry) => entry.key === openKey);

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <p className="max-w-2xl text-sm leading-relaxed text-muted">
          {t("Auth.galleryIntro")}
        </p>
        <button
          type="button"
          onClick={logout}
          className="text-sm text-navy-mid underline decoration-border underline-offset-3 hover:text-teal"
        >
          {t("Auth.logout")}
        </button>
      </div>

      <div className="grid gap-8">
        {privateProjects.map((item) => {
          const image = images.find((entry) => entry.key === item.key);

          return (
            <article
              key={item.key}
              className="card overflow-hidden p-0 md:grid md:grid-cols-[1.15fr_0.85fr]"
            >
              {image?.url ? (
                <button
                  type="button"
                  onClick={() => setOpenKey(item.key)}
                  className="block w-full text-left"
                >
                  <img
                    src={image.url}
                    alt={t(`Portfolio.items.${item.key}.title`)}
                    className="aspect-[16/10] w-full object-cover object-top md:h-full md:aspect-auto"
                  />
                </button>
              ) : (
                <div className="flex aspect-[16/10] items-center justify-center bg-bg-alt text-sm text-muted md:aspect-auto">
                  {t("Auth.imageUnavailable")}
                </div>
              )}
              <div className="flex flex-col justify-center p-6 md:p-8">
                <p className="eyebrow mb-3">{t("Auth.confidential")}</p>
                <h3 className="mb-3 text-xl">
                  {t(`Portfolio.items.${item.key}.title`)}
                </h3>
                <p className="text-sm leading-relaxed text-muted">
                  {t(`Portfolio.items.${item.key}.description`)}
                </p>
                {image?.url ? (
                  <button
                    type="button"
                    onClick={() => setOpenKey(item.key)}
                    className="mt-5 self-start text-sm font-medium text-teal hover:underline"
                  >
                    {t("Auth.viewImage")}
                  </button>
                ) : null}
              </div>
            </article>
          );
        })}
      </div>

      {openItem && openImage?.url ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy/80 p-4 backdrop-blur-sm"
          onClick={() => setOpenKey(null)}
          role="dialog"
          aria-modal="true"
          aria-label={t(`Portfolio.items.${openItem.key}.title`)}
        >
          <button
            type="button"
            onClick={() => setOpenKey(null)}
            className="absolute right-4 top-4 rounded-full bg-white/90 p-2 text-navy"
            aria-label={t("Auth.close")}
          >
            <X size={18} />
          </button>
          <img
            src={openImage.url}
            alt={t(`Portfolio.items.${openItem.key}.title`)}
            className="max-h-[90vh] max-w-6xl rounded-lg object-contain shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      ) : null}

      <p className="mt-12">
        <Link href="/" className="link-underline text-sm text-navy">
          ← {t("Auth.back")}
        </Link>
      </p>
    </div>
  );
}
