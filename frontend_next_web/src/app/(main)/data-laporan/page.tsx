// app/(dashboard)/laporan/page.tsx
"use client";

import { useEffect, useState } from "react";
import { getCardLaporan } from "@/services/datalaporanservices";
import { DataTable } from "@/components/data_laporan/data-table";
import { Laporan } from "@/types/data-laporan";

const LaporanPage = () => {
  const [data, setData] = useState<Laporan[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getCardLaporan("");
        setData(result);
      } catch (error) {
        console.error("Gagal mengambil data laporan:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleStatusUpdate = (id: string, newStatus: string) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item
      )
    );
  };

  return (
    <div className="p-4">
      {isLoading ? (
        <p className="text-center">Memuat data laporan...</p>
      ) : (
        <DataTable data={data} onStatusUpdated={handleStatusUpdate} />
      )}
    </div>
  );
};

export default LaporanPage;
