// components/data_laporan/columns.tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { toggleStatusLaporan } from "@/services/datalaporanservices";
import { laporan } from "@/types/laporan-schema";

import TableCellViewer from "./table-cell-viewer";
import StatusBadge from "./status-badge";
import JenisBadge from "./jenis-badge";

export const columns = (
  onStatusUpdated?: (id: string, status: string) => void
): ColumnDef<laporan>[] => [
  {
    accessorKey: "tgl_lapor",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="!p-0 hover:bg-transparent"
      >
        Tanggal
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <TableCellViewer
        item={row.original}
        triggerContent={
          <Button variant="link" className="hover:underline p-0 h-auto">
            {row.original.tgl_lapor.substring(0, 10)}
          </Button>
        }
      />
    ),
    enableHiding: false,
  },
  {
    accessorKey: "judul",
    header: "Judul Pengaduan",
    cell: ({ row }) =>
      row.original.judul.length > 25
        ? `${row.original.judul.slice(0, 25)}...`
        : row.original.judul,
  },
  {
    accessorKey: "jenis",
    header: "Jenis Infrastruktur",
    cell: ({ getValue }) => <JenisBadge jenis={getValue() as string} />,
  },
  {
    accessorKey: "persentase",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="!p-0 hover:bg-transparent"
      >
        Kerusakan
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ getValue }) => `${getValue() as string}`,
  },
  {
    accessorKey: "alamat",
    header: "Lokasi",
    cell: ({ getValue }) => {
      const alamat = getValue() as string;
      return alamat.length > 25 ? `${alamat.slice(0, 25)}...` : alamat;
    },
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => <StatusBadge value={getValue() as string} />,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const item = row.original;
      const isSelesai = item.status === "selesai";
      const nextStatus = isSelesai ? "disembunyikan" : "selesai";
      const label = isSelesai ? "Sembunyikan" : "Tampilkan";

      const handleStatusChange = async () => {
        try {
          await toggleStatusLaporan(item.id);
          onStatusUpdated?.(item.id, nextStatus);
        } catch (err) {
          console.error("Gagal mengubah status:", err);
        }
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Aksi</DropdownMenuLabel>
            <DropdownMenuItem>Detail</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Ubah Status</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem onClick={handleStatusChange}>
                  {label}
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
