"use client";

import { Trash2 } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { toggleStatusAkun } from "@/services/akunservices";

export type Account = {
  id: string;
  nama_lengkap: string;
  email: string;
  no_telp: string;
  status: string;
};

const handleDeleteAccount = async (id: string) => {
  await toggleStatusAkun(id)

  window.location.reload()
};

export const columns: ColumnDef<Account>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        checked={row.getIsSelected()}
      />
    ),
  },
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

      const displayStatus = status === "verif" ? "Diverifikasi" : "Belum Verifikasi";

      return <span>{displayStatus}</span>;
    },
  },
  {
    id: "aksi",
    header: "Aksi",
    cell: ({ row }) => {
      const account = row.original;

      const status = account.status

      const finalStatus = () => {
        if (status == 'belum_verif') {
          return 'Verifikasi'
        } else if (status == 'verif') {
          return 'Batalkan Verifikasi'
        }
      }

      return (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-red-600 hover:text-red-800"
            >
              <Trash2 className="w-5 h-5" />
              <span className="sr-only">Hapus akun</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-slate-50 border-red-100 dark:bg-slate-600 dark:border-red-50">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-red-800 dark:text-slate-100">
                Apakah Anda yakin ingin mengubah status akun ini?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-slate-800 dark:text-slate-300">
                Perubahan status akun pemerintah akan diterapkan. Pastikan Anda telah memverifikasi keputusan ini.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-white text-black dark:text-white hover:bg-gray-200">
                Batal
              </AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-600 text-white hover:bg-red-700"
                onClick={() => handleDeleteAccount(account.id)}
              >
                {`${finalStatus()}`}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      );
    },
  },
];
