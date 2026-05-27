# yetric-ui

Shared React UI foundation for Yetric applications.

The goal of this repository is to provide a small, reliable, accessible, and reusable component library for React apps. It should make common UI faster to build without turning into a heavy design-system project too early.

## Package name

```txt
@yetric/ui
```

## Purpose

`yetric-ui` exists to:

- reduce duplicated UI work across apps
- keep common components visually consistent
- provide accessible primitives for common interaction patterns
- make new apps faster to start
- keep low-level UI separate from business logic
- create a stable foundation for future UI packages

This library should stay practical. It is not meant to become a process-heavy design system before there is a real need for that.

## Tech stack

The intended foundation is:

```txt
React
TypeScript
Radix UI primitives
Tailwind CSS
class-variance-authority
tailwind-merge
Storybook
Vitest
React Testing Library
tsup or Vite library mode
```

## Design approach

The library should use proven accessible primitives for behavior-heavy components and focus our own work on visual design, API consistency, composition, and documentation.

Build ourselves:

```txt
component APIs
styling conventions
variants
design tokens
layout primitives
documentation
business-friendly usage examples
```

Avoid rebuilding from scratch:

```txt
focus trapping
keyboard navigation
ARIA behavior
popover positioning
menu behavior
dialog behavior
combobox behavior
screen reader edge cases
```

## Component principles

- Keep core components domain-free.
- Prefer composition over large configuration objects.
- Use accessible primitives for complex behavior.
- Keep APIs boring and predictable.
- Use TypeScript types as part of the component contract.
- Use Storybook to document real usage.
- Add at least basic tests for every reusable component.
- Do not put app-specific business logic in `@yetric/ui`.
- Business components should live in a separate package or app layer.

## Suggested package structure

```txt
packages/
  ui/
    src/
      components/
        button/
          Button.tsx
          Button.test.tsx
          Button.stories.tsx
          index.ts
        card/
          Card.tsx
          Card.stories.tsx
          index.ts
        dialog/
          Dialog.tsx
          Dialog.stories.tsx
          index.ts
      lib/
        cn.ts
      styles/
        globals.css
      index.ts
    package.json
    tsconfig.json
    tailwind.config.ts
    tsup.config.ts
```

If this repository starts as a single-package repo instead of a monorepo, the same structure can live directly under `src/`.

## Initial components

The first version should validate the foundation with a small set of components:

```txt
Button
Card
Dialog
```

These are enough to prove:

- styling conventions
- variants
- composition
- Radix wrapping
- exports
- Storybook setup
- testing setup
- package build

## Example usage

```tsx
import { Button, Card, CardContent, CardHeader, CardTitle } from "@yetric/ui";

export function Example() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>Get started</Button>
      </CardContent>
    </Card>
  );
}
```

## Styling utility

The library should include a small `cn` helper for combining conditional classes and resolving Tailwind conflicts.

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

## Component variants

Use `class-variance-authority` for variant-heavy components.

Example:

```tsx
<Button variant="primary" size="md">
  Save
</Button>

<Button variant="secondary" size="sm">
  Cancel
</Button>

<Button variant="danger">
  Delete
</Button>
```

## Scripts

Suggested scripts:

```json
{
  "scripts": {
    "build": "tsup src/index.ts --format esm --dts",
    "dev": "tsup src/index.ts --format esm --dts --watch",
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build",
    "test": "vitest",
    "test:run": "vitest run",
    "typecheck": "tsc --noEmit"
  }
}
```

Adjust scripts to match the final repository setup.

## Development

Install dependencies:

```bash
npm install
```

Run Storybook:

```bash
npm run storybook
```

Run tests:

```bash
npm run test
```

Build the library:

```bash
npm run build
```

Run type checking:

```bash
npm run typecheck
```

## Public exports

All public components should be exported from `src/index.ts`.

Example:

```ts
export * from "./components/button";
export * from "./components/card";
export * from "./components/dialog";
export * from "./lib/cn";
```

Consumers should not import from deep internal paths unless explicitly supported.

Preferred:

```tsx
import { Button } from "@yetric/ui";
```

Avoid:

```tsx
import { Button } from "@yetric/ui/src/components/button/Button";
```

## Adding a new component

When adding a component:

1. Create a folder under `src/components/<component-name>/`.
2. Add the component implementation.
3. Add an `index.ts` file for local exports.
4. Add Storybook stories.
5. Add basic tests.
6. Export the component from `src/index.ts`.
7. Document variants and important usage notes.

Recommended structure:

```txt
src/components/input/
  Input.tsx
  Input.test.tsx
  Input.stories.tsx
  index.ts
```

## What belongs here

Good candidates for `@yetric/ui`:

```txt
Button
Input
Textarea
Checkbox
RadioGroup
Select
Dialog
DropdownMenu
Tabs
Tooltip
Popover
Card
Badge
Alert
Table primitives
Typography helpers
Layout primitives
```

## What does not belong here

Avoid adding business-specific components to this package.

Examples that should probably live elsewhere:

```txt
AccountSelector
PaymentReceiverSelector
PayAmountField
BookingCalendar
RestaurantTableMap
PropertyValuationForm
LeadCaptureFlow
```

Those components can still use `@yetric/ui`, but they should live in app-specific packages or a separate business UI package.

Possible future package:

```txt
@yetric/ui-business
```

## Accessibility

Accessibility is a core reason for using primitives like Radix UI.

Components should support:

- keyboard navigation
- focus states
- disabled states
- accessible names and labels
- screen reader-friendly structure
- sensible default semantics

Do not remove accessibility behavior from underlying primitives unless there is a very good reason.

## Testing expectations

Each reusable component should have at least basic tests.

Minimum expectations:

- renders without crashing
- renders children/content
- supports important variants
- supports disabled state where relevant
- supports basic interaction where relevant

For behavior-heavy components, test the behavior that matters to consumers.

Example:

```txt
Dialog opens when trigger is clicked.
Dialog content is visible when open.
Button is disabled when disabled=true.
```

## Storybook expectations

Each component should have stories for:

- default state
- variants
- sizes, if applicable
- disabled/loading/error states, if applicable
- realistic usage example

Storybook should be treated as the main component documentation.

## Versioning

Use semantic versioning once the package is consumed by real applications.

```txt
patch: bug fixes and internal improvements
minor: new components or backwards-compatible additions
major: breaking API or styling contract changes
```

## Future direction

Possible future additions:

```txt
@yetric/ui-icons
@yetric/ui-theme
@yetric/ui-forms
@yetric/ui-business
internal component registry
visual regression testing
theme switching
React Hook Form adapters
application shell components
```

Do not add these until there is a real need.

## Guiding idea

Start small. Keep it useful. Avoid building a museum of abstractions.

The best version of this library is boring, predictable, accessible, and easy to use.
