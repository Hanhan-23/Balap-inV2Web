"use client";

import { ReactNode } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import {
  RoadHorizonIcon,
  LightbulbIcon,
  BridgeIcon,
} from "@phosphor-icons/react";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

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
import { toggleStatusLaporan } from "@/services/datalaporanservices";
import { Item } from "@radix-ui/react-dropdown-menu";

export const schema = z.object({
  id: z.string(),
  gambar: z.string(),
  tgl_lapor: z.string(),
  judul: z.string(),
  jenis: z.string(),
  persentase: z.string(),
  alamat: z.string(),
  status: z.string(),
});

const truncateText = (text: string, maxLength: number = 25) => {
  if (!text) return "";
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
};

const handleStatus = async (id: string) => {
  await toggleStatusLaporan(id);

  window.location.reload();
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
    accessorKey: "tgl_lapor",
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
    cell: ({ row }) => 
    <TableCellViewer
      item={row.original}
      triggerContent={
        <Button
          variant="link"
          className="hover:underline p-0 h-auto"
        >
          {row.original.tgl_lapor.substring(0, 10)}
        </Button>
      }
    />,
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
          <Button
            variant={"ghost"}
            onClick={() => setOpen(true)}
            className="text-left hover:underline"
          >
            {truncateText(judul)}
          </Button>
        </div>
      );
    },
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
    accessorKey: "persentase",
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
    accessorKey: "alamat",
    header: "Lokasi",
    cell: ({ row }) => {
      const [open, setOpen] = useState(false);
      const alamat = row.getValue("alamat") as string;

      return (
        <div className="w-full">
          <button
            onClick={() => setOpen(true)}
            className="text-left hover:underline"
          >
            {truncateText(alamat)}
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
    cell: ({ row }: any) => {
      const item = row.original;

      const status = item.status;
      const finalStatus = () => {
        if (status == "selesai") {
          return "Sembunyikan";
        } else if (status == "disembunyikan") {
          return "Tampilkan";
        }
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
            <DropdownMenuContent className="w-40" align="end">
              <DropdownMenuItem>View details</DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Change Status</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem
                    onClick={() => {
                      console.log(item.id);
                      handleStatus(item.id);
                    }}
                  >
                    {finalStatus()}
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      );
    },
  },
];

type TableCellViewerProps = {
  item: z.infer<typeof schema>;
  triggerContent: ReactNode;
};

function TableCellViewer({ item, triggerContent }: TableCellViewerProps) {
  const isMobile = useIsMobile();
  return (
    <Drawer direction={isMobile ? "bottom" : "right"}>
      <DrawerTrigger asChild>{triggerContent}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>{item.judul}</DrawerTitle>
          <div>
            <Image
              src={`${item.gambar}`}
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
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="persentase">Kerusakan</Label>
                <Input
                  id="persentase"
                  defaultValue={item.persentase}
                  className="capitalize"
                  readOnly
                />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Label htmlFor="alamat">Lokasi</Label>
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
