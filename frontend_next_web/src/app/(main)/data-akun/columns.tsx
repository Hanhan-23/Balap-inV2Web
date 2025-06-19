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

export type Account = {
  id: number;
  username: string;
  email: string;
  no_telp: string;
  alamat: string;
  jabatan: string;
};

const handleDeleteAccount = (id: number) => {
  console.log(`Akun dengan ID ${id} telah dihapus.`);
  // Di sini bisa ditambahkan pemanggilan API jika diperlukan
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
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "username",
    header: "Username",
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
    accessorKey: "alamat",
    header: "Alamat",
  },
  {
    accessorKey: "jabatan",
    header: "Jabatan",
  },
  {
    id: "aksi",
    header: "Aksi",
    cell: ({ row }) => {
      const account = row.original;

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
                Apakah Anda yakin ingin menghapus akun ini?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-slate-800 dark:text-slate-300">
                Aksi ini tidak dapat dibatalkan. Akun akan dihapus secara permanen dan tidak bisa dipulihkan kembali.
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
                Hapus Permanen
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      );
    },
  },
];
