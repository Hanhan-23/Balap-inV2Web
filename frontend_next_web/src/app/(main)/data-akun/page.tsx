"use client";

import { useEffect, useState } from "react";
import { getCardAkun } from "@/services/akunservices";
import { DataTable } from "@/components/data_akun/data-table";
import { columns } from "@/components/data_akun/columns";
import type { Account } from "@/components/data_akun/columns";

const AkunPage = () => {
  const [data, setData] = useState<Account[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const res = await getCardAkun(null);
        setData(res);
      } catch (err) {
        console.error("Gagal mengambil data akun:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  const handleStatusUpdate = (id: string, newStatus: Account["status"]) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item
      )
    );
  };

  return (
    <div className="container mx-auto py-8">
      <DataTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        onStatusUpdated={handleStatusUpdate}
      />
    </div>
  );
};

export default AkunPage;
