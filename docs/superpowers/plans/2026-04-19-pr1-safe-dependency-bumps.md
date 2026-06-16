# PR 1: Safe Dependency Bumps Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade all dependencies except next/react/react-dom — zero CVEs introduced, zero broken functionality.

**Architecture:** Pure package version bumps with three targeted code changes: remove node-fetch import, add dotenv quiet option, add remark-html sanitize:false option. No structural changes.

**Tech Stack:** Next.js 14 (Pages Router), TypeScript, Tailwind CSS, gray-matter, remark, date-fns, dotenv

---

## Files to modify

- `package.json` — bump versions, remove node-fetch
- `scripts/publish-to-buttondown.js` — delete `require('node-fetch')` line, add `{ quiet: true }` to dotenv
- `src/lib/posts.ts` — add `{ sanitize: false }` to remark-html usage

---

### Task 1: Bump package versions and remove node-fetch

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Update package.json**

Replace the dependencies and devDependencies blocks with these exact versions:

```json
{
  "dependencies": {
    "date-fns": "^4.1.0",
    "dotenv": "^17.4.2",
    "gray-matter": "^4.0.3",
    "js-yaml": "^4.1.0",
    "next": "^14.1.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "remark": "^15.0.1",
    "remark-html": "^16.0.1",
    "rss": "^1.2.2"
  },
  "devDependencies": {
    "@tailwindcss/typography": "^0.5.16",
    "@types/js-yaml": "^4.0.9",
    "@types/node": "^22.0.0",
    "@types/react": "^18.3.0",
    "@types/rss": "^0.0.32",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.5.0",
    "tailwindcss": "^3.4.1",
    "ts-node": "^10.9.2",
    "typescript": "^5.8.0"
  }
}
```

Note: `node-fetch` is removed entirely — no replacement entry needed (native fetch used instead).

- [ ] **Step 2: Install updated dependencies**

```bash
npm install
```

Expected: No errors. May see some deprecation warnings — those are fine. Should NOT see any peer dependency errors.

- [ ] **Step 3: Commit package changes**

```bash
git add package.json package-lock.json
git commit -m "chore: bump safe dependencies, remove node-fetch"
```

---

### Task 2: Fix publish-to-buttondown.js

**Files:**
- Modify: `scripts/publish-to-buttondown.js`

- [ ] **Step 1: Delete the node-fetch require line**

In `scripts/publish-to-buttondown.js`, delete line 8:
```js
const fetch = require('node-fetch');
```

After deletion, the top of the file should look like:
```js
#!/usr/bin/env node

// This script publishes the latest post to ButtonDown
require('dotenv').config({ quiet: true });
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
```

- [ ] **Step 2: Add quiet:true to dotenv config**

Change line 4 from:
```js
require('dotenv').config();
```
to:
```js
require('dotenv').config({ quiet: true });
```

- [ ] **Step 3: Commit**

```bash
git add scripts/publish-to-buttondown.js
git commit -m "chore: remove node-fetch, silence dotenv logging"
```

---

### Task 3: Fix remark-html sanitize option in posts.ts

**Files:**
- Modify: `src/lib/posts.ts`

- [ ] **Step 1: Add sanitize:false to remark-html usage**

In `src/lib/posts.ts`, find the remark pipeline (around line 96):
```ts
const processedContent = await remark()
  .use(html)
  .process(matterResult.content);
```

Change it to:
```ts
const processedContent = await remark()
  .use(html, { sanitize: false })
  .process(matterResult.content);
```

This preserves the existing behaviour — remark-html v16 reviewed its sanitization defaults, and `{ sanitize: false }` makes the pass-through behaviour explicit rather than implicit.

- [ ] **Step 2: Commit**

```bash
git add src/lib/posts.ts
git commit -m "chore: explicit sanitize:false in remark-html (preserve existing behaviour)"
```

---

### Task 4: Verify the build

**Files:** none (verification only)

- [ ] **Step 1: Run the build**

```bash
npm run build
```

Expected output ends with something like:
```
Route (pages)                              Size     First Load JS
┌ ○ /                                      ...
└ ● /posts/[id]                            ...
○  (Static)   prerendered as static content
●  (SSG)      prerendered as static HTML (uses getStaticProps)

✓ Generating static pages
Export successful
RSS feed generated successfully
```

If the build fails, check the error — most likely a TypeScript type error from the upgraded `@types/*` packages. Fix the type error before proceeding.

- [ ] **Step 2: Verify output directory**

```bash
ls out/
```

Expected: `index.html`, `posts/` directory, `rss.xml`, `_redirects`, and other static assets present.

- [ ] **Step 3: Run npm audit**

```bash
npm audit
```

Expected: Zero critical or high severity advisories. (Moderate/low from transitive deps are acceptable at this stage — the critical/high ones are in `next@14.x` and will be fixed in PR 2.)

- [ ] **Step 4: Commit a build verification note (optional)**

If audit output is clean, no commit needed. If there are unexpected findings, note them in a commit message for the PR.

---

### Task 5: Open PR 1

- [ ] **Step 1: Push branch**

```bash
git push origin HEAD
```

- [ ] **Step 2: Open PR targeting main**

```bash
gh pr create \
  --title "chore: safe dependency bumps (date-fns 4, remark 15, dotenv 17, remove node-fetch)" \
  --body "$(cat <<'EOF'
## Summary

Upgrades all dependencies except next/react/react-dom. No breaking changes — three small code fixes to match new package behaviour.

## Changes

**Package bumps:**
- `date-fns` 2.x → 4.x (drop-in: `parseISO`/`format` API unchanged)
- `dotenv` 16.x → 17.x
- `remark` 14.x → 15.x
- `remark-html` 15.x → 16.x
- `node-fetch` removed (replaced by native Node.js `fetch`)
- `@types/node` 20.x → 22.x, `typescript` 5.3 → 5.8, other dev dep bumps

**Code changes:**
- `scripts/publish-to-buttondown.js`: deleted `require('node-fetch')`, added `{ quiet: true }` to dotenv (v17 logs to stdout by default)
- `src/lib/posts.ts`: added `{ sanitize: false }` to `remark-html` usage (v16 reviewed defaults; this makes pass-through explicit)

## Verification

- `npm run build` passes, `out/` produced correctly
- `npm audit` output: [paste here]

## Next

PR 2 (next 14→15 + react 18→19, security-critical CVEs) stacks on top of this.
EOF
)"
```

