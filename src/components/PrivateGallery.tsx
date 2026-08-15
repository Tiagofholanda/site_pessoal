"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/routing";
import { createBrowserSupabase, isSupabaseConfigured } from "@/lib/supabase";
import { PRIVATE_BUCKET, privateProjects } from "@/data/portfolio";
import { getAccessRequestUrl } from "@/lib/utils";

type SignedImage = {
  key: string;
  url: string | null;
};

export default function PrivateGallery() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [images, setImages] = useState<SignedImage[]>([]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!isSupabaseConfigured()) {
        setReady(true);
        return;
      }

      const supabase = createBrowserSupabase();
      if (!supabase) {
        setReady(true);
        return;
      }

      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.replace("/login");
        return;
      }

      const signed = await Promise.all(
        privateProjects.map(async (item) => {
          const { data: file, error } = await supabase.storage
            .from(PRIVATE_BUCKET)
            .createSignedUrl(item.storagePath, 60 * 60);

          return {
            key: item.key,
            url: error || !file?.signedUrl ? null : file.signedUrl,
          };
        })
      );

      if (!cancelled) {
        setImages(signed);
        setReady(true);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [router]);

  async function logout() {
    const supabase = createBrowserSupabase();
    await supabase?.auth.signOut();
    router.replace("/login");
  }

  if (!ready) {
    return <p className="text-sm text-muted">{t("Auth.wait")}</p>;
  }

  if (!isSupabaseConfigured()) {
    return (
      <div className="max-w-xl">
        <p className="mb-6 text-sm leading-relaxed text-navy-mid">
          {t("Auth.missingConfig")}
        </p>
        <a
          href={getAccessRequestUrl(locale)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center bg-navy px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal"
        >
          WhatsApp
        </a>
      </div>
    );
  }

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

      <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2">
        {privateProjects.map((item) => {
          const image = images.find((entry) => entry.key === item.key);

          return (
            <article key={item.key}>
              {image?.url ? (
                <img
                  src={image.url}
                  alt={t(`Portfolio.items.${item.key}.title`)}
                  className="mb-4 aspect-[16/10] w-full border border-border object-cover object-top"
                />
              ) : (
                <div className="mb-4 flex aspect-[16/10] items-center border border-dashed border-border px-4 text-sm text-muted">
                  {t("Auth.imageUnavailable")}
                </div>
              )}
              <h3 className="mb-2 text-lg">
                {t(`Portfolio.items.${item.key}.title`)}
              </h3>
              <p className="text-sm leading-relaxed text-muted">
                {t(`Portfolio.items.${item.key}.description`)}
              </p>
            </article>
          );
        })}
      </div>

      <p className="mt-12">
        <Link href="/" className="link-underline text-sm text-navy">
          ← {t("Auth.back")}
        </Link>
      </p>
    </div>
  );
}
