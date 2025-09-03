import React, { useState } from 'react';
import { Helmet } from "react-helmet";
import Header from '../../../components/Header';
import BottomNavbar from '../../../components/BottomNavbar';
import './simsubscription.css';

const SimSubscription = () => {
  // Form state
  const [formData, setFormData] = useState({
    provider: 'Amazone Infosolution Pvt Ltd - GoldX',
    company: 'A TO Z SOLUTION',
    status: 'Paid',
    dueDateFrom: '2025-08-05',
    dueDateTo: '2025-08-26'
  });

  // Table data
  const [payments,] = useState([
    {
      id: 1,
      provider: 'Amazone Infosolution Pvt Ltd - GoldX',
      company: 'A TO Z SOLUTION',
      status: 'Paid',
      dueDate: '2025-08-10',
      amount: '$150.00'
    },
    {
      id: 2,
      provider: 'Amazone Infosolution Pvt Ltd - GoldX',
      company: 'A TO Z SOLUTION',
      status: 'Paid',
      dueDate: '2025-08-15',
      amount: '$200.00'
    },
    {
      id: 3,
      provider: 'Amazone Infosolution Pvt Ltd - GoldX',
      company: 'A TO Z SOLUTION',
      status: 'Paid',
      dueDate: '2025-08-20',
      amount: '$175.50'
    }
  ]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSearch = () => {
    console.log('Search clicked', formData);
  };

  const handleAddPayment = () => {
    console.log('Add Payment clicked');
  };

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = payments.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(payments.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Options
  const providerOptions = [
    'Amazone Infosolution Pvt Ltd - GoldX',
    'Telecom Solutions',
    'Mobile Networks Inc'
  ];
  
  const companyOptions = [
    'A TO Z SOLUTION',
    'Tech Corp',
    'Global Services'
  ];
  
  const statusOptions = [
    'Paid',
    'Pending',
    'Overdue'
  ];

  return (
    
    <>
    <Helmet>
            <title>ProCustomerBilling</title>
          </Helmet>
    <div className="sim-subscription-container">``
        <Header />
        <BottomNavbar text="SimSubscription" />
      
      {/* Query Form */}
      <div className="query-form">
        <div className="form-grid">  
          <div className="form-group">
            <label>Provider</label>
            <select 
              name="provider" 
              value={formData.provider} 
              onChange={handleChange}
              className="form-control"
            >
              {providerOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label>Company</label>
            <select 
              name="company" 
              value={formData.company} 
              onChange={handleChange}
              className="form-control"
            >
              {companyOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label>Status</label>
            <select 
              name="status" 
              value={formData.status} 
              onChange={handleChange}
              className="form-control"
            >
              {statusOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label>Due Date From</label>
            <input 
              type="date" 
              name="dueDateFrom" 
              value={formData.dueDateFrom} 
              onChange={handleChange}
              className="form-control"
            />
          </div>
          
          <div className="form-group">
            <label>Due Date To</label>
            <input 
              type="date" 
              name="dueDateTo" 
              value={formData.dueDateTo} 
              onChange={handleChange}
              className="form-control"
            />
          </div>
          
          <div className="button-group">
            <button onClick={handleSearch} className="btn btn-primary">SEARCH</button>
            <button onClick={handleAddPayment} className="btn btn-secondary">ADD PAYMENT</button>
          </div>
        </div>
      </div>

      {/* Results Table */}
      <div className="table-container">
        <table className="payment-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Provider</th>
              <th>Company</th>
              <th>Status</th>
              <th>Due Date</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((payment) => (
              <tr key={payment.id}>
                <td>{payment.id}</td>
                <td>{payment.provider}</td>
                <td>{payment.company}</td>
                <td>
                  <span className={`status-badge ${payment.status.toLowerCase()}`}>
                    {payment.status}
                  </span>
                </td>
                <td>{payment.dueDate}</td>
                <td>{payment.amount}</td>
                <td>
                  <button className="action-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="1"></circle>
                      <circle cx="12" cy="5" r="1"></circle>
                      <circle cx="12" cy="19" r="1"></circle>
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Pagination */}
        <div className="pagination">
          <button 
            onClick={() => paginate(currentPage - 1)} 
            disabled={currentPage === 1}
            className="pagination-btn"
          >
            Previous
          </button>
          <span className="page-info">
            Page {currentPage} of {totalPages}
          </span>
          <button 
            onClick={() => paginate(currentPage + 1)} 
            disabled={currentPage === totalPages}
            className="pagination-btn"
          >
            Next
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default SimSubscription;