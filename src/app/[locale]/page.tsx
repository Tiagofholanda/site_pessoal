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
import { getAssetPath, getWhatsAppUrl } from "@/lib/utils";
import Reveal from "@/components/Reveal";
import { portfolioItems } from "@/data/portfolio";

export const dynamic = "force-static";

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
      <section
        id="inicio"
        className="relative min-h-[88vh] overflow-hidden"
      >
        <img
          src={getAssetPath("/portfolio/hero.jpg")}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d1a2b]/94 via-[#14253c]/82 to-[#14253c]/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1a2b]/70 via-transparent to-transparent" />
        <div className="relative mx-auto flex min-h-[88vh] max-w-6xl items-end px-6 pb-16 pt-28 sm:items-center sm:pb-20">
          <div className="max-w-xl">
            <p className="animate-fade-up mb-3 font-[family-name:var(--font-sora)] text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
              THGIS
            </p>
            <p className="animate-fade-up-delay-1 mb-6 text-sm font-semibold uppercase tracking-[0.22em] text-teal-light">
              Geospatial
            </p>
            <h1 className="animate-fade-up-delay-1 mb-5 text-2xl leading-snug text-white/95 sm:text-3xl">
              {t("Hero.title")}
            </h1>
            <p className="animate-fade-up-delay-2 mb-8 text-base leading-relaxed text-white/70 sm:text-lg">
              {t("Hero.description")}
            </p>
            <div className="animate-fade-up-delay-2 flex flex-wrap gap-3">
              <a
                href={getWhatsAppUrl(locale)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2 rounded-md bg-teal px-6 py-3 text-sm font-semibold text-white hover:bg-teal-light"
              >
                {t("Hero.cta_primary")}
                <ArrowRightIcon size={16} />
              </a>
              <Link
                href="/#portfolio"
                className="inline-flex items-center rounded-md border border-white/30 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:border-white/60 hover:bg-white/10"
              >
                {t("Nav.portfolio")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border/60 bg-white/50 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-4 px-6 py-8 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
          {["PostGIS", "GeoServer", "QGIS", "React", "Python", "Docker", "GEE", "SIG Web", "GeoPortal"].map(
            (tech) => (
              <span
                key={tech}
                className="opacity-65 transition hover:text-navy hover:opacity-100"
              >
                {tech}
              </span>
            )
          )}
        </div>
      </section>

      <section className="section-py">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal className="mx-auto mb-14 max-w-3xl text-center">
            <h2 className="mb-4 text-3xl sm:text-4xl">{t("ValueProp.title")}</h2>
            <p className="text-muted leading-relaxed">{t("ValueProp.description")}</p>
          </Reveal>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: <Database className="text-teal" size={22} />,
                title: t("ValueProp.items.databases.title"),
                desc: t("ValueProp.items.databases.description"),
              },
              {
                icon: <Layers className="text-teal" size={22} />,
                title: t("ValueProp.items.integration.title"),
                desc: t("ValueProp.items.integration.description"),
              },
              {
                icon: <BarChart3 className="text-teal" size={22} />,
                title: t("ValueProp.items.analytics.title"),
                desc: t("ValueProp.items.analytics.description"),
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 80}>
                <article className="h-full border-t-2 border-teal/40 pt-6">
                  <div className="icon-chip mb-4">{item.icon}</div>
                  <h3 className="mb-2 text-xl">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{item.desc}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="desafio" className="section-py relative overflow-hidden bg-bg-alt/80">
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-[radial-gradient(circle_at_80%_50%,rgba(31,122,94,0.12),transparent_70%)]" />
        <div className="relative mx-auto max-w-6xl px-6">
          <Reveal className="mb-12 max-w-3xl">
            <h2 className="mb-3 text-3xl sm:text-4xl">{t("Challenge.title")}</h2>
            <p className="mb-4 text-lg font-medium text-navy-mid">
              {t("Challenge.subtitle")}
            </p>
            <p className="leading-relaxed text-muted">{t("Challenge.description")}</p>
          </Reveal>
          <div className="grid gap-8 md:grid-cols-2">
            <Reveal>
              <article className="h-full border-l-4 border-red-500/70 bg-white/70 pl-6 pr-2 py-2 backdrop-blur-sm">
                <p className="mb-2 text-xs font-bold uppercase tracking-wide text-red-700">
                  {t("Challenge.card_commercial_title")}
                </p>
                <p className="text-sm leading-relaxed text-muted">
                  {t("Challenge.card_commercial_desc")}
                </p>
              </article>
            </Reveal>
            <Reveal delay={90}>
              <article className="h-full border-l-4 border-teal bg-white/70 pl-6 pr-2 py-2 backdrop-blur-sm">
                <p className="mb-2 text-xs font-bold uppercase tracking-wide text-teal">
                  {t("Challenge.card_local_title")}
                </p>
                <p className="text-sm leading-relaxed text-muted">
                  {t("Challenge.card_local_desc")}
                </p>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="sigter" className="section-py">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.18em] text-teal">
              {t("Engine.badge")}
            </span>
            <h2 className="mb-4 text-3xl sm:text-4xl">{t("Engine.title")}</h2>
            <p className="mb-6 leading-relaxed text-muted">
              {t("Engine.description")}
            </p>
            <div className="mb-8 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-navy/70">
              {["PostGIS", "GeoServer", "SIG Web", "GeoPortal", "React", "Python"].map(
                (tech, i) => (
                  <span key={tech} className="inline-flex items-center gap-2">
                    {i > 0 && <span className="h-1 w-1 rounded-full bg-teal/50" />}
                    {tech}
                  </span>
                )
              )}
            </div>
            <a
              href={getWhatsAppUrl(locale)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2 rounded-md bg-teal px-6 py-3 text-sm font-semibold text-white hover:bg-teal-light"
            >
              {t("Hero.cta_primary")}
              <ArrowRightIcon size={16} />
            </a>
          </Reveal>
          <Reveal delay={100}>
            <div className="overflow-hidden rounded-2xl border border-border/70 shadow-[0_24px_60px_rgba(20,37,60,0.16)]">
              <img
                src={getAssetPath("/portfolio/webgis-devgis.jpg")}
                alt={t("Portfolio.items.webgis_devgis.title")}
                className="aspect-[16/10] w-full object-cover object-top"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section id="pilares" className="section-py bg-bg-alt/80">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal className="mx-auto mb-14 max-w-3xl text-center">
            <h2 className="mb-3 text-3xl sm:text-4xl">{t("Pillars.title")}</h2>
            <p className="text-muted">{t("Pillars.subtitle")}</p>
          </Reveal>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: <Landmark className="text-teal" size={22} />,
                title: t("Pillars.routing_title"),
                desc: t("Pillars.routing_desc"),
              },
              {
                icon: <ShieldCheck className="text-teal" size={22} />,
                title: t("Pillars.bi_title"),
                desc: t("Pillars.bi_desc"),
              },
              {
                icon: <MapPinned className="text-teal" size={22} />,
                title: t("Pillars.topology_title"),
                desc: t("Pillars.topology_desc"),
              },
            ].map((pillar, i) => (
              <Reveal key={pillar.title} delay={i * 80}>
                <article className="card-lift h-full rounded-xl border border-border/80 bg-white/90 p-8">
                  <div className="icon-chip mb-4">{pillar.icon}</div>
                  <h3 className="mb-2 text-xl">{pillar.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{pillar.desc}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-py">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal className="mx-auto mb-14 max-w-3xl text-center">
            <h2 className="mb-3 text-3xl sm:text-4xl">
              {t("CustomEngineering.title")}
            </h2>
            <p className="text-muted">{t("CustomEngineering.subtitle")}</p>
          </Reveal>
          <div className="grid gap-10 md:grid-cols-3">
            {[
              {
                icon: <Globe2 className="text-teal" size={22} />,
                title: t("CustomEngineering.observation_title"),
                desc: t("CustomEngineering.observation_desc"),
              },
              {
                icon: <Cpu className="text-teal" size={22} />,
                title: t("CustomEngineering.logistics_title"),
                desc: t("CustomEngineering.logistics_desc"),
              },
              {
                icon: <Database className="text-teal" size={22} />,
                title: t("CustomEngineering.infrastructure_title"),
                desc: t("CustomEngineering.infrastructure_desc"),
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 80}>
                <article className="h-full">
                  <div className="icon-chip mb-4">{item.icon}</div>
                  <h3 className="mb-2 text-xl">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{item.desc}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="portfolio" className="section-py bg-bg-alt/80">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal className="mx-auto mb-14 max-w-3xl text-center">
            <h2 className="mb-3 text-3xl sm:text-4xl">{t("Portfolio.title")}</h2>
            <p className="text-muted">{t("Portfolio.subtitle")}</p>
          </Reveal>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {portfolioItems.map((item, i) => (
              <Reveal key={item.key} delay={(i % 3) * 70}>
                <article className="group h-full">
                  <div className="mb-4 overflow-hidden rounded-xl border border-border/60 bg-navy/5 shadow-[0_10px_30px_rgba(20,37,60,0.08)]">
                    <img
                      src={getAssetPath(item.image)}
                      alt={t(`Portfolio.items.${item.key}.title`)}
                      className="aspect-[16/10] w-full object-cover object-top transition duration-500 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="mb-2 text-lg">
                    {t(`Portfolio.items.${item.key}.title`)}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted">
                    {t(`Portfolio.items.${item.key}.description`)}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="contato" className="relative overflow-hidden section-py">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-[#173252] to-[#0f2a24]" />
        <div className="pointer-events-none absolute -right-20 top-0 h-72 w-72 rounded-full bg-teal/25 blur-3xl" />
        <div className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <Reveal>
            <p className="mb-3 font-[family-name:var(--font-sora)] text-sm font-semibold uppercase tracking-[0.2em] text-teal-light">
              THGIS
            </p>
            <h2 className="mb-4 text-3xl text-white sm:text-4xl">
              {t("Contact.title")}
            </h2>
            <p className="mb-9 leading-relaxed text-white/75">
              {t("Contact.description")}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={getWhatsAppUrl(locale)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2 rounded-md bg-teal px-6 py-3 text-sm font-semibold text-white hover:bg-teal-light"
              >
                {t("Contact.cta_main")}
              </a>
              <a
                href={getWhatsAppUrl(locale)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/50 hover:bg-white/10"
              >
                {t("Contact.cta_phone")}
              </a>
              <a
                href="mailto:tfholanda@gmail.com"
                className="inline-flex items-center gap-2 rounded-md border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/50 hover:bg-white/10"
              >
                <MailIcon size={16} />
                tfholanda@gmail.com
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
