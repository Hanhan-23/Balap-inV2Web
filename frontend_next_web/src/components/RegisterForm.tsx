"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { daftarAkunPemerintah } from "@/services/authservices"

export function RegisterForm({ className, ...props }: React.ComponentProps<"div">) {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [formDaftar, setFormDaftar] = useState({
    nama_lengkap: '',
    no_pegawai: '',
    email: '',
    no_telp: '',
    alamat: '',
    password: '',
    status: 'belum_verif'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormDaftar({
      ...formDaftar,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await daftarAkunPemerintah({
        ...formDaftar,
        no_pegawai: Number(formDaftar.no_pegawai)
      });

      if (response.status == 'success') {
        console.log(`berhasil membuat akun`)
        router.push('/login')
      }
    } catch (error: any) {
      const errors = error.response.data.status

      if (errors == 'failed') {
        if (error.response.data.message == 'email_sudah_terdaftar') {
          console.log(`email sudah terdaftar`)
        } else {
          console.log('data tidak valid')
        }
      } else {
        console.log('data tidak valid')
      }
    }
  };

  return (
    <div {...props} className={cn("flex flex-col gap-6 min-h-screen items-center justify-center px-4", className)}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2 max-w-4xl">
          <div className="bg-muted relative hidden md:block">
            <img src="/login.svg" alt="Image" className="absolute inset-0 h-full w-full object-contain dark:brightness-[0.2] dark:grayscale" />
          </div>

          {/* Form daftar */}
          <form onSubmit={handleSubmit} className="p-6 md:p-8 w-full max-w-2xl">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-3xl font-bold">Daftar Akun</h1>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <Label htmlFor="name" className="w-32 text-right flex-shrink-0">Nama</Label>
                  <Input
                    id="name"
                    name="nama_lengkap"
                    type="text"
                    className="w-full max-w-sm"
                    required
                    value={formDaftar.nama_lengkap}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex items-center gap-4">
                  <Label htmlFor="employeeId" className="w-32 text-right flex-shrink-0">ID Pegawai</Label>
                  <Input
                    id="employeeId"
                    name="no_pegawai"
                    type="number"
                    className="w-full max-w-sm"
                    required
                    value={formDaftar.no_pegawai}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex items-center gap-4">
                  <Label htmlFor="email" className="w-32 text-right flex-shrink-0">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    className="w-full max-w-sm"
                    required
                    value={formDaftar.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex items-center gap-4">
                  <Label htmlFor="phone" className="w-32 text-right flex-shrink-0">Telepon</Label>
                  <Input
                    id="phone"
                    type="tel"
                    name="no_telp"
                    className="w-full max-w-sm"
                    required
                    value={formDaftar.no_telp}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex items-start gap-4">
                  <Label htmlFor="address" className="w-32 text-right pt-2 flex-shrink-0">Alamat</Label>
                  <Textarea
                    id="address"
                    name="alamat"
                    className="w-full max-w-sm resize-y overflow-x-hidden break-all"
                    required
                    placeholder="Masukkan alamat lengkap"
                    value={formDaftar.alamat}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex items-center gap-4">
                  <Label htmlFor="password" className="w-32 text-right flex-shrink-0">Password</Label>
                  <div className="relative w-full max-w-sm">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      className="pr-10 w-full"
                      value={formDaftar.password}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2 top-2.5 text-muted-foreground"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full">Daftar</Button>

              <div className="text-center text-sm">
                <div className="text-muted-foreground flex justify-center gap-1">
                  <span>Sudah punya akun?</span>
                  <a href="/login" className="underline underline-offset-4 text-blue-600 hover:text-blue-800">
                    Masuk
                  </a>
                </div>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
