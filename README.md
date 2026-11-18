# Marlon Chaviano — portfolio

Next.js 16 (App Router, Cache Components) · React 19 · Tailwind CSS 4 · MDX · React Bits details and sounds. English at `/en`, Spanish at `/es`. Every page is prerendered.

The design is greyscale and follows the system light/dark theme; the only colour comes from project previews and book covers.

```bash
pnpm dev        # http://localhost:3000
pnpm lint && pnpm typecheck && pnpm build
```

## Updating content

Everything you edit day to day is a typed file in `src/content/`:

| File | What it holds |
| --- | --- |
| `site.ts` | Name, role, links, email, WhatsApp number, CV path, Chess.com username and friend link |
| `projects.ts` | Case studies (set `draft: true` to hide one); `preview` points at an image in `public/projects/` |
| `books.ts` | Reading log reconciled with Notion; local covers in `public/books`, source links in `books.sources.json` |
| `blog/posts.ts` + `blog/*.mdx` | Blog: write `<slug>.en.mdx` and/or `<slug>.es.mdx`, then add the entry to `posts.ts` |
| `skills.ts` | Skills by area and level, linked to the projects that prove them |
| `games.ts` | Games, kept by hand; shown as a short list on the About page |

Entries with `sample: true` are placeholders and show a "sample" tag; replace them or delete the flag. Interface copy lives in `src/i18n/en.ts` and `src/i18n/es.ts`. Search the repo for `TODO(marlon)` to find what is still missing.

## Environment

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Production origin, used for canonical URLs, sitemap and JSON-LD |
| `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` | Public form key from Web3Forms, verified for `chavianomarlon@gmail.com`. Required to receive contact submissions |

## Contact delivery

The Send button submits directly to [Web3Forms](https://web3forms.com/) from the browser, as required by its free plan (250 submissions/month). The visitor stays on the page, sees the result, and keeps their draft if delivery fails. The form never launches an email app. WhatsApp remains a separate option.

Create a form at https://app.web3forms.com, verify the recipient email, and add its public Access Key as `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` in `.env.local` and the deployment environment. Restart development or rebuild the deployment after changing the key. The key is a public form identifier, not a secret credential; never substitute an account API token.

Messages include the visitor's email as the reply address. A honeypot and Web3Forms' spam filtering help reduce unwanted submissions. Requests time out after 15 seconds. Missing configuration, rejected submissions and connection failures never show as successful delivery.

## Notes

- `src/components/bits` and `src/components/sounds` are vendored from [React Bits](https://reactbits.dev) (MIT + Commons Clause) and are excluded from lint.
- Navigation order lives in `src/lib/routes.ts`; colours and type in `src/app/globals.css`.
- Sound is off by default; the visitor's choice is stored in `localStorage`.
