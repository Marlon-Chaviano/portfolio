import type { Localized } from "@/lib/i18n";
import { projectSlugs, type ProjectSlug } from "./slugs";

export type ProjectKind = "web" | "mobile" | "ai" | "oss";

export type Project = {
  slug: ProjectSlug;
  name: string;
  year: string;
  kinds: ProjectKind[];
  /** Hidden from the site until the copy is real. */
  draft?: boolean;
  url?: string;
  repo?: string;
  /** Preview image in /public. Without one the card shows a typographic cover. */
  preview?: string;
  schemaType: "SoftwareApplication" | "MobileApplication" | "SoftwareSourceCode" | "WebSite";
  status: Localized;
  role: Localized;
  tagline: Localized;
  summary: Localized;
  facts: { value: string; label: Localized }[];
  problem: Localized;
  built: Localized[];
  decisions: { title: Localized; body: Localized }[];
  outcome: Localized;
  /** Bracketed prompts appear in development until replaced with verified results. */
  impact?: Localized;
  stack: string[];
};

const all: Project[] = [
  {
    slug: "diodi",
    preview: "/projects/diodi.jpg",
    name: "Diodi",
    year: "2026",
    kinds: ["web", "ai"],
    url: "https://www.diodi.io/",
    schemaType: "SoftwareApplication",
    status: { en: "In development", es: "En desarrollo" },
    role: {
      en: "Sole engineer — product, UI, frontend, backend, data",
      es: "Único ingeniero: producto, UI, frontend, backend, datos",
    },
    tagline: {
      en: "I built a dashboard for tracking brands in AI answers. CI flags cached summaries that take over one second.",
      es: "Construí un panel para medir la presencia de marcas en respuestas de IA. La CI falla si un resumen en caché tarda más de un segundo.",
    },
    summary: {
      en: "Diodi is an answer-engine-optimization platform. It diagnoses sites, measures a brand's presence in AI-generated answers, explains citations and competitors, and turns that evidence into improvements that can be verified.",
      es: "Diodi es una plataforma de AEO. Diagnostica sitios, mide la presencia de una marca en respuestas generadas por IA, explica citas y competidores, y convierte esa evidencia en mejoras verificables.",
    },
    facts: [
      { value: "2,350", label: { en: "RSpec examples", es: "ejemplos RSpec" } },
      { value: "715", label: { en: "Vitest tests", es: "tests Vitest" } },
      { value: "108", label: { en: "E2E scenarios", es: "escenarios E2E" } },
    ],
    problem: {
      en: "Search is moving into AI answers, and a business cannot see whether it is mentioned, which sources get cited instead, or what to change. The data is expensive to collect and slow to aggregate, so a dashboard that recomputes on every request is unusable.",
      es: "La búsqueda se está mudando a las respuestas de IA, y un negocio no puede ver si lo mencionan, qué fuentes citan en su lugar ni qué cambiar. Los datos son caros de recolectar y lentos de agregar: un dashboard que recalcula en cada petición no sirve.",
    },
    built: [
      {
        en: "A Rails API and a Vue 3 + TypeScript dashboard covering visibility, citations, competitor landscape and improvement ideas.",
        es: "Una API en Rails y un dashboard en Vue 3 + TypeScript para visibilidad, citas, panorama competitivo e ideas de mejora.",
      },
      {
        en: "GA4 integration with explicit handling of zero versus unknown values and data discrepancies.",
        es: "Integración con GA4 que distingue explícitamente entre cero y desconocido, y señala discrepancias.",
      },
      {
        en: "Cost and credit forecasting shown before a user widens the scope of a paid analysis, with Stripe billing.",
        es: "Previsión de costes y créditos antes de ampliar el alcance de un análisis de pago, con cobro por Stripe.",
      },
      {
        en: "Accessibility scans with axe and Playwright suites split by area (dashboard, marketing, charts).",
        es: "Escaneos de accesibilidad con axe y suites de Playwright separadas por área (dashboard, marketing, gráficos).",
      },
    ],
    decisions: [
      {
        title: { en: "Prepared readings instead of live queries", es: "Lecturas preparadas en vez de consultas en vivo" },
        body: {
          en: "The first GET for an analytics view returns 202 and a background job computes the projection on a dedicated queue with concurrency 1. Projections are stored in PostgreSQL behind forced row-level security, so every process shares them without another Redis. CI fails if a warm summary takes longer than one second.",
          es: "El primer GET de una vista analítica responde 202 y un job calcula la proyección en una cola dedicada con concurrencia 1. Las proyecciones se guardan en PostgreSQL con row-level security forzado, así todos los procesos las comparten sin otro Redis. La CI falla si un resumen caliente tarda más de un segundo.",
        },
      },
      {
        title: { en: "Stale is fine, if it says so", es: "Lo obsoleto vale, si lo dice" },
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
    impact: {
      en: "[Add measured dashboard latency, sample size and test date.]",
      es: "[Completar con la latencia medida del panel, el tamaño de la muestra y la fecha de la prueba.]",
    },
    outcome: {
      en: "Eight of nine planned phases are implemented and validated locally; the integrated run on 5 November 2026 passed 2,350 RSpec examples, 715 Vitest tests and 108 end-to-end scenarios. The hosted release of that cut is still pending.",
      es: "Ocho de las nueve fases planificadas están implementadas y validadas en local; la corrida integrada del 5 de noviembre de 2026 pasó 2.350 ejemplos RSpec, 715 tests Vitest y 108 escenarios end-to-end. La entrega alojada de ese corte sigue pendiente.",
    },
    stack: ["Ruby on Rails", "Vue 3", "TypeScript", "PostgreSQL (RLS)", "Sidekiq", "TanStack Query", "Tailwind CSS", "Stripe", "GA4", "Playwright", "Vitest", "RSpec", "Heroku"],
  },
  {
    slug: "grialink",
    preview: "/projects/grialink.jpg",
    name: "Grialink",
    year: "2025—26",
    kinds: ["web", "mobile", "ai"],
    url: "https://www.grialink.com/",
    schemaType: "SoftwareApplication",
    status: { en: "Web live · mobile app in development", es: "Web en línea · app móvil en desarrollo" },
    role: {
      en: "Sole engineer — web platform, mobile app, landing",
      es: "Único ingeniero: plataforma web, app móvil, landing",
    },
    tagline: {
      en: "I extended Chatwoot with telephony, call analysis and a mobile client that shares the web API.",
      es: "Amplié Chatwoot con telefonía, análisis de llamadas y una app móvil que comparte la API con la web.",
    },
    summary: {
      en: "Grialink is a customer communication and CRM platform built on the open-source Chatwoot. My work adds AI agents, voice integrations, appointment management and business automation, plus a native mobile app and the marketing site.",
      es: "Grialink es una plataforma de comunicación con clientes y CRM construida sobre Chatwoot, de código abierto. Mi trabajo añade agentes de IA, integraciones de voz, gestión de citas y automatización, además de una app móvil nativa y el sitio de marketing.",
    },
    facts: [
      { value: "3", label: { en: "codebases: web, mobile, landing", es: "bases de código: web, móvil, landing" } },
      { value: "iOS + Android", label: { en: "from one React Native app", es: "desde una sola app React Native" } },
      { value: "Voice", label: { en: "calls handled by agents", es: "llamadas atendidas por agentes" } },
    ],
    problem: {
      en: "Small businesses lose customers in the gap between a message arriving and a person answering it. They need one inbox for every channel, and an agent that can actually do things — book an appointment, pick up a call — rather than only reply.",
      es: "Los negocios pequeños pierden clientes en el hueco entre que llega un mensaje y alguien lo responde. Necesitan una bandeja para todos los canales y un agente que haga cosas de verdad —agendar una cita, atender una llamada— y no solo conteste.",
    },
    built: [
      {
        en: "AI agents that work with business data and tools to handle conversations, calls and appointments.",
        es: "Agentes de IA que trabajan con los datos y herramientas del negocio para gestionar conversaciones, llamadas y citas.",
      },
      {
        en: "Voice inside the product with the Twilio Voice SDK, on web and on mobile.",
        es: "Voz dentro del producto con el SDK de Twilio Voice, en web y en móvil.",
      },
      {
        en: "A React Native app (Expo prebuild) for iOS and Android: push with Firebase and Notifee, keychain storage, biometrics, Maestro end-to-end tests, fastlane and EAS builds.",
        es: "Una app React Native (Expo prebuild) para iOS y Android: push con Firebase y Notifee, almacenamiento en keychain, biometría, tests end-to-end con Maestro, y builds con fastlane y EAS.",
      },
      {
        en: "The marketing site in Astro with GSAP and WebGL, deployed on Vercel.",
        es: "El sitio de marketing en Astro con GSAP y WebGL, desplegado en Vercel.",
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
        title: { en: "No mobile backend-for-frontend", es: "Sin backend exclusivo para móvil" },
        body: {
          en: "The app consumes the same REST API as the web dashboard. One contract to maintain, and a feature shipped to the API is available to both clients.",
          es: "La app consume la misma API REST que el dashboard web. Un solo contrato que mantener, y lo que se publica en la API queda disponible para ambos clientes.",
        },
      },
      {
        title: { en: "Calls need native builds", es: "Las llamadas exigen builds nativos" },
        body: {
          en: "Phase one runs in Expo Go for fast previews. Incoming VoIP calls require native modules, so the project is a bare React Native app with a dev client and cloud builds from the start.",
          es: "La primera fase corre en Expo Go para previsualizar rápido. Las llamadas VoIP entrantes requieren módulos nativos, así que el proyecto es React Native bare con dev client y builds en la nube desde el inicio.",
        },
      },
    ],
    impact: {
      en: "[Add the number of calls processed in a verified period.]",
      es: "[Completar con el número de llamadas procesadas y el periodo verificado.]",
    },
    outcome: {
      en: "The web platform is live at grialink.com. The mobile app is in active development against the same API.",
      es: "La plataforma web está en línea en grialink.com. La app móvil está en desarrollo activo contra la misma API.",
    },
    stack: ["Ruby on Rails", "Vue 3", "React Native", "Expo", "TypeScript", "Twilio Voice", "Firebase Messaging", "TanStack Query", "Zustand", "Astro", "GSAP", "Maestro", "EAS"],
  },
  {
    slug: "first-commit",
    preview: "/projects/first-commit.jpg",
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
        en: "70 kits across Next.js, Astro, SvelteKit, Expo, Flutter, SwiftUI, FastAPI, Django, Rails, Laravel, Go, Spring Boot and more.",
        es: "70 kits para Next.js, Astro, SvelteKit, Expo, Flutter, SwiftUI, FastAPI, Django, Rails, Laravel, Go, Spring Boot y más.",
      },
      {
        en: "Options instead of forks: one kit, many stacks (--components shadcn, --backend supabase, --pm bun), with incompatible options ruled out before anything runs.",
        es: "Opciones en vez de forks: un kit, muchos stacks (--components shadcn, --backend supabase, --pm bun), descartando opciones incompatibles antes de ejecutar nada.",
      },
      {
        en: "An MCP server so an agent can find, plan and install kits itself, always asking before it executes.",
        es: "Un servidor MCP para que un agente encuentre, planifique e instale kits por sí mismo, preguntando siempre antes de ejecutar.",
      },
      {
        en: "A website to build the command by clicking, with a leaderboard of verified kits.",
        es: "Un sitio web para armar el comando a clics, con un ranking de kits verificados.",
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
    impact: {
      en: "[Add npm downloads and the dates covered by the report.]",
      es: "[Completar con las descargas de npm y el periodo del informe.]",
    },
    outcome: {
      en: "Published on npm as create-first-commit, with the site live at first-commit.dev. Works with Claude Code, Cursor, Codex, Gemini CLI, GitHub Copilot, Windsurf and OpenCode.",
      es: "Publicado en npm como create-first-commit, con el sitio en first-commit.dev. Funciona con Claude Code, Cursor, Codex, Gemini CLI, GitHub Copilot, Windsurf y OpenCode.",
    },
    stack: ["TypeScript", "Node.js", "pnpm workspaces", "Zod", "Vitest", "MCP", "GitHub Actions"],
  },
  {
    slug: "bmori-mobile",
    name: "B-Morï Mobile",
    year: "2026",
    kinds: ["mobile"],
    schemaType: "MobileApplication",
    status: { en: "In development", es: "En desarrollo" },
    role: { en: "Mobile engineer — architecture and build", es: "Ingeniero móvil: arquitectura y construcción" },
    tagline: {
      en: "A bank's app, rebuilt from scratch.",
      es: "La app de un banco, rehecha desde cero.",
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
        en: "Login with password, email or authenticator codes and recovery codes; PIN and biometric unlock.",
        es: "Inicio de sesión con contraseña, códigos por correo o autenticador y códigos de recuperación; desbloqueo por PIN y biometría.",
      },
      {
        en: "Secure storage, screen-capture protection, camera, contacts and location behind typed forms (React Hook Form + Zod).",
        es: "Almacenamiento seguro, protección contra capturas de pantalla, cámara, contactos y ubicación tras formularios tipados (React Hook Form + Zod).",
      },
      {
        en: "File-based navigation with Expo Router, internationalization, and a Jest + Testing Library suite run before every pull request.",
        es: "Navegación por archivos con Expo Router, internacionalización y una suite de Jest + Testing Library que se ejecuta antes de cada pull request.",
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
        title: { en: "Fail the build, not the customer", es: "Que falle el build, no el cliente" },
        body: {
          en: "In preview and production there is no simulation: if a backend is missing the build fails, and the app never falls back to fake data.",
          es: "En preview y producción no hay simulación: si falta un backend el build falla, y la app nunca recurre a datos falsos.",
        },
      },
    ],
    impact: {
      en: "[Add the latest validated build milestone and date.]",
      es: "[Completar con el último hito de compilación validado y su fecha.]",
    },
    outcome: {
      en: "In active development, with development, staging and production build profiles on EAS.",
      es: "En desarrollo activo, con perfiles de build de desarrollo, staging y producción en EAS.",
    },
    stack: ["Expo SDK 57", "React Native 0.86", "TypeScript", "Expo Router", "TanStack Query", "Zustand", "React Hook Form", "Zod", "SQLite", "Jest", "EAS"],
  },
  {
    slug: "global-dentistry-group",
    preview: "/projects/global-dentistry-group.jpg",
    name: "Global Dentistry Group",
    year: "2025",
    kinds: ["web"],
    url: "https://global-dentistry-group.vercel.app",
    schemaType: "WebSite",
    status: { en: "Live", es: "En línea" },
    role: { en: "Design and development", es: "Diseño y desarrollo" },
    tagline: {
      en: "A fast, content-first site for a dental group.",
      es: "Un sitio rápido y centrado en contenido para un grupo dental.",
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
        en: "Static pages in Astro with a sitemap and optimized images.",
        es: "Páginas estáticas en Astro con sitemap e imágenes optimizadas.",
      },
      {
        en: "An appointment form with validation, an international phone input and a date picker, built on accessible Radix primitives.",
        es: "Un formulario de citas con validación, teléfono internacional y selector de fecha, sobre primitivas accesibles de Radix.",
      },
      {
        en: "Linting for accessibility (jsx-a11y) as part of the toolchain.",
        es: "Lint de accesibilidad (jsx-a11y) como parte del toolchain.",
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
    impact: {
      en: "[Add confirmed appointment requests and the measurement period.]",
      es: "[Completar con las solicitudes de cita confirmadas y el periodo medido.]",
    },
    outcome: {
      en: "Deployed on Vercel.",
      es: "Desplegado en Vercel.",
    },
    stack: ["Astro", "React", "TypeScript", "Tailwind CSS", "Radix UI", "React Hook Form", "Vercel"],
  },
  {
    // TODO(marlon): fill this in and remove `draft` to publish the case study.
    slug: "connetcare",
    name: "ConnetCare",
    year: "",
    kinds: ["web"],
    draft: true,
    url: "https://connetcare.com",
    schemaType: "SoftwareApplication",
    status: { en: "", es: "" },
    role: { en: "", es: "" },
    tagline: { en: "", es: "" },
    summary: { en: "", es: "" },
    facts: [],
    problem: { en: "", es: "" },
    built: [],
    decisions: [],
    outcome: { en: "", es: "" },
    stack: [],
  },
];

/** Published projects, in case-study order. */
export const projects: Project[] = projectSlugs
  .map((slug) => all.find((p) => p.slug === slug)!)
  .filter((p) => !p.draft);

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
