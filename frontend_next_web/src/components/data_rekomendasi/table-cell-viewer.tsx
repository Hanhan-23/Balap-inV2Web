"use client";
import { useEffect, useRef, useState } from "react";
import { cardDetailRekomendasi, StatusRekom } from "@/types/data-rekomendasi";
import { updateStatusRekomendasi } from "@/services/datarekomendasiservices";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

interface TableCellViewerProps {
  item: cardDetailRekomendasi;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStatusUpdated: (id: string, status: StatusRekom) => void;
}

const statusList: StatusRekom[] = [
  "belum_valid",
  "valid",
  "proses",
  "selesai",
];

const BATAM_DEFAULT_CENTER = {
  lat: 1.1187,
  lng: 104.0487,
};

export default function TableCellViewer({
  item,
  open,
  onOpenChange,
  onStatusUpdated,
}: TableCellViewerProps) {
  const isMobile = useIsMobile();
  const [status, setStatus] = useState<StatusRekom>(item.status_rekom);
  const [loading, setLoading] = useState(false);

  const markerLat = item.laporan.peta?.latitude;
  const markerLng = item.laporan.peta?.longitude;

  const defaultCenter =
    markerLat && markerLng
      ? { lat: markerLat, lng: markerLng }
      : BATAM_DEFAULT_CENTER;

  const MapsKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const mapDivRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);

  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    function handleFsChange() {
      const fsElement =
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).mozFullScreenElement ||
        (document as any).msFullscreenElement;
      setIsFullscreen(!!fsElement);
    }
    document.addEventListener("fullscreenchange", handleFsChange);
    document.addEventListener("webkitfullscreenchange", handleFsChange);
    document.addEventListener("mozfullscreenchange", handleFsChange);
    document.addEventListener("MSFullscreenChange", handleFsChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFsChange);
      document.removeEventListener("webkitfullscreenchange", handleFsChange);
      document.removeEventListener("mozfullscreenchange", handleFsChange);
      document.removeEventListener("MSFullscreenChange", handleFsChange);
    };
  }, []);

  useEffect(() => {
    setStatus(item.status_rekom);
  }, [item.status_rekom]);

  const handleMyLocation = () => {
    if (!navigator.geolocation) {
      alert("Browser tidak mendukung geolocation.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      pos => {
        const { latitude, longitude } = pos.coords;
        if (mapRef.current) {
          mapRef.current.panTo({ lat: latitude, lng: longitude });
          mapRef.current.setZoom(16);
        }
      },
      err => {
        alert("Gagal mengambil lokasi: " + err.message);
      },
      { enableHighAccuracy: true }
    );
  };

  const handleUpdate = async () => {
    if (status === item.status_rekom) {
      onOpenChange(false);
      return;
    }
    setLoading(true);
    try {
      await updateStatusRekomendasi(item.id, { status_rekom: status });
      onStatusUpdated(item.id, status);
      onOpenChange(false);
    } catch {
      alert("Gagal update status rekomendasi");
    } finally {
      setLoading(false);
    }
  };

  const showMapControls = isFullscreen;

  return (
    <Drawer
      open={open}
      onOpenChange={onOpenChange}
      direction={isMobile ? "bottom" : "right"}
    >
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{item.laporan.judul}</DrawerTitle>
          <APIProvider apiKey={MapsKey ?? ""}>
            <div
              ref={mapDivRef}
              className="relative border-none overflow-hidden aspect-video rounded-xl"
              onPointerDown={e => e.stopPropagation()}
              onTouchStart={e => e.stopPropagation()}
            >
              <Map
                style={{ width: "100%", height: "100%" }}
                defaultCenter={defaultCenter}
                defaultZoom={markerLat && markerLng ? 15 : 12}
                mapTypeId="hybrid"
                gestureHandling="greedy"
                disableDefaultUI={!showMapControls}
                fullscreenControl={true}
                zoomControl={showMapControls}
                streetViewControl={showMapControls}
                mapTypeControl={showMapControls}
                mapId="YOUR_MAP_ID"
              >
                {markerLat && markerLng && (
                  <Marker
                    position={{ lat: markerLat, lng: markerLng }}
                    title={item.laporan.judul}
                  />
                )}
              </Map>
              {isFullscreen && (
                <button
                  type="button"
                  onClick={handleMyLocation}
                  className="absolute bottom-3 right-3 z-10 bg-white shadow-md rounded-full p-2 border border-gray-300 hover:bg-blue-100 active:bg-blue-200"
                  title="Lokasi Saya"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="blue"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="2" x2="12" y2="6"></line>
                    <line x1="12" y1="18" x2="12" y2="22"></line>
                    <line x1="2" y1="12" x2="6" y2="12"></line>
                    <line x1="18" y1="12" x2="22" y2="12"></line>
                  </svg>
                </button>
              )}
            </div>
          </APIProvider>
        </DrawerHeader>
        <div className="flex-1 overflow-y-auto max-h-[70vh] p-4 text-sm flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            <Label htmlFor="judul">Judul Pengaduan</Label>
            <Input id="judul" value={item.laporan.judul} readOnly />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="jenis">Jenis Infrastruktur</Label>
              <Input id="jenis" value={item.laporan.jenis.replace(/_/g, " ")} className="capitalize" readOnly />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="status">Status</Label>
              <Select
                value={status}
                onValueChange={(val) => setStatus(val as StatusRekom)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih status" />
                </SelectTrigger>
                <SelectContent>
                  {statusList.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s
                        .replace(/_/g, " ")
                        .replace(/\b\w/g, (l) => l.toUpperCase())}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="alamat">Alamat</Label>
            <Textarea value={item.laporan.peta?.alamat || ""} readOnly />
          </div>
        </div>
        <DrawerFooter>
          <Button variant="blue" onClick={handleUpdate} disabled={loading}>
            {loading ? "Menyimpan..." : "Konfirmasi"}
          </Button>
          <DrawerClose asChild>
            <Button variant="outline" disabled={loading}>
              Selesai
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
