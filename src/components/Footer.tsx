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
  ];

  return (
    <footer className="border-t border-border px-6 py-14">
      <div className="mx-auto grid max-w-5xl gap-10 sm:grid-cols-3">
        <div>
          <p className="mb-3 font-[family-name:var(--font-display)] text-lg font-semibold text-navy">
            Tiago Holanda
          </p>
          <p className="max-w-xs text-sm leading-relaxed text-muted">
            {t("Common.footer.tagline")}
          </p>
        </div>

        <div>
          <p className="eyebrow mb-4">{t("Common.footer.navigation")}</p>
          <ul className="space-y-2.5 text-sm text-navy-mid">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-teal">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-4">{t("Nav.contact")}</p>
          <ul className="space-y-2.5 text-sm text-navy-mid">
            <li>
              <a
                href={getWhatsAppUrl(locale)}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-teal"
              >
                {t("Contact.cta_phone")}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${t("Contact.cta_email")}`}
                className="hover:text-teal"
              >
                {t("Contact.cta_email")}
              </a>
            </li>
          </ul>
          <p className="eyebrow mb-3 mt-6">Perfis</p>
          <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-navy-mid">
            {profiles.map((profile) => (
              <li key={profile.label}>
                <a
                  href={profile.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-teal"
                >
                  {profile.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-5xl flex-col gap-3 border-t border-border pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {currentYear} Tiago Fernando de Holanda. {t("Common.footer.rights")}
        </p>
        <div className="flex gap-5">
          <Link href="/privacidade" className="hover:text-teal">
            {locale === "pt" ? "Privacidade" : "Privacy"}
          </Link>
          <Link href="/termos" className="hover:text-teal">
            {locale === "pt" ? "Termos" : "Terms"}
          </Link>
        </div>
      </div>
    </footer>
  );
}
