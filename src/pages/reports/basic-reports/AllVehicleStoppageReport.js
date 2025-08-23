import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../../components/Header';
import BottomNavbar from '../../../components/BottomNavbar';
// import './allvehiclestoppagereport.css';

const AllVehicleStoppage = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    provider: 'Amazon info Solution',
    company: 'ERSS COMMAND & CC',
    selectedGroup: 'All',
    selectedVehicles: 'All',
    startDate: '2025-08-06',
    endDate: '2025-08-13',
    stopTime: 31
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

  // Format date for header display
  const formatDateForHeader = (dateStr) => {
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

  // Generate random location
  const generateRandomLocation = () => {
    const locations = [
      'Warehouse A', 'Distribution Center', 'Client Site', 'Service Station', 
      'Parking Lot', 'Loading Dock', 'Transit Hub', 'Maintenance Facility'
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
    const stopTime = parseInt(formData.stopTime);
    
    // Generate random stoppage data
    const numRecords = Math.floor(Math.random() * 20) + 10; // 10-30 records
    
    for (let i = 0; i < numRecords; i++) {
      const startTime = new Date(2025, 7, 6 + Math.floor(Math.random() * 8), Math.floor(Math.random() * 24), Math.floor(Math.random() * 60));
      const duration = stopTime + Math.floor(Math.random() * 30); // Stoppage duration above the limit
      const endTime = new Date(startTime.getTime() + duration * 60000);
      
      data.push({
        id: i + 1,
        vehicle: generateRandomVehicle(),
        startTime: formatDateTime(startTime),
        endTime: formatDateTime(endTime),
        duration: duration,
        location: generateRandomLocation()
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
        totalVehicles: 0,
        totalStoppageTime: 0,
        avgStoppageTime: 0,
        longStoppages: 0
      };
    }
    
    const totalStoppageTime = reportData.reduce((sum, record) => sum + record.duration, 0);
    const avgStoppageTime = Math.round(totalStoppageTime / reportData.length);
    const longStoppages = reportData.filter(record => record.duration > 60).length;
    
    return {
      totalVehicles: new Set(reportData.map(record => record.vehicle)).size,
      totalStoppageTime,
      avgStoppageTime,
      longStoppages
    };
  };

  const summaryStats = getSummaryStats();

  return (
    <>
    <Helmet>
      <title>All Vehicle Stoppage Report</title>
    </Helmet>
    <Header />
    <BottomNavbar text="All Vehicle Stoppage" />
    <div className="all-vehicle-stoppage-container">
      <div className="main-content">
        <div className="sidebar">
          <h2>Stoppage Report Parameters</h2>
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
              <label htmlFor="stopTime">Stop Time (Min) *</label>
              <input 
                type="number" 
                id="stopTime" 
                name="stopTime" 
                value={formData.stopTime} 
                onChange={handleInputChange}
                min="1"
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
        
        <div className="report-area">
          <div className="report-header">
            <h2>All Vehicle Stoppage Report</h2>
            <div className="date-range">
              {formatDateForHeader(formData.startDate)} 00:00 {formatDateForHeader(formData.endDate)} 23:59
            </div>
          </div>
          
          {isLoading ? (
            <div className="loading">
              <div className="loading-spinner"></div>
              <p>Loading report...</p>
            </div>
          ) : reportData.length === 0 ? (
            <div className="empty-report">
              <p>Click "VIEW" to generate the stoppage report</p>
            </div>
          ) : (
            <>
              <div className="report-summary">
                <div className="summary-card">
                  <h3>Total Vehicles</h3>
                  <p>{summaryStats.totalVehicles}</p>
                </div>
                <div className="summary-card">
                  <h3>Total Stoppage Time</h3>
                  <p>{summaryStats.totalStoppageTime} min</p>
                </div>
                <div className="summary-card">
                  <h3>Avg. Duration</h3>
                  <p>{summaryStats.avgStoppageTime} min</p>
                </div>
                <div className="summary-card">
                  <h3>Long Stoppages</h3>
                  <p>{summaryStats.longStoppages}</p>
                </div>
              </div>
              
              <table className="report-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Vehicle</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th>Duration (min)</th>
                    <th>Location</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.map(record => {
                    const durationPercentage = Math.min(100, (record.duration / 90) * 100);
                    return (
                      <tr key={record.id}>
                        <td>{record.id}</td>
                        <td>{record.vehicle}</td>
                        <td>{record.startTime}</td>
                        <td>{record.endTime}</td>
                        <td>
                          <div>{record.duration} min</div>
                          <div className="duration-bar">
                            <div className="duration-fill" style={{width: `${durationPercentage}%`}}></div>
                          </div>
                        </td>
                        <td>{record.location}</td>
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

export default AllVehicleStoppage;