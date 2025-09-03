import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../../components/Header';
import BottomNavbar from '../../../components/BottomNavbar';
import './providerbilling.css';

const ProviderBilling = () => {
  const [formData, setFormData] = useState({
    provider: '',
    month: '',
    year: ''
  });

  const [billingData] = useState([
    { provider_id: 'PRV001', rental_charge: 500, email_report_charge: 50, sms_alert_charge: 30, email_alert_charge: 40, popup_alert_charge: 20, tax: 65 },
    { provider_id: 'PRV002', rental_charge: 600, email_report_charge: 60, sms_alert_charge: 35, email_alert_charge: 45, popup_alert_charge: 25, tax: 77 },
    { provider_id: 'PRV003', rental_charge: 450, email_report_charge: 45, sms_alert_charge: 25, email_alert_charge: 35, popup_alert_charge: 15, tax: 57 }
  ]);

  const [historyData] = useState([
    { id: 1, provider_id: 'PRV001', provider_name: 'Provider A', contact_person: 'John Doe', contact_mobile: '9876543210', address: '123 Main St', city: 'New York', bill_month: 'January', bill_year: '2023', total_amount: 670 },
    { id: 2, provider_id: 'PRV002', provider_name: 'Provider B', contact_person: 'Jane Smith', contact_mobile: '8765432109', address: '456 Oak Ave', city: 'Los Angeles', bill_month: 'February', bill_year: '2023', total_amount: 792 },
    { id: 3, provider_id: 'PRV003', provider_name: 'Provider C', contact_person: 'Robert Johnson', contact_mobile: '7654321098', address: '789 Pine Rd', city: 'Chicago', bill_month: 'March', bill_year: '2023', total_amount: 577 }
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleView = () => {
    console.log('View Data:', formData);
    alert('Viewing data for provider: ' + formData.provider);
  };

  const handleDownloadPDF = () => {
    alert('Downloading PDF report...');
  };

  const handleDownloadExcel = () => {
    alert('Downloading Excel report...');
  };

  const handleViewHistory = () => {
    alert('Viewing billing history...');
  };

  const handleDownloadHistoryBills = () => {
    alert('Downloading history bills...');
  };

  return (
    <>
    <Helmet>
            <title>ProviderBilling</title>
          </Helmet>
    <Header />
    <BottomNavbar text="Provider Billing"/>
    <div className="provider-billing-container">
      <div className="content-container">
        <div className="form-panel">
          {/* First Row - Input and Buttons */}
          <div className="form-row">
            <div className="form-group">
              <label>Provider</label>
              <input
                type="text"
                name="provider"
                value={formData.provider}
                onChange={handleChange}
                placeholder="Enter provider name"
              />
            </div>

            <div className="form-group">
              <label>Month</label>
              <select name="month" value={formData.month} onChange={handleChange}>
                <option value="">Select Month</option>
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
              </select>
            </div>

            <div className="form-group">
              <label>Year</label>
              <select name="year" value={formData.year} onChange={handleChange}>
                <option value="">Select Year</option>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
              </select>
            </div>

            <div className="form-group button-group">
              <button onClick={handleView}>VIEW</button>
            </div>

            <div className="form-group button-group">
              <button onClick={handleDownloadPDF}>DOWNLOAD PDF</button>
            </div>

            <div className="form-group button-group">
              <button onClick={handleDownloadExcel}>DOWNLOAD EXCEL</button>
            </div>

            <div className="form-group button-group">
              <button onClick={handleViewHistory}>VIEW HISTORY</button>
            </div>

            <div className="form-group button-group">
              <button onClick={handleDownloadHistoryBills}>DOWNLOAD HISTORY BILLS</button>
            </div>
          </div>

          {/* Second Row - First Table */}
          <div className="table-section">
            <h3>Billing Charges</h3>
            <div className="table-container">
              <table className="billing-table">
                <thead>
                  <tr>
                    <th>Provider_id</th>
                    <th>Rental Charge</th>
                    <th>Email Report Charge</th>
                    <th>SMS Alert Charge</th>
                    <th>Email Alert Charge</th>
                    <th>Popup Alert Charge</th>
                    <th>Tax</th>
                  </tr>
                </thead>
                <tbody>
                  {billingData.map((item, index) => (
                    <tr key={index}>
                      <td>{item.provider_id}</td>
                      <td>{item.rental_charge}</td>
                      <td>{item.email_report_charge}</td>
                      <td>{item.sms_alert_charge}</td>
                      <td>{item.email_alert_charge}</td>
                      <td>{item.popup_alert_charge}</td>
                      <td>{item.tax}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Third Row - Second Table */}
          <div className="table-section">
            <h3>Billing History</h3>
            <div className="table-container">
              <table className="history-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Provider_id</th>
                    <th>Provider_name</th>
                    <th>Contactperson</th>
                    <th>Contactmobile</th>
                    <th>Address</th>
                    <th>City</th>
                    <th>Billmonth</th>
                    <th>Billyear</th>
                    <th>Total_Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {historyData.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.provider_id}</td>
                      <td>{item.provider_name}</td>
                      <td>{item.contact_person}</td>
                      <td>{item.contact_mobile}</td>
                      <td>{item.address}</td>
                      <td>{item.city}</td>
                      <td>{item.bill_month}</td>
                      <td>{item.bill_year}</td>
                      <td>{item.total_amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ProviderBilling;