"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { SlidersHorizontalIcon } from "@phosphor-icons/react";

const JENIS_LIST = ["jalan", "lampu_jalan", "jembatan"];
const STATUS_URGENSI = ["tinggi", "sedang", "rendah"];
const STATUS_REKOM = [
  { label: "Belum Valid", value: "belum_valid" },
  { label: "Valid", value: "valid" },
  { label: "Proses", value: "proses" },
  { label: "Selesai", value: "selesai" },
];

// Set minimal gap, misal 1 agar tidak overlap (karena step 1)
const MIN_GAP = 1;

export default function DataRekomendasiFilterDropdown({
  jenis,
  setJenis,
  tingkatUrgensi,
  setTingkatUrgensi,
  statusUrgensi,
  setStatusUrgensi,
  statusRekom,
  setStatusRekom,
  onReset,
}: {
  jenis: string | null;
  setJenis: (val: string | null) => void;
  tingkatUrgensi: [number, number];
  setTingkatUrgensi: (val: [number, number]) => void;
  statusUrgensi: string | null;
  setStatusUrgensi: (val: string | null) => void;
  statusRekom: string | null;
  setStatusRekom: (val: string | null) => void;
  onReset: () => void;
}) {
  // State sementara untuk filter, tidak langsung terapkan ke parent
  const [tempJenis, setTempJenis] = useState<string | null>(jenis);
  const [tempTingkatUrgensi, setTempTingkatUrgensi] =
    useState<[number, number]>(tingkatUrgensi);
  const [tempStatusUrgensi, setTempStatusUrgensi] = useState<string | null>(
    statusUrgensi
  );
  const [tempStatusRekom, setTempStatusRekom] = useState<string | null>(
    statusRekom
  );

  // Terapkan filter ke parent saat klik "Terapkan"
  const handleTerapkan = () => {
    setJenis(tempJenis);
    setTingkatUrgensi(tempTingkatUrgensi);
    setStatusUrgensi(tempStatusUrgensi);
    setStatusRekom(tempStatusRekom);
  };

  // Reset filter (baik lokal maupun parent)
  const handleReset = () => {
    setTempJenis(null);
    setTempTingkatUrgensi([1, 100]);
    setTempStatusUrgensi(null);
    setTempStatusRekom(null);
    onReset();
  };

  // Display agar jika value 1 diganti jadi 0 (antisipasi bug radix/UX)
  const displayStart =
    tempTingkatUrgensi[0] === 1 ? 0 : tempTingkatUrgensi[0];
  const displayEnd = tempTingkatUrgensi[1];

  // Pencegahan overlap slider: range min 1
  function handleSliderChange(val: number[]) {
    if (!Array.isArray(val) || val.length !== 2) return;
    let [min, max] = val;
    if (max - min < MIN_GAP) {
      // User geser thumb kanan ke kiri, kunci max
      if (min !== tempTingkatUrgensi[0]) {
        min = Math.min(min, 100 - MIN_GAP);
        max = min + MIN_GAP;
      } else {
        // User geser thumb kiri ke kanan, kunci min
        max = Math.max(max, MIN_GAP);
        min = max - MIN_GAP;
      }
    }
    min = Math.max(1, min); // tetap dari 1, sesuai step
    max = Math.min(100, max);
    setTempTingkatUrgensi([min, max]);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="h-9 rounded-full">
          <SlidersHorizontalIcon className="mr-2 w-4 h-4" />
          Filter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="bottom"
        align="end"
        className="w-72 px-4 py-4 space-y-5"
      >
        <DropdownMenuLabel className="font-bold text-base">
          Filter
        </DropdownMenuLabel>
        <div className="flex flex-col px-2 space-y-5">
          {/* Jenis */}
          <div>
            <div className="font-semibold text-xs mb-1 text-gray-700">
              Jenis
            </div>
            <div className="flex gap-1 flex-wrap">
              {JENIS_LIST.map((item) => (
                <Button
                  key={item}
                  variant={tempJenis === item ? "secondary" : "outline"}
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    tempJenis === item
                      ? "bg-blue-50 border-blue-200 text-blue-800"
                      : ""
                  }`}
                  onClick={() => setTempJenis(tempJenis === item ? null : item)}
                  type="button"
                >
                  {item.charAt(0).toUpperCase() +
                    item.slice(1).replace(/_/g, " ")}
                </Button>
              ))}
            </div>
          </div>
          {/* Tingkat Urgensi: Slider */}
          <div>
            <div className="font-semibold text-xs mb-1 text-gray-700">
              Tingkat Urgensi
            </div>
            <div className="flex items-center gap-2">
              <Slider
                value={tempTingkatUrgensi}
                min={1}
                max={100}
                step={1}
                className="w-32"
                onValueChange={handleSliderChange}
              />
              <span className="text-xs">
                {displayStart}% - {displayEnd}%
              </span>
            </div>
          </div>
          {/* Status Urgensi */}
          <div>
            <div className="font-semibold text-xs mb-1 text-gray-700">
              Status Urgensi
            </div>
            <div className="flex gap-1 flex-wrap">
              {STATUS_URGENSI.map((item) => (
                <Button
                  key={item}
                  variant={tempStatusUrgensi === item ? "secondary" : "outline"}
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    tempStatusUrgensi === item
                      ? "bg-blue-50 border-blue-200 text-blue-800"
                      : ""
                  }`}
                  onClick={() =>
                    setTempStatusUrgensi(
                      tempStatusUrgensi === item ? null : item
                    )
                  }
                  type="button"
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </Button>
              ))}
            </div>
          </div>
          {/* Status Rekomendasi */}
          <div>
            <div className="font-semibold text-xs mb-1 text-gray-700">
              Status Rekomendasi
            </div>
            <div className="flex gap-1 flex-wrap">
              {STATUS_REKOM.map((item) => (
                <Button
                  key={item.value}
                  variant={
                    tempStatusRekom === item.value ? "secondary" : "outline"
                  }
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    tempStatusRekom === item.value
                      ? "bg-blue-50 border-blue-200 text-blue-800"
                      : ""
                  }`}
                  onClick={() =>
                    setTempStatusRekom(
                      tempStatusRekom === item.value ? null : item.value
                    )
                  }
                  type="button"
                >
                  {item.label}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex justify-between gap-2">
            <Button
              variant="outline"
              className="text-sm rounded-full"
              size="sm"
              onClick={handleReset}
              type="button"
            >
              Reset
            </Button>
            <Button
              variant="blue"
              className="text-sm rounded-full"
              size="sm"
              onClick={handleTerapkan}
              type="button"
            >
              Terapkan
            </Button>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
