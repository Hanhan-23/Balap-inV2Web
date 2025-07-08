"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Eye, EyeOff, CheckCircle, AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";
import { daftarAkunPemerintah } from "@/services/authservices";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ApiError {
  response?: {
    data?: {
      status?: string;
      message?: string;
    };
  };
}

interface RegisterFormData {
  nama_lengkap: string;
  no_pegawai: string;
  no_telp: string;
  email: string;
  password: string;
  status: string;
}

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [formDaftar, setFormDaftar] = useState<RegisterFormData>({
    nama_lengkap: "",
    no_pegawai: "",
    no_telp: "",
    email: "",
    password: "",
    status: "belum_verif",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Dialog/Alert state
  const [showDialog, setShowDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogType, setDialogType] = useState<"success" | "error">("success");

  // Regex
  const regexNama = /^[A-Za-zÀ-ÿ\s.]+$/; // hanya huruf, spasi, titik, accent
  const regexIdPegawai = /^\d+$/;
  const regexTelp = /^08\d{8,13}$/; // Mulai 08 dan panjang 10-15 digit
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\S]{8,50}$/; // min 8, max 50, huruf & angka, tanpa spasi

  // Validasi per step & pola karakter
  const validateStep = () => {
    const tempErr: { [key: string]: string } = {};
    if (step === 1) {
      // NAMA LENGKAP
      if (!formDaftar.nama_lengkap || formDaftar.nama_lengkap.length < 3) {
        tempErr.nama_lengkap = "Nama minimal 3 karakter";
      } else if (formDaftar.nama_lengkap.length > 50) {
        tempErr.nama_lengkap = "Nama maksimal 50 karakter";
      } else if (!regexNama.test(formDaftar.nama_lengkap)) {
        tempErr.nama_lengkap = "Nama hanya boleh huruf, spasi, dan titik";
      }
      // ID PEGAWAI
      if (!formDaftar.no_pegawai) {
        tempErr.no_pegawai = "ID Pegawai wajib diisi";
      } else if (
        formDaftar.no_pegawai.length < 4 ||
        formDaftar.no_pegawai.length > 18
      ) {
        tempErr.no_pegawai = "ID Pegawai harus 4-18 digit angka";
      } else if (!regexIdPegawai.test(formDaftar.no_pegawai)) {
        tempErr.no_pegawai = "ID Pegawai hanya boleh angka";
      }
      // NO TELP
      if (!formDaftar.no_telp) {
        tempErr.no_telp = "No. Telepon wajib diisi";
      } else if (!regexTelp.test(formDaftar.no_telp)) {
        tempErr.no_telp = "No. Telepon harus mulai 08 dan 10-15 digit angka";
      }
    } else if (step === 2) {
      // EMAIL
      if (!formDaftar.email) {
        tempErr.email = "Email wajib diisi";
      } else if (formDaftar.email.length < 6 || formDaftar.email.length > 100) {
        tempErr.email = "Email harus 6-100 karakter";
      } else if (!regexEmail.test(formDaftar.email)) {
        tempErr.email = "Format email tidak valid";
      }
      // PASSWORD
      if (!formDaftar.password) {
        tempErr.password = "Password wajib diisi";
      } else if (
        formDaftar.password.length < 8 ||
        formDaftar.password.length > 50
      ) {
        tempErr.password = "Password harus 8-50 karakter";
      } else if (!regexPassword.test(formDaftar.password)) {
        tempErr.password =
          "Password harus kombinasi huruf & angka, tanpa spasi";
      }
    }
    setErrors(tempErr);
    return Object.keys(tempErr).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    // Hapus spasi depan-belakang dan limit angka pada ID Pegawai / Telp
    let val = e.target.value.trimStart();
    if (e.target.name === "no_pegawai" || e.target.name === "no_telp") {
      val = val.replace(/[^0-9]/g, "");
    }
    setFormDaftar({
      ...formDaftar,
      [e.target.name]: val,
    });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep()) setStep(step + 1);
  };

  const handleBack = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;
    try {
      const response = await daftarAkunPemerintah({
        ...formDaftar,
        no_pegawai: Number(formDaftar.no_pegawai),
      });

      if (response.status === "success") {
        setDialogTitle("Pendaftaran Berhasil");
        setDialogMessage(
          "Akun anda berhasil didaftarkan. Silakan login untuk masuk ke dashboard."
        );
        setDialogType("success");
        setShowDialog(true);

        setTimeout(() => {
          setShowDialog(false);
          router.push("/login");
        }, 1500);
      }
    } catch (error: unknown) {
      const err = error as ApiError;
      const errors = err?.response?.data?.status;
      if (
        errors === "failed" &&
        err.response?.data?.message === "email_sudah_terdaftar"
      ) {
        setDialogTitle("Pendaftaran Gagal");
        setDialogMessage("Email sudah terdaftar, silakan gunakan email lain atau login.");
        setDialogType("error");
        setShowDialog(true);
      } else {
        setDialogTitle("Terjadi Kesalahan");
        setDialogMessage("Gagal mendaftar. Silakan coba lagi nanti.");
        setDialogType("error");
        setShowDialog(true);
      }
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0 rounded-xl">
        <CardContent className="grid p-3 md:grid-cols-2">
          {/* Form kiri */}
          <form
            onSubmit={step === 1 ? handleNext : handleSubmit}
            className="p-6 md:p-12"
            autoComplete="off"
          >
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold mb-1">Daftar Akun BALAP-IN</h1>
                <p className="text-xs text-muted-foreground text-balance">
                  Batam Lapor Infrastruktur
                </p>
                {/* Stepper */}
                <div className="flex items-center gap-2 mt-4 mb-2">
                  <div
                    className={cn(
                      "w-5 h-2 rounded-full",
                      step === 1 ? "bg-blue-500" : "bg-muted-foreground/30"
                    )}
                  ></div>
                  <div
                    className={cn(
                      "w-5 h-2 rounded-full",
                      step === 2 ? "bg-blue-500" : "bg-muted-foreground/30"
                    )}
                  ></div>
                </div>
                <span className="text-xs text-muted-foreground">
                  Step {step} dari 2
                </span>
              </div>

              {/* Step 1: Data Personal */}
              {step === 1 && (
                <div className="flex flex-col gap-4">
                  <div className="grid gap-3">
                    <Label htmlFor="name">Nama</Label>
                    <Input
                      id="name"
                      name="nama_lengkap"
                      type="text"
                      required
                      minLength={3}
                      maxLength={50}
                      value={formDaftar.nama_lengkap}
                      onChange={handleChange}
                      autoComplete="off"
                    />
                    {errors.nama_lengkap && (
                      <span className="text-xs text-red-500">
                        {errors.nama_lengkap}
                      </span>
                    )}
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="employeeId">ID Pegawai</Label>
                    <Input
                      id="employeeId"
                      name="no_pegawai"
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      required
                      minLength={4}
                      maxLength={18}
                      value={formDaftar.no_pegawai}
                      onChange={handleChange}
                      autoComplete="off"
                    />
                    {errors.no_pegawai && (
                      <span className="text-xs text-red-500">
                        {errors.no_pegawai}
                      </span>
                    )}
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="phone">Telepon</Label>
                    <Input
                      id="phone"
                      name="no_telp"
                      type="text"
                      inputMode="numeric"
                      pattern="^08[0-9]{8,13}$"
                      required
                      minLength={10}
                      maxLength={15}
                      value={formDaftar.no_telp}
                      onChange={handleChange}
                      placeholder="08xxxxxxxxxx"
                      autoComplete="off"
                    />
                    {errors.no_telp && (
                      <span className="text-xs text-red-500">
                        {errors.no_telp}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Step 2: Email & Password */}
              {step === 2 && (
                <div className="flex flex-col gap-4">
                  <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      minLength={6}
                      maxLength={100}
                      value={formDaftar.email}
                      onChange={handleChange}
                      placeholder="example@gmail.com"
                      autoComplete="off"
                    />
                    {errors.email && (
                      <span className="text-xs text-red-500">
                        {errors.email}
                      </span>
                    )}
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative w-full max-w-sm">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        required
                        minLength={8}
                        maxLength={50}
                        className="pr-10"
                        value={formDaftar.password}
                        onChange={handleChange}
                        autoComplete="off"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-2.5 text-muted-foreground"
                        tabIndex={-1}
                      >
                        {showPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <span className="text-xs text-red-500">
                        {errors.password}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Tombol navigasi */}
              <div className="flex flex-col gap-2">
                {step === 1 ? (
                  <Button
                    type="submit"
                    className="w-full text-white bg-blue-500 rounded-full hover:bg-blue-600"
                  >
                    Selanjutnya
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-1/2 rounded-full"
                      onClick={handleBack}
                    >
                      Kembali
                    </Button>
                    <Button
                      type="submit"
                      className="w-1/2 text-white bg-blue-500 rounded-full hover:bg-blue-600"
                    >
                      Daftar
                    </Button>
                  </div>
                )}
              </div>

              <div className="text-center text-xs">
                <div className="text-muted-foreground flex justify-center gap-1">
                  <span>Sudah punya akun?</span>
                  <a
                    href="/login"
                    className="underline underline-offset-4 text-blue-600 hover:text-blue-800"
                  >
                    Masuk
                  </a>
                </div>
              </div>
            </div>
          </form>

          {/* Gambar di kanan */}
          <div className="h-full bg-muted relative rounded-sm hidden md:flex md:items-center md:justify-center">
            <Image
              src="/login.svg"
              alt="Image"
              width={100}
              height={100}
              className="size-72 dark:brightness-[0.2] dark:grayscale"
              priority
            />
          </div>
        </CardContent>
      </Card>

      {/* MODAL POPUP */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-3">
              {dialogType === "success" ? (
                <CheckCircle className="text-green-500" />
              ) : (
                <AlertTriangle className="text-red-500" />
              )}
              <div>
                <DialogTitle
                  className={
                    dialogType === "error" ? "text-red-600" : "text-green-600"
                  }
                >
                  {dialogTitle}
                </DialogTitle>
                <DialogDescription className="text-muted-foreground mt-1">
                  {dialogMessage}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
