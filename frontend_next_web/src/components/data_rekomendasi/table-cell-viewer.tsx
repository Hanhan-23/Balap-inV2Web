// components/data_rekomendasi/TableCellViewer.tsx
"use client";

import Image from "next/image";
import { useIsMobile } from "@/hooks/use-mobile";
import { rekomendasi } from "@/types/rekomendasi-schema";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function TableCellViewer({ item }: { item: rekomendasi }) {
  const isMobile = useIsMobile();

  return (
    <Drawer direction={isMobile ? "bottom" : "right"}>
      <DrawerTrigger asChild>
        <Button variant="link" className="text-left p-0">
          {item.laporan.judul.length > 25
            ? item.laporan.judul.slice(0, 25) + "..."
            : item.laporan.judul}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{item.laporan.judul}</DrawerTitle>
          <Image
            src="/jembatan_rusak.jpg"
            width={100}
            height={100}
            alt="..."
            className="w-full aspect-video rounded-xl object-cover"
          />
        </DrawerHeader>
        <div className="p-4 text-sm flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            <Label htmlFor="judul">Judul Pengaduan</Label>
            <Input id="judul" defaultValue={item.laporan.judul} readOnly />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="jenis">Jenis Infrastruktur</Label>
              <Input id="jenis" defaultValue={item.laporan.jenis} readOnly />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="status">Status</Label>
              <Select defaultValue={item.status_rekom}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="belum_valid">Belum Valid</SelectItem>
                  <SelectItem value="valid">Valid</SelectItem>
                  <SelectItem value="proses">Proses</SelectItem>
                  <SelectItem value="selesai">Selesai</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="alamat">Alamat</Label>
            <Textarea defaultValue={item.laporan.alamat} readOnly />
          </div>
        </div>
        <DrawerFooter>
          <Button variant="blue">Konfirmasi</Button>
          <DrawerClose asChild>
            <Button variant="outline">Selesai</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
