import Image from "next/image";
import { Card, CardContent, CardFooter, CardTitle } from "../ui/card";
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
      <h1 className="text-lg font-medium mb-6 flex items-center gap-2">
        <TriangleAlert className="h-5 w-5 text-red-600" />
        {title}
      </h1>

<div className="flex flex-col gap-2">
  {rekomendasiData.map((item) => {
    const nilaiUrgent = item.status_urgent; // pastikan jadi number

    let warnaCard = "border-l-4 border-gray-400 bg-gray-50";


    if (nilaiUrgent == "tinggi" ) {
      warnaCard = "border-l-4 border-red-500 bg-red-100"
    } else if (nilaiUrgent == "sedang") {
      warnaCard = "border-l-4 border-yellow-500 bg-yellow-100"
    } else if (nilaiUrgent == "rendah") {
      warnaCard = "border-l-4 border-green-500 bg-green-100"
    } else {
      warnaCard = "border-l-4 border-gray-400 bg-gray-50"
    }
    
    return (
      <Card
        key={item.id}
        className={`grid grid-cols-[3.5rem_1fr_auto] items-center gap-4 p-4 overflow-hidden ${warnaCard}`}
      >
        {/* Gambar kiri */}
        <div className="w-17 h-17 relative rounded-sm overflow-hidden">
          <Image
            src={item.laporan?.gambar || "/default.jpg"}
            alt={item.laporan?.judul || "judul kosong"}
            fill
            className="object-cover"
          />
        </div>

        {/* Teks tengah */}
        <CardContent className="p-0 overflow-hidden">
          <CardTitle className="text-sm font-medium break-words line-clamp-2">
            {item.laporan?.judul}
          </CardTitle>
          <Badge className="mt-1 break-words whitespace-normal">
            {item.laporan?.alamat}
          </Badge>
        </CardContent>

        {/* Jumlah laporan */}
        <CardFooter className="p-0 text-lg font-semibold justify-end">
          {item.jumlah_laporan}
        </CardFooter>
      </Card>
    );
  })}
</div>
</div>

  );
};

export default CardList;
