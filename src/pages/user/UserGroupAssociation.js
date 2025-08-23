import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from "../../components/Header";
import BottomNavbar from "../../components/BottomNavbar";
import './usergroupassociation.css';

const UserGroupAssociation = () => {
  const [selections, setSelections] = useState({
    provider: '',
    company: '',
    user: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelections(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', selections);
    alert(`Form submitted with selections: ${JSON.stringify(selections)}`);
  };

  // Sample data for dropdowns
  const ProviderOptions = [
    "Amazon Info Solution (School)",
    "M'S TRINITY WISDOM ACADAMY PVT. LTD",
    "Global Tech Solutions",
    "Education First Inc.",
    "Learning Systems Ltd."
  ];

  const companyOptions = [
    "BR01PH0713",
    "AD02MU0845",
    "CH03BE0921",
    "DE04HA0156",
    "FR05LY0342"
  ];

  const userOptions = [
    "New York",
    "London",
    "Tokyo",
    "Sydney",
    "Berlin",
    "Paris",
    "Toronto"
  ];

  return (
    <>
     <Helmet>
            <title>User Group Association</title>
          </Helmet>
    <Header />
        <BottomNavbar text="User Group Association" />
    <div className="file-container">
      {/* Left Sidebar (40%) */}
      <div className="left-sidebar">
        <div className="sidebar-header">
          <p>Select options to filter</p>
        </div>
        
        <form onSubmit={handleSubmit} className="sidebar-form">
          {/* Provider Dropdown */}
          <div className="form-group">
            <label htmlFor="Provider">Provider</label>
            <select
              id="Provider"
              name="Provider"
              value={selections.Provider}
              onChange={handleChange}
            >
              <option value="">Select a Provider</option>
              {ProviderOptions.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
          </div>
          
          {/* company Dropdown */}
          <div className="form-group">
            <label htmlFor="company">company</label>
            <select
              id="company"
              name="company"
              value={selections.company}
              onChange={handleChange}
            >
              <option value="">Select a company</option>
              {companyOptions.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
          </div>
          
          {/* User Dropdown */}
          <div className="form-group">
            <label htmlFor="user">Select User</label>
            <select
              id="user"
              name="user"
              value={selections.user}
              onChange={handleChange}
            >
              <option value="">Select user</option>
              {userOptions.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
          </div>
          
         
                  
          <button type="submit" className="submit-btn">View</button>
        </form>
      </div>
      
      {/* Right Content (60%) - Blank */}
      <div className="right-content">
        <div className="blank-area">
          <div className="placeholder-content">
            <p>Select filters on the left to be display here</p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default UserGroupAssociation;