import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/Header';
import './fuelconsumption.css';

const FuelConsumption = () => {
  // Form state
  const [formData, setFormData] = useState({
    provider: '',
    company: '',
    group: '',
    vehicles: '',
    otherSensor: '',
    fuelSensor: '',
    dateRange: {
      start: '2025-08-11T00:00',
      end: '2025-08-18T23:59'
    }
  });
  
  // UI state
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState(null);
  
  // Sample data for dropdowns
  const providers = ['Provider A', 'Provider B', 'Provider C', 'Provider D'];
  const companies = [
    'Amazon info solutions gold x - 1',
    'ERSS COMMAND & CONTRO',
    'Global Logistics Inc',
    'Transit Systems Ltd'
  ];
  const groups = ['Group A', 'Group B', 'Group C', 'All Groups'];
  const vehicles = [
    'BR01GN2115',
    'TR78JK921',
    'VL45MN876',
    'FT92CD432'
  ];
  const otherSensors = ['Sensor Type 1', 'Sensor Type 2', 'Sensor Type 3', 'None'];
  const fuelSensors = ['Fuel Sensor A', 'Fuel Sensor B', 'Fuel Sensor C', 'Standard'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      dateRange: { ...prev.dateRange, [name]: value }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setReportData({
        title: `Fuel Consumption Report for ${formData.company}`,
        dateRange: `${new Date(formData.dateRange.start).toLocaleString()} To ${new Date(formData.dateRange.end).toLocaleString()}`,
        vehicle: formData.vehicles,
        provider: formData.provider,
        fuelSensor: formData.fuelSensor,
        otherSensor: formData.otherSensor,
        // Mock data would go here
        entries: [
          { date: 'Aug 11, 2025 09:15', vehicle: 'BR01GN2115', fuel: '45.2 L', cost: '$68.50' },
          { date: 'Aug 13, 2025 14:30', vehicle: 'BR01GN2115', fuel: '38.7 L', cost: '$58.75' },
          { date: 'Aug 15, 2025 11:45', vehicle: 'BR01GN2115', fuel: '42.1 L', cost: '$63.90' },
          { date: 'Aug 18, 2025 16:20', vehicle: 'BR01GN2115', fuel: '40.5 L', cost: '$61.50' }
        ]
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <>
    <Helmet>
                <title>FuelConsumption</title>
              </Helmet>
    <Header />
    <div className="fuel-consumption-container-full">
      <div className="fuel-consumption-header-full">
        <h1>Fuel Consumption Report</h1>
        <div className="date-display">
          Date: Aug 11, 2025 00:00 To Aug 18, 2025 23:59
        </div>
      </div>
      
      <div className="fuel-consumption-content-full">
        {/* Left side - Form */}
        <div className="form-section-full">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="provider">Provider *</label>
              <select 
                id="provider"
                name="provider"
                value={formData.provider}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Provider</option>
                {providers.map(provider => (
                  <option key={provider} value={provider}>{provider}</option>
                ))}
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
                <option value="">Select Company</option>
                {companies.map(company => (
                  <option key={company} value={company}>{company}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="group">Select Group *</label>
              <select 
                id="group"
                name="group"
                value={formData.group}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Group</option>
                {groups.map(group => (
                  <option key={group} value={group}>{group}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="vehicles">Select Vehicles *</label>
              <select 
                id="vehicles"
                name="vehicles"
                value={formData.vehicles}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Vehicle</option>
                {vehicles.map(vehicle => (
                  <option key={vehicle} value={vehicle}>{vehicle}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="otherSensor">Other Sensor *</label>
              <select 
                id="otherSensor"
                name="otherSensor"
                value={formData.otherSensor}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Other Sensor</option>
                {otherSensors.map(sensor => (
                  <option key={sensor} value={sensor}>{sensor}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="fuelSensor">Fuel Sensor *</label>
              <select 
                id="fuelSensor"
                name="fuelSensor"
                value={formData.fuelSensor}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Fuel Sensor</option>
                {fuelSensors.map(sensor => (
                  <option key={sensor} value={sensor}>{sensor}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label>Start Date & Time *</label>
              <input 
                type="datetime-local" 
                name="start"
                value={formData.dateRange.start}
                onChange={handleDateChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>End Date & Time *</label>
              <input 
                type="datetime-local" 
                name="end"
                value={formData.dateRange.end}
                onChange={handleDateChange}
                required
              />
            </div>
            
            <button type="submit" className="view-button" disabled={loading}>
              {loading ? 'Loading...' : 'VIEW'}
            </button>
          </form>
        </div>
        
        {/* Right side - Results */}
        <div className="results-section-full">
          {loading ? (
            <div className="loading-indicator">
              <div className="spinner"></div>
              <p>Generating report...</p>
            </div>
          ) : reportData ? (
            <div className="report-results">
              <h2>{reportData.title}</h2>
              <div className="report-meta">
                <p><strong>Date Range:</strong> {reportData.dateRange}</p>
                <p><strong>Vehicle:</strong> {reportData.vehicle}</p>
                <p><strong>Provider:</strong> {reportData.provider}</p>
                <p><strong>Fuel Sensor:</strong> {reportData.fuelSensor}</p>
                <p><strong>Other Sensor:</strong> {reportData.otherSensor}</p>
              </div>
              
              <div className="report-table">
                <table>
                  <thead>
                    <tr>
                      <th>Date & Time</th>
                      <th>Vehicle</th>
                      <th>Fuel Amount</th>
                      <th>Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportData.entries.map((entry, index) => (
                      <tr key={index}>
                        <td>{entry.date}</td>
                        <td>{entry.vehicle}</td>
                        <td>{entry.fuel}</td>
                        <td>{entry.cost}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">📊</div>
              <h3>Report Results</h3>
              <p>Fill the form and click VIEW to generate the report</p>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default FuelConsumption;