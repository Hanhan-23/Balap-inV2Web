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
    <Sidebar className="flex flex-col h-full" collapsible="icon">
      {/* Header */}
      <SidebarHeader className="py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/" className="flex items-center gap-2">
                <div className="rounded-lg overflow-hidden w-8 h-8 flex items-center justify-center">
                  <Image
                    src="/logo.svg"
                    alt="logo"
                    width={30}
                    height={30}
                    className="object-contain"
                  />
                </div>
                <span className="font-bold">BALAP-IN</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarSeparator />

      {/* Main Content */}
      <SidebarContent className="flex-1 overflow-y-auto">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = pathname === item.url; // Check if current path matches item URL
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={
                        isActive
                          ? "bg-blue-600 hover:bg-blue-600 active:bg-blue-700 dark:bg-blue-900/30 rounded-full  p-3"
                          : ""
                      }
                    >
                      <Link href={item.url}>
                        <item.icon
                          className={
                            isActive
                              ? "text-sm text-white hover:text-white dark:text-muted-foreground"
                              : ""
                          }
                        />
                        <span
                          className={
                            isActive
                              ? "text-sm text-white hover:text-white dark:text-muted-foreground font-medium"
                              : ""
                          }
                        >
                          {item.title}
                        </span>
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
