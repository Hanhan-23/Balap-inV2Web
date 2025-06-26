"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
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

import { laporan } from "@/types/laporan-schema";
import TableCellViewer from "./table-cell-viewer";
import StatusBadge from "./status-badge";
import JenisBadge from "./jenis-badge";
import { updateLaporanStatus } from "@/lib/update-status";

export const columns = (
  onStatusUpdated: (id: string, status: string) => void
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
    cell: ({ row }) => {
      const [open, setOpen] = useState(false);
      return (
        <>
          <Button
            variant="link"
            className="hover:underline p-0 h-auto"
            onClick={() => setOpen(true)}
          >
            {row.original.tgl_lapor.substring(0, 10)}
          </Button>
          <TableCellViewer
            item={row.original}
            open={open}
            onOpenChange={setOpen}
            onStatusUpdated={onStatusUpdated ?? (() => {})}
          />
        </>
      );
    },
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
      const label = item.status === "selesai" ? "Sembunyikan" : "Tampilkan";

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
                <DropdownMenuItem
                  onClick={() =>
                    updateLaporanStatus(item.id, item.status, onStatusUpdated)
                  }
                >
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
