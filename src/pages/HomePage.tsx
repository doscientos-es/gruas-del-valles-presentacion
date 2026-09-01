import { ArrowDownRight, ArrowRight, Phone } from 'lucide-react'
import { Link } from 'react-router'

import { HubNavigation } from '@/components/navigation/HubNavigation'

export function HomePage() {
  return (
    <section data-route-content>
      <div className="relative isolate min-h-[100svh] overflow-hidden bg-[#0b0b0c]">
        <img
          alt="Grúa Liebherr LTM 1100 de Grúas del Vallès en operación."
          className="absolute inset-0 -z-20 h-full w-full object-cover opacity-55"
          fetchPriority="high"
          height="1280"
          src="/media/hero-grua-accion-2024-01.avif"
          width="1728"
        />
        <div className="absolute inset-0 -z-10 bg-linear-to-r from-[#0b0b0c] via-[#0b0b0c]/82 to-[#0b0b0c]/20" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-2/5 bg-linear-to-t from-[#0b0b0c] to-transparent" />
        <div className="mx-auto flex min-h-svh max-w-360 flex-col justify-end px-6 pt-28 pb-10 sm:px-10 sm:pb-12 lg:pt-32">
          <h1
            className="mt-5 max-w-5xl text-5xl font-semibold tracking-[-0.055em] text-white sm:text-6xl lg:text-8xl"
            data-animate
          >
            Capacidad y seguridad para operaciones críticas.
          </h1>
          <p
            className="mt-6 max-w-xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8"
            data-animate
          >
            Más de 55 años de experiencia, medios propios y servicio para elevar, transportar y
            planificar con confianza.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row" data-animate>
            <Link
              className="inline-flex items-center justify-center gap-2 bg-[#d60b0c] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#a80909]"
              to="/seguridad"
            >
              Iniciar presentación
              <ArrowRight aria-hidden="true" size={17} />
            </Link>
            <a
              className="inline-flex items-center justify-center gap-2 border border-white/40 px-5 py-3 text-sm font-bold text-white transition hover:border-white hover:bg-white hover:text-[#121212]"
              href="tel:+34938497022"
            >
              <Phone aria-hidden="true" size={17} />
              93 849 70 22
            </a>
          </div>
          <dl className="mt-12 grid max-w-2xl grid-cols-3 border-l border-white/25" data-animate>
            {[
              ['+55', 'años de experiencia'],
              ['86', 'vehículos propios'],
              ['700 Tn', 'capacidad máxima'],
            ].map(([value, label]) => (
              <div className="border-r border-white/25 px-4 first:pl-0 sm:px-6" key={label}>
                <dt className="text-xs leading-4 text-white/65">{label}</dt>
                <dd className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
          <div
            className="mt-10 flex items-center gap-3 text-xs font-bold tracking-[0.18em] text-white/55 uppercase"
            data-animate
          >
            <ArrowDownRight aria-hidden="true" size={16} />
            Una operación bajo control.
          </div>
          <div className="mt-5 border-t border-white/20 pt-1" data-animate>
            <HubNavigation />
          </div>
        </div>
      </div>
    </section>
  )
}
