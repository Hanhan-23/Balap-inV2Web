import Image from "next/image";
import { cardDetailRekomendasi } from "@/types/data-rekomendasi";

type Laporan = cardDetailRekomendasi['laporan'][0];

interface LaporanImageGalleryProps {
  images: string[];
  laporan: Laporan[];
  onClickLaporan: (laporan: Laporan) => void;
}

export default function LaporanImageGallery({
  images,
  laporan,
  onClickLaporan,
}: LaporanImageGalleryProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {images.length > 0 ? (
        images.map((url, idx) => {
          const relatedLaporan = laporan.find(
            (l) => Array.isArray(l.gambar) && l.gambar.includes(url)
          );
          return (
            <div
              key={idx}
              className="rounded-lg overflow-hidden shadow-md cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => relatedLaporan && onClickLaporan(relatedLaporan)}
            >
              <div className="relative aspect-square w-full h-36">
                <Image
                  src={url}
                  alt={`Dokumentasi laporan ${idx + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-2 capitalize bg-gray-50 dark:bg-gray-700 text-center text-xs text-gray-600 dark:text-gray-300">
                Laporan {idx + 1}
              </div>
            </div>
          );
        })
      ) : (
        <div className="text-xs text-gray-500 dark:text-gray-400 col-span-full">
          Tidak ada dokumentasi foto
        </div>
      )}
    </div>
  );
}
