import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../../components/Header';
import BottomNavbar from '../../../components/BottomNavbar';
import './stoppage.css';

const Stoppage = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    provider: 'Amazon info Solution',
    company: 'AJIT KUMAAR',
    vehicle: 'BR06G3789',
    startDate: '2025-08-06',
    startTime: '00:00',
    endDate: '2025-08-13',
    endTime: '23:59',
    stoppageLimitUnit: 'minute',
    stoppageLimitValue: 10
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

  // Handle radio button change for stoppage limit unit
  const handleUnitChange = (e) => {
    setFormData({
      ...formData,
      stoppageLimitUnit: e.target.value
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
      'Warehouse A', 'Distribution Center', 'Client Site', 'Service Station', 
      'Parking Lot', 'Loading Dock', 'Transit Hub', 'Maintenance Facility'
    ];
    return locations[Math.floor(Math.random() * locations.length)];
  };

  // Generate random reason
  const generateRandomReason = () => {
    const reasons = [
      'Loading/Unloading', 'Traffic Jam', 'Vehicle Maintenance', 'Driver Break',
      'Fueling', 'Documentation', 'Weather Delay', 'Route Planning'
    ];
    return reasons[Math.floor(Math.random() * reasons.length)];
  };

  // Generate mock report data
  const generateMockReportData = () => {
    const data = [];
    const stoppageLimit = formData.stoppageLimitUnit === 'minute' 
      ? parseInt(formData.stoppageLimitValue) 
      : parseInt(formData.stoppageLimitValue) * 60;
    
    // Generate random stoppage data
    const numRecords = Math.floor(Math.random() * 15) + 5; // 5-20 records
    
    for (let i = 0; i < numRecords; i++) {
      const startTime = new Date(2025, 7, 6 + Math.floor(Math.random() * 8), Math.floor(Math.random() * 24), Math.floor(Math.random() * 60));
      const duration = stoppageLimit + Math.floor(Math.random() * 60); // Stoppage duration above the limit
      const endTime = new Date(startTime.getTime() + duration * 60000);
      
      data.push({
        id: i + 1,
        vehicle: formData.vehicle,
        startTime: formatDateTime(startTime),
        endTime: formatDateTime(endTime),
        duration: duration,
        location: generateRandomLocation(),
        status: duration > 30 ? 'Long Stoppage' : 'Short Stoppage',
        reason: generateRandomReason()
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
        totalStoppages: 0,
        totalStoppageTime: 0,
        avgStoppageTime: 0,
        longStoppages: 0
      };
    }
    
    const totalStoppageTime = reportData.reduce((sum, record) => sum + record.duration, 0);
    const avgStoppageTime = Math.round(totalStoppageTime / reportData.length);
    const longStoppages = reportData.filter(record => record.duration > 30).length;
    
    return {
      totalStoppages: reportData.length,
      totalStoppageTime,
      avgStoppageTime,
      longStoppages
    };
  };

  const summaryStats = getSummaryStats();

  return (
    <>
    <Helmet>
                <title>Stoppage</title>
              </Helmet>
     <Header />
      <BottomNavbar text="Stoppage" />
    <div className="container">
      <div className="header">
        <h1>Stoppage Report System</h1>
        <div className="date-range">Report Period: <span>{dateRange}</span></div>
      </div>
      
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
              <label>Stoppage Limit</label>
              <div className="stoppage-limit-container">
                <div className="radio-group">
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="stoppageLimitUnit"
                      value="minute"
                      checked={formData.stoppageLimitUnit === 'minute'}
                      onChange={handleUnitChange}
                      className="radio-input"
                    />
                    Minute
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="stoppageLimitUnit"
                      value="hour"
                      checked={formData.stoppageLimitUnit === 'hour'}
                      onChange={handleUnitChange}
                      className="radio-input"
                    />
                    Hour
                  </label>
                </div>
                <input 
                  type="number" 
                  name="stoppageLimitValue" 
                  value={formData.stoppageLimitValue} 
                  onChange={handleInputChange}
                  min="1"
                  className="stoppage-limit-input"
                />
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
              <i className="fas fa-chart-line"></i>
              <h3>Generate Stoppage Report</h3>
              <p>Configure your report parameters and click "VIEW REPORT" to generate a stoppage report.</p>
            </div>
          ) : (
            <>
              <div className="report-header">
                <h2>Stoppage Report: {formData.vehicle}</h2>
                <div className="report-controls">
                  <button className="view-button" style={{width: 'auto', padding: '8px 15px', fontSize: '14px'}}>
                    <i className="fas fa-download"></i> Export
                  </button>
                </div>
              </div>
              
              <div className="report-summary">
                <div className="summary-card">
                  <h3>Total Stoppages</h3>
                  <p>{summaryStats.totalStoppages}</p>
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
                    <th>Status</th>
                    <th>Reason</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.map(record => {
                    const statusClass = record.status === 'Long Stoppage' ? 'status-inactive' : 'status-active';
                    const durationPercentage = Math.min(100, (record.duration / 60) * 100);
                    
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
                        <td><span className={`status-badge ${statusClass}`}>{record.status}</span></td>
                        <td>{record.reason}</td>
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

export default Stoppage;