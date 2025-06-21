import api from "@/lib/axios";
import { Account } from "@/components/data_akun/columns";

export async function getCardAkun(search: string | null): Promise<Account[]>{
    const query = encodeURIComponent(search ?? '');
    const response = await api.get<Account[]>(`/akun?search=${query}`);
    return response.data;
}

export async function toggleStatusAkun(id: string) {
    return await api.put(`akun/toggle-status/${id}`);
}