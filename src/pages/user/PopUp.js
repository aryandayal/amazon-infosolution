import React, { useState, useMemo } from 'react';
import Header from '../../components/Header';
import BottomNavbar from '../../components/BottomNavbar';
import './popup.css';

// Seed data
const initialServices = [
  { id: 1, service: "Not Reachable", description: "The Vehicle Is Not Reachable For Last 60 minutes", fromHr: 0, toHr: 24, select: false, alarm: false },
  { id: 2, service: "Idle", description: "The Vehicle Is Idle For Last 60 minutes", fromHr: 0, toHr: 24, select: false, alarm: false },
  { id: 3, service: "Stop", description: "The Vehicle Is Stopped For Last 60 minutes", fromHr: 0, toHr: 24, select: false, alarm: false },
  { id: 4, service: "Moving", description: "The Vehicle Is Moving", fromHr: 0, toHr: 24, select: false, alarm: false },
  { id: 5, service: "Overspeed", description: "The Vehicle Is Overspeeding", fromHr: 0, toHr: 24, select: true, alarm: false },
  { id: 6, service: "Low Battery", description: "Vehicle Battery Is Low", fromHr: 0, toHr: 24, select: false, alarm: false },
  { id: 7, service: "Fuel Theft", description: "Fuel Theft Detected", fromHr: 0, toHr: 24, select: false, alarm: false },
  { id: 8, service: "Geofence Exit", description: "Vehicle Exited Geofence", fromHr: 0, toHr: 24, select: false, alarm: false },
  { id: 9, service: "Geofence Entry", description: "Vehicle Entered Geofence", fromHr: 0, toHr: 24, select: false, alarm: false },
  { id: 10, service: "Tow Alert", description: "Vehicle Is Being Towed", fromHr: 0, toHr: 24, select: false, alarm: false },
  { id: 11, service: "Power Cut", description: "Vehicle Power Cut Detected", fromHr: 0, toHr: 24, select: false, alarm: false },
  { id: 12, service: "AC On", description: "Vehicle AC Is On", fromHr: 0, toHr: 24, select: false, alarm: false },
  { id: 13, service: "Door Open", description: "Vehicle Door Is Open", fromHr: 0, toHr: 24, select: false, alarm: false },
  { id: 14, service: "Panic Button", description: "Panic Button Pressed", fromHr: 0, toHr: 24, select: false, alarm: false },
  { id: 15, service: "Harsh Brake", description: "Harsh Braking Detected", fromHr: 0, toHr: 24, select: false, alarm: false },
  { id: 16, service: "Harsh Acceleration", description: "Harsh Acceleration Detected", fromHr: 0, toHr: 24, select: false, alarm: false },
  { id: 17, service: "Sharp Turn", description: "Sharp Turn Detected", fromHr: 0, toHr: 24, select: false, alarm: false },
  { id: 18, service: "Night Driving", description: "Night Driving Detected", fromHr: 20, toHr: 6, select: false, alarm: false }
];

const initialAddresses = [
  { id: 1, address: "SHRIKANTKUMAR", vehicle: "" },
  { id: 2, address: "SHRIKANTKUMAR", vehicle: "" },
  { id: 3, address: "SHRIKANTKUMAR", vehicle: "All" }
];

// Validation utility
const validateHours = (fromHr, toHr) => {
  if (fromHr < 0 || fromHr > 24 || toHr < 0 || toHr > 24) return false;
  if (fromHr > toHr) return false;
  return true;
};

const PopUp = () => {
  // Form state
  const [provider, setProvider] = useState('');
  const [company, setCompany] = useState('A TO Z SOLUTION');
  const [vehicle, setVehicle] = useState('All Vehicles');
  const [selectUser, setSelectUser] = useState('SHRIKANTKUMAR');
  
  // Data state
  const [addresses, setAddresses] = useState(initialAddresses);
  const [services, setServices] = useState(initialServices);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filtered services
  const filteredServices = useMemo(() => {
    return services.filter(service => 
      service.service.toLowerCase().includes(searchTerm.toLowerCase()) || 
      service.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [services, searchTerm]);

  // Handlers
  const handleFieldChange = (rowId, field, value) => {
    setServices(prevServices => 
      prevServices.map(service => 
        service.id === rowId ? { ...service, [field]: value } : service
      )
    );
  };

  const handleToggleSelect = (rowId) => {
    setServices(prevServices => 
      prevServices.map(service => 
        service.id === rowId ? { ...service, select: !service.select } : service
      )
    );
  };

  const handleToggleAlarm = (rowId) => {
    setServices(prevServices => 
      prevServices.map(service => 
        service.id === rowId ? { ...service, alarm: !service.alarm } : service
      )
    );
  };

  const handleBulkSelect = (all) => {
    setServices(prevServices => 
      prevServices.map(service => ({ ...service, select: all }))
    );
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleView = () => {
    // Simulate API call - in real app would fetch filtered data
    console.log('Fetching data with filters:', { provider, company, vehicle, selectUser });
  };

  const handleDeleteAddress = (rowId) => {
    setAddresses(prev => prev.filter(addr => addr.id !== rowId));
  };

  return (
    <>
    <Header />
    <BottomNavbar tex="popup"/>
   
    <div className="popup-container">
      {/* Left Panel */}
      <div className="left-panel">
        <h2>Pop Up</h2>
        
        <div className="form-group">
          <label htmlFor="provider">Provider *</label>
          <select 
            id="provider" 
            value={provider} 
            onChange={(e) => setProvider(e.target.value)}
          >
            <option value="">Amazone Infosolution Pvt Ltd‑GoldX</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="company">Company *</label>
          <select 
            id="company" 
            value={company} 
            onChange={(e) => setCompany(e.target.value)}
          >
            <option value="A TO Z SOLUTION">A TO Z SOLUTION</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="vehicle">Vehicle *</label>
          <select 
            id="vehicle" 
            value={vehicle} 
            onChange={(e) => setVehicle(e.target.value)}
          >
            <option value="All Vehicles">All Vehicles</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="selectUser">Select User *</label>
          <select 
            id="selectUser" 
            value={selectUser} 
            onChange={(e) => setSelectUser(e.target.value)}
          >
            <option value="SHRIKANTKUMAR">SHRIKANTKUMAR</option>
          </select>
        </div>
        
        <button className="view-button" onClick={handleView}>VIEW</button>
        
        <div className="address-list">
          <table>
            <thead>
              <tr>
                <th>Address</th>
                <th>Vehicle</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {addresses.map(addr => (
                <tr key={addr.id}>
                  <td>{addr.address}</td>
                  <td>{addr.vehicle}</td>
                  <td>
                    <button 
                      className="delete-button" 
                      onClick={() => handleDeleteAddress(addr.id)}
                      aria-label={`Delete address for ${addr.address}`}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Right Panel */}
      <div className="right-panel">
        <div className="toolbar">
          <input
            type="text"
            placeholder="Search services..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <div className="bulk-actions">
            <button onClick={() => handleBulkSelect(true)}>Select All</button>
            <button onClick={() => handleBulkSelect(false)}>Clear All</button>
          </div>
        </div>
        
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Service</th>
                <th>Description</th>
                <th>FromHr</th>
                <th>ToHr</th>
                <th>Select Service</th>
                <th>Alarm</th>
              </tr>
            </thead>
            <tbody>
              {filteredServices.map(service => {
                const isValid = validateHours(service.fromHr, service.toHr);
                return (
                  <tr key={service.id} className={service.select ? 'selected' : ''}>
                    <td>{service.id}</td>
                    <td>{service.service}</td>
                    <td>{service.description}</td>
                    <td>
                      <input
                        type="number"
                        min="0"
                        max="24"
                        value={service.fromHr}
                        onChange={(e) => handleFieldChange(service.id, 'fromHr', parseInt(e.target.value) || 0)}
                        className={!isValid ? 'error' : ''}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        min="0"
                        max="24"
                        value={service.toHr}
                        onChange={(e) => handleFieldChange(service.id, 'toHr', parseInt(e.target.value) || 0)}
                        className={!isValid ? 'error' : ''}
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        checked={service.select}
                        onChange={() => handleToggleSelect(service.id)}
                        aria-label={`Select service ${service.service}`}
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        checked={service.alarm}
                        onChange={() => handleToggleAlarm(service.id)}
                        aria-label={`Alarm for service ${service.service}`}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
     </>
  );
};

export default PopUp;