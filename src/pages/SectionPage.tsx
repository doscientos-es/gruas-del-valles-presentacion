import { useParams } from 'react-router'

import { getSection, presentationSections } from '@/content/presentation'
import { NotFoundPage } from '@/pages/NotFoundPage'

export function SectionPage() {
  const { sectionId } = useParams()
  const section = getSection(sectionId)

  if (!section) {
    return <NotFoundPage />
  }

  const sectionIndex = presentationSections.indexOf(section)

  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden" data-route-content>
      <img
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-20 h-full w-full object-cover opacity-45"
        src={section.image}
      />
      <div className="absolute inset-0 -z-10 bg-linear-to-r from-[#0b0b0c] via-[#0b0b0c]/90 to-[#0b0b0c]/25" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-linear-to-t from-[#0b0b0c] to-transparent" />
      <div className="mx-auto flex min-h-[100svh] w-full max-w-[90rem] flex-col justify-center px-6 pt-28 pb-24 sm:px-10 lg:pb-28">
        <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(17rem,0.8fr)] lg:gap-16">
          <div>
            <p
              className="text-xs font-bold tracking-[0.24em] text-[#ff7777] uppercase"
              data-animate
            >
              {String(sectionIndex + 1).padStart(2, '0')} — {section.eyebrow}
            </p>
            <h1
              className="mt-5 max-w-4xl text-5xl font-semibold tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl"
              data-animate
            >
              {section.title}
            </h1>
            <p
              className="mt-6 max-w-2xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8"
              data-animate
            >
              {section.summary}
            </p>
          </div>
          <div
            className="relative self-stretch overflow-hidden border border-white/20 bg-black/20 p-5 backdrop-blur-sm sm:p-6"
            data-animate
          >
            <span
              className="absolute -top-8 -right-2 text-8xl font-semibold tracking-[-0.1em] text-white/10"
              aria-hidden="true"
            >
              {String(sectionIndex + 1).padStart(2, '0')}
            </span>
            <p className="relative text-xs font-bold tracking-[0.18em] text-white/55 uppercase">
              Idea clave
            </p>
            <p className="relative mt-5 text-xl leading-8 font-medium text-white">
              {section.details[0]?.title}
            </p>
            <p className="relative mt-3 text-sm leading-6 text-white/65">
              {section.details[0]?.description}
            </p>
          </div>
        </div>
        <ol className="mt-10 grid gap-0 border-t border-white/20 sm:grid-cols-3" data-animate>
          {section.details.map((detail, index) => (
            <li
              className="border-b border-white/20 py-5 sm:border-r sm:px-6 sm:first:pl-0 sm:last:border-r-0"
              key={detail.title}
            >
              <p className="text-xs font-bold tracking-[0.16em] text-[#ff7777] uppercase">
                {String(index + 1).padStart(2, '0')}
              </p>
              <h2 className="mt-4 text-base font-semibold text-white">{detail.title}</h2>
              <p className="mt-2 text-sm leading-6 text-white/65">{detail.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
