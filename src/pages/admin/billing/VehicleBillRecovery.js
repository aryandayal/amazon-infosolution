import React, { useState, useRef } from 'react';
import { Helmet } from "react-helmet";
import Header from '../../../components/Header';
import BottomNavbar from '../../../components/BottomNavbar';
import './vehiclebillrecovery.css';

const VehicleBillRecovery = () => {
  const [provider, setProvider] = useState('Amazon Info Solution (School)');
  const [company, setCompany] = useState('M/S TRINITY WISDOM ACADAMY F');
  const [status, setStatus] = useState('Any');
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const handleViewClick = () => {
    alert(`Viewing data for:\nProvider: ${provider}\nCompany: ${company}\nStatus: ${status}`);
  };

  const handleSampleDownload = () => {
    // Create sample CSV content
    const csvContent = "company_name,vehicle_name,recovery_date,recovery_amount,status\n" +
                      "ABC Logistics,Truck-123,2023-10-15,2500.00,Active\n" +
                      "XYZ Transport,Van-456,2023-10-16,1800.00,Active";
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'vehicle_recovery_sample.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleUpload = () => {
    if (!selectedFile) {
      alert('Please select a file first');
      return;
    }
    
    // In a real app, this would be an API call
    alert(`Uploading file: ${selectedFile.name}`);
    // Reset file input after upload
    setSelectedFile(null);
    fileInputRef.current.value = '';
  };

  return (
    <>
    <Helmet>
            <title>VehicleBillRecovery</title>
          </Helmet>
        <Header />
        <BottomNavbar />
    <div className="vehicle-recovery-container">
      <div className="input-section">
        <div className="input-group">
          <label htmlFor="provider">Provider</label>
          <input
            type="text"
            id="provider"
            value={provider}
            onChange={(e) => setProvider(e.target.value)}
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="company">Company</label>
          <input
            type="text"
            id="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Any">Any</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
        
        <button className="view-button" onClick={handleViewClick}>VIEW</button>
      </div>
      
      <div className="upload-section">
        <div className="csv-format">
          <h3>CSV Format</h3>
          <div className="csv-headers">
            company_name, vehicle_name, recovery_date, recovery_amount, status
          </div>
        </div>
        
        <div className="file-upload">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".csv"
            style={{ display: 'none' }}
          />
          <button className="browse-button" onClick={handleBrowseClick}>
            Browse
          </button>
          <span className="file-name">
            {selectedFile ? selectedFile.name : 'No file selected.'}
          </span>
        </div>
        
        <div className="action-buttons">
          <button className="sample-button" onClick={handleSampleDownload}>
            Sample
          </button>
          <button className="upload-button" onClick={handleUpload}>
            UPLOAD BULK
          </button>
        </div>
      </div>
    </div>
     </>
  );
};

export default VehicleBillRecovery;