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

## Polish / smaller items
- **Storybook Docs tab** — `tags: ["autodocs"]` is set globally, check it renders well for all new components
