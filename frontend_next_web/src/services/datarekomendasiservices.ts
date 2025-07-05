import { rekomendasi, StatusRekom } from "@/types/data-rekomendasi";
import api from "@/lib/axios";

export async function getDataRekomendasi(
  search: string | null
): Promise<rekomendasi[]> {
  const query = encodeURIComponent(search ?? "");
  const response = await api.get<rekomendasi[]>(`/rekomendasi?search=${query}`);
  return response.data;
}

export async function getDetailRekomendasi(id: string) {
  const response = await api.get(`/rekomendasi/${id}`);
  return response.data;
}

export async function updateStatusRekomendasi(
  id: string,
  payload: { status_rekom: StatusRekom }
) {
  const response = await api.put(`/rekomendasi/update/${id}`, payload);
  return response.data;
}
