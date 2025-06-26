// components/data_rekomendasi/columns.tsx
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

import { rekomendasi } from "@/types/rekomendasi-schema";
import TableCellViewer from "./table-cell-viewer";
import JenisBadge from "./jenis-badge";
import StatusBadge from "./status-badge";
import { updateStatusRekomendasi } from "@/services/datarekomendasiservices";
import { StatusRekom } from "@/types/data-rekomendasi";

export const columns = (
  onStatusUpdated: (id: string, newStatus: string) => void
): ColumnDef<rekomendasi>[] => [
  {
    accessorKey: "laporan.judul",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="!p-0 hover:bg-transparent"
      >
        Judul
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <TableCellViewer item={row.original} />,
  },
  {
    accessorKey: "laporan.jenis",
    header: "Jenis Infrastruktur",
    cell: ({ getValue }) => <JenisBadge jenis={getValue() as string} />,
  },
  {
    accessorKey: "laporan.alamat",
    header: "Alamat",
    cell: ({ getValue }) => {
      const text = getValue() as string;
      return text.length > 25 ? `${text.slice(0, 25)}...` : text;
    },
  },
  {
    accessorKey: "tingkat_urgent",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Tingkat Urgensi
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ getValue }) => {
      const value = getValue() as number;
      return <div className="text-center">{(value * 100).toFixed(2)}%</div>;
    },
  },
  {
    accessorKey: "status_urgent",
    header: "Status Urgensi",
    cell: ({ getValue }) => (
      <StatusBadge type="urgent" value={getValue() as string} />
    ),
  },
  {
    accessorKey: "status_rekom",
    header: "Status Rekomendasi",
    cell: ({ getValue }) => (
      <StatusBadge type="rekom" value={getValue() as string} />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const item = row.original;
      const statusList: StatusRekom[] = [
        "belum_valid",
        "valid",
        "proses",
        "selesai",
      ];

      const handleChangeStatus = async (status: StatusRekom) => {
        try {
          await updateStatusRekomendasi(item.id, { status_rekom: status });
          onStatusUpdated(item.id, status);
        } catch (err) {
          console.error(err);
          alert("Gagal update status");
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
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(item.id)}
            >
              Salin ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Detail</DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Ubah Status</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                {statusList.map((s) => (
                  <DropdownMenuItem
                    key={s}
                    onClick={() => handleChangeStatus(s)}
                  >
                    {s.replace(/_/g, " ")}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
