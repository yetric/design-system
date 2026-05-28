# Where we are — @yetric/ui

> Last updated: 2026-05-28 · v0.1.0 · 37 components · 228 tests passing

## Components shipped

| Component        | Variants        | Sizes       | Radius   | Notes |
|------------------|-----------------|-------------|----------|-------|
| Accordion        | —               | —           | —        | Radix, single/multiple, collapsible |
| AlertDialog      | —               | ✅ sm–xl    | ✅       | Radix compound, destructive/primary action |
| Avatar           | —               | ✅ xs–xl    | ✅ (full default) | Image + initials fallback, status dot |
| Badge            | ✅ 8            | ✅ xs–xl    | ✅       | Icon slot, dismiss button |
| Box              | —               | ✅ token    | ✅       | Design-token layout primitive |
| Breadcrumb       | —               | —           | —        | HTML nav, slash/custom separator, ellipsis |
| Button           | ✅ 8            | ✅ xs–xl    | ✅       | Loading state, icon-only size, asChild |
| Card             | ✅ 4            | —           | ✅       | CardImage, CardHeader (actions), CardTitle (as), CardFooter (justify), interactive |
| Checkbox         | —               | ✅ xs–xl    | ✅       | Radix, indeterminate, error state |
| Collapsible      | —               | —           | —        | Radix Root/Trigger/Content |
| Command          | —               | —           | —        | cmdk-based search/combobox |
| ContextMenu      | —               | —           | —        | Radix compound |
| Dialog           | —               | ✅ sm–full  | ✅       | Radix |
| DropdownMenu     | —               | —           | —        | Radix compound: Item/CheckboxItem/RadioItem/Sub |
| Form             | —               | —           | —        | react-hook-form + Zod integration |
| HoverCard        | —               | —           | —        | Radix |
| Input            | —               | ✅ xs–xl    | ✅       | leftIcon/rightIcon, error state |
| InputField       | —               | ✅ xs–xl    | ✅       | label+input+helpText, textarea mode, icons |
| Label            | —               | —           | —        | Radix, required indicator |
| NavigationMenu   | —               | —           | —        | Radix compound |
| Pagination       | —               | ✅ xs–xl    | —        | Previous/Next/Link/Ellipsis |
| Popover          | —               | —           | ✅       | Radix compound |
| Progress         | ✅ 5            | ✅ xs–xl    | ✅       | Radix, indeterminate |
| RadioGroup       | —               | ✅ xs–xl    | —        | Radix, horizontal/vertical |
| ScrollArea       | —               | —           | —        | Radix, vertical/horizontal |
| Select           | —               | ✅ xs–xl    | ✅       | Radix compound |
| Separator        | —               | —           | —        | horizontal/vertical, decorative/semantic |
| Skeleton         | ✅ 7 presets    | —           | ✅       | Animated pulse, presets: text/heading/avatar/button/card/badge |
| Slider           | —               | ✅ sm–lg    | —        | Radix, range, steps, disabled |
| Stack            | —               | —           | —        | Flex layout primitive, row/col, gap, align |
| Switch           | —               | ✅ xs–xl    | —        | Radix, optional label |
| Table            | —               | —           | —        | Data-driven + children mode (TanStack Table) |
| Tabs             | ✅ 3            | ✅ sm–lg    | —        | Radix, default/underline/pills |
| Text             | ✅ sizes        | ✅ xs–5xl   | —        | weights, colors, alignment |
| Toast            | —               | —           | —        | Sonner-based |
| Toggle           | ✅ 2            | ✅ sm–lg    | ✅       | Radix + ToggleGroup (single/multiple), radius via context |
| Tooltip          | —               | —           | ✅       | Radix, TooltipProvider |

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
- **228 tests, all green** across 36 test files
- Unit: Vitest + jsdom + @testing-library/react
- Browser: Storybook + Playwright/Chromium via @storybook/addon-vitest
- `src/test/setup.ts` polyfills pointer capture, scrollIntoView, ResizeObserver for Radix in jsdom
- Every component has at least basic tests; richer components (Card, Badge, Table) have 8–14 tests

## Component roadmap

Matrix comparison against **Radix UI Primitives** (33 primitives) and **Mantine Core** (107 components) identified the following gaps. Grouped by priority.

### 🔴 Tier A — High impact, most apps need these

| Component | Present in | Why it matters |
|-----------|-----------|----------------|
| **Alert** | Mantine | Inline contextual banners (success/warning/error/info). Different from Toast — stays on-page, not time-limited |
| **Drawer** | Mantine | Slide-in side panel. Essential for mobile nav, settings sheets, detail panels |
| **Loader / Spinner** | Mantine | Animated spinner for async states. Skeleton covers content placeholders; Loader covers in-button/inline loading |
| **NumberInput** | Mantine | +/– stepper input with keyboard support. Required in nearly every data entry form |
| **Heading** | Mantine | h1–h6 component with design token scale. `Text` exists but Heading has semantic props and scale variants |
| **Textarea** | Mantine | Standalone `<textarea>` (currently only available via InputField's `multiline` prop) |

### 🟡 Tier B — Common patterns, adds real value

| Component | Present in | Why it matters |
|-----------|-----------|----------------|
| **Stepper** | Mantine | Multi-step wizard / form progress indicator |
| **Kbd** | Mantine | Keyboard shortcut display — `⌘K`, `Ctrl+S`. Tiny but high-signal for dev tools / docs |
| **Code** | Mantine | Inline `<code>` and block code with monospace styling and optional copy button |
| **Indicator** | Mantine | Notification dot positioned on another element (Avatar, Icon, Button). Complements Avatar's `status` prop |
| **SegmentedControl** | Mantine | Polished radio-as-pill-group. More opinionated than ToggleGroup — single select, active segment has background fill |
| **Chip** | Mantine | Toggleable filter tag. Looks like a Badge but acts like a Checkbox |
| **MultiSelect** | Mantine | Multi-value select with search. Critical for admin UIs, tag selection, permission pickers |
| **AspectRatio** | Radix + Mantine | Responsive ratio container (16/9, 1/1, etc.) — needed for image/video cards |
| **Fieldset** | Mantine | Grouped form section with optional legend and disabled propagation |

### 🟢 Tier C — Nice to have

| Component | Present in | Why it matters |
|-----------|-----------|----------------|
| TagsInput | Mantine | Free-form tag entry (type + Enter) |
| PinInput | Radix + Mantine | OTP / PIN entry with per-digit boxes |
| Rating | Mantine | Star rating input |
| Timeline | Mantine | Vertical activity feed / changelog view |
| Spoiler | Mantine | Expandable/collapsible text with "Show more" trigger |
| Blockquote | Mantine | Styled `<blockquote>` with optional cite |
| Paper | Mantine | Simple surface/elevation wrapper (lighter than Card) |
| Anchor | Mantine | Themed `<a>` with variant/color/underline props |
| Menubar | Radix | Horizontal app menu bar (File / Edit / View…) |
| Toolbar | Radix | Accessible grouped button toolbar |

## Design tokens

- **Colors**: Zinc base + Violet primary, via Open Color
- **Font**: IBM Plex Sans (loaded via `@font-face` in `globals.css`)
- **Dark mode**: `.dark` class on `<html>`
- **CSS variables**: `src/styles/globals.css` — semantic tokens: `--primary`, `--destructive`, `--warning`, `--success`, `--info`, `--muted`, `--border`, `--ring`, etc.
- **Tailwind config** extends all tokens (background, foreground, card, primary, secondary, muted, accent, destructive, warning, success, info, border, input, ring, shadow, z-index, duration, easing)
- **Design token libs**: `src/lib/radius.ts`, `src/lib/size.ts`, `src/lib/shadow.ts`, `src/lib/icon.ts`

### Token pattern
Always use explicit Tailwind class lookup maps — never dynamic `rounded-${r}` strings (JIT won't pick them up):
```ts
const radiusClass: Record<Radius, string> = {
  none: "rounded-none", xs: "rounded-sm", sm: "rounded", md: "rounded-md", ...
}
```

## Constants (for consumer use)
```ts
import { VARIANT, SIZE, RADIUS } from "@yetric/ui";
<Button variant={VARIANT.PRIMARY} size={SIZE.MD} radius={RADIUS.LG} />
```

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

## DX — API design principles

**Already in place:**
- TypeScript-first, all `*Props` types exported
- Consistent `size`, `variant`, `radius` props across components
- `VARIANT`, `SIZE`, `RADIUS` constants — no magic strings
- Radix accessibility primitives as base
- `cn` utility exported for consumers to compose classes
- `"use client"` directives on all components using hooks/browser APIs
- react-hook-form + Zod integration via `Form`/`useZodForm`
- Single import surface: `import { Button } from "@yetric/ui"`

**Open items:**
- `asChild` beyond Button — Badge, Card, Anchor could support it for router links
- JSDoc on non-obvious props (`multiline`, `filterType`, `asChild`)
- `data-variant` / `data-size` attributes as CSS Module styling hooks

## Infrastructure / shipping

| Item | Status |
|------|--------|
| `"use client"` on all interactive components | ✅ Done |
| `@tanstack/react-table` as peerDependency | ✅ Done |
| `exports` map in package.json | ✅ Done |
| Pre-compiled CSS in dist (`dist/index.css`) | ✅ Done |
| GitHub Actions CI (test + typecheck) | ⬜ Not yet |
| Deploy Storybook (Chromatic / GitHub Pages) | ⬜ Not yet |
| CHANGELOG.md + changesets | ⬜ Not yet |
| Visual regression testing (Chromatic) | ⬜ Not yet |
