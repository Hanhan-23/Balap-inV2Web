export type Laporan = {
  id: string;
  gambar: string;
  tgl_lapor: string;
  judul: string;
  jenis: string;
  persentase: string;
  alamat: string;
  status: string;
};

export interface LaporanDetail {
  id: string;
  judul: string;
  jenis: string;
  deskripsi: string;
  gambar: string;
  persentase: number;
  cuaca: string;
  status: string;
  tgl_lapor: string;
  cluster: string;
  id_masyarakat: string;
  alamat?: string;
  jalan?: string;
  latitude?: number;
  longitude?: number;
}
