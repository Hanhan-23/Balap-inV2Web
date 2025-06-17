"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
// import { Progress } from "@/components/ui/progress"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [showPassword, setShowPassword] = useState(false); // mendeklarasikan state untuk password visibility
  
  return (
    <div className={cn("flex flex-col gap-6 flex min-h-screen items-center justify-center", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
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
                <Input id="email" type="email" placeholder="m@gmail.com" required/>
              </div>
              
              <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                <div className="flex items-center">
                  <div className="relative w-full max-w-sm">
                    <Input id="password" type={showPassword ? "text" : "password"} required className="pr-10"/>
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-2 top-2.5 text-muted-foreground">
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
              </div>
    
              <Button type="submit" className="w-full">
                Login
              </Button>
              
              <div className="text-center text-sm">
                <div className="text-muted-foreground flex justify-center gap-1">
                  <span>Belum memiliki akun?</span>
                  <a href="/registration" className="underline underline-offset-4 text-blue-600 hover:text-blue-800">
                    Daftar
                  </a>
                </div>
              </div>

            </div>
          </form>
          
          <div className="bg-muted relative hidden md:block">
            <img src="/login.svg" alt="Image" className="absolute inset-0 h-full w-full object-contain dark:brightness-[0.2] dark:grayscale"/>
          </div>
        </CardContent>
      </Card>
    </div>
  
  );
}