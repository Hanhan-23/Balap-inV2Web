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
const STATUS_LIST = [
  { label: "Disembunyikan", value: "disembunyikan" },
  { label: "Selesai", value: "selesai" },
];

const MIN_GAP = 20;

export default function DataLaporanFilterDropdown({
  jenis,
  setJenis,
  tingkatKerusakan,
  setTingkatKerusakan,
  status,
  setStatus,
  onReset,
}: {
  jenis: string | null;
  setJenis: (val: string | null) => void;
  tingkatKerusakan: [number, number];
  setTingkatKerusakan: (val: [number, number]) => void;
  status: string | null;
  setStatus: (val: string | null) => void;
  onReset: () => void;
}) {
  const [tempJenis, setTempJenis] = useState<string | null>(jenis);
  const [tempTingkatKerusakan, setTempTingkatKerusakan] =
    useState<[number, number]>(tingkatKerusakan);
  const [tempStatus, setTempStatus] = useState<string | null>(status);

  const handleTerapkan = () => {
    setJenis(tempJenis);
    setTingkatKerusakan(tempTingkatKerusakan);
    setStatus(tempStatus);
  };

  const handleReset = () => {
    setTempJenis(null);
    setTempTingkatKerusakan([0, 100]);
    setTempStatus(null);
    onReset();
  };

  const displayStart =
    tempTingkatKerusakan[0] === 1 ? 0 : tempTingkatKerusakan[0];
  const displayEnd = tempTingkatKerusakan[1];

  function handleSliderChange(val: number[]) {
    if (!Array.isArray(val) || val.length !== 2) return;
    let [min, max] = val;
    if (max - min < MIN_GAP) {
      if (min !== tempTingkatKerusakan[0]) {
        min = Math.min(min, 100 - MIN_GAP);
        max = min + MIN_GAP;
      } else {
        max = Math.max(max, MIN_GAP);
        min = max - MIN_GAP;
      }
    }

    min = Math.max(0, min);
    max = Math.min(100, max);
    setTempTingkatKerusakan([min, max]);
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
              Jenis Infrastruktur
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
          {/* Tingkat Kerusakan: Slider */}
          <div>
            <div className="font-semibold text-xs mb-1 text-gray-700">
              Tingkat Kerusakan
            </div>
            <div className="flex items-center gap-2">
              <Slider
                value={tempTingkatKerusakan}
                min={0}
                max={100}
                step={20}
                className="w-32"
                onValueChange={handleSliderChange}
              />
              <span className="text-xs">
                {displayStart}% - {displayEnd}%
              </span>
            </div>
          </div>
          {/* Status */}
          <div>
            <div className="font-semibold text-xs mb-1 text-gray-700">
              Status
            </div>
            <div className="flex gap-1 flex-wrap">
              {STATUS_LIST.map((item) => (
                <Button
                  key={item.value}
                  variant={tempStatus === item.value ? "secondary" : "outline"}
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    tempStatus === item.value
                      ? "bg-blue-50 border-blue-200 text-blue-800"
                      : ""
                  }`}
                  onClick={() =>
                    setTempStatus(tempStatus === item.value ? null : item.value)
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
