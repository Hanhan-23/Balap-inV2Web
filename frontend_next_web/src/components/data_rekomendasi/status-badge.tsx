import { cn } from "@/lib/utils";

interface Props {
  type: "urgent" | "rekom";
  value: string;
}

export default function StatusBadge({ type, value }: Props) {
  const urgentMap: Record<string, string> = {
    tinggi: "bg-red-200 text-red-600",
    sedang: "bg-orange-200 text-orange-600",
    rendah: "bg-green-200 text-green-800",
  };

  const rekomMap: Record<string, string> = {
    belum_valid: "bg-purple-200 text-purple-600",
    valid: "bg-indigo-200 text-indigo-700",
    proses: "bg-yellow-200 text-yellow-700",
    selesai: "bg-teal-200 text-teal-800",
  };

  const classes =
    type === "urgent"
      ? urgentMap[value] ?? "bg-gray-100 text-gray-600"
      : rekomMap[value] ?? "bg-gray-100 text-gray-600";

  return (
    <span className={cn("px-2 py-1 rounded-full text-xs capitalize w-max", classes)}>
      {value.replace(/_/g, " ")}
    </span>
  );
}