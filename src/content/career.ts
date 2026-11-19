import type { Localized } from "@/lib/i18n";

type CareerEntry = {
  title: Localized;
  role: Localized;
  period: Localized;
  current: boolean;
  highlights: Localized[];
  links?: { label: string; url: string; logo?: string }[];
};

export const career: CareerEntry[] = [
  {
    title: { es: "Bonafide Microbank", en: "Bonafide Microbank" },
    role: { es: "Desarrollador frontend y móvil · Guinea Ecuatorial", en: "Frontend and mobile developer · Equatorial Guinea" },
    period: { es: "Actualidad", en: "Present" },
    current: true,
    highlights: [
      {
        es: "Trabajo en B-Morï, la plataforma de banca digital de Bonafide. Desarrollé la app para iOS y Android con React Native y Expo para que los clientes puedan consultar sus transacciones y transferir dinero. Ahora estoy construyendo la versión web.",
        en: "I work on B-Morï, Bonafide’s digital banking platform. I built the iOS and Android app with React Native and Expo so customers can review transactions and transfer money. I’m now building the web version.",
      },
      {
        es: "También desarrollo B Plane Mobile, una app basada en Plane, el gestor de proyectos de código abierto. La estoy adaptando para que el equipo de Bonafide gestione sus proyectos desde el móvil.",
        en: "I’m also building B Plane Mobile on top of the open-source project management tool Plane. I’m adapting it so Bonafide’s team can manage projects from their phones.",
      },
      {
        es: "Desarrollé la interfaz y el flujo de inicio de sesión único (SSO) de Bonafide, además de un servicio para la plataforma bancaria.",
        en: "I built Bonafide’s single sign-on (SSO) interface and authentication flow, along with a service for the banking platform.",
      },
    ],
    links: [{ label: "B-Morï", url: "/work/bmori" }],
  },
  {
    title: { es: "Ezi Group LLC", en: "Ezi Group LLC" },
    role: { es: "Desarrollador principal · Grialink y Diodi", en: "Lead developer · Grialink and Diodi" },
    period: { es: "Actualidad", en: "Present" },
    current: true,
    highlights: [
      {
        es: "En Grialink creé Grial Front Desk, un recepcionista con IA que atiende llamadas y agenda citas. Desarrollé Grial Mind para responder mensajes en las bandejas de entrada. También integré Twilio, incorporé el análisis de llamadas y desarrollé la app móvil.",
        en: "At Grialink, I built Grial Front Desk, an AI receptionist that answers calls and books appointments. I built Grial Mind to reply to inbox messages. I also integrated Twilio, added call analysis, and built the mobile app.",
      },
      {
        es: "Diseñé Diodi y desarrollé su API en Rails y su panel en Vue. Los equipos pueden ver cuándo aparece su marca en respuestas de IA, qué fuentes se citan y cómo se compara su visibilidad con la de sus competidores. El panel reutiliza informes calculados en segundo plano.",
        en: "I designed Diodi and built its Rails API and Vue dashboard. Teams can see when their brand appears in AI answers, which sources are cited, and how their visibility compares with competitors. The dashboard reuses reports generated in the background.",
      },
    ],
    links: [{ label: "Grialink", logo: "/career/grialink.png", url: "/work/grialink" }, { label: "Diodi", logo: "/career/diodi.png", url: "/work/diodi" }],
  },
  {
    title: { es: "Desarrollo web freelance", en: "Freelance web development" },
    role: { es: "ConnetCare · Ezi Group LLC", en: "ConnetCare · Ezi Group LLC" },
    period: { es: "Nov 2024 – sep 2026", en: "Nov 2024 – Sep 2026" },
    current: false,
    highlights: [
      {
        es: "Empecé a trabajar por proyectos en tercer año de carrera. Desarrollé la interfaz de ConnetCare y su plataforma de cursos. Los alumnos compran con Stripe y los administradores publican cursos y habilitan los módulos para cada alumno.",
        en: "Began freelancing in my third year at university. Built ConnetCare’s web interface and course platform. Learners pay through Stripe and administrators publish courses and unlock modules for each learner.",
      },
      {
        es: "Desarrollé el blog con Astro e implementé el acceso con Google y la gestión de cookies en el backend con NestJS.",
        en: "Built the blog with Astro and implemented Google sign-in and cookie management in the NestJS backend.",
      },
      {
        es: "Diseñé el sitio de Nel & Shey Medical Center, adapté la interfaz para móviles y desarrollé el calendario de citas. Para Global Dentistry Group construí el sitio con Astro y React y conecté el formulario de reservas con la API.",
        en: "I designed the Nel & Shey Medical Center site, adapted the layout for mobile screens, and built the appointment calendar. For Global Dentistry Group, I built the site with Astro and React and connected the booking form to the API.",
      },
    ],
    links: [
      { label: "ConnetCare", logo: "/career/connetcare.png", url: "https://www.connetcare.com/" },
      { label: "Nel & Shey Medical Center", logo: "/career/nel.png", url: "https://www.nsmedicalcenter.com/" },
      { label: "Global Dentistry Group", logo: "/career/global.png", url: "https://www.globaldentistrygroup.com/" },
    ],
  },
];

export const education: CareerEntry = {
  title: { es: "Ingeniero Informático", en: "Degree in Computer Engineering" },
  role: { es: "Universidad Central «Marta Abreu» de Las Villas", en: "Universidad Central “Marta Abreu” de Las Villas" },
  period: { es: "Graduado · Carrera de cuatro años", en: "Graduated · Four-year program" },
  current: false,
  highlights: [
    {
      es: "Estructura de Datos fue la asignatura que me enganchó a la programación competitiva. Me gustaba descomponer un problema, probar distintas estructuras de datos y entender por qué una solución funcionaba mejor que otra. Esa curiosidad me llevó a competir dos veces en el International Collegiate Programming Contest (ICPC) y hoy sigo resolviendo problemas en LeetCode.",
      en: "Data Structures was the course that got me hooked on competitive programming. I loved breaking down a problem, trying different data structures, and figuring out why one solution worked better than another. That curiosity took me to the International Collegiate Programming Contest (ICPC) twice, and I still solve problems on LeetCode today.",
    },
    {
      es: "Arquitectura de Computadores y Sistemas Operativos me enseñaron a seguir lo que ocurre entre una línea de código, el procesador y la memoria.",
      en: "Computer Architecture and Operating Systems taught me to trace what happens between a line of code, the processor, and memory.",
    },
    {
      es: "Mi tesis se centró en un observatorio de vigilancia tecnológica con IA para el Ministerio de Energía y Minas (MINEM) y el Centro de Investigaciones para la Industria Minero Metalúrgica (CIPIMM). El sistema buscaba y clasificaba artículos científicos, patentes y noticias sobre energías renovables y minería para detectar tendencias. Desarrollé el panel en React y me encargué de la consulta de datos, la caché y la autenticación.",
      en: "My thesis focused on an AI-powered technology observatory for Cuba’s Ministry of Energy and Mines (MINEM) and the Research Center for the Mining and Metallurgical Industry (CIPIMM). The system found and classified research papers, patents, and news on renewable energy and mining to identify emerging trends. I built the React dashboard and handled data fetching, caching, and authentication.",
    },
  ],
  links: [
    { label: "UCLV", logo: "/career/uclv.png", url: "https://www.uclv.edu.cu/" },
    { label: "ICPC", logo: "/career/icpc.png", url: "https://icpc.global/" },
    { label: "MINEM", url: "https://t.me/minem_cuba" },
    { label: "CIPIMM", url: "https://cu.linkedin.com/company/cipimm" },
  ],
};
