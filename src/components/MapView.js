// MapView.js
import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, ScaleControl, ZoomControl, useMap, useMapEvents, Polyline } from 'react-leaflet';
import L from 'leaflet';
import io from 'socket.io-client';
import RotatedMovingMarker from './RotatedMovingMarker';
import './mapview.css';

function MapView() {
  const [mapType, setMapType] = useState('map');
  const [center, setCenter] = useState([25.621209, 85.170179]);
  const [cursorPosition, setCursorPosition] = useState([25.621209, 85.170179]);
  const [realTimeData, setRealTimeData] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const [pathHistory, setPathHistory] = useState([]);
  const [animatedPath, setAnimatedPath] = useState([]);
  const [zoomLevel, setZoomLevel] = useState(15); // Initial zoom level
  const pathAnimationRef = useRef(null);
  
  const SERVER_URL = 'http://localhost:4000';
  const socketRef = useRef(null);
  const mapRef = useRef(null);
  const prevRealTimeDataRef = useRef(null);

  // Create a custom SVG icon for Superman
  const supermanIcon = L.divIcon({
    html: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36" style="transform-origin: center;">
        <path fill="#e53935" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z" />
        <path fill="#1e88e5" d="M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10Z" />
      </svg>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 18], // Center of the icon
    className: 'superman-icon',
  });

  const position1 = [25.621209, 85.170179];

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
        if (data && typeof data.lat === 'number' && typeof data.lng === 'number') {
          let duration = 2000;
          let path = [[data.lat, data.lng]];
          
          if (prevRealTimeDataRef.current) {
            const prevTime = new Date(prevRealTimeDataRef.current.timestamp || Date.now());
            const currentTime = new Date(data.timestamp || Date.now());
            duration = Math.max(1000, currentTime - prevTime);
            path = [[prevRealTimeDataRef.current.lat, prevRealTimeDataRef.current.lng], [data.lat, data.lng]];
            
            setPathHistory(prev => [...prev, [data.lat, data.lng]]);
          }
          
          setRealTimeData({
            ...data,
            path: path,
            duration: duration
          });
          prevRealTimeDataRef.current = data;
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
  }, [SERVER_URL]);

  useEffect(() => {
    if (realTimeData && mapRef.current) {
      const map = mapRef.current;
      const newCenter = [realTimeData.lat, realTimeData.lng];
      // Use current zoom level instead of fixed zoom
      const currentZoom = map.getZoom();
      map.flyTo(newCenter, currentZoom, { animate: true, duration: 1.0 });
      setCenter(newCenter);
    }
  }, [realTimeData]);

  // Animate path drawing
  useEffect(() => {
    if (pathHistory.length > 1) {
      if (pathAnimationRef.current) {
        cancelAnimationFrame(pathAnimationRef.current);
      }

      const startTime = Date.now();
      const animationDuration = 3000; // Increased duration for smoother animation
      const totalPoints = pathHistory.length;

      const animatePath = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / animationDuration, 1);
        
        // Use smooth easing function
        const easeProgress = 0.5 - 0.5 * Math.cos(progress * Math.PI);
        const pointsToShow = Math.floor(totalPoints * easeProgress);
        
        setAnimatedPath(pathHistory.slice(0, pointsToShow));

        if (progress < 1) {
          pathAnimationRef.current = requestAnimationFrame(animatePath);
        }
      };

      pathAnimationRef.current = requestAnimationFrame(animatePath);
    }

    return () => {
      if (pathAnimationRef.current) {
        cancelAnimationFrame(pathAnimationRef.current);
      }
    };
  }, [pathHistory]);

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
        // Update zoom level state when user zooms
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
        zoom={zoomLevel} // Use zoomLevel state instead of fixed value
        className="map-view"
        whenCreated={(mapInstance) => {
          mapRef.current = mapInstance;
        }}
      >
        <TileLayer
          url={mapLayers[mapType]}
          maxZoom={20}
          subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
          attribution='&copy; <a href="https://www.google.com/maps">Google Maps</a>'
        />
        
        <ScaleControl position="bottomleft" />
        <ZoomControl position="topright" />
        
        {/* Path history - now plain line */}
        {pathHistory.length > 1 && (
          <Polyline 
            positions={pathHistory} 
            color="red" 
            weight={4} 
            opacity={0.8}
          />
        )}
        
        {/* Real-time GPS marker with rotation and movement */}
        {realTimeData && (
          <RotatedMovingMarker
            position={[realTimeData.lat, realTimeData.lng]}
            heading={realTimeData.heading || 0}
            path={realTimeData.path}
            duration={realTimeData.duration}
            icon={supermanIcon}
          >
            <Popup>
              <div className="popup-content">
                <h3>Real-time GPS: {realTimeData.vehicleNo || 'Unknown Vehicle'}</h3>
                <p>IMEI: {realTimeData.imei || 'N/A'}</p>
                <p>Lat: {realTimeData.lat.toFixed(6)}</p>
                <p>Lng: {realTimeData.lng.toFixed(6)}</p>
                <p>Speed: {realTimeData.speed ? `${realTimeData.speed} km/h` : 'N/A'}</p>
                <p>Heading: {realTimeData.heading ? `${realTimeData.heading}°` : 'N/A'}</p>
                <p>Altitude: {realTimeData.altitude ? `${realTimeData.altitude} m` : 'N/A'}</p>
                <p>Satellites: {realTimeData.satellites || 'N/A'}</p>
                <p>Timestamp: {formatDateTime(realTimeData.date, realTimeData.time)}</p>
                <p>Status: {connectionStatus}</p>
              </div>
            </Popup>
          </RotatedMovingMarker>
        )}
        
        {/* Only show this marker if there's no real-time data */}
        {!realTimeData && (
          <Marker position={position1} icon={supermanIcon}>
            <Popup>
              <div className="popup-content">
                <h3>Initial Location</h3>
                <p>Lat: {position1[0]}</p>
                <p>Lng: {position1[1]}</p>
              </div>
            </Popup>
          </Marker>
        )}
        
        <MapEvents />
      </MapContainer>
    </div>
  );
}

export default MapView;