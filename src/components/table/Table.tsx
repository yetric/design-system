"use client";

import * as React from "react";
import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import {
  type Column,
  type ColumnDef,
  type ColumnFiltersState,
  type FilterFn,
  type Header,
  type RowData,
  type RowSelectionState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { cn } from "../../lib/cn";
import { Button } from "../button/Button";
import { Checkbox } from "../checkbox/Checkbox";
import { Input } from "../input/Input";
import { Skeleton } from "../skeleton/Skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../select/Select";

// ─── Module augmentation ────────────────────────────────────────────────────

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    filterType?: "text" | "number" | "select" | "date";
    filterOptions?: string[];
  }
  interface FilterFns {
    dateRange: FilterFn<unknown>;
  }
}

const dateRangeFilter: FilterFn<unknown> = (row, columnId, value: [string, string]) => {
  const cell = row.getValue<string>(columnId);
  const [from, to] = value ?? ["", ""];
  if (from && cell < from) return false;
  if (to && cell > to) return false;
  return true;
};
dateRangeFilter.autoRemove = (val: [string, string]) => !val || (!val[0] && !val[1]);

// ─── Types ──────────────────────────────────────────────────────────────────

export type TableDensity = "compact" | "default" | "comfortable";
export type TableBorders = "rows" | "grid" | "outer" | "none";

export { type ColumnDef };

// Shared visual props (both modes)
type TableVisualProps = {
  density?: TableDensity;
  borders?: TableBorders;
  striped?: boolean;
  stickyHeader?: boolean;
  className?: string;
};

// Data-driven mode — renders full table with toolbar, sorting, filtering, pagination
type TableDataModeProps<TData> = TableVisualProps & {
  data: TData[];
  columns: ColumnDef<TData>[];
  searchable?: boolean;
  selectable?: boolean;
  pageSize?: number;
  isLoading?: boolean;
  /** Number of skeleton rows to show while loading. Defaults to 5. */
  loadingRows?: number;
  children?: never;
};

// Children mode — renders a semantic <table> with context, children as rows/cells
type TableChildrenModeProps = TableVisualProps & {
  data?: never;
  columns?: never;
  children?: React.ReactNode;
} & Omit<React.HTMLAttributes<HTMLTableElement>, "data" | "className" | "children">;

export type TableProps<TData = unknown> = TableDataModeProps<TData> | TableChildrenModeProps;

// ─── Context ────────────────────────────────────────────────────────────────

interface TableContextValue {
  density: TableDensity;
  borders: TableBorders;
  striped: boolean;
  stickyHeader: boolean;
}

const TableContext = createContext<TableContextValue>({
  density: "default",
  borders: "rows",
  striped: false,
  stickyHeader: false,
});

const useTableContext = () => useContext(TableContext);

// ─── Density maps ───────────────────────────────────────────────────────────

const cellPadding: Record<TableDensity, string> = {
  compact: "px-3 py-1.5",
  default: "px-4 py-3",
  comfortable: "px-4 py-5",
};

const headPadding: Record<TableDensity, string> = {
  compact: "h-9 px-3",
  default: "h-11 px-4",
  comfortable: "h-14 px-4",
};

// ─── Primitive sub-components ────────────────────────────────────────────────

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => {
  const { stickyHeader, borders } = useTableContext();
  return (
    <thead
      ref={ref}
      className={cn(
        borders !== "none" && "[&_tr]:border-b",
        stickyHeader && "bg-card sticky top-0 z-10",
        className
      )}
      {...props}
    />
  );
});
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody ref={ref} className={cn("[&_tr:last-child]:border-0", className)} {...props} />
));
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn("bg-muted/50 border-t font-medium [&>tr]:last:border-b-0", className)}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => {
    const { borders, striped } = useTableContext();
    return (
      <tr
        ref={ref}
        className={cn(
          "transition-colors",
          (borders === "rows" || borders === "grid") && "border-b",
          "hover:bg-muted/50",
          striped && "even:bg-muted/30",
          "data-[selected]:!bg-muted",
          className
        )}
        {...props}
      />
    );
  }
);
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => {
  const { density, borders } = useTableContext();
  return (
    <th
      ref={ref}
      className={cn(
        "text-muted-foreground text-left align-middle text-xs font-medium",
        "[&:has([role=checkbox])]:w-12 [&:has([role=checkbox])]:pr-0",
        headPadding[density],
        borders === "grid" && "border-r last:border-r-0",
        className
      )}
      {...props}
    />
  );
});
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => {
  const { density, borders } = useTableContext();
  return (
    <td
      ref={ref}
      className={cn(
        "align-middle [&:has([role=checkbox])]:w-12 [&:has([role=checkbox])]:pr-0",
        cellPadding[density],
        borders === "grid" && "border-r last:border-r-0",
        className
      )}
      {...props}
    />
  );
});
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption ref={ref} className={cn("text-muted-foreground mt-4 text-sm", className)} {...props} />
));
TableCaption.displayName = "TableCaption";

// ─── Data-mode internals ─────────────────────────────────────────────────────

function SortIcon({ sorted }: { sorted: false | "asc" | "desc" }) {
  return (
    <svg
      className={cn("ml-1.5 h-3.5 w-3.5 shrink-0", sorted ? "opacity-80" : "opacity-30")}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {sorted === "asc" ? (
        <path d="M4 10l4-4 4 4" />
      ) : sorted === "desc" ? (
        <path d="M4 6l4 4 4-4" />
      ) : (
        <>
          <path d="M4 6l4-3 4 3" />
          <path d="M4 10l4 3 4-3" />
        </>
      )}
    </svg>
  );
}

function ColumnFilter<TData>({ column }: { column: Column<TData> }) {
  const filterType = column.columnDef.meta?.filterType;
  if (!filterType) return null;

  const filterValue = column.getFilterValue();

  if (filterType === "text") {
    return (
      <Input
        value={(filterValue as string) ?? ""}
        onChange={(e) => column.setFilterValue(e.target.value || undefined)}
        placeholder="Filter…"
        className="h-7 text-xs"
      />
    );
  }

  if (filterType === "number") {
    const [min, max] = (filterValue as [number?, number?]) ?? [];
    return (
      <div className="flex gap-1">
        <Input
          type="number"
          value={min === undefined ? "" : String(min)}
          onChange={(e) => {
            const v = e.target.value === "" ? undefined : Number(e.target.value);
            column.setFilterValue((prev: [number?, number?]) => [v, prev?.[1]]);
          }}
          placeholder="Min"
          className="h-7 w-16 text-xs"
        />
        <Input
          type="number"
          value={max === undefined ? "" : String(max)}
          onChange={(e) => {
            const v = e.target.value === "" ? undefined : Number(e.target.value);
            column.setFilterValue((prev: [number?, number?]) => [prev?.[0], v]);
          }}
          placeholder="Max"
          className="h-7 w-16 text-xs"
        />
      </div>
    );
  }

  if (filterType === "select") {
    const options = column.columnDef.meta?.filterOptions ?? [];
    const selected = (filterValue as string) ?? "__all__";
    return (
      <Select
        value={selected}
        onValueChange={(v) => column.setFilterValue(v === "__all__" ? undefined : v)}
      >
        <SelectTrigger size="sm" className="h-7 text-xs">
          <SelectValue placeholder="All" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="__all__">All</SelectItem>
          {options.map((opt) => (
            <SelectItem key={opt} value={opt}>
              {opt}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }

  if (filterType === "date") {
    const [from = "", to = ""] = (filterValue as [string, string]) ?? [];
    return (
      <div className="flex flex-col gap-1">
        <Input
          type="date"
          value={from}
          onChange={(e) =>
            column.setFilterValue((prev: [string, string]) => [e.target.value, prev?.[1] ?? ""])
          }
          className="h-7 text-xs"
        />
        <Input
          type="date"
          value={to}
          onChange={(e) =>
            column.setFilterValue((prev: [string, string]) => [prev?.[0] ?? "", e.target.value])
          }
          className="h-7 text-xs"
        />
      </div>
    );
  }

  return null;
}

function DataMode<TData>({
  data,
  columns,
  searchable = false,
  selectable = false,
  pageSize,
  isLoading = false,
  loadingRows = 5,
  density = "default",
  borders = "rows",
  striped = false,
  stickyHeader = false,
  className,
}: TableDataModeProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [colMenuOpen, setColMenuOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const colMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!colMenuOpen) return;
    const handler = (e: MouseEvent) => {
      if (colMenuRef.current && !colMenuRef.current.contains(e.target as Node)) {
        setColMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [colMenuOpen]);

  const hasFilterableColumns = useMemo(
    () => columns.some((col) => col.meta?.filterType),
    [columns]
  );

  const allColumns = useMemo<ColumnDef<TData>[]>(() => {
    if (!selectable) return columns;
    const selectCol: ColumnDef<TData> = {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          size="sm"
          checked={
            table.getIsAllPageRowsSelected()
              ? true
              : table.getIsSomePageRowsSelected()
                ? "indeterminate"
                : false
          }
          onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          size="sm"
          checked={row.getIsSelected()}
          onCheckedChange={(v) => row.toggleSelected(!!v)}
          aria-label="Select row"
          disabled={!row.getCanSelect()}
        />
      ),
      enableSorting: false,
      enableHiding: false,
    };
    return [selectCol, ...columns];
  }, [columns, selectable]);

  const processedColumns = useMemo<ColumnDef<TData>[]>(() => {
    return allColumns.map((col) => {
      const ft = col.meta?.filterType;
      if (!ft) return col;
      return {
        ...col,
        filterFn:
          ft === "date"
            ? ("dateRange" as const)
            : ft === "number"
              ? ("inNumberRange" as const)
              : ft === "select"
                ? ("equals" as const)
                : ("includesString" as const),
      };
    });
  }, [allColumns]);

  const table = useReactTable({
    data,
    columns: processedColumns,
    filterFns: { dateRange: dateRangeFilter },
    state: { sorting, columnFilters, globalFilter, columnVisibility, rowSelection },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: pageSize ?? 999999 } },
    enableRowSelection: selectable,
    autoResetPageIndex: true,
  });

  const selectedCount = Object.keys(rowSelection).length;
  const hideable = table.getAllLeafColumns().filter((col) => col.getCanHide());
  const activeFilterCount = columnFilters.length;
  const leafHeaders = table.getHeaderGroups().slice(-1)[0]?.headers ?? [];

  return (
    <div className={cn("space-y-3", className)}>
      {/* Toolbar */}
      <div className="flex items-center gap-2">
        {searchable && (
          <Input
            placeholder="Search…"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="h-8 max-w-xs text-sm"
          />
        )}
        {selectedCount > 0 && (
          <span className="text-muted-foreground text-sm">{selectedCount} selected</span>
        )}
        <div className="ml-auto flex items-center gap-2">
          {hasFilterableColumns && (
            <>
              <Button
                variant={showFilters ? "secondary" : "outline"}
                size="sm"
                onClick={() => setShowFilters((v) => !v)}
              >
                Filters{activeFilterCount > 0 && ` (${activeFilterCount})`}
              </Button>
              {activeFilterCount > 0 && (
                <Button variant="ghost" size="sm" onClick={() => setColumnFilters([])}>
                  Clear
                </Button>
              )}
            </>
          )}
          <div className="relative" ref={colMenuRef}>
            <Button variant="outline" size="sm" onClick={() => setColMenuOpen((v) => !v)}>
              Columns
              <svg
                className="ml-1.5 h-3.5 w-3.5 opacity-60"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 6l4 4 4-4" />
              </svg>
            </Button>
            {colMenuOpen && (
              <div className="border-border bg-card absolute top-full right-0 z-[var(--z-dropdown)] mt-1 min-w-[160px] rounded-md border p-1 shadow-md">
                {hideable.map((col) => (
                  <label
                    key={col.id}
                    className="hover:bg-accent flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm"
                  >
                    <Checkbox
                      size="sm"
                      checked={col.getIsVisible()}
                      onCheckedChange={(v) => col.toggleVisibility(!!v)}
                    />
                    <span className="capitalize">{col.id}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div
        className={cn(
          "rounded-md",
          borders !== "none" && "border-border border",
          stickyHeader && "overflow-auto"
        )}
      >
        <TableContext.Provider value={{ density, borders, striped, stickyHeader }}>
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <TableHeader>
                {table.getHeaderGroups().map((hg) => (
                  <TableRow key={hg.id} className="hover:bg-transparent">
                    {hg.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder ? null : header.column.getCanSort() ? (
                          <button
                            className="hover:text-foreground flex items-center transition-colors"
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            <SortIcon sorted={header.column.getIsSorted()} />
                          </button>
                        ) : (
                          flexRender(header.column.columnDef.header, header.getContext())
                        )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
                {showFilters && (
                  <TableRow className="hover:bg-transparent">
                    {leafHeaders.map((header: Header<TData, unknown>) => (
                      <TableHead key={header.id} className="py-2">
                        <ColumnFilter column={header.column} />
                      </TableHead>
                    ))}
                  </TableRow>
                )}
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  Array.from({ length: loadingRows }).map((_, i) => (
                    <TableRow key={`skeleton-${i}`}>
                      {processedColumns.map((_, j) => (
                        <TableCell key={j}>
                          <Skeleton className="h-4 w-full" />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : table.getRowModel().rows.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id} data-selected={row.getIsSelected() || undefined}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={processedColumns.length}
                      className="text-muted-foreground h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </table>
          </div>
        </TableContext.Provider>
      </div>

      {/* Pagination */}
      {pageSize && (
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-sm">
            Page {table.getState().pagination.pageIndex + 1} of {Math.max(1, table.getPageCount())}
          </span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Unified Table ───────────────────────────────────────────────────────────

function Table<TData = unknown>(props: TableProps<TData>) {
  if (props.data !== undefined) {
    return <DataMode {...(props as TableDataModeProps<TData>)} />;
  }
  const {
    density = "default",
    borders = "rows",
    striped = false,
    stickyHeader = false,
    className,
    children,
    ...htmlProps
  } = props as TableChildrenModeProps;

  return (
    <TableContext.Provider value={{ density, borders, striped, stickyHeader }}>
      <div className="relative w-full overflow-auto">
        <table className={cn("w-full caption-bottom text-sm", className)} {...htmlProps}>
          {children}
        </table>
      </div>
    </TableContext.Provider>
  );
}

Table.displayName = "Table";

export { Table, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, TableCaption };
