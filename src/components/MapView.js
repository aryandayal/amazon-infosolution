import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Popup, ScaleControl, useMap, useMapEvents, Polyline, Marker, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import io from 'socket.io-client';
import { BsFillTruckFrontFill } from "react-icons/bs";
import { Helmet } from "react-helmet";
import { MdLayers, MdWhatshot, MdTimeline } from "react-icons/md";
import { FaMapMarkedAlt } from "react-icons/fa";

// Import Leaflet CSS for proper rendering
import 'leaflet/dist/leaflet.css';
// Import the CSS file
import './mapview.css';

// Fix for default markers in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Status Indicator Component
const StatusIndicator = ({ status }) => {
  const color = status === "On" ? "green" : status === "Idle" ? "orange" : "red";
  return (
    <span style={{ display: "inline-block", width: "12px", height: "12px", borderRadius: "6px", background: color }} />
  );
};

// Vehicle Table Component
const VehicleTable = ({ devices, onDeviceSelect, selectedDeviceId }) => {
  const [selectedVehicles, setSelectedVehicles] = useState({});
  const [selectAll, setSelectAll] = useState(false);

  // Handle select all checkbox
  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    
    const newSelectedVehicles = {};
    Object.keys(devices).forEach(imei => {
      newSelectedVehicles[imei] = newSelectAll;
    });
    setSelectedVehicles(newSelectedVehicles);
  };

  // Handle individual vehicle selection
  const handleVehicleSelect = (imei) => {
    setSelectedVehicles(prev => ({
      ...prev,
      [imei]: !prev[imei]
    }));
  };

  // Handle row click to select device for tracking
  const handleRowClick = (imei) => {
    onDeviceSelect(imei);
  };

  return (
    <div className="table-container">
      {Object.keys(devices).length === 0 ? (
        <div className="no-devices-message">
          <p>No devices connected. Waiting for data...</p>
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="vehicle-table">
            <thead>
              <tr>
                <th style={{ width: '40px' }}>
                  <input 
                    type="checkbox" 
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                </th>
                <th style={{ width: '40px' }}>#</th>
                <th>Group Name</th>
                <th>Share</th>
                <th>Vehicle</th>
                <th>Status</th>
                <th>Last Seen</th>
                <th>Battery</th>
                <th>Nearest Location</th>
                <th>Speed(Km/H)</th>
                <th>Idle time(hh:mm:ss)</th>
                <th>Sim num</th>
                <th>imei</th>
                <th>specification</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(devices).map(([imei, device], idx) => (
                <tr 
                  key={imei} 
                  className={selectedDeviceId === imei ? 'selected-row' : ''}
                  onClick={() => handleRowClick(imei)}
                >
                  <td onClick={(e) => e.stopPropagation()}>
                    <input 
                      type="checkbox" 
                      checked={!!selectedVehicles[imei]}
                      onChange={() => handleVehicleSelect(imei)}
                    />
                  </td>
                  <td>{idx + 1}</td>
                  <td>{device.group || 'N/A'}</td>
                  <td>{device.share || 'N/A'}</td>
                  <td>{device.vehicle || 'N/A'}</td>
                  <td>
                    <StatusIndicator status={device.status || 'Off'} />
                    <span style={{ marginLeft: '8px' }}>{device.status || 'Off'}</span>
                  </td>
                  <td>{device.lastSeen || 'N/A'}</td>
                  <td>{device.battery || 'N/A'}</td>
                  <td>{device.nearestLocation || 'N/A'}</td>
                  <td>{device.speed || 0}</td>
                  <td>{device.idleTime || '00:00:00'}</td>
                  <td>{device.simNum || 'N/A'}</td>
                  <td>{imei}</td>
                  <td>{device.specification || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// Vehicle Indicator Component
const VehicleIndicator = ({ devices }) => {
  // Calculate counts based on device status
  const counts = {
    running: Object.values(devices).filter(d => d.status === 'On' && d.speed > 0).length,
    idle: Object.values(devices).filter(d => d.status === 'On' && d.speed === 0).length,
    stopped: Object.values(devices).filter(d => d.status === 'Off').length,
    all: Object.keys(devices).length
  };

  const truckStyles = [
    { color: "#4caf50" }, // green - running
    { color: "#ffc107" }, // yellow - idle
    { color: "#f44336" }, // red - stopped
    { color: "#2196f3" }  // blue - all
  ];

  return (
    <div style={{
      display: "flex",
      background: "#e8f2fd",
      height: 32,
      padding: "0 10px",
      width: "100%",
      borderBottom: "1px solid #dce7f4",
      justifyContent: "center"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
        <span style={{ display: "flex", alignItems: "center", gap: 2 }}>
          <span style={{ color: "#444", fontWeight: 500, marginRight: 2, fontSize: 13 }}>{counts.running}</span>
          <BsFillTruckFrontFill size={18} style={truckStyles[0]} />
          <span style={{ fontSize: 12, marginLeft: 2 }}>Running</span>
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 2 }}>
          <span style={{ color: "#444", fontWeight: 500, marginRight: 2, fontSize: 13 }}>{counts.idle}</span>
          <BsFillTruckFrontFill size={18} style={truckStyles[1]} />
          <span style={{ fontSize: 12, marginLeft: 2 }}>Idle</span>
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 2 }}>
          <span style={{ color: "#444", fontWeight: 500, marginRight: 2, fontSize: 13 }}>{counts.stopped}</span>
          <BsFillTruckFrontFill size={18} style={truckStyles[2]} />
          <span style={{ fontSize: 12, marginLeft: 2 }}>Stopped</span>
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 2 }}>
          <span style={{ color: "#444", fontWeight: 500, marginRight: 2, fontSize: 13 }}>{counts.all}</span>
          <BsFillTruckFrontFill size={18} style={truckStyles[3]} />
          <span style={{ fontSize: 12, marginLeft: 2 }}>All</span>
        </span>
      </div>
    </div>
  );
};

// Create a larger balloon marker icon
const createBalloonIcon = (color = '#3388ff') => {
  return L.divIcon({
    className: 'custom-balloon-marker',
    html: `
      <div style="
        width: 40px;
        height: 40px;
        background-color: ${color};
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        border: 2px solid #ffffff;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="
          width: 16px;
          height: 16px;
          background-color: white;
          border-radius: 50%;
          transform: rotate(45deg);
        "></div>
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });
};

// Simple Vehicle Marker Component
const VehicleMarker = ({ position, heading, color, children }) => {
  return (
    <Marker position={position} icon={createBalloonIcon(color)}>
      {children}
    </Marker>
  );
};

// Map Features Panel Component
const MapFeaturesPanel = ({ 
  showClusters, 
  setShowClusters, 
  showHeatmap, 
  setShowHeatmap, 
  showPaths, 
  setShowPaths,
  showGeofences,
  setShowGeofences,
  onClose
}) => {
  return (
    <div className="map-features-panel">
      <div className="panel-header">
        <h3>Map Features</h3>
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
      </div>
      <div className="panel-content">
        <div className="feature-option">
          <input 
            type="checkbox" 
            id="show-clusters" 
            checked={showClusters}
            onChange={() => setShowClusters(!showClusters)}
          />
          <label htmlFor="show-clusters">
            <MdLayers /> Show Clusters
          </label>
        </div>
        
        <div className="feature-option">
          <input 
            type="checkbox" 
            id="show-heatmap" 
            checked={showHeatmap}
            onChange={() => setShowHeatmap(!showHeatmap)}
          />
          <label htmlFor="show-heatmap">
            <MdWhatshot /> Show Heatmap
          </label>
        </div>
        
        <div className="feature-option">
          <input 
            type="checkbox" 
            id="show-paths" 
            checked={showPaths}
            onChange={() => setShowPaths(!showPaths)}
          />
          <label htmlFor="show-paths">
            <MdTimeline /> Show Paths
          </label>
        </div>
        
        <div className="feature-option">
          <input 
            type="checkbox" 
            id="show-geofences" 
            checked={showGeofences}
            onChange={() => setShowGeofences(!showGeofences)}
          />
          <label htmlFor="show-geofences">
            <FaMapMarkedAlt /> Show Geofences
          </label>
        </div>
        
        <div className="feature-info">
          <p><strong>Note:</strong> Clustering and heatmap features require additional libraries for full implementation.</p>
        </div>
      </div>
    </div>
  );
};

// Simple Heatmap Layer Component (placeholder)
const HeatmapLayer = ({ data, show }) => {
  const map = useMap();
  
  useEffect(() => {
    if (show && data.length > 0) {
      // This is a placeholder for heatmap implementation
      // In a real implementation, you would use a library like react-leaflet-heatmap-layer
      console.log('Heatmap data:', data);
      
      // Create a simple visual representation of heatmap using circles
      data.forEach(point => {
        const circle = L.circle([point.lat, point.lng], {
          color: 'red',
          fillColor: '#f03',
          fillOpacity: 0.3,
          radius: 500
        }).addTo(map);
        
        // Store circle reference for cleanup
        return () => {
          map.removeLayer(circle);
        };
      });
    }
  }, [show, data, map]);
  
  return null;
};

// Simple Cluster Layer Component (placeholder)
const ClusterLayer = ({ devices, show, selectedDeviceId }) => {
  const map = useMap();
  
  useEffect(() => {
    if (show && Object.keys(devices).length > 0) {
      // This is a placeholder for clustering implementation
      // In a real implementation, you would use a library like react-leaflet-markercluster
      console.log('Clustering devices:', Object.keys(devices).length);
      
      // Group nearby devices (simplified clustering logic)
      const clusters = {};
      const clusterRadius = 0.01; // Approximate cluster radius in degrees
      
      Object.entries(devices).forEach(([imei, device]) => {
        if (device.lat && device.lng) {
          const clusterKey = `${Math.round(device.lat / clusterRadius)},${Math.round(device.lng / clusterRadius)}`;
          
          if (!clusters[clusterKey]) {
            clusters[clusterKey] = {
              center: [device.lat, device.lng],
              devices: [],
              count: 0
            };
          }
          
          clusters[clusterKey].devices.push(device);
          clusters[clusterKey].count++;
        }
      });
      
      // Create cluster markers
      Object.values(clusters).forEach(cluster => {
        if (cluster.count > 1) {
          // Create a cluster marker
          const clusterIcon = L.divIcon({
            className: 'cluster-marker',
            html: `
              <div style="
                background-color: #4285f4;
                color: white;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
                border: 2px solid white;
                box-shadow: 0 2px 6px rgba(0,0,0,0.3);
              ">
                ${cluster.count}
              </div>
            `,
            iconSize: [40, 40],
            iconAnchor: [20, 20]
          });
          
          const marker = L.marker(cluster.center, { icon: clusterIcon }).addTo(map);
          marker.bindPopup(`Cluster with ${cluster.count} vehicles`);
          
          return () => {
            map.removeLayer(marker);
          };
        }
      });
    }
  }, [show, devices, map, selectedDeviceId]);
  
  return null;
};

// Resizable Divider Component
const ResizableDivider = ({ onResize }) => {
  const [isDragging, setIsDragging] = useState(false);
  
  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  };
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      
      // Calculate the new width as a percentage of the window width
      const newWidth = (e.clientX / window.innerWidth) * 100;
      
      // Constrain the width between 20% and 70% of the window
      const constrainedWidth = Math.max(20, Math.min(70, newWidth));
      
      onResize(constrainedWidth);
    };
    
    const handleMouseUp = () => {
      setIsDragging(false);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
    
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, onResize]);
  
  return (
    <div 
      className={`resizable-divider ${isDragging ? 'dragging' : ''}`}
      onMouseDown={handleMouseDown}
    >
      <div className="divider-line"></div>
      <div className="divider-handle">
        <div className="handle-dots">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      </div>
    </div>
  );
};

// Main MapView Component
function MapView() {
  const [mapType, setMapType] = useState('map');
  const [center, setCenter] = useState([25.621209, 85.170179]);
  const [cursorPosition, setCursorPosition] = useState([25.621209, 85.170179]);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const [devicesData, setDevicesData] = useState({}); // Stores data keyed by IMEI
  const [selectedDeviceId, setSelectedDeviceId] = useState(null); // Track selected device
  const [zoomLevel, setZoomLevel] = useState(15);
  const [isUserInteracting, setIsUserInteracting] = useState(false); // Track user interaction
  const prevSelectedDeviceIdRef = useRef(null);
  const prevPositionRef = useRef(null);
  const positionUpdateTimeoutRef = useRef(null);

  // New state variables for map features
  const [showMapFeaturesPanel, setShowMapFeaturesPanel] = useState(false);
  const [showClusters, setShowClusters] = useState(false);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [showPaths, setShowPaths] = useState(true);
  const [showGeofences, setShowGeofences] = useState(false);
  const [heatmapData, setHeatmapData] = useState([]);
  
  // State for sidebar width
  const [sidebarWidth, setSidebarWidth] = useState(30); // Default 30% width

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

  // Get nearest location using reverse geocoding
  const getNearestLocation = async (lat, lng) => {
    try {
      // Using Nominatim OpenStreetMap service
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
      const data = await response.json();
      return data.display_name || 'Unknown Location';
    } catch (error) {
      console.error('Error getting nearest location:', error);
      return 'Location Unknown';
    }
  };

  // Handle device selection from table
  const handleDeviceSelect = (imei) => {
    setSelectedDeviceId(imei);
    prevSelectedDeviceIdRef.current = imei;
    
    // Center map on the selected device if available
    const device = devicesData[imei];
    if (device && device.lat && device.lng && mapRef.current) {
      const map = mapRef.current;
      map.flyTo([device.lat, device.lng], zoomLevel, { animate: true, duration: 1.0 });
      setCenter([device.lat, device.lng]);
      prevPositionRef.current = [device.lat, device.lng];
    }
  };

  // Handle sidebar resize
  const handleSidebarResize = (newWidth) => {
    setSidebarWidth(newWidth);
  };

  // Generate heatmap data from devices
  useEffect(() => {
    if (showHeatmap && Object.keys(devicesData).length > 0) {
      const points = Object.values(devicesData).map(device => ({
        lat: device.lat,
        lng: device.lng,
        intensity: device.speed || 1 // Use speed as intensity, default to 1
      }));
      setHeatmapData(points);
    } else {
      setHeatmapData([]);
    }
  }, [showHeatmap, devicesData]);

  // Log devices data for debugging
  useEffect(() => {
    console.log('Devices data updated:', devicesData);
    console.log('Number of devices:', Object.keys(devicesData).length);
  }, [devicesData]);

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

    socket.on('gps_update', async (data) => {
      try {
        console.log('Received GPS update:', data);
        
        if (data && data.imei && typeof data.lat === 'number' && typeof data.lng === 'number') {
          setDevicesData(prev => {
            const prevDevice = prev[data.imei] || {};
            const newPathHistory = prevDevice.pathHistory ? [...prevDevice.pathHistory, [data.lat, data.lng]] : [[data.lat, data.lng]];
            
            // Calculate idle time if speed is 0
            let idleTime = prevDevice.idleTime || '00:00:00';
            if (data.speed === 0 && prevDevice.speed === 0) {
              // Increment idle time (this is a simplified approach)
              const [hours, minutes, seconds] = idleTime.split(':').map(Number);
              const totalSeconds = hours * 3600 + minutes * 60 + seconds + 1;
              const newHours = Math.floor(totalSeconds / 3600);
              const newMinutes = Math.floor((totalSeconds % 3600) / 60);
              const newSeconds = totalSeconds % 60;
              idleTime = `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}:${String(newSeconds).padStart(2, '0')}`;
            } else if (data.speed > 0) {
              // Reset idle time if vehicle is moving
              idleTime = '00:00:00';
            }
            
            // Calculate status based on ignition and speed
            let status = 'Off';
            if (data.ignition) {
              status = data.speed > 0 ? 'On' : 'Idle';
            }
            
            // Get nearest location
            let nearestLocation = data.nearestLocation || 'N/A';
            if (!nearestLocation || nearestLocation === 'N/A') {
              // Note: In production, you might want to debounce this or use a local cache
              nearestLocation = getNearestLocation(data.lat, data.lng);
            }
            
            return {
              ...prev,
              [data.imei]: {
                ...prevDevice,
                ...data,
                pathHistory: newPathHistory,
                idleTime: idleTime,
                status: status,
                lastSeen: new Date().toLocaleString(),
                // Map backend fields to frontend fields
                group: data.group || 'N/A',
                share: data.share || 'Public',
                vehicle: data.vehicleNo || 'N/A',
                battery: data.internalBatteryVoltage ? `${Math.round(data.internalBatteryVoltage)}V` : 'N/A',
                nearestLocation: nearestLocation,
                simNum: data.simNum || 'N/A',
                specification: data.specification || 'GPS Device',
                // Additional fields from device packet
                vendorId: data.vendorId || 'N/A',
                firmwareVersion: data.firmwareVersion || 'N/A',
                packetType: data.packetType || 'N/A',
                alertId: data.alertId || 'N/A',
                packetStatus: data.packetStatus || 'N/A',
                gpsFix: data.gpsFix || 'N/A',
                satellites: data.satellites || 0,
                altitude: data.altitude || 0,
                networkOperator: data.networkOperator || 'N/A',
                mainPowerStatus: data.mainPowerStatus || 'N/A',
                mainInputVoltage: data.mainInputVoltage || 0,
                emergencyStatus: data.emergencyStatus || 'N/A',
                tamperAlert: data.tamperAlert || 'N/A',
                gsmSignalStrength: data.gsmSignalStrength || 0,
                mcc: data.mcc || 'N/A',
                mnc: data.mnc || 'N/A',
                lac: data.lac || 'N/A',
                cellId: data.cellId || 'N/A',
                nmr: data.nmr || 'N/A',
                digitalInputStatus: data.digitalInputStatus || 'N/A',
                digitalOutputStatus: data.digitalOutputStatus || 'N/A',
                analogInput1: data.analogInput1 || 0,
                analogInput2: data.analogInput2 || 0,
                frameNumber: data.frameNumber || 'N/A'
              }
            };
          });
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

  // Extract selected device data for dependency array
  const selectedDevice = devicesData[selectedDeviceId];
  const selectedDeviceLat = selectedDevice?.lat;
  const selectedDeviceLng = selectedDevice?.lng;

  // Center map on the selected device when it updates, but avoid jumping
  useEffect(() => {
    if (selectedDeviceId && selectedDeviceLat && selectedDeviceLng && !isUserInteracting) {
      const currentPosition = [selectedDeviceLat, selectedDeviceLng];
      
      // Clear any existing timeout
      if (positionUpdateTimeoutRef.current) {
        clearTimeout(positionUpdateTimeoutRef.current);
      }
      
      // Set a timeout to update the map position
      positionUpdateTimeoutRef.current = setTimeout(() => {
        // Check if this is a new device selection
        if (prevSelectedDeviceIdRef.current !== selectedDeviceId) {
          // New device selected - use flyTo with animation
          const map = mapRef.current;
          map.flyTo(currentPosition, zoomLevel, { animate: true, duration: 1.0 });
          prevSelectedDeviceIdRef.current = selectedDeviceId;
        } else {
          // Same device - check if position has changed significantly
          if (!prevPositionRef.current || 
              Math.abs(prevPositionRef.current[0] - selectedDeviceLat) > 0.001 || 
              Math.abs(prevPositionRef.current[1] - selectedDeviceLng) > 0.001) {
            // Position changed significantly - use panTo without animation for smooth tracking
            const map = mapRef.current;
            map.panTo(currentPosition, { animate: false });
          }
        }
        
        setCenter(currentPosition);
        prevPositionRef.current = currentPosition;
      }, 500); // Debounce for 500ms to prevent jumping
    }
  }, [selectedDeviceId, selectedDeviceLat, selectedDeviceLng, zoomLevel, isUserInteracting]);

  // Map events to update cursor position, zoom level and center
  function MapEvents() {
    const map = useMap();
    mapRef.current = map;

    useMapEvents({
      moveend: (e) => {
        const center = e.target.getCenter();
        setCenter([center.lat, center.lng]);
        setCursorPosition([center.lat, center.lng]);
        setIsUserInteracting(false); // User finished interacting
      },
      mousemove: (e) => {
        setCursorPosition([e.latlng.lat, e.latlng.lng]);
      },
      zoomend: (e) => {
        setZoomLevel(e.target.getZoom());
        setIsUserInteracting(false); // User finished interacting
      },
      movestart: () => {
        setIsUserInteracting(true); // User started interacting
      },
      zoomstart: () => {
        setIsUserInteracting(true); // User started interacting
      }
    });
    return null;
  }

  return (
    <div className="map-view-container">
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      
      <VehicleIndicator devices={devicesData} />
      
      <div className="main-content">
        <div className="sidebar" style={{ width: `${sidebarWidth}%` }}> 
          <VehicleTable 
            devices={devicesData} 
            onDeviceSelect={handleDeviceSelect}
            selectedDeviceId={selectedDeviceId}
          />
        </div>
        
        <ResizableDivider onResize={handleSidebarResize} />
        
        <div className="map-container" style={{ width: `${100 - sidebarWidth}%` }}>
          <div className="map-controls-top">
            <button 
              className={`control-btn ${showMapFeaturesPanel ? 'active' : ''}`}
              onClick={() => setShowMapFeaturesPanel(!showMapFeaturesPanel)}
              title="Map Features"
            >
              <MdLayers />
            </button>
          </div>
          
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
              <StatusIndicator status={connectionStatus === 'connected' ? 'On' : 'Off'} />
              <span style={{ marginLeft: '8px' }}>Status: {connectionStatus}</span>
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

            {/* Render heatmap layer if enabled */}
            {showHeatmap && <HeatmapLayer data={heatmapData} show={showHeatmap} />}
            
            {/* Render cluster layer if enabled */}
            {showClusters && <ClusterLayer devices={devicesData} show={showClusters} selectedDeviceId={selectedDeviceId} />}

            {/* Render vehicle markers and paths */}
            {!showClusters && Object.entries(devicesData).map(([imei, device]) => (
              <React.Fragment key={imei}>
                {/* Draw path history if available and enabled */}
                {showPaths && device.pathHistory && device.pathHistory.length > 1 && (
                  <Polyline 
                    positions={device.pathHistory} 
                    color={selectedDeviceId === imei ? "#4CAF50" : "#81C784"} 
                    weight={selectedDeviceId === imei ? 5 : 3} 
                    opacity={selectedDeviceId === imei ? 0.9 : 0.5} 
                  />
                )}

                {/* Draw vehicle marker */}
                {device.lat && device.lng && (
                  <VehicleMarker
                    position={[device.lat, device.lng]}
                    heading={device.heading || 0}
                    color={selectedDeviceId === imei ? "#4CAF50" : "#3388ff"} // Changed to green for selected
                  >
                    <Tooltip>
                      {device.vehicle || imei} {/* Show vehicle number in tooltip */}
                    </Tooltip>
                    <Popup>
                      <div className="popup-content">
                        <h3>Vehicle: {device.vehicle || imei}</h3>
                        <p>Lat: {device.lat.toFixed(6)}</p>
                        <p>Lng: {device.lng.toFixed(6)}</p>
                        <p>Speed: {device.speed ? `${device.speed} km/h` : 'N/A'}</p>
                        <p>Heading: {device.heading ? `${device.heading}°` : 'N/A'}</p>
                        <p>Timestamp: {formatDateTime(device.date, device.time)}</p>
                        <p>Status: {device.status || 'N/A'}</p>
                        <p>Battery: {device.battery || 'N/A'}</p>
                        <p>Altitude: {device.altitude ? `${device.altitude}m` : 'N/A'}</p>
                        <p>Satellites: {device.satellites || 0}</p>
                        <p>GPS Fix: {device.gpsFix || 'N/A'}</p>
                        <p>Network: {device.networkOperator || 'N/A'}</p>
                        <p>Signal: {device.gsmSignalStrength ? `${device.gsmSignalStrength} dBm` : 'N/A'}</p>
                      </div>
                    </Popup>
                  </VehicleMarker>
                )}
              </React.Fragment>
            ))}

            <MapEvents />
          </MapContainer>
        </div>
      </div>
      
      {/* Map Features Panel */}
      {showMapFeaturesPanel && (
        <MapFeaturesPanel 
          showClusters={showClusters}
          setShowClusters={setShowClusters}
          showHeatmap={showHeatmap}
          setShowHeatmap={setShowHeatmap}
          showPaths={showPaths}
          setShowPaths={setShowPaths}
          showGeofences={showGeofences}
          setShowGeofences={setShowGeofences}
          onClose={() => setShowMapFeaturesPanel(false)}
        />
      )}
    </div>
  );
}

export default MapView;