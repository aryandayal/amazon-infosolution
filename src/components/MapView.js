// MapView.js
import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Popup, ScaleControl, useMap, useMapEvents, Polyline } from 'react-leaflet';
import L from 'leaflet';
import io from 'socket.io-client';
import RotatedMovingMarker from './RotatedMovingMarker';
import './mapview.css';

// Import Leaflet CSS - this is important for proper rendering
import 'leaflet/dist/leaflet.css';

// Fix for default markers in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

function MapView() {
  const [mapType, setMapType] = useState('map');
  const [center, setCenter] = useState([25.621209, 85.170179]);
  const [cursorPosition, setCursorPosition] = useState([25.621209, 85.170179]);
  const [devices, setDevices] = useState({}); // imei -> { realTimeData, pathHistory }
  const [trackedImei, setTrackedImei] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const [zoomLevel, setZoomLevel] = useState(15);
  
  const SERVER_URL = 'http://localhost:4000';
  const socketRef = useRef(null);
  const mapRef = useRef(null);

  // Create a car icon using SVG
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

  const mapLayers = {
    map: "http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}",
    satellite: "http://{s}.google.com/vt?lyrs=s&x={x}&y={y}&z={z}"
  };

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

  const parseTimestamp = (dateStr, timeStr) => {
    if (!dateStr || !timeStr) return Date.now();
    const day = dateStr.substring(0,2);
    const month = dateStr.substring(2,4);
    const year = dateStr.substring(4,8);
    const hour = timeStr.substring(0,2);
    const min = timeStr.substring(2,4);
    const sec = timeStr.substring(4,6);
    const dateObj = new Date(`${year}-${month}-${day}T${hour}:${min}:${sec}Z`);
    return dateObj.getTime();
  };

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
        console.log('Received gps_update:', data);
        if (data && data.imei && typeof data.latitude === 'number' && typeof data.longitude === 'number') {
          setDevices(prevDevices => {
            const prevDevice = prevDevices[data.imei] || { pathHistory: [], realTimeData: null };
            const prevRealTimeData = prevDevice.realTimeData;

            const timestamp = parseTimestamp(data.date, data.time);
            const prevTimestamp = prevRealTimeData ? prevRealTimeData.timestamp : null;

            let duration = 2000;
            let path = [[data.latitude, data.longitude]];
            let newPathHistory = [...prevDevice.pathHistory];

            if (prevRealTimeData && prevTimestamp) {
              duration = Math.max(1000, timestamp - prevTimestamp);
              path = [[prevRealTimeData.latitude, prevRealTimeData.longitude], [data.latitude, data.longitude]];
              
              newPathHistory.push([data.latitude, data.longitude]);
            } else {
              newPathHistory = [[data.latitude, data.longitude]];
            }

            const updatedDevice = {
              realTimeData: { ...data, timestamp, path, duration },
              pathHistory: newPathHistory
            };

            // If this is the first device, set it as tracked
            if (Object.keys(prevDevices).length === 0 && !trackedImei) {
              setTrackedImei(data.imei);
            }

            return {
              ...prevDevices,
              [data.imei]: updatedDevice
            };
          });
        } else {
          console.error('Invalid GPS data format:', data);
        }
      } catch (error) {
        console.error('Error processing GPS data:', error);
      }
    });
    
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [SERVER_URL, trackedImei]);

  useEffect(() => {
    if (mapRef.current && trackedImei && devices[trackedImei] && devices[trackedImei].realTimeData) {
      const map = mapRef.current;
      const realTimeData = devices[trackedImei].realTimeData;
      const newCenter = [realTimeData.latitude, realTimeData.longitude];
      const currentZoom = map.getZoom();
      map.flyTo(newCenter, currentZoom, { animate: true, duration: 1.0 });
      setCenter(newCenter);
    }
  }, [devices, trackedImei]);

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
        
        {Object.entries(devices).map(([imei, device]) => {
          const pathHistory = device.pathHistory;
          const realTimeData = device.realTimeData;
          const latestPosition = pathHistory.length > 0 ? pathHistory[pathHistory.length - 1] : center;

          return (
            <React.Fragment key={imei}>
              {pathHistory.length > 1 && (
                <Polyline 
                  positions={pathHistory} 
                  color="red" 
                  weight={4} 
                  opacity={0.8}
                />
              )}
              
              {pathHistory.length > 0 && (
                <RotatedMovingMarker
                  position={latestPosition}
                  heading={realTimeData ? realTimeData.heading || 0 : 0}
                  path={realTimeData ? realTimeData.path : [[latestPosition, latestPosition]]}
                  duration={realTimeData ? realTimeData.duration : 1000}
                  icon={carIcon}
                  onClick={() => {
                    setTrackedImei(imei);
                    if (mapRef.current && realTimeData) {
                      const newCenter = [realTimeData.latitude, realTimeData.longitude];
                      mapRef.current.flyTo(newCenter, zoomLevel, { animate: true, duration: 1.0 });
                      setCenter(newCenter);
                    }
                  }}
                >
                  <Popup>
                    <div className="popup-content">
                      <h3>Vehicle Location (IMEI: {imei})</h3>
                      <p>Lat: {latestPosition[0].toFixed(6)}</p>
                      <p>Lng: {latestPosition[1].toFixed(6)}</p>
                      {realTimeData && (
                        <>
                          <p>Speed: {realTimeData.speed ? `${realTimeData.speed} km/h` : 'N/A'}</p>
                          <p>Heading: {realTimeData.heading ? `${realTimeData.heading}°` : 'N/A'}</p>
                          <p>Timestamp: {formatDateTime(realTimeData.date, realTimeData.time)}</p>
                        </>
                      )}
                      <p>Status: {connectionStatus}</p>
                    </div>
                  </Popup>
                </RotatedMovingMarker>
              )}
            </React.Fragment>
          );
        })}
        
        <MapEvents />
      </MapContainer>
    </div>
  );
}

export default MapView;