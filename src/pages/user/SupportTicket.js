// import React from "react";
import Header from "../../components/Header";
import { Helmet } from "react-helmet";
import BottomNavbar from "../../components/BottomNavbar";


// const SupportTicket = () => {
//     return (
//         <>
//         <Header />
//         <BottomNavbar text="Support Ticket" />


// 

import React, { useState } from 'react';
import './supportticket.css';

const SupportTicket = () => {
  const [formData, setFormData] = useState({
    mobileNumber: '',
    problemType: 'Vehicle Offline',
    description: '',
    file: null
  });

  const [tickets, setTickets] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      file: e.target.files[0]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create a new ticket object
    const newTicket = {
      id: tickets.length + 1,
      mobileNumber: formData.mobileNumber,
      problemType: formData.problemType,
      description: formData.description,
      file: formData.file ? formData.file.name : 'No file attached',
      date: new Date().toLocaleDateString()
    };
    
    // Add to tickets array
    setTickets([...tickets, newTicket]);
    
    // Reset form
    setFormData({
      mobileNumber: '',
      problemType: 'Vehicle Offline',
      description: '',
      file: null
    });
    
    alert('Ticket submitted successfully!');
  };
  const handleView = () => {
    // This would typically navigate to a tickets view page
    console.log('Viewing all tickets');
  };
  return (
    <>
     <Helmet>
            <title>Support Ticket</title>
          </Helmet>
    <Header />
      <BottomNavbar text="Provider Support Ticket" />
    <div className="ticket-container">
      <div className="ticket-layout">
        {/* Left Column - Form */}
        <div className="ticket-form-column">
          <div className="ticket-form">
            <div className="form-header">
              <h2>Provider Support Ticket</h2>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-label">
                  <label htmlFor="mobileNumber">Mobile Number</label>
                </div>
                <div className="form-input">
                  <input
                    type="tel"
                    id="mobileNumber"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    placeholder="Enter mobile number"
                    required
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-label">
                  <label htmlFor="problemType">Problem Type</label>
                </div>
                <div className="form-input">
                  <select
                    id="problemType"
                    name="problemType"
                    value={formData.problemType}
                    onChange={handleChange}
                    required
                  >
                    <option value="Vehicle Offline">Vehicle Offline</option>
                    <option value="Sensor Malfunction">Sensor Malfunction</option>
                    <option value="GPS Issue">GPS Issue</option>
                    <option value="Fuel Monitoring">Fuel Monitoring</option>
                    <option value="Route Deviation">Route Deviation</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-label">
                  <label htmlFor="description">Description</label>
                </div>
                <div className="form-input">
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe your problem in detail..."
                    rows="4"
                    required
                  ></textarea>
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-label">
                  <label htmlFor="file">Attach File</label>
                </div>
                <div className="form-input file-input-container">
                  <div className="file-input-wrapper">
                    <input
                      type="file"
                      id="file"
                      name="file"
                      onChange={handleFileChange}
                      className="file-input"
                    />
                    <label htmlFor="file" className="file-input-label">
                      <span className="file-input-text">
                        {formData.file ? formData.file.name : 'Choose file'}
                      </span>
                      <span className="file-input-button">Browse</span>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="form-actions">
                <button type="submit" className="btn btn-primary">RAISE TICKET</button>
                <button type="button" className="btn btn-secondary" onClick={handleView}>VIEW</button>
              </div>
            </form>
          </div>
        </div>
        
        {/* Right Column - Results */}
        <div className="ticket-results-column">
          <div className="results-header">
            <h2>Tickets</h2>
          </div>
          
          <div className="results-content">
            {tickets.length === 0 ? (
              <div className="no-results">
                <div className="no-results-icon">
                  <i className="fas fa-inbox"></i>
                </div>
                <h3>No tickets found</h3>
                <p>Submit a ticket to see results here</p>
              </div>
            ) : (
              <div className="tickets-list">
                {tickets.map(ticket => (
                  <div key={ticket.id} className="ticket-item">
                    <div className="ticket-header">
                      <span className="ticket-id">#{ticket.id}</span>
                      <span className="ticket-date">{ticket.date}</span>
                    </div>
                    <div className="ticket-info">
                      <div className="ticket-field">
                        <span className="field-label">Mobile:</span>
                        <span className="field-value">{ticket.mobileNumber}</span>
                      </div>
                      <div className="ticket-field">
                        <span className="field-label">Problem:</span>
                        <span className="field-value">{ticket.problemType}</span>
                      </div>
                      <div className="ticket-field">
                        <span className="field-label">Description:</span>
                        <span className="field-value">{ticket.description}</span>
                      </div>
                      <div className="ticket-field">
                        <span className="field-label">Attachment:</span>
                        <span className="field-value">{ticket.file}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
     </>
  );
};

export default SupportTicket;