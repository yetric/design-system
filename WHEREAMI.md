# Where we are — @yetric/ui

> Last updated: 2026-05-29 · v0.1.0 · 61 components · 380 tests passing

## Components shipped

| Component        | Variants        | Sizes       | Radius   | Notes |
|------------------|-----------------|-------------|----------|-------|
| Accordion        | —               | —           | —        | Radix, single/multiple, collapsible |
| Anchor           | ✅ 3            | —           | —        | Themed `<a>`, underline modes, external link icon |
| Alert            | ✅ 5            | ✅ sm–lg    | ✅       | Info/success/warning/destructive, icon, dismissible |
| AlertDialog      | —               | ✅ sm–xl    | ✅       | Radix compound, destructive/primary action |
| AspectRatio      | —               | —           | —        | Responsive ratio container (16/9, 1/1, etc.) |
| Avatar           | —               | ✅ xs–xl    | ✅ (full default) | Image + initials fallback, status dot |
| Badge            | ✅ 8            | ✅ xs–xl    | ✅       | Icon slot, dismiss button |
| Blockquote       | —               | ✅ xs–xl    | —        | Left-border accent, optional cite, figcaption |
| Box              | —               | ✅ token    | ✅       | Design-token layout primitive |
| Breadcrumb       | —               | —           | —        | HTML nav, slash/custom separator, ellipsis |
| Button           | ✅ 8            | ✅ xs–xl    | ✅       | Loading state, icon-only size, asChild |
| Card             | ✅ 4            | —           | ✅       | CardImage, CardHeader (actions), CardTitle (as), CardFooter (justify), interactive |
| Checkbox         | —               | ✅ xs–xl    | ✅       | Radix, indeterminate, error state |
| Chip             | —               | ✅ xs–xl    | ✅       | Toggleable filter tag, role=checkbox |
| Code             | ✅ inline/block | —           | ✅       | Language label, copy button |
| Collapsible      | —               | —           | —        | Styled trigger (chevron animation) + animated content |
| Command          | —               | —           | —        | cmdk-based search/combobox |
| ContextMenu      | —               | —           | —        | Radix compound |
| Dialog           | —               | ✅ sm–full  | ✅       | Radix |
| Drawer           | ✅ 4 sides      | ✅ sm–xl    | ✅       | Slide-in panel, Radix Dialog base |
| DropdownMenu     | —               | —           | —        | Radix compound: Item/CheckboxItem/RadioItem/Sub |
| Fieldset         | —               | ✅ xs–xl    | ✅       | Native fieldset/legend, disabled propagation |
| Form             | —               | —           | —        | react-hook-form + Zod integration |
| HoverCard        | —               | —           | —        | Radix |
| Indicator        | ✅ 6 colors     | ✅ xs–xl    | —        | Notification dot/count badge, 4 positions, overflow |
| Input            | —               | ✅ xs–xl    | ✅       | leftIcon/rightIcon, error state |
| InputField       | —               | ✅ xs–xl    | ✅       | label+input+helpText, textarea mode, icons |
| Kbd              | ✅ 3            | ✅ xs–lg    | ✅       | Keyboard shortcut display, 3D shadow |
| Label            | —               | —           | —        | Radix, required indicator |
| Loader           | ✅ 6 colors     | ✅ xs–xl    | —        | Animated spinner, role=status |
| Menubar          | —               | —           | —        | Radix compound: Menu/Trigger/Content/Item/Sub/Checkbox/Radio/Shortcut |
| MultiSelect      | —               | ✅ xs–xl    | ✅       | Searchable dropdown, tags, clear, maxValues |
| NavigationMenu   | —               | —           | —        | Radix compound |
| NumberInput      | —               | ✅ xs–xl    | ✅       | +/– stepper, min/max/step |
| Pagination       | —               | ✅ xs–xl    | —        | Previous/Next/Link/Ellipsis, disabled prop |
| Paper            | —               | —           | ✅       | Surface/elevation wrapper, shadow, padding |
| PinInput         | —               | ✅ xs–xl    | ✅       | OTP/PIN per-digit, auto-advance, paste, mask, error |
| Popover          | —               | —           | ✅       | Radix compound |
| Progress         | ✅ 5            | ✅ xs–xl    | ✅       | Radix, indeterminate |
| RadioGroup       | —               | ✅ xs–xl    | —        | Radix, horizontal/vertical |
| Rating           | —               | ✅ xs–xl    | —        | Star rating, readOnly, count, color |
| ScrollArea       | —               | —           | —        | Radix, vertical/horizontal |
| SegmentedControl | —               | ✅ xs–xl    | ✅       | Radio-pill-group, icon support, fullWidth |
| Select           | —               | ✅ xs–xl    | ✅       | Radix compound |
| Separator        | —               | ✅ thin–thick | —      | horizontal/vertical, thickness + color tokens |
| Skeleton         | ✅ 7 presets    | —           | ✅       | Animated pulse, presets: text/heading/avatar/button/card/badge |
| Slider           | —               | ✅ sm–lg    | —        | Radix, range, steps, disabled |
| Spoiler          | —               | —           | —        | Expandable text, maxHeight, show/hide labels |
| Stack            | —               | —           | —        | Flex layout primitive, row/col, gap, align |
| Stepper          | ✅ h/v          | ✅ xs–xl    | —        | Horizontal/vertical, completed state, aria-current |
| Switch           | —               | ✅ xs–xl    | —        | Radix, optional label, labelPlacement start/end |
| Table            | —               | —           | —        | Data-driven + children mode (TanStack Table) |
| TagsInput        | —               | ✅ xs–xl    | ✅       | Free-form tags, Enter/comma to add, max, disabled |
| Tabs             | ✅ 3            | ✅ sm–lg    | —        | Radix, default/underline/pills |
| Text             | ✅ sizes        | ✅ xs–5xl   | —        | weights, colors, alignment |
| Textarea         | —               | ✅ xs–xl    | ✅       | Standalone, autoResize, label/help/error |
| Timeline         | —               | —           | —        | Vertical activity feed, TimelineItem with icon/title/desc/time |
| Toast            | —               | —           | —        | Sonner-based |
| Toggle           | ✅ 2            | ✅ sm–lg    | ✅       | Radix + ToggleGroup (single/multiple), radius via context |
| Toolbar          | —               | —           | —        | Radix: Button/ToggleGroup/ToggleItem/Separator/Link |
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
- **380 tests, all green** across 60 test files
- Unit: Vitest + jsdom + @testing-library/react
- Browser: Storybook + Playwright/Chromium via @storybook/addon-vitest
- `src/test/setup.ts` polyfills pointer capture, scrollIntoView, ResizeObserver for Radix in jsdom
- Every component has at least basic tests; richer components (Card, Badge, Table) have 8–14 tests

## Component roadmap

Matrix comparison against **Radix UI Primitives** (33 primitives) and **Mantine Core** (107 components) identified the following gaps. Grouped by priority.

### ✅ Tier A — Shipped
| Component | Notes |
|-----------|-------|
| **Alert** | 5 variants, icon, dismissible, sizes |
| **Drawer** | 4 sides, 5 sizes, Radix Dialog base |
| **Loader** | Animated SVG spinner, 5 sizes, 6 colors |
| **NumberInput** | +/– stepper, min/max/step, keyboard |
| **Heading** | h1–h6, token scale (extends Text) |
| **Textarea** | Standalone, autoResize, label/help/error |

### ✅ Tier B — Shipped
| Component | Notes |
|-----------|-------|
| **Stepper** | Horizontal/vertical, completed state, aria-current |
| **Kbd** | Keyboard shortcut display, 4 sizes, 3 variants |
| **Code** | Inline + block, language label, copy button |
| **Indicator** | Notification dot/count badge, 4 positions, overflow |
| **SegmentedControl** | Radio-pill-group, icon support, fullWidth |
| **Chip** | Toggleable tag, role=checkbox, aria-checked |
| **MultiSelect** | Searchable dropdown with tags, maxValues, helpText |
| **AspectRatio** | Radix wrapper, responsive ratio container |
| **Fieldset** | Native fieldset/legend, size/radius, disabled propagation |

### ✅ Tier C — Shipped

| Component | Notes |
|-----------|-------|
| **TagsInput** | Free-form tag entry (type + Enter/comma to add, X to remove), size, radius, max |
| **PinInput** | OTP/PIN per-digit boxes, auto-advance, paste, mask, error state, size, radius |
| **Rating** | Star rating, count, readOnly, size, color |
| **Timeline** | Vertical activity feed, TimelineItem with icon/title/description/time |
| **Spoiler** | Expandable/collapsible text, maxHeight, customizable labels |
| **Blockquote** | Styled blockquote, cite, size |
| **Paper** | Surface/elevation wrapper, shadow, radius, padding |
| **Anchor** | Themed `<a>`, variant, underline, external (adds target+icon) |
| **Menubar** | Horizontal app menu bar (File/Edit/View…), full Radix compound |
| **Toolbar** | Accessible grouped toolbar, Button/ToggleGroup/ToggleItem/Separator/Link |

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
- TypeScript-first, all `*Props` types exported from every component
- Consistent `size`, `variant`, `radius` props across components
- `VARIANT`, `SIZE`, `RADIUS` constants — no magic strings
- Radix accessibility primitives as base
- `cn` utility exported for consumers to compose classes
- `"use client"` directives on all components using hooks/browser APIs
- react-hook-form + Zod integration via `Form`/`useZodForm`
- Single import surface: `import { Button } from "@yetric/ui"`
- `error` prop is `string | boolean` on all field-level components (Checkbox, PinInput, Textarea, NumberInput, InputField, MultiSelect) — pass a string to show an inline error message
- `Select` trigger now accepts `error?: boolean` for validation state
- `Alert` uses `onDismiss` as primary prop (`onClose` kept as `@deprecated` alias) — consistent with Badge
- All compound components export their Props types (Accordion, Breadcrumb, Collapsible, DropdownMenu, Form, Menubar, Pagination, ScrollArea, Toolbar, Tooltip)
- ThemeProvider configurator: font pickers use Google Fonts dropdown (22 fonts, grouped by category, each rendered in its own typeface; lazy `<link>` injection on select)

**Open items / next session:**
- `asChild` beyond Button — Badge, Card, Anchor could support it for router links
- JSDoc `@example` on complex props (`multiline`, `filterType`, etc.)
- `data-variant` / `data-size` attributes as CSS Module styling hooks
- Storybook stories for Tier C components need argTypes review
- CI / Storybook deploy / visual regression (see Infrastructure table)

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
