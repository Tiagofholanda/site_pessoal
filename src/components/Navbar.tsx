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
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/#servicos", label: t("services") },
    { href: "/#projetos", label: t("portfolio") },
    { href: "/login", label: t("private") },
    { href: "/#metodo", label: t("method") },
    { href: "/curriculo", label: t("cv") },
    { href: "/#contato", label: t("contact") },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all ${
        scrolled
          ? "border-b border-border bg-white/95 shadow-sm backdrop-blur"
          : "border-b border-transparent bg-white/80 backdrop-blur"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/#inicio" className="flex items-center gap-2.5">
          <img
            src={getAssetPath("/logo.svg")}
            alt="Tiago Holanda"
            width={36}
            height={36}
            className="h-9 w-9"
          />
          <span className="font-[family-name:var(--font-display)] text-lg font-bold leading-none text-navy">
            Tiago Holanda
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
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
            className="btn-primary px-4 py-2 text-sm"
          >
            {t("cta")}
          </a>
        </div>

        <button
          type="button"
          className="rounded-md p-2 text-navy lg:hidden"
          onClick={() => setIsOpen((open) => !open)}
          aria-label="Menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
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
                className="text-base font-semibold text-navy"
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
                className="btn-primary px-4 py-2 text-sm"
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
