import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { Badge } from "../badge/Badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./Table";

const meta = {
  title: "Components/Table",
  component: Table,
  tags: ["autodocs"],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

const invoices = [
  { id: "INV-001", client: "Acme Corp", amount: 12500, status: "paid" },
  { id: "INV-002", client: "Globex Inc", amount: 8300, status: "pending" },
  { id: "INV-003", client: "Initech", amount: 3750, status: "overdue" },
  { id: "INV-004", client: "Umbrella Ltd", amount: 21000, status: "paid" },
  { id: "INV-005", client: "Weyland Corp", amount: 6100, status: "pending" },
];

const statusVariant: Record<string, "success" | "warning" | "destructive"> = {
  paid: "success",
  pending: "warning",
  overdue: "destructive",
};

function InvoiceRows() {
  return (
    <>
      {invoices.map((inv) => (
        <TableRow key={inv.id}>
          <TableCell className="font-medium">{inv.id}</TableCell>
          <TableCell>{inv.client}</TableCell>
          <TableCell>
            <Badge variant={statusVariant[inv.status]} size="sm">
              {inv.status}
            </Badge>
          </TableCell>
          <TableCell className="text-right">
            {inv.amount.toLocaleString("en-US", { style: "currency", currency: "USD" })}
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}

function InvoiceHeaders() {
  return (
    <TableRow>
      <TableHead>Invoice</TableHead>
      <TableHead>Client</TableHead>
      <TableHead>Status</TableHead>
      <TableHead className="text-right">Amount</TableHead>
    </TableRow>
  );
}

export const Default: Story = {
  render: () => (
    <Table>
      <TableCaption>Invoices for Q2 2026.</TableCaption>
      <TableHeader>
        <InvoiceHeaders />
      </TableHeader>
      <TableBody>
        <InvoiceRows />
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">
            {invoices
              .reduce((s, i) => s + i.amount, 0)
              .toLocaleString("en-US", { style: "currency", currency: "USD" })}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
};

export const Density: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      {(["compact", "default", "comfortable"] as const).map((d) => (
        <div key={d}>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {d}
          </p>
          <Table density={d}>
            <TableHeader>
              <InvoiceHeaders />
            </TableHeader>
            <TableBody>
              <InvoiceRows />
            </TableBody>
          </Table>
        </div>
      ))}
    </div>
  ),
};

export const Borders: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      {(["rows", "grid", "outer", "none"] as const).map((b) => (
        <div key={b}>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {b}
          </p>
          <Table borders={b}>
            <TableHeader>
              <InvoiceHeaders />
            </TableHeader>
            <TableBody>
              <InvoiceRows />
            </TableBody>
          </Table>
        </div>
      ))}
    </div>
  ),
};

export const Striped: Story = {
  render: () => (
    <Table striped>
      <TableHeader>
        <InvoiceHeaders />
      </TableHeader>
      <TableBody>
        <InvoiceRows />
      </TableBody>
    </Table>
  ),
};

export const StripedGrid: Story = {
  render: () => (
    <Table striped borders="grid">
      <TableHeader>
        <InvoiceHeaders />
      </TableHeader>
      <TableBody>
        <InvoiceRows />
      </TableBody>
    </Table>
  ),
};

export const StickyHeader: Story = {
  render: () => (
    <div className="h-48 overflow-auto rounded-md border border-border">
      <Table stickyHeader>
        <TableHeader>
          <InvoiceHeaders />
        </TableHeader>
        <TableBody>
          {Array.from({ length: 20 }, (_, i) => ({
            id: `INV-${String(i + 1).padStart(3, "0")}`,
            client: invoices[i % invoices.length].client,
            amount: (i + 1) * 1000,
            status: invoices[i % invoices.length].status,
          })).map((inv) => (
            <TableRow key={inv.id}>
              <TableCell className="font-medium">{inv.id}</TableCell>
              <TableCell>{inv.client}</TableCell>
              <TableCell>
                <Badge variant={statusVariant[inv.status as keyof typeof statusVariant]} size="sm">
                  {inv.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                {inv.amount.toLocaleString("en-US", { style: "currency", currency: "USD" })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  ),
};

function LoadingStory() {
  const [isLoading, setIsLoading] = useState(true);
  const columns = [
    { accessorKey: "id", header: "Invoice" },
    { accessorKey: "client", header: "Client" },
    { accessorKey: "status", header: "Status" },
    { accessorKey: "amount", header: "Amount" },
  ];
  return (
    <div className="w-full min-w-[480px] space-y-4">
      <button className="text-sm underline" onClick={() => setIsLoading((v) => !v)}>
        Toggle loading ({isLoading ? "on" : "off"})
      </button>
      <Table data={invoices} columns={columns} isLoading={isLoading} loadingRows={4} />
    </div>
  );
}

export const Loading: Story = {
  name: "Loading State",
  render: () => <LoadingStory />,
};
