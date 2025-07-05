"use client";

import { PieDataItem , AppPieChart } from "@/components/dashboard/AppPieChart";
import CardList from "@/components/dashboard/CardList";
import MapComponent from "@/components/dashboard/Map";
import { ChartAreaInteractive } from "@/components/dashboard/ChartStatistic";
import { useState, useEffect } from "react";
import {
  empatAnalisis,
  rekomendasiBeranda,
  statistikBeranda,
  petaBeranda,
} from "@/types/beranda";
import {
  getEmpatAnalisis,
  getRekomendasiBeranda,
  getStatistikBeranda,
  getPetaBeranda,
} from "@/services/berandaservices";

const SingleUserPage = () => {
  const [empatAnalisis, setEmpatAnalisis] = useState<empatAnalisis>();
  const [rekomendasiBeranda, setRekomendasiBeranda] = useState<rekomendasiBeranda[]>([]);
  const [statistikBeranda, setStatistikBeranda] = useState<statistikBeranda[]>([]);
  const [petaBeranda, setPetaBeranda] = useState<petaBeranda[]>([]);

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

  useEffect(() => {
    getStatistikBeranda()
      .then((data) => {
        setStatistikBeranda(data);
      })
      .catch((error) => {
        console.error(`error fetching data: ${error}`);
      });
  }, []);

  useEffect(() => {
    getPetaBeranda()
      .then((data) => {
        setPetaBeranda(data);
      })
      .catch((error) => {
        console.error(`error fetching data: ${error}`);
      });
  }, []);
  
  const chartData: PieDataItem[] = [
  {
    browser: "JLT",
    visitors: empatAnalisis?.jumlah_laporan_terkini ?? 0,
    fill: "var(--color-JLT)",
  },
  {
    browser: "RK",
    visitors: empatAnalisis?.total_rekomendasi_terkini ?? 0,
    fill: "var(--color-RK)",
  },
  {
    browser: "RT",
    visitors: empatAnalisis?.total_rekomendasi_tervalidasi ?? 0,
    fill: "var(--color-RT)",
  },
  {
    browser: "RBV",
    visitors: empatAnalisis?.total_rekomendasi_butuh_validasi ?? 0,
    fill: "var(--color-RBV)",
  },
] as const;

  const dummyData = statistikBeranda.map((item) => ({
    date: item.date,
    desktop: item.jalan,
    mobile: item.lampu,
    device: item.jembatan,
  }));

  return (
    <div className="space-y-4">
      {/* Judul */}
      <div className="bg-blue-100 dark:bg-blue-950 px-6 py-4 rounded-xl shadow text-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Welcome to BALAP-IN
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-300 -mt-1">
          Batam Lapor Infrastruktur Jalan
        </p>
      </div>

      {/* Pembuka konten body */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full items-start">
        {/* Diagram lingkaran dan cardlist rekomendasi */}
        <div className="flex flex-col gap-4 md:col-span-1">
          <AppPieChart data={chartData} />
        </div>

        {/* Section Card Rekomendasi + Map */}
        <div className="flex flex-col gap-4 md:col-span-2">
          {/* Layout Card Rekomendasi */}
          <div className="grid grid-cols-2  lg:grid-cols-4 gap-2">
            {/* Card 1 */}
            <div className="flex flex-col items-start justify-center bg-blue-100 dark:bg-blue-900/40 p-3 rounded-lg border border-blue-200 dark:border-blue-700 shadow-sm">
              <h3 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-0.5">
                Jumlah Laporan Terkini
              </h3>
              <p className="text-xl font-bold text-blue-800 dark:text-blue-200">
                {empatAnalisis?.jumlah_laporan_terkini}
              </p>
            </div>

            {/* Card 2 */}
            <div className="flex flex-col items-start justify-center bg-purple-100 dark:bg-purple-900/40 p-3 rounded-lg border border-purple-200 dark:border-purple-700 shadow-sm">
              <h3 className="text-sm font-medium text-purple-900 dark:text-purple-100 mb-0.5">
                Rekomendasi Terkini
              </h3>
              <p className="text-xl font-bold text-purple-800 dark:text-purple-200">
                {empatAnalisis?.total_rekomendasi_terkini}
              </p>
            </div>

            {/* Card 3 */}
            <div className="flex flex-col items-start justify-center bg-green-100 dark:bg-green-900/40 p-3 rounded-lg border border-green-200 dark:border-green-700 shadow-sm">
              <h3 className="text-sm font-medium text-green-900 dark:text-green-100 mb-0.5">
                Rekomendasi Tervalidasi
              </h3>
              <p className="text-xl font-bold text-green-800 dark:text-green-200">
                {empatAnalisis?.total_rekomendasi_tervalidasi}
              </p>
            </div>

            {/* Card 4 */}
            <div className="flex flex-col items-start justify-center bg-amber-100 dark:bg-amber-900/40 p-3 rounded-lg border border-amber-200 dark:border-amber-700 shadow-sm">
              <h3 className="text-sm font-medium text-amber-900 dark:text-amber-100 mb-0.5">
                Rekomendasi Butuh Validasi
              </h3>
              <p className="text-xl font-bold text-amber-800 dark:text-amber-200">
                {empatAnalisis?.total_rekomendasi_butuh_validasi}
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-neutral-900 border dark:border-gray-800 rounded-xl shadow p-4">
            <CardList rekomendasiData={rekomendasiBeranda} />
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="bg-white dark:bg-neutral-900 border dark:border-gray-800 rounded-xl shadow p-4">
        <div className="w-full h-[550px] md:h-[450px] ">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Peta Laporan Infrastruktur Jalan Batam</h3>
          <div>
            <MapComponent markersBeranda={petaBeranda} />
          </div>
        </div>
      </div>

      {/* Statistik Tambahan */}
      <div>
        <ChartAreaInteractive
          itemStatistik={dummyData}
          title="Statistik"
          titleSize="text-xl"
          showDescription={false}
        />
      </div>

      {/* tag penutup */}
    </div>
  );
};

export default SingleUserPage;
