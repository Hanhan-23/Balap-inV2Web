"use client";

import React, { useRef, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { LogOut, Moon, Sun, User, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import { SidebarTrigger } from "./ui/sidebar";
import { Separator } from "./ui/separator";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

// Mapping segment path ke label yang ramah user
const routeLabel: Record<string, string> = {
  "": "Home",
  "data-laporan": "Data Laporan",
  "data-akun": "Data Akun",
  "data-rekomendasi": "Data Rekomendasi",
  profile: "Profil",
  // Tambahkan mapping lain sesuai kebutuhan
};

export default function Navbar() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const { setTheme } = useTheme();
  const router = useRouter();

  // Handler untuk logout
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    router.replace("/login");
  };

  // Breadcrumbs segments, always start with root ""
  const breadcrumbSegments = ["", ...segments];

  // Ref & State for responsive collapse
  const containerRef = useRef<HTMLDivElement>(null);
  const [collapsed, setCollapsed] = useState(false);

  // Cek overflow (collapse breadcrumbs jika overflow-x)
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setCollapsed(
          containerRef.current.scrollWidth > containerRef.current.offsetWidth
        );
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [pathname]);

  // Dropdown untuk list semua segmen
  const BreadcrumbDropdown = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="p-1 h-6 w-6 rounded-full">
          <MoreHorizontal className="size-5" />
          <span className="sr-only">Show breadcrumbs</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {breadcrumbSegments.map((seg, idx) => {
          const url = "/" + breadcrumbSegments.slice(1, idx + 1).join("/");
          const label =
            routeLabel[seg] ||
            seg
              .replace(/-/g, " ")
              .replace(/\b\w/g, (c) => c.toUpperCase());
          return (
            <DropdownMenuItem key={url}>
              <Link href={url || "/"} className="block w-full">
                {label}
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <nav className="px-2 h-16 flex items-center justify-between sticky top-0 bg-background z-10 transition-shadow">
      {/* LEFT */}
      <div className="flex items-center gap-2 min-w-0 flex-1">
        <SidebarTrigger />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        {/* Breadcrumb */}
        <div className="flex-1 min-w-0">
          <div
            ref={containerRef}
            className="relative flex items-center min-w-0"
            style={{ overflow: "hidden" }}
          >
            {collapsed ? (
              <BreadcrumbDropdown />
            ) : (
              <Breadcrumb>
                <BreadcrumbList className="flex min-w-0 overflow-hidden">
                  {breadcrumbSegments.map((seg, idx) => {
                    const url =
                      "/" +
                      breadcrumbSegments
                        .slice(1, idx + 1)
                        .filter(Boolean)
                        .join("/");
                    const isLast = idx === breadcrumbSegments.length - 1;
                    const label =
                      routeLabel[seg] ||
                      seg
                        .replace(/-/g, " ")
                        .replace(/\b\w/g, (c) => c.toUpperCase());
                    return (
                      <React.Fragment key={url || "/"}>
                        {idx > 0 && <BreadcrumbSeparator />}
                        <BreadcrumbItem className="max-w-none">
                          {isLast ? (
                            <BreadcrumbPage className="text-xs sm:text-sm whitespace-nowrap">
                              {label}
                            </BreadcrumbPage>
                          ) : (
                            <BreadcrumbLink asChild>
                              <Link
                                href={url || "/"}
                                className="text-xs sm:text-sm whitespace-nowrap"
                              >
                                {label}
                              </Link>
                            </BreadcrumbLink>
                          )}
                        </BreadcrumbItem>
                      </React.Fragment>
                    );
                  })}
                </BreadcrumbList>
              </Breadcrumb>
            )}
          </div>
        </div>
      </div>
      {/* RIGHT */}
      <div className="flex items-center gap-2">
        {/* THEME MENU */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom" align="end" sideOffset={10}>
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {/* USER MENU */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src="/logo-dbmsda.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom" align="end" sideOffset={10}>
            <DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href="/profile">
              <DropdownMenuItem>
                <User className="h-[1.2rem] w-[1.2rem] mr-2" />
                Profil
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem
              variant="destructive"
              onClick={handleLogout}
              className="text-red-600 cursor-pointer"
            >
              <LogOut className="h-[1.2rem] w-[1.2rem] mr-2" />
              Keluar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
