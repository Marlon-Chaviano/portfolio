# Library and About

Existing portfolio extension; Experience / Read. Preserve the monochrome editorial grid, typography, spacing, and working puzzle.

## Direction contract

THESIS: Three distinct reading shelves, with Software selected first. Software combines the AI Product Engineer roadmap with the previously completed technical books from Notion. Current reading leads, finished books follow, the future list opens on demand.

OWN-WORLD: Existing black canvas, off-white type, muted labels, hairline separators, and shared editorial rail. The rail spans the row padding and meets horizontal boundaries; the title starts beneath the navbar without a duplicate top rule. Covers fill their portrait frames. Tabs use text and a selected underline.

STORY: Visitors can understand what Marlon is learning, choose Software, Literatura, or Chess, and discover his personal interest in chess on About.

FIRST VIEWPORT: Keep the existing page header; place the three keyboard-accessible tabs immediately above the first horizontal rule of the reading section, without an extra separator or bottom gap. Current books have top-aligned titles, authors and brief descriptions. Narrow screens place text before the cover.

FORM: seed: none (pinned). User requested “tres tabs” and titles above the covers. About keeps its biography paragraph; its chess section shows only the Rapid rating for marlon-ch and the profile friendship button. A separate concise LeetCode row immediately below shows the live solved total and profile link for Marlon-Chaviano.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

No visual-system replacement: preserve incumbent styles; DESIGN.md is absent and not added by this extension. Ratings use the public Chess.com API. No friendship request is sent automatically.

## Finish evidence — 2026-11-17

Fresh finish review: `fix`, followed by `ship` after both requested fixes were scored resolved: immediate selected-tab styling and a factual PRODUCT.md. The verdict covers those corrections. The extension retains the existing editorial grid, typography and palette; no design-system replacement was made.

Captures are in `.impeccable/review/`: desktop top viewports for all shelves and About, plus queue/chess sections. Narrow checks used native Safari at 300% zoom (approximately 565 CSS px), not physical-device emulation. Arrow-key and Home navigation, pointer selection, queue expansion, and rendered live chess ratings were checked. No 390px-device capture is claimed.

Book and cover provenance is recorded in `src/content/books.sources.json`. The user's direct confirmation resolves the conflicting Notion chess summary in favor of Silman and Polgár.

## Follow-up: shared rules and LeetCode

Removed the shared header's top border and reduced the outer offset to the fixed navbar height. Section rails are anchored to full row bounds, preserving content padding, with a continuation through Library tabs. Standalone blog and 404 content retain an explicit top inset.

LeetCode's public GraphQL response and rendered About both show 240 solved problems for Marlon-Chaviano at verification. The count is fetched on the server, refreshed with the hours cache profile, and displays a brief unavailable state on errors. Chess and LeetCode remain separate concise rows.

Desktop verification covered Library, Contact, About, a project header and a blog article. Captures: `library-connected-rails.png`, `contact-connected-rails.png`, `about-leetcode.png`, `about-leetcode-spanish.png`. The latest narrow-width browser check was interrupted by concurrent user activity; no new mobile verification is claimed. Build, TypeScript and lint passed.
