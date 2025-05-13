"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export function RegisterForm({ className, ...props }: React.ComponentProps<"div">) {
    const [showPassword, setShowPassword] = useState(false);
    
    return (
    <div {...props} className={cn("flex flex-col gap-6 min-h-screen items-center justify-center", className)}>
        <Card className="overflow-hidden p-0">
            <CardContent className="grid p-0 md:grid-cols-2">
                <div className="bg-muted relative hidden md:block">
                    <img src="/login.svg" alt="Image" className="absolute inset-0 h-full w-full object-contain dark:brightness-[0.2] dark:grayscale"/>
                </div>
                {/* Form daftar */}
                <form className="p-6 md:p-8">
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col items-center text-center">
                            <h1 className="text-3xl font-bold">Daftar Akun</h1>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-4">
                                <Label htmlFor="name" className="w-32 text-right">
                                    Nama
                                </Label>
                                <Input id="name" type="text" className="max-w-sm w-full" required />
                            </div>
                            
                        <div className="flex items-center gap-4">
                            <Label htmlFor="employeeId" className="w-32 text-right">
                                ID Pegawai
                            </Label>
                            <Input id="employeeId" type="number" className="max-w-sm w-full" required />
                        </div>
                        
                        <div className="flex items-center gap-4">
                            <Label htmlFor="email" className="w-32 text-right">
                                Email
                            </Label>
                            <Input id="email" type="email" className="max-w-sm w-full" required />
                        </div>
                        
                        <div className="flex items-center gap-4">
                            <Label htmlFor="phone" className="w-32 text-right">
                                Telepon
                            </Label>
                            <Input id="phone" type="tel" className="max-w-sm w-full" required />
                            </div>
                            
                        <div className="flex items-start gap-4">
                            <Label htmlFor="address" className="w-32 text-right pt-2">
                                Alamat
                            </Label>
                            <Textarea id="address" className="max-w-sm w-full" required placeholder="Masukkan alamat lengkap"/>
                        </div>
                        
                        <div className="flex items-center gap-4">
                            <Label htmlFor="password" className="w-32 text-right">
                                Password
                            </Label>
                        
                        <div className="relative w-full max-w-sm">
                            <Input id="password" type={showPassword ? "text" : "password"} required className="pr-10"/>
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-2 top-2.5 text-muted-foreground">
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>
                </div>
                
                <Button type="submit" className="w-full">
                    Daftar
                </Button>
                <div className="text-center text-sm">
                    <div className="text-muted-foreground flex justify-center gap-1">
                        <span>Sudah punya akun?</span>
                        <a href="/main/dashboard" className="underline underline-offset-4 text-blue-600 hover:text-blue-800">
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