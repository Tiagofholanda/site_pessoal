"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/routing";
import { hasPrivateAccess, lockPrivateAccess } from "@/lib/access";
import { createBrowserSupabase, isSupabaseConfigured } from "@/lib/supabase";
import { PRIVATE_BUCKET, privateProjects } from "@/data/portfolio";

type SignedImage = {
  key: string;
  url: string | null;
};

export default function PrivateGallery() {
  const t = useTranslations();
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [images, setImages] = useState<SignedImage[]>([]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!hasPrivateAccess()) {
        router.replace("/login");
        return;
      }

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
                url: error || !file?.signedUrl ? null : file.signedUrl,
              };
            })
          );
          if (!cancelled) setImages(signed);
        }
      }

      if (!cancelled) setReady(true);
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [router]);

  function logout() {
    lockPrivateAccess();
    router.replace("/login");
  }

  if (!ready) {
    return <p className="text-sm text-muted">{t("Auth.wait")}</p>;
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

      <div className="grid gap-6 sm:grid-cols-2">
        {privateProjects.map((item) => {
          const image = images.find((entry) => entry.key === item.key);

          return (
            <article key={item.key} className="card p-5">
              {image?.url ? (
                <img
                  src={image.url}
                  alt={t(`Portfolio.items.${item.key}.title`)}
                  className="mb-4 aspect-[16/10] w-full rounded-lg border border-border object-cover object-top"
                />
              ) : null}
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
