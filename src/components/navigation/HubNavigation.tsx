import { Link } from "react-router";

import { presentationSections } from "@/content/presentation";

export function HubNavigation() {
  return (
    <nav aria-label="Áreas de la presentación">
      <ul className="grid grid-cols-2 gap-x-4 sm:grid-cols-6 sm:gap-x-0">
        {presentationSections.map((section, index) => {
          return (
            <li
              className="border-b border-white/15 sm:border-r sm:border-b-0 sm:last:border-r-0"
              key={section.id}
            >
              <Link
                className="group flex min-h-12 flex-col items-start justify-center gap-0.5 py-2 transition sm:min-h-16 sm:px-4"
                data-animate
                to={`/${section.id}`}
              >
                <span className="text-[0.65rem] font-bold tracking-[0.16em] text-[#ff7777] uppercase">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-xs font-semibold text-white transition group-hover:text-[#ff7777]">
                  {section.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
