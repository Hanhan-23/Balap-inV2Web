"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Recommended } from "./columns";

interface DetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  report: Recommended | null;
}

export function DetailsDialog({ open, onOpenChange, report }: DetailsDialogProps) {
  if (!report) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Detail Laporan</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <h3 className="font-medium">Judul:</h3>
            <p>{report.judul}</p>
          </div>
          <div>
            <h3 className="font-medium">Deskripsi Lengkap:</h3>
            <p>{report.deskripsi}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium">Tanggal Laporan:</h3>
              <p>{report.tanggal}</p>
            </div>
            <div>
              <h3 className="font-medium">Cuaca:</h3>
              <p>{report.cuaca}</p>
            </div>
            <div>
              <h3 className="font-medium">Tingkat Kerusakan:</h3>
              <p>{report.kerusakan}</p>
            </div>
            <div>
              <h3 className="font-medium">Status:</h3>
              <p className="capitalize">{report.status}</p>
            </div>
          </div>
          <div>
            <h3 className="font-medium">Lokasi:</h3>
            <p>{report.lokasi || "-"}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}