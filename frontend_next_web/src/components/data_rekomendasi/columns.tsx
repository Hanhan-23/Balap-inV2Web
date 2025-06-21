"use client";

import { useState } from "react";
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

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  CloudRainIcon,
  SunIcon,
  RoadHorizonIcon,
  LightbulbIcon,
  BridgeIcon,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { z } from "zod";
import { Label } from "@/components/ui/label";

export type Recommended = {
  id: number;
  judul: string;
  jenis: string;
  alamat: string;
  cuaca: string;
  tingkat_urgent: "tinggi" | "sedang" | "rendah";
  status_rekom: "belum_divalidasi" | "divalidasi" | "diproses" | "selesai";
  status_urgent: string;
};

export const schema = z.object({
  id: z.number(),
  judul: z.string(),
  jenis: z.string(),
  alamat: z.string(),
  cuaca: z.string(),
  tingkat_urgent: z.string(),
  status_rekom: z.string(),
  status_urgent: z.string(),
});

const handleStatusChange = (id: number, newStatus: string) => {
  // Implementasi logika untuk mengubah status pengaduan
  console.log(`Mengubah status pengaduan ${id} menjadi ${newStatus}`);
  // Biasanya di sini akan ada API call untuk update status
};

export const columns: ColumnDef<z.infer<typeof schema>>[] = [
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
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="!p-0 hover:bg-transparent"
        >
          Judul
          <div className="p-2 hover:bg-slate-100 rounded-full">
            <ArrowUpDown className="size-3.5" />
          </div>
        </Button>
      ),
      cell: ({ row }) => <TableCellViewer item={row.original} />,
      enableHiding: false,
    },
  {
    accessorKey: "jenis",
    header: "Jenis Infrastruktur",
    cell: ({ row }) => {
      const jenis = row.getValue("jenis") as string;

      return (
        <div className="w-full">
          <div
            className={
              "inline-flex items-center gap-1 px-2 py-1 text-muted-foreground text-xs capitalize border border-slate-300 rounded-full"
            }
          >
            {jenis === "jalan" && (
              <RoadHorizonIcon
                size={14}
                weight="bold"
                className="text-stone-600"
              />
            )}
            {jenis === "lampu_jalan" && (
              <LightbulbIcon
                size={14}
                weight="bold"
                className="text-yellow-500"
              />
            )}
            {jenis === "jembatan" && (
              <BridgeIcon size={14} weight="bold" className="text-amber-600" />
            )}
            {jenis.replace("_", " ")}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "cuaca",
    header: "Cuaca",
    cell: ({ row }) => {
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
    accessorKey: "alamat",
    header: "Alamat",
  },
  {
    accessorKey: "status_urgent",
    header: ({ column }) => (
      <div className="flex justify-center w-full">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="mx-auto"
        >
          Tingkat Urgensi
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ getValue }) => (
      <div className="text-center w-full">{getValue() as string}</div>
    ),
  },
  {
    accessorKey: "tingkat_urgent",
    header: "Tingkat Urgensi ",
    cell: ({ row }) => {
      const status = row.getValue("tingkat_urgent") as string;

      return (
        <div className="flex items-center gap-2">
          <div
            className={cn(
              "px-1.5 py-1 rounded-full w-max text-xs capitalize",
              status === "tinggi" &&
                "bg-red-200 text-red-600 dark:bg-red-300/50 dark:text-slate-50",
              status === "sedang" &&
                "bg-orange-200 text-orange-600 dark:bg-indigo-300/50 dark:text-slate-50",
              status === "rendah" &&
                "bg-green-200 text-green-800 dark:bg-orange-300/50 dark:text-slate-50"
            )}
          >
            {status}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "status_rekom",
    header: "Status Rekomendasi ",
    cell: ({ row }) => {
      const status = row.getValue("status_rekom") as string;

      return (
        <div className="flex items-center gap-2">
          <div
            className={cn(
              "px-1.5 py-1 rounded-full w-max text-xs capitalize",
              status === "belum_divalidasi" &&
                "bg-zinc-200 text-zinc-700 dark:bg-zinc-400/20 dark:text-zinc-100",
              status === "divalidasi" &&
                "bg-indigo-200 text-indigo-700 dark:bg-indigo-400/20 dark:text-indigo-100",
              status === "diproses" &&
                "bg-blue-200 text-blue-700 dark:bg-blue-400/20 dark:text-blue-100",
              status === "selesai" &&
                "bg-teal-200 text-teal-800 dark:bg-teal-400/20 dark:text-teal-100"
            )}
          >
            {status.replace("_", " ")}
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
              onClick={() =>
                navigator.clipboard.writeText(pengaduan.id.toString())
              }
            >
              Copy Pengaduan ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View details</DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Change Status</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                {["belum_divalidasi", "divalidasi", "diproses", "selesai"].map(
                  (status) => (
                    <DropdownMenuItem
                      key={status}
                      onClick={() => {
                        if (!pengaduan?.id) return;
                        handleStatusChange(
                          pengaduan.id,
                          status as Recommended["status_rekom"]
                        );
                      }}
                    >
                      {status.replaceAll("_", " ")}
                    </DropdownMenuItem>
                  )
                )}
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

function TableCellViewer({ item }: { item: z.infer<typeof schema> }) {
  const isMobile = useIsMobile();
  return (
    <Drawer direction={isMobile ? "bottom" : "right"}>
      <DrawerTrigger asChild>
        <Button variant="link" className="text-foreground w-fit px-0 text-left">
          {item.judul}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>{item.judul}</DrawerTitle>
          <div>
            <Image
              src={"/jembatan_rusak.jpg"}
              width={100}
              height={100}
              className="w-full aspect-video rounded-xl object-cover object-center pointer-events-none"
              alt="..."
            />
          </div>
        </DrawerHeader>
        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="judul">Judul Pengaduan</Label>
              <Input id="judul" defaultValue={item.judul} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="jenisInfrastruktur">Jenis Infrastruktur</Label>
                <Input
                  id="jenisInfrastruktur"
                  defaultValue={item.jenis}
                  className="capitalize"
                  readOnly
                />
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="cuaca">Cuaca</Label>
                <Input
                  id="cuaca"
                  defaultValue={item.cuaca}
                  className="capitalize"
                  readOnly
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="status_rekom">Status</Label>
                <Select defaultValue={item.status_rekom}>
                  <SelectTrigger id="status_rekom" className="w-full">
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="belum_divalidasi">Belum Divalidasi</SelectItem>
                    <SelectItem value="divalidasi">Divalidasi</SelectItem>
                    <SelectItem value="diproses">Diproses</SelectItem>
                    <SelectItem value="selesai">Selesai</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="status_urgent">Status Urgensi</Label>
                <Input
                  id="status_urgent"
                  defaultValue={item.status_urgent}
                  className="capitalize"
                  readOnly
                />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Label htmlFor="lokasi">Alamat</Label>
              <Textarea value={item.alamat} className="resize-none" readOnly />
            </div>

            {/* peta lokasi */}
          </form>
        </div>
        <DrawerFooter>
          <Button variant={"blue"}>Konfirmasi</Button>
          <DrawerClose asChild>
            <Button variant="outline">Selesai</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
