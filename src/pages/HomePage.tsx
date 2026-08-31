import { ArrowRight, Phone } from "lucide-react";
import { Link } from "react-router";
import { HubNavigation } from "@/components/navigation/HubNavigation";

export function HomePage() {
  return (
    <section data-route-content>
      <div className="relative isolate overflow-hidden bg-[#121212]">
        <img
          alt="Grúa Liebherr LTM 1100 de Grúas del Vallès en operación."
          className="absolute inset-0 -z-20 h-full w-full object-cover opacity-50"
          fetchPriority="high"
          height="1280"
          src="/media/hero-grua-accion-2024-01.avif"
          width="1728"
        />
        <div className="absolute inset-0 -z-10 bg-linear-to-r from-[#121212] via-[#121212]/80 to-[#121212]/25" />
        <div className="mx-auto flex min-h-[34rem] max-w-7xl flex-col justify-end px-6 py-14 sm:px-10 sm:py-20 lg:min-h-[38rem] lg:py-24">
          <p
            className="text-sm font-semibold tracking-[0.16em] text-[#ff7777] uppercase"
            data-animate
          >
            Grúas del Vallès · Granollers
          </p>
          <h1
            className="mt-5 max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
            data-animate
          >
            Capacidad y seguridad para operaciones críticas.
          </h1>
          <p
            className="mt-6 max-w-xl text-lg leading-8 text-white/80"
            data-animate
          >
            Más de 55 años de experiencia, medios propios y servicio para
            elevar, transportar y planificar con confianza.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row" data-animate>
            <Link
              className="inline-flex items-center justify-center gap-2 bg-[#d60b0c] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#a80909]"
              to="/contacto"
            >
              Solicitar una propuesta
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
          <dl
            className="mt-10 grid max-w-2xl grid-cols-3 gap-px bg-white/20"
            data-animate
          >
            {[
              ["+55", "años de experiencia"],
              ["86", "vehículos propios"],
              ["700 Tn", "capacidad máxima"],
            ].map(([value, label]) => (
              <div className="bg-black/45 p-4 backdrop-blur-sm" key={label}>
                <dt className="text-xs leading-4 text-white/65">{label}</dt>
                <dd className="mt-2 text-2xl font-bold text-white">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <div className="bg-[#f6f6f7]">
        <div className="mx-auto w-full max-w-7xl px-6 py-12 sm:px-10 sm:py-16">
          <div className="mb-8 max-w-2xl" data-animate>
            <p className="text-sm font-semibold tracking-[0.16em] text-[#d60b0c] uppercase">
              Navegación rápida
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">
              La información esencial, sin rodeos.
            </h2>
            <p className="mt-3 text-[#4b4b4b]">
              Cinco puntos para conocer cómo respondemos a su operación.
            </p>
          </div>
          <HubNavigation />
        </div>
      </div>
    </section>
  );
}
