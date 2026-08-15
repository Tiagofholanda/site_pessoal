import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import {
  cvCopy,
  cvLinks,
  education,
  editorialBoard,
  experience,
  journalReviewer,
  publications,
  research,
  skills,
  teaching,
  type Locale,
} from "@/data/cv";

export const dynamic = "force-static";

const profileLinks = [
  { href: cvLinks.lattes, label: "Lattes" },
  { href: cvLinks.orcid, label: "ORCID" },
  { href: cvLinks.scholar, label: "Google Scholar" },
  { href: cvLinks.linkedin, label: "LinkedIn" },
  { href: cvLinks.github, label: "GitHub" },
];

export default async function CurriculumPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const lang = (locale === "en" ? "en" : "pt") as Locale;
  const copy = cvCopy[lang];

  return (
    <div className="section-py px-6">
      <div className="mx-auto max-w-3xl">
        <header className="mb-12 border-b border-border pb-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <img
              src={cvLinks.avatar}
              alt="Tiago Holanda"
              width={104}
              height={104}
              className="h-26 w-26 shrink-0 border border-border object-cover grayscale-[35%]"
            />
            <div>
              <h1 className="mb-2 text-4xl">Tiago Fernando de Holanda</h1>
              <p className="mb-4 font-[family-name:var(--font-display)] text-lg italic text-teal">
                {copy.title}
              </p>
              <p className="text-sm leading-relaxed text-muted">{copy.subtitle}</p>
            </div>
          </div>
          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-navy-mid">
            {profileLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </header>

        <section className="mb-14">
          <h2 className="mb-4 text-2xl">{copy.summaryTitle}</h2>
          <p className="text-[0.95rem] leading-[1.8] text-navy-mid">{copy.summary}</p>
        </section>

        <section className="mb-14">
          <h2 className="mb-6 text-2xl">{copy.experienceTitle}</h2>
          <ol>
            {experience.map((item, index) => (
              <li
                key={`${item.pt.org}-${item.period}`}
                className={`py-6 ${index > 0 ? "border-t border-border" : "pt-0"}`}
              >
                <p className="eyebrow mb-2">{item.period}</p>
                <h3 className="text-lg">{item[lang].role}</h3>
                <p className="mb-2 text-sm text-teal">{item[lang].org}</p>
                <p className="text-sm leading-relaxed text-navy-mid">
                  {item[lang].detail}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mb-14">
          <h2 className="mb-6 text-2xl">{copy.educationTitle}</h2>
          <ol>
            {education.map((item, index) => (
              <li
                key={`${item.pt.title}-${item.period}`}
                className={`py-6 ${index > 0 ? "border-t border-border" : "pt-0"}`}
              >
                <p className="eyebrow mb-2">{item.period}</p>
                <h3 className="text-lg">{item[lang].title}</h3>
                <p className="mb-2 text-sm text-teal">{item[lang].place}</p>
                <p className="text-sm leading-relaxed text-navy-mid">
                  {item[lang].detail}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mb-14">
          <h2 className="mb-6 text-2xl">{copy.researchTitle}</h2>
          <ol>
            {research.map((item, index) => (
              <li
                key={`${item.pt.title}-${item.period}`}
                className={`py-6 ${index > 0 ? "border-t border-border" : "pt-0"}`}
              >
                <p className="eyebrow mb-2">{item.period}</p>
                <h3 className="mb-2 text-lg">{item[lang].title}</h3>
                <p className="text-sm leading-relaxed text-navy-mid">
                  {item[lang].detail}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mb-14">
          <h2 className="mb-6 text-2xl">{copy.publicationsTitle}</h2>
          <ol>
            {publications.map((item, index) => (
              <li
                key={item.ref}
                className={`flex gap-4 py-5 ${
                  index > 0 ? "border-t border-border" : "pt-0"
                }`}
              >
                <span className="eyebrow shrink-0 pt-1">{item.year}</span>
                <p className="text-sm leading-relaxed text-navy-mid">{item.ref}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mb-14">
          <h2 className="mb-6 text-2xl">{copy.editorialTitle}</h2>
          <div className="grid gap-10 sm:grid-cols-2">
            <div>
              <h3 className="mb-4 text-base">{copy.editorialBoardTitle}</h3>
              <ul className="space-y-3">
                {editorialBoard.map((item) => (
                  <li key={`ed-${item.journal}`} className="text-sm leading-relaxed">
                    {item.period ? (
                      <span className="eyebrow mr-2">
                        {item.period} {copy.present}
                      </span>
                    ) : null}
                    <span className="text-navy-mid">{item.journal}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-base">{copy.reviewerTitle}</h3>
              <ul className="space-y-3">
                {journalReviewer.map((item) => (
                  <li
                    key={`rev-${item.journal}-${item.period}`}
                    className="text-sm leading-relaxed"
                  >
                    <span className="eyebrow mr-2">
                      {item.period} {copy.present}
                    </span>
                    <span className="text-navy-mid">{item.journal}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-14">
          <h2 className="mb-6 text-2xl">{copy.teachingTitle}</h2>
          <ul>
            {teaching.map((item, index) => (
              <li
                key={item.pt}
                className={`py-5 text-sm leading-relaxed text-navy-mid ${
                  index > 0 ? "border-t border-border" : "pt-0"
                }`}
              >
                {item[lang]}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-14">
          <h2 className="mb-6 text-2xl">{copy.skillsTitle}</h2>
          <dl className="grid gap-8 sm:grid-cols-2">
            {skills.map((item) => (
              <div key={item.pt.title}>
                <dt className="eyebrow mb-2">{item[lang].title}</dt>
                <dd className="text-sm leading-relaxed text-navy-mid">
                  {item[lang].items}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="border-t border-border pt-8">
          <Link href="/" className="link-underline text-sm text-navy">
            ← {lang === "pt" ? "Voltar ao início" : "Back to home"}
          </Link>
        </div>
      </div>
    </div>
  );
}
