import { cn } from "@/lib/utils";

interface Props {
  value: "verif" | "belum_verif";
}

export default function StatusBadge({ value }: Props) {
  const styleMap: Record<Props["value"], string> = {
    verif:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-200 dark:border-green-700",
    belum_verif:
      "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-200 dark:border-red-700",
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
