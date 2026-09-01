import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router";

import { presentationSections } from "@/content/presentation";
import { useReducedMotion } from "@/shared/hooks/useReducedMotion";

gsap.registerPlugin(useGSAP);

export function PresentationLayout() {
  const contentRef = useRef<HTMLElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion) {
        return;
      }

      const routeContent = contentRef.current?.querySelector<HTMLElement>(
        "[data-route-content]",
      );
      const animatedElements = routeContent
        ? Array.from(
            routeContent.querySelectorAll<HTMLElement>("[data-animate]"),
          )
        : [];
      const backgrounds = routeContent
        ? Array.from(
            routeContent.querySelectorAll<HTMLElement>(
              "[data-route-background]",
            ),
          )
        : [];

      if (routeContent) {
        const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

        timeline
          .set(routeContent, { autoAlpha: 1 })
          .fromTo(
            routeContent,
            { clipPath: "inset(0 0 100% 0)" },
            {
              clearProps: "clipPath",
              clipPath: "inset(0 0 0% 0)",
              duration: 0.72,
            },
            "reveal",
          )
          .fromTo(
            backgrounds,
            { scale: 1.1 },
            {
              clearProps: "transform",
              duration: 1.35,
              ease: "power2.out",
              scale: 1,
            },
            "reveal",
          );

        if (animatedElements.length) {
          timeline.fromTo(
            animatedElements,
            { autoAlpha: 0, y: 28 },
            {
              autoAlpha: 1,
              clearProps: "transform,opacity,visibility",
              duration: 0.66,
              ease: "power3.out",
              stagger: 0.1,
              y: 0,
            },
            "reveal+=0.2",
          );
        }
      }
    },
    {
      dependencies: [location.pathname, prefersReducedMotion],
      revertOnUpdate: true,
      scope: contentRef,
    },
  );

  const currentIndex = presentationSections.findIndex(
    (section) => `/${section.id}` === location.pathname,
  );
  const currentSection = presentationSections[currentIndex];
  const previousSection = presentationSections[currentIndex - 1];
  const nextSection = presentationSections[currentIndex + 1];
  const currentStepId = currentSection?.id;
  const currentStepNumber = currentIndex + 1;
  const progressSteps = presentationSections;

  useEffect(() => {
    function handleKeyboardNavigation(event: KeyboardEvent) {
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
        return;
      }

      const target = event.target;
      if (
        target instanceof Element &&
        target.closest(
          "a, button, input, textarea, select, [contenteditable='true'], [role='textbox']",
        )
      ) {
        return;
      }

      if (event.key === "Escape") {
        event.preventDefault();
        navigate("/");
        return;
      }

      if (event.key === "ArrowRight" && currentIndex >= 0) {
        event.preventDefault();
        if (nextSection) {
          navigate(`/${nextSection.id}`);
        }
      }

      if (event.key === "ArrowLeft" && currentIndex >= 0) {
        event.preventDefault();
        navigate(`/${previousSection?.id ?? ""}`);
      }
    }

    window.addEventListener("keydown", handleKeyboardNavigation);
    return () =>
      window.removeEventListener("keydown", handleKeyboardNavigation);
  }, [currentIndex, navigate, nextSection, previousSection]);

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
            {currentStepId ? (
              <span className="text-white">
                {String(currentStepNumber).padStart(2, "0")} /{" "}
                {String(progressSteps.length).padStart(2, "0")}
              </span>
            ) : null}
            {location.pathname !== "/" ? (
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
      {currentStepId ? (
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
            <ol className="flex flex-1 items-center gap-1.5">
              {progressSteps.map((section, index) => (
                <li className="flex-1" key={section.id}>
                  <Link
                    aria-current={
                      section.id === currentStepId ? "step" : undefined
                    }
                    aria-label={`Ir al capítulo ${index + 1}: ${section.label}`}
                    className="group block h-6 py-2 focus-visible:outline-none"
                    to={`/${section.id}`}
                  >
                    <span
                      className={`block h-px transition duration-300 ${
                        section.id === currentStepId
                          ? "bg-[#ed2828]"
                          : "bg-white/25 group-hover:bg-white/70"
                      }`}
                    />
                  </Link>
                </li>
              ))}
            </ol>
            <span className="hidden text-xs tracking-[0.12em] text-white/45 uppercase lg:block">
              ← → Navegar
            </span>
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
                aria-label="Volver al índice de la presentación"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:text-[#ff7777]"
                to="/"
              >
                Índice <ArrowRight aria-hidden="true" size={16} />
              </Link>
            )}
          </div>
        </nav>
      ) : null}
    </div>
  );
}
