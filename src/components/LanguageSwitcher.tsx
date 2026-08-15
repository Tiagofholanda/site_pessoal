"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { useParams } from "next/navigation";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  function onLanguageChange(newLocale: "pt" | "en") {
    router.replace(
      // @ts-expect-error -- next-intl replace typing varies by version
      { pathname, params },
      { locale: newLocale }
    );
  }

  return (
    <div className="inline-flex items-center rounded-full border border-border bg-bg-alt p-1">
      <button
        type="button"
        onClick={() => onLanguageChange("pt")}
        className={`rounded-full px-3 py-1 text-xs font-bold transition ${
          locale === "pt" ? "bg-white text-navy shadow-sm" : "text-muted hover:text-navy"
        }`}
      >
        PT
      </button>
      <button
        type="button"
        onClick={() => onLanguageChange("en")}
        className={`rounded-full px-3 py-1 text-xs font-bold transition ${
          locale === "en" ? "bg-white text-navy shadow-sm" : "text-muted hover:text-navy"
        }`}
      >
        EN
      </button>
    </div>
  );
}
