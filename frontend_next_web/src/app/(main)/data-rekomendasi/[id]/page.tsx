"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getPetaBeranda } from "@/services/berandaservices";
import {
  updateStatusRekomendasi,
  getDetailRekomendasi,
} from "@/services/datarekomendasiservices";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogFooter } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { cardDetailRekomendasi } from "@/types/data-rekomendasi";
import MapComponentRekomendasi from "@/components/data_rekomendasi/Map";
import StatusBadge from "@/components/data_rekomendasi/status-badge";
import { motion } from "framer-motion";
import { MapPin, Wrench, CheckCircle, Calendar } from "lucide-react";

type StatusRekom = "belum_valid" | "valid" | "proses" | "selesai";

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

export default function RecommendationDetail() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [recommendation, setRecommendation] = useState<cardDetailRekomendasi>();
  const [status, setStatus] = useState<StatusRekom>("belum_valid");
  const [loading, setLoading] = useState(true);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [selectedLaporan, setSelectedLaporan] = useState<LaporanDetail | null>(null);
  const [showLaporanDetail, setShowLaporanDetail] = useState(false);

  useEffect(() => {
    setLoading(true);
    getDetailRekomendasi(id)
      .then((data) => {
        setRecommendation(data);
        setStatus(data.status_rekom as StatusRekom);
      })
      .finally(() => setLoading(false));

    getPetaBeranda().catch((err) =>
      console.error("Gagal mengambil peta:", err)
    );
  }, [id]);

  const handleChangeStatus = async (newStatus: StatusRekom) => {
    if (!recommendation) return;
    try {
      await updateStatusRekomendasi(recommendation.id, {
        status_rekom: newStatus,
      });
      setStatus(newStatus);
      setRecommendation({ ...recommendation, status_rekom: newStatus });
      setShowSuccessDialog(true);
    } catch (err) {
      alert(`Gagal mengubah status: ${err}`);
    }
  };

  const openLaporanDetail = (laporan: any) => {
    setSelectedLaporan({
      id: laporan.id,
      judul: laporan.judul,
      jenis: laporan.jenis,
      deskripsi: laporan.deskripsi,
      gambar: Array.isArray(laporan.gambar) ? laporan.gambar : [],
      status: laporan.status,
      tgl_lapor: laporan.tgl_lapor,
      peta: laporan.peta
    });
    setShowLaporanDetail(true);
  };

  if (loading || !recommendation) {
    return (
      <div className="p-8 text-center dark:text-gray-200">
        Memuat detail rekomendasi...
      </div>
    );
  }

  function StatusUrgentBadge({ value }: { value: string }) {
    return <StatusBadge type="urgent" value={value} />;
  }

  // Mengumpulkan semua gambar dari semua laporan
  const allImages = recommendation.laporan.flatMap(laporan => 
    Array.isArray(laporan.gambar) ? laporan.gambar : []
  );

  // Menggunakan laporan pertama untuk data utama (judul, jenis, alamat)
  const firstReport = recommendation.laporan[0];

  return (
    <div className="mb-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => router.back()}
        className="text-sm shadow-md dark:shadow-[0_2px_4px_rgba(255,255,255,0.2)] text-gray-600 hover:text-black border-gray-300 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:border-gray-600 dark:hover:bg-gray-700"
      >
        <ChevronLeft className="h-4 w-4 mr-2" />
        Kembali
      </Button>

      <div className="bg-white capitalize shadow-xl dark:shadow-[0_4px_10px_rgba(255,255,255,0.2)] mt-2 dark:bg-stone-950 rounded-lg border dark:border-gray-700 p-6 mb-8">
        <h1 className="text-2xl font-bold mb-4 dark:text-white">
          {firstReport.judul}
        </h1>

        <div className="flex items-center gap-2 mb-4">
          <span className="font-medium dark:text-gray-200">Jenis:</span>
          <span className="text-sm px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-700 dark:text-gray-200">
            {firstReport.jenis}
          </span>
          <span className="font-medium dark:text-gray-200">Jumlah Laporan :</span>
          <span className="dark:text-gray-300">{recommendation.jumlah_laporan}</span>
        </div>

        <p className="mb-2 text-gray-700 dark:text-gray-300">
          <span className="font-medium">Lokasi:</span>{" "}
          {firstReport.peta.alamat}
        </p>

        <div className="flex flex-wrap items-center gap-6 mb-6">
          <div className="flex items-center gap-2">
            <span className="font-medium dark:text-gray-200">Tingkat Urgensi:</span>
            <span className="dark:text-gray-300">
              {(Number(recommendation.tingkat_urgent) * 100).toFixed(2)}%
            </span>
            <StatusUrgentBadge value={recommendation.status_urgent} />
          </div>

          <div className="flex items-center gap-2">
            <span className="font-medium dark:text-gray-200">Status Rekomendasi:</span>
            <StatusBadge type="rekom" value={status} />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="dark:border-gray-600 rounded-full dark:text-gray-200 dark:hover:bg-gray-700"
                >
                  Ubah Status
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="dark:bg-gray-800 dark:border-gray-600">
                {["belum_valid", "valid", "proses", "selesai"].map((s) => (
                  <DropdownMenuItem
                    key={s}
                    onClick={() => handleChangeStatus(s as StatusRekom)}
                    className="capitalize dark:text-gray-100 dark:hover:bg-gray-700"
                  >
                    {s.replace(/_/g, " ")}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Daftar Laporan
        <h3 className="font-medium mb-2 dark:text-gray-100">Daftar Laporan</h3>
        <div className="space-y-2 mb-4">
          {recommendation.laporan.map((laporan, index) => (
            <div 
              key={laporan.id} 
              className="border rounded-lg p-3 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
              onClick={() => openLaporanDetail(laporan)}
            >
              <div className="flex justify-between items-center">
                <h4 className="font-medium dark:text-gray-200">{index + 1}. {laporan.judul}</h4>
                <span className="text-xs px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-700 dark:text-gray-200">
                  {laporan.jenis}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                {laporan.deskripsi}
              </p>
            </div>
          ))}
        </div> */}

        {/* Dokumentasi Foto */}
        <h3 className="font-medium mb-2 dark:text-gray-100">Dokumentasi Laporan:</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {allImages.length > 0 ? (
            allImages.map((url: string, idx: number) => (
              <div 
                key={idx} 
                className="rounded-lg overflow-hidden shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => {
                  // Cari laporan yang memiliki gambar ini
                  const relatedLaporan = recommendation.laporan.find(l => 
                    Array.isArray(l.gambar) && l.gambar.includes(url)
                  );
                  if (relatedLaporan) openLaporanDetail(relatedLaporan);
                }}
              >
                <div className="relative aspect-square w-full h-36">
                  <Image
                    src={url}
                    alt={`Dokumentasi laporan ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-2 capitalize bg-gray-50 dark:bg-gray-700 text-center text-xs text-gray-600 dark:text-gray-300">
                  Laporan {idx + 1}
                </div>
              </div>
            ))
          ) : (
            <div className="text-xs text-gray-500 dark:text-gray-400 col-span-full">
              Tidak ada dokumentasi foto
            </div>
          )}
        </div>

        {/* Peta */}
        <h3 className="font-medium mb-2 text-md mt-4 dark:text-gray-100">Peta Rekomendasi</h3>
        <div className="h-[300px] w-full rounded-lg overflow-hidden mb-6">
          <MapComponentRekomendasi markersBeranda={recommendation} />
        </div>
      </div>

      {/* Rencana Tindakan */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white dark:bg-stone-950 border rounded-lg shadow-lg p-6 dark:shadow-[0_4px_10px_rgba(255,255,255,0.2)]"
      >
        <h2 className="text-xl font-semibold mb-4 dark:text-white">Rencana Tindakan</h2>
        <div className="space-y-4">
          {/* Validasi */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex items-start gap-4"
          >
            <MapPin className="text-blue-500 dark:text-blue-300 mt-1" />
            <div>
              <h3 className="font-medium mb-2 dark:text-blue-200">1. Validasi Laporan</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Status ini menunjukkan bahwa tim pemerintah telah melakukan survei langsung ke lokasi sesuai laporan. 
                Jika ditemukan bahwa kerusakan benar-benar ada di lokasi sebagaimana dilaporkan, maka laporan dinyatakan <strong>Valid</strong> dan dapat dilanjutkan ke tahap perencanaan perbaikan.
              </p>
            </div>
          </motion.div>

          {/* Proses */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg flex items-start gap-4"
          >
            <Wrench className="text-yellow-600 dark:text-yellow-300 mt-1" />
            <div>
              <h3 className="font-medium mb-2 dark:text-yellow-200">2. Proses Perbaikan</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Setelah laporan dari rekomendasi dinyatakan valid, pemerintah akan memulai proses perbaikan sesuai dengan rencana
                yang telah disusun. Status harus di update menjadi <strong>Proses</strong>.
              </p>
            </div>
          </motion.div>

          {/* Selesai */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg flex items-start gap-4"
          >
            <CheckCircle className="text-green-600 dark:text-green-300 mt-1" />
            <div>
              <h3 className="font-medium mb-2 dark:text-green-200">3. Penyelesaian</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Status ini menandakan bahwa seluruh proses perbaikan telah <strong>diselesaikan</strong>, dan kondisi infrastruktur di lokasi tersebut telah ditangani sesuai laporan yang masuk.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Modal Detail Laporan */}
      <Dialog open={showLaporanDetail} onOpenChange={setShowLaporanDetail}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl">{selectedLaporan?.judul}</DialogTitle>
            <DialogDescription className="flex items-center gap-2">
              <span className="text-sm px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-700 dark:text-gray-200">
                {selectedLaporan?.jenis}
              </span>
              <span className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <Calendar className="h-4 w-4 mr-1" />
                {selectedLaporan?.tgl_lapor ? new Date(selectedLaporan.tgl_lapor).toLocaleDateString() : '-'}
              </span>
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">  
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-1 text-gray-500" />
              <div>
                <p className="font-medium text-gray-700 dark:text-gray-300">Lokasi:</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {selectedLaporan?.peta.alamat || 'Tidak ada alamat'}
                </p>
              </div>
            </div>

            <div>
              <p className="font-medium text-gray-700 dark:text-gray-300 mb-2">Deskripsi:</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {selectedLaporan?.deskripsi || 'Tidak ada deskripsi'}
              </p>
            </div>

            {selectedLaporan?.gambar && selectedLaporan.gambar.length > 0 && (
              <div>
                <p className="font-medium text-gray-700 dark:text-gray-300 mb-2">Dokumentasi:</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {selectedLaporan.gambar.map((url, idx) => (
                    <div key={idx} className="relative aspect-square rounded-md overflow-hidden">
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

      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Status berhasil diubah menjadi {status}! </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button onClick={() => setShowSuccessDialog(false)}>Tutup</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
