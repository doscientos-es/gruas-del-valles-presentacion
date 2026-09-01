import { useEffect, useState } from "react";

import { useReducedMotion } from "@/shared/hooks/useReducedMotion";

const homeBackgrounds = [
  "/media/flota-liebherr-ltm1500-8-1-01.avif",
  "/media/hero-grua-accion-2024-01.avif",
  "/media/operacion-industrial-ltm1350-2021.avif",
  "/media/operacion-puerto-2020.avif",
] as const;

export function HomePage() {
  const [activeBackground, setActiveBackground] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveBackground((current) => (current + 1) % homeBackgrounds.length);
    }, 7000);

    return () => window.clearInterval(interval);
  }, [prefersReducedMotion]);

  return (
    <section data-route-content>
      <div className="relative isolate min-h-[100svh] overflow-hidden bg-[#0b0b0c]">
        {homeBackgrounds.map((src, index) => (
          <div
            className={`absolute inset-0 -z-30 overflow-hidden transition-opacity duration-[1500ms] ease-out motion-reduce:transition-none ${index === activeBackground ? "opacity-100" : "opacity-0"}`}
            data-route-background
            key={src}
          >
            <img
              alt=""
              aria-hidden="true"
              className={`h-full w-full object-cover object-center ${index === activeBackground && !prefersReducedMotion ? "home-background-pan" : ""}`}
              fetchPriority={index === 0 ? "high" : "auto"}
              src={src}
            />
          </div>
        ))}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_15%_80%,rgba(237,40,40,0.18),transparent_32%),linear-gradient(90deg,rgba(9,9,10,0.92)_0%,rgba(9,9,10,0.62)_43%,rgba(9,9,10,0.1)_78%),linear-gradient(0deg,rgba(9,9,10,0.96)_0%,transparent_55%)]"
        />
        {!prefersReducedMotion ? (
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-20 z-10"
            data-animate
          >
            <div className="mx-auto flex max-w-[100rem] items-center gap-3 px-6 sm:px-10">
              <div className="h-px flex-1 overflow-hidden bg-white/25">
                <span
                  className="home-background-progress block h-full origin-left bg-[#ed2828]"
                  key={activeBackground}
                />
              </div>
              <span className="text-[0.65rem] font-bold tracking-[0.16em] text-white/75 tabular-nums">
                {String(activeBackground + 1).padStart(2, "0")} /{" "}
                {String(homeBackgrounds.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        ) : null}
        <div className="relative mx-auto flex min-h-svh max-w-[100rem] flex-col px-6 pt-28 pb-20 sm:px-10 sm:pb-20">
          <div className="relative z-10 mt-auto max-w-3xl">
            <h1
              className="max-w-3xl text-5xl font-semibold tracking-[-0.07em] text-white sm:text-6xl lg:text-7xl xl:text-8xl"
              data-animate
            >
              Capacidad y seguridad para operaciones críticas
            </h1>
            <p
              className="mt-6 max-w-lg text-base leading-7 text-white/75 sm:text-lg sm:leading-8"
              data-animate
            >
              Más de 55 años de experiencia, medios propios y servicio para
              elevar, transportar y planificar con confianza.
            </p>

            <dl
              className="mt-9 grid max-w-3xl border-y border-white/25 sm:grid-cols-3 sm:divide-x sm:divide-white/25"
              data-animate
            >
              {[
                ["Desde 1968", "Más de 55 años de experiencia en el sector."],
                [
                  "Flota propia",
                  "86 vehículos para responder con medios propios.",
                ],
                ["Gran tonelaje", "Hasta 700 Tn de capacidad máxima."],
              ].map(([value, label]) => (
                <div
                  className="border-b border-white/20 py-3.5 last:border-b-0 sm:border-b-0 sm:px-5 sm:first:pl-0"
                  key={value}
                >
                  <dt className="text-sm font-semibold text-white">{value}</dt>
                  <dd className="mt-1.5 text-xs leading-5 text-white/70">
                    {label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
