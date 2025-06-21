import { Recommended } from "@/components/data_laporan/columns";
import api from "@/lib/axios";
import { cardLaporan } from "@/types/data-laporan";

export async function getCardLaporan(search: string | null): Promise<Recommended[]>{
    const query = encodeURIComponent(search ?? '');
    const response = await api.get<Recommended[]>(`/laporan?search=${query}`);
    return response.data;
}

export async function toggleStatusLaporan(id: string) {
    return await api.put(`laporan/toggle-status/${id}`);
}