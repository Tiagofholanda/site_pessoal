"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/utils";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const t = useTranslations("Nav");
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const whatsappUrl = getWhatsAppUrl(locale);

  const navLinks = [
    { href: "/#servicos", label: t("services") },
    { href: "/#projetos", label: t("portfolio") },
    { href: "/#metodo", label: t("method") },
    { href: "/curriculo", label: t("cv") },
    { href: "/#contato", label: t("contact") },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Link href="/#inicio" className="flex items-baseline gap-2">
          <span className="font-[family-name:var(--font-display)] text-lg font-semibold leading-none text-navy">
            Tiago Holanda
          </span>
          <span className="hidden text-xs text-muted sm:inline">
            geoprocessamento
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-navy-mid transition-colors hover:text-teal"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <LanguageSwitcher />
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-navy px-4 py-2 text-sm font-medium text-white transition hover:bg-teal"
          >
            {t("cta")}
          </a>
        </div>

        <button
          type="button"
          className="p-2 text-navy lg:hidden"
          onClick={() => setIsOpen((open) => !open)}
          aria-label="Menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-border bg-background px-6 py-5 lg:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-base text-navy"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center justify-between border-t border-border pt-4">
              <LanguageSwitcher />
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="bg-navy px-4 py-2 text-sm font-medium text-white"
              >
                {t("cta")}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
