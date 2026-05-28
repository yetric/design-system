# Where we are

## Components shipped

| Component    | Variants | Sizes | Radius | Notes |
|--------------|----------|-------|--------|-------|
| Accordion    | —        | —     | —  | Radix, single/multiple, collapsible |
| AlertDialog  | —        | —     | ✅ | Radix compound |
| Avatar       | —        | ✅ xs–xl | ✅ | Image + initials fallback |
| Badge        | ✅ 8     | ✅ xs–xl | ✅ full default | |
| Breadcrumb   | —        | —     | —  | HTML nav, slash/custom separator, ellipsis |
| Button       | ✅ 8     | ✅ xs–xl | ✅ | asChild, disabled via data-attr, icon support |
| Card         | —        | —     | ✅ | Header/Content/Footer sub-components |
| Checkbox     | —        | ✅ xs–xl | — | Radix, indeterminate state |
| Collapsible  | —        | —     | —  | Radix Root/Trigger/Content |
| Dialog       | —        | —     | ✅ | Radix |
| DropdownMenu | —        | —     | ✅ | Radix compound: Item/CheckboxItem/RadioItem/Sub |
| Form         | —        | —     | —  | react-hook-form + Zod integration |
| Input        | —        | —     | —  | Primitive, use InputField for forms |
| InputField   | —        | ✅ xs–xl | ✅ | Merged textarea (multiline prop), helpText, error, useId |
| Label        | —        | —     | —  | Radix, required indicator |
| Pagination   | —        | —     | —  | HTML nav: Previous/Next/Link/Ellipsis |
| Popover      | —        | —     | ✅ | Radix compound: Trigger/Content/Anchor/Close |
| Progress     | ✅ 5     | ✅ xs–xl | ✅ | Radix, indeterminate support |
| RadioGroup   | —        | —     | —  | Radix, horizontal/vertical |
| ScrollArea   | —        | —     | —  | Radix, vertical/horizontal scrollbars |
| Select       | —        | ✅ xs–xl | — | Radix compound: Trigger/Content/Item/Label/Separator/Group |
| Separator    | —        | —     | —  | horizontal/vertical, decorative/semantic |
| Skeleton     | —        | —     | —  | Animated pulse, arbitrary sizing |
| Slider       | —        | —     | —  | Radix, range support, steps, disabled |
| Stack        | —        | —     | —  | Flex layout primitive, row/col, gap, align, justify |
| Switch       | —        | ✅ xs–xl | — | Radix, optional label prop |
| Table        | —        | —     | —  | See below |
| Tabs         | ✅ 3     | —     | —  | Radix, default/underline/pills variants |
| Text         | ✅ sizes | ✅ | — | xs→5xl, weights, colors, alignment |
| Toast        | —        | —     | —  | Sonner-based |
| Toggle       | ✅ 2     | ✅ sm–lg | — | Radix, + ToggleGroup (single/multiple) |
| Tooltip      | —        | —     | ✅ | Radix, TooltipProvider wrapping |

## Table — unified component

`Table` runs in two modes based on whether `data` prop is present:

### Children mode
```tsx
<Table density="compact" striped borders="grid" stickyHeader>
  <TableHeader><TableRow><TableHead>Name</TableHead></TableRow></TableHeader>
  <TableBody><TableRow><TableCell>Alice</TableCell></TableRow></TableBody>
</Table>
```

### Data-driven mode
```tsx
<Table
  data={rows}
  columns={cols}   // ColumnDef<TRow>[] from @tanstack/react-table
  searchable       // global text filter
  selectable       // row checkboxes + select-all
  pageSize={10}    // enables pagination
  density="compact" | "default" | "comfortable"
  borders="rows" | "grid" | "outer" | "none"
  striped
  stickyHeader
/>
```

Column-level filters via `meta` on each column:
```tsx
{ accessorKey: "name",   meta: { filterType: "text" } }
{ accessorKey: "joined", meta: { filterType: "date" } }
{ accessorKey: "amount", meta: { filterType: "number" } }
{ accessorKey: "role",   meta: { filterType: "select", filterOptions: ["Admin","Editor"] } }
```
Filters button in toolbar toggles a filter row. Clear button resets all.

## Constants (for consumer use)
```ts
import { VARIANT, SIZE, RADIUS } from "@yetric/ui";
<Button variant={VARIANT.PRIMARY} size={SIZE.MD} radius={RADIUS.LG} />
```

## Design tokens
- Colors: Zinc base + Violet primary
- Font: IBM Plex Sans
- Dark mode via `.dark` class on `<html>`
- CSS variables in `src/styles/globals.css`
- Tailwind config extends all tokens (background, foreground, card, primary, secondary, muted, accent, destructive, warning, success, info, border, input, ring, shadow, z-index, duration, easing)

## Testing
- 134 tests, all green
- Unit: Vitest + jsdom + @testing-library/react
- Browser: Storybook + Playwright/Chromium via @storybook/addon-vitest
- `src/test/setup.ts` polyfills pointer capture, scrollIntoView, ResizeObserver for Radix in jsdom

## What's next (priority order)

1. **DropdownMenu** — unblocks user menus, action menus, DataTable row actions. Radix `@radix-ui/react-dropdown-menu`. Highest utility.
2. **Avatar** — image + fallback initials. Simple, no Radix needed.
3. **Toast/Sonner** — feedback after actions. Needs a provider + positioning system, slightly heavier setup.
4. **Tooltip** — deferred. Skipped for now: invisible on mobile, often misused, add only when a real use case demands it.

## Incomplete / gaps in existing components

| Component   | Gap                                                                 |
|-------------|---------------------------------------------------------------------|
| Button      | Loading state (spinner + disabled during async)                     |
| Button      | No standardized icon slot (left/right)                              |
| Card        | No sub-components — need CardHeader, CardContent, CardFooter        |
| Input       | Hardcoded h-10, no size prop — inconsistent with InputField         |
| InputField  | Label/helpText/error font size doesn't scale with size prop         |
| InputField  | Icon support next to helpText/error (flex wrapper ready, no prop)   |
| Checkbox    | No error/invalid state for form validation                          |
| Dialog      | Missing AlertDialog (destructive confirmations, different semantic) |
| Table       | No loading/skeleton state                                           |

**Priority order for fixes:**
1. Button loading state — very commonly needed, blocks real usage
2. Card sub-components — CardHeader, CardContent, CardFooter
3. Input size prop — fix the inconsistency
4. Table loading/skeleton
5. AlertDialog
6. Checkbox error state
7. InputField label size scaling + icon support

## Color system — migrate to Open Color

Source: https://yeun.github.io/open-color/

Open Color gives a consistent 10-step scale (0=lightest, 9=darkest) across 17 hues:
gray, red, pink, grape, violet, indigo, blue, cyan, teal, green, lime, yellow, orange.

**Plan:**
- Keep the semantic CSS variable layer (--primary, --destructive, etc.) — consuming apps never reference raw OC values
- Map semantic tokens onto OC values in `globals.css`
- Proposed palette:
  - **Base/neutral**: OC gray (replaces Zinc)
  - **Primary**: OC violet (keep current feel, better scale)
  - **Destructive**: OC red
  - **Warning**: OC orange
  - **Success**: OC green
  - **Info**: OC blue
  - **Secondary/muted**: OC gray mid-tones
- Install `open-color` npm package for the JS color values, or just copy the HSL values into globals.css directly (simpler, no runtime dep)
- Update Tailwind config to use the new HSL values
- Dark mode: use deeper steps (7–9) for surfaces, lighter steps (0–2) for foreground in dark

**Why OC:** consistent perceptual steps, designed for UI, widely used, predictable naming.

## DX — making the API something devs love

Things to tackle (not all at once — pick up as we go):

**Already good:**
- TypeScript-first, no `any` leaking out
- Consistent `size`, `variant`, `radius` props across components
- `VARIANT`, `SIZE`, `RADIUS` constants so no magic strings
- Radix accessibility built in
- `cn` utility exported for consumers to compose classes
- All component prop types exported (ButtonProps, BadgeProps, etc.)

**Gaps to close:**
- **Form library integration** — react-hook-form `Controller` pattern. InputField, Checkbox, Select should accept `ref` cleanly and expose `name`/`onBlur` without friction. This is where most real apps feel the pain.
- **`asChild` beyond Button** — Badge, Card, and others could support `asChild` for use as links/router elements.
- **Better default variant** — `VARIANT.DEFAULT` exists but isn't consistently useful. Consider making `primary` the true default everywhere and removing `default` variant confusion.
- **Component-level className merging** — already done via `cn()`, but confirm no component accidentally blocks className override.
- **Prop types re-exported** — all `*Props` types should be importable so consumers can type their own wrappers.
- **JSDoc on key props** — hover docs in IDE for non-obvious props (e.g. `asChild`, `multiline`, `filterType`).
- **Single import surface** — everything from `@yetric/ui`, never from `@yetric/ui/button` etc. Already the case, keep it.
- **Zero required props** — every component should render something reasonable with no props passed.
- **Controlled + uncontrolled** — all inputs should work both ways without friction.

## Foundational gaps (non-component)

### 1. Icon strategy — DECISION NEEDED
Blocks: Button icons, InputField prefix/suffix, alert icons, Table actions, etc.
Options:
- **Lucide React** — most common in React ecosystem, tree-shakeable, consistent style
- **Phosphor Icons** — richer set, multiple weights, same tree-shakeable pattern
- **Heroicons** — Tailwind's own, smaller set
- **Custom SVG sprite** — full control, no external dep, more maintenance

Recommendation: Lucide. Decide and integrate before adding icon props to any component.

### 2. Skeleton component
Standalone `<Skeleton>` primitive (animated pulse) usable anywhere — cards, lists,
avatars, table rows. Not just a Table concern. One component covers all loading states.

### 3. ThemeProvider + useTheme hook
Currently `applyTheme`/`getSystemTheme` helpers exist but apps wire dark mode themselves.
Need:
- `<ThemeProvider defaultTheme="system">` React context
- `useTheme()` hook returning `{ theme, setTheme }`
- Handles system preference detection + localStorage persistence
- Lives in `src/lib/theme.ts` (already has helpers, extend it)

### 4. Typography scale + Text/Heading components
No type hierarchy codified. Need:
- Defined scale: display, h1–h4, body-lg, body, body-sm, caption, label
- `<Heading as="h1–h4" size="...">` component
- `<Text size="..." weight="..." color="...">` component
- Tokens for font-size, line-height, letter-spacing in Tailwind config

### 5. Stack layout primitive
Devs currently write raw `flex flex-col gap-4` everywhere. A thin:
```tsx
<Stack gap={4} direction="row" align="center">...</Stack>
```
covers 80% of layout needs and makes intent explicit. No magic, just a convenience wrapper.

### 6. Form integration pattern
react-hook-form is the dominant form library. Need:
- Verify `ref` forwarding works cleanly on InputField, Checkbox, Select
- A `<FormField>` wrapper that accepts `control`/`name` from RHF and wires errors automatically
- Example story showing a full form with validation (Zod schema)
- Document the pattern in Storybook

### 7. CSS delivery
Consumers must import `src/styles/globals.css` themselves — not documented, not enforced.
Options: auto-inject via side-effect import in index.ts, or document clearly in README.
Risk: "why is nothing styled" is the #1 onboarding failure point.

## First-class citizen checklist

### Critical (blocking real-world adoption)

- **`"use client"` directives** — every component using hooks or browser APIs needs this for Next.js App Router. Currently the library is broken in the most popular React setup. Add to all Radix-based components and anything with useState/useEffect/useRef.

- **`@tanstack/react-table` → peerDependency** — currently a regular dep, meaning it ships in the bundle for every consumer even if they never use `Table`. Move to `peerDependencies`. Same principle applies to future heavy deps (Sonner, etc.).

- **`exports` map in package.json** — without a proper `exports` field, bundlers can't tree-shake effectively and subpath imports behave unpredictably across toolchains. Define `exports` for ESM, types, and CSS.

### Important (professionalism / trust)

- **GitHub Actions CI** — no automated pipeline yet. Need:
  - Run tests on every PR
  - Type-check on every PR
  - Automated `npm publish` on version tag push

- **Deploy Storybook** — local Storybook is great for dev, useless as public docs. Deploy to Chromatic, Vercel, or GitHub Pages. This becomes the public API reference.

- **CHANGELOG.md** — consumers can't know what changed between versions. Adopt conventional commits + auto-generated changelog (e.g. `changesets` or `release-it`).

- **README** — currently sparse. Need: installation, quick start, one real usage example, link to deployed Storybook.

### Nice to have

- **Visual regression testing** — Chromatic catches unintended visual changes across stories. Critical once the Open Color migration happens.
- **Bundle size tracking** — add `bundlesize` or similar to CI so regressions are caught before publish.
- **SSR safety audit** — verify no `window`/`document` access outside effects.

## CSS Modules + Tailwind architecture

**Goal:** Tailwind used internally only. Consumers can use CSS Modules (or plain CSS) with no Tailwind setup required.

**Why it already mostly works:**
Tailwind v3 wraps all output in `@layer base/components/utilities`. CSS Modules don't use layers, so they sit outside — CSS Module rules automatically win on specificity. The cascade already favours the consumer.

**What still needs doing:**

1. **Ship pre-compiled Tailwind CSS in dist**
   The build pipeline needs a step that generates `dist/index.css` containing both design tokens AND all compiled Tailwind utility classes used internally. The `index.ts` auto-import then points at this built file, not the source. Consumers get styled components with zero Tailwind config.

2. **Component-level CSS custom properties**
   Beyond global tokens, expose per-component variables so consumers can override structure without touching Tailwind:
   ```css
   /* consumer CSS Module */
   .myButton {
     --button-height: 3rem;
     --button-radius: 0;
   }
   ```
   Currently no components expose these. Adding them makes CSS Modules feel first-class.

3. **`data-*` attributes as styling hooks**
   Consumers need stable hooks to target variant/size/state in CSS Modules:
   ```css
   .myButton[data-variant="primary"] { background: hotpink; }
   .myButton[data-size="lg"] { padding: 1rem 2rem; }
   ```
   Radix already adds `data-state`, `data-disabled` etc. We should add `data-variant` and `data-size` to our own components.

4. **Audit `className` position in all `cn()` calls**
   Consumer `className` must always be the final argument in every `cn()` call so it wins regardless of specificity. Needs a pass across all components.

5. **No Tailwind required from consumers**
   Pre-compiled dist CSS (point 1) makes this true. Document explicitly: "no Tailwind config needed in your app."

## Polish / smaller items
- **Storybook Docs tab** — `tags: ["autodocs"]` is set globally, check it renders well for all new components
