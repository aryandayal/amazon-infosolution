import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import Header from "../../components/Header";
import BottomNavbar from "../../components/BottomNavbar";
import './routemapper.css';

// Import Leaflet components
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Custom Number Input component with increment/decrement buttons
const NumberInput = ({ value, onChange, min, max, step = 1, unit }) => {
  const increment = () => {
    onChange(Math.min(max, value + step));
  };

  const decrement = () => {
    onChange(Math.max(min, value - step));
  };

  return (
    <div className="number-input-container">
      <button type="button" className="number-input-btn" onClick={decrement}>-</button>
      <input 
        type="number" 
        value={value} 
        onChange={(e) => onChange(Number(e.target.value))}
        min={min}
        max={max}
        step={step}
        className="number-input"
      />
      <button type="button" className="number-input-btn" onClick={increment}>+</button>
      {unit && <span className="number-input-unit">{unit}</span>}
    </div>
  );
};

const RouteMapper = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [mapMode, setMapMode] = useState('roadmap'); // 'roadmap' or 'satellite'
  
  // Sidebar form states
  const [provider, setProvider] = useState('');
  const [company, setCompany] = useState('');
  const [group, setGroup] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [startDate, setStartDate] = useState('2025-07-16T00:00');
  const [endDate, setEndDate] = useState('2025-08-16T02:09');
  const [frequency, setFrequency] = useState(5);
  const [speedLimit, setSpeedLimit] = useState({ enabled: false, value: 60 });
  const [stopTime, setStopTime] = useState({ enabled: false, value: 5 });
  const [timeInterval, setTimeInterval] = useState({ enabled: false, value: 1 });
  const [unreach, setUnreach] = useState(false);
  const [sites, setSites] = useState(false);
  const [routeDeviation, setRouteDeviation] = useState(false);
  const [ignition, setIgnition] = useState(false);
  const [battery, setBattery] = useState(false);
  const [showEvents, setShowEvents] = useState(false);
  
  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Sample data for vehicles
  const vehicles = [
    { id: '', name: 'Select Vehicle' },
    { id: 1, name: 'Vehicle A', status: 'Active' },
    { id: 2, name: 'Vehicle B', status: 'Inactive' },
    { id: 3, name: 'Vehicle C', status: 'Active' },
    { id: 4, name: 'Vehicle D', status: 'Maintenance' },
  ];
  
  // Sample companies
  const companies = [
    { id: 1, name: 'Company A' },
    { id: 2, name: 'Company B' },
    { id: 3, name: 'Company C' },
  ];
  
  // Sample providers
  const providers = [
    { id: 1, name: 'Provider A' },
    { id: 2, name: 'Provider B' },
    { id: 3, name: 'Provider C' },
  ];
  
  // Sample groups
  const groups = [
    { id: 1, name: 'Group A' },
    { id: 2, name: 'Group B' },
    { id: 3, name: 'Group C' },
  ];
  
  // Countries with coordinates - wrapped in useMemo
  const countries = useMemo(() => [
    { id: 1, name: 'China', position: [35.8617, 104.1954] },
    { id: 2, name: 'India', position: [20.5937, 78.9629] },
    { id: 3, name: 'Turkey', position: [38.9637, 35.2433] },
    { id: 4, name: 'Japan', position: [36.2048, 138.2529] },
    { id: 5, name: 'Thailand', position: [15.8700, 100.9925] },
  ], []);
  
  // Routes with coordinates - wrapped in useMemo
  const routes = useMemo(() => [
    { id: 1, positions: [
      [35.8617, 104.1954], // China
      [20.5937, 78.9629],  // India
      [38.9637, 35.2433]   // Turkey
    ]},
    { id: 2, positions: [
      [38.9637, 35.2433],  // Turkey
      [15.8700, 100.9925]  // Thailand
    ]},
    { id: 3, positions: [
      [15.8700, 100.9925], // Thailand
      [36.2048, 138.2529]  // Japan
    ]}
  ], []);
  
  // Toggle between map modes
  const toggleMapMode = () => {
    if (mapMode === 'roadmap') {
      setMapMode('satellite');
    } else {
      setMapMode('roadmap');
    }
  };
  
  // Handle form submission
  const handleViewReport = () => {
    // In a real application, this would trigger the report generation
    console.log('View Report clicked with form data:', {
      provider, company, group, selectedVehicle, startDate, endDate,
      frequency, speedLimit, stopTime, timeInterval,
      unreach, sites, routeDeviation, ignition, battery, showEvents
    });
  };
  
  return (
    <>
    <Helmet>
                <title>RouteMapper</title>
              </Helmet>
    <Header />
    <BottomNavbar text="Route Mapper" />
    <div className="route-mapper-container">
      {/* Top Header */}
      <div className="header">
        <div className="report-title">Report : Route Mapper Report</div>
        <div className="date-range">
          <span>From: 2025-07-16 00:00</span>
          <span>To: 2025-08-16 02:09</span>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="main-content">
        {/* Left Sidebar */}
        <div className="sidebar">
          <div className="filter-section">
            <h3>Provider</h3>
            <select className="filter-select" value={provider} onChange={(e) => setProvider(e.target.value)}>
              <option value="">Select Provider</option>
              {providers.map(provider => (
                <option key={provider.id} value={provider.id}>{provider.name}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-section">
            <h3>Company</h3>
            <select className="filter-select" value={company} onChange={(e) => setCompany(e.target.value)}>
              <option value="">Select Company</option>
              {companies.map(company => (
                <option key={company.id} value={company.id}>{company.name}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-section">
            <h3>Select Group</h3>
            <select className="filter-select" value={group} onChange={(e) => setGroup(e.target.value)}>
              <option value="">Select Group</option>
              {groups.map(group => (
                <option key={group.id} value={group.id}>{group.name}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-section">
            <h3>Select Vehicle</h3>
            <select className="filter-select" value={selectedVehicle} onChange={(e) => setSelectedVehicle(e.target.value)}>
              {vehicles.map(vehicle => (
                <option key={vehicle.id} value={vehicle.id}>{vehicle.name}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-section">
            <h3>Start Date</h3>
            <input 
              type="datetime-local" 
              className="datetime-input" 
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          
          <div className="filter-section">
            <h3>End Date</h3>
            <input 
              type="datetime-local" 
              className="datetime-input" 
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          
          <div className="filter-section">
            <h3>Frequency</h3>
            <NumberInput 
              value={frequency} 
              onChange={setFrequency}
              min={1}
              max={60}
              step={1}
            />
          </div>
          
          <div className="filter-section">
            <h3>Speed Limit</h3>
            <div className="checkbox-with-input">
              <input 
                type="checkbox" 
                id="speed-limit" 
                checked={speedLimit.enabled}
                onChange={(e) => setSpeedLimit({...speedLimit, enabled: e.target.checked})}
              />
              <label htmlFor="speed-limit">Speed Limit</label>
              <NumberInput 
                value={speedLimit.value} 
                onChange={(value) => setSpeedLimit({...speedLimit, value})}
                min={0}
                max={200}
                step={5}
                unit="KMPH"
                disabled={!speedLimit.enabled}
              />
            </div>
          </div>
          
          <div className="filter-section">
            <h3>Stop Time</h3>
            <div className="checkbox-with-input">
              <input 
                type="checkbox" 
                id="stop-time" 
                checked={stopTime.enabled}
                onChange={(e) => setStopTime({...stopTime, enabled: e.target.checked})}
              />
              <label htmlFor="stop-time">Stop Time</label>
              <NumberInput 
                value={stopTime.value} 
                onChange={(value) => setStopTime({...stopTime, value})}
                min={0}
                max={120}
                step={1}
                unit="Min"
                disabled={!stopTime.enabled}
              />
            </div>
          </div>
          
          <div className="filter-section">
            <h3>Time Interval</h3>
            <div className="checkbox-with-input">
              <input 
                type="checkbox" 
                id="time-interval" 
                checked={timeInterval.enabled}
                onChange={(e) => setTimeInterval({...timeInterval, enabled: e.target.checked})}
              />
              <label htmlFor="time-interval">Time Interval</label>
              <NumberInput 
                value={timeInterval.value} 
                onChange={(value) => setTimeInterval({...timeInterval, value})}
                min={0.5}
                max={24}
                step={0.5}
                unit="Hours"
                disabled={!timeInterval.enabled}
              />
            </div>
          </div>
          
          <div className="filter-section">
            <h3>Options</h3>
            <div className="checkbox-list">
              <div className="checkbox-item">
                <input 
                  type="checkbox" 
                  id="unreach" 
                  checked={unreach}
                  onChange={(e) => setUnreach(e.target.checked)}
                />
                <label htmlFor="unreach">Unreach</label>
              </div>
              <div className="checkbox-item">
                <input 
                  type="checkbox" 
                  id="sites" 
                  checked={sites}
                  onChange={(e) => setSites(e.target.checked)}
                />
                <label htmlFor="sites">Sites</label>
              </div>
              <div className="checkbox-item">
                <input 
                  type="checkbox" 
                  id="route-deviation" 
                  checked={routeDeviation}
                  onChange={(e) => setRouteDeviation(e.target.checked)}
                />
                <label htmlFor="route-deviation">Route Deviation</label>
              </div>
              <div className="checkbox-item">
                <input 
                  type="checkbox" 
                  id="ignition" 
                  checked={ignition}
                  onChange={(e) => setIgnition(e.target.checked)}
                />
                <label htmlFor="ignition">Ignition</label>
              </div>
              <div className="checkbox-item">
                <input 
                  type="checkbox" 
                  id="battery" 
                  checked={battery}
                  onChange={(e) => setBattery(e.target.checked)}
                />
                <label htmlFor="battery">Battery</label>
              </div>
              <div className="checkbox-item">
                <input 
                  type="checkbox" 
                  id="show-events" 
                  checked={showEvents}
                  onChange={(e) => setShowEvents(e.target.checked)}
                />
                <label htmlFor="show-events">Show Events</label>
              </div>
            </div>
          </div>
          
          <button className="apply-button" onClick={handleViewReport}>View</button>
        </div>
        
        {/* Map Area */}
        <div className="map-container">
          {/* Satellite View Button - positioned in top corner of map */}
          <button className="map-mode-btn" onClick={toggleMapMode}>
            {mapMode === 'roadmap' ? 'Satellite View' : 'Roadmap View'}
          </button>
          
          <MapContainer 
            center={[30, 100]} 
            zoom={3} 
            style={{ height: '100%', width: '100%' }}
          >
            {mapMode === 'roadmap' ? (
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
            ) : (
              <TileLayer
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
              />
            )}
            
            {/* Country markers */}
            {countries.map(country => (
              <Marker key={country.id} position={country.position}>
                <Popup>{country.name}</Popup>
              </Marker>
            ))}
            
            {/* Route lines */}
            {routes.map(route => (
              <Polyline 
                key={route.id} 
                positions={route.positions} 
                color="#3498db"
              />
            ))}
          </MapContainer>
        </div>
      </div>
      
      {/* Footer Status Bar */}
      <div className="status-bar">
        <div className="status-item">
          <span className="status-label">Current Time:</span>
          <span>{currentTime.toLocaleTimeString()}</span>
        </div>
        <div className="status-item">
          <span className="status-label">Active Vehicles:</span>
          <span>{vehicles.filter(v => v.status === 'Active').length}</span>
        </div>
        <div className="status-item">
          <span className="status-label">Total Routes:</span>
          <span>{routes.length}</span>
        </div>
        <div className="status-item">
          <span className="status-label">View Mode:</span>
          <span>{mapMode === 'roadmap' ? 'Roadmap' : 'Satellite'}</span>
        </div>
      </div>
    </div>
    </>
  );
};

export default RouteMapper;