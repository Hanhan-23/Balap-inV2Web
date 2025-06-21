'use client'

import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { TrendingUp, TriangleAlert } from "lucide-react";
import AppPieChart from "@/components/AppPieChart";
import CardList from "@/components/CardList";
import AppAreaChart from "@/components/AppAreaChart";
import Image from "next/image";
import { useState, useEffect } from "react";
import { empatAnalisis, rekomendasiBeranda } from "@/types/beranda";
import { getEmpatAnalisis, getRekomendasiBeranda } from "@/services/berandaservices";

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

  return (
    <div className="">
      {/* Welcome Message Section - Added this */}
      <div className="bg-blue-200 dark:bg-zinc-900 text-center text-black dark:text-white p-2 rounded-md shadow-lg shadow-blue-900/20 dark:shadow-blue-500/20">
        <h1 className="text-xl font-bold">Welcome to BALAP-IN </h1>
        <h2 className="text-md font-bold">Batam Lapor Infrastruktur Jalan</h2>
      </div>

      {/* CONTAINER */}
      <div className="mt-4 flex flex-col xl:flex-row gap-8 mb-8">
        {/* LEFT - PIE CHART AND CARD LIST */}
        <div className="w-full xl:w-1/3 space-y-6">
          {/* PIE CHART CONTAINER */}
          <div className="bg-primary-foreground p-2 rounded-lg h-[280px] shadow-lg shadow-blue-700/20">
            <h1 className="text-md font-medium mb-0 flex items-center gap-1 dark:text-white">
              Ringkasan terkini data laporan masyarakat
              <TrendingUp className="h-6 w-6 text-green-500" />
            </h1>
            <div className="h-[calc(100%-24px)]">
              <AppPieChart data={pieChartData} />
            </div>
          </div>

          {/* Rest of your existing code remains the same... */}
          {/* CARD LIST CONTAINER */}
          <div className="bg-primary-foreground p-6 rounded-lg shadow-lg shadow-blue-700/20">
            <div className="flex items-center gap-2 mb-4">
              <TriangleAlert className="h-6 w-6 text-red-600" />
              <h2 className="text-lg font-semibold text-red-600">Tangani Segera</h2>
            </div>
            <CardList rekomendasiData={rekomendasiBeranda}/>
          </div>
        </div>

        {/* RIGHT - STATS, LINE CHART, AND MAP */}
        <div className="w-full xl:w-2/3 space-y-6">
          {/* STATS CONTAINER */}
          <div className="bg-primary-foreground p-4 rounded-lg shadow-lg shadow-blue-700/20">
            <div className="flex gap-4">
              <div className="flex-1 bg-blue-100 dark:bg-blue-900/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <h3 className="text-sm font-medium">Jumlah Laporan Terkini</h3>
                <p className="text-2xl font-bold mt-1">{empatAnalisis?.jumlah_laporan_terkini}</p>
              </div>
              <div className="flex-1 bg-purple-100 dark:bg-purple-900/30 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                <h3 className="text-sm font-medium">Rekomendasi Terkini</h3>
                <p className="text-2xl font-bold mt-1">{empatAnalisis?.total_rekomendasi_terkini}</p>
              </div>
              <div className="flex-1 bg-green-100 dark:bg-green-900/30 p-4 rounded-lg border border-green-200 dark:border-green-800">
                <h3 className="text-sm font-medium">Rekomendasi Tervalidasi</h3>
                <p className="text-2xl font-bold mt-1">{empatAnalisis?.total_rekomendasi_tervalidasi}</p>
              </div>
              <div className="flex-1 bg-amber-100 dark:bg-amber-900/30 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
                <h3 className="text-sm font-medium">Rekomendasi Butuh Validasi</h3>
                <p className="text-2xl font-bold mt-1">{empatAnalisis?.total_rekomendasi_butuh_validasi}</p>
              </div>
            </div>
          </div>

          {/* MAP CONTAINER */}
          <div className="bg-primary-foreground p-4 rounded-lg shadow-lg shadow-blue-700/20">
            <div className="flex items-center justify-between mb-3">
              <h1 className="text-xl font-semibold">Peta Laporan Infrastruktur Jalan Batam</h1>
              <Button variant="outline">Lihat Detail</Button>
            </div>
            <div className="relative w-full h-[400px] rounded-md overflow-hidden border">
              <Image
                src="/maps.png"
                alt="Peta lokasi laporan masyarakat"
                fill
                className="object-cover"
              />
            </div>
            <div className="mt-4 flex gap-2">
              <Badge variant="outline" className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                Laporan Baru
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                Dalam Proses
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                Selesai
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* LINE CHART CONTAINER */}
      <div className="w-full">
        <div className="bg-primary-foreground p-4 rounded-lg shadow-lg shadow-blue-700/20">
          <h2 className="text-lg font-semibold mb-2 text-cyan-700">Perkembangan Laporan Infrastruktur Jalan Batam</h2>
          <AppAreaChart />
        </div>
      </div>
    </div>
  );
};

export default SingleUserPage;