"use client";

import { AppPieChart } from "@/components/dashboard/AppPieChart";
import CardList from "@/components/dashboard/CardList";
import MapComponent from "@/components/dashboard/Map";

// Statistik
import { ChartAreaInteractive } from "@/components/dashboard/ChartStatistic";
import { useState, useEffect } from "react";
import { empatAnalisis, rekomendasiBeranda } from "@/types/beranda";
import { getEmpatAnalisis, getRekomendasiBeranda } from "@/services/berandaservices";
import { APIProvider, Map } from "@vis.gl/react-google-maps";

// export default function DashboardPage() {
//   const [statistikLaporan, setStatistikLaporan] = useState<
//     StatistikLaporanUtama[]
//   >([]);

const SingleUserPage = () => {
  const [ empatAnalisis, setEmpatAnalisis ] = useState<empatAnalisis>()
  const [ rekomendasiBeranda, setRekomendasiBeranda ] = useState<rekomendasiBeranda[]>([]);

  useEffect(() => {
    getEmpatAnalisis()
    .then((data) => {
      setEmpatAnalisis(data);
    })
    .catch((error) => {
      console.error(`error fetching data: ${error}`);
    });
  }, []);

  useEffect(() => {
    getRekomendasiBeranda()
    .then((data) => {
      setRekomendasiBeranda(data);
    })
    .catch((error) => {
      console.error(`error fetching data: ${error}`);
    });
  }, []);

  // Data for the pie chart
  const pieChartData = [
    { name: "Total Reports", value: empatAnalisis?.jumlah_laporan_terkini ?? 0, color: "#3b82f6" },
    { name: "Current Recommendations", value: empatAnalisis?.total_rekomendasi_terkini ?? 0, color: "#a855f7" },
    { name: "Validated Recommendations", value: empatAnalisis?.total_rekomendasi_tervalidasi ?? 0, color: "#22c55e" },
    { name: "Needs Validation", value: empatAnalisis?.total_rekomendasi_butuh_validasi ?? 0, color: "#f59e0b" },
  ];

  const dummyData: rekomendasiBeranda[] = [
  { id: "2025-06-01", jumlah_laporan: 10, status_urgent: 5 },
  { id: "2025-06-02", jumlah_laporan: 7, status_urgent: 3 },
];

  return (
    <div className="space-y-4">
      {/* Section awal */}
      <div className="bg-blue-100 px-6 py-2 rounded-xl shadow text-center">
        <h1 className="text-xl font-bold text-gray-800">Welcome to BALAP-IN</h1>
        <p className="text-sm text-gray-600 -mt-1">
          Batam Lapor Infrastruktur Jalan
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full items-start">
        {/* Kolom Kiri: ChartPie + CardList */}
        <div className="flex flex-col gap-4 md:col-span-1">
          <AppPieChart data={pieChartData} />
          <div className="bg-white rounded-xl shadow p-4">
            <CardList rekomendasiData={rekomendasiBeranda} />
          </div>
        </div>

        {/* Kolom Kanan: Ringkasan + MAP */}
        <div className="flex flex-col gap-4 md:col-span-2">
          {/* Ringkasan Card */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1-4 */}
            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg border border-blue-200 dark:border-blue-800 shadow-sm">
              <h3 className="text-sm font-medium text-blue-900 dark:text-blue-100">Jumlah Laporan Terkini</h3>
              <p className="text-2xl font-bold text-blue-800 dark:text-blue-200 mt-1">{empatAnalisis?.jumlah_laporan_terkini}</p>
            </div>
            <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg border border-purple-200 dark:border-purple-800 shadow-sm">
              <h3 className="text-sm font-medium text-purple-900 dark:text-purple-100">Rekomendasi Terkini</h3>
              <p className="text-2xl font-bold text-purple-800 dark:text-purple-200 mt-1">{empatAnalisis?.total_rekomendasi_terkini}</p>
            </div>
            <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg border border-green-200 dark:border-green-800 shadow-sm">
              <h3 className="text-sm font-medium text-green-900 dark:text-green-100">Rekomendasi Tervalidasi</h3>
              <p className="text-2xl font-bold text-green-800 dark:text-green-200 mt-1">{empatAnalisis?.total_rekomendasi_tervalidasi}</p>
            </div>
            <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-lg border border-amber-200 dark:border-amber-800 shadow-sm">
              <h3 className="text-sm font-medium text-amber-900 dark:text-amber-100">Rekomendasi Butuh Validasi</h3>
              <p className="text-2xl font-bold text-amber-800 dark:text-amber-200 mt-1">{empatAnalisis?.total_rekomendasi_butuh_validasi}</p>
            </div>
          </div>

          {/* MAP */}
          <div className="bg-white rounded-xl shadow p-4">
            <div className="w-full h-[550px] md:h-[450px]">
              <MapComponent />
            </div>
          </div>
        </div>
      </div>

      {/* Statistik Tambahan */}
      <div>
        <ChartAreaInteractive 
        itemStatistik={dummyData}
        title='Statistik' 
        titleSize="text-xl" 
        showDescription={false} />
      </div>

    {/* tag penutup */}
    </div>
  );
}

export default SingleUserPage;