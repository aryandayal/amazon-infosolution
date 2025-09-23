// MapView.js
import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, ScaleControl, ZoomControl, useMap, useMapEvents, Polyline } from 'react-leaflet';
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
  const [realTimeData, setRealTimeData] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const [pathHistory, setPathHistory] = useState([]);
  const [animatedPath, setAnimatedPath] = useState([]);
  const [zoomLevel, setZoomLevel] = useState(15);
  const pathAnimationRef = useRef(null);
  
  const SERVER_URL = 'http://localhost:4000';
  const socketRef = useRef(null);
  const mapRef = useRef(null);
  const prevRealTimeDataRef = useRef(null);

  // Create a simpler Superman icon using HTML/CSS
  const supermanIcon = L.divIcon({
    className: 'superman-marker',
    html: '<div class="superman-icon-inner">S</div>',
    iconSize: [36, 36],
    iconAnchor: [18, 18],
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
      const currentZoom = map.getZoom();
      map.flyTo(newCenter, currentZoom, { animate: true, duration: 1.0 });
      setCenter(newCenter);
    }
  }, [realTimeData]);

  useEffect(() => {
    if (pathHistory.length > 1) {
      if (pathAnimationRef.current) {
        cancelAnimationFrame(pathAnimationRef.current);
      }

      const startTime = Date.now();
      const animationDuration = 3000;
      const totalPoints = pathHistory.length;

      const animatePath = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / animationDuration, 1);
        
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
        setZoomLevel(e.target.getZoom());
      }
    });
    return null;
  }

  const latestPosition = pathHistory.length > 0 
    ? pathHistory[pathHistory.length - 1] 
    : center;

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
        whenCreated={(mapInstance) => {
          mapRef.current = mapInstance;
          console.log('Map created successfully');
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
            icon={supermanIcon}
          >
            <Popup>
              <div className="popup-content">
                <h3>Vehicle Location</h3>
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
        
        <MapEvents />
      </MapContainer>
    </div>
  );
}

export default MapView;