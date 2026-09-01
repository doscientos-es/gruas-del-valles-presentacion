import { HubNavigation } from "@/components/navigation/HubNavigation";

export function HomePage() {
  return (
    <section data-route-content>
      <div className="relative isolate min-h-[100svh] overflow-hidden bg-[#111114]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_25%,rgba(255,119,119,0.1),transparent_28%),radial-gradient(circle_at_82%_8%,rgba(255,255,255,0.06),transparent_24%),linear-gradient(125deg,#19191b_0%,#0b0b0c_48%,#141416_100%)]"
        />
        <div className="relative mx-auto flex min-h-[100svh] max-w-[100rem] flex-col px-6 pt-28 pb-10 sm:px-10 sm:pb-12 xl:pt-24 xl:pb-0">
          <div className="relative z-10 max-w-[34rem] xl:max-w-[32rem] xl:pt-[11vh]">
            <h1
              className="text-5xl font-semibold tracking-[-0.07em] text-white sm:text-6xl xl:text-7xl"
              data-animate
            >
              Capacidad y seguridad para operaciones críticas.
            </h1>
            <p
              className="mt-6 max-w-lg text-base leading-7 text-white/75 sm:text-lg sm:leading-8"
              data-animate
            >
              Más de 55 años de experiencia, medios propios y servicio para
              elevar, transportar y planificar con confianza.
            </p>

            <dl className="mt-10 border-y border-white/20" data-animate>
              {[
                ["Desde 1968", "Más de 55 años de experiencia en el sector."],
                [
                  "Flota propia",
                  "86 vehículos para responder con medios propios.",
                ],
                ["Gran tonelaje", "Hasta 700 Tn de capacidad máxima."],
              ].map(([value, label]) => (
                <div
                  className="grid grid-cols-[7.5rem_1fr] gap-4 border-b border-white/20 py-4 last:border-b-0"
                  key={value}
                >
                  <dt className="text-sm font-semibold text-white">{value}</dt>
                  <dd className="text-xs leading-5 text-white/65">{label}</dd>
                </div>
              ))}
            </dl>
          </div>
          <figure
            className="relative mt-10 aspect-[16/10] overflow-hidden border border-white/25 bg-[#171719] xl:absolute xl:top-[20vh] xl:right-0 xl:bottom-36 xl:left-[43%] xl:mt-0 xl:aspect-auto"
            data-animate
          >
            <img
              alt="Liebherr LTM 1500-8.1, grúa de mayor capacidad de la flota."
              className="absolute inset-0 h-full w-full object-cover object-center"
              data-route-background
              fetchPriority="high"
              src="/media/flota-liebherr-ltm1500-8-1-01.avif"
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#09090a]/95 via-[#09090a]/10 to-transparent" />
            <div className="absolute top-0 bottom-0 left-0 w-px bg-[#ed2828]" />
            <figcaption className="absolute right-0 bottom-0 left-0 grid gap-3 p-5 sm:grid-cols-[1fr_auto] sm:items-end sm:p-8">
              <div>
                <span className="text-xs font-bold tracking-[0.18em] text-[#ff7777] uppercase">
                  Buque insignia
                </span>
                <p className="mt-3 text-xl font-semibold tracking-[-0.04em] text-white sm:text-3xl">
                  Liebherr LTM 1500-8.1
                </p>
              </div>
              <p className="text-5xl font-semibold tracking-[-0.08em] text-white sm:text-6xl">
                700 <span className="text-xl tracking-normal">Tn</span>
              </p>
              <p className="col-span-full max-w-xl border-t border-white/25 pt-3 text-xs leading-5 text-white/70">
                La grúa de mayor capacidad de la flota corporativa.
              </p>
            </figcaption>
          </figure>
          <div
            className="relative z-10 mt-8 border-t border-white/20 pt-1 xl:absolute xl:right-0 xl:bottom-7 xl:left-0 xl:mt-0"
            data-animate
          >
            <HubNavigation />
          </div>
        </div>
      </div>
    </section>
  );
}
