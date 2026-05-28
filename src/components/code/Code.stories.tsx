import type { Meta, StoryObj } from "@storybook/react-vite";
import { Code } from "./Code";

const meta = { component: Code } satisfies Meta<typeof Code>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Inline: Story = {
  render: () => (
    <p className="text-sm">
      Use the <Code>useState</Code> hook to manage local state, or{" "}
      <Code>useReducer</Code> for more complex state logic.
    </p>
  ),
};

export const Block: Story = {
  render: () => (
    <Code block language="TypeScript" copyable>{`import { Button } from "@yetric/ui";

export function App() {
  return <Button variant="primary">Click me</Button>;
}`}</Code>
  ),
};

export const BlockNoBars: Story = {
  name: "Block — no header",
  render: () => (
    <Code block>{`const greet = (name: string) => \`Hello, \${name}!\`;`}</Code>
  ),
};
