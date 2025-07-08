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
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { CheckCircleIcon, XCircleIcon } from "@phosphor-icons/react";
import type { Account } from "./columns";

type ToastAlert = {
  id: number;
  type: "success" | "error";
  message: string;
};

interface DataTableProps<TData, TValue> {
  columns: (
    onStatusUpdated: (
      id: string,
      status: Account["status"],
      result?: "success" | "error"
    ) => void
  ) => ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  onStatusUpdated: (id: string, status: Account["status"]) => void;
}

export function DataTable<TData extends Record<string, unknown>, TValue>({
  columns,
  data,
  isLoading = false,
  onStatusUpdated,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [search, setSearch] = useState("");

  // ALERT TOAST STATE (multiple)
  const [alerts, setAlerts] = useState<ToastAlert[]>([]);
  const [alertId, setAlertId] = useState(0);

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
      if (role && row.role !== role) return false;
      if (status && row.status !== status) return false;
      return true;
    });
  }, [data, search, role, status]);

  // Tambah alert baru
  const addAlert = (type: "success" | "error", message: string) => {
    const id = alertId + 1;
    setAlertId(id);
    setAlerts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => removeAlert(id), 4000);
  };

  // Hapus alert by id
  const removeAlert = (id: number) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  // Handler untuk feedback toast
  const handleStatusUpdate = (
    id: string,
    newStatus: Account["status"],
    result?: "success" | "error"
  ) => {
    onStatusUpdated(id, newStatus); // update state parent
    if (result === "success") {
      addAlert("success", "Status akun berhasil diperbarui.");
    } else {
      addAlert("error", "Gagal memperbarui status akun.");
    }
  };

  const dynamicColumns = columns(handleStatusUpdate);

  const table = useReactTable({
    data: filteredData,
    columns: dynamicColumns,
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
                <TableCell
                  colSpan={dynamicColumns.length}
                  className="p-0"
                  style={{ height: 200 }}
                >
                  <div className="flex flex-col items-center justify-center h-full w-full">
                    <LoaderSpinner />
                    <div className="text-muted-foreground mt-2">
                      Memuat data akun...
                    </div>
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
                  colSpan={dynamicColumns.length}
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

      {/* ALERT TOAST */}
      {alerts.length > 0 && (
        <div className="fixed bottom-6 right-6 z-50 max-w-xs">
          <div className="group relative">
            <Alert
              variant={
                alerts[alerts.length - 1].type === "error"
                  ? "destructive"
                  : "green"
              }
              className={`
          shadow-lg pr-10
          bg-white border border-neutral-200 text-neutral-800
          dark:bg-neutral-900 dark:text-neutral-100 dark:border-neutral-700
          transition-colors
        `}
            >
              {alerts[alerts.length - 1].type === "success" ? (
                <CheckCircleIcon className="h-5 w-5 text-green-500 dark:text-green-400" />
              ) : (
                <XCircleIcon className="h-5 w-5 text-red-500 dark:text-red-400" />
              )}
              <AlertTitle
                className={
                  alerts[alerts.length - 1].type === "success"
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }
              >
                {alerts[alerts.length - 1].type === "success"
                  ? "Berhasil"
                  : "Gagal"}
              </AlertTitle>
              <AlertDescription>
                {alerts[alerts.length - 1].message}
                {alerts.length > 1 && (
                  <span className="ml-2 text-xs font-semibold text-red-500 dark:text-red-400">
                    • Menampilkan {alerts.length} alert
                  </span>
                )}
              </AlertDescription>
              <button
                onClick={() => removeAlert(alerts[alerts.length - 1].id)}
                className="absolute top-1.5 right-2 text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 opacity-0 group-hover:opacity-100 transition"
                style={{ pointerEvents: "auto" }}
                aria-label="Tutup notifikasi"
              >
                ×
              </button>
            </Alert>
          </div>
        </div>
      )}
    </div>
  );
}
