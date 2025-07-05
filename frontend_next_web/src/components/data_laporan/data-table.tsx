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

interface DataTableProps {
  data: Laporan[];
  onStatusUpdated: (id: string, status: string) => void;
}

export function DataTable({ data, onStatusUpdated }: DataTableProps) {
  // === FILTER STATES ===
  const [jenis, setJenis] = useState<string | null>(null);
  const [tingkatKerusakan, setTingkatKerusakan] = useState<[number, number]>([1, 100]);
  const [status, setStatus] = useState<string | null>(null);
  const onReset = () => {
    setJenis(null);
    setTingkatKerusakan([1, 100]);
    setStatus(null);
  };

  // === SEARCH STATE ===
  const [search, setSearch] = useState("");

  // === SORTING, DRAWER, DETAIL ===
  const [sorting, setSorting] = useState<SortingState>([]);
  const [openDrawerId, setOpenDrawerId] = useState<string | null>(null);
  const [detailItem, setDetailItem] = useState<LaporanDetail | null>(null);

  // === FILTERED DATA ===
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      // Search
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
      // Jenis Infrastruktur
      if (jenis && item.jenis !== jenis) {
        return false;
      }
      // Tingkat Kerusakan (sesuaikan dengan field aslimu! Di sini pakai "persentase" dan diasumsikan 0-1)
      const persen = typeof item.persentase === "number"
        ? item.persentase * 100
        : Number(item.persentase);
      if (persen < tingkatKerusakan[0] || persen > tingkatKerusakan[1]) {
        return false;
      }
      // Status
      if (status && item.status !== status) {
        return false;
      }
      return true;
    });
  }, [data, search, jenis, tingkatKerusakan, status]);

  // === DRAWER HANDLER ===
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

  const columns = getColumns(onStatusUpdated, openDrawerHandler);

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
      {/* --- Header: Heading + Filter + Search + ColumnToggle --- */}
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
              onChange={e => setSearch(e.target.value)}
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
      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead className="bg-slate-300" key={header.id}>
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
      </div>
      {/* Drawer hanya dirender jika detailItem SUDAH ADA */}
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
          onStatusUpdated={onStatusUpdated}
        />
      )}
    </div>
  );
}

// Kustomisasi kolom (toggle tampil/sembunyi)
function ColumnToggle({
  table,
}: {
  table: ReturnType<typeof useReactTable<any>>;
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
