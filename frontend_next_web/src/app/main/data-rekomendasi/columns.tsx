"use client";

import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

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
import { cn } from "@/lib/utils";

export type Pengaduan = {
  id: number;
  judul_pengaduan: string;
  deskripsi_pengaduan: string;
  cuaca: string;
  nilai_kerusakan: string;
  status: "Diperiksa" | "Menunggu perbaikan" | "Menunggu pengecekan" | "Sedang diperbaiki" | "Diperbaiki";
};

const handleStatusChange = (id: number, newStatus: string) => {
  // Implementasi logika untuk mengubah status pengaduan
  console.log(`Mengubah status pengaduan ${id} menjadi ${newStatus}`);
  // Biasanya di sini akan ada API call untuk update status
};

export const columns: ColumnDef<Recommended>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        checked={row.getIsSelected()}
      />
    ),
  },
  {
    accessorKey: "judul",
    header: "Judul Pengaduan",
  },
  {
    accessorKey: "deskripsi",
    header: "Deskripsi Pengaduan",
  },
  {
    accessorKey: "cuaca",
    header: "Cuaca",
  },
  {
  accessorKey: "nilai_kerusakan",
  header: ({ column }) => {
    return (
      <div className="flex justify-center w-full">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="mx-auto"
        >
          Kerusakan
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    );
  },
  cell: ({ getValue }) => (
    <div className="text-center w-full">{getValue()}</div>
  ),
},
  {
  accessorKey: "status",
  header: "Status",
  cell: ({ row }) => {
    const status = row.getValue("status");

    return (
      <div className="flex items-center gap-2">
        <div
          className={cn(
            `p-1 rounded-md w-max text-xs`,
            status === "Belum Divalidasi" && "bg-red-500/40 text-red-800 dark:bg-red-300/50 dark:text-slate-50",
            status === "Sedang Diproses" && "bg-indigo-500/40 text-indigo-800 dark:bg-indigo-300/50  dark:text-slate-50",
            status === "Divalidasi" && "bg-teal-500/40 text-teal-800 dark:bg-teal-300/50  dark:text-slate-50"
          )}
        >
          {status as string}
        </div>
      </div>
    );
  },
},
{
  id: "actions",
  cell: ({ row }) => {
    const pengaduan = row.original;

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(pengaduan.id.toString())}
          >
            Copy Pengaduan ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>View details</DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Change Status</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => handleStatusChange(pengaduan.id, "Belum Divalidasi")}>
                Belum Divalidasi
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusChange(pengaduan.id, "Sedang Diproses")}>
                Sedang Diproses
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusChange(pengaduan.id, "Divalidasi")}>
                Divalidasi
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
}
];