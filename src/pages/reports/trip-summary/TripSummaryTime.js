import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../../components/Header';
import BottomNavbar from '../../../components/BottomNavbar';
import './tripsummarytime.css';

const TripSummaryTime = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    provider: 'Amazon info Solution',
    company: 'ERSS COMMAND & CC',
    startDate: '2025-08-06',
    startTime: '00:00',
    endDate: '2025-08-13',
    endTime: '23:59',
    stoppageLimitUnit: 'minute', // 'minute' or 'hour'
    stoppageLimitValue: 10
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle stoppage limit unit change
  const handleUnitChange = (unit) => {
    setFormData({
      ...formData,
      stoppageLimitUnit: unit
    });
  };

  // Handle stoppage limit value change
  const handleLimitChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setFormData({
        ...formData,
        stoppageLimitValue: value
      });
    }
  };

  return (
    <>
    <Helmet>
                <title>TripSummaryTime</title>
              </Helmet>
      <Header />
      <BottomNavbar text="TripSummaryTime" />
      
      <div className="trip-time-container">
        <div className="time-content">
          <div className="time-sidebar">
            <h2>Time Tracking Parameters</h2>
            <form>
              <div className="form-group">
                <label htmlFor="provider">Provider *</label>
                <select 
                  id="provider" 
                  name="provider" 
                  value={formData.provider} 
                  onChange={handleInputChange}
                  required
                >
                  <option value="Amazon info Solution">Amazon info Solution</option>
                  <option value="Google Logistics">Google Logistics</option>
                  <option value="Microsoft Transport">Microsoft Transport</option>
                  <option value="Apple Delivery">Apple Delivery</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="company">Company *</label>
                <select 
                  id="company" 
                  name="company" 
                  value={formData.company} 
                  onChange={handleInputChange}
                  required
                >
                  <option value="ERSS COMMAND & CC">ERSS COMMAND & CC</option>
                  <option value="ABC Logistics">ABC Logistics</option>
                  <option value="XYZ Transport">XYZ Transport</option>
                  <option value="Global Delivery">Global Delivery</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Start Date & Time *</label>
                <div className="datetime-container">
                  <input 
                    type="date" 
                    name="startDate" 
                    value={formData.startDate} 
                    onChange={handleInputChange}
                    className="datetime-input"
                  />
                  <input 
                    type="time" 
                    name="startTime" 
                    value={formData.startTime} 
                    onChange={handleInputChange}
                    className="datetime-input"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>End Date & Time *</label>
                <div className="datetime-container">
                  <input 
                    type="date" 
                    name="endDate" 
                    value={formData.endDate} 
                    onChange={handleInputChange}
                    className="datetime-input"
                  />
                  <input 
                    type="time" 
                    name="endTime" 
                    value={formData.endTime} 
                    onChange={handleInputChange}
                    className="datetime-input"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>Stoppage Limit *</label>
                <div className="stoppage-limit-container">
                  <div className="unit-selector">
                    <div 
                      className={`unit-circle ${formData.stoppageLimitUnit === 'minute' ? 'active' : ''}`}
                      onClick={() => handleUnitChange('minute')}
                    >
                      <div className="circle-inner"></div>
                    </div>
                    <span>Minute</span>
                  </div>
                  
                  <div className="unit-selector">
                    <div 
                      className={`unit-circle ${formData.stoppageLimitUnit === 'hour' ? 'active' : ''}`}
                      onClick={() => handleUnitChange('hour')}
                    >
                      <div className="circle-inner"></div>
                    </div>
                    <span>Hour</span>
                  </div>
                  
                  <div className="limit-input-container">
                    <input
                      type="number"
                      name="stoppageLimitValue"
                      value={formData.stoppageLimitValue}
                      onChange={handleLimitChange}
                      className="limit-input"
                      min="0"
                    />
                  </div>
                </div>
              </div>
              
              <button 
                type="button" 
                className="view-button" 
              >
                VIEW TIME REPORT
              </button>
            </form>
          </div>
          
          <div className="time-report">
            <h2>Time Analysis Report</h2>
            <div className="report-container">
              <div className="report-placeholder">
                <div className="time-icon">⏱️</div>
                <p>Time analysis report will appear here</p>
                <div className="limit-display">
                  <p>Stoppage Limit: {formData.stoppageLimitValue} {formData.stoppageLimitUnit}{formData.stoppageLimitValue !== 1 ? 's' : ''}</p>
                </div>
              </div>
            </div>
            
            <div className="time-info">
              <div className="info-card">
                <h3>Provider</h3>
                <p>{formData.provider}</p>
              </div>
              <div className="info-card">
                <h3>Company</h3>
                <p>{formData.company}</p>
              </div>
              <div className="info-card">
                <h3>Date Range</h3>
                <p>{formData.startDate} to {formData.endDate}</p>
              </div>
              <div className="info-card">
                <h3>Time Range</h3>
                <p>{formData.startTime} to {formData.endTime}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TripSummaryTime;