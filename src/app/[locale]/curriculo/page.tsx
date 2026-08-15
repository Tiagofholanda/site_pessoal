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
    <div className="section-py">
      <div className="mx-auto max-w-4xl px-6">
        <header className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-start">
          <img
            src={cvLinks.avatar}
            alt="Tiago Holanda"
            width={112}
            height={112}
            className="h-28 w-28 rounded-2xl border border-border object-cover shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
          />
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-teal">
              Tiago Fernando de Holanda
            </p>
            <h1 className="mb-3 text-3xl sm:text-4xl">{copy.title}</h1>
            <p className="mb-4 leading-relaxed text-muted">{copy.subtitle}</p>
            <div className="flex flex-wrap gap-2 text-xs font-semibold">
              <a href={cvLinks.lattes} className="rounded-full border border-border bg-white px-3 py-1 text-navy hover:border-teal" target="_blank" rel="noopener noreferrer">
                Lattes
              </a>
              <a href={cvLinks.orcid} className="rounded-full border border-border bg-white px-3 py-1 text-navy hover:border-teal" target="_blank" rel="noopener noreferrer">
                ORCID
              </a>
              <a href={cvLinks.scholar} className="rounded-full border border-border bg-white px-3 py-1 text-navy hover:border-teal" target="_blank" rel="noopener noreferrer">
                Google Scholar
              </a>
              <a href={cvLinks.linkedin} className="rounded-full border border-border bg-white px-3 py-1 text-navy hover:border-teal" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              <a href={cvLinks.github} className="rounded-full border border-border bg-white px-3 py-1 text-navy hover:border-teal" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </div>
          </div>
        </header>

        <section className="mb-12 rounded-lg border border-border bg-white p-8">
          <h2 className="mb-3 text-2xl">{copy.summaryTitle}</h2>
          <p className="text-sm leading-relaxed text-muted">{copy.summary}</p>
        </section>

        <section className="mb-12">
          <h2 className="mb-6 text-2xl">{copy.experienceTitle}</h2>
          <ol className="space-y-5">
            {experience.map((item) => (
              <li
                key={`${item.pt.org}-${item.period}`}
                className="rounded-lg border border-border bg-white p-6"
              >
                <p className="mb-1 text-xs font-bold uppercase tracking-wide text-teal">
                  {item.period}
                </p>
                <h3 className="text-lg">{item[lang].role}</h3>
                <p className="mb-2 text-sm font-medium text-navy-mid">{item[lang].org}</p>
                <p className="text-sm leading-relaxed text-muted">{item[lang].detail}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mb-12">
          <h2 className="mb-6 text-2xl">{copy.educationTitle}</h2>
          <ol className="space-y-5">
            {education.map((item) => (
              <li
                key={`${item.pt.title}-${item.period}`}
                className="rounded-lg border border-border bg-white p-6"
              >
                <p className="mb-1 text-xs font-bold uppercase tracking-wide text-teal">
                  {item.period}
                </p>
                <h3 className="text-lg">{item[lang].title}</h3>
                <p className="mb-2 text-sm font-medium text-navy-mid">{item[lang].place}</p>
                <p className="text-sm leading-relaxed text-muted">{item[lang].detail}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mb-12">
          <h2 className="mb-6 text-2xl">{copy.researchTitle}</h2>
          <ol className="space-y-5">
            {research.map((item) => (
              <li
                key={`${item.pt.title}-${item.period}`}
                className="rounded-lg border border-border bg-white p-6"
              >
                <p className="mb-1 text-xs font-bold uppercase tracking-wide text-teal">
                  {item.period}
                </p>
                <h3 className="text-lg">{item[lang].title}</h3>
                <p className="text-sm leading-relaxed text-muted">{item[lang].detail}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mb-12">
          <h2 className="mb-6 text-2xl">{copy.publicationsTitle}</h2>
          <ol className="space-y-4">
            {publications.map((item) => (
              <li key={item.ref} className="rounded-lg border border-border bg-white p-5">
                <p className="mb-1 text-xs font-bold text-teal">{item.year}</p>
                <p className="text-sm leading-relaxed text-muted">{item.ref}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mb-12">
          <h2 className="mb-6 text-2xl">{copy.teachingTitle}</h2>
          <ul className="space-y-3">
            {teaching.map((item) => (
              <li
                key={item.pt}
                className="rounded-lg border border-border bg-white p-5 text-sm leading-relaxed text-muted"
              >
                {item[lang]}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="mb-6 text-2xl">{copy.editorialTitle}</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-border bg-white p-6">
              <h3 className="mb-4 text-lg text-teal">{copy.editorialBoardTitle}</h3>
              <ul className="space-y-3">
                {editorialBoard.map((item) => (
                  <li key={`ed-${item.journal}`} className="text-sm leading-relaxed">
                    {item.period ? (
                      <span className="mr-2 text-xs font-bold uppercase tracking-wide text-teal">
                        {item.period} {copy.present}
                      </span>
                    ) : null}
                    <span className="text-muted">{item.journal}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border border-border bg-white p-6">
              <h3 className="mb-4 text-lg text-teal">{copy.reviewerTitle}</h3>
              <ul className="space-y-3">
                {journalReviewer.map((item) => (
                  <li key={`rev-${item.journal}-${item.period}`} className="text-sm leading-relaxed">
                    <span className="mr-2 text-xs font-bold uppercase tracking-wide text-teal">
                      {item.period} {copy.present}
                    </span>
                    <span className="text-muted">{item.journal}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-6 text-2xl">{copy.skillsTitle}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {skills.map((item) => (
              <article key={item.pt.title} className="rounded-lg border border-border bg-white p-5">
                <h3 className="mb-2 text-base">{item[lang].title}</h3>
                <p className="text-sm leading-relaxed text-muted">{item[lang].items}</p>
              </article>
            ))}
          </div>
        </section>

        <p className="text-center text-sm text-muted">
          <Link href="/" className="font-semibold text-teal">
            ← {lang === "pt" ? "Voltar ao início" : "Back to home"}
          </Link>
        </p>
      </div>
    </div>
  );
}
