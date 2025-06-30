import axios from "axios";
import { UserProfile } from "@/types/user-profile";

export const getPemerintahById = async (id: string): Promise<UserProfile> => {
  const res = await axios.get(`/akun/detail/${id}`);
  return res.data;
};

export const updatePemerintahById = async (id: string, updatedProfile: Partial<UserProfile>) => {
  const res = await axios.put(`/akun/update/${id}`, updatedProfile);
  return res.data;
};