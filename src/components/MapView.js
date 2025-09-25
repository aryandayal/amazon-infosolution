// MapView.js
import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Popup, ScaleControl, useMap, useMapEvents, Polyline } from 'react-leaflet';
import L from 'leaflet';
import io from 'socket.io-client';
import RotatedMovingMarker from './RotatedMovingMarker';
import './mapview.css';

// Import Leaflet CSS for proper rendering
import 'leaflet/dist/leaflet.css';

// Fix for default markers in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Custom car icon using SVG
const carIcon = L.divIcon({
  className: 'car-marker',
  html: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 40" width="40" height="16" style="transform-origin: center;">
      <path d="M20,35 L25,25 L75,25 L80,35 Z" fill="#3498db" stroke="#2980b9" stroke-width="1"/>
      <rect x="25" y="15" width="50" height="10" fill="#3498db" stroke="#2980b9" stroke-width="1"/>
      <path d="M25,15 L30,5 L70,5 L75,15 Z" fill="#3498db" stroke="#2980b9" stroke-width="1"/>
      <circle cx="35" cy="35" r="5" fill="#2c3e50"/>
      <circle cx="65" cy="35" r="5" fill="#2c3e50"/>
      <rect x="40" y="10" width="20" height="5" fill="#e74c3c"/>
    </svg>
  `,
  iconSize: [40, 40],
  iconAnchor: [20, 20], // Center of the icon
});

function MapView() {
  const [mapType, setMapType] = useState('map');
  const [center, setCenter] = useState([25.621209, 85.170179]);
  const [cursorPosition, setCursorPosition] = useState([25.621209, 85.170179]);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const [devicesData, setDevicesData] = useState({}); // Stores data keyed by IMEI
  const [zoomLevel, setZoomLevel] = useState(15);
  const [selectedDevice, setSelectedDevice] = useState(null); // For navigating to specific device

  const SERVER_URL = 'http://localhost:4000';
  const socketRef = useRef(null);
  const mapRef = useRef(null);

  // Map tile URLs for different map types
  const mapLayers = {
    map: "http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}",
    satellite: "http://{s}.google.com/vt?lyrs=s&x={x}&y={y}&z={z}"
  };

  // Format date and time strings into readable format
  const formatDateTime = (dateStr, timeStr) => {
    if (!dateStr || !timeStr) return 'N/A';
    const day = dateStr.substring(0,2);
    const month = dateStr.substring(2,4);
    const year = dateStr.substring(4,8);
    const hour = timeStr.substring(0,2);
    const min = timeStr.substring(2,4);
    const sec = timeStr.substring(4,6);
    return `${day}/${month}/${year} ${hour}:${min}:${sec} UTC`;
  };

  // Socket.io connection and data handling
  useEffect(() => {
    socketRef.current = io(SERVER_URL, {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000
    });

    const socket = socketRef.current;

    socket.on('connect', () => {
      console.log('Connected to server');
      setConnectionStatus('connected');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
      setConnectionStatus('disconnected');
    });

    socket.on('connect_error', (error) => {
      console.error('Connection error:', error.message);
      setConnectionStatus('error: ' + error.message);
    });

    socket.on('gps_update', (data) => {
      try {
        if (data && data.imei && typeof data.latitude === 'string' && typeof data.longitude === 'string') {
          // Parse latitude and longitude from strings to numbers
          const lat = parseFloat(data.latitude);
          const lng = parseFloat(data.longitude);
          const heading = parseFloat(data.heading) || 0;
          const speed = parseFloat(data.speed) || 0;

          if (!isNaN(lat) && !isNaN(lng)) {
            setDevicesData(prev => {
              const prevDevice = prev[data.imei] || {};
              const newPathHistory = prevDevice.pathHistory 
                ? [...prevDevice.pathHistory, [lat, lng]] 
                : [[lat, lng]];
              
              // Limit path history to last 100 points to prevent memory issues
              if (newPathHistory.length > 100) {
                newPathHistory.shift();
              }

              return {
                ...prev,
                [data.imei]: {
                  ...data,
                  lat,
                  lng,
                  heading,
                  speed,
                  pathHistory: newPathHistory,
                  lastUpdate: Date.now()
                }
              };
            });
          } else {
            console.error('Invalid latitude/longitude values:', data);
          }
        } else {
          console.error('Invalid GPS data format or missing IMEI:', data);
        }
      } catch (error) {
        console.error('Error processing GPS data:', error);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [SERVER_URL]);

  // Center map on selected device or first device if none selected
  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current;
      let targetLatLng = center;

      if (selectedDevice && devicesData[selectedDevice]) {
        const device = devicesData[selectedDevice];
        targetLatLng = [device.lat, device.lng];
      } else {
        const imeis = Object.keys(devicesData);
        if (imeis.length > 0) {
          const firstDevice = devicesData[imeis[0]];
          targetLatLng = [firstDevice.lat, firstDevice.lng];
        }
      }

      // Only flyTo and update center if the target is different from current center
      const isDifferent = targetLatLng[0] !== center[0] || targetLatLng[1] !== center[1];
      if (isDifferent) {
        map.flyTo(targetLatLng, zoomLevel, { animate: true, duration: 1.0 });
        setCenter(targetLatLng);
      }
    }
  }, [devicesData, selectedDevice, zoomLevel, center]); // Added 'center' to fix ESLint warning

  // Map events to update cursor position, zoom level and center
  function MapEvents() {
    const map = useMap();
    mapRef.current = map;

    useMapEvents({
      moveend: (e) => {
        const center = e.target.getCenter();
        setCenter([center.lat, center.lng]);
        setCursorPosition([center.lat, center.lng]);
      },
      mousemove: (e) => {
        setCursorPosition([e.latlng.lat, e.latlng.lng]);
      },
      zoomend: (e) => {
        setZoomLevel(e.target.getZoom());
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
        </div>

        <div className="connection-status">
          Status: {connectionStatus}
        </div>

        <div className="cursor-info">
          <div>Lat: {cursorPosition[0].toFixed(6)}</div>
          <div>Lng: {cursorPosition[1].toFixed(6)}</div>
        </div>

        {/* Device selector for navigation */}
        <div className="device-selector">
          <select 
            value={selectedDevice || ''} 
            onChange={(e) => setSelectedDevice(e.target.value || null)}
          >
            <option value="">Select Device</option>
            {Object.keys(devicesData).map(imei => (
              <option key={imei} value={imei}>{imei}</option>
            ))}
          </select>
        </div>
      </div>

      <MapContainer
        center={center}
        zoom={zoomLevel}
        className="map-view"
        attributionControl={false}
        whenCreated={(mapInstance) => {
          mapRef.current = mapInstance;
          console.log('Map created successfully');
        }}
      >
        <TileLayer
          url={mapLayers[mapType]}
          maxZoom={20}
          subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
        />

        <ScaleControl position="bottomleft" />

        {Object.entries(devicesData).map(([imei, device]) => (
          <React.Fragment key={imei}>
            {device.pathHistory && device.pathHistory.length > 1 && (
              <Polyline positions={device.pathHistory} color="red" weight={4} opacity={0.8} />
            )}

            {device.pathHistory && device.pathHistory.length > 0 && (
              <RotatedMovingMarker
                position={device.pathHistory[device.pathHistory.length - 1]}
                heading={device.heading || 0}
                path={device.pathHistory.slice(-2)}
                duration={1000}
                icon={carIcon}
              >
                <Popup>
                  <div className="popup-content">
                    <h3>Vehicle: {imei}</h3>
                    <p>Lat: {device.lat.toFixed(6)}</p>
                    <p>Lng: {device.lng.toFixed(6)}</p>
                    <p>Speed: {device.speed ? `${device.speed} km/h` : 'N/A'}</p>
                    <p>Heading: {device.heading ? `${device.heading}°` : 'N/A'}</p>
                    <p>Timestamp: {formatDateTime(device.date, device.time)}</p>
                    <p>Status: {connectionStatus}</p>
                  </div>
                </Popup>
              </RotatedMovingMarker>
            )}
          </React.Fragment>
        ))}

        <MapEvents />
      </MapContainer>
    </div>
  );
}

export default MapView;


