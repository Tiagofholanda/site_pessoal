"use client";

import { useEffect, useState } from "react";
import { Link } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { getAssetPath, getWhatsAppUrl } from "@/lib/utils";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const t = useTranslations("Nav");
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const whatsappUrl = getWhatsAppUrl(locale);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/#inicio", label: t("home") },
    { href: "/#desafio", label: t("challenge") },
    { href: "/#sigter", label: t("engine") },
    { href: "/#pilares", label: t("pillars") },
    { href: "/#portfolio", label: t("portfolio") },
    { href: "/curriculo", label: t("cv") },
    { href: "/#contato", label: t("contact") },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all ${
        scrolled
          ? "bg-white/95 backdrop-blur border-b border-border shadow-[0_1px_0_var(--color-border)]"
          : "bg-white/80 backdrop-blur"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/#inicio" className="flex items-center gap-2.5">
          <img
            src={getAssetPath("/logo.svg")}
            alt="THGIS"
            width={36}
            height={36}
            className="h-9 w-9"
          />
          <span className="font-[family-name:var(--font-sora)] text-lg font-bold leading-none text-navy">
            THGIS
            <span className="ml-1.5 text-xs font-medium text-teal">
              Geospatial
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted transition-colors hover:text-navy"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher />
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md bg-teal px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-light"
          >
            {t("cta")}
          </a>
        </div>

        <button
          type="button"
          className="rounded-md p-2 text-navy lg:hidden"
          onClick={() => setIsOpen((open) => !open)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-border bg-white px-6 py-5 lg:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-lg font-semibold text-navy"
              >
                {link.label}
              </Link>
            ))}
            <LanguageSwitcher />
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="rounded-2xl bg-navy px-5 py-4 text-center font-bold text-white shadow-lg"
            >
              {t("cta")}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
