import api from "@/lib/axios";
import { empatAnalisis, rekomendasiBeranda } from "@/types/beranda";

export async function getEmpatAnalisis(): Promise<empatAnalisis> {
    const response = await api.get<empatAnalisis>('/beranda/empatanalisis')
    return response.data
}

export async function getRekomendasiBeranda(): Promise<rekomendasiBeranda[]> {
    const response = await api.get<rekomendasiBeranda[]>('/beranda/rekomendasiberanda')
    return response.data
}