/**
 * Accessibility audit — runs axe-core against every component.
 * Filters out "minor" impact to focus on serious/critical/moderate violations.
 */
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { axe } from "vitest-axe";
import * as React from "react";
import { ThemeProvider } from "@/lib/theme";

async function expectNoViolations(container: HTMLElement) {
  const results = await axe(container);
  const violations = results.violations.filter((v) => v.impact !== "minor");
  if (violations.length > 0) {
    const msg = violations
      .map(
        (v) =>
          `[${v.impact}] ${v.id}: ${v.description}\n  → ${v.nodes.map((n) => n.html).join("\n  → ")}`
      )
      .join("\n");
    expect.fail(`a11y violations:\n${msg}`);
  }
}

function wrap(ui: React.ReactNode) {
  const { container } = render(<ThemeProvider>{ui}</ThemeProvider>);
  return container;
}

// ─── Imports ──────────────────────────────────────────────────────────────────
import { Button } from "@/components/button/Button";
import { Input } from "@/components/input/Input";
import { Label } from "@/components/label/Label";
import { Checkbox } from "@/components/checkbox/Checkbox";
import { Switch } from "@/components/switch/Switch";
import { Badge } from "@/components/badge/Badge";
import { Alert } from "@/components/alert/Alert";
import { Avatar } from "@/components/avatar/Avatar";
import { Separator } from "@/components/separator/Separator";
import { Slider } from "@/components/slider/Slider";
import { Textarea } from "@/components/textarea/Textarea";
import { Skeleton } from "@/components/skeleton/Skeleton";
import { Progress } from "@/components/progress/Progress";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/accordion/Accordion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/tabs/Tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/card/Card";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/breadcrumb/Breadcrumb";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/pagination/Pagination";
import { InputField } from "@/components/input-field/InputField";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/select/Select";
import { Toggle } from "@/components/toggle/Toggle";
import { Chip } from "@/components/chip/Chip";
import { Text } from "@/components/text/Text";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/tooltip/Tooltip";
import { Timeline, TimelineItem } from "@/components/timeline/Timeline";
import { Stepper } from "@/components/stepper/Stepper";

// ─── Primitives ───────────────────────────────────────────────────────────────
describe("a11y — primitives", () => {
  it("Button", async () => {
    await expectNoViolations(wrap(<Button>Click me</Button>));
  });

  it("Input with Label", async () => {
    await expectNoViolations(
      wrap(
        <div>
          <Label htmlFor="test-input">Email</Label>
          <Input id="test-input" type="email" placeholder="you@example.com" />
        </div>
      )
    );
  });

  it("Checkbox with Label", async () => {
    await expectNoViolations(
      wrap(
        <div>
          <Checkbox id="cb" />
          <Label htmlFor="cb">Accept terms</Label>
        </div>
      )
    );
  });

  it("Switch with Label", async () => {
    await expectNoViolations(
      wrap(
        <div>
          <Label htmlFor="sw">Notifications</Label>
          <Switch id="sw" />
        </div>
      )
    );
  });

  it("Badge", async () => {
    await expectNoViolations(wrap(<Badge>New</Badge>));
  });

  it("Alert", async () => {
    await expectNoViolations(wrap(<Alert title="Heads up">Something happened.</Alert>));
  });

  it("Avatar with fallback", async () => {
    await expectNoViolations(wrap(<Avatar fallback="AB" alt="Test user" />));
  });

  it("Separator", async () => {
    await expectNoViolations(wrap(<Separator />));
  });

  it("Slider with Label", async () => {
    await expectNoViolations(
      wrap(<Slider aria-label="Volume" defaultValue={[50]} min={0} max={100} />)
    );
  });

  it("Textarea with Label", async () => {
    await expectNoViolations(
      wrap(
        <div>
          <Label htmlFor="ta">Message</Label>
          <Textarea id="ta" placeholder="Type here..." />
        </div>
      )
    );
  });

  it("Skeleton", async () => {
    await expectNoViolations(wrap(<Skeleton className="h-4 w-32" />));
  });

  it("Progress", async () => {
    await expectNoViolations(wrap(<Progress value={60} aria-label="Loading progress" />));
  });
});

// ─── Composite ────────────────────────────────────────────────────────────────
describe("a11y — composite components", () => {
  it("Accordion", async () => {
    await expectNoViolations(
      wrap(
        <Accordion type="single" collapsible>
          <AccordionItem value="a">
            <AccordionTrigger>Section A</AccordionTrigger>
            <AccordionContent>Content A</AccordionContent>
          </AccordionItem>
        </Accordion>
      )
    );
  });

  it("Tabs", async () => {
    await expectNoViolations(
      wrap(
        <Tabs defaultValue="a">
          <TabsList>
            <TabsTrigger value="a">Tab A</TabsTrigger>
            <TabsTrigger value="b">Tab B</TabsTrigger>
          </TabsList>
          <TabsContent value="a">Content A</TabsContent>
          <TabsContent value="b">Content B</TabsContent>
        </Tabs>
      )
    );
  });

  it("Card", async () => {
    await expectNoViolations(
      wrap(
        <Card>
          <CardHeader>
            <CardTitle>Title</CardTitle>
          </CardHeader>
          <CardContent>Body text</CardContent>
        </Card>
      )
    );
  });

  it("Breadcrumb", async () => {
    await expectNoViolations(
      wrap(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Current</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )
    );
  });

  it("Pagination", async () => {
    await expectNoViolations(
      wrap(
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )
    );
  });

  it("InputField", async () => {
    await expectNoViolations(
      wrap(<InputField label="Full name" id="fullname" placeholder="John Doe" />)
    );
  });

  it("Select", async () => {
    await expectNoViolations(
      wrap(
        <Select>
          <SelectTrigger aria-label="Fruit">
            <SelectValue placeholder="Pick a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
          </SelectContent>
        </Select>
      )
    );
  });

  it("Toggle", async () => {
    await expectNoViolations(wrap(<Toggle aria-label="Bold">B</Toggle>));
  });

  it("Chip", async () => {
    await expectNoViolations(wrap(<Chip>React</Chip>));
  });

  it("Text", async () => {
    await expectNoViolations(wrap(<Text as="p">Hello world</Text>));
  });

  it("Tooltip", async () => {
    await expectNoViolations(
      wrap(
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button>Hover me</Button>
            </TooltipTrigger>
            <TooltipContent>More info</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    );
  });

  it("Timeline", async () => {
    await expectNoViolations(
      wrap(
        <Timeline>
          <TimelineItem title="Event A" description="First thing happened" />
          <TimelineItem title="Event B" description="Second thing happened" />
        </Timeline>
      )
    );
  });

  it("Stepper", async () => {
    await expectNoViolations(
      wrap(
        <Stepper
          activeStep={1}
          steps={[{ title: "Step 1" }, { title: "Step 2" }, { title: "Step 3" }]}
        />
      )
    );
  });
});
