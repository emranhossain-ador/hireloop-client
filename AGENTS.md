<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# HireLoop

Single Next.js 16 (App Router) app — a job-platform landing page. Not a monorepo: everything lives at the repo root. `CLAUDE.md` contains only `@AGENTS.md`; keep guidance in this file.

## Commands (npm — lockfile is `package-lock.json`; don't switch to pnpm/yarn)

- `npm run dev` — dev server. It also rewrites the managed block above; keep it verbatim (see below).
- `npm run lint` — ESLint 9 flat config (`eslint.config.mjs`).
- `npm run typecheck` — `tsc --noEmit`.
- `npm run format` — Prettier over `**/*.{ts,tsx}` only (CSS/MD/JSON are not covered).
- `npm run build` / `npm run start` — production.
- **No test suite, no CI, no pre-commit hooks**: the full verification is `npm run lint` + `npm run typecheck`.

## Managed block

- Text between `<!-- BEGIN:nextjs-agent-rules -->` and `<!-- END:nextjs-agent-rules -->` is owned by `next dev` (`node_modules/next/dist/server/lib/generate-agent-files.js`) and must match the generator byte-for-byte or the file gets rewritten. Put all custom notes outside the markers.

## Stack quirks

- **Next.js 16.4.4** — APIs differ from older Next; the bundled docs in `node_modules/next/dist/docs/` are the source of truth.
- **Tailwind CSS v4**, no `tailwind.config` file: theme tokens, `@theme`, and the dark-mode variant (`@custom-variant dark (&:is(.dark *))`) all live in `app/globals.css`. Theming is class-based via next-themes (`attribute="class"`); `<html>` needs `suppressHydrationWarning`, and `<body>` currently hardcodes the `dark` class.
- **shadcn/ui style `base-nova`** (`components.json`): primitives are built on **Base UI (`@base-ui/react`)**, not Radix — don't copy Radix-based shadcn examples. Add components with `npx shadcn@latest add <name>` (see README); they land in `components/ui/`.
- `cn` in `lib/utils.ts` is a re-export of the `cn` npm package — not the usual clsx + tailwind-merge.
- Prettier config is `semi: false`, double quotes, LF, with `prettier-plugin-tailwindcss` sorting classes — but the existing code still has semicolons and fails `prettier --check`. Don't mass-format files you didn't touch.
- Path alias `@/*` → repo root (tsconfig `paths`).

## Layout

- `app/layout.tsx` renders `Navbar` + `Footer` around **every** page; the only page, `app/page.tsx`, composes sections from `components/home/*` (default exports). `components/ui/` holds shadcn primitives.
- No API routes, database, or env vars anywhere yet (`.env*` is gitignored) — nothing to provision.
