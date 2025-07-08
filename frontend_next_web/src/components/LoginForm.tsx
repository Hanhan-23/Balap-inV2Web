"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { loginAkunPemerintah } from "@/services/authservices";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle, AlertTriangle } from "lucide-react";

interface ApiError {
  response?: {
    data?: {
      status?: string;
    };
  };
}

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const [showDialog, setShowDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogType, setDialogType] = useState<"success" | "error">("success");

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const onHandleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await loginAkunPemerintah({ ...login });

      if (response.status === "login_success") {
        const status_pemerintah = response.status_pemerintah;

        if (status_pemerintah === "belum_verif") {
          setDialogTitle("Akun Belum Diverifikasi");
          setDialogMessage(
            "Akun anda belum diverifikasi, silahkan hubungi rekan DBMSDA anda"
          );
          setDialogType("error");
          setShowDialog(true);
          return;
        }

        if (status_pemerintah === "verif") {
          const access_token = response.access_token;
          const refresh_token = response.refresh_token;

          localStorage.setItem("access_token", access_token);
          localStorage.setItem("refresh_token", refresh_token);

          setDialogTitle("Login Berhasil");
          setDialogMessage(
            `Hai, ${login.email} anda berhasil masuk ke dashboard Dinas Bina Marga dan Sumber Daya Air`
          );
          setDialogType("success");
          setShowDialog(true);

          setTimeout(() => {
            router.push("/dashboard");
          }, 1500);
        }
      }
    } catch (error: unknown) {
      const apiError = error as ApiError;
      const errors = apiError?.response?.data?.status;

      if (errors === "password_salah") {
        setDialogTitle("Login Gagal");
        setDialogMessage("Password salah!");
        setDialogType("error");
        setShowDialog(true);
      } else if (errors === "invalid_account") {
        setDialogTitle("Login Gagal");
        setDialogMessage(
          "Email yang anda input tidak terdaftar di sistem, periksa ulang atau buat akun!"
        );
        setDialogType("error");
        setShowDialog(true);
      } else {
        setDialogTitle("Terjadi Kesalahan");
        setDialogMessage("Gagal login. Silakan coba lagi nanti.");
        setDialogType("error");
        setShowDialog(true);
      }
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0 rounded-xl">
        <CardContent className="grid p-3 md:grid-cols-2">
          <form onSubmit={handleSubmit} className="p-6 md:p-12">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold mb-1">Masuk ke BALAP-IN</h1>
                <p className="text-xs text-muted-foreground text-balance">
                  Batam Lapor Infrastruktur
                </p>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  onChange={onHandleChange}
                  type="email"
                  placeholder="example@gmail.com"
                  required
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                <div className="flex items-center">
                  <div className="relative w-full max-w-sm">
                    <Input
                      id="password"
                      name="password"
                      onChange={onHandleChange}
                      type={showPassword ? "text" : "password"}
                      required
                      className="pr-10"
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

              <Button
                type="submit"
                className="w-full text-white bg-blue-500 rounded-full hover:bg-blue-600"
              >
                Masuk
              </Button>

              <div className="text-center text-xs">
                <div className="text-muted-foreground flex justify-center gap-1">
                  <span>Belum memiliki akun?</span>
                  <a
                    href="/registration"
                    className="underline underline-offset-4 text-blue-600 hover:text-blue-800"
                  >
                    Daftar
                  </a>
                </div>
              </div>
            </div>
          </form>

          <div className="h-full bg-muted relative rounded-sm hidden md:flex md:items-center md:justify-center">
            <Image
              src="/login.svg"
              alt="Image"
              width={100}
              height={100}
              className="size-72"
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
