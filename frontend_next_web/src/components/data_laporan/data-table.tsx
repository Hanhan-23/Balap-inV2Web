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
import { MagnifyingGlass, Columns as ColumnsIcon, CaretDown as CaretDownIcon } from "@phosphor-icons/react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
// Import fungsi fetch detail laporan dan tipe detail
import { getDetailLaporan } from "@/services/datalaporanservices";
import { LaporanDetail } from "@/types/data-laporan";

interface DataTableProps {
  data: Laporan[];
  onStatusUpdated: (id: string, status: string) => void;
}

export function DataTable({ data, onStatusUpdated }: DataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [openDrawerId, setOpenDrawerId] = useState<string | null>(null);

  // ===== Tambahan state untuk detail drawer =====
  const [detailItem, setDetailItem] = useState<LaporanDetail | null>(null);
  const [search, setSearch] = useState("");

  // Filter data by search (case insensitive) on judul, jenis, deskripsi, status, cluster
  const filteredData = useMemo(() => {
    if (!search) return data;
    const lower = search.toLowerCase();
    return data.filter((item) =>
      item.judul?.toLowerCase().includes(lower) ||
      item.jenis?.toLowerCase().includes(lower) ||
      item.deskripsi?.toLowerCase().includes(lower) ||
      item.status?.toLowerCase().includes(lower) ||
      item.cluster?.toLowerCase().includes(lower)
    );
  }, [data, search]);

  // Handler fetch detail laporan & open drawer
  const handleOpenDrawer = async (id: string) => {
    setOpenDrawerId(id);
    try {
      const detail = await getDetailLaporan(id);
      setDetailItem(detail);
    } catch {
      setDetailItem(null);
    }
  };

  // Handler yang diteruskan ke columns (mirip pattern rekomendasi)
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
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-0">
        <h1 className="font-bold text-2xl">Data Laporan</h1>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative w-full max-w-xs">
            <MagnifyingGlass
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
              weight="regular"
              aria-hidden="true"
            />
            <Input
              type="text"
              placeholder="Cari laporan..."
              className="pl-10 pr-3"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <ColumnToggle table={table} />
        </div>
      </div>
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
        <Button variant="outline" size="sm">
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
