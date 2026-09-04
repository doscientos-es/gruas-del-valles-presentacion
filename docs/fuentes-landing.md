# Fuentes de la landing existente

Esta presentación reutiliza activos y datos que ya están en el repositorio de la landing corporativa. No supone una validación legal, documental ni editorial de su vigencia.

## Activos incorporados

- Logo: `gv-landing/src/public/logo.png`.
- Portada: `assets/images/hero-grua-accion-2024-01.avif`.
- Flota: `assets/images/flota-liebherr-ltm1650-8-1-01.avif`.
- Casos: imágenes de industria, construcción y eventos publicadas en `assets/images/`.

Los seis archivos seleccionados están en `public/media/`. Se han copiado sin transformación y deben revisarse antes de distribuir la versión pública.

## Datos utilizados

- Historia, cobertura e instalaciones: `src/data/nosotros.json`.
- Contacto corporativo: `src/data/contacto.json`.
- Capacidades, vehículos y grúas: `src/components/sections/Hero.astro`.
- Seguridad y acreditaciones: `src/pages/seguridad.astro`.
- Ámbitos de casos: `src/data/galerias.json`.

## Validación pendiente

- Las fuentes locales difieren en referencias numéricas de REA y REIC. La interfaz no publica números de registro concretos.
- Los valores `86 vehículos propios`, `28 grúas propias` y `hasta 700 Tn` proceden de la cabecera de la landing y se marcan como pendientes de confirmación editorial.
- Certificados, PDFs, nombres de clientes y resultados de casos solo se añadirán tras recibir una versión vigente y autorización expresa.
