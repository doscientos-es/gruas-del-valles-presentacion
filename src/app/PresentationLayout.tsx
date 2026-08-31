import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ArrowLeft, Mail, Phone } from "lucide-react";
import { useRef } from "react";
import { Link, Outlet, useLocation } from "react-router";
import { useReducedMotion } from "@/shared/hooks/useReducedMotion";

gsap.registerPlugin(useGSAP);

export function PresentationLayout() {
  const contentRef = useRef<HTMLElement>(null);
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion) {
        return;
      }

      const routeContent = contentRef.current?.querySelector(
        "[data-route-content]",
      );
      const animatedElements =
        gsap.utils.toArray<HTMLElement>("[data-animate]");

      if (routeContent) {
        gsap.fromTo(
          routeContent,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.2 },
        );
      }

      if (animatedElements.length) {
        gsap.fromTo(
          animatedElements,
          { autoAlpha: 0, y: 14 },
          {
            autoAlpha: 1,
            clearProps: "transform,opacity,visibility",
            duration: 0.46,
            ease: "power2.out",
            stagger: 0.07,
            y: 0,
          },
        );
      }
    },
    {
      dependencies: [location.pathname, prefersReducedMotion],
      revertOnUpdate: true,
      scope: contentRef,
    },
  );

  return (
    <div className="min-h-screen bg-white text-[#121212]">
      <a className="skip-link" href="#main-content">
        Saltar al contenido
      </a>
      <header className="sticky top-0 z-30 border-b border-black/10 bg-white/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 sm:px-10">
          <Link
            aria-label="Grúas del Vallès: inicio"
            className="inline-flex items-center"
            to="/"
          >
            <img
              alt="Grúas del Vallès"
              className="h-9 w-auto"
              src="/media/logo.png"
            />
          </Link>
          <div className="flex items-center gap-5">
            <span className="hidden text-xs font-semibold tracking-[0.14em] text-[#6b6b6b] uppercase sm:block">
              Presentación comercial
            </span>
            {location.pathname !== "/" ? (
              <Link
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#4b4b4b] transition hover:text-[#d60b0c] focus-visible:outline-none"
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
      <footer className="border-t border-black/10 bg-[#f6f6f7]">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-6 py-6 text-sm text-[#4b4b4b] sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <p>Grúas del Vallès · Granollers, Barcelona</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <a
              className="inline-flex items-center gap-2 hover:text-[#d60b0c]"
              href="tel:+34938497022"
            >
              <Phone aria-hidden="true" size={15} />
              93 849 70 22
            </a>
            <a
              className="inline-flex items-center gap-2 hover:text-[#d60b0c]"
              href="mailto:gruasdelvalles@gruasdelvalles.com"
            >
              <Mail aria-hidden="true" size={15} />
              Contactar
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
