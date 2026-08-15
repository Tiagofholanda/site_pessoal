"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/routing";
import { hasPrivateAccess, lockPrivateAccess } from "@/lib/access";
import { createBrowserSupabase, isSupabaseConfigured } from "@/lib/supabase";
import { PRIVATE_BUCKET, privateProjects } from "@/data/portfolio";
import { getAssetPath } from "@/lib/utils";
import { ChevronLeft, ChevronRight, LogOut, X } from "lucide-react";

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
    return (
      <div className="space-y-6">
        <div className="h-24 animate-pulse rounded-2xl bg-white/70" />
        <div className="h-80 animate-pulse rounded-2xl bg-white/70" />
        <p className="text-sm text-muted">{t("Auth.wait")}</p>
      </div>
    );
  }

  const openUrls = open ? images[open.key] ?? [] : [];
  const openItem = privateProjects.find((item) => item.key === open?.key);

  return (
    <div>
      <div className="mb-10 flex flex-col gap-5 border-b border-border/80 pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <p className="eyebrow mb-3">{t("Auth.galleryMeta", { count: privateProjects.length })}</p>
          <p className="text-base leading-relaxed text-navy-mid">
            {t("Auth.galleryIntro")}
          </p>
        </div>
        <button
          type="button"
          onClick={logout}
          className="inline-flex items-center gap-2 self-start rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-navy transition hover:border-teal hover:text-teal"
        >
          <LogOut size={15} />
          {t("Auth.logout")}
        </button>
      </div>

      <div className="grid gap-10">
        {privateProjects.map((item, projectIndex) => {
          const urls = images[item.key] ?? [];
          const current = selected[item.key] ?? 0;
          const currentUrl = urls[current];
          const number = String(projectIndex + 1).padStart(2, "0");

          return (
            <article key={item.key} className="card-quiet overflow-hidden">
              {currentUrl ? (
                <button
                  type="button"
                  onClick={() => setOpen({ key: item.key, index: current })}
                  className="group relative block w-full text-left"
                >
                  <img
                    src={currentUrl}
                    alt={t(`Portfolio.items.${item.key}.title`)}
                    className="aspect-[16/9] w-full object-cover object-top transition duration-500 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 sm:p-8">
                    <div>
                      <p className="eyebrow mb-2 text-teal-light">
                        {number} · {t("Auth.confidential")}
                      </p>
                      <h3 className="text-2xl text-white sm:text-3xl">
                        {t(`Portfolio.items.${item.key}.title`)}
                      </h3>
                    </div>
                    {urls.length > 1 ? (
                      <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                        {t("Auth.imageCount", { count: urls.length })}
                      </span>
                    ) : null}
                  </div>
                </button>
              ) : (
                <div className="flex aspect-[16/9] items-center justify-center bg-bg-alt text-sm text-muted">
                  {t("Auth.imageUnavailable")}
                </div>
              )}

              <div className="grid gap-6 p-6 sm:grid-cols-[1fr_auto] sm:items-center sm:p-8">
                <p className="max-w-2xl text-sm leading-relaxed text-muted">
                  {t(`Portfolio.items.${item.key}.description`)}
                </p>
                {currentUrl ? (
                  <button
                    type="button"
                    onClick={() => setOpen({ key: item.key, index: current })}
                    className="self-start text-sm font-semibold text-teal hover:underline"
                  >
                    {t("Auth.viewImage")}
                  </button>
                ) : null}
              </div>

              {urls.length > 1 ? (
                <div className="flex gap-2 overflow-x-auto border-t border-border bg-bg-alt/80 px-6 py-4">
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
                      className={`shrink-0 overflow-hidden rounded-lg border-2 transition ${
                        index === current
                          ? "border-teal shadow-sm"
                          : "border-transparent opacity-65 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={url}
                        alt=""
                        className="h-16 w-24 object-cover object-top"
                      />
                    </button>
                  ))}
                </div>
              ) : null}
            </article>
          );
        })}
      </div>

      {open && openItem && openUrls[open.index] ? (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-navy/90 backdrop-blur-md"
          onClick={() => setOpen(null)}
          role="dialog"
          aria-modal="true"
          aria-label={t(`Portfolio.items.${openItem.key}.title`)}
        >
          <div className="flex items-center justify-between px-5 py-4 text-white">
            <div>
              <p className="eyebrow mb-1 text-teal-light">
                {t("Auth.confidential")}
              </p>
              <p className="text-sm font-medium">
                {t(`Portfolio.items.${openItem.key}.title`)}
                {openUrls.length > 1 ? (
                  <span className="ml-3 text-white/60">
                    {t("Auth.imageOf", {
                      current: open.index + 1,
                      total: openUrls.length,
                    })}
                  </span>
                ) : null}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(null)}
              className="rounded-full bg-white/15 p-2 text-white hover:bg-white/25"
              aria-label={t("Auth.close")}
            >
              <X size={18} />
            </button>
          </div>

          <div className="relative flex flex-1 items-center justify-center px-4 pb-8">
            {openUrls.length > 1 ? (
              <>
                <button
                  type="button"
                  className="absolute left-4 rounded-full bg-white/90 p-2.5 text-navy shadow-lg"
                  aria-label={t("Auth.previous")}
                  onClick={(event) => {
                    event.stopPropagation();
                    setOpen({
                      key: open.key,
                      index: (open.index - 1 + openUrls.length) % openUrls.length,
                    });
                  }}
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  className="absolute right-4 rounded-full bg-white/90 p-2.5 text-navy shadow-lg"
                  aria-label={t("Auth.next")}
                  onClick={(event) => {
                    event.stopPropagation();
                    setOpen({
                      key: open.key,
                      index: (open.index + 1) % openUrls.length,
                    });
                  }}
                >
                  <ChevronRight size={20} />
                </button>
              </>
            ) : null}
            <img
              src={openUrls[open.index]}
              alt={t(`Portfolio.items.${openItem.key}.title`)}
              className="max-h-[80vh] max-w-6xl rounded-xl object-contain shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            />
          </div>
        </div>
      ) : null}

      <p className="mt-14">
        <Link href="/" className="link-underline text-sm text-navy">
          ← {t("Auth.back")}
        </Link>
      </p>
    </div>
  );
}
