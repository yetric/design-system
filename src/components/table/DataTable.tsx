import * as React from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type RowSelectionState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table";

import { cn } from "../../lib/cn";
import { Button } from "../button/Button";
import { Checkbox } from "../checkbox/Checkbox";
import { Input } from "../input/Input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./Table";

export type { ColumnDef };

export interface DataTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  searchable?: boolean;
  selectable?: boolean;
  pageSize?: number;
  className?: string;
}

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

function DataTable<TData>({
  data,
  columns,
  searchable = false,
  selectable = false,
  pageSize,
  className
}: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [colMenuOpen, setColMenuOpen] = useState(false);
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
      enableHiding: false
    };
    return [selectCol, ...columns];
  }, [columns, selectable]);

  const table = useReactTable({
    data,
    columns: allColumns,
    state: {
      sorting,
      columnFilters,
      globalFilter,
      columnVisibility,
      rowSelection
    },
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
    enableRowSelection: selectable
  });

  const selectedCount = Object.keys(rowSelection).length;
  const hideable = table.getAllLeafColumns().filter((col) => col.getCanHide());

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center gap-3">
        {searchable && (
          <Input
            placeholder="Search…"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="h-8 max-w-xs text-sm"
          />
        )}
        {selectedCount > 0 && (
          <span className="text-sm text-muted-foreground">
            {selectedCount} selected
          </span>
        )}
        <div className="relative ml-auto" ref={colMenuRef}>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setColMenuOpen((v) => !v)}
          >
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
            <div className="absolute right-0 top-full z-[var(--z-dropdown)] mt-1 min-w-[160px] rounded-md border border-border bg-card p-1 shadow-md">
              {hideable.map((col) => (
                <label
                  key={col.id}
                  className="flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent"
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

      <div className="rounded-md border border-border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id} className="hover:bg-transparent">
                {hg.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : header.column.getCanSort() ? (
                      <button
                        className="flex items-center transition-colors hover:text-foreground"
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
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
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
                  colSpan={allColumns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {pageSize && (
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {Math.max(1, table.getPageCount())}
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

DataTable.displayName = "DataTable";

export { DataTable };
