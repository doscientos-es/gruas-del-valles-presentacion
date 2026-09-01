import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";

export function FinalPage() {
  return (
    <section
      className="relative isolate min-h-[100svh] overflow-hidden bg-[#0b0b0c]"
      data-route-content
    >
      <img
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-20 h-full w-full object-cover opacity-45"
        data-route-background
        src="/media/operacion-pasarela-sant-celoni.avif"
      />
      <div className="absolute inset-0 -z-10 bg-linear-to-r from-[#09090a] via-[#09090a]/78 to-[#09090a]/35" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-linear-to-t from-[#09090a] to-transparent" />
      <div className="mx-auto flex min-h-[100svh] max-w-[90rem] flex-col justify-between px-6 pt-28 pb-24 sm:px-10">
        <p
          className="text-xs font-bold tracking-[0.24em] text-[#ff7777] uppercase"
          data-animate
        >
          06 · Cierre
        </p>
        <div className="max-w-4xl">
          <h1
            className="text-5xl font-semibold tracking-[-0.06em] text-white sm:text-7xl lg:text-8xl"
            data-animate
          >
            Preparados para la próxima maniobra.
          </h1>
          <p
            className="mt-7 max-w-2xl text-base leading-7 text-white/80 sm:text-xl sm:leading-9"
            data-animate
          >
            Capacidad, equipo técnico y medios propios para estudiar cada
            operación con rigor.
          </p>
          <div className="mt-10 flex flex-wrap gap-4" data-animate>
            <a
              className="inline-flex items-center gap-2 bg-[#ed2828] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#ff3b3b]"
              href="tel:+34938497022"
            >
              93 849 70 22 <ArrowUpRight aria-hidden="true" size={17} />
            </a>
            <Link
              className="inline-flex items-center border border-white/35 px-5 py-3 text-sm font-bold text-white transition hover:border-white"
              to="/"
            >
              Volver al índice
            </Link>
          </div>
        </div>
        <p
          className="text-xs tracking-[0.14em] text-white/55 uppercase"
          data-animate
        >
          Grúas del Vallès · Granollers, Barcelona
        </p>
      </div>
    </section>
  );
}
