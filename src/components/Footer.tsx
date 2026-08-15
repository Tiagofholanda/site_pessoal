"use client";

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import { getAssetPath } from "@/lib/utils";

export default function Footer() {
  const t = useTranslations();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: <Linkedin size={18} />,
      href: "https://www.linkedin.com/in/tiago-holanda-082928141/",
      label: "LinkedIn",
    },
    {
      icon: <Github size={18} />,
      href: "https://github.com/Tiagofholanda",
      label: "GitHub",
    },
    {
      icon: <Mail size={18} />,
      href: "mailto:tfholanda@gmail.com",
      label: "E-mail",
    },
  ];

  return (
    <footer className="border-t border-border bg-navy text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-3">
        <div>
          <div className="mb-4 flex items-center gap-2.5">
            <img
              src={getAssetPath("/logo.svg")}
              alt="THGIS"
              width={32}
              height={32}
              className="h-8 w-8 brightness-0 invert"
            />
            <span className="font-[family-name:var(--font-sora)] text-lg font-bold">
              THGIS
            </span>
          </div>
          <p className="mb-5 text-sm leading-relaxed text-white/70">
            {t("Hero.description")}
          </p>
          <div className="flex gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-teal"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold tracking-wide text-white">
            {t("Nav.home") === "Início" ? "Navegação" : "Navigation"}
          </h4>
          <ul className="space-y-2.5 text-sm text-white/70">
            <li>
              <Link href="/#inicio" className="hover:text-white">
                {t("Nav.home")}
              </Link>
            </li>
            <li>
              <Link href="/#desafio" className="hover:text-white">
                {t("Nav.challenge")}
              </Link>
            </li>
            <li>
              <Link href="/#sigter" className="hover:text-white">
                {t("Nav.engine")}
              </Link>
            </li>
            <li>
              <Link href="/#pilares" className="hover:text-white">
                {t("Nav.pillars")}
              </Link>
            </li>
            <li>
              <Link href="/curriculo" className="hover:text-white">
                {t("Nav.cv")}
              </Link>
            </li>
            <li>
              <Link href="/#contato" className="hover:text-white">
                {t("Nav.contact")}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold tracking-wide text-white">
            {t("Nav.contact")}
          </h4>
          <ul className="space-y-3 text-sm text-white/70">
            <li className="flex items-center gap-2">
              <Mail size={16} />
              <a href="mailto:tfholanda@gmail.com" className="hover:text-white">
                tfholanda@gmail.com
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} />
              Brasil / Remoto
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 px-6 py-5 text-xs text-white/50 sm:flex-row sm:items-center">
          <p>
            © {currentYear} Tiago Holanda Geospatial. {t("Common.footer.rights")}
          </p>
          <div className="flex gap-4">
            <Link href="/privacidade" className="hover:text-white">
              {t("Nav.home") === "Início" ? "Privacidade" : "Privacy"}
            </Link>
            <Link href="/termos" className="hover:text-white">
              {t("Nav.home") === "Início" ? "Termos" : "Terms"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
