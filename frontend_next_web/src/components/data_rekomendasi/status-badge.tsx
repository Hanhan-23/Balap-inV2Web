import { cn } from "@/lib/utils";

interface Props {
  type: "urgent" | "rekom";
  value: string;
}

export default function StatusBadge({ type, value }: Props) {
  const urgentMap: Record<string, string> = {
    tinggi: "bg-red-200 text-red-600 dark:bg-red-500/20 dark:text-red-300",
    sedang: "bg-orange-200 text-orange-600 dark:bg-orange-500/20 dark:text-orange-300",
    rendah: "bg-green-200 text-green-800 dark:bg-green-500/20 dark:text-green-300",
  };

  const rekomMap: Record<string, string> = {
    belum_valid: "bg-purple-200 text-purple-600 dark:bg-purple-500/20 dark:text-purple-200",
    valid: "bg-indigo-200 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-200",
    proses: "bg-yellow-200 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-200",
    selesai: "bg-teal-200 text-teal-800 dark:bg-teal-500/20 dark:text-teal-200",
  };

  const classes =
    type === "urgent"
      ? urgentMap[value] ?? "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
      : rekomMap[value] ?? "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300";

  return (
    <span className={cn("px-2 py-1 rounded-full text-xs capitalize w-max", classes)}>
      {value.replace(/_/g, " ")}
    </span>
  );
}
