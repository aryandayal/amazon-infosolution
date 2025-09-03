import React, { useState } from 'react';
import { Helmet } from "react-helmet";
import Header from "../../components/Header";
import BottomNavbar from "../../components/BottomNavbar";
import './addroute.css';

const AddRoute = () => {
  const [formData, setFormData] = useState({
    provider: 'Amazone Infosolution Pvt Ltd-GoldX',
    company: 'A TO Z SOLUTION',
    vehicle: 'BR01PF9417',
    startDateTime: '2025-08-20T00:00',
    endDateTime: '2025-08-22T23:59',
    routeType: 'Normal Route',
    distanceGap: '1000',
    routeName: ''
  });

  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData(formData);
  };

  const handleView = () => {
    setSubmittedData(formData);
  };

  return (
    <>
    <Helmet>
            <title>AddRoute</title>
          </Helmet>
    <Header />
    <BottomNavbar text="AddRoute" />
    
    <div className="add-route-container">
      <div className="form-section">
        <h2>Add New Route</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="provider">Provider</label>
            <input
              type="text"
              id="provider"
              name="provider"
              value={formData.provider}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="company">Company</label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="vehicle">Vehicle</label>
            <input
              type="text"
              id="vehicle"
              name="vehicle"
              value={formData.vehicle}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="startDateTime">Start Date</label>
            <input
              type="datetime-local"
              id="startDateTime"
              name="startDateTime"
              value={formData.startDateTime}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="endDateTime">End Date</label>
            <input
              type="datetime-local"
              id="endDateTime"
              name="endDateTime"
              value={formData.endDateTime}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="routeType">Route Type</label>
            <select
              id="routeType"
              name="routeType"
              value={formData.routeType}
              onChange={handleChange}
            >
              <option value="Normal Route">Normal Route</option>
              <option value="Express Route">Express Route</option>
              <option value="Scenic Route">Scenic Route</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="distanceGap">Distance Gap (mtr)</label>
            <input
              type="number"
              id="distanceGap"
              name="distanceGap"
              value={formData.distanceGap}
              onChange={handleChange}
              min="0"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="routeName">Route Name</label>
            <input
              type="text"
              id="routeName"
              name="routeName"
              value={formData.routeName}
              onChange={handleChange}
              placeholder="Enter route name"
            />
          </div>
          
          <div className="form-actions">
            <button type="button" className="btn btn-view" onClick={handleView}>VIEW</button>
            <button type="submit" className="btn btn-primary">ADD</button>
          </div>
        </form>
      </div>
      
      <div className="result-section">
        <h2>Route Details</h2>
        {submittedData ? (
          <div className="result-card">
            <div className="result-item">
              <span className="result-label">Provider:</span>
              <span className="result-value">{submittedData.provider}</span>
            </div>
            <div className="result-item">
              <span className="result-label">Company:</span>
              <span className="result-value">{submittedData.company}</span>
            </div>
            <div className="result-item">
              <span className="result-label">Vehicle:</span>
              <span className="result-value">{submittedData.vehicle}</span>
            </div>
            <div className="result-item">
              <span className="result-label">Start Date:</span>
              <span className="result-value">{new Date(submittedData.startDateTime).toLocaleString()}</span>
            </div>
            <div className="result-item">
              <span className="result-label">End Date:</span>
              <span className="result-value">{new Date(submittedData.endDateTime).toLocaleString()}</span>
            </div>
            <div className="result-item">
              <span className="result-label">Route Type:</span>
              <span className="result-value">{submittedData.routeType}</span>
            </div>
            <div className="result-item">
              <span className="result-label">Distance Gap:</span>
              <span className="result-value">{submittedData.distanceGap} mtr</span>
            </div>
            <div className="result-item">
              <span className="result-label">Route Name:</span>
              <span className="result-value">{submittedData.routeName || 'Not specified'}</span>
            </div>
            <div className="route-status">
              <span className={`status-badge ${submittedData.routeType === 'Normal Route' ? 'status-normal' : submittedData.routeType === 'Express Route' ? 'status-express' : 'status-scenic'}`}>
                {submittedData.routeType}
              </span>
            </div>
          </div>
        ) : (
          <div className="no-result">
            <p>Submit the form to see route details here</p>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default AddRoute;