import type { ReactNode } from "react";
import { useParams } from "react-router";

import { getSection, presentationSections } from "@/content/presentation";
import { NotFoundPage } from "@/pages/NotFoundPage";

type SlideProps = {
  section: NonNullable<ReturnType<typeof getSection>>;
  index: number;
};

function SlideFrame({
  children,
  section,
}: {
  children: ReactNode;
  section: SlideProps["section"];
}) {
  return (
    <section
      className="relative isolate min-h-[100svh] overflow-hidden bg-[#0b0b0c]"
      data-route-content
    >
      <img
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-20 h-full w-full object-cover opacity-40"
        data-route-background
        src={section.image}
      />
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-[#09090a]/90 via-[#09090a]/72 to-[#09090a]/45" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-linear-to-t from-[#09090a]/80 to-transparent" />
      {children}
    </section>
  );
}

function SafetySlide({ section, index }: SlideProps) {
  return (
    <SlideFrame section={section}>
      <div className="mx-auto grid min-h-[100svh] max-w-[90rem] items-center gap-8 px-6 pt-28 pb-24 sm:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <p
            className="text-xs font-bold tracking-[0.24em] text-[#ff7777] uppercase"
            data-animate
          >
            0{index + 1} · {section.eyebrow}
          </p>
          <h1
            className="mt-5 max-w-xl text-5xl font-semibold tracking-[-0.055em] text-white sm:text-6xl"
            data-animate
          >
            {section.title}
          </h1>
          <p
            className="mt-6 max-w-lg text-base leading-7 text-white/75 sm:text-lg sm:leading-8"
            data-animate
          >
            {section.summary}
          </p>
          <dl className="mt-10 border-t border-white/20" data-animate>
            {section.details.map((detail, detailIndex) => (
              <div
                className="grid grid-cols-[2rem_1fr] gap-4 border-b border-white/20 py-5"
                key={detail.title}
              >
                <dt className="text-sm font-bold text-[#ff7777]">
                  0{detailIndex + 1}
                </dt>
                <dd>
                  <h2 className="font-semibold text-white">{detail.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-white/65">
                    {detail.description}
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="grid grid-cols-[1.35fr_0.65fr] gap-3" data-animate>
          <img
            alt="Operación industrial de Grúas del Vallès."
            className="h-[28rem] w-full object-cover sm:h-[38rem]"
            src="/media/operacion-industrial-ltm1350-2021.avif"
          />
          <div className="flex flex-col justify-between border border-white/20 bg-[#161618] p-5 sm:p-7">
            <p className="text-xs font-bold tracking-[0.18em] text-white/55 uppercase">
              Método
            </p>
            <p className="text-3xl font-semibold tracking-[-0.05em] text-white">
              Planificar.
              <br />
              Revisar.
              <br />
              Ejecutar.
            </p>
            <p className="text-sm leading-6 text-white/65">
              Estudio previo y control técnico para cada maniobra.
            </p>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

function FleetSlide({ section, index }: SlideProps) {
  return (
    <SlideFrame section={section}>
      <div className="mx-auto flex min-h-[100svh] max-w-[90rem] flex-col px-6 pt-28 pb-24 sm:px-10">
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
          <div>
            <p
              className="text-xs font-bold tracking-[0.24em] text-[#ff7777] uppercase"
              data-animate
            >
              0{index + 1} · {section.eyebrow}
            </p>
            <h1
              className="mt-5 max-w-4xl text-5xl font-semibold tracking-[-0.06em] text-white sm:text-7xl"
              data-animate
            >
              {section.title}
            </h1>
          </div>
          <p className="max-w-xs text-sm leading-6 text-white/70" data-animate>
            {section.summary}
          </p>
        </div>
        <div
          className="relative mt-8 min-h-[22rem] flex-1 border-y border-white/20"
          data-animate
        >
          <img
            alt={section.imageAlt}
            className="absolute inset-0 h-full w-full object-cover object-center"
            src={section.image}
          />
          <div className="absolute inset-0 bg-linear-to-r from-black/70 via-transparent to-transparent" />
          <ol
            className="absolute top-0 right-0 w-full max-w-[18rem] divide-y divide-white/20 border-b border-l border-white/20 bg-[#09090a]/80 backdrop-blur-sm"
            data-animate
          >
            {[
              ["700 Tn", "Liebherr LTM 1500-8.1"],
              ["400 Tn", "Liebherr LTM 1400-7.1"],
              ["350 Tn", "Liebherr LTM 1350-6.1"],
            ].map(([capacity, model], fleetIndex) => (
              <li className="flex items-center gap-4 px-4 py-3" key={model}>
                <span className="text-xs font-bold text-[#ff7777]">
                  0{fleetIndex + 1}
                </span>
                <span className="flex-1 text-xs font-semibold text-white">
                  {model}
                </span>
                <span className="text-xs font-bold text-white/65">
                  {capacity}
                </span>
              </li>
            ))}
          </ol>
          <p className="absolute bottom-5 left-0 text-[clamp(5rem,18vw,15rem)] leading-none font-semibold tracking-[-0.1em] text-white">
            700<span className="ml-3 text-[0.22em] tracking-normal">Tn</span>
          </p>
          <p className="absolute right-0 bottom-6 max-w-44 border-l border-[#ff7777] pl-4 text-xs leading-5 text-white/80 uppercase">
            La grúa de referencia de la flota corporativa.
          </p>
        </div>
        <dl
          className="grid border-b border-white/20 sm:grid-cols-3"
          data-animate
        >
          {section.details.map((detail) => (
            <div
              className="border-r border-white/20 py-5 sm:px-6 sm:first:pl-0 sm:last:border-r-0"
              key={detail.title}
            >
              <dt className="text-sm font-semibold text-white">
                {detail.title}
              </dt>
              <dd className="mt-2 text-sm leading-6 text-white/65">
                {detail.description}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </SlideFrame>
  );
}

function TeamSlide({ section, index }: SlideProps) {
  return (
    <SlideFrame section={section}>
      <div className="mx-auto grid min-h-[100svh] max-w-[90rem] items-center gap-10 px-6 pt-28 pb-24 sm:px-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="border-l-2 border-[#ed2828] pl-6" data-animate>
          <p className="text-xs font-bold tracking-[0.24em] text-[#ff7777] uppercase">
            0{index + 1} · {section.eyebrow}
          </p>
          <h1 className="mt-6 max-w-sm text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">
            {section.title}
          </h1>
          <p className="mt-10 text-7xl font-semibold tracking-[-0.08em] text-white sm:text-9xl">
            1968
          </p>
          <p className="mt-2 text-sm text-white/65">Inicio de actividad</p>
          <p className="mt-16 max-w-sm text-base leading-7 text-white/75">
            {section.summary}
          </p>
        </div>
        <div>
          <img
            alt={section.imageAlt}
            className="h-[22rem] w-full object-cover sm:h-[29rem]"
            data-animate
            src="/media/hero-grua-accion-2024-01.avif"
          />
          <div
            className="grid border-b border-white/20 sm:grid-cols-3"
            data-animate
          >
            {section.details.map((detail) => (
              <article
                className="border-r border-white/20 py-5 sm:px-5 sm:first:pl-0 sm:last:border-r-0"
                key={detail.title}
              >
                <h2 className="text-base font-semibold text-white">
                  {detail.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-white/65">
                  {detail.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

function ProjectsSlide({ section, index }: SlideProps) {
  const projects = [
    {
      alt: "Operación industrial de Grúas del Vallès en el puerto de Barcelona.",
      detail: section.details[0],
      images: ["/media/operacion-puerto-2020.avif"],
    },
    {
      alt: "Grúa de Grúas del Vallès durante una operación de construcción.",
      detail: section.details[1],
      images: ["/media/operacion-hospital.avif"],
    },
    {
      alt: "Operaciones de Grúas del Vallès para eventos e infraestructuras.",
      detail: section.details[2],
      images: [
        "/media/operacion-evento-2023.avif",
        "/media/operacion-pasarela-sant-celoni.avif",
      ],
    },
  ] as const;

  return (
    <SlideFrame section={section}>
      <div className="mx-auto flex min-h-[100svh] max-w-[90rem] flex-col px-6 pt-28 pb-24 sm:px-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.7fr]">
          <div>
            <p
              className="text-xs font-bold tracking-[0.24em] text-[#ff7777] uppercase"
              data-animate
            >
              0{index + 1} · {section.eyebrow}
            </p>
            <h1
              className="mt-5 text-5xl font-semibold tracking-[-0.055em] text-white sm:text-7xl"
              data-animate
            >
              {section.title}
            </h1>
          </div>
          <p
            className="self-end text-base leading-7 text-white/75"
            data-animate
          >
            {section.summary}
          </p>
        </div>
        <div
          className="mt-10 grid flex-1 gap-3 lg:min-h-0 lg:grid-cols-[1.15fr_0.85fr_1fr]"
          data-animate
        >
          {projects.map(({ alt, detail, images }, projectIndex) => (
            <figure
              className="relative min-h-64 overflow-hidden bg-[#171719] lg:min-h-0"
              key={detail.title}
            >
              <div
                className={`grid h-full grid-cols-1 gap-px bg-[#0b0b0c] ${images.length === 2 ? "grid-rows-2" : ""}`}
              >
                {images.map((src) => (
                  <img
                    alt={images.length === 1 ? alt : ""}
                    className="h-full min-h-0 w-full object-cover"
                    key={src}
                    src={src}
                  />
                ))}
              </div>
              <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#09090a]/95 via-[#09090a]/24 to-transparent" />
              <figcaption className="absolute right-0 bottom-0 left-0 p-5 sm:p-6">
                <span className="text-xs font-bold text-[#ff7777]">
                  0{projectIndex + 1}
                </span>
                <h2 className="mt-2 text-lg font-semibold tracking-[-0.03em] text-white">
                  {detail.title}
                </h2>
                <p className="mt-2 max-w-sm text-sm leading-6 text-white/75">
                  {detail.description}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </SlideFrame>
  );
}

function ContactSlide({ section, index }: SlideProps) {
  return (
    <SlideFrame section={section}>
      <div className="mx-auto grid min-h-[100svh] max-w-[90rem] items-center gap-10 px-6 pt-28 pb-24 sm:px-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p
            className="text-xs font-bold tracking-[0.24em] text-[#ff7777] uppercase"
            data-animate
          >
            0{index + 1} · {section.eyebrow}
          </p>
          <h1
            className="mt-5 max-w-3xl text-5xl font-semibold tracking-[-0.055em] text-white sm:text-7xl"
            data-animate
          >
            {section.title}
          </h1>
          <p
            className="mt-6 max-w-xl text-base leading-7 text-white/75 sm:text-lg"
            data-animate
          >
            {section.summary}
          </p>
          <h2
            className="mt-10 max-w-lg border-l-2 border-[#ed2828] pl-5 text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl"
            data-animate
          >
            Preparados para la próxima maniobra.
          </h2>
          <div
            className="mt-8 grid gap-x-8 gap-y-6 border-t border-white/20 pt-6 sm:grid-cols-2"
            data-animate
          >
            {section.details.map((detail) => (
              <article key={detail.title}>
                <h2 className="text-xs font-bold tracking-[0.16em] text-[#ff7777] uppercase">
                  {detail.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-white/80">
                  {detail.description}
                </p>
              </article>
            ))}
          </div>
        </div>
        <figure className="relative" data-animate>
          <img
            alt="Grúa de Grúas del Vallès durante una operación."
            className="h-[28rem] w-full object-cover"
            src="/media/operacion-construccion-2024.avif"
          />
          <figcaption className="absolute right-5 bottom-5 left-5 border-l-2 border-[#ed2828] bg-[#0b0b0c]/90 p-4 text-sm leading-6 text-white/80">
            <a
              className="font-bold text-white hover:text-[#ff7777]"
              href="tel:+34938497022"
            >
              93 849 70 22
            </a>
            <p className="mt-2">
              Estudio técnico, planificación y respuesta para cada operación.
            </p>
          </figcaption>
        </figure>
      </div>
    </SlideFrame>
  );
}

export function SectionPage() {
  const { sectionId } = useParams();
  const section = getSection(sectionId);

  if (!section) {
    return <NotFoundPage />;
  }

  const sectionIndex = presentationSections.indexOf(section);

  const props = { section, index: sectionIndex };
  if (section.id === "seguridad") return <SafetySlide {...props} />;
  if (section.id === "flota") return <FleetSlide {...props} />;
  if (section.id === "equipo") return <TeamSlide {...props} />;
  if (section.id === "casos-de-exito") return <ProjectsSlide {...props} />;
  return <ContactSlide {...props} />;
}
