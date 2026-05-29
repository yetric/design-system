import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Search, SlidersHorizontal, X } from "lucide-react";

import { Badge } from "../components/badge/Badge";
import { Box } from "../components/box/Box";
import { Button } from "../components/button/Button";
import { Chip } from "../components/chip/Chip";
import { Input } from "../components/input/Input";
import { Separator } from "../components/separator/Separator";
import { Stack } from "../components/stack/Stack";
import { Text } from "../components/text/Text";

const meta = {
  title: "Patterns/Active Filter Bar",
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const STATUS_OPTIONS = ["Active", "Inactive", "Pending", "Archived"];
const ROLE_OPTIONS = ["Admin", "Editor", "Viewer"];
const COUNTRY_OPTIONS = ["Germany", "USA", "France", "Japan", "Brazil"];

const searchIconStyle = { width: 16, height: 16, color: "hsl(var(--muted-foreground))" };
const smallIconStyle = { width: 14, height: 14, color: "hsl(var(--muted-foreground))" };

function FilterSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Stack gap={2}>
      <Text
        as="span"
        size="caption"
        weight="medium"
        color="muted"
        style={{ textTransform: "uppercase", letterSpacing: "0.08em" }}
      >
        {label}
      </Text>
      {children}
    </Stack>
  );
}

function FilterBarStory() {
  const [search, setSearch] = useState("");
  const [statuses, setStatuses] = useState<string[]>(["Active"]);
  const [roles, setRoles] = useState<string[]>([]);
  const [countries, setCountries] = useState<string[]>(["Germany", "USA"]);

  const toggleStatus = (v: string) => setStatuses((s) => s.includes(v) ? s.filter((x) => x !== v) : [...s, v]);
  const toggleRole = (v: string) => setRoles((s) => s.includes(v) ? s.filter((x) => x !== v) : [...s, v]);
  const toggleCountry = (v: string) => setCountries((s) => s.includes(v) ? s.filter((x) => x !== v) : [...s, v]);

  const activeFilters: { label: string; onRemove: () => void }[] = [
    ...statuses.map((v) => ({ label: `Status: ${v}`, onRemove: () => toggleStatus(v) })),
    ...roles.map((v) => ({ label: `Role: ${v}`, onRemove: () => toggleRole(v) })),
    ...countries.map((v) => ({ label: `Country: ${v}`, onRemove: () => toggleCountry(v) })),
  ];

  const clearAll = () => {
    setStatuses([]);
    setRoles([]);
    setCountries([]);
    setSearch("");
  };

  return (
    <Box style={{ width: "100%", maxWidth: 640 }}>
      <Stack gap={4}>
        <Stack direction="row" align="center" gap={2}>
          <Box style={{ width: 224 }}>
            <Input
              placeholder="Search…"
              leftIcon={<Search style={searchIconStyle} />}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              rightIcon={search ? <X style={{ ...searchIconStyle, cursor: "pointer" }} onClick={() => setSearch("")} /> : undefined}
            />
          </Box>
          <Separator orientation="vertical" style={{ height: 28 }} />
          <Stack direction="row" align="center" gap={1}>
            <SlidersHorizontal style={smallIconStyle} />
            <Text as="span" size="caption" color="muted">Filters</Text>
          </Stack>
        </Stack>

        <FilterSection label="Status">
          <Stack direction="row" wrap="wrap" gap={2}>
            {STATUS_OPTIONS.map((v) => (
              <Chip key={v} size="sm" checked={statuses.includes(v)} onChange={() => toggleStatus(v)} showCheck>
                {v}
              </Chip>
            ))}
          </Stack>
        </FilterSection>

        <FilterSection label="Role">
          <Stack direction="row" wrap="wrap" gap={2}>
            {ROLE_OPTIONS.map((v) => (
              <Chip key={v} size="sm" checked={roles.includes(v)} onChange={() => toggleRole(v)} showCheck>
                {v}
              </Chip>
            ))}
          </Stack>
        </FilterSection>

        <FilterSection label="Country">
          <Stack direction="row" wrap="wrap" gap={2}>
            {COUNTRY_OPTIONS.map((v) => (
              <Chip key={v} size="sm" checked={countries.includes(v)} onChange={() => toggleCountry(v)} showCheck>
                {v}
              </Chip>
            ))}
          </Stack>
        </FilterSection>

        <Separator />

        <Stack direction="row" wrap="wrap" align="center" gap={2} style={{ minHeight: 32 }}>
          {activeFilters.length === 0 ? (
            <Text as="span" size="caption" color="muted">No filters applied.</Text>
          ) : (
            <>
              <Text as="span" size="caption" color="muted">Active:</Text>
              {activeFilters.map(({ label, onRemove }) => (
                <Badge key={label} variant="secondary" size="sm">
                  <Stack as="span" direction="row" align="center" gap={1}>
                    <Text as="span" size="caption">{label}</Text>
                    <button
                      onClick={onRemove}
                      aria-label={`Remove ${label}`}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginLeft: "0.125rem",
                        padding: "0.125rem",
                        borderRadius: 9999,
                      }}
                    >
                      <X style={{ width: 10, height: 10 }} />
                    </button>
                  </Stack>
                </Badge>
              ))}
              <Button size="xs" variant="ghost" onClick={clearAll}>Clear all</Button>
            </>
          )}
        </Stack>
      </Stack>
    </Box>
  );
}

export const Default: Story = {
  render: () => <FilterBarStory />,
};
