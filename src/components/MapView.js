import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
// You can use react-leaflet, google-maps-react, or other map libraries.
// This is a placeholder iframe for a Google Map centered on Patna.

function MapView() {

  const customIcon = new L.Icon({
    iconUrl: 'https://i.ibb.co/CKqHrByL/Pngtree-red-car-top-view-icon-6587097-removebg-preview.png', // Your custom icon URL
    iconSize: [60, 60], // Size of the icon [width, height]
    iconAnchor: [36, 32], // Point of the icon which will correspond to marker's location
    popupAnchor: [0, -32], // Point from which the popup should open relative to the iconAnchor

  });

  const position1 = [25.621209, 85.170179];
  const position2 = [25.621794, 85.168445]; // Example position for the second marker
  
  return (
    <MapContainer center={[25.621209, 85.170179]} zoom={12} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        url="http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}"
        maxZoom={20}
        subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
      />
      <Marker position={position1} icon={customIcon}>
        <Popup>
          Marker at lat: {position1[0]}, lng: {position1[1]}
        </Popup>
      </Marker>
      <Marker position={position2} icon={customIcon}>
        <Popup>
          Marker at lat: {position2[0]}, lng: {position2[1]}
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default MapView;
