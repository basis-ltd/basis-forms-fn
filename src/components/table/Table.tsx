import {
  ColumnDef,
  ColumnFiltersState,
  Row,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table as DataTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { DataTablePagination } from './TablePagination';
import TableToolbar from './TableToolbar';
import { useState } from 'react';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  rowClickHandler?: undefined | ((row: TData) => void);
  showFilter?: boolean;
  showPagination?: boolean;
  showExport?: boolean;
}

export default function Table<TData, TValue>({
  columns = [],
  data = [],
  rowClickHandler = undefined,
  showFilter = true,
  showPagination = true,
  showExport = true,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <div className="space-y-4 w-full my-2">
      {showFilter && (
        <TableToolbar table={table} columns={columns} showExport={showExport} />
      )}
      <div className="rounded-md border">
        <DataTable>
          <TableHeader className="px-0">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      className="text-[14px] text-black p-4"
                      key={header.id}
                      colSpan={header.colSpan}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => {
                return (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                    className={`p-2 ${rowClickHandler ? 'cursor-pointer' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      rowClickHandler &&
                        row?.id !== 'no' &&
                        rowClickHandler(row as Row<TData>['original']);
                    }}
                  >
                    {row.getVisibleCells().map((cell) => {
                      const preventAction = [
                        'no',
                        'action',
                        'checkbox',
                        'actions',
                      ].includes(cell.column.id || cell.column.accessorKey);
                      return (
                        <TableCell
                          className={`${
                            preventAction ? '!cursor-auto' : ''
                          } text-[13px] p-4`}
                          key={cell.id}
                          onClick={(e) => {
                            if (preventAction) {
                              e.preventDefault();
                              e.stopPropagation();
                            }
                          }}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </DataTable>
      </div>
      {showPagination && <DataTablePagination table={table} />}
    </div>
  );
}
