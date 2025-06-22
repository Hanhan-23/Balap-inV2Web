import Image from "next/image";
import { Card, CardContent, CardFooter, CardTitle } from "../ui/card";
import { Badge } from "@/components/ui/badge";
import { TriangleAlert } from "lucide-react";

const latestTransactions = [
  {
    id: 1,
    title: "Kerusakan Jalan di Depan SP PLaza Batu Ajixxxxxxxxxxxxxxxxxxxxx",
    badge: "Baloi Permai, Batam Kota, Batam City, Riau Islands 29444aaaaaa",
    image: "/logo.svg",
    count: 16,
    priority: "high",
  },
  {
    id: 2,
    title: "Lampu mati 3 hari makan korban",
    badge: "Jl. Pemuda, Baloi Permai, Kec. Batam Kota, Kota Batam, Kepulauan Riau 29422",
    image: "/contoh1.jpg",
    count: 7,
    priority: "medium",
  },
  {
    id: 3,
    title: "Bahaya banget nih jembatannnnnnnnnnn",
    badge: "Jl. Ahmad Yani, Tlk. Tering, Kec. Batam Kota, Kota Batam, Kepulauan Riau 29444",
    image: "/contoh2.jpg",
    count: 6,
    priority: "medium",
  },
];

const CardList = ({ title = "Tangani Segera" }: { title?: string }) => {
  return (
    <div>
      <h1 className="text-lg font-medium mb-6 flex items-center gap-2">
        <TriangleAlert className="h-5 w-5 text-red-600" />
        {title}
      </h1>

      <div className="flex flex-col gap-2">
        {latestTransactions.map((item) => (
          <Card
            key={item.id}
            className={`grid grid-cols-[3.5rem_1fr_auto] items-center gap-4 p-4 overflow-hidden ${
              item.priority === "high"
                ? "border-l-4 border-red-200 bg-red-500"
                : item.priority === "medium"
                ? "border-l-4 border-yellow-200 bg-yellow-500"
                : "border-l-4 border-gray-200"
            }`}
          >
            {/* Gambar kiri */}
            <div className="w-17 h-17 relative rounded-sm overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Teks kanan */}
            <CardContent className="p-0 overflow-hidden">
              <CardTitle className="text-sm font-medium break-words line-clamp-2">
                {item.title}
              </CardTitle>
              <Badge className="mt-1 break-words whitespace-normal">
                {item.badge}
              </Badge>
            </CardContent>

            {/* Count kanan ujung */}
            <CardFooter className="p-0 text-lg font-semibold justify-end">
              {item.count}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CardList;
