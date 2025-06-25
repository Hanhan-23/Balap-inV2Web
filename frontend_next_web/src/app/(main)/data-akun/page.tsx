// app/(dashboard)/akun/page.tsx
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
    <div className="p-4">
      {isLoading ? (
        <p className="text-center">Memuat data akun...</p>
      ) : (
        <DataTable columns={columns(handleStatusUpdate)} data={data} />
      )}
    </div>
  );
};

export default AkunPage;
