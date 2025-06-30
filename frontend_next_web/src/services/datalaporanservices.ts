import { Laporan, LaporanDetail } from "@/types/data-laporan";
import api from "@/lib/axios";

export async function getCardLaporan(search: string | null): Promise<Laporan[]>{
    const query = encodeURIComponent(search ?? '');
    const response = await api.get<Laporan[]>(`/laporan?search=${query}`);
    return response.data;
}

export async function getDetailLaporan(id: string): Promise<LaporanDetail> {
  const response = await api.get<LaporanDetail>(`/laporan/detail/${id}`);
  return response.data;
}

export async function toggleStatusLaporan(id: string) {
    return await api.put(`laporan/toggle-status/${id}`);
}