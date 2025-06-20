import { daftar, login } from "@/types/auth";
import api from "@/lib/axios";

export async function daftarAkunPemerintah(payload:daftar) {
    const request = api.post('/auth/buat', payload ,{
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return (await request).data
}

export async function loginAkunPemerintah(payload:login) {
    const request = api.post('/auth/login', payload, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return (await request).data;
}