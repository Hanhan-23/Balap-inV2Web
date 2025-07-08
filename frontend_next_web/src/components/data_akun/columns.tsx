"use client";

import { DotsThreeIcon } from "@phosphor-icons/react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toggleStatusAkun } from "@/services/akunservices";
import StatusBadge from "./status-badge";

export type Account = {
  id: string;
  nama_lengkap: string;
  email: string;
  no_telp: string;
  tgl_pemerintah: string;
  status: "verif" | "belum_verif";
};

export const columns = (
  onStatusUpdated: (
    id: string,
    status: Account["status"],
    result?: "success" | "error"
  ) => void
): ColumnDef<Account>[] => [
  {
    id: "no",
    header: "No",
    cell: ({ row }) => row.index + 1,
    size: 50,
  },
  {
    accessorKey: "nama_lengkap",
    header: "Nama",
    cell: ({ getValue }) => getValue() as string,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ getValue }) => getValue() as string,
  },
  {
    accessorKey: "no_telp",
    header: "Nomor HP",
    cell: ({ getValue }) => getValue() as string,
  },
  {
    accessorKey: "tgl_pemerintah",
    header: "Join",
    cell: ({ row }) => {
      const rawDate = row.original.tgl_pemerintah;
      const date = new Date(rawDate);
      const formatted = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} | ${String(
        date.getHours()
      ).padStart(2, "0")}.${String(date.getMinutes()).padStart(2, "0")}`;
      return <span>{formatted}</span>;
    },
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
          onStatusUpdated(account.id, nextStatus, "success");
        } catch (err) {
          console.error("Gagal mengubah status akun:", err);
          onStatusUpdated(account.id, account.status, "error");
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
