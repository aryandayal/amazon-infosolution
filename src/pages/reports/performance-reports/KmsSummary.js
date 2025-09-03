import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../../components/Header';
import BottomNavbar from '../../../components/BottomNavbar';
import './kmssummary.css';

const KmsSummary = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    provider: 'Amazon info Solution',
    company: 'ERSS COMMAND & CC',
    startDate: '2025-08-07',
    endDate: '2025-08-14'
  });

  // State for report data
  const [reportData, setReportData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Format date for display
  const formatDateForDisplay = (dateStr) => {
    if (!dateStr) return '';
    
    const parts = dateStr.split('-');
    if (parts.length !== 3) return dateStr;
    
    const year = parseInt(parts[0]);
    const month = parseInt(parts[1]) - 1; // Month is 0-indexed in JavaScript
    const day = parseInt(parts[2]);
    
    const date = new Date(year, month, day);
    if (isNaN(date.getTime())) return dateStr;
    
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthName = monthNames[date.getMonth()];
    
    return `${monthName} ${date.getDate()},${date.getFullYear()}`;
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
    const numRecords = Math.floor(Math.random() * 15) + 5; // 5-20 records
    
    for (let i = 0; i < numRecords; i++) {
      const startTime = new Date(2025, 7, 7 + Math.floor(Math.random() * 8), Math.floor(Math.random() * 24), Math.floor(Math.random() * 60));
      const duration = Math.floor(Math.random() * 240) + 30; // 30-270 minutes
      const endTime = new Date(startTime.getTime() + duration * 60000);
      const distance = Math.floor(Math.random() * 150) + 10; // 10-160 km
      
      data.push({
        id: i + 1,
        vehicle: generateRandomVehicle(),
        startTime: formatDateTime(startTime),
        endTime: formatDateTime(endTime),
        duration: duration,
        distance: distance,
        startLocation: generateRandomLocation(),
        endLocation: generateRandomLocation()
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
    }, 1000);
  };

  // Filter report data based on search term
  const filteredReportData = reportData.filter(record => 
    record.vehicle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate summary statistics
  const getSummaryStats = () => {
    if (filteredReportData.length === 0) {
      return {
        totalVehicles: 0,
        totalDistance: 0,
        avgDistance: 0,
        totalDuration: 0
      };
    }
    
    const totalDistance = filteredReportData.reduce((sum, record) => sum + record.distance, 0);
    const avgDistance = Math.round(totalDistance / filteredReportData.length);
    const totalDuration = filteredReportData.reduce((sum, record) => sum + record.duration, 0);
    
    return {
      totalVehicles: filteredReportData.length,
      totalDistance,
      avgDistance,
      totalDuration
    };
  };

  const summaryStats = getSummaryStats();

  return (
    <>
    <Helmet>
                <title>KMS Summary</title>
              </Helmet>
      <Header />
      <BottomNavbar text="KmsSummary" />
      
      <div className="kms-summary-container">
        <div className="kms-content">
          <div className="kms-sidebar">
            <h2>Kilometer Summary Parameters</h2>
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
                <label htmlFor="startDate">Start Date *</label>
                <input 
                  type="date" 
                  id="startDate" 
                  name="startDate" 
                  value={formData.startDate} 
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="endDate">End Date *</label>
                <input 
                  type="date" 
                  id="endDate" 
                  name="endDate" 
                  value={formData.endDate} 
                  onChange={handleInputChange}
                  required
                />
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
          
          <div className="kms-report">
            <div className="report-header">
              <h2>Kilometer Summary Report</h2>
              <div className="report-meta">
                <div className="date-range">
                  {formatDateForDisplay(formData.startDate)} 00:00 To {formatDateForDisplay(formData.endDate)} 23:59
                </div>
                <div className="report-actions">
                  <div className="search-container">
                    <input
                      type="text"
                      placeholder="Search vehicle..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="search-input"
                    />
                  </div>
                  <div className="action-buttons">
                    <button className="action-button">📅</button>
                    <button className="action-button">⚙️</button>
                    <button className="action-button">📊</button>
                  </div>
                </div>
              </div>
            </div>
            
            {isLoading ? (
              <div className="loading">
                <div className="loading-spinner"></div>
                <p>Loading report...</p>
              </div>
            ) : filteredReportData.length === 0 ? (
              <div className="empty-report">
                <p>Click "VIEW" to generate the kilometer summary report</p>
              </div>
            ) : (
              <>
                <div className="report-summary">
                  <div className="summary-card">
                    <h3>Total Vehicles</h3>
                    <p>{summaryStats.totalVehicles}</p>
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
                
                <div className="table-container">
                  <table className="kms-table">
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
                      </tr>
                    </thead>
                    <tbody>
                      {filteredReportData.map(record => (
                        <tr key={record.id}>
                          <td>{record.id}</td>
                          <td>{record.vehicle}</td>
                          <td>{record.startTime}</td>
                          <td>{record.endTime}</td>
                          <td>{formatDuration(record.duration)}</td>
                          <td>{record.distance}</td>
                          <td>{record.startLocation}</td>
                          <td>{record.endLocation}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default KmsSummary;