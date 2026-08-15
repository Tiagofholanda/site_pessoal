import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";

export const dynamic = "force-static";

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isPt = locale === "pt";

  return (
    <article className="section-py mx-auto max-w-3xl px-6">
      <h1 className="mb-6 text-3xl">{isPt ? "Termos de Uso" : "Terms of Use"}</h1>
      <div className="space-y-4 text-sm leading-relaxed text-muted">
        <p>
          {isPt
            ? "O conteúdo deste site descreve serviços de consultoria e arquitetura GIS oferecidos por Tiago Holanda. Diagnósticos gratuitos não constituem contrato de prestação de serviço."
            : "The content of this website describes GIS consulting and architecture services offered by Tiago Holanda. Free diagnoses do not constitute a service contract."}
        </p>
        <p>
          {isPt
            ? "Marcas e tecnologias mencionadas (PostGIS, GeoServer, QGIS e outras) pertencem aos respectivos detentores."
            : "Mentioned brands and technologies (PostGIS, GeoServer, QGIS and others) belong to their respective owners."}
        </p>
      </div>
      <Link href="/" className="mt-8 inline-block text-sm font-semibold text-teal">
        ← {isPt ? "Voltar" : "Back"}
      </Link>
    </article>
  );
}
