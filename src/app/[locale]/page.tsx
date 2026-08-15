import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { getAssetPath, getWhatsAppUrl } from "@/lib/utils";
import { cvLinks } from "@/data/cv";
import { portfolioItems } from "@/data/portfolio";

export const dynamic = "force-static";

const facts = [
  { value: "19", key: "articles" },
  { value: "55", key: "citations" },
  { value: "8", key: "reviewer" },
  { value: "600+", key: "cities" },
] as const;

const serviceKeys = ["webgis", "data", "field"] as const;
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
      <section id="inicio" className="px-6 pb-16 pt-16 sm:pt-20">
        <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-[1.35fr_0.65fr] md:items-start">
          <div>
            <h1 className="mb-3 text-[2.6rem] leading-[1.05] sm:text-6xl">
              Tiago Holanda
            </h1>
            <p className="mb-7 font-[family-name:var(--font-display)] text-xl italic text-teal sm:text-2xl">
              {t("Hero.role")}
            </p>
            <p className="mb-7 max-w-2xl text-[1.05rem] leading-[1.75] text-navy-mid">
              {t("Hero.description")}
            </p>
            <p className="mb-8 max-w-2xl border-l-2 border-border pl-4 text-sm leading-relaxed text-muted">
              {t("Hero.credentials")}
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <a
                href={getWhatsAppUrl(locale)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-navy px-6 py-3 text-sm font-medium text-white transition hover:bg-teal"
              >
                {t("Hero.cta_primary")}
              </a>
              <Link
                href="/#projetos"
                className="link-underline text-sm font-medium text-navy"
              >
                {t("Hero.cta_secondary")}
              </Link>
            </div>
          </div>

          <figure className="order-first max-w-[220px] md:order-none md:max-w-none">
            <img
              src={cvLinks.avatar}
              alt={t("Hero.portrait_alt")}
              width={320}
              height={320}
              className="w-full border border-border object-cover grayscale-[35%]"
            />
            <figcaption className="mt-3 text-xs leading-relaxed text-muted">
              Recife / Niterói — Brasil
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="px-6">
        <div className="mx-auto max-w-5xl border-y border-border py-8">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
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
        <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-[0.4fr_0.6fr]">
          <div>
            <p className="eyebrow mb-3">01</p>
            <h2 className="mb-4 text-3xl">{t("Services.title")}</h2>
            <p className="text-sm leading-relaxed text-muted">
              {t("Services.intro")}
            </p>
          </div>
          <div>
            {serviceKeys.map((key, index) => (
              <article
                key={key}
                className={`py-7 ${index > 0 ? "border-t border-border" : "pt-0"}`}
              >
                <h3 className="mb-2 text-xl">
                  {t(`Services.items.${key}.title`)}
                </h3>
                <p className="text-sm leading-relaxed text-navy-mid">
                  {t(`Services.items.${key}.description`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="projetos" className="section-py border-t border-border bg-bg-alt px-6">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 max-w-2xl">
            <p className="eyebrow mb-3">02</p>
            <h2 className="mb-3 text-3xl">{t("Portfolio.title")}</h2>
            <p className="text-sm leading-relaxed text-muted">
              {t("Portfolio.subtitle")}
            </p>
          </div>
          <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2">
            {portfolioItems.map((item) => (
              <article key={item.key}>
                <img
                  src={getAssetPath(item.image)}
                  alt={t(`Portfolio.items.${item.key}.title`)}
                  className="mb-4 aspect-[16/10] w-full border border-border object-cover object-top"
                  loading="lazy"
                />
                <h3 className="mb-2 text-lg">
                  {t(`Portfolio.items.${item.key}.title`)}
                </h3>
                <p className="text-sm leading-relaxed text-muted">
                  {t(`Portfolio.items.${item.key}.description`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="metodo" className="section-py px-6">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 max-w-2xl">
            <p className="eyebrow mb-3">03</p>
            <h2 className="mb-3 text-3xl">{t("Method.title")}</h2>
            <p className="text-sm leading-relaxed text-muted">{t("Method.intro")}</p>
          </div>
          <ol className="grid gap-px border border-border bg-border sm:grid-cols-2">
            {methodKeys.map((key, index) => (
              <li key={key} className="bg-background p-7">
                <p className="eyebrow mb-3 text-teal">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mb-2 text-lg">
                  {t(`Method.steps.${key}.title`)}
                </h3>
                <p className="text-sm leading-relaxed text-navy-mid">
                  {t(`Method.steps.${key}.description`)}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="mx-auto max-w-5xl border-t border-border pt-10">
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

      <section id="contato" className="bg-navy px-6 py-20">
        <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-[0.55fr_0.45fr] md:items-end">
          <div>
            <h2 className="mb-4 text-3xl text-white">{t("Contact.title")}</h2>
            <p className="max-w-xl text-sm leading-relaxed text-white/70">
              {t("Contact.description")}
            </p>
          </div>
          <div className="flex flex-col items-start gap-4">
            <a
              href={getWhatsAppUrl(locale)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-white px-6 py-3 text-sm font-medium text-navy transition hover:bg-teal hover:text-white"
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
