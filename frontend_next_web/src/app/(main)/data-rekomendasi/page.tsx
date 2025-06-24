"use client";

import { useEffect, useState } from "react";
import { getDataRekomendasi } from "@/services/datarekomendasiservices";
import { DataTable } from "../../../components/data_rekomendasi/data-table";
import { rekomendasi } from "@/types/data-rekomendasi";
import { columns } from "../../../components/data_rekomendasi/columns";

const RecommendedPage = () => {
  const [data, setData] = useState<rekomendasi[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // ambil data dari backend
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

  // handler untuk update status di UI setelah berhasil update ke backend
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
        <p>Loading...</p>
      ) : (
        <DataTable columns={columns(handleStatusUpdate)} data={data} />
      )}
    </div>
  );
};

export default RecommendedPage;
