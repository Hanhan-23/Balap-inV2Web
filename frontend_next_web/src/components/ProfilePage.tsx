"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Pencil, Save, X } from "lucide-react";
import AppSidebar from "@/components/AppSidebar";
import { getAkunPemerintahMe, updateAkunPemerintah } from "@/services/profileservices";
import { userProfile } from "@/types/user-profile";
import { useState, useEffect } from "react";

const ProfilePage = () => {
  const [akun, setAkun] = useState<userProfile>();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!akun) return;
    const { name, value } = e.target;
    setAkun({ ...akun, [name]: value });
  };

    const handleSave = async () => {
  const access_token = localStorage.getItem("access_token");
  if (!akun || !access_token) return;

  try {
    const updatedData = {
      nama_lengkap: akun.nama_lengkap,
      no_telp: akun.no_telp,
      email: akun.email,
      password_lama: akun.password, // ambil dari input user (isi manual ya, bukan yang ada di data awal)
      password_baru: newPassword,
      konfirmasi_password: confirmPassword,
    };

    await updateAkunPemerintah(akun.id, updatedData, access_token);
    setIsEditing(false);
    alert("Profil berhasil diperbarui");
  } catch (err) {
    console.error("Gagal update profile:", err);
    alert("Gagal memperbarui profil. Periksa kembali password atau data lainnya.");
  }
};


    // const updatedData = {
    //   nama_lengkap: akun.nama_lengkap,
    //   no_telp: akun.no_telp,
    //   email: akun.email,
    //   ...(newPassword && { password_lama: oldPassword, password_baru: newPassword }),
    // };


  useEffect(() => {
    const fetchData = async () => {
      const access_token = localStorage.getItem("access_token");
      if (!access_token) return;

      try {
        const data = await getAkunPemerintahMe(access_token);
        setAkun(data);
      } catch (error) {
        console.error("error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="h-screen">
      <AppSidebar />

      <div className="flex-1 p-4 pl-6 overflow-auto">
        <h1 className="text-2xl font-bold mb-4">Profil Saya</h1>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center">
              <Avatar className="w-36 h-36 mb-3">
                <AvatarImage src={"/logo-dbmsda.png"} />
              </Avatar>
            </div>

            <div className="flex-1 space-y-3">
              <div className="grid grid-cols-1 gap-3">
                <div>
                  <Label className="text-sm">Nama Anda</Label>
                  {isEditing ? (
                    <Input
                      name="nama_lengkap"
                      value={akun?.nama_lengkap || ""}
                      onChange={handleChange}
                    />
                  ) : (
                    <div className="p-2 border rounded-md text-sm">
                      {akun?.nama_lengkap}
                    </div>
                  )}
                </div>

                <div>
                  <Label className="text-sm">Nomor Pegawai</Label>
                  <div className="p-2 border rounded-md text-sm">{akun?.no_pegawai}</div>
                </div>

                <div>
                  <Label className="text-sm">Nomor Telepon</Label>
                  {isEditing ? (
                    <Input
                      name="no_telp"
                      value={akun?.no_telp || ""}
                      onChange={handleChange}
                    />
                  ) : (
                    <div className="p-2 border rounded-md text-sm">{akun?.no_telp}</div>
                  )}
                </div>

                <div>
                  <Label className="text-sm">Email</Label>
                  {isEditing ? (
                    <Input
                      name="email"
                      type="email"
                      value={akun?.email || ""}
                      onChange={handleChange}
                    />
                  ) : (
                    <div className="p-2 border rounded-md text-sm">{akun?.email}</div>
                  )}
                </div>
              </div>

              {isEditing && (
              <div className="pt-3 border-t mt-3 space-y-3">
                <h3 className="font-medium text-sm">Ubah Password</h3>
                <div>
                  <Input
                    type="password"
                    placeholder="Password Lama"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>
                <div>
                  <Input
                    type="password"
                    placeholder="Password Baru"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div>
                  <Input
                    type="password"
                    placeholder="Konfirmasi Password Baru"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
            )}


              <div className="flex justify-end gap-2 pt-3">
                {isEditing ? (
                  <>
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                      <X className="mr-1 h-3 w-3" />
                      Batal
                    </Button>
                    <Button size="sm" onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white">
                      <Save className="mr-1 h-3 w-3" />
                      Simpan
                    </Button>
                  </>
                ) : (
                  <Button size="sm" onClick={() => setIsEditing(true)} className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Pencil className="mr-1 h-3 w-3" />
                    Edit Profil
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
