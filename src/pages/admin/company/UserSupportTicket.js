import React, { useState } from 'react';
import { Helmet } from "react-helmet";
import Header from '../../../components/Header';
import BottomNavbar from '../../../components/BottomNavbar';
import './usersupportticket.css';

const UserSupportTicket = () => {
  // Form state
  const [formData, setFormData] = useState({
    select: 'Show Ticket',
    provider: 'Amazone Infosolution Pvt Ltd-GoldX',
    company: 'All',
    user: 'All Users',
    startDate: '2023-08-28',
    endDate: '2025-08-28',
    status: 'All'
  });

  // Additional fields for raising a ticket
  const [raiseTicketFields, setRaiseTicketFields] = useState({
    email: '',
    mobile: '',
    problemType: 'Software Error',
    description: '',
    attachment: null
  });

  // Table data state
  const [tickets, setTickets] = useState([
    {
      id: 1,
      companyName: 'ABC Logistics',
      userName: 'john.doe',
      entryTime: '2023-10-15 10:30:45',
      mobile: '9876543210',
      email: 'john.doe@example.com',
      status: 'Pending',
      issueType: 'Software Error',
      details: 'System is not responding when trying to generate reports. The application freezes and needs to be restarted.',
      attachment: '',
      remarks: ''
    },
    {
      id: 2,
      companyName: 'XYZ Transport',
      userName: 'jane.smith',
      entryTime: '2023-10-14 14:22:33',
      mobile: '9876543211',
      email: 'jane.smith@example.com',
      status: 'Completed',
      issueType: 'Hardware Issue',
      details: 'GPS device not sending data. The device appears to be offline in the system.',
      attachment: '',
      remarks: 'Replaced the GPS device. Issue resolved.'
    },
    {
      id: 3,
      companyName: 'PQR Movers',
      userName: 'robert.johnson',
      entryTime: '2023-10-13 09:15:27',
      mobile: '9876543212',
      email: 'robert.johnson@example.com',
      status: 'Pending',
      issueType: 'Account Access',
      details: 'Unable to login to the system. Getting invalid credentials error even with correct password.',
      attachment: '',
      remarks: ''
    },
    {
      id: 4,
      companyName: 'LMN Carriers',
      userName: 'michael.williams',
      entryTime: '2023-10-12 16:45:12',
      mobile: '9876543213',
      email: 'michael.williams@example.com',
      status: 'In Progress',
      issueType: 'Data Discrepancy',
      details: 'Vehicle mileage shown in reports does not match actual mileage recorded. There is a significant difference.',
      attachment: '',
      remarks: 'Investigating data source. Will update soon.'
    },
    {
      id: 5,
      companyName: 'EFG Express',
      userName: 'sarah.brown',
      entryTime: '2023-10-11 11:20:08',
      mobile: '9876543214',
      email: 'sarah.brown@example.com',
      status: 'Pending',
      issueType: 'UI/UX Problem',
      details: 'The new dashboard layout is confusing. Cannot find the reports section easily.',
      attachment: '',
      remarks: ''
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

  // Handle raise ticket fields changes
  const handleRaiseTicketChange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === 'attachment') {
      setRaiseTicketFields({
        ...raiseTicketFields,
        [name]: files[0] || null
      });
    } else {
      setRaiseTicketFields({
        ...raiseTicketFields,
        [name]: value
      });
    }
  };

  // Handle remarks change for a ticket
  const handleRemarksChange = (id, value) => {
    const updatedTickets = tickets.map(ticket => 
      ticket.id === id ? { ...ticket, remarks: value } : ticket
    );
    setTickets(updatedTickets);
  };

  // Handle SEARCH button click
  const handleSearchClick = () => {
    if (formData.select === 'Raise Ticket') {
      // In a real app, this would submit the new ticket
      alert(`Raising new ticket:\nEmail: ${raiseTicketFields.email}\nMobile: ${raiseTicketFields.mobile}\nProblem Type: ${raiseTicketFields.problemType}\nDescription: ${raiseTicketFields.description}\nAttachment: ${raiseTicketFields.attachment ? raiseTicketFields.attachment.name : 'None'}`);
    } else {
      alert(`Searching tickets with filters:\nProvider: ${formData.provider}\nCompany: ${formData.company}\nUser: ${formData.user}\nDate Range: ${formData.startDate} to ${formData.endDate}\nStatus: ${formData.status}`);
    }
  };

  // Handle Update remark click
  const handleUpdateRemark = (id) => {
    const ticket = tickets.find(t => t.id === id);
    alert(`Updating remark for ticket #${id}: ${ticket.remarks}`);
  };

  // Handle Complete ticket click
  const handleCompleteTicket = (id) => {
    const updatedTickets = tickets.map(ticket => 
      ticket.id === id ? { ...ticket, status: 'Completed' } : ticket
    );
    setTickets(updatedTickets);
    alert(`Ticket #${id} marked as completed!`);
  };

  return (
    <>
    <Helmet>
            <title>UserSupportTicket</title>
          </Helmet>
    <Header />
    <BottomNavbar text="User Support Ticket"/>
   
    <div className="support-ticket-container">
      <div className="left-panel">
        <div className="form-card">
          <h2>Support Ticket</h2>
          
          <div className="form-group">
            <label htmlFor="select">Select</label>
            <select 
              id="select" 
              name="select"
              value={formData.select}
              onChange={handleInputChange}
            >
              <option value="Show Ticket">Show Ticket</option>
              <option value="Raise Ticket">Raise Ticket</option>
            </select>
          </div>

          {formData.select === 'Show Ticket' && (
            <>
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
                <select 
                  id="company" 
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                >
                  <option value="All">All</option>
                  <option value="ABC Logistics">ABC Logistics</option>
                  <option value="XYZ Transport">XYZ Transport</option>
                  <option value="PQR Movers">PQR Movers</option>
                  <option value="LMN Carriers">LMN Carriers</option>
                  <option value="EFG Express">EFG Express</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="user">User</label>
                <select 
                  id="user" 
                  name="user"
                  value={formData.user}
                  onChange={handleInputChange}
                >
                  <option value="All Users">All Users</option>
                  <option value="john.doe">john.doe</option>
                  <option value="jane.smith">jane.smith</option>
                  <option value="robert.johnson">robert.johnson</option>
                  <option value="michael.williams">michael.williams</option>
                  <option value="sarah.brown">sarah.brown</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="startDate">Start Date</label>
                <input 
                  type="date" 
                  id="startDate" 
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="endDate">End Date</label>
                <input 
                  type="date" 
                  id="endDate" 
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="status">Status</label>
                <select 
                  id="status" 
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                >
                  <option value="All">All</option>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </>
          )}

          {/* Additional fields for raising a ticket */}
          {formData.select === 'Raise Ticket' && (
            <>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  value={raiseTicketFields.email}
                  onChange={handleRaiseTicketChange}
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="mobile">Mobile</label>
                <input 
                  type="tel" 
                  id="mobile" 
                  name="mobile"
                  value={raiseTicketFields.mobile}
                  onChange={handleRaiseTicketChange}
                  placeholder="Enter mobile number"
                  pattern="[0-9]{10}"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="problemType">Problem Type</label>
                <select 
                  id="problemType" 
                  name="problemType"
                  value={raiseTicketFields.problemType}
                  onChange={handleRaiseTicketChange}
                  required
                >
                  <option value="Software Error">Software Error</option>
                  <option value="Hardware Issue">Hardware Issue</option>
                  <option value="Account Access">Account Access</option>
                  <option value="Data Discrepancy">Data Discrepancy</option>
                  <option value="UI/UX Problem">UI/UX Problem</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea 
                  id="description" 
                  name="description"
                  value={raiseTicketFields.description}
                  onChange={handleRaiseTicketChange}
                  placeholder="Describe your issue in detail"
                  rows={4}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="attachment">Attach File</label>
                <div className="file-upload-container">
                  <input 
                    type="file" 
                    id="attachment" 
                    name="attachment"
                    onChange={handleRaiseTicketChange}
                    className="file-input"
                  />
                  <label htmlFor="attachment" className="file-input-label">
                    {raiseTicketFields.attachment ? raiseTicketFields.attachment.name : 'Browse Files'}
                  </label>
                </div>
              </div>
            </>
          )}

          <button className="search-button" onClick={handleSearchClick}>
            {formData.select === 'Raise Ticket' ? 'RAISE TICKET' : 'SEARCH'}
          </button>
        </div>
      </div>

      <div className="right-panel">
        <div className="table-container">
          <h2>Support Tickets</h2>
          <div className="table-wrapper">
            <table className="tickets-table">
              <thead>
                <tr>
                  <th>SN.</th>
                  <th>Company Name</th>
                  <th>User Name</th>
                  <th>Entry Time</th>
                  <th>Mobile</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Issue Type</th>
                  <th>Details</th>
                  <th>Attachment</th>
                  <th>Remarks</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket, index) => (
                  <tr key={ticket.id} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                    <td>{index + 1}</td>
                    <td>{ticket.companyName}</td>
                    <td>{ticket.userName}</td>
                    <td>{ticket.entryTime}</td>
                    <td>{ticket.mobile}</td>
                    <td>{ticket.email}</td>
                    <td>
                      <span className={`status-badge ${ticket.status.toLowerCase().replace(' ', '-')}`}>
                        {ticket.status}
                      </span>
                    </td>
                    <td>{ticket.issueType}</td>
                    <td className="details-cell">{ticket.details}</td>
                    <td>{ticket.attachment}</td>
                    <td className="remarks-cell">
                      <textarea 
                        value={ticket.remarks}
                        onChange={(e) => handleRemarksChange(ticket.id, e.target.value)}
                        placeholder="Add remarks..."
                        rows={2}
                      />
                      <div className="remark-actions">
                        <button 
                          className="update-link"
                          onClick={() => handleUpdateRemark(ticket.id)}
                        >
                          Update
                        </button>
                        <button 
                          className="complete-link"
                          onClick={() => handleCompleteTicket(ticket.id)}
                        >
                          COMPLETE
                        </button>
                      </div>
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

export default UserSupportTicket;