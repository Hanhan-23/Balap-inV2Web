"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getPetaBeranda } from "@/services/berandaservices";
import { updateStatusRekomendasi, getDetailRekomendasi } from "@/services/datarekomendasiservices";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { petaBeranda } from "@/types/beranda";
import { cardDetailRekomendasi } from "@/types/data-rekomendasi"; // Tipe detail rekomendasi-mu
import MapComponentRekomendasi from "@/components/data_rekomendasi/Map";

type StatusRekom = "belum_valid" | "valid" | "proses" | "selesai";

export default function RecommendationDetail() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  // State untuk data detail rekomendasi
  const [recommendation, setRecommendation] = useState<cardDetailRekomendasi>();
  const [status, setStatus] = useState<StatusRekom>("belum_valid");
  const [loading, setLoading] = useState(true);
  const [petaBeranda, setPetaBeranda] = useState<petaBeranda[]>([]);

  useEffect(() => {
    setLoading(true);
    getDetailRekomendasi(id)
      .then((data) => {
        setRecommendation(data);
        setStatus(data.status_rekom as StatusRekom);
      })
      .finally(() => setLoading(false));
    getPetaBeranda()
      .then((data) => setPetaBeranda(data))
      .catch((err) => console.error("Gagal mengambil peta:", err));
  }, [id]);

  const handleChangeStatus = async (newStatus: StatusRekom) => {
    if (!recommendation) return;
    try {
      await updateStatusRekomendasi(recommendation.id, { status_rekom: newStatus });
      setStatus(newStatus);
      setRecommendation({ ...recommendation, status_rekom: newStatus });
    } catch (err) {
      alert(`Gagal mengubah status: ${err}`);
    }
  };

  if (loading || !recommendation) {
    return <div className="p-8 text-center">Memuat detail rekomendasi...</div>;
  }

  return (
    <div className="w-full px-4 py-2">
      <Button variant="ghost" onClick={() => router.back()} className="mb-4">
        <ChevronLeft className="h-4 w-4 mr-2" /> Kembali
      </Button>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
        <h1 className="text-2xl font-bold mb-4">{recommendation.laporan.judul}</h1>

        <div className="flex items-center gap-2 mb-4">
          <span className="font-medium">Jenis:</span>
          <Badge variant="outline">
            {recommendation.laporan.jenis}
            </Badge>
        </div>

        <p className="mb-2 text-gray-700 dark:text-gray-300">
          <span className="font-medium">Lokasi:</span> {recommendation.laporan.peta.alamat}
        </p>

        <div className="flex flex-wrap items-center gap-6 mb-6">
          <div className="flex items-center gap-2">
            <span className="font-medium">Tingkat Urgensi:</span>
            <span>{Math.round(Number(recommendation.tingkat_urgent) * 100)}%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium">Status Rekomendasi:</span>
            <Badge>{status}</Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">Ubah Status</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {["belum_valid", "valid", "proses", "selesai"].map((s) => (
                  <DropdownMenuItem key={s} onClick={() => handleChangeStatus(s as StatusRekom)}>
                    {s.replace(/_/g, " ")}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Foto */}
        <h3 className="font-medium mb-2">Dokumentasi Foto:</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {recommendation.laporan.gambar ? (
            <div className="rounded-lg overflow-hidden shadow-md">
              <div className="relative aspect-square w-full h-32">
                <Image src={recommendation.laporan.gambar} alt="Dokumentasi" fill className="object-cover" />
              </div>
              <div className="p-2 bg-gray-50 dark:bg-gray-700 text-center text-xs text-gray-600 dark:text-gray-300">
                Dokumentasi
              </div>
            </div>
          ) : (
            <div className="text-xs text-gray-500 col-span-full">Tidak ada dokumentasi foto</div>
          )}
        </div>

        {/* Map */}
        <h3 className="font-medium mb-2 text-md mt-4">Peta Rekomendasi</h3>
        <div className="h-[300px] w-full rounded-lg overflow-hidden mb-6">
          <MapComponentRekomendasi markersBeranda={recommendation} />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Rencana Tindakan</h2>
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
            <h3 className="font-medium mb-2">1. Pemeriksaan Lapangan</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Tim akan melakukan pemeriksaan lapangan dalam 3 hari kerja.
            </p>
          </div>
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
            <h3 className="font-medium mb-2">2. Penyusunan Rencana</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Penyusunan rencana perbaikan berdasarkan hasil pemeriksaan.
            </p>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
            <h3 className="font-medium mb-2">3. Pelaksanaan Perbaikan</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Perbaikan akan dilaksanakan sesuai jadwal yang ditentukan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}