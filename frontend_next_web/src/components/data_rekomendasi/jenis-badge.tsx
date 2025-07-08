import { ReactElement } from "react";
import { RoadHorizonIcon, LightbulbIcon, BridgeIcon } from "@phosphor-icons/react";

interface Props {
  jenis: string;
}

export default function JenisBadge({ jenis }: Props) {
  const iconMap: Record<string, ReactElement> = {
    jalan: <RoadHorizonIcon size={14} weight="bold" className="text-stone-600" />,
    lampu_jalan: <LightbulbIcon size={14} weight="bold" className="text-yellow-500" />,
    jembatan: <BridgeIcon size={14} weight="bold" className="text-amber-600" />,
  };

  return (
    <div className="inline-flex items-center gap-1 px-2 py-1 border text-xs capitalize rounded-full border-slate-300 text-muted-foreground">
      {iconMap[jenis] || null}
      {jenis.replace(/_/g, " ")}
    </div>
  );
}