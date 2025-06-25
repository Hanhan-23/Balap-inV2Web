// components/data_laporan/TableCellViewer.tsx
"use client";

import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useIsMobile } from "@/hooks/use-mobile";
import { z } from "zod";
import { schemaLaporan } from "@/types/laporan-schema";
import Image from "next/image";
import { ReactNode } from "react";

interface TableCellViewerProps {
  item: z.infer<typeof schemaLaporan>;
  triggerContent: ReactNode;
}

export default function TableCellViewer({
  item,
  triggerContent,
}: TableCellViewerProps) {
  const isMobile = useIsMobile();

  return (
    <Drawer direction={isMobile ? "bottom" : "right"}>
      <DrawerTrigger asChild>{triggerContent}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>{item.judul}</DrawerTitle>
          <div>
            <Image
              src={item.gambar || "/placeholder.jpg"}
              width={100}
              height={100}
              className="w-full aspect-video rounded-xl object-cover object-center"
              alt="gambar pengaduan"
            />
          </div>
        </DrawerHeader>

        <div className="flex flex-col gap-4 px-4 pb-4 text-sm">
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="judul">Judul Pengaduan</Label>
              <Input id="judul" defaultValue={item.judul} readOnly />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="jenis">Jenis Infrastruktur</Label>
                <Input id="jenis" defaultValue={item.jenis} readOnly />
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="status">Status</Label>
                <Select defaultValue={item.status}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih status" />
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
                  readOnly
                />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Label htmlFor="alamat">Lokasi</Label>
              <Textarea
                id="alamat"
                defaultValue={item.alamat}
                readOnly
                className="resize-none"
              />
            </div>
          </form>
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
