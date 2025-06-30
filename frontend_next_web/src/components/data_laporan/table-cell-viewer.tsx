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
  onStatusUpdated: (id: string, status: string) => void;
}

export default function TableCellViewer({
  item,
  open,
  onOpenChange,
  onStatusUpdated,
}: TableCellViewerProps) {
  const isMobile = useIsMobile();

  const handleConfirmStatus = async () => {
    const nextStatus = item.status === "selesai" ? "disembunyikan" : "selesai";
    try {
      await toggleStatusLaporan(item.id);
      onStatusUpdated(item.id, nextStatus);
      onOpenChange(false);
    } catch (error) {
      console.error("Gagal update status:", error);
      alert("Gagal update status laporan.");
    }
  };

  return (
    <Drawer
      open={open}
      onOpenChange={onOpenChange}
      direction={isMobile ? "bottom" : "right"}
    >
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>{item.judul}</DrawerTitle>
          <Image
            src={item.gambar || "/placeholder.jpg"}
            width={100}
            height={100}
            alt="Gambar Laporan"
            className="w-full aspect-video rounded-xl object-cover"
          />
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto max-h-[70vh] p-4 text-sm flex flex-col gap-4">
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="judul">Judul</Label>
              <Input id="judul" value={item.judul} readOnly />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="deskripsi">Deskripsi</Label>
              <Textarea
                id="deskripsi"
                value={item.deskripsi}
                readOnly
                className="resize-none"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="jenis">Jenis Infrastruktur</Label>
                <Input
                  id="jenis"
                  value={item.jenis}
                  readOnly
                  className="capitalize"
                />
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="status">Status</Label>
                <Input
                  id="status"
                  value={item.status}
                  readOnly
                  className="capitalize"
                />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="alamat">Lokasi</Label>
              <Textarea
                id="alamat"
                value={item.alamat || ""}
                readOnly
                className="resize-none"
              />
            </div>
          </form>
        </div>

        <DrawerFooter>
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
