"use client";

import { Link } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { getWhatsAppUrl } from "@/lib/utils";
import { cvLinks } from "@/data/cv";

export default function Footer() {
  const t = useTranslations();
  const locale = useLocale();
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { href: "/#servicos", label: t("Nav.services") },
    { href: "/#projetos", label: t("Nav.portfolio") },
    { href: "/login", label: t("Nav.private") },
    { href: "/#metodo", label: t("Nav.method") },
    { href: "/curriculo", label: t("Nav.cv") },
    { href: "/#contato", label: t("Nav.contact") },
  ];

  const profiles = [
    { href: cvLinks.linkedin, label: "LinkedIn" },
    { href: cvLinks.github, label: "GitHub" },
    { href: cvLinks.lattes, label: "Lattes" },
    { href: cvLinks.orcid, label: "ORCID" },
    { href: cvLinks.scholar, label: "Google Scholar" },
  ] as const;

  return (
    <footer className="bg-navy px-6 py-14 text-white">
      <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-3">
        <div>
          <p className="mb-3 font-[family-name:var(--font-display)] text-lg font-bold">
            Tiago Holanda
          </p>
          <p className="max-w-xs text-sm leading-relaxed text-white/70">
            {t("Common.footer.tagline")}
          </p>
        </div>

        <div>
          <p className="eyebrow mb-4">{t("Common.footer.navigation")}</p>
          <ul className="space-y-2.5 text-sm text-white/70">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-4">{t("Nav.contact")}</p>
          <ul className="space-y-2.5 text-sm text-white/70">
            <li>
              <a
                href={getWhatsAppUrl(locale)}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                {t("Contact.cta_phone")}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${t("Contact.cta_email")}`}
                className="hover:text-white"
              >
                {t("Contact.cta_email")}
              </a>
            </li>
          </ul>
          <p className="eyebrow mb-3 mt-6 text-teal-light">Perfis</p>
          <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-white/70">
            {profiles.map((profile) => (
              <li key={profile.label}>
                <a
                  href={profile.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="notranslate hover:text-white"
                  translate="no"
                >
                  {profile.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-6xl flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {currentYear} Tiago Fernando de Holanda. {t("Common.footer.rights")}
        </p>
        <div className="flex gap-5">
          <Link href="/privacidade" className="hover:text-white">
            {locale === "pt" ? "Privacidade" : "Privacy"}
          </Link>
          <Link href="/termos" className="hover:text-white">
            {locale === "pt" ? "Termos" : "Terms"}
          </Link>
        </div>
      </div>
    </footer>
  );
}
