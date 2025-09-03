import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../../components/Header';
import BottomNavbar from '../../../components/BottomNavbar';
import './vehiclehectarereport.css';

const VehicleHectareReport = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    provider: 'Amazon info Solution',
    company: 'ERSS COMMAND & CC',
    selectedGroup: 'All',
    selectedVehicles: 'All',
    equipment: 'Power Harrow 615 PH',
    startDate: '2025-08-07',
    startTime: '00:00',
    endDate: '2025-08-14',
    endTime: '23:59'
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
      const startTime = new Date(2025, 7, 7 + Math.floor(Math.random() * 8), Math.floor(Math.random() * 24), Math.floor(Math.random() * 60));
      const duration = Math.floor(Math.random() * 240) + 30; // 30-270 minutes
      const endTime = new Date(startTime.getTime() + duration * 60000);
      const distance = Math.floor(Math.random() * 150) + 10; // 10-160 km
      
      data.push({
        id: i + 1,
        vehicle: formData.selectedVehicles === 'All' ? generateRandomVehicle() : formData.selectedVehicles,
        equipment: formData.equipment,
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

  return (
    <>
    <Helmet>
                <title>VehicleHectareReport</title>
              </Helmet>
      <Header />
      <BottomNavbar text="VehicleHectareReport" />
      
      <div className="vehicle-hectare-container">
        <div className="hectare-content">
          <div className="hectare-sidebar">
            <h2>Vehicle Hectare Report Parameters</h2>
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
                  <option value="BR01GN2115">BR01GN2115</option>
                  <option value="MH04AB1234">MH04AB1234</option>
                  <option value="DL01CD5678">DL01CD5678</option>
                  <option value="KA02EF9012">KA02EF9012</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="equipment">Equipment *</label>
                <select 
                  id="equipment" 
                  name="equipment" 
                  value={formData.equipment} 
                  onChange={handleInputChange}
                  required
                >
                  <option value="Power Harrow 615 PH">Power Harrow 615 PH</option>
                  <option value="Tractor 750 HP">Tractor 750 HP</option>
                  <option value="Harvester X200">Harvester X200</option>
                  <option value="Seeder Pro">Seeder Pro</option>
                  <option value="SprayMaster 500">SprayMaster 500</option>
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
              
              <button 
                type="button" 
                className="view-button" 
                onClick={generateReport}
              >
                VIEW
              </button>
            </form>
          </div>
          
          <div className="hectare-report">
            <div className="report-header">
              <h2>Vehicle Hectare Report</h2>
              <div className="date-range">
                Date: {formatDateForHeader(formData.startDate, formData.startTime)} To {formatDateForHeader(formData.endDate, formData.endTime)}
              </div>
            </div>
            
            {isLoading ? (
              <div className="loading">
                <div className="loading-spinner"></div>
                <p>Loading report...</p>
              </div>
            ) : reportData.length === 0 ? (
              <div className="empty-report">
                <p>Click "VIEW" to generate the vehicle hectare report</p>
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
                
                <div className="table-container">
                  <table className="hectare-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Vehicle</th>
                        <th>Equipment</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Duration</th>
                        <th>Distance (km)</th>
                        <th>Start Location</th>
                        <th>End Location</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reportData.map(record => (
                        <tr key={record.id}>
                          <td>{record.id}</td>
                          <td>{record.vehicle}</td>
                          <td>{record.equipment}</td>
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

export default VehicleHectareReport;