"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getPetaBeranda } from "@/services/berandaservices";
import {
  updateStatusRekomendasi,
  getDetailRekomendasi,
} from "@/services/datarekomendasiservices";
import MapComponentRekomendasi from "@/components/data_rekomendasi/Map";
import StatusRekomendasi from "@/components/data_rekomendasi/detail-rekomendasi/StatusRekomendasi";
import LaporanImageGallery from "@/components/data_rekomendasi/detail-rekomendasi/LaporanImageGallery";
import RencanaTindakan from "@/components/data_rekomendasi/detail-rekomendasi/RencanaTindakan";
import LaporanDetailModal from "@/components/data_rekomendasi/detail-rekomendasi/LaporanDetailModal";
// import StatusChangeSuccessDialog from "@/components/data_rekomendasi/detail-rekomendasi/StatusChangeDialog";
import StatusUrgentBadge from "@/components/data_rekomendasi/detail-rekomendasi/StatusUrgentBadge";
import { cardDetailRekomendasi } from "@/types/data-rekomendasi";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { CheckCircleIcon, XCircleIcon } from "@phosphor-icons/react";

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

type ToastAlert = {
  id: number;
  type: "success" | "error";
  message: string;
};

export default function RecommendationDetail() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [recommendation, setRecommendation] = useState<
    cardDetailRekomendasi | undefined
  >();
  const [status, setStatus] = useState<StatusRekom>("belum_valid");
  const [loading, setLoading] = useState(true);

  // Notifikasi/alert state
  const [alerts, setAlerts] = useState<ToastAlert[]>([]);
  const [alertId, setAlertId] = useState(0);

  // Detail modal laporan
  const [selectedLaporan, setSelectedLaporan] = useState<LaporanDetail | null>(
    null
  );
  const [showLaporanDetail, setShowLaporanDetail] = useState(false);

  // --- ALERT HANDLER ---
  const addAlert = (type: "success" | "error", message: string) => {
    const id = alertId + 1;
    setAlertId(id);
    setAlerts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => removeAlert(id), 4000);
  };

  const removeAlert = (id: number) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

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
      addAlert("success", "Status berhasil diubah.");
      // setShowSuccessDialog(true); // Tidak perlu kalau sudah pakai toast
    } catch (err) {
      addAlert("error", `Gagal mengubah status: ${err}`);
    }
  };

  const openLaporanDetail = (laporan: LaporanDetail) => {
    setSelectedLaporan(laporan);
    setShowLaporanDetail(true);
  };

  if (loading || !recommendation) {
    return (
      <div className="p-8 text-center dark:text-gray-200">
        Memuat detail rekomendasi...
      </div>
    );
  }

  const allImages = recommendation?.laporan.flatMap((laporan: LaporanDetail) =>
    Array.isArray(laporan.gambar) ? laporan.gambar : []
  );

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
          <span className="font-medium dark:text-gray-200">
            Jumlah Laporan :
          </span>
          <span className="dark:text-gray-300">
            {recommendation.jumlah_laporan}
          </span>
        </div>

        <p className="mb-2 text-gray-700 dark:text-gray-300">
          <span className="font-medium">Lokasi:</span> {firstReport.peta.alamat}
        </p>

        <div className="flex flex-wrap items-center gap-6 mb-6">
          <div className="flex items-center gap-2">
            <span className="font-medium dark:text-gray-200">
              Tingkat Urgensi:
            </span>
            <span className="dark:text-gray-300">
              {(Number(recommendation.tingkat_urgent) * 100).toFixed(2)}%
            </span>
            <StatusUrgentBadge value={recommendation.status_urgent} />
          </div>
          <StatusRekomendasi
            status={status}
            onChangeStatus={handleChangeStatus}
          />
        </div>

        {/* Dokumentasi Foto */}
        <h3 className="font-medium mb-2 dark:text-gray-100">
          Dokumentasi Laporan:
        </h3>
        <LaporanImageGallery
          images={allImages}
          laporan={recommendation.laporan}
          onClickLaporan={openLaporanDetail}
        />

        {/* Peta */}
        <h3 className="font-medium mb-2 text-md mt-4 dark:text-gray-100">
          Peta Rekomendasi
        </h3>
        <div className="h-[300px] w-full rounded-lg overflow-hidden mb-6">
          <MapComponentRekomendasi markersBeranda={recommendation} />
        </div>
      </div>

      <RencanaTindakan />

      {/* Modal Detail Laporan */}
      <LaporanDetailModal
        laporan={selectedLaporan}
        open={showLaporanDetail}
        onOpenChange={setShowLaporanDetail}
      />

      {/* TOAST ALERT */}
      {alerts.length > 0 && (
        <div className="fixed bottom-6 right-6 z-50 max-w-xs">
          <div className="group relative">
            <Alert
              variant={
                alerts[alerts.length - 1].type === "error"
                  ? "destructive"
                  : "green"
              }
              className={`
          shadow-lg pr-10
          bg-white border border-neutral-200 text-neutral-800
          dark:bg-neutral-900 dark:text-neutral-100 dark:border-neutral-700
          transition-colors
        `}
            >
              {alerts[alerts.length - 1].type === "success" ? (
                <CheckCircleIcon className="h-5 w-5 text-green-500 dark:text-green-400" />
              ) : (
                <XCircleIcon className="h-5 w-5 text-red-500 dark:text-red-400" />
              )}
              <AlertTitle
                className={
                  alerts[alerts.length - 1].type === "success"
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }
              >
                {alerts[alerts.length - 1].type === "success"
                  ? "Berhasil"
                  : "Gagal"}
              </AlertTitle>
              <AlertDescription>
                {alerts[alerts.length - 1].message}
                {alerts.length > 1 && (
                  <span className="ml-2 text-xs font-semibold text-red-500 dark:text-red-400">
                    • Menampilkan {alerts.length} alert
                  </span>
                )}
              </AlertDescription>
              <button
                onClick={() => removeAlert(alerts[alerts.length - 1].id)}
                className="absolute top-1.5 right-2 text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 opacity-0 group-hover:opacity-100 transition"
                style={{ pointerEvents: "auto" }}
                aria-label="Tutup notifikasi"
              >
                ×
              </button>
            </Alert>
          </div>
        </div>
      )}
    </div>
  );
}
