# CCDI cBio Content UI — System Design

This document is the **source of truth** for the repository structure, conventions, and patterns. Use it when generating or modifying code so that new work stays consistent with the existing architecture.

### How to use this doc with AI

- **Before generating or editing code**: Read the sections that apply (e.g. Repository Structure, Data Flow, Markdown Processing, Page/Component Patterns, File and Naming Conventions). For new features, follow the **Checklist for New Features** (Section 12).
- **When adding a route or feature**: Use the existing patterns (ModulesProvider/useModules, fetchContent, handler + processMarkdown, Tailwind, `@/` imports). Do not introduce new state or data patterns unless the doc is updated first.
- **When in doubt**: Prefer consistency with current files over external style guides. Match naming (e.g. `handle<Feature>.ts`, kebab-case routes) and placement (e.g. handlers next to the component that uses them).
- **Cursor**: Reference this file with `@SYSTEM_DESIGN.md` in the chat so the AI uses it as context for code generation and refactors.

---

## 1. Overview

- **Purpose**: Content UI for CCDI cBioPortal — displays markdown-driven content (About, Data Using, Datasets, Release Notes) fetched from an external GitHub content repo, with branch-based environments.
- **Stack**: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS 4, styled-components (optional), unified/remark/rehype for markdown.
- **Path alias**: `@/` resolves to `./src/*` (see `tsconfig.json` paths).

---

## 2. Repository Structure

```
ccdi-cbio-content-ui/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Root layout: fonts, ModulesProvider, branch detection
│   │   ├── page.tsx            # Home: tabbed Release Notes + Dataset Updates
│   │   ├── globals.css
│   │   ├── about/page.tsx
│   │   └── data-using/page.tsx
│   ├── components/
│   │   ├── TabItem.tsx         # Shared tab UI
│   │   ├── modules/
│   │   │   └── ModulesProvider.tsx   # React context for modules config
│   │   ├── about/
│   │   │   └── handleAbout.ts        # Markdown processing for About
│   │   ├── data-using/
│   │   │   └── handleDataUsing.ts
│   │   ├── datasets/
│   │   │   ├── Dataset.tsx
│   │   │   └── handleDatasets.ts
│   │   └── release-notes/
│   │       ├── ReleaseNotes.tsx
│   │       └── handleReleaseNotes.ts
│   └── utilities/
│       ├── configs.ts          # Branch name from hostname (main/dev/qa/stage)
│       └── data-fetching.ts    # fetchContent, fetchModules, types
├── assets/                     # Static SVGs/images (import in components)
├── public/                     # Static assets, version.json
├── scripts/
│   └── generate-version.js     # Post-build: .env → public/version.json
├── next.config.ts
├── tailwind.config.js
└── tsconfig.json
```

**Rules for AI-generated code:**

- Place **pages** under `src/app/<route>/page.tsx`.
- Place **feature components** under `src/components/<feature>/` (e.g. `about/`, `datasets/`).
- Place **shared components** in `src/components/` (e.g. `TabItem.tsx`).
- Place **global config/helpers** in `src/utilities/`.
- Use **`@/`** for imports (e.g. `@/utilities/data-fetching`, `@/components/modules/ModulesProvider`).

---

## 3. Data Flow and Content Source

- **Content source**: GitHub raw URLs — `https://raw.githubusercontent.com/CBIIT/ccdi-cbio-content/refs/heads/<branch>/`.
- **Branch**: Derived from hostname in **root layout** (server) and in **configs** (client): `main` (default), `dev`, `qa`, `stage`.
- **Module manifest**: `modules.json` at the content repo root defines entries per section:
  - `about`, `data-using`, `datasets`: arrays of `{ title, id, path }`.
  - `releases`: `Record<string, ModuleEntry[]>` (e.g. by year).
  - `images`: array of entries.

**Flow:**

1. **Root layout** (server): Reads headers → `getBranchNameFromHostname(hostname)` → `fetchModules({ branchName })` → passes `modules` to `ModulesProvider`.
2. **Pages/components** (client): Use `useModules()` to get the config, then `fetchContent(module.path)` for each module's markdown. Content is processed by feature-specific `processMarkdown()` and rendered (often via `dangerouslySetInnerHTML` for HTML output).

**When adding a new content section:**

- Ensure `modules.json` in the content repo includes the new key (e.g. a new array or nested structure).
- Extend `ModulesConfig` in `src/utilities/data-fetching.ts` to include that key.
- Add a handler in `src/components/<feature>/handleX.ts` and a UI component that uses `useModules()` and `fetchContent` + that handler.

---

## 4. Modules and Context

- **ModulesProvider** (`src/components/modules/ModulesProvider.tsx`): Client component that provides `ModulesConfig` via React context.
- **useModules()**: Returns `ModulesConfig`; must be used under `ModulesProvider`.
- **Layout**: Only the root layout fetches modules (server). All other modules are consumed on the client via `useModules()`.

**Convention:** Any page or component that needs the module list should use `useModules()` and read the slice it needs (e.g. `modules['data-using']`, `modules.releases`).

---

## 5. Data Fetching

- **fetchContent(filePath, { branchName? })**: Fetches raw text from the content repo. Uses `getBaseUrl(branchName)` (from `data-fetching.ts`). Optional `branchName` for server; on client, branch is inferred via `getBranchName()` from `configs.ts`.
- **fetchModules({ branchName? })**: Fetches and parses `modules.json`. Used only in root layout. Returns a fallback config on failure.
- **Caching**: `fetchContent` uses `next: { revalidate: 3600 }` for ISR.

**Convention:** Server-side fetching (e.g. in layout) passes `branchName` explicitly. Client-side fetching relies on `getBranchName()` and does not pass branch unless needed.

---

## 6. Markdown Processing Pattern

Each content area has a **handler** file that exports a single async function:

- **processMarkdown(content: string): Promise<string>**

Pipeline (same idea everywhere, different rehype plugins/theme):

1. **remark**: parse → GFM → rehype.
2. **rehype**: custom theme (Tailwind classes per element), rehype-slug, rehype-highlight, rehype-stringify.

**Handler location and naming:**

- `src/components/<feature>/handle<Feature>.ts` (e.g. `handleAbout.ts`, `handleDataUsing.ts`, `handleDatasets.ts`, `handleReleaseNotes.ts`).
- Each defines a **rehypeCustomTheme** that uses `visit(tree, 'element', (node) => { ... })` to set `node.properties.className` (and sometimes `node.tagName` or `node.properties.target`/`href`) for `p`, `a`, `ul`, `ol`, `li`, `h2`, `h3`, `h4`, `img`, `em` as needed.

**Convention for new features:**

- Create `handleX.ts` in `src/components/<feature>/`.
- Use the same unified pipeline: remarkParse → remarkGfm → remarkRehype → rehypeCustomTheme → rehypeSlug → rehypeHighlight → rehypeStringify.
- Keep styling in rehypeCustomTheme (Tailwind classes); avoid inline styles in the handler.
- If the content repo uses relative image paths, resolve them in the handler (see `handleDataUsing.ts` and `BASE_IMAGE_URL`).

---

## 7. Page and Component Patterns

### 7.1 App Router pages

- **Layout**: Root `layout.tsx` is async; it gets headers, branch, and modules, and wraps children in `ModulesProvider`. No other layout in the tree was in use at doc time.
- **Pages**: Typically **client components** (`'use client'`) so they can use `useModules()`, `useState`, `useEffect`, and refs.

### 7.2 Content page pattern (About, Data Using)

- Use `useModules()` and take the slice for that section (e.g. `about`, `data-using`).
- Local state: `processedItems` (processed modules), `loading`.
- `useEffect`: For each module, `fetchContent(module.path)` → `processMarkdown(content)` → store in state. Handle errors and set loading false.
- Optional: **ResizeObserver** on main content ref → `window.parent.postMessage(['setHeight', height], '*')` for embed/iframe height.
- Render: If loading, return a simple "Loading…"; otherwise map over processed items and render with `dangerouslySetInnerHTML` for the processed HTML.
- **Type**: Define a local type extending module entry with `fetchedProcessedContent: string` (e.g. `ProcessedAboutModule`).

### 7.3 Tabbed home page (Release Notes + Datasets)

- Home page holds tab state (`activeTabId`), a ref for the main content, and ResizeObserver for postMessage height.
- Renders `<TabItem>` for each tab and conditionally `<ReleaseNotes />` or `<Dataset />`.
- **ReleaseNotes**: Uses `releases` from `useModules()`, flattens and reverses; supports a special link with class `dataset-updates` that triggers `handleTabClick('dataset-updates')` (event delegation). Release notes can preserve raw HTML before the first `</div>` and only process the rest with markdown (see `ReleaseNotes.tsx`).
- **Dataset**: Uses `datasets` from `useModules()`, fetches and processes each module, renders as a list of articles.

### 7.4 Shared components

- **TabItem**: Presentational; props `children`, `isActive`, `onClick`; uses Tailwind; `role="tab"`, `aria-selected`.
- **ModulesProvider**: Wraps app and exposes `useModules()`.

---

## 8. Styling Conventions

- **Tailwind CSS**: Primary styling. Use utility classes in JSX and in rehype handlers (as `className` arrays or strings).
- **globals.css**: Imports Tailwind; defines `:root` CSS variables (e.g. fonts, background/foreground). Body uses `var(--font-open-sans)` etc. Optional dark mode via `prefers-color-scheme`.
- **Fonts**: Loaded in root layout from `next/font/google` (Geist, Open Sans, Poppins, Lato, Inter, Nunito, Public Sans, Rubik). Classes reference them as `font-[Poppins]`, `font-[Inter]`, etc., or via Tailwind theme (e.g. `fontFamily` in `tailwind.config.js`).
- **tailwind.config.js**: `content` should include all relevant sources; if you add new directories under `src/`, ensure they are included (e.g. `./src/app/**/*.{ts,tsx}`, `./src/components/**/*.{ts,tsx}`).
- **styled-components**: In package.json but not required for new code; Tailwind is the standard. Use Tailwind unless the task explicitly requires styled-components.

---

## 9. Environment and Configuration

- **Branch detection** (`src/utilities/configs.ts`):
  - **getBranchNameFromHostname(hostname)**: Used on server (layout) and indirectly on client. Returns `main` | `dev` | `qa` | `stage` from hostname (e.g. first segment or `-dev`/`-qa`/`-stage`). Default `main` when hostname is missing.
  - **getBranchName()**: Client-only; uses `window.location.hostname` and falls back to `main`.
- **Version**: `NEXT_PUBLIC_VERSION` in `.env` (or `.env.EXAMPLE`). Post-build script writes `public/version.json` with `{ "version": "..." }`. next.config sets CORS and cache headers for `/version.json`.

---

## 10. Security and Best Practices

- **dangerouslySetInnerHTML**: Used for processed markdown output. Content comes from the project's own content repo. `rehype-sanitize` is in package.json but not currently in the pipeline; consider adding it in handlers if content is not fully trusted.
- **Links**: Handlers set `target = '_blank'` for external links; special cases (e.g. in-app "dataset-updates") are handled in the handler or via event delegation (ReleaseNotes).
- **Images**: In at least one handler, image `src` is rewritten to a base URL (content repo) to avoid broken relative paths.

---

## 11. File and Naming Conventions

| Item              | Convention |
|-------------------|------------|
| Route             | kebab-case (`about`, `data-using`) |
| Page component    | Default export; name can match route (e.g. `About`, `DataUsing`) |
| Feature folder    | kebab-case under `components/` (`release-notes`, `data-using`) |
| Handler file      | `handle<Feature>.ts` (e.g. `handleAbout.ts`) |
| Handler export    | `processMarkdown(content: string): Promise<string>` |
| Types             | In `data-fetching.ts` for shared types; local types in the same file or next to the component |
| Client boundary   | Add `'use client'` at top of file when using hooks or browser APIs |

---

## 12. Checklist for New Features (AI-Oriented)

When generating a **new content section** (new route + module type):

1. **Types**: Extend `ModulesConfig` in `src/utilities/data-fetching.ts` if the new section has a new key in `modules.json`.
2. **Handler**: Add `src/components/<feature>/handle<Feature>.ts` with `processMarkdown` and a rehype theme for that page's styling.
3. **Component**: Add a client component under `src/components/<feature>/` that uses `useModules()`, `fetchContent`, and the new handler; define a processed-module type with `fetchedProcessedContent`.
4. **Page**: Add `src/app/<route>/page.tsx` that renders the new component; use ref + ResizeObserver + postMessage if the page is embedded.
5. **Route**: No extra layout needed unless you introduce a new segment; link to the new route from nav or existing pages as required.
6. **Tailwind**: If you add new files/dirs, ensure `tailwind.config.js` `content` includes them.

When generating **shared UI** (e.g. a new tab or shared widget):

1. Prefer `src/components/` for shared components and `src/components/<feature>/` for feature-specific ones.
2. Use existing patterns: `useModules()` when config is needed, `fetchContent` when loading raw content, and the appropriate handler for markdown.
3. Keep accessibility in mind (e.g. `role`, `aria-*`, keyboard support as in the home tabs).

---

## 13. Summary Diagram

```
[Host] → layout.tsx → getBranchNameFromHostname → fetchModules(branch)
                           ↓
                  ModulesProvider(modules)
                           ↓
         ┌─────────────────┼─────────────────┐
         ↓                 ↓                 ↓
    page (home)      about/page      data-using/page
         ↓                 ↓                 ↓
    useModules()      useModules()      useModules()
         ↓                 ↓                 ↓
    releases,         about[]          data-using[]
    datasets              ↓                 ↓
         ↓           fetchContent       fetchContent
    fetchContent     processMarkdown    processMarkdown
    processMarkdown  (handleAbout)      (handleDataUsing)
    (handle*)             ↓                 ↓
         ↓           dangerouslySetInnerHTML
    ReleaseNotes/
    Dataset
```

This document should be updated when the architecture or conventions change so it remains the single source of truth for AI-assisted code generation.
