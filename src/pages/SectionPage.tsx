import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'

import {
  contactPeople,
  fleetAgeStatistics,
  getSection,
  presentationSections,
} from '@/content/presentation'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { useReducedMotion } from '@/shared/hooks/useReducedMotion'

type SlideProps = {
  section: NonNullable<ReturnType<typeof getSection>>
  index: number
}

const fleetHighlights = [
  {
    category: 'Gran tonelaje',
    image: '/media/flota-liebherr-ltm1650-8-1-01.avif',
    model: 'Liebherr LTM 1650-8.1',
    specification: '700 Tn',
  },
  {
    category: 'Gran tonelaje',
    image: '/media/flota-liebherr-ltm1500-8-1-01.avif',
    model: 'Liebherr LTM 1500-8.1',
    specification: '500 Tn',
  },
  {
    category: 'Gran tonelaje',
    image: '/media/flota-liebherr-ltm1400-7-1-01.avif',
    model: 'Liebherr LTM 1400-7.1',
    specification: '400 Tn',
  },
  {
    category: 'Gran tonelaje',
    image: '/media/flota-liebherr-ltm1350-6-1-01.avif',
    model: 'Liebherr LTM 1350-6.1',
    specification: '350 Tn',
  },
  {
    category: 'Gran tonelaje',
    image: '/media/flota-grove-gmk5250xl-1-01.avif',
    model: 'Grove GMK 5250XL-1',
    specification: '250 Tn',
  },
  {
    category: 'Móvil autopropulsada',
    image: '/media/flota-grove-gmt5150l-01.avif',
    model: 'Grove GMT 5150L',
    specification: '150 Tn',
  },
  {
    category: 'Móvil autopropulsada',
    image: '/media/flota-liebherr-ltm1110-5-2-01.avif',
    model: 'Liebherr LTM 1110-5.2',
    specification: '110 Tn',
  },
  {
    category: 'Móvil autopropulsada',
    image: '/media/flota-liebherr-ltm1100-5-3-01.avif',
    model: 'Liebherr LTM 1100-5.3',
    specification: '100 Tn',
  },
  {
    category: 'Móvil autopropulsada',
    image: '/media/flota-liebherr-ltm1090-4-2-01.avif',
    model: 'Liebherr LTM 1090-4.2',
    specification: '90 Tn',
  },
  {
    category: 'Móvil autopropulsada',
    image: '/media/flota-grove-gmk4080l-01.avif',
    model: 'Grove GMK 4080L',
    specification: '80 Tn',
  },
  {
    category: 'Móvil autopropulsada',
    image: '/media/flota-demag-ac80-2-01.avif',
    model: 'Demag AC 80-2',
    specification: '80 Tn',
  },
  {
    category: 'Móvil autopropulsada',
    image: '/media/flota-grove-gmk3060l-01.avif',
    model: 'Grove GMK 3060L',
    specification: '60 Tn',
  },
  {
    category: 'Móvil autopropulsada',
    image: '/media/flota-liebherr-ltc1050-3-1-01.avif',
    model: 'Liebherr LTC 1050-3.1',
    specification: '50 Tn',
  },
  {
    category: 'Móvil autopropulsada',
    image: '/media/flota-liebherr-ltm1040-2-1-01.avif',
    model: 'Liebherr LTM 1040-2.1',
    specification: '40 Tn',
  },
  {
    category: 'Construcción',
    image: '/media/flota-spierings-sk1265-at6-01.avif',
    model: 'Spierings SK1265-AT6',
    specification: '60 m de pluma',
  },
  {
    category: 'Construcción',
    image: '/media/flota-liebherr-mk88-4-1-01.avif',
    model: 'Liebherr MK 88-4.1',
    specification: '45 m de pluma',
  },
  {
    category: 'Camión-grúa',
    image: '/media/flota-camion-grua-200tm-01.avif',
    model: 'Palfinger PK200002L SH',
    specification: '200 tm · 50 m',
  },
  {
    category: 'Camión-grúa',
    image: '/media/flota-camion-grua-165tm-01.avif',
    model: 'Palfinger PK 165002L SH',
    specification: '165 tm · 45 m',
  },
  {
    category: 'Camión-grúa',
    image: '/media/flota-camion-grua-110tm-01.avif',
    model: 'Palfinger PK 11002SH',
    specification: '110 tm · 36 m',
  },
  {
    category: 'Camión-grúa',
    image: '/media/flota-camion-grua-80tm-01.avif',
    model: 'Palfinger PK 78002',
    specification: '80 tm · 23 m',
  },
  {
    category: 'Camión-grúa',
    image: '/media/flota-camion-grua-60tm-01.avif',
    model: 'Palfinger PK 580 TEC',
    specification: '60 tm · 30 m',
  },
  {
    category: 'Camión-grúa',
    image: '/media/flota-camion-grua-jib-55tm-29m-01.avif',
    model: 'Fassi F545 RA.2.26 XE Dynamic',
    specification: '55 tm · 29 m',
  },
  {
    category: 'Camión-grúa',
    image: '/media/flota-camion-grua-36tm-01.avif',
    model: 'Fassi F365 RA2.28 Dynamic',
    specification: '36 tm · 23 m',
  },
  {
    category: 'Vehículo auxiliar',
    image: '/media/flota-carretilla-diesel-9tm-01.avif',
    model: 'Linde H80/900 D',
    specification: 'Carretilla diésel · 9 t',
  },
] as const

function SlideFrame({
  children,
  section,
  scrollable = false,
}: {
  children: ReactNode
  section: SlideProps['section']
  scrollable?: boolean
}) {
  return (
    <section
      className={`relative isolate min-h-[100svh] bg-[#0b0b0c] ${scrollable ? 'overflow-x-hidden' : 'overflow-hidden'}`}
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
  )
}

function SafetySlide({ section, index }: SlideProps) {
  return (
    <SlideFrame section={section}>
      <div className="mx-auto grid min-h-[100svh] max-w-[90rem] items-center gap-8 px-6 pt-28 pb-24 sm:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <p className="text-xs font-bold tracking-[0.24em] text-[#ff7777] uppercase" data-animate>
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
                <dt className="text-sm font-bold text-[#ff7777]">0{detailIndex + 1}</dt>
                <dd>
                  <h2 className="font-semibold text-white">{detail.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-white/65">{detail.description}</p>
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
            <p className="text-xs font-bold tracking-[0.18em] text-white/55 uppercase">Método</p>
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
  )
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
        <div className="relative mt-8 min-h-[26rem] flex-1 border-y border-white/20" data-animate>
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
              ['700 Tn', 'Liebherr LTM 1650-8.1'],
              ['500 Tn', 'Liebherr LTM 1500-8.1'],
              ['400 Tn', 'Liebherr LTM 1400-7.1'],
              ['350 Tn', 'Liebherr LTM 1350-6.1'],
            ].map(([capacity, model], fleetIndex) => (
              <li className="flex items-center gap-4 px-4 py-3" key={model}>
                <span className="text-xs font-bold text-[#ff7777]">0{fleetIndex + 1}</span>
                <span className="flex-1 text-xs font-semibold text-white">{model}</span>
                <span className="text-xs font-bold text-white/65">{capacity}</span>
              </li>
            ))}
          </ol>
          <p className="absolute bottom-5 left-0 text-[clamp(5rem,18vw,15rem)] leading-none font-semibold -tracking-widest text-white">
            700<span className="ml-3 text-[0.22em] tracking-normal">Tn</span>
          </p>
        </div>
        <dl className="grid border-b border-white/20 sm:grid-cols-3" data-animate>
          {section.details.map((detail) => (
            <div
              className="border-r border-white/20 py-5 sm:px-6 sm:first:pl-0 sm:last:border-r-0"
              key={detail.title}
            >
              <dt className="text-sm font-semibold text-white">{detail.title}</dt>
              <dd className="mt-2 text-sm leading-6 text-white/65">{detail.description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </SlideFrame>
  )
}

function FleetOverviewSlide({ section, index }: SlideProps) {
  return (
    <SlideFrame scrollable section={section}>
      <div className="mx-auto flex h-[100svh] max-w-[90rem] flex-col px-6 pt-28 pb-24 sm:px-10">
        <div className="grid items-end gap-6 lg:grid-cols-[1fr_minmax(18rem,0.55fr)]">
          <div>
            <p
              className="text-xs font-bold tracking-[0.24em] text-[#ff7777] uppercase"
              data-animate
            >
              0{index + 1} · {section.eyebrow}
            </p>
            <h1
              className="mt-5 max-w-4xl text-4xl font-semibold tracking-[-0.06em] text-white sm:text-6xl"
              data-animate
            >
              {section.title}
            </h1>
          </div>
          <p className="max-w-md text-sm leading-6 text-white/70" data-animate>
            {section.summary}
          </p>
        </div>
        <ul
          aria-label="Flota disponible"
          className="mt-8 grid min-h-0 flex-1 grid-cols-2 content-start gap-px overflow-y-auto overscroll-contain border border-white/20 bg-white/20 pr-1 sm:grid-cols-3 lg:grid-cols-4"
          data-animate
        >
          {fleetHighlights.map((vehicle) => (
            <li
              className="group relative min-h-44 overflow-hidden bg-[#111114] p-4 sm:p-5"
              key={vehicle.model}
            >
              <img
                alt={vehicle.model}
                className="absolute inset-0 h-full w-full object-contain p-4 opacity-85 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
                src={vehicle.image}
              />
              <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#09090a] via-[#09090a]/18 to-[#09090a]/40" />
              <p className="relative inline-block rounded-full bg-black/70 px-1.5 py-0.5 text-[0.62rem] font-bold text-white/60 uppercase">
                {vehicle.category}
              </p>
              <div className="absolute right-4 bottom-4 left-4 sm:right-5 sm:bottom-5 sm:left-5">
                <p className="text-xl font-semibold tracking-[-0.05em] text-white sm:text-2xl">
                  {vehicle.specification}
                </p>
                <h2 className="mt-1 text-xs font-semibold text-white/80">{vehicle.model}</h2>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </SlideFrame>
  )
}

function FleetStatisticsSlide({ section, index }: SlideProps) {
  return (
    <SlideFrame section={section}>
      <div className="mx-auto flex min-h-[100svh] max-w-[90rem] flex-col px-6 pt-28 pb-24 sm:px-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.65fr]">
          <div>
            <p
              className="text-xs font-bold tracking-[0.24em] text-[#ff7777] uppercase"
              data-animate
            >
              0{index + 1} · {section.eyebrow}
            </p>
            <h1
              className="mt-5 max-w-4xl text-4xl font-semibold tracking-[-0.06em] text-white sm:text-6xl"
              data-animate
            >
              {section.title}
            </h1>
          </div>
          <p className="self-end text-sm leading-6 text-white/70" data-animate>
            {section.summary}
          </p>
        </div>
        <div className="mt-8 grid gap-4 lg:grid-cols-2" data-animate>
          {fleetAgeStatistics.map((statistic) => (
            <FleetAgeDonut key={statistic.title} statistic={statistic} />
          ))}
        </div>
      </div>
    </SlideFrame>
  )
}

function FleetAgeDonut({ statistic }: { statistic: (typeof fleetAgeStatistics)[number] }) {
  const total = statistic.data.reduce((sum, segment) => sum + segment.value, 0)
  let progress = 0
  const gradient = statistic.data
    .filter((segment) => segment.value > 0)
    .map((segment) => {
      const start = (progress / total) * 100
      progress += segment.value
      return `${segment.color} ${start}% ${(progress / total) * 100}%`
    })
    .join(', ')

  return (
    <article className="flex min-h-72 flex-col justify-between border border-white/20 bg-[#111114]/85 p-6 sm:p-8">
      <div>
        <h2 className="max-w-md text-2xl font-semibold tracking-[-0.05em] text-white">
          {statistic.title}
        </h2>
        <p className="mt-2 max-w-md text-sm leading-6 text-white/65">{statistic.summary}</p>
      </div>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-8 sm:flex-nowrap">
        <div
          aria-label={`${statistic.title}: antigüedad media de ${statistic.average} años`}
          className="grid h-48 w-48 shrink-0 place-items-center rounded-full p-5"
          data-fleet-age-donut
          role="img"
          style={{ background: `conic-gradient(${gradient})` }}
        >
          <div className="flex h-full w-full flex-col items-center justify-center gap-0.5 rounded-full bg-[#111114] text-center">
            <strong className="text-5xl leading-none font-semibold tracking-[-0.08em] text-white">
              {statistic.average}
            </strong>
            <span className="text-[0.65rem] leading-none font-bold tracking-[0.14em] text-white/60 uppercase">
              años de media
            </span>
          </div>
        </div>
        <ul className="min-w-40 space-y-2.5 text-sm text-white/75">
          {statistic.data.map((segment) => (
            <li className="flex items-center justify-between gap-5" key={segment.label}>
              <span className="flex items-center gap-2">
                <i
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: segment.color }}
                />
                {segment.label}
              </span>
              <strong className="text-white">{segment.value}%</strong>
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}

const teamManeuvers = [
  {
    src: '/media/maniobras/20171124_100840.jpg',
    alt: 'Maniobra de Grúas del Vallès, noviembre de 2017.',
  },
  {
    src: '/media/maniobras/2019 12 BARCELONE GROUPE F QD2019-5303F[2].jpg',
    alt: 'Maniobra de Grúas del Vallès en Barcelona, 2019.',
  },
  {
    src: "/media/maniobras/CapD'Any 2022 Maria Cristina.jpg",
    alt: "Maniobra de Grúas del Vallès en Cap d'Any 2022.",
  },
  {
    src: '/media/maniobras/IMG-20181215-WA0004.jpg',
    alt: 'Maniobra de Grúas del Vallès, diciembre de 2018.',
  },
  {
    src: '/media/maniobras/IMG-20201126-WA0002.jpg',
    alt: 'Maniobra de Grúas del Vallès, noviembre de 2020.',
  },
  {
    src: '/media/maniobras/IMG-20210322-WA0003.jpg',
    alt: 'Maniobra de Grúas del Vallès, marzo de 2021.',
  },
  {
    src: '/media/maniobras/IMG-20220719-WA0008.jpg',
    alt: 'Maniobra de Grúas del Vallès, julio de 2022.',
  },
  {
    src: '/media/maniobras/IMG-20220728-WA0018.jpg',
    alt: 'Maniobra de Grúas del Vallès, julio de 2022.',
  },
] as const

function TeamManeuverCarousel() {
  const [activeImage, setActiveImage] = useState(0)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) return
    const interval = window.setInterval(() => {
      setActiveImage((current) => (current + 1) % teamManeuvers.length)
    }, 6000)
    return () => window.clearInterval(interval)
  }, [prefersReducedMotion])

  return (
    <div className="relative h-[22rem] overflow-hidden sm:h-[29rem]" data-animate>
      {!prefersReducedMotion ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center gap-3 p-4"
          data-team-maneuver-progress
        >
          <div className="h-px flex-1 overflow-hidden bg-white/25">
            <span
              className="home-background-progress block h-full origin-left bg-[#ed2828]"
              key={activeImage}
              style={{ animationDuration: '6s' }}
            />
          </div>
          <span className="text-[0.65rem] font-bold tracking-[0.16em] text-white/75 tabular-nums">
            {String(activeImage + 1).padStart(2, '0')} /{' '}
            {String(teamManeuvers.length).padStart(2, '0')}
          </span>
        </div>
      ) : null}
      {teamManeuvers.map((image, imageIndex) => (
        <img
          alt={imageIndex === activeImage ? image.alt : ''}
          aria-hidden={imageIndex === activeImage ? undefined : true}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1500ms] motion-reduce:transition-none ${imageIndex === activeImage ? 'opacity-100' : 'opacity-0'}`}
          key={image.src}
          src={image.src}
        />
      ))}
    </div>
  )
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
          <p className="mt-16 max-w-sm text-base leading-7 text-white/75">{section.summary}</p>
        </div>
        <div>
          <TeamManeuverCarousel />
          <div className="grid border-b border-white/20 sm:grid-cols-3" data-animate>
            {section.details.map((detail) => (
              <article
                className="border-r border-white/20 py-5 sm:px-5 sm:first:pl-0 sm:last:border-r-0"
                key={detail.title}
              >
                <h2 className="text-base font-semibold text-white">{detail.title}</h2>
                <p className="mt-2 text-sm leading-6 text-white/65">{detail.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </SlideFrame>
  )
}

const engineeringPlans = [
  { src: '/media/planos/1.png', alt: 'Plano de ingeniería 1 de Elian.' },
  { src: '/media/planos/2.png', alt: 'Plano de ingeniería 2 de Elian.' },
  { src: '/media/planos/3.png', alt: 'Plano de ingeniería 3 de Elian.' },
  { src: '/media/planos/4.png', alt: 'Plano de ingeniería 4 de Elian.' },
  { src: '/media/planos/5.png', alt: 'Plano de ingeniería 5 de Elian.' },
  { src: '/media/planos/6.png', alt: 'Plano de ingeniería 6 de Elian.' },
] as const

function EngineeringPlanCarousel() {
  const [activeImage, setActiveImage] = useState(0)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) return
    const interval = window.setInterval(() => {
      setActiveImage((current) => (current + 1) % engineeringPlans.length)
    }, 6000)
    return () => window.clearInterval(interval)
  }, [prefersReducedMotion])

  return (
    <div className="relative h-[22rem] overflow-hidden sm:h-[29rem]" data-animate>
      {!prefersReducedMotion ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center gap-3 p-4"
          data-engineering-plan-progress
        >
          <div className="h-px flex-1 overflow-hidden bg-white/25">
            <span
              className="home-background-progress block h-full origin-left bg-[#ed2828]"
              key={activeImage}
              style={{ animationDuration: '6s' }}
            />
          </div>
          <span className="text-[0.65rem] font-bold tracking-[0.16em] text-white/75 tabular-nums">
            {String(activeImage + 1).padStart(2, '0')} /{' '}
            {String(engineeringPlans.length).padStart(2, '0')}
          </span>
        </div>
      ) : null}
      {engineeringPlans.map((image, imageIndex) => (
        <img
          alt={imageIndex === activeImage ? image.alt : ''}
          aria-hidden={imageIndex === activeImage ? undefined : true}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1500ms] motion-reduce:transition-none ${imageIndex === activeImage ? 'opacity-100' : 'opacity-0'}`}
          key={image.src}
          src={image.src}
        />
      ))}
    </div>
  )
}

function EngineeringSlide({ section, index }: SlideProps) {
  return (
    <SlideFrame section={section}>
      <div className="mx-auto grid min-h-[100svh] max-w-[90rem] items-center gap-10 px-6 pt-28 pb-24 sm:px-10 lg:grid-cols-[0.85fr_1.15fr]">
        <div data-animate>
          <p className="text-xs font-bold tracking-[0.24em] text-[#ff7777] uppercase">
            0{index + 1} · {section.eyebrow}
          </p>
          <h1 className="mt-5 max-w-xl text-4xl font-semibold tracking-[-0.06em] text-white sm:text-6xl">
            {section.title}
          </h1>
          <p className="mt-6 max-w-lg text-base leading-7 text-white/75">{section.summary}</p>
        </div>
        <EngineeringPlanCarousel />
      </div>
    </SlideFrame>
  )
}

function ProjectsSlide({ section, index }: SlideProps) {
  const projects = [
    {
      alt: 'Operación industrial de Grúas del Vallès en el puerto de Barcelona.',
      detail: section.details[0],
      images: ['/media/maniobras/20171124_100840.jpg'],
    },
    {
      alt: 'Grúa de Grúas del Vallès durante una operación de construcción.',
      detail: section.details[1],
      images: ['/media/maniobras/IMG-20201126-WA0002.jpg'],
    },
    {
      alt: 'Operaciones de Grúas del Vallès para eventos e infraestructuras.',
      detail: section.details[2],
      images: [
        "/media/maniobras/CapD'Any 2022 Maria Cristina.jpg",
        '/media/maniobras/IMG-20220719-WA0008.jpg',
      ],
    },
  ] as const

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
          <p className="self-end text-base leading-7 text-white/75" data-animate>
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
                className={`grid h-full grid-cols-1 gap-px bg-[#0b0b0c] ${images.length === 2 ? 'grid-rows-2' : ''}`}
              >
                {images.map((src) => (
                  <img
                    alt={images.length === 1 ? alt : ''}
                    className="h-full min-h-0 w-full object-cover"
                    key={src}
                    src={src}
                  />
                ))}
              </div>
              <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#09090a]/95 via-[#09090a]/24 to-transparent" />
              <figcaption className="absolute right-0 bottom-0 left-0 p-5 sm:p-6">
                <span className="text-xs font-bold text-[#ff7777]">0{projectIndex + 1}</span>
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
  )
}

function ContactSlide({ section, index }: SlideProps) {
  return (
    <SlideFrame section={section}>
      <div className="mx-auto grid min-h-[100svh] max-w-[90rem] items-center gap-10 px-6 pt-28 pb-24 sm:px-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="text-xs font-bold tracking-[0.24em] text-[#ff7777] uppercase" data-animate>
            0{index + 1} · {section.eyebrow}
          </p>
          <h1
            className="mt-5 max-w-3xl text-5xl font-semibold tracking-[-0.055em] text-white sm:text-7xl"
            data-animate
          >
            {section.title}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-white/75 sm:text-lg" data-animate>
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
                <p className="mt-2 text-sm leading-6 text-white/80">{detail.description}</p>
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
            <a className="font-bold text-white hover:text-[#ff7777]" href="tel:+34938497022">
              93 849 70 22
            </a>
            <p className="mt-2">Estudio técnico, planificación y respuesta para cada operación.</p>
          </figcaption>
        </figure>
      </div>
    </SlideFrame>
  )
}

function ContactPeopleSlide({ section, index }: SlideProps) {
  return (
    <SlideFrame scrollable section={section}>
      <div className="mx-auto flex min-h-[100svh] max-w-[90rem] flex-col px-6 pt-28 pb-24 sm:px-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.7fr]">
          <div>
            <p
              className="text-xs font-bold tracking-[0.24em] text-[#ff7777] uppercase"
              data-animate
            >
              {String(index + 1).padStart(2, '0')} · {section.eyebrow}
            </p>
            <h1
              className="mt-5 text-5xl font-semibold tracking-[-0.055em] text-white sm:text-7xl"
              data-animate
            >
              {section.title}
            </h1>
          </div>
          <p className="self-end text-base leading-7 text-white/75" data-animate>
            {section.summary}
          </p>
        </div>
        <dl
          className="mt-10 grid gap-px border border-white/20 bg-white/20 sm:grid-cols-2 xl:grid-cols-4"
          data-animate
        >
          {contactPeople.map((person) => (
            <div className="bg-[#111113]/95 p-5 sm:p-6" key={`${person.department}-${person.name}`}>
              <dt className="text-xs font-bold tracking-[0.16em] text-[#ff7777] uppercase">
                {person.department}
              </dt>
              <dd className="mt-3 text-xl font-semibold tracking-[-0.03em] text-white">
                {person.name}
              </dd>
              <dd className="mt-5 space-y-1.5 text-sm leading-6 text-white/75">
                <a
                  className="block transition hover:text-white"
                  href={`tel:+34${person.phone.replaceAll(' ', '')}`}
                >
                  Tel. {person.phone}
                </a>
                <a
                  className="block break-all transition hover:text-white"
                  href={`mailto:${person.email}`}
                >
                  {person.email}
                </a>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </SlideFrame>
  )
}

export function SectionPage() {
  const { sectionId } = useParams()
  const section = getSection(sectionId)

  if (!section) {
    return <NotFoundPage />
  }

  const sectionIndex = presentationSections.indexOf(section)

  const props = { section, index: sectionIndex }
  if (section.id === 'seguridad') return <SafetySlide {...props} />
  if (section.id === 'flota') return <FleetSlide {...props} />
  if (section.id === 'estadisticas-flota') return <FleetStatisticsSlide {...props} />
  if (section.id === 'flota-completa') return <FleetOverviewSlide {...props} />
  if (section.id === 'equipo') return <TeamSlide {...props} />
  if (section.id === 'ingenieria') return <EngineeringSlide {...props} />
  if (section.id === 'casos-de-exito') return <ProjectsSlide {...props} />
  if (section.id === 'personal-contacto') return <ContactPeopleSlide {...props} />
  return <ContactSlide {...props} />
}
