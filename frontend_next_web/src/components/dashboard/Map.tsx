// import {  } from "@/types/beranda";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

  const MapComponent = ({ markersBeranda = [] }) => {
  const markers = markersBeranda; 

const batamCenter = { 
          lat: 1.0452, 
          lng: 104.0305 
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
    }}

  return (
    <div className="mb-4">
      <div className="w-full h-[300px] sm:h-[350px] md:h-[400px]">
        <APIProvider
          apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
        >
          <Map
            style={{ width: "100%", height: "100%" }}
            defaultCenter={batamCenter}
            defaultZoom={12}
          >
              {markers
                .filter((marker) => marker.laporan && marker.laporan.latitude != null && marker.laporan.longitude != null)
                .map((marker) => (
                  <Marker
                    key={marker['id']}
                    position={{
                      lat: marker?.laporan?.latitude ?? 0,
                      lng: marker?.laporan?.longitude ?? 0
                    }}
                    title={marker.judul_laporan}
                    icon={{
                      url: getMarkerIcon(marker.status_urgent),
                    }}
                  />
              ))}
              {/* {markers
                .filter((marker) => marker.laporan && marker.laporan.latitude != null && marker.laporan.longitude != null)
                .map((marker) => (
                  <Marker
                    key={marker['id']}
                    position={{ lat: marker.laporan.latitude, lng: marker.laporan.longitude }}
                    title={marker.judul_laporan}
                    icon={{
                      url: getMarkerIcon(marker.status_urgent),
                    }}
                  />
              ))} */}


          </Map>
        </APIProvider>
      </div>
    </div>
  );
};
export default MapComponent;