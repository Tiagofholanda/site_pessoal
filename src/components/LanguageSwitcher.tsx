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
    <div className="flex items-center gap-2 text-xs font-medium">
      <button
        type="button"
        onClick={() => onLanguageChange("pt")}
        className={locale === "pt" ? "text-navy" : "text-muted hover:text-navy"}
      >
        PT
      </button>
      <span className="text-border">/</span>
      <button
        type="button"
        onClick={() => onLanguageChange("en")}
        className={locale === "en" ? "text-navy" : "text-muted hover:text-navy"}
      >
        EN
      </button>
    </div>
  );
}
