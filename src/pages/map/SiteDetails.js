import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/Header';
import BottomNavbar from '../../components/BottomNavbar';
import './sitedetails.css';

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

const SiteDetails = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [mapMode, setMapMode] = useState('roadmap'); // 'roadmap' or 'satellite'
  
  // Sidebar form states
  const [provider, setProvider] = useState('');
  const [company, setCompany] = useState('');
  const [siteName, setSiteName] = useState('');
  const [siteType, setSiteType] = useState('');
  
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
  
  // Sample site names
  const siteNames = useMemo(() => [
    { id: '', name: 'Select Site' },
    { id: 1, name: 'Kuqiete Likecun' },
    { id: 2, name: 'Beijing Headquarters' },
    { id: 3, name: 'Shanghai Distribution' },
    { id: 4, name: 'Guangzhou Warehouse' },
  ], []);
  
  // Sample site types - wrapped in useMemo
  const siteTypes = useMemo(() => [
    { id: '', name: 'Select Type' },
    { id: 1, name: 'Warehouse' },
    { id: 2, name: 'Office' },
    { id: 3, name: 'Retail Store' },
    { id: 4, name: 'Distribution Center' },
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
        (!company || site.company === companies.find(c => c.id === company)?.name) &&
        (!siteName || site.id === parseInt(siteName)) &&
        (!siteType || site.type === siteTypes.find(t => t.id === siteType)?.name)
      );
    });
  }, [provider, company, siteName, siteType, sites, providers, companies, siteTypes]);
  
  // Toggle between map modes
  const toggleMapMode = () => {
    if (mapMode === 'roadmap') {
      setMapMode('satellite');
    } else {
      setMapMode('roadmap');
    }
  };
  
  // Handle Add button click
  const handleAddSite = () => {
    // In a real application, this would open a form to add a new site
    console.log('Add Site clicked with form data:', {
      provider, company, siteName, siteType
    });
    alert('Add Site functionality would open a form here');
  };
  
  // Handle Clear Map button click
  const handleClearMap = () => {
    // Reset all form selections
    setProvider('');
    setCompany('');
    setSiteName('');
    setSiteType('');
  };
  
  return (
    <>
    <Helmet>
                <title>SiteDetails</title>
              </Helmet>
    <Header />
    <BottomNavbar text="Site Details" />
    <div className="site-details-container">
      {/* Top Header */}
      <div className="header">
        <div className="report-title">Site Details</div>
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
            <h3>Site Name</h3>
            <select className="filter-select" value={siteName} onChange={(e) => setSiteName(e.target.value)}>
              {siteNames.map(site => (
                <option key={site.id} value={site.id}>{site.name}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-section">
            <h3>Type</h3>
            <select className="filter-select" value={siteType} onChange={(e) => setSiteType(e.target.value)}>
              {siteTypes.map(type => (
                <option key={type.id} value={type.id}>{type.name}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-section">
            <div className="button-group">
              <button className="add-button" onClick={handleAddSite}>Add</button>
              <button className="clear-button" onClick={handleClearMap}>Clear Map</button>
            </div>
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
          <span className="status-label">View Mode:</span>
          <span>{mapMode === 'roadmap' ? 'Roadmap' : 'Satellite'}</span>
        </div>
      </div>
    </div>
    </>
  );
};

export default SiteDetails;