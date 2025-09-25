// MapView.js
import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Popup, ScaleControl, Polyline } from 'react-leaflet';
import L from 'leaflet';
import io from 'socket.io-client';
import RotatedMovingMarker from './RotatedMovingMarker';
import './mapview.css';
import 'leaflet/dist/leaflet.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Car Icon (SVG)
const carIcon = L.divIcon({
  className: 'car-marker',
  html: `<svg ...your SVG here...></svg>`,
  iconSize: [40, 40],
  iconAnchor: [20, 20]
});

const mapLayers = { ... }

function MapView() {
  // Device data by IMEI
  const [deviceData, setDeviceData] = useState({});
  const [mapType, setMapType] = useState('map');
  const [center, setCenter] = useState([25.621209, 85.170179]);
  const [zoomLevel, setZoomLevel] = useState(15);
  const SERVER_URL = 'http://localhost:4000';

  // Socket setup
  useEffect(() => {
    const socket = io(SERVER_URL);
    socket.on('gps_update', (data) => {
      if (!data.imei) return;
      setDeviceData(prev => {
        const prevDevice = prev[data.imei] || {};
        const newPath = prevDevice.pathHistory ? [...prevDevice.pathHistory, [data.lat, data.lng]] : [[data.lat, data.lng]];
        return {
          ...prev,
          [data.imei]: {
            ...data,
            pathHistory: newPath,
            lastPosition: [data.lat, data.lng]
          }
        };
      });
    });
    return () => socket.disconnect();
  }, []);

  // Recenter map on first device
  useEffect(() => {
    const imeis = Object.keys(deviceData);
    if (imeis.length > 0) {
      setCenter(deviceData[imeis[0]].lastPosition || center);
    }
  }, [deviceData]);

  return (
    <div className="map-container">
      {/* ...controls... */}
      <MapContainer center={center} zoom={zoomLevel} className="map-view" attributionControl={false}>
        <TileLayer url={mapLayers[mapType]} ... />
        <ScaleControl position="bottomleft" />
        {Object.entries(deviceData).map(([imei, dev]) => (
          <React.Fragment key={imei}>
            {dev.pathHistory && dev.pathHistory.length > 1 && (
              <Polyline positions={dev.pathHistory} color="red" weight={4} opacity={0.8} />
            )}
            {dev.lastPosition && (
              <RotatedMovingMarker
                position={dev.lastPosition}
                heading={dev.heading || 0}
                path={dev.pathHistory.slice(-2)}
                duration={1000}
                icon={carIcon}
              >
                <Popup>
                  <div className="popup-content">
                    <h3>Vehicle {imei}</h3>
                    <p>Lat: {dev.lastPosition[0].toFixed(6)}</p>
                    <p>Lng: {dev.lastPosition[1].toFixed(6)}</p>
                    <p>Speed: {dev.speed || 'N/A'} km/h</p>
                    <p>Heading: {dev.heading || 'N/A'}°</p>
                    {/* Add more info as needed */}
                  </div>
                </Popup>
              </RotatedMovingMarker>
            )}
          </React.Fragment>
        ))}
      </MapContainer>
    </div>
  );
}
export default MapView;
