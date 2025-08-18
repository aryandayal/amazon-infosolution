// import React from "react";
import { Helmet } from "react-helmet";
import Header from "../../components/Header";
import BottomNavbar from "../../components/BottomNavbar";


// const ChangeCpPassword = () => {
//     return (
//         <>
//         <Header />
//         <BottomNavbar text="Change Password" />
//         <h2>change CP password</h2>
//         </>
//     )
// }

// export default ChangeCpPassword;

import React, { useState } from 'react';
import './pass.css';


const ChangeCpPassword = () => {
  // State hooks for password fields
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();

    // Password validation
    if (newPassword !== confirmPassword) {
      alert("New passwords don't match!");
      return;
    }

    // API call would go here
    console.log('Password change submitted');
    alert('Password changed successfully!');
  };

  return (
    <>
      <Helmet>
        <title>Change CP Password</title>
      </Helmet>
      <Header />
      <BottomNavbar text="Change Password" />
      <div className="password-form-container">
        <form onSubmit={handleSubmit} className="password-form">
          {/* Old Password Field */}
          <div className="form-group">
            <label htmlFor="oldPassword">Old Password</label>
            <input
              type="password"
              id="oldPassword"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </div>

          {/* New Password Field */}
          <div className="form-group">
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          {/* Confirm Password Field */}
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="submit-btn">SUBMIT</button>
        </form>
      </div>
    </>
  );
};

export default ChangeCpPassword;
