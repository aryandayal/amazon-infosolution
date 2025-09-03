import React, { useState } from 'react';
import { Helmet } from "react-helmet";
import Header from '../../../components/Header';
import BottomNavbar from '../../../components/BottomNavbar';
import './addupdateuser.css';

const AddUpdateUser = () => {
  // Form state
  const [formData, setFormData] = useState({
    provider: 'Amazone Infosolution Pvt Ltd-GoldX',
    company: '',
    userName: '',
    password: '',
    email: '',
    enabled: 'Yes'
  });

  // Table data state
  const [users, setUsers] = useState([
    { 
      id: 1, 
      userName: 'john.doe', 
      password: '********', 
      enabled: 'Yes', 
      vehCount: 5, 
      email: 'john.doe@example.com', 
      lastLoginDate: '2023-10-15', 
      loginCount: 42 
    },
    { 
      id: 2, 
      userName: 'jane.smith', 
      password: '********', 
      enabled: 'No', 
      vehCount: 3, 
      email: 'jane.smith@example.com', 
      lastLoginDate: '2023-10-10', 
      loginCount: 28 
    },
    { 
      id: 3, 
      userName: 'robert.johnson', 
      password: '********', 
      enabled: 'Yes', 
      vehCount: 8, 
      email: 'robert.johnson@example.com', 
      lastLoginDate: '2023-10-14', 
      loginCount: 67 
    },
    { 
      id: 4, 
      userName: 'michael.williams', 
      password: '********', 
      enabled: 'Yes', 
      vehCount: 2, 
      email: 'michael.williams@example.com', 
      lastLoginDate: '2023-10-12', 
      loginCount: 15 
    },
    { 
      id: 5, 
      userName: 'sarah.brown', 
      password: '********', 
      enabled: 'No', 
      vehCount: 6, 
      email: 'sarah.brown@example.com', 
      lastLoginDate: '2023-09-28', 
      loginCount: 33 
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

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create new user object
    const newUser = {
      id: users.length + 1,
      userName: formData.userName,
      password: '********',
      enabled: formData.enabled,
      vehCount: 0,
      email: formData.email,
      lastLoginDate: 'Never',
      loginCount: 0
    };
    
    // Add to users array
    setUsers([...users, newUser]);
    
    // Reset form
    setFormData({
      provider: 'Amazone Infosolution Pvt Ltd-GoldX',
      company: '',
      userName: '',
      password: '',
      email: '',
      enabled: 'Yes'
    });
    
    alert('User added successfully!');
  };

  // Handle edit action
  const handleEdit = (id) => {
    alert(`Editing user with ID: ${id}`);
  };

  // Handle delete action
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  // Handle assign action
  const handleAssign = (id) => {
    alert(`Assigning home page data to user with ID: ${id}`);
  };

  return (
    <>
    <Helmet>
            <title>AddUpdateUser</title>
          </Helmet>
        <Header />
        <BottomNavbar text="Add/Update Users"/>
    
    <div className="user-management-container">
      <div className="left-panel">
        <div className="form-card">
          <h2>Add User</h2>
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
              <label htmlFor="company">Company</label>
              <input 
                type="text" 
                id="company" 
                name="company"
                placeholder="Company Name"
                value={formData.company}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="userName">User Name</label>
              <input 
                type="text" 
                id="userName" 
                name="userName"
                value={formData.userName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                id="password" 
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="enabled">Enabled</label>
              <select 
                id="enabled" 
                name="enabled"
                value={formData.enabled}
                onChange={handleInputChange}
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <button type="submit" className="add-button">ADD</button>
          </form>
        </div>
      </div>

      <div className="right-panel">
        <div className="table-container">
          <h2>User Management</h2>
          <div className="table-wrapper">
            <table className="users-table">
              <thead>
                <tr>
                  <th>SN</th>
                  <th>User Name</th>
                  <th>Password</th>
                  <th>Enabled</th>
                  <th>Veh Count</th>
                  <th>Email</th>
                  <th>Last Login Date</th>
                  <th>Login Count</th>
                  <th>Assign</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user.id}>
                    <td>{index + 1}</td>
                    <td>{user.userName}</td>
                    <td>{user.password}</td>
                    <td>{user.enabled}</td>
                    <td>{user.vehCount}</td>
                    <td>{user.email}</td>
                    <td>{user.lastLoginDate}</td>
                    <td>{user.loginCount}</td>
                    <td>
                      <button 
                        className="assign-button"
                        onClick={() => handleAssign(user.id)}
                      >
                        Assign Home Page Data
                      </button>
                    </td>
                    <td className="action-buttons">
                      <button 
                        className="edit-button" 
                        onClick={() => handleEdit(user.id)}
                        title="Edit"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                      </button>
                      <button 
                        className="delete-button" 
                        onClick={() => handleDelete(user.id)}
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
    </div>
    </>
  );
};

export default AddUpdateUser;