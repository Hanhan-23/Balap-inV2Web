"use client";

import { AppPieChart } from "@/components/dashboard/AppPieChart";
import CardList from "@/components/dashboard/CardList";
import MapComponent from "@/components/dashboard/Map";

// Statistik
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
// import { APIProvider, Map } from "@vis.gl/react-google-maps";

const SingleUserPage = () => {
  const [empatAnalisis, setEmpatAnalisis] = useState<empatAnalisis>();
  const [rekomendasiBeranda, setRekomendasiBeranda] = useState<
    rekomendasiBeranda[]
  >([]);
  const [statistikBeranda, setStatistikBeranda] = useState<statistikBeranda[]>(
    []
  );
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

  // ambil data bagian pie chart
  const chartData = [
    {
      browser: "JLT",
      visitors: empatAnalisis?.jumlah_laporan_terkini,
      fill: "var(--color-JLT)",
    },
    {
      browser: "RK",
      visitors: empatAnalisis?.total_rekomendasi_terkini,
      fill: "var(--color-RK)",
    },
    {
      browser: "RT",
      visitors: empatAnalisis?.total_rekomendasi_tervalidasi,
      fill: "var(--color-RT)",
    },
    {
      browser: "RBV",
      visitors: empatAnalisis?.total_rekomendasi_butuh_validasi,
      fill: "var(--color-RBV)",
    },
  ];

  // ambil data statistik
  const dummyData = statistikBeranda.map((item) => ({
    date: item.date,
    desktop: item.jalan,
    mobile: item.lampu,
    device: item.jembatan,
  }));

  return (
    <div className="space-y-4">
      {/* Judul */}
      <div className="bg-blue-100 px-6 py-2 rounded-xl shadow text-center">
        <h1 className="text-xl font-bold text-gray-800">Welcome to BALAP-IN</h1>
        <p className="text-sm text-gray-600 -mt-1">
          Batam Lapor Infrastruktur Jalan
        </p>
      </div>

      {/* Pembuka konten body */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full items-start">
        {/* Diagram lingkaran dan cardlist rekomendasi */}
        <div className="flex flex-col gap-4 md:col-span-1">
          <AppPieChart data={chartData} />
          <div className="bg-white rounded-xl shadow p-4">
            <CardList rekomendasiData={rekomendasiBeranda} />
          </div>
        </div>

        {/* Section Card Rekomendasi + Map */}
        <div className="flex flex-col gap-4 md:col-span-2">
          {/* Layout Card Rekomendasi */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1 */}
            <div className="flex flex-col justify-between min-h-[100px] bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg border border-blue-200 dark:border-blue-800 shadow-sm">
              <h3 className="text-sm font-medium text-blue-900 dark:text-blue-100">
                Jumlah Laporan Terkini
              </h3>
              <p className="text-2xl font-bold text-blue-800 dark:text-blue-200 mt-1">
                {empatAnalisis?.jumlah_laporan_terkini}
              </p>
            </div>

            {/* Card 2 */}
            <div className="flex flex-col justify-between min-h-[100px] bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg border border-purple-200 dark:border-purple-800 shadow-sm">
              <h3 className="text-sm font-medium text-purple-900 dark:text-purple-100">
                Rekomendasi Terkini
              </h3>
              <p className="text-2xl font-bold text-purple-800 dark:text-purple-200 mt-1">
                {empatAnalisis?.total_rekomendasi_terkini}
              </p>
            </div>

            {/* Card 3 */}
            <div className="flex flex-col justify-between min-h-[100px] bg-green-100 dark:bg-green-900/30 p-3 rounded-lg border border-green-200 dark:border-green-800 shadow-sm">
              <h3 className="text-sm font-medium text-green-900 dark:text-green-100">
                Rekomendasi Tervalidasi
              </h3>
              <p className="text-2xl font-bold text-green-800 dark:text-green-200 mt-1">
                {empatAnalisis?.total_rekomendasi_tervalidasi}
              </p>
            </div>

            {/* Card 4 */}
            <div className="flex flex-col justify-between min-h-[100px] bg-amber-100 dark:bg-amber-900/30 p-3 rounded-lg border border-amber-200 dark:border-amber-800 shadow-sm">
              <h3 className="text-sm font-medium text-amber-900 dark:text-amber-100">
                Rekomendasi Butuh Validasi
              </h3>
              <p className="text-2xl font-bold text-amber-800 dark:text-amber-200 mt-1">
                {empatAnalisis?.total_rekomendasi_butuh_validasi}
              </p>
            </div>
          </div>

          {/* Map */}
          <div className="bg-white rounded-xl shadow p-4">
            <div className="w-full h-[550px] md:h-[450px]">
              <h3>Peta Laporan Infrastruktur Jalan Batam</h3>
              <MapComponent markersBeranda={petaBeranda} />
            </div>
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
