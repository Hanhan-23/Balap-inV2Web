"use client";

import { useEffect, useState } from "react";
import { getDataRekomendasi } from "@/services/datarekomendasiservices";
import { DataTable } from "@/components/data_rekomendasi/data-table";
import { StatusRekom } from "@/types/data-rekomendasi";
import { rekomendasi } from "@/types/rekomendasi-schema";

const RecommendedPage = () => {
  const [data, setData] = useState<rekomendasi[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getDataRekomendasi("");
        setData(res);
      } catch (err) {
        console.error("Gagal mengambil data rekomendasi:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleStatusUpdate = (id: string, newStatus: StatusRekom) => {
  setData((prev) =>
    prev.map((item) =>
      item.id === id ? { ...item, status_rekom: newStatus } : item
    )
  );
};


  return (
    <div className="p-4">
      {isLoading ? (
        <p className="text-center">Memuat data...</p>
      ) : (
        <DataTable data={data} onStatusUpdated={handleStatusUpdate} />
      )}
    </div>
  );
};

export default RecommendedPage;
