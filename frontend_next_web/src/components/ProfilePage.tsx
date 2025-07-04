"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2, XCircle, Pencil, Save, X } from "lucide-react";
import AppSidebar from "@/components/AppSidebar";
import {
  getAkunPemerintahMe,
  updateAkunPemerintah,
} from "@/services/profileservices";
import { userProfile } from "@/types/user-profile";

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
      const updatedData: any = {
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
    } catch (err: any) {
      setAlertType("error");
      setAlertMessage(
        err?.response?.data?.message ||
          "Gagal memperbarui profil. Periksa kembali data atau password."
      );
      setShowAlert(true);
      console.error("Gagal update profile:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen">
      <AppSidebar />

      <div className="flex-1 p-4 pl-6 overflow-auto">
        <h1 className="text-2xl font-bold mb-4">Profil Saya</h1>

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
                  <div className="p-2 border rounded-md text-sm">
                    {akun?.no_pegawai}
                  </div>
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
                    <div className="p-2 border rounded-md text-sm">
                      {akun?.no_telp}
                    </div>
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
                    <div className="p-2 border rounded-md text-sm">
                      {akun?.email}
                    </div>
                  )}
                </div>
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

              <div className="flex justify-end gap-2 pt-3">
                {isEditing ? (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setIsEditing(false);
                        setOldPassword("");
                        setNewPassword("");
                        setConfirmPassword("");
                      }}
                      disabled={loading}
                    >
                      <X className="mr-1 h-3 w-3" />
                      Batal
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleSave}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                      disabled={loading}
                    >
                      <Save className="mr-1 h-3 w-3" />
                      {loading ? "Menyimpan..." : "Simpan"}
                    </Button>
                  </>
                ) : (
                  <Button
                    size="sm"
                    onClick={() => setIsEditing(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
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
