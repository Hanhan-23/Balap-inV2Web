"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { SlidersHorizontalIcon } from "@phosphor-icons/react";

const STATUS_LIST = [
  { label: "Diverifikasi", value: "verif" },
  { label: "Belum Verifikasi", value: "belum_verif" },
];

export default function DataAkunFilterDropdown({
  role,
  setRole,
  status,
  setStatus,
  onReset,
}: {
  role: string | null;
  setRole: (val: string | null) => void;
  status: string | null;
  setStatus: (val: string | null) => void;
  onReset: () => void;
}) {

  const [tempRole, setTempRole] = useState<string | null>(role);
  const [tempStatus, setTempStatus] = useState<string | null>(status);

  const handleTerapkan = () => {
    setRole(tempRole);
    setStatus(tempStatus);
  };

  const handleReset = () => {
    setTempRole(null);
    setTempStatus(null);
    onReset();
  };

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
          Filter Akun
        </DropdownMenuLabel>
        <div className="flex flex-col px-2 space-y-5">
          {/* Filter Status */}
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
