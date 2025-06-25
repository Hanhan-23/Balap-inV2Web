// src/lib/update-status.ts

import { toggleStatusLaporan } from "@/services/datalaporanservices";

/**
 * Helper untuk mengubah status laporan.
 * Dapat digunakan di halaman mana pun yang menampilkan data laporan.
 */
export async function updateLaporanStatus(
  id: string,
  currentStatus: string,
  onStatusUpdated: (id: string, status: string) => void,
  onDone?: () => void
) {
  const nextStatus = currentStatus === "selesai" ? "disembunyikan" : "selesai";

  try {
    await toggleStatusLaporan(id);
    onStatusUpdated(id, nextStatus);
    if (onDone) onDone();
  } catch (error) {
    console.error("Gagal mengubah status:", error);
    alert("Gagal mengubah status laporan.");
  }
}
