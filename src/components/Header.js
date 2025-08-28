// import React from 'react';
// import { Link } from 'react-router-dom';
// import './header.css';
// import Logo from '../assets/logo.png'

// const Header = () => {
  
//   return (
//     <header className="header">
//       <div className="logo-container">
//           <img className="logo" src={Logo} alt="logo" />
//       </div>
      
//       <nav className="nav-menu">
//         <ul className="nav-list">
//           {/* HOME - Normal Link */}
//           <li className="nav-item">
//             <Link to="/" className="nav-link">
//               <i className="fas fa-home"></i> HOME
//             </Link>
//           </li>
          
//           {/* USER - Dropdown with 6 menus */}
//           <li className="nav-item dropdown">
//             <Link to="#" className="nav-link">
//               <i className="fas fa-user"></i> USER <i className="fas fa-chevron-down"></i>
//             </Link>
//             <ul className="dropdown-menu">
//               <li><Link to="/user/change-cp-password">Change CP Password</Link></li>
//               <li><Link to="/user/pop-up">POP Up</Link></li>
//               <li><Link to="/user/user-group-association">User Group Association</Link></li>
//               <li><Link to="/user/group-vehicle-asso">Group Vehicles ASSO</Link></li>
//               <li><Link to="/user/manage-groups">Manage Groups</Link></li>
//               <li><Link to="/user/support-ticket">Support Ticket</Link></li>
//             </ul>
//           </li>
          
//           {/* SENSORS - Dropdown with 2 menus */}
//           <li className="nav-item dropdown">
//             <Link to="#" className="nav-link">
//               <i className="fas fa-satellite-dish"></i> SENSORS <i className="fas fa-chevron-down"></i>
//             </Link>
//             <ul className="dropdown-menu">
//               <li><Link to="/sensors/sensor-status-report">Sensor Status Report</Link></li>
//               <li><Link to="/sensors/unauthorised-sensor-usage">Anauthorised Sensor Usage</Link></li>
//             </ul>
//           </li>
          
//           {/* REPORTS - Dropdown with 4 menus and sub-menus */}
//           <li className="nav-item dropdown">
//             <Link to="#" className="nav-link">
//               <i className="fas fa-chart-bar"></i> REPORTS <i className="fas fa-chevron-down"></i>
//             </Link>
//             <ul className="dropdown-menu">
//               <li><Link to="/reports/event-logs">Event Logs</Link></li>
              
//               {/* 2nd menu with 3 dropright menus */}
//               <li className="dropdown-submenu">
//                 <Link to="#">
//                   Basic Reports <i className="fas fa-chevron-right"></i>
//                 </Link>
//                 <ul className="dropright-menu">
//                   <li><Link to="/reports/basic-reports/stoppage">Stoppage</Link></li>
//                   <li><Link to="/reports/basic-reports/overspeed">Overspeed</Link></li>
//                   <li><Link to="/reports/basic-reports/all-vehicle-stoppage-report">All Vehicle Stoppage Report</Link></li>
//                 </ul>
//               </li>
              
//               {/* 3rd menu with 3 dropright menus */}
//               <li className="dropdown-submenu">
//                 <Link to="#">
//                   Trip Summaries <i className="fas fa-chevron-right"></i>
//                 </Link>
//                 <ul className="dropright-menu">
//                   <li><Link to="/reports/trip-summary-site">Trip Summary (Site)</Link></li>
//                   <li><Link to="/reports/trip-summary-location">Trip Summary (Location)</Link></li>
//                   <li><Link to="/reports/trip-summary-time">Trip Summary (Time)</Link></li>
//                 </ul>
//               </li>
              
//               {/* 4th menu with 5 dropright menus */}
//               <li className="dropdown-submenu">
//                 <Link to="#">
//                   Performace Reports <i className="fas fa-chevron-right"></i>
//                 </Link>
//                 <ul className="dropright-menu">
//                   <li><Link to="/reports/performance-reports/vehicle-performance">Vehicle Performance</Link></li>
//                   <li><Link to="/reports/performance-reports/kms-summary">KMS Summary</Link></li>
//                   <li><Link to="/reports/performance-reports/fleet-day-wise-kms-summary">Fleet Day Wise KMS Summary</Link></li>
//                   <li><Link to="/reports/performance-reports/month-wise-kms-summary">Month Wise KMS Summary</Link></li>
//                   <li><Link to="/reports/performance-reports/vehicle-hectare-report">Vehicle Hectare Report</Link></li>
//                 </ul>
//               </li>
//             </ul>
//           </li>
          
//           {/* MAP - Dropdown with 3 menus */}
//           <li className="nav-item dropdown">
//             <Link to="#" className="nav-link">
//               <i className="fas fa-map-marked-alt"></i> MAP <i className="fas fa-chevron-down"></i>
//             </Link>
//             <ul className="dropdown-menu">
//               <li><Link to="/map/route-mapper">Route Mapper</Link></li>
//               <li><Link to="/map/site-details">Site Details</Link></li>
//               <li><Link to="/map/history-tracking">History Tracking</Link></li>
//             </ul>
//           </li>
          
//           {/* FUEL - Dropdown with 4 menus */}
//           <li className="nav-item dropdown">
//             <Link to="#" className="nav-link">
//               <i className="fas fa-gas-pump"></i> FUEL <i className="fas fa-chevron-down"></i>
//             </Link>
//             <ul className="dropdown-menu">
//               <li><Link to="/fuel/fuel-distance-graph">Fuel Distance Graph</Link></li>
//               <li><Link to="/fuel/fuel-time-graph">Fuel Time Graph</Link></li>
//               <li><Link to="/fuel/fuel-fill">Fuel Fill</Link></li>
//               <li><Link to="/fuel/fuel-removal">Fuel Removal</Link></li>
//                <li><Link to="/fuel/fuel-consumption">Fuel Consumption</Link></li>
//             </ul>
//           </li>
          
//           {/* ROUTES - Dropdown with 4 menus */}
//           <li className="nav-item dropdown">
//             <Link to="#" className="nav-link">
//               <i className="fas fa-directions"></i> ROUTES <i className="fas fa-chevron-down"></i>
//             </Link>
//             <ul className="dropdown-menu">
//               <li><Link to="/routes/add-route">Add Route</Link></li>
//               <li><Link to="/routes/route-list">Route List</Link></li>
//               <li><Link to="/routes/restricted-route-list">Restricted Route List</Link></li>
//               <li><Link to="/routes/route-deviation">Route Deviation (Assigned)</Link></li>
//             </ul>
//           </li>
          
//           {/* ADMIN - Dropdown with 4 menus and sub-menus */}
//           <li className="nav-item dropdown">
//             <Link to="#" className="nav-link">
//               <i className="fas fa-user-shield"></i> ADMIN <i className="fas fa-chevron-down"></i>
//             </Link>
//             <ul className="dropdown-menu">
//               <li><Link to="/admin/device-status">Device Status</Link></li>
              
//               {/* 2nd menu with 5 dropright menus */}
//               <li className="dropdown-submenu">
//                 <Link to="#">
//                   Vehicles <i className="fas fa-chevron-right"></i>
//                 </Link>
//                 <ul className="dropright-menu">
//                   <li><Link to="/admin/vehicles/manage-devices">Manage Devices</Link></li>
//                   <li><Link to="/admin/vehicles/imei-map-with-vehicles">IMEI Map with Vehicles</Link></li>
//                   <li><Link to="/admin/vehicles/add-edit-vehicles">Add/Edit Vehicles</Link></li>
//                   <li><Link to="/admin/vehicles/check-imei-status">Check IMEI Status</Link></li>
//                   <li><Link to="/admin/vehicles/add-new-devices-vehicles">Add New Device & Vehicles (Short)</Link></li>
//                 </ul>
//               </li>
              
//               {/* 3rd menu with 4 dropright menus */}
//               <li className="dropdown-submenu">
//                 <Link to="#">
//                   Billing <i className="fas fa-chevron-right"></i>
//                 </Link>
//                 <ul className="dropright-menu">
//                   <li><Link to="/admin/billing/provider-billing">Provider Billing</Link></li>
//                   <li><Link to="/admin/billing/sim-subscription">Sim Subscription</Link></li>
//                   <li><Link to="/admin/billing/pro-customer-billing">Pro Customer Billing</Link></li>
//                   <li><Link to="/admin/billing/vehicle-bill-recovery">Vehicle Bill Recovery</Link></li>
//                 </ul>
//               </li>
              
//               {/* 4th menu with 4 dropright menus */}
//               <li className="dropdown-submenu">
//                 <Link to="#">
//                   Company <i className="fas fa-chevron-right"></i>
//                 </Link>
//                 <ul className="dropright-menu">
//                   <li><Link to="/admin/company/add-update-company">Add/Update Company</Link></li>
//                   <li><Link to="/admin/company/add-update-users">Add/Update Users</Link></li>
//                   <li><Link to="/admin/company/user-roles"> User Roles</Link></li>
//                   <li><Link to="/admin/company/user-support-ticket">User Support Ticket</Link></li>
//                 </ul>
//               </li>
//             </ul>
//           </li>
//         </ul>
        
//         {/* Icon Buttons */}
//         <div className="icon-buttons">
//           {/* Admin Icon - Normal Link */}
//           <Link to="/admin/settings" className="icon-btn admin-icon">
//             <i className="fas fa-user-cog"></i>
//           </Link>
          
//           {/* Support Info Icon - Normal Link */}
//           <Link to="/support" className="icon-btn support-icon">
//             <i className="fas fa-info-circle"></i>
//           </Link>
          
//           {/* Admin Icon with Dropdown */}
//           <div className="nav-item dropdown">
//             <Link to="#" className="icon-btn admin-dropdown-icon">
//               <i className="fas fa-user-shield"></i>
//             </Link>
//             <ul className="dropdown-menu">
//               <li><Link to="/admin/overview"><i className="fas fa-tachometer-alt"></i> Admin Overview</Link></li>
//             </ul>
//           </div>
          
//           {/* Logout Icon - Normal Link */}
//           <Link to="/logout" className="icon-btn logout-icon">
//             <i className="fas fa-sign-out-alt"></i>
//           </Link>
//         </div>
//       </nav>
//     </header>
//   );
// };

// export default Header;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import Logo from '../assets/logo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Close all dropdowns when closing the menu
    if (isMenuOpen) {
      setActiveDropdown(null);
      setActiveSubmenu(null);
    }
  };

  const toggleDropdown = (index) => {
    if (activeDropdown === index) {
      setActiveDropdown(null);
      setActiveSubmenu(null);
    } else {
      setActiveDropdown(index);
      setActiveSubmenu(null);
    }
  };

  const toggleSubmenu = (index) => {
    if (activeSubmenu === index) {
      setActiveSubmenu(null);
    } else {
      setActiveSubmenu(index);
    }
  };

  return (
    <header className="header">
      <div className="logo-container">
        <img className="logo" src={Logo} alt="logo" />
        <button className="hamburger" onClick={toggleMenu}>
          <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>
      </div>
      
      <nav className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
        <ul className="nav-list">
          {/* HOME - Normal Link */}
          <li className="nav-item">
            <Link to="/" className="nav-link">
              <i className="fas fa-home"></i> HOME
            </Link>
          </li>
          
          {/* USER - Dropdown with 6 menus */}
          <li className={`nav-item dropdown ${activeDropdown === 0 ? 'active' : ''}`}>
            <Link 
              to="#" 
              className="nav-link" 
              onClick={(e) => {
                e.preventDefault();
                toggleDropdown(0);
              }}
            >
              <i className="fas fa-user"></i> USER <i className="fas fa-chevron-down"></i>
            </Link>
            <ul className="dropdown-menu">
              <li><Link to="/user/change-cp-password">Change CP Password</Link></li>
              <li><Link to="/user/pop-up">POP Up</Link></li>
              <li><Link to="/user/user-group-association">User Group Association</Link></li>
              <li><Link to="/user/group-vehicle-asso">Group Vehicles ASSO</Link></li>
              <li><Link to="/user/manage-groups">Manage Groups</Link></li>
              <li><Link to="/user/support-ticket">Support Ticket</Link></li>
            </ul>
          </li>
          
          {/* SENSORS - Dropdown with 2 menus */}
          <li className={`nav-item dropdown ${activeDropdown === 1 ? 'active' : ''}`}>
            <Link 
              to="#" 
              className="nav-link" 
              onClick={(e) => {
                e.preventDefault();
                toggleDropdown(1);
              }}
            >
              <i className="fas fa-satellite-dish"></i> SENSORS <i className="fas fa-chevron-down"></i>
            </Link>
            <ul className="dropdown-menu">
              <li><Link to="/sensors/sensor-status-report">Sensor Status Report</Link></li>
              <li><Link to="/sensors/unauthorised-sensor-usage">Anauthorised Sensor Usage</Link></li>
            </ul>
          </li>
          
          {/* REPORTS - Dropdown with 4 menus and sub-menus */}
          <li className={`nav-item dropdown ${activeDropdown === 2 ? 'active' : ''}`}>
            <Link 
              to="#" 
              className="nav-link" 
              onClick={(e) => {
                e.preventDefault();
                toggleDropdown(2);
              }}
            >
              <i className="fas fa-chart-bar"></i> REPORTS <i className="fas fa-chevron-down"></i>
            </Link>
            <ul className="dropdown-menu">
              <li><Link to="/reports/event-logs">Event Logs</Link></li>
              
              {/* 2nd menu with 3 dropright menus */}
              <li className={`dropdown-submenu ${activeSubmenu === 0 ? 'active' : ''}`}>
                <Link 
                  to="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    toggleSubmenu(0);
                  }}
                >
                  Basic Reports <i className="fas fa-chevron-right"></i>
                </Link>
                <ul className="dropright-menu">
                  <li><Link to="/reports/basic-reports/stoppage">Stoppage</Link></li>
                  <li><Link to="/reports/basic-reports/overspeed">Overspeed</Link></li>
                  <li><Link to="/reports/basic-reports/all-vehicle-stoppage-report">All Vehicle Stoppage Report</Link></li>
                </ul>
              </li>
              
              {/* 3rd menu with 3 dropright menus */}
              <li className={`dropdown-submenu ${activeSubmenu === 1 ? 'active' : ''}`}>
                <Link 
                  to="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    toggleSubmenu(1);
                  }}
                >
                  Trip Summaries <i className="fas fa-chevron-right"></i>
                </Link>
                <ul className="dropright-menu">
                  <li><Link to="/reports/trip-summary-site">Trip Summary (Site)</Link></li>
                  <li><Link to="/reports/trip-summary-location">Trip Summary (Location)</Link></li>
                  <li><Link to="/reports/trip-summary-time">Trip Summary (Time)</Link></li>
                </ul>
              </li>
              
              {/* 4th menu with 5 dropright menus */}
              <li className={`dropdown-submenu ${activeSubmenu === 2 ? 'active' : ''}`}>
                <Link 
                  to="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    toggleSubmenu(2);
                  }}
                >
                  Performace Reports <i className="fas fa-chevron-right"></i>
                </Link>
                <ul className="dropright-menu">
                  <li><Link to="/reports/performance-reports/vehicle-performance">Vehicle Performance</Link></li>
                  <li><Link to="/reports/performance-reports/kms-summary">KMS Summary</Link></li>
                  <li><Link to="/reports/performance-reports/fleet-day-wise-kms-summary">Fleet Day Wise KMS Summary</Link></li>
                  <li><Link to="/reports/performance-reports/month-wise-kms-summary">Month Wise KMS Summary</Link></li>
                  <li><Link to="/reports/performance-reports/vehicle-hectare-report">Vehicle Hectare Report</Link></li>
                </ul>
              </li>
            </ul>
          </li>
          
          {/* MAP - Dropdown with 3 menus */}
          <li className={`nav-item dropdown ${activeDropdown === 3 ? 'active' : ''}`}>
            <Link 
              to="#" 
              className="nav-link" 
              onClick={(e) => {
                e.preventDefault();
                toggleDropdown(3);
              }}
            >
              <i className="fas fa-map-marked-alt"></i> MAP <i className="fas fa-chevron-down"></i>
            </Link>
            <ul className="dropdown-menu">
              <li><Link to="/map/route-mapper">Route Mapper</Link></li>
              <li><Link to="/map/site-details">Site Details</Link></li>
              <li><Link to="/map/history-tracking">History Tracking</Link></li>
            </ul>
          </li>
          
          {/* FUEL - Dropdown with 4 menus */}
          <li className={`nav-item dropdown ${activeDropdown === 4 ? 'active' : ''}`}>
            <Link 
              to="#" 
              className="nav-link" 
              onClick={(e) => {
                e.preventDefault();
                toggleDropdown(4);
              }}
            >
              <i className="fas fa-gas-pump"></i> FUEL <i className="fas fa-chevron-down"></i>
            </Link>
            <ul className="dropdown-menu">
              <li><Link to="/fuel/fuel-distance-graph">Fuel Distance Graph</Link></li>
              <li><Link to="/fuel/fuel-time-graph">Fuel Time Graph</Link></li>
              <li><Link to="/fuel/fuel-fill">Fuel Fill</Link></li>
              <li><Link to="/fuel/fuel-removal">Fuel Removal</Link></li>
              <li><Link to="/fuel/fuel-consumption">Fuel Consumption</Link></li>
            </ul>
          </li>
          
          {/* ROUTES - Dropdown with 4 menus */}
          <li className={`nav-item dropdown ${activeDropdown === 5 ? 'active' : ''}`}>
            <Link 
              to="#" 
              className="nav-link" 
              onClick={(e) => {
                e.preventDefault();
                toggleDropdown(5);
              }}
            >
              <i className="fas fa-directions"></i> ROUTES <i className="fas fa-chevron-down"></i>
            </Link>
            <ul className="dropdown-menu">
              <li><Link to="/routes/add-route">Add Route</Link></li>
              <li><Link to="/routes/route-list">Route List</Link></li>
              <li><Link to="/routes/restricted-route-list">Restricted Route List</Link></li>
              <li><Link to="/routes/route-deviation">Route Deviation (Assigned)</Link></li>
            </ul>
          </li>
          
          {/* ADMIN - Dropdown with 4 menus and sub-menus */}
          <li className={`nav-item dropdown ${activeDropdown === 6 ? 'active' : ''}`}>
            <Link 
              to="#" 
              className="nav-link" 
              onClick={(e) => {
                e.preventDefault();
                toggleDropdown(6);
              }}
            >
              <i className="fas fa-user-shield"></i> ADMIN <i className="fas fa-chevron-down"></i>
            </Link>
            <ul className="dropdown-menu">
              <li><Link to="/admin/device-status">Device Status</Link></li>
              
              {/* 2nd menu with 5 dropright menus */}
              <li className={`dropdown-submenu ${activeSubmenu === 3 ? 'active' : ''}`}>
                <Link 
                  to="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    toggleSubmenu(3);
                  }}
                >
                  Vehicles <i className="fas fa-chevron-right"></i>
                </Link>
                <ul className="dropright-menu">
                  <li><Link to="/admin/vehicles/manage-devices">Manage Devices</Link></li>
                  <li><Link to="/admin/vehicles/imei-map-with-vehicles">IMEI Map with Vehicles</Link></li>
                  <li><Link to="/admin/vehicles/add-edit-vehicles">Add/Edit Vehicles</Link></li>
                  <li><Link to="/admin/vehicles/check-imei-status">Check IMEI Status</Link></li>
                  <li><Link to="/admin/vehicles/add-new-devices-vehicles">Add New Device & Vehicles (Short)</Link></li>
                </ul>
              </li>
              
              {/* 3rd menu with 4 dropright menus */}
              <li className={`dropdown-submenu ${activeSubmenu === 4 ? 'active' : ''}`}>
                <Link 
                  to="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    toggleSubmenu(4);
                  }}
                >
                  Billing <i className="fas fa-chevron-right"></i>
                </Link>
                <ul className="dropright-menu">
                  <li><Link to="/admin/billing/provider-billing">Provider Billing</Link></li>
                  <li><Link to="/admin/billing/sim-subscription">Sim Subscription</Link></li>
                  <li><Link to="/admin/billing/pro-customer-billing">Pro Customer Billing</Link></li>
                  <li><Link to="/admin/billing/vehicle-bill-recovery">Vehicle Bill Recovery</Link></li>
                </ul>
              </li>
              
              {/* 4th menu with 4 dropright menus */}
              <li className={`dropdown-submenu ${activeSubmenu === 5 ? 'active' : ''}`}>
                <Link 
                  to="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    toggleSubmenu(5);
                  }}
                >
                  Company <i className="fas fa-chevron-right"></i>
                </Link>
                <ul className="dropright-menu">
                  <li><Link to="/admin/company/add-update-company">Add/Update Company</Link></li>
                  <li><Link to="/admin/company/add-update-users">Add/Update Users</Link></li>
                  <li><Link to="/admin/company/user-roles"> User Roles</Link></li>
                  <li><Link to="/admin/company/user-support-ticket">User Support Ticket</Link></li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
        
        {/* Icon Buttons */}
        <div className="icon-buttons">
          {/* Admin Icon - Normal Link */}
          <Link to="/provider-support-ticket" className="icon-btn admin-icon">
            <i className="fas fa-user-cog"></i>
          </Link>
          
          {/* Support Info Icon - Normal Link */}
          <Link to="/support" className="icon-btn support-icon">
            <i className="fas fa-info-circle"></i>
          </Link>
          
          {/* Admin Icon with Dropdown */}
          <div className={`nav-item dropdown ${activeDropdown === 7 ? 'active' : ''}`}>
            <Link 
              to="#" 
              className="icon-btn admin-dropdown-icon" 
              onClick={(e) => {
                e.preventDefault();
                toggleDropdown(7);
              }}
            >
              <i className="fas fa-user-shield"></i>
            </Link>
            <ul className="dropdown-menu">
              <li><Link to="#"> Admin Overview</Link></li>
            </ul>
          </div>
          
          {/* Logout Icon - Normal Link */}
          <Link to="/logout" className="icon-btn logout-icon">
            <i className="fas fa-sign-out-alt"></i>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;