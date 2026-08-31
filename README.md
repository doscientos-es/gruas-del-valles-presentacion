# Presentación interactiva — Grúas del Vallès

Microsite comercial para presentar la capacidad operativa de Grúas del Vallès a empresas de gran tamaño. No sustituye la web corporativa: es una experiencia de reunión, homologación y seguimiento comercial.

## Objetivo

Transmitir confianza mediante pruebas claras de seguridad, certificaciones, renovación de flota, cualificación del equipo y operaciones resueltas con éxito.

## Alcance aprobado

- Home visual que funciona como hub de navegación.
- Secciones de Seguridad, Flota, Certificaciones, Equipo y experiencia, Casos de éxito y Contacto.
- Navegación cruzada desde cada prueba de confianza hacia la siguiente acción relevante.
- Diseño responsive con transición entre secciones y modo presentación.

## Principios de experiencia

- Claridad antes que espectacularidad: una decisión y una idea principal por pantalla.
- Navegación breve: no habrá scroll largo ni menús complejos.
- Interacciones discretas, útiles y rápidas; nunca decorativas ni bloqueantes.
- Accesible por teclado, con foco visible y alternativa a cualquier gesto o efecto.
- Animación reducida o eliminada cuando el visitante así lo tenga configurado.
- Rendimiento prioritario: imágenes y vídeo optimizados, carga progresiva y sin elementos pesados innecesarios.

## Arquitectura y contenido

El mapa de navegación, los objetivos de cada página y los enlaces contextuales están en [`docs/arquitectura.md`](./docs/arquitectura.md).

## Estructura del proyecto

- `docs/`: estrategia, contenido, arquitectura y decisiones técnicas.
- `src/app`: rutas y shell de la aplicación.
- `src/content`: contenido tipado e independiente de la interfaz.
- `src/components`: componentes reutilizables.
- `src/pages`: pantallas enlazables de la presentación.
- `src/shared`: utilidades y hooks reutilizables.
- `src/test`: configuración de pruebas.
- `public/`: imágenes, certificados y documentos públicos autorizados.

## Desarrollo

Requiere Node.js 22 o superior y pnpm.

- `pnpm dev`: inicia el entorno local.
- `pnpm test`: ejecuta pruebas unitarias.
- `pnpm typecheck`: comprueba TypeScript.
- `pnpm lint`: ejecuta Biome.
- `pnpm build`: genera la versión de producción.
- `pnpm check`: ejecuta todas las validaciones anteriores.

Las decisiones y fuentes técnicas están en [`docs/stack.md`](./docs/stack.md).

## Contenido incorporado desde la landing

Se ha incorporado una selección limitada de logo, fotografías y datos base procedentes de la landing existente. La procedencia, alcance y validaciones pendientes constan en [`docs/fuentes-landing.md`](./docs/fuentes-landing.md).

## Pendiente antes de publicar

1. Confirmar vigencia de cifras de flota, registros, certificados y dossier.
2. Validar permisos de uso de las imágenes y los casos que pueden hacerse públicos.
3. Definir si el acceso será público, mediante URL privada o protegido por contraseña.
