import React, { useState } from 'react';
import { Helmet } from "react-helmet";
import Header from '../../../components/Header';
import BottomNavbar from '../../../components/BottomNavbar';
import './managedevices.css';
const ManageDevices = () => {
  const [formData, setFormData] = useState({
    customer: 'Amazone Infosolution Pvt Ltd - GoldX',
    gimei: '',
    mobile: '',
    deviceType: '',
    simProvider: '',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [mappedFilter, setMappedFilter] = useState(false);
  const [devices, setDevices] = useState([
    { id: 1, gimei: '123456789012345', mobile: '9876543210', deviceType: 'AIS140', simProvider: 'airtel', mapped: true },
    { id: 2, gimei: '123456789012346', mobile: '9876543211', deviceType: 'AIS140', simProvider: 'airtel', mapped: false },
    { id: 3, gimei: '123456789012347', mobile: '9876543212', deviceType: 'AIS140', simProvider: 'airtel', mapped: true },
  ]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const newDevice = {
      id: devices.length + 1,
      ...formData,
      mapped: false,
    };
    setDevices([...devices, newDevice]);
    setFormData({
      customer: 'Amazone Infosolution Pvt Ltd - GoldX',
      gimei: '',
      mobile: '',
      deviceType: '',
      simProvider: '',
    });
  };
  const filteredDevices = devices.filter(device => {
    const matchesSearch = device.gimei.includes(searchTerm) || device.mobile.includes(searchTerm);
    const matchesMapped = mappedFilter ? device.mapped : true;
    return matchesSearch && matchesMapped;
  });
  const exportCSV = () => {
    const csvContent = [
      ['GIMEI', 'Mobile', 'Device Type', 'Sim Provider', 'Mapped'],
      ...filteredDevices.map(device => [
        device.gimei,
        device.mobile,
        device.deviceType,
        device.simProvider,
        device.mapped ? 'Yes' : 'No',
      ])
    ].map(e => e.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'devices.csv');
    link.click();
  };
  return (
    <>
    <Helmet>
            <title>ManageDevices</title>
          </Helmet>
      <Header />
      <BottomNavbar />
      <div className="manage-devices-container">
        <h1>Manage Devices</h1>
        
        {/* Main content area with form and table */}
        <div className="content-wrapper">
          {/* Form Section */}
          <div className="form-section">
            <form className="device-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Customer</label>
                <input type="text" name="customer" value={formData.customer} onChange={handleChange} readOnly />
              </div>
              <div className="form-group">
                <label>GIMEI</label>
                <input type="text" name="gimei" value={formData.gimei} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Mobile</label>
                <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} required />
                <button type="button" className="add-manually">Add Manually</button>
              </div>
              <div className="form-group">
                <label>Device Type</label>
                <input type="text" name="deviceType" value={formData.deviceType} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Sim Provider</label>
                <input type="text" name="simProvider" value={formData.simProvider} onChange={handleChange} required />
              </div>
              <div className="form-actions">
                <button type="submit">SAVE</button>
                <button type="button">UPDATE</button>
              </div>
            </form>
          </div>
          
          {/* Table Section */}
          <div className="table-section">
            {/* Search & Export */}
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search by GIMEI or Mobile"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <label>
                <input
                  type="checkbox"
                  checked={mappedFilter}
                  onChange={(e) => setMappedFilter(e.target.checked)}
                />
                Mapped
              </label>
              <button onClick={exportCSV}>CSV EXPORT</button>
              <button>SEARCH</button>
            </div>
            
            {/* Table */}
            <div className="table-container">
              <table className="devices-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>GIMEI</th>
                    <th>Mobile</th>
                    <th>Device Type</th>
                    <th>Sim Provider</th>
                    <th>Mapped</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDevices.map((device) => (
                    <tr key={device.id}>
                      <td>{device.id}</td>
                      <td>{device.gimei}</td>
                      <td>{device.mobile}</td>
                      <td>{device.deviceType}</td>
                      <td>{device.simProvider}</td>
                      <td>{device.mapped ? 'Yes' : 'No'}</td>
                      <td>
                        <button>Edit</button>
                        <button>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            <div className="pagination">
              <button>Previous</button>
              <span>Page 1 of 1</span>
              <button>Next</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ManageDevices;