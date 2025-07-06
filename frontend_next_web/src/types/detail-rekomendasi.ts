export type StatusRekom =string;

export interface detailrekomendasi {
  id: string;
  jumlah_laporan: number;
  status_urgent: string;
  tingkat_urgent: number;
  status_rekom: StatusRekom;
  tgl_rekom: string;
    laporan: {
        id: number;
        judul: string;
        jenis: string;
        deskripsi: string;
        gambar: string[];
        persentase: number;
        cuaca: string;
        status: string;
        tgl_lapor: string;
        cluster: number;
        id_masyarakat: string;
        peta: {
            alamat: string;
            jalan: string;
            latitude: number;
            longitude: number;
  };
}
}
export interface LaporanDetail {
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