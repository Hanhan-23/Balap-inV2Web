"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from 'next/router';

export function LoginForm({
className,
...props
}: React.ComponentProps<"div">) {
  const [showPassword, setShowPassword] = useState(false);

  return (
  <div className={cn( "flex flex-col gap-6 flex min-h-screen items-center justify-center" , className )} {...props}>
    <Card className="overflow-hidden p-0">
      <CardContent className="grid p-0 grid-cols-1 md:grid-cols-2">
        {/* Gambar di kiri */}
        <div className="bg-muted relative h-64 md:h-auto">
          <img src="/login.png" alt="Image"
            className="absolute inset-0 h-full w-full object-contain dark:brightness-[0.2] dark:grayscale" />
        </div>

        {/* Form di kanan */}
        <form className="p-6 md:p-8">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center text-center">
              <h1 className="text-2xl font-bold">Welcome back to BALAP-IN</h1>
              <p className="text-muted-foreground text-balance">
                Batam Lapor Infrastruktur
              </p>
            </div>

            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" required />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="password">Password</Label>
              <div className="flex items-center">
                <div className="relative w-full max-w-sm">
                  <Input id="password" type={showPassword ? "text" : "password" } required className="pr-10" />
                  <button type="button" onClick={()=> setShowPassword(!showPassword)}
                    className="absolute right-2 top-2.5 text-muted-foreground"
                    >
                    {showPassword ?
                    <EyeOff size={20} /> :
                    <Eye size={20} />}
                  </button>
                </div>
              </div>
            </div>

            <form action="/main/dashboard" method="get">
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>

            <div className="text-center text-sm">
              <div className="text-muted-foreground flex justify-center gap-1">
                <span>Belum memiliki akun?</span>
                <Link href="/regis" className="underline underline-offset-4 text-blue-600 hover:text-blue-800">
                Daftar
                </Link>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  </div>
  );
  }