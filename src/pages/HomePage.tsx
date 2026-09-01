import { HubNavigation } from "@/components/navigation/HubNavigation";

export function HomePage() {
  return (
    <section data-route-content>
      <div className="relative isolate min-h-[100svh] overflow-hidden bg-[#0b0b0c]">
        <img
          alt="Grúa Liebherr LTM 1100 de Grúas del Vallès en operación."
          className="absolute inset-0 -z-20 h-full w-full object-cover opacity-60"
          data-route-background
          fetchPriority="high"
          height="1280"
          src="/media/hero-grua-accion-2024-01.avif"
          width="1728"
        />
        <div className="absolute inset-0 -z-10 bg-linear-to-r from-[#0b0b0c] via-[#0b0b0c]/82 to-[#0b0b0c]/20" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-2/5 bg-linear-to-t from-[#0b0b0c] to-transparent" />
        <div className="mx-auto grid min-h-svh max-w-360 items-end gap-10 px-6 pt-28 pb-10 sm:px-10 sm:pb-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16 lg:pt-32">
          <div>
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
              Más de 55 años de experiencia, medios propios y servicio para
              elevar, transportar y planificar con confianza.
            </p>

            <dl
              className="mt-10 grid max-w-3xl gap-px bg-white/20 sm:grid-cols-3"
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
                  className="bg-[#111114]/80 px-4 py-4 backdrop-blur-sm sm:px-5"
                  key={value}
                >
                  <dt className="text-sm font-semibold text-white">{value}</dt>
                  <dd className="mt-2 text-xs leading-5 text-white/65">
                    {label}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-5 border-t border-white/20 pt-1" data-animate>
              <HubNavigation />
            </div>
          </div>
          <figure
            className="hidden self-end border border-white/20 bg-black/20 p-3 backdrop-blur-sm lg:block"
            data-animate
          >
            <img
              alt="Liebherr LTM 1500-8.1, grúa de mayor capacidad de la flota."
              className="aspect-[3/4] w-full object-cover"
              src="/media/flota-liebherr-ltm1500-8-1-01.avif"
            />
            <figcaption className="border-t border-white/15 pt-3 text-xs leading-5 text-white/70">
              <span className="font-bold tracking-[0.16em] text-[#ff7777] uppercase">
                Buque insignia
              </span>
              <br />
              LTM 1500-8.1 · 700 Tn
            </figcaption>
          </figure>
          <p
            className="col-span-full hidden text-xs tracking-[0.15em] text-white/45 uppercase lg:block"
            data-animate
          >
            ← → capítulos · Esc índice
          </p>
        </div>
      </div>
    </section>
  );
}
