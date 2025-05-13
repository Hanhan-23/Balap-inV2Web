"use client";

import { usePathname } from "next/navigation"; // Add this import
import {
  LayoutGrid,
  FileText,
  Users,
  ChartLine,
  User2,
  ChevronUp,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const items = [
  {
    title: "Dashboard",
    url: "/main/dashboard",
    icon: LayoutGrid,
  },
  {
    title: "Data Laporan",
    url: "/main/data-laporan",
    icon: FileText,
  },
  {
    title: "Data Akun",
    url: "/main/data-akun",
    icon: Users,
  },
  {
    title: "Data Rekomendasi",
    url: "/main/data-rekomendasi",
    icon: ChartLine,
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

      {/* Footer remains the same */}
      <SidebarFooter className="border-t border-muted bg-background">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> Pemerintah <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <Link href="/main/profile" className="items-center gap-2">
                <DropdownMenuItem>Profil</DropdownMenuItem>
                </Link>
                <Link href="/login" className="items-center gap-2">
                  <DropdownMenuItem>Keluar</DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;