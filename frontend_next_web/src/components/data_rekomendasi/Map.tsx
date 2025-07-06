// components/data_rekomendasi/Map.tsx
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { cardDetailRekomendasi } from '../../types/data-rekomendasi';

const MapComponentRekomendasi = ({markersBeranda}: {markersBeranda: cardDetailRekomendasi}) => {
  // Ambil laporan pertama sebagai default untuk peta
  const firstReport = markersBeranda.laporan[0];
  
  const batamCenter = { 
    lat: firstReport.peta.latitude, 
    lng: firstReport.peta.longitude, 
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
  }

  return (
    <div className="mb-4">
      <div className="w-full h-[300px] sm:h-[350px] md:h-[400px]">
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
          <Map
            style={{ width: "100%", height: "100%" }}
            defaultCenter={batamCenter}
            defaultZoom={16}
          >
            {markersBeranda.laporan.map((report) => (
              <Marker
                key={report.id}
                position={{
                  lat: report.peta.latitude ?? 0,
                  lng: report.peta.longitude ?? 0
                }}
                title={report.judul}
                icon={getMarkerIcon(markersBeranda.status_urgent)}
              />
            ))}
          </Map>
        </APIProvider>
      </div>
    </div>
  );
};

export default MapComponentRekomendasi;