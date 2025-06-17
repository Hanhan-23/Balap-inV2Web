"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Pencil, Save, X } from "lucide-react";
import AppSidebar from "@/components/AppSidebar";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Dinas Bina Marga dan Sumber Daya Air Kota Batam",
    personName: "Yulia Pipka", // Added new field
    email: "dbmsdakotabatam@gmail.com",
    phone: "(021)82678824",
    jabatan: "Sekretaris",
    photo: "/logo-bdmsda.png",
    password: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfile(prev => ({ ...prev, photo: event.target.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    console.log("Profile saved:", profile);
    setIsEditing(false);
  };

  return (
    <div className="h-screen">
      <AppSidebar />
      
      <div className="flex-1 p-4 pl-6 overflow-auto">
        <h1 className="text-2xl font-bold mb-4">Profil Saya</h1>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center">
              <Avatar className="w-36 h-36 mb-3">
                <AvatarImage src={'/logo-dbmsda.png'} />
              </Avatar>
              {isEditing && (
                <div className="relative">
                  <Button variant="outline" size="sm" className="mb-3">
                    <Pencil className="mr-2 h-4 w-4" />
                    Ubah Foto
                  </Button>
                  <Input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handlePhotoUpload}
                  />
                </div>
              )}
            </div>

            <div className="flex-1 space-y-3">
              <div className="grid grid-cols-1 gap-3">
                {/* Added Name field */}
                <div>
                  <Label className="text-sm">Nama Anda</Label>
                  {isEditing ? (
                    <Input
                      name="personName"
                      value={profile.personName}
                      onChange={handleChange}
                      className="w-full"
                    />
                  ) : (
                    <div className="p-2 border rounded-md text-sm">{profile.personName}</div>
                  )}
                </div>

                <div>
                  <Label className="text-sm">Nama Instansi</Label>
                  {isEditing ? (
                    <Input
                      name="name"
                      value={profile.name}
                      disabled
                      className="w-full bg-gray-100 dark:bg-gray-700 cursor-not-allowed"
                    />
                  ) : (
                    <div className="p-2 border rounded-md text-sm">{profile.name}</div>
                  )}
                </div>

                <div>
                  <Label className="text-sm">Nomor Telepon</Label>
                  {isEditing ? (
                    <Input
                      name="phone"
                      value={profile.phone}
                      onChange={handleChange}
                      className="w-full"
                    />
                  ) : (
                    <div className="p-2 border rounded-md text-sm">{profile.phone}</div>
                  )}
                </div>

                <div>
                  <Label className="text-sm">Jabatan</Label>
                  {isEditing ? (
                    <Input
                      name="jabatan"
                      value={profile.jabatan}
                      disabled
                      className="w-full bg-gray-100 dark:bg-gray-700 cursor-not-allowed"
                    />
                  ) : (
                    <div className="p-2 border rounded-md text-sm">{profile.jabatan}</div>
                  )}
                </div>

                <div>
                  <Label className="text-sm">Email</Label>
                  {isEditing ? (
                    <Input
                      name="email"
                      type="email"
                      value={profile.email}
                      onChange={handleChange}
                      className="w-full"
                    />
                  ) : (
                    <div className="p-2 border rounded-md text-sm">{profile.email}</div>
                  )}
                </div>
              </div>

              {isEditing && (
                <div className="pt-3 border-t mt-3 space-y-3">
                  <h3 className="font-medium text-sm">Ubah Password</h3>
                  <div>
                    <Input
                      name="password"
                      type="password"
                      placeholder="Password Saat Ini"
                      value={profile.password}
                      onChange={handleChange}
                      className="w-full text-sm"
                    />
                  </div>
                  <div>
                    <Input
                      name="newPassword"
                      type="password"
                      placeholder="Password Baru"
                      value={profile.newPassword}
                      onChange={handleChange}
                      className="w-full text-sm"
                    />
                  </div>
                  <div>
                    <Input
                      name="confirmPassword"
                      type="password"
                      placeholder="Konfirmasi Password Baru"
                      value={profile.confirmPassword}
                      onChange={handleChange}
                      className="w-full text-sm"
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
                  <Button size="sm" onClick={() => setIsEditing(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white">
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