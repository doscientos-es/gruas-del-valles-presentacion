import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router'

import { presentationSections } from '@/content/presentation'

export function HubNavigation() {
  return (
    <nav aria-label="Áreas de la presentación">
      <ul className="grid divide-y divide-white/15 sm:grid-cols-5 sm:divide-x sm:divide-y-0">
        {presentationSections.map((section, index) => {
          return (
            <li key={section.id}>
              <Link
                className="group flex min-h-19 items-center justify-between gap-3 py-3.5 pr-2 transition sm:min-h-24 sm:flex-col sm:items-start sm:justify-center sm:px-4 sm:py-4 lg:px-5"
                data-animate
                to={`/${section.id}`}
              >
                <span className="text-[0.65rem] font-bold tracking-[0.16em] text-[#ff7777] uppercase">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="flex flex-1 items-center gap-2 text-sm font-semibold text-white transition group-hover:text-[#ff7777] sm:block">
                  {section.label}
                  <ArrowUpRight aria-hidden="true" className="ml-auto sm:mt-2 sm:ml-0" size={16} />
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
