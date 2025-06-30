"use client";

import { useEffect, useState } from "react";
import { getDataRekomendasi } from "@/services/datarekomendasiservices";
import { DataTable } from "@/components/data_rekomendasi/data-table";
import { getColumns } from "@/components/data_rekomendasi/columns";
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

  const handleStatusUpdate = (id: string, newStatus: string) => {
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
        <DataTable columns={getColumns(handleStatusUpdate)} data={data} />
      )}
    </div>
  );
};

export default RecommendedPage;