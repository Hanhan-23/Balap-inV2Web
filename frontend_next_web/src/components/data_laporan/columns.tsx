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

import {
  CloudRainIcon,
  SunIcon,
  RoadHorizonIcon,
  LightbulbIcon,
  BridgeIcon,
} from "@phosphor-icons/react";

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

import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { useIsMobile } from "@/hooks/use-mobile";
import { z } from "zod";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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

export const schema = z.object({
  id: z.string(),
  tanggal: z.string(),
  judul: z.string(),
  jenisInfrastruktur: z.string(),
  cuaca: z.string(),
  kerusakan: z.string(),
  lokasi: z.string(),
  status: z.string(),
});

const truncateText = (text: string, maxLength: number = 25) => {
  if (!text) return "";
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
};

export const columns: ColumnDef<z.infer<typeof schema>>[] = [
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
    cell: ({ row }) => <TableCellViewer item={row.original} />,
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
          <div
            className={
              "inline-flex items-center gap-1 px-2 py-1 text-muted-foreground text-xs capitalize border border-slate-300 rounded-full"
            }
          >
            {jenisInfrastruktur === "jalan" && (
              <RoadHorizonIcon
                size={14}
                weight="bold"
                className="text-stone-600"
              />
            )}
            {jenisInfrastruktur === "lampu_jalan" && (
              <LightbulbIcon
                size={14}
                weight="bold"
                className="text-yellow-500"
              />
            )}
            {jenisInfrastruktur === "jembatan" && (
              <BridgeIcon size={14} weight="bold" className="text-amber-600" />
            )}
            {jenisInfrastruktur.replace("_", " ")}
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
    cell: ({}) => {
      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40" align="end">
              <DropdownMenuItem>View details</DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Change Status</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>Selesai</DropdownMenuItem>
                  <DropdownMenuItem>Disembunyikan</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
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
          {item.tanggal}
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
                  defaultValue={item.jenisInfrastruktur}
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
                <Label htmlFor="status">Status</Label>
                <Select defaultValue={item.status}>
                  <SelectTrigger id="status" className="w-full">
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="selesai">Selesai</SelectItem>
                    <SelectItem value="disembunyikan">Disembunyikan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="kerusakan">Kerusakan</Label>
                <Input
                  id="kerusakan"
                  defaultValue={item.kerusakan}
                  className="capitalize"
                  readOnly
                />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Label htmlFor="lokasi">Lokasi</Label>
              <Textarea value={item.lokasi} className="resize-none" readOnly />
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
