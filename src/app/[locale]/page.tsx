import {
  ArrowRightIcon,
  BarChart3,
  Database,
  Layers,
  MailIcon,
  MapPinned,
  ShieldCheck,
  Landmark,
  Cpu,
  Globe2,
} from "lucide-react";
import { Link } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getWhatsAppUrl } from "@/lib/utils";
import DashboardMock from "@/components/DashboardMock";

export const dynamic = "force-static";

const portfolioKeys = [
  "webgis_municipal",
  "webgis_devgis",
  "webgis_audit",
  "webgis_epi",
  "spatial_db",
  "aero",
] as const;

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <>
      <section id="inicio" className="section-py relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(42,140,110,0.18),transparent_45%)]" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <span className="mb-5 inline-flex rounded-full border border-teal/30 bg-white px-3 py-1 text-xs font-semibold text-teal">
              {t("Hero.badge")}
            </span>
            <h1 className="mb-5 text-4xl leading-tight sm:text-5xl">
              {t("Hero.title")}
            </h1>
            <p className="mb-8 max-w-xl text-lg leading-relaxed text-muted">
              {t("Hero.description")}
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={getWhatsAppUrl(locale)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-teal px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-light"
              >
                {t("Hero.cta_primary")}
                <ArrowRightIcon size={16} />
              </a>
              <Link
                href="/#desafio"
                className="inline-flex items-center rounded-md border border-navy/20 bg-white px-6 py-3 text-sm font-semibold text-navy transition hover:border-navy"
              >
                {t("Nav.challenge")}
              </Link>
            </div>
          </div>
          <DashboardMock />
        </div>
      </section>

      <section className="bg-bg-alt">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-4 px-6 py-10 text-xs font-semibold uppercase tracking-wider text-muted">
          {["PostGIS", "GeoServer", "QGIS", "React", "Python", "Docker", "GEE", "SIG Web", "GeoPortal"].map(
            (tech) => (
              <span key={tech} className="opacity-70 transition hover:text-navy hover:opacity-100">
                {tech}
              </span>
            )
          )}
        </div>
      </section>

      <section className="section-py">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="mb-4 text-3xl">{t("ValueProp.title")}</h2>
            <p className="text-muted leading-relaxed">{t("ValueProp.description")}</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: <Database className="text-teal" size={24} />,
                title: t("ValueProp.items.databases.title"),
                desc: t("ValueProp.items.databases.description"),
              },
              {
                icon: <Layers className="text-teal" size={24} />,
                title: t("ValueProp.items.integration.title"),
                desc: t("ValueProp.items.integration.description"),
              },
              {
                icon: <BarChart3 className="text-teal" size={24} />,
                title: t("ValueProp.items.analytics.title"),
                desc: t("ValueProp.items.analytics.description"),
              },
            ].map((card) => (
              <article
                key={card.title}
                className="rounded-lg border border-border bg-white p-8 shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(0,0,0,0.10)]"
              >
                <div className="mb-4">{card.icon}</div>
                <h3 className="mb-2 text-xl">{card.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{card.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="desafio" className="section-py bg-bg-alt">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto mb-12 max-w-3xl">
            <h2 className="mb-3 text-3xl">{t("Challenge.title")}</h2>
            <p className="mb-4 text-lg font-medium text-navy-mid">
              {t("Challenge.subtitle")}
            </p>
            <p className="leading-relaxed text-muted">{t("Challenge.description")}</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <article className="rounded-lg border border-red-200 bg-white p-8">
              <p className="mb-2 text-xs font-bold uppercase tracking-wide text-red-600">
                {t("Challenge.card_commercial_title")}
              </p>
              <p className="text-sm leading-relaxed text-muted">
                {t("Challenge.card_commercial_desc")}
              </p>
            </article>
            <article className="rounded-lg border border-teal/30 bg-white p-8">
              <p className="mb-2 text-xs font-bold uppercase tracking-wide text-teal">
                {t("Challenge.card_local_title")}
              </p>
              <p className="text-sm leading-relaxed text-muted">
                {t("Challenge.card_local_desc")}
              </p>
            </article>
          </div>
        </div>
      </section>

      <section id="sigter" className="section-py">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2">
          <div>
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-wider text-teal">
              {t("Engine.badge")}
            </span>
            <h2 className="mb-4 text-3xl">{t("Engine.title")}</h2>
            <p className="mb-6 leading-relaxed text-muted">
              {t("Engine.description")}
            </p>
            <div className="mb-6 flex flex-wrap gap-2">
              {["PostGIS", "GeoServer", "SIG Web", "GeoPortal", "React", "Python"].map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-border bg-white px-3 py-1 text-xs font-medium text-navy"
                >
                  {badge}
                </span>
              ))}
            </div>
            <a
              href={getWhatsAppUrl(locale)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-teal px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-light"
            >
              {t("Hero.cta_primary")}
              <ArrowRightIcon size={16} />
            </a>
          </div>
          <DashboardMock />
        </div>
      </section>

      <section id="pilares" className="section-py bg-bg-alt">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="mb-3 text-3xl">{t("Pillars.title")}</h2>
            <p className="text-muted">{t("Pillars.subtitle")}</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: <Landmark className="text-teal" size={24} />,
                title: t("Pillars.routing_title"),
                desc: t("Pillars.routing_desc"),
              },
              {
                icon: <ShieldCheck className="text-teal" size={24} />,
                title: t("Pillars.bi_title"),
                desc: t("Pillars.bi_desc"),
              },
              {
                icon: <MapPinned className="text-teal" size={24} />,
                title: t("Pillars.topology_title"),
                desc: t("Pillars.topology_desc"),
              },
            ].map((pillar) => (
              <article
                key={pillar.title}
                className="rounded-lg border border-border bg-white p-8 shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
              >
                <div className="mb-4">{pillar.icon}</div>
                <h3 className="mb-2 text-xl">{pillar.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{pillar.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-py">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="mb-3 text-3xl">{t("CustomEngineering.title")}</h2>
            <p className="text-muted">{t("CustomEngineering.subtitle")}</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: <Globe2 className="text-teal" size={24} />,
                title: t("CustomEngineering.observation_title"),
                desc: t("CustomEngineering.observation_desc"),
              },
              {
                icon: <Cpu className="text-teal" size={24} />,
                title: t("CustomEngineering.logistics_title"),
                desc: t("CustomEngineering.logistics_desc"),
              },
              {
                icon: <Database className="text-teal" size={24} />,
                title: t("CustomEngineering.infrastructure_title"),
                desc: t("CustomEngineering.infrastructure_desc"),
              },
            ].map((item) => (
              <article
                key={item.title}
                className="rounded-lg border border-border bg-white p-8"
              >
                <div className="mb-4">{item.icon}</div>
                <h3 className="mb-2 text-xl">{item.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="portfolio" className="section-py bg-bg-alt">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="mb-3 text-3xl">{t("Portfolio.title")}</h2>
            <p className="text-muted">{t("Portfolio.subtitle")}</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {portfolioKeys.map((key) => (
              <article
                key={key}
                className="rounded-lg border border-border bg-white p-7 shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(0,0,0,0.10)]"
              >
                <h3 className="mb-2 text-lg">
                  {t(`Portfolio.items.${key}.title`)}
                </h3>
                <p className="text-sm leading-relaxed text-muted">
                  {t(`Portfolio.items.${key}.description`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contato" className="section-py bg-navy">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="mb-4 text-3xl text-white">{t("Contact.title")}</h2>
          <p className="mb-8 leading-relaxed text-white/75">
            {t("Contact.description")}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={getWhatsAppUrl(locale)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-teal px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-light"
            >
              {t("Contact.cta_main")}
            </a>
            <a
              href={getWhatsAppUrl(locale)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              {t("Contact.cta_phone")}
            </a>
            <a
              href="mailto:tfholanda@gmail.com"
              className="inline-flex items-center gap-2 rounded-md border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              <MailIcon size={16} />
              tfholanda@gmail.com
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
