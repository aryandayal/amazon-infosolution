import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../../components/Header';
import BottomNavbar from '../../../components/BottomNavbar';
import './fleetdaywisekmssummary.css';

const FleetDayWiseKmsSummary = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    provider: 'Amazon info Solution',
    company: 'ERSS COMMAND & CC',
    startDate: '2025-08-07',
    startTime: '00:00',
    endDate: '2025-08-14',
    endTime: '23:59',
    fromHour: '0', // New field for from hour
    toHour: '23'   // New field for to hour
  });

  // State for report data
  const [reportData, setReportData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Format date for display
  const formatDateForDisplay = (dateStr, timeStr) => {
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
    
    return `${monthName} ${date.getDate()},${date.getFullYear()} ${timeStr}`;
  };

  // Format date for table
  const formatDateForTable = (dateStr) => {
    if (!dateStr) return '';
    
    const parts = dateStr.split('-');
    if (parts.length !== 3) return dateStr;
    
    const year = parseInt(parts[0]);
    const month = parseInt(parts[1]) - 1;
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
    
    // Parse start and end dates
    const startDate = new Date(formData.startDate);
    const endDate = new Date(formData.endDate);
    
    // Generate data for each day in the range
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      const dateStr = currentDate.toISOString().split('T')[0];
      const formattedDate = formatDateForTable(dateStr);
      
      // Generate random data for this day
      const totalDistance = Math.floor(Math.random() * 500) + 100; // 100-600 km
      const numVehicles = Math.floor(Math.random() * 15) + 5; // 5-20 vehicles
      const avgDistance = Math.round(totalDistance / numVehicles);
      
      // Generate vehicle details
      const vehicles = [];
      for (let i = 0; i < numVehicles; i++) {
        vehicles.push({
          id: i + 1,
          vehicle: generateRandomVehicle(),
          distance: Math.floor(Math.random() * 50) + 20 // 20-70 km per vehicle
        });
      }
      
      data.push({
        id: data.length + 1,
        date: formattedDate,
        dateStr: dateStr,
        totalDistance,
        numVehicles,
        avgDistance,
        vehicles
      });
      
      // Move to next day
      currentDate.setDate(currentDate.getDate() + 1);
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

  // Calculate summary statistics
  const getSummaryStats = () => {
    if (reportData.length === 0) {
      return {
        totalDays: 0,
        totalDistance: 0,
        avgDistancePerDay: 0,
        totalVehicles: 0,
        avgVehiclesPerDay: 0
      };
    }
    
    const totalDistance = reportData.reduce((sum, day) => sum + day.totalDistance, 0);
    const avgDistancePerDay = Math.round(totalDistance / reportData.length);
    const totalVehicles = reportData.reduce((sum, day) => sum + day.numVehicles, 0);
    const avgVehiclesPerDay = Math.round(totalVehicles / reportData.length);
    
    return {
      totalDays: reportData.length,
      totalDistance,
      avgDistancePerDay,
      totalVehicles,
      avgVehiclesPerDay
    };
  };

  const summaryStats = getSummaryStats();

  // Generate hour options (0-23)
  const hourOptions = Array.from({ length: 24 }, (_, i) => i.toString());

  return (
    <>
    <Helmet>
                <title>FleetDayWiseKmsSummary</title>
              </Helmet>
      <Header />
      <BottomNavbar text="FleetDayWiseKmsSummary" />
      
      <div className="fleet-kms-container">
        <div className="fleet-content">
          <div className="fleet-sidebar">
            <h2>Fleet Day Wise KMS Summary</h2>
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
                <label>From Hour *</label>
                <select 
                  name="fromHour" 
                  value={formData.fromHour} 
                  onChange={handleInputChange}
                  className="hour-select"
                  required
                >
                  {hourOptions.map(hour => (
                    <option key={`from-${hour}`} value={hour}>
                      {hour.padStart(2, '0')}:00
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label>To Hour *</label>
                <select 
                  name="toHour" 
                  value={formData.toHour} 
                  onChange={handleInputChange}
                  className="hour-select"
                  required
                >
                  {hourOptions.map(hour => (
                    <option key={`to-${hour}`} value={hour}>
                      {hour.padStart(2, '0')}:00
                    </option>
                  ))}
                </select>
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
          
          <div className="fleet-report">
            <div className="report-header">
              <h2>Fleet Day Wise KMS Summary Report</h2>
              <div className="report-meta">
                <div className="date-range">
                  {formatDateForDisplay(formData.startDate, formData.startTime)} To {formatDateForDisplay(formData.endDate, formData.endTime)}
                </div>
                <div className="time-range">
                  From {formData.fromHour.padStart(2, '0')}:00 To {formData.toHour.padStart(2, '0')}:00
                </div>
                <div className="report-actions">
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
            ) : reportData.length === 0 ? (
              <div className="empty-report">
                <p>Click "VIEW" to generate the fleet day wise KMS summary report</p>
              </div>
            ) : (
              <>
                <div className="report-summary">
                  <div className="summary-card">
                    <h3>Total Days</h3>
                    <p>{summaryStats.totalDays}</p>
                  </div>
                  <div className="summary-card">
                    <h3>Total Distance</h3>
                    <p>{summaryStats.totalDistance} km</p>
                  </div>
                  <div className="summary-card">
                    <h3>Avg. Distance/Day</h3>
                    <p>{summaryStats.avgDistancePerDay} km</p>
                  </div>
                  <div className="summary-card">
                    <h3>Total Vehicles</h3>
                    <p>{summaryStats.totalVehicles}</p>
                  </div>
                  <div className="summary-card">
                    <h3>Avg. Vehicles/Day</h3>
                    <p>{summaryStats.avgVehiclesPerDay}</p>
                  </div>
                </div>
                
                <div className="table-container">
                  <table className="fleet-table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Total Distance (km)</th>
                        <th>Number of Vehicles</th>
                        <th>Avg. Distance/Vehicle (km)</th>
                        <th>Vehicle Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reportData.map(day => (
                        <tr key={day.id}>
                          <td>{day.date}</td>
                          <td>{day.totalDistance}</td>
                          <td>{day.numVehicles}</td>
                          <td>{day.avgDistance}</td>
                          <td>
                            <div className="vehicle-details">
                              {day.vehicles.slice(0, 3).map(v => (
                                <div key={v.id} className="vehicle-item">
                                  {v.vehicle}: {v.distance} km
                                </div>
                              ))}
                              {day.numVehicles > 3 && (
                                <div className="vehicle-more">
                                  +{day.numVehicles - 3} more
                                </div>
                              )}
                            </div>
                          </td>
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

export default FleetDayWiseKmsSummary;