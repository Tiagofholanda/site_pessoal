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
    <div className="inline-flex items-center rounded-full bg-bg-alt p-1 border border-border">
      <button
        type="button"
        onClick={() => onLanguageChange("pt")}
        className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${
          locale === "pt"
            ? "bg-white text-navy shadow-sm"
            : "text-muted hover:text-navy"
        }`}
      >
        PT
      </button>
      <button
        type="button"
        onClick={() => onLanguageChange("en")}
        className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${
          locale === "en"
            ? "bg-white text-navy shadow-sm"
            : "text-muted hover:text-navy"
        }`}
      >
        EN
      </button>
    </div>
  );
}
