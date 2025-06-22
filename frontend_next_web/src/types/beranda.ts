export interface empatAnalisis {
    jumlah_laporan_terkini: number;
	total_rekomendasi_terkini: number;
	total_rekomendasi_tervalidasi: number;
	total_rekomendasi_butuh_validasi: number;
}

export interface rekomendasiBeranda {
    id: string;
	jumlah_laporan: number;
	status_urgent: number;
	tingkat_urgent: any;
	laporan: {
		id_laporan: string;
		judul: string;
		gambar: string;
		alamat: string;
    }
}