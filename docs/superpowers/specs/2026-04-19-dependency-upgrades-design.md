---
name: Dependency Upgrades — April 2026
description: Design for upgrading all npm dependencies, prioritising security CVEs in next@14.x, delivered as two stacked PRs
type: project
---

# Dependency Upgrades — April 2026

## Goal

Upgrade all outdated npm dependencies. Security patches (Next.js CVEs) are the primary driver. Delivered as two stacked PRs so each can be built, reviewed, and deployed independently.

## Context

The project is a static Next.js blog (Pages Router, `output: 'export'`) deployed to Netlify. No App Router, no middleware, no server-side rendering. The codebase is small: 7 source files, 2 build scripts.

### Current vs target versions

| Package | Current | Target | Reason |
|---|---|---|---|
| next | 14.1.0 | 15.x latest | 1 critical + 4 high CVEs |
| react / react-dom | 18.2.0 | 19.x latest | Required peer dep for Next 15 |
| @types/react | 18.2.48 | 19.x latest | Match react upgrade |
| date-fns | 2.30.0 | 4.x latest | Major version, drop-in for used APIs |
| dotenv | 16.4.7 | 17.x latest | Minor behavioural change (logging) |
| node-fetch | 2.7.0 | removed | Replace with native Node.js fetch |
| remark | 14.0.3 | 15.x latest | Peer dep chain |
| remark-html | 15.0.2 | 16.x latest | Peer dep chain |
| @tailwindcss/typography | 0.5.16 | latest | Patch bump |
| tailwindcss / postcss | 3.4.1 / 8.4.33 | latest | Patch bump |
| typescript / @types/node | 5.3.3 / 20.x | latest | Patch bump |

## PR 1 — Safe dependency bumps

### Scope

All packages except `next`, `react`, `react-dom`, and `@types/react`.

### Package changes

- `date-fns` `^2.30.0` → `^4.1.0`: `parseISO` and `format` APIs are identical. Zero code changes.
- `dotenv` `^16.4.7` → `^17.4.2`: v17 logs to stdout by default. Add `{ quiet: true }` to silence it.
- `node-fetch`: removed entirely. Replace the single `require('node-fetch')` with native `fetch` (available in Node 18+, which Next.js 14/15 already requires).
- `remark` `^14.0.3` → `^15.0.1`: No API changes for `.process(string)` usage.
- `remark-html` `^15.0.2` → `^16.0.1`: Add `{ sanitize: false }` to preserve existing pass-through behaviour (v16 reviewed sanitization defaults; explicit opt-out matches current behaviour).
- `@tailwindcss/typography`, `tailwindcss`, `postcss`, `typescript`, `@types/node`, `@types/js-yaml`, `@types/rss`, `ts-node`: bumped to latest within existing major ranges. No code changes.

### Code changes

**`scripts/publish-to-buttondown.js`**
```diff
-const fetch = require('node-fetch');
 // (line deleted — native fetch used instead)
 ...
-require('dotenv').config();
+require('dotenv').config({ quiet: true });
```

**`src/lib/posts.ts`**
```diff
-  .use(html)
+  .use(html, { sanitize: false })
```

### Verification

1. `npm install` — no peer dep errors or warnings
2. `npm run build` — static export succeeds, `out/` directory produced
3. Inspect `out/` — post pages present, `rss.xml` generated
4. `npm audit` — no new advisories introduced

---

## PR 2 — Next.js 15 + React 19 (security-critical)

Stacks on PR 1. Contains all CVE fixes.

### CVEs resolved

| Advisory | Severity | Description |
|---|---|---|
| GHSA-f82v-jwr5-mffw | Critical | Authorization bypass in Next.js middleware |
| GHSA-mwv6-3258-q52c | High | DoS via Server Components |
| GHSA-5j59-xgg2-r9c4 | High | DoS (incomplete fix follow-up) |
| GHSA-h25m-26qc-wcjf | High | DoS variant |
| GHSA-q4gf-8mx6-v5v3 | High | DoS variant |
| GHSA-4342-x723-ch2f | Moderate | Middleware redirect → SSRF |

### Package changes

- `next` `^14.1.0` → `^15.5.15` (latest 15.x as of 2026-04-19)
- `react` / `react-dom` `^18.2.0` → `^19.2.5`
- `@types/react` `^18.2.48` → `^19.x`

### Code changes

**`next.config.js`**: Remove the empty `async rewrites()` block. It is a no-op today but incompatible with `output: 'export'` under Next.js 15's stricter validation.

```diff
 const nextConfig = {
   reactStrictMode: true,
   output: 'export',
   images: {
     unoptimized: true,
   },
-  async rewrites() {
-    return [];
-  }
 }
```

No other code changes required. Pages Router (`getStaticProps`, `getStaticPaths`, dynamic routes) API is unchanged in Next.js 15. No React APIs used by this project were removed in React 19.

### Verification plan

The PR description will include the output of each step as proof of correctness.

1. **`npm install`** — confirm no peer dep errors
2. **`npm run build`** — confirm static export completes without errors
3. **`npm audit`** — confirm critical/high CVEs are resolved; include before/after output
4. **`npx serve out`** — start a local static server and take screenshots of:
   - Homepage (post list renders, dates formatted correctly)
   - A single post page (content renders, date component works)
   - RSS feed URL (`/rss.xml` returns valid XML)

### Known gap

The newsletter script (`scripts/publish-to-buttondown.js`) cannot be end-to-end tested without sending a real email to subscribers. The only change to that script in this session is deleting the `require('node-fetch')` line (native fetch replaces it with identical API). A proper dry-run mode is deferred to a future session.

## Stacking strategy

```
main
 └── PR 1: safe-dependency-bumps
      └── PR 2: nextjs-15-react-19  (targets PR 1 branch, not main)
```

PR 2 is opened against the PR 1 branch. After PR 1 merges to main, PR 2 is rebased onto main before merging.
