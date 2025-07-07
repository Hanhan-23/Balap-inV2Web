"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardFooter, CardContent, CardTitle } from "@/components/ui/card";
import { rekomendasiBeranda } from "@/types/beranda";
import { WarningIcon, FileTextIcon } from "@phosphor-icons/react";

const statusColor = {
  tinggi:
    "bg-red-50 border-red-200 text-red-600 dark:bg-red-900 dark:border-red-700 dark:text-red-200",
  sedang:
    "bg-yellow-50 border-yellow-200 text-yellow-700 dark:bg-yellow-900 dark:border-yellow-700 dark:text-yellow-200",
  rendah:
    "bg-green-50 border-green-200 text-green-700 dark:bg-green-900 dark:border-green-700 dark:text-green-200",
};

const CardList = ({
  title = "Tangani Segera",
  rekomendasiData = [],
}: {
  title?: string;
  rekomendasiData: rekomendasiBeranda[];
}) => {
  return (
    <div className="border rounded-xl p-4 dark:bg-neutral-900">
      {/* Judul Section */}
      <div className="flex items-center gap-2 mb-2">
        <span className="p-1 bg-blue-100 border-blue-300 border rounded-md dark:bg-blue-900 dark:border-blue-700">
          <WarningIcon weight="bold" className="size-4 text-blue-600 dark:text-blue-300" />
        </span>
        <h1 className="text-base sm:text-lg font-semibold flex items-center dark:text-white">
          {title}
        </h1>
      </div>

      <div className="flex flex-col gap-2">
        {rekomendasiData.map((item) => {
          const urgency = item.status_urgent;
          return (
            <Link
              key={item.id}
              href={`/data-rekomendasi/${item.id}`}
              className="hover:opacity-90 transition-all duration-150"
            >
              <Card className="flex flex-row items-center gap-3 p-2 overflow-hidden border dark:bg-neutral-800">
                {/* Gambar */}
                <div className="size-20 sm:size-24 aspect-square relative rounded-md overflow-hidden bg-slate-100 dark:bg-neutral-800 flex-shrink-0">
                  <Image
                    src={item.laporan?.gambar || "/default.jpg"}
                    alt={item.laporan?.judul || "judul kosong"}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
                {/* Isi Card */}
                <CardContent className="p-0 flex-1 min-w-0">
                  {/* Status Urgensi */}
                  <div className="mb-1">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] sm:text-xs font-medium transition-colors duration-200 ${
                        statusColor[urgency as keyof typeof statusColor] ||
                        "bg-gray-100 border-gray-200 text-gray-600 dark:bg-neutral-800 dark:border-neutral-700 dark:text-gray-300"
                      }`}
                    >
                      {/* Dot animasi */}
                      <span className="relative flex h-2 w-2 mr-1">
                        <span
                          className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-60
                          ${
                            urgency === "tinggi"
                              ? "bg-red-400 dark:bg-red-500"
                              : urgency === "sedang"
                              ? "bg-yellow-400 dark:bg-yellow-400"
                              : urgency === "rendah"
                              ? "bg-green-400 dark:bg-green-400"
                              : "bg-gray-400 dark:bg-gray-500"
                          }`}
                        />
                        <span
                          className={`relative inline-flex rounded-full h-2 w-2
                          ${
                            urgency === "tinggi"
                              ? "bg-red-500 dark:bg-red-400"
                              : urgency === "sedang"
                              ? "bg-yellow-500 dark:bg-yellow-300"
                              : urgency === "rendah"
                              ? "bg-green-500 dark:bg-green-300"
                              : "bg-gray-400 dark:bg-gray-400"
                          }`}
                        />
                      </span>
                      {urgency
                        ? urgency.charAt(0).toUpperCase() + urgency.slice(1)
                        : "-"}
                    </span>
                  </div>
                  {/* Judul */}
                  <CardTitle className="text-[13px] sm:text-sm font-semibold line-clamp-2 text-ellipsis capitalize mb-1">
                    {item.laporan?.judul}
                  </CardTitle>
                  {/* Alamat */}
                  <div className="text-[11px] sm:text-xs text-gray-500 dark:text-gray-300 mb-1 line-clamp-2">
                    {item.laporan?.alamat}
                  </div>
                </CardContent>
                {/* Jumlah Laporan Badge */}
                <CardFooter className="p-0 pr-1">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 border border-blue-200 dark:border-neutral-600 bg-blue-50 dark:bg-neutral-800 rounded-full text-blue-700 dark:text-blue-200 text-[11px] sm:text-xs font-semibold">
                    <FileTextIcon weight="bold" size={13} className="text-blue-500 dark:text-blue-400" />
                    {item.jumlah_laporan} laporan
                  </span>
                </CardFooter>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CardList;
