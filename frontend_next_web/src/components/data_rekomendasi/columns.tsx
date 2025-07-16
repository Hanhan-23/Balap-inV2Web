"use client";

import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { rekomendasi } from "@/types/rekomendasi-schema";
import JenisBadge from "./jenis-badge";
import StatusBadge from "./status-badge";
import { updateStatusRekomendasi } from "@/services/datarekomendasiservices";
import { StatusRekom } from "@/types/data-rekomendasi";
import { ColumnDef, HeaderContext } from "@tanstack/react-table";
import { useRouter } from "next/navigation";

const ActionsCell = ({
  item,
  onStatusUpdated,
}: {
  item: rekomendasi;
  onStatusUpdated: (id: string, status: StatusRekom, result?: "success" | "error") => void;
}) => {
  const router = useRouter();
  const statusList: StatusRekom[] = ["belum_valid", "valid", "proses", "selesai"];

  const handleChangeStatus = async (status: StatusRekom) => {
    try {
      await updateStatusRekomendasi(item.id, { status_rekom: status });
      onStatusUpdated(item.id, status, "success");
    } catch (err) {
      console.error(err);
      onStatusUpdated(item.id, item.status_rekom, "error");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button id="dropdown-menu-trigger" variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Aksi</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(item.id)}>
          Salin ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push(`/data-rekomendasi/${item.id}`)}>
          Detail
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger id="dropdown-menu-status">Ubah Status</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            {statusList.map((s) => (
              <DropdownMenuItem
                key={s}
                onClick={() => handleChangeStatus(s)}
                className="capitalize"
              >
                {s.replace(/_/g, " ")}
              </DropdownMenuItem>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const getColumns = (
  onStatusUpdated: (id: string, status: StatusRekom, result?: "success" | "error") => void
): ColumnDef<rekomendasi>[] => [
  {
    accessorKey: "laporan.judul",
    header: (ctx: HeaderContext<rekomendasi, unknown>) => (
      <Button
        variant="ghost"
        onClick={() =>
          ctx.column.toggleSorting(ctx.column.getIsSorted() === "asc")
        }
        className="!p-0"
      >
        Judul
        <ArrowUpDown className="ml-0 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const item = row.original;
      return item.laporan.judul.length > 25
        ? item.laporan.judul.slice(0, 25) + "..."
        : item.laporan.judul;
    },
  },
  {
    accessorKey: "laporan.jenis",
    header: "Jenis Infrastruktur",
    cell: ({ getValue }) => <JenisBadge jenis={getValue() as string} />,
  },
  {
    accessorKey: "laporan.alamat",
    header: "Alamat",
    cell: ({ getValue }) => {
      const text = getValue() as string;
      return text.length > 22 ? `${text.slice(0, 22)}...` : text;
    },
  },
  {
    accessorKey: "tingkat_urgent",
    header: (ctx: HeaderContext<rekomendasi, unknown>) => (
      <Button
        variant="ghost"
        onClick={() =>
          ctx.column.toggleSorting(ctx.column.getIsSorted() === "asc")
        }
      >
        Tingkat Urgensi
        <ArrowUpDown className="ml-0 h-4 w-4" />
      </Button>
    ),
    cell: ({ getValue }) => {
      const value = getValue() as number;
      return <div className="text-center">{(value * 100).toFixed(2)}%</div>;
    },
  },
  {
    accessorKey: "status_urgent",
    header: "Status Urgensi",
    cell: ({ getValue }) => (
      <StatusBadge type="urgent" value={getValue() as string} />
    ),
  },
  {
    accessorKey: "status_rekom",
    header: "Tindakan",
    cell: ({ getValue }) => (
      <StatusBadge type="rekom" value={getValue() as string} />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <ActionsCell item={row.original} onStatusUpdated={onStatusUpdated} />
    ),
  },
];
