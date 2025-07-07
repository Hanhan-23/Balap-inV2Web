import { ReactElement } from "react"; // Tambahkan ini!
import {
  RoadHorizonIcon,
  LightbulbIcon,
  BridgeIcon,
} from "@phosphor-icons/react";

interface Props {
  jenis: string;
}

export default function JenisBadge({ jenis }: Props) {
  const iconMap: Record<string, ReactElement> = {
    jalan: (
      <RoadHorizonIcon
        size={14}
        weight="bold"
        className="text-stone-600 dark:text-stone-300"
      />
    ),
    lampu_jalan: (
      <LightbulbIcon
        size={14}
        weight="bold"
        className="text-yellow-500 dark:text-yellow-400"
      />
    ),
    jembatan: (
      <BridgeIcon
        size={14}
        weight="bold"
        className="text-amber-600 dark:text-amber-400"
      />
    ),
  };

  return (
    <div
      className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs capitalize
        border border-slate-300 dark:border-slate-600
        text-muted-foreground dark:text-gray-200 dark:bg-slate-800/60"
    >
      {iconMap[jenis] || null}
      {jenis.replace(/_/g, " ")}
    </div>
  );
}
