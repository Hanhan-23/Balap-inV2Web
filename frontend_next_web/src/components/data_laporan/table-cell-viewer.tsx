"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useIsMobile } from "@/hooks/use-mobile";
import Image from "next/image";
import { toggleStatusLaporan } from "@/services/datalaporanservices";
import { LaporanDetail } from "@/types/data-laporan";

interface TableCellViewerProps {
  item: LaporanDetail;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  // ubah: argumen ketiga
  onStatusUpdated: (
    id: string,
    status: string,
    result?: "success" | "error"
  ) => void;
}

export default function TableCellViewer({
  item,
  open,
  onOpenChange,
  onStatusUpdated,
}: TableCellViewerProps) {
  const isMobile = useIsMobile();

  const handleConfirmStatus = async () => {
    const nextStatus =
      item.status === "Ditampilkan" ? "Disembunyikan" : "Ditampilkan";
    try {
      await toggleStatusLaporan(item.id);
      onStatusUpdated(item.id, nextStatus, "success");
      onOpenChange(false);
    } catch (error) {
      console.error("Gagal update status:", error);
      onStatusUpdated(item.id, item.status, "error");
    }
  };

  return (
    <Drawer
      open={open}
      onOpenChange={onOpenChange}
      direction={isMobile ? "bottom" : "right"}
    >
      <DrawerContent className="bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 transition-colors">
        <DrawerHeader className="gap-2">
          <DrawerTitle className="text-lg font-semibold">
            {item.judul}
          </DrawerTitle>
          <Image
            src={item.gambar || "/placeholder.jpg"}
            width={100}
            height={100}
            alt="Gambar Laporan"
            className="w-full aspect-video rounded-xl object-cover border border-gray-200 dark:border-zinc-700"
          />
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto max-h-[70vh] px-4 pb-6 text-sm flex flex-col gap-4">
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="judul" className="text-sm text-muted-foreground">
                Judul
              </Label>
              <Input
                id="judul"
                value={item.judul}
                readOnly
                className="bg-white dark:bg-zinc-800 border-gray-300 dark:border-zinc-700"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="deskripsi"
                className="text-sm text-muted-foreground"
              >
                Deskripsi
              </Label>
              <Textarea
                id="deskripsi"
                value={item.deskripsi}
                readOnly
                className="resize-none bg-white dark:bg-zinc-800 border-gray-300 dark:border-zinc-700"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="jenis"
                  className="text-sm text-muted-foreground"
                >
                  Jenis Infrastruktur
                </Label>
                <Input
                  id="jenis"
                  value={item.jenis.replace(/_/g, " ")}
                  readOnly
                  className="capitalize bg-white dark:bg-zinc-800 border-gray-300 dark:border-zinc-700"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="status"
                  className="text-sm text-muted-foreground"
                >
                  Status
                </Label>
                <Input
                  id="status"
                  value={item.status}
                  readOnly
                  className="capitalize bg-white dark:bg-zinc-800 border-gray-300 dark:border-zinc-700"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="alamat" className="text-sm text-muted-foreground">
                Lokasi
              </Label>
              <Textarea
                id="alamat"
                value={item.alamat || ""}
                readOnly
                className="resize-none bg-white dark:bg-zinc-800 border-gray-300 dark:border-zinc-700"
              />
            </div>
          </form>
        </div>

        <DrawerFooter className="border-t border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 px-6 py-4">
          <Button variant="blue" onClick={handleConfirmStatus}>
            Konfirmasi
          </Button>
          <DrawerClose asChild>
            <Button variant="outline">Selesai</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
