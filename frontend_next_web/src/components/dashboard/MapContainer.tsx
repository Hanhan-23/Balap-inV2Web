"use client";

import { APIProvider, Map } from "@vis.gl/react-google-maps";

const MapContainer = () => {
  const batamCenter = { 
    lat: 1.0452, 
    lng: 104.0305 
  };

  const MapsKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  return (
    <APIProvider apiKey={MapsKey ?? ''}>
      <Map
        style={{ width: "100%", height: "100%" }}
        defaultCenter={batamCenter}
        mapTypeId="hybrid"
        defaultZoom={12}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
      />
    </APIProvider>
  );
};

export default MapContainer;
