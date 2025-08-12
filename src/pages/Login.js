import React, { useState } from 'react';
import './login.css';
import Logo from '../assets/logos.png'; // Adjust the path as necessary

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your authentication logic here
    alert('Login Submitted');
  };

  return (
    <div className="login-bg">
      <div className="login-container">
        <div className="login-left">
          <img src={Logo} alt="Logo" className="login-logo" />
          <h2 className="login-title">GPS TRACKING</h2>
          <p className="login-desc">Advanced Location Monitoring System</p>
        </div>
        <div className="login-right">
          <form className="login-form" onSubmit={handleSubmit}>
            <h3>User Login</h3>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <button type="submit">Login</button>
            <span className="login-helper">Login to continue.</span>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
