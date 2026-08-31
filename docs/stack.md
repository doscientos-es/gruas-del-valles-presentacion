# Decisiones técnicas

## Base elegida

- **Vite + React + TypeScript** para una SPA estática, rápida y sin backend prematuro.
- **Tailwind CSS con su plugin oficial de Vite** para el sistema visual y responsive.
- **React Router en modo declarativo** para enlazar directamente cada área de la presentación.
- **GSAP + `@gsap/react`** para transiciones limitadas y correctamente limpiadas al cambiar de ruta.
- **Vitest + Testing Library** para comprobaciones de navegación y renderizado.
- **Biome** para formato y linting.

El proyecto usa las versiones actuales resueltas por `pnpm` durante su inicialización. Se mantienen bloqueadas en `pnpm-lock.yaml` para instalaciones reproducibles.

## Fuentes consultadas

- [Vite: plantilla React + TypeScript](https://vite.dev/guide/)
- [Tailwind CSS: integración con Vite](https://tailwindcss.com/docs/installation/using-vite)
- [React Router: modo declarativo](https://reactrouter.com/start/declarative/installation)
- [GSAP con React](https://gsap.com/resources/React/)

## Criterios de arquitectura

- El contenido vive en `src/content` y no se mezcla con componentes visuales.
- Las rutas y la estructura global viven en `src/app`.
- Las páginas viven en `src/pages`; los componentes reutilizables, en `src/components`.
- No se añade CMS, autenticación ni base de datos hasta disponer de un caso de uso real.
- La implementación base respeta teclado, foco visible y `prefers-reduced-motion`.