import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from "../../components/Header";
import BottomNavbar from "../../components/BottomNavbar";
import './eventlogs.css';

const EventLogs = () => {
  // State for form inputs
  const [formData, setFormData] = useState({
    vehicle: 'BR06G3789',
    fromDate: '2025-08-05',
    fromTime: '00:00',
    toDate: '2025-08-12',
    toTime: '23:59',
    speedLimit: '40',
    stopTime: '30',
    timeInterval: '10'
  });

  // State for checkboxes
  const [leftCheckboxes, setLeftCheckboxes] = useState({
    company: false,
    selectVehicles: false,
    speedLimit: true,
    stopTime: false,
    location: false
  });

  const [rightCheckboxes, setRightCheckboxes] = useState({
    company: false,
    selectVehicles: false,
    speedLimit: true,
    stopTime: false,
    location: false
  });

  // State for table data
  const [events] = useState([
    { id: 1, vehicle: 'BR06G3789', date: '2025-08-05', time: '10:30', event: 'Speed Limit Exceeded', location: 'Main Street', speed: '45 KMPH' },
    { id: 2, vehicle: 'BR06G3789', date: '2025-08-05', time: '14:15', event: 'Long Stop', location: 'Parking Lot', duration: '35 minutes' },
    { id: 3, vehicle: 'BR06G3789', date: '2025-08-06', time: '09:45', event: 'Speed Limit Exceeded', location: 'Highway', speed: '50 KMPH' },
    { id: 4, vehicle: 'BR06G3789', date: '2025-08-07', time: '16:20', event: 'Geofence Exit', location: 'Warehouse Area' },
    { id: 5, vehicle: 'BR06G3789', date: '2025-08-08', time: '11:30', event: 'Speed Limit Exceeded', location: 'City Center', speed: '42 KMPH' },
    { id: 6, vehicle: 'BR06G3789', date: '2025-08-09', time: '13:45', event: 'Long Stop', location: 'Rest Area', duration: '40 minutes' },
    { id: 7, vehicle: 'BR06G3789', date: '2025-08-10', time: '08:15', event: 'Engine On', location: 'Depot' },
    { id: 8, vehicle: 'BR06G3789', date: '2025-08-11', time: '17:30', event: 'Engine Off', location: 'Depot' }
  ]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle checkbox changes
  const handleLeftCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setLeftCheckboxes(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleRightCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setRightCheckboxes(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    console.log('Left checkboxes:', leftCheckboxes);
    console.log('Right checkboxes:', rightCheckboxes);
    alert('Generating event log report...');
  };

  return (
    <>
    <Helmet>
                <title>EventLogs</title>
              </Helmet>
    <Header />
    <BottomNavbar text="Event Log Report" />
    <div className="event-log-container">
      <div className="event-log-header">
        <h1>Event Log Report</h1>
        <div className="report-info">
          <span>Vehicle: {formData.vehicle}</span>
          <span>Date: {formData.fromDate} {formData.fromTime} To {formData.toDate} {formData.toTime}</span>
        </div>
      </div>
      
      <div className="event-log-content">
        {/* Left Column - Form (30%) */}
        <div className="form-column">
          <div className="event-log-form">
            <form onSubmit={handleSubmit}>
              <div className="form-section">
                <div className="form-group">
                  <label htmlFor="vehicle">Vehicle</label>
                  <input
                    type="text"
                    id="vehicle"
                    name="vehicle"
                    value={formData.vehicle}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="form-group">
                  <label>From Date</label>
                  <div className="datetime-input">
                    <input
                      type="date"
                      name="fromDate"
                      value={formData.fromDate}
                      onChange={handleInputChange}
                    />
                    <input
                      type="time"
                      name="fromTime"
                      value={formData.fromTime}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label>To Date</label>
                  <div className="datetime-input">
                    <input
                      type="date"
                      name="toDate"
                      value={formData.toDate}
                      onChange={handleInputChange}
                    />
                    <input
                      type="time"
                      name="toTime"
                      value={formData.toTime}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
              
              <div className="form-section">
                <div className="form-group">
                  <label htmlFor="speedLimit">Speed Limit (KMPH)</label>
                  <input
                    type="number"
                    id="speedLimit"
                    name="speedLimit"
                    value={formData.speedLimit}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="stopTime">Stop Time (minutes)</label>
                  <input
                    type="number"
                    id="stopTime"
                    name="stopTime"
                    value={formData.stopTime}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="timeInterval">Time Interval (hours)</label>
                  <input
                    type="number"
                    id="timeInterval"
                    name="timeInterval"
                    value={formData.timeInterval}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="checkbox-section">
                <div className="checkbox-column">
                  <h3>Select Options</h3>
                  <div className="checkbox-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="company"
                        checked={leftCheckboxes.company}
                        onChange={handleLeftCheckboxChange}
                      />
                      Company
                    </label>
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="selectVehicles"
                        checked={leftCheckboxes.selectVehicles}
                        onChange={handleLeftCheckboxChange}
                      />
                      Select Vehicles
                    </label>
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="speedLimit"
                        checked={leftCheckboxes.speedLimit}
                        onChange={handleLeftCheckboxChange}
                      />
                      Speed Limit
                    </label>
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="stopTime"
                        checked={leftCheckboxes.stopTime}
                        onChange={handleLeftCheckboxChange}
                      />
                      Stop Time
                    </label>
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="location"
                        checked={leftCheckboxes.location}
                        onChange={handleLeftCheckboxChange}
                      />
                      Location
                    </label>
                  </div>
                </div>
                
                <div className="checkbox-column">
                  <h3>Additional Options</h3>
                  <div className="checkbox-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="company"
                        checked={rightCheckboxes.company}
                        onChange={handleRightCheckboxChange}
                      />
                      Company
                    </label>
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="selectVehicles"
                        checked={rightCheckboxes.selectVehicles}
                        onChange={handleRightCheckboxChange}
                      />
                      Select Vehicles
                    </label>
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="speedLimit"
                        checked={rightCheckboxes.speedLimit}
                        onChange={handleRightCheckboxChange}
                      />
                      Speed Limit
                    </label>
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="stopTime"
                        checked={rightCheckboxes.stopTime}
                        onChange={handleRightCheckboxChange}
                      />
                      Stop Time
                    </label>
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="location"
                        checked={rightCheckboxes.location}
                        onChange={handleRightCheckboxChange}
                      />
                      Location
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="form-actions">
                <button type="submit" className="view-button">VIEW</button>
              </div>
            </form>
          </div>
        </div>
        
        {/* Right Column - Table (70%) */}
        <div className="table-column">
          <div className="event-log-table">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Vehicle</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Event</th>
                  <th>Location</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr key={event.id}>
                    <td>{event.id}</td>
                    <td>{event.vehicle}</td>
                    <td>{event.date}</td>
                    <td>{event.time}</td>
                    <td>{event.event}</td>
                    <td>{event.location}</td>
                    <td>{event.speed || event.duration || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="event-log-footer">
            <div className="footer-info">
              <span>Report generated on: {new Date().toLocaleDateString()}</span>
              <span>Total events: {events.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default EventLogs;