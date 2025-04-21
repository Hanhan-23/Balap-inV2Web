"use client"

import * as React from "react"
import {
  IconDashboard,
  IconReport,
  IconUsers,
  IconChartBar,
  IconBell, // Ganti dengan ikon yang ada, misalnya IconBell
} from "@tabler/icons-react"

import { Sun, Moon } from "lucide-react" // Pastikan mengimpor Sun dan Moon dari lucide-react

import Link from "next/link"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar"

import Header from "@/components/header"

// Definisi tipe NavItem
interface NavItem {
  title: string;
  url: string;
  icon: React.ForwardRefExoticComponent<any>; // Ikon tidak perlu spesifik IconProps
}

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/main/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Data Laporan",
      url: "/main/data-laporan",
      icon: IconReport,
    },
    {
      title: "Data Akun",
      url: "/main/data-akun",
      icon: IconUsers,
    },
    {
      title: "Data Rekomendasi",
      url: "/main/data-rekomendasi",
      icon: IconChartBar,
    },
    {
      title: "Notifikasi",
      url: "/main/notifikasi",
      icon: IconBell, // Ganti dengan ikon yang sesuai
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <div className="flex items-center justify-between px-4 py-2">
          <Link href="/" className="flex items-center space-x-2">
            <img src="/balapin.svg" alt="BALAP-IN Logo" className="w-10 h-10" />
            <span className="text-base font-bold">BALAP-IN</span>
          </Link>
          <ModeToggle />
        </div>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
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
  )
}
