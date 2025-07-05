export interface empatAnalisis {
    jumlah_laporan_terkini: number;
	total_rekomendasi_terkini: number;
	total_rekomendasi_tervalidasi: number;
	total_rekomendasi_butuh_validasi: number;
}

export interface rekomendasiBeranda {
    id: string;
	jumlah_laporan: number;
	status_urgent: string;
	tingkat_urgent: number;
	laporan: {
		id_laporan: string;
		judul: string;
		gambar: string;
		alamat: string;
		lat: string;
		long: string;
    }
}
export interface statistikBeranda {
  date: string;
  jalan: number;
  lampu: number;
  jembatan: number;
}

export interface petaBeranda {
	id: string;
	status_urgent: string;
	status_rekom: string;
	laporan: {
		id: string;
		judul: string;
		latitude: number;
		longitude: number;
	}
}
