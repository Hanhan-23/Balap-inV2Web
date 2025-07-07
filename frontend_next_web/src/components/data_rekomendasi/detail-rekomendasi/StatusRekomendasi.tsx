// components/data_rekomendasi/StatusRekomendasi.tsx
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import StatusBadge from "@/components/data_rekomendasi/status-badge";

type StatusRekom = "belum_valid" | "valid" | "proses" | "selesai";

interface StatusRekomendasiProps {
  status: StatusRekom;
  onChangeStatus: (newStatus: StatusRekom) => void;
}

export default function StatusRekomendasi({
  status,
  onChangeStatus,
}: StatusRekomendasiProps) {
  const statusList: StatusRekom[] = [
    "belum_valid",
    "valid",
    "proses",
    "selesai",
  ];
  return (
    <div className="flex items-center gap-2">
      <span className="font-medium dark:text-gray-200">
        Status Rekomendasi:
      </span>
      <StatusBadge type="rekom" value={status} />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="dark:border-gray-600 rounded-full dark:text-gray-200 dark:hover:bg-gray-700"
          >
            Ubah Status
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="dark:bg-gray-800 dark:border-gray-600">
          {statusList.map((s) => (
            <DropdownMenuItem
              key={s}
              onClick={() => onChangeStatus(s)}
              className="capitalize dark:text-gray-100 dark:hover:bg-gray-700"
            >
              {s.replace(/_/g, " ")}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
