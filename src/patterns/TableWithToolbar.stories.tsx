import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Plus, Search, SlidersHorizontal, Trash2 } from "lucide-react";

import { Badge } from "../components/badge/Badge";
import { Box } from "../components/box/Box";
import { Button } from "../components/button/Button";
import { Input } from "../components/input/Input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../components/pagination/Pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/select/Select";
import { Stack } from "../components/stack/Stack";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/table/Table";
import { Text } from "../components/text/Text";

const meta = {
  title: "Patterns/Table with Toolbar",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const allUsers = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Admin", status: "active" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", role: "Editor", status: "inactive" },
  { id: 3, name: "Carol Williams", email: "carol@example.com", role: "Viewer", status: "active" },
  { id: 4, name: "David Brown", email: "david@example.com", role: "Editor", status: "active" },
  { id: 5, name: "Eva Martinez", email: "eva@example.com", role: "Admin", status: "pending" },
  { id: 6, name: "Frank Lee", email: "frank@example.com", role: "Viewer", status: "active" },
  { id: 7, name: "Grace Kim", email: "grace@example.com", role: "Editor", status: "inactive" },
  { id: 8, name: "Henry Davis", email: "henry@example.com", role: "Viewer", status: "active" },
];

const statusVariant = {
  active: "success",
  inactive: "secondary",
  pending: "warning",
} as const;

const iconStyle = { width: 16, height: 16, color: "hsl(var(--muted-foreground))" };
const smallIconStyle = { width: 14, height: 14 };

function UsersTableStory() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const filtered = allUsers.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === "all" || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <Box style={{ width: "100%", minWidth: 640 }}>
      <Stack gap={4}>
        <Stack direction="row" align="center" gap={2}>
          <Box style={{ width: 256 }}>
            <Input
              placeholder="Search users…"
              leftIcon={<Search style={iconStyle} />}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </Box>
          <Box style={{ width: 144 }}>
            <Select
              value={roleFilter}
              onValueChange={(v) => {
                setRoleFilter(v);
                setPage(1);
              }}
            >
              <SelectTrigger>
                <SlidersHorizontal style={{ ...iconStyle, marginRight: 4 }} />
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All roles</SelectItem>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="Editor">Editor</SelectItem>
                <SelectItem value="Viewer">Viewer</SelectItem>
              </SelectContent>
            </Select>
          </Box>
          <Box style={{ marginLeft: "auto" }}>
            <Stack direction="row" gap={2}>
              <Button variant="destructive" size="sm" leftIcon={<Trash2 style={smallIconStyle} />}>Delete</Button>
              <Button size="sm" leftIcon={<Plus style={smallIconStyle} />}>Add user</Button>
            </Stack>
          </Box>
        </Stack>

        <Table borders="rows">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4}>
                  <Text as="div" size="body-sm" color="muted" style={{ textAlign: "center", padding: "2rem 0" }}>
                    No users match your search.
                  </Text>
                </TableCell>
              </TableRow>
            ) : (
              paginated.map((user) => (
                <TableRow key={user.id}>
                  <TableCell><Text as="span" size="body-sm" weight="medium">{user.name}</Text></TableCell>
                  <TableCell><Text as="span" size="body-sm" color="muted">{user.email}</Text></TableCell>
                  <TableCell><Text as="span" size="body-sm">{user.role}</Text></TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[user.status as keyof typeof statusVariant]} size="sm">
                      {user.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <Stack direction="row" align="center" justify="between">
          <Text as="span" size="caption" color="muted">
            Showing {Math.min((page - 1) * pageSize + 1, filtered.length)}–{Math.min(page * pageSize, filtered.length)} of {filtered.length}
          </Text>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" aria-disabled={page === 1} onClick={(e) => { e.preventDefault(); setPage((p) => Math.max(1, p - 1)); }} />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) =>
                p === 1 || p === totalPages || Math.abs(p - page) <= 1 ? (
                  <PaginationItem key={p}>
                    <PaginationLink href="#" isActive={p === page} onClick={(e) => { e.preventDefault(); setPage(p); }}>{p}</PaginationLink>
                  </PaginationItem>
                ) : Math.abs(p - page) === 2 ? (
                  <PaginationItem key={`ellipsis-${p}`}><PaginationEllipsis /></PaginationItem>
                ) : null
              )}
              <PaginationItem>
                <PaginationNext href="#" aria-disabled={page === totalPages} onClick={(e) => { e.preventDefault(); setPage((p) => Math.min(totalPages, p + 1)); }} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </Stack>
      </Stack>
    </Box>
  );
}

export const Default: Story = {
  render: () => <UsersTableStory />,
};
