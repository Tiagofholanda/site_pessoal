"use client";

import { FormEvent, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { unlockPrivateAccess } from "@/lib/access";
import { getAccessRequestUrl } from "@/lib/utils";

export default function LoginForm({ compact = false }: { compact?: boolean }) {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);
    const ok = await unlockPrivateAccess(password);
    setLoading(false);

    if (!ok) {
      setError(t("Auth.error"));
      return;
    }

    router.push("/projetos-privados");
  }

  return (
    <div className={compact ? "" : "max-w-md"}>
      <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <label className="block min-w-0 flex-1">
          <span className="eyebrow mb-2 block">{t("Auth.password")}</span>
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-md border border-border bg-white px-3 py-2.5 text-sm text-navy outline-none focus:border-teal"
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          className="btn-primary px-5 py-2.5 text-sm disabled:opacity-60"
        >
          {loading ? t("Auth.loading") : t("Auth.submit")}
        </button>
      </form>
      {error ? <p className="mt-3 text-sm text-red-700">{error}</p> : null}
      <p className="mt-4 text-sm text-muted">
        {t("Auth.orRequest")}{" "}
        <a
          href={getAccessRequestUrl(locale)}
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline font-medium text-navy"
        >
          {t("Portfolio.requestAccess")}
        </a>
      </p>
    </div>
  );
}
