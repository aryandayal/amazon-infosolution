import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../../components/Header';
import BottomNavbar from '../../../components/BottomNavbar';
import './tripsummarysite.css';

const TripSummarySite = () => {
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
    speedLimitEnabled: false,
    speedLimitValue: 40,
    stopTimeEnabled: false,
    stopTimeValue: 10,
    timeIntervalEnabled: false,
    timeIntervalValue: 'A',
    unreach: false,
    sites: false,
    routeDeviation: false,
    ignition: false,
    battery: false
  });

  // State for report data
  const [reportData, setReportData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Handle numeric input changes with increase/decrease
  const handleNumericChange = (name, value, min, max) => {
    const numValue = parseInt(value);
    if (!isNaN(numValue)) {
      const newValue = Math.max(min, Math.min(max, numValue));
      setFormData({
        ...formData,
        [name]: newValue
      });
    }
  };

  // Handle time interval change
  const handleIntervalChange = (direction) => {
    const intervals = ['A', 'B', 'C', 'D'];
    const currentIndex = intervals.indexOf(formData.timeIntervalValue);
    let newIndex;
    
    if (direction === 'increase') {
      newIndex = (currentIndex + 1) % intervals.length;
    } else {
      newIndex = (currentIndex - 1 + intervals.length) % intervals.length;
    }
    
    setFormData({
      ...formData,
      timeIntervalValue: intervals[newIndex]
    });
  };

  // Format date for header display
  const formatDateForHeader = (dateStr, timeStr) => {
    if (!dateStr) return '';
    
    // Parse the date string in YYYY-MM-DD format
    const parts = dateStr.split('-');
    if (parts.length !== 3) return dateStr;
    
    const year = parseInt(parts[0]);
    const month = parseInt(parts[1]) - 1; // Month is 0-indexed in JavaScript
    const day = parseInt(parts[2]);
    
    // Check if date is valid
    if (isNaN(year) || isNaN(month) || isNaN(day)) return dateStr;
    
    const date = new Date(year, month, day);
    if (isNaN(date.getTime())) return dateStr;
    
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthName = monthNames[date.getMonth()];
    
    return `${monthName} ${date.getDate()},${date.getFullYear()} ${timeStr}`;
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

  // Format duration in minutes to HH:MM format
  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  };

  // Generate random location
  const generateRandomLocation = () => {
    const locations = [
      'Warehouse A', 'Distribution Center', 'Client Site', 'Service Station', 
      'Parking Lot', 'Loading Dock', 'Transit Hub', 'Maintenance Facility',
      'City Center', 'Suburban Area', 'Industrial Zone', 'Rural Road'
    ];
    return locations[Math.floor(Math.random() * locations.length)];
  };

  // Generate random vehicle number
  const generateRandomVehicle = () => {
    const prefixes = ['BR', 'MH', 'DL', 'KA'];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const numbers = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    const letters = String.fromCharCode(65 + Math.floor(Math.random() * 26)) + 
                   String.fromCharCode(65 + Math.floor(Math.random() * 26));
    return `${prefix}${numbers}${letters}`;
  };

  // Generate mock report data
  const generateMockReportData = () => {
    const data = [];
    
    // Generate random trip data
    const numRecords = Math.floor(Math.random() * 20) + 10; // 10-30 records
    
    for (let i = 0; i < numRecords; i++) {
      const startTime = new Date(2025, 7, 6 + Math.floor(Math.random() * 8), Math.floor(Math.random() * 24), Math.floor(Math.random() * 60));
      const duration = Math.floor(Math.random() * 240) + 30; // 30-270 minutes
      const endTime = new Date(startTime.getTime() + duration * 60000);
      const distance = Math.floor(Math.random() * 150) + 10; // 10-160 km
      
      data.push({
        id: i + 1,
        vehicle: formData.selectedVehicles === 'All' ? generateRandomVehicle() : formData.selectedVehicles,
        startTime: formatDateTime(startTime),
        endTime: formatDateTime(endTime),
        duration: duration,
        distance: distance,
        startLocation: generateRandomLocation(),
        endLocation: generateRandomLocation(),
        speedLimit: formData.speedLimitEnabled ? Math.floor(Math.random() * 30) + 40 : null,
        stopTime: formData.stopTimeEnabled ? Math.floor(Math.random() * 15) + 5 : null,
        timeInterval: formData.timeIntervalEnabled ? ['A', 'B', 'C', 'D'][Math.floor(Math.random() * 4)] : null,
        unreach: formData.unreach ? Math.random() > 0.7 : null,
        sites: formData.sites ? Math.floor(Math.random() * 5) + 1 : null,
        routeDeviation: formData.routeDeviation ? Math.random() > 0.7 : null,
        ignition: formData.ignition ? Math.random() > 0.8 : null,
        battery: formData.battery ? Math.floor(Math.random() * 30) + 70 : null
      });
    }
    
    return data;
  };

  // Generate report
  const generateReport = () => {
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
        totalTrips: 0,
        totalDistance: 0,
        avgDistance: 0,
        totalDuration: 0
      };
    }
    
    const totalDistance = reportData.reduce((sum, record) => sum + record.distance, 0);
    const avgDistance = Math.round(totalDistance / reportData.length);
    const totalDuration = reportData.reduce((sum, record) => sum + record.duration, 0);
    
    return {
      totalTrips: reportData.length,
      totalDistance,
      avgDistance,
      totalDuration
    };
  };

  const summaryStats = getSummaryStats();

  // Function to render checkbox value in table
  const renderCheckboxValue = (value) => {
    if (value === null) return '-';
    if (typeof value === 'boolean') return value ? '✓' : '✗';
    return value;
  };

  // Numeric input component with increase/decrease arrows
  const NumericInput = ({ name, value, enabled, min, max, unit, onChange }) => (
    <div className="numeric-input-group">
      <label className="checkbox-label">
        <input
          type="checkbox"
          name={`${name}Enabled`}
          checked={enabled}
          onChange={handleInputChange}
          className="checkbox-input"
        />
        {name === 'speedLimit' && 'Speed Limit'}
        {name === 'stopTime' && 'Stop Time'}
        {name === 'timeInterval' && 'Time Interval'}
      </label>
      
      {enabled && (
        <div className="input-row">
          <input
            type={name === 'timeInterval' ? 'text' : 'number'}
            name={`${name}Value`}
            value={value}
            onChange={handleInputChange}
            min={min}
            max={max}
            className="numeric-input"
            readOnly={name === 'timeInterval'}
          />
          <div className="arrows">
            <button 
              type="button" 
              className="arrow-button"
              onClick={() => {
                if (name === 'timeInterval') {
                  handleIntervalChange('decrease');
                } else {
                  handleNumericChange(`${name}Value`, parseInt(value) - 1, min, max);
                }
              }}
            >
              -
            </button>
            <button 
              type="button" 
              className="arrow-button"
              onClick={() => {
                if (name === 'timeInterval') {
                  handleIntervalChange('increase');
                } else {
                  handleNumericChange(`${name}Value`, parseInt(value) + 1, min, max);
                }
              }}
            >
              +
            </button>
          </div>
          <span className="unit">{unit}</span>
        </div>
      )}
    </div>
  );

  return (
    <>
    <Helmet>
                <title>TripSummarySite</title>
              </Helmet>
    <Header />
    <BottomNavbar text="TripSummarySite" />
    
    <div className="trip-summary-container">
      <div className="main-content">
        <div className="sidebar">
          <h2>Trip Summary Parameters</h2>
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
            
            <div className="checkbox-group">
              <NumericInput 
                name="speedLimit"
                value={formData.speedLimitValue}
                enabled={formData.speedLimitEnabled}
                min={10}
                max={120}
                unit="KMPH"
                onChange={handleInputChange}
              />
              
              <NumericInput 
                name="stopTime"
                value={formData.stopTimeValue}
                enabled={formData.stopTimeEnabled}
                min={1}
                max={120}
                unit="Min"
                onChange={handleInputChange}
              />
              
              <NumericInput 
                name="timeInterval"
                value={formData.timeIntervalValue}
                enabled={formData.timeIntervalEnabled}
                unit="Grade"
                onChange={handleInputChange}
              />
              
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="unreach"
                  checked={formData.unreach}
                  onChange={handleInputChange}
                  className="checkbox-input"
                />
                Unreach
              </label>
              
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="sites"
                  checked={formData.sites}
                  onChange={handleInputChange}
                  className="checkbox-input"
                />
                Sites
              </label>
              
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="routeDeviation"
                  checked={formData.routeDeviation}
                  onChange={handleInputChange}
                  className="checkbox-input"
                />
                Route Deviation
              </label>
              
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="ignition"
                  checked={formData.ignition}
                  onChange={handleInputChange}
                  className="checkbox-input"
                />
                Ignition
              </label>
              
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="battery"
                  checked={formData.battery}
                  onChange={handleInputChange}
                  className="checkbox-input"
                />
                Battery
              </label>
            </div>
            
            <button 
              type="button" 
              className="view-button" 
              onClick={generateReport}
            >
              VIEW
            </button>
          </form>
        </div>
        
        <div className="report-area">
          <div className="report-header">
            <h2>Trip Summary Report</h2>
            <div className="date-range">
              {formatDateForHeader(formData.startDate, formData.startTime)} to {formatDateForHeader(formData.endDate, formData.endTime)}
            </div>
          </div>
          
          {isLoading ? (
            <div className="loading">
              <div className="loading-spinner"></div>
              <p>Loading report...</p>
            </div>
          ) : reportData.length === 0 ? (
            <div className="empty-report">
              <p>Click "VIEW" to generate the trip summary report</p>
            </div>
          ) : (
            <>
              <div className="report-summary">
                <div className="summary-card">
                  <h3>Total Trips</h3>
                  <p>{summaryStats.totalTrips}</p>
                </div>
                <div className="summary-card">
                  <h3>Total Distance</h3>
                  <p>{summaryStats.totalDistance} km</p>
                </div>
                <div className="summary-card">
                  <h3>Avg. Distance</h3>
                  <p>{summaryStats.avgDistance} km</p>
                </div>
                <div className="summary-card">
                  <h3>Total Duration</h3>
                  <p>{formatDuration(summaryStats.totalDuration)}</p>
                </div>
              </div>
              
              <table className="report-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Vehicle</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th>Duration</th>
                    <th>Distance (km)</th>
                    <th>Start Location</th>
                    <th>End Location</th>
                    {formData.speedLimitEnabled && <th>Speed Limit</th>}
                    {formData.stopTimeEnabled && <th>Stop Time</th>}
                    {formData.timeIntervalEnabled && <th>Time Interval</th>}
                    {formData.unreach && <th>Unreach</th>}
                    {formData.sites && <th>Sites</th>}
                    {formData.routeDeviation && <th>Route Deviation</th>}
                    {formData.ignition && <th>Ignition</th>}
                    {formData.battery && <th>Battery</th>}
                  </tr>
                </thead>
                <tbody>
                  {reportData.map(record => (
                    <tr key={record.id}>
                      <td>{record.id}</td>
                      <td>{record.vehicle}</td>
                      <td>{record.startTime}</td>
                      <td>{record.endTime}</td>
                      <td>{formatDuration(record.duration)}</td>
                      <td>{record.distance}</td>
                      <td>{record.startLocation}</td>
                      <td>{record.endLocation}</td>
                      {formData.speedLimitEnabled && <td>{record.speedLimit !== null ? `${record.speedLimit} KMPH` : '-'}</td>}
                      {formData.stopTimeEnabled && <td>{record.stopTime !== null ? `${record.stopTime} Min` : '-'}</td>}
                      {formData.timeIntervalEnabled && <td>{record.timeInterval !== null ? `Grade ${record.timeInterval}` : '-'}</td>}
                      {formData.unreach && <td>{renderCheckboxValue(record.unreach)}</td>}
                      {formData.sites && <td>{record.sites !== null ? `${record.sites} Sites` : '-'}</td>}
                      {formData.routeDeviation && <td>{renderCheckboxValue(record.routeDeviation)}</td>}
                      {formData.ignition && <td>{renderCheckboxValue(record.ignition)}</td>}
                      {formData.battery && <td>{record.battery !== null ? `${record.battery}%` : '-'}</td>}
                    </tr>
                  ))}
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

export default TripSummarySite;