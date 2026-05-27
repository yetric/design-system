import type { Meta, StoryObj } from "@storybook/react-vite";

import { Badge } from "../badge/Badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from "./Table";

const meta = {
  title: "Components/Table",
  component: Table
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

const invoices = [
  { id: "INV-001", client: "Acme Corp",     amount: 12500, status: "paid"    },
  { id: "INV-002", client: "Globex Inc",    amount:  8300, status: "pending" },
  { id: "INV-003", client: "Initech",       amount:  3750, status: "overdue" },
  { id: "INV-004", client: "Umbrella Ltd",  amount: 21000, status: "paid"    },
  { id: "INV-005", client: "Weyland Corp",  amount:  6100, status: "pending" }
];

const statusVariant = {
  paid:    "success",
  pending: "warning",
  overdue: "destructive"
} as const;

export const Default: Story = {
  render: () => (
    <Table>
      <TableCaption>Invoices for Q2 2026.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Client</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
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
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">
            {invoices
              .reduce((sum, i) => sum + i.amount, 0)
              .toLocaleString("en-US", { style: "currency", currency: "USD" })}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
};
