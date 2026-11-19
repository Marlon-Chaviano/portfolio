import type { Localized } from "@/lib/i18n";
import { projectSlugs, type ProjectSlug } from "./slugs";

export type ProjectKind = "web" | "mobile" | "ai" | "oss";

type MobilePlatform = "iOS" | "Android";
type CasePoint = { title: Localized; body: Localized };

export type CaseMedia = {
  src?: string | Localized;
  dark?: string | Localized;
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
  caseMedia: CaseMedia & { src: string | Localized };
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
  caption: { en: "Recent activity in B-Morï Mobile.", es: "Pantalla de últimas operaciones de B-Morï Mobile." },
};

const all: Project[] = [
  {
    slug: "diodi",
    logo: "/career/diodi.png",
    preview: "/projects/diodi.jpg",
    additionalMedia: {
      width: 1280,
      height: 800,
      caption: { en: "Sources cited in an AI answer.", es: "Fuentes citadas en una respuesta de IA." },
    },
    caseMedia: {
      src: { en: "/projects/details/diodi-en-light.webp", es: "/projects/details/diodi-es-light.webp" },
      dark: { en: "/projects/details/diodi-en-dark.webp", es: "/projects/details/diodi-es-dark.webp" },
      width: 800,
      height: 500,
      caption: {
        en: "Demo dashboard with AI visibility, citation share and the most cited domains.",
        es: "Panel de demostración con visibilidad en IA, cuota de citas y dominios más citados.",
      },
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
      en: "Tracks where brands appear in AI answers and which sources those answers cite.",
      es: "Mide dónde aparecen las marcas en respuestas de IA y qué fuentes se citan.",
    },
    summary: {
      en: "Diodi is an answer-engine-optimization platform. It diagnoses sites, measures a brand's presence in AI-generated answers, explains citations and competitors, and turns that evidence into improvements that can be verified.",
      es: "Diodi es una plataforma de AEO. Diagnostica sitios, mide la presencia de una marca en respuestas generadas por IA, explica citas y competidores, y convierte esa evidencia en mejoras verificables.",
    },
    facts: [
      { value: 2474, label: { en: "RSpec examples passed", es: "ejemplos de RSpec aprobados" } },
      { value: 37, label: { en: "onboarding checks passed", es: "pruebas del onboarding aprobadas" } },
    ],
    problem: {
      en: "Search is moving into AI answers, and a business cannot see whether it is mentioned, which sources get cited instead, or what to change. The data is expensive to collect and slow to aggregate, so a dashboard that recomputes on every request is unusable.",
      es: "La búsqueda se está mudando a las respuestas de IA, y un negocio no puede ver si lo mencionan, qué fuentes citan en su lugar ni qué cambiar. Los datos son caros de recolectar y lentos de agregar: un dashboard que recalcula en cada petición no sirve.",
    },
    built: [
      {
        title: { en: "Product design and dashboard", es: "Diseño de producto y panel" },
        body: {
          en: "I designed and built the Vue dashboard and Rails API for comparing brand visibility, citations, competitors and improvement opportunities.",
          es: "Diseñé y desarrollé el panel en Vue y la API en Rails para comparar la visibilidad de marca, las citas, los competidores y las oportunidades de mejora.",
        },
      },
      {
        title: { en: "AI measurement and reporting", es: "Medición de IA e informes" },
        body: {
          en: "I built flows for collecting AI answers, extracting citations and aggregating results by project. Teams can inspect the evidence behind each reading and export reports.",
          es: "Construí los flujos que recopilan respuestas de IA, extraen citas y agregan resultados por proyecto. Los equipos pueden consultar la evidencia de cada lectura y exportar informes.",
        },
      },
      {
        title: { en: "GA4 integration", es: "Integración con GA4" },
        body: {
          en: "I connected Google Analytics and made the interface distinguish a measured zero from missing data and flag discrepancies.",
          es: "Conecté Google Analytics e hice que el panel distinguiera un cero medido de un dato desconocido y señalara discrepancias.",
        },
      },
      {
        title: { en: "Billing and cost estimates", es: "Facturación y estimación de costes" },
        body: {
          en: "I implemented Stripe billing and show users their estimated credit cost before they expand a paid analysis.",
          es: "Implementé la facturación con Stripe y la estimación de créditos que se muestra antes de ampliar un análisis de pago.",
        },
      },
      {
        title: { en: "Quality and performance checks", es: "Pruebas de calidad y rendimiento" },
        body: {
          en: "I added regression checks in RSpec, Vitest and Playwright, including axe accessibility checks and a latency budget for cached summaries.",
          es: "Añadí pruebas de regresión con RSpec, Vitest y Playwright, incluidas comprobaciones de accesibilidad con axe y un límite de latencia para resúmenes en caché.",
        },
      },
    ],
    decisions: [
      {
        title: { en: "Background analytics", es: "Analítica en segundo plano" },
        body: {
          en: "The first request for an analytics view returns 202 while a background job prepares the result. PostgreSQL shares those results across processes and enforces access by project with row-level security. CI flags cached summaries that take more than one second to load.",
          es: "La primera solicitud de una vista analítica devuelve 202 mientras un job prepara el resultado. PostgreSQL comparte los resultados entre procesos y aplica el control de acceso por proyecto mediante row-level security. La CI detecta resúmenes en caché que tardan más de un segundo en cargar.",
        },
      },
      {
        title: { en: "Timestamped results", es: "Resultados con fecha de actualización" },
        body: {
          en: "A valid reading can be served for up to 30 minutes while it refreshes, always with its date and state visible. Permission and evidence checks run outside the cache, and exports keep their synchronous verification.",
          es: "Una lectura válida puede servirse hasta 30 minutos mientras se actualiza, siempre con fecha y estado visibles. Los permisos y la evidencia se comprueban fuera de la caché, y las exportaciones conservan su verificación síncrona.",
        },
      },
      {
        title: { en: "A budget for every asset", es: "Un presupuesto para cada asset" },
        body: {
          en: "Translations load per language before the app mounts, and secondary areas load their dictionaries on entry. A script checks gzip and Brotli sizes of the initial dictionary and the main routes on every build.",
          es: "Las traducciones se cargan por idioma antes de montar la app, y las áreas secundarias cargan sus diccionarios al entrar. Un script comprueba en cada build el tamaño gzip y Brotli del diccionario inicial y las rutas principales.",
        },
      },
    ],
    outcome: {
      en: "The November 18, 2026 release shipped background competitor suggestions during project setup. The figures below are from that release’s pre-deployment test run.",
      es: "La versión del 18 de noviembre de 2026 incorporó sugerencias de competidores en segundo plano durante la configuración del proyecto. Las cifras corresponden a las pruebas previas a ese despliegue.",
    },
    stack: ["Ruby on Rails", "Vue 3", "TypeScript", "Pinia", "Vite", "Redis", "PostgreSQL (RLS)", "Sidekiq", "TanStack Query", "Tailwind CSS", "Stripe", "GA4", "Playwright", "Vitest", "RSpec", "Heroku"],
  },
  {
    slug: "grialink",
    logo: "/career/grialink.png",
    preview: "/projects/grialink.jpg",
    additionalMedia: {
      width: 1280,
      height: 800,
      caption: { en: "AI receptionist settings and business hours.", es: "Configuración y horario de atención de la recepcionista de IA." },
    },
    caseMedia: {
      src: "/projects/details/grialink-light.webp",
      dark: "/projects/details/grialink-dark.webp",
      width: 1280,
      height: 820,
      caption: {
        en: "Grialink’s shared inbox with a conversation and its contact record open side by side.",
        es: "Bandeja compartida de Grialink con una conversación y la ficha del contacto abiertas lado a lado.",
      },
    },
    name: "Grialink",
    year: "2025—26",
    kinds: ["web", "ai"],
    url: "https://www.grialink.com/",
    schemaType: "SoftwareApplication",
    status: { en: "Web live · mobile app in development", es: "Web en línea · app móvil en desarrollo" },
    role: {
      en: "Sole engineer — web platform, mobile app, landing",
      es: "Único ingeniero: plataforma web, app móvil, landing",
    },
    tagline: {
      en: "I extended Chatwoot with AI agents for calls, inbox messages and appointment booking.",
      es: "Amplié Chatwoot con agentes de IA que atienden llamadas, responden mensajes y agendan citas.",
    },
    shortDescription: {
      en: "AI agents that answer calls, reply to messages, and book appointments.",
      es: "Agentes de IA que atienden llamadas, responden mensajes y agendan citas.",
    },
    summary: {
      en: "Grialink is an Agentic Relationship Management (ARM) platform built on Chatwoot. Its AI agents answer calls, book appointments and help teams follow up on customer conversations. I built the voice integrations, native mobile app and marketing site.",
      es: "Grialink es una plataforma ARM (Agentic Relationship Management) construida sobre Chatwoot. Sus agentes de IA atienden llamadas, agendan citas y ayudan al equipo a dar seguimiento a las conversaciones con clientes. Desarrollé las integraciones de voz, la app móvil y el sitio web.",
    },
    facts: [
      { value: "3", label: { en: "surfaces: dashboard, mobile app and site", es: "interfaces: panel, app móvil y sitio público" } },
      { value: "iOS + Android", label: { en: "from one React Native app", es: "desde una sola app React Native" } },
      { value: "Voice", label: { en: "calls handled by agents", es: "llamadas atendidas por agentes" } },
    ],
    problem: {
      en: "Small businesses lose customers in the gap between a message arriving and a person answering it. They need one inbox for every channel, and an agent that can actually do things — book an appointment, pick up a call — rather than only reply.",
      es: "Los negocios pequeños pierden clientes en el hueco entre que llega un mensaje y alguien lo responde. Necesitan una bandeja para todos los canales y un agente que haga cosas de verdad —agendar una cita, atender una llamada— y no solo conteste.",
    },
    built: [
      {
        title: { en: "AI receptionists and appointment booking", es: "Recepcionistas de IA y citas" },
        body: {
          en: "I built voice agents that answer calls, use business hours and services to check availability, and book appointments. The front desk can escalate calls to staff.",
          es: "Desarrollé agentes de voz que atienden llamadas, consultan disponibilidad según los horarios y servicios del negocio y agendan citas. La recepcionista puede transferir llamadas al equipo.",
        },
      },
      {
        title: { en: "Grial Mind in the inbox", es: "Grial Mind en la bandeja de entrada" },
        body: {
          en: "I built the agent that answers inbox conversations using the business’s knowledge and tools, with handoff to a person when needed.",
          es: "Desarrollé el agente que responde en la bandeja de entrada con el conocimiento y las herramientas del negocio, con derivación a una persona cuando hace falta.",
        },
      },
      {
        title: { en: "Telephony and call analysis", es: "Telefonía y análisis de llamadas" },
        body: {
          en: "I integrated Twilio Voice into the web and mobile clients and built call records with playback, transcripts and analysis.",
          es: "Integré Twilio Voice en la web y en la app móvil y desarrollé el historial de llamadas con reproducción, transcripciones y análisis.",
        },
      },
      {
        title: { en: "Mobile app", es: "Aplicación móvil" },
        body: {
          en: "I built the React Native app for iOS and Android, including the shared inbox, contacts, push notifications and native calls.",
          es: "Construí la aplicación en React Native para iOS y Android, con bandeja compartida, contactos, notificaciones push y llamadas nativas.",
        },
      },
      {
        title: { en: "Public website", es: "Sitio público" },
        body: {
          en: "I developed the public site in Astro with GSAP and WebGL and deployed it on Vercel.",
          es: "Desarrollé el sitio público en Astro con GSAP y WebGL y lo desplegué en Vercel.",
        },
      },
    ],
    decisions: [
      {
        title: { en: "Extend an open-source base", es: "Extender una base de código abierto" },
        body: {
          en: "Chatwoot already solves the omnichannel inbox. Building on it under its MIT license let the effort go into what is different — agents, voice and appointments — instead of rebuilding message plumbing.",
          es: "Chatwoot ya resuelve la bandeja omnicanal. Construir encima, bajo su licencia MIT, permitió dedicar el esfuerzo a lo diferente —agentes, voz y citas— en vez de rehacer la mensajería.",
        },
      },
      {
        title: { en: "One API for both clients", es: "Una API para ambos clientes" },
        body: {
          en: "The app consumes the same REST API as the web dashboard. One contract to maintain, and a feature shipped to the API is available to both clients.",
          es: "La app consume la misma API REST que el dashboard web. Un solo contrato que mantener, y lo que se publica en la API queda disponible para ambos clientes.",
        },
      },
      {
        title: { en: "Shared appointment availability", es: "Disponibilidad compartida para citas" },
        body: {
          en: "The booking portal, Grial Mind and the voice receptionist all use one availability service. It checks business hours, existing appointments and busy time from connected calendars.",
          es: "El portal de reservas, Grial Mind y la recepcionista de voz usan un mismo servicio de disponibilidad. Consulta los horarios del negocio, las citas existentes y los bloques ocupados en calendarios conectados.",
        },
      },
    ],
    outcome: {
      en: "The web platform is live at grialink.com. The mobile app is in active development against the same API.",
      es: "La plataforma web está en línea en grialink.com. La app móvil está en desarrollo activo contra la misma API.",
    },
    stack: ["Ruby on Rails", "PostgreSQL", "Redis", "Sidekiq", "Vue 3", "Vuex", "Vite", "React Native", "Expo", "TypeScript", "Twilio Voice", "Firebase Messaging", "TanStack Query", "Zustand", "Astro", "GSAP", "Maestro", "EAS", "Playwright", "RSpec"],
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
      width: 390,
      height: 844,
      caption: { en: "Call detail with its transcription and analysis.", es: "Detalle de una llamada con su transcripción y análisis." },
    },
    schemaType: "MobileApplication",
    applicationCategory: "BusinessApplication",
    caseMedia: {
      src: "/projects/grialink-mobile.webp",
      width: 447,
      height: 894,
      caption: { en: "Shared conversation inbox in Grialink Mobile.", es: "Bandeja de conversaciones compartida en Grialink Mobile." },
    },
    status: { en: "In development", es: "En desarrollo" },
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
        title: { en: "Conversations and contacts", es: "Conversaciones y contactos" },
        body: {
          en: "I built the shared inbox and contact views against Grialink’s REST API, so teams can follow up from the same workspace they use on the web.",
          es: "Desarrollé la bandeja compartida y las vistas de contactos sobre la API REST de Grialink. El equipo puede hacer seguimiento desde el mismo espacio de trabajo que usa en la web.",
        },
      },
      {
        title: { en: "Native calls and call history", es: "Llamadas nativas e historial" },
        body: {
          en: "I integrated Twilio Voice for business calls and built the call history and detail screens, including playback and analysis.",
          es: "Integré Twilio Voice para las llamadas del negocio y desarrollé el historial y el detalle de llamadas, con reproducción y análisis.",
        },
      },
      {
        title: { en: "Notifications and biometric unlock", es: "Notificaciones y desbloqueo biométrico" },
        body: {
          en: "I implemented push notifications that open the relevant record, plus secure session storage and biometric unlock.",
          es: "Implementé notificaciones push que abren el registro correspondiente, almacenamiento seguro de la sesión y desbloqueo biométrico.",
        },
      },
      {
        title: { en: "Builds and device tests", es: "Builds y pruebas en dispositivos" },
        body: {
          en: "I set up native builds for both platforms and added Maestro flows for end-to-end checks.",
          es: "Configuré builds nativos para las dos plataformas y añadí recorridos de extremo a extremo con Maestro.",
        },
      },
    ],
    decisions: [
      {
        title: { en: "One API for web and mobile", es: "Una API para la web y la app" },
        body: {
          en: "The app uses the same REST API as the web dashboard, so conversations and contacts stay in the same workspace.",
          es: "La app usa la misma API REST que el panel web, así que las conversaciones y los contactos se mantienen en el mismo espacio de trabajo.",
        },
      },
    ],
    outcome: {
      en: "The mobile app is in development, with native builds for both platforms.",
      es: "La aplicación móvil está en desarrollo y cuenta con builds nativos para ambas plataformas.",
    },
    stack: ["React Native", "Expo", "TypeScript", "Twilio Voice", "Firebase Messaging", "Zustand", "Maestro", "EAS"],
  },
  {
    slug: "first-commit",
    logo: "/projects/first-commit-symbol.svg",
    preview: "/projects/first-commit.jpg",
    additionalMedia: {
      width: 1280,
      height: 800,
      caption: { en: "Kit configurator with stack options and an installation plan.", es: "Configurador de kits con las opciones del stack y el plan de instalación." },
    },
    caseMedia: {
      src: "/projects/previews/first-commit-light.webp",
      dark: "/projects/previews/first-commit-dark.webp",
      width: 1280,
      height: 800,
      caption: {
        en: "The first-commit site previews the setup steps a kit will run.",
        es: "El sitio de first-commit muestra los pasos de configuración que ejecutará un kit.",
      },
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
      en: "first-commit is an open-source CLI. One command creates a project, installs its dependencies, the agent skills and the MCP servers, and writes the AGENTS.md a coding agent reads before touching a line.",
      es: "first-commit es una CLI de código abierto. Un comando crea el proyecto, instala sus dependencias, las skills del agente y los servidores MCP, y escribe el AGENTS.md que un agente de código lee antes de tocar una línea.",
    },
    facts: [
      { value: "70", label: { en: "official kits", es: "kits oficiales" } },
      { value: "9", label: { en: "languages", es: "lenguajes" } },
      { value: "1", label: { en: "command: npx create-first-commit", es: "comando: npx create-first-commit" } },
    ],
    problem: {
      en: "Starting a project with an agent means scaffolding it, installing a UI library, hunting for the right skills, wiring an MCP server, and then explaining the conventions again in every new session.",
      es: "Empezar un proyecto con un agente implica generarlo, instalar una librería de UI, buscar las skills adecuadas, conectar un servidor MCP y volver a explicar las convenciones en cada sesión nueva.",
    },
    built: [
      {
        title: { en: "CLI and kit registry", es: "CLI y catálogo de kits" },
        body: {
          en: "I built the command-line installer and the official kits. A kit declares its stack options, dependencies, skills, MCP servers and project instructions.",
          es: "Desarrollé el instalador de línea de comandos y los kits oficiales. Cada kit declara las opciones de su stack, dependencias, skills, servidores MCP e instrucciones del proyecto.",
        },
      },
      {
        title: { en: "Planning and compatibility", es: "Planificación y compatibilidad" },
        body: {
          en: "I built the shared planner that resolves selected options, catches incompatible combinations and previews commands before installation.",
          es: "Construí el planificador que resuelve las opciones elegidas, detecta combinaciones incompatibles y muestra los comandos antes de instalar.",
        },
      },
      {
        title: { en: "MCP server", es: "Servidor MCP" },
        body: {
          en: "I exposed kit search and planning through MCP. The local server can install a selected kit with the user’s approval.",
          es: "Expuse la búsqueda y la planificación de kits mediante MCP. El servidor local puede instalar un kit con la aprobación del usuario.",
        },
      },
      {
        title: { en: "Website and publishing", es: "Sitio web y publicación" },
        body: {
          en: "I built the Next.js configurator, documentation, verified-kit catalog and publishing flow so users can share and compare their kits.",
          es: "Construí el configurador en Next.js, la documentación, el catálogo de kits verificados y el flujo de publicación para que los usuarios compartan y comparen sus kits.",
        },
      },
      {
        title: { en: "Project maintenance", es: "Mantenimiento del proyecto generado" },
        body: {
          en: "I added commands to update kits, install more libraries and check whether a project still follows the kit’s declared configuration.",
          es: "Añadí comandos para actualizar kits, sumar librerías y comprobar si un proyecto sigue la configuración declarada por el kit.",
        },
      },
    ],
    decisions: [
      {
        title: { en: "See it before it runs", es: "Verlo antes de que corra" },
        body: {
          en: "Every command is shown in a plan first and --dry-run executes nothing. Official kits are integrity-checked and verified by building real option combinations.",
          es: "Cada comando se muestra primero en un plan y --dry-run no ejecuta nada. Los kits oficiales pasan control de integridad y se verifican construyendo combinaciones reales de opciones.",
        },
      },
      {
        title: { en: "Projects stay connected", es: "Los proyectos siguen conectados" },
        body: {
          en: "A kits.lock file remembers where a project came from. update brings in a kit's improvements without touching files you changed, add pulls in more libraries, and doctor checks the project still follows its rules.",
          es: "Un archivo kits.lock recuerda de dónde salió el proyecto. update trae las mejoras del kit sin tocar los archivos que cambiaste, add suma librerías y doctor comprueba que el proyecto sigue sus reglas.",
        },
      },
    ],
    outcome: {
      en: "Published on npm as create-first-commit, with the site live at first-commit.dev. Works with Claude Code, Cursor, Codex, Gemini CLI, GitHub Copilot, Windsurf and OpenCode.",
      es: "Publicado en npm como create-first-commit, con el sitio en first-commit.dev. Funciona con Claude Code, Cursor, Codex, Gemini CLI, GitHub Copilot, Windsurf y OpenCode.",
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
    caseMedia: bmoriMobileMedia,
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
      en: "B-Morï gives Bonafide Microbank customers a way to view account activity and move money.",
      es: "B-Morï permite a los clientes de Bonafide Microbank consultar sus operaciones y mover dinero.",
    },
    problem: {
      en: "The project brings those everyday banking tasks to iOS and Android, with browser access as the next step.",
      es: "El proyecto lleva las operaciones bancarias del día a día a iOS y Android. El acceso desde el navegador es el siguiente paso.",
    },
    facts: [],
    built: [
      {
        title: { en: "B-Morï Mobile", es: "B-Morï Mobile" },
        body: {
          en: "I rebuilt the iOS and Android app in React Native and Expo, including account activity, transfers, top-ups and PDF receipts.",
          es: "Reconstruí la app de iOS y Android en React Native y Expo, con consulta de operaciones, transferencias, recargas y comprobantes en PDF.",
        },
      },
      {
        title: { en: "B-Morï Web", es: "B-Morï Web" },
        body: {
          en: "I’m developing the version that runs in the browser.",
          es: "Estoy desarrollando la versión que funciona en el navegador.",
        },
      },
    ],
    decisions: [],
    outcome: {
      en: "The mobile app has development, staging and production build profiles.",
      es: "La app móvil cuenta con perfiles de compilación para desarrollo, staging y producción.",
    },
    stack: ["React Native", "Expo", "TypeScript"],
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
      width: 390,
      height: 844,
      caption: { en: "Transfer confirmation with demo data.", es: "Confirmación de una transferencia con datos de demostración." },
    },
    caseMedia: bmoriMobileMedia,
    schemaType: "MobileApplication",
    applicationCategory: "FinanceApplication",
    status: { en: "Development complete", es: "Desarrollo completado" },
    role: { en: "Mobile engineer — architecture and build", es: "Ingeniero móvil: arquitectura y construcción" },
    tagline: {
      en: "I rebuilt Bonafide Microbank’s app for viewing account activity, transferring money and topping up phones.",
      es: "Reconstruí la app de Bonafide Microbank para consultar operaciones, hacer transferencias y recargar teléfonos.",
    },
    shortDescription: {
      en: "Bonafide Microbank’s app for checking transactions and sending money.",
      es: "La app de Bonafide Microbank para consultar transacciones y hacer transferencias.",
    },
    summary: {
      en: "The new B-Morï app for Bonafide Microbank on iOS and Android. It replaces the previous Codename One app with a simpler, modern design built on Expo and React Native.",
      es: "La nueva app B-Morï de Bonafide Microbank para iOS y Android. Sustituye a la app anterior hecha en Codename One por un diseño más simple y moderno sobre Expo y React Native.",
    },
    facts: [
      { value: "Expo 57", label: { en: "React Native 0.86", es: "React Native 0.86" } },
      { value: "3", label: { en: "build environments", es: "entornos de build" } },
      { value: "0", label: { en: "mock data outside development", es: "datos simulados fuera de desarrollo" } },
    ],
    problem: {
      en: "The existing app was built on an aging cross-platform toolkit and was hard to evolve. The replacement had to be developed while its backends were still being connected, without ever letting simulated data reach a real user.",
      es: "La app existente estaba hecha con un toolkit multiplataforma envejecido y costaba evolucionarla. El reemplazo debía desarrollarse mientras sus backends aún se conectaban, sin que un dato simulado llegara jamás a un usuario real.",
    },
    built: [
      {
        title: { en: "Account activity and receipts", es: "Movimientos y comprobantes" },
        body: {
          en: "I built account and recent activity screens, filters for transactions, and PDF receipts and statements.",
          es: "Desarrollé las pantallas de cuentas y operaciones, los filtros de movimientos y la generación de comprobantes e informes en PDF.",
        },
      },
      {
        title: { en: "Transfers and top-ups", es: "Transferencias y recargas" },
        body: {
          en: "I implemented transfer flows for local and CEMAC payments, beneficiary selection, and Airtel top-ups.",
          es: "Implementé flujos de transferencias locales y CEMAC, selección de beneficiarios y recargas de Airtel.",
        },
      },
      {
        title: { en: "Sign-in and device security", es: "Acceso y seguridad en el dispositivo" },
        body: {
          en: "I built password and verification-code sign-in, PIN and biometric unlock, secure storage and screen-capture protection.",
          es: "Desarrollé el acceso con contraseña y códigos de verificación, el desbloqueo con PIN y biometría, el almacenamiento seguro y la protección frente a capturas de pantalla.",
        },
      },
      {
        title: { en: "Mobile architecture and delivery", es: "Arquitectura móvil y entrega" },
        body: {
          en: "I set up Expo Router, translations in Spanish, French and English, and Jest tests for screens and forms. I configured EAS build profiles for development, staging and production.",
          es: "Configuré Expo Router, traducciones en español, francés e inglés y pruebas de pantallas y formularios con Jest. Preparé perfiles EAS para desarrollo, staging y producción.",
        },
      },
    ],
    decisions: [
      {
        title: { en: "The UI talks to one contract", es: "La UI habla con un solo contrato" },
        body: {
          en: "Screens only know the BmoriApi interface. In development, with no URL configured, everything is a mock; each backend that gets configured turns its group real. A single file decides which is which.",
          es: "Las pantallas solo conocen la interfaz BmoriApi. En desarrollo, sin URL configurada, todo es simulado; cada backend que se configura vuelve real su grupo. Un único archivo decide cuál es cuál.",
        },
      },
      {
        title: { en: "Validate production build settings", es: "Validar la configuración de producción" },
        body: {
          en: "In preview and production there is no simulation: if a backend is missing the build fails, and the app never falls back to fake data.",
          es: "En preview y producción no hay simulación: si falta un backend el build falla, y la app nunca recurre a datos falsos.",
        },
      },
    ],
    outcome: {
      en: "The iOS and Android app is built, with development, staging and production profiles on EAS.",
      es: "La app de iOS y Android está terminada y cuenta con perfiles EAS de desarrollo, staging y producción.",
    },
    stack: ["Expo SDK 57", "React Native 0.86", "TypeScript", "Expo Router", "TanStack Query", "Zustand", "React Hook Form", "Zod", "SQLite", "Jest", "EAS"],
  },
  {
    slug: "global-dentistry-group",
    logo: "/career/global.png",
    preview: "/projects/global-dentistry-group.jpg",
    additionalMedia: {
      width: 390,
      height: 844,
      caption: { en: "Appointment request form on mobile.", es: "Formulario de solicitud de cita en móvil." },
    },
    caseMedia: {
      src: "/projects/previews/global-dentistry-group-light.webp",
      width: 1280,
      height: 800,
      caption: {
        en: "Global Dentistry Group’s homepage with shortcuts to services and appointment requests.",
        es: "Inicio de Global Dentistry Group con accesos a los servicios y la solicitud de citas.",
      },
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
      en: "A marketing site for a dental group, built with Astro so pages ship as static HTML, with React only where a visitor interacts: forms, date pickers and carousels.",
      es: "Un sitio de marketing para un grupo dental, hecho con Astro para que las páginas salgan como HTML estático, con React solo donde el visitante interactúa: formularios, selectores de fecha y carruseles.",
    },
    facts: [
      { value: "Astro", label: { en: "static HTML first", es: "HTML estático primero" } },
      { value: "React", label: { en: "islands for forms only", es: "islas solo para formularios" } },
      { value: "Vercel", label: { en: "hosting", es: "hosting" } },
    ],
    problem: {
      en: "A clinic's site has one job: let a patient understand the services and ask for an appointment, quickly, on a phone.",
      es: "El sitio de una clínica tiene un trabajo: que un paciente entienda los servicios y pida una cita, rápido y desde el teléfono.",
    },
    built: [
      {
        title: { en: "Clinic website", es: "Sitio de la clínica" },
        body: {
          en: "I built the responsive Astro site so visitors can find dental services, clinic information and appointment links from their phones.",
          es: "Desarrollé el sitio adaptable en Astro para que los visitantes pudieran encontrar servicios dentales, información de la clínica y el acceso a citas desde el teléfono.",
        },
      },
      {
        title: { en: "Appointment requests", es: "Solicitud de citas" },
        body: {
          en: "I built a React form with a date picker, international phone input and service selection. I connected it to the backend API and handled submission feedback.",
          es: "Construí un formulario en React con selector de fecha, teléfono internacional y selección de servicios. Lo conecté a la API y añadí mensajes de confirmación y error.",
        },
      },
      {
        title: { en: "Web delivery and accessibility", es: "Publicación y accesibilidad web" },
        body: {
          en: "I configured the sitemap, optimized images and added accessibility linting to the frontend.",
          es: "Configuré el sitemap, optimicé imágenes y añadí comprobaciones de accesibilidad al frontend.",
        },
      },
    ],
    decisions: [
      {
        title: { en: "JavaScript only where it earns it", es: "JavaScript solo donde se lo gana" },
        body: {
          en: "Content pages need no client code. Astro islands hydrate the form and the carousel and leave everything else as HTML.",
          es: "Las páginas de contenido no necesitan código de cliente. Las islas de Astro hidratan el formulario y el carrusel y dejan todo lo demás como HTML.",
        },
      },
    ],
    outcome: {
      en: "The site is live on Vercel. Patients can choose a service and send an appointment request from the website.",
      es: "El sitio está en línea en Vercel. Los pacientes pueden elegir un servicio y enviar una solicitud de cita desde allí.",
    },
    stack: ["Astro", "React", "TypeScript", "Tailwind CSS", "Radix UI", "React Hook Form", "Python", "Django", "Django REST Framework", "Celery", "Redis", "Vercel"],
  },
  {
    slug: "nel-shey-medical-center",
    logo: "/career/nel.png",
    additionalMedia: {
      width: 390,
      height: 844,
      caption: { en: "Choosing a date and time for an appointment on mobile.", es: "Selección de fecha y horario para una cita en móvil." },
    },
    caseMedia: {
      src: "/projects/previews/nel-shey-medical-center-light.webp",
      width: 1280,
      height: 800,
      caption: {
        en: "Nel & Shey’s homepage with its appointment calendar and links to services.",
        es: "Inicio de Nel & Shey con el calendario de citas y los accesos a servicios.",
      },
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
      en: "Patients needed a way to find the right service and request a visit from their phones.",
      es: "Los pacientes necesitaban encontrar el servicio adecuado y poder solicitar una cita desde el teléfono.",
    },
    built: [
      {
        title: { en: "Visual design", es: "Diseño visual" },
        body: {
          en: "I designed the homepage and service pages, including how visitors find the appointment flow from each section.",
          es: "Diseñé la página de inicio y las páginas de servicios, incluida la forma de acceder a la solicitud de citas desde cada sección.",
        },
      },
      {
        title: { en: "Responsive layout", es: "Adaptación a móviles" },
        body: {
          en: "I adapted the navigation, page sections and calendar for narrow screens.",
          es: "Adapté la navegación, las secciones y el calendario para pantallas estrechas.",
        },
      },
      {
        title: { en: "Calendar and appointment requests", es: "Calendario y solicitud de citas" },
        body: {
          en: "I built the React calendar and connected the appointment form to the clinic’s API so patients can submit their preferred date and time.",
          es: "Desarrollé el calendario en React y conecté el formulario de citas con la API de la clínica para enviar la fecha y el horario preferidos.",
        },
      },
    ],
    decisions: [
      {
        title: { en: "One appointment flow across the site", es: "Un mismo flujo de citas en todo el sitio" },
        body: {
          en: "Appointment links from the home and service pages lead to the same form. It sends the preferred date and time to the clinic’s Laravel API.",
          es: "Los enlaces de citas del inicio y las páginas de servicios llevan al mismo formulario. Este envía la fecha y el horario preferidos a la API de la clínica en Laravel.",
        },
      },
    ],
    outcome: {
      en: "Patients can browse services and send an appointment request from the clinic’s website.",
      es: "Los pacientes pueden consultar los servicios y enviar una solicitud de cita desde el sitio de la clínica.",
    },
    stack: ["Astro", "React", "TypeScript", "Tailwind CSS", "Laravel"],
  },
  {
    slug: "connetcare",
    logo: "/career/connetcare.png",
    additionalMedia: {
      width: 1280,
      height: 800,
      caption: { en: "Learner view with course modules and available lessons.", es: "Vista del alumno con los módulos del curso y las lecciones disponibles." },
    },
    caseMedia: {
      src: "/projects/previews/connetcare-light.webp",
      width: 1280,
      height: 800,
      caption: {
        en: "ConnetCare’s public site for discovering services, courses and articles.",
        es: "Sitio público de ConnetCare para descubrir servicios, cursos y artículos.",
      },
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
        title: { en: "Public site and blog", es: "Sitio público y blog" },
        body: {
          en: "I implemented the web interface and the Astro blog, with React components for browsing courses.",
          es: "Implementé la interfaz web y el blog en Astro, con componentes React para explorar los cursos.",
        },
      },
      {
        title: { en: "Course experience", es: "Plataforma de cursos" },
        body: {
          en: "I built the interface for learners to browse a course, see which modules are available and watch lessons.",
          es: "Desarrollé la interfaz para que los alumnos consulten un curso, vean los módulos habilitados y reproduzcan las lecciones.",
        },
      },
      {
        title: { en: "Stripe payments", es: "Pagos con Stripe" },
        body: {
          en: "I integrated Stripe Checkout for purchases and subscriptions and handled payment confirmation in NestJS.",
          es: "Integré Stripe Checkout para compras y suscripciones y gestioné la confirmación de pagos en NestJS.",
        },
      },
      {
        title: { en: "Authentication and session cookies", es: "Autenticación y cookies de sesión" },
        body: {
          en: "I implemented sign-in with email or Google and session cookies managed by the NestJS backend.",
          es: "Implementé el inicio de sesión con correo o Google y cookies de sesión gestionadas por el backend en NestJS.",
        },
      },
      {
        title: { en: "Course administration", es: "Administración de cursos" },
        body: {
          en: "I worked on the course administration flow that lets staff publish courses and manage module access for each learner.",
          es: "Trabajé en el flujo de administración que permite al equipo publicar cursos y gestionar el acceso a módulos de cada alumno.",
        },
      },
    ],
    decisions: [
      {
        title: { en: "Confirm payment on the server", es: "Confirmar los pagos en el servidor" },
        body: {
          en: "The backend verifies Stripe’s webhook before recording the payment. The course interface reads module access from the API, and staff can adjust it for individual learners in the admin panel.",
          es: "El backend verifica el webhook de Stripe antes de registrar el pago. La interfaz de cursos consulta en la API qué módulos están habilitados, y el equipo puede ajustar el acceso de cada alumno desde el panel de administración.",
        },
      },
    ],
    outcome: {
      en: "Learners can buy a course and return to their available lessons. Staff can publish courses and manage access from the admin panel.",
      es: "Los alumnos pueden comprar un curso y retomar las lecciones que tienen habilitadas. El equipo puede publicar cursos y gestionar el acceso desde el panel de administración.",
    },
    stack: ["Astro", "React", "Next.js", "TypeScript", "NestJS", "Prisma", "Stripe"],
  },
];

/** Published projects, in case-study order. */
export const projects: Project[] = projectSlugs
  .map((slug) => all.find((p) => p.slug === slug)!)
  .filter((p) => !p.draft);

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
