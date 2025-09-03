import React, { useState } from 'react';
import { Helmet } from "react-helmet";
import Header from '../../../components/Header';
import BottomNavbar from '../../../components/BottomNavbar';
import './addupdatecompany.css';

const AddUpdateCompany = () => {
  // Form state
  const [formData, setFormData] = useState({
    provider: 'Amazone Infosolution Pvt Ltd-GoldX',
    companyName: '',
    timezoneSign: '+',
    timezoneHour: '5',
    timezoneMinute: '30',
    homePageView: 'Map & Text View',
    country: 'India',
    state: 'Bihar',
    city: '',
    reminderDays: '30'
  });

  // Digital Sensors state
  const [sensors, setSensors] = useState([
    { name: 'Ignition', eventRed: 'Off', eventGreen: 'On' },
    { name: 'Battery', eventRed: 'Low', eventGreen: 'High' },
    { name: '', eventRed: '', eventGreen: '' },
    { name: '', eventRed: '', eventGreen: '' },
    { name: '', eventRed: '', eventGreen: '' },
    { name: '', eventRed: '', eventGreen: '' }
  ]);

  // Table data state
  const [companies, setCompanies] = useState([
    { id: 1, cid: 'CID001', companyName: 'ABC Logistics', stateCountry: 'Bihar/India', 
      homePageView: 'Map & Text View', historyDays: 60, reminderDays: 30, charges: '$50' },
    { id: 2, cid: 'CID002', companyName: 'XYZ Transport', stateCountry: 'Maharashtra/India', 
      homePageView: 'Text & Map View', historyDays: 45, reminderDays: 15, charges: '$45' },
    { id: 3, cid: 'CID003', companyName: 'PQR Movers', stateCountry: 'Delhi/India', 
      homePageView: 'Map & Text View', historyDays: 30, reminderDays: 20, charges: '$40' },
    { id: 4, cid: 'CID004', companyName: 'LMN Carriers', stateCountry: 'Karnataka/India', 
      homePageView: 'Text & Map View', historyDays: 90, reminderDays: 30, charges: '$60' }
  ]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle sensor input changes
  const handleSensorChange = (index, field, value) => {
    const newSensors = [...sensors];
    newSensors[index][field] = value;
    setSensors(newSensors);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would be an API call
    alert('Company information saved successfully!');
  };

  // Handle edit action
  const handleEdit = (id) => {
    alert(`Editing company with ID: ${id}`);
  };

  // Handle delete action
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this company?')) {
      setCompanies(companies.filter(company => company.id !== id));
    }
  };

  return (
    <>
    <Helmet>
            <title>AddUpdateCompany</title>
          </Helmet>
    <Header />
    <BottomNavbar text="Add/Update Company"/>
    
    <div className="company-management-container">
      <div className="left-panel">
        <div className="form-card">
          <h2>Company Information</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="provider">Provider</label>
              <select 
                id="provider" 
                name="provider"
                value={formData.provider}
                onChange={handleInputChange}
              >
                <option value="Amazone Infosolution Pvt Ltd-GoldX">Amazone Infosolution Pvt Ltd-GoldX</option>
                <option value="Other Provider">Other Provider</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="companyName">Company Name</label>
              <input 
                type="text" 
                id="companyName" 
                name="companyName"
                placeholder="company name"
                value={formData.companyName}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Time Zone (GMT)</label>
              <div className="timezone-container">
                <select 
                  name="timezoneSign"
                  value={formData.timezoneSign}
                  onChange={handleInputChange}
                >
                  <option value="+">+</option>
                  <option value="-">-</option>
                </select>
                <select 
                  name="timezoneHour"
                  value={formData.timezoneHour}
                  onChange={handleInputChange}
                >
                  {Array.from({ length: 13 }, (_, i) => i).map(hour => (
                    <option key={hour} value={hour}>{hour}</option>
                  ))}
                </select>
                <select 
                  name="timezoneMinute"
                  value={formData.timezoneMinute}
                  onChange={handleInputChange}
                >
                  <option value="00">00</option>
                  <option value="30">30</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="homePageView">Home Page View</label>
              <select 
                id="homePageView" 
                name="homePageView"
                value={formData.homePageView}
                onChange={handleInputChange}
              >
                <option value="Map & Text View">Map & Text View</option>
                <option value="Text & Map View">Text & Map View</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="country">Country</label>
              <input 
                type="text" 
                id="country" 
                name="country"
                value={formData.country}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="state">State</label>
              <input 
                type="text" 
                id="state" 
                name="state"
                value={formData.state}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="city">City</label>
              <input 
                type="text" 
                id="city" 
                name="city"
                placeholder="city name"
                value={formData.city}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="reminderDays">Recovery Reminder Days</label>
              <input 
                type="number" 
                id="reminderDays" 
                name="reminderDays"
                value={formData.reminderDays}
                onChange={handleInputChange}
              />
            </div>

            <div className="warning-text">
              History beyond 60 days will be charged extra. Please contact the administrator if you want to increase the data save history.
            </div>

            <div className="sensors-section">
              <h3>Digital Sensor</h3>
              <div className="sensors-table">
                <div className="sensors-header">
                  <div>Sensor Name</div>
                  <div>Event Red</div>
                  <div>Event Green</div>
                </div>
                {sensors.map((sensor, index) => (
                  <div key={index} className="sensor-row">
                    <input
                      type="text"
                      value={sensor.name}
                      onChange={(e) => handleSensorChange(index, 'name', e.target.value)}
                      placeholder="Sensor name"
                    />
                    <input
                      type="text"
                      value={sensor.eventRed}
                      onChange={(e) => handleSensorChange(index, 'eventRed', e.target.value)}
                      placeholder="Event Red"
                    />
                    <input
                      type="text"
                      value={sensor.eventGreen}
                      onChange={(e) => handleSensorChange(index, 'eventGreen', e.target.value)}
                      placeholder="Event Green"
                    />
                  </div>
                ))}
              </div>
            </div>

            <button type="submit" className="save-button">Save Company</button>
          </form>
        </div>
      </div>

      <div className="right-panel">
        <div className="table-container">
          <h2>Companies</h2>
          <table className="companies-table">
            <thead>
              <tr>
                <th>#</th>
                <th>CID</th>
                <th>Company Name</th>
                <th>State/Country</th>
                <th>Home Page View</th>
                <th>History Days</th>
                <th>Reminder Days</th>
                <th>Charges</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company) => (
                <tr key={company.id}>
                  <td>{company.id}</td>
                  <td>{company.cid}</td>
                  <td>{company.companyName}</td>
                  <td>{company.stateCountry}</td>
                  <td>{company.homePageView}</td>
                  <td>{company.historyDays}</td>
                  <td>{company.reminderDays}</td>
                  <td>{company.charges}</td>
                  <td className="action-buttons">
                    <button 
                      className="edit-button" 
                      onClick={() => handleEdit(company.id)}
                      title="Edit"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                      </svg>
                    </button>
                    <button 
                      className="delete-button" 
                      onClick={() => handleDelete(company.id)}
                      title="Delete"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </>
  );
};

export default AddUpdateCompany;