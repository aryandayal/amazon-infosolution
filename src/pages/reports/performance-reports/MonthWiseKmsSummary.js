import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../../components/Header';
import BottomNavbar from '../../../components/BottomNavbar';
import './monthwisekmssummary.css';

const MonthWiseKmsSummary = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    provider: 'Amazon info Solution',
    company: 'ERSS COMMAND & CC',
    year: '2025',
    month: 'Aug'
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

  // Format month name for display
  const formatMonthName = (month) => {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return monthNames[month - 1] || month;
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
    const year = parseInt(formData.year);
    const month = parseInt(formData.month);
    
    // Get number of days in the selected month
    const daysInMonth = new Date(year, month, 0).getDate();
    
    // Generate data for each day in the month
    for (let day = 1; day <= daysInMonth; day++) {
      const totalDistance = Math.floor(Math.random() * 500) + 100; // 100-600 km
      const numVehicles = Math.floor(Math.random() * 15) + 5; // 5-20 vehicles
      const avgDistance = Math.round(totalDistance / numVehicles);
      
      // Generate vehicle details
      const vehicles = [];
      for (let i = 0; i < Math.min(numVehicles, 3); i++) {
        vehicles.push({
          id: i + 1,
          vehicle: generateRandomVehicle(),
          distance: Math.floor(Math.random() * 50) + 20 // 20-70 km per vehicle
        });
      }
      
      data.push({
        id: day,
        date: `${day.toString().padStart(2, '0')}-${formatMonthName(month)}-${year}`,
        totalDistance,
        numVehicles,
        avgDistance,
        vehicles
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

  // Generate year options (2020-2030)
  const yearOptions = Array.from({ length: 11 }, (_, i) => (2020 + i).toString());
  
  // Generate month options
  const monthOptions = [
    { value: '1', label: 'Jan' },
    { value: '2', label: 'Feb' },
    { value: '3', label: 'Mar' },
    { value: '4', label: 'Apr' },
    { value: '5', label: 'May' },
    { value: '6', label: 'Jun' },
    { value: '7', label: 'Jul' },
    { value: '8', label: 'Aug' },
    { value: '9', label: 'Sep' },
    { value: '10', label: 'Oct' },
    { value: '11', label: 'Nov' },
    { value: '12', label: 'Dec' }
  ];

  return (
    <>
    <Helmet>
                <title>MonthWiseKmsSummary</title>
              </Helmet>
      <Header />
      <BottomNavbar text="MonthWiseKmsSummary" />
      
      <div className="month-kms-container">
        <div className="month-content">
          <div className="month-sidebar">
            <h2>Month Wise KMS Summary</h2>
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
                <label htmlFor="year">Year *</label>
                <select 
                  id="year" 
                  name="year" 
                  value={formData.year} 
                  onChange={handleInputChange}
                  required
                >
                  {yearOptions.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="month">Month *</label>
                <select 
                  id="month" 
                  name="month" 
                  value={formData.month} 
                  onChange={handleInputChange}
                  required
                >
                  {monthOptions.map(month => (
                    <option key={month.value} value={month.value}>{month.label}</option>
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
          
          <div className="month-report">
            <div className="report-header">
              <h2>Month Wise KMS Summary Report</h2>
              <div className="report-meta">
                <div className="month-year">
                  {formatMonthName(formData.month)} {formData.year}
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
                <p>Click "VIEW" to generate the month wise KMS summary report</p>
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
                  <table className="month-table">
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
                              {day.vehicles.map(v => (
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

export default MonthWiseKmsSummary;