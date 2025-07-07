"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTablePagination } from "@/components/TablePagination";
import { useState, useMemo } from "react";
import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import { Input } from "@/components/ui/input";
import DataAkunFilterDropdown from "./filter-akun";
import { LoaderSpinner } from "../ui/spinner";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
}

export function DataTable<TData extends Record<string, any>, TValue>({
  columns,
  data,
  isLoading = false,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [search, setSearch] = useState("");

  // Filter states
  const [role, setRole] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const onReset = () => {
    setRole(null);
    setStatus(null);
  };

  // Filtering logic
  const filteredData = useMemo(() => {
    return data.filter((row) => {
      // Search
      if (
        search &&
        !Object.values(row)
          .filter((v) => typeof v === "string")
          .some((v) =>
            (v as string).toLowerCase().includes(search.toLowerCase())
          )
      ) {
        return false;
      }
      // Role
      if (role && row.role !== role) return false;
      // Status
      if (status && row.status !== status) return false;
      return true;
    });
  }, [data, search, role, status]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      rowSelection,
    },
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-0">
        <h1 className="font-bold text-2xl">Data Akun</h1>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative w-full max-w-xs">
            <MagnifyingGlassIcon
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
              size={18}
              weight="regular"
              aria-hidden="true"
            />
            <Input
              type="text"
              placeholder="Cari akun..."
              className="pl-10 pr-3 rounded-full bg-white border placeholder:text-grey-800 "
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <DataAkunFilterDropdown
            role={role}
            setRole={setRole}
            status={status}
            setStatus={setStatus}
            onReset={onReset}
          />
        </div>
      </div>
      {/* Table */}
      <div className="rounded-md border overflow-x-auto border-slate-200 dark:border-slate-700">
        <Table>
          <TableHeader className="bg-muted">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
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
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="p-0" style={{ height: 200 }}>
                  <div className="flex flex-col items-center justify-center h-full w-full">
                    <LoaderSpinner />
                    <div className="text-muted-foreground mt-2">Memuat data akun...</div>
                  </div>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="text-sm text-slate-800 dark:text-slate-200"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-slate-600 dark:text-slate-400"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}
