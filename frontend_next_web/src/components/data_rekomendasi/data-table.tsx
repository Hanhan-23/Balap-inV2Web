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
import TableCellViewer from "./table-cell-viewer";
import { getColumns } from "./columns";
import { rekomendasi } from "@/types/rekomendasi-schema";
import { Button } from "@/components/ui/button";
import {
  ColumnsIcon,
  CaretDownIcon,
  MagnifyingGlassIcon,
} from "@phosphor-icons/react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { StatusRekom } from "@/types/data-rekomendasi";

import { cardDetailRekomendasi } from "@/types/data-rekomendasi";
import { getDetailRekomendasi } from "@/services/datarekomendasiservices";

// === Tambahan Search ===
import { Input } from "@/components/ui/input";

interface DataTableProps {
  data: rekomendasi[];
  onStatusUpdated: (id: string, newStatus: StatusRekom) => void;
}

export function DataTable({ data, onStatusUpdated }: DataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [openDrawerId, setOpenDrawerId] = useState<string | null>(null);
  const [detailItem, setDetailItem] = useState<cardDetailRekomendasi | null>(
    null
  );

  const [search, setSearch] = useState("");

  const filteredData = useMemo(() => {
    if (!search) return data;
    return data.filter(
      (item) => item.laporan.judul.toLowerCase().includes(search.toLowerCase())
    );
  }, [data, search]);

  const handleOpenDrawer = async (id: string) => {
    setOpenDrawerId(id);
    try {
      const detail = await getDetailRekomendasi(id);
      setDetailItem(detail);
    } catch (err) {
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
    data: filteredData, // <<< pakai filteredData!
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
        <h1 className="font-bold text-2xl">Data Rekomendasi</h1>
        <div className="flex items-center gap-2 w-full md:w-auto">
          {/* Search with icon */}
          <div className="relative w-full max-w-xs">
            <MagnifyingGlassIcon
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
              weight="regular"
              aria-hidden="true"
            />
            <Input
              type="text"
              placeholder="Cari rekomendasi..."
              className="pl-10 pr-3 text-xs sm:text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <ColumnToggle table={table} />
        </div>
      </div>
      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
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
            {table.getRowModel().rows.length ? (
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
      {/* Drawer hanya dirender jika detailItem SUDAH ADA */}
      {openDrawerId && detailItem && (
        <TableCellViewer
          item={detailItem}
          open={!!openDrawerId}
          onOpenChange={(open) => {
            if (!open) {
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

function ColumnToggle({
  table,
}: {
  table: ReturnType<typeof useReactTable<any>>;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="h-9">
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