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
  const pathAnimationRef = useRef(null);
  
  const SERVER_URL = 'http://localhost:4000';
  const socketRef = useRef(null);
  const mapRef = useRef(null);
  const prevRealTimeDataRef = useRef(null);

  const customIcon = new L.Icon({
    iconUrl: 'https://i.ibb.co/CKqHrByL/Pngtree-red-car-top-view-icon-6587097-removebg-preview.png',
    iconSize: [60, 60],
    iconAnchor: [36, 32],
    popupAnchor: [0, -32],
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
      map.flyTo(newCenter, 15, { animate: true, duration: 1.0 });
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
      const animationDuration = 2000; // 2 seconds
      const totalPoints = pathHistory.length;

      const animatePath = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / animationDuration, 1);
        const pointsToShow = Math.floor(totalPoints * progress);
        
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
        
        {/* Animated path history */}
        {animatedPath.length > 1 && (
          <Polyline 
            positions={animatedPath} 
            color="red" 
            weight={4} 
            opacity={0.8}
            className="animated-path"
          />
        )}
        
        {/* Real-time GPS marker with rotation and movement */}
        {realTimeData && (
          <RotatedMovingMarker
            position={[realTimeData.lat, realTimeData.lng]}
            heading={realTimeData.heading || 0}
            path={realTimeData.path}
            duration={realTimeData.duration}
            icon={customIcon}
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
        
        {/* Existing marker */}
        <Marker position={position1} icon={customIcon}>
          <Popup>
            <div className="popup-content">
              <h3>Location 1</h3>
              <p>Lat: {position1[0]}</p>
              <p>Lng: {position1[1]}</p>
            </div>
          </Popup>
        </Marker>
        
        <MapEvents />
      </MapContainer>
    </div>
  );
}

export default MapView;