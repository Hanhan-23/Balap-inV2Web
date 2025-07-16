"use client";

import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTablePagination } from "@/components/TablePagination";
import { getColumns } from "./columns";
import { rekomendasi } from "@/types/rekomendasi-schema";
import { Button } from "@/components/ui/button";
import {
  ColumnsIcon,
  CaretDownIcon,
  MagnifyingGlassIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@phosphor-icons/react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { StatusRekom } from "@/types/data-rekomendasi";
import { Input } from "@/components/ui/input";
import DataRekomendasiFilterDropdown from "@/components/data_rekomendasi/filter-rekomendasi";
import { LoaderSpinner } from "../ui/spinner";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

type ToastAlert = {
  id: number;
  type: "success" | "error";
  message: string;
};

interface DataTableProps {
  data: rekomendasi[];
  onStatusUpdated: (id: string, newStatus: StatusRekom) => void;
  isLoading?: boolean;
}

export function DataTable({
  data,
  onStatusUpdated,
  isLoading = false,
}: DataTableProps) {
  const [jenis, setJenis] = useState<string | null>(null);
  const [tingkatUrgensi, setTingkatUrgensi] = useState<[number, number]>([
    1, 100,
  ]);
  const [statusUrgensi, setStatusUrgensi] = useState<string | null>(null);
  const [statusRekom, setStatusRekom] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);

  // ALERT TOAST STATE (multiple)
  const [alerts, setAlerts] = useState<ToastAlert[]>([]);
  const [alertId, setAlertId] = useState(0);

  const addAlert = (type: "success" | "error", message: string) => {
    const id = alertId + 1;
    setAlertId(id);
    setAlerts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => removeAlert(id), 4000);
  };

  const removeAlert = (id: number) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  const handleStatusUpdate = (
    id: string,
    newStatus: StatusRekom,
    result?: "success" | "error"
  ) => {
    onStatusUpdated(id, newStatus); // update data di parent
    if (result === "success") {
      addAlert("success", "Status berhasil diperbarui.");
    } else {
      addAlert("error", "Gagal memperbarui status.");
    }
  };

  const onReset = () => {
    setJenis(null);
    setTingkatUrgensi([1, 100]);
    setStatusUrgensi(null);
    setStatusRekom(null);
  };

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      if (
        search &&
        !item.laporan.judul.toLowerCase().includes(search.toLowerCase())
      )
        return false;
      if (jenis && item.laporan.jenis !== jenis) return false;
      const persen =
        typeof item.tingkat_urgent === "number"
          ? item.tingkat_urgent * 100
          : Number(item.tingkat_urgent);
      if (persen < tingkatUrgensi[0] || persen > tingkatUrgensi[1])
        return false;
      if (statusUrgensi && item.status_urgent !== statusUrgensi) return false;
      if (statusRekom && item.status_rekom !== statusRekom) return false;
      return true;
    });
  }, [data, search, jenis, tingkatUrgensi, statusUrgensi, statusRekom]);

  const columns = getColumns(handleStatusUpdate);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="flex flex-col gap-6 overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-0">
        <h1 className="font-bold text-2xl">Data Rekomendasi</h1>
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
              placeholder="Cari rekomendasi..."
              className="pl-10 pr-3 text-xs sm:text-sm rounded-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <DataRekomendasiFilterDropdown
            jenis={jenis}
            setJenis={setJenis}
            tingkatUrgensi={tingkatUrgensi}
            setTingkatUrgensi={setTingkatUrgensi}
            statusUrgensi={statusUrgensi}
            setStatusUrgensi={setStatusUrgensi}
            statusRekom={statusRekom}
            setStatusRekom={setStatusRekom}
            onReset={onReset}
          />
          <ColumnToggle table={table} />
        </div>
      </div>

      <div className="rounded-md border border-slate-200 dark:border-slate-700 overflow-x-auto">
        <Table id="table-data-rekomendasi">
          <TableHeader className="bg-muted">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="p-0"
                  style={{ height: 200 }}
                >
                  <div className="flex flex-col items-center justify-center h-full w-full">
                    <LoaderSpinner />
                    <div className="text-muted-foreground mt-2">
                      Memuat data...
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
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
                  className="h-24 text-center"
                >
                  Tidak ada hasil.
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

function ColumnToggle({
  table,
}: {
  table: ReturnType<typeof useReactTable<rekomendasi>>;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="h-9 rounded-full">
          <ColumnsIcon className="mr-2 size-4" />
          Kustomisasi Kolom
          <CaretDownIcon className="ml-1 size-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {table
          .getAllColumns()
          .filter((column) => column.getCanHide() && column.accessorFn)
          .map((column) => (
            <DropdownMenuCheckboxItem
              key={column.id}
              className="capitalize"
              checked={column.getIsVisible()}
              onCheckedChange={(value) => column.toggleVisibility(!!value)}
            >
              {column.id.replaceAll("_", " ")}
            </DropdownMenuCheckboxItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
