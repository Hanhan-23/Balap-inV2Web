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
    setIsLoading(true);
    getDataRekomendasi("")
      .then((res) => setData(res))
      .catch((err) => {
        console.error("Gagal mengambil data rekomendasi:", err);
        setData([]);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleStatusUpdate = (id: string, newStatus: StatusRekom) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status_rekom: newStatus } : item
      )
    );
  };

  return (
    <>
      <DataTable
        data={data}
        onStatusUpdated={handleStatusUpdate}
        isLoading={isLoading}
      />
    </>
  );
};

export default RecommendedPage;
