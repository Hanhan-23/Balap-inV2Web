// components/data_rekomendasi/StatusUrgentBadge.tsx
import StatusBadge from "@/components/data_rekomendasi/status-badge";

export default function StatusUrgentBadge({ value }: { value: string }) {
  return <StatusBadge type="urgent" value={value} />;
}
