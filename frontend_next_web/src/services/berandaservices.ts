import api from "@/lib/axios";
import { empatAnalisis, rekomendasiBeranda, statistikBeranda, petaBeranda } from "@/types/beranda";

export async function getEmpatAnalisis(): Promise<empatAnalisis> {
    const response = await api.get<empatAnalisis>('/beranda/empatanalisis')
    return response.data
}

export async function getRekomendasiBeranda(): Promise<rekomendasiBeranda[]> {
    const response = await api.get<rekomendasiBeranda[]>('/beranda/rekomendasiberanda')
    return response.data
}

// export async function getStatistikBeranda(): Promise<statistikBeranda> {
//     const response = await api.get<statistikBeranda>('beranda/statistikberanda')
//     return response.data
// }

export async function getStatistikBeranda(): Promise<statistikBeranda[]> {
  const response = await api.get<statistikBeranda[]>('/beranda/statistikberanda');
  return response.data;
}

export async function getPetaBeranda(): Promise<petaBeranda[]> {
    const response = await api.get<petaBeranda[]>('beranda/petaberanda')
    return response.data
}