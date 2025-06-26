export type StatusRekom = "belum_valid" | "valid" | "proses" | "selesai";

export interface rekomendasi {
  id: string;
  jumlah_laporan: number;
  status_urgent: string;
  tingkat_urgent: any;
  status_rekom: StatusRekom;
  laporan: {
    judul: string;
    jenis: string;
    alamat: string;
  };
}
