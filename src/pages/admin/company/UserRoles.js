import React, { useState } from 'react';
import { Helmet } from "react-helmet";
import Header from '../../../components/Header';
import BottomNavbar from '../../../components/BottomNavbar';
import './userroles.css';

const UserRoles = () => {
  // Form state
  const [formData, setFormData] = useState({
    provider: 'Amazone Infosolution Pvt Ltd-GoldX',
    company: 'A TO Z SOLUTION',
    user: 'SHRIKANTKUMAR'
  });

  // Role data state
  const [roleData, setRoleData] = useState([
    {
      group: 'User',
      roles: [
        { name: 'Pop Up', order: 1, level: 1, checked: true },
        { name: 'Change Password', order: 2, level: 1, checked: true },
        { name: 'User Group Association', order: 3, level: 1, checked: false },
        { name: 'Group Vehicle Asso', order: 4, level: 1, checked: false },
        { name: 'Manage Groups', order: 5, level: 1, checked: false }
      ]
    },
    {
      group: 'Sensors',
      roles: [
        { name: 'Sensor Status Report', order: 6, level: 2, checked: true }
      ]
    },
    {
      group: 'Reports',
      roles: [
        { name: 'Event Log', order: 7, level: 2, checked: true }
      ]
    },
    {
      group: 'Basic Reports',
      roles: [
        { name: 'Stoppage', order: 8, level: 3, checked: false },
        { name: 'Overspeed', order: 9, level: 3, checked: false }
      ]
    },
    {
      group: 'Trip Summaries',
      roles: [
        { name: 'Trip Summary (Time)', order: 10, level: 3, checked: false }
      ]
    },
    {
      group: 'Map',
      roles: [
        { name: 'Map', order: 11, level: 4, checked: true }
      ]
    }
  ]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle checkbox changes
  const handleCheckboxChange = (groupIndex, roleIndex) => {
    const updatedRoleData = [...roleData];
    updatedRoleData[groupIndex].roles[roleIndex].checked = !updatedRoleData[groupIndex].roles[roleIndex].checked;
    setRoleData(updatedRoleData);
  };

  // Handle VIEW button click
  const handleViewClick = () => {
    alert(`Viewing roles for:\nProvider: ${formData.provider}\nCompany: ${formData.company}\nUser: ${formData.user}`);
  };

  // Handle SAVE button click
  const handleSaveClick = () => {
    alert('Role permissions saved successfully!');
  };

  // Handle report link click
  const handleReportLinkClick = () => {
    alert('Navigating to User Roles report');
    // In a real app, this would navigate to the report page
  };

  return (
    <>
    <Helmet>
            <title>UserRoles</title>
          </Helmet>
    <Header />
    <BottomNavbar text="User Roles"/>
    
    <div className="user-role-container">
      <div className="left-panel">
        <div className="form-card">
          <h2>User Role Management</h2>
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
            <label htmlFor="company">Company</label>
            <input 
              type="text" 
              id="company" 
              name="company"
              value={formData.company}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="user">Users</label>
            <select 
              id="user" 
              name="user"
              value={formData.user}
              onChange={handleInputChange}
            >
              <option value="SHRIKANTKUMAR">SHRIKANTKUMAR</option>
              <option value="OTHERUSER">OTHERUSER</option>
            </select>
          </div>

          <div className="button-group">
            <button className="view-button" onClick={handleViewClick}>VIEW</button>
            <button className="save-button" onClick={handleSaveClick}>SAVE</button>
          </div>
        </div>
      </div>

      <div className="right-panel">
        <div className="table-container">
          <h2>Report : <button className="report-link" onClick={handleReportLinkClick}>User Roles</button></h2>
          <div className="table-wrapper">
            <table className="roles-table">
              <thead>
                <tr>
                  <th>Roles</th>
                  <th>Role Order</th>
                  <th>Role Level</th>
                  <th>Check</th>
                </tr>
              </thead>
              <tbody>
                {roleData.map((group, groupIndex) => (
                  <React.Fragment key={groupIndex}>
                    <tr className="group-header">
                      <td colSpan="4">{group.group}</td>
                    </tr>
                    {group.roles.map((role, roleIndex) => (
                      <tr key={roleIndex} className={roleIndex % 2 === 0 ? 'even-row' : 'odd-row'}>
                        <td>{role.name}</td>
                        <td>{role.order}</td>
                        <td>{role.level}</td>
                        <td>
                          <input
                            type="checkbox"
                            checked={role.checked}
                            onChange={() => handleCheckboxChange(groupIndex, roleIndex)}
                          />
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default UserRoles;