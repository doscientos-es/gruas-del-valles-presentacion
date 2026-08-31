import { Link } from "react-router";

export function NotFoundPage() {
  return (
    <section
      className="mx-auto w-full max-w-5xl px-6 py-20 sm:px-10"
      data-route-content
    >
      <p className="text-sm font-semibold tracking-[0.16em] text-amber-300 uppercase">
        404
      </p>
      <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white">
        Esta sección no existe.
      </h1>
      <p className="mt-4 max-w-xl text-lg leading-8 text-slate-300">
        Vuelva al índice para consultar las áreas disponibles de la
        presentación.
      </p>
      <Link
        className="mt-8 inline-flex rounded-full bg-amber-300 px-5 py-3 text-sm font-semibold text-slate-950"
        to="/"
      >
        Volver al índice
      </Link>
    </section>
  );
}
