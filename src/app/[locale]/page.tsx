import {
  BarChart3,
  Database,
  Globe2,
  GraduationCap,
  Layers,
  Lock,
  MapPinned,
  Satellite,
} from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { getAccessRequestUrl, getAssetPath, getWhatsAppUrl } from "@/lib/utils";
import { cvLinks } from "@/data/cv";
import { privateProjects, publicProjects } from "@/data/portfolio";
import MapDecor from "@/components/MapDecor";

export const dynamic = "force-static";

const facts = [
  { value: "19", key: "articles" },
  { value: "55", key: "citations" },
  { value: "8", key: "reviewer" },
] as const;

const serviceKeys = [
  { key: "webgis", icon: Layers },
  { key: "data", icon: Database },
  { key: "field", icon: Satellite },
] as const;

const publicIcons = {
  fitec: BarChart3,
  coastal: MapPinned,
  research: Globe2,
  teaching: GraduationCap,
} as const;

const methodKeys = ["diagnosis", "structure", "application", "operation"] as const;

const toolGroups = [
  {
    label: "Dados",
    items: ["PostgreSQL", "PostGIS", "GeoServer", "GeoNode", "GDAL", "SQL"],
  },
  {
    label: "Aplicações",
    items: ["React", "TypeScript", "Mapbox GL", "Python", "R", "Streamlit"],
  },
  {
    label: "Desktop e campo",
    items: ["QGIS", "ArcGIS Pro", "Global Mapper", "Metashape", "Pix4D", "GNSS RTK/PPK"],
  },
];

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
      <section id="inicio" className="section-py relative overflow-hidden px-6">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="mb-6 flex items-center gap-4">
              <img
                src={cvLinks.avatar}
                alt={t("Hero.portrait_alt")}
                width={72}
                height={72}
                className="h-[72px] w-[72px] rounded-2xl border border-border object-cover shadow-sm"
              />
              <div>
                <p className="eyebrow mb-1">Recife / Niterói</p>
                <h1 className="text-4xl leading-none sm:text-5xl">Tiago Holanda</h1>
              </div>
            </div>
            <p className="mb-5 text-xl font-semibold text-teal sm:text-2xl">
              {t("Hero.role")}
            </p>
            <p className="mb-6 max-w-xl text-base leading-relaxed text-navy-mid sm:text-lg">
              {t("Hero.description")}
            </p>
            <p className="mb-8 max-w-xl text-sm leading-relaxed text-muted">
              {t("Hero.credentials")}
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={getWhatsAppUrl(locale)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center px-6 py-3 text-sm"
              >
                {t("Hero.cta_primary")}
              </a>
              <Link
                href="/#projetos"
                className="inline-flex items-center rounded-md border border-navy/15 bg-white px-6 py-3 text-sm font-semibold text-navy transition hover:border-navy/40"
              >
                {t("Hero.cta_secondary")}
              </Link>
            </div>
          </div>
          <MapDecor />
        </div>
      </section>

      <section className="border-y border-border/70 bg-white/70">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <dl className="grid grid-cols-3 gap-6">
            {facts.map((fact) => (
              <div key={fact.key}>
                <dt className="font-[family-name:var(--font-display)] text-3xl text-navy">
                  {fact.value}
                </dt>
                <dd className="mt-1 text-xs leading-relaxed text-muted">
                  {t(`Facts.${fact.key}`)}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="servicos" className="section-py px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="eyebrow mb-3">01</p>
            <h2 className="mb-4 text-3xl sm:text-4xl">{t("Services.title")}</h2>
            <p className="leading-relaxed text-muted">{t("Services.intro")}</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {serviceKeys.map(({ key, icon: Icon }) => (
              <article key={key} className="card p-8">
                <div className="icon-chip mb-4">
                  <Icon className="text-teal" size={20} />
                </div>
                <h3 className="mb-2 text-xl">{t(`Services.items.${key}.title`)}</h3>
                <p className="text-sm leading-relaxed text-muted">
                  {t(`Services.items.${key}.description`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="projetos" className="section-py bg-bg-alt px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="eyebrow mb-3">02</p>
            <h2 className="mb-3 text-3xl sm:text-4xl">{t("Portfolio.title")}</h2>
            <p className="leading-relaxed text-muted">{t("Portfolio.subtitle")}</p>
          </div>

          <h3 className="mb-6 text-xl">{t("Portfolio.publicTitle")}</h3>
          <div className="mb-12 grid gap-6 md:grid-cols-2">
            {publicProjects.map((item) => {
              const Icon = publicIcons[item.key];
              const image = "image" in item ? item.image : undefined;
              const href = "href" in item ? item.href : undefined;
              const content = (
                <>
                  {image ? (
                    <img
                      src={getAssetPath(image)}
                      alt={t(`Portfolio.public.${item.key}.title`)}
                      className="mb-4 aspect-[16/9] w-full rounded-lg border border-border object-cover object-top"
                    />
                  ) : (
                    <div className="icon-chip mb-4">
                      <Icon className="text-teal" size={20} />
                    </div>
                  )}
                  <h4 className="mb-2 text-lg">
                    {t(`Portfolio.public.${item.key}.title`)}
                  </h4>
                  <p className="text-sm leading-relaxed text-muted">
                    {t(`Portfolio.public.${item.key}.description`)}
                  </p>
                </>
              );

              return href ? (
                <a
                  key={item.key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card block p-5 no-underline"
                >
                  {content}
                </a>
              ) : (
                <article key={item.key} className="card p-7">
                  {content}
                </article>
              );
            })}
          </div>

          <div id="projetos-privados" className="card p-8 md:p-10">
            <div className="mb-6 flex items-start gap-3">
              <div className="icon-chip">
                <Lock className="text-teal" size={18} />
              </div>
              <div>
                <h3 className="mb-2 text-xl">{t("Portfolio.privateTitle")}</h3>
                <p className="max-w-2xl text-sm leading-relaxed text-muted">
                  {t("Portfolio.privateIntro")}
                </p>
              </div>
            </div>
            <div className="mb-8 grid gap-4 sm:grid-cols-2">
              {privateProjects.map((item) => (
                <article
                  key={item.key}
                  className="rounded-xl border border-border bg-bg-alt/80 p-5"
                >
                  <h4 className="mb-1 text-base">
                    {t(`Portfolio.items.${item.key}.title`)}
                  </h4>
                  <p className="text-sm leading-relaxed text-muted">
                    {t(`Portfolio.items.${item.key}.description`)}
                  </p>
                </article>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={getAccessRequestUrl(locale)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center px-5 py-2.5 text-sm"
              >
                {t("Portfolio.requestAccess")}
              </a>
              <Link
                href="/login"
                className="inline-flex items-center rounded-md border border-navy/15 bg-white px-5 py-2.5 text-sm font-semibold text-navy transition hover:border-navy/40"
              >
                {t("Portfolio.hasAccess")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="metodo" className="section-py px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="eyebrow mb-3">03</p>
            <h2 className="mb-3 text-3xl sm:text-4xl">{t("Method.title")}</h2>
            <p className="leading-relaxed text-muted">{t("Method.intro")}</p>
          </div>
          <ol className="grid gap-6 sm:grid-cols-2">
            {methodKeys.map((key, index) => (
              <li key={key} className="card p-7">
                <p className="eyebrow mb-3">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mb-2 text-lg">{t(`Method.steps.${key}.title`)}</h3>
                <p className="text-sm leading-relaxed text-muted">
                  {t(`Method.steps.${key}.description`)}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-y border-border/70 bg-white/70 px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 max-w-2xl">
            <h2 className="mb-2 text-2xl">{t("Stack.title")}</h2>
            <p className="text-sm text-muted">{t("Stack.note")}</p>
          </div>
          <dl className="grid gap-8 sm:grid-cols-3">
            {toolGroups.map((group) => (
              <div key={group.label}>
                <dt className="eyebrow mb-3">{group.label}</dt>
                <dd className="text-sm leading-[2] text-navy-mid">
                  {group.items.join(" · ")}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="contato" className="relative overflow-hidden px-6 py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-[#173252] to-[#12382e]" />
        <div className="pointer-events-none absolute -right-16 top-0 h-64 w-64 rounded-full bg-teal/20 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.6fr_0.4fr] md:items-end">
          <div>
            <h2 className="mb-4 text-3xl text-white sm:text-4xl">
              {t("Contact.title")}
            </h2>
            <p className="max-w-xl leading-relaxed text-white/75">
              {t("Contact.description")}
            </p>
          </div>
          <div className="flex flex-col items-start gap-4">
            <a
              href={getWhatsAppUrl(locale)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center px-6 py-3 text-sm"
            >
              {t("Contact.cta_main")}
            </a>
            <div className="text-sm text-white/70">
              <p className="mb-1">{t("Contact.cta_phone")}</p>
              <a
                href={`mailto:${t("Contact.cta_email")}`}
                className="link-underline text-white"
              >
                {t("Contact.cta_email")}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
