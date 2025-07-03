export interface userProfile {
    id: string,
    alamat: string,
    nama_lengkap: string,
    email: string,
    no_pegawai: number,
    no_telp: string,
    password: string,
    status: string,
    tgl_pemerintah: string
}

export interface akunPemerintah{
    id: string,
    nama_lengkap: string,
    email: string,
    status: string
}
