import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useRef } from 'react'
import { Link, Outlet, useLocation } from 'react-router'

import { presentationSections } from '@/content/presentation'
import { useReducedMotion } from '@/shared/hooks/useReducedMotion'

gsap.registerPlugin(useGSAP)

export function PresentationLayout() {
  const contentRef = useRef<HTMLElement>(null)
  const location = useLocation()
  const prefersReducedMotion = useReducedMotion()

  useGSAP(
    () => {
      if (prefersReducedMotion) {
        return
      }

      const routeContent = contentRef.current?.querySelector<HTMLElement>('[data-route-content]')
      const animatedElements = routeContent
        ? Array.from(routeContent.querySelectorAll<HTMLElement>('[data-animate]'))
        : []

      if (routeContent) {
        const timeline = gsap.timeline()

        timeline.fromTo(
          routeContent,
          { autoAlpha: 0, y: 18 },
          {
            autoAlpha: 1,
            clearProps: 'transform,opacity,visibility',
            duration: 0.58,
            ease: 'power3.out',
            y: 0,
          },
        )

        if (animatedElements.length) {
          timeline.fromTo(
            animatedElements,
            { autoAlpha: 0, y: 28 },
            {
              autoAlpha: 1,
              clearProps: 'transform,opacity,visibility',
              duration: 0.62,
              ease: 'power3.out',
              stagger: 0.08,
              y: 0,
            },
            '-=0.28',
          )
        }
      }
    },
    {
      dependencies: [location.pathname, prefersReducedMotion],
      revertOnUpdate: true,
      scope: contentRef,
    },
  )

  const currentIndex = presentationSections.findIndex(
    (section) => `/${section.id}` === location.pathname,
  )
  const currentSection = presentationSections[currentIndex]
  const previousSection = presentationSections[currentIndex - 1]
  const nextSection = presentationSections[currentIndex + 1]

  return (
    <div className="min-h-screen overflow-hidden bg-[#0b0b0c] text-white">
      <a className="skip-link" href="#main-content">
        Saltar al contenido
      </a>
      <header className="fixed inset-x-0 top-0 z-30 bg-linear-to-b from-black/60 to-transparent">
        <div className="mx-auto flex w-full max-w-[90rem] items-center justify-between px-6 py-5 sm:px-10">
          <Link
            aria-label="Grúas del Vallès: inicio"
            className="inline-flex items-center rounded focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
            to="/"
          >
            <img
              alt="Grúas del Vallès"
              className="h-8 w-auto brightness-0 invert"
              src="/media/logo.png"
            />
          </Link>
          <div className="flex items-center gap-4 text-xs font-semibold tracking-[0.15em] uppercase">
            <span className="hidden text-white/55 sm:block">Presentación comercial</span>
            {currentSection ? (
              <span className="text-white">{String(currentIndex + 1).padStart(2, '0')} / 05</span>
            ) : null}
            {location.pathname !== '/' ? (
              <Link
                className="inline-flex items-center gap-2 text-white/70 transition hover:text-white focus-visible:outline-none"
                to="/"
              >
                <ArrowLeft aria-hidden="true" size={16} />
                Índice
              </Link>
            ) : null}
          </div>
        </div>
      </header>
      <main id="main-content" ref={contentRef} tabIndex={-1}>
        <Outlet />
      </main>
      {currentSection ? (
        <nav
          aria-label="Progreso de presentación"
          className="fixed inset-x-0 bottom-0 z-30 border-t border-white/15 bg-[#0b0b0c]/85 backdrop-blur-md"
        >
          <div className="mx-auto flex w-full max-w-[90rem] items-center gap-4 px-6 py-3 sm:px-10">
            {previousSection ? (
              <Link
                aria-label={`Capítulo anterior: ${previousSection.label}`}
                className="hidden items-center gap-2 text-sm font-semibold text-white/65 transition hover:text-white sm:inline-flex"
                to={`/${previousSection.id}`}
              >
                <ArrowLeft aria-hidden="true" size={16} /> Anterior
              </Link>
            ) : (
              <Link
                aria-label="Volver a la portada"
                className="hidden items-center gap-2 text-sm font-semibold text-white/65 transition hover:text-white sm:inline-flex"
                to="/"
              >
                <ArrowLeft aria-hidden="true" size={16} /> Portada
              </Link>
            )}
            <div className="flex flex-1 items-center gap-1.5" role="list">
              {presentationSections.map((section, index) => (
                <Link
                  aria-current={section.id === currentSection.id ? 'step' : undefined}
                  aria-label={`Ir al capítulo ${index + 1}: ${section.label}`}
                  className="group h-6 flex-1 py-2 focus-visible:outline-none"
                  key={section.id}
                  role="listitem"
                  to={`/${section.id}`}
                >
                  <span
                    className={`block h-px transition duration-300 ${
                      section.id === currentSection.id
                        ? 'bg-[#ed2828]'
                        : 'bg-white/25 group-hover:bg-white/70'
                    }`}
                  />
                </Link>
              ))}
            </div>
            {nextSection ? (
              <Link
                aria-label={`Siguiente capítulo: ${nextSection.label}`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:text-[#ff7777]"
                to={`/${nextSection.id}`}
              >
                Siguiente <ArrowRight aria-hidden="true" size={16} />
              </Link>
            ) : (
              <Link
                aria-label="Cerrar presentación y volver a la portada"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:text-[#ff7777]"
                to="/"
              >
                Cerrar <ArrowRight aria-hidden="true" size={16} />
              </Link>
            )}
          </div>
        </nav>
      ) : null}
    </div>
  )
}
