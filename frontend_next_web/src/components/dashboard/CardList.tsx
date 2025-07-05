"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardFooter, CardTitle, CardContent } from "../ui/card";
import { Badge } from "@/components/ui/badge";
import { TriangleAlert } from "lucide-react";
import { rekomendasiBeranda } from "@/types/beranda";

// const CardList = ({ title = "Tangani Segera" }: { title?: string }) => {
const CardList = ({
  title = "Tangani Segera",
  rekomendasiData = [],
}: {
  title?: string;
  rekomendasiData: rekomendasiBeranda[];
}) => {
  return (
    <div>
      <h1 className="text-base font-medium mb-2 flex items-center gap-2 capitalize">
        <TriangleAlert className="h-4 w-4 text-red-600" />
        {title}
      </h1>

      <div className="flex flex-col gap-2">
        {rekomendasiData.map((item) => {
          const nilaiUrgent = item.status_urgent;

          let warnaCard = "border-l-4 border-gray-400 bg-gray-50";

          if (nilaiUrgent === "tinggi") {
            warnaCard =
              "border-l-4 border-red-500 dark:border-red-700 bg-red-100 dark:bg-red-900";
          } else if (nilaiUrgent === "sedang") {
            warnaCard =
              "border-l-4 border-yellow-500 bg-yellow-100 dark:border-yellow-700 dark:bg-yellow-900";
          } else if (nilaiUrgent === "rendah") {
            warnaCard =
              "border-l-4 border-green-500 bg-green-100 dark:border-green-700 dark:bg-green-900";
          }

          return (
            <Link key={item.id} href={`/data-rekomendasi/${item.id}`} className="hover:opacity-90 transition-all duration-150">
              <Card
                className={`grid grid-cols-[3rem_1fr_auto] items-center gap-3 p-2 overflow-hidden ${warnaCard}`}
              >
                {/* Gambar kiri */}
                <div className="w-12 h-12 relative rounded-sm overflow-hidden">
                  <Image
                    src={item.laporan?.gambar || "/default.jpg"}
                    alt={item.laporan?.judul || "judul kosong"}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Teks tengah */}
                <CardContent className="p-0 overflow-hidden">
                  <CardTitle className="text-xs font-semibold line-clamp-2 text-ellipsis capitalize">
                    {item.laporan?.judul}
                  </CardTitle>
                  <Badge className="mt-0.5 text-[10px] px-1.5 py-0.5 break-words whitespace-normal dark:bg-red-950 dark:text-white">
                    {item.laporan?.alamat}
                  </Badge>
                </CardContent>

                {/* Jumlah laporan */}
                <CardFooter className="p-0 text-sm font-semibold justify-end text-gray-700 dark:text-white">
                  {item.jumlah_laporan}
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
