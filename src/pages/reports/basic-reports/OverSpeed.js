import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../../components/Header';
import BottomNavbar from '../../../components/BottomNavbar';
import './overspeed.css';

const OverSpeedReport = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    provider: 'Amazon info Solution',
    company: 'AJIT KUMAAR',
    vehicle: 'BR06G3789',
    startDate: '2025-08-06',
    startTime: '00:00',
    endDate: '2025-08-13',
    endTime: '23:59',
    speedLimitUnit: 'KMPH',
    speedLimitValue: 40
  });

  // State for report data
  const [reportData, setReportData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dateRange, setDateRange] = useState('Aug 06,2025 00:00 To Aug 13,2025 23:59');

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle radio button change for speed limit unit
  const handleUnitChange = (e) => {
    setFormData({
      ...formData,
      speedLimitUnit: e.target.value
    });
  };

  // Format date for header display
  const formatDateForHeader = (dateStr, timeStr) => {
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthName = monthNames[month];
    
    return `${monthName} ${day},${year} ${timeStr}`;
  };

  // Format date and time for table
  const formatDateTime = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  };

  // Generate random location
  const generateRandomLocation = () => {
    const locations = [
      'Highway A1', 'City Center', 'Suburban Area', 'Industrial Zone', 
      'Rural Road', 'Tunnel', 'Bridge', 'Parking Lot'
    ];
    return locations[Math.floor(Math.random() * locations.length)];
  };

  // Generate mock report data
  const generateMockReportData = () => {
    const data = [];
    const speedLimit = parseInt(formData.speedLimitValue);
    
    // Generate random overspeed data
    const numRecords = Math.floor(Math.random() * 15) + 5; // 5-20 records
    
    for (let i = 0; i < numRecords; i++) {
      const eventTime = new Date(2025, 7, 6 + Math.floor(Math.random() * 8), Math.floor(Math.random() * 24), Math.floor(Math.random() * 60));
      const overspeedBy = Math.floor(Math.random() * 30) + 1; // 1-30 km/h over the limit
      const actualSpeed = speedLimit + overspeedBy;
      
      data.push({
        id: i + 1,
        vehicle: formData.vehicle,
        eventTime: formatDateTime(eventTime),
        speedLimit: speedLimit,
        actualSpeed: actualSpeed,
        overspeedBy: overspeedBy,
        location: generateRandomLocation(),
        duration: Math.floor(Math.random() * 5) + 1 // 1-5 minutes
      });
    }
    
    return data;
  };

  // Generate report
  const generateReport = () => {
    // Update the date range in the header
    const startDateTime = formatDateForHeader(formData.startDate, formData.startTime);
    const endDateTime = formatDateForHeader(formData.endDate, formData.endTime);
    setDateRange(`${startDateTime} To ${endDateTime}`);
    
    // Show loading spinner
    setIsLoading(true);
    
    // Simulate loading delay
    setTimeout(() => {
      // Generate mock report data
      const data = generateMockReportData();
      setReportData(data);
      setIsLoading(false);
    }, 1200);
  };

  // Calculate summary statistics
  const getSummaryStats = () => {
    if (reportData.length === 0) {
      return {
        totalEvents: 0,
        maxSpeed: 0,
        avgOverspeed: 0,
        totalDuration: 0
      };
    }
    
    const maxSpeed = Math.max(...reportData.map(record => record.actualSpeed));
    const avgOverspeed = Math.round(reportData.reduce((sum, record) => sum + record.overspeedBy, 0) / reportData.length);
    const totalDuration = reportData.reduce((sum, record) => sum + record.duration, 0);
    
    return {
      totalEvents: reportData.length,
      maxSpeed,
      avgOverspeed,
      totalDuration
    };
  };

  const summaryStats = getSummaryStats();

  return (
    <>
    <Helmet>
                <title>OverSpeed</title>
              </Helmet>
    <Header />
    <BottomNavbar text="OverSpeed" />
    
    <div className="container">
        <div className="date-range">Report Period: <span>{dateRange}</span></div>
      <div className="main-content">
        <div className="sidebar">
          <h2>Report Parameters</h2>
          <form>
            <div className="form-group">
              <label htmlFor="provider">Provider</label>
              <select 
                id="provider" 
                name="provider" 
                value={formData.provider} 
                onChange={handleInputChange}
              >
                <option value="Amazon info Solution">Amazon info Solution</option>
                <option value="Google Logistics">Google Logistics</option>
                <option value="Microsoft Transport">Microsoft Transport</option>
                <option value="Apple Delivery">Apple Delivery</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="company">Company</label>
              <select 
                id="company" 
                name="company" 
                value={formData.company} 
                onChange={handleInputChange}
              >
                <option value="AJIT KUMAAR">AJIT KUMAAR</option>
                <option value="XYZ Enterprises">XYZ Enterprises</option>
                <option value="ABC Logistics">ABC Logistics</option>
                <option value="Global Transport">Global Transport</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="vehicle">Select Vehicles</label>
              <select 
                id="vehicle" 
                name="vehicle" 
                value={formData.vehicle} 
                onChange={handleInputChange}
              >
                <option value="BR06G3789">BR06G3789</option>
                <option value="MH04AB1234">MH04AB1234</option>
                <option value="DL01CD5678">DL01CD5678</option>
                <option value="KA02EF9012">KA02EF9012</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Start Date & Time</label>
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
              <label>End Date & Time</label>
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
              <label>Speed Limit</label>
              <div className="speed-limit-container">
                <div className="radio-group">
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="speedLimitUnit"
                      value="KMPH"
                      checked={formData.speedLimitUnit === 'KMPH'}
                      onChange={handleUnitChange}
                      className="radio-input"
                    />
                    KMPH
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="speedLimitUnit"
                      value="MPH"
                      checked={formData.speedLimitUnit === 'MPH'}
                      onChange={handleUnitChange}
                      className="radio-input"
                    />
                    MPH
                  </label>
                </div>
                <div className="speed-input-group">
                  <input 
                    type="number" 
                    name="speedLimitValue" 
                    value={formData.speedLimitValue} 
                    onChange={handleInputChange}
                    min="1"
                    className="speed-limit-input"
                  />
                  <span className="speed-unit-label">{formData.speedLimitUnit}</span>
                </div>
              </div>
            </div>
            
            <button 
              type="button" 
              className="view-button" 
              onClick={generateReport}
            >
              <i className="fas fa-search"></i> VIEW REPORT
            </button>
          </form>
        </div>
        
        <div className="report-area">
          {isLoading ? (
            <div className="loading">
              <div className="loading-spinner"></div>
              <p>Generating report...</p>
            </div>
          ) : reportData.length === 0 ? (
            <div className="empty-report">
              <i className="fas fa-tachometer-alt"></i>
              <h3>Generate OverSpeed Report</h3>
              <p>Configure your report parameters and click "VIEW REPORT" to generate an overspeed report.</p>
            </div>
          ) : (
            <>
              <div className="report-header">
                <h2>OverSpeed Report: {formData.vehicle}</h2>
                <div className="report-controls">
                  <button className="view-button" style={{width: 'auto', padding: '8px 15px', fontSize: '14px'}}>
                    <i className="fas fa-download"></i> Export
                  </button>
                </div>
              </div>
              
              <div className="report-summary">
                <div className="summary-card">
                  <h3>Total Events</h3>
                  <p>{summaryStats.totalEvents}</p>
                </div>
                <div className="summary-card">
                  <h3>Max Speed</h3>
                  <p>{summaryStats.maxSpeed} {formData.speedLimitUnit}</p>
                </div>
                <div className="summary-card">
                  <h3>Avg. Overspeed</h3>
                  <p>{summaryStats.avgOverspeed} {formData.speedLimitUnit}</p>
                </div>
                <div className="summary-card">
                  <h3>Total Duration</h3>
                  <p>{summaryStats.totalDuration} min</p>
                </div>
              </div>
              
              <table className="report-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Vehicle</th>
                    <th>Event Time</th>
                    <th>Speed Limit</th>
                    <th>Actual Speed</th>
                    <th>Overspeed By</th>
                    <th>Location</th>
                    <th>Duration (min)</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.map(record => {
                    const overspeedPercentage = Math.min(100, (record.overspeedBy / 30) * 100);
                    
                    return (
                      <tr key={record.id}>
                        <td>{record.id}</td>
                        <td>{record.vehicle}</td>
                        <td>{record.eventTime}</td>
                        <td>{record.speedLimit} {formData.speedLimitUnit}</td>
                        <td>{record.actualSpeed} {formData.speedLimitUnit}</td>
                        <td>
                          <div>{record.overspeedBy} {formData.speedLimitUnit}</div>
                          <div className="speed-bar">
                            <div className="speed-fill" style={{width: `${overspeedPercentage}%`}}></div>
                          </div>
                        </td>
                        <td>{record.location}</td>
                        <td>{record.duration}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default OverSpeedReport;