"use client";

import { usePathname } from "next/navigation"; // Add this import
import { LayoutDashboard, FileUser, Users, ChartNoAxesCombined } from "lucide-react";
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
    icon: LayoutDashboard,
  },
  {
    title: "Data Laporan",
    url: "/data-laporan",
    icon: FileUser,
  },
  {
    title: "Data Akun",
    url: "/data-akun",
    icon: Users,
  },
  {
    title: "Data Rekomendasi",
    url: "/data-rekomendasi",
    icon: ChartNoAxesCombined,
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
                <Image src="/logo.svg" alt="logo" width={30} 
                height={30} className="object-contain"/>
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
                      className={isActive ? "bg-blue-200 dark:bg-blue-900/30" : ""}
                    >
                      <Link href={item.url}>
                        <item.icon className={isActive ? "text-blue-600 dark:text-blue-400" : ""} />
                        <span className={isActive ? "text-blue-600 dark:text-blue-400 font-medium" : ""}>
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