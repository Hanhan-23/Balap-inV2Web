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

import { CloudRainIcon, SunIcon } from "@phosphor-icons/react";

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
      <div className="flex items-center justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "tanggal",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="!p-0 hover:bg-transparent"
      >
        Tanggal
        <div className="p-2 hover:bg-slate-100 rounded-full">
          <ArrowUpDown className="size-3.5" />
        </div>
      </Button>
    ),
    cell: ({ getValue }) => (
      <div className="w-full">{getValue() as string}</div>
    ),
    enableHiding: false,
  },
  {
    accessorKey: "judul",
    header: "Judul Pengaduan",
    cell: ({ row }) => {
      const [open, setOpen] = useState(false);
      const judul = row.getValue("judul") as string;

      return (
        <div className="w-full">
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
        </div>
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
        <div className="w-full">
          {" "}
          <p className="capitalize">{truncateText(jenisInfrastruktur)}</p>
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
    cell: ({ row }) => {
      const [open, setOpen] = useState(false);
      const cuaca = row.getValue("cuaca") as string;

      return (
        <div className="w-full">
          <div
            className={
              "inline-flex gap-1 items-center px-2 py-1 text-left text-xs text-muted-foreground capitalize border border-slate-300 rounded-full "
            }
          >
            {cuaca === "cerah" && (
              <SunIcon size={14} weight="bold" className="text-yellow-500" />
            )}
            {cuaca === "hujan" && (
              <CloudRainIcon size={14} weight="bold" className="text-sky-600" />
            )}
            {cuaca as string}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "kerusakan",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="hover:bg-transparent !p-0"
      >
        Kerusakan
        <div className="p-2 hover:bg-slate-100 rounded-full">
          <ArrowUpDown className="size-3.5" />
        </div>
      </Button>
    ),
    cell: ({ getValue }) => <p>{getValue() as string}</p>,
  },
  {
    accessorKey: "lokasi",
    header: "Lokasi",
    cell: ({ row }) => {
      const [open, setOpen] = useState(false);
      const lokasi = row.getValue("lokasi") as string;

      return (
        <div className="w-full">
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
        </div>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");
      return (
        <div className="w-full">
          <div
            className={cn(
              "px-2 py-1 text-left text-xs capitalize rounded-full inline-block",
              status === "selesai" &&
                "bg-green-200 text-green-600 dark:bg-red-300/50 dark:text-slate-50",
              status === "disembunyikan" &&
                "bg-gray-200 text-gray-600 dark:bg-stone-800 dark:text-neutral-300"
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
                  <DropdownMenuItem
                    onClick={() => handleStatusChange(pengaduan.id, "selesai")}
                  >
                    Selesai
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      handleStatusChange(pengaduan.id, "disembunyikan")
                    }
                  >
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
  },
];
