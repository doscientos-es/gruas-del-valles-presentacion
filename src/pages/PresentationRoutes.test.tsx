import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { AppRoutes } from '@/app/router'

const reducedMotion = vi.hoisted(() => ({ value: true }))

vi.mock('@/shared/hooks/useReducedMotion', () => ({
  useReducedMotion: () => reducedMotion.value,
}))

afterEach(() => {
  cleanup()
  reducedMotion.value = true
})

describe('presentation routes', () => {
  it('shows the presentation chapters from the cover', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('heading', {
        name: /capacidad y seguridad para operaciones críticas/i,
      }),
    ).toBeInTheDocument()
    expect(screen.getAllByText(/700 Tn/i)).not.toHaveLength(0)
    expect(document.querySelectorAll('[data-route-background]')).toHaveLength(4)
    expect(
      screen.getByRole('navigation', { name: /progreso de presentación/i }),
    ).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'ELIAN' })).toHaveAttribute(
      'src',
      '/media/logos/elian.png',
    )
    expect(screen.queryByRole('link', { current: 'step' })).toBeNull()
    expect(screen.getByText('Estadísticas de flota')).toBeInTheDocument()
    expect(screen.getByText('Departamento de ingeniería')).toBeInTheDocument()
    expect(
      screen.getAllByRole('link').filter((link) => link.getAttribute('href')?.startsWith('/'))
        .length,
    ).toBeGreaterThanOrEqual(5)
    expect(screen.getAllByRole('link', { name: /seguridad/i })[0]).toHaveAttribute(
      'href',
      '/seguridad',
    )
  })

  it('does not expose certifications as a standalone route', () => {
    render(
      <MemoryRouter initialEntries={['/certificaciones']}>
        <AppRoutes />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: /esta sección no existe/i })).toBeInTheDocument()
  })

  it('makes the safety operation image zoomable', () => {
    render(
      <MemoryRouter initialEntries={['/seguridad']}>
        <AppRoutes />
      </MemoryRouter>,
    )

    expect(screen.getByRole('img', { name: /operación industrial/i })).toHaveAttribute(
      'data-zoomable',
    )
  })

  it('renders a direct route for the flagship fleet information', () => {
    render(
      <MemoryRouter initialEntries={['/flota']}>
        <AppRoutes />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: /la mejor grúa de la flota/i })).toBeInTheDocument()
    expect(
      screen
        .getByRole('heading', { name: /la mejor grúa de la flota/i })
        .closest('[data-fleet-flagship-image]'),
    ).not.toBeNull()
    expect(document.querySelector('[data-fleet-flagship-contrast]')).not.toBeNull()
    expect(screen.getAllByText(/700 Tn/i)).not.toHaveLength(0)
    expect(
      screen.getByRole('navigation', { name: /progreso de presentación/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', {
        name: /siguiente capítulo: estadísticas de flota/i,
      }),
    ).toHaveAttribute('href', '/estadisticas-flota')
  })

  it('shows all fleet vehicles in a scrollable grid', () => {
    render(
      <MemoryRouter initialEntries={['/flota-completa']}>
        <AppRoutes />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: /medios para cada escala/i })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: /liebherr ltm 1040-2.1/i })).toBeInTheDocument()
    expect(screen.getByText('Palfinger PK 165002L SH')).toBeInTheDocument()
    expect(screen.getByText('Liebherr LTM 1650-8.1')).toBeInTheDocument()
    expect(screen.getByRole('list', { name: /flota disponible/i })).toHaveClass('overflow-y-auto')
    expect(screen.getByRole('img', { name: /liebherr ltm 1040-2.1/i }).parentElement).toHaveClass(
      'min-h-52',
      'bg-white',
    )
    expect(screen.getByRole('img', { name: /liebherr ltm 1040-2.1/i })).toHaveAttribute(
      'data-zoomable',
    )
  })

  it('shows the editable fleet-age statistics between fleet slides', () => {
    render(
      <MemoryRouter initialEntries={['/estadisticas-flota']}>
        <AppRoutes />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: /flota renovada/i })).toBeInTheDocument()
    expect(screen.getAllByText(/años de media/i)).toHaveLength(2)
    expect(document.querySelectorAll('[data-fleet-age-donut]')).toHaveLength(2)
    expect(screen.getAllByText(/años de media/i)[0].parentElement).toHaveClass(
      'flex',
      'flex-col',
      'gap-0.5',
    )
  })

  it('shows the maneuver rotation progress in the team slide', () => {
    reducedMotion.value = false

    render(
      <MemoryRouter initialEntries={['/equipo']}>
        <AppRoutes />
      </MemoryRouter>,
    )

    expect(document.querySelector('[data-team-maneuver-progress]')).not.toBeNull()
    expect(
      document.querySelector('img[src="/media/maniobras/20171124_100840.jpg"]'),
    ).toHaveAttribute('data-zoomable')
    expect(screen.getByText('1968')).toHaveClass('mt-6', 'sm:mt-10')
    expect(screen.getByText(/más de 55 años de trayectoria/i)).toHaveClass('mt-8', 'sm:mt-16')
    expect(screen.getByText(/01\s*\/\s*08/)).toBeInTheDocument()
  })

  it('shows the plan rotation progress in the engineering slide', () => {
    reducedMotion.value = false

    render(
      <MemoryRouter initialEntries={['/ingenieria']}>
        <AppRoutes />
      </MemoryRouter>,
    )

    expect(document.querySelector('[data-engineering-plan-progress]')).not.toBeNull()
    expect(document.querySelector('img[src="/media/planos/1.png"]')).toHaveAttribute(
      'alt',
      'Plano de ingeniería 1 de Elian.',
    )
    expect(document.querySelector('img[src="/media/planos/1.png"]')).toHaveAttribute(
      'data-zoomable',
    )
    expect(screen.getByText(/01\s*\/\s*06/)).toBeInTheDocument()
  })

  it('integrates each operation description with its project image', () => {
    render(
      <MemoryRouter initialEntries={['/casos-de-exito']}>
        <AppRoutes />
      </MemoryRouter>,
    )

    const portDescription = screen.getByText(/maniobras de 400 y 220 toneladas/i)
    expect(portDescription.closest('figcaption')).not.toBeNull()
    expect(screen.getByRole('heading', { name: /^eventos$/i })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: /puerto de barcelona/i })).toHaveAttribute(
      'src',
      '/media/maniobras/20171124_100840.jpg',
    )
    expect(screen.getByRole('img', { name: /operación de construcción/i })).toHaveAttribute(
      'src',
      '/media/maniobras/IMG-20201126-WA0002.jpg',
    )
    expect(document.querySelectorAll('img[src*="CapD\'Any"]')).toHaveLength(1)
    expect(document.querySelectorAll('img[src*="WA0008"]')).toHaveLength(1)
    expect(document.querySelectorAll('[data-zoomable][src*="/media/maniobras/"]')).toHaveLength(4)
  })

  it('moves between chapters with the keyboard arrows', () => {
    render(
      <MemoryRouter initialEntries={['/flota']}>
        <AppRoutes />
      </MemoryRouter>,
    )

    fireEvent.keyDown(window, { key: 'ArrowRight' })
    expect(
      screen.getByRole('heading', {
        name: /flota renovada para cada operación/i,
      }),
    ).toBeInTheDocument()

    fireEvent.keyDown(window, { key: 'ArrowRight' })
    expect(
      screen.getByRole('heading', {
        name: /medios para cada escala de operación/i,
      }),
    ).toBeInTheDocument()

    fireEvent.keyDown(window, { key: 'ArrowLeft' })
    expect(
      screen.getByRole('heading', {
        name: /flota renovada para cada operación/i,
      }),
    ).toBeInTheDocument()

    fireEvent.keyDown(window, { key: 'ArrowLeft' })
    expect(screen.getByRole('heading', { name: /la mejor grúa de la flota/i })).toBeInTheDocument()
  })

  it('does not navigate when Escape is pressed', () => {
    render(
      <MemoryRouter initialEntries={['/flota']}>
        <AppRoutes />
      </MemoryRouter>,
    )

    fireEvent.keyDown(window, { key: 'Escape' })
    expect(screen.getByRole('heading', { name: /la mejor grúa de la flota/i })).toBeInTheDocument()
  })

  it('combines the contact and closing messages without a further slide', () => {
    render(
      <MemoryRouter initialEntries={['/contacto']}>
        <AppRoutes />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('heading', {
        name: /preparados para la próxima maniobra/i,
      }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /93 849 70 22/i })).toHaveAttribute(
      'href',
      'tel:+34938497022',
    )
    expect(screen.getByRole('img', { name: /durante una operación/i })).toHaveAttribute(
      'data-zoomable',
    )

    fireEvent.keyDown(window, { key: 'ArrowRight' })
    expect(
      screen.getByRole('heading', {
        name: /hablemos de su próxima operación/i,
      }),
    ).toBeInTheDocument()
  })

  it('shows the contact staff before the final contact page', () => {
    render(
      <MemoryRouter initialEntries={['/personal-contacto']}>
        <AppRoutes />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: /^personal de contacto$/i })).toBeInTheDocument()
    expect(screen.getByText('Marc Gelabert')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /tel. 669 296 949/i })).toHaveAttribute(
      'href',
      'tel:+34669296949',
    )
    expect(screen.getByRole('link', { name: 'marc@gruasdelvalles.com' })).toHaveAttribute(
      'href',
      'mailto:marc@gruasdelvalles.com',
    )

    fireEvent.keyDown(window, { key: 'ArrowRight' })
    expect(
      screen.getByRole('heading', {
        name: /hablemos de su próxima operación/i,
      }),
    ).toBeInTheDocument()
  })

  it('shows a recoverable state for an unknown section', () => {
    render(
      <MemoryRouter initialEntries={['/seccion-inexistente']}>
        <AppRoutes />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: /esta sección no existe/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /volver al índice/i })).toHaveAttribute('href', '/')
  })
})
