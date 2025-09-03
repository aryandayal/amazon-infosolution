import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from "../../components/Header";
import BottomNavbar from "../../components/BottomNavbar";
import './managegroups.css';

const ManageGroups = () => {
  // State for form inputs
  const [formData, setFormData] = useState({
    provider: '',
    company: '',
    groupName: ''
  });

  // State for table data
  const [groups, setGroups] = useState([
    { id: 1, name: 'BR01PH0713', users: 1, vehicles: 0 },
    { id: 2, name: 'ECO', users: 2, vehicles: 0 },
    { id: 3, name: 'BR01PH0714', users: 1, vehicles: 0 },
    { id: 4, name: 'BR01PH0715', users: 1, vehicles: 0 },
    { id: 5, name: 'BR01PH0716', users: 1, vehicles: 0 },
    { id: 6, name: 'BR01PH0717', users: 1, vehicles: 0 },
    { id: 7, name: 'BR01PH0718', users: 1, vehicles: 0 },
    { id: 8, name: 'BR01PH0719', users: 1, vehicles: 0 }
  ]);

  // State for editing
  const [editingId, setEditingId] = useState(null);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingId) {
      // Update existing group
      setGroups(groups.map(group => 
        group.id === editingId 
          ? { ...group, name: formData.groupName } 
          : group
      ));
      setEditingId(null);
    } else {
      // Add new group
      const newGroup = {
        id: groups.length + 1,
        name: formData.groupName,
        users: 1,
        vehicles: 0
      };
      setGroups([...groups, newGroup]);
    }
    
    // Reset form
    setFormData({
      provider: '',
      company: '',
      groupName: ''
    });
  };

  // Handle edit action
  const handleEdit = (id) => {
    const group = groups.find(g => g.id === id);
    if (group) {
      setFormData({
        provider: '',
        company: '',
        groupName: group.name
      });
      setEditingId(id);
    }
  };

  // Handle delete action
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this group?')) {
      setGroups(groups.filter(group => group.id !== id));
      if (editingId === id) {
        setEditingId(null);
        setFormData({
          provider: '',
          company: '',
          groupName: ''
        });
      }
    }
  };

  return (
    <>
     <Helmet>
            <title>ManageGroups</title>
          </Helmet>
    <Header />
    <BottomNavbar text="Manage Groups" />
    <div className="manage-container">
      <div className="manage-header">
        <h1>Add/Edit Groups</h1>
      </div>
      
      <div className="manage-form">
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="provider">Provider*</label>
              <input
                type="text"
                id="provider"
                name="provider"
                value={formData.provider}
                onChange={handleChange}
                placeholder="Enter provider"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="company">Company*</label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Enter company"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="groupName">Group Name*</label>
              <input
                type="text"
                id="groupName"
                name="groupName"
                value={formData.groupName}
                onChange={handleChange}
                placeholder="Enter group name"
                required
              />
            </div>
            
            <div className="form-actions">
              <button type="submit" className="save-button">
                {editingId ? 'UPDATE' : 'SAVE'}
              </button>
            </div>
          </div>
        </form>
      </div>
      
      <div className="manage-table">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>No.Of users</th>
              <th>No Of Vehicles</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {groups.map((group) => (
              <tr key={group.id}>
                <td>{group.id}</td>
                <td>{group.name}</td>
                <td>{group.users}</td>
                <td>{group.vehicles}</td>
                <td className="action-cell">
                  <button 
                    className="action-btn edit-btn" 
                    onClick={() => handleEdit(group.id)}
                    title="Edit"
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  <button 
                    className="action-btn delete-btn" 
                    onClick={() => handleDelete(group.id)}
                    title="Delete"
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default ManageGroups;