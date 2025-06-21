import Image from "next/image";
import { Card, CardContent, CardFooter, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { rekomendasiBeranda } from "@/types/beranda";

const latestTransactions = [
  {
    id: 1,
    title: "Kerusakan Jalan di Depan SP PLaza Batu Aji",
    badge: "SP Plaza, Kec. Sagulung",
    image: "/jalanrusak.jpg",
    count: 16,
    priority: "high" // Added for color coding
  },
  {
    id: 2,
    title: "Lampu mati 3 hari makan korban",
    badge: "Simp. Kepri Mall, Batam Kota",
    image: "/lampumati.jpg",
    count: 7,
    priority: "medium" // Added for color coding
  },
  {
    id: 3,
    title: "Bahaya banget nih jembatan",
    badge: "JPO Panbil, Kec. Nongsa",
    image: "/jembatan_rusak.jpg",
    count: 6,
    priority: "medium" // Added for consistency
  },
];

const CardList = ({rekomendasiData}: {rekomendasiData: rekomendasiBeranda[]}) => {
  return (
    <div className="">
      <h1 className="text-lg font-medium mb-6">{}</h1>
      <div className="flex flex-col gap-2">
        {rekomendasiData.map((item) => (
          <Card 
            key={item.id} 
            className={`flex-row items-center justify-between gap-4 p-4 ${
              item.status_urgent === "tinggi" ? "border-l-4 border-red-200 bg-red-500" : 
              item.status_urgent === "sedang" ? "border-l-4 border-yellow-200 bg-yellow-500" :
              item.status_urgent === "rendah" ? "border-l-4 border-green-200 bg-green-500" :
              "border-l-4 border-gray-200"
            }`}
          >
            <div className="w-12 h-12 rounded-sm relative overflow-hidden">
              <Image
                src={item.laporan.gambar}
                alt={item.laporan.judul}
                fill
                className="object-cover"
              />
            </div>
            <CardContent className="flex-1 p-0">
              <CardTitle className="text-sm font-medium">{item.laporan.judul}</CardTitle>
              <Badge variant="secondary">{item.laporan.alamat}</Badge>
            </CardContent>
            <CardFooter className="p-0">{item.jumlah_laporan}</CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CardList;