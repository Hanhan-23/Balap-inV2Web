// components/data_laporan/JenisBadge.tsx
import {
  RoadHorizonIcon,
  LightbulbIcon,
  BridgeIcon,
} from "@phosphor-icons/react";

interface Props {
  jenis: string;
}

export default function JenisBadge({ jenis }: Props) {
  const iconMap: Record<string, JSX.Element> = {
    jalan: <RoadHorizonIcon size={14} weight="bold" className="text-stone-600" />,
    lampu_jalan: <LightbulbIcon size={14} weight="bold" className="text-yellow-500" />,
    jembatan: <BridgeIcon size={14} weight="bold" className="text-amber-600" />,
  };

  return (
    <div className="inline-flex items-center gap-1 px-2 py-1 border border-slate-300 rounded-full text-xs capitalize text-muted-foreground">
      {iconMap[jenis] || null}
      {jenis.replace(/_/g, " ")}
    </div>
  );
}
