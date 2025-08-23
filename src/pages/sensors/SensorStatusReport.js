import React, { useState } from 'react';
import { Helmet } from  'react-helmet';
import Header from "../../components/Header";
import BottomNavbar from "../../components/BottomNavbar";
import './sensorstatusreport.css';

const SensorStatusReport = () => {
  // State for form inputs
  const [formData, setFormData] = useState({
    provider: 'Dead_Amazon info Solution-Gold-Dead_M',
    company: 'AJIT KUMAAR',
    vehicle: 'BR06G3789',
    sensor: 'Ignition',
    startDate: '2025-08-05',
    startTime: '00:00',
    endDate: '2025-08-12',
    endTime: '23:59',
    sites: 'All Sites Selected'
  });

  // State for table data
  const [sensors] = useState([
    { id: 1, sensorId: 'SN001', sensorName: 'Temperature Sensor', groupName: 'Group A', status: 'Active', lastUpdated: '2023-06-15 10:30' },
    { id: 2, sensorId: 'SN002', sensorName: 'Humidity Sensor', groupName: 'Group B', status: 'Inactive', lastUpdated: '2023-06-14 15:45' },
    { id: 3, sensorId: 'SN003', sensorName: 'Pressure Sensor', groupName: 'Group A', status: 'Active', lastUpdated: '2023-06-15 09:15' },
    { id: 4, sensorId: 'SN004', sensorName: 'Motion Sensor', groupName: 'Group C', status: 'Active', lastUpdated: '2023-06-15 11:20' },
    { id: 5, sensorId: 'SN005', sensorName: 'Light Sensor', groupName: 'Group B', status: 'Maintenance', lastUpdated: '2023-06-13 14:30' },
    { id: 6, sensorId: 'SN006', sensorName: 'Sound Sensor', groupName: 'Group A', status: 'Active', lastUpdated: '2023-06-15 08:45' },
    { id: 7, sensorId: 'SN007', sensorName: 'Gas Sensor', groupName: 'Group C', status: 'Inactive', lastUpdated: '2023-06-12 16:20' },
    { id: 8, sensorId: 'SN008', sensorName: 'Vibration Sensor', groupName: 'Group B', status: 'Active', lastUpdated: '2023-06-15 10:05' }
  ]);

  // Handle form input changes
  const handleChange = (e) => {
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
    alert('Generating report with selected filters...');
  };

  // Handle view action
  const handleView = (id) => {
    const sensor = sensors.find(s => s.id === id);
    if (sensor) {
      alert(`Viewing details for sensor: ${sensor.sensorName}`);
    }
  };

  // Get status badge class based on status
  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'status-active';
      case 'inactive':
        return 'status-inactive';
      case 'maintenance':
        return 'status-maintenance';
      default:
        return '';
    }
  };

  return (
    <>
      <Helmet>
            <title>Sensor Status Report</title>
          </Helmet>
    <Header />
    <BottomNavbar text="Sensor Status Report" />
    <div className="sensor-report-container">
      <div className="report-header">
        <h1>Sensor Status Report</h1>
        <div className="report-info">
          <span>Vehicle: {formData.vehicle}</span>
          <span>Date: {formData.startDate} {formData.startTime} To {formData.endDate} {formData.endTime}</span>
        </div>
      </div>
      
      <div className="report-content">
        {/* Left Column - Form */}
        <div className="form-column">
          <div className="report-form">
            <form onSubmit={handleSubmit}>
              <div className="form-column-layout">
                <div className="form-group">
                  <label htmlFor="provider">Provider*</label>
                  <input
                    type="text"
                    id="provider"
                    name="provider"
                    value={formData.provider}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="company">Company*</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="vehicle">Vehicle*</label>
                  <input
                    type="text"
                    id="vehicle"
                    name="vehicle"
                    value={formData.vehicle}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="sensor">Sensors</label>
                  <select
                    id="sensor"
                    name="sensor"
                    value={formData.sensor}
                    onChange={handleChange}
                  >
                    <option value="Ignition">Ignition</option>
                    <option value="Temperature">Temperature</option>
                    <option value="Humidity">Humidity</option>
                    <option value="Pressure">Pressure</option>
                    <option value="Motion">Motion</option>
                    <option value="Light">Light</option>
                    <option value="Sound">Sound</option>
                    <option value="Gas">Gas</option>
                    <option value="Vibration">Vibration</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Start Date</label>
                  <div className="datetime-input">
                    <div className="date-input">
                      <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="time-input">
                      <input
                        type="time"
                        name="startTime"
                        value={formData.startTime}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="form-group">
                  <label>End Date</label>
                  <div className="datetime-input">
                    <div className="date-input">
                      <input
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="time-input">
                      <input
                        type="time"
                        name="endTime"
                        value={formData.endTime}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="sites">Sites</label>
                  <select
                    id="sites"
                    name="sites"
                    value={formData.sites}
                    onChange={handleChange}
                  >
                    <option value="All Sites Selected">All Sites Selected</option>
                    <option value="Site 1">Site 1</option>
                    <option value="Site 2">Site 2</option>
                    <option value="Site 3">Site 3</option>
                    <option value="Site 4">Site 4</option>
                    <option value="Site 5">Site 5</option>
                  </select>
                </div>
              </div>
              
              <div className="form-actions">
                <button type="submit" className="view-button">VIEW</button>
              </div>
            </form>
          </div>
        </div>
        
        {/* Right Column - Table */}
        <div className="table-column">
          <div className="report-table">
            <table>
              <thead>
                <tr>
                  <th>Sensor ID</th>
                  <th>Sensor Name</th>
                  <th>Group Name</th>
                  <th>Status</th>
                  <th>Last Updated</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {sensors.map((sensor) => (
                  <tr key={sensor.id}>
                    <td>{sensor.sensorId}</td>
                    <td>{sensor.sensorName}</td>
                    <td>{sensor.groupName}</td>
                    <td>
                      <span className={`status-badge ${getStatusClass(sensor.status)}`}>
                        {sensor.status}
                      </span>
                    </td>
                    <td>{sensor.lastUpdated}</td>
                    <td className="action-cell">
                      <button 
                        className="action-btn view-btn" 
                        onClick={() => handleView(sensor.id)}
                        title="View Details"
                      >
                        <i className="fas fa-eye"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="report-footer">
            <div className="footer-info">
              <span>Report generated on: {new Date().toLocaleDateString()}</span>
              <span>Total sensors: {sensors.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default SensorStatusReport;