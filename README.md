# @yetric/ui

A practical React component library for modern and AI-native applications.

87 accessible, composable components — from everyday form elements to streaming chat UI, data grids, rich text editors, and maps. Provider-agnostic by design.

## Install

```bash
npm install @yetric/ui
```

## Quick start

```tsx
import { Button, Card, CardContent, CardHeader, CardTitle } from "@yetric/ui";
import "@yetric/ui/styles";

export function Example() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hello</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>Get started</Button>
      </CardContent>
    </Card>
  );
}
```

## AI components

```tsx
import { AIChat, useChat } from "@yetric/ui";

export function Assistant() {
  const { messages, send, isLoading } = useChat({
    onRequest: async (messages) => streamFromYourBackend(messages),
  });

  return <AIChat messages={messages} isLoading={isLoading} onSend={send} />;
}
```

## Documentation

**[Full docs →](https://your-docs-domain.com)**

Includes installation guides for Next.js and Vite, theming reference, dark mode setup, and AI component integration guides for OpenAI, Anthropic, and the Vercel AI SDK.

## Storybook

**[Component reference →](https://yetric.github.io/design-system)**

Live examples, prop tables, and interactive controls for all 87 components.

## Development

```bash
npm install
npm run storybook   # component development
npm run test        # unit tests
npm run typecheck   # TypeScript check
npm run build       # build the library
```

## Contributing

See [CONTRIBUTING.md](docs/src/content/docs/contributing/guide.mdx) or the [contributing guide](https://your-docs-domain.com/contributing/guide/) in the docs.

## License

MIT
