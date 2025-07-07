"use client";

import { usePathname } from "next/navigation"; // Add this import
import {
  SquaresFourIcon,
  FileTextIcon,
  UsersThreeIcon,
  ChartBarIcon,
} from "@phosphor-icons/react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "./ui/sidebar";
import Link from "next/link";
import Image from "next/image";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: SquaresFourIcon,
  },
  {
    title: "Data Laporan",
    url: "/data-laporan",
    icon: FileTextIcon,
  },
  {
    title: "Data Akun",
    url: "/data-akun",
    icon: UsersThreeIcon,
  },
  {
    title: "Data Rekomendasi",
    url: "/data-rekomendasi",
    icon: ChartBarIcon,
  },
];

const AppSidebar = () => {
  const pathname = usePathname(); // Get current path

  return (
    <Sidebar
      className="flex flex-col h-full bg-white dark:bg-[#0f172a] text-black dark:text-slate-200 shadow-md dark:shadow-[2px_0_8px_rgba(255,255,255,0.05)] transition-colors"
      collapsible="icon"
    >
      {/* <Sidebar className="flex flex-col h-full" collapsible="icon"> */}
      {/* Header */}
      <SidebarHeader className="py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
                <Image
                  src="/logo.svg"
                  alt="logo"
                  width={30}
                  height={30}
                  className="object-contain rounded-md"
                />
              </div>
              <div className="flex-1 text-left text-sm leading-tight">
                <Link
                  href={"/dashboard"}
                  className="truncate font-medium dark:text-white"
                >
                  BALAP-IN
                </Link>
              </div>
            </SidebarMenuButton>
            <SidebarSeparator />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Main Content */}
      <SidebarContent className="flex-1 overflow-y-auto">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={`transition-all ${
                        isActive
                          ? "bg-blue-600 text-white hover:text-white hover:bg-blue-600 active:bg-blue-700 active:text-white dark:bg-blue-900/40 dark:hover:bg-blue-900/60 rounded-full p-3"
                          : "hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"
                      }`}
                    >
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                    {item.title === "Inbox" && (
                      <SidebarMenuBadge>24</SidebarMenuBadge>
                    )}
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
