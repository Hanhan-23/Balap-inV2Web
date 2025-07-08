"use client";

import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { Laporan } from "@/types/data-laporan";
import StatusBadge from "./status-badge";
import JenisBadge from "./jenis-badge";
import { updateLaporanStatus } from "@/lib/update-status";
import { ColumnDef } from "@tanstack/react-table";

export const getColumns = (
  onStatusUpdated: (
    id: string,
    status: string,
    result?: "success" | "error"
  ) => void,
  openDrawerHandler: (id: string | null) => void
): ColumnDef<Laporan>[] => [
  {
    id: "no",
    header: "No",
    cell: ({ row }) => row.index + 1,
    size: 50,
  },
  {
    accessorKey: "tgl_lapor",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="!p-0"
      >
        Tanggal <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const item = row.original;
      return item.tgl_lapor.slice(0, 10);
    },
    enableHiding: false,
  },
  {
    accessorKey: "judul",
    header: "Judul Pengaduan",
    cell: ({ row }) => {
      const item = row.original;
      return item.judul.length > 25
        ? `${item.judul.slice(0, 25)}…`
        : item.judul;
    },
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
        className="!p-0"
      >
        Kerusakan
        <ArrowUpDown className="ml-0 h-4 w-4" />
      </Button>
    ),
    cell: ({ getValue }) => (
      <div className="text-start">
        {((getValue() as number) * 100).toFixed(0)}%
      </div>
    ),
  },
  {
    accessorKey: "alamat",
    header: "Lokasi",
    cell: ({ getValue }) => {
      const a = getValue() as string;
      return a.length > 23 ? `${a.slice(0, 23)}…` : a;
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
            <DropdownMenuSeparator />
            <DropdownMenuItem
              asChild
              onClick={() => openDrawerHandler(item.id)}
            >
              <span>Detail</span>
            </DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Ubah Status</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem
                  onClick={async () => {
                    try {
                      await updateLaporanStatus(
                        item.id,
                        item.status,
                        (id, status) => onStatusUpdated(id, status, "success")
                      );
                    } catch {
                      onStatusUpdated(item.id, item.status, "error");
                    }
                  }}
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
