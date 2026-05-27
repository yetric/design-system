# Where we are

## Components shipped

| Component    | Variants | Sizes | Radius | Notes |
|--------------|----------|-------|--------|-------|
| Button       | ✅ 8     | ✅ xs–xl | ✅ | asChild, disabled via data-attr |
| Badge        | ✅ 8     | ✅ xs–xl | ✅ full default | |
| Card         | —        | —     | ✅ | |
| Dialog       | —        | —     | ✅ | Radix |
| Input        | —        | —     | —  | Primitive, use InputField for forms |
| InputField   | —        | ✅ xs–xl | ✅ | Merged textarea (multiline prop), helpText, error, useId |
| Label        | —        | —     | —  | Radix, required indicator |
| Checkbox     | —        | ✅ xs–xl | — | Radix, indeterminate state |
| Select       | —        | ✅ xs–xl | — | Radix compound: Trigger/Content/Item/Label/Separator/Group |
| Separator    | —        | —     | —  | horizontal/vertical, decorative/semantic |
| Table        | —        | —     | —  | See below |

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

## Polish / smaller items
- **Storybook Docs tab** — `tags: ["autodocs"]` is set globally, check it renders well for all new components
