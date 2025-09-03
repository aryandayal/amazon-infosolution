import React, { useState } from 'react';
import { Helmet } from "react-helmet";
import Header from "../../components/Header";
import BottomNavbar from "../../components/BottomNavbar";
import './fueltimegraph.css';

const FuelTimeGraph = () => {
  // Form state
  const [formData, setFormData] = useState({
    group: "Amazon info solutions gold x - 1",
    company: "ERSS COMMAND & CONTRO",
    selectedGroup: "All",
    selectedVehicle: "BR01GN2115",
    fuelSensor: "",
    otherSensor: "",
    startDate: "11-08-2025",
    endDate: "18-08-2025",
    graphType: "Fuel Distance",
    distanceRadius: "5"
  });

  // Graph data state
  const [graphData, ] = useState([
    { time: '00:00', fuel: 75 },
    { time: '04:00', fuel: 70 },
    { time: '08:00', fuel: 65 },
    { time: '12:00', fuel: 55 },
    { time: '16:00', fuel: 45 },
    { time: '20:00', fuel: 30 },
    { time: '24:00', fuel: 20 }
  ]);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle view button click
  const handleViewClick = () => {
    // In a real app, this would fetch data based on form inputs
    console.log("View clicked with data:", formData);
  };

  // Format date for display
  const formatDate = (dateStr) => {
    const [day, month, year] = dateStr.split('-');
    const date = new Date(year, month - 1, day);
    const monthName = date.toLocaleString('default', { month: 'short' });
    return `${monthName} ${day},${year}`;
  };

  // Calculate max fuel level for scaling
  const maxFuel = Math.max(...graphData.map(item => item.fuel));

  return (
    <>
    <Helmet>
                <title>FuelTimeGraph</title>
              </Helmet>
    <Header />
    <BottomNavbar text="fuel time graph" />
    <div className="fuel-graph-container">
      {/* Report Header */}
      <div className="report-header">
        <div className="report-title">Report: Fuel Graph</div>
        <div className="report-details">
          <div className="report-item">
            <span className="label">Vehicle:</span>
            <span className="value">{formData.selectedVehicle}</span>
          </div>
          <div className="report-item">
            <span className="label">Date:</span>
            <span className="value">
              {formatDate(formData.startDate)} 00:00 to {formatDate(formData.endDate)} 23:59
            </span>
          </div>
        </div>
      </div>

      <div className="content-wrapper">
        {/* Left Panel - Form */}
        <div className="left-panel">
          <div className="form-container">
            <div className="form-grid">
              {/* Left Column */}
              <div className="form-column">
                <div className="form-group">
                  <label htmlFor="group">Group</label>
                  <input
                    type="text"
                    id="group"
                    name="group"
                    value={formData.group}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="company">Company</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="selectedGroup">Select Group</label>
                  <select
                    id="selectedGroup"
                    name="selectedGroup"
                    value={formData.selectedGroup}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="All">All</option>
                    <option value="Group A">Group A</option>
                    <option value="Group B">Group B</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="selectedVehicle">Select Vehicles</label>
                  <select
                    id="selectedVehicle"
                    name="selectedVehicle"
                    value={formData.selectedVehicle}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="BR01GN2115">BR01GN2115</option>
                    <option value="BR02GN2116">BR02GN2116</option>
                    <option value="BR03GN2117">BR03GN2117</option>
                  </select>
                </div>
              </div>

              {/* Right Column */}
              <div className="form-column">
                <div className="form-group">
                  <label htmlFor="fuelSensor">Fuel Sensor</label>
                  <select
                    id="fuelSensor"
                    name="fuelSensor"
                    value={formData.fuelSensor}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="">Select Sensor</option>
                    <option value="Sensor 1">Sensor 1</option>
                    <option value="Sensor 2">Sensor 2</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="otherSensor">Other Sensor</label>
                  <select
                    id="otherSensor"
                    name="otherSensor"
                    value={formData.otherSensor}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="">Select Sensor</option>
                    <option value="Sensor A">Sensor A</option>
                    <option value="Sensor B">Sensor B</option>
                  </select>
                </div>

                <div className="form-row">
                  <div className="form-group half">
                    <label htmlFor="startDate">Start Date</label>
                    <input
                      type="text"
                      id="startDate"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group half">
                    <label htmlFor="endDate">End Date</label>
                    <input
                      type="text"
                      id="endDate"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="graphType">Graph Type</label>
                  <select
                    id="graphType"
                    name="graphType"
                    value={formData.graphType}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="Fuel Distance">Fuel Distance</option>
                    <option value="Fuel Time">Fuel Time</option>
                    <option value="Distance Time">Distance Time</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="distanceRadius">Distance Radius</label>
                  <div className="input-with-unit">
                    <input
                      type="text"
                      id="distanceRadius"
                      name="distanceRadius"
                      value={formData.distanceRadius}
                      onChange={handleChange}
                      className="form-input"
                    />
                    <span className="unit">km</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="view-button" onClick={handleViewClick}>VIEW</button>
            </div>
          </div>
        </div>

        {/* Right Panel - Result View */}
        <div className="right-panel">
          <div className="result-container">
            <div className="result-header">
              <h3>Fuel Consumption Graph</h3>
              <div className="result-details">
                <span>Vehicle: {formData.selectedVehicle}</span>
                <span>Period: {formatDate(formData.startDate)} - {formatDate(formData.endDate)}</span>
              </div>
            </div>
            
            <div className="graph-wrapper">
              {/* Graph visualization */}
              <div className="graph">
                {/* Y-axis labels */}
                <div className="y-axis">
                  {[...Array(6)].map((_, i) => {
                    const value = Math.round((maxFuel / 5) * (5 - i));
                    return (
                      <div key={i} className="y-label">
                        {value}%
                      </div>
                    );
                  })}
                </div>
                
                {/* Graph bars */}
                <div className="bars-container">
                  {graphData.map((item, index) => (
                    <div key={index} className="bar-wrapper">
                      <div 
                        className="bar"
                        style={{ 
                          height: `${(item.fuel / maxFuel) * 100}%`,
                          backgroundColor: item.fuel > 50 ? '#4CAF50' : 
                                          item.fuel > 25 ? '#FFC107' : '#F44336'
                        }}
                      >
                        <span className="fuel-value">{item.fuel}%</span>
                      </div>
                      <div className="x-label">{item.time}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Legend */}
              <div className="legend">
                <div className="legend-item">
                  <div className="legend-color" style={{ backgroundColor: '#4CAF50' }}></div>
                  <span>High Fuel (&gt;50%)</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color" style={{ backgroundColor: '#FFC107' }}></div>
                  <span>Medium Fuel (25-50%)</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color" style={{ backgroundColor: '#F44336' }}></div>
                  <span>Low Fuel (&lt;25%)</span>
                </div>
              </div>
            </div>
            
            {/* Summary Stats */}
            <div className="stats-container">
              <div className="stat-item">
                <div className="stat-label">Initial Fuel</div>
                <div className="stat-value">{graphData[0].fuel}%</div>
              </div>
              <div className="stat-item">
                <div className="stat-label">Final Fuel</div>
                <div className="stat-value">{graphData[graphData.length - 1].fuel}%</div>
              </div>
              <div className="stat-item">
                <div className="stat-label">Fuel Consumed</div>
                <div className="stat-value">{graphData[0].fuel - graphData[graphData.length - 1].fuel}%</div>
              </div>
              <div className="stat-item">
                <div className="stat-label">Avg. Consumption</div>
                <div className="stat-value">
                  {((graphData[0].fuel - graphData[graphData.length - 1].fuel) / graphData.length).toFixed(1)}%/interval
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default FuelTimeGraph;