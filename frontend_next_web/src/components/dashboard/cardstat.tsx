"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  FileTextIcon,
  NotePencilIcon,
  CheckCircleIcon,
  WarningCircleIcon,
} from "@phosphor-icons/react";

export default function DashboardStatSection({
  empatAnalisis,
}: {
  empatAnalisis?: {
    jumlah_laporan_terkini?: number;
    total_rekomendasi_terkini?: number;
    total_rekomendasi_tervalidasi?: number;
    total_rekomendasi_butuh_validasi?: number;
  };
}) {
  // Konfigurasi statistik card
  const statCards = [
    {
      description: "Jumlah Laporan Terkini",
      value: empatAnalisis?.jumlah_laporan_terkini ?? 0,
      icon: <FileTextIcon size={24} weight="duotone" />,
    },
    {
      description: "Rekomendasi Terkini",
      value: empatAnalisis?.total_rekomendasi_terkini ?? 0,
      icon: <NotePencilIcon size={24} weight="duotone" />,
    },
    {
      description: "Rekomendasi Tervalidasi",
      value: empatAnalisis?.total_rekomendasi_tervalidasi ?? 0,
      icon: <CheckCircleIcon size={24} weight="duotone" />,
    },
    {
      description: "Butuh Validasi",
      value: empatAnalisis?.total_rekomendasi_butuh_validasi ?? 0,
      icon: <WarningCircleIcon size={24} weight="duotone" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {statCards.map((card) => (
        <Card
          key={card.description}
          className="bg-white/80 border border-blue-100 shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 transition-colors"
        >
          <CardHeader>
            <div className="mb-2 flex items-center justify-start">
              <div
                className="rounded-full bg-blue-100 text-blue-500 dark:bg-blue-900 dark:text-blue-300 w-10 h-10 flex items-center justify-center shadow"
              >
                {card.icon}
              </div>
            </div>
            <CardDescription className="text-sm font-medium dark:text-blue-200">
              {card.description}
            </CardDescription>
            <CardTitle className="text-2xl font-bold tabular-nums @[250px]/card:text-3xl dark:text-white">
              {card.value}
            </CardTitle>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
