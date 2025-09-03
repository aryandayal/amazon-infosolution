import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from "react-helmet";
import Header from '../../components/Header';
import BottomNavbar from '../../components/BottomNavbar';
import './restrictedroutelist.css';
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
const RestrictedRouteList = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [mapMode, setMapMode] = useState('roadmap'); // 'roadmap' or 'satellite'
  
  // Sidebar form states
  const [provider, setProvider] = useState('Amazon Infosolution Pvt Ltd - GoldX');
  const [company, setCompany] = useState('A TO Z SOLUTION');
  const [routeName, setRouteName] = useState('');
  
  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);
  
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
        (!provider || site.provider.toLowerCase().includes(provider.toLowerCase())) &&
        (!company || site.company.toLowerCase().includes(company.toLowerCase()))
      );
    });
  }, [provider, company, sites]);
  
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
    // In a real application, this would filter the map based on selections
    console.log('View clicked with selections:', {
      provider, company
    });
  };
  
  // Handle Add button click
  const handleAddRoute = () => {
    if (!routeName.trim()) {
      alert('Please enter a route name');
      return;
    }
    
    // In a real application, this would add a new route
    console.log('Add Route clicked with name:', routeName);
    alert(`Route "${routeName}" would be added here`);
    setRouteName('');
  };
  
  // Handle Clear Route Map button click
  const handleClearMap = () => {
    // Reset all form selections
    setProvider('');
    setCompany('');
    setRouteName('');
  };
  
  return (
    <>
    <Helmet>
            <title>RestrictedRouteList</title>
          </Helmet>
      <Header />
      <BottomNavbar text="Restricted Route List" />
      <div className="restricted-route-list-container">
        {/* Top Header */}
        <div className="header">
          <div className="report-title">Restricted Route List</div>
          <div className="date-range">
            <span>From: 2025-07-16 00:00</span>
            <span>To: 2025-08-16 02:09</span>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="main-content">
          {/* Left Sidebar */}
          <div className="sidebar">
            {/* First section: Provider and Company inputs */}
            <div className="input-row">
              <div className="form-group provider-group">
                <label htmlFor="provider">Provider</label>
                <input 
                  type="text" 
                  id="provider" 
                  className="filter-input" 
                  value={provider} 
                  onChange={(e) => setProvider(e.target.value)}
                />
              </div>
              
              <div className="form-group company-group">
                <label htmlFor="company">Company</label>
                <input 
                  type="text" 
                  id="company" 
                  className="filter-input" 
                  value={company} 
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>
            </div>
            
            {/* Second section: VIEW button on next line */}
            <div className="button-row">
              <button className="view-button" onClick={handleView}>VIEW</button>
            </div>
            
            <div className="divider"></div>
            
            {/* Third section: RouteName input */}
            <div className="input-row">
              <div className="form-group route-group">
                <label htmlFor="route-name">RouteName</label>
                <input 
                  type="text" 
                  id="route-name" 
                  className="filter-input" 
                  value={routeName} 
                  onChange={(e) => setRouteName(e.target.value)}
                />
              </div>
            </div>
            
            {/* Fourth section: ADD and CLEAR ROUTE MAP buttons on next line */}
            <div className="button-row">
              <button className="add-button" onClick={handleAddRoute}>ADD</button>
              <button className="clear-button" onClick={handleClearMap}>CLEAR ROUTE MAP</button>
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
                    <div className="route-popup">
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
            <span className="status-label">View Mode:</span>
            <span>{mapMode === 'roadmap' ? 'Roadmap' : 'Satellite'}</span>
          </div>
        </div>
      </div>
    </>
  );
};
export default RestrictedRouteList;