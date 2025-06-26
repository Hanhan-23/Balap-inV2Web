// components/data_akun/columns.tsx
"use client";

import { DotsThreeIcon } from "@phosphor-icons/react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toggleStatusAkun } from "@/services/akunservices";
import StatusBadge from "./status-badge";

export type Account = {
  id: string;
  nama_lengkap: string;
  email: string;
  no_telp: string;
  status: "verif" | "belum_verif";
};

export const columns = (
  onStatusUpdated: (id: string, status: Account["status"]) => void
): ColumnDef<Account>[] => [
  {
    accessorKey: "nama_lengkap",
    header: "Nama",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "no_telp",
    header: "Nomor HP",
  },
  {
  accessorKey: "status",
  header: "Status",
  cell: ({ row }) => {
    const status = row.original.status;
    return <StatusBadge value={status} />;
  },
},
  {
    id: "aksi",
    header: "Aksi",
    cell: ({ row }) => {
      const account = row.original;
      const isVerified = account.status === "verif";
      const nextStatus: Account["status"] = isVerified ? "belum_verif" : "verif";
      const actionLabel = isVerified ? "Batalkan Verifikasi" : "Verifikasi";

      const handleToggleStatus = async () => {
        try {
          await toggleStatusAkun(account.id);
          onStatusUpdated(account.id, nextStatus);
        } catch (err) {
          console.error("Gagal mengubah status akun:", err);
          alert("Gagal mengubah status akun.");
        }
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <DotsThreeIcon weight="bold" className="size-6" />
              <span className="sr-only">Opsi</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Aksi Akun</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleToggleStatus}>
              {actionLabel}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
