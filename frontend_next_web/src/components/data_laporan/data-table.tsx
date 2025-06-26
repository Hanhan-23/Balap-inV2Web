"use client";

import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  flexRender
} from "@tanstack/react-table";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { DataTablePagination } from "@/components/TablePagination";
import TableCellViewer from "./table-cell-viewer";
import { getColumns } from "./columns";
import { Laporan } from "@/types/data-laporan";

interface DataTableProps {
  data: Laporan[];
  onStatusUpdated: (id: string, status: string) => void;
}

export function DataTable({ data, onStatusUpdated }: DataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [openDrawerId, setOpenDrawerId] = useState<string | null>(null);

  const columns = getColumns(onStatusUpdated, setOpenDrawerId);

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const openItem = data.find((d) => d.id === openDrawerId) || null;

  return (
    <div className="flex flex-col gap-6">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map(row => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <DataTablePagination table={table} />

      {openItem && (
        <TableCellViewer
          item={openItem}
          open={true}
          onOpenChange={(isOpen) => {
            if (!isOpen) setOpenDrawerId(null);
          }}
          onStatusUpdated={onStatusUpdated}
        />
      )}
    </div>
  );
}
