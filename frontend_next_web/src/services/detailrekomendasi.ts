import { detailrekomendasi, StatusRekom } from "@/types/detail-rekomendasi";
import api from "@/lib/axios";

export async function getDetailRekomendasi(
  id: string | null
): Promise<detailrekomendasi> {
  const response = await api.get<detailrekomendasi>(`/rekomendasi/detail/${id}`);
  return response.data;
}

export async function updateStatusRekomendasi(
  id: string,
  payload: { status_rekom: StatusRekom }
) {
  const response = await api.put(`/rekomendasi/update/${id}`, payload);
  return response.data;
}
