import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../../components/Header';
import BottomNavbar from '../../../components/BottomNavbar';
import './vehicleperformance.css';

const VehiclePerformance = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    provider: 'Amazon info Solution',
    company: 'ERSS COMMAND & CC',
    startDate: '2025-08-07',
    endDate: '2025-08-14',
    distance: 100
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
    
    // Generate random vehicle data
    const numRecords = Math.floor(Math.random() * 15) + 5; // 5-20 records
    
    for (let i = 0; i < numRecords; i++) {
      const vehicle = generateRandomVehicle();
      const distance = Math.floor(Math.random() * 500) + 50; // 50-550 km
      const fuelConsumed = (distance * (Math.random() * 0.15 + 0.05)).toFixed(2); // 5-20% of distance
      const avgSpeed = Math.floor(Math.random() * 40) + 30; // 30-70 km/h
      const maxSpeed = Math.floor(Math.random() * 30) + avgSpeed; // Higher than avg
      const drivingHours = (distance / avgSpeed).toFixed(1);
      const idleHours = (Math.random() * 2).toFixed(1);
      const harshBraking = Math.floor(Math.random() * 10);
      const harshAcceleration = Math.floor(Math.random() * 10);
      const harshCornering = Math.floor(Math.random() * 10);
      
      data.push({
        id: i + 1,
        vehicle,
        distance,
        fuelConsumed,
        avgSpeed,
        maxSpeed,
        drivingHours,
        idleHours,
        harshBraking,
        harshAcceleration,
        harshCornering
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
        totalFuel: 0,
        avgFuel: 0
      };
    }
    
    const totalDistance = filteredReportData.reduce((sum, record) => sum + record.distance, 0);
    const avgDistance = Math.round(totalDistance / filteredReportData.length);
    const totalFuel = parseFloat(filteredReportData.reduce((sum, record) => sum + parseFloat(record.fuelConsumed), 0).toFixed(2));
    const avgFuel = parseFloat((totalFuel / filteredReportData.length).toFixed(2));
    
    return {
      totalVehicles: filteredReportData.length,
      totalDistance,
      avgDistance,
      totalFuel,
      avgFuel
    };
  };

  const summaryStats = getSummaryStats();

  return (
    <>
    <Helmet>
                <title>VehiclePerformance</title>
              </Helmet>
      <Header />
      <BottomNavbar text="VehiclePerformance" />
      
      <div className="vehicle-performance-container">
        <div className="performance-content">
          <div className="performance-sidebar">
            <h2>Vehicle Performance Parameters</h2>
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
              
              <div className="form-group">
                <label htmlFor="distance">Distance (Km) *</label>
                <input 
                  type="number" 
                  id="distance" 
                  name="distance" 
                  value={formData.distance} 
                  onChange={handleInputChange}
                  min="0"
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
          
          <div className="performance-report">
            <div className="report-header">
              <h2>Vehicle Performance Report</h2>
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
                <p>Click "VIEW" to generate the vehicle performance report</p>
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
                    <h3>Total Fuel</h3>
                    <p>{summaryStats.totalFuel} L</p>
                  </div>
                  <div className="summary-card">
                    <h3>Avg. Fuel</h3>
                    <p>{summaryStats.avgFuel} L</p>
                  </div>
                </div>
                
                <div className="table-container">
                  <table className="performance-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Vehicle</th>
                        <th>Distance (km)</th>
                        <th>Fuel (L)</th>
                        <th>Avg Speed (km/h)</th>
                        <th>Max Speed (km/h)</th>
                        <th>Driving Hours</th>
                        <th>Idle Hours</th>
                        <th>Harsh Braking</th>
                        <th>Harsh Accel</th>
                        <th>Harsh Corner</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredReportData.map(record => (
                        <tr key={record.id}>
                          <td>{record.id}</td>
                          <td>{record.vehicle}</td>
                          <td>{record.distance}</td>
                          <td>{record.fuelConsumed}</td>
                          <td>{record.avgSpeed}</td>
                          <td>{record.maxSpeed}</td>
                          <td>{record.drivingHours}</td>
                          <td>{record.idleHours}</td>
                          <td>{record.harshBraking}</td>
                          <td>{record.harshAcceleration}</td>
                          <td>{record.harshCornering}</td>
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

export default VehiclePerformance;
