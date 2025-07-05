// components/data_laporan/StatusBadge.tsx
import { cn } from "@/lib/utils";

interface Props {
  value: string;
}

const displayMap : Record<string, string> = {
  selesai:"Ditampilkan",
  disembunyikan: "Disembunyikan",
}

export default function StatusBadge({ value }: Props) {
  const styleMap: Record<string, string> = {
    selesai: "bg-green-200 text-green-600 dark:bg-red-300/50 dark:text-slate-50",
    disembunyikan: "bg-gray-200 text-gray-600 dark:bg-stone-800 dark:text-neutral-300",
  };

  return (
    <span
      className={cn(
        "px-2 py-1 text-xs capitalize rounded-full inline-block",
        styleMap[value] ?? "bg-slate-100 text-slate-500"
      )}
    >
      {displayMap[value]}
    </span>
  );
}
