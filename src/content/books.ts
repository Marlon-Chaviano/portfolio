import type { Localized } from "@/lib/i18n";

export const bookCategories = ["software", "literature", "chess"] as const;
export type BookCategory = (typeof bookCategories)[number];

export type Book = {
  title: string;
  author?: string;
  category: BookCategory;
  status: "reading" | "read" | "queue";
  cover?: string;
  /** YYYY-MM, only when recorded in Notion. */
  finished?: string;
  description?: Localized;
};

/**
 * Notion reading log, reconciled on 2026-11-17.
 * Software includes the AI Product Engineer roadmap and prior completed software books.
 * Chess excludes discarded resources and counts Silman's course only once.
 * Marlon confirmed Silman and Polgár as his current chess reading.
 * Provenance and description references: books.sources.json.
 */
export const books: Book[] = [
  {
    "title": "AI Engineering",
    "author": "Chip Huyen",
    "category": "software",
    "status": "reading",
    "cover": "/books/ai-engineering.jpg",
    "description": {
      "en": "Building useful applications with foundation models: choosing models, evaluating results, and taking an AI product into production.",
      "es": "Cómo crear aplicaciones útiles con modelos de IA: elegir modelos, evaluar sus resultados y llevar un producto a producción."
    }
  },
  {
    "title": "The Mom Test",
    "author": "Rob Fitzpatrick",
    "category": "software",
    "status": "reading",
    "cover": "/books/the-mom-test.jpg",
    "description": {
      "en": "How to talk to customers without leading their answers. A practical guide to finding real problems and testing a business idea.",
      "es": "Cómo hablar con clientes sin condicionar sus respuestas. Una guía práctica para descubrir problemas reales y validar una idea de negocio."
    }
  },
  {
    "title": "Even Faster Web Sites",
    "cover": "/books/even-faster-web-sites.jpg",
    "author": "Steve Souders",
    "status": "read",
    "finished": "2026-03",
    "category": "software"
  },
  {
    "title": "Inclusive Design Patterns",
    "cover": "/books/inclusive-design-patterns-publisher.png",
    "author": "Heydon Pickering",
    "status": "read",
    "finished": "2026-01",
    "category": "software"
  },
  {
    "title": "Real-World Next.js",
    "author": "Michele Riva",
    "category": "software",
    "status": "read",
    "cover": "/books/real-world-next-js.jpg",
    "finished": "2025-11"
  },
  {
    "title": "JavaScript: The Definitive Guide",
    "cover": "/books/javascript-the-definitive-guide-publisher.jpg",
    "author": "David Flanagan",
    "status": "read",
    "finished": "2025-10",
    "category": "software"
  },
  {
    "title": "Frontend Architecture for Design Systems",
    "cover": "/books/frontend-architecture-for-design-systems.jpg",
    "author": "Micah Godbolt",
    "status": "read",
    "finished": "2025-10",
    "category": "software"
  },
  {
    "title": "Fluent React",
    "author": "Tejas Kumar",
    "category": "software",
    "status": "read",
    "cover": "/books/fluent-react.jpg",
    "finished": "2025-09"
  },
  {
    "title": "The Road to React",
    "cover": "/books/the-road-to-react.jpg",
    "author": "Robin Wieruch",
    "status": "read",
    "finished": "2025-07",
    "category": "software"
  },
  {
    "title": "Data Structure & Algorithm: Simply in Depth",
    "cover": "/books/data-structures-algorithms-in-depth.jpg",
    "author": "Ajit Singh",
    "status": "read",
    "finished": "2024-03",
    "category": "software"
  },
  {
    "title": "Cracking the Coding Interview",
    "cover": "/books/cracking-the-coding-interview.jpg",
    "author": "Gayle Laakmann McDowell",
    "status": "read",
    "category": "software"
  },
  {
    "title": "Clean Code",
    "cover": "/books/clean-code.jpg",
    "author": "Robert C. Martin",
    "status": "read",
    "category": "software"
  },
  {
    "title": "$100M Offers",
    "author": "Alex Hormozi",
    "category": "software",
    "status": "queue"
  },
  {
    "title": "Obviously Awesome",
    "author": "April Dunford",
    "category": "software",
    "status": "queue"
  },
  {
    "title": "Writing for Developers",
    "author": "Sarna & Dunlop",
    "category": "software",
    "status": "queue"
  },
  {
    "title": "$100M Leads",
    "author": "Alex Hormozi",
    "category": "software",
    "status": "queue"
  },
  {
    "title": "A Philosophy of Software Design",
    "author": "John Ousterhout",
    "category": "software",
    "status": "queue",
    "cover": "/books/a-philosophy-of-software-design.jpg"
  },
  {
    "title": "Designing Data-Intensive Applications (2ª ed.)",
    "author": "Martin Kleppmann",
    "category": "software",
    "status": "queue"
  },
  {
    "title": "Founding Sales",
    "author": "Pete Kazanjy",
    "category": "software",
    "status": "queue"
  },
  {
    "title": "High Performance PostgreSQL for Rails",
    "author": "Andrew Atkinson",
    "category": "software",
    "status": "queue",
    "cover": "/books/high-performance-postgresql-for-rails.jpg"
  },
  {
    "title": "Learning OpenTelemetry",
    "author": "Young & Parker",
    "category": "software",
    "status": "queue"
  },
  {
    "title": "OAuth 2.0 Simplified",
    "author": "Aaron Parecki",
    "category": "software",
    "status": "queue"
  },
  {
    "title": "Evals for AI Engineers",
    "author": "Shankar & Husain",
    "category": "software",
    "status": "queue"
  },
  {
    "title": "Fluent Python (2ª ed.)",
    "author": "Luciano Ramalho",
    "category": "software",
    "status": "queue"
  },
  {
    "title": "Release It!",
    "author": "Michael Nygard",
    "category": "software",
    "status": "queue"
  },
  {
    "title": "Traction",
    "author": "Weinberg & Mares",
    "category": "software",
    "status": "queue"
  },
  {
    "title": "$100M Money Models",
    "author": "Alex Hormozi",
    "category": "software",
    "status": "queue"
  },
  {
    "title": "Effective TypeScript (2ª ed.)",
    "author": "Dan Vanderkam",
    "category": "software",
    "status": "queue"
  },
  {
    "title": "Generative AI System Design Interview",
    "author": "Aminian & Xu",
    "category": "software",
    "status": "queue"
  },
  {
    "title": "Refactoring UI",
    "author": "Wathan & Schoger",
    "category": "software",
    "status": "queue"
  },
  {
    "title": "System Design Interview Vol. 1",
    "author": "Alex Xu",
    "category": "software",
    "status": "queue"
  },
  {
    "title": "The SaaS Playbook",
    "author": "Rob Walling",
    "category": "software",
    "status": "queue"
  },
  {
    "title": "The Software Engineer's Guidebook",
    "author": "Gergely Orosz",
    "category": "software",
    "status": "queue"
  },
  {
    "title": "The Staff Engineer's Path",
    "author": "Tanya Reilly",
    "category": "software",
    "status": "queue"
  },
  {
    "title": "Beyond Cracking the Coding Interview",
    "author": "McDowell et al.",
    "category": "software",
    "status": "queue"
  },
  {
    "title": "Never Split the Difference",
    "author": "Chris Voss",
    "category": "software",
    "status": "queue"
  },
  {
    "title": "Don't Make Me Think",
    "author": "Steve Krug",
    "category": "software",
    "status": "queue"
  },
  {
    "title": "Hands-On Large Language Models",
    "author": "Alammar & Grootendorst",
    "category": "software",
    "status": "queue"
  },
  {
    "title": "Influence",
    "author": "Robert Cialdini",
    "category": "software",
    "status": "queue"
  },
  {
    "title": "Laws of UX",
    "author": "Jon Yablonski",
    "category": "software",
    "status": "queue"
  },
  {
    "title": "Lean Analytics",
    "author": "Croll & Yoskovitz",
    "category": "software",
    "status": "queue"
  },
  {
    "title": "Observability Engineering (2ª ed.)",
    "author": "Majors, Fong-Jones & Miranda",
    "category": "software",
    "status": "queue"
  },
  {
    "title": "Shape Up",
    "author": "Ryan Singer",
    "category": "software",
    "status": "queue"
  },
  {
    "title": "The Adweek Copywriting Handbook",
    "author": "Joseph Sugarman",
    "category": "software",
    "status": "queue"
  },
  {
    "title": "The Design of Everyday Things",
    "author": "Don Norman",
    "category": "software",
    "status": "queue"
  },
  {
    "title": "Ensayo sobre la ceguera",
    "cover": "/books/ensayo-sobre-la-ceguera.jpg",
    "author": "José Saramago",
    "status": "read",
    "finished": "2026-08",
    "category": "literature"
  },
  {
    "title": "The Five People You Meet in Heaven",
    "cover": "/books/the-five-people-you-meet-in-heaven.jpg",
    "author": "Mitch Albom",
    "status": "read",
    "finished": "2025-12",
    "category": "literature"
  },
  {
    "title": "El signo de los cuatro",
    "cover": "/books/el-signo-de-los-cuatro.jpg",
    "author": "Arthur Conan Doyle",
    "status": "read",
    "finished": "2025-09",
    "category": "literature"
  },
  {
    "title": "Estudio en escarlata",
    "cover": "/books/estudio-en-escarlata.jpg",
    "author": "Arthur Conan Doyle",
    "status": "read",
    "finished": "2025-09",
    "category": "literature"
  },
  {
    "title": "El extranjero",
    "cover": "/books/el-extranjero.jpg",
    "author": "Albert Camus",
    "status": "read",
    "finished": "2025-05",
    "category": "literature"
  },
  {
    "title": "El amor en los tiempos del cólera",
    "cover": "/books/el-amor-en-los-tiempos-de-colera.jpg",
    "author": "Gabriel García Márquez",
    "status": "read",
    "finished": "2025-04",
    "category": "literature"
  },
  {
    "title": "Fahrenheit 451",
    "cover": "/books/fahrenheit-451.jpg",
    "author": "Ray Bradbury",
    "status": "read",
    "finished": "2024-12",
    "category": "literature"
  },
  {
    "title": "El gran Gatsby",
    "cover": "/books/el-gran-gatsby.jpg",
    "author": "F. Scott Fitzgerald",
    "status": "read",
    "finished": "2024-11",
    "category": "literature"
  },
  {
    "title": "El señor de las moscas",
    "cover": "/books/el-senor-de-las-moscas.jpg",
    "author": "William Golding",
    "status": "read",
    "finished": "2024-10",
    "category": "literature"
  },
  {
    "title": "1984",
    "cover": "/books/1984.jpg",
    "author": "George Orwell",
    "status": "read",
    "finished": "2024-09",
    "category": "literature"
  },
  {
    "title": "El retrato de Dorian Gray",
    "cover": "/books/el-retrato-de-dorian-gray.jpg",
    "author": "Oscar Wilde",
    "status": "read",
    "finished": "2024-09",
    "category": "literature"
  },
  {
    "title": "Orgullo y prejuicio",
    "cover": "/books/orgullo-y-prejuicio.jpg",
    "author": "Jane Austen",
    "status": "read",
    "finished": "2024-08",
    "category": "literature"
  },
  {
    "title": "El alquimista",
    "cover": "/books/el-alquimista.jpg",
    "author": "Paulo Coelho",
    "status": "read",
    "finished": "2024-08",
    "category": "literature"
  },
  {
    "title": "Crimen y castigo",
    "cover": "/books/crimen-y-castigo.jpg",
    "author": "Fiódor Dostoyevski",
    "status": "read",
    "finished": "2024-08",
    "category": "literature"
  },
  {
    "title": "Cien años de soledad",
    "cover": "/books/cien-anos-de-soledad.jpg",
    "author": "Gabriel García Márquez",
    "status": "read",
    "finished": "2024-06",
    "category": "literature"
  },
  {
    "title": "El diablo ilustrado",
    "cover": "/books/el-diablo-ilustrado.jpg",
    "status": "read",
    "finished": "2024-05",
    "category": "literature"
  },
  {
    "title": "El viejo y el mar",
    "cover": "/books/el-viejo-y-el-mar.jpg",
    "author": "Ernest Hemingway",
    "status": "read",
    "finished": "2024-04",
    "category": "literature"
  },
  {
    "title": "Rich Dad, Poor Dad",
    "cover": "/books/rich-dad-poor-dad.jpg",
    "author": "Robert Kiyosaki",
    "status": "read",
    "finished": "2024-01",
    "category": "literature"
  },
  {
    "title": "Sapiens: De animales a dioses",
    "cover": "/books/sapiens-de-animales-a-dioses.jpg",
    "author": "Yuval Noah Harari",
    "status": "read",
    "finished": "2023-12",
    "category": "literature"
  },
  {
    "title": "El cuervo",
    "cover": "/books/el-cuervo.jpg",
    "author": "Edgar Allan Poe",
    "status": "read",
    "category": "literature"
  },
  {
    "title": "Animal Farm",
    "cover": "/books/animal-farm.jpg",
    "author": "George Orwell",
    "status": "read",
    "category": "literature"
  },
  {
    "title": "Cumbres borrascosas",
    "cover": "/books/cumbres-borrascosas.jpg",
    "author": "Emily Bronté",
    "status": "read",
    "category": "literature"
  },
  {
    "title": "The Adventures of Sherlock Holmes",
    "cover": "/books/the-adventures-of-sherlock-holmes.jpg",
    "author": "Arthur Conan Doyle",
    "status": "read",
    "category": "literature"
  },
  {
    "title": "El principito",
    "cover": "/books/el-principito.jpg",
    "author": "Antoine de Saint-Exupéry",
    "status": "read",
    "category": "literature"
  },
  {
    "title": "Silman's Complete Endgame Course",
    "cover": "/books/silmans-complete-endgame-course.jpg",
    "author": "Jeremy Silman",
    "category": "chess",
    "status": "reading",
    "description": {
      "en": "Endgames explained by level, from basic checkmates and pawn endings to practical rook positions. A foundation for converting advantages and defending difficult positions.",
      "es": "Finales explicados por nivel: desde mates básicos y finales de peones hasta posiciones prácticas de torres. Una base para convertir ventajas y defender posiciones difíciles."
    }
  },
  {
    "title": "Chess: 5334 Problems, Combinations, and Games",
    "cover": "/books/chess-5334-problems.jpg",
    "author": "László Polgár",
    "category": "chess",
    "status": "reading",
    "description": {
      "en": "A collection of mating problems, tactical combinations and instructive games. Exercises for recognizing patterns and calculating more precisely.",
      "es": "Una colección de problemas de mate, combinaciones tácticas y partidas. Ejercicios para reconocer patrones y calcular con más precisión."
    }
  },
  {
    "title": "Logical Chess: Move by Move",
    "cover": "/books/logical-chess-move-by-move.jpg",
    "author": "Irving Chernev",
    "category": "chess",
    "status": "read"
  },
  {
    "title": "Winning Chess Tactics",
    "cover": "/books/winning-chess-tactics.jpg",
    "author": "Yasser Seirawan",
    "category": "chess",
    "status": "read"
  },
  {
    "title": "The Woodpecker Method",
    "author": "Axel Smith & Hans Tikkanen",
    "category": "chess",
    "status": "queue"
  },
  {
    "title": "The Amateur's Mind",
    "author": "Jeremy Silman",
    "category": "chess",
    "status": "queue"
  },
  {
    "title": "Mastering Chess Strategy",
    "author": "Johan Hellsten",
    "category": "chess",
    "status": "queue"
  },
  {
    "title": "Improve Your Chess Calculation",
    "author": "Ramesh RB",
    "category": "chess",
    "status": "queue"
  },
  {
    "title": "100 Endgames You Must Know",
    "author": "Jesús de la Villa",
    "category": "chess",
    "status": "queue"
  },
  {
    "title": "Chess Structures: A Grandmaster Guide",
    "author": "Mauricio Flores Ríos",
    "category": "chess",
    "status": "queue"
  },
  {
    "title": "Grandmaster Preparation Series",
    "author": "Jacob Aagaard",
    "category": "chess",
    "status": "queue"
  },
  {
    "title": "Dvoretsky's Endgame Manual",
    "author": "Mark Dvoretsky",
    "category": "chess",
    "status": "queue"
  }
];
