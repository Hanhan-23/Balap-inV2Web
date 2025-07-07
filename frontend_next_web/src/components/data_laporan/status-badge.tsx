// components/data_laporan/StatusBadge.tsx
import { cn } from "@/lib/utils";

interface Props {
  value: string;
}

const displayMap: Record<string, string> = {
  selesai: "Ditampilkan",
  disembunyikan: "Disembunyikan",
};

export default function StatusBadge({ value }: Props) {
  const styleMap: Record<string, string> = {
    selesai:
      "bg-green-200 text-green-700 dark:bg-green-800/30 dark:text-green-300",
    disembunyikan:
      "bg-gray-200 text-gray-600 dark:bg-slate-700/60 dark:text-gray-300",
  };

  return (
    <span
      className={cn(
        "px-2 py-1 text-xs capitalize rounded-full inline-block transition-colors duration-200",
        styleMap[value] ?? "bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-300"
      )}
    >
      {displayMap[value] ?? value}
    </span>
  );
}
