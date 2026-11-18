/** Case-study order. */
export const projectSlugs = [
  "diodi",
  "grialink",
  "first-commit",
  "bmori-mobile",
  "global-dentistry-group",
  "connetcare",
] as const;

export type ProjectSlug = (typeof projectSlugs)[number];
