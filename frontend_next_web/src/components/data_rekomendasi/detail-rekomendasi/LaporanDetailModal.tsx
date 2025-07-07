// components/data_rekomendasi/LaporanDetailModal.tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Calendar, MapPin } from "lucide-react";

interface LaporanDetail {
  id: string;
  judul: string;
  jenis: string;
  deskripsi: string;
  gambar: string[];
  status: string;
  tgl_lapor: string;
  peta: {
    alamat: string;
    jalan: string;
    latitude: number;
    longitude: number;
  };
}

interface LaporanDetailModalProps {
  laporan: LaporanDetail | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function LaporanDetailModal({
  laporan,
  open,
  onOpenChange,
}: LaporanDetailModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">{laporan?.judul}</DialogTitle>
          <DialogDescription className="flex items-center gap-2">
            <span className="text-sm px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-700 dark:text-gray-200">
              {laporan?.jenis}
            </span>
            <span className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <Calendar className="h-4 w-4 mr-1" />
              {laporan?.tgl_lapor
                ? new Date(laporan.tgl_lapor).toLocaleDateString()
                : "-"}
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 mt-1 text-gray-500" />
            <div>
              <p className="font-medium text-gray-700 dark:text-gray-300">
                Lokasi:
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {laporan?.peta.alamat || "Tidak ada alamat"}
              </p>
            </div>
          </div>

          <div>
            <p className="font-medium text-gray-700 dark:text-gray-300 mb-2">
              Deskripsi:
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {laporan?.deskripsi || "Tidak ada deskripsi"}
            </p>
          </div>

          {laporan?.gambar && laporan.gambar.length > 0 && (
            <div>
              <p className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                Dokumentasi:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {laporan.gambar.map((url, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-square rounded-md overflow-hidden"
                  >
                    <Image
                      src={url}
                      alt={`Dokumentasi ${idx + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
