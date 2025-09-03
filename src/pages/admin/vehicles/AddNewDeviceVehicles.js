import React, { useState } from 'react';
import { Helmet } from "react-helmet";
import Header from '../../../components/Header';
import './addnewdevicevehicle.css';

const AddNewDeviceVehicle = () => {
  const [formData, setFormData] = useState({
    provider: '',
    company: '',
    vehicleType: '',
    imdi: '',
    mobile: '',
    simProvider: '',
    specification: '',
    deviceType: '',
    vehicleIcon: '',
    installationDate: '',
    wantToSetRemoval: 'no'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRemovalChange = (value) => {
    setFormData({ ...formData, wantToSetRemoval: value });
  };

  const handleSubmit = () => {
    console.log('Form Data:', formData);
    alert('Device vehicle added successfully!');
  };

  return (
    <>
    <Helmet>
            <title>AddNewDeviceVehicle</title>
          </Helmet>
    <Header />
    <div className="add-new-device-vehicle-container">
      <div className="header-section">
        <h2>Add New Device Vehicle</h2>
      </div>
      
      <div className="content-container">
        <div className="form-panel">
          <div className="form-row">
            <div className="form-group">
              <label>Provider</label>
              <select name="provider" value={formData.provider} onChange={handleChange}>
                <option value="">Select</option>
                <option value="Provider A">Provider A</option>
                <option value="Provider B">Provider B</option>
                <option value="Provider C">Provider C</option>
              </select>
            </div>

            <div className="form-group">
              <label>Company</label>
              <select name="company" value={formData.company} onChange={handleChange}>
                <option value="">Select</option>
                <option value="Company A">Company A</option>
                <option value="Company B">Company B</option>
                <option value="Company C">Company C</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Vehicle Type</label>
              <select name="vehicleType" value={formData.vehicleType} onChange={handleChange}>
                <option value="">Select</option>
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="Truck">Truck</option>
                <option value="Van">Van</option>
                <option value="Bus">Bus</option>
              </select>
            </div>

            <div className="form-group">
              <label>IMDI</label>
              <input
                type="text"
                name="imdi"
                value={formData.imdi}
                onChange={handleChange}
                placeholder="IMDI"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Mobile</label>
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Mobile"
              />
            </div>

            <div className="form-group">
              <label>Sim Provider</label>
              <select name="simProvider" value={formData.simProvider} onChange={handleChange}>
                <option value="">Select</option>
                <option value="Airtel">Airtel</option>
                <option value="Vodafone">Vodafone</option>
                <option value="Jio">Jio</option>
                <option value="BSNL">BSNL</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Specification</label>
              <input
                type="text"
                name="specification"
                value={formData.specification}
                onChange={handleChange}
                placeholder="Spec"
              />
            </div>

            <div className="form-group">
              <label>Device Type</label>
              <select name="deviceType" value={formData.deviceType} onChange={handleChange}>
                <option value="">Select</option>
                <option value="Type A">Type A</option>
                <option value="Type B">Type B</option>
                <option value="Type C">Type C</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Vehicle Icon</label>
              <select name="vehicleIcon" value={formData.vehicleIcon} onChange={handleChange}>
                <option value="">Select</option>
                <option value="Car">Car</option>
                <option value="Truck">Truck</option>
                <option value="Van">Van</option>
                <option value="Bus">Bus</option>
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
          </div>

          <div className="form-row radio-row">
            <div className="form-group radio-group">
              <label>Want to Set Removal</label>
              <div className="radio-options">
                <div className="radio-option">
                  <div 
                    className={`radio-circle ${formData.wantToSetRemoval === 'yes' ? 'selected' : ''}`}
                    onClick={() => handleRemovalChange('yes')}
                  ></div>
                  <span>Yes</span>
                </div>
                <div className="radio-option">
                  <div 
                    className={`radio-circle ${formData.wantToSetRemoval === 'no' ? 'selected' : ''}`}
                    onClick={() => handleRemovalChange('no')}
                  ></div>
                  <span>No</span>
                </div>
              </div>
            </div>

            <div className="form-group button-group">
              <button onClick={handleSubmit}>ADD</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default AddNewDeviceVehicle;