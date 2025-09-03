import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../../components/Header';
import BottomNavbar from '../../../components/BottomNavbar';
import './tripsummarylocation.css';

const TripSummaryLocation = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    provider: 'Amazon info Solution',
    company: 'ERSS COMMAND & CC',
    selectedGroup: 'All',
    selectedVehicles: 'All',
    startDate: '2025-08-06',
    startTime: '00:00',
    endDate: '2025-08-13',
    endTime: '23:59',
    locationGrade: 'A'
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle location grade change with increase/decrease
  const handleGradeChange = (direction) => {
    const grades = ['A', 'B', 'C', 'D'];
    const currentIndex = grades.indexOf(formData.locationGrade);
    let newIndex;
    
    if (direction === 'increase') {
      newIndex = (currentIndex + 1) % grades.length;
    } else {
      newIndex = (currentIndex - 1 + grades.length) % grades.length;
    }
    
    setFormData({
      ...formData,
      locationGrade: grades[newIndex]
    });
  };

  return (
    <>
    <Helmet>
                <title>TripSummaryLocation</title>
              </Helmet>
      <Header />
      <BottomNavbar text="TripSummaryLocation" />
      
      <div className="trip-location-container">
        <div className="location-content">
          <div className="location-sidebar">
            <h2>Location Tracking Parameters</h2>
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
                <label htmlFor="selectedGroup">Select Group *</label>
                <select 
                  id="selectedGroup" 
                  name="selectedGroup" 
                  value={formData.selectedGroup} 
                  onChange={handleInputChange}
                  required
                >
                  <option value="All">All</option>
                  <option value="Group A">Group A</option>
                  <option value="Group B">Group B</option>
                  <option value="Group C">Group C</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="selectedVehicles">Select Vehicles *</label>
                <select 
                  id="selectedVehicles" 
                  name="selectedVehicles" 
                  value={formData.selectedVehicles} 
                  onChange={handleInputChange}
                  required
                >
                  <option value="All">All</option>
                  <option value="BR06G3789">BR06G3789</option>
                  <option value="MH04AB1234">MH04AB1234</option>
                  <option value="DL01CD5678">DL01CD5678</option>
                  <option value="KA02EF9012">KA02EF9012</option>
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
                <label>Location Grade *</label>
                <div className="location-grade-input">
                  <div className="input-row">
                    <input
                      type="text"
                      name="locationGrade"
                      value={formData.locationGrade}
                      onChange={handleInputChange}
                      className="grade-input"
                      readOnly
                    />
                    <div className="arrows">
                      <button 
                        type="button" 
                        className="arrow-button"
                        onClick={() => handleGradeChange('increase')}
                      >
                        +
                      </button>
                      <button 
                        type="button" 
                        className="arrow-button"
                        onClick={() => handleGradeChange('decrease')}
                      >
                        -
                      </button>
                    </div>
                    <span className="unit">GRADE</span>
                  </div>
                </div>
              </div>
              
              <button 
                type="button" 
                className="view-button" 
              >
                TRACK LOCATION
              </button>
            </form>
          </div>
          
          <div className="location-map">
            <h2>Location Map</h2>
            <div className="map-container">
              <div className="map-placeholder">
                <div className="map-icon">📍</div>
                <p>Location tracking map will appear here</p>
                <p>Current Grade: {formData.locationGrade}</p>
              </div>
            </div>
            
            <div className="location-info">
              <div className="info-card">
                <h3>Provider</h3>
                <p>{formData.provider}</p>
              </div>
              <div className="info-card">
                <h3>Company</h3>
                <p>{formData.company}</p>
              </div>
              <div className="info-card">
                <h3>Group</h3>
                <p>{formData.selectedGroup}</p>
              </div>
              <div className="info-card">
                <h3>Vehicle</h3>
                <p>{formData.selectedVehicles}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TripSummaryLocation;