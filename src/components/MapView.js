import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, ScaleControl, ZoomControl, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import './mapview.css';

function MapView() {
  const [mapType, setMapType] = useState('map'); // 'map' or 'satellite'
  const [center, setCenter] = useState([25.621209, 85.170179]);
  const [cursorPosition, setCursorPosition] = useState([25.621209, 85.170179]); // Initialize with center coordinates
  
  const customIcon = new L.Icon({
    iconUrl: 'https://i.ibb.co/CKqHrByL/Pngtree-red-car-top-view-icon-6587097-removebg-preview.png',
    iconSize: [60, 60],
    iconAnchor: [36, 32],
    popupAnchor: [0, -32],
  });

  const position1 = [25.621209, 85.170179];
  const position2 = [25.621794, 85.168445];

  // Map layer URLs
  const mapLayers = {
    map: "http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}",
    satellite: "http://{s}.google.com/vt?lyrs=s&x={x}&y={y}&z={z}"
  };

  // Function to open Google Street View
  const openStreetView = () => {
    const [lat, lng] = cursorPosition;
    // Construct Google Street View URL
    const streetViewUrl = `https://www.google.com/maps/@?api=1&map_action=pano&parameters=${lat},${lng}`;
    // Open in a new tab
    window.open(streetViewUrl, '_blank');
  };

  // Component to handle map events
  function MapEvents() {
    useMapEvents({
      moveend: (e) => {
        const center = e.target.getCenter();
        setCenter([center.lat, center.lng]);
        // Update cursor position to center when map moves
        setCursorPosition([center.lat, center.lng]);
      },
      mousemove: (e) => {
        setCursorPosition([e.latlng.lat, e.latlng.lng]);
      }
    });
    return null;
  }

  return (
    <div className="map-container">
      <div className="map-controls-bottom">
        <div className="map-type-controls">
          <button 
            className={`map-type-btn ${mapType === 'map' ? 'active' : ''}`}
            onClick={() => setMapType('map')}
          >
            Map
          </button>
          <button 
            className={`map-type-btn ${mapType === 'satellite' ? 'active' : ''}`}
            onClick={() => setMapType('satellite')}
          >
            Satellite
          </button>
          <button 
            className="street-view-btn"
            onClick={openStreetView}
          >
            Street View
          </button>
        </div>
        
        <div className="cursor-info">
          <div>Lat: {cursorPosition[0].toFixed(6)}</div>
          <div>Lng: {cursorPosition[1].toFixed(6)}</div>
        </div>
      </div>
      
      <MapContainer 
        center={center} 
        zoom={12} 
        className="map-view"
      >
        <TileLayer
          url={mapLayers[mapType]}
          maxZoom={20}
          subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
          attribution='&copy; <a href="https://www.google.com/maps">Google Maps</a>'
        />
        
        <ScaleControl position="bottomleft" />
        <ZoomControl position="topright" />
        
        <Marker position={position1} icon={customIcon}>
          <Popup>
            <div className="popup-content">
              <h3>Location 1</h3>
              <p>Lat: {position1[0]}</p>
              <p>Lng: {position1[1]}</p>
            </div>
          </Popup>
        </Marker>
        
        <Marker position={position2} icon={customIcon}>
          <Popup>
            <div className="popup-content">
              <h3>Location 2</h3>
              <p>Lat: {position2[0]}</p>
              <p>Lng: {position2[1]}</p>
            </div>
          </Popup>
        </Marker>
        
        <MapEvents />
      </MapContainer>
    </div>
  );
}

export default MapView;
