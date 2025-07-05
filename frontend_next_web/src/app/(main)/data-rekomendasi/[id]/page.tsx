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
import { cardDetailRekomendasi } from "@/types/data-rekomendasi";
import MapComponentRekomendasi from "@/components/data_rekomendasi/Map";
import StatusBadge from "@/components/data_rekomendasi/status-badge";

type StatusRekom = "belum_valid" | "valid" | "proses" | "selesai";

export default function RecommendationDetail() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [recommendation, setRecommendation] = useState<cardDetailRekomendasi>();
  const [status, setStatus] = useState<StatusRekom>("belum_valid");
  const [loading, setLoading] = useState(true);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

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

  return (
    <div className="mb-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => router.back()}
        className="text-sm text-gray-600 hover:text-black border-gray-300 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:border-gray-600 dark:hover:bg-gray-700"
      >
        <ChevronLeft className="h-4 w-4 mr-2" />
        Kembali
      </Button>

      <div className="bg-white mt-2 dark:bg-gray-800 rounded-lg border dark:border-gray-700 shadow-xl p-6 mb-8">
        <h1 className="text-2xl font-bold mb-4 dark:text-white">
          {recommendation.laporan.judul}
        </h1>

        <div className="flex items-center gap-2 mb-4">
          <span className="font-medium dark:text-gray-200">Jenis:</span>
          <span className="text-sm px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-700 dark:text-gray-200">
            {recommendation.laporan.jenis}
          </span>
          <span className="font-medium dark:text-gray-200">Jumlah Laporan :</span>
          <span className="dark:text-gray-300">{recommendation.jumlah_laporan}</span>
        </div>

        <p className="mb-2 text-gray-700 dark:text-gray-300">
          <span className="font-medium">Lokasi:</span>{" "}
          {recommendation.laporan.peta.alamat}
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

        {/* Dokumentasi Foto */}
        <h3 className="font-medium mb-2 dark:text-gray-100">Dokumentasi Laporan:</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {Array.isArray(recommendation.laporan.gambar) && recommendation.laporan.gambar.length > 0 ? (
            recommendation.laporan.gambar.map((url: string, idx: number) => (
              <div key={idx} className="rounded-lg overflow-hidden shadow-md">
                <div className="relative aspect-square w-full h-32">
                  <Image
                    src={url}
                    alt={recommendation.laporan.judul}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-2 capitalize bg-gray-50 dark:bg-gray-700 text-center text-xs text-gray-600 dark:text-gray-300">
                  {recommendation.laporan.judul}
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
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4 dark:text-white">Rencana Tindakan</h2>
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
            <h3 className="font-medium mb-2 dark:text-blue-200">1. Pemeriksaan Lapangan</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Tim akan melakukan pemeriksaan lapangan dalam 3 hari kerja.
            </p>
          </div>
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
            <h3 className="font-medium mb-2 dark:text-yellow-200">2. Penyusunan Rencana</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Penyusunan rencana perbaikan berdasarkan hasil pemeriksaan.
            </p>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
            <h3 className="font-medium mb-2 dark:text-green-200">3. Pelaksanaan Perbaikan</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Perbaikan akan dilaksanakan sesuai jadwal yang ditentukan.
            </p>
          </div>
        </div>
      </div>

      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Status berhasil diubah menjadi {recommendation.status_rekom}! </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button onClick={() => setShowSuccessDialog(false)}>Tutup</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
