import React, { useEffect, useState } from "react";
import { Status, Wrapper } from "@googlemaps/react-wrapper";
import { MyMap } from "./MyMap";
import { Marker } from "./Marker";

const render = (status: Status) => {
  return <h1>{status}</h1>;
};
const MapComponent: React.FC = () => {
  const [clicks, setClicks] = React.useState<google.maps.LatLng>();
  const [zoom, setZoom] = React.useState(12); // initial zoom
  const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({
    lat: 1.0452, 
    lng: 104.0305 
  });
  const initialValue = {
    lat: 1.0452, 
    lng: 104.0305 
  };
  const [location, setLocation] = useState<{ lat: number; lng: number }>();

  useEffect(() => {
    if (initialValue) {
      setCenter(initialValue);
    }
  }, []);

  const onClick = (e: google.maps.MapMouseEvent) => {
    // avoid directly mutating state
    setClicks(e.latLng!);
    setLocation(e.latLng!.toJSON());
  };

  const onIdle = (m: google.maps.Map) => {
    setZoom(m.getZoom()!);
    setCenter(m.getCenter()!.toJSON());
  };

  const render = (status: Status) => {
    return <h1>{status}</h1>;
  };
  return (
    <div className="mb-4">
      <div className={`mb-2`}>
        <label className="text-md font-bold text-gray-9 text-start">
          {"Peta Laporan Infrastruktur Jalan Batam"}
        </label>
      </div>
      <div className="w-full h-[300px] sm:h-[350px] md:h-[400px]">
        <Wrapper
          apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
          render={render}
        >
          <MyMap
            center={center}
            onClick={onClick}
            onIdle={onIdle}
            zoom={zoom}
            style={{ width: "100%", height: "100%" }}
          >
            <Marker position={clicks ? clicks : initialValue} />
          </MyMap>
        </Wrapper>
      </div>

      {/* {location?.lat && location?.lng && (
        <h2>
          You're marked at : {location?.lat} {location?.lng}
        </h2>
      )} */}
    </div>
  );
};
export default MapComponent;