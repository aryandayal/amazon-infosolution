import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, ScaleControl, ZoomControl, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import io from 'socket.io-client';
import './mapview.css';

function MapView() {
  const [mapType, setMapType] = useState('map');
  const [center, setCenter] = useState([25.621209, 85.170179]);
  const [cursorPosition, setCursorPosition] = useState([25.621209, 85.170179]);
  const [realTimeData, setRealTimeData] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  
  // Server configuration - replace with your actual server IP and port
  const SERVER_URL = 'iot.auraani.com:5025'; // e.g., 'http://192.168.1.100:4000'
  
  // Use a ref to store the socket instance
  const socketRef = useRef(null);
  const mapRef = useRef(null);

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

  // Format date and time
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

  // Initialize WebSocket connection
  useEffect(() => {
    // Create socket instance
    socketRef.current = io(SERVER_URL, {
      transports: ['websocket'],
      jsonp: false
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
      console.error('Connection error:', error);
      setConnectionStatus('error');
    });
    
    // Listen for GPS updates
    socket.on('gps_update', (data) => {
      try {
        // Validate the received data
        if (data && typeof data.lat === 'number' && typeof data.lng === 'number') {
          setRealTimeData(data);
        } else {
          console.error('Invalid GPS data format:', data);
        }
      } catch (error) {
        console.error('Error processing GPS data:', error);
      }
    });
    
    // Cleanup on unmount
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [SERVER_URL]);

  // Update map center when realTimeData changes
  useEffect(() => {
    if (realTimeData && mapRef.current) {
      const map = mapRef.current;
      const newCenter = [realTimeData.lat, realTimeData.lng];
      map.flyTo(newCenter, 15, { animate: true, duration: 1.0 });
      setCenter(newCenter);
    }
  }, [realTimeData]);

  const openStreetView = () => {
    const [lat, lng] = cursorPosition;
    const streetViewUrl = `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${lat},${lng}`;
    window.open(streetViewUrl, '_blank');
  };

  function MapEvents() {
    const map = useMap();
    mapRef.current = map; // Store map reference

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
          <button 
            className="street-view-btn"
            onClick={openStreetView}
          >
            Street View
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
        
        {/* Real-time GPS marker */}
        {realTimeData && (
          <Marker position={[realTimeData.lat, realTimeData.lng]} icon={customIcon}>
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
          </Marker>
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