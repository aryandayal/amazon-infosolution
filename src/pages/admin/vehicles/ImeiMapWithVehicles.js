import React, { useState } from 'react';
import { Helmet } from "react-helmet";
import Header from '../../../components/Header';
import BottomNavbar from '../../../components/BottomNavbar';
import './imeimapwithvehicles.css';

const ImeiMapVehicle = () => {
  const [formData, setFormData] = useState({
    provider: 'Amazone Infosolution Pvt Ltd - GoldX',
    company: 'A TO Z SOLUTION',
    vehicle: 'All',
    imei: '',
    installationDate: '2025-08-25T00:00',
  });

  const [results, setResults] = useState([
    { id: 1, gimei: '123456789012345', mobile: '9876543210', deviceType: 'AIS140', simProvider: 'airtel', mapped: true },
    { id: 2, gimei: '123456789012346', mobile: '9876543211', deviceType: 'AIS140', simProvider: 'airtel', mapped: false },
    { id: 3, gimei: '123456789012347', mobile: '9876543212', deviceType: 'AIS140', simProvider: 'airtel', mapped: true },
  ]);

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
     setResults([...results]);
  };

  const handleSave = () => {
    console.log('Form Data Saved:', formData);
    alert('Form data saved successfully!');
  };

  const handleView = () => {
    console.log('Viewing Data:', formData);
    alert('View mode activated.');
  };

  return (
    <>
    <Helmet>
            <title>imeimapwithvehicles</title>
          </Helmet>
    <Header />
    <BottomNavbar text="IMEI Map With Vechicles"/>
    <div className="imei-map-vehicle-container">
      <div className="form-section">
        <h2>IMEI Vehicle Mapping</h2>

        <div className="form-group">
          <label>Provider*</label>
          <select name="provider" value={formData.provider} onChange={handleChange}>
            <option value="Amazone Infosolution Pvt Ltd - GoldX">Amazone Infosolution Pvt Ltd - GoldX</option>
            <option value="Another Provider">Another Provider</option>
          </select>
        </div>

        <div className="form-group">
          <label>Company*</label>
          <select name="company" value={formData.company} onChange={handleChange}>
            <option value="A TO Z SOLUTION">A TO Z SOLUTION</option>
            <option value="XYZ Logistics">XYZ Logistics</option>
          </select>
        </div>

        <div className="form-group">
          <label>Vehicle*</label>
          <select name="vehicle" value={formData.vehicle} onChange={handleChange}>
            <option value="All">All</option>
            <option value="Truck 101">Truck 101</option>
            <option value="Van 202">Van 202</option>
          </select>
        </div>

        <div className="form-group">
          <label>IMEI</label>
          <select name="imei" value={formData.imei} onChange={handleChange}>
            <option value="">Select IMEI</option>
            <option value="123456789012345">123456789012345</option>
            <option value="123456789012346">123456789012346</option>
            <option value="123456789012347">123456789012347</option>
          </select>
        </div>

        <div className="form-group">
          <label>Installation Date</label>
          <input
            type="datetime-local"
            name="installationDate"
            value={formData.installationDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-actions">
          <button onClick={handleSave}>SAVE</button>
          <button onClick={handleView}>VIEW</button>
        </div>
      </div>

      <div className="result-section">
        <h3>Mapped Devices</h3>
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
            {results.map((device) => (
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
    </div>
    </>
  );
};

export default ImeiMapVehicle;