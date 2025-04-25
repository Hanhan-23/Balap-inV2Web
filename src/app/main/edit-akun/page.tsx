"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"  // Import directly here
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Search, Bell, UserCircle, User, LogOut } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"

const EditAkunPage = () => {
  const [nama, setNama] = useState("Dabo")
  const [nomorPegawai, setNomorPegawai] = useState("00337272")
  const [telepon, setTelepon] = useState("089677883232")
  const [alamat, setAlamat] = useState("Batam center")
  const [photo, setPhoto] = useState("/default-user.png")
  const [search, setSearch] = useState("")
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const router = useRouter()  // Use the hook here directly

  // Logout handler
  const handleLogout = () => {
    router.push("/login") // Redirect to login page
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setPhoto(imageUrl)
    }
  }

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <SidebarProvider>
      <SidebarInset className="!max-w-none w-full px-0">
        <SiteHeader />

        {/* Search + Notif + Akun */}
        <div className="flex items-center justify-between w-full mb-4 ">
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
          <div className="absolute top-4 left-320 flex items-center gap-4 z-50">
            <button className="bg-white p-2 rounded-full shadow hover:bg-gray-100 dark:bg-zinc-800 dark:hover:bg-zinc-700">
              <Bell className="w-5 h-5" />
            </button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="bg-white p-2 rounded-full shadow hover:bg-gray-100 dark:bg-zinc-800 dark:hover:bg-zinc-700">
                  <UserCircle className="w-6 h-6" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-44">
                <DropdownMenuItem onClick={() => console.log("Profil")}>
                  <User className="w-4 h-4 mr-2" />
                  Profil
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}> {/* Handle logout and redirect */}
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Konten Utama */}
        <div className="p-6 md:p-10">
          <h1 className="text-2xl font-semibold mb-6">Data Diri</h1>
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-md max-w-[1200px] w-full mx-auto">
            {/* Foto */}
            <div className="flex flex-col items-start gap-2 mb-6 relative">
              <div className="relative w-36 h-36 rounded-full overflow-hidden">
                <Image
                  src={photo}
                  alt="Foto Profil"
                  layout="fill"
                  objectFit="cover" // Ensures the image fills the container while maintaining its aspect ratio
                  className="rounded-full" // Keeps the circular shape
                />
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleButtonClick} 
                className="absolute top-15 right-40 translate-x-4 -translate-y-4"
              >
                Ganti foto
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
                accept="image/*"
              />
            </div>

            {/* Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="nama">Nama</Label>
                <Input id="nama" value={nama} onChange={(e) => setNama(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="telepon">Telepon</Label>
                <Input id="telepon" value={telepon} onChange={(e) => setTelepon(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="nip">Nomor Pegawai</Label>
                <Input id="nip" value={nomorPegawai} onChange={(e) => setNomorPegawai(e.target.value)} />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="alamat">Alamat</Label>
                <Input id="alamat" value={alamat} onChange={(e) => setAlamat(e.target.value)} />
              </div>
            </div>

            {/* Tombol */}
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline">Batal</Button>
              <Button className="bg-blue-500 text-white hover:bg-blue-700">Simpan</Button>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default EditAkunPage
