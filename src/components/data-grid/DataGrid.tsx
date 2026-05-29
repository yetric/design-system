"use client";

import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type FilterFn,
  type SortingState,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

import { cn } from "../../lib/cn";

const DEFAULT_COLUMN_WIDTH = 150;
const dateRangeFilter: FilterFn<unknown> = () => true;

export interface DataGridColumn<T> {
  id: string;
  header: string;
  accessorKey?: keyof T;
  accessorFn?: (row: T) => unknown;
  cell?: (value: unknown, row: T) => React.ReactNode;
  width?: number;
  minWidth?: number;
  sortable?: boolean;
}

export interface DataGridProps<T> {
  data: T[];
  columns: DataGridColumn<T>[];
  rowHeight?: number;
  height?: number;
  loading?: boolean;
  emptyMessage?: string;
  onRowClick?: (row: T) => void;
  className?: string;
  getRowId?: (row: T) => string;
}

function renderSortIcon(sortState: false | "asc" | "desc") {
  if (sortState === "asc") {
    return <ArrowUp className="h-4 w-4" aria-hidden="true" />;
  }

  if (sortState === "desc") {
    return <ArrowDown className="h-4 w-4" aria-hidden="true" />;
  }

  return <ArrowUpDown className="h-4 w-4 text-muted-foreground" aria-hidden="true" />;
}

export function DataGrid<T>({
  data,
  columns,
  rowHeight = 40,
  height = 400,
  loading = false,
  emptyMessage = "No data available.",
  onRowClick,
  className,
  getRowId,
}: DataGridProps<T>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const scrollElementRef = React.useRef<HTMLDivElement>(null);

  const tableColumns = React.useMemo<ColumnDef<T>[]>(
    () =>
      columns.map((column) => {
        const accessor = column.accessorKey
          ? { accessorKey: String(column.accessorKey) }
          : column.accessorFn
            ? { accessorFn: column.accessorFn }
            : { accessorFn: () => undefined };

        return {
          id: column.id,
          header: column.header,
          cell: (info) => {
            const value = info.getValue();
            return column.cell ? column.cell(value, info.row.original) : String(value ?? "");
          },
          enableSorting:
            column.sortable !== false && (typeof column.accessorFn === "function" || !!column.accessorKey),
          size: column.width ?? DEFAULT_COLUMN_WIDTH,
          minSize: column.minWidth ?? 80,
          ...accessor,
        } satisfies ColumnDef<T>;
      }),
    [columns]
  );

  const table = useReactTable({
    data,
    columns: tableColumns,
    filterFns: { dateRange: dateRangeFilter },
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getRowId: (originalRow, index) => getRowId?.(originalRow) ?? String(index),
    defaultColumn: {
      size: DEFAULT_COLUMN_WIDTH,
      minSize: 80,
    },
  });

  const rows = table.getRowModel().rows;
  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => scrollElementRef.current,
    estimateSize: () => rowHeight,
    overscan: 5,
    initialRect: {
      width: 0,
      height,
    },
  });

  const virtualRows = rowVirtualizer.getVirtualItems();
  const renderedRows =
    virtualRows.length > 0
      ? virtualRows
      : rows.map((_, index) => ({ key: index, index, start: index * rowHeight }));
  const loadingRowCount = Math.max(Math.ceil(height / rowHeight), 3);

  return (
    <div className={cn("w-full", className)}>
      <div
        ref={scrollElementRef}
        className="overflow-auto rounded-lg border border-border bg-card text-card-foreground"
        style={{ height }}
      >
        <table className="w-full border-collapse" data-testid="data-grid">
          <thead className="sticky top-0 z-10 bg-card shadow-[inset_0_-1px_0_hsl(var(--border))]">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b border-border">
                {headerGroup.headers.map((header) => {
                  const canSort = header.column.getCanSort();
                  const sortState = header.column.getIsSorted();
                  return (
                    <th
                      key={header.id}
                      className="bg-card px-4 py-3 text-left text-sm font-medium text-card-foreground"
                      style={{
                        width: header.getSize(),
                        minWidth: header.column.columnDef.minSize,
                      }}
                      aria-sort={
                        sortState === "asc"
                          ? "ascending"
                          : sortState === "desc"
                            ? "descending"
                            : "none"
                      }
                      scope="col"
                    >
                      {header.isPlaceholder ? null : canSort ? (
                        <button
                          type="button"
                          className="flex w-full items-center gap-2 transition-colors hover:text-foreground"
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          <span className="truncate">
                            {flexRender(header.column.columnDef.header, header.getContext())}
                          </span>
                          {renderSortIcon(sortState)}
                        </button>
                      ) : (
                        <span className="truncate">
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </span>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          {loading ? (
            <tbody>
              {Array.from({ length: loadingRowCount }).map((_, rowIndex) => (
                <tr key={`skeleton-${rowIndex}`} data-testid="data-grid-skeleton-row">
                  {table.getAllLeafColumns().map((column) => (
                    <td
                      key={`${column.id}-${rowIndex}`}
                      className="border-b border-border px-4 py-2"
                      style={{
                        height: rowHeight,
                        width: column.getSize(),
                        minWidth: column.columnDef.minSize,
                      }}
                    >
                      <div className="h-4 animate-pulse rounded bg-muted" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          ) : rows.length === 0 ? (
            <tbody>
              <tr>
                <td
                  colSpan={table.getAllLeafColumns().length || 1}
                  className="px-4 py-10 text-center text-sm text-muted-foreground"
                >
                  {emptyMessage}
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody
              style={{
                display: "grid",
                height: virtualRows.length > 0 ? rowVirtualizer.getTotalSize() : rows.length * rowHeight,
                position: "relative",
              }}
            >
              {renderedRows.map((virtualRow) => {
                const row = rows[virtualRow.index];
                return (
                  <tr
                    key={row.id}
                    className={cn(
                      "absolute left-0 flex w-full border-b border-border bg-card transition-colors",
                      onRowClick && "cursor-pointer hover:bg-accent/40"
                    )}
                    style={{
                      height: rowHeight,
                      transform: `translateY(${virtualRow.start}px)`,
                    }}
                    onClick={() => onRowClick?.(row.original)}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="flex items-center overflow-hidden px-4 text-sm text-card-foreground"
                        style={{
                          width: cell.column.getSize(),
                          minWidth: cell.column.columnDef.minSize,
                        }}
                      >
                        <div className="truncate">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </div>
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}
