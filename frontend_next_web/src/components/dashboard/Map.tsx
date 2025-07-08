"use client";

import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { petaBeranda } from "@/types/beranda";
import { useState, useEffect } from "react";
import { getPetaBeranda } from "@/services/berandaservices";
import { useRouter } from "next/navigation";

const MapComponent = ({
  markersBeranda = [],
}: {
  markersBeranda: petaBeranda[];
}) => {
  const router = useRouter();
  const [markers, setMarkers] = useState<petaBeranda[]>(markersBeranda);

  const batamCenter = {
    lat: 1.1088,
    lng: 104.0305,
  };

  const getMarkerIcon = (status: string) => {
    switch (status) {
      case "tinggi":
        return "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
      case "sedang":
        return "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png";
      case "rendah":
        return "http://maps.google.com/mapfiles/ms/icons/green-dot.png";
      default:
        return "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
    }
  };

  useEffect(() => {
    getPetaBeranda()
      .then((data) => {
        setMarkers(data);
      })
      .catch((error) => {
        console.error(`error fetching data: ${error}`);
      });
  }, []);

  return (
    <div className="mb-4">
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
        <div className="relative border-none overflow-hidden h-96 rounded-xl">
          <Map
            style={{ width: "100%", height: "100%" }}
            defaultCenter={batamCenter}
            defaultZoom={12}
          >
            {markers
              .filter(
                (marker) =>
                  marker.laporan &&
                  marker.laporan.latitude != null &&
                  marker.laporan.longitude != null &&
                  marker.status_rekom !== "selesai"
              )
              .map((marker) => (
                <Marker
                  key={marker.id}
                  position={{
                    lat: marker.laporan.latitude,
                    lng: marker.laporan.longitude,
                  }}
                  title={marker.laporan.judul}
                  icon={{
                    url: getMarkerIcon(marker.status_urgent),
                  }}
                  onClick={() => router.push(`/data-rekomendasi/${marker.id}`)}
                />
              ))}
          </Map>
        </div>
      </APIProvider>
    </div>
  );
};

export default MapComponent;