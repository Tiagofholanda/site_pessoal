"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/routing";
import { hasPrivateAccess, lockPrivateAccess } from "@/lib/access";
import { createBrowserSupabase, isSupabaseConfigured } from "@/lib/supabase";
import { PRIVATE_BUCKET, privateProjects } from "@/data/portfolio";
import { getAssetPath } from "@/lib/utils";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

type ProjectImages = Record<string, string[]>;

export default function PrivateGallery() {
  const t = useTranslations();
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [images, setImages] = useState<ProjectImages>({});
  const [selected, setSelected] = useState<Record<string, number>>({});
  const [open, setOpen] = useState<{ key: string; index: number } | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!hasPrivateAccess()) {
        router.replace("/login");
        return;
      }

      const localImages = Object.fromEntries(
        privateProjects.map((item) => [
          item.key,
          item.images.map((path) => getAssetPath(path)),
        ])
      ) as ProjectImages;

      if (isSupabaseConfigured()) {
        const supabase = createBrowserSupabase();
        if (supabase) {
          const signed = await Promise.all(
            privateProjects.map(async (item) => {
              const { data: file, error } = await supabase.storage
                .from(PRIVATE_BUCKET)
                .createSignedUrl(item.storagePath, 60 * 60);

              const urls = item.images.map((path) => getAssetPath(path));
              if (!error && file?.signedUrl) {
                urls[0] = file.signedUrl;
              }

              return [item.key, urls] as const;
            })
          );
          if (!cancelled) setImages(Object.fromEntries(signed));
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
    if (!open) return;

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(null);
      if (!open) return;
      const urls = images[open.key] ?? [];
      if (event.key === "ArrowRight") {
        setOpen({ key: open.key, index: (open.index + 1) % urls.length });
      }
      if (event.key === "ArrowLeft") {
        setOpen({
          key: open.key,
          index: (open.index - 1 + urls.length) % urls.length,
        });
      }
    }

    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, images]);

  function logout() {
    lockPrivateAccess();
    router.replace("/login");
  }

  if (!ready) {
    return <p className="text-sm text-muted">{t("Auth.wait")}</p>;
  }

  const openUrls = open ? images[open.key] ?? [] : [];
  const openItem = privateProjects.find((item) => item.key === open?.key);

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
          const urls = images[item.key] ?? [];
          const current = selected[item.key] ?? 0;
          const currentUrl = urls[current];

          return (
            <article
              key={item.key}
              className="card overflow-hidden p-0 md:grid md:grid-cols-[1.15fr_0.85fr]"
            >
              {currentUrl ? (
                <div>
                  <button
                    type="button"
                    onClick={() => setOpen({ key: item.key, index: current })}
                    className="block w-full text-left"
                  >
                    <img
                      src={currentUrl}
                      alt={t(`Portfolio.items.${item.key}.title`)}
                      className="aspect-[16/10] w-full object-cover object-top md:h-full md:aspect-auto"
                    />
                  </button>
                  {urls.length > 1 ? (
                    <div className="flex gap-2 border-t border-border bg-bg-alt p-3">
                      {urls.map((url, index) => (
                        <button
                          key={url}
                          type="button"
                          onClick={() =>
                            setSelected((prev) => ({
                              ...prev,
                              [item.key]: index,
                            }))
                          }
                          className={`overflow-hidden rounded border ${
                            index === current
                              ? "border-teal"
                              : "border-transparent opacity-70 hover:opacity-100"
                          }`}
                        >
                          <img
                            src={url}
                            alt=""
                            className="h-14 w-20 object-cover object-top"
                          />
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>
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
                {urls.length > 1 ? (
                  <p className="mt-3 text-xs text-muted">
                    {t("Auth.imageCount", { count: urls.length })}
                  </p>
                ) : null}
                {currentUrl ? (
                  <button
                    type="button"
                    onClick={() => setOpen({ key: item.key, index: current })}
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

      {open && openItem && openUrls[open.index] ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy/80 p-4 backdrop-blur-sm"
          onClick={() => setOpen(null)}
          role="dialog"
          aria-modal="true"
          aria-label={t(`Portfolio.items.${openItem.key}.title`)}
        >
          <button
            type="button"
            onClick={() => setOpen(null)}
            className="absolute right-4 top-4 rounded-full bg-white/90 p-2 text-navy"
            aria-label={t("Auth.close")}
          >
            <X size={18} />
          </button>
          {openUrls.length > 1 ? (
            <>
              <button
                type="button"
                className="absolute left-4 rounded-full bg-white/90 p-2 text-navy"
                aria-label={t("Auth.previous")}
                onClick={(event) => {
                  event.stopPropagation();
                  setOpen({
                    key: open.key,
                    index: (open.index - 1 + openUrls.length) % openUrls.length,
                  });
                }}
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                className="absolute right-16 top-auto rounded-full bg-white/90 p-2 text-navy md:right-4"
                aria-label={t("Auth.next")}
                onClick={(event) => {
                  event.stopPropagation();
                  setOpen({
                    key: open.key,
                    index: (open.index + 1) % openUrls.length,
                  });
                }}
              >
                <ChevronRight size={18} />
              </button>
            </>
          ) : null}
          <img
            src={openUrls[open.index]}
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
