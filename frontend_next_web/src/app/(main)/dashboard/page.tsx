"use client";

import { useState, useEffect } from "react";
import { PieDataItem, AppPieChart } from "@/components/dashboard/AppPieChart";
import CardList from "@/components/dashboard/CardList";
import MapComponent from "@/components/dashboard/Map";
import { ChartAreaInteractive } from "@/components/dashboard/ChartStatistic";
import {
  empatAnalisis as EmpatAnalisisType,
  rekomendasiBeranda as RekomendasiBerandaType,
  statistikBeranda as StatistikBerandaType,
  petaBeranda as PetaBerandaType,
} from "@/types/beranda";
import {
  getEmpatAnalisis,
  getRekomendasiBeranda,
  getStatistikBeranda,
  getPetaBeranda,
} from "@/services/berandaservices";
import DashboardStatSection from "@/components/dashboard/cardstat";
import { MapPinAreaIcon } from "@phosphor-icons/react/dist/ssr";

const SingleUserPage = () => {
  const [empatAnalisis, setEmpatAnalisis] = useState<EmpatAnalisisType>();
  const [rekomendasiBeranda, setRekomendasiBeranda] = useState<RekomendasiBerandaType[]>([]);
  const [statistikBeranda, setStatistikBeranda] = useState<StatistikBerandaType[]>([]);
  const [petaBeranda, setPetaBeranda] = useState<PetaBerandaType[]>([]);

  useEffect(() => {
    getEmpatAnalisis().then(setEmpatAnalisis).catch(console.error);
    getRekomendasiBeranda().then(setRekomendasiBeranda).catch(console.error);
    getStatistikBeranda().then(setStatistikBeranda).catch(console.error);
    getPetaBeranda().then(setPetaBeranda).catch(console.error);
  }, []);

  // HAPUS fill!
  const chartData: PieDataItem[] = [
    {
      browser: "JLT",
      visitors: empatAnalisis?.jumlah_laporan_terkini ?? 0,
    },
    {
      browser: "RK",
      visitors: empatAnalisis?.total_rekomendasi_terkini ?? 0,
    },
    {
      browser: "RT",
      visitors: empatAnalisis?.total_rekomendasi_tervalidasi ?? 0,
    },
    {
      browser: "RBV",
      visitors: empatAnalisis?.total_rekomendasi_butuh_validasi ?? 0,
    },
  ];

  const dummyData = statistikBeranda.map((item) => ({
    date: item.date,
    desktop: item.jalan,
    mobile: item.lampu,
    device: item.jembatan,
  }));

  return (
    <div className="flex flex-col gap-4">
      {/* Judul */}
      <div className="rounded-xl mb-2">
        <h1 className="text-2xl font-bold">Welcome to BALAP-IN</h1>
        <p className="text-sm text-gray-600 -mt-1">
          Batam Lapor Infrastruktur Jalan
        </p>
      </div>

      {/* Stat Card Grid */}
      <DashboardStatSection empatAnalisis={empatAnalisis} />

      {/* Statistik Tambahan */}
      <div>
        <ChartAreaInteractive
          itemStatistik={dummyData}
          title="Statistik"
          titleSize="text-xl"
          showDescription={false}
        />
      </div>

      {/* Map */}
      <div className="border rounded-xl px-7 py-5">
        <div className="w-full h-[450px]">
          <div className="flex items-center gap-2 mb-4">
            <span className="p-1 bg-blue-100 border-blue-300 border rounded-md dark:bg-blue-900 dark:border-blue-700">
              <MapPinAreaIcon
                weight="bold"
                className="size-4 text-blue-600 dark:text-blue-300"
              />
            </span>
            <h1 className="text-base sm:text-xl font-semibold flex items-center dark:text-white">
              Peta Laporan Infrastruktur Jalan Batam{" "}
            </h1>
          </div>
          <MapComponent markersBeranda={petaBeranda} />
        </div>
      </div>

      {/* Konten utama */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full items-start">
        {/* Pie Chart */}
        <div className="flex flex-col gap-4 md:col-span-1">
          <AppPieChart data={chartData} />
        </div>
        {/* Rekomendasi dan Card List */}
        <div className="flex flex-col gap-4 md:col-span-2">
          <CardList rekomendasiData={rekomendasiBeranda} />
        </div>
      </div>
    </div>
  );
};

export default SingleUserPage;
