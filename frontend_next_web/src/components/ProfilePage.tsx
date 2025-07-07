"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2, XCircle, Save } from "lucide-react";
import AppSidebar from "@/components/AppSidebar";
import {
  getAkunPemerintahMe,
  updateAkunPemerintah,
} from "@/services/profileservices";
import { userProfile } from "@/types/user-profile";
import { PencilSimpleIcon, XIcon } from "@phosphor-icons/react";

interface UpdateProfileData {
  nama_lengkap: string;
  no_telp: string;
  email: string;
  old_password?: string;
  new_password?: string;
}

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

const ProfilePage = () => {
  const [akun, setAkun] = useState<userProfile>();
  const [isEditing, setIsEditing] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState<"success" | "error">("success");
  const [alertMessage, setAlertMessage] = useState("");

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!akun) return;
    const { name, value } = e.target;
    setAkun({ ...akun, [name]: value });
  };

  useEffect(() => {
    if (showAlert) {
      const timeout = setTimeout(() => setShowAlert(false), 3500);
      return () => clearTimeout(timeout);
    }
  }, [showAlert]);

  const handleSave = async () => {
    const access_token = localStorage.getItem("access_token");
    if (!akun || !access_token) return;

    setLoading(true);
    try {
      const updatedData: UpdateProfileData = {
        nama_lengkap: akun.nama_lengkap,
        no_telp: akun.no_telp,
        email: akun.email,
      };

      if (oldPassword || newPassword || confirmPassword) {
        if (!oldPassword || !newPassword || !confirmPassword) {
          setAlertType("error");
          setAlertMessage("Semua field password harus diisi!");
          setShowAlert(true);
          setLoading(false);
          return;
        }
        if (newPassword !== confirmPassword) {
          setAlertType("error");
          setAlertMessage("Password baru dan konfirmasi password tidak sama!");
          setShowAlert(true);
          setLoading(false);
          return;
        }
        updatedData.old_password = oldPassword;
        updatedData.new_password = newPassword;
      }

      await updateAkunPemerintah(akun.id, updatedData, access_token);

      setAlertType("success");
      setAlertMessage("Profil berhasil diperbarui!");
      setShowAlert(true);

      setIsEditing(false);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");

      const refreshed = await getAkunPemerintahMe(access_token);
      setAkun(refreshed);
    } catch (error: unknown) {
      const err = error as ApiError;
      setAlertType("error");
      setAlertMessage(
        err?.response?.data?.message ||
          "Gagal memperbarui profil. Periksa kembali data atau password."
      );
      setShowAlert(true);
      console.error("Gagal update profile:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen">
      <AppSidebar />

      <div className="flex-1 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-6 w-full max-w-2xl">Profile</h1>

        {/* ALERT MESSAGE */}
        {showAlert && (
          <div
            className={`
              fixed top-16 left-0 w-full flex justify-center z-50
              transition-transform duration-500
              ${showAlert ? "translate-y-0" : "-translate-y-full"}
            `}
            style={{ pointerEvents: "none" }}
          >
            <div className="mt-4 w-full max-w-md pointer-events-auto">
              <Alert
                variant={alertType === "error" ? "destructive" : "green"}
                className="shadow-lg"
              >
                {alertType === "success" ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
                <AlertTitle>
                  {alertType === "success" ? "Berhasil" : "Gagal"}
                </AlertTitle>
                <AlertDescription>{alertMessage}</AlertDescription>
              </Alert>
            </div>
          </div>
        )}

        {/* CARD */}
        <div
          className="
            border border-[#dbe3ea] rounded-2xl
            px-8 pt-8 pb-7 bg-white dark:bg-neutral-900
            max-w-2xl w-full
            flex flex-col items-center
          "
        >
          {/* Foto */}
          <div className="flex flex-col mb-6 w-full">
            <span className="text-sm font-medium mb-2 w-full text-left">Foto</span>
            <Avatar className="w-32 h-32">
              <AvatarImage src={"/logo-dbmsda.png"} />
            </Avatar>
          </div>

          <form
            className="w-full flex flex-col gap-4"
            onSubmit={e => {
              e.preventDefault();
              if (isEditing) handleSave();
            }}
          >
            {/* Nama */}
            <div>
              <Label className="text-sm font-normal mb-1 block">Nama</Label>
              <Input
                name="nama_lengkap"
                value={akun?.nama_lengkap || ""}
                onChange={handleChange}
                readOnly={!isEditing}
                className="rounded-lg border border-[#dbe3ea] text-sm px-4 py-3 bg-transparent"
              />
            </div>
            {/* Email */}
            <div>
              <Label className="text-sm font-normal mb-1 block">Email</Label>
              <Input
                name="email"
                value={akun?.email || ""}
                onChange={handleChange}
                readOnly={!isEditing}
                className="rounded-lg border border-[#dbe3ea] text-sm px-4 py-3 bg-transparent"
              />
            </div>
            {/* No Hp */}
            <div>
              <Label className="text-sm font-normal mb-1 block">No. Hp</Label>
              <Input
                name="no_telp"
                value={akun?.no_telp || ""}
                onChange={handleChange}
                readOnly={!isEditing}
                className="rounded-lg border border-[#dbe3ea] text-sm px-4 py-3 bg-transparent"
              />
            </div>

            {/* Nomor Pegawai */}
            <div>
              <Label className="text-sm font-normal mb-1 block">Nomor Pegawai</Label>
              <Input
                name="no_pegawai"
                value={akun?.no_pegawai || ""}
                readOnly
                className="rounded-lg border border-[#dbe3ea] text-sm px-4 py-3 bg-neutral-50"
              />
            </div>

            {/* Password Section */}
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

            {/* Tombol Edit/Simpan Profil */}
            <div className="flex justify-end mt-6">
              {isEditing ? (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full mr-2"
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setOldPassword("");
                      setNewPassword("");
                      setConfirmPassword("");
                    }}
                    disabled={loading}
                  >
                    <XIcon className="mr-1 h-3 w-3" />
                    Batal
                  </Button>
                  <Button
                    size="sm"
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-full"
                    disabled={loading}
                  >
                    <Save className="mr-1 h-3 w-3" />
                    {loading ? "Menyimpan..." : "Simpan"}
                  </Button>
                </>
              ) : (
                <Button
                  size="sm"
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-full"
                >
                  <PencilSimpleIcon className="mr-1 h-3 w-3" />
                  Edit Profil
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
