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
import StatusChangeSuccessDialog from "@/components/data_rekomendasi/detail-rekomendasi/StatusChangeDialog";
import StatusUrgentBadge from "@/components/data_rekomendasi/detail-rekomendasi/StatusUrgentBadge";
import { cardDetailRekomendasi } from "@/types/data-rekomendasi";

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

  const [recommendation, setRecommendation] = useState<
    cardDetailRekomendasi | undefined
  >();
  const [status, setStatus] = useState<StatusRekom>("belum_valid");
  const [loading, setLoading] = useState(true);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [selectedLaporan, setSelectedLaporan] = useState<LaporanDetail | null>(
    null
  );
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

      <StatusChangeSuccessDialog
        open={showSuccessDialog}
        onClose={() => setShowSuccessDialog(false)}
        status={status}
      />
    </div>
  );
}
