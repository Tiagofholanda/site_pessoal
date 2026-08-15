"use client";

import { FormEvent, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { createBrowserSupabase, isSupabaseConfigured } from "@/lib/supabase";
import { getAccessRequestUrl } from "@/lib/utils";

export default function LoginForm() {
  const t = useTranslations("Auth");
  const locale = useLocale();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isSupabaseConfigured()) {
    return (
      <div className="max-w-md">
        <p className="mb-6 text-sm leading-relaxed text-navy-mid">
          {t("missingConfig")}
        </p>
        <a
          href={getAccessRequestUrl(locale)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary inline-flex items-center px-5 py-2.5 text-sm"
        >
          WhatsApp
        </a>
      </div>
    );
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createBrowserSupabase();
    if (!supabase) {
      setError(t("missingConfig"));
      setLoading(false);
      return;
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    setLoading(false);

    if (signInError) {
      setError(t("error"));
      return;
    }

    router.replace("/projetos-privados");
  }

  return (
    <form onSubmit={onSubmit} className="max-w-md space-y-5">
      <label className="block">
        <span className="eyebrow mb-2 block">{t("email")}</span>
        <input
          type="email"
          name="email"
          autoComplete="username"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full rounded-md border border-border bg-white px-3 py-2.5 text-sm text-navy outline-none focus:border-teal"
        />
      </label>
      <label className="block">
        <span className="eyebrow mb-2 block">{t("password")}</span>
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
      {error ? <p className="text-sm text-red-700">{error}</p> : null}
      <button
        type="submit"
        disabled={loading}
        className="btn-primary px-5 py-2.5 text-sm disabled:opacity-60"
      >
        {loading ? t("loading") : t("submit")}
      </button>
    </form>
  );
}
