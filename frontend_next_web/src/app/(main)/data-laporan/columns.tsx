"use client";

import { useState } from "react";
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
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { DetailsDialog } from "./details-dialog";

export type Recommended = {
  id: string;
  tanggal: string;
  judul: string;
  jenisInfrastruktur: string;
  cuaca: string;
  kerusakan: string;
  lokasi: string;
  status: "selesai" | "disembunyikan";
};

const truncateText = (text: string, maxLength: number = 25) => {
  if (!text) return "";
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
};

export const columns: ColumnDef<Recommended>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
  },
  {
    accessorKey: "tanggal",
    header: ({ column }) => (
      <div className="flex justify-center w-full">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="mx-auto"
        >
          Tanggal
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ getValue }) => (
      <div className="text-center w-full">{getValue() as string}</div>
    ),
  },
  {
    accessorKey: "judul",
    header: "Judul Pengaduan",
    cell: ({ row }) => {
      const [open, setOpen] = useState(false);
      const judul = row.getValue("judul") as string;
      
      return (
        <>
          <button 
            onClick={() => setOpen(true)}
            className="text-left hover:underline"
          >
            {truncateText(judul)}
          </button>
          <DetailsDialog 
            open={open} 
            onOpenChange={setOpen} 
            report={row.original} 
          />
        </>
      );
    },
  },
  {
  accessorKey: "jenisInfrastruktur",
  header: "Jenis Infrastruktur",
  cell: ({ row }) => {
    const [open, setOpen] = useState(false);
    const jenisInfrastruktur = row.getValue("jenisInfrastruktur") as string;

    return (
      <div className="w-32">
        <button 
          onClick={() => setOpen(true)} 
          className="text-muted-foreground px-1.5 text-left text-sm border border-border rounded-md w-full hover:underline"
        >
          {truncateText(jenisInfrastruktur)}
        </button>

        <DetailsDialog 
          open={open} 
          onOpenChange={setOpen} 
          report={row.original} 
        />
      </div>
    );
  },
},
  {
    accessorKey: "cuaca",
    header: "Cuaca",
  },
  {
    accessorKey: "kerusakan",
    header: ({ column }) => (
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
    ),
    cell: ({ getValue }) => (
      <div className="text-center w-full">{getValue() as string}</div>
    ),
  },
  {
    accessorKey: "lokasi",
    header: "Lokasi",
    cell: ({ row }) => {
      const [open, setOpen] = useState(false);
      const lokasi = row.getValue("lokasi") as string;
      
      return (
        <>
          <button 
            onClick={() => setOpen(true)}
            className="text-left hover:underline"
          >
            {truncateText(lokasi)}
          </button>
          <DetailsDialog 
            open={open} 
            onOpenChange={setOpen} 
            report={row.original} 
          />
        </>
      );
    },
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
              "p-1 rounded-md w-max text-xs",
              status === "selesai" && "bg-blue-300/40 text-blue-800 dark:bg-red-300/50 dark:text-slate-50",
              status === "disembunyikan" && "bg-gray-400/40 text-gray-800 dark:bg-indigo-300/50 dark:text-slate-50"
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
      const [open, setOpen] = useState(false);
      const pengaduan = row.original;

      const handleStatusChange = (id: string, newStatus: string) => {
        console.log(`Mengubah status pengaduan ${id} menjadi ${newStatus}`);
      };

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              
              <DropdownMenuItem onClick={() => setOpen(true)}>
                View details
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Change Status</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onClick={() => handleStatusChange(pengaduan.id, "selesai")}>
                    Selesai
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleStatusChange(pengaduan.id, "disembunyikan")}>
                    Disembunyikan
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </DropdownMenuContent>
          </DropdownMenu>
          <DetailsDialog 
            open={open} 
            onOpenChange={setOpen} 
            report={pengaduan} 
          />
        </>
      );
    },
  }
];