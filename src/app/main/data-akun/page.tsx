"use client"

import { useState } from "react"
import { useRouter } from "next/navigation" // ✅ Ganti dengan Next.js router
import { DataTable } from "@/components/data-table"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import {
  Bell,
  Search,
  UserCircle,
  User,
  LogOut,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import data from "./data.json" // data akun

export default function Page() {
  const [search, setSearch] = useState("")
  const router = useRouter() // ✅ Ganti useNavigate dengan useRouter

  // Filter data akun berdasarkan kata kunci
  const filteredData = data.filter((item) =>
    item.username.toLowerCase().includes(search.toLowerCase()) ||
    item.email.toLowerCase().includes(search.toLowerCase()) ||
    item.no_telp.toLowerCase().includes(search.toLowerCase()) ||
    item.jabatan.toLowerCase().includes(search.toLowerCase()) ||
    item.alamat.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <SidebarProvider>
      <SidebarInset className="!max-w-none w-full px-0">
        <SiteHeader />
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="w-full overflow-x-auto px-4 md:px-6">
            <div className="mx-auto w-full max-w-none">
              {/* Search + Notif + Akun */}
              <div className="flex justify-between items-center mb-4">
                {/* Search box */}
                <div className="flex items-center gap-2 border px-3 py-2 rounded-md w-full max-w-md bg-white dark:bg-zinc-900 dark:border-zinc-700 shadow-sm">
                  <Search className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search"
                    className="outline-none flex-1 text-sm text-gray-800 dark:text-white dark:bg-transparent placeholder-gray-400 dark:placeholder-gray-500"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>

                {/* Notif & Akun */}
                <div className="flex items-center gap-4 ml-4">
                  <button className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white">
                    <Bell className="w-5 h-5" />
                  </button>

                  {/* Dropdown akun */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white">
                        <UserCircle className="w-6 h-6" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-44">
                      <DropdownMenuItem onClick={() => router.push("/main/edit-akun")}>
                        <User className="w-4 h-4 mr-2" />
                        Profil
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => router.push("/login")}>
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Data akun table */}
              <DataTable data={filteredData} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
