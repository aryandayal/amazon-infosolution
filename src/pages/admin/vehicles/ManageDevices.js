import React, { useState } from 'react';
import Header from "../../../components/Header";
import BottomNavbar from "../../../components/BottomNavbar";
import './managedevice.css';
const ManageDevice = () => {
  // State for form inputs
  const [formData, setFormData] = useState({
    deviceId: '',
    deviceName: '',
    vehicleNumber: '',
    provider: '',
    company: '',
    status: 'Active',
    simProvider: '',
    imei: '',
    installationDate: '',
    lastMaintenance: ''
  });
  
  // State for editing
  const [editingId, setEditingId] = useState(null);
  
  // State for table data
  const [devices, setDevices] = useState([
    { 
      id: 1, 
      deviceId: 'DEV001', 
      deviceName: 'GPS Tracker Pro', 
      vehicleNumber: 'BR06G3789', 
      provider: 'Provider A', 
      company: 'Company A', 
      status: 'Active', 
      simProvider: 'Airtel', 
      imei: '123456789012345', 
      installationDate: '2025-01-15', 
      lastMaintenance: '2025-07-20' 
    },
    { 
      id: 2, 
      deviceId: 'DEV002', 
      deviceName: 'Fleet Monitor', 
      vehicleNumber: 'BR06G3790', 
      provider: 'Provider B', 
      company: 'Company B', 
      status: 'Inactive', 
      simProvider: 'Vodafone', 
      imei: '123456789012346', 
      installationDate: '2025-02-10', 
      lastMaintenance: '2025-06-15' 
    },
    { 
      id: 3, 
      deviceId: 'DEV003', 
      deviceName: 'Vehicle Tracker', 
      vehicleNumber: 'BR06G3791', 
      provider: 'Provider C', 
      company: 'Company C', 
      status: 'Maintenance', 
      simProvider: 'Jio', 
      imei: '123456789012347', 
      installationDate: '2025-03-05', 
      lastMaintenance: '2025-08-10' 
    },
    { 
      id: 4, 
      deviceId: 'DEV004', 
      deviceName: 'GPS Navigator', 
      vehicleNumber: 'BR06G3792', 
      provider: 'Provider A', 
      company: 'Company A', 
      status: 'Active', 
      simProvider: 'Airtel', 
      imei: '123456789012348', 
      installationDate: '2025-04-20', 
      lastMaintenance: '2025-07-25' 
    }
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
    
    if (editingId) {
      // Update existing device
      setDevices(devices.map(device => 
        device.id === editingId ? { ...device, ...formData } : device
      ));
      alert('Device updated successfully!');
      setEditingId(null);
    } else {
      // Add new device
      const newDevice = {
        id: devices.length + 1,
        ...formData
      };
      setDevices([...devices, newDevice]);
      alert('Device added successfully!');
    }
    
    // Reset form
    setFormData({
      deviceId: '',
      deviceName: '',
      vehicleNumber: '',
      provider: '',
      company: '',
      status: 'Active',
      simProvider: '',
      imei: '',
      installationDate: '',
      lastMaintenance: ''
    });
  };
  
  // Handle edit
  const handleEdit = (device) => {
    setFormData({
      deviceId: device.deviceId,
      deviceName: device.deviceName,
      vehicleNumber: device.vehicleNumber,
      provider: device.provider,
      company: device.company,
      status: device.status,
      simProvider: device.simProvider,
      imei: device.imei,
      installationDate: device.installationDate,
      lastMaintenance: device.lastMaintenance
    });
    setEditingId(device.id);
  };
  
  // Handle delete
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this device?')) {
      setDevices(devices.filter(device => device.id !== id));
      alert('Device deleted successfully!');
    }
  };
  
  // Handle cancel edit
  const handleCancel = () => {
    setEditingId(null);
    setFormData({
      deviceId: '',
      deviceName: '',
      vehicleNumber: '',
      provider: '',
      company: '',
      status: 'Active',
      simProvider: '',
      imei: '',
      installationDate: '',
      lastMaintenance: ''
    });
  };
  
  return (
    <>
      <Header />
      <BottomNavbar text="Manage Device" />
      <div className="manage-device-container">
        <div className="manage-device-header">
          <h1>Manage Device</h1>
          <div className="header-info">
            <span>Total Devices: {devices.length}</span>
            <span>Active: {devices.filter(d => d.status === 'Active').length}</span>
          </div>
        </div>
        
        <div className="manage-device-content">
          {/* Left Column - Form (40%) */}
          <div className="form-column">
            <div className="manage-device-form">
              <form onSubmit={handleSubmit}>
                <div className="form-header">
                  <h2>{editingId ? 'Edit Device' : 'Add New Device'}</h2>
                </div>
                
                <div className="form-section">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="deviceId">Device ID</label>
                      <input
                        type="text"
                        id="deviceId"
                        name="deviceId"
                        value={formData.deviceId}
                        onChange={handleInputChange}
                        placeholder="Enter device ID"
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="deviceName">Device Name</label>
                      <input
                        type="text"
                        id="deviceName"
                        name="deviceName"
                        value={formData.deviceName}
                        onChange={handleInputChange}
                        placeholder="Enter device name"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="vehicleNumber">Vehicle Number</label>
                      <input
                        type="text"
                        id="vehicleNumber"
                        name="vehicleNumber"
                        value={formData.vehicleNumber}
                        onChange={handleInputChange}
                        placeholder="Enter vehicle number"
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="provider">Provider</label>
                      <input
                        type="text"
                        id="provider"
                        name="provider"
                        value={formData.provider}
                        onChange={handleInputChange}
                        placeholder="Enter provider"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="company">Company</label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="Enter company"
                        required
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
                        <option value="Inactive">Inactive</option>
                        <option value="Maintenance">Maintenance</option>
                        <option value="Offline">Offline</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="simProvider">SIM Provider</label>
                      <input
                        type="text"
                        id="simProvider"
                        name="simProvider"
                        value={formData.simProvider}
                        onChange={handleInputChange}
                        placeholder="Enter SIM provider"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="imei">IMEI</label>
                      <input
                        type="text"
                        id="imei"
                        name="imei"
                        value={formData.imei}
                        onChange={handleInputChange}
                        placeholder="Enter IMEI"
                      />
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="installationDate">Installation Date</label>
                      <input
                        type="date"
                        id="installationDate"
                        name="installationDate"
                        value={formData.installationDate}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="lastMaintenance">Last Maintenance</label>
                      <input
                        type="date"
                        id="lastMaintenance"
                        name="lastMaintenance"
                        value={formData.lastMaintenance}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="form-actions">
                  <button type="submit" className="submit-button">
                    {editingId ? 'Update Device' : 'Add Device'}
                  </button>
                  {editingId && (
                    <button type="button" className="cancel-button" onClick={handleCancel}>
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
          
          {/* Right Column - Table (60%) */}
          <div className="table-column">
            <div className="manage-device-table">
              <div className="table-header">
                <h3>Device List</h3>
                <div className="search-box">
                  <input type="text" placeholder="Search devices..." />
                </div>
              </div>
              
              <table>
                <thead>
                  <tr>
                    <th>Device ID</th>
                    <th>Device Name</th>
                    <th>Vehicle Number</th>
                    <th>Provider</th>
                    <th>Company</th>
                    <th>Status</th>
                    <th>SIM Provider</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {devices.map((device) => (
                    <tr key={device.id}>
                      <td>{device.deviceId}</td>
                      <td>{device.deviceName}</td>
                      <td>{device.vehicleNumber}</td>
                      <td>{device.provider}</td>
                      <td>{device.company}</td>
                      <td>
                        <span className={`status-badge ${device.status.toLowerCase()}`}>
                          {device.status}
                        </span>
                      </td>
                      <td>{device.simProvider}</td>
                      <td>
                        <div className="action-buttons">
                          <button 
                            className="edit-btn" 
                            onClick={() => handleEdit(device)}
                            title="Edit"
                          >
                            ✏️
                          </button>
                          <button 
                            className="delete-btn" 
                            onClick={() => handleDelete(device.id)}
                            title="Delete"
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="table-footer">
              <div className="footer-info">
                <span>Showing {devices.length} devices</span>
                <span>Last updated: {new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ManageDevice;