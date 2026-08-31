import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Construction,
  Mail,
  ShieldCheck,
  UsersRound,
} from "lucide-react";
import { Link } from "react-router";
import { presentationSections, type SectionId } from "@/content/presentation";

const sectionIcons: Record<SectionId, LucideIcon> = {
  seguridad: ShieldCheck,
  flota: Construction,
  equipo: UsersRound,
  "casos-de-exito": BriefcaseBusiness,
  contacto: Mail,
};

export function HubNavigation() {
  return (
    <nav aria-label="Áreas de la presentación">
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {presentationSections.map((section, index) => {
          const Icon = sectionIcons[section.id];

          return (
            <li key={section.id}>
              <Link
                className="group flex min-h-48 flex-col justify-between border border-black/10 bg-white p-5 transition duration-200 hover:-translate-y-0.5 hover:border-[#d60b0c] hover:shadow-[0_18px_38px_-24px_rgb(0_0_0/0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d60b0c] sm:p-6"
                data-animate
                to={`/${section.id}`}
              >
                <span className="flex items-center justify-between">
                  <span className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-[#d60b0c]">
                      0{index + 1}
                    </span>
                    <Icon
                      aria-hidden="true"
                      className="text-[#d60b0c]"
                      size={23}
                      strokeWidth={1.5}
                    />
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="text-[#6b6b6b] transition group-hover:text-[#d60b0c]"
                    size={20}
                  />
                </span>
                <span>
                  <span className="block text-lg font-semibold text-[#121212]">
                    {section.label}
                  </span>
                  <span className="mt-1 block text-sm leading-6 text-[#4b4b4b]">
                    {section.summary}
                  </span>
                  <span className="mt-4 inline-flex items-center gap-2 text-xs font-bold tracking-[0.12em] text-[#d60b0c] uppercase">
                    Explorar <ArrowUpRight aria-hidden="true" size={14} />
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
