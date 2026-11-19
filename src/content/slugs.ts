/** Case-study order. */
export const projectSlugs = [
  "diodi",
  "grialink",
  "grialink-mobile",
  "first-commit",
  "bmori",
  "bmori-mobile",
  "global-dentistry-group",
  "nel-shey-medical-center",
  "connetcare",
] as const;

export type ProjectSlug = (typeof projectSlugs)[number];
