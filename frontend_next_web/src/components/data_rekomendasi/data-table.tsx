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
import { Input } from "@/components/ui/input";
import DataRekomendasiFilterDropdown from "@/components/data_rekomendasi/filter-rekomendasi";

interface DataTableProps {
  data: rekomendasi[];
  onStatusUpdated: (id: string, newStatus: StatusRekom) => void;
}

export function DataTable({ data, onStatusUpdated }: DataTableProps) {
  // --- Filter States
  const [jenis, setJenis] = useState<string | null>(null);
  const [tingkatUrgensi, setTingkatUrgensi] = useState<[number, number]>([1, 100]);
  const [statusUrgensi, setStatusUrgensi] = useState<string | null>(null);
  const [statusRekom, setStatusRekom] = useState<string | null>(null);
  const onReset = () => {
    setJenis(null);
    setTingkatUrgensi([1, 100]);
    setStatusUrgensi(null);
    setStatusRekom(null);
  };

  // --- Search State
  const [search, setSearch] = useState("");

  // --- Drawer Detail State
  const [sorting, setSorting] = useState<SortingState>([]);
  const [openDrawerId, setOpenDrawerId] = useState<string | null>(null);
  const [detailItem, setDetailItem] = useState<cardDetailRekomendasi | null>(null);

  // --- Filtering Logic
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      // Search by judul (tambahkan field lain kalau perlu)
      if (search && !item.laporan.judul.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }
      // Jenis Infrastruktur
      if (jenis && item.laporan.jenis !== jenis) {
        return false;
      }
      // Tingkat Urgensi (pastikan tipe number, 0-1 atau 1-100)
      const persen = (typeof item.tingkat_urgent === "number"
        ? item.tingkat_urgent * 100
        : Number(item.tingkat_urgent));
      if (persen < tingkatUrgensi[0] || persen > tingkatUrgensi[1]) {
        return false;
      }
      // Status Urgensi
      if (statusUrgensi && item.status_urgent !== statusUrgensi) {
        return false;
      }
      // Status Rekomendasi
      if (statusRekom && item.status_rekom !== statusRekom) {
        return false;
      }
      return true;
    });
  }, [data, search, jenis, tingkatUrgensi, statusUrgensi, statusRekom]);

  // --- Drawer Handler
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
        <h1 className="font-bold text-2xl">Data Rekomendasi</h1>
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
      {/* --- Tabel Data --- */}
      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead className="bg-slate-300" key={header.id}>
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
      {/* --- Drawer hanya jika detail ada --- */}
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
