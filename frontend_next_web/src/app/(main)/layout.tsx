"use client";

import "../globals.css";
import AppSidebar from "@/components/AppSidebar";
import Navbar from "@/components/Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [authChecked, setAuthChecked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      router.replace("/401-unauthorized-error");
    } else {
      setAuthChecked(true);
    }
  }, [router]);

  if (!authChecked) return null;
  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <main className="w-full">
        <Navbar />
        <div className="py-4 px-8 rounded-3xl">{children}</div>
      </main>
    </SidebarProvider>
  );
}
