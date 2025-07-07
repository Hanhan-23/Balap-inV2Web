// types/data-rekomendasi.ts
export type StatusRekom = "belum_valid" | "valid" | "proses" | "selesai";
export type TingkatUrgent = "rendah" | "sedang" | "tinggi" | "sangat_tinggi" | string;
// export type TingkatUrgent = "rendah" | "sedang" | "tinggi" | "sangat_tinggi";

export interface rekomendasi {
  id: string;
  jumlah_laporan: number;
  status_urgent: string;
  tingkat_urgent: TingkatUrgent;
  status_rekom: StatusRekom;
  laporan: {
    judul: string;
    jenis: string;
    alamat: string;
  };
}

export interface cardDetailRekomendasi {
  id: string;
  jumlah_laporan: number;
  status_urgent: string;
  tingkat_urgent: string;
  status_rekom: StatusRekom;
  tgl_rekom: string;
  laporan: {
    id: string;
    judul: string;
    jenis: string;
    deskripsi: string;
    gambar: string[];
    persentase: number;
    cuaca: string;
    status: string;
    tgl_lapor: string;
    cluster: string;
    id_masyarakat: string;
    peta: {
      alamat: string;
      jalan: string;
      latitude: number;
      longitude: number;
    };
  }[];
}
