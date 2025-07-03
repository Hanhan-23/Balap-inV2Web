// import axios from "axios";
// import { userProfile } from "@/types/user-profile";
// import { getAkunPemerintah } from '@/services/profileservices';

// export const getPemerintahById = async (id: string): Promise<UserProfile> => {
//   const res = await axios.get(`/akun/detail/${id}`);
//   return res.data;
// };

// export const updatePemerintahById = async (id: string, updatedProfile: Partial<UserProfile>) => {
//   const res = await axios.put(`/akun/update/${id}`, updatedProfile);
//   return res.data;
// };

import api from "@/lib/axios";
import { userProfile } from "@/types/user-profile";

export async function getAkunPemerintah(id: string): Promise<userProfile> {
    const response = await api.get<userProfile>(`/akun/detail/${id}`);
    return response.data
}

// export async function updateAkunPemerintah(id: string): Promise<userProfile> {
//     const response = await api.get<userProfile>(`/akun/detail/${id}`);
//     return response.data
// }

export async function updateAkunPemerintah(id: string, updatedProfile: Partial<userProfile>, access_token: string): Promise<userProfile> {
  const response = await api.put(`/akun/update/${id}`, updatedProfile, {
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
}


export async function getAkunPemerintahMe(access_token: string): Promise<userProfile> {
  const response = await api.get<userProfile>('/auth/me', {
    headers: {
      Authorization: `Bearer ${access_token}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
}
