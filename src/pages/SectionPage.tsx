import { ArrowRight } from "lucide-react";
import { Link, useParams } from "react-router";
import { getSection, presentationSections } from "@/content/presentation";
import { NotFoundPage } from "@/pages/NotFoundPage";

export function SectionPage() {
  const { sectionId } = useParams();
  const section = getSection(sectionId);

  if (!section) {
    return <NotFoundPage />;
  }

  const nextSection =
    presentationSections[
      (presentationSections.indexOf(section) + 1) % presentationSections.length
    ];
  const isLastSection = section.id === presentationSections.at(-1)?.id;

  return (
    <section
      className="mx-auto w-full max-w-6xl px-6 pb-14 pt-12 sm:px-10 lg:pb-24 lg:pt-16"
      data-route-content
    >
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div data-animate>
          <p className="text-sm font-semibold tracking-[0.16em] text-[#d60b0c] uppercase">
            {section.eyebrow}
          </p>
          <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight text-[#121212] sm:text-5xl">
            {section.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#4b4b4b]">
            {section.summary}
          </p>
        </div>
        <div className="relative overflow-hidden bg-[#121212]" data-animate>
          <img
            alt={section.imageAlt}
            className="aspect-16/10 w-full object-cover opacity-90"
            loading="lazy"
            src={section.image}
          />
          <span className="absolute right-0 bottom-0 bg-[#d60b0c] px-4 py-2 text-xs font-bold tracking-[0.12em] text-white uppercase">
            Grúas del Vallès
          </span>
        </div>
      </div>

      <div className="mt-12 grid gap-3 sm:grid-cols-3">
        {section.details.map((detail, index) => (
          <article
            className="border border-black/10 bg-[#f6f6f7] p-5 sm:p-6"
            data-animate
            key={detail.title}
          >
            <p className="text-sm font-semibold text-[#d60b0c]">0{index + 1}</p>
            <h2 className="mt-8 text-lg font-semibold text-[#121212]">
              {detail.title}
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#4b4b4b]">
              {detail.description}
            </p>
          </article>
        ))}
      </div>

      <Link
        className="mt-10 inline-flex items-center gap-2 bg-[#d60b0c] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#a80909] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d60b0c] focus-visible:ring-offset-2"
        data-animate
        to={isLastSection ? "/" : `/${nextSection.id}`}
      >
        {isLastSection
          ? "Volver al índice"
          : `Continuar con ${nextSection.label}`}
        <ArrowRight aria-hidden="true" size={17} />
      </Link>
    </section>
  );
}
