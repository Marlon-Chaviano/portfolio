import type { Localized } from "@/lib/i18n";
import { projectSlugs, type ProjectSlug } from "./slugs";

export type ProjectKind = "web" | "mobile" | "ai" | "oss";

type MobilePlatform = "iOS" | "Android";
type CasePoint = { title: Localized; body: Localized };

export type CaseMedia = {
  src?: string | Localized;
  dark?: string | Localized;
  frame?: "iphone";
  width: number;
  height: number;
  caption: Localized;
};

export type Project = {
  slug: ProjectSlug;
  parent?: ProjectSlug;
  name: string;
  year: string;
  kinds: ProjectKind[];
  platforms?: MobilePlatform[];
  storeLinks?: Partial<Record<MobilePlatform, string>>;
  /** Hidden from the site until the copy is real. */
  draft?: boolean;
  url?: string;
  websitePending?: boolean;
  repo?: string;
  logo: string;
  /** Cover used by the project index on the home page. */
  preview?: string;
  caseMedia: CaseMedia;
  showcaseMedia?: CaseMedia & { src: string | Localized };
  additionalMedia?: CaseMedia;
  schemaType: "SoftwareApplication" | "MobileApplication" | "SoftwareSourceCode" | "WebSite";
  applicationCategory?: "FinanceApplication" | "BusinessApplication";
  status: Localized;
  role: Localized;
  tagline: Localized;
  shortDescription?: Localized;
  summary: Localized;
  facts: { value: string | number; label: Localized }[];
  problem: Localized;
  built: CasePoint[];
  decisions: CasePoint[];
  outcome: Localized;
  stack: string[];
};

const bmoriMobileMedia = {
  src: "/projects/previews/bmori-mobile-light.webp",
  width: 360,
  height: 800,
  caption: { en: "Recent transactions", es: "Últimos movimientos" },
};

const all: Project[] = [
  {
    slug: "diodi",
    logo: "/career/diodi.png",
    preview: "/projects/diodi.jpg",
    additionalMedia: {
      src: { en: "/projects/details/diodi-sources-en-light.webp", es: "/projects/details/diodi-sources-es-light.webp" },
      dark: { en: "/projects/details/diodi-sources-en-dark.webp", es: "/projects/details/diodi-sources-es-dark.webp" },
      width: 1440,
      height: 900,
      caption: { en: "Most-cited Grialink pages", es: "Páginas de Grialink más citadas" },
    },
    caseMedia: {
      src: { en: "/projects/details/diodi-en-light.webp", es: "/projects/details/diodi-es-light.webp" },
      dark: { en: "/projects/details/diodi-en-dark.webp", es: "/projects/details/diodi-es-dark.webp" },
      width: 1440,
      height: 900,
      caption: { en: "Grialink’s visibility in AI search", es: "Visibilidad de Grialink en buscadores de IA" },
    },
    name: "Diodi",
    year: "2026",
    kinds: ["web", "ai"],
    url: "https://www.diodi.io/",
    schemaType: "SoftwareApplication",
    status: { en: "Live · in active development", es: "En línea · en desarrollo activo" },
    role: {
      en: "Sole engineer — product, UI, frontend, backend, data",
      es: "Único ingeniero: producto, UI, frontend, backend, datos",
    },
    tagline: {
      en: "I built a platform that shows how often brands appear in AI answers and which sources those answers cite.",
      es: "Construí una plataforma para medir cuándo aparecen las marcas en respuestas de IA y qué fuentes citan esas respuestas.",
    },
    shortDescription: {
      en: "More than 1,200 customers use Diodi to track brand mentions and sources cited in AI answers.",
      es: "Más de 1200 clientes usan Diodi para seguir las menciones de marca y las fuentes citadas en respuestas de IA.",
    },
    summary: {
      en: "I designed and built Diodi so a marketing team can check how AI search engines describe its brand. The dashboard connects each visibility report to the answers collected for that project.",
      es: "Diseñé y desarrollé Diodi para que un equipo de marketing pueda ver cómo describen su marca los buscadores de IA. Desde el panel se puede pasar de un informe de visibilidad a las respuestas recopiladas para ese proyecto.",
    },
    facts: [
      { value: "1200+", label: { en: "customers", es: "clientes" } },
    ],
    problem: {
      en: "A brand can appear in an answer while the link sends the reader to a competitor. I needed to make mentions and citations separately measurable and let the reader inspect the source of either number.",
      es: "Una respuesta puede mencionar una marca y enviar al lector a la web de un competidor. Necesitaba medir las menciones y las citas por separado y poder rastrear de dónde salía cada cifra.",
    },
    built: [
      {
        title: { en: "From a question to its cited sources", es: "De una pregunta a sus fuentes" },
        body: {
          en: "I built the collection pipeline, the Rails reporting API and the Vue dashboard. A team can compare engines, pick a question and inspect the answer and the pages it cited.",
          es: "Desarrollé la recogida de respuestas, la API de informes en Rails y el panel en Vue. El equipo puede comparar buscadores, elegir una pregunta y consultar tanto la respuesta como las páginas citadas.",
        },
      },
      {
        title: { en: "Traffic alongside visibility", es: "Tráfico y visibilidad" },
        body: {
          en: "I integrated Google Analytics so teams can compare incoming traffic with the visibility report. The interface flags gaps in the analytics data and discrepancies that deserve a closer look.",
          es: "Integré Google Analytics para comparar el tráfico recibido con la visibilidad de la marca. El panel señala lagunas en los datos de analítica y discrepancias que conviene investigar.",
        },
      },
      {
        title: { en: "The cost of a measurement", es: "El coste de una medición" },
        body: {
          en: "I connected Stripe billing and added a credit estimate before a user expands a paid analysis. I also built exports so the team can share the findings outside the dashboard.",
          es: "Integré los cobros con Stripe y calculé los créditos que costará ampliar un análisis antes de que el usuario lo solicite. También desarrollé la exportación de resultados para compartirlos fuera del panel.",
        },
      },
      {
        title: { en: "Technical audits for cited pages", es: "Auditoría técnica de páginas citadas" },
        body: {
          en: "I wrote checks for crawler access, indexing directives and canonical URLs. They help explain why a page might be hard for a search engine to find or index.",
          es: "Implementé comprobaciones de acceso para rastreadores, directivas de indexación y URLs canónicas. Sirven para investigar por qué a un buscador le cuesta encontrar o indexar una página.",
        },
      },
      {
        title: { en: "Competitor discovery", es: "Detección de competidores" },
        body: {
          en: "I built a review step for brands that turn up in collected answers. A team can inspect a suggested competitor and decide whether to include it in future comparisons.",
          es: "Desarrollé la revisión de marcas detectadas en las respuestas. El equipo puede examinar cada competidor sugerido y decidir si lo incorpora a sus comparaciones.",
        },
      },
    ],
    decisions: [
      {
        title: { en: "Reuse the right report", es: "Reutilizar el informe correcto" },
        body: {
          en: "I moved expensive aggregations into background jobs. The cache key includes the filters, and each report carries its preparation time. While it refreshes, the team can read the last valid result for up to 30 minutes.",
          es: "Pasé las agregaciones más costosas a tareas en segundo plano. La clave de caché incluye los filtros y cada informe conserva su hora de cálculo. Durante la actualización, el equipo puede consultar el último resultado válido durante un máximo de 30 minutos.",
        },
      },
      {
        title: { en: "Give zero a precise meaning", es: "Distinguir un cero de un dato pendiente" },
        body: {
          en: "I kept a missing analytics reading distinct from a measured zero. When both sources cover the same site and period, clicks in Search Console alongside zero sessions in GA4 warrant investigation. In that case, the dashboard flags a possible discrepancy. If either source lacks data, it marks the comparison as unavailable.",
          es: "Separé las lecturas pendientes de los ceros medidos. Si ambas fuentes cubren el mismo sitio y período, y Search Console registra clics mientras GA4 devuelve cero sesiones, el panel señala una posible discrepancia. Si faltan datos de alguna fuente, indica que la comparación aún no está disponible.",
        },
      },
    ],
    outcome: {
      en: "A team reviewing its brand can now trace a citation count back to a specific answer and URL. The Grialink example in the gallery shows which pages were cited, giving the team a concrete starting point for its next content review.",
      es: "Hoy un equipo puede rastrear un recuento de citas hasta la respuesta y la URL que lo explican. El ejemplo de Grialink en la galería muestra qué páginas aparecieron como fuentes y le da al equipo un punto de partida para revisar su contenido.",
    },
    stack: ["Ruby on Rails", "Vue", "TypeScript", "Pinia", "Vite", "Redis", "PostgreSQL (RLS)", "Sidekiq", "TanStack Query", "Tailwind CSS", "Stripe", "GA4", "Playwright", "Vitest", "RSpec", "Heroku"],
  },
  {
    slug: "grialink",
    logo: "/career/grialink.png",
    preview: "/projects/grialink.jpg",
    additionalMedia: {
      src: "/projects/details/grialink-call-history-light.webp",
      dark: "/projects/details/grialink-call-history-dark.webp",
      width: 1230,
      height: 776,
      caption: { en: "Call history with quality scores", es: "Historial de llamadas con puntuaciones" },
    },
    caseMedia: {
      src: "/projects/details/grialink-light.webp",
      dark: "/projects/details/grialink-dark.webp",
      width: 1280,
      height: 820,
      caption: { en: "Shared inbox and contact details", es: "Bandeja compartida y ficha de contacto" },
    },
    name: "Grialink",
    year: "2025—26",
    kinds: ["web", "ai"],
    url: "https://www.grialink.com/",
    schemaType: "SoftwareApplication",
    status: {
      en: "Web, iOS and Android available",
      es: "Disponible en web, iOS y Android",
    },
    role: {
      en: "Sole engineer — web platform, mobile app, landing",
      es: "Único ingeniero: plataforma web, app móvil, landing",
    },
    tagline: {
      en: "I extended Chatwoot with AI agents for calls, inbox messages and appointment booking.",
      es: "Amplié Chatwoot con agentes de IA que atienden llamadas, responden mensajes y agendan citas.",
    },
    shortDescription: {
      en: "AI agents for calls, messages and bookings. More than 150 active businesses and 500 users in total.",
      es: "Agentes de IA para llamadas, mensajes y citas. Más de 150 negocios activos y 500 usuarios en total.",
    },
    summary: {
      en: "I built the voice and messaging agents for Grialink on top of Chatwoot’s shared inbox. A practice can use the same workspace to answer a call, book a visit and follow up with the patient.",
      es: "Desarrollé los agentes de voz y mensajería de Grialink sobre la bandeja compartida de Chatwoot. Desde un mismo espacio, una clínica puede atender una llamada, agendar una visita y retomar la conversación con el paciente.",
    },
    facts: [
      { value: "150+", label: { en: "active businesses", es: "negocios activos" } },
      { value: 500, label: { en: "total users", es: "usuarios en total" } },
    ],
    problem: {
      en: "A receptionist needs to know which times are free before promising a visit. A colleague taking over later needs the conversation, the appointment and the call record to agree.",
      es: "Para ofrecer una cita, la recepción necesita saber qué horarios están libres. Quien retome el caso después debe poder relacionar la conversación, la reserva y el registro de la llamada.",
    },
    built: [
      {
        title: { en: "Voice reception and booking", es: "Recepción por voz y reserva de citas" },
        body: {
          en: "I built Grial Front Desk to answer calls, check business hours and services, and book an available slot. It can transfer the call when a member of staff needs to take over.",
          es: "Desarrollé Grial Front Desk para atender llamadas, consultar horarios y servicios y reservar un turno disponible. Cuando hace falta la intervención del personal, el recepcionista puede transferir la llamada.",
        },
      },
      {
        title: { en: "Grial Mind in the shared inbox", es: "Grial Mind en la bandeja compartida" },
        body: {
          en: "I built the agent that replies using the business’s knowledge and tools. Staff can take over the existing conversation and see what the agent has already told the customer.",
          es: "Creé el agente que responde con la información y las herramientas del negocio. El equipo puede retomar el mismo hilo y ver qué le ha dicho ya el agente al cliente.",
        },
      },
      {
        title: { en: "A call record the team can review", es: "Un historial que el equipo puede revisar" },
        body: {
          en: "I integrated Twilio Voice on web and mobile and built the call history with recordings, transcripts and quality scores.",
          es: "Integré Twilio Voice en la web y en la app móvil y desarrollé el historial con grabaciones, transcripciones y puntuaciones de calidad.",
        },
      },
      {
        title: { en: "Appointment reminders", es: "Recordatorios de citas" },
        body: {
          en: "I built the scheduler for confirmations and reminders. When a visit moves, it cancels the pending reminders and schedules them for the new time.",
          es: "Desarrollé la programación de confirmaciones y recordatorios. Si una cita cambia de hora, se cancelan los avisos pendientes y se programan para el nuevo horario.",
        },
      },
      {
        title: { en: "A guide to the agents", es: "Guía de los agentes" },
        body: {
          en: "I built the public pages that introduce each agent. A clinic can explore how voice reception, messaging and appointment follow-up fit into its daily work.",
          es: "Desarrollé las páginas que presentan a cada agente. La clínica puede explorar cómo encajan la recepción de llamadas, la mensajería y el seguimiento de citas en su trabajo diario.",
        },
      },
    ],
    decisions: [
      {
        title: { en: "Keep the conversation when a person takes over", es: "Conservar el hilo al pasar a una persona" },
        body: {
          en: "I extended the existing Chatwoot inbox and contact records with agent tools. That kept the customer’s message history in the place where staff already reply and let me concentrate the new work on calls and booking.",
          es: "Amplié la bandeja y las fichas de contacto de Chatwoot con herramientas para los agentes. Así el historial quedó en el mismo lugar donde responde el personal y pude concentrar el desarrollo en las llamadas y las reservas.",
        },
      },
      {
        title: { en: "One definition of an available slot", es: "Una sola regla para ofrecer horarios" },
        body: {
          en: "I used the same availability service for the booking portal and the agents. It combines opening hours, appointments and busy intervals from connected calendars. If a calendar cannot be read, the agent cannot offer that time as free.",
          es: "Usé el mismo servicio de disponibilidad para el portal de reservas y los agentes. Cruza horarios de apertura, citas existentes e intervalos ocupados en calendarios conectados. Si falla la consulta de un calendario, el agente no ofrece esa hora como libre.",
        },
      },
    ],
    outcome: {
      en: "Grialink runs on the web and has companion apps for iOS and Android. After a receptionist handles a call, staff can open its recording and transcript, review the analysis and decide what follow-up the customer needs.",
      es: "Grialink está disponible en web, iOS y Android. Después de que el recepcionista atiende una llamada, el equipo puede escuchar la grabación, leer la transcripción y usar el análisis para decidir cómo dar seguimiento al cliente.",
    },
    stack: ["Ruby on Rails", "PostgreSQL", "Redis", "Sidekiq", "Vue", "Vuex", "Vite", "React Native", "Expo SDK", "TypeScript", "Twilio Voice", "Firebase Messaging", "TanStack Query", "Zustand", "Astro", "GSAP", "Maestro", "EAS", "Playwright", "RSpec"],
  },
  {
    slug: "grialink-mobile",
    logo: "/career/grialink.png",
    parent: "grialink",
    name: "Grialink Mobile",
    year: "2026",
    kinds: ["mobile"],
    platforms: ["iOS", "Android"],
    storeLinks: {
      iOS: "https://apps.apple.com/us/app/grialink/id6809925998",
      Android: "https://play.google.com/store/apps/details?id=com.grialink",
    },
    additionalMedia: {
      src: "/projects/details/grialink-mobile-call-analysis.webp",
      width: 1206,
      height: 2622,
      frame: "iphone",
      caption: { en: "Call analysis and follow-up", es: "Análisis de llamada y seguimiento" },
    },
    schemaType: "MobileApplication",
    applicationCategory: "BusinessApplication",
    caseMedia: {
      src: "/projects/grialink-mobile.webp",
      width: 447,
      height: 894,
      caption: { en: "Shared inbox on iPhone", es: "Bandeja compartida en iPhone" },
    },
    status: {
      en: "Available on iOS and Android",
      es: "Disponible en iOS y Android",
    },
    role: { en: "Mobile app development", es: "Desarrollo de la aplicación móvil" },
    tagline: {
      en: "Grialink’s shared inbox and business calls on iOS and Android.",
      es: "La bandeja compartida y las llamadas de Grialink en iOS y Android.",
    },
    shortDescription: {
      en: "A mobile app for managing customer conversations, contacts and business calls.",
      es: "App para gestionar conversaciones, contactos y llamadas de clientes desde el móvil.",
    },
    summary: {
      en: "I built Grialink’s iOS and Android app with React Native, Expo and TypeScript. It gives teams access to the same conversations, contacts and calls they manage on the web.",
      es: "Desarrollé la app de Grialink para iOS y Android con React Native, Expo y TypeScript. Desde el móvil, los equipos pueden acceder a las mismas conversaciones, contactos y llamadas que gestionan en la web.",
    },
    facts: [],
    problem: {
      en: "Teams needed to follow up on conversations and handle calls when they were away from the web dashboard.",
      es: "Los equipos necesitaban seguir las conversaciones y gestionar llamadas cuando estaban lejos del panel web.",
    },
    built: [
      {
        title: { en: "Business calls on a personal device", es: "Llamadas desde el número del negocio" },
        body: {
          en: "I integrated Twilio Voice so staff can receive calls and call back from their Grialink number. I built the Recents and call detail screens, including playback, the transcript and the analysis when available.",
          es: "Integré Twilio Voice para recibir llamadas y devolverlas desde el número de Grialink. Desarrollé las vistas de llamadas recientes y de detalle, con reproducción, transcripción y análisis cuando están disponibles.",
        },
      },
      {
        title: { en: "The inbox away from the desk", es: "La bandeja fuera de la oficina" },
        body: {
          en: "I brought conversations and contacts into the React Native app. Staff can open a message notification, read the thread and reply with a photo or document from the phone.",
          es: "Llevé las conversaciones y los contactos a la app de React Native. El equipo puede abrir un aviso, leer el hilo y responder con una foto o un documento desde el teléfono.",
        },
      },
      {
        title: { en: "Device access and call tests", es: "Acceso al dispositivo y pruebas de llamadas" },
        body: {
          en: "I added biometric unlock and secure session storage. I also covered notification routing and voice registration in automated tests, alongside Maestro flows for the mobile interface.",
          es: "Implementé el desbloqueo biométrico y el almacenamiento seguro de la sesión. Añadí pruebas automatizadas para la navegación desde notificaciones y el registro de llamadas entrantes, además de recorridos de interfaz con Maestro.",
        },
      },
      {
        title: { en: "Contact notes", es: "Notas de contacto" },
        body: {
          en: "I built the mobile contact notes view so staff can record a follow-up after a call and read earlier notes before contacting the customer again.",
          es: "Desarrollé las notas de contacto para que el equipo pueda anotar el seguimiento de una llamada y consultar lo acordado antes de volver a contactar al cliente.",
        },
      },
    ],
    decisions: [
      {
        title: { en: "Keep incoming calls reachable", es: "Mantener la recepción de llamadas" },
        body: {
          en: "Android can rotate its push token while the app is closed. On return, I compare it with the token registered for voice and renew the registration if it changed. The regression test covers a phone whose voice access token is still valid.",
          es: "Android puede cambiar el identificador de notificaciones mientras la app está cerrada. Al volver, lo comparo con el registrado para recibir llamadas y renuevo el registro si cambió. La prueba cubre el caso en que la credencial de voz todavía es válida.",
        },
      },
      {
        title: { en: "Open the notification in its workspace", es: "Abrir el aviso en la cuenta correcta" },
        body: {
          en: "A team member may belong to several accounts. Before opening a call or conversation from a push notification, the app switches to its account and checks access. This avoids sending someone to an empty thread in the wrong workspace.",
          es: "Una persona puede pertenecer a varias cuentas. Antes de abrir una llamada o conversación desde una notificación, la app selecciona la cuenta de origen y comprueba el acceso. Así evita abrir un hilo vacío en otro espacio de trabajo.",
        },
      },
    ],
    outcome: {
      en: "The app is available on the App Store and Google Play for teams with a Grialink account. A missed call can now be followed up on the same phone, from the call record through to a callback or a message.",
      es: "La app está disponible en App Store y Google Play para equipos con cuenta de Grialink. Desde el teléfono, el equipo puede revisar una llamada perdida y responder con otra llamada o un mensaje.",
    },
    stack: ["React Native", "Expo SDK", "TypeScript", "Twilio Voice", "Firebase Messaging", "Zustand", "Maestro", "EAS"],
  },
  {
    slug: "first-commit",
    logo: "/projects/first-commit-symbol.svg",
    preview: "/projects/first-commit.jpg",
    additionalMedia: {
      src: "/projects/details/first-commit-configurator-light.webp",
      dark: "/projects/details/first-commit-configurator-dark.webp",
      width: 1440,
      height: 900,
      caption: { en: "Expo kit configuration", es: "Configuración del kit de Expo" },
    },
    caseMedia: {
      src: "/projects/previews/first-commit-light.webp",
      dark: "/projects/previews/first-commit-dark.webp",
      width: 1280,
      height: 800,
      caption: { en: "Kit installation preview", es: "Vista previa de la instalación" },
    },
    name: "first-commit",
    year: "2026",
    kinds: ["oss", "ai"],
    url: "https://first-commit.dev",
    repo: "https://github.com/Marlon-Chaviano/first-commit",
    schemaType: "SoftwareSourceCode",
    status: { en: "Open source · MIT", es: "Código abierto · MIT" },
    role: { en: "Author and maintainer", es: "Autor y mantenedor" },
    tagline: {
      en: "I published a CLI that sets up projects for coding agents with 70 kits across nine languages.",
      es: "Publiqué una CLI que prepara proyectos para agentes de código con 70 kits en nueve lenguajes.",
    },
    shortDescription: {
      en: "An open-source CLI that sets up projects for coding agents.",
      es: "Una CLI de código abierto que prepara proyectos para agentes de programación.",
    },
    summary: {
      en: "I created first-commit to package the setup I kept repeating on new projects. A kit describes the stack, tools and instructions for a coding agent. Developers can choose their options and inspect the install plan before it runs.",
      es: "Creé first-commit para empaquetar la configuración que repetía al empezar proyectos. Cada kit describe el stack, las herramientas y las instrucciones para el agente de programación. Quien lo usa puede elegir las opciones y revisar el plan antes de ejecutarlo.",
    },
    facts: [
      { value: "70", label: { en: "official kits", es: "kits oficiales" } },
      { value: "9", label: { en: "languages", es: "lenguajes" } },
    ],
    problem: {
      en: "Starting a project with an agent means scaffolding it, installing a UI library, hunting for the right skills, wiring an MCP server, and then explaining the conventions again in every new session.",
      es: "Empezar un proyecto con un agente implica generarlo, instalar una librería de UI, buscar las skills adecuadas, conectar un servidor MCP y volver a explicar las convenciones en cada sesión nueva.",
    },
    built: [
      {
        title: { en: "The CLI and kit format", es: "La CLI y el formato de los kits" },
        body: {
          en: "I designed the kit schema and wrote the CLI that resolves a developer’s choices into files, dependencies and agent instructions. It also records what it installed so the project can receive kit updates.",
          es: "Diseñé el esquema de los kits y desarrollé la CLI que convierte las opciones elegidas en archivos, dependencias e instrucciones para el agente. La CLI registra lo que instala para poder actualizar el proyecto después.",
        },
      },
      {
        title: { en: "A catalog developers can inspect", es: "Un catálogo que se puede explorar" },
        body: {
          en: "I built the registry and web configurator. Developers can compare kits, select their agent and package manager, and copy a command for that exact combination. I added build checks for combinations of kit options.",
          es: "Desarrollé el registro y el configurador web. Se pueden comparar kits, elegir agente y gestor de paquetes y copiar el comando que corresponde a esa combinación. Añadí comprobaciones que compilan proyectos con distintas combinaciones de opciones.",
        },
      },
      {
        title: { en: "Kit setup from a coding agent", es: "Configurar un kit desde un agente" },
        body: {
          en: "I wrote an MCP server so a coding agent can search the catalog and show the setup plan in the conversation. The hosted server returns a command. The local server can run the installer after the developer approves the plan.",
          es: "Desarrollé un servidor MCP para que un agente pueda buscar kits y mostrar el plan de instalación en la conversación. El servidor alojado devuelve el comando. El servidor local puede ejecutar la instalación cuando el usuario aprueba el plan.",
        },
      },
      {
        title: { en: "Project diagnostics", es: "Diagnóstico del proyecto" },
        body: {
          en: "I wrote the doctor command to find missing setup files, environment variables and agent skills. It can report errors directly in CI when a project drifts from its kit.",
          es: "Escribí el comando doctor para detectar archivos de configuración, variables de entorno y herramientas del agente que faltan. Los errores también se pueden detectar en integración continua.",
        },
      },
      {
        title: { en: "Kits for existing projects", es: "Kits para proyectos existentes" },
        body: {
          en: "I built the add command for installing individual catalog items in an existing repository. A developer can preview the changes before applying them to the project.",
          es: "Desarrollé el comando add para instalar elementos del catálogo en un repositorio existente. El desarrollador puede revisar los cambios previstos antes de aplicarlos.",
        },
      },
    ],
    decisions: [
      {
        title: { en: "Separate planning from execution", es: "Separar la planificación de la ejecución" },
        body: {
          en: "I made kit resolution produce a list of steps before the CLI writes files or runs commands. The dry run and the installer consume the same plan, so the preview reflects what the installer is about to do.",
          es: "Hice que la resolución del kit produzca una lista de pasos antes de escribir archivos o ejecutar comandos. La simulación y el instalador leen el mismo plan, de modo que la vista previa refleja lo que se va a ejecutar.",
        },
      },
      {
        title: { en: "Preserve edits across kit updates", es: "Respetar los cambios al actualizar un kit" },
        body: {
          en: "The CLI saves a hash of each managed file in kits.lock. During an update it compares that baseline with the file on disk. A developer can accept upstream changes to untouched files while keeping edits and deletions they made locally.",
          es: "La CLI guarda en kits.lock una huella de cada archivo que gestiona. Al actualizar, la compara con el archivo que hay en disco. Así se pueden incorporar cambios del kit en archivos intactos y conservar las ediciones y eliminaciones locales.",
        },
      },
    ],
    outcome: {
      en: "The CLI and official kits are public under the MIT license. To inspect a real setup, run npx create-first-commit landing-next demo --dry-run. It prints the steps for a Next.js project and leaves the project directory untouched.",
      es: "La CLI y los kits oficiales son públicos bajo licencia MIT. Para inspeccionar un caso real, ejecuta npx create-first-commit landing-next demo --dry-run. Muestra los pasos para preparar un proyecto de Next.js y deja intacto el directorio del proyecto.",
    },
    stack: ["TypeScript", "Node.js", "pnpm workspaces", "MCP", "Next.js", "React", "Tailwind CSS", "PostgreSQL", "Drizzle ORM", "Better Auth", "Stripe", "Zod", "Vitest", "Playwright", "GitHub Actions"],
  },
  {
    slug: "bmori",
    logo: "/career/bmori-mobile.png",
    name: "B-Morï",
    year: "2026",
    kinds: ["web"],
    websitePending: true,
    caseMedia: {
      src: "/projects/details/bmori-web-dashboard.webp",
      width: 2836,
      height: 1700,
      caption: { en: "Weekly inflows and outflows", es: "Entradas y salidas semanales" },
    },
    additionalMedia: {
      src: "/projects/details/bmori-web-operations.webp",
      width: 2847,
      height: 1693,
      caption: { en: "Spending by transaction type", es: "Gastos por tipo de operación" },
    },
    schemaType: "SoftwareApplication",
    applicationCategory: "FinanceApplication",
    status: { en: "Mobile complete · web in development", es: "App móvil terminada · web en desarrollo" },
    role: { en: "Web and mobile development", es: "Desarrollo web y móvil" },
    tagline: {
      en: "Mobile and web banking for Bonafide Microbank.",
      es: "Banca móvil y web para Bonafide Microbank.",
    },
    shortDescription: {
      en: "Bonafide Microbank’s banking app. The mobile app is built and the web version is in development.",
      es: "La banca de Bonafide Microbank. La app móvil está terminada y la versión web está en desarrollo.",
    },
    summary: {
      en: "After building Bonafide Microbank’s mobile app, I started its web banking interface. The account overview shows money in and out, and the operations view lets a customer investigate an amount down to an individual transaction.",
      es: "Después de desarrollar la app móvil de Bonafide Microbank, empecé la banca web. El resumen muestra las entradas y salidas de dinero. Desde la vista de operaciones, el cliente puede investigar un importe hasta localizar el movimiento que lo explica.",
    },
    problem: {
      en: "A customer looking into an unfamiliar debit needs more than a balance. The account, period and type of operation matter, especially when the same customer holds several accounts.",
      es: "Cuando un cliente investiga un cargo que no reconoce, el saldo dice poco por sí solo. Necesita identificar el período, el tipo de operación y la cuenta de origen, sobre todo si tiene varias.",
    },
    facts: [],
    built: [
      {
        title: { en: "Account overview", es: "Resumen de la cuenta" },
        body: {
          en: "I built the account switcher and the overview of cash flows, operation types and recent activity. The selected period sets the context for both the charts and the totals.",
          es: "Desarrollé el selector de cuentas y el resumen de entradas, salidas, tipos de operación y actividad reciente. El período elegido determina qué movimientos entran en los gráficos y los totales.",
        },
      },
      {
        title: { en: "Searchable operations", es: "Consulta de operaciones" },
        body: {
          en: "I built the spending breakdown and transaction list with filters for account, period and operation type. Customers can narrow the list by recipient or reference when an amount alone is ambiguous.",
          es: "Desarrollé el desglose de gastos y el listado de movimientos con filtros por cuenta, período y tipo de operación. Cuando el importe no basta para identificar un cargo, se puede buscar por destinatario o referencia.",
        },
      },
      {
        title: { en: "Transfer review", es: "Revisión de transferencias" },
        body: {
          en: "I connected the web forms to server-side actions for quoting and submitting operations. The review step gives the customer the amount and fees before authorization.",
          es: "Conecté los formularios web con las acciones de servidor que calculan el coste y envían las operaciones. El cliente puede revisar el importe y las comisiones antes de autorizar el envío.",
        },
      },
      {
        title: { en: "Account statements", es: "Estados de cuenta" },
        body: {
          en: "I built a statement view that brings together the available balance, money in and out, and dated entries for the selected account and period.",
          es: "Desarrollé el estado de cuenta que reúne el saldo disponible, las entradas, las salidas y el detalle por fecha para la cuenta y el período elegidos.",
        },
      },
      {
        title: { en: "Cash pickup codes", es: "Códigos de retiro" },
        body: {
          en: "I added a way to resend the pickup code for a pending cash withdrawal. The replacement invalidates the earlier code, so the recipient knows which one to use.",
          es: "Añadí el reenvío del código de retiro cuando el efectivo sigue pendiente de cobro. El nuevo código invalida el anterior para que el destinatario pueda usar el último que recibió.",
        },
      },
    ],
    decisions: [
      {
        title: { en: "Put the history filters in the URL", es: "Guardar los filtros del historial en la URL" },
        body: {
          en: "I used the URL as the source for the account, period, operation type and search text. Reloading restores the same investigation. Text searches wait briefly while the customer types before requesting another result.",
          es: "Usé la URL para conservar la cuenta, el período, el tipo de operación y la búsqueda. Al recargar se recupera la misma consulta. El buscador espera una pausa al escribir para evitar una petición por cada tecla.",
        },
      },
      {
        title: { en: "Validate monetary operations on the server", es: "Validar las operaciones en el servidor" },
        body: {
          en: "I kept the banking session on the server and validated operation inputs there with Zod. The browser submits the customer’s choices and receives a result the interface can explain, while the server handles the credentials for the banking API.",
          es: "Mantuve la sesión bancaria en el servidor y validé allí los datos de cada operación con Zod. El navegador envía las opciones elegidas y recibe un resultado que puede mostrar al cliente. Las credenciales para la API bancaria se gestionan en el servidor.",
        },
      },
    ],
    outcome: {
      en: "The mobile app is complete and the web version is in development. Its demo can show both a populated account and one with no movements. The web screenshots here show the two views available for investigating activity with simulated transactions.",
      es: "La aplicación móvil está terminada y la web sigue en desarrollo. La demo permite recorrer tanto una cuenta con movimientos como una sin actividad. Las capturas muestran cómo se investiga el gasto desde el resumen y el historial con operaciones simuladas.",
    },
    stack: ["Next.js", "React", "TypeScript", "Zod", "React Native", "Expo SDK"],
  },
  {
    slug: "bmori-mobile",
    parent: "bmori",
    logo: "/career/bmori-mobile.png",
    name: "B-Morï Mobile",
    year: "2026",
    kinds: ["mobile"],
    platforms: ["iOS", "Android"],
    additionalMedia: {
      frame: "iphone",
      src: "/projects/details/bmori-mobile-send-cash.webp",
      width: 1206,
      height: 2622,
      caption: { en: "Sending 25,000 XAF", es: "Envío de 25.000 XAF" },
    },
    showcaseMedia: bmoriMobileMedia,
    caseMedia: {
      frame: "iphone",
      src: "/projects/details/bmori-mobile-home.webp",
      width: 1206,
      height: 2622,
      caption: { en: "Account home with balance hidden", es: "Inicio con el saldo oculto" },
    },
    schemaType: "MobileApplication",
    applicationCategory: "FinanceApplication",
    status: { en: "Development complete", es: "Desarrollo completado" },
    role: {
      en: "Mobile architecture and development",
      es: "Arquitectura y desarrollo móvil",
    },
    tagline: {
      en: "I rebuilt Bonafide Microbank’s app for viewing account activity, transferring money and topping up phones.",
      es: "Reconstruí la app de Bonafide Microbank para consultar operaciones, hacer transferencias y recargar teléfonos.",
    },
    shortDescription: {
      en: "Bonafide Microbank’s app for checking transactions and sending money.",
      es: "La app de Bonafide Microbank para consultar transacciones y hacer transferencias.",
    },
    summary: {
      en: "I rebuilt Bonafide Microbank’s Codename One app in React Native for iOS and Android. My work covered the transaction flow from checking an account through authorizing a payment and retrieving its receipt.",
      es: "Reconstruí en React Native la app de Bonafide Microbank, que antes usaba Codename One. Desarrollé el recorrido en iOS y Android desde la consulta de una cuenta hasta la autorización de un pago y la obtención de su comprobante.",
    },
    facts: [],
    problem: {
      en: "Several banking services were still being connected during the rebuild. I needed to develop and test each journey independently, including what customers see when a service is unavailable or a transfer is still pending.",
      es: "Durante la reconstrucción aún se estaban conectando varios servicios bancarios. Necesitaba desarrollar y probar cada operación por separado, incluido lo que ve el cliente si un servicio falla o una transferencia sigue pendiente.",
    },
    built: [
      {
        title: { en: "Transfers and top-ups", es: "Transferencias y recargas" },
        body: {
          en: "I implemented cash sends, account transfers, regional CEMAC transfers and Airtel top-ups. For a regional transfer, the customer reviews the beneficiary, destination bank, fees and total before entering a PIN.",
          es: "Implementé envíos de efectivo, transferencias entre cuentas, transferencias regionales CEMAC y recargas de Airtel. Para una transferencia regional, el cliente revisa el beneficiario, el banco de destino, las comisiones y el total antes de introducir el PIN.",
        },
      },
      {
        title: { en: "History and receipts", es: "Historial y comprobantes" },
        body: {
          en: "I built the activity and receipt views, including PDF receipts a customer can share from the phone. I also integrated biometric unlock for returning to the app.",
          es: "Desarrollé el historial y las vistas de comprobantes, incluida la generación de recibos en PDF que se pueden compartir desde el móvil. También integré el desbloqueo biométrico para volver a la app.",
        },
      },
      {
        title: { en: "Agent and branch finder", es: "Localizador de agentes y sucursales" },
        body: {
          en: "I built a directory of agents and bank branches. Customers can search by city and open a location in their phone’s maps app.",
          es: "Desarrollé el directorio de agentes y sucursales. El cliente puede buscar por ciudad y abrir la dirección elegida en la aplicación de mapas del móvil.",
        },
      },
      {
        title: { en: "Transaction limits", es: "Límites por operación" },
        body: {
          en: "I built a limits screen that shows the minimum and maximum per transaction, how much of the allowance is used and how much remains in the selected period.",
          es: "Creé la consulta de límites para ver el mínimo y el máximo por operación, cuánto se ha utilizado y cuánto queda disponible en el período elegido.",
        },
      },
    ],
    decisions: [
      {
        title: { en: "Keep a pending transfer identifiable", es: "Dar seguimiento a una transferencia pendiente" },
        body: {
          en: "Submitting a CEMAC transfer can return a pending operation. I keep its identifier so the app can check that same transfer when the customer returns. The interface distinguishes acceptance, rejection and a refund.",
          es: "El envío de una transferencia CEMAC puede devolver una operación pendiente. Conservo su identificador para que la app consulte esa misma transferencia cuando el cliente vuelva. La interfaz distingue la aceptación, el rechazo y el reembolso.",
        },
      },
      {
        title: { en: "Integrate one service at a time", es: "Conectar los servicios por separado" },
        body: {
          en: "I put identity, agency and catalog calls behind separate adapters. Development can simulate the services still being connected. Preview and production builds surface an unavailable service explicitly, so a missing integration cannot look like a successful payment.",
          es: "Separé las conexiones de identidad, agencia y catálogo. En desarrollo se pueden simular los servicios pendientes de integración. En las compilaciones de prueba y producción, la app indica qué servicio no está disponible para que el cliente no confunda un fallo con un pago realizado.",
        },
      },
    ],
    outcome: {
      en: "Development for iOS and Android is complete. The transfer tests cover fees before authorization and what happens after submission, including a pending operation that is later rejected and refunded. Those cases matter when a customer needs to know whether to send money again.",
      es: "El desarrollo para iOS y Android está terminado. Las pruebas de transferencias cubren las comisiones antes de autorizar y lo que ocurre después del envío, incluido un movimiento pendiente que acaba rechazado y reembolsado. Ese estado permite al cliente saber qué pasó con su dinero antes de intentar otro envío.",
    },
    stack: ["Expo SDK", "React Native", "TypeScript", "Expo Router", "TanStack Query", "Zustand", "React Hook Form", "Zod", "SQLite", "Jest", "EAS"],
  },
  {
    slug: "global-dentistry-group",
    logo: "/career/global.png",
    preview: "/projects/global-dentistry-group.jpg",
    additionalMedia: {
      src: "/projects/details/global-dentistry-home-mobile.webp",
      width: 780,
      height: 1688,
      caption: { en: "Dental clinic homepage on mobile", es: "Portada de la clínica dental en móvil" },
    },
    caseMedia: {
      src: "/projects/previews/global-dentistry-group-light.webp",
      width: 1280,
      height: 800,
      caption: { en: "Dental services and appointment requests", es: "Servicios dentales y solicitud de citas" },
    },
    name: "Global Dentistry Group",
    year: "2025",
    kinds: ["web"],
    url: "https://global-dentistry-group.vercel.app",
    schemaType: "WebSite",
    status: { en: "Live", es: "En línea" },
    role: { en: "Design and development", es: "Diseño y desarrollo" },
    tagline: {
      en: "I built the dental group’s website and connected its appointment form to the booking API.",
      es: "Desarrollé el sitio del grupo dental y conecté el formulario de citas con la API de reservas.",
    },
    shortDescription: {
      en: "A dental clinic website with service information and appointment booking.",
      es: "Sitio de una clínica dental con información de servicios y reserva de citas.",
    },
    summary: {
      en: "I designed and built the public site for a clinic that offers both dental and spa treatments. I connected its service pages to an appointment form that carries the patient’s treatment choice into the request.",
      es: "Diseñé y desarrollé el sitio de una clínica que ofrece tratamientos dentales y de spa. Conecté las páginas de servicios con un formulario que conserva el tratamiento elegido al solicitar una cita.",
    },
    facts: [],
    problem: {
      en: "Dental and spa patients share a reception desk but choose from different treatments. Someone who had already picked a service on the site needed a way to request a date without searching the catalog again.",
      es: "Los pacientes de odontología y de spa pasan por la misma recepción, pero eligen entre tratamientos distintos. Quien ya había escogido un servicio en la web necesitaba poder pedir una fecha sin buscar de nuevo en el catálogo.",
    },
    built: [
      {
        title: { en: "From treatment to appointment", es: "Del tratamiento a la solicitud" },
        body: {
          en: "I designed the responsive service pages and the booking dialog. A treatment page can open the dialog with its service already selected. Patients who enter through the general booking link can choose between the dental and spa catalogs.",
          es: "Diseñé las páginas de servicios y el formulario de citas para móvil y escritorio. Desde una página de tratamiento, el formulario puede abrirse con el servicio ya elegido. Desde el acceso general se puede escoger entre odontología y spa.",
        },
      },
      {
        title: { en: "Booking API integration", es: "Integración con la API de citas" },
        body: {
          en: "I implemented the date picker, contact fields and request submission. The form gives patients a confirmation when the API accepts the request and a way to retry or contact reception if it fails.",
          es: "Implementé el calendario, los campos de contacto y el envío de la solicitud. El formulario confirma la recepción cuando la API la acepta. Si falla, el paciente puede reintentarlo o contactar con recepción.",
        },
      },
      {
        title: { en: "Meet the clinical team", es: "Presentación del equipo clínico" },
        body: {
          en: "I built the team directory with portraits, names and clinical roles. On a phone, patients can see who works at the practice before they request a visit.",
          es: "Desarrollé el directorio del equipo con retratos, nombres y especialidades o cargos. Desde el móvil, un paciente puede conocer al personal antes de solicitar la cita.",
        },
      },
    ],
    decisions: [
      {
        title: { en: "Represent a visit as a calendar date", es: "Enviar la fecha como día de calendario" },
        body: {
          en: "The form sends the preferred visit and birth dates as calendar dates. Serializing them as UTC timestamps could turn the patient’s selection into the previous or following day when systems use different time zones.",
          es: "El formulario envía tanto la fecha preferida como la de nacimiento como días de calendario. Convertirlas en instantes UTC podría desplazar la fecha elegida un día al pasar entre sistemas con distintos husos horarios.",
        },
      },
      {
        title: { en: "Clear the form only after acceptance", es: "Vaciar el formulario tras la confirmación" },
        body: {
          en: "I tied the success message and form reset to the API’s creation response. The submit control is disabled during the request, and a failure leaves the fields filled in for a retry.",
          es: "Vinculé el mensaje de confirmación y el reinicio del formulario a la respuesta de creación de la API. Durante el envío se desactiva el botón y, si hay un fallo, los campos conservan sus valores para reintentarlo.",
        },
      },
    ],
    outcome: {
      en: "On the public site, a patient can go from a treatment description to requesting a preferred date on a phone. The confirmation acknowledges receipt of that request. The clinic still controls the final appointment.",
      es: "En el sitio público se puede pasar de leer sobre un tratamiento a solicitar una fecha desde el teléfono. La confirmación indica que la solicitud se ha recibido. La asignación definitiva de la cita queda en manos de la clínica.",
    },
    stack: ["Astro", "React", "TypeScript", "Tailwind CSS", "Radix UI", "React Hook Form", "Python", "Django", "Django REST Framework", "Celery", "Redis", "Vercel"],
  },
  {
    slug: "nel-shey-medical-center",
    logo: "/career/nel.png",
    additionalMedia: {
      src: "/projects/details/nel-shey-home-mobile.webp",
      width: 780,
      height: 1688,
      caption: { en: "Medical center homepage on mobile", es: "Portada del centro médico en móvil" },
    },
    caseMedia: {
      src: "/projects/previews/nel-shey-medical-center-light.webp",
      width: 1280,
      height: 800,
      caption: { en: "Clinic services and appointment calendar", es: "Servicios médicos y calendario de citas" },
    },
    name: "Nel & Shey Medical Center",
    year: "2024",
    kinds: ["web"],
    url: "https://www.nsmedicalcenter.com/",
    schemaType: "WebSite",
    status: { en: "Live", es: "En línea" },
    role: { en: "Web design and frontend development", es: "Diseño web y desarrollo frontend" },
    tagline: {
      en: "I designed the clinic’s website and built its appointment calendar.",
      es: "Diseñé el sitio de la clínica y desarrollé su calendario de citas.",
    },
    shortDescription: {
      en: "Responsive website for a medical center with a calendar for requesting appointments.",
      es: "Sitio responsive para un centro médico con un calendario para solicitar citas.",
    },
    summary: {
      en: "I designed the public site for Nel & Shey Medical Center, adapted the layout for mobile screens, and built the calendar patients use to request an appointment.",
      es: "Diseñé el sitio de Nel & Shey Medical Center, adapté la interfaz a pantallas móviles y desarrollé el calendario que usan los pacientes para solicitar una cita.",
    },
    facts: [],
    problem: {
      en: "The medical center needed to explain very different services within one site. A patient reading about a treatment on a phone also needed room to enter contact details and choose a preferred date and time.",
      es: "El centro necesitaba explicar servicios médicos distintos dentro de un mismo sitio. Quien consultara un tratamiento desde el móvil también debía poder completar sus datos y elegir una fecha y una hora con comodidad.",
    },
    built: [
      {
        title: { en: "Homepage and treatment pages", es: "Portada y páginas de tratamientos" },
        body: {
          en: "I designed the homepage and service pages, then implemented the layouts in Astro. Each treatment has room for its own medical content and a consistent route to appointment requests.",
          es: "Diseñé la portada y las páginas de servicios y las implementé en Astro. Cada tratamiento tiene espacio para su contenido médico y conserva el mismo acceso a la solicitud de citas.",
        },
      },
      {
        title: { en: "Mobile layout and appointment calendar", es: "Diseño móvil y calendario de citas" },
        body: {
          en: "I adapted the site for narrow screens and built the calendar and time selector. The appointment form places contact and insurance fields in a single column on phones and groups them in columns on larger screens.",
          es: "Adapté el sitio a pantallas estrechas y desarrollé el calendario y el selector de hora. En el móvil, el formulario ordena los campos de contacto y seguro en una columna. En pantallas grandes los agrupa en varias columnas.",
        },
      },
      {
        title: { en: "Patient reviews", es: "Reseñas de pacientes" },
        body: {
          en: "I built the patient review form and connected it to the clinic’s API. Visitors can leave a star rating and describe their experience in their own words.",
          es: "Desarrollé el formulario de reseñas y lo conecté con la API de la clínica. Los pacientes pueden puntuar su visita con estrellas y contar su experiencia.",
        },
      },
    ],
    decisions: [
      {
        title: { en: "Share the layout across service pages", es: "Compartir la estructura de las páginas de servicios" },
        body: {
          en: "I used one Astro route driven by the service catalog, with a shared layout and treatment-specific content components. A treatment can have its own explanation while navigation and booking links stay consistent across the catalog.",
          es: "Usé una ruta de Astro alimentada por el catálogo, con una plantilla común y componentes específicos para el contenido de cada tratamiento. Así cada servicio tiene su propia explicación y mantiene la misma navegación y el mismo acceso a citas.",
        },
      },
      {
        title: { en: "Keep the patient’s date and time separate", es: "Conservar por separado el día y la hora" },
        body: {
          en: "I made the calendar capture a preferred day and a separate time selection. The form passes both fields to the appointment API, so reception receives the actual preference along with the patient’s contact details.",
          es: "Hice que el calendario recogiera el día preferido y que la hora se eligiera por separado. El formulario envía ambos campos a la API de citas, de modo que recepción recibe la preferencia concreta junto con los datos de contacto.",
        },
      },
    ],
    outcome: {
      en: "The site is public. A patient can read about a service, select a preferred day and time and send the request to reception. The desktop and phone screenshots show how the same homepage adapts, from the navigation down to the appointment link.",
      es: "El sitio está publicado. Un paciente puede consultar un servicio, elegir día y hora y enviar la solicitud a recepción. Las capturas de escritorio y móvil permiten comparar cómo adapté la misma portada, desde la navegación hasta el acceso a citas.",
    },
    stack: ["Astro", "React", "TypeScript", "Tailwind CSS", "Laravel"],
  },
  {
    slug: "connetcare",
    logo: "/career/connetcare.png",
    additionalMedia: {
      src: "/projects/details/connetcare-blog.webp",
      width: 1440,
      height: 900,
      caption: { en: "Health blog article", es: "Artículo del blog de salud" },
    },
    caseMedia: {
      src: "/projects/previews/connetcare-light.webp",
      width: 1280,
      height: 800,
      caption: { en: "Services and course catalog", es: "Servicios y catálogo de cursos" },
    },
    name: "ConnetCare",
    year: "2024–2026",
    kinds: ["web"],
    url: "https://www.connetcare.com/",
    schemaType: "SoftwareApplication",
    status: { en: "Live", es: "En línea" },
    role: { en: "Full-stack development", es: "Desarrollo full stack" },
    tagline: {
      en: "I built the web interface and the platform learners use to buy and take courses.",
      es: "Desarrollé la interfaz web y la plataforma donde los alumnos compran y toman cursos.",
    },
    shortDescription: {
      en: "Website and course platform with Stripe checkout and per-learner module access.",
      es: "Sitio web y plataforma de cursos con pagos en Stripe y acceso a módulos por alumno.",
    },
    summary: {
      en: "I implemented ConnetCare’s public website, its blog in Astro, and its course platform. My work covered the learner experience, Stripe checkout, and cookie-based authentication in the NestJS backend.",
      es: "Implementé el sitio público de ConnetCare, su blog en Astro y su plataforma de cursos. Trabajé en la interfaz para alumnos, los pagos con Stripe y la autenticación con cookies en el backend de NestJS.",
    },
    facts: [],
    problem: {
      en: "ConnetCare needed a way for visitors to discover its courses, pay online, and return to the lessons their account could access. Staff needed a way to manage that access for each learner.",
      es: "ConnetCare necesitaba que los visitantes pudieran descubrir los cursos, pagar en línea y volver a las lecciones disponibles en su cuenta. El equipo debía poder gestionar el acceso de cada alumno.",
    },
    built: [
      {
        title: { en: "Public site and learner interface", es: "Sitio público e interfaz del alumno" },
        body: {
          en: "I implemented the public web interface and Astro blog, then built the course experience where a learner opens a module and works through its lessons. The course view distinguishes available and locked modules.",
          es: "Implementé la interfaz del sitio público y el blog en Astro. Después desarrollé la vista donde el alumno abre un módulo y recorre sus lecciones. Ahí puede distinguir qué módulos tiene disponibles y cuáles siguen bloqueados.",
        },
      },
      {
        title: { en: "Checkout and sign-in", es: "Pago e inicio de sesión" },
        body: {
          en: "I connected Stripe checkout to the NestJS backend and implemented account access with HTTP-only cookies. A returning learner can sign in and reopen the modules their payments have unlocked.",
          es: "Conecté el pago con Stripe al backend en NestJS e implementé el acceso a la cuenta mediante cookies HttpOnly. Al volver, el alumno puede iniciar sesión y retomar los módulos que ha desbloqueado con sus pagos.",
        },
      },
      {
        title: { en: "Access administration", es: "Administración de accesos" },
        body: {
          en: "I built the staff controls for managing access by learner and module. Support can inspect or adjust a specific enrollment when a learner asks why a lesson is locked.",
          es: "Desarrollé los controles con los que el equipo administra el acceso por alumno y módulo. Así puede revisar o ajustar una matrícula concreta cuando alguien consulta por una lección bloqueada.",
        },
      },
      {
        title: { en: "Course editing tools", es: "Edición de cursos" },
        body: {
          en: "I built the admin screens for editing modules and their videos. Staff can change a lesson or add material to a course from the same interface they use to organize it.",
          es: "Desarrollé las pantallas de administración de módulos y vídeos. El equipo puede editar una lección o añadir material desde la misma interfaz donde organiza el curso.",
        },
      },
      {
        title: { en: "Health blog publishing", es: "Publicación del blog de salud" },
        body: {
          en: "I built the article template and category navigation around a Markdown collection. Each article carries its author and publication date from the source file into the reading view.",
          es: "Creé la plantilla de artículos y la navegación por categorías a partir de una colección en Markdown. La vista de lectura toma el autor y la fecha de publicación del archivo de cada artículo.",
        },
      },
    ],
    decisions: [
      {
        title: { en: "Grant access from a verified payment", es: "Conceder acceso tras verificar el pago" },
        body: {
          en: "The NestJS webhook verifies Stripe’s signature against the raw request and checks payment status before unlocking content. Processing the same event twice leaves access unchanged. Once payment clears, enrollment can finish even if the learner has closed the checkout tab.",
          es: "El webhook de NestJS comprueba la firma de Stripe sobre la petición original y verifica el estado del pago antes de desbloquear contenido. Recibir dos veces el mismo evento deja los permisos intactos. Una vez confirmado el cobro, la matrícula puede completarse aunque el alumno ya haya cerrado la pestaña.",
        },
      },
      {
        title: { en: "Keep earned access after the last installment", es: "Conservar lo adquirido tras la última cuota" },
        body: {
          en: "I tracked access by learner and module. Paid installments progressively unlock content, and a completed payment plan can end its Stripe subscription without taking away modules the learner has already paid for.",
          es: "Registré los permisos por alumno y módulo. Cada cuota pagada habilita el contenido correspondiente y, al liquidar el plan, la suscripción de Stripe puede terminar sin retirar los módulos ya adquiridos.",
        },
      },
    ],
    outcome: {
      en: "A learner paying in installments can come back between payments and continue with the modules already unlocked. Backend tests cover duplicate Stripe notifications and the end of a fully paid plan, two points where an enrollment could otherwise be granted twice or lost.",
      es: "Un alumno que paga a plazos puede volver entre cuotas y continuar con los módulos que ya tiene disponibles. Las pruebas del backend cubren los avisos duplicados de Stripe y el cierre de un plan liquidado, dos situaciones en las que se podría conceder acceso dos veces o perder lo ya adquirido.",
    },
    stack: ["Astro", "React", "Next.js", "TypeScript", "NestJS", "Prisma", "Stripe"],
  },
];

/** Published projects, in case-study order. */
export const projects: Project[] = projectSlugs
  .map((slug) => all.find((p) => p.slug === slug)!)
  .filter((p) => !p.draft);

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
