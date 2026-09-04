export type SectionId =
  | 'seguridad'
  | 'flota'
  | 'estadisticas-flota'
  | 'flota-completa'
  | 'equipo'
  | 'ingenieria'
  | 'casos-de-exito'
  | 'personal-contacto'
  | 'contacto'

export interface PresentationSection {
  id: SectionId
  label: string
  eyebrow: string
  title: string
  summary: string
  image: string
  imageAlt: string
  details: readonly {
    title: string
    description: string
  }[]
}

// Datos provisionales: sustituir valores y etiquetas tras validar la antigüedad real.
export const fleetAgeStatistics = [
  {
    title: 'Antigüedad de toda la flota',
    summary: 'Distribución estimada del conjunto de vehículos propios.',
    average: '7',
    data: [
      { label: '0-2 años', value: 29.2, color: '#ed2828' },
      { label: '3-5 años', value: 25, color: '#ff7777' },
      { label: '6-10 años', value: 22.9, color: '#b8b8bc' },
      { label: '+10 años', value: 22.9, color: '#57575d' },
    ],
  },
  {
    title: 'Antigüedad de la flota para Elian',
    summary: 'Distribución estimada de los equipos propuestos para la operación.',
    average: '4,4',
    data: [
      { label: '0-2 años', value: 37.1, color: '#ed2828' },
      { label: '3-5 años', value: 34.3, color: '#ff7777' },
      { label: '6-10 años', value: 25.7, color: '#b8b8bc' },
      { label: '+10 años', value: 2.9, color: '#57575d' },
    ],
  },
] as const

export const contactPeople = [
  {
    department: 'Gerencia',
    name: 'Marc Gelabert',
    phone: '669 296 949',
    email: 'marc@gruasdelvalles.com',
  },
  {
    department: 'Director ejecutivo',
    name: 'Manel Moya',
    phone: '601 191 042',
    email: 'mmoya@gruasdelvalles.com',
  },
  {
    department: 'Encargado general',
    name: 'Cayetano Leon',
    phone: '669 296 954',
    email: 'cayetano@gruasdelvalles.com',
  },
  {
    department: 'Departamento de ingeniería',
    name: 'Gerard Moya',
    phone: '607 57 86 54',
    email: 'ingenieria@gruasdelvalles.com',
  },
  {
    department: 'Técnico comercial',
    name: 'Xavier Peral',
    phone: '669 296 939',
    email: 'comercial@gruasdelvalles.com',
  },
  {
    department: 'Técnico comercial',
    name: 'Joan Gubau',
    phone: '669 296 950',
    email: 'maresme@gruasdelvalles.com',
  },
  {
    department: 'Departamento de logística',
    name: 'Hector Alzate',
    phone: '669 296 942',
    email: 'maresme@gruasdelvalles.com',
  },
  {
    department: 'Departamento de PRL',
    name: 'Daniel Cambrón',
    phone: '663 893 932',
    email: 'maresme@gruasdelvalles.com',
  },
  {
    department: 'Departamento de contabilidad',
    name: 'Rosario Lozano',
    phone: '938 497 132',
    email: 'contabilidad@gruasdelvalles.com',
  },
  {
    department: 'Departamento de administración',
    name: 'Susana Carapeto',
    phone: '613 548 349',
    email: 'administracion@gruasdelvalles.com',
  },
] as const

export const presentationSections: readonly PresentationSection[] = [
  {
    id: 'seguridad',
    label: 'Seguridad',
    eyebrow: 'Seguridad en operación',
    title: 'La seguridad está en el centro de cada maniobra',
    summary:
      'La planificación, el mantenimiento y el control técnico acompañan cada operación desde su estudio hasta su ejecución.',
    image: '/media/operacion-puerto-2020.avif',
    imageAlt: 'Grúas de Grúas del Vallès en una operación industrial en el puerto de Barcelona.',
    details: [
      {
        title: 'Política de prevención',
        description:
          'La seguridad forma parte de la política de empresa desde el inicio de su actividad con grúas móviles autopropulsadas.',
      },
      {
        title: 'Taller mecánico propio',
        description:
          'Mantenimiento preventivo y correctivo para mantener la flota en condiciones de funcionamiento.',
      },
      {
        title: 'Inspecciones técnicas',
        description:
          'Toda la flota supera y cumple favoblemente las inspecciones de seguridad I.T.C. MIE EAM-4 (R.D. 037/2003)',
      },
    ],
  },
  {
    id: 'flota',
    label: 'Flota',
    eyebrow: 'Buque insignia',
    title: 'Liebherr LTM 1600-8.1. La mejor grúa de la flota.',
    summary:
      'Una grúa móvil de 700 Tn que representa la capacidad de una flota propia preparada para operaciones de gran tonelaje.',
    image: '/media/flota-liebherr-ltm1650-8-1-01.avif',
    imageAlt: 'Grúa Liebherr de la flota de Grúas del Vallès.',
    details: [
      {
        title: '700 Tn de capacidad máxima',
        description:
          'La LTM 1600-8.1 es el mayor vehículo de la flota según la información corporativa y su buque insignia.',
      },
      {
        title: '86 vehículos propios',
        description:
          'Dato comunicado en la cabecera de la landing corporativa; pendiente de confirmación para la versión pública.',
      },
      {
        title: '28 grúas propias',
        description:
          'Dato comunicado en la cabecera de la landing corporativa; se acompañará de fichas técnicas autorizadas.',
      },
    ],
  },
  {
    id: 'estadisticas-flota',
    label: 'Estadísticas de flota',
    eyebrow: 'Datos de flota',
    title: 'Una flota renovada para cada operación.',
    summary:
      'Una lectura visual de la antigüedad estimada de toda la flota y de los equipos previstos para este proyecto.',
    image: '/media/operacion-industrial-ltm1350-2021.avif',
    imageAlt: 'Maniobra industrial de Grúas del Vallès.',
    details: [],
  },
  {
    id: 'flota-completa',
    label: 'Selección de flota',
    eyebrow: 'Flota en servicio',
    title: 'Medios para cada escala de operación.',
    summary:
      'Del gran tonelaje a las grúas de construcción y camiones-grúa: una selección de vehículos para responder a diferentes necesidades.',
    image: '/media/flota-liebherr-ltm1400-7-1-01.avif',
    imageAlt: 'Grúa Liebherr LTM 1400-7.1 de Grúas del Vallès.',
    details: [],
  },
  {
    id: 'equipo',
    label: 'Equipo y experiencia',
    eyebrow: 'Experiencia y cobertura',
    title: 'Experiencia técnica donde más importa',
    summary:
      'Más de 55 años de trayectoria, asesoramiento técnico y cobertura en Catalunya y zonas colindantes.',
    image: '/media/hero-grua-accion-2024-01.avif',
    imageAlt: 'Grúa Liebherr LTM 1100 de Grúas del Vallès en operación.',
    details: [
      {
        title: 'Desde 1968',
        description:
          'La compañía sitúa su fundación en 1968 y comunica más de 55 años de experiencia en el sector.',
      },
      {
        title: 'Estudio y asesoramiento',
        description:
          'La estructura comercial y técnica cubre logística, dirección técnica, prevención y atención al cliente.',
      },
      {
        title: 'Servicio 24/365',
        description:
          'La landing corporativa comunica servicio de emergencia 24 horas, 365 días al año.',
      },
    ],
  },
  {
    id: 'ingenieria',
    label: 'Departamento de ingeniería',
    eyebrow: 'Planificación técnica',
    title: 'Departamento de ingeniería antes de cada movimiento.',
    summary:
      'El departamento de ingeniería estudia los condicionantes de cada maniobra y prepara la documentación necesaria para su ejecución.',
    image: '/media/operacion-puerto-2020.avif',
    imageAlt: 'Operación industrial de Grúas del Vallès.',
    details: [],
  },
  {
    id: 'casos-de-exito',
    label: 'Casos de éxito',
    eyebrow: 'Operaciones realizadas',
    title: 'Las operaciones hablan por sí mismas.',
    summary:
      'Una selección de intervenciones publicadas por la empresa en industria, construcción, eventos e infraestructuras.',
    image: '/media/operacion-evento-2023.avif',
    imageAlt: 'Grúa de Grúas del Vallès durante un evento en el Port Fòrum.',
    details: [
      {
        title: 'Industria y puerto',
        description:
          'La galería corporativa recoge operaciones industriales, incluidas maniobras de 400 y 220 toneladas en el puerto de Barcelona.',
      },
      {
        title: 'Construcción y Infraestructuras',
        description:
          'La empresa publica operaciones de montaje, trabajos hospitalarios, grúas torre y construcción urbana.',
      },
      {
        title: 'Eventos',
        description:
          'La galería corporativa incluye montajes para eventos, pasarelas, puentes y otros trabajos especiales.',
      },
    ],
  },
  {
    id: 'personal-contacto',
    label: 'Personal de contacto',
    eyebrow: 'Directorio corporativo',
    title: 'Personal de contacto',
    summary:
      'Un equipo especializado para acompañar la planificación, ejecución y seguimiento de cada operación.',
    image: '/media/operacion-construccion-2024.avif',
    imageAlt: 'Grúa de Grúas del Vallès durante una operación de construcción.',
    details: [],
  },
  {
    id: 'contacto',
    label: 'Contacto',
    eyebrow: 'Hablemos',
    title: 'Hablemos de su próxima operación.',
    summary:
      'Comparta los requisitos de la maniobra y el equipo comercial y técnico preparará la propuesta adecuada.',
    image: '/media/hero-grua-accion-2024-01.avif',
    imageAlt: 'Grúa de Grúas del Vallès durante una operación.',
    details: [
      {
        title: 'Atención comercial',
        description: '93 849 70 22 · gruasdelvalles@gruasdelvalles.com',
      },
      {
        title: 'Base operativa',
        description:
          'Av. Sant Julià, 64-66, Polígon Industrial Congost, 08403 Granollers (Barcelona).',
      },
      {
        title: 'Cobertura',
        description: 'Catalunya y zonas colindantes, con acceso próximo a la N-152 y AP-7.',
      },
    ],
  },
]

export function getSection(sectionId: string | undefined) {
  return presentationSections.find((section) => section.id === sectionId)
}
