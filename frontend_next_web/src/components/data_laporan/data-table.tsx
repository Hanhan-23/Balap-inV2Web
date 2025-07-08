"use client";

import { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  flexRender,
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
import {
  MagnifyingGlassIcon,
  ColumnsIcon,
  CaretDownIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@phosphor-icons/react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { getDetailLaporan } from "@/services/datalaporanservices";
import { LaporanDetail } from "@/types/data-laporan";
import DataLaporanFilterDropdown from "./filter-laporan";
import { LoaderSpinner } from "../ui/spinner";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
type ToastAlert = {
  id: number;
  type: "success" | "error";
  message: string;
};

interface DataTableProps {
  data: Laporan[];
  onStatusUpdated: (id: string, status: string) => void;
  isLoading?: boolean;
}

export function DataTable({
  data,
  onStatusUpdated,
  isLoading = false,
}: DataTableProps) {
  const [jenis, setJenis] = useState<string | null>(null);
  const [tingkatKerusakan, setTingkatKerusakan] = useState<[number, number]>([
    1, 100,
  ]);
  const [status, setStatus] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [openDrawerId, setOpenDrawerId] = useState<string | null>(null);
  const [detailItem, setDetailItem] = useState<LaporanDetail | null>(null);

  // Toast alert state (array, hanya tampilkan satu teratas)
  const [alerts, setAlerts] = useState<ToastAlert[]>([]);
  const [alertId, setAlertId] = useState(0);

  // Fungsi untuk menambah alert baru
  const addAlert = (type: "success" | "error", message: string) => {
    const id = alertId + 1;
    setAlertId(id);
    setAlerts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => removeAlert(id), 4000);
  };
  // Fungsi hapus alert (by id)
  const removeAlert = (id: number) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  // Handler status (support result)
  const handleStatusUpdate = (
    id: string,
    newStatus: string,
    result?: "success" | "error"
  ) => {
    onStatusUpdated(id, newStatus);
    if (result === "success") {
      addAlert("success", "Status berhasil diperbarui.");
    } else {
      addAlert("error", "Gagal memperbarui status.");
    }
  };

  const onReset = () => {
    setJenis(null);
    setTingkatKerusakan([1, 100]);
    setStatus(null);
  };

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      if (
        search &&
        !(
          item.judul?.toLowerCase().includes(search.toLowerCase()) ||
          item.jenis?.toLowerCase().includes(search.toLowerCase()) ||
          item.status?.toLowerCase().includes(search.toLowerCase())
        )
      ) {
        return false;
      }
      if (jenis && item.jenis !== jenis) return false;
      const persen =
        typeof item.persentase === "number"
          ? item.persentase * 100
          : Number(item.persentase);
      if (persen < tingkatKerusakan[0] || persen > tingkatKerusakan[1])
        return false;
      if (status && item.status !== status) return false;
      return true;
    });
  }, [data, search, jenis, tingkatKerusakan, status]);

  const handleOpenDrawer = async (id: string) => {
    setOpenDrawerId(id);
    try {
      const detail = await getDetailLaporan(id);
      setDetailItem(detail);
    } catch {
      setDetailItem(null);
    }
  };

  const openDrawerHandler = (id: string | null) => {
    if (id) {
      handleOpenDrawer(id);
    } else {
      setOpenDrawerId(null);
      setDetailItem(null);
    }
  };

  const columns = getColumns(handleStatusUpdate, openDrawerHandler);

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
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-0">
        <h1 className="font-bold text-2xl">Data Laporan</h1>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative w-full max-w-xs">
            <MagnifyingGlassIcon
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
              weight="regular"
              aria-hidden="true"
            />
            <Input
              type="text"
              placeholder="Cari laporan..."
              className="pl-10 pr-3 text-xs sm:text-sm rounded-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <DataLaporanFilterDropdown
            jenis={jenis}
            setJenis={setJenis}
            tingkatKerusakan={tingkatKerusakan}
            setTingkatKerusakan={setTingkatKerusakan}
            status={status}
            setStatus={setStatus}
            onReset={onReset}
          />
          <ColumnToggle table={table} />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border dark:border-gray-700 overflow-x-auto">
        <Table>
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
                  className="py-8 text-center"
                >
                  <div className="flex flex-col items-center justify-center h-full w-full">
                    <LoaderSpinner />
                    <div className="text-muted-foreground mt-2">
                      Memuat data laporan...
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="dark:hover:bg-gray-800/70">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="dark:text-gray-200 dark:bg-gray-900/30"
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
                  className="text-center text-gray-500 dark:text-gray-400"
                >
                  Tidak ada hasil.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <DataTablePagination table={table} />
      </div>

      {/* Drawer Viewer */}
      {openDrawerId && detailItem && (
        <TableCellViewer
          item={detailItem}
          open={!!openDrawerId}
          onOpenChange={(isOpen) => {
            if (!isOpen) {
              setOpenDrawerId(null);
              setDetailItem(null);
            }
          }}
          onStatusUpdated={handleStatusUpdate}
        />
      )}

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
  table: ReturnType<typeof useReactTable<Laporan>>;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="h-9 rounded-full">
          <ColumnsIcon className="mr-2 h-4 w-4" />
          Kustomisasi Kolom
          <CaretDownIcon className="ml-1 h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-56 dark:bg-gray-800 dark:text-gray-100"
      >
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
