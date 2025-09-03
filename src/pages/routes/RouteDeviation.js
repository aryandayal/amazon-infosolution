import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from "react-helmet";
import Header from '../../components/Header';
import BottomNavbar from '../../components/BottomNavbar';
import './routedeviation.css';
const RouteDeviation = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Sidebar form states
  const [provider, setProvider] = useState('Amazon Infosolution Pvt Ltd - GoldX');
  const [company, setCompany] = useState('A TO Z SOLUTION');
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [routeName, setRouteName] = useState('');
  
  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Sample data for vehicles
  const vehicles = useMemo(() => [
    { id: '', name: 'Select Vehicle' },
    { id: 1, name: 'Vehicle A - Truck' },
    { id: 2, name: 'Vehicle B - Van' },
    { id: 3, name: 'Vehicle C - Motorcycle' },
    { id: 4, name: 'Vehicle D - Sedan' },
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
      country: 'China',
      deviationStatus: 'Assigned',
      deviationReason: 'Route change due to traffic',
      assignedTo: 'Driver A',
      estimatedArrival: '2025-08-16 10:30'
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
      country: 'China',
      deviationStatus: 'Assigned',
      deviationReason: 'Weather conditions',
      assignedTo: 'Driver B',
      estimatedArrival: '2025-08-16 14:15'
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
      country: 'China',
      deviationStatus: 'Assigned',
      deviationReason: 'Mechanical issue',
      assignedTo: 'Driver C',
      estimatedArrival: '2025-08-16 16:45'
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
      country: 'China',
      deviationStatus: 'Assigned',
      deviationReason: 'Customer request',
      assignedTo: 'Driver D',
      estimatedArrival: '2025-08-16 09:00'
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
  
  // Handle View button click
  const handleView = () => {
    // In a real application, this would filter the results based on selections
    console.log('View clicked with selections:', {
      provider, company, selectedVehicle, startDate, endDate
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
    setSelectedVehicle('');
    setStartDate('');
    setEndDate('');
    setRouteName('');
  };
  
  return (
    <>
    <Helmet>
            <title>RouteDeviation</title>
          </Helmet>
      <Header />
      <BottomNavbar text="Route Deviation" />
      <div className="route-deviation-container">
        {/* Top Header */}
        <div className="header">
          <div className="report-title">Route Deviation</div>
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
            
            {/* Second section: Select Vehicles dropdown */}
            <div className="input-row">
              <div className="form-group vehicle-group">
                <label htmlFor="vehicle">Select Vehicles</label>
                <select 
                  id="vehicle" 
                  className="filter-select" 
                  value={selectedVehicle} 
                  onChange={(e) => setSelectedVehicle(e.target.value)}
                >
                  {vehicles.map(vehicle => (
                    <option key={vehicle.id} value={vehicle.id}>{vehicle.name}</option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Third section: Start Date and End Date with time */}
            <div className="input-row">
              <div className="form-group date-group">
                <label htmlFor="start-date">Start Date</label>
                <input 
                  type="datetime-local" 
                  id="start-date" 
                  className="filter-input date-input" 
                  value={startDate} 
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              
              <div className="form-group date-group">
                <label htmlFor="end-date">End Date</label>
                <input 
                  type="datetime-local" 
                  id="end-date" 
                  className="filter-input date-input" 
                  value={endDate} 
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
            
            {/* Fourth section: VIEW button on next line */}
            <div className="button-row">
              <button className="view-button" onClick={handleView}>VIEW</button>
            </div>
            
            <div className="divider"></div>
            
            {/* Fifth section: RouteName input */}
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
            
            {/* Sixth section: ADD and CLEAR ROUTE MAP buttons on next line */}
            <div className="button-row">
              <button className="add-button" onClick={handleAddRoute}>ADD</button>
              <button className="clear-button" onClick={handleClearMap}>CLEAR ROUTE MAP</button>
            </div>
          </div>
          
          {/* Right Side - Results Panel */}
          <div className="results-panel">
            <div className="results-header">
              <h3>Route Deviation Results</h3>
              <div className="results-info">
                <span>Showing {filteredSites.length} of {sites.length} routes</span>
              </div>
            </div>
            
            <div className="results-table-container">
              <table className="results-table">
                <thead>
                  <tr>
                    <th>Site Name</th>
                    <th>Type</th>
                    <th>Provider</th>
                    <th>Company</th>
                    <th>Deviation Status</th>
                    <th>Deviation Reason</th>
                    <th>Assigned To</th>
                    <th>Estimated Arrival</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSites.length > 0 ? (
                    filteredSites.map(site => (
                      <tr key={site.id}>
                        <td>{site.name}</td>
                        <td>{site.type}</td>
                        <td>{site.provider}</td>
                        <td>{site.company}</td>
                        <td>
                          <span className={`status-badge ${site.deviationStatus.toLowerCase()}`}>
                            {site.deviationStatus}
                          </span>
                        </td>
                        <td>{site.deviationReason}</td>
                        <td>{site.assignedTo}</td>
                        <td>{site.estimatedArrival}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="no-results">
                        No routes found matching your criteria
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
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
            <span>Table View</span>
          </div>
        </div>
      </div>
    </>
  );
};
export default RouteDeviation;