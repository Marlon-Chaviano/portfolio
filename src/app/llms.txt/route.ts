import { posts } from "@/content/blog/posts";
import { books } from "@/content/books";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

/** A plain-text map of the site for language models. https://llmstxt.org */
export function GET() {
  const reading = books.filter((b) => b.status === "reading");

  const body = [
    `# ${site.name}`,
    "",
    `> ${site.description.en}`,
    "",
    `- Role: ${site.role}`,
    `- Location: ${site.location}`,
    `- Languages: Spanish, English`,
    `- Focus: ${site.knowsAbout.join(", ")}`,
    ...Object.entries(site.socials)
      .filter(([, url]) => url)
      .map(([name, url]) => `- ${name}: ${url}`),
    ...(reading.length ? [`- Currently reading: ${reading.map((b) => `${b.title}${b.author ? ` (${b.author})` : ""}`).join("; ")}`] : []),
    "",
    "## Pages",
    "",
    `- [About](${site.url}/en/about): Who he is, what he builds and how he works.`,
    `- [Work](${site.url}/en/work): Index of case studies.`,
    `- [Library](${site.url}/en/library): The books he is reading and the ones he has finished.`,
    `- [Blog](${site.url}/en/blog): Notes on building products end to end.`,
    `- [Contact](${site.url}/en/contact): How to reach him.`,
    "",
    "## Case studies",
    "",
    ...projects.map(
      (p) => `- [${p.name}](${site.url}/en/work/${p.slug}): ${p.summary.en} Role: ${p.role.en}. Stack: ${p.stack.join(", ")}.`,
    ),
    "",
    ...(posts.some((p) => !p.sample)
      ? [
          "## Posts",
          "",
          ...posts
            .filter((p) => !p.sample)
            .map((p) => `- [${p.title.en ?? p.title.es}](${site.url}/en/blog/${p.slug}): ${p.summary.en ?? p.summary.es} (${p.date})`),
          "",
        ]
      : []),
    "## Español",
    "",
    `- [Inicio](${site.url}/es): ${site.description.es}`,
    "",
  ].join("\n");

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
