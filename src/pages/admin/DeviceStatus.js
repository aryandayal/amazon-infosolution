import React, { useState } from 'react';
import { Helmet } from "react-helmet";
import Header from "../../components/Header";
import BottomNavbar from "../../components/BottomNavbar";
import './devicestatus.css';
const DeviceStatus = () => {
  // State for form inputs
  const [formData, setFormData] = useState({
    provider: 'Amazon Infosolution Pvt Ltd - GoldX',
    status: 'Active'
  });
  
  // State for table data
  const [devices] = useState([
    { id: 1, vehicle: 'BR06G3789', date: '2025-08-05', time: '10:30', status: 'Active', location: 'Main Street', battery: '85%' },
    { id: 2, vehicle: 'BR06G3789', date: '2025-08-05', time: '14:15', status: 'Idle', location: 'Parking Lot', duration: '35 minutes' },
    { id: 3, vehicle: 'BR06G3789', date: '2025-08-06', time: '09:45', status: 'Active', location: 'Highway', speed: '50 KMPH' },
    { id: 4, vehicle: 'BR06G3789', date: '2025-08-07', time: '16:20', status: 'Offline', location: 'Warehouse Area' },
    { id: 5, vehicle: 'BR06G3789', date: '2025-08-08', time: '11:30', status: 'Active', location: 'City Center', speed: '42 KMPH' },
    { id: 6, vehicle: 'BR06G3789', date: '2025-08-09', time: '13:45', status: 'Maintenance', location: 'Service Center' },
    { id: 7, vehicle: 'BR06G3789', date: '2025-08-10', time: '08:15', status: 'Active', location: 'Depot' },
    { id: 8, vehicle: 'BR06G3789', date: '2025-08-11', time: '17:30', status: 'Inactive', location: 'Depot' }
  ]);
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Generating device status report...');
  };
  
  return (
    <>
    <Helmet>
            <title>DeviceStatus</title>
          </Helmet>
      <Header />
      <BottomNavbar text="Device Status" />
      <div className="device-status-container">
        <div className="device-status-header">
          <h1>Device Status</h1>
          <div className="report-info">
            <span>Provider: {formData.provider}</span>
            <span>Status: {formData.status}</span>
          </div>
        </div>
        
        <div className="device-status-content">
          {/* Left Column - Form (30%) */}
          <div className="form-column">
            <div className="device-status-form">
              <form onSubmit={handleSubmit}>
                <div className="form-section">
                  <div className="form-group">
                    <label htmlFor="provider">Provider</label>
                    <input
                      type="text"
                      id="provider"
                      name="provider"
                      value={formData.provider}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="status">Status</label>
                    <select
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option value="Active">Active</option>
                      <option value="Idle">Idle</option>
                      <option value="Offline">Offline</option>
                      <option value="Maintenance">Maintenance</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <button type="submit" className="view-button">VIEW</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          
          {/* Right Column - Table (70%) */}
          <div className="table-column">
            <div className="device-status-table">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Vehicle</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Status</th>
                    <th>Location</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {devices.map((device) => (
                    <tr key={device.id}>
                      <td>{device.id}</td>
                      <td>{device.vehicle}</td>
                      <td>{device.date}</td>
                      <td>{device.time}</td>
                      <td>
                        <span className={`status-badge ${device.status.toLowerCase()}`}>
                          {device.status}
                        </span>
                      </td>
                      <td>{device.location}</td>
                      <td>{device.speed || device.duration || device.battery || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="device-status-footer">
              <div className="footer-info">
                <span>Report generated on: {new Date().toLocaleDateString()}</span>
                <span>Total devices: {devices.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default DeviceStatus;