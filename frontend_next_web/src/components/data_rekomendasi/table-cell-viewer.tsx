"use client";
import { useState } from "react";
import { rekomendasi, StatusRekom } from "@/types/data-rekomendasi";
import { updateStatusRekomendasi } from "@/services/datarekomendasiservices";
import Image from "next/image";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

interface TableCellViewerProps {
  item: rekomendasi;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStatusUpdated: (id: string, status: StatusRekom) => void;
}

const statusList: StatusRekom[] = ["belum_valid", "valid", "proses", "selesai"];

export default function TableCellViewer({
  item,
  open,
  onOpenChange,
  onStatusUpdated,
}: TableCellViewerProps) {
  const isMobile = useIsMobile();
  const [status, setStatus] = useState<StatusRekom>(item.status_rekom);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    if (status === item.status_rekom) {
      onOpenChange(false);
      return;
    }
    setLoading(true);
    try {
      await updateStatusRekomendasi(item.id, { status_rekom: status });
      onStatusUpdated(item.id, status);
      onOpenChange(false);
    } catch {
      alert("Gagal update status rekomendasi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer
      open={open}
      onOpenChange={onOpenChange}
      direction={isMobile ? "bottom" : "right"}
    >
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
            <Input id="judul" value={item.laporan.judul} readOnly />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="jenis">Jenis Infrastruktur</Label>
              <Input id="jenis" value={item.laporan.jenis} readOnly />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="status">Status</Label>
              <Select value={status} onValueChange={val => setStatus(val as StatusRekom)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih status" />
                </SelectTrigger>
                <SelectContent>
                  {statusList.map(s => (
                    <SelectItem key={s} value={s}>
                      {s.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="alamat">Alamat</Label>
            <Textarea value={item.laporan.alamat} readOnly />
          </div>
        </div>
        <DrawerFooter>
          <Button variant="blue" onClick={handleUpdate} disabled={loading}>
            {loading ? "Menyimpan..." : "Konfirmasi"}
          </Button>
          <DrawerClose asChild>
            <Button variant="outline" disabled={loading}>Selesai</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}