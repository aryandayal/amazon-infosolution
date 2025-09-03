import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/Header';
import BottomNavbar from '../../components/BottomNavbar';
import './fueldistancegraph.css';
// Import Leaflet components
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
// Fix for default markers in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});
const FuelDistanceGraph = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [mapMode, setMapMode] = useState('roadmap'); // 'roadmap' or 'satellite'
  
  // Sidebar form states
  const [provider, setProvider] = useState('');
  const [company, setCompany] = useState('');
  const [group, setGroup] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [fuelSensor, setFuelSensor] = useState('');
  const [otherSensor, setOtherSensor] = useState('');
  const [startDate, setStartDate] = useState('2025-07-16T00:00');
  const [endDate, setEndDate] = useState('2025-08-16T02:09');
  const [graphType, setGraphType] = useState('');
  const [distanceRadius, setDistanceRadius] = useState('');
  
  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Sample data for providers - wrapped in useMemo
  const providers = useMemo(() => [
    { id: '', name: 'Select Provider' },
    { id: 1, name: 'Provider A' },
    { id: 2, name: 'Provider B' },
    { id: 3, name: 'Provider C' },
  ], []);
  
  // Sample companies - wrapped in useMemo
  const companies = useMemo(() => [
    { id: '', name: 'Select Company' },
    { id: 1, name: 'Company A' },
    { id: 2, name: 'Company B' },
    { id: 3, name: 'Company C' },
  ], []);
  
  // Sample groups - wrapped in useMemo
  const groups = useMemo(() => [
    { id: '', name: 'Select Group' },
    { id: 1, name: 'Group A' },
    { id: 2, name: 'Group B' },
    { id: 3, name: 'Group C' },
  ], []);
  
  // Sample vehicles - wrapped in useMemo
  const vehicles = useMemo(() => [
    { id: '', name: 'Select Vehicle' },
    { id: 1, name: 'Vehicle A', status: 'Active' },
    { id: 2, name: 'Vehicle B', status: 'Inactive' },
    { id: 3, name: 'Vehicle C', status: 'Active' },
    { id: 4, name: 'Vehicle D', status: 'Maintenance' },
  ], []);
  
  // Sample fuel sensors - wrapped in useMemo
  const fuelSensors = useMemo(() => [
    { id: '', name: 'Select Fuel Sensor' },
    { id: 1, name: 'Fuel Sensor 1' },
    { id: 2, name: 'Fuel Sensor 2' },
    { id: 3, name: 'Fuel Sensor 3' },
  ], []);
  
  // Sample other sensors - wrapped in useMemo
  const otherSensors = useMemo(() => [
    { id: '', name: 'Select Other Sensor' },
    { id: 1, name: 'Temperature Sensor' },
    { id: 2, name: 'Pressure Sensor' },
    { id: 3, name: 'Humidity Sensor' },
  ], []);
  
  // Sample graph types - wrapped in useMemo
  const graphTypes = useMemo(() => [
    { id: '', name: 'Select Graph Type' },
    { id: 1, name: 'Line Graph' },
    { id: 2, name: 'Bar Graph' },
    { id: 3, name: 'Pie Chart' },
    { id: 4, name: 'Scatter Plot' },
  ], []);
  
  // Sample sites with coordinates
  const sites = useMemo(() => [
    { 
      id: 1, 
      name: 'Kuqiete Likecun', 
      position: [35.8617, 104.1954],
      type: 'Warehouse',
      provider: 'Provider A',
      company: 'Company B',
      address: '123 Main Street, Kuqiete Likecun',
      city: 'Kuqiete',
      state: 'Likecun Province',
      country: 'China'
    },
    { 
      id: 2, 
      name: 'Beijing Headquarters', 
      position: [39.9042, 116.4074],
      type: 'Office',
      provider: 'Provider A',
      company: 'Company A',
      address: '456 Business Ave, Beijing',
      city: 'Beijing',
      state: 'Beijing Municipality',
      country: 'China'
    },
    { 
      id: 3, 
      name: 'Shanghai Distribution', 
      position: [31.2304, 121.4737],
      type: 'Distribution Center',
      provider: 'Provider B',
      company: 'Company B',
      address: '789 Logistics Rd, Shanghai',
      city: 'Shanghai',
      state: 'Shanghai Municipality',
      country: 'China'
    },
    { 
      id: 4, 
      name: 'Guangzhou Warehouse', 
      position: [23.1291, 113.2644],
      type: 'Warehouse',
      provider: 'Provider C',
      company: 'Company C',
      address: '321 Storage Way, Guangzhou',
      city: 'Guangzhou',
      state: 'Guangdong Province',
      country: 'China'
    },
  ], []);
  
  // Filter sites based on selections
  const filteredSites = useMemo(() => {
    return sites.filter(site => {
      return (
        (!provider || site.provider === providers.find(p => p.id === provider)?.name) &&
        (!company || site.company === companies.find(c => c.id === company)?.name)
      );
    });
  }, [provider, company, sites, providers, companies]);
  
  // Toggle between map modes
  const toggleMapMode = () => {
    if (mapMode === 'roadmap') {
      setMapMode('satellite');
    } else {
      setMapMode('roadmap');
    }
  };
  
  // Handle View button click
  const handleView = () => {
    // In a real application, this would generate the fuel distance graph report
    console.log('View clicked with form data:', {
      provider, company, group, selectedVehicle, fuelSensor, otherSensor, 
      startDate, endDate, graphType, distanceRadius
    });
    alert('Generating fuel distance graph report with selected filters');
  };
  
  return (
    <>
    <Helmet>
                <title>FuelDistanceGraph</title>
              </Helmet>
    <Header />
    <BottomNavbar text="Fuel Distance Graph" />
    <div className="fuel-distance-graph-container">
      {/* Top Header */}
      <div className="header">
        <div className="report-title">Fuel Distance Graph</div>
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
              {providers.map(provider => (
                <option key={provider.id} value={provider.id}>{provider.name}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-section">
            <h3>Company</h3>
            <select className="filter-select" value={company} onChange={(e) => setCompany(e.target.value)}>
              {companies.map(company => (
                <option key={company.id} value={company.id}>{company.name}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-section">
            <h3>Select Group</h3>
            <select className="filter-select" value={group} onChange={(e) => setGroup(e.target.value)}>
              {groups.map(group => (
                <option key={group.id} value={group.id}>{group.name}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-section">
            <h3>Select Vehicles</h3>
            <select className="filter-select" value={selectedVehicle} onChange={(e) => setSelectedVehicle(e.target.value)}>
              {vehicles.map(vehicle => (
                <option key={vehicle.id} value={vehicle.id}>{vehicle.name}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-section">
            <h3>Fuel Sensor</h3>
            <select className="filter-select" value={fuelSensor} onChange={(e) => setFuelSensor(e.target.value)}>
              {fuelSensors.map(sensor => (
                <option key={sensor.id} value={sensor.id}>{sensor.name}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-section">
            <h3>Other Sensor</h3>
            <select className="filter-select" value={otherSensor} onChange={(e) => setOtherSensor(e.target.value)}>
              {otherSensors.map(sensor => (
                <option key={sensor.id} value={sensor.id}>{sensor.name}</option>
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
            <h3>Graph Type</h3>
            <select className="filter-select" value={graphType} onChange={(e) => setGraphType(e.target.value)}>
              {graphTypes.map(type => (
                <option key={type.id} value={type.id}>{type.name}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-section">
            <h3>Distance Radius</h3>
            <div className="distance-radius-container">
              <input 
                type="number" 
                className="distance-radius-input" 
                placeholder="Enter radius"
                value={distanceRadius}
                onChange={(e) => setDistanceRadius(e.target.value)}
              />
              <span className="distance-unit">km</span>
            </div>
          </div>
          
          <div className="filter-section">
            <button className="view-button" onClick={handleView}>View</button>
          </div>
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
            
            {/* Site markers */}
            {filteredSites.map(site => (
              <Marker key={site.id} position={site.position}>
                <Popup>
                  <div className="site-popup">
                    <h3>{site.name}</h3>
                    <p><strong>Type:</strong> {site.type}</p>
                    <p><strong>Provider:</strong> {site.provider}</p>
                    <p><strong>Company:</strong> {site.company}</p>
                    <p><strong>Address:</strong> {site.address}</p>
                    <p><strong>City:</strong> {site.city}</p>
                    <p><strong>State:</strong> {site.state}</p>
                    <p><strong>Country:</strong> {site.country}</p>
                  </div>
                </Popup>
              </Marker>
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
          <span className="status-label">Total Sites:</span>
          <span>{sites.length}</span>
        </div>
        <div className="status-item">
          <span className="status-label">Filtered Sites:</span>
          <span>{filteredSites.length}</span>
        </div>
        <div className="status-item">
          <span className="status-label">Selected Vehicle:</span>
          <span>{selectedVehicle ? vehicles.find(v => v.id === selectedVehicle)?.name : 'None'}</span>
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
export default FuelDistanceGraph;