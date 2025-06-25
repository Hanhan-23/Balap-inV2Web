// components/data_akun/StatusBadge.tsx
import { cn } from "@/lib/utils";

interface Props {
  value: "verif" | "belum_verif";
}

export default function StatusBadge({ value }: Props) {
  const styleMap: Record<Props["value"], string> = {
    verif:
      "bg-green-200 text-green-700 dark:bg-green-500/20 dark:text-green-100",
    belum_verif:
      "bg-red-200 text-red-700 dark:bg-red-500/20 dark:text-red-100",
  };

  return (
    <span
      className={cn(
        "px-2 py-1 text-xs rounded-full capitalize inline-block w-fit",
        styleMap[value]
      )}
    >
      {value === "verif" ? "Diverifikasi" : "Belum Verifikasi"}
    </span>
  );
}
